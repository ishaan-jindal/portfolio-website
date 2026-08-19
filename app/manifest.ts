import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Ishaan Jindal — Developer",
    short_name: "Ishaan Jindal",
    description:
      "Portfolio of Ishaan Jindal, a Flutter-focused developer interested in clean interfaces, unusual ideas, and system-level problem solving.",
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