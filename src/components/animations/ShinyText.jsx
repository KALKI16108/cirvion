import React from 'react';

/**
 * GPU-Composited Shiny Text
 * Uses hardware-accelerated transform rather than non-composited background-position-x,
 * eliminating the "Avoid non-composited animations" warning in Lighthouse.
 */
const ShinyText = ({
  text,
  disabled = false,
  speed = 3,
  className = '',
  color = '#CBD5E1',
  shineColor = '#00C8FF',
}) => {
  return (
    <span
      className={`relative inline-block overflow-hidden shiny-text ${className}`}
      style={{ color }}
    >
      <span className="relative z-10">{text}</span>
      {!disabled && (
        <span
          className="absolute inset-0 pointer-events-none z-20"
          style={{
            background: `linear-gradient(90deg, transparent 0%, ${shineColor} 50%, transparent 100%)`,
            mixBlendMode: 'screen',
            opacity: 0.75,
            animation: `shiny-transform ${speed}s ease-in-out infinite`,
            willChange: 'transform',
          }}
          aria-hidden="true"
        />
      )}
    </span>
  );
};

export default ShinyText;
