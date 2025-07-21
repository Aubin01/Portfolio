/**
 * HeroAnimation.jsx
 * Renders a Lottie coding animation with 3D tilt effect and scroll progress bar.
 * Includes client-only animation and scroll utilities, and supports play/pause on click.
 */

import React, { useEffect, useRef, useState } from 'react';
import { Player } from '@lottiefiles/react-lottie-player';
import codingAnimation from '../assets/svg/coding.json';
import { initializeAnimations, initializeSmoothScroll } from '../utils/script';

export default function HeroAnimation() {
  const lottieRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    initializeAnimations();
    initializeSmoothScroll();

    // Update scroll progress bar width
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

    return () => {
      window.removeEventListener('scroll', updateProgress);
    };
  }, []);

  return (
    <>
      {/* Scroll progress bar at top */}
      <div
        id="scrollProgress"
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500 z-50 w-0"
      />

      {/* Animated container with 3D tilt effect and click-to-toggle Lottie animation */}
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
    </>
  );
}
