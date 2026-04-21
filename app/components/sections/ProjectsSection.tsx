"use client";

import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Reveal from "../utils/Reveal";
import { projects } from "@/app/lib/projects";
import ProjectTile from "../utils/ProjectTile";
import ProjectPreviewModal from "../utils/ProjectPreviewModal";

const ProjectsSection = () => {
  const [activeProject, setActiveProject] = useState<{ index: number; uniqueId: string } | null>(null);

  // We split projects if there are many, but since there are 4, 
  // let's create a visual "brick" layout by shuffling or slicing.
  // For a continuous marquee, we duplicate the arrays.
  
  // Row 1: Original order
  const row1 = [...projects, ...projects];
  
  // Row 2: Reversed or offset order
  const row2 = [...projects].reverse();
  const duplicatedRow2 = [...row2, ...row2];

  return (
    <div className="w-full mx-auto font-sans py-10 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal delay={0.1}>
          <div className="mb-12 text-center sm:text-left">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-2">
              Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-800">Projects</span>
            </h2>
            <p className="text-sm text-neutral-400 font-mono">
              GET /projects ({projects.length} curated works)
            </p>
          </div>
        </Reveal>
      </div>

      <Reveal delay={0.2}>
        <div className="flex flex-col gap-4 md:gap-6 hover-pause w-full">
          {/* Row 1 - Moving Left */}
          <div className="flex w-max gap-4 md:gap-6 animate-scroll-x px-4 md:px-0">
            {row1.map((project, index) => (
              <div
                key={`r1-${project.id}-${index}`}
                className="w-[280px] sm:w-[350px] md:w-[420px] h-[220px] md:h-[260px] flex-shrink-0 relative group perspective"
              >
                <ProjectTile
                  project={project}
                  uniqueId={`r1-${project.id}-${index}`}
                  onClick={() => setActiveProject({ 
                    index: projects.findIndex(p => p.id === project.id),
                    uniqueId: `r1-${project.id}-${index}`
                  })}
                />
              </div>
            ))}
          </div>

          {/* Row 2 - Moving Right */}
          <div className="flex w-max gap-4 md:gap-6 animate-scroll-x-reverse px-4 md:px-0" style={{ transform: "translateX(-10%)" }}>
            {duplicatedRow2.map((project, index) => (
              <div
                key={`r2-${project.id}-${index}`}
                className="w-[280px] sm:w-[350px] md:w-[420px] h-[220px] md:h-[260px] flex-shrink-0 relative group perspective"
              >
                <ProjectTile
                  project={project}
                  uniqueId={`r2-${project.id}-${index}`}
                  onClick={() => setActiveProject({
                    index: projects.findIndex(p => p.id === project.id),
                    uniqueId: `r2-${project.id}-${index}`
                  })}
                />
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      <AnimatePresence>
        {activeProject !== null && (
          <ProjectPreviewModal
            project={projects[activeProject.index]}
            layoutId={activeProject.uniqueId}
            onClose={() => setActiveProject(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProjectsSection;

