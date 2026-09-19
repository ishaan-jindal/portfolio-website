import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resume",
  description:
    "Resume of Ishaan Jindal — software developer.",
  alternates: {
    canonical: "/resume",
  },
};

// CSP nonces require dynamic rendering so Next can inject them per-request
export const dynamic = "force-dynamic";

export default function ResumePage() {
  return (
    <div className="site-container flex-1 pt-[108px] pb-12">
      <div className="flex items-center justify-between">
        <p className="eyebrow">
          Resume <span className="text-[var(--accent)]">/</span> PDF
        </p>
        <a
          href="/resume.pdf"
          download="Ishaan-Jindal-Resume.pdf"
          className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-[var(--foreground)] transition-colors hover:text-[var(--accent)]"
        >
          Download <span aria-hidden="true">→</span>
        </a>
      </div>

      <div className="mt-6 h-[calc(100svh-220px)] min-h-[480px] border border-[var(--border)] bg-[var(--panel)]">
        <object
          data="/resume.pdf"
          type="application/pdf"
          className="h-full w-full"
          aria-label="Resume PDF"
        >
          <div className="flex h-full w-full items-center justify-center p-6 text-center text-sm leading-6 text-[var(--muted)]">
            <p>
              Unable to render PDF in this browser. Open it directly at{" "}
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--foreground)] underline hover:text-[var(--accent)]"
              >
                /resume.pdf
              </a>
              .
            </p>
          </div>
        </object>
      </div>
    </div>
  );
}
