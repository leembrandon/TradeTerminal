import { NextResponse } from "next/server";
import { getAdmin, getUser } from "@/lib/supabaseServer";

// GET /api/playbooks — fetch all playbooks for the current user
export async function GET(request) {
  const user = await getUser(request);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const sb = getAdmin();
  const { data, error } = await sb
    .from("playbooks")
    .select("*")
    .eq("user_id", user.id)
    .order("updated_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data });
}

// POST /api/playbooks — upsert a playbook (create or update)
export async function POST(request) {
  const user = await getUser(request);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const sb = getAdmin();

  // Enforce user_id server-side — client can't impersonate another user
  const row = { ...body, user_id: user.id };

  const { error } = await sb.from("playbooks").upsert(row, { onConflict: "id" });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ ok: true });
}

// DELETE /api/playbooks?id=xxx — delete a playbook
export async function DELETE(request) {
  const user = await getUser(request);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  const sb = getAdmin();

  // Double-check ownership server-side (defense in depth)
  const { error } = await sb
    .from("playbooks")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
