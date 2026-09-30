"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import AsciiRain from "./AsciiRain";

const KONAMI = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

// Typed triggers: rolling lowercase buffer match. Fire immediately.
const TEXT_TRIGGERS: { word: string; effect: "rain" | "invert" }[] = [
  { word: "1337", effect: "rain" },
  { word: "tea", effect: "invert" },
];

// `sudo <word>` subcommands mirror the CLI dispatcher. Checked before bare `sudo`.
// Bare `sudo` (→ scramble) is handled in the key listener with a grace period
// so `sudo tea` / `sudo hack` / `sudo 1337` can complete first.
const SUDO_TRIGGERS: { word: string; effect: "rain" | "invert" }[] = [
  { word: "sudo tea", effect: "invert" },
  { word: "sudo hack", effect: "rain" },
  { word: "sudo 1337", effect: "rain" },
];

// Stage 1 (password prompt) → stage 2 (effect + punchline) delay.
const SUDO_PASSWORD_MS = 700;
// How long bare `sudo` waits for a possible `sudo <word>` continuation.
const SUDO_GRACE_MS = 700;

const SCRAMBLE_CHARS = "!<>-_\\/[]{}—=+*^?#";

const ALIAS_MAIN = "SacredNightmare";
const ALIAS_ROOT = "root@SacredNightmare";

function scrambleHeadings(restore: () => void) {
  const els = Array.from(
    document.querySelectorAll<HTMLElement>("h1, h2")
  ).slice(0, 6);
  if (els.length === 0) {
    restore();
    return;
  }
  const originals = els.map((el) => el.textContent ?? "");
  const originalColors = els.map((el) => el.style.color);
  const originalTitle = document.title;
  let titleRestored = false;
  const restoreTitle = () => {
    if (!titleRestored) {
      titleRestored = true;
      document.title = originalTitle;
    }
  };
  document.title = "root@SacredNightmare:~#";
  // Accent flash: tint headings while the signal is scrambled.
  els.forEach((el) => {
    el.style.color = "var(--accent)";
  });
  const restoreDom = () => {
    els.forEach((el, i) => {
      if (el.textContent !== originals[i]) el.textContent = originals[i];
      if (el.style.color !== originalColors[i])
        el.style.color = originalColors[i];
    });
    restoreTitle();
  };
  const start = performance.now();
  const DUR = 1400;
  let raf = 0;
  const tick = (t: number) => {
    const p = (t - start) / DUR;
    if (p >= 1) {
      restoreDom();
      restore();
      return;
    }
    // Alias flash window (~45–58%): cut to the hacker handle, then
    // de-scramble back to the true originals. Never left in the DOM —
    // restoreDom + the safety timer below always bring back originals.
    if (p >= 0.45 && p < 0.58) {
      els.forEach((el, i) => {
        const alias = i === 0 ? ALIAS_ROOT : ALIAS_MAIN;
        el.textContent = alias
          .split("")
          .map((ch) =>
            Math.random() < 0.12
              ? SCRAMBLE_CHARS[(Math.random() * SCRAMBLE_CHARS.length) | 0]
              : ch
          )
          .join("");
      });
      raf = requestAnimationFrame(tick);
      return;
    }
    els.forEach((el, i) => {
      const orig = originals[i];
      el.textContent = orig
        .split("")
        .map((ch) =>
          /\s/.test(ch) || Math.random() < p
            ? ch
            : SCRAMBLE_CHARS[(Math.random() * SCRAMBLE_CHARS.length) | 0]
        )
        .join("");
    });
    raf = requestAnimationFrame(tick);
  };
  raf = requestAnimationFrame(tick);
  // Safety: never leave the DOM scrambled, tinted, aliased, or re-titled.
  window.setTimeout(() => {
    cancelAnimationFrame(raf);
    restoreDom();
  }, DUR + 500);
}

function invertFlash(done: () => void) {
  const root = document.documentElement;
  let flips = 0;
  const id = window.setInterval(() => {
    root.style.filter = flips % 2 === 0 ? "invert(1) hue-rotate(180deg)" : "";
    flips += 1;
    if (flips >= 6) {
      window.clearInterval(id);
      root.style.filter = "";
      done();
    }
  }, 160);
  // Safety: always clear the filter.
  window.setTimeout(() => {
    window.clearInterval(id);
    root.style.filter = "";
  }, 2000);
}

/**
 * Global key-sequence listener. Mount once in the root layout.
 * Konami code → ASCII rain. Typed words → smaller effects.
 * Under prefers-reduced-motion: a quiet toast only, no chaos.
 */
