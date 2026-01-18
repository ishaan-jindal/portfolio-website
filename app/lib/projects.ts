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
    githubLink: "https://github.com/SacredNightmare99/wedroid",
  },

  {
    id: "steal-css",
    title: "Steal CSS",
    description:
      'Steal CSS "steals" any website\'s CSS, vandalizes it with chaotic new styles, and displays the beautifully ruined result.',
    visual: "image",
    imageUrl: "steal-css.png",
    githubLink: "https://github.com/SacredNightmare99/steal-css",
    liveLink: "https://steal-css.sacred99.online/",
  },

  {
    id: "swift-write",
    title: "SwiftWrite",
    description:
      "A flutter mobile app for quick note making, limited code execution and much more.",
    visual: "image",
    imageUrl: "swiftwrite.png",
    githubLink: "https://github.com/SacredNightmare99/SwiftWrite",
  },

  {
    id: "debug-platform",
    title: "Debugging Challenge Engine",
    description:
      "A backend platform for debugging-first coding challenges that evaluates functional correctness first, then enforces minimal, genuine fixes using a custom debug-aware similarity engine.",
    visual: "system",
    githubLink: "https://github.com/SacredNightmare99/debug-platform",
  },
];
