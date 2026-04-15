import { NextResponse } from "next/server";
import { getAdmin, getUser } from "@/lib/supabaseServer";

// GET /api/learn — fetch learning progress for the current user
export async function GET(request) {
  const user = await getUser(request);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const sb = getAdmin();
  const { data, error } = await sb
    .from("learn_progress")
    .select("data")
    .eq("user_id", user.id)
    .single();

  if (error && error.code !== "PGRST116") {
    // PGRST116 = no rows found, which is fine for a new user
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data: data?.data || {} });
}

// POST /api/learn — save learning progress (full replace)
export async function POST(request) {
  const user = await getUser(request);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const sb = getAdmin();

  const { error } = await sb
    .from("learn_progress")
    .upsert(
      { user_id: user.id, data: body.data || {}, updated_at: new Date().toISOString() },
      { onConflict: "user_id" }
    );

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}

// DELETE /api/learn — reset all progress
export async function DELETE(request) {
  const user = await getUser(request);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const sb = getAdmin();
  const { error } = await sb
    .from("learn_progress")
    .delete()
    .eq("user_id", user.id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
