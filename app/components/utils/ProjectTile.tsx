import { motion } from "framer-motion";
import Image from "next/image";
import SystemTile from "./SystemTile";
import type { Project } from "@/app/lib/projects";

interface ProjectTileProps {
  project: Project;
  onClick: () => void;
}

const ProjectTile: React.FC<ProjectTileProps> = ({ project, onClick }) => {
  return (
    <motion.button
      layoutId={`project-${project.id}`}
      onClick={onClick}
      className="
        relative w-full h-full text-left
        overflow-hidden rounded-2xl
        glass-panel glass-panel-hover
        hover:z-10 focus:outline-none
      "
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
    >
      {project.visual === "image" && project.imageUrl ? (
        <>
          <div className="absolute inset-0 z-0">
            <Image
              src={project.imageUrl}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-700 hover:scale-110"
              unoptimized
            />
            {/* Gradient overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent mix-blend-multiply" />
          </div>
          <div className="absolute bottom-0 left-0 w-full p-5 z-10 flex flex-col justify-end">
            <h3 className="text-xl font-bold text-white mb-1 shadow-black drop-shadow-md">
              {project.title}
            </h3>
            <p className="text-xs text-neutral-300 font-mono opacity-80 shadow-black drop-shadow-md">
              click_to_view()
            </p>
          </div>
        </>
      ) : (
        <SystemTile project={project} />
      )}
    </motion.button>
  );
};

export default ProjectTile;

