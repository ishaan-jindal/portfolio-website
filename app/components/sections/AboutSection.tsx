import { TypeAnimation } from "react-type-animation";
import Reveal from "../utils/Reveal";

const AboutSection = () => {
  return (
    <div className="relative w-full max-w-5xl mx-auto px-6 pt-32 pb-20 flex flex-col items-center justify-center min-h-[80vh]">
      
      {/* Background Grid Accent */}
      <div className="absolute inset-0 z-[-1] bg-grid-pattern opacity-50 pointer-events-none" />

      <Reveal delay={0.1}>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-mono mb-8 animate-pulse-slow">
          <span className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]"></span>
          Available for new opportunities
        </div>
      </Reveal>

      <Reveal delay={0.2}>
        <h1 className="text-5xl md:text-7xl font-bold text-center tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">
          Crafting systems that <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-800">
            scale and inspire.
          </span>
        </h1>
      </Reveal>

      <Reveal delay={0.3}>
        <div className="text-center mb-10 h-8">
          <span className="text-lg md:text-xl text-neutral-400 font-mono">
            I am a{" "}
          </span>
          <span className="text-lg md:text-xl font-mono text-white">
            <TypeAnimation
              sequence={[
                "full_stack_developer()",
                1500,
                "system_architect()",
                1500,
                "problem_solver()",
                1500,
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
        <p className="max-w-2xl text-center text-base md:text-lg text-neutral-400 leading-relaxed mb-12">
          I build robust, beautifully designed applications focusing on flawless execution and deep technical functionality. From complex backend architectures to seamless, glassmorphic interfaces.
        </p>
      </Reveal>

      <Reveal delay={0.5}>
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <a
            href="#projects"
            className="px-8 py-3 rounded-full bg-white text-black font-medium hover:bg-neutral-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.1)]"
          >
            Explore Work
          </a>
          <a
            href="#contact"
            className="px-8 py-3 rounded-full bg-transparent border border-white/20 text-white font-medium hover:bg-white/5 transition-colors"
          >
            Contact Me
          </a>
        </div>
      </Reveal>
    </div>
  );
};

export default AboutSection;

