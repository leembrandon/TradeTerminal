import { NextResponse } from "next/server";
import { getAdmin, buildSessionCookie } from "@/lib/supabaseServer";

export async function POST(request) {
  const sb = getAdmin();
  if (!sb) return NextResponse.json({ error: "Server not configured" }, { status: 500 });

  const { email, password } = await request.json();
  if (!email || !password) {
    return NextResponse.json({ error: "Email and password required" }, { status: 400 });
  }

  const { data, error } = await sb.auth.signInWithPassword({ email, password });
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 401 });
  }

  const res = NextResponse.json({
    user: {
      id: data.user.id,
      email: data.user.email,
      user_metadata: data.user.user_metadata,
    },
  });
  res.headers.set("Set-Cookie", buildSessionCookie(data.session));
  return res;
}
