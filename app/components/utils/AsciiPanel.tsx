"use client";

import React from "react";
import { usePretextLayout } from "./usePretextLayout";

type Props = {
  eyebrow: string;
  title: string;
  text: string;
  children?: React.ReactNode;
  className?: string;
};

const PANEL_FONT = '15px "Geist Mono", ui-monospace, monospace';
const PANEL_LINE_HEIGHT = 24;

const AsciiPanel = ({ eyebrow, title, text, children, className = "" }: Props) => {
  const { ref, height } = usePretextLayout<HTMLParagraphElement>(text, {
    font: PANEL_FONT,
    lineHeight: PANEL_LINE_HEIGHT,
  });

  return (
    <section className={`ascii-panel ${className}`}>
      <div className="mb-5 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
        <p className="font-mono text-xs uppercase text-[var(--accent)]">{eyebrow}</p>
        <h3 className="font-mono text-base text-[var(--foreground)]">{title}</h3>
      </div>
      <p
        ref={ref}
        className="font-mono text-sm leading-6 text-[var(--muted)]"
        style={height ? { minHeight: `${Math.ceil(height)}px` } : undefined}
      >
        {text}
      </p>
      {children && <div className="mt-6">{children}</div>}
    </section>
  );
};

export default AsciiPanel;
