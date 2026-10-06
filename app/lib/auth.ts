const enc = new TextEncoder();
export const COOKIE = "kurmei_admin";
async function sign(msg: string) {
  const k = await crypto.subtle.importKey("raw", enc.encode(process.env.AUTH_SECRET || ""), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const b = await crypto.subtle.sign("HMAC", k, enc.encode(msg));
  return Array.from(new Uint8Array(b)).map(x => x.toString(16).padStart(2, "0")).join("");
}
function safeEq(a: string, b: string) {
  if (a.length !== b.length) return false;
  let r = 0; for (let i = 0; i < a.length; i++) r |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return r === 0;
}
/** Fails closed: admin stays locked unless both env vars are set. */
export const configured = () => !!process.env.ADMIN_PASSWORD && (process.env.AUTH_SECRET || "").length >= 32;
export async function passwordOk(p: string) {
  return configured() && safeEq(await sign("pw:" + p), await sign("pw:" + process.env.ADMIN_PASSWORD));
}
export async function makeToken() { const exp = String(Date.now() + 8 * 3600e3); return `${exp}.${await sign(exp)}`; }
export async function verifyToken(t?: string) {
  if (!t || !configured()) return false;
  const [exp, sig] = t.split(".");
  return !!exp && !!sig && Number(exp) > Date.now() && safeEq(sig, await sign(exp));
}
