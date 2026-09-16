import { NextResponse } from "next/server";

export async function POST(request: Request) {
  if (!request.headers.get("content-type")?.includes("application/json")) {
    return NextResponse.json({ success: false, error: "Please submit JSON." }, { status: 415 });
  }
  let payload: unknown;
  try {
    const body = await request.text();
    if (body.length > 32_000) {
      return NextResponse.json({ success: false, error: "Your message is too large." }, { status: 413 });
    }
    payload = JSON.parse(body);
  } catch {
    return NextResponse.json({ success: false, error: "Invalid JSON request." }, { status: 400 });
  }
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return NextResponse.json({ success: false, error: "Name, email, and message are required." }, { status: 400 });
  }
  const fields = payload as Record<string, unknown>;
  const name = typeof fields.name === "string" ? fields.name.trim() : "";
  const email = typeof fields.email === "string" ? fields.email.trim() : "";
  const message = typeof fields.message === "string" ? fields.message.trim() : "";
  if (!name || name.length > 100 || !message || message.length > 5000 || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ success: false, error: "Enter a name (1–100 characters), a valid email, and a message (1–5000 characters)." }, { status: 400 });
  }

  // Integration point: await server-side delivery of { name, email, message }.
  // Keep credentials in server-only environment variables. Only return
  // { success: true } with status 200 after the provider confirms acceptance.
  // Do not log or persist the submitted personal information here.
  return NextResponse.json({ success: false, error: "Message delivery is not configured yet. Your message has not been sent or stored." }, { status: 503 });
}
