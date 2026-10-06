import { savePlaces } from "./actions";
import { STATUSES, LOC_PRECISIONS } from "@/app/lib/enums";
export default function PlaceForm({ p }: { p?: any }) {
  const sel = (name: string, opts: readonly string[], cur?: string) => <select name={name} defaultValue={cur}>{opts.map(o => <option key={o}>{o}</option>)}</select>;
  return <form action={savePlaces} className="form">
    {p && <input type="hidden" name="id" value={p.id} />}
    <label>Name<input name="name" required defaultValue={p?.name} /></label>
    <label>Slug (URL)<input name="slug" required pattern="[a-z0-9]+(-[a-z0-9]+)*" defaultValue={p?.slug} /></label>
    <label>Summary<textarea name="summary" rows={4} defaultValue={p?.summary} /></label>
    <label>Period (e.g. Kush, Modern Sudan)<input name="period" defaultValue={p?.period} /></label>
    <label>Latitude<input name="lat" type="number" step="any" min={-90} max={90} defaultValue={p?.lat ?? ""} /></label>
    <label>Longitude<input name="lng" type="number" step="any" min={-180} max={180} defaultValue={p?.lng ?? ""} /></label>
    <label>Location precision{sel("location_precision", LOC_PRECISIONS, p?.location_precision ?? "approximate")}</label>
    <label>Status{sel("status", STATUSES, p?.status ?? "draft")}</label>
    <button className="btn" style={{ marginTop: 20 }}>Save</button>
  </form>;
}
