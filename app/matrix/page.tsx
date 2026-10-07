import type { Metadata } from "next";
import Link from "next/link";
import AsciiRain from "../components/easter/AsciiRain";

export const metadata: Metadata = {
  title: "Matrix",
  description: "Wake up, Neo. A hidden terminal inside a portfolio.",
  alternates: { canonical: "/matrix" },
  robots: { index: false, follow: false },
};

// CSP nonces require dynamic rendering so Next can inject them per-request
export const dynamic = "force-dynamic";

const LOG: { cmd?: string; out: string; tone?: "green" | "red" | "dim" }[] = [
  { cmd: "$ whoami", out: "guest — for now." },
  { cmd: "$ nmap -sS ishaanjindal.tech", out: "1 open port: 443 (charm)" },
  {
    cmd: "$ ./exploit.sh --target mainframe",
    out: "ACCESS DENIED: firewall runs on tea. see /tea",
    tone: "red",
  },
  { cmd: "$ wake up, neo…", out: "the matrix has you. it renders in dark swiss, zero radius.", tone: "green" },
  { cmd: "$ knock, knock.", out: "the rabbit hole is one steep deep. ↓", tone: "dim" },
];

export default function MatrixPage() {
  return (
    <div className="relative w-full flex-1">
      <AsciiRain duration={3600} veil={0.9} />
      <div className="site-container relative z-[95] pt-[108px] pb-16">
        <p className="eyebrow">
          Hidden route <span className="text-[var(--accent)]">/</span> 02 — the mainframe
        </p>
        <h1 className="section-title mt-4">The matrix</h1>

        <div className="ascii-panel mt-8 max-w-[720px] bg-[rgba(10,10,10,0.72)] backdrop-blur-[2px]">
          <div className="flex items-center justify-between border-b border-[var(--border)] px-5 py-3">
            <span className="font-mono text-[0.6875rem] tracking-[0.16em] uppercase text-[var(--muted)]">
              neo@zion:~ — 80×24
            </span>
            <span className="font-mono text-[0.6875rem] tracking-[0.16em] uppercase text-[var(--accent)]">
              ● traced
            </span>
          </div>
          <div className="space-y-4 p-5 font-mono text-[0.8125rem] leading-relaxed">
            {LOG.map((row, i) => (
              <div key={i}>
                {row.cmd && (
                  <p className="text-[var(--foreground)]">{row.cmd}</p>
                )}
                <p
                  className={
                    row.tone === "red"
                      ? "text-[var(--accent)]"
                      : row.tone === "green"
                        ? "text-[var(--accent-2)]"
                        : "text-[var(--muted)]"
                  }
                >
                  {row.tone === "red" ? "✕ " : "› "}
                  {row.out}
                </p>
              </div>
            ))}
            <p className="text-[var(--foreground)]">
              $ <span aria-hidden="true" className="text-[var(--accent)]">▊</span>
              <span className="sr-only">terminal prompt</span>
            </p>
          </div>
          <div className="flex flex-wrap gap-2 border-t border-[var(--border)] px-5 py-4">
            <Link href="/tea" className="text-button text-button--primary">
              Red pill — /tea
            </Link>
            <Link href="/" className="text-button">
              Blue pill — home
            </Link>
          </div>
        </div>

        <p className="mt-6 max-w-[60ch] font-mono text-[0.75rem] leading-relaxed text-[var(--muted)]">
          there is no spoon. there is, however, a perfectly good portfolio at{" "}
          <Link href="/" className="text-[var(--foreground)] underline underline-offset-4 hover:text-[var(--accent)]">
            /
          </Link>
          . tip for terminal natives:{" "}
          <span className="text-[var(--foreground)]">
            curl ishaanjindal.tech/matrix
          </span>
        </p>
      </div>
    </div>
  );
}
