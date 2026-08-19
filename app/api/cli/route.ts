import { NextRequest, NextResponse } from "next/server";
import { banner, heading, accent, muted, label, link, bullet, divider, nav, c } from "../cli/render";

// ── Home / root CLI response ────────────────────────────────────────
export function GET(req: NextRequest) {
  const ua = req.headers.get("user-agent") ?? "";
  const isCurl = /curl|wget|httpie|fetch|powershell/i.test(ua);

  if (!isCurl) {
    // Not a terminal client — let Next.js render the normal page
    // Returns a redirect so the page.tsx handles it
    return NextResponse.next();
  }

  const body = [
    "",
    banner(),
    `  ${c.white}Infrastructure & DevOps engineer focused on container`, 
    `  ${c.white}orchestration, deployment automation, and observability.${c.reset}`,
    "",
    divider(),
    "",
    label("Location ", "India"),
    label("Stack    ", `${accent("Go")} · ${accent("TypeScript")} · ${accent("Docker")} · ${accent("Kubernetes")} · ${accent("Terraform")}`),
    label("Focus    ", "Container orchestration, deployment automation, observability"),
    label("Status   ", `${c.green}● Available for opportunities${c.reset}`),
    "",
    label("GitHub   ", link("https://github.com/ishaan-jindal")),
    label("LinkedIn ", link("https://linkedin.com/in/jindal-ishaan")),
    label("Email    ", link("ishaanjindal2006@gmail.com")),
    label("Web      ", link("https://ishaanjindal.tech")),
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
