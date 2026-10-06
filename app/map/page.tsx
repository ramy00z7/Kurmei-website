import Nav from "@/app/components/Nav"; import Footer from "@/app/components/Footer"; import Map from "@/app/components/MapClient"; import { publishedEvents, publishedPlaces } from "@/app/lib/repo";
export const dynamic = "force-dynamic";
export default async function Page() {
  const [ev, pl] = await Promise.all([publishedEvents(), publishedPlaces()]);
  const points = [
    ...ev.filter(e => e.lat !== null).map(e => ({ key: "e-" + e.slug, name: e.title, note: `${e.date_label} · location ${e.location_precision}`, lat: e.lat, lng: e.lng, href: `/events/${e.slug}` })),
    ...pl.filter(p => p.lat !== null).map(p => ({ key: "p-" + p.slug, name: p.name, note: `Place · ${p.period}`, lat: p.lat, lng: p.lng, href: `/places/${p.slug}` })),
  ];
  return <main><div className="wrap"><Nav /><section className="section"><div className="eyebrow">Map</div><h1 style={{ fontSize: 72 }}>History on the map</h1>
    <p className="lead">Published events with coordinates. Each marker states how precise its location is. Historical boundaries and a time slider are planned.</p>
    <div className="map" style={{ marginTop: 30 }}><Map points={points} /></div></section><Footer /></div></main>;
}
