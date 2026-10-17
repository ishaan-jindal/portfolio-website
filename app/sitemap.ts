import type { MetadataRoute } from "next";
import { getProjects } from "./lib/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://ishaanjindal.tech";
  return [
    {
      url: base,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${base}/resume`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...getProjects().map((project) => ({
      url: `${base}/projects/${project.id}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