export default function KonamiChaos() {
  const [rain, setRain] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const seq = useRef<string[]>([]);
  const typed = useRef("");
  const busy = useRef(false);
  const toastTimer = useRef<number>(0);
  const sudoTimer = useRef<number>(0);
  const stageTimer = useRef<number>(0);

  const announce = useCallback((msg: string) => {
    setToast(msg);
    window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(null), 3200);
  }, []);

  const fire = useCallback(
    (effect: "rain" | "invert" | "scramble", label: string) => {
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (reduced) {
        announce(`${label} accepted. motion reduced — chaos withheld.`);
        return;
      }
      if (busy.current) return;
      busy.current = true;
      const release = () => {
        busy.current = false;
      };
      if (effect === "rain") {
        setRain(true);
        announce("[ 1337.042 ] konami: ascii rain mounted");
      } else if (effect === "invert") {
        announce("tea break // polarity reversed");
        invertFlash(release);
      } else {
        announce("sudo: session opened for SacredNightmare // uid=0(root)");
        scrambleHeadings(release);
      }
    },
    [announce]
  );

  // Mini privilege-escalation sequence: password prompt, then effect + punchline.
  // Busy stays locked across both stages; rain releases via AsciiRain onDone.
  const fireSudo = useCallback(
    (effect: "rain" | "invert" | "scramble", sub: string | null) => {
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      const label = sub ? `sudo ${sub}` : "sudo";
      if (reduced) {
        announce(`${label} accepted. motion reduced — chaos withheld.`);
        return;
      }
      if (busy.current) return;
      busy.current = true;
      const release = () => {
        busy.current = false;
      };
      announce("[sudo] password for guest: ••••••••");
      window.clearTimeout(stageTimer.current);
      stageTimer.current = window.setTimeout(() => {
        if (effect === "rain") {
          setRain(true);
          announce(
            sub
              ? `sudo: ${sub} executed as SacredNightmare // rain mounted`
              : "[ 1337.042 ] sudo: rain mounted for SacredNightmare"
          );
        } else if (effect === "invert") {
          announce(
            `sudo: ${sub ?? "tea"} executed as SacredNightmare // uid=0(root)`
          );
          invertFlash(release);
        } else {
          announce(
            "sudo: session opened for SacredNightmare // uid=0(root) gid=0(root)"
          );
          scrambleHeadings(release);
        }
      }, SUDO_PASSWORD_MS);
    },
    [announce]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable)
      ) {
        return;
      }
      // Konami progress
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      seq.current = [...seq.current, key].slice(-KONAMI.length);
      if (
        seq.current.length === KONAMI.length &&
        seq.current.every((k, i) => k === KONAMI[i])
      ) {
        seq.current = [];
        fire("rain", "konami");
        return;
      }
      // Typed-word triggers (letters/digits/spaces, rolling 12-char buffer)
      if (/^[a-z0-9 ]$/i.test(e.key)) {
        typed.current = (typed.current + e.key.toLowerCase()).slice(-12);
        // `sudo <word>` wins over bare words.
        for (const t of SUDO_TRIGGERS) {
          if (typed.current.endsWith(t.word)) {
            typed.current = "";
            window.clearTimeout(sudoTimer.current);
            fireSudo(t.effect, t.word.slice("sudo ".length));
            return;
          }
        }
        // Bare `sudo` waits a beat for a possible `sudo <word>` continuation;
        // each further sudo-prefixed keystroke extends the grace period.
        if (/sudo( [a-z0-9]*)?$/.test(typed.current)) {
          window.clearTimeout(sudoTimer.current);
          sudoTimer.current = window.setTimeout(() => {
            const buf = typed.current;
            if (buf.endsWith("sudo")) {
              typed.current = "";
              fireSudo("scramble", null);
            } else {
              const m = buf.match(/sudo ([a-z0-9]+)$/);
              if (
                m &&
                !SUDO_TRIGGERS.some((t) => t.word === `sudo ${m[1]}`)
              ) {
                typed.current = "";
                announce(`sudo: ${m[1]}: command not found`);
              }
            }
          }, SUDO_GRACE_MS);
          return;
        }
        // `whoami` is a quiet toast-only answer — no chaos, no busy lock.
        if (typed.current.endsWith("whoami")) {
          typed.current = "";
          announce("root — no, SacredNightmare");
          return;
        }
        for (const t of TEXT_TRIGGERS) {
          if (typed.current.endsWith(t.word)) {
            typed.current = "";
            fire(t.effect, t.word);
            return;
          }
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [fire, fireSudo, announce]);

  useEffect(
    () => () => {
      window.clearTimeout(toastTimer.current);
      window.clearTimeout(sudoTimer.current);
      window.clearTimeout(stageTimer.current);
    },
    []
  );

  return (
    <>
      {rain && (
        <AsciiRain
          duration={6}
          onDone={() => {
            setRain(false);
            busy.current = false;
          }}
        />
      )}
      <AnimatePresence>
        {toast && (
          <motion.div
            role="status"
            aria-live="polite"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 left-1/2 z-[100] -translate-x-1/2 border border-[var(--border-strong)] bg-[var(--background)] px-4 py-2 font-mono text-[0.6875rem] tracking-[0.16em] uppercase text-[var(--foreground)]"
          >
            <span className="text-[var(--accent)]">{"// "}</span>
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
