"use client";

import AboutSection from './components/sections/AboutSection';
import AppsSection from './components/sections/AppsSection';
import ProjectsSection from './components/sections/ProjectsSection';
import ContactSection from './components/sections/ContactSection';

export default function Home() {
  return (
    <>
      <style jsx global>{`
        html, body {
          height: 100%;
          overflow: hidden;
        }
        .scroll-container {
          height: 100vh;
          overflow-y: scroll;
          scroll-snap-type: y mandatory;
        }
        .scroll-section {
          height: 100vh;
          scroll-snap-align: start;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          opacity: 0;
          transition: opacity 0.5s ease-in-out;
        }
        .scroll-section.is-visible {
          opacity: 1;
        }
      `}</style>
      <div className="scroll-container">
        <AboutSection />
        <AppsSection />
        <ProjectsSection />
        <ContactSection />
      </div>
    </>
  );
}
