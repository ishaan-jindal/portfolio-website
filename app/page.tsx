"use client"

import AboutSection from './components/sections/AboutSection';
import ProjectsSection from './components/sections/ProjectsSection';
import ContactSection from './components/sections/ContactSection';

export default function Home() {
  return (
    <div className="scroll-container h-screen w-full overflow-y-auto relative">
      <div id="about">
        <AboutSection />
      </div>

      <div id="projects">
        <ProjectsSection />
      </div>

      <div id="contact">
        <ContactSection />
      </div>
      
    </div>
  );
}
