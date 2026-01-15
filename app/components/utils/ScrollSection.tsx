"use client";

import React, { useRef, useEffect } from "react";

interface ScrollSectionProps {
  children: React.ReactNode;
}

const ScrollSection: React.FC<ScrollSectionProps> = ({ children }) => {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        entry.target.classList.toggle("is-visible", entry.isIntersecting);
      },
      {
        threshold: 0.18,
      }
    );

    observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="scroll-section w-full min-h-screen block py-24 bg-black"
    >
      <div className="w-full max-w-7xl mx-auto px-4">
        {children}
      </div>
    </section>
  );
};

export default ScrollSection;
