import Footer from "@/app/components/ArFooter"; import ArNav from "@/app/components/ArNav"; import RtlDoc from "@/app/components/RtlDoc";
export const metadata = { title: "عن كُرمي" };
export default function Page() {
  return <main dir="rtl"><RtlDoc /><div className="wrap legal"><ArNav current="/ar/about" /><section className="section">
    <div className="eyebrow">عن الموقع</div><h1 style={{ fontSize: 60 }}>عن كُرمي</h1>
    <p className="lead">كُرمي مشروع لبناء سجل تفاعلي وموثّق لتاريخ السودان، يربط الأحداث بالأماكن والأشخاص والشعوب والمصادر.</p>
    <h2>لماذا كُرمي؟</h2>
    <p>يهدف الموقع إلى تقديم تاريخ السودان بطريقة تفاعلية، مع توضيح درجة اليقين في كل تاريخ أو رابط سببي، والإشارة دائمًا إلى مصدر كل معلومة.</p>
    <h2>النسخة العربية</h2>
    <p>هذه نسخة عربية أولية من الموقع، وتغطي حاليًا الصفحة الرئيسية والجدول الزمني وقسم شعوب السودان وصفحات الأحداث والأماكن المرتبطة بها. بقية الأقسام — مثل الخريطة والبحث واستكشاف العلاقات — لا تزال متاحة بالإنجليزية فقط وسيتم ترجمتها تباعًا.</p>
  </section></div><Footer /></main>;
}
