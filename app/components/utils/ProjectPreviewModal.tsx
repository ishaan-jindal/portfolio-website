"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { Project } from "@/app/lib/projects";
import { createPortal } from "react-dom";

interface Props {
  project: Project;
  onClose: () => void;
}

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input:not([disabled]), select, [tabindex]:not([tabindex="-1"])';

const ProjectPreviewModal: React.FC<Props> = ({ project, onClose }) => {
  const prefersReducedMotion = useReducedMotion();
  const articleRef = useRef<HTMLElement | null>(null);
  const prevFocus = useRef<Element | null>(null);

  useEffect(() => {
    prevFocus.current = document.activeElement;
    const article = articleRef.current;
    article
      ?.querySelector<HTMLElement>("[data-autofocus]")
      ?.focus({ preventScroll: true });

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      // Focus trap: keep Tab cycling inside the dialog
      if (e.key !== "Tab" || !article) return;
      const items = Array.from(
        article.querySelectorAll<HTMLElement>(FOCUSABLE)
      ).filter((el) => el.offsetParent !== null);
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = prevOverflow;
      (prevFocus.current as HTMLElement | null)?.focus?.();
    };
  }, [onClose]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <motion.div
      className="fixed inset-0 z-[100] flex items-end justify-center bg-[rgba(10,10,10,0.9)] sm:items-center sm:px-6"
      initial={prefersReducedMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.12, ease: "easeOut" }}
      onClick={onClose}
    >
      <motion.article
        ref={articleRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        onClick={(e) => e.stopPropagation()}
        className="scrollbar-hide max-h-[92vh] w-full max-w-3xl overflow-y-auto border border-[var(--border-strong)] bg-[var(--background)] p-6 sm:max-h-[88vh] sm:p-10"
        initial={
          prefersReducedMotion
            ? false
            : { clipPath: "inset(100% 0 0 0)", y: 24 }
        }
        animate={{ clipPath: "inset(0% 0 0 0)", y: 0 }}
        exit={
          prefersReducedMotion
            ? undefined
            : { clipPath: "inset(100% 0 0 0)", y: 24 }
        }
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
        >
        <div className="flex items-start justify-between gap-6">
          <div>
            <p className="eyebrow text-[var(--accent)]">{project.shortTitle}</p>
            <h3
              id="project-modal-title"
              tabIndex={-1}
              data-autofocus
              className="mt-3 text-2xl font-bold uppercase tracking-[-0.02em] text-[var(--foreground)] sm:text-3xl"
            >
              {project.title}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="font-mono text-lg leading-none text-[var(--muted)] transition-colors hover:text-[var(--accent)]"
            aria-label="Close project details"
          >
            ✕
          </button>
        </div>
        </motion.div>

        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
        >
        <div className="mt-8 border-t border-[var(--border)] pt-8">
          <p className="text-sm leading-7 text-[var(--soft)]">
            {project.description}
          </p>

          <div className="mt-8">
            <h4 className="eyebrow text-[var(--foreground)]">Highlights</h4>
            <ul className="mt-4">
              {project.highlights.map((highlight) => (
                <li
                  key={highlight}
                  className="flex gap-3 border-b border-[var(--border)] py-3 font-mono text-xs leading-6 text-[var(--muted)] last:border-b-0"
                >
                  <span className="text-[var(--accent)]" aria-hidden="true">
                    —
                  </span>
                  {highlight}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8">
            <h4 className="eyebrow text-[var(--foreground)]">Stack</h4>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.stack.map((item) => (
                <span key={item} className="text-chip">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
        </motion.div>

        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
        >
        <div className="mt-9 flex flex-wrap gap-3">
          {project.githubLink && (
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-button text-button--primary"
            >
              View Source
            </a>
          )}
          {project.liveLink && (
            <a
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-button"
            >
              Live Demo
            </a>
          )}
          {project.testerLink && (
            <a
              href={project.testerLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-button"
            >
              Become a Tester
            </a>
          )}
        </div>
        </motion.div>
      </motion.article>
    </motion.div>,
    document.body
  );
};

export default ProjectPreviewModal;
