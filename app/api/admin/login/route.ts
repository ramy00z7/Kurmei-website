import { NextRequest, NextResponse } from "next/server";
import { COOKIE, makeToken, passwordOk } from "@/app/lib/auth";
export async function POST(req: NextRequest) {
  const f = await req.formData();
  const ok = await passwordOk(String(f.get("password") || ""));
  const res = NextResponse.redirect(new URL(ok ? "/admin" : "/admin/login?e=1", req.url), 303);
  if (ok) res.cookies.set(COOKIE, await makeToken(), { httpOnly: true, sameSite: "strict", secure: process.env.NODE_ENV === "production", path: "/", maxAge: 28800 });
  return res;
}
