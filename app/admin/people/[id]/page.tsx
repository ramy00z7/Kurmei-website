import Nav from "@/app/components/Nav"; import { notFound } from "next/navigation"; import PersonForm from "../PersonForm"; import { db } from "@/app/lib/db"; import { deletePeople } from "../actions";
export const dynamic = "force-dynamic";
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params; if (!/^\d+$/.test(id)) notFound();
  const p = (await (await db()).query("select * from people where id=$1", [id])).rows[0]; if (!p) notFound();
  return <main className="admin"><div className="top"><div className="wrap"><Nav admin /></div></div><div className="wrap"><section className="section" style={{ maxWidth: 640 }}>
    <h1>Edit: {p.name}</h1><PersonForm p={p} />
    <form action={deletePeople} style={{ marginTop: 40 }}><input type="hidden" name="id" value={p.id} /><button className="btn">Delete person</button></form>
  </section></div></main>;
}
