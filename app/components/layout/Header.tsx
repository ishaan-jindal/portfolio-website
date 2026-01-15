"use client";

import React, { useEffect, useState } from "react";

const sections = ["about", "projects", "contact"];

const identityMap: Record<string, string> = {
  projects: "sacred_nightmare",
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
    const container = document.querySelector(".scroll-container");

    if (targetElement && container) {
      container.scrollTo({
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
        font-mono text-xs transition-colors
        ${active ? "text-white" : "text-neutral-500 hover:text-white"}
      `}
    >
      {children}
    </a>
  );
};

const Header = () => {
  const [active, setActive] = useState("about");

  useEffect(() => {
    const container = document.querySelector(".scroll-container");
    if (!container) return;

    const handler = () => {
      const scrollPos = container.scrollTop;

      for (const id of sections) {
        const el = document.getElementById(id);
        if (!el) continue;

        if (
          scrollPos >= el.offsetTop - 100 &&
          scrollPos < el.offsetTop + el.offsetHeight - 100
        ) {
          setActive(id);
          break;
        }
      }
    };

    container.addEventListener("scroll", handler);
    return () => container.removeEventListener("scroll", handler);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <nav className="max-w-7xl mx-auto px-4">
        <div className="h-14 flex items-center justify-between bg-black/40 backdrop-blur-lg border border-neutral-800 rounded-b-xl px-4 font-mono">
          <span
            key={active}
            className="
              text-sm text-white font-mono
              transition-all duration-300
              animate-identity
            "
          >
            {identityMap[active] ?? "ishaan_jindal"}
          </span>

          <div className="hidden sm:flex gap-6">
            <NavLink href="#about" active={active === "about"}>
              about()
            </NavLink>
            <NavLink href="#projects" active={active === "projects"}>
              projects()
            </NavLink>
            <NavLink href="#contact" active={active === "contact"}>
              contact()
            </NavLink>
          </div>
          <div className="sm:hidden text-xs text-neutral-500 font-mono">
            scroll ↓
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;

