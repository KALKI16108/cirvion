import React from 'react';

const ShinyText = ({
  text,
  disabled = false,
  speed = 3,
  className = '',
  color = '#CBD5E1',
  shineColor = '#00C8FF',
  spread = 120
}) => {
  return (
    <span
      className={`inline-block shiny-text ${className}`}
      style={{
        backgroundImage: `linear-gradient(${spread}deg, ${color} 0%, ${color} 35%, ${shineColor} 50%, ${color} 65%, ${color} 100%)`,
        backgroundSize: '200% auto',
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        animation: disabled ? 'none' : `shiny-slide ${speed}s linear infinite`,
        willChange: 'background-position'
      }}
    >
      {text}
    </span>
  );
};

export default ShinyText;
