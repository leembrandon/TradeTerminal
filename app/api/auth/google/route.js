import { NextResponse } from "next/server";
import { getAdmin, getSiteUrl } from "@/lib/supabaseServer";

export async function POST(request) {
  const sb = getAdmin();
  if (!sb) return NextResponse.json({ error: "Server not configured" }, { status: 500 });

  const siteUrl = getSiteUrl();

  const { data, error } = await sb.auth.signInWithOAuth({
    provider: "google",
    options: { redirectTo: `${siteUrl}/auth/callback` },
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  // Return the OAuth URL for the browser to redirect to
  return NextResponse.json({ url: data.url });
}
