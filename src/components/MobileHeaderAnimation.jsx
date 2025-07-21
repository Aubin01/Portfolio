/**
 * MobileHeaderAnimation.jsx
 * Renders a mobile navigation header with a GSAP-powered animated menu overlay.
 * Uses clip-path animation for open/close and prevents scrolling when open.
 */

import React, { useState, useEffect, useRef } from "react";
import { Download } from "lucide-react";
import Cheeseburger from "./HamMenu";
import { gsap } from "gsap";
import Logo from '../assets/Logo.png';

const navLinks = [
  { name: "ABOUT", href: "#about" },
  { name: "SKILLS", href: "#skills" },
  { name: "PROJECTS", href: "#projects" },
  { name: "CONTACT", href: "#contact" },
];

export default function MobileHeaderAnimation() {
  const [open, setOpen] = useState(false);

  const [clip, setClip] = useState(
    `circle(30px at ${window.innerWidth + 30}px -30px)`
  );

  const navRef = useRef(null);
  const itemsRef = useRef([]);
  const menuTl = useRef();
  const linkTl = useRef();

  // Generates closed-state clip path (small circle off-screen)
  const closedClip = () =>
    `circle(30px at ${window.innerWidth + 30}px -30px)`;

  // Generates open-state clip path (large circle from top-left)
  const openClip = () =>
    `circle(${window.innerHeight * 2 + 200}px at 40px 40px)`;

  // Initialize GSAP animations
  useEffect(() => {
    const navEl = navRef.current;
    const itemEls = itemsRef.current;

    gsap.set(navEl, { clipPath: closedClip() });

    menuTl.current = gsap
      .timeline({ paused: true })
      .to(navEl, {
        clipPath: openClip(),
        duration: 0.25,
        ease: "power1.out",
      });

    linkTl.current = gsap
      .timeline({ paused: true })
      .fromTo(
        itemEls,
        { y: 100, scale: 0.8, opacity: 0 },
        {
          y: 0,
          scale: 1,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: "back.out(1.7)",
        }
      );
  }, []);

  // Handle menu open/close toggle and scroll lock
  useEffect(() => {
    if (open) {
      menuTl.current.play();
      linkTl.current.play();
      setClip(openClip());
      document.body.style.overflow = "hidden";
    } else {
      linkTl.current.reverse();
      menuTl.current.reverse();
      setClip(closedClip());
      document.body.style.overflow = "auto";
    }
  }, [open]);

  return (
    <header className="lg:hidden fixed top-0 left-0 w-screen h-14 z-[70] bg-gradient-to-b from-black/60 to-transparent backdrop-blur-sm text-white">
      <div className="flex items-center justify-between h-full px-4">
        <a href="#home" onClick={() => setOpen(false)} aria-label="Home">
          <img
            src={Logo.src}
            alt="Aubin Logo"
            className="h-28 w-auto object-contain"
          />
        </a>

        {/* Hamburger menu toggle button */}
        <div
          className="z-[100] w-12 h-12 flex items-center justify-center cursor-pointer"
          onClick={() => setOpen((o) => !o)}
        >
          <Cheeseburger
            isToggled={open}
            color="white"
            width={35}
            height={35}
            strokeWidth={2}
            rounded
            slick
          />
        </div>
      </div>

      {/* Clip-path overlay navigation menu */}
      <nav
        ref={navRef}
        className={`nav-overlay fixed inset-0 w-screen h-screen bg-[#2c026e]/80 flex flex-col items-center justify-center gap-6 z-[60] overflow-hidden ${
          open ? "open" : ""
        }`}
        style={{ clipPath: clip }}
      >
        {navLinks.map((link, i) => (
          <a
            key={link.href}
            href={link.href}
            onClick={() => setOpen(false)}
            ref={(el) => (itemsRef.current[i] = el)}
            className="group relative min-w-[14em] bg-black rounded-md py-4 px-6 text-xl font-medium text-center text-white transition-colors duration-300 hover:bg-black/75"
          >
            <span className="inline-block transition-colors duration-300 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-500 group-hover:via-pink-500 group-hover:to-purple-500 group-hover:bg-clip-text group-hover:animate-gradient">
              {link.name}
            </span>
          </a>
        ))}

        {/* Resume download button */}
        <a
          href="/Resume.pdf"
          target="_blank"
          rel="noreferrer"
          onClick={() => setOpen(false)}
          ref={(el) => (itemsRef.current[navLinks.length] = el)}
          className="group relative min-w-[14em] bg-black rounded-md py-4 px-6 flex items-center justify-center gap-2 text-xl font-medium text-white transition-colors duration-300 hover:bg-black/75"
          style={{
            border: "2px solid transparent",
            borderImage:
              "linear-gradient(90deg, hsl(var(--secondary)), hsl(var(--primary)), hsl(var(--primary)), hsl(var(--secondary))) 1",
          }}
        >
          <span className="gradientText">Resume</span>
          <Download size={20} className="text-white" />
        </a>
      </nav>
    </header>
  );
}
