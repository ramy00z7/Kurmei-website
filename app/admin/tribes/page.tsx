import Link from "next/link"; import Nav from "@/app/components/Nav"; import { db } from "@/app/lib/db";
export const dynamic = "force-dynamic";
export default async function Page() {
  const rows = (await (await db()).query("select id,name,region,status from ethnic_groups order by name")).rows;
  return <main className="admin"><div className="top"><div className="wrap"><Nav admin /></div></div><div className="wrap"><section className="section">
    <div className="eyebrow">Manager</div><h1>Peoples &amp; tribes</h1>
    <p className="muted">Sudan has several hundred ethnic groups and sub-clans. This list is a growing starting set, not a complete record — add more as they're researched.</p>
    <Link href="/admin/tribes/new" className="btn">+ New people/tribe</Link>
    <div style={{ marginTop: 24 }}>{rows.map(r => <div className="card" key={r.id} style={{ marginBottom: 10 }}>
      <span className="tag">{r.status}</span> <b>{r.name}</b> <span className="muted">· {r.region}</span> <Link href={`/admin/tribes/${r.id}`}>Edit →</Link></div>)}</div>
  </section></div></main>;
}
