import Nav from "@/app/components/Nav"; import OrgForm from "../OrgForm";
export default function Page() { return <main className="admin"><div className="top"><div className="wrap"><Nav admin /></div></div><div className="wrap"><section className="section" style={{ maxWidth: 640 }}><h1>New organization</h1><OrgForm /></section></div></main>; }
