import React, { useEffect } from 'react';
import AOS from 'aos';
import SectionHeader from '../components/SectionHeader';

// AOS CSS should be imported once globally (e.g., in index.js):
// import 'aos/dist/aos.css';

// Icon imports
import htmlIcon from '../assets/icons/html.svg?url';
import cssIcon from '../assets/icons/css.svg?url';
import jsIcon from '../assets/icons/javascript.svg?url';
import tailwindIcon from '../assets/icons/tailwind.svg?url';
import reactIcon from '../assets/icons/reactjs.svg?url';
import nextjsIcon from '../assets/icons/nextjs.svg?url';
import gsapIcon from '../assets/icons/gsap.svg?url';
import sqlIcon from '../assets/icons/mysql.svg?url';
import mongodbIcon from '../assets/icons/mongodb.svg?url';
import nodeIcon from '../assets/icons/nodejs.svg?url';
import javaIcon from '../assets/icons/java.svg?url';
import cIcon from '../assets/icons/c.svg?url';
import pythonIcon from '../assets/icons/python.svg?url';
import githubIcon from '../assets/icons/github.svg?url';
import wordpressIcon from '../assets/icons/wordpress.svg?url';
import gitIcon from '../assets/icons/git.svg?url';
import figmaIcon from '../assets/icons/figma.svg?url';

// Sub-component for individual skill tiles
function SkillTile({ name, icon, link }) {
  return (
    <a
      href={link}
      target="_blank"
      rel="noreferrer"
      aria-label={name}
      className="hexagon"
    >
      <img src={icon} alt="" className="w-8 h-8 mb-2" />
      <span className="text-xs">{name}</span>
    </a>
  );
}

/**
 * Skills Component
 *
 * Displays tech stack categories as hexagon icons with AOS fade-up animations.
 */
export default function Skills() {
  // Initialize AOS for scroll animations
  useEffect(() => {
    AOS.init({ duration: 600, offset: 100, once: false });
  }, []);

  // Skill category data
  const frontEnd = [
    { name: 'HTML', icon: htmlIcon, link: 'https://developer.mozilla.org/docs/Web/HTML' },
    { name: 'CSS', icon: cssIcon, link: 'https://developer.mozilla.org/docs/Web/CSS' },
    { name: 'JavaScript', icon: jsIcon, link: 'https://developer.mozilla.org/docs/Web/JavaScript' },
    { name: 'Tailwind', icon: tailwindIcon, link: 'https://tailwindcss.com/' },
    { name: 'React.js', icon: reactIcon, link: 'https://reactjs.org/' },
    { name: 'Next.js', icon: nextjsIcon, link: 'https://nextjs.org/' },
    { name: 'GSAP', icon: gsapIcon, link: 'https://greensock.com/gsap/' },
  ];
  const backEnd = [
    { name: 'Node.js', icon: nodeIcon, link: 'https://nodejs.org/' },
    { name: 'MongoDB', icon: mongodbIcon, link: 'https://mongodb.com/' },
    { name: 'SQL', icon: sqlIcon, link: 'https://w3schools.com/sql' },
  ];
  const programming = [
    { name: 'Java', icon: javaIcon, link: 'https://oracle.com/java' },
    { name: 'C', icon: cIcon, link: 'https://en.cppreference.com/w/c/language' },
    { name: 'Python', icon: pythonIcon, link: 'https://python.org/' },
  ];
  const tools = [
    { name: 'GitHub', icon: githubIcon, link: 'https://github.com' },
    { name: 'WordPress', icon: wordpressIcon, link: 'https://wordpress.org' },
    { name: 'Git', icon: gitIcon, link: 'https://git-scm.com' },
    { name: 'Figma', icon: figmaIcon, link: 'https://figma.com' },
  ];

  return (
    <section
      id="skills"
      className="bg-black text-white py-16 font-sans"
      data-aos="fade-up"
    >
      {/* Section header */}
    <SectionHeader title="Tech Stack" />
      {/* Front-End skills */}
      <div className="mb-16" data-aos="fade-up" data-aos-delay="100">
        <h3 className="text-2xl sm:text-3xl font-semibold text-center mb-8">
          Front-End
        </h3>
        <div className="hex-grid">
          {frontEnd.map(skill => (
            <SkillTile key={skill.name} {...skill} />
          ))}
        </div>
      </div>

      {/* Back-End & Programming */}
      <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
        {/* Back-End */}
        <div data-aos="fade-up" data-aos-delay="200">
          <h3 className="text-2xl sm:text-3xl font-semibold text-center mb-8">
            Back-End
          </h3>
          <div className="hex-grid">
            {backEnd.map(skill => (
              <SkillTile key={skill.name} {...skill} />
            ))}
          </div>
        </div>

        {/* Programming */}
        <div data-aos="fade-up" data-aos-delay="200">
          <h3 className="text-2xl sm:text-3xl font-semibold text-center mb-8">
            Programming
          </h3>
          <div className="hex-grid">
            {programming.map(skill => (
              <SkillTile key={skill.name} {...skill} />
            ))}
          </div>
        </div>
      </div>

      {/* Tools */}
      <div className="mb-16" data-aos="fade-up" data-aos-delay="300">
        <h3 className="text-2xl sm:text-3xl font-semibold text-center mb-8">
          Tools
        </h3>
        <div className="hex-grid">
          {tools.map(skill => (
            <SkillTile key={skill.name} {...skill} />
          ))}
        </div>
      </div>
    </section>
  );
}
