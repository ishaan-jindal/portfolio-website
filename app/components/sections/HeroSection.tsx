import { Suspense } from "react";
import { ClipReveal, Rise, DrawRule, CountUp, Flicker } from "../utils/motion";
import QuoteBlock, { QuoteContent } from "./QuoteBlock";
import { getFallbackQuote } from "@/app/lib/quotes";

const HeroSection = () => {
  const year = new Date().getFullYear();
  const fallbackQuote = getFallbackQuote();

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between">
        <p className="eyebrow">
          <span className="text-[var(--accent)]">
            <CountUp to={1} />
          </span>{" "}
          / 04
        </p>
        <p className="eyebrow">
          <Flicker text={`[ ${year} ]`} />
        </p>
      </div>

      <div className="mt-8 grid gap-12 lg:mt-10 lg:grid-cols-[1.35fr_1fr] lg:gap-0">
        {/* Name, role, bio */}
        <div className="lg:pr-14">
          <h1 className="display-name">
            <ClipReveal>
              <span className="block text-[var(--foreground)]">Ishaan</span>
            </ClipReveal>
            <ClipReveal delay={0.08}>
              <span className="block text-[var(--accent)]">Jindal</span>
            </ClipReveal>
          </h1>

          <Rise delay={0.18}>
            <p className="mt-6 font-mono text-xs uppercase tracking-[0.3em] text-[var(--foreground)] sm:text-sm">
              Software Developer &amp; Open-Source Contributor
            </p>
          </Rise>

          <div className="mt-8 max-w-[58ch] space-y-4">
            <Rise delay={0.24}>
              <p className="text-base leading-7 text-[var(--soft)]">
                I like building things — terminal tools, mobile apps, web
                experiments, and the infrastructure that carries them.
              </p>
            </Rise>
            <Rise delay={0.3}>
              <p className="text-sm leading-7 text-[var(--muted)]">
                I care about software that stays simple, fast, and easy to
                read. Most of what I make ends up open source.
              </p>
            </Rise>
          </div>

          <Rise delay={0.36}>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <a
                href="#projects"
                className="text-button text-button--primary group"
              >
                View Projects
                <span
                  aria-hidden="true"
                  className="inline-block transition-transform duration-200 group-hover:translate-x-1"
                >
                  →
                </span>
              </a>
              <a
                href="/resume.pdf"
                download="Ishaan-Jindal-Resume.pdf"
                className="text-button"
              >
                Resume
              </a>
              <a
                href="https://github.com/ishaan-jindal"
                target="_blank"
                rel="noopener noreferrer"
                className="text-button"
              >
                GitHub
              </a>
            </div>
          </Rise>
        </div>

        {/* Statement + quote */}
        <div className="flex flex-col justify-between gap-14 border-t border-[var(--border)] pt-8 lg:border-t-0 lg:border-l lg:pt-1 lg:pl-14">
          <p className="text-2xl font-semibold uppercase leading-[1.08] tracking-[-0.02em] text-[var(--foreground)] sm:text-3xl lg:text-4xl">
            <ClipReveal delay={0.1}>
              <span className="block">Build</span>
            </ClipReveal>
            <ClipReveal delay={0.16}>
              <span className="block">systems</span>
            </ClipReveal>
            <ClipReveal delay={0.22}>
              <span className="block">for a more</span>
            </ClipReveal>
            <ClipReveal delay={0.28}>
              <span className="block">open internet.</span>
            </ClipReveal>
          </p>

          <Rise delay={0.4}>
            <div className="lg:text-right">
              <Suspense
                fallback={
                  <QuoteContent
                    text={fallbackQuote.text}
                    author={fallbackQuote.author}
                  />
                }
              >
                <QuoteBlock />
              </Suspense>
              <div className="mt-3 hidden justify-end lg:flex" aria-hidden="true">
                <div className="w-16">
                  <DrawRule delay={0.55} accent />
                </div>
              </div>
            </div>
          </Rise>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
