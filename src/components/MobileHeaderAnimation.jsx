/**
 * MobileHeaderAnimation.jsx
 * Renders a mobile navigation header with a GSAP-powered animated menu overlay.
 * Uses clip-path animation for open/close and properly resets the state on close.
 */

import React, { useState, useEffect, useRef } from "react";
import { Download } from "lucide-react";
import { gsap } from "gsap";
import Cheeseburger from "./HamMenu";
import Logo from "../assets/Logo.png";

// List of nav links to display in mobile menu
const navLinks = [
  { name: "ABOUT", href: "#about" },
  { name: "SKILLS", href: "#skills" },
  { name: "PROJECTS", href: "#projects" },
  { name: "CONTACT", href: "#contact" },
];

export default function MobileHeaderAnimation() {
  const [open, setOpen] = useState(false); // Tracks open/closed state
  const [clip, setClip] = useState(
    `circle(30px at ${window.innerWidth + 30}px -30px)`
  );

  const navRef = useRef(null);         // Reference to nav container (clip-path)
  const itemsRef = useRef([]);         // Reference to nav link elements
  const menuTl = useRef();             // GSAP timeline for clip-path animation
  const linkTl = useRef();             // GSAP timeline for nav link animation

  // Closed clip-path: small circle off-screen
  const closedClip = () =>
    `circle(30px at ${window.innerWidth + 30}px -30px)`;

  // Open clip-path: large circle from top-left
  const openClip = () =>
    `circle(${window.innerHeight * 2 + 200}px at 40px 40px)`;

  // Initialize GSAP animations once on mount
  useEffect(() => {
    const navEl = navRef.current;
    const itemEls = itemsRef.current;

    // Start hidden
    gsap.set(navEl, { clipPath: closedClip(), display: "none" });

    // Background circle expansion animation
    menuTl.current = gsap
      .timeline({ paused: true })
      .to(navEl, {
        clipPath: openClip(),
        duration: 0.25,
        ease: "power1.out",
      });

    // Staggered links entrance animation
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

  // Toggle menu open/close and control scroll + visibility
  useEffect(() => {
    const navEl = navRef.current;

    if (open) {
      gsap.set(navEl, { display: "flex" });         // Make visible
      menuTl.current.play();                        // Animate open
      linkTl.current.play();                        // Animate links
      setClip(openClip());                          // Set clip-path
      document.body.style.overflow = "hidden";      // Disable scroll
    } else {
      linkTl.current.reverse();                     // Reverse link animation
      menuTl.current.reverse();                     // Reverse clip-path

      // Wait for animation to finish, then hide and clean up
      menuTl.current.eventCallback("onReverseComplete", () => {
        gsap.set(navEl, { display: "none" });
        setClip(closedClip());
        document.body.style.overflow = "auto";      // Re-enable scroll
      });
    }
  }, [open]);

  return (
    <header className="lg:hidden fixed top-0 left-0 w-screen h-14 z-[70] bg-gradient-to-b from-black/60 to-transparent backdrop-blur-sm text-white">
      {/* Top bar with logo and hamburger */}
      <div className="flex items-center justify-between h-full px-4">
        <a href="#home" onClick={() => setOpen(false)} aria-label="Home">
          <img
            src={Logo.src}
            alt="Aubin Logo"
            className="h-28 w-auto object-contain"
          />
        </a>

        {/* Hamburger button */}
        <div
          className="z-[100] w-12 h-12 flex items-center justify-center cursor-pointer"
          onClick={() => setOpen((prev) => !prev)}
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

      {/* Clip-path overlay navigation */}
      <nav
        ref={navRef}
        className="nav-overlay fixed inset-0 w-screen h-screen bg-[#2c026e]/80 flex-col items-center justify-center gap-6 z-[60] overflow-hidden"
        style={{ clipPath: clip }}
      >
        {/* Nav links */}
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

        {/* Resume button */}
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
