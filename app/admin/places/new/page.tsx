import Nav from "@/app/components/Nav"; import PlaceForm from "../PlaceForm";
export default function Page() { return <main className="admin"><div className="top"><div className="wrap"><Nav admin /></div></div><div className="wrap"><section className="section" style={{ maxWidth: 640 }}><h1>New place</h1><PlaceForm /></section></div></main>; }
