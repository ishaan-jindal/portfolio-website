"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

/* Shared Swiss motion language: mechanical, rule-based, no springs. */

export const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
export const DUR = { slow: 0.6 } as const;

/* ── ClipReveal: masked line rise (hero display type, menu items) ── */

export function ClipReveal({
  children,
  delay = 0,
  scroll = false,
}: {
  children: React.ReactNode;
  delay?: number;
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
      transition={{ duration: reduce ? 0 : DUR.slow, delay, ease: EASE }}
    >
      {children}
    </motion.span>
  );
  return (
    <span className="block overflow-hidden pb-[0.12em] -mb-[0.12em]">
      {inner}
    </span>
  );
}

/* ── Rise: small fade-up ── */

export function Rise({
  children,
  delay = 0,
  scroll = false,
}: {
  children: React.ReactNode;
  delay?: number;
  scroll?: boolean;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 8 }}
      {...(scroll
        ? {
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true, margin: "-10% 0px" },
          }
        : { animate: { opacity: 1, y: 0 } })}
      transition={{ duration: reduce ? 0 : 0.45, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/* ── DrawRule: hairline wipe (scaleX from left / scaleY from top) ── */

export function DrawRule({
  direction = "x",
  className = "",
  delay = 0,
  accent = false,
}: {
  direction?: "x" | "y";
  className?: string;
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
      transition={{ duration: reduce ? 0 : 0.5, delay, ease: EASE }}
    />
  );
}

/* ── Stagger: scroll-triggered stagger container + items ── */

type Tag = keyof React.JSX.IntrinsicElements;

export function Stagger({
  children,
  className = "",
  as = "div",
  gap,
  delay = 0,
  ...rest
}: {
  children: React.ReactNode;
  className?: string;
  as?: Tag;
  gap: number;
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
}: {
  children: React.ReactNode;
  className?: string;
  as?: Tag;
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
              hidden: { opacity: 0, y: 8 },
              show: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.45, ease: EASE },
              },
            }
      }
    >
      {children}
    </M>
  );
}
