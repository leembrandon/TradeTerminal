import { NextResponse } from "next/server";
import { getUser, refreshSession, buildSessionCookie } from "@/lib/supabaseServer";

export async function GET(request) {
  // First try the current token
  let user = await getUser(request);

  if (user) {
    return NextResponse.json({
      user: { id: user.id, email: user.email, user_metadata: user.user_metadata },
    });
  }

  // Token might be expired — try refreshing
  const refreshed = await refreshSession(request);
  if (refreshed?.user && refreshed?.session) {
    const res = NextResponse.json({
      user: {
        id: refreshed.user.id,
        email: refreshed.user.email,
        user_metadata: refreshed.user.user_metadata,
      },
    });
    res.headers.set("Set-Cookie", buildSessionCookie(refreshed.session));
    return res;
  }

  // No valid session
  return NextResponse.json({ user: null });
}
