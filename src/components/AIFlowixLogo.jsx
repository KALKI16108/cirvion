import React from 'react';

/**
 * AIFlowix Brand Symbol
 * Concept: AI + Flow + Connectivity + Automation
 */
const AIFlowixLogo = ({ size = 100, className = '', monochrome = false, color = '#00C8FF' }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      role="img"
      aria-label="AIFlowix Brand Symbol"
    >
      <defs>
        <linearGradient id="afBrandGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00F0FF" />
          <stop offset="50%" stopColor="#00C8FF" />
          <stop offset="100%" stopColor="#3B82F6" />
        </linearGradient>
      </defs>

      {/* Main A-Frame Flow Ribbon */}
      <path
        d="M 14 52 L 30.5 11.5 C 31.2 9.8 32.8 9.8 33.5 11.5 L 50 52"
        stroke={monochrome ? color : "url(#afBrandGrad)"}
        strokeWidth="7.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Forward Automation Flow Crossbar & Chevron */}
      <path
        d="M 21.5 35 L 36.5 35 M 32.5 29.5 L 38.5 35 L 32.5 40.5"
        stroke={monochrome ? color : "url(#afBrandGrad)"}
        strokeWidth="6.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default AIFlowixLogo;
