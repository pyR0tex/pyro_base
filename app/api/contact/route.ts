import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

const deliveryError = "Something went wrong. Please try again.";

export async function POST(request: Request) {
  if (request.headers.get("content-type")?.split(";")[0].trim().toLowerCase() !== "application/json") {
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
  if (fields.website !== undefined && (typeof fields.website !== "string" || fields.website.trim() !== "")) {
    return NextResponse.json({ success: false, error: "Unable to submit this message." }, { status: 400 });
  }
  const name = typeof fields.name === "string" ? fields.name.trim() : "";
  const email = typeof fields.email === "string" ? fields.email.trim() : "";
  const message = typeof fields.message === "string" ? fields.message.trim() : "";
  if (!name || name.length > 100 || /[\r\n]/.test(name) || !message || message.length > 5000 || email.length > 254 || !/^[^\s@<>(),;:"]+@[^\s@<>(),;:"]+\.[^\s@<>(),;:"]+$/.test(email)) {
    return NextResponse.json({ success: false, error: "Enter a name (1–100 characters), a valid email, and a message (1–5000 characters)." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY?.trim();
  const to = process.env.CONTACT_EMAIL?.trim();
  const from = process.env.CONTACT_FROM_EMAIL?.trim();
  if (!apiKey || !to || !from) {
    return NextResponse.json({ success: false, error: deliveryError }, { status: 503 });
  }

  try {
    const resend = new Resend(apiKey);
    const { data, error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `pyR0tex.dev Contact — ${name}`,
      text: `New message from pyR0tex.dev\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n\n${message}`,
    });
    if (error || !data?.id) {
      return NextResponse.json({ success: false, error: deliveryError }, { status: 502 });
    }
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false, error: deliveryError }, { status: 502 });
  }
}
