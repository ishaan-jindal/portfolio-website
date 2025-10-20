import { TypeAnimation } from 'react-type-animation';
import ScrollSection from '../utils/ScrollSection';

const AboutSection = () => {
  return (
    <ScrollSection>
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4">
          <TypeAnimation
            sequence={[
              'Ishaan Jindal',
              1000,
              'A Software Developer',
              1000,
            ]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
          />
        </h1>
        <p className="text-xl text-neutral-400 mb-8">Creative App Developer & Tech Enthusiast</p>
        <div className="max-w-3xl mx-auto text-left space-y-4">
          <p>
            Hello! I&apos;m Ishaan, a dedicated and passionate software developer with a strong focus on creating intuitive and powerful applications for both web and mobile platforms. My journey in tech is driven by a relentless curiosity and a desire to solve real-world problems through elegant code.
          </p>
          <p>
            I specialize in modern JavaScript frameworks, mobile development with Swift and Kotlin, and building scalable backend services. I thrive in collaborative environments and am always eager to embrace new challenges and expand my skill set.
          </p>
          <p>
            When I&apos;m not coding, I enjoy exploring the latest technology trends, contributing to open-source projects, and designing user-centric digital experiences.
          </p>
        </div>
      </div>
    </ScrollSection>
  );
};

export default AboutSection;