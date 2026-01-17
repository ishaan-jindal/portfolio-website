"use client";

import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import ScrollSection from "../utils/ScrollSection";
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
    <ScrollSection>
      <div className="w-full max-w-6xl mx-auto px-4 font-mono">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-white">
            projects()
          </h2>
          <p className="text-xs text-neutral-500">
            GET /projects ({projects.length} items)
          </p>
        </div>

        {/* Grid */}
        <div className="
          grid 
          grid-cols-1 sm:grid-clos-2 md:grid-cols-4
          auto-rows-[180px] md:auto-rows-[140px] 
          gap-4
        ">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={`${layouts[index % layouts.length]} relative`}
            >
              <ProjectTile
                project={project}
                onClick={() => setActiveProject(index)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {activeProject !== null && (
          <ProjectPreviewModal
            project={projects[activeProject]}
            onClose={() => setActiveProject(null)}
          />
        )}
      </AnimatePresence>
    </ScrollSection>
  );
};

export default ProjectsSection;

