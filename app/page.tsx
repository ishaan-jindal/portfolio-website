"use client"

import AboutSection from './components/sections/AboutSection';
import ProjectsSection from './components/sections/ProjectsSection';
import ContactSection from './components/sections/ContactSection';
import Footer from './components/layout/Footer';

export default function Home() {
  return (
    <div className="w-full relative flex flex-col items-center">
      <div id="about" className="w-full min-h-screen flex items-center justify-center">
        <AboutSection />
      </div>

      <div id="projects" className="w-full flex items-center justify-center py-10">
        <ProjectsSection />
      </div>

      <div id="contact" className="w-full flex items-center justify-center py-10">
        <ContactSection />
      </div>

      <Footer />
    </div>
  );
}
