import { NextResponse } from "next/server";
import { getAnonClient, buildSessionCookie, getSiteUrl } from "@/lib/supabaseServer";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/";
  const siteUrl = getSiteUrl();

  if (code) {
    const sb = getAnonClient();
    if (sb) {
      const { data, error } = await sb.auth.exchangeCodeForSession(code);
      if (!error && data.session) {
        const res = NextResponse.redirect(`${siteUrl}${next}`);
        res.headers.set("Set-Cookie", buildSessionCookie(data.session));
        return res;
      }
    }
  }

  // Code exchange failed — redirect home
  return NextResponse.redirect(`${siteUrl}/`);
}
