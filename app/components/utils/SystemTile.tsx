import React from "react";
import type { Project } from "@/app/lib/projects";

const SystemTile = ({ project }: { project: Project }) => {
  return (
    <div
      className="
        h-full w-full
        p-6
        font-mono text-sm
        flex flex-col justify-between
        bg-black/40 backdrop-blur-md
        relative overflow-hidden
      "
    >
      {/* Decorative blurred blob */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-red-900/30 rounded-full blur-[40px] pointer-events-none" />

      <div className="opacity-80">
        <p className="text-neutral-400">$ system.status</p>
        <p className="text-red-400 animate-pulse-slow">● running</p>
      </div>

      <div className="z-10">
        <h3 className="text-xl font-bold text-white mb-1">
          {project.title}
        </h3>
        <p className="text-neutral-400 text-xs mt-1">
          [ backend_api_system ]
        </p>
      </div>

      <div className="text-neutral-600 text-xs z-10 border-t border-white/5 pt-2 mt-4">
        id: {project.id}
      </div>
    </div>
  );
};

export default SystemTile;

