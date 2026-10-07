import Nav from "@/app/components/Nav"; import Footer from "@/app/components/Footer"; import Link from "next/link"; import { Divider } from "@/app/components/NubianPattern"; import { publishedEthnicGroups } from "@/app/lib/repo";
export const dynamic = "force-dynamic";
export const metadata = { title: "Peoples of Sudan" };
export default async function Page() {
  const groups = await publishedEthnicGroups();
  return <main><div className="wrap"><Nav /><section className="section">
    <div className="eyebrow">Culture</div><h1 style={{ fontSize: 70 }}>Peoples of Sudan</h1>
    <p className="lead">Sudan is home to several hundred ethnic groups and sub-clans, speaking well over a hundred languages and dialects. This is a growing, sourced starting set of major, well-documented peoples — not a complete record. Each entry links to where its facts came from.</p>
    <div className="section" style={{ display: "flex", justifyContent: "center", padding: "20px 0" }}><Divider /></div>
    <div className="grid">{groups.map(g => <div className="card" key={g.slug}>
      <span className="tag">{g.region || "Sudan"}</span>
      <h3>{g.name}</h3>
      {g.other_names && <p className="muted" style={{ fontSize: 13 }}>Also: {g.other_names}</p>}
      <p className="muted">{g.summary.slice(0, 160)}{g.summary.length > 160 ? "…" : ""}</p>
      <Link href={`/tribes/${g.slug}`}>Read more →</Link>
    </div>)}</div>
  </section><Footer /></div></main>;
}
