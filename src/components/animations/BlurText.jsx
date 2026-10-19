import React from 'react';
import { motion } from 'framer-motion';

/**
 * GPU-Composited Text Reveal
 * Uses composited translateY + opacity rather than expensive software filter:blur(),
 * fixing "non-composited animated elements" and forced reflow in Lighthouse.
 */
const BlurText = ({
  text = '',
  delay = 100,
  className = '',
  animateBy = 'words',
  direction = 'top'
}) => {
  const elements = animateBy === 'words' ? text.split(' ') : text.split('');

  return (
    <span className={`blur-text ${className} inline-flex flex-wrap`}>
      {elements.map((segment, index) => (
        <motion.span
          className="inline-block will-change-[transform,opacity]"
          key={index}
          initial={{ opacity: 0, y: direction === 'top' ? -12 : 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.4,
            delay: (index * delay) / 1000,
            ease: [0.25, 0.1, 0.25, 1]
          }}
        >
          {segment === ' ' ? '\u00A0' : segment}
          {animateBy === 'words' && index < elements.length - 1 && '\u00A0'}
        </motion.span>
      ))}
    </span>
  );
};

export default BlurText;
