import Link from "next/link"; import Nav from "@/app/components/Nav"; import { db } from "@/app/lib/db";
export const dynamic = "force-dynamic";
export default async function Page() {
  const rows = (await (await db()).query("select id,name,kind,status from organizations order by id")).rows;
  return <main className="admin"><div className="top"><div className="wrap"><Nav admin /></div></div><div className="wrap"><section className="section">
    <div className="eyebrow">Manager</div><h1>Organizations</h1>
    <Link href="/admin/organizations/new" className="btn">+ New organization</Link>
    <div style={{ marginTop: 24 }}>{rows.map(r => <div className="card" key={r.id} style={{ marginBottom: 10 }}>
      <span className="tag">{r.status}</span> <b>{r.name}</b> <span className="muted">· {r.kind}</span> <Link href={`/admin/organizations/${r.id}`}>Edit →</Link></div>)}</div>
  </section></div></main>;
}
