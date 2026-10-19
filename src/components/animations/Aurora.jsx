import React from 'react';

/**
 * GPU-Composited Ethereal Aurora Ambient Wave
 * Eliminates WebGL shader initialization overhead and long tasks on mobile,
 * running directly on the GPU compositor thread with 0 Total Blocking Time.
 */
export default function Aurora() {
  return (
    <div className="aurora-bg" aria-hidden="true">
      <div className="aurora-layer-1" />
      <div className="aurora-layer-2" />
    </div>
  );
}
