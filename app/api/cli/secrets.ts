// Hidden terminal commands — easter eggs for the curious.
// Served via `?cmd=` on any /api/cli/* route, e.g.
//   curl "https://ishaanjindal.tech/api/cli?cmd=sudo"
// On-brand, witty, zero secrets. Keep responses short: terminals scroll.

import { NextResponse } from "next/server";
import {
  accent,
  banner,
  c,
  divider,
  link,
  muted,
  nav,
} from "./render";

function wrap(lines: string[]): string {
  return ["", banner(), ...lines, nav()].join("\n");
}

function sudo(raw: string): string {
  const rest = raw.trim().replace(/^sudo\b/i, "").trim();
  const lower = rest.toLowerCase();

  if (/sandwich/i.test(raw)) {
    return wrap([
      "",
      `  ${c.white}okay. one sandwich, extra mustard.${c.reset}`,
      `  ${muted("pick it up at:")} ${link("https://ishaanjindal.tech/#contact")}`,
      "",
    ]);
  }
  // Second-guess common forms before subcommand dispatch.
  if (!rest) {
    return wrap([
      "",
      `  ${accent("sudo")}${c.white}: user "guest" is not in the sudoers file.${c.reset}`,
      `  ${muted("this incident will be reported — to the /tea room.")}`,
      "",
      `  ${muted("tip:")} ${accent("curl")} ${link("ishaanjindal.tech/tea")} ${muted("instead")}`,
      "",
    ]);
  }
  if (/^sudo\b/.test(lower)) {
    return wrap([
      "",
      `  ${accent("sudo sudo")}${c.white}: recursion detected. the sudoers file felt that.${c.reset}`,
      `  ${muted("one sudo per customer. try a real subcommand: whoami | hack | tea")}`,
      "",
    ]);
  }
  if (/\bplease\b/.test(lower)) {
    return wrap([
      "",
      `  ${c.white}manners noticed. privileges still denied.${c.reset}`,
      `  ${muted('"please" is not in the sudoers file either. try /contact like everyone else.')}`,
      "",
    ]);
  }
  if (/rm\s+-rf/.test(lower)) {
    return wrap([
      "",
      `  ${accent("sudo rm -rf")}${c.white}: nice try — even root gets a no here.${c.reset}`,
      `  ${muted("this portfolio is backed up in at least 3 places. your courage: /dev/null.")}`,
      "",
    ]);
  }
  if (/\bwhoami\b/.test(lower)) {
    return wrap([
      "",
      `  ${c.white}root — oh wait, that's me. you're still guest.${c.reset}`,
      `  ${muted("root reveal: all this power and you'd spend it on whoami? respect.")}`,
      "",
    ]);
  }
  if (/hack/.test(lower)) {
    return wrap([
      "",
      `  ${c.green}ROOT HACK SEQUENCE… escalated.${c.reset}`,
      "",
      `  ${muted("$ ./exploit.sh --target mainframe --as-root")}`,
      `  ${muted("  └─ ACCESS GRANTED… to a folder of tea recipes and /contact")}`,
      "",
      `  ${accent("hack complete:")} ${c.white}even as root, all roads lead to hiring ishaan.${c.reset}`,
      "",
    ]);
  }
  if (/matrix/.test(lower)) {
    return wrap([
      "",
      `  ${c.green}root sees the source: green rain, zero radius.${c.reset}`,
      `  ${c.white}you are the one — with sudo. the architect renders in dark swiss.${c.reset}`,
      "",
      `  ${muted("take the red pill:")} ${accent("curl")} ${link("ishaanjindal.tech/matrix")}`,
      "",
    ]);
  }
  if (/\btea\b/.test(lower) || /\bchai\b/.test(lower)) {
    return wrap([
      "",
      `  ${c.white}brewing imperial-grade tea… clearance: earl grey.${c.reset}`,
      `  ${muted("double-steeped. served in a root-only cup. tabs still win.")}`,
      "",
      `  ${muted("proper ceremony lives at:")} ${accent("curl")} ${link("ishaanjindal.tech/tea")}`,
      "",
    ]);
  }
  if (/\bapt\b|\binstall\b|\bhire\b/.test(lower)) {
    return wrap([
      "",
      `  ${muted("$ sudo apt install ishaan")}`,
      `  ${muted("  └─ reading résumés… done / building offer… done")}`,
      `  ${muted("  └─ setting up ishaan (senior-1.0)… hired.")}`,
      "",
      `  ${muted("installed to:")} ${link("https://ishaanjindal.tech/contact")}`,
      "",
    ]);
  }
  const word = rest.split(/\s+/)[0] ?? rest;
  return wrap([
    "",
    `  ${accent("sudo")}${c.white}: ${word}: command not found (even as root).${c.reset}`,
    "",
    `  ${muted("hint:")} ${accent("curl")} ${link("ishaanjindal.tech/api/cli?cmd=help")}`,
    "",
  ]);
}

function vim(cmd: string): string {
  const editor = /emacs/i.test(cmd) ? "emacs" : "vim";
  return wrap([
    "",
    `  ${c.white}you opened ${accent(editor)} inside curl.${c.reset}`,
    `  ${c.white}there is no escape. there never was. (:q! won't save you here)${c.reset}`,
    "",
    `  ${muted("meanwhile, in a real editor:")} ${link("https://github.com/ishaan-jindal")}`,
    "",
  ]);
}

