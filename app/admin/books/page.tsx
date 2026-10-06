import Link from "next/link"; import Nav from "@/app/components/Nav"; import { db } from "@/app/lib/db"; import { uploadBook } from "./actions";
export const dynamic = "force-dynamic";
export default async function Page() {
  const docs = (await (await db()).query("select id,title,author,page_count from documents order by id desc")).rows;
  return <main className="admin"><div className="top"><div className="wrap"><Nav admin /></div></div><div className="wrap"><section className="section" style={{ maxWidth: 640 }}>
    <div className="eyebrow">Book Agent</div><h1>Books</h1>
    <p className="muted">Upload a text-based PDF. The agent proposes events with page evidence; nothing goes public without your review.</p>
    <form action={uploadBook} className="form">
      <label>Title<input name="title" required /></label><label>Author<input name="author" /></label><label>Year<input name="year" /></label>
      <label>PDF (text-based; scanned PDFs need OCR first)<input name="file" type="file" accept="application/pdf" required /></label>
      <label><input type="checkbox" name="rights" style={{ display: "inline", width: "auto" }} /> I have the right to process this book</label>
      <button className="btn" style={{ marginTop: 16 }}>Upload</button></form>
    <div style={{ marginTop: 32 }}>{docs.map(d => <div className="card" key={d.id} style={{ marginBottom: 10 }}><b>{d.title}</b> <span className="muted">· {d.page_count} pages</span> <Link href={`/admin/books/${d.id}`}>Open →</Link></div>)}</div>
  </section></div></main>;
}
