const Footer = () => {
  return (
    <footer className="w-full border-t border-[var(--border)] py-6 mt-20">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center text-xs font-mono text-[var(--muted)] gap-4">
        <span>© {new Date().getFullYear()} Ishaan Jindal</span>

        <span className="opacity-70">
          Built with text, care, and a little ASCII.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
