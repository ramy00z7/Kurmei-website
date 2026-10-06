import Nav from "@/app/components/Nav"; import Footer from "@/app/components/Footer"; import { notFound } from "next/navigation"; import Link from "next/link"; import { db } from "@/app/lib/db";
export const dynamic = "force-dynamic";
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const q = await db();
  const o = (await q.query("select * from organizations where slug=$1 and status='published'", [slug])).rows[0]; if (!o) notFound();
  const cites = (await q.query("select d.title,d.author,d.year,c.page from organization_citations c join documents d on d.id=c.doc_id where c.organization_id=$1 order by c.id", [o.id])).rows;
  const roles = (await q.query("select e.slug,e.title,e.date_label,i.role from involvements i join events e on e.id=i.event_id where i.entity_type='organization' and i.entity_id=$1 and e.status='published' order by e.sort_year", [o.id])).rows;
  return <main><div className="wrap"><Nav /><section className="section">
    <div className="crumb">Organizations / {o.name}</div>
    {o.kind && <div className="eyebrow">{o.kind}</div>}<h1 style={{ fontSize: 72 }}>{o.name}</h1>
    {o.founded_label && <p className="muted">Founded {o.founded_label}</p>}
    <p className="lead">{o.summary || "No summary yet."}</p>
    {roles.length > 0 && <section className="section"><h2>Appears in</h2>{roles.map((r: any) => <div className="card" key={r.slug} style={{ marginBottom: 10 }}><span className="tag">{r.role || "Involved"}</span> <Link href={`/events/${r.slug}`}>{r.title}</Link> <span className="muted">· {r.date_label}</span></div>)}</section>}
    <section className="section"><h2>Sources</h2><div className="card">{cites.length ? cites.map((c: any, i: number) => <p key={i}><b>{c.title}</b>{c.author ? `, ${c.author}` : ""}{c.year ? ` (${c.year})` : ""}, p. {c.page}</p>)
      : <p className="muted"><b>Needs citation.</b> No source is attached to this record yet.</p>}</div></section>
  </section><Footer /></div></main>;
}
