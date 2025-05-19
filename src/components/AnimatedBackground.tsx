
import React from 'react';

const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-gray-900">
      {/* Static gradient background */}
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-900 to-purple-900 opacity-50" />
      
      {/* Animated circles */}
      <div className="absolute top-0 left-0 w-full h-full">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-blue-500/30"
            style={{
              width: `${2 + Math.random() * 8}rem`,
              height: `${2 + Math.random() * 8}rem`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${10 + Math.random() * 20}s infinite ease-in-out`,
              animationDelay: `${Math.random() * 5}s`,
              opacity: 0.1 + Math.random() * 0.3,
            }}
          />
        ))}
        
        {/* Central glow */}
        <div 
          className="absolute rounded-full bg-gradient-to-r from-blue-500 to-purple-500 blur-3xl"
          style={{
            width: '30rem',
            height: '30rem',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            opacity: 0.15,
            animation: 'pulse 8s infinite ease-in-out',
          }}
        />

        {/* Additional particles */}
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={`particle-${i}`}
            className="absolute rounded-full bg-purple-500/40"
            style={{
              width: `${1 + Math.random() * 3}rem`,
              height: `${1 + Math.random() * 3}rem`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${5 + Math.random() * 15}s infinite ease-in-out`,
              animationDelay: `${Math.random() * 5}s`,
              opacity: 0.1 + Math.random() * 0.2,
            }}
          />
        ))}
      </div>

      {/* Add a CSS animation for floating effect */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% {
            transform: translate(0, 0);
          }
          25% {
            transform: translate(${Math.random() * 50 - 25}px, ${Math.random() * 50 - 25}px);
          }
          50% {
            transform: translate(${Math.random() * 50 - 25}px, ${Math.random() * 50 - 25}px);
          }
          75% {
            transform: translate(${Math.random() * 50 - 25}px, ${Math.random() * 50 - 25}px);
          }
        }
        @keyframes pulse {
          0%, 100% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0.15;
          }
          50% {
            transform: translate(-50%, -50%) scale(1.2);
            opacity: 0.2;
          }
        }
      `}</style>
    </div>
  );
};

export default AnimatedBackground;
