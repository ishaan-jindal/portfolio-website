import HeroSection from './components/sections/HeroSection';
import ProjectsSection from './components/sections/ProjectsSection';
import SkillsSection from './components/sections/SkillsSection';
import ContactSection from './components/sections/ContactSection';
import Footer from './components/layout/Footer';
import { DrawRule } from './components/utils/motion';
import { getProjects } from './lib/projects';

// CSP nonces require dynamic rendering so Next can inject them per-request
export const dynamic = "force-dynamic";

export default function Home() {
  const projects = getProjects();

  return (
    <div className="w-full flex-1">
      <div className="site-container">
        <section id="about" className="pb-[var(--section-y)] pt-28">
          <HeroSection />
        </section>

        <DrawRule />

        <section id="projects" className="py-[var(--section-y)]">
          <ProjectsSection projects={projects} />
        </section>

        <DrawRule />

        <div className="relative grid lg:grid-cols-[1.45fr_1fr]">
          <DrawRule
            direction="y"
            className="absolute inset-y-0 left-[59.18%] hidden lg:block"
          />
          <section
            id="skills"
            className="py-[var(--section-y)] lg:pr-14"
          >
            <SkillsSection />
          </section>

          <section
            id="contact"
            className="hairline-top py-[var(--section-y)] lg:border-t-0 lg:pl-14"
          >
            <ContactSection />
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
}
