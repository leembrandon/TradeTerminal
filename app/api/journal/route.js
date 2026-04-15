import { NextResponse } from "next/server";
import { getAdmin, getUser } from "@/lib/supabaseServer";

// GET /api/journal — fetch all sessions for the current user
export async function GET(request) {
  const user = await getUser(request);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const sb = getAdmin();
  const { data, error } = await sb
    .from("journal_sessions")
    .select("*")
    .eq("user_id", user.id)
    .order("date", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data });
}

// POST /api/journal — upsert a session
export async function POST(request) {
  const user = await getUser(request);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const sb = getAdmin();

  const row = { ...body, user_id: user.id };

  const { error } = await sb.from("journal_sessions").upsert(row, { onConflict: "id" });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ ok: true });
}

// DELETE /api/journal?id=xxx — delete a session
export async function DELETE(request) {
  const user = await getUser(request);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  const sb = getAdmin();

  const { error } = await sb
    .from("journal_sessions")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
