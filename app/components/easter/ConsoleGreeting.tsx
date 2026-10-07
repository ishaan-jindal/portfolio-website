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

/**
 * Console easter egg: ASCII banner, hints, and window.__ishaan helpers.
 * Client-only, runs in dev + prod, exposes zero secrets.
 */
export default function ConsoleGreeting() {
  const router = useRouter();

  useEffect(() => {
    const help = () => [
      "available spells:",
      "  __ishaan.whoami()  — who runs this thing",
      "  __ishaan.tea()     — the /tea room",
      "  __ishaan.matrix()  — there is no spoon (there is a /matrix)",
      "  __ishaan.konami()  — the old ways still work: ↑↑↓↓←→←→BA",
    ].join("\n");

    window.__ishaan = {
      help: () => help(),
      whoami: () =>
        "ishaan jindal — software developer (india). terminals, apps, infra. hire him maybe?",
      tea: () => {
        router.push("/tea");
        return "brewing…";
      },
      matrix: () => {
        router.push("/matrix");
        return "follow the white rabbit.";
      },
      konami: () =>
        "↑↑↓↓←→←→BA — type it anywhere (outside inputs). also try typing: 1337, tea, sudo.",
    };

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
