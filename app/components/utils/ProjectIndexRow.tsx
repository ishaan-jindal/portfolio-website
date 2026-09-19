"use client";

import type { Project } from "@/app/lib/projects";

type Props = {
  project: Project;
  index: number;
  onClick: () => void;
};

const ProjectIndexRow = ({ project, index, onClick }: Props) => (
  <button type="button" onClick={onClick} className="index-row">
    <span className="index-row__num" aria-hidden="true">
      {String(index + 1).padStart(2, "0")}
    </span>

    <span className="index-row__main">
      <span className="index-row__title">{project.title}</span>
      <span className="index-row__desc">{project.description}</span>
    </span>

    <span className="index-row__tags">
      {project.stack.slice(0, 4).map((item) => (
        <span key={item} className="text-chip">
          {item}
        </span>
      ))}
    </span>

    <span className="index-row__cat">{project.category}</span>

    <span className="index-row__arrow" aria-hidden="true">
      →
    </span>
  </button>
);

export default ProjectIndexRow;
