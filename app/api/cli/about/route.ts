import { NextRequest, NextResponse } from "next/server";
import { isTerminalClient } from "@/app/lib/is-cli";
import { banner, heading, accent, muted, bullet, nav, c } from "../../cli/render";

export function GET(req: NextRequest) {
  if (!isTerminalClient(req.headers.get("user-agent"))) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  const skills = [
    { group: "Languages", items: "Go · TypeScript · Python · C/C++ · Dart · Bash" },
    { group: "Cloud & Containers", items: "AWS (EC2) · Oracle Cloud · GCP · Docker · Kubernetes · gVisor · Incus" },
    { group: "CI/CD & IaC", items: "GitHub Actions · Terraform" },
    { group: "Observability", items: "Prometheus · Grafana · Redis" },
    { group: "Web / Backend", items: "Node.js · REST APIs · Nginx" },
    { group: "Databases", items: "PostgreSQL · MongoDB · Firebase" },
  ];

  const body = [
    "",
    banner(),
    heading("About"),
    "",
    `  ${c.white}Infrastructure & DevOps engineer focused on container${c.reset}`,
    `  ${c.white}orchestration, deployment automation, and observability.${c.reset}`,
    "",
    `  ${muted("Building systems that scale reliably and operate")}`,
    `  ${muted("transparently under load. CS student at VIT Chennai,")}`,
    `  ${muted("Google Cloud certified (ACE), and an open-source contributor.")}`,
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
    bullet("Build systems that scale reliably and operate transparently under load"),
    bullet("Prefer structured systems, reproducible deploys, and thoughtful design"),
    bullet("Care about container orchestration, deployment automation, and observability"),
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
