"use client";

import { useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { Project } from "@/app/lib/projects";
import { createPortal } from "react-dom";

interface Props {
  project: Project;
  onClose: () => void;
}

const ProjectPreviewModal: React.FC<Props> = ({ project, onClose }) => {
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[rgba(8,10,14,0.86)] px-4 font-sans"
      initial={prefersReducedMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={prefersReducedMotion ? undefined : { opacity: 0 }}
      onClick={onClose}
    >
      <motion.article
        onClick={(e) => e.stopPropagation()}
        className="ascii-panel max-w-3xl w-full max-h-[88vh] overflow-y-auto scrollbar-hide"
        initial={prefersReducedMotion ? false : { y: 18, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={prefersReducedMotion ? undefined : { y: 18, opacity: 0 }}
        transition={{ duration: 0.22, ease: "easeOut" }}
      >
        <div className="flex items-start justify-between gap-6">
          <div>
            <p className="font-mono text-sm text-[var(--accent)]">{project.asciiLabel}</p>
            <h3 className="mt-2 text-3xl font-semibold text-[var(--foreground)]">
              {project.title}
            </h3>
            <p className="mt-2 font-mono text-sm text-[var(--muted)]">
              {project.shortTitle}
            </p>
          </div>

          <button
            onClick={onClose}
            className="font-mono text-xl text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
            aria-label="Close project details"
          >
            x
          </button>
        </div>

        <div className="mt-7 border-t border-[var(--border)] pt-7">
          <p className="text-base leading-8 text-[var(--muted)]">
            {project.description}
          </p>

          <div className="mt-7">
            <h4 className="font-mono text-sm text-[var(--foreground)] mb-3">
              Highlights
            </h4>
            <ul className="space-y-3">
              {project.highlights.map((highlight) => (
                <li
                  key={highlight}
                  className="font-mono text-sm leading-6 text-[var(--muted)]"
                >
                  <span className="text-[var(--accent)]" aria-hidden="true">- </span>
                  {highlight}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-7 flex flex-wrap gap-2">
            {project.stack.map((item) => (
              <span key={item} className="text-chip">
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-4">
          {project.githubLink && (
            <a
              href={project.githubLink}
              target="_blank"
              className="text-button text-button--primary"
            >
              View Source
            </a>
          )}
          {project.liveLink && (
            <a href={project.liveLink} target="_blank" className="text-button">
              Live Demo
            </a>
          )}
        </div>
      </motion.article>
    </motion.div>,
    document.body
  );
};

export default ProjectPreviewModal;
