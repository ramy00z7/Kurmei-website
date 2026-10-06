import Nav from "@/app/components/Nav"; import Footer from "@/app/components/Footer"; import Link from "next/link"; import { publishedEvents } from "@/app/lib/repo";
export const dynamic = "force-dynamic";
export default async function Page() {
  const events = await publishedEvents();
  return <main><div className="wrap"><Nav /><section className="section"><div className="eyebrow">Timeline</div><h1 style={{ fontSize: 72 }}>Sudan through time</h1>
    <p className="lead">A chronological spine for the Kurmei knowledge graph. Dates become more precise as sources are reviewed.</p>
    <div className="timeline">{events.map(e => <article className="event" key={e.slug}><div className="year">{e.date_label}</div><h3>{e.title}</h3><p>{e.summary}</p>
      {e.place && <span className="pill">{e.place}</span>}{e.date_precision !== "exact" && e.date_precision !== "year" && <span className="pill">{e.date_precision} date</span>}{!e.cited && <span className="pill">Needs citation</span>}<br /><Link href={`/events/${e.slug}`}>Open event →</Link></article>)}</div>
  </section><Footer /></div></main>;
}
