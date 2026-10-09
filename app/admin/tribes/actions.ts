"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { db } from "@/app/lib/db";
import { COOKIE, verifyToken } from "@/app/lib/auth";
import { STATUSES } from "@/app/lib/enums";

async function guard() { if (!(await verifyToken((await cookies()).get(COOKIE)?.value))) throw new Error("Unauthorized"); }
function parse(f: FormData) {
  const s = (k: string) => String(f.get(k) ?? "").trim();
  const pick = (k: string, a: readonly string[]) => { if (!a.includes(s(k))) throw new Error("Invalid " + k); return s(k); };
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(s("slug"))) throw new Error("Slug: lowercase letters, numbers and hyphens only");
  if (!s("name")) throw new Error("Name is required");
  return [s("slug"), s("name"), s("other_names"), s("region"), s("language_family"), s("summary"), s("sources"), pick("status", STATUSES), s("name_ar") || null, s("region_ar") || null, s("summary_ar") || null];
}
export async function saveTribe(f: FormData) {
  await guard(); const v = parse(f); const id = Number(f.get("id") || 0); const q = await db();
  const cols = "slug,name,other_names,region,language_family,summary,sources,status,name_ar,region_ar,summary_ar";
  let eid = id;
  if (id) await q.query(`update ethnic_groups set (${cols}, updated_at)=($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11, now()) where id=$12`, [...v, id]);
  else eid = (await q.query(`insert into ethnic_groups(${cols}) values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) returning id`, v)).rows[0].id;
  await q.query("insert into audit_log(action,entity,entity_id,detail) values($1,'ethnic_group',$2,$3)", [id ? "update" : "create", eid, JSON.stringify({ slug: v[0] })]);
  revalidatePath("/admin/tribes"); redirect("/admin/tribes");
}
export async function deleteTribe(f: FormData) {
  await guard(); const id = Number(f.get("id")); const q = await db();
  await q.query("delete from ethnic_groups where id=$1", [id]);
  await q.query("insert into audit_log(action,entity,entity_id) values('delete','ethnic_group',$1)", [id]);
  revalidatePath("/admin/tribes"); redirect("/admin/tribes");
}
