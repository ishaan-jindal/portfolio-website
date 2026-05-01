// ANSI color codes for terminal output
const c = {
  reset: "\x1b[0m",
  bold: "\x1b[1m",
  dim: "\x1b[2m",
  italic: "\x1b[3m",
  underline: "\x1b[4m",

  // Colors matching the site palette
  red: "\x1b[31m",
  brightRed: "\x1b[91m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  cyan: "\x1b[36m",
  white: "\x1b[97m",
  gray: "\x1b[90m",
  brightWhite: "\x1b[1;97m",
};

// ── Figlet banner (slant font) ──────────────────────────────────────
const BANNER = `${c.brightRed}    ____     __                             ___           __      __
   /  _/____/ /_  ____ _____ _____         / (_)___  ____/ /___ _/ /
   / // ___/ __ \\/ __ \`/ __ \`/ __ \\   __  / / / __ \\/ __  / __ \`/ / 
 _/ /(__  ) / / / /_/ / /_/ / / / /  / /_/ / / / / / /_/ / /_/ / /  
/___/____/_/ /_/\\__,_/\\__,_/_/ /_/   \\____/_/_/ /_/\\__,_/\\__,_/_/   
${c.reset}`;

// ── Helpers ─────────────────────────────────────────────────────────

export function heading(text: string): string {
  return `\n${c.brightWhite}${c.underline}${text}${c.reset}\n`;
}

export function accent(text: string): string {
  return `${c.brightRed}${text}${c.reset}`;
}

export function muted(text: string): string {
  return `${c.gray}${text}${c.reset}`;
}

export function label(key: string, value: string): string {
  return `  ${c.yellow}${key}${c.reset}  ${value}`;
}

export function link(url: string): string {
  return `${c.underline}${c.cyan}${url}${c.reset}`;
}

export function bullet(text: string): string {
  return `  ${c.red}─${c.reset} ${text}`;
}

export function divider(): string {
  return `${c.gray}${"─".repeat(60)}${c.reset}`;
}

export function nav(): string {
  return [
    "",
    divider(),
    `  ${muted("Navigate:")}  ${accent("curl")} ${link("ishaanjindal.tech")}${muted("/about")}`,
    `              ${accent("curl")} ${link("ishaanjindal.tech")}${muted("/projects")}`,
    `              ${accent("curl")} ${link("ishaanjindal.tech")}${muted("/contact")}`,
    divider(),
    "",
  ].join("\n");
}

export function banner(): string {
  return BANNER;
}

export { c };
