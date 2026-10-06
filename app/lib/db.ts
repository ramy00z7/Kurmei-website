import fs from "node:fs";
import path from "node:path";
import { deriveYear } from "@/app/lib/enums";
type Q = { query: (sql: string, params?: unknown[]) => Promise<{ rows: any[] }> };
const g = globalThis as unknown as { __kurmeiDb?: Promise<Q> }; // shared across Next bundles: PGlite must open once per process
/** Postgres via DATABASE_URL; otherwise an embedded local Postgres (PGlite) in .data/ for development. */
export const db = () => (g.__kurmeiDb ??= init().catch(e => { g.__kurmeiDb = undefined; throw e; }));
async function init(): Promise<Q> {
  const schema = fs.readFileSync(path.join(process.cwd(), "db/schema.sql"), "utf8");
  let q: Q;
  if (process.env.DATABASE_URL) {
    const { Pool } = await import("pg");
    q = new Pool({ connectionString: process.env.DATABASE_URL });
    await q.query(schema);
  } else {
    const { PGlite } = await import("@electric-sql/pglite");
    fs.mkdirSync(".data", { recursive: true });
    const l = new PGlite(".data/pglite");
    await l.exec(schema);
    q = { query: (s, a) => l.query(s, a as any[]) as any };
  }
  await seed(q);
  return q;
}
async function seed(q: Q) {
  if ((await q.query("select count(*)::int n from events")).rows[0].n > 0) return;
  const { events, relations, places } = await import("@/app/data");
  for (const p of places)
    await q.query("insert into places(slug,name,summary,period,lat,lng,status) values($1,$2,$3,$4,$5,$6,'published')", [p.slug, p.name, "", p.period, p.lat, p.lng]);
  const ids: Record<string, number> = {};
  for (const e of events) {
    const r = await q.query(
      "insert into events(slug,title,summary,date_label,date_precision,place,lat,lng,status,sort_year) values($1,$2,$3,$4,$5,$6,$7,$8,'published',$9) returning id",
      [e.slug, e.title, e.summary, e.year, e.year.startsWith("c.") ? "approximate" : "year", e.place, e.lat, e.lng, deriveYear(e.year)]);
    ids[e.slug] = r.rows[0].id;
  }
  for (const r of relations)
    await q.query("insert into event_relations(from_id,to_id,type,confidence,note) values($1,$2,$3,$4,$5)", [ids[r.from], ids[r.to], r.type, r.confidence, r.note]);
}
