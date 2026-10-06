import { savePeople } from "./actions";
import { STATUSES } from "@/app/lib/enums";
export default function PersonForm({ p }: { p?: any }) {
  const sel = (name: string, opts: readonly string[], cur?: string) => <select name={name} defaultValue={cur}>{opts.map(o => <option key={o}>{o}</option>)}</select>;
  return <form action={savePeople} className="form">
    {p && <input type="hidden" name="id" value={p.id} />}
    <label>Name<input name="name" required defaultValue={p?.name} /></label>
    <label>Slug (URL)<input name="slug" required pattern="[a-z0-9]+(-[a-z0-9]+)*" defaultValue={p?.slug} /></label>
    <label>Summary<textarea name="summary" rows={4} defaultValue={p?.summary} /></label>
    <label>Life span (e.g. c. 296–316 CE, or born 1955)<input name="life_span" defaultValue={p?.life_span} /></label>
    <label>Role (e.g. King of Kush, President)<input name="role" defaultValue={p?.role} /></label>
    <label>Status{sel("status", STATUSES, p?.status ?? "draft")}</label>
    <button className="btn" style={{ marginTop: 20 }}>Save</button>
  </form>;
}
