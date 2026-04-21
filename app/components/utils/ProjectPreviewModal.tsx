import { useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import type { Project } from "@/app/lib/projects";
import { createPortal } from "react-dom";
import SystemTile from "./SystemTile";

interface Props {
  project: Project;
  layoutId: string;
  onClose: () => void;
}

const ProjectPreviewModal: React.FC<Props> = ({ project, layoutId, onClose }) => {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKey);
      return () => window.removeEventListener("keydown", handleKey);
    }, [onClose]);

  // Ensure document.body exists (for SSR)
  if (typeof document === 'undefined') return null;

  return createPortal(
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm px-4 font-sans"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        layoutId={layoutId}
        onClick={(e) => e.stopPropagation()}
        className="
          glass-panel
          max-w-2xl w-full
          rounded-2xl overflow-hidden
          shadow-[0_20px_50px_rgba(0,0,0,0.5)]
          relative
        "
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="
            absolute top-4 right-4 z-20
            bg-black/60 text-white
            w-8 h-8 rounded-full
            flex items-center justify-center
            hover:bg-red-600 transition-colors
            text-lg pb-1
            backdrop-blur-md border border-white/10
          "
        >
          &times;
        </button>

        {/* Image */}
        <div className="relative w-full h-64 md:h-72">
        { project.visual === "image" && project.imageUrl ? (
          <>
            <Image
              src={project.imageUrl}
              alt={project.title}
              fill
              className="object-cover"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          </>
        ) : (
          <SystemTile project={project} />
        )}
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 relative -mt-16 z-10">
          {/* Header */}
          <div className="mb-4">
            <h3 className="text-2xl md:text-3xl font-bold text-white drop-shadow-md">
              {project.title}
            </h3>
            <div className="flex items-center gap-2 mt-2">
              <span className="px-2 py-0.5 bg-red-500/20 text-red-400 text-xs rounded border border-red-500/30 font-mono">
                {project.id}
              </span>
            </div>
          </div>

          {/* Description */}
          <p className="text-base text-neutral-300 leading-relaxed mb-8">
            {project.description}
          </p>

          {/* Actions */}
          <div className="flex gap-4 text-sm font-medium">
            {project.githubLink && (
              <a
                href={project.githubLink}
                target="_blank"
                className="px-5 py-2.5 rounded-full bg-white text-black hover:bg-neutral-200 transition-colors shadow-lg"
              >
                View Source
              </a>
            )}
            {project.liveLink && (
              <a
                href={project.liveLink}
                target="_blank"
                className="px-5 py-2.5 rounded-full bg-transparent border border-white/20 text-white hover:bg-white/10 transition-colors"
              >
                Live Demo ↗
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>,
    document.body
  );
};

export default ProjectPreviewModal;

