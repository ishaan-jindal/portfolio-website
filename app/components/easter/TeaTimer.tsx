"use client";

import { useEffect, useRef, useState } from "react";

const PRESETS = [1, 3, 5];

function fmt(total: number): string {
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

/** Harris-style steep timer: pick minutes, count down, drink hot. */
export default function TeaTimer() {
  const [minutes, setMinutes] = useState(3);
  const [left, setLeft] = useState(3 * 60);
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);
  const timer = useRef<number>(0);

  useEffect(() => () => window.clearInterval(timer.current), []);

  const start = (m: number = minutes) => {
    window.clearInterval(timer.current);
    setDone(false);
    setLeft(m * 60);
    setRunning(true);
    timer.current = window.setInterval(() => {
      setLeft((v) => {
        if (v <= 1) {
          window.clearInterval(timer.current);
          setRunning(false);
          setDone(true);
          return 0;
        }
        return v - 1;
      });
    }, 1000);
  };

  const reset = () => {
    window.clearInterval(timer.current);
    setRunning(false);
    setDone(false);
    setLeft(minutes * 60);
  };

  const total = minutes * 60;
  const pct = total === 0 ? 0 : ((total - left) / total) * 100;

  return (
    <div className="ascii-panel p-5 sm:p-6">
      <p className="eyebrow">Steep timer</p>
      <p
        aria-live="polite"
        className="mt-3 font-mono text-5xl font-bold tracking-tight text-[var(--foreground)] tabular-nums"
      >
        {done ? "READY" : fmt(left)}
      </p>
      <div
        aria-hidden="true"
        className="mt-4 h-px w-full bg-[var(--border)]"
      >
        <div
          className="h-px bg-[var(--accent)] transition-[width] duration-1000 ease-linear"
          style={{ width: `${done ? 100 : pct}%` }}
        />
      </div>
      <p className="mt-3 font-mono text-[0.6875rem] tracking-[0.16em] uppercase text-[var(--muted)]">
        {done
          ? "Steeped — drink it hot"
          : running
            ? `Steeping… ${minutes} min earl grey`
            : "Pick a steep, press start"}
      </p>
      <div className="mt-5 flex flex-wrap gap-2">
        {PRESETS.map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => {
              setMinutes(m);
              setLeft(m * 60);
              setDone(false);
            }}
            aria-pressed={minutes === m}
            className={`text-chip cursor-pointer transition-colors hover:border-[var(--foreground)] ${minutes === m ? "border-[var(--accent)] text-[var(--foreground)]" : ""}`}
          >
            {m} MIN
          </button>
        ))}
        <span className="mx-1 hidden font-mono text-[var(--border-strong)] sm:inline" aria-hidden="true">
          |
        </span>
        {!running ? (
          <button type="button" onClick={() => start()} className="text-button text-button--primary cursor-pointer">
            Start
          </button>
        ) : (
          <button
            type="button"
            onClick={() => {
              window.clearInterval(timer.current);
              setRunning(false);
            }}
            className="text-button cursor-pointer"
          >
            Pause
          </button>
        )}
        <button type="button" onClick={reset} className="text-button cursor-pointer">
          Reset
        </button>
      </div>
    </div>
  );
}
