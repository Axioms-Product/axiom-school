
import React from 'react';

const AnimatedBackground = () => {
  // Create 20 floating particles with different positions, sizes, and animation parameters
  const particles = Array.from({ length: 20 }).map((_, i) => {
    const size = 10 + Math.random() * 40; // Random size between 10px and 50px
    const top = Math.random() * 100; // Random top position
    const left = Math.random() * 100; // Random left position
    const delay = Math.random() * 5; // Random animation delay
    const duration = 10 + Math.random() * 20; // Random animation duration
    const opacity = 0.05 + Math.random() * 0.15; // Random opacity
    const tx = -20 + Math.random() * 40; // Random X translation
    const ty = -20 + Math.random() * 40; // Random Y translation

    return (
      <div
        key={i}
        className="absolute rounded-full bg-gradient-to-br from-cgs-blue/30 to-cgs-purple/30"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          top: `${top}%`,
          left: `${left}%`,
          opacity,
          animationDelay: `${delay}s`,
          animationDuration: `${duration}s`,
          '--tx': `${tx}px`,
          '--ty': `${ty}px`,
          '--tx2': `${-tx}px`,
          '--ty2': `${-ty}px`,
          animation: 'float infinite ease-in-out'
        } as React.CSSProperties}
      />
    );
  });

  // Create a bigger central glow effect
  const glow = (
    <div 
      className="absolute w-[50vw] h-[50vw] rounded-full bg-gradient-to-br from-cgs-blue/5 to-cgs-purple/5"
      style={{
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        animation: 'pulse 10s infinite ease-in-out',
        zIndex: 0
      }}
    />
  );

  return (
    <div className="fixed inset-0 overflow-hidden -z-10">
      {glow}
      {particles}
    </div>
  );
};

export default AnimatedBackground;
