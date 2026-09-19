"use client";

import React, { useEffect, useState, useCallback } from "react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useScroll,
} from "framer-motion";
import { EASE, Stagger, StaggerItem } from "../utils/motion";

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
  hovered,
  onHover,
  onNavigate,
}: {
  section: (typeof sections)[number];
  active: boolean;
  hovered: boolean;
  onHover: (id: string | null) => void;
  onNavigate: (e: React.MouseEvent<HTMLAnchorElement>, id: string) => void;
}) => (
  <a
    href={`#${section.id}`}
    onClick={(e) => onNavigate(e, section.id)}
    onMouseEnter={() => onHover(section.id)}
    onMouseLeave={() => onHover(null)}
    onFocus={() => onHover(section.id)}
    onBlur={() => onHover(null)}
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
    {hovered && !active && (
      <motion.span
        layoutId="hover-nav-line"
        className="nav-link__underline opacity-50"
        transition={{ duration: 0.18, ease: EASE }}
      />
    )}
  </a>
);

const ScrollProgress = () => {
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  if (prefersReducedMotion) return null;
  return (
    <motion.div
      aria-hidden="true"
      className="absolute bottom-[-1px] left-0 h-px w-full origin-left bg-[var(--accent)]"
      style={{ scaleX: scrollYProgress }}
    />
  );
};
const Header = () => {
  const [active, setActive] = useState("about");
  const [hovered, setHovered] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    let frame = 0;

    const handler = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        // Sections can be nested inside positioned wrappers, so offsetTop is
        // unreliable — always measure against the viewport.
        const probe = 120;
        let current = sections[0].id;
        for (const section of sections) {
          const el = document.getElementById(section.id);
          if (!el) continue;
          if (el.getBoundingClientRect().top <= probe) {
            current = section.id;
          }
        }

        // Pin the last section when the page cannot scroll any further
        const doc = document.documentElement;
        if (window.innerHeight + window.scrollY >= doc.scrollHeight - 2) {
          current = sections[sections.length - 1].id;
        }

        setActive(current);
      });
    };

    window.addEventListener("scroll", handler, { passive: true });
    window.addEventListener("resize", handler, { passive: true });
    handler();
    return () => {
      window.removeEventListener("scroll", handler);
      window.removeEventListener("resize", handler);
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
      // scroll-padding-top on <html> keeps the section clear of the fixed header
      el.scrollIntoView({
        behavior: prefersReducedMotion ? "auto" : "smooth",
        block: "start",
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
        <div className="site-container relative flex h-[60px] items-center justify-between gap-6">
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
                hovered={hovered === section.id}
                onHover={setHovered}
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
        <ScrollProgress />
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
            <Stagger as="nav" gap={0.05} className="" aria-label="Sections">
              {sections.map((section) => (
                <StaggerItem key={section.id} as="div">
                <button
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
                </StaggerItem>
              ))}
            </Stagger>

            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.25, ease: EASE }}
              className="mt-14 flex flex-wrap items-center gap-2"
            >
              {disciplines.map((word, i) => (
                <React.Fragment key={word}>
                  {i > 0 && <span className="eyebrow">/</span>}
                  <span className="eyebrow">{word}</span>
                </React.Fragment>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
