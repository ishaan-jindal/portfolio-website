"use client";

import React, { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const sections = [
  { id: "about", num: "01", label: "About" },
  { id: "projects", num: "02", label: "Projects" },
  { id: "skills", num: "03", label: "Skills" },
  { id: "contact", num: "04", label: "Contact" },
];

const disciplines = ["Build", "Deploy", "Automate", "Repeat"];

const NavItem = ({
  section,
  active,
  onNavigate,
}: {
  section: (typeof sections)[number];
  active: boolean;
  onNavigate: (e: React.MouseEvent<HTMLAnchorElement>, id: string) => void;
}) => (
  <a
    href={`#${section.id}`}
    onClick={(e) => onNavigate(e, section.id)}
    data-active={active}
    className="nav-link relative"
    aria-current={active ? "true" : undefined}
  >
    <span className="nav-link__num">{section.num}</span>
    {section.label}
    {active && (
      <motion.span
        layoutId="active-nav-line"
        className="nav-link__underline"
        transition={{ duration: 0.2, ease: "easeOut" }}
      />
    )}
  </a>
);

const Header = () => {
  const [active, setActive] = useState("about");
  const [mobileOpen, setMobileOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    let frame = 0;

    const handler = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const probe = window.scrollY + 160;
        for (const section of sections) {
          const el = document.getElementById(section.id);
          if (!el) continue;
          if (probe >= el.offsetTop && probe < el.offsetTop + el.offsetHeight) {
            setActive(section.id);
          }
        }
      });
    };

    window.addEventListener("scroll", handler, { passive: true });
    handler();
    return () => {
      window.removeEventListener("scroll", handler);
      cancelAnimationFrame(frame);
    };
  }, []);

  // Lock body scroll when the mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const navigateTo = useCallback(
    (id: string) => {
      setMobileOpen(false);
      const el = document.getElementById(id);
      if (!el) return;
      window.scrollTo({
        top: el.offsetTop - 60,
        behavior: prefersReducedMotion ? "auto" : "smooth",
      });
    },
    [prefersReducedMotion]
  );

  const handleNavigate = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
      e.preventDefault();
      navigateTo(id);
    },
    [navigateTo]
  );

  // Close the mobile menu on Escape and return focus to the toggle button
  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
        document
          .querySelector<HTMLElement>('[aria-label="Toggle navigation menu"]')
          ?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    document
      .querySelector<HTMLElement>(".mobile-menu-panel button")
      ?.focus({ preventScroll: true });
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-[var(--border)] bg-[var(--background)]">
        <div className="site-container flex h-[60px] items-center justify-between gap-6">
          <div className="flex flex-1 items-center">
            <a
              href="#about"
              onClick={(e) => handleNavigate(e, "about")}
              className="font-mono text-base font-bold tracking-[0.08em] text-[var(--foreground)]"
              aria-label="Ishaan Jindal — back to top"
            >
              IJ
            </a>
          </div>

          <nav className="hidden items-center gap-7 md:flex" aria-label="Sections">
            {sections.map((section) => (
              <NavItem
                key={section.id}
                section={section}
                active={active === section.id}
                onNavigate={handleNavigate}
              />
            ))}
          </nav>

          <div className="hidden flex-1 items-center justify-end gap-2 xl:flex">
            {disciplines.map((word, i) => (
              <React.Fragment key={word}>
                {i > 0 && <span className="eyebrow">/</span>}
                <span className="eyebrow">{word}</span>
              </React.Fragment>
            ))}
          </div>

          {/* Mobile hamburger button */}
          <button
            className="flex h-8 w-8 flex-col items-center justify-center gap-1.5 md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            <span
              className={`block h-px w-5 bg-[var(--foreground)] transition-all duration-200 ${
                mobileOpen ? "translate-y-[3.5px] rotate-45" : ""
              }`}
            />
            <span
              className={`block h-px w-5 bg-[var(--foreground)] transition-all duration-200 ${
                mobileOpen ? "-translate-y-[3.5px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </header>

      {/* Mobile overlay menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            className="mobile-menu-panel fixed inset-0 z-40 flex flex-col justify-center bg-[var(--background)] px-5 sm:px-8 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <nav aria-label="Sections">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => navigateTo(section.id)}
                  aria-current={active === section.id ? "true" : undefined}
                  className="flex w-full items-baseline gap-5 border-b border-[var(--border)] py-5 text-left"
                >
                  <span
                    className={`eyebrow ${
                      active === section.id ? "text-[var(--accent)]" : ""
                    }`}
                  >
                    {section.num}
                  </span>
                  <span
                    className={`section-title ${
                      active === section.id ? "" : "text-[var(--muted)]"
                    }`}
                  >
                    {section.label}
                  </span>
                </button>
              ))}
            </nav>

            <div className="mt-14 flex flex-wrap items-center gap-2">
              {disciplines.map((word, i) => (
                <React.Fragment key={word}>
                  {i > 0 && <span className="eyebrow">/</span>}
                  <span className="eyebrow">{word}</span>
                </React.Fragment>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
