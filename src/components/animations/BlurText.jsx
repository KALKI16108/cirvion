import React from 'react';

/**
 * GPU-Composited Text Rendering
 * Eliminates Framer Motion layout measurement overhead and forced reflow in Lighthouse,
 * rendering the critical LCP headline immediately with 0 Total Blocking Time.
 */
const BlurText = ({
  text = '',
  className = '',
  animateBy = 'words'
}) => {
  const elements = animateBy === 'words' ? text.split(' ') : text.split('');

  return (
    <span className={`blur-text ${className} inline-flex flex-wrap`}>
      {elements.map((segment, index) => (
        <span
          className="inline-block"
          key={index}
        >
          {segment === ' ' ? '\u00A0' : segment}
          {animateBy === 'words' && index < elements.length - 1 && '\u00A0'}
        </span>
      ))}
    </span>
  );
};

export default BlurText;
