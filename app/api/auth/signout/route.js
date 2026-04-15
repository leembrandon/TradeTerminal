import { NextResponse } from "next/server";
import { buildSessionCookie } from "@/lib/supabaseServer";

export async function POST() {
  const res = NextResponse.json({ ok: true });
  res.headers.set("Set-Cookie", buildSessionCookie(null));
  return res;
}
