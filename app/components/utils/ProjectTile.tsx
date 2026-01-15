import { motion } from "framer-motion";
import Image from "next/image";
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
        relative w-full h-full
        overflow-hidden rounded-lg
        bg-neutral-800
        hover:z-10
        focus:outline-none
      "
      whileHover={{ scale: 1.03 }}
    >
      <Image
        src={project.imageUrl}
        alt={project.title}
        fill
        className="object-cover"
        unoptimized
      />
    </motion.button>
  );
};

export default ProjectTile;

