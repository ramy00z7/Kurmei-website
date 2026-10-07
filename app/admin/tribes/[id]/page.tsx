import Nav from "@/app/components/Nav"; import { notFound } from "next/navigation"; import TribeForm from "../TribeForm"; import { db } from "@/app/lib/db"; import { deleteTribe } from "../actions";
export const dynamic = "force-dynamic";
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params; if (!/^\d+$/.test(id)) notFound();
  const g = (await (await db()).query("select * from ethnic_groups where id=$1", [id])).rows[0]; if (!g) notFound();
  return <main className="admin"><div className="top"><div className="wrap"><Nav admin /></div></div><div className="wrap"><section className="section" style={{ maxWidth: 640 }}>
    <h1>Edit: {g.name}</h1><TribeForm g={g} />
    <form action={deleteTribe} style={{ marginTop: 40 }}><input type="hidden" name="id" value={g.id} /><button className="btn">Delete</button></form>
  </section></div></main>;
}
