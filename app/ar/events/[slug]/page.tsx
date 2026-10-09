import Footer from "@/app/components/ArFooter"; import ArNav from "@/app/components/ArNav"; import RtlDoc from "@/app/components/RtlDoc"; import Link from "next/link"; import { notFound } from "next/navigation"; import { db } from "@/app/lib/db";
export const dynamic = "force-dynamic";
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const q = await db();
  const e = (await q.query("select * from events where slug=$1 and status='published'", [slug])).rows[0]; if (!e) notFound();
  const cites = (await q.query("select d.title,d.author,d.year,c.page from event_citations c join documents d on d.id=c.doc_id where c.event_id=$1 order by c.id", [e.id])).rows;
  return <main dir="rtl"><RtlDoc /><div className="wrap"><ArNav current={`/ar/events/${slug}`} /><section className="section">
    <div className="crumb">الجدول الزمني / الأحداث / {e.title_ar || e.title}</div>
    <div className="eyebrow">{e.date_label}</div><h1 style={{ fontSize: 60 }}>{e.title_ar || e.title}</h1>
    <p className="lead">{e.summary_ar || e.summary}</p>
    {!e.title_ar && <div className="notice" style={{ marginTop: 20 }}>لم تُترجم هذه الصفحة إلى العربية بعد — المحتوى المعروض هنا بالإنجليزية. <Link href={`/events/${slug}`}>فتح النسخة الإنجليزية ←</Link></div>}
    {e.place && <section className="section"><div className="card"><span className="tag">المكان</span><h3>{e.place}</h3></div></section>}
    <section className="section"><h2>المصادر</h2><div className="card">{cites.length
      ? cites.map((c: any, i: number) => <p key={i}><b>{c.title}</b>{c.author ? `، ${c.author}` : ""}{c.year ? ` (${c.year})` : ""}، ص. {c.page}</p>)
      : <p className="muted">لا يوجد مصدر مرفق بهذا السجل بعد.</p>}</div></section>
  </section></div><Footer /></main>;
}
