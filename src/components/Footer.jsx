/**
 * Footer.jsx
 *
 */

import React from "react";
import Logo from "../assets/Logo.png"; 
import * as Icons from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear(); 
  const { Github, Linkedin, Mail } = Icons;

  // Social media links with labels and icons
  const socialIcons = [
    {
      Icon: Linkedin,
      label: "LinkedIn",
      href: "https://linkedin.com/in/aubin-mugisha",
    },
    {
      Icon: Mail,
      label: "Email",
      href: "mailto:aubin.mugisha@maine.edu",
    },
    {
      Icon: Github,
      label: "GitHub",
      href: "https://github.com/Aubin01",
    },
  ];

  return (
    <footer className="relative overflow-hidden bg-[#120a1e] text-gray-300 font-sans">
      {/* Top divider line */}
      <div className="absolute top-0 left-4 right-4 h-px bg-purple-900" />

      {/* Main content: Logo + social icons */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-4 flex flex-col items-center">
        {/* Logo */}
        <div className="mb-2">
          <a href="#home" aria-label="Go to top of page">
            <img src={Logo.src} alt="Aubin Logo" className="h-36 w-auto" />
          </a>
        </div>

        {/* Social icons with hover labels */}
        <div className="flex justify-center space-x-6 mb-2">
          {socialIcons.map(({ Icon, label, href }, idx) => (
            <a
              key={idx}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="group relative p-2 rounded-full bg-purple-900 hover:bg-purple-700 transition"
            >
              {/* Icon */}
              <Icon
                className="w-6 h-6 text-gray-300 group-hover:text-white"
                aria-hidden="true"
              />

              {/* Hover label */}
              <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-gray-200 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                {label}
              </span>
            </a>
          ))}
        </div>
      </div>

      {/* Bottom copyright */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 border-t border-gray-800 pt-2 text-center text-xs">
        <p>
          ©{year} All rights reserved. Built with{" "}
          <span className="inline-block">♥</span> by Aubin Mugisha
        </p>
      </div>
    </footer>
  );
}
