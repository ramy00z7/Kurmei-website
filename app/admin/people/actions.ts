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
  const pick = (k: string, a: readonly string[]) => { if (!a.includes(s(k))) throw new Error("Invalid " + k); return s(k); };
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(s("slug"))) throw new Error("Slug: lowercase letters, numbers and hyphens only");
  if (!s("name")) throw new Error("Name is required");
  return [s("slug"), s("name"), s("summary"), s("life_span"), s("role"), pick("status", STATUSES)];
}
export async function savePeople(f: FormData) {
  await guard(); const v = parse(f); const id = Number(f.get("id") || 0); const q = await db();
  const cols = "slug,name,summary,life_span,role,status";
  let eid = id;
  if (id) await q.query(`update people set (${cols}, updated_at)=($1,$2,$3,$4,$5,$6, now()) where id=$${v.length + 1}`, [...v, id]);
  else eid = (await q.query(`insert into people(${cols}) values($1,$2,$3,$4,$5,$6) returning id`, v)).rows[0].id;
  await q.query("insert into audit_log(action,entity,entity_id,detail) values($1,'people',$2,$3)", [id ? "update" : "create", eid, JSON.stringify({ slug: v[0] })]);
  revalidatePath("/admin/people"); redirect("/admin/people");
}
export async function deletePeople(f: FormData) {
  await guard(); const id = Number(f.get("id")); const q = await db();
  await q.query("delete from people where id=$1", [id]);
  await q.query("insert into audit_log(action,entity,entity_id) values('delete','people',$1)", [id]);
  revalidatePath("/admin/people"); redirect("/admin/people");
}
