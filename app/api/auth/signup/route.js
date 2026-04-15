import { NextResponse } from "next/server";
import { getAdmin } from "@/lib/supabaseServer";

export async function POST(request) {
  const sb = getAdmin();
  if (!sb) return NextResponse.json({ error: "Server not configured" }, { status: 500 });

  const { email, password } = await request.json();
  if (!email || !password) {
    return NextResponse.json({ error: "Email and password required" }, { status: 400 });
  }

  const origin = request.headers.get("origin") || "";

  const { data, error } = await sb.auth.signUp({
    email,
    password,
    options: { emailRedirectTo: `${origin}/auth/callback` },
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ message: "Check your email for a confirmation link." });
}
