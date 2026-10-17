"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const BANNER = `
 %c ISHAAN JINDAL — portfolio v2.6.0
 %c build: terminals · apps · infra · tea
`;

declare global {
  interface Window {
    __ishaan?: {
      help: () => string;
      whoami: () => string;
      tea: () => string;
      matrix: () => string;
      konami: () => string;
    };
  }
}

const SPELLS: Record<string, { hint: string; reply: string; route?: string }> = {
  whoami: {
    hint: "who runs this thing",
    reply:
      "ishaan jindal — software developer (india). terminals, apps, infra. hire him maybe?",
  },
  tea: { hint: "the /tea room", reply: "brewing…", route: "/tea" },
  matrix: {
    hint: "there is no spoon (there is a /matrix)",
    reply: "follow the white rabbit.",
    route: "/matrix",
  },
  konami: {
    hint: "the old ways still work: ↑↑↓↓←→←→BA",
    reply:
      "↑↑↓↓←→←→BA — type it anywhere (outside inputs). also try typing: 1337, tea, sudo.",
  },
};

const HELP = [
  "available spells:",
  ...Object.entries(SPELLS).map(
    ([name, s]) => `  __ishaan.${name}()`.padEnd(21) + `— ${s.hint}`
  ),
].join("\n");

/**
 * Console easter egg: ASCII banner, hints, and window.__ishaan helpers.
 * Client-only, runs in dev + prod, exposes zero secrets.
 */
export default function ConsoleGreeting() {
  const router = useRouter();

  useEffect(() => {
    window.__ishaan = {
      help: () => HELP,
      ...Object.fromEntries(
        Object.entries(SPELLS).map(([name, s]) => [
          name,
          () => {
            if (s.route) router.push(s.route);
            return s.reply;
          },
        ])
      ),
    } as NonNullable<Window["__ishaan"]>;

    // Styled banner + a warning with the real hints.
    console.log(
      BANNER,
      "font-family:monospace;font-weight:bold;color:#ff4d2e;font-size:14px;",
      "font-family:monospace;color:#8f8b82;font-size:11px;"
    );
    console.log(
      "%cpsst — this site has layers. try __ishaan.help()",
      "font-family:monospace;color:#8fb8a8;"
    );
    console.warn(
      "%cWHOAH. devtools? bold. the konami code works here: ↑↑↓↓←→←→BA",
      "font-family:monospace;"
    );

    return () => {
      delete window.__ishaan;
    };
  }, [router]);

  return null;
}
