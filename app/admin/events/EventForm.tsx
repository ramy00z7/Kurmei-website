import { saveEvent } from "./actions";
import { STATUSES, PRECISIONS, LOC_PRECISIONS } from "@/app/lib/enums";
export default function EventForm({ e }: { e?: any }) {
  const sel = (name: string, opts: readonly string[], cur?: string) => <select name={name} defaultValue={cur}>{opts.map(o => <option key={o}>{o}</option>)}</select>;
  return <form action={saveEvent} className="form">
    {e && <input type="hidden" name="id" value={e.id} />}
    <label>Title<input name="title" required defaultValue={e?.title} /></label>
    <label>Slug (URL)<input name="slug" required pattern="[a-z0-9]+(-[a-z0-9]+)*" defaultValue={e?.slug} /></label>
    <label>Summary<textarea name="summary" rows={4} defaultValue={e?.summary} /></label>
    <label>العنوان بالعربية (Arabic title — optional)<input name="title_ar" dir="rtl" defaultValue={e?.title_ar ?? ""} /></label>
    <label>الملخص بالعربية (Arabic summary — optional)<textarea name="summary_ar" dir="rtl" rows={4} defaultValue={e?.summary_ar ?? ""} /></label>
    <label>Date as written (e.g. c. 750 BCE, 1956)<input name="date_label" required defaultValue={e?.date_label} /></label>
    <label>Sort year (optional; negative for BCE, e.g. -750. Used to order the timeline)<input name="sort_year" type="number" defaultValue={e?.sort_year ?? ""} /></label>
    <label>Date precision{sel("date_precision", PRECISIONS, e?.date_precision ?? "year")}</label>
    <label>Place name<input name="place" defaultValue={e?.place} /></label>
    <label>Latitude<input name="lat" type="number" step="any" min={-90} max={90} defaultValue={e?.lat ?? ""} /></label>
    <label>Longitude<input name="lng" type="number" step="any" min={-180} max={180} defaultValue={e?.lng ?? ""} /></label>
    <label>Location precision{sel("location_precision", LOC_PRECISIONS, e?.location_precision ?? "approximate")}</label>
    <label>Status{sel("status", STATUSES, e?.status ?? "draft")}</label>
    <button className="btn" style={{ marginTop: 20 }}>Save</button>
  </form>;
}
