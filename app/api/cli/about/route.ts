import { NextRequest, NextResponse } from "next/server";
import { isTerminalClient } from "@/app/lib/is-cli";
import { getSkills } from "@/app/lib/skills";
import { banner, heading, accent, muted, bullet, nav, c } from "../../cli/render";

export function GET(req: NextRequest) {
  if (!isTerminalClient(req.headers.get("user-agent"))) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  const skills = getSkills();

  const body = [
    "",
    banner(),
    heading("About"),
    "",
    `  ${c.white}Software developer building terminal tools, mobile apps,${c.reset}`,
    `  ${c.white}web experiments, and the infrastructure behind them.${c.reset}`,
    "",
    `  ${muted("Most of what I make ends up open source.")}`,
    "",
    heading("Skills"),
    "",
    ...skills.flatMap((s) => [
      `  ${accent(s.label)}`,
      `  ${c.white}${s.items.join(" · ")}${c.reset}`,
      "",
    ]),
    heading("Philosophy"),
    "",
    bullet("Build things end to end — from interface to infrastructure"),
    bullet("Prefer structured systems, reproducible deploys, and thoughtful design"),
    bullet("Ship tools that feel simple, efficient, and intentional"),
    bullet("Stay curious — terminals, browsers, phones; whatever the idea needs"),
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
