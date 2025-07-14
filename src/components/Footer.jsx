import React from 'react';
import Logo from '../assets/Logo.png';
import * as Icons from 'lucide-react';

export default function Footer() {
  const year = new Date().getFullYear();
  const { Github, Linkedin, Mail } = Icons;
  const socialIcons = [
    { Icon: Linkedin, label: 'LinkedIn', href: '#' },
    { Icon: Mail, label: 'Email', href: '#' },
    { Icon: Github, label: 'GitHub', href: '#' },
  ];

  return (
    <footer className="relative overflow-hidden bg-[#120a1e] text-gray-300 font-sans">
      {/* Top solid dark purple bar slightly inset */}
      <div
        className="absolute top-0 left-4 right-4 h-px bg-purple-900"
      />

      {/* Main footer content (reduced padding) */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-4 flex flex-col items-center">
        {/* Logo centered and clickable (reduced margin) */}
        <div className="mb-2">
          <a href="#home" aria-label="Home">
            <img src={Logo.src} alt="Aubin Logo" className="h-28 w-auto" />
          </a>
        </div>

        {/* Social icons (reduced margin) */}
        <div className="flex justify-center space-x-6 mb-2">
          {socialIcons.map(({ Icon, label, href }, idx) => (
            <a
              key={idx}
              href={href}
              className="p-2 rounded-full bg-purple-900 hover:bg-purple-700 transition"
              aria-label={label}
            >
              <Icon className="w-6 h-6 text-gray-300 hover:text-white" aria-hidden="true" />
            </a>
          ))}
        </div>
      </div>

      {/* Bottom divider & legal (reduced top padding) */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 border-t border-gray-800 pt-2 text-center text-xs">
        <p>©{year} All rights reserved. Built with <span className="inline-block">♥</span> by Aubin Mugisha</p>
      </div>
    </footer>
  );
}
