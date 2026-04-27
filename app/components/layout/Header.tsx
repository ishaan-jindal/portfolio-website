"use client";

import React, { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

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

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pt-4 px-4 flex justify-center">
      <motion.nav
        className={`flex items-center justify-between px-4 py-3 w-full max-w-3xl transition-colors duration-300 border ${
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

        <div className="sm:hidden flex-1 flex justify-end">
          <span className="text-xs text-[var(--muted)] uppercase font-mono">Keep Scrolling</span>
        </div>
      </motion.nav>
    </header>
  );
};

export default Header;
