import { NextRequest, NextResponse } from "next/server";
import { COOKIE } from "@/app/lib/auth";
export async function POST(req: NextRequest) {
  const res = NextResponse.redirect(new URL("/admin/login", req.url), 303);
  res.cookies.delete(COOKIE);
  return res;
}
