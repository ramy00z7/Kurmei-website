import Link from "next/link"; import Nav from "@/app/components/Nav"; import { db } from "@/app/lib/db"; import { decide } from "../books/actions";
export const dynamic = "force-dynamic";
export default async function Page() {
  const rows = (await (await db()).query("select p.*, d.title doc from proposals p join documents d on d.id=p.doc_id where p.status='pending' order by p.id")).rows;
  return <main className="admin"><div className="top"><div className="wrap"><Nav admin /></div></div><div className="wrap"><section className="section">
    <div className="eyebrow">Human review</div><h1>AI review queue</h1><p className="muted">{rows.length} pending. Approving creates a draft event only; you publish separately.</p>
    {rows.map(p => <div className="card" key={p.id} style={{ marginBottom: 14 }}>
      <span className="tag">{p.kind}</span> <span className="tag">{p.confidence} confidence</span> <span className="tag">{p.evidence_verified ? "evidence verified" : "EVIDENCE NOT FOUND ON PAGE"}</span>
      {p.duplicate_of && <span className="tag">possible duplicate of event #{p.duplicate_of}</span>}
      {p.summary_copied && <span className="tag">summary too close to the book — write your own</span>}
      <h3>{p.title}</h3><p className="muted">{p.date_label} ({p.date_precision}) · {p.place || "no place"}</p>      <p className="muted"><i>“{p.evidence}”</i><br />{p.doc}, p. {p.page}</p>
      {p.uncertainty && <p className="muted"><b>Uncertainty:</b> {p.uncertainty}</p>}
      <form action={decide} style={{ display: "block" }}><input type="hidden" name="id" value={p.id} />
        <label className="muted">Summary in your own words (shown publicly with the source)</label><textarea name="summary" rows={3} defaultValue={p.summary} style={{ width: "100%", margin: "6px 0 10px" }} />
        {p.evidence_verified && <button className="btn" name="do" value="approve">Approve as draft {p.kind}</button>}<button className="btn" name="do" value="reject" formNoValidate>Reject</button></form>
    </div>)}
    <Link href="/admin/books">← Books</Link>
  </section></div></main>;
}
