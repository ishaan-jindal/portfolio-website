import ScrollSection from '../utils/ScrollSection';

const ProjectsSection = () => {
  return (
    <ScrollSection>
      <h2 className="text-3xl font-bold text-center mb-8">Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="bg-neutral-900 p-6 rounded-lg">
          <h3 className="text-xl font-bold mb-2">Project 1</h3>
          <p>A brief description of Project 1.</p>
        </div>
        <div className="bg-neutral-900 p-6 rounded-lg">
          <h3 className="text-xl font-bold mb-2">Project 2</h3>
          <p>A brief description of Project 2.</p>
        </div>
        <div className="bg-neutral-900 p-6 rounded-lg">
          <h3 className="text-xl font-bold mb-2">Project 3</h3>
          <p>A brief description of Project 3.</p>
        </div>
      </div>
    </ScrollSection>
  );
};

export default ProjectsSection;
