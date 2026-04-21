"use client"

import AboutSection from './components/sections/AboutSection';
import ProjectsSection from './components/sections/ProjectsSection';
import ContactSection from './components/sections/ContactSection';
import Footer from './components/layout/Footer';

export default function Home() {
  return (
    <div className="w-full relative flex flex-col items-center">
      <div id="about" className="w-full min-h-screen flex items-center justify-center pt-20">
        <AboutSection />
      </div>

      <div id="projects" className="w-full min-h-screen flex items-center justify-center py-20">
        <ProjectsSection />
      </div>

      <div id="contact" className="w-full min-h-screen flex items-center justify-center py-20">
        <ContactSection />
      </div>

      <Footer />
    </div>
  );
}
