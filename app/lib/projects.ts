export type Project = {
  id: string;
  title: string;
  description: string;
  visual: "image" | "system";
  imageUrl?: string;
  githubLink?: string;
  liveLink?: string;
};

export const projects: Project[] = [
  {
    id: "wedroid",
    title: "WeDroid",
    description:
      "A full-stack club management application built with flutter and supabase",
    visual: "image",
    imageUrl: "wedroid.png",
    githubLink: "https://github.com/ishaan-jindal/wedroid",
  },

  {
    id: "steal-css",
    title: "Steal CSS",
    description:
      'Steal CSS "steals" any website\'s CSS, vandalizes it with chaotic new styles, and displays the beautifully ruined result.',
    visual: "image",
    imageUrl: "steal-css.png",
    githubLink: "https://github.com/ishaan-jindal/steal-css",
    liveLink: "https://steal-css.sacred99.online/",
  },

  {
    id: "swift-write",
    title: "SwiftWrite",
    description:
      "A flutter mobile app for quick note making, limited code execution and much more.",
    visual: "image",
    imageUrl: "swiftwrite.png",
    githubLink: "https://github.com/ishaan-jindal/SwiftWrite",
  },

  {
    id: "code-executor",
    title: "Code-Executor",
    description:
      "Secure, isolated code execution service with JWT authentication, user-based rate limiting, Docker + gVisor sandbox, and comprehensive monitoring.",
    visual: "system",
    githubLink: "https://github.com/ishaan-jindal/code-executor",
  },
];
