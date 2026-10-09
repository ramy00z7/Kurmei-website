import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
export default function ArNav({ current = "/ar" }: { current?: string }) {
  return <nav className="nav">
    <Link href="/ar" className="logo-link"><div className="logo">كُرمي</div></Link>
    <div className="links">
      <Link href="/ar">الرئيسية</Link>
      <Link href="/ar/timeline">الجدول الزمني</Link>
      <Link href="/ar/tribes">شعوب السودان</Link>
      <Link href="/ar/about">عن كُرمي</Link>
      <Link href={current.replace(/^\/ar/, "") || "/"} className="lang-switch">English</Link>
      <ThemeToggle />
    </div>
  </nav>;
}
