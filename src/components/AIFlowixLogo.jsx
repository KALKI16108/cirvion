import React from 'react';

const AIFlowixLogo = ({ size = 100, className = '' }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="AIFLOWIX Logo - AI Brain with Flow"
    >
      <defs>
        {/* Main gradient for the brain/AI */}
        <linearGradient id="brainGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00E5FF" />
          <stop offset="100%" stopColor="#00C8FF" />
        </linearGradient>

        {/* Circle outline gradient */}
        <linearGradient id="circleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00D9FF" />
          <stop offset="100%" stopColor="#0099CC" />
        </linearGradient>

        {/* Glow effect */}
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Background circle */}
      <circle cx="100" cy="100" r="95" fill="none" stroke="url(#circleGradient)" strokeWidth="3" opacity="0.6" />

      {/* Left hemisphere of brain (with grooves) */}
      <g>
        {/* Left brain outline */}
        <path
          d="M 100 60 Q 75 60 65 75 Q 60 85 60 100 Q 60 125 75 135 Q 100 150 100 140 Z"
          fill="url(#brainGradient)"
          opacity="0.9"
          filter="url(#glow)"
        />

        {/* Left brain ridges (convolutions) */}
        <path
          d="M 70 70 Q 68 80 70 90"
          stroke="#00D9FF"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M 78 65 Q 76 78 78 95"
          stroke="#00D9FF"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M 86 62 Q 85 75 87 100"
          stroke="#00D9FF"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M 68 105 Q 70 115 75 125"
          stroke="#00D9FF"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
        />
      </g>

      {/* Right hemisphere of brain (with grooves) */}
      <g>
        {/* Right brain outline */}
        <path
          d="M 100 60 Q 125 60 135 75 Q 140 85 140 100 Q 140 125 125 135 Q 100 150 100 140 Z"
          fill="url(#brainGradient)"
          opacity="0.95"
          filter="url(#glow)"
        />

        {/* Right brain ridges (convolutions) */}
        <path
          d="M 130 70 Q 132 80 130 90"
          stroke="#00E5FF"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M 122 65 Q 124 78 122 95"
          stroke="#00E5FF"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M 114 62 Q 115 75 113 100"
          stroke="#00E5FF"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M 132 105 Q 130 115 125 125"
          stroke="#00E5FF"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
        />
      </g>

      {/* Circular flow arrows around brain */}
      {/* Top right arrow */}
      <path
        d="M 140 75 Q 155 70 160 85"
        stroke="url(#circleGradient)"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
        opacity="0.8"
      />
      <polygon
        points="160,85 165,82 163,92"
        fill="url(#circleGradient)"
        opacity="0.8"
      />

      {/* Bottom right arrow */}
      <path
        d="M 150 125 Q 165 135 155 150"
        stroke="url(#circleGradient)"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
        opacity="0.8"
      />
      <polygon
        points="155,150 152,145 162,148"
        fill="url(#circleGradient)"
        opacity="0.8"
      />

      {/* Bottom left arrow */}
      <path
        d="M 50 125 Q 35 135 45 150"
        stroke="url(#circleGradient)"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
        opacity="0.8"
      />
      <polygon
        points="45,150 38,152 48,145"
        fill="url(#circleGradient)"
        opacity="0.8"
      />

      {/* Top left arrow */}
      <path
        d="M 60 75 Q 45 70 40 85"
        stroke="url(#circleGradient)"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
        opacity="0.8"
      />
      <polygon
        points="40,85 35,82 37,92"
        fill="url(#circleGradient)"
        opacity="0.8"
      />

      {/* Center division line */}
      <line
        x1="100"
        y1="60"
        x2="100"
        y2="140"
        stroke="#00C8FF"
        strokeWidth="2"
        opacity="0.5"
      />

      {/* Subtle highlight on left brain */}
      <ellipse
        cx="80"
        cy="85"
        rx="8"
        ry="12"
        fill="white"
        opacity="0.15"
      />

      {/* Subtle highlight on right brain */}
      <ellipse
        cx="120"
        cy="85"
        rx="8"
        ry="12"
        fill="white"
        opacity="0.2"
      />
    </svg>
  );
};

export default AIFlowixLogo;
