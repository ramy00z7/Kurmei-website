import Link from "next/link"; import Nav from "@/app/components/Nav"; import { db } from "@/app/lib/db";
export const dynamic = "force-dynamic";
export default async function Page() {
  const rows = (await (await db()).query("select id,name,period,status from places order by id")).rows;
  return <main className="admin"><div className="top"><div className="wrap"><Nav admin /></div></div><div className="wrap"><section className="section">
    <div className="eyebrow">Manager</div><h1>Places</h1>
    <Link href="/admin/places/new" className="btn">+ New place</Link>
    <div style={{ marginTop: 24 }}>{rows.map(r => <div className="card" key={r.id} style={{ marginBottom: 10 }}>
      <span className="tag">{r.status}</span> <b>{r.name}</b> <span className="muted">· {r.period}</span> <Link href={`/admin/places/${r.id}`}>Edit →</Link></div>)}</div>
  </section></div></main>;
}
