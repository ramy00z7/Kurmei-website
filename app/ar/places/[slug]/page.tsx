import Footer from "@/app/components/ArFooter"; import ArNav from "@/app/components/ArNav"; import RtlDoc from "@/app/components/RtlDoc"; import Link from "next/link"; import { notFound } from "next/navigation"; import { db } from "@/app/lib/db";
export const dynamic = "force-dynamic";
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = (await (await db()).query("select * from places where slug=$1 and status='published'", [slug])).rows[0]; if (!p) notFound();
  return <main dir="rtl"><RtlDoc /><div className="wrap"><ArNav current={`/ar/places/${slug}`} /><section className="section">
    <div className="crumb">الأماكن / {p.name_ar || p.name}</div>
    {(p.period_ar || p.period) && <div className="eyebrow">{p.period_ar || p.period}</div>}<h1 style={{ fontSize: 60 }}>{p.name_ar || p.name}</h1>
    <p className="lead">{p.summary || "ستربط صفحات الأماكن قريبًا الجغرافيا بالأحداث والأشخاص والأدلة الأثرية."}</p>
    {!p.name_ar && <div className="notice" style={{ marginTop: 20 }}>لم تُترجم هذه الصفحة إلى العربية بعد. <Link href={`/places/${slug}`}>فتح النسخة الإنجليزية ←</Link></div>}
  </section></div><Footer /></main>;
}
