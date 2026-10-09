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
/** Each table seeds independently on its own "is it empty" check — NOT gated by whether
 *  other tables already have rows. A table added in a later release must still seed itself
 *  on a database that was already bootstrapped by an earlier release. */
async function isEmpty(q: Q, table: string) {
  return (await q.query(`select count(*)::int n from ${table}`)).rows[0].n === 0;
}
async function seed(q: Q) {
  const { eventAr, placeAr, tribeAr } = await import("@/app/lib/ar-seed");
  if (await isEmpty(q, "places")) {
    const { places } = await import("@/app/data");
    for (const p of places) {
      const ar = placeAr[p.slug];
      await q.query("insert into places(slug,name,summary,period,lat,lng,status,name_ar,period_ar) values($1,$2,$3,$4,$5,$6,'published',$7,$8)",
        [p.slug, p.name, "", p.period, p.lat, p.lng, ar?.name ?? null, ar?.period ?? null]);
    }
  }
  if (await isEmpty(q, "ethnic_groups")) {
    const { ethnicGroupSeed } = await import("@/app/lib/ethnic-groups-seed");
    for (const eg of ethnicGroupSeed) {
      const ar = tribeAr[eg.slug];
      await q.query("insert into ethnic_groups(slug,name,other_names,region,language_family,summary,sources,status,name_ar,region_ar,summary_ar) values($1,$2,$3,$4,$5,$6,$7,'published',$8,$9,$10)",
        [eg.slug, eg.name, eg.other, eg.region, eg.lang, eg.summary, eg.sources, ar?.name ?? null, ar?.region ?? null, ar?.summary ?? null]);
    }
  }
  if (await isEmpty(q, "events")) {
    const { events, relations } = await import("@/app/data");
    const ids: Record<string, number> = {};
    for (const e of events) {
      const ar = eventAr[e.slug];
      const r = await q.query(
        "insert into events(slug,title,summary,date_label,date_precision,place,lat,lng,status,sort_year,title_ar,summary_ar) values($1,$2,$3,$4,$5,$6,$7,$8,'published',$9,$10,$11) returning id",
        [e.slug, e.title, e.summary, e.year, e.year.startsWith("c.") ? "approximate" : "year", e.place, e.lat, e.lng, deriveYear(e.year), ar?.title ?? null, ar?.summary ?? null]);
      ids[e.slug] = r.rows[0].id;
    }
    for (const r of relations)
      await q.query("insert into event_relations(from_id,to_id,type,confidence,note) values($1,$2,$3,$4,$5)", [ids[r.from], ids[r.to], r.type, r.confidence, r.note]);
  }
}
