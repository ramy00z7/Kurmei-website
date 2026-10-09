"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { db } from "@/app/lib/db";
import { COOKIE, verifyToken } from "@/app/lib/auth";
import { STATUSES, PRECISIONS, LOC_PRECISIONS, deriveYear } from "@/app/lib/enums";

async function guard() { if (!(await verifyToken((await cookies()).get(COOKIE)?.value))) throw new Error("Unauthorized"); }
function parse(f: FormData) {
  const s = (k: string) => String(f.get(k) ?? "").trim();
  const n = (k: string) => (s(k) === "" ? null : Number(s(k)));
  const pick = (k: string, a: readonly string[]) => { if (!a.includes(s(k))) throw new Error("Invalid " + k); return s(k); };
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(s("slug"))) throw new Error("Slug: lowercase letters, numbers and hyphens only");
  if (!s("title") || !s("date_label")) throw new Error("Title and date are required");
  const lat = n("lat"), lng = n("lng");
  if ((lat !== null && !(Math.abs(lat) <= 90)) || (lng !== null && !(Math.abs(lng) <= 180))) throw new Error("Invalid coordinates");
  return [s("slug"), s("title"), s("summary"), s("date_label"), pick("date_precision", PRECISIONS), s("place"), lat, lng, pick("location_precision", LOC_PRECISIONS), pick("status", STATUSES), n("sort_year") ?? deriveYear(s("date_label")), s("title_ar") || null, s("summary_ar") || null];
}
export async function saveEvent(f: FormData) {
  await guard(); const v = parse(f); const id = Number(f.get("id") || 0); const q = await db();
  const cols = "slug,title,summary,date_label,date_precision,place,lat,lng,location_precision,status,sort_year,title_ar,summary_ar";
  let eid = id;
  if (id) await q.query(`update events set (${cols}, updated_at)=($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13, now()) where id=$14`, [...v, id]);
  else eid = (await q.query(`insert into events(${cols}) values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13) returning id`, v)).rows[0].id;
  await q.query("insert into audit_log(action,entity,entity_id,detail) values($1,'event',$2,$3)", [id ? "update" : "create", eid, JSON.stringify({ slug: v[0], status: v[9] })]);
  revalidatePath("/admin/events"); redirect("/admin/events");
}
export async function deleteEvent(f: FormData) {
  await guard(); const id = Number(f.get("id")); const q = await db();
  await q.query("delete from events where id=$1", [id]);
  await q.query("insert into audit_log(action,entity,entity_id) values('delete','event',$1)", [id]);
  revalidatePath("/admin/events"); redirect("/admin/events");
}
export async function addInvolvement(f: FormData) {
  await guard(); const q = await db();
  const eventId = Number(f.get("event_id")); const entityType = String(f.get("entity_type") || "");
  const slug = String(f.get("slug") || "").trim(); const role = String(f.get("role") || "").trim();
  if (!["person", "organization"].includes(entityType)) throw new Error("Invalid entity type");
  const table = entityType === "person" ? "people" : "organizations";
  const row = (await q.query(`select id from ${table} where slug=$1`, [slug])).rows[0];
  if (!row) throw new Error(`No ${entityType} found with slug "${slug}"`);
  await q.query("insert into involvements(event_id,entity_type,entity_id,role) values($1,$2,$3,$4)", [eventId, entityType, row.id, role]);
  revalidatePath(`/admin/events/${eventId}`); redirect(`/admin/events/${eventId}`);
}
export async function removeInvolvement(f: FormData) {
  await guard(); const id = Number(f.get("id")); const eventId = Number(f.get("event_id"));
  await (await db()).query("delete from involvements where id=$1", [id]);
  revalidatePath(`/admin/events/${eventId}`); redirect(`/admin/events/${eventId}`);
}
