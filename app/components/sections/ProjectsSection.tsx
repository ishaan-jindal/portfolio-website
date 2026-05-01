"use client";

import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Reveal from "../utils/Reveal";
import { projects } from "@/app/lib/projects";
import ProjectPreviewModal from "../utils/ProjectPreviewModal";
import TextProjectCard from "../utils/TextProjectCard";

const ProjectsSection = () => {
  const [activeProject, setActiveProject] = useState<number | null>(null);

  return (
    <div className="w-full mx-auto font-sans py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <Reveal delay={0.1}>
          <div className="mb-12 max-w-3xl">
            <p className="font-mono text-sm text-[var(--accent)] mb-3">
              Projects
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-semibold text-[var(--foreground)] mb-3 sm:mb-4">
              Experiments disguised as projects
            </h2>
            <p className="text-base leading-7 text-[var(--muted)]">
              Projects that prioritize curiosity, iteration, and understanding over polish
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.2} overflow="visible">
          <div className="grid gap-5 pt-2 md:grid-cols-2">
            {projects.map((project, index) => (
              <TextProjectCard
                key={project.id}
                project={project}
                onClick={() => setActiveProject(index)}
              />
            ))}
          </div>
        </Reveal>
      </div>

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
