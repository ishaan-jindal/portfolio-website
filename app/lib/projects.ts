export type Project = {
  id: string;
  title: string;
  shortTitle: string;
  asciiLabel: string;
  description: string;
  stack: string[];
  highlights: string[];
  pixelArtUrl?: string;
  imageUrl?: string;
  githubLink?: string;
  liveLink?: string;
};

export const projects: Project[] = [
  {
    id: "wedroid",
    title: "WeDroid",
    shortTitle: "Club ops app",
    asciiLabel: "[WD]",
    description:
      "A full-stack club management application for coordinating members, events, and internal updates without burying the simple workflows.",
    stack: ["Flutter", "Supabase", "PostgreSQL", "Auth"],
    highlights: [
      "Cross-platform app structure",
      "Member and event management flows",
      "Backend-backed state and authentication",
    ],
    imageUrl: "wedroid.png",
    githubLink: "https://github.com/ishaan-jindal/wedroid",
  },

  {
    id: "steal-css",
    title: "Steal CSS",
    shortTitle: "Style mutation tool",
    asciiLabel: "[SC]",
    description:
      "A browser-facing experiment that extracts a page's styling, mutates it into a stranger design language, and shows the transformed result.",
    stack: ["Next.js", "TypeScript", "CSS parsing", "Vercel"],
    highlights: [
      "Fetches and transforms remote stylesheets",
      "Turns static CSS into a playful design remix",
      "Ships with a live public demo",
    ],
    imageUrl: "steal-css.png",
    githubLink: "https://github.com/ishaan-jindal/steal-css",
    liveLink: "https://steal-css.sacred99.online/",
  },

  {
    id: "swift-write",
    title: "SwiftWrite",
    shortTitle: "Local writing desk",
    asciiLabel: "[SW]",
    description:
      "Local-first, cross-platform Flutter writing app with Markdown support, hybrid todo editing, optional cloud sync, and code execution.",
    stack: ["Flutter", "Markdown", "Local-first storage", "Sync"],
    highlights: [
      "Markdown-first writing workflow",
      "Hybrid notes and todo editing",
      "Optional sync without giving up local control",
    ],
    imageUrl: "swiftwrite.png",
    githubLink: "https://github.com/ishaan-jindal/SwiftWrite",
  },

  {
    id: "code-executor",
    title: "Code-Executor",
    shortTitle: "Sandboxed execution",
    asciiLabel: "[CE]",
    description:
      "Secure, isolated code execution service with JWT authentication, user-based rate limiting, Docker + gVisor sandbox, and comprehensive monitoring.",
    stack: ["Node.js", "Docker", "gVisor", "JWT", "Prometheus"],
    highlights: [
      "Isolated runtime for untrusted code",
      "Rate limits and token-based access",
      "Monitoring-oriented backend architecture",
    ],
    pixelArtUrl: "debug-platform.png",
    githubLink: "https://github.com/ishaan-jindal/code-executor",
  },
];
