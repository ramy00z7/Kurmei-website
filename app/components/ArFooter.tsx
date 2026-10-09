import Link from "next/link";
export default function ArFooter() {
  return <footer className="footer"><div className="footer-grid">
    <div><b>كُرمي</b><p>السودان، عبر الزمن.</p><p>كل حدث. كل شخص. كل مكان. كل علاقة.</p></div>
    <div><b>استكشاف</b><Link href="/ar/timeline">الجدول الزمني</Link><Link href="/ar/tribes">شعوب السودان</Link></div>
    <div><b>عن الموقع</b><Link href="/ar/about">عن كُرمي</Link><Link href="/">English version</Link></div>
  </div><div className="footer-bottom">© {new Date().getFullYear()} كُرمي. هذا المحتوى التاريخي قيد البحث والمراجعة والتوسّع المستمر. النسخة العربية لا تزال في مراحلها الأولى.</div></footer>;
}
