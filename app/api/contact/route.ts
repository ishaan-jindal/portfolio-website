import { NextRequest, NextResponse } from "next/server";
import { rateLimit } from "@/app/lib/rate-limit";

const EMAILJS_API = "https://api.emailjs.com/api/v1.0/email/send";

const CONTACT_LIMIT = { name: "contact", windowMs: 10 * 60 * 1000, max: 5 };
const MAX_MESSAGE_LENGTH = 5000;

export async function POST(req: NextRequest) {
  const limited = rateLimit(req, CONTACT_LIMIT);
  if (!limited.allowed) {
    return NextResponse.json(
      { error: "Too many messages. Please try again later." },
      {
        status: 429,
        headers: { "Retry-After": String(limited.retryAfterSeconds) },
      }
    );
  }

  let body: {
    name?: unknown;
    email?: unknown;
    message?: unknown;
    website?: unknown;
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  // Honeypot — bots fill this hidden field; silently pretend it worked
  if (typeof body.website === "string" && body.website.length > 0) {
    return NextResponse.json({ success: true });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const message =
    typeof body.message === "string" ? body.message.trim() : "";

  if (name.length === 0 || name.length > 100) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }

  if (email.length === 0 || email.length > 254 || !isValidEmail(email)) {
    return NextResponse.json(
      { error: "A valid email is required" },
      { status: 400 }
    );
  }

  if (message.length === 0 || message.length > MAX_MESSAGE_LENGTH) {
    return NextResponse.json(
      { error: "Message is required" },
      { status: 400 }
    );
  }

  try {
    const emailRes = await fetch(EMAILJS_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        service_id: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        template_id: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        user_id: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
        template_params: { name, email, message },
      }),
    });

    if (!emailRes.ok) {
      console.error(
        "[contact] EmailJS error:",
        emailRes.status,
        await emailRes.text()
      );
      return NextResponse.json(
        { error: "Message could not be sent" },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[contact] EmailJS request failed:", err);
    return NextResponse.json(
      { error: "Message could not be sent" },
      { status: 502 }
    );
  }
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}