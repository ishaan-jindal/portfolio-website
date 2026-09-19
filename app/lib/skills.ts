import { readFileSync } from "fs";
import { join } from "path";

export type SkillGroup = {
  label: string;
  items: string[];
};

/**
 * Read skill groups from the JSON data file.
 * Single source of truth for the web skills section and the CLI /about output.
 */
export function getSkills(): SkillGroup[] {
  const filePath = join(process.cwd(), "data", "skills.json");
  const raw = readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as SkillGroup[];
}
