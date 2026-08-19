import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Ishaan Jindal — Developer",
    short_name: "Ishaan Jindal",
    description:
      "Infrastructure and DevOps engineer focused on container orchestration, deployment automation, and production observability.",
    start_url: "/",
    display: "standalone",
    background_color: "#0b0d10",
    theme_color: "#0b0d10",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}