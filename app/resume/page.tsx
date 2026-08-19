import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resume",
  description: "View Ishaan Jindal's resume.",
  alternates: {
    canonical: "/resume",
  },
};

// CSP nonces require dynamic rendering so Next can inject them per-request
export const dynamic = "force-dynamic";

export default function ResumePage() {
  return (
    <main className="h-screen pt-14 px-4 pb-4">
      <div className="max-w-7xl mx-auto h-full border border-neutral-800 rounded-xl overflow-hidden bg-black/40 backdrop-blur-lg">
        <object
          data="/resume.pdf"
          type="application/pdf"
          className="w-full h-full"
          aria-label="Resume PDF"
        >
          <div className="h-full w-full flex items-center justify-center p-6 text-center text-neutral-300">
            <p>
              Unable to render PDF in this browser. Open it directly at{" "}
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-white"
              >
                /resume.pdf
              </a>
              .
            </p>
          </div>
        </object>
      </div>
    </main>
  );
}