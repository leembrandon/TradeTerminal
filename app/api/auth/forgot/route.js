import { NextResponse } from "next/server";
import { getAdmin } from "@/lib/supabaseServer";

export async function POST(request) {
  const sb = getAdmin();
  if (!sb) return NextResponse.json({ error: "Server not configured" }, { status: 500 });

  const { email } = await request.json();
  if (!email) return NextResponse.json({ error: "Email required" }, { status: 400 });

  const origin = request.headers.get("origin") || "";

  const { error } = await sb.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback`,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ message: "Check your email for a password reset link." });
}
