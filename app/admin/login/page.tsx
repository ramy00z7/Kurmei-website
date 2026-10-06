import Nav from "@/app/components/Nav";
import { configured } from "@/app/lib/auth";
export const dynamic = "force-dynamic";
export default async function Page({ searchParams }: { searchParams: Promise<{ e?: string }> }) {
  const { e } = await searchParams;
  const ok = configured();
  return <main className="admin"><div className="top"><div className="wrap"><Nav admin /></div></div><div className="wrap"><section className="section" style={{ maxWidth: 480 }}>
    <div className="eyebrow">Restricted</div><h1>Admin sign-in</h1>
    {!ok && <div className="notice"><b>Admin is locked.</b> Set ADMIN_PASSWORD and an AUTH_SECRET of 32+ characters in your environment.</div>}
    {e && ok && <div className="notice">Incorrect password.</div>}
    <form method="post" action="/api/admin/login" className="search" style={{ marginTop: 24 }}>
      <input name="password" type="password" placeholder="Password" autoComplete="current-password" required />
      <button disabled={!ok}>Sign in</button>
    </form></section></div></main>;
}
