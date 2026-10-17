import { NextRequest, NextResponse } from "next/server";
import { getProjects } from "@/app/lib/projects";
import { isTerminalClient } from "@/app/lib/is-cli";
import { banner, heading, accent, muted, bullet, link, divider, nav, c } from "../../cli/render";

export function GET(req: NextRequest) {
  if (!isTerminalClient(req.headers.get("user-agent"))) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  const projects = getProjects();

  const body = [
    "",
    banner(),
    heading("Projects"),
    "",
    `  ${muted("Projects that prioritize curiosity, iteration, and understanding over polish")}`,
    "",
    ...projects.flatMap((p) => {
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
