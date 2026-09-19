const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto">
      <div className="site-container">
        <div className="flex flex-col gap-3 border-t border-[var(--border)] py-8 font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-[var(--muted)] sm:flex-row sm:items-center sm:justify-between">
          <span className="font-bold tracking-[0.08em] text-[var(--foreground)]">
            IJ
          </span>

          <span>© {year} Ishaan Jindal. All rights reserved.</span>

          <span className="flex items-center gap-2">
            Built with HTML, CSS and a lot of
            <span className="text-[var(--accent)]" aria-hidden="true">
              &gt;_
            </span>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
