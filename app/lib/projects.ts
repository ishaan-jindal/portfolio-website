import { readFileSync } from "fs";
import { join } from "path";

export type Project = {
  id: string;
  title: string;
  shortTitle: string;
  asciiLabel: string;
  description: string;
  stack: string[];
  highlights: string[];
  githubLink?: string;
  liveLink?: string;
  testerLink?: string;
};

/**
 * Read projects from the JSON data file.
 * Works at build time (SSG/ISR) and at request time (SSR).
 */
export function getProjects(): Project[] {
  const filePath = join(process.cwd(), "data", "projects.json");
  const raw = readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as Project[];
}
