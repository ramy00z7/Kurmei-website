import Nav from "@/app/components/Nav"; import Footer from "@/app/components/Footer"; import { notFound } from "next/navigation"; import { db } from "@/app/lib/db";
export const dynamic = "force-dynamic";
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const g = (await (await db()).query("select * from ethnic_groups where slug=$1 and status='published'", [slug])).rows[0]; if (!g) notFound();
  return <main><div className="wrap"><Nav /><section className="section">
    <div className="crumb">Peoples of Sudan / {g.name}</div>
    <div className="eyebrow">{g.region || "Sudan"}</div><h1 style={{ fontSize: 68 }}>{g.name}</h1>
    {g.other_names && <p className="muted">Also known as: {g.other_names}</p>}
    {g.language_family && <p className="muted">Language family: {g.language_family}</p>}
    <p className="lead" style={{ marginTop: 20 }}>{g.summary}</p>
    <section className="section"><h2>Sources</h2><div className="card">{g.sources
      ? <p className="muted">{g.sources}</p>
      : <p className="muted"><b>Needs citation.</b> No source is attached to this record yet.</p>}
      <p className="muted" style={{ marginTop: 14, fontSize: 13 }}>Summaries on this page are written by Kurmei from the sources above, not copied from them. If anything here looks wrong or incomplete, it probably is — this is a living, growing record. <a href="/contact">Tell us</a>.</p>
    </div></section>
  </section><Footer /></div></main>;
}
