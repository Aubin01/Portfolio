// src/script.ts
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";

gsap.registerPlugin(ScrollTrigger);

// GSAP transitions
const transitions = {
  Stagger: {
    from: { opacity: 0, y: 50 },
    to: {
      opacity: 1,
      y: 0,
      delay: 0.125,
      duration: 1.125,
      stagger: 0.125,
      ease: "power2.out",
    },
  },
  FadeUp: {
    from: { opacity: 0, y: 50 },
    to: { opacity: 1, y: 0, duration: 1, stagger: 0.15 },
  },
  FadeDown: {
    from: { opacity: 0, y: -50 },
    to: {
      opacity: 1,
      y: 0,
      delay: 0.25,
      duration: 1,
      stagger: 0.15,
      ease: "power2.out",
    },
  },
  FadeIn: {
    from: { opacity: 0 },
    to: { opacity: 1, duration: 1, stagger: 0.125, ease: "power1.out" },
  },
  SpringUp: {
    from: { opacity: 0, scale: 0.75 },
    to: {
      opacity: 1,
      scale: 1,
      ease: "elastic.out(0.6,0.14)",
      duration: 1.5,
      stagger: 0.15,
    },
  },
  PopIn: {
    from: {
      opacity: 0,
      scale: 0.85,
      visibility: 'hidden',
    },
    to: {
      opacity: 1,
      scale: 1,
      duration: 1.2,
      ease: "power3.out",
      delay: 0.4,
      visibility: 'visible',
    },
  },
};

// Apply scroll-triggered animations
export function initializeAnimations() {
  ScrollTrigger.batch(".Fade_Stagger", {
    onEnter: (els) => gsap.fromTo(els, transitions.Stagger.from, transitions.Stagger.to),
    once: true,
  });

  ScrollTrigger.batch(".Fade_Up", {
    start: "top bottom-=100px",
    onEnter: (els) => gsap.fromTo(els, transitions.FadeUp.from, transitions.FadeUp.to),
    once: true,
  });

  ScrollTrigger.batch(".Fade_Down", {
    start: "top bottom-=100px",
    onEnter: (els) => gsap.fromTo(els, transitions.FadeDown.from, transitions.FadeDown.to),
    once: true,
  });

  ScrollTrigger.batch(".Fade_In", {
    onEnter: (els) => gsap.fromTo(els, transitions.FadeIn.from, transitions.FadeIn.to),
    once: true,
  });

  ScrollTrigger.batch(".Spring_Up", {
    start: "top bottom",
    onEnter: (els) => gsap.fromTo(els, transitions.SpringUp.from, transitions.SpringUp.to),
    once: true,
  });

  ScrollTrigger.batch(".Pop_In", {
    start: "top bottom-=100px",
    onEnter: (els) => gsap.fromTo(els, transitions.PopIn.from, transitions.PopIn.to),
    once: true,
  });
}

// Initialize Lenis for smooth scroll
export function initializeSmoothScroll() {
  const lenis = new Lenis();

  lenis.on("scroll", ScrollTrigger.update);

  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
}