import HeroSection from './components/sections/HeroSection';
import ProjectsSection from './components/sections/ProjectsSection';
import SkillsSection from './components/sections/SkillsSection';
import ContactSection from './components/sections/ContactSection';
import Footer from './components/layout/Footer';
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

        <section
          id="projects"
          className="hairline-top py-[var(--section-y)]"
        >
          <ProjectsSection projects={projects} />
        </section>

        <div className="hairline-top grid lg:grid-cols-[1.45fr_1fr]">
          <section
            id="skills"
            className="py-[var(--section-y)] lg:border-r lg:border-[var(--border)] lg:pr-14"
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
