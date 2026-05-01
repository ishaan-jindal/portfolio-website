"use client";

import React, { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const sections = ["about", "projects", "contact"];

const identityMap: Record<string, string> = {
  about: "Ishaan Jindal",
  projects: "Projects",
  contact: "Contact",
};

const NavLink = ({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop,
        behavior: "smooth",
      });
    }
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className={`relative px-3 py-1.5 font-mono text-sm transition-colors ${
        active ? "text-[var(--foreground)]" : "text-[var(--muted)] hover:text-[var(--foreground)]"
      }`}
    >
      {active && (
        <motion.span
          layoutId="active-nav-line"
          className="absolute left-3 right-3 -bottom-0.5 h-px bg-[var(--accent)]"
          transition={{ duration: 0.2, ease: "easeOut" }}
        />
      )}
      {children}
    </a>
  );
};

const Header = () => {
  const [active, setActive] = useState("about");
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const handler = () => {
      const scrollPos = window.scrollY;
      setScrolled(scrollPos > 20);

      for (const id of sections) {
        const el = document.getElementById(id);
        if (!el) continue;

        if (
          scrollPos >= el.offsetTop - 150 &&
          scrollPos < el.offsetTop + el.offsetHeight - 150
        ) {
          setActive(id);
        }
      }
    };

    window.addEventListener("scroll", handler);
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const handleMobileNav = useCallback((sectionId: string) => {
    setMobileOpen(false);
    const el = document.getElementById(sectionId);
    if (el) {
      setTimeout(() => {
        window.scrollTo({ top: el.offsetTop, behavior: "smooth" });
      }, 100);
    }
  }, []);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 pt-3 sm:pt-4 px-3 sm:px-4 flex justify-center">
        <motion.nav
          className={`flex items-center justify-between px-4 py-2.5 sm:py-3 w-full max-w-3xl transition-colors duration-300 border ${
            scrolled ? "bg-[rgba(12,15,20,0.86)] border-[var(--border)]" : "bg-transparent border-transparent"
          }`}
          initial={prefersReducedMotion ? false : { y: -24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        >
          <div className="flex-1">
            <span className="text-sm font-mono text-[var(--foreground)] inline-block">
              {identityMap[active] ?? "Ishaan Jindal"}
              <span className="text-[var(--accent)]">.</span>
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-1">
            <NavLink href="#about" active={active === "about"}>
              About
            </NavLink>
            <NavLink href="#projects" active={active === "projects"}>
              Projects
            </NavLink>
            <NavLink href="#contact" active={active === "contact"}>
              Contact
            </NavLink>
          </div>

          {/* Mobile hamburger button */}
          <button
            className="sm:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileOpen}
          >
            <span className={`block w-5 h-px bg-[var(--foreground)] transition-all duration-200 ${mobileOpen ? "rotate-45 translate-y-[3.5px]" : ""}`} />
            <span className={`block w-5 h-px bg-[var(--foreground)] transition-all duration-200 ${mobileOpen ? "-rotate-45 -translate-y-[3.5px]" : ""}`} />
          </button>
        </motion.nav>
      </header>

      {/* Mobile overlay menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-[rgba(11,13,16,0.96)] flex flex-col items-center justify-center gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {sections.map((section) => (
              <button
                key={section}
                onClick={() => handleMobileNav(section)}
                className={`font-mono text-lg transition-colors ${
                  active === section
                    ? "text-[var(--foreground)]"
                    : "text-[var(--muted)] hover:text-[var(--foreground)]"
                }`}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
                {active === section && (
                  <span className="block mx-auto mt-1 w-6 h-px bg-[var(--accent)]" />
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
