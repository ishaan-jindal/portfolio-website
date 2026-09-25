"use client";

import { useEffect, useRef } from "react";

const GLYPHS = "アイシャーン01<>+#*01tea$#";

type Props = {
  /** seconds before the rain stops and calls onDone */
  duration?: number;
  /** 0–1 opacity of the veil behind the rain */
  veil?: number;
  onDone?: () => void;
};

/**
 * Full-screen ASCII rain overlay (canvas + rAF, no deps).
 * Renders nothing when the user prefers reduced motion.
 */
export default function AsciiRain({ duration = 6, veil = 0.82, onDone }: Props) {
  const ref = useRef<HTMLCanvasElement>(null);
  const doneRef = useRef(onDone);

  useEffect(() => {
    doneRef.current = onDone;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      doneRef.current?.();
      return;
    }
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
    };
    resize();
    window.addEventListener("resize", resize);

    const size = 16 * dpr;
    let drops: number[] = [];
    const seed = () => {
      const cols = Math.ceil(canvas.width / size);
      drops = Array.from({ length: cols }, () =>
        Math.floor(Math.random() * (canvas.height / size))
      );
    };
    seed();

    const accent = "#ff4d2e";
    const green = "#8fb8a8";
    let raf = 0;
    let last = 0;
    const start = performance.now();
    let dead = false;

    const frame = (t: number) => {
      if (dead) return;
      raf = requestAnimationFrame(frame);
      if (t - last < 66) return; // ~15fps: mechanical, swiss, cheap
      last = t;

      ctx.fillStyle = `rgba(10, 10, 10, ${veil * 0.28})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = `${size}px var(--font-geist-mono), monospace`;

      drops.forEach((y, i) => {
        const ch = GLYPHS[(Math.random() * GLYPHS.length) | 0];
        ctx.fillStyle = Math.random() > 0.92 ? accent : green;
        ctx.fillText(ch, i * size, y * size);
        drops[i] = y * size > canvas.height && Math.random() > 0.976 ? 0 : y + 1;
      });

      if (t - start > duration * 1000) {
        dead = true;
        cancelAnimationFrame(raf);
        window.removeEventListener("resize", resize);
        doneRef.current?.();
      }
    };
    raf = requestAnimationFrame(frame);

    return () => {
      dead = true;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [duration, veil, onDone]);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[90] h-full w-full"
      style={{ width: "100vw", height: "100vh" }}
    />
  );
}
