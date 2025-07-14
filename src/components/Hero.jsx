import React, { useEffect, useRef, useState } from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';
import { Player } from '@lottiefiles/react-lottie-player';
import codingAnimation from '../assets/svg/coding.json';
import { initializeAnimations, initializeSmoothScroll } from '../utils/script'; // ✅ Import reusable animation logic

/**
 * Hero Component
 *
 * Renders:
 *  - Scroll progress bar
 *  - Animated intro text with gradient effect
 *  - Lottie coding animation with 3D tilt
 *  - Social icons with hover tooltips
 * 
 * GSAP + ScrollTrigger handle animation (via script.ts)
 * Lenis handles smooth scroll behavior
 */
export default function Hero() {
  const lottieRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    // Setup scroll-triggered animations and smooth scrolling
    initializeAnimations();
    initializeSmoothScroll();

    // Scroll progress bar update logic
    const progressEl = document.getElementById('scrollProgress');
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      if (progressEl && docHeight > 0) {
        progressEl.style.width = `${(scrollTop / docHeight) * 100}%`;
      }
    };
    window.addEventListener('scroll', updateProgress);
    updateProgress();

    // Cleanup on unmount
    return () => {
      window.removeEventListener('scroll', updateProgress);
    };
  }, []);

  // Social links data
  const icons = [
    { href: 'https://github.com/your-github', Icon: Github, label: 'GitHub' },
    { href: 'https://linkedin.com/in/your-linkedin', Icon: Linkedin, label: 'LinkedIn' },
    { href: 'mailto:your.email@gmail.com', Icon: Mail, label: 'Email' },
  ];

  return (
    <>
      {/* Scroll progress bar */}
      <div
        id="scrollProgress"
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500 z-50 w-0"
      />

      <section
        id="hero"
        className="relative min-h-screen bg-black text-white font-sans px-6 py-8 flex flex-col-reverse lg:flex-row items-center justify-evenly gap-8"
      >
        {/* VHS noise overlay */}
        <div className="noise absolute inset-0 opacity-10" />

        <div className="relative z-20 flex flex-col-reverse lg:flex-row items-center justify-evenly gap-8 w-full">
          {/* Left: Text block */}
          <div className="flex flex-col gap-6 text-center lg:text-left w-full lg:w-auto">
            <p className="Fade_Down text-gray-300 text-xl sm:text-2xl md:text-3xl lg:text-4xl">
              Hi! My name is
            </p>

           <h1 className="Fade_Down text-[4rem] sm:text-[5rem] md:text-[6rem] lg:text-[7rem] font-extrabold leading-tight gradientText">
  Aubin.
</h1>


            <p className="Fade_Down text-gray-300 text-lg sm:text-xl md:text-2xl lg:text-3xl">
              I’m a Software Engineer.
            </p>

            <p className="Fade_Down text-gray-300 text-lg sm:text-xl md:text-2xl lg:text-3xl">
              I create{' '}
              <span className="font-semibold gradientText">
                Exciting Stuff
              </span>{' '}
              on the Internet.
            </p>

            {/* Social icons */}
            <div className="Fade_Down flex gap-6 justify-center lg:justify-start mt-2">
              {icons.map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="group p-3 rounded-full bg-white/10 backdrop-blur-sm transform transition hover:scale-110 hover:bg-gradient-to-tr hover:from-purple-500 hover:to-pink-400 duration-300 relative"
                >
                  <Icon className="w-6 h-6 text-white" />
                  <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-gray-200 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    {label}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Right: Lottie animation */}
          <div
            className="Fade_Down hero-3d-container relative w-[200px] h-[200px] sm:w-[250px] sm:h-[250px] md:w-[350px] md:h-[350px] lg:w-[450px] lg:h-[450px] flex items-center justify-center"
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
              const y = ((e.clientY - rect.top) / rect.height - 0.5) * -10;
              e.currentTarget.style.transform = `perspective(600px) rotateX(${y}deg) rotateY(${x}deg)`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'perspective(600px) rotateX(0deg) rotateY(0deg)';
            }}
            onClick={() => {
              if (!lottieRef.current) return;
              isPaused ? lottieRef.current.play() : lottieRef.current.pause();
              setIsPaused(!isPaused);
            }}
          >
            <Player
              ref={lottieRef}
              autoplay
              loop
              src={codingAnimation}
              className="absolute inset-0 pointer-events-none"
            />
          </div>
        </div>
      </section>
    </>
  );
}
