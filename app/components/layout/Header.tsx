"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const sections = ["about", "projects", "contact"];

const identityMap: Record<string, string> = {
  about: "ishaan_jindal",
  projects: "random_creations",
  contact: "reach_out",
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
      className={`
        relative px-3 py-1.5 font-sans text-sm font-medium transition-colors
        ${active ? "text-white" : "text-neutral-400 hover:text-white"}
      `}
    >
      {active && (
        <motion.div
          layoutId="active-nav-pill"
          className="absolute inset-0 bg-red-600/20 rounded-full -z-10"
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
        />
      )}
      {children}
    </a>
  );
};

const Header = () => {
  const [active, setActive] = useState("about");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => {
      const scrollPos = window.scrollY;
      setScrolled(scrollPos > 20);

      // Simple intersection logic based on scroll position
      for (const id of sections) {
        const el = document.getElementById(id);
        if (!el) continue;

        // Add 150px offset to detect earlier
        if (
          scrollPos >= el.offsetTop - 150 &&
          scrollPos < el.offsetTop + el.offsetHeight - 150
        ) {
          setActive(id);
        }
      }
    };

    window.addEventListener("scroll", handler);
    handler(); // Run once on mount
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pt-4 px-4 flex justify-center">
      <motion.nav
        className={`
          flex items-center justify-between px-5 py-3 rounded-2xl w-full max-w-3xl
          transition-all duration-300 border
          ${scrolled ? "bg-black/40 backdrop-blur-md border-white/10 shadow-lg shadow-black/50" : "bg-transparent border-transparent"}
        `}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="flex-1">
          <AnimatePresence mode="wait">
            <motion.span
              key={active}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              className="text-sm font-bold tracking-tight text-white inline-block"
            >
              {identityMap[active] ?? "ishaan_jindal"}
              <span className="text-red-500">.</span>
            </motion.span>
          </AnimatePresence>
        </div>

        <div className="hidden sm:flex items-center gap-1 bg-white/5 p-1 rounded-full border border-white/5">
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
          <span className="text-xs text-neutral-500 uppercase tracking-widest">Menu</span>
        </div>
      </motion.nav>
    </header>
  );
};

export default Header;

