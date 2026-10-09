import Footer from "@/app/components/ArFooter"; import ArNav from "@/app/components/ArNav"; import RtlDoc from "@/app/components/RtlDoc"; import Link from "next/link"; import { Divider } from "@/app/components/NubianPattern"; import { publishedEthnicGroups } from "@/app/lib/repo";
export const dynamic = "force-dynamic";
export const metadata = { title: "شعوب السودان" };
export default async function Page() {
  const groups = await publishedEthnicGroups();
  return <main dir="rtl"><RtlDoc /><div className="wrap"><ArNav current="/ar/tribes" /><section className="section">
    <div className="eyebrow">الثقافة</div><h1 style={{ fontSize: 60 }}>شعوب السودان</h1>
    <p className="lead">يضم السودان مئات الجماعات العرقية والقبائل والأفخاذ، ويتحدث سكانه أكثر من مئة لغة ولهجة. هذه مجموعة أولية وموثّقة من الشعوب الكبرى المعروفة جيدًا — وليست سجلًا كاملاً. كل سجل يشير إلى مصدر معلوماته.</p>
    <div className="section" style={{ display: "flex", justifyContent: "center", padding: "20px 0" }}><Divider /></div>
    <div className="grid">{groups.map((g: any) => <div className="card" key={g.slug}>
      <span className="tag">{g.region_ar || g.region || "السودان"}</span>
      <h3>{g.name_ar || g.name}</h3>
      <p className="muted">{(g.summary_ar || g.summary).slice(0, 150)}…</p>
      <Link href={`/ar/tribes/${g.slug}`}>اقرأ المزيد ←</Link>
    </div>)}</div>
  </section></div><Footer /></main>;
}
