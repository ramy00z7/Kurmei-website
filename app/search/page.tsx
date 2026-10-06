import Nav from "@/app/components/Nav"; import Footer from "@/app/components/Footer"; import Link from "next/link"; import { searchEvents, searchPlaces, searchPeople, searchOrganizations } from "@/app/lib/repo";
export const dynamic = "force-dynamic";
export default async function Page({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const q = ((await searchParams).q || "").trim().slice(0, 100);
  const [eventHits, placeHits, peopleHits, orgHits] = q
    ? await Promise.all([searchEvents(q), searchPlaces(q), searchPeople(q), searchOrganizations(q)])
    : [[], [], [], []];
  return <main><div className="wrap"><Nav /><section className="section"><div className="eyebrow">Search</div><h1 style={{ fontSize: 70 }}>Search Sudan</h1>
    <form className="search" action="/search"><input name="q" defaultValue={q} placeholder="Try Khartoum, Meroë, Kush…" /><button>Search</button></form>
    {q ? <section className="section"><h2>Results for “{q}”</h2>{eventHits.length + placeHits.length + peopleHits.length + orgHits.length === 0 ? <p className="muted">No published results yet. The database grows as sources are reviewed.</p>
      : <div className="grid">{eventHits.map(e => <div className="card" key={e.slug}><span className="tag">Event · {e.date_label}</span><h3>{e.title}</h3><p className="muted">{e.summary}</p><Link href={`/events/${e.slug}`}>Open →</Link></div>)}
        {placeHits.map(p => <div className="card" key={p.slug}><span className="tag">Place</span><h3>{p.name}</h3><p className="muted">{p.period}</p><Link href={`/places/${p.slug}`}>Open →</Link></div>)}
        {peopleHits.map(p => <div className="card" key={p.slug}><span className="tag">Person · {p.role}</span><h3>{p.name}</h3><p className="muted">{p.life_span}</p><Link href={`/people/${p.slug}`}>Open →</Link></div>)}
        {orgHits.map(o => <div className="card" key={o.slug}><span className="tag">Organization · {o.kind}</span><h3>{o.name}</h3><p className="muted">{o.founded_label}</p><Link href={`/organizations/${o.slug}`}>Open →</Link></div>)}</div>}</section>
      : <section className="section"><h2>What you can search</h2><p className="muted">Published events, places, people and organizations. Sources and documents will be added as they enter the database.</p></section>}
  </section><Footer /></div></main>;
}
