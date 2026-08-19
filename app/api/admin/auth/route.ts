import { NextRequest, NextResponse } from "next/server";
import { verifyPassword, createSession, destroySession } from "@/app/lib/auth";
import { rateLimit } from "@/app/lib/rate-limit";

const LOGIN_LIMIT = { name: "admin-login", windowMs: 15 * 60 * 1000, max: 5 };

export async function POST(req: NextRequest) {
  try {
    const { password, action } = await req.json();

    // Logout
    if (action === "logout") {
      await destroySession();
      return NextResponse.json({ success: true });
    }

    // Login — brute-force protection
    const limited = rateLimit(req, LOGIN_LIMIT);
    if (!limited.allowed) {
      return NextResponse.json(
        { error: "Too many attempts. Try again later." },
        {
          status: 429,
          headers: { "Retry-After": String(limited.retryAfterSeconds) },
        }
      );
    }

    if (!password) {
      return NextResponse.json(
        { error: "Password required" },
        { status: 400 }
      );
    }

    const valid = await verifyPassword(password);
    if (!valid) {
      return NextResponse.json(
        { error: "Invalid password" },
        { status: 401 }
      );
    }

    await createSession();
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
