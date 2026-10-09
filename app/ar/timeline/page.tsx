import Link from "next/link"; import Footer from "@/app/components/ArFooter"; import ArNav from "@/app/components/ArNav"; import RtlDoc from "@/app/components/RtlDoc"; import { publishedEvents } from "@/app/lib/repo";
export const dynamic = "force-dynamic";
export const metadata = { title: "الجدول الزمني" };
export default async function Page() {
  const events = await publishedEvents();
  return <main dir="rtl"><RtlDoc /><div className="wrap"><ArNav current="/ar/timeline" /><section className="section">
    <div className="eyebrow">الجدول الزمني</div><h1 style={{ fontSize: 64 }}>السودان عبر الزمن</h1>
    <p className="lead">خط زمني متسلسل لأحداث كُرمي. تزداد دقة التواريخ كلما روجعت المصادر.</p>
    <div className="timeline">{events.map((e: any) => <article className="event" key={e.slug}><div className="year">{e.date_label}</div><h3>{e.title_ar || e.title}</h3><p>{e.summary_ar || e.summary}</p>
      {!e.title_ar && <span className="pill">لم تُترجم بعد</span>}
      <br /><Link href={`/ar/events/${e.slug}`}>فتح الحدث ←</Link></article>)}</div>
  </section></div><Footer /></main>;
}
