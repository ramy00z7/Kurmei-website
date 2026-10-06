"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { extractText, getDocumentProxy } from "unpdf";
import { db } from "@/app/lib/db";
import { COOKIE, verifyToken } from "@/app/lib/auth";
import { deriveYear } from "@/app/lib/enums";
import { extractPage, verify, overlaps, llmConfigured } from "@/app/lib/agent";

async function guard() { if (!(await verifyToken((await cookies()).get(COOKIE)?.value))) throw new Error("Unauthorized"); }
export async function uploadBook(f: FormData) {
  await guard();
  const file = f.get("file"); const title = String(f.get("title") || "").trim();
  if (!(file instanceof File) || !title) throw new Error("Title and PDF required");
  if (f.get("rights") !== "on") throw new Error("Confirm you have the right to process this book");
  const buf = new Uint8Array(await file.arrayBuffer());
  if (String.fromCharCode(...buf.slice(0, 5)) !== "%PDF-") throw new Error("Not a PDF");
  const { text } = await extractText(await getDocumentProxy(buf), { mergePages: false });
  const q = await db();
  const id = (await q.query("insert into documents(title,author,year,rights_confirmed,page_count) values($1,$2,$3,true,$4) returning id", [title, String(f.get("author") || ""), String(f.get("year") || ""), text.length])).rows[0].id;
  for (let i = 0; i < text.length; i++) await q.query("insert into document_pages(doc_id,page,text) values($1,$2,$3)", [id, i + 1, text[i]]);
  await q.query("insert into audit_log(action,entity,entity_id) values('upload','document',$1)", [id]);
  redirect(`/admin/books/${id}`);
}
const slugify = (t: string, fallback = "item") => t.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 60) || fallback;
export async function runAgent(f: FormData) {
  await guard(); const id = Number(f.get("id")); const q = await db();
  if (!llmConfigured()) redirect(`/admin/books/${id}?m=nokey`);
  const pages = (await q.query("select page,text from document_pages where doc_id=$1 and not processed and length(text)>=30 order by page limit 5", [id])).rows;
  let made = 0, failed = 0;
  for (const p of pages) {
    try {
      for (const x of await extractPage(p.text)) {
        const copied = overlaps(x.summary, p.text);
        const dupTable = x.kind === "person" ? "people" : x.kind === "organization" ? "organizations" : "events";
        const dupCol = x.kind === "event" ? "title" : "name";
        const dup = (await q.query(`select id from ${dupTable} where lower(${dupCol})=lower($1) or slug=$2 limit 1`, [x.title, slugify(x.title, x.kind)])).rows[0]?.id ?? null;
        await q.query("insert into proposals(doc_id,page,kind,title,date_label,date_precision,place,summary,evidence,evidence_verified,confidence,uncertainty,duplicate_of,summary_copied) values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)",
          [id, p.page, x.kind, x.title, x.date_label, x.date_precision, x.place, copied ? "" : x.summary, x.evidence, verify(x.evidence, p.text), x.confidence, x.uncertainty, dup, copied]);
        made++;
      }
      await q.query("update document_pages set processed=true, text='' where doc_id=$1 and page=$2", [id, p.page]);
    } catch { failed++; }
  }
  redirect(`/admin/books/${id}?m=ran&n=${made}&f=${failed}`);
}
/** Approving never publishes: it creates a DRAFT event/person/organization; provenance stays in the proposal row. */
export async function decide(f: FormData) {
  await guard(); const id = Number(f.get("id")); const q = await db();
  const p = (await q.query("select * from proposals where id=$1 and status='pending'", [id])).rows[0]; if (!p) redirect("/admin/review");
  if (f.get("do") === "approve") {
    if (!p.evidence_verified) throw new Error("Evidence was not found verbatim on the page; cannot approve");
    const summary = String(f.get("summary") || "").trim(); if (!summary) throw new Error("Write a summary in your own words before approving");
    const table = p.kind === "person" ? "people" : p.kind === "organization" ? "organizations" : "events";
    const citeTable = p.kind === "person" ? "person_citations" : p.kind === "organization" ? "organization_citations" : "event_citations";
    const citeCol = p.kind === "person" ? "person_id" : p.kind === "organization" ? "organization_id" : "event_id";
    let slug = slugify(p.title, p.kind), n = 2; while ((await q.query(`select 1 from ${table} where slug=$1`, [slug])).rows.length) slug = `${slugify(p.title, p.kind)}-${n++}`;
    let newId: number;
    if (p.kind === "person") newId = (await q.query("insert into people(slug,name,summary,life_span,role,status) values($1,$2,$3,$4,$5,$6) returning id", [slug, p.title, summary, p.date_label || "", "", "draft"])).rows[0].id;
    else if (p.kind === "organization") newId = (await q.query("insert into organizations(slug,name,summary,founded_label,kind,status) values($1,$2,$3,$4,$5,$6) returning id", [slug, p.title, summary, p.date_label || "", "", "draft"])).rows[0].id;
    else newId = (await q.query("insert into events(slug,title,summary,date_label,date_precision,place,location_precision,status,sort_year) values($1,$2,$3,$4,$5,$6,'unknown','draft',$7) returning id", [slug, p.title, summary, p.date_label || "Unknown", p.date_precision, p.place, deriveYear(p.date_label || "")])).rows[0].id;
    await q.query("update proposals set status='approved', event_id=$2, summary=$3, evidence='' where id=$1", [id, p.kind === "event" ? newId : null, summary]);
    await q.query(`insert into ${citeTable}(${citeCol},doc_id,page) values($1,$2,$3)`, [newId, p.doc_id, p.page]);
    await q.query("insert into audit_log(action,entity,entity_id,detail) values('approve_proposal',$1,$2,$3)", [p.kind, newId, JSON.stringify({ proposal: id, doc: p.doc_id, page: p.page })]);
  } else {
    await q.query("update proposals set status='rejected', evidence='' where id=$1", [id]);
    await q.query("insert into audit_log(action,entity,entity_id) values('reject_proposal','proposal',$1)", [id]);
  }
  redirect("/admin/review");
}
export async function purgeText(f: FormData) {
  await guard(); const id = Number(f.get("id"));
  await (await db()).query("update document_pages set text='' where doc_id=$1", [id]);
  redirect(`/admin/books/${id}?m=purged`);
}
