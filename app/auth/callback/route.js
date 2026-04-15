import { NextResponse } from "next/server";
import { getAdmin, buildSessionCookie } from "@/lib/supabaseServer";

export async function GET(request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/";

  if (code) {
    const sb = getAdmin();
    if (sb) {
      const { data, error } = await sb.auth.exchangeCodeForSession(code);
      if (!error && data.session) {
        const res = NextResponse.redirect(`${origin}${next}`);
        res.headers.set("Set-Cookie", buildSessionCookie(data.session));
        return res;
      }
    }
  }

  return NextResponse.redirect(`${origin}/`);
}
