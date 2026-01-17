import { useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import type { Project } from "@/app/lib/projects";
import { createPortal } from "react-dom";
import SystemTile from "./SystemTile";

interface Props {
  project: Project;
  onClose: () => void;
}

const ProjectPreviewModal: React.FC<Props> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKey);
      return () => window.removeEventListener("keydown", handleKey);
    }, [onClose]);

  return createPortal(
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 font-mono"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        layoutId={`project-${project.id}`}
        onClick={(e) => e.stopPropagation()}
        className="
          bg-neutral-900
          max-w-2xl w-full
          rounded-xl overflow-hidden
          shadow-xl
          relative
          border border-neutral-800
        "
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="
            absolute top-4 right-4 z-10
            bg-black/60 text-neutral-300
            w-9 h-9 rounded-full
            flex items-center justify-center
            hover:text-white hover:bg-black/80
            text-sm
          "
        >
          ×
        </button>

        {/* Image */}
        <div className="relative w-full h-56">
        { project.visual === "image" && project.imageUrl ? (
          <Image
            src={project.imageUrl}
            alt={project.title}
            fill
            className="object-cover"
            unoptimized
          />
        ) : (
          <SystemTile project={project} />
        )}
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Header */}
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-white">
              {project.title}
            </h3>
            <p className="text-xs text-neutral-500">
              resource: /projects/{project.id}
            </p>
          </div>

          {/* Description */}
          <p className="text-sm text-neutral-400 leading-relaxed mb-6">
            {project.description}
          </p>

          {/* Actions */}
          <div className="flex gap-6 text-sm">
            {project.githubLink && (
              <a
                href={project.githubLink}
                target="_blank"
                className="text-neutral-400 hover:text-white transition-colors"
              >
                source →
              </a>
            )}
            {project.liveLink && (
              <a
                href={project.liveLink}
                target="_blank"
                className="text-neutral-400 hover:text-white transition-colors"
              >
                deploy →
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

