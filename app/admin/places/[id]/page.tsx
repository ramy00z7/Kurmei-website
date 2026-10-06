import Nav from "@/app/components/Nav"; import { notFound } from "next/navigation"; import PlaceForm from "../PlaceForm"; import { db } from "@/app/lib/db"; import { deletePlaces } from "../actions";
export const dynamic = "force-dynamic";
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params; if (!/^\d+$/.test(id)) notFound();
  const p = (await (await db()).query("select * from places where id=$1", [id])).rows[0]; if (!p) notFound();
  return <main className="admin"><div className="top"><div className="wrap"><Nav admin /></div></div><div className="wrap"><section className="section" style={{ maxWidth: 640 }}>
    <h1>Edit: {p.name}</h1><PlaceForm p={p} />
    <form action={deletePlaces} style={{ marginTop: 40 }}><input type="hidden" name="id" value={p.id} /><button className="btn">Delete place</button></form>
  </section></div></main>;
}
