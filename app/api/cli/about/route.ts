import { NextRequest, NextResponse } from "next/server";
import { banner, heading, accent, muted, label, bullet, divider, nav, c } from "../../cli/render";

export function GET(req: NextRequest) {
  const skills = [
    { group: "Languages",  items: "Dart · TypeScript · JavaScript · Kotlin · Java · C/C++" },
    { group: "Build Stack", items: "Flutter · GetX · Firebase · Supabase · Hive · Node.js · Next.js" },
    { group: "Systems",     items: "Clean Architecture · Offline-first · Docker · Linux · Redis · Prometheus" },
  ];

  const body = [
    "",
    banner(),
    heading("About"),
    "",
    `  ${c.white}I'm a CS student who enjoys building software that feels clean,${c.reset}`,
    `  ${c.white}efficient, and technically satisfying.${c.reset}`,
    "",
    `  ${muted("I prefer structured systems over quick fixes and projects that")}`,
    `  ${muted("teach me something new — whether that means solving unusual")}`,
    `  ${muted("problems or exploring unfamiliar territory.")}`,
    "",
    heading("Skills"),
    "",
    ...skills.flatMap(s => [
      `  ${accent(s.group)}`,
      `  ${c.white}${s.items}${c.reset}`,
      "",
    ]),
    heading("Philosophy"),
    "",
    bullet("Build things that feel clean, minimal, and technically interesting"),
    bullet("Prefer structured systems and thoughtful design"),
    bullet("Enjoy experimental ideas and solving unusual problems"),
    bullet("Create tools that feel simple, efficient, and intentional"),
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
