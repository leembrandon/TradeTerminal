import { NextResponse } from "next/server";

export async function POST(request) {
  const apiKey = process.env.CONVERTKIT_API_KEY;
  const formId = process.env.CONVERTKIT_FORM_ID || "9328039";

  if (!apiKey) {
    return NextResponse.json({ error: "Not configured" }, { status: 500 });
  }

  const { email } = await request.json();
  if (!email || !email.includes("@")) {
    return NextResponse.json({ error: "Valid email required" }, { status: 400 });
  }

  try {
    const res = await fetch(`https://api.convertkit.com/v3/forms/${formId}/subscribe`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ api_key: apiKey, email }),
    });

    if (res.ok) {
      return NextResponse.json({ ok: true });
    } else {
      return NextResponse.json({ error: "Subscribe failed" }, { status: 502 });
    }
  } catch {
    return NextResponse.json({ error: "Subscribe failed" }, { status: 502 });
  }
}
