import type { Metadata } from "next";
import Link from "next/link";
import TeaTimer from "../components/easter/TeaTimer";

export const metadata: Metadata = {
  title: "Tea Room",
  description: "A hidden tea room. You found it — steep something.",
  alternates: { canonical: "/tea" },
  robots: { index: false, follow: false },
};

// CSP nonces require dynamic rendering so Next can inject them per-request
export const dynamic = "force-dynamic";

const CUP = `      ~   ~   ~
     (   )   (
    .-----------.
    |  EARL     ||
    |  GREY     ||
    |  96°C     ||
     \\         //
      '-------'
        |___|`;

export default function TeaPage() {
  return (
    <div className="site-container w-full flex-1 pt-[108px] pb-16">
      <p className="eyebrow">
        Hidden route <span className="text-[var(--accent)]">/</span> 01 — the tea room
      </p>
      <h1 className="section-title mt-4">Tea room</h1>
      <p className="mt-3 max-w-[60ch] font-mono text-[0.8125rem] leading-relaxed text-[var(--muted)]">
        $ brew tea --strong. you typed the word, you earned the cup.
        no tracking, no cookies — just leaves and hot water.
      </p>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_1.1fr]">
        <div className="ascii-panel overflow-hidden">
          <div className="flex items-center justify-between border-b border-[var(--border)] px-5 py-3">
            <span className="font-mono text-[0.6875rem] tracking-[0.16em] uppercase text-[var(--muted)]">
              ~/kettle
            </span>
            <span className="font-mono text-[0.6875rem] tracking-[0.16em] uppercase text-[var(--accent-2)]">
              ● boiling
            </span>
          </div>
          <pre
            aria-label="ASCII teacup"
            className="overflow-x-auto p-5 font-mono text-[0.8125rem] leading-[1.7] text-[var(--foreground)]"
          >
            {CUP}
          </pre>
          <div className="border-t border-[var(--border)] px-5 py-4">
            <p className="font-mono text-[0.75rem] leading-relaxed text-[var(--muted)]">
              house rules —<br />
              01 / earl grey. no sugar. ever.<br />
              02 / tabs over spaces. fight us.<br />
              03 / ship it, then steep it.<br />
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <TeaTimer />
          <div className="ascii-panel p-5 sm:p-6">
            <p className="eyebrow">While it steeps</p>
            <p className="mt-3 text-sm leading-relaxed text-[var(--soft)]">
              Ishaan builds terminal tools, mobile apps, and web experiments —
              plus the infrastructure they run on. This room runs on nothing.
              That&apos;s the joke. That&apos;s also the architecture.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <Link href="/" className="text-button">
                ← back to reality
              </Link>
              <Link href="/matrix" className="text-button">
                take the red pill
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
