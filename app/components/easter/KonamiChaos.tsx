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

// Typed triggers: rolling lowercase buffer match.
const TEXT_TRIGGERS: { word: string; effect: "rain" | "invert" | "scramble" }[] = [
  { word: "1337", effect: "rain" },
  { word: "tea", effect: "invert" },
  { word: "sudo", effect: "scramble" },
];

const SCRAMBLE_CHARS = "!<>-_\\/[]{}—=+*^?#";

function scrambleHeadings(restore: () => void) {
  const els = Array.from(
    document.querySelectorAll<HTMLElement>("h1, h2")
  ).slice(0, 6);
  if (els.length === 0) {
    restore();
    return;
  }
  const originals = els.map((el) => el.textContent ?? "");
  const start = performance.now();
  const DUR = 1400;
  let raf = 0;
  const tick = (t: number) => {
    const p = (t - start) / DUR;
    if (p >= 1) {
      els.forEach((el, i) => {
        el.textContent = originals[i];
      });
      restore();
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
  // Safety: never leave the DOM scrambled.
  window.setTimeout(() => {
    cancelAnimationFrame(raf);
    els.forEach((el, i) => {
      if (el.textContent !== originals[i]) el.textContent = originals[i];
    });
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
        announce("konami accepted // enjoy the rain");
      } else if (effect === "invert") {
        announce("tea break // polarity reversed");
        invertFlash(release);
      } else {
        announce("sudo says hi // signal scrambled");
        scrambleHeadings(release);
      }
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
      // Typed-word triggers (letters/digits only)
      if (/^[a-z0-9]$/i.test(e.key)) {
        typed.current = (typed.current + e.key.toLowerCase()).slice(-8);
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
  }, [fire]);

  useEffect(() => () => window.clearTimeout(toastTimer.current), []);

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
