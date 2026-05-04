import { NextRequest, NextResponse } from "next/server";
import { banner, heading, accent, muted, link, divider, nav, c } from "../render";

export function GET(req: NextRequest) {
  const pathname = req.headers.get("x-cli-path") ?? req.nextUrl.searchParams.get("path") ?? "/unknown";

  const body = [
    "",
    banner(),
    heading("404 — Not Found"),
    "",
    `  ${c.white}There's nothing at ${accent(pathname)}${c.reset}`,
    "",
    `  ${muted("Maybe you meant one of these?")}`,
    "",
    `  ${accent("curl")} ${link("ishaanjindal.tech")}            ${muted("— home")}`,
    `  ${accent("curl")} ${link("ishaanjindal.tech")}${muted("/about")}      ${muted("— about me")}`,
    `  ${accent("curl")} ${link("ishaanjindal.tech")}${muted("/projects")}   ${muted("— project list")}`,
    `  ${accent("curl")} ${link("ishaanjindal.tech")}${muted("/contact")}    ${muted("— get in touch")}`,
    nav(),
  ].join("\n");

  return new NextResponse(body, {
    status: 404,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
