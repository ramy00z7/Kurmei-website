import Nav from "@/app/components/Nav"; import PersonForm from "../PersonForm";
export default function Page() { return <main className="admin"><div className="top"><div className="wrap"><Nav admin /></div></div><div className="wrap"><section className="section" style={{ maxWidth: 640 }}><h1>New person</h1><PersonForm /></section></div></main>; }
