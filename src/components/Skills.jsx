/**
 * Skills.jsx
 * Displays a categorized grid of technology skills using icons loaded via Vite + `?url`.
 * Skill definitions come from `skills.json` and icons are injected dynamically.
 */

import React, { useEffect } from 'react';
import AOS from 'aos';
import SectionHeader from '../components/SectionHeader';
import skillData from '../data/skills.json';

// Icon imports (must match skill name exactly)
import htmlIcon from '../assets/icons/html.svg?url';
import cssIcon from '../assets/icons/css.svg?url';
import jsIcon from '../assets/icons/javascript.svg?url';
import tailwindIcon from '../assets/icons/tailwind.svg?url';
import reactIcon from '../assets/icons/reactjs.svg?url';
import nextjsIcon from '../assets/icons/nextjs.svg?url';
import gsapIcon from '../assets/icons/gsap.svg?url';
import nodeIcon from '../assets/icons/nodejs.svg?url';
import mongodbIcon from '../assets/icons/mongodb.svg?url';
import sqlIcon from '../assets/icons/mysql.svg?url';
import javaIcon from '../assets/icons/java.svg?url';
import cIcon from '../assets/icons/c.svg?url';
import pythonIcon from '../assets/icons/python.svg?url';
import githubIcon from '../assets/icons/github.svg?url';
import wordpressIcon from '../assets/icons/wordpress.svg?url';
import gitIcon from '../assets/icons/git.svg?url';
import figmaIcon from '../assets/icons/figma.svg?url';

/**
 * A map of skill name → icon
 */
const iconMap = {
  HTML: htmlIcon,
  CSS: cssIcon,
  JavaScript: jsIcon,
  Tailwind: tailwindIcon,
  'React.js': reactIcon,
  'Next.js': nextjsIcon,
  GSAP: gsapIcon,
  'Node.js': nodeIcon,
  MongoDB: mongodbIcon,
  SQL: sqlIcon,
  Java: javaIcon,
  C: cIcon,
  Python: pythonIcon,
  GitHub: githubIcon,
  WordPress: wordpressIcon,
  Git: gitIcon,
  Figma: figmaIcon
};

/**
 * Renders a single skill tile.
 */
function SkillTile({ name, icon, link }) {
  return (
    <a
      href={link}
      target="_blank"
      rel="noreferrer"
      aria-label={name}
      className="hexagon"
    >
      <img src={icon} alt={`${name} icon`} className="w-8 h-8 mb-2" />
      <span className="text-xs">{name}</span>
    </a>
  );
}

/**
 * Main skills section. Injects icons into JSON data before rendering each category.
 */
export default function Skills() {
  useEffect(() => {
    AOS.init({ duration: 600, offset: 100, once: false });
  }, []);

  // Inject icons dynamically into each skill category
  const injectIcons = (category) =>
    skillData[category].map((skill) => ({
      ...skill,
      icon: iconMap[skill.name] || ''
    }));

  const frontEnd = injectIcons('frontEnd');
  const backEnd = injectIcons('backEnd');
  const programming = injectIcons('programming');
  const tools = injectIcons('tools');

  return (
    <section
      id="skills"
      className="bg-black text-white py-16 font-sans"
      data-aos="fade-up"
    >
      <SectionHeader title="Tech Stack" />

      {/* Front-End Section */}
      <div className="mb-16" data-aos="fade-up" data-aos-delay="100">
        <h3 className="text-2xl sm:text-3xl font-semibold text-center mb-8">Front-End</h3>
        <div className="hex-grid">
          {frontEnd.map(skill => (
            <SkillTile key={skill.name} {...skill} />
          ))}
        </div>
      </div>

      {/* Back-End & Programming */}
      <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
        <div data-aos="fade-up" data-aos-delay="200">
          <h3 className="text-2xl sm:text-3xl font-semibold text-center mb-8">Back-End</h3>
          <div className="hex-grid">
            {backEnd.map(skill => (
              <SkillTile key={skill.name} {...skill} />
            ))}
          </div>
        </div>

        <div data-aos="fade-up" data-aos-delay="200">
          <h3 className="text-2xl sm:text-3xl font-semibold text-center mb-8">Programming</h3>
          <div className="hex-grid">
            {programming.map(skill => (
              <SkillTile key={skill.name} {...skill} />
            ))}
          </div>
        </div>
      </div>

      {/* Tools Section */}
      <div className="mb-16" data-aos="fade-up" data-aos-delay="300">
        <h3 className="text-2xl sm:text-3xl font-semibold text-center mb-8">Tools</h3>
        <div className="hex-grid">
          {tools.map(skill => (
            <SkillTile key={skill.name} {...skill} />
          ))}
        </div>
      </div>
    </section>
  );
}
