const HeroSection = () => {
  const year = new Date().getFullYear();

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between">
        <p className="eyebrow">
          <span className="text-[var(--accent)]">01</span> / 04
        </p>
        <p className="eyebrow">[ {year} ]</p>
      </div>

      <div className="mt-8 grid gap-12 lg:mt-10 lg:grid-cols-[1.35fr_1fr] lg:gap-0">
        {/* Name, role, bio */}
        <div className="lg:pr-14">
          <h1 className="display-name">
            <span className="block text-[var(--foreground)]">Ishaan</span>
            <span className="block text-[var(--accent)]">Jindal</span>
          </h1>

          <p className="mt-6 font-mono text-xs uppercase tracking-[0.3em] text-[var(--foreground)] sm:text-sm">
            Software Developer &amp; Open-Source Contributor
          </p>

          <div className="mt-8 max-w-[58ch] space-y-4">
            <p className="text-base leading-7 text-[var(--soft)]">
              I like
              building things — terminal tools, mobile apps, web experiments,
              and the infrastructure that carries them.
            </p>
            <p className="text-sm leading-7 text-[var(--muted)]">
              I care about software that stays simple, fast, and easy to read.
              Most of what I make ends up open source.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a href="#projects" className="text-button text-button--primary">
              View Projects
              <span aria-hidden="true">→</span>
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
        </div>

        {/* Statement + quote */}
        <div className="flex flex-col justify-between gap-14 border-t border-[var(--border)] pt-8 lg:border-t-0 lg:border-l lg:pt-1 lg:pl-14">
          <p className="text-2xl font-semibold uppercase leading-[1.08] tracking-[-0.02em] text-[var(--foreground)] sm:text-3xl lg:text-4xl">
            Build
            <br />
            systems
            <br />
            for a more
            <br />
            open internet.
          </p>

          <div className="lg:text-right">
            <p className="text-sm leading-6 text-[var(--muted)]">
              &ldquo;Good software
              <br />
              makes freedom possible.&rdquo;
            </p>
            <span
              className="mt-3 hidden h-px w-16 bg-[var(--accent)] lg:inline-block"
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
