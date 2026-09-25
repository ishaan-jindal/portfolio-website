import { NextRequest, NextResponse } from "next/server";
import { isTerminalClient } from "@/app/lib/is-cli";
import { resolveSecretCommand } from "../secrets";

// Terminal twin of the /matrix page: `curl ishaanjindal.tech/matrix`
export function GET(req: NextRequest) {
  if (!isTerminalClient(req.headers.get("user-agent"))) {
    return NextResponse.redirect(new URL("/matrix", req.url));
  }
  const body = resolveSecretCommand("matrix") ?? "";
  return new NextResponse(body, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
