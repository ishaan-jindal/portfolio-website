"use client";

import React, { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

interface RevealProps {
  children: React.ReactNode;
  width?: "fit-content" | "100%";
  delay?: number;
  overflow?: "hidden" | "visible";
}

const Reveal = ({ children, width = "100%", delay = 0, overflow = "hidden" }: RevealProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });
  const prefersReducedMotion = useReducedMotion();

  return (
    <div ref={ref} style={{ position: "relative", width, overflow }}>
      <motion.div
        variants={{
          hidden: prefersReducedMotion
            ? { opacity: 1, y: 0, filter: "blur(0px)" }
            : { opacity: 0, y: 24, filter: "blur(4px)" },
          visible: { opacity: 1, y: 0, filter: "blur(0px)" },
        }}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        transition={{ duration: 0.45, delay: prefersReducedMotion ? 0 : delay, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default Reveal;
