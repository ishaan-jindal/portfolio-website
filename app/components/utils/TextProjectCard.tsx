"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { Project } from "@/app/lib/projects";

type Props = {
  project: Project;
  onClick: () => void;
};

const TextProjectCard = ({ project, onClick }: Props) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.button
      type="button"
      onClick={onClick}
      className="text-project-card group"
      whileHover={prefersReducedMotion ? undefined : { y: -3 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      <span className="font-mono text-sm text-[var(--accent)]">{project.asciiLabel}</span>
      <span className="mt-4 block font-mono text-xs uppercase text-[var(--muted)]">
        {project.shortTitle}
      </span>
      <span className="mt-2 block text-xl font-semibold text-[var(--foreground)]">
        {project.title}
      </span>
      <span className="mt-5 block min-h-24 font-mono text-sm leading-6 text-[var(--muted)]">
        {project.description}
      </span>
      <span className="mt-6 flex flex-wrap gap-2">
        {project.stack.slice(0, 4).map((item) => (
          <span key={item} className="text-chip">
            {item}
          </span>
        ))}
      </span>
      <span className="mt-6 block font-mono text-xs text-[var(--accent-2)]">
        read details
      </span>
    </motion.button>
  );
};

export default TextProjectCard;
