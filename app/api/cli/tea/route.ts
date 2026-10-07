import { NextRequest, NextResponse } from "next/server";
import { isTerminalClient } from "@/app/lib/is-cli";
import { maybeSecretResponse, resolveSecretCommand } from "../secrets";

// Terminal twin of the /tea page: `curl ishaanjindal.tech/tea`
export function GET(req: NextRequest) {
  if (!isTerminalClient(req.headers.get("user-agent"))) {
    return NextResponse.redirect(new URL("/tea", req.url));
  }
  const secret = maybeSecretResponse(req);
  if (secret) return secret;
  const body = resolveSecretCommand("tea") ?? "";
  return new NextResponse(body, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
