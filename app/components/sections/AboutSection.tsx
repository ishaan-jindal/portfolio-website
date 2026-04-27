import Image from "next/image";
import Reveal from "../utils/Reveal";
import AsciiPanel from "../utils/AsciiPanel";

const skillGroups = [
  {
    title: "Languages",
    items: ["Dart", "TypeScript", "JavaScript", "Kotlin", "Java", "C/C++"],
  },
  {
    title: "Build Stack",
    items: ["Flutter", "GetX", "Firebase", "Supabase", "Hive", "Node.js", "Next.js"],
  },
  {
    title: "Systems / Workflow",
    items: ["Clean Architecture", "Offline-first", "Docker", "Linux", "Neovim", "Arch", "Hyprland"],
  },
];

const AboutSection = () => {
  return (
    <div className="relative w-full px-6 pt-20 pb-20 min-h-screen">
      <div className="relative isolate min-h-[calc(100vh-5rem)] w-full overflow-hidden flex items-center">
        <div className="pointer-events-none absolute inset-y-0 right-[-22%] z-[-2] flex w-[105%] items-center justify-center opacity-38 sm:right-[-16%] sm:w-[88%] sm:opacity-44 lg:right-[-8%] lg:w-[62%] lg:opacity-52">
          <Image
            src="/ascii-me.png"
            alt=""
            width={1000}
            height={1000}
            priority
            className="h-auto w-full max-w-[820px] contrast-125 brightness-110 mix-blend-lighten"
            aria-hidden="true"
          />
        </div>
        <div className="absolute inset-y-0 left-0 z-[-1] w-full bg-[linear-gradient(90deg,var(--background)_0%,rgba(11,13,16,0.96)_38%,rgba(11,13,16,0.64)_66%,rgba(11,13,16,0.18)_100%)]" />
        <div className="absolute inset-x-[-1.5rem] bottom-0 z-[-1] h-36 bg-[linear-gradient(0deg,var(--background)_0%,transparent_100%)]" />

        <div className="mx-auto w-full max-w-6xl">
          <div className="max-w-4xl">
            <Reveal delay={0.1}>
              <p className="mb-5 font-mono text-sm uppercase text-[var(--accent)]">
                Available for new opportunities
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <h1 className="max-w-4xl text-6xl sm:text-7xl md:text-8xl font-semibold leading-[0.95] text-[var(--foreground)] mb-7">
                Ishaan Jindal
              </h1>
            </Reveal>

            <Reveal delay={0.3}>
              <p className="max-w-2xl text-xl md:text-2xl text-[var(--soft)] leading-9 mb-5">
                Flutter-first developer focused on clean architecture, system design, and experimental builds.
              </p>
              <p className="max-w-2xl text-base md:text-lg text-[var(--muted)] leading-8 mb-10">
                I&apos;m a CS student who enjoys building software that feels clean, efficient, and technically satisfying. 
                I prefer structured systems over quick fixes and projects that teach me something new—whether that means solving unusual problems
                or exploring unfamiliar territory.
              </p>
            </Reveal>

            <Reveal delay={0.4}>
              <div className="flex flex-wrap gap-4 items-center">
                <a href="#projects" className="text-button text-button--primary">
                  View Projects
                </a>
                <a href="#contact" className="text-button">
                  Contact
                </a>
                <a
                  href="https://github.com/ishaan-jindal"
                  target="_blank"
                  className="font-mono text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
                >
                  GitHub
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      <Reveal delay={0.5}>
        <div className="mx-auto mt-20 grid max-w-6xl gap-5 lg:grid-cols-[1.2fr_1fr]">
          <AsciiPanel
            eyebrow="About"
            title="Build Philosophy"
            text="I like building things that feel clean, minimal, and technically interesting. I’m drawn to structured systems, thoughtful design, and projects that let me explore how things work beneath the surface. I enjoy experimental ideas, solving unusual problems, and creating tools that feel simple, efficient, and intentional rather than overly complex or flashy."
          />

          <div className="ascii-panel">
            <h3 className="font-mono text-base text-[var(--foreground)] mb-5">
              Skills
            </h3>
            <div className="space-y-5">
              {skillGroups.map((group) => (
                <div key={group.title}>
                  <p className="font-mono text-xs uppercase text-[var(--accent)] mb-2">
                    {group.title}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((skill) => (
                      <span key={skill} className="text-chip">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  );
};

export default AboutSection;
