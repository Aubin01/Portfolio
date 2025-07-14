import React from 'react';
import { ExternalLinkIcon, WrenchIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import SectionHeader from '../components/SectionHeader.jsx';

// Animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } }
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 12 } }
};

// Mock project data
const ProjectsList = [
  {
    name: 'Demo App',
    status: 'development',
    link: '#',
    description: 'This project is under active development.',
    tech: ['React', 'Tailwind CSS', 'HTML5'],
  },
  {
    name: 'Portfolio Site',
    status: 'development',
    link: '#',
    description: 'Personal portfolio built with modern web tech.',
    tech: ['React', 'Tailwind CSS', 'HTML5'],
  },
  {
    name: 'Coming Soon',
    status: 'development',
    link: '#',
    description: 'New project launching soon.',
    tech: ['React', 'Tailwind CSS'],
  },
];

/**
 * ProjectCard Component
 * Renders individual project info inside a motion container
 */
function ProjectCard({ name, status, link, description, tech }) {
  return (
    <motion.li
      className="relative bg-white/5 rounded-lg overflow-hidden"
      variants={itemVariants}
      role="listitem"
    >
      {/* Screenshot placeholder */}
      <div className="w-full h-48 bg-gray-800 flex items-center justify-center">
        <span className="sr-only">Screenshot for {name}</span>
        <span className="text-gray-400">Screenshot Preview</span>
      </div>

      {/* Details */}
      <div className="p-4 flex flex-col justify-between h-56">
        <div>
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-xl font-semibold">{name}</h3>
            <div className="flex items-center gap-2" aria-label={status === 'development' ? 'In development' : ''}>
              {status === 'development' && (
                <span role="status" className="flex items-center text-orange-400 text-sm">
                  <WrenchIcon size={16} aria-hidden="true" />
                  <span className="ml-1">In Dev</span>
                </span>
              )}
              <a
                href={link}
                target="_blank"
                rel="noreferrer"
                className="text-gray-300 hover:text-white"
                aria-label={`Live demo of ${name}`}
              >
                <ExternalLinkIcon size={20} aria-hidden="true" />
              </a>
            </div>
          </div>
          <p className="text-sm text-gray-200 mb-4">{description}</p>
        </div>

        {/* Tech tags */}
        <ul className="flex flex-wrap gap-2" aria-label={`Technologies for ${name}`}>
          {tech.map(t => (
            <li key={t} className="px-2 py-1 bg-white/10 rounded text-xs">{t}</li>
          ))}
        </ul>
      </div>
    </motion.li>
  );
}

/**
 * Projects Component
 * Displays a list of project cards with staggered animations
 */
export default function Projects() {
  return (
    <section
      id="projects"
      className="bg-black text-white py-16 font-sans px-6"
    >
      {/* Section header */}
        <SectionHeader title="My Projects" />

      {/* Projects grid */}
      <motion.ul
        className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 list-none"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        role="list"
      >
        {ProjectsList.map(project => (
          <ProjectCard key={project.name} {...project} />
        ))}
      </motion.ul>
    </section>
  );
}
