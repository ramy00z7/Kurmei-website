import Link from "next/link"; import { notFound } from "next/navigation"; import Nav from "@/app/components/Nav"; import { db } from "@/app/lib/db"; import { runAgent, purgeText } from "../actions";
export const dynamic = "force-dynamic";
export default async function Page({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<Record<string, string>> }) {
  const { id } = await params; const sp = await searchParams; if (!/^\d+$/.test(id)) notFound();
  const q = await db(); const d = (await q.query("select * from documents where id=$1", [id])).rows[0]; if (!d) notFound();
  const s = (await q.query("select count(*)::int total, count(*) filter (where not processed and length(text)<30)::int empty, count(*) filter (where processed)::int done from document_pages where doc_id=$1", [id])).rows[0];
  const pend = (await q.query("select count(*)::int n from proposals where doc_id=$1 and status='pending'", [id])).rows[0].n;
  return <main className="admin"><div className="top"><div className="wrap"><Nav admin /></div></div><div className="wrap"><section className="section" style={{ maxWidth: 640 }}>
    <h1>{d.title}</h1><p className="muted">{s.total} pages · {s.done} processed · {s.empty} with no text (may need OCR) · {pend} proposals pending</p>
    {sp.m === "nokey" && <div className="notice">Set LLM_API_KEY in your environment to run the agent.</div>}
    {sp.m === "ran" && <div className="notice">Run finished: {sp.n} proposals created, {sp.f} pages failed (they stay unprocessed and can be retried).</div>}
    <form action={runAgent}><input type="hidden" name="id" value={d.id} /><button className="btn">Run agent on next 5 pages</button></form>
    {sp.m === "purged" && <div className="notice">Stored book text deleted.</div>}
    <p className="muted" style={{ marginTop: 16 }}>Page text is kept only until a page is processed, then deleted. Kurmei stores summaries and page citations, not the book.</p>
    <form action={purgeText}><input type="hidden" name="id" value={d.id} /><button className="btn">Delete all stored book text now</button></form>
    <p style={{ marginTop: 20 }}><Link href="/admin/review">Open review queue →</Link></p>
  </section></div></main>;
}
