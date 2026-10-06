import Nav from "@/app/components/Nav"; import Footer from "@/app/components/Footer"; import Link from "next/link"; import { notFound } from "next/navigation";
import { db } from "@/app/lib/db"; import { relLabel, confLabel } from "@/app/data";
export const dynamic = "force-dynamic";
function Chain({ items }: { items: any[] }) {
  if (!items.length) return <p className="muted">No connections recorded yet. This is a gap in the database, not evidence that nothing is connected.</p>;
  return <>{items.map(r => <div className="card" key={r.slug + r.type} style={{ marginBottom: 12 }}>
    <span className="tag">{(relLabel as any)[r.type]} · {(confLabel as any)[r.confidence]}</span>
    <h3><Link href={`/events/${r.slug}`}>{r.title}</Link></h3><p className="muted">{r.note}</p></div>)}</>;
}
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const q = await db();
  const e = (await q.query("select * from events where slug=$1 and status='published'", [slug])).rows[0]; if (!e) notFound();
  const rel = (side: string, other: string) => q.query(`select r.type,r.confidence,r.note,x.slug,x.title from event_relations r join events x on x.id=r.${other} where r.${side}=$1 and x.status='published'`, [e.id]);
  const before = (await rel("to_id", "from_id")).rows, next = (await rel("from_id", "to_id")).rows;
  const cites = (await q.query("select d.title,d.author,d.year,c.page from event_citations c join documents d on d.id=c.doc_id where c.event_id=$1 order by c.id", [e.id])).rows;
  const inv = (await q.query(`select i.entity_type,i.role,coalesce(pe.name,og.name) name,coalesce(pe.slug,og.slug) slug
    from involvements i left join people pe on pe.id=i.entity_id and i.entity_type='person' and pe.status='published'
    left join organizations og on og.id=i.entity_id and i.entity_type='organization' and og.status='published'
    where i.event_id=$1 and coalesce(pe.slug,og.slug) is not null order by i.id`, [e.id])).rows;
  const prec = e.date_precision === "approximate" ? "Approximate date" : e.date_precision[0].toUpperCase() + e.date_precision.slice(1);
  return <main><div className="wrap"><Nav /><section className="section">
    <div className="crumb">Timeline / Events / {e.title}</div>
    <div className="eyebrow">{e.date_label} · {prec}</div>
    <h1 style={{ fontSize: 72 }}>{e.title}</h1><p className="lead">{e.summary}</p>
    <div className="split" style={{ marginTop: 40 }}><div><h2>What happened before?</h2><Chain items={before} /></div><div><h2>What happened next?</h2><Chain items={next} /></div></div>
    <section className="section"><div className="card"><span className="tag">Location · {e.location_precision}</span><h3>{e.place || "Not yet located"}</h3>
      {e.lat !== null && <p className="muted">Approximate coordinates: {e.lat}, {e.lng}</p>}<Link href="/map">View map →</Link></div></section>
    {inv.length > 0 && <section className="section"><h2>People & organizations</h2><div className="grid">{inv.map((r: any, i: number) => <div className="card" key={i}>
      <span className="tag">{r.entity_type}</span>{r.role && <span className="muted"> · {r.role}</span>}<h3><Link href={`/${r.entity_type === "person" ? "people" : "organizations"}/${r.slug}`}>{r.name}</Link></h3></div>)}</div></section>}
    <section className="section"><h2>Sources</h2><div className="card">{cites.length ? <>
      <p className="muted">This is a short summary written by Kurmei. For the full detail, read the source:</p>
      {cites.map((c, i) => <p key={i}><b>{c.title}</b>{c.author ? `, ${c.author}` : ""}{c.year ? ` (${c.year})` : ""}, p. {c.page}</p>)}</>
      : <p className="muted"><b>Needs citation.</b> No source is attached to this record yet, so it should not be treated as verified. See the <Link href="/methodology">methodology</Link>.</p>}</div></section>
  </section><Footer /></div></main>;
}
