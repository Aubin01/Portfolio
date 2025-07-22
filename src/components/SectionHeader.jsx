import React from 'react';

/**
 * A reusable section header with horizontal lines on both sides of the title.
 * 
 */
export default function SectionHeader({ title }) {
  return (
    <div className="flex items-center justify-center my-16 px-4">
      {/* Left line */}
      <div className="h-0.5 flex-1 bg-purple-900" />

      {/* Title */}
      <h2 className="mx-6 text-3xl sm:text-4xl font-semibold text-white whitespace-nowrap">
        {title}
      </h2>

      {/* Right line */}
      <div className="h-0.5 flex-1 bg-purple-900" />
    </div>
  );
}
