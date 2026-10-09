import Footer from "@/app/components/ArFooter"; import ArNav from "@/app/components/ArNav"; import RtlDoc from "@/app/components/RtlDoc"; import Link from "next/link"; import { notFound } from "next/navigation"; import { db } from "@/app/lib/db";
export const dynamic = "force-dynamic";
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const g = (await (await db()).query("select * from ethnic_groups where slug=$1 and status='published'", [slug])).rows[0]; if (!g) notFound();
  return <main dir="rtl"><RtlDoc /><div className="wrap"><ArNav current={`/ar/tribes/${slug}`} /><section className="section">
    <div className="crumb">شعوب السودان / {g.name_ar || g.name}</div>
    <div className="eyebrow">{g.region_ar || g.region || "السودان"}</div><h1 style={{ fontSize: 56 }}>{g.name_ar || g.name}</h1>
    <p className="lead" style={{ marginTop: 20 }}>{g.summary_ar || g.summary}</p>
    {!g.name_ar && <div className="notice" style={{ marginTop: 20 }}>لم تُترجم هذه الصفحة إلى العربية بعد — المحتوى المعروض هنا بالإنجليزية. <Link href={`/tribes/${slug}`}>فتح النسخة الإنجليزية ←</Link></div>}
    <section className="section"><h2>المصادر</h2><div className="card">{g.sources
      ? <p className="muted">{g.sources}</p>
      : <p className="muted">لا يوجد مصدر مرفق بهذا السجل بعد.</p>}
      <p className="muted" style={{ marginTop: 14, fontSize: 13 }}>الملخصات في هذه الصفحة من كتابة كُرمي استنادًا إلى المصادر أعلاه، وليست منقولة حرفيًا عنها.</p>
    </div></section>
  </section></div><Footer /></main>;
}
