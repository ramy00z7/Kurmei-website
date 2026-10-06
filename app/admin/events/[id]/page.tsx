import Nav from "@/app/components/Nav"; import { notFound } from "next/navigation"; import EventForm from "../EventForm"; import { db } from "@/app/lib/db"; import { deleteEvent, addInvolvement, removeInvolvement } from "../actions";
export const dynamic = "force-dynamic";
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params; if (!/^\d+$/.test(id)) notFound();
  const q = await db();
  const e = (await q.query("select * from events where id=$1", [id])).rows[0]; if (!e) notFound();
  const inv = (await q.query(`select i.id,i.entity_type,i.role,coalesce(pe.name,og.name) name,coalesce(pe.slug,og.slug) slug
    from involvements i left join people pe on pe.id=i.entity_id and i.entity_type='person' left join organizations og on og.id=i.entity_id and i.entity_type='organization'
    where i.event_id=$1 order by i.id`, [id])).rows;
  return <main className="admin"><div className="top"><div className="wrap"><Nav admin /></div></div><div className="wrap"><section className="section" style={{ maxWidth: 640 }}>
    <h1>Edit: {e.title}</h1><EventForm e={e} />
    <form action={deleteEvent} style={{ marginTop: 40 }}><input type="hidden" name="id" value={e.id} /><button className="btn">Delete event</button></form>
    <section className="section"><h2>People & organizations in this event</h2>
      {inv.map((r: any) => <div className="card" key={r.id} style={{ marginBottom: 8 }}>
        <span className="tag">{r.entity_type}</span> {r.name || "(missing)"} {r.role && <span className="muted">· {r.role}</span>}
        <form action={removeInvolvement} style={{ display: "inline", marginLeft: 10 }}><input type="hidden" name="id" value={r.id} /><input type="hidden" name="event_id" value={e.id} /><button className="btn">Remove</button></form>
      </div>)}
      <form action={addInvolvement} className="form" style={{ maxWidth: 400 }}>
        <input type="hidden" name="event_id" value={e.id} />
        <label>Type<select name="entity_type"><option value="person">Person</option><option value="organization">Organization</option></select></label>
        <label>Slug (must already exist)<input name="slug" required /></label>
        <label>Role in this event<input name="role" placeholder="e.g. Led the uprising" /></label>
        <button className="btn" style={{ marginTop: 10 }}>Add link</button>
      </form>
    </section>
  </section></div></main>;
}
