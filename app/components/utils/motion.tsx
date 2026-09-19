"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  animate,
} from "framer-motion";

/* Shared Swiss motion language: mechanical, rule-based, no springs. */

export const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
export const DUR = { fast: 0.18, base: 0.28, slow: 0.6 } as const;
export const STAGGER = 0.045;

/* ── ClipReveal: masked line rise (hero display type, menu items) ── */

export function ClipReveal({
  children,
  delay = 0,
  duration = DUR.slow,
  className = "",
  scroll = false,
}: {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  scroll?: boolean;
}) {
  const reduce = useReducedMotion();
  const inner = (
    <motion.span
      className="block will-change-transform"
      initial={reduce ? false : { y: "102%" }}
      {...(scroll
        ? {
            whileInView: { y: "0%" },
            viewport: { once: true, margin: "-10% 0px" },
          }
        : { animate: { y: "0%" } })}
      transition={{ duration: reduce ? 0 : duration, delay, ease: EASE }}
    >
      {children}
    </motion.span>
  );
  return (
    <span
      className={`block overflow-hidden pb-[0.12em] -mb-[0.12em] ${className}`}
    >
      {inner}
    </span>
  );
}

/* ── Rise: small fade-up ── */

export function Rise({
  children,
  delay = 0,
  duration = 0.45,
  y = 8,
  className = "",
  scroll = false,
}: {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  y?: number;
  className?: string;
  scroll?: boolean;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      {...(scroll
        ? {
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true, margin: "-10% 0px" },
          }
        : { animate: { opacity: 1, y: 0 } })}
      transition={{ duration: reduce ? 0 : duration, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/* ── DrawRule: hairline wipe (scaleX from left / scaleY from top) ── */

export function DrawRule({
  direction = "x",
  className = "",
  duration = 0.5,
  delay = 0,
  accent = false,
}: {
  direction?: "x" | "y";
  className?: string;
  duration?: number;
  delay?: number;
  accent?: boolean;
}) {
  const reduce = useReducedMotion();
  const horizontal = direction === "x";
  return (
    <motion.div
      aria-hidden="true"
      className={`${accent ? "bg-[var(--accent)]" : "bg-[var(--border)]"} ${
        horizontal ? "h-px w-full" : "h-full w-px"
      } ${className}`}
      style={{
        transformOrigin: horizontal ? "left center" : "center top",
      }}
      initial={
        reduce ? false : horizontal ? { scaleX: 0 } : { scaleY: 0 }
      }
      whileInView={horizontal ? { scaleX: 1 } : { scaleY: 1 }}
      viewport={{ once: true, margin: "-5% 0px" }}
      transition={{ duration: reduce ? 0 : duration, delay, ease: EASE }}
    />
  );
}

/* ── Stagger: scroll-triggered stagger container + items ── */

type Tag = keyof React.JSX.IntrinsicElements;

export function Stagger({
  children,
  className = "",
  as = "div",
  gap = STAGGER,
  delay = 0,
  ...rest
}: {
  children: React.ReactNode;
  className?: string;
  as?: Tag;
  gap?: number;
  delay?: number;
  [key: string]: unknown;
}) {
  const reduce = useReducedMotion();
  const M = (motion as unknown as Record<Tag, typeof motion.div>)[as];
  return (
    <M
      className={className}
      initial={reduce ? false : "hidden"}
      whileInView="show"
      viewport={{ once: true, margin: "-10% 0px" }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: gap, delayChildren: delay } },
      }}
      {...rest}
    >
      {children}
    </M>
  );
}

export function StaggerItem({
  children,
  className = "",
  as = "div",
  y = 8,
  duration = 0.45,
}: {
  children: React.ReactNode;
  className?: string;
  as?: Tag;
  y?: number;
  duration?: number;
}) {
  const reduce = useReducedMotion();
  const M = (motion as unknown as Record<Tag, typeof motion.div>)[as];
  return (
    <M
      className={className}
      initial={reduce ? false : undefined}
      variants={
        reduce
          ? undefined
          : {
              hidden: { opacity: 0, y },
              show: {
                opacity: 1,
                y: 0,
                transition: { duration, ease: EASE },
              },
            }
      }
    >
      {children}
    </M>
  );
}

/* ── CountUp: 00 → 01 eyebrow numbers ── */

export function CountUp({
  to,
  pad = 2,
  duration = 0.6,
  className = "",
}: {
  to: number;
  pad?: number;
  duration?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView || reduce) return;
    const controls = animate(0, to, {
      duration,
      ease: EASE,
      onUpdate: (v) => setVal(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, reduce, to, duration]);

  return (
    <span ref={ref} className={className}>
      {String(reduce ? to : val).padStart(pad, "0")}
    </span>
  );
}

/* ── Flicker: split-flap settle for short labels like [ 2026 ] ── */

const FLICKER_CHARS = "0123456789";

export function Flicker({
  text,
  className = "",
  duration = 0.5,
}: {
  text: string;
  className?: string;
  duration?: number;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [out, setOut] = useState(text);

  useEffect(() => {
    if (!inView || reduce) return;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = (t - start) / (duration * 1000);
      if (p >= 1) {
        setOut(text);
        return;
      }
      setOut(
        text
          .split("")
          .map((ch) =>
            /\d/.test(ch) && Math.random() > p
              ? FLICKER_CHARS[(Math.random() * 10) | 0]
              : ch
          )
          .join("")
      );
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduce, text, duration]);

  return (
    <span ref={ref} className={className}>
      {out}
    </span>
  );
}