function rmrf(): string {
  return wrap([
    "",
      `  ${accent("rm -rf /")}${c.white}: permission denied (and good instincts denied).${c.reset}`,
    `  ${muted("this portfolio is backed up in at least 3 places.")}`,
    `  ${muted("your courage has been logged to /dev/null.")}`,
    "",
  ]);
}

function hack(): string {
  const rows = [
    "$ nmap -sS ishaanjindal.tech",
    "  └─ 1 open port: 443 (charm)",
    "$ hydra -l guest -P vibes.txt portfolio",
    "  └─ password found: \"hire-ishaan\"",
    "$ ./exploit.sh --target mainframe",
    "  └─ ACCESS DENIED: firewall runs on tea (see /tea)",
    "$ trace --reverse",
    "  └─ traced you to… this terminal. hi.",
  ];
  return wrap([
    "",
    `  ${c.green}INITIATING HACK SEQUENCE…${c.reset}`,
    "",
    ...rows.map((r) => `  ${muted(r)}`),
    "",
    `  ${accent("hack complete:")} ${c.white}you found nothing but good design.${c.reset}`,
    "",
  ]);
}

function matrix(): string {
  return wrap([
    "",
    `  ${c.green}wake up, neo…${c.reset}`,
    `  ${c.white}the matrix has you — but it renders in dark swiss, zero radius.${c.reset}`,
    "",
    `  ${muted("take the red pill:")} ${accent("curl")} ${link("ishaanjindal.tech/matrix")}`,
    `  ${muted("take the blue pill: back to")} ${link("https://ishaanjindal.tech")}`,
    "",
  ]);
}

function tea(): string {
  return wrap([
    "",
    `  ${c.white}brewing…${c.reset}  ${accent("~/tea --steep 3min")}`,
    "",
    `  ${muted("earl grey. no sugar. strong opinions about tabs vs spaces: tabs.")}`,
    "",
    `  ${muted("proper ceremony lives at:")} ${accent("curl")} ${link("ishaanjindal.tech/tea")}`,
    "",
  ]);
}

function whoami(): string {
  return wrap([
    "",
    `  ${c.white}guest — but a guest with taste. you use curl to read portfolios.${c.reset}`,
    `  ${muted("ishaan is:")} ${c.white}software developer, india. builds terminals, apps, infra.${c.reset}`,
    "",
  ]);
}

function help(): string {
  return wrap([
    "",
    `  ${c.brightWhite} available routes ${c.reset}`,
    `  ${accent("curl")} ${link("ishaanjindal.tech")}            ${muted("# home")}`,
    `  ${accent("curl")} ${link("ishaanjindal.tech")}${muted("/about")}     ${muted("# skills + philosophy")}`,
    `  ${accent("curl")} ${link("ishaanjindal.tech")}${muted("/projects")}  ${muted("# the work")}`,
    `  ${accent("curl")} ${link("ishaanjindal.tech")}${muted("/contact")}   ${muted("# say hi")}`,
    "",
    `  ${c.brightWhite} hidden flags ${c.reset} ${muted("(rumored)")}`,
    `  ${muted("?cmd=sudo | vim | emacs | rm -rf / | hack | matrix | tea | whoami | 1337")}`,
    "",
  ]);
}

function leet(): string {
  return wrap([
    "",
    `  ${accent("1337")}${c.white}: elite status confirmed.${c.reset}`,
    `  ${muted("you type konami codes for fun. the browser build has one too.")}`,
    `  ${muted("hint for the graphical world:")} ${link("https://ishaanjindal.tech")} ${muted("→ ↑↑↓↓←→←→BA")}`,
    "",
  ]);
}

/** Resolve a secret `?cmd=` value to a full text/plain body, or null. */
export function resolveSecretCommand(raw: string | null): string | null {
  if (!raw) return null;
  const cmd = raw.trim().toLowerCase();
  if (!cmd) return null;
  if (cmd.startsWith("sudo")) return sudo(raw);
  if (/\bvim?\b/.test(cmd) || cmd === "vi" || cmd.startsWith("vim")) return vim(raw);
  if (/emacs/.test(cmd)) return vim(raw);
  if (/rm\s+-rf/.test(cmd)) return rmrf();
  if (/hack/.test(cmd)) return hack();
  if (/matrix/.test(cmd)) return matrix();
  if (/\btea\b/.test(cmd) || cmd === "chai") return tea();
  if (/whoami/.test(cmd)) return whoami();
  if (/^(help|--help|-h)$/.test(cmd)) return help();
  if (/1337|l33t|elite/.test(cmd)) return leet();
  if (/^(exit|quit|logout)$/.test(cmd)) {
    return wrap([
      "",
      `  ${c.white}there is no escape. the terminal is a state of mind.${c.reset}`,
      "",
      divider(),
      "",
    ]);
  }
  return null;
}

function secretResponse(body: string): NextResponse {
  return new NextResponse(body, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}

/**
 * Check `?cmd=` on a CLI request. Returns a secret response when the value
 * matches a hidden command, else null so the route renders normally.
 */
export function maybeSecretResponse(req: Request): NextResponse | null {
  const cmd = new URL(req.url).searchParams.get("cmd");
  const body = resolveSecretCommand(cmd);
  if (!body) return null;
  return secretResponse(body);
}
