"use client";

import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Reveal from "../utils/Reveal";
import { projects } from "@/app/lib/projects";
import ProjectTile from "../utils/ProjectTile";
import ProjectPreviewModal from "../utils/ProjectPreviewModal";

const layouts = [
  "md:col-span-1 md:row-span-2",
  "md:col-span-3 md:row-span-2",
  "md:col-span-2 md:row-span-2",
  "md:col-span-2 md:row-span-2",
];

const ProjectsSection = () => {
  const [activeProject, setActiveProject] = useState<number | null>(null);

  return (
    <div className="w-full max-w-6xl mx-auto px-6 font-sans py-10">
      <Reveal delay={0.1}>
        <div className="mb-10 text-center sm:text-left">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-2">
            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-800">Projects</span>
          </h2>
          <p className="text-sm text-neutral-400 font-mono">
            GET /projects ({projects.length} curated works)
          </p>
        </div>
      </Reveal>

      <Reveal delay={0.2}>
        <div className="
          grid 
          grid-cols-1 sm:grid-cols-2 md:grid-cols-4
          auto-rows-[220px] md:auto-rows-[240px] 
          gap-4 md:gap-6
        ">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={`${layouts[index % layouts.length]} relative group perspective`}
            >
              <ProjectTile
                project={project}
                onClick={() => setActiveProject(index)}
              />
            </div>
          ))}
        </div>
      </Reveal>

      <AnimatePresence>
        {activeProject !== null && (
          <ProjectPreviewModal
            project={projects[activeProject]}
            onClose={() => setActiveProject(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProjectsSection;

