import { NextResponse } from "next/server";
import { getAdmin, buildSessionCookie } from "@/lib/supabaseServer";

export async function POST(request) {
  const sb = getAdmin();
  if (!sb) return NextResponse.json({ error: "Server not configured" }, { status: 500 });

  const { accessToken, refreshToken, expiresIn } = await request.json();
  if (!accessToken || !refreshToken) {
    return NextResponse.json({ error: "Missing tokens" }, { status: 400 });
  }

  // Verify the access token is valid by fetching the user
  const { data: { user }, error } = await sb.auth.getUser(accessToken);
  if (error || !user) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }

  // Token is valid — set the httpOnly session cookie
  const session = {
    access_token: accessToken,
    refresh_token: refreshToken,
    expires_in: expiresIn || 3600,
  };

  const res = NextResponse.json({
    user: { id: user.id, email: user.email, user_metadata: user.user_metadata },
  });
  res.headers.set("Set-Cookie", buildSessionCookie(session));
  return res;
}
