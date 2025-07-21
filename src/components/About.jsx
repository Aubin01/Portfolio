/**
 * About.tsx
 * Displays the "About" section with animated avatar, intro text, counters, and a timeline.
 * Includes framer-motion and AOS animations.
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';
import SectionHeader from '../components/SectionHeader.jsx';
import AvatarUrl from '../assets/profile.jpg?url';

/**
 * Custom hook to animate a counter from 0 to target
 * when triggered (e.g., when component is in view).
 */
function useCountUp(target, duration = 1.5, startCounting = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!startCounting) return;

    let start = null;
    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / (duration * 1000), 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) window.requestAnimationFrame(step);
    };
    window.requestAnimationFrame(step);
  }, [target, duration, startCounting]);

  return count;
}

// Motion variant for fade-up animations
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

// Stats for animated counters
const stats = [
  { label: 'Projects Built', value: 12 },
  { label: 'Tech Stacks Learned', value: 10 },
  { label: 'Cups of ☕️', value: 1000 },
];

// Timeline milestones
const timeline = [
  { year: '2022', event: 'Started my Computer Science journey at university' },
  { year: '2023', event: 'Completed my first internship and built my first real-world app' },
  { year: '2024', event: 'Took on a second internship focusing on full-stack development' },
  { year: '2025', event: 'Graduated with a BSc in Computer Science and launched this portfolio' },
];

export default function About() {
  // Initialize AOS once on mount
  useEffect(() => {
    AOS.init({ duration: 600, offset: 100, once: true });
  }, []);

  const counterRef = useRef(null);
  const isInView = useInView(counterRef, { once: true });

  return (
    <section
      id="about"
      className="bg-black text-white py-16 font-sans px-4 sm:px-6 lg:px-8"
    >
      <SectionHeader title="About" />

      {/* Avatar and Intro */}
      <div
        className="max-w-3xl mx-auto flex flex-col lg:flex-row items-center gap-8"
        data-aos="fade-up"
      >
        <div className="flex-shrink-0">
          <div className="rounded-full p-1 bg-purple-900">
            <motion.img
              src={AvatarUrl}
              alt="Aubin avatar"
              className="rounded-full w-32 h-32 sm:w-40 sm:h-40 lg:w-56 lg:h-56 shadow-lg"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
        </div>

        <motion.div
          className="flex-1 text-justify text-base sm:text-lg text-gray-300"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
        >
          <motion.p variants={fadeUp} className="leading-relaxed">
            I’m a recent Computer Science graduate with a passion for technology
            and continuous learning. I enjoy solving real-world problems through
            code and am actively building my skills through hands-on projects.
            Early in my career, I’m eager to contribute, grow, and make an
            impact wherever I go.
          </motion.p>
        </motion.div>
      </div>

      {/* Animated Counters */}
      <div
        ref={counterRef}
        className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        {stats.map(({ label, value }) => {
          const count = useCountUp(value, 1.5, isInView);
          return (
            <div key={label}>
              <span className="block text-3xl sm:text-4xl lg:text-5xl font-bold">
                {count}+
              </span>
              <span className="block mt-1 text-base sm:text-lg text-gray-300">
                {label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Timeline */}
      <div
        className="mt-12 max-w-3xl mx-auto"
        data-aos="fade-up"
        data-aos-delay="300"
      >
        <div className="relative pl-4 sm:pl-6">
          <span className="absolute left-0 top-0 bottom-0 w-px bg-purple-900" />
          <h3 className="text-2xl sm:text-3xl font-bold text-purple-500 mb-6">
            My Journey
          </h3>

          <div className="space-y-6">
            {timeline.map(({ year, event }) => (
              <div key={year} className="relative pl-8">
                <div className="absolute left-0 top-2 w-4 h-4 rounded-full border-2 border-purple-500 bg-black" />
                <time className="block font-semibold text-lg sm:text-xl mb-1 text-white">
                  {year}
                </time>
                <p className="text-gray-300 text-base sm:text-lg">{event}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
