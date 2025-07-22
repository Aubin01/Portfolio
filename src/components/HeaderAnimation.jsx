/**
 * HeaderAnimation.jsx
 * Renders a fixed desktop navigation header
 */

import React, { useState, useEffect, useRef } from 'react';
import { Download } from 'lucide-react';
import Logo from '../assets/Logo.png';

const navItems = [
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
];

function NavLink({ href, label, isActive, onClick }) {
  return (
    <a
      href={href}
      onClick={onClick}
      aria-current={isActive ? 'page' : undefined}
      className={`group relative transition-colors duration-200 ${
        isActive ? 'text-white' : 'text-white hover:text-purple-400'
      }`}
    >
      {label}
      <span
        className={`absolute bottom-0 left-0 h-[2px] transition-all duration-300 ${
          isActive
            ? 'w-full bg-white'
            : 'w-0 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 group-hover:w-full'
        }`}
      />
    </a>
  );
}

export default function HeaderAnimation() {
  const [activeLink, setActiveLink] = useState('#home');
  const headerRef = useRef(null);

  useEffect(() => {
    const headerEl = headerRef.current;
    if (!headerEl) return;

    const initScrollTracking = () => {
      const sections = {
        '#home': document.getElementById('home'),
        '#about': document.getElementById('about'),
        '#skills': document.getElementById('skills'),
        '#projects': document.getElementById('projects'),
        '#contact': document.getElementById('contact'),
      };

      const getScrollHandler = () => {
        let inThrottle = false;
        return () => {
          if (inThrottle) return;
          inThrottle = true;

          const headerHeight = headerEl.offsetHeight;

          Object.entries(sections).forEach(([href, section]) => {
            if (section) {
              const { top, bottom } = section.getBoundingClientRect();
              if (top <= headerHeight && bottom >= headerHeight) {
                setActiveLink(href);
              }
            }
          });

          setTimeout(() => (inThrottle = false), 100);
        };
      };

      const onScroll = getScrollHandler();
      window.addEventListener('scroll', onScroll);
      onScroll(); // Run once on load

      return () => window.removeEventListener('scroll', onScroll);
    };

    // Wait for DOM render before accessing section elements
    setTimeout(() => requestAnimationFrame(initScrollTracking), 0);
  }, []);

  return (
    <header
      ref={headerRef}
      id="header"
      className="hidden lg:block fixed top-0 left-0 w-full h-20 z-50 bg-black backdrop-blur-sm"
    >
      <div className="flex items-center justify-between h-full px-6">
        {/* Logo */}
        <a
          href="#home"
          onClick={() => setActiveLink('#home')}
          aria-label="Home"
        >
          <img
            src={Logo.src}
            alt="Aubin Logo"
            className="Fade_Down h-36 w-auto object-contain"
          />
        </a>

        {/* Navigation Links */}
        <nav
          role="navigation"
          aria-label="Main navigation"
          className="Fade_Down flex space-x-8 text-sm uppercase tracking-wider"
        >
          {navItems.map(({ name, href }) => (
            <NavLink
              key={href}
              href={href}
              label={name}
              isActive={activeLink === href}
              onClick={() => setActiveLink(href)}
            />
          ))}
        </nav>

        {/* Resume Download Button */}
        <a
          href="/Resume.pdf"
          target="_blank"
          rel="noreferrer"
          className="Fade_Down Header_ActionBtn"
          aria-label="Open Resume PDF"
        >
          <div className="inline-flex items-center gap-2">
            <span className="text-sm font-medium">Resume</span>
            <Download size={18} aria-hidden="true" />
          </div>
        </a>
      </div>
    </header>
  );
}
