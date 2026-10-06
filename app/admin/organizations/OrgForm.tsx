import { saveOrganizations } from "./actions";
import { STATUSES } from "@/app/lib/enums";
export default function OrgForm({ o }: { o?: any }) {
  const sel = (name: string, opts: readonly string[], cur?: string) => <select name={name} defaultValue={cur}>{opts.map(o => <option key={o}>{o}</option>)}</select>;
  return <form action={saveOrganizations} className="form">
    {o && <input type="hidden" name="id" value={o.id} />}
    <label>Name<input name="name" required defaultValue={o?.name} /></label>
    <label>Slug (URL)<input name="slug" required pattern="[a-z0-9]+(-[a-z0-9]+)*" defaultValue={o?.slug} /></label>
    <label>Summary<textarea name="summary" rows={4} defaultValue={o?.summary} /></label>
    <label>Founded (e.g. 1956, c. 1881)<input name="founded_label" defaultValue={o?.founded_label} /></label>
    <label>Kind (e.g. Political movement, Government body)<input name="kind" defaultValue={o?.kind} /></label>
    <label>Status{sel("status", STATUSES, o?.status ?? "draft")}</label>
    <button className="btn" style={{ marginTop: 20 }}>Save</button>
  </form>;
}
