import Link from "next/link"; import Nav from "@/app/components/Nav"; import { db } from "@/app/lib/db";
export const dynamic = "force-dynamic";
export default async function Page() {
  const rows = (await (await db()).query("select id,title,date_label,status from events order by id")).rows;
  return <main className="admin"><div className="top"><div className="wrap"><Nav admin /></div></div><div className="wrap"><section className="section">
    <div className="eyebrow">Manager</div><h1>Events</h1>
    <Link href="/admin/events/new" className="btn">+ New event</Link>
    <div style={{ marginTop: 24 }}>{rows.map(r => <div className="card" key={r.id} style={{ marginBottom: 10 }}>
      <span className="tag">{r.status}</span> <b>{r.title}</b> <span className="muted">· {r.date_label}</span> <Link href={`/admin/events/${r.id}`}>Edit →</Link></div>)}</div>
  </section></div></main>;
}
