import Link from "next/link"; import Footer from "@/app/components/ArFooter"; import ArNav from "@/app/components/ArNav"; import RtlDoc from "@/app/components/RtlDoc"; import { HeroArt, Divider } from "@/app/components/NubianPattern"; import { publishedEvents, publishedEthnicGroups } from "@/app/lib/repo";
export const dynamic = "force-dynamic";
export const metadata = { title: "كُرمي — تاريخ السودان" };
export default async function Page() {
  const [events, tribes] = await Promise.all([publishedEvents(6), publishedEthnicGroups()]);
  return <main dir="rtl"><RtlDoc /><div className="wrap"><ArNav current="/ar" /><section className="hero"><HeroArt />
    <div><div className="eyebrow">موسوعة تاريخية</div><h1 style={{ fontSize: "clamp(44px,7vw,84px)" }}>تاريخ السودان، متصلاً</h1>
    <p className="lead">أرشيف تفاعلي قائم على المصادر لتاريخ السودان — عبر الزمن والمكان والناس والمصادر. هذه نسخة عربية أولية من كُرمي، لا تزال في طور الإنشاء.</p>
    <form className="search" action="/search"><input name="q" placeholder="ابحث عن كوش، النوبة، البجا…" /><button>بحث</button></form>
    </div></section>
    <div className="section" style={{ display: "flex", justifyContent: "center" }}><Divider /></div>
    <section className="section"><div className="eyebrow">أحداث مختارة</div><h2>من الجدول الزمني</h2>
    <div className="grid">{events.map((e: any) => <div className="card" key={e.slug}><span className="tag">{e.date_label}</span><h3>{e.title_ar || e.title}</h3><p className="muted">{e.summary_ar || e.summary}</p><Link href={`/ar/events/${e.slug}`}>اقرأ المزيد ←</Link></div>)}</div>
    </section>
    <section className="section"><div className="eyebrow">شعوب السودان</div><h2>تعرّف على القبائل والشعوب</h2>
    <div className="grid">{tribes.slice(0, 6).map((t: any) => <div className="card" key={t.slug}><span className="tag">{t.region_ar || t.region}</span><h3>{t.name_ar || t.name}</h3><p className="muted">{(t.summary_ar || t.summary).slice(0, 140)}…</p><Link href={`/ar/tribes/${t.slug}`}>اقرأ المزيد ←</Link></div>)}</div>
    <p style={{ marginTop: 20 }}><Link href="/ar/tribes">عرض جميع الشعوب ←</Link></p>
    </section>
  </div><Footer /></main>;
}
