const Footer = () => {
  return (
    <footer className="w-full border-t border-neutral-800 py-6 mt-24">
      <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center text-xs font-mono text-neutral-500 gap-4">
        <span>© {new Date().getFullYear()} Ishaan Jindal</span>

        <span className="opacity-70">
          ishaanjindal.tech
        </span>
      </div>
    </footer>
  );
};

export default Footer;

