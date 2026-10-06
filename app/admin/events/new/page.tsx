import Nav from "@/app/components/Nav"; import EventForm from "../EventForm";
export default function Page() { return <main className="admin"><div className="top"><div className="wrap"><Nav admin /></div></div><div className="wrap"><section className="section" style={{ maxWidth: 640 }}><h1>New event</h1><EventForm /></section></div></main>; }
