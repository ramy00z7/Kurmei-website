"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { db } from "@/app/lib/db";
import { COOKIE, verifyToken } from "@/app/lib/auth";
import { STATUSES, LOC_PRECISIONS } from "@/app/lib/enums";

async function guard() { if (!(await verifyToken((await cookies()).get(COOKIE)?.value))) throw new Error("Unauthorized"); }
function parse(f: FormData) {
  const s = (k: string) => String(f.get(k) ?? "").trim();
  const n = (k: string) => (s(k) === "" ? null : Number(s(k)));
  const pick = (k: string, a: readonly string[]) => { if (!a.includes(s(k))) throw new Error("Invalid " + k); return s(k); };
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(s("slug"))) throw new Error("Slug: lowercase letters, numbers and hyphens only");
  if (!s("name")) throw new Error("Name is required");
  const lat = n("lat"), lng = n("lng");
  if ((lat !== null && !(Math.abs(lat) <= 90)) || (lng !== null && !(Math.abs(lng) <= 180))) throw new Error("Invalid coordinates");
  return [s("slug"), s("name"), s("summary"), s("period"), lat, lng, pick("location_precision", LOC_PRECISIONS), pick("status", STATUSES)];
}
export async function savePlaces(f: FormData) {
  await guard(); const v = parse(f); const id = Number(f.get("id") || 0); const q = await db();
  const cols = "slug,name,summary,period,lat,lng,location_precision,status";
  let eid = id;
  if (id) await q.query(`update places set (${cols}, updated_at)=($1,$2,$3,$4,$5,$6,$7,$8, now()) where id=$${v.length + 1}`, [...v, id]);
  else eid = (await q.query(`insert into places(${cols}) values($1,$2,$3,$4,$5,$6,$7,$8) returning id`, v)).rows[0].id;
  await q.query("insert into audit_log(action,entity,entity_id,detail) values($1,'places',$2,$3)", [id ? "update" : "create", eid, JSON.stringify({ slug: v[0] })]);
  revalidatePath("/admin/places"); redirect("/admin/places");
}
export async function deletePlaces(f: FormData) {
  await guard(); const id = Number(f.get("id")); const q = await db();
  await q.query("delete from places where id=$1", [id]);
  await q.query("insert into audit_log(action,entity,entity_id) values('delete','places',$1)", [id]);
  revalidatePath("/admin/places"); redirect("/admin/places");
}
