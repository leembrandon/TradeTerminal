import { createClient } from "@supabase/supabase-js";

// Server-only Supabase admin client.
// Uses SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY (no NEXT_PUBLIC_ prefix = never in client JS).
// This bypasses RLS — we verify users ourselves via their session cookie.

const url = process.env.SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export function getAdmin() {
  if (!url || !serviceKey) return null;
  return createClient(url, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

// Verify the access token from the session cookie and return the user.
export async function getUser(request) {
  const cookie = parseCookie(request, "tt_session");
  if (!cookie) return null;

  try {
    const { accessToken } = JSON.parse(decodeURIComponent(cookie));
    if (!accessToken) return null;

    const sb = getAdmin();
    if (!sb) return null;

    const { data: { user }, error } = await sb.auth.getUser(accessToken);
    if (error || !user) return null;
    return user;
  } catch {
    return null;
  }
}

// Build a Set-Cookie header for the session token (httpOnly, secure, sameSite).
export function buildSessionCookie(session) {
  if (!session) {
    return "tt_session=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0";
  }
  const value = JSON.stringify({
    accessToken: session.access_token,
    refreshToken: session.refresh_token,
  });
  const maxAge = 60 * 60 * 24 * 30; // 30 days — refresh token keeps session alive
  const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";
  return `tt_session=${encodeURIComponent(value)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${maxAge}${secure}`;
}

// Refresh the session using the refresh token and return new data.
export async function refreshSession(request) {
  const cookie = parseCookie(request, "tt_session");
  if (!cookie) return null;

  try {
    const { refreshToken } = JSON.parse(decodeURIComponent(cookie));
    if (!refreshToken) return null;

    const sb = getAdmin();
    if (!sb) return null;

    const { data, error } = await sb.auth.refreshSession({ refresh_token: refreshToken });
    if (error || !data.session) return null;
    return data;
  } catch {
    return null;
  }
}

// Helper: parse a named cookie from the request
function parseCookie(request, name) {
  // Next.js request object
  if (request.cookies?.get) {
    return request.cookies.get(name)?.value || null;
  }
  // Fallback: raw header
  const header = request.headers?.get?.("cookie") || "";
  const match = header.match(new RegExp(`(?:^|;\\s*)${name}=([^;]*)`));
  return match ? match[1] : null;
}
