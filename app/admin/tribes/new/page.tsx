import Nav from "@/app/components/Nav"; import TribeForm from "../TribeForm";
export default function Page() { return <main className="admin"><div className="top"><div className="wrap"><Nav admin /></div></div><div className="wrap"><section className="section" style={{ maxWidth: 640 }}><h1>New people / tribe</h1><TribeForm /></section></div></main>; }
