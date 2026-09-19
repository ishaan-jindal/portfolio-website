import { NextRequest, NextResponse } from "next/server";
import { isTerminalClient } from "@/app/lib/is-cli";
import { banner, heading, accent, muted, label, link, divider, nav, c } from "../../cli/render";

export function GET(req: NextRequest) {
  if (!isTerminalClient(req.headers.get("user-agent"))) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  const body = [
    "",
    banner(),
    heading("Contact"),
    "",
    `  ${c.white}I'm open to internships, collaborations, and projects${c.reset}`,
    `  ${c.white}where thoughtful engineering matters.${c.reset}`,
    "",
    divider(),
    "",
    label("Email    ", link("ishaanjindal2006@gmail.com")),
    label("GitHub   ", link("https://github.com/ishaan-jindal")),
    label("LinkedIn ", link("https://linkedin.com/in/jindal-ishaan")),
    label("Web      ", link("https://ishaanjindal.tech")),
    "",
    divider(),
    "",
    `  ${muted("Or just send an email:")}`,
    "",
    `  ${c.gray}$${c.reset} ${accent("mailto:")}${c.white}ishaanjindal2006@gmail.com${c.reset}`,
    "",
    `  ${muted("Subject: Let's build something")}`,
    nav(),
  ].join("\n");

  return new NextResponse(body, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
