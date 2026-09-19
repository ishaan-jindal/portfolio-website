"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import type { Project } from "@/app/lib/projects";
import ProjectIndexRow from "../utils/ProjectIndexRow";
import ProjectPreviewModal from "../utils/ProjectPreviewModal";
import { Stagger, StaggerItem, CountUp, Rise } from "../utils/motion";

type Props = {
  projects: Project[];
};

const ProjectsSection = ({ projects }: Props) => {
  const [activeProject, setActiveProject] = useState<number | null>(null);

  return (
    <div>
      <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
        <Rise scroll>
          <div>
            <p className="eyebrow">
              <span className="text-[var(--accent)]">
                <CountUp to={2} />
              </span>{" "}
              / 04
            </p>
            <h2 className="section-title mt-4">
              Selected
              <br />
              projects
            </h2>
          </div>
        </Rise>

        <Rise scroll delay={0.1}>
          <div className="lg:max-w-sm lg:text-right">
            <p className="text-sm leading-6 text-[var(--soft)]">
              Small tools. Bigger ideas.
              <br />A collection of projects I&apos;ve built and contributed to.
            </p>
            <a
              href="https://github.com/ishaan-jindal?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-5 inline-flex items-center gap-2 font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-[var(--foreground)] transition-colors hover:text-[var(--accent)]"
            >
              View all
              <span
                aria-hidden="true"
                className="inline-block transition-transform duration-200 group-hover:translate-x-1"
              >
                →
              </span>
            </a>
          </div>
        </Rise>
      </div>

      <Stagger className="mt-10 border-t border-[var(--border)]" gap={0.045}>
        {projects.map((project, index) => (
          <StaggerItem key={project.id} as="div">
            <ProjectIndexRow
              project={project}
              index={index}
              onClick={() => setActiveProject(index)}
            />
          </StaggerItem>
        ))}
      </Stagger>

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
