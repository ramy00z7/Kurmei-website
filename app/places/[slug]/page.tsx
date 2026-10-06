import Nav from "@/app/components/Nav"; import Footer from "@/app/components/Footer"; import Map from "@/app/components/MapClient"; import { notFound } from "next/navigation"; import { db } from "@/app/lib/db"; import { publishedPlaces } from "@/app/lib/repo";
export const dynamic = "force-dynamic";
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = (await (await db()).query("select * from places where slug=$1 and status='published'", [slug])).rows[0]; if (!p) notFound();
  const others = (await publishedPlaces()).filter(x => x.slug !== slug);
  const points = [{ key: p.slug, name: p.name, note: p.period, lat: p.lat, lng: p.lng }, ...others.filter(o => o.lat !== null).map(o => ({ key: o.slug, name: o.name, note: o.period, lat: o.lat, lng: o.lng, href: `/places/${o.slug}` }))];
  return <main><div className="wrap"><Nav /><section className="section">
    <div className="crumb">Places / {p.name}</div>
    {p.period && <div className="eyebrow">{p.period}</div>}<h1 style={{ fontSize: 72 }}>{p.name}</h1>
    <p className="lead">{p.summary || "Place pages will connect geography, historical names, events, people and archaeological evidence."}</p>
    {p.lat !== null && <div className="map" style={{ marginTop: 30 }}><Map points={points} /></div>}
  </section><Footer /></div></main>;
}
