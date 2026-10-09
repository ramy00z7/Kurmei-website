import { saveTribe } from "./actions";
import { STATUSES } from "@/app/lib/enums";
export default function TribeForm({ g }: { g?: any }) {
  const sel = (name: string, opts: readonly string[], cur?: string) => <select name={name} defaultValue={cur}>{opts.map(o => <option key={o}>{o}</option>)}</select>;
  return <form action={saveTribe} className="form">
    {g && <input type="hidden" name="id" value={g.id} />}
    <label>Name<input name="name" required defaultValue={g?.name} /></label>
    <label>Slug (URL)<input name="slug" required pattern="[a-z0-9]+(-[a-z0-9]+)*" defaultValue={g?.slug} /></label>
    <label>Other names<input name="other_names" defaultValue={g?.other_names} /></label>
    <label>Region<input name="region" defaultValue={g?.region} /></label>
    <label>Language family<input name="language_family" defaultValue={g?.language_family} /></label>
    <label>Summary (your own words — no copy-pasting from sources)<textarea name="summary" rows={6} defaultValue={g?.summary} /></label>
    <label>الاسم بالعربية (Arabic name — optional)<input name="name_ar" dir="rtl" defaultValue={g?.name_ar ?? ""} /></label>
    <label>المنطقة بالعربية (Arabic region — optional)<input name="region_ar" dir="rtl" defaultValue={g?.region_ar ?? ""} /></label>
    <label>الملخص بالعربية (Arabic summary — optional)<textarea name="summary_ar" dir="rtl" rows={6} defaultValue={g?.summary_ar ?? ""} /></label>
    <label>Sources (name each source — book, encyclopedia, report)<textarea name="sources" rows={2} defaultValue={g?.sources} /></label>
    <label>Status{sel("status", STATUSES, g?.status ?? "draft")}</label>
    <button className="btn" style={{ marginTop: 20 }}>Save</button>
  </form>;
}
