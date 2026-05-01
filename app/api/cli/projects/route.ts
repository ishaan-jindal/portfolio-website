import { NextRequest, NextResponse } from "next/server";
import { projects } from "@/app/lib/projects";
import { banner, heading, accent, muted, label, bullet, link, divider, nav, c } from "../../cli/render";

export function GET(req: NextRequest) {
  const body = [
    "",
    banner(),
    heading("Projects"),
    "",
    `  ${muted("Projects that prioritize curiosity, iteration, and understanding over polish")}`,
    "",
    ...projects.flatMap((p, i) => {
      const lines: string[] = [];
      lines.push(divider());
      lines.push("");
      lines.push(`  ${accent(p.asciiLabel)}  ${c.brightWhite}${p.title}${c.reset}  ${muted(`— ${p.shortTitle}`)}`);
      lines.push(`  ${c.white}${p.description}${c.reset}`);
      lines.push("");
      lines.push(`  ${muted("Stack:")} ${p.stack.map(s => accent(s)).join(` ${muted("·")} `)}`);
      lines.push("");
      if (p.highlights.length > 0) {
        p.highlights.forEach(h => lines.push(bullet(h)));
        lines.push("");
      }
      if (p.githubLink) lines.push(`  ${muted("Source:")}  ${link(p.githubLink)}`);
      if (p.liveLink)   lines.push(`  ${muted("Live:")}    ${link(p.liveLink)}`);
      lines.push("");
      return lines;
    }),
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
