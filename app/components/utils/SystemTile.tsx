import React from "react";
import type { Project } from "@/app/lib/projects";

const SystemTile = ({ project }: { project: Project }) => {
  return (
    <div
      className="
        h-full w-full
        bg-neutral-900
        rounded-lg
        border border-neutral-800
        p-4
        font-mono text-xs
        text-neutral-300
        flex flex-col justify-between
      "
    >
      <div className="opacity-70">
        <p>$ system.status</p>
        <p className="text-neutral-500">running</p>
      </div>

      <div>
        <p className="text-white font-semibold">
          {project.title}
        </p>
        <p className="text-neutral-500 mt-1">
          backend / api
        </p>
      </div>

      <div className="text-neutral-500">
        id: {project.id}
      </div>
    </div>
  );
};

export default SystemTile;

