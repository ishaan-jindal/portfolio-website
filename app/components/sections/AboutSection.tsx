import { TypeAnimation } from "react-type-animation";
import ScrollSection from "../utils/ScrollSection";

const AboutSection = () => {
  return (
    <ScrollSection>
      <div className="flex flex-col items-center text-center font-mono">
        {/* Identifier */}
        <h1 className="text-3xl md:text-4xl font-semibold mb-2">
          ishaan_jindal
        </h1>

        {/* Descriptor */}
        <p className="text-sm text-neutral-500 mb-6">
          role:
          <span className="ml-2 text-neutral-300">
            <TypeAnimation
              sequence={[
                "app_developer()",
                1200,
                "debugger()",
                1200,
                "problem_solver()",
                1200,
              ]}
              speed={50}
              repeat={Infinity}
            />
          </span>
        </p>

        {/* Short bio */}
        <p className="max-w-sm md:max-w-md text-sm text-neutral-400 leading-relaxed">
          interests: problem_solving, implementation, execution
          <br />
          focus: building working systems end-to-end
        </p>
      </div>
    </ScrollSection>
  );
};

export default AboutSection;

