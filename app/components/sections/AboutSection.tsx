import { TypeAnimation } from "react-type-animation";
import Reveal from "../utils/Reveal";
import { motion } from "framer-motion";

const skills = [
  "TypeScript", "Node.js", "Docker", "Next.js", "PostgreSQL", 
  "Flutter", "Redis", "Prometheus", "C/C++", "Java", "MongoDB"
];

const AboutSection = () => {
  return (
    <div className="relative w-full max-w-6xl mx-auto px-6 pt-32 pb-20 flex flex-col justify-center min-h-[90vh]">
      
      {/* Background Grid & Glow Accent */}
      <div className="absolute inset-0 z-[-1] bg-grid-pattern opacity-40 pointer-events-none" />
      <div className="absolute top-[20%] right-[10%] w-[300px] h-[300px] bg-red-600/20 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-[10%] left-[5%] w-[400px] h-[400px] bg-red-900/10 rounded-full blur-[150px] pointer-events-none mix-blend-screen" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Text Column */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          <Reveal delay={0.1}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-neutral-300 text-xs font-mono mb-8 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)] animate-pulse-slow"></span>
              Available for new opportunities
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60 leading-[1.1]">
              Building software <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-800">
                that just works.
              </span>
            </h1>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="mb-6 h-8 flex items-center">
              <span className="text-lg md:text-xl text-neutral-400 font-mono mr-2">
                &gt; role:
              </span>
              <span className="text-lg md:text-xl font-mono text-white">
                <TypeAnimation
                  sequence={[
                    "backend_engineer()", 1500,
                    "full_stack_developer()", 1500,
                    "problem_solver()", 1500,
                  ]}
                  speed={50}
                  repeat={Infinity}
                  cursor={true}
                  className="text-red-400"
                />
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.4}>
            <p className="max-w-xl text-base md:text-lg text-neutral-400 leading-relaxed mb-10">
              I'm a CS student who loves diving into backend systems, containerized environments, and API design. From code execution engines to cross-platform mobile apps, I enjoy turning complex ideas into functional projects.
            </p>
          </Reveal>

          <Reveal delay={0.5}>
            <div className="flex flex-wrap gap-4 items-center">
              <a
                href="#projects"
                className="px-8 py-3.5 rounded-full bg-white text-black font-semibold hover:bg-neutral-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:scale-105 active:scale-95"
              >
                View Projects
              </a>
              <div className="flex gap-4 ml-2">
                <a
                  href="https://github.com/ishaan-jindal"
                  target="_blank"
                  className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 hover:border-white/40 transition-all"
                  aria-label="GitHub"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </a>
                <a
                  href="https://linkedin.com/in/jindal-ishaan"
                  target="_blank"
                  className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 hover:border-white/40 transition-all"
                  aria-label="LinkedIn"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Right Info / Stats Column */}
        <div className="lg:col-span-5 w-full relative">
          <Reveal delay={0.4}>
            <div className="glass-panel p-6 sm:p-8 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/10 rounded-full blur-[40px] group-hover:bg-red-600/20 transition-all duration-500" />
              
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <span className="text-red-500">{"//"}</span> Tech Stack & Core
              </h3>
              
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, i) => (
                  <span 
                    key={skill}
                    className="px-3 py-1.5 bg-black/40 border border-white/5 rounded-md text-sm font-mono text-neutral-300 hover:text-white hover:border-red-500/50 hover:bg-red-500/10 transition-all cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
