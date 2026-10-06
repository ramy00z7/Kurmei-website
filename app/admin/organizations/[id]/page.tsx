import Nav from "@/app/components/Nav"; import { notFound } from "next/navigation"; import OrgForm from "../OrgForm"; import { db } from "@/app/lib/db"; import { deleteOrganizations } from "../actions";
export const dynamic = "force-dynamic";
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params; if (!/^\d+$/.test(id)) notFound();
  const o = (await (await db()).query("select * from organizations where id=$1", [id])).rows[0]; if (!o) notFound();
  return <main className="admin"><div className="top"><div className="wrap"><Nav admin /></div></div><div className="wrap"><section className="section" style={{ maxWidth: 640 }}>
    <h1>Edit: {o.name}</h1><OrgForm o={o} />
    <form action={deleteOrganizations} style={{ marginTop: 40 }}><input type="hidden" name="id" value={o.id} /><button className="btn">Delete organization</button></form>
  </section></div></main>;
}
