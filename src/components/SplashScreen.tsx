
import { useEffect, useState } from 'react';

interface SplashScreenProps {
  progress: number;
}

const SplashScreen = ({ progress }: SplashScreenProps) => {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const dotsInterval = setInterval(() => {
      setDots(prev => {
        if (prev.length >= 3) return '';
        return prev + '.';
      });
    }, 500);

    return () => {
      clearInterval(dotsInterval);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 overflow-hidden">
      {/* 3D Geometric Background Elements */}
      <div className="absolute inset-0 perspective-1000">
        {/* Main floating cubes with 3D effect */}
        <div className="absolute top-1/4 left-1/4 w-12 h-12 md:w-20 md:h-20 bg-gradient-to-br from-blue-400 to-blue-600 transform rotate-45 rotateX-12 shadow-2xl opacity-60"></div>
        <div className="absolute top-1/3 right-1/3 w-8 h-8 md:w-16 md:h-16 bg-gradient-to-br from-purple-400 to-purple-600 transform rotate-12 rotateY-12 shadow-xl opacity-70"></div>
        <div className="absolute bottom-1/3 left-1/2 w-10 h-10 md:w-18 md:h-18 bg-gradient-to-br from-indigo-400 to-indigo-600 transform -rotate-45 rotateX-6 shadow-lg opacity-50"></div>
        <div className="absolute bottom-1/4 right-1/4 w-6 h-6 md:w-12 md:h-12 bg-gradient-to-br from-cyan-400 to-cyan-600 transform rotate-30 rotateY-30 shadow-md opacity-80"></div>
        
        {/* Hexagonal prisms */}
        <div className="absolute top-1/2 left-1/6 w-8 h-14 md:w-12 md:h-20 bg-gradient-to-b from-emerald-400 to-emerald-600 transform rotateX-45 rotateY-30 opacity-40 hexagon"></div>
        <div className="absolute top-1/6 right-1/5 w-6 h-10 md:w-10 md:h-16 bg-gradient-to-b from-pink-400 to-pink-600 transform rotateX-30 rotateY-45 opacity-60 hexagon"></div>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 text-center max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto px-4 sm:px-6">
        {/* 3D Logo Container */}
        <div className="mb-6 md:mb-10 relative perspective-1000">
          {/* Glowing backdrop */}
          <div className="absolute inset-0 bg-gradient-radial from-blue-500/30 via-purple-500/20 to-transparent rounded-full blur-3xl scale-150"></div>
          
          {/* 3D Logo Box */}
          <div className="relative transform-gpu transition-all duration-1000 hover:scale-105">
            <div className="relative bg-gradient-to-br from-slate-800/90 via-blue-900/90 to-indigo-900/90 backdrop-blur-xl rounded-3xl p-6 md:p-8 border border-white/20 shadow-2xl transform rotateX-5 rotateY-5">
              {/* Inner glow effect */}
              <div className="absolute inset-2 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl blur-sm"></div>
              
              {/* Logo Text with 3D effect */}
              <div className="relative">
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-2 md:mb-4 tracking-wider">
                  <span className="inline-block transform hover:scale-110 transition-transform duration-300 text-shadow-3d">A</span>
                  <span className="inline-block transform hover:scale-110 transition-transform duration-300 delay-75 text-shadow-3d">X</span>
                  <span className="inline-block transform hover:scale-110 transition-transform duration-300 delay-150 text-shadow-3d">I</span>
                  <span className="inline-block transform hover:scale-110 transition-transform duration-300 delay-225 text-shadow-3d">O</span>
                  <span className="inline-block transform hover:scale-110 transition-transform duration-300 delay-300 text-shadow-3d">M</span>
                  <span className="inline-block transform hover:scale-110 transition-transform duration-300 delay-375 text-shadow-3d">S</span>
                </h1>
                <h2 className="text-lg sm:text-xl md:text-2xl font-light text-blue-200/90 tracking-[0.3em] md:tracking-[0.5em]">
                  SCHOOL
                </h2>
              </div>
              
              {/* 3D corner accents */}
              <div className="absolute top-3 left-3 w-3 h-3 md:w-4 md:h-4 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full shadow-lg"></div>
              <div className="absolute top-3 right-3 w-2 h-2 md:w-3 md:h-3 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full shadow-md"></div>
              <div className="absolute bottom-3 left-3 w-2 h-2 md:w-3 md:h-3 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full shadow-md"></div>
              <div className="absolute bottom-3 right-3 w-3 h-3 md:w-4 md:h-4 bg-gradient-to-br from-orange-400 to-red-500 rounded-full shadow-lg"></div>
            </div>
          </div>
        </div>

        {/* 3D Loading Section */}
        <div className="space-y-4 md:space-y-6">
          <div className="relative transform-gpu">
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl md:rounded-3xl p-4 sm:p-6 md:p-8 border border-white/20 shadow-2xl transform rotateX-2">
              {/* Status text */}
              <p className="text-white text-base sm:text-lg md:text-xl font-light mb-4 md:mb-6">
                Initializing Learning Environment{dots}
              </p>
              
              {/* 3D Progress Container */}
              <div className="relative mb-4 md:mb-6">
                <div className="relative w-full bg-white/20 rounded-full h-3 md:h-4 overflow-hidden shadow-inner">
                  {/* Progress bar with 3D effect */}
                  <div 
                    className="h-full bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 rounded-full transition-all duration-500 ease-out shadow-lg relative overflow-hidden"
                    style={{ width: `${Math.min(progress, 100)}%` }}
                  >
                    {/* Shimmer effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
                    {/* 3D highlight */}
                    <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/40 to-transparent rounded-full"></div>
                  </div>
                </div>
              </div>
              
              {/* Status and percentage */}
              <div className="flex justify-between items-center text-xs sm:text-sm md:text-base text-blue-100">
                <span className="font-medium">
                  {progress < 25 ? '📚 Loading curricula...' : 
                   progress < 50 ? '⚡ Setting up interface...' : 
                   progress < 75 ? '🔧 Configuring systems...' : 
                   progress < 95 ? '✨ Finalizing setup...' : 
                   '🚀 Ready to learn!'}
                </span>
                <span className="font-mono font-bold text-white">{Math.round(progress)}%</span>
              </div>
            </div>
          </div>
          
          {/* Bottom tagline with 3D effect */}
          <div className="text-center">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-3 md:p-4 border border-white/10">
              <p className="text-blue-200/90 text-sm sm:text-base md:text-lg font-light">
                Empowering minds • Shaping futures • Building tomorrow
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Floating 3D particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 sm:w-2 sm:h-2 bg-white/30 rounded-full shadow-lg"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              transform: `translateZ(${Math.random() * 50}px)`,
              animation: `float-3d ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <style>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        
        .rotateX-12 {
          transform: rotateX(12deg);
        }
        
        .rotateY-12 {
          transform: rotateY(12deg);
        }
        
        .rotateX-45 {
          transform: rotateX(45deg);
        }
        
        .rotateY-30 {
          transform: rotateY(30deg);
        }
        
        .rotateX-5 {
          transform: rotateX(5deg);
        }
        
        .rotateY-5 {
          transform: rotateY(5deg);
        }
        
        .rotateX-2 {
          transform: rotateX(2deg);
        }
        
        .text-shadow-3d {
          text-shadow: 
            2px 2px 0px rgba(0,0,0,0.3),
            4px 4px 8px rgba(0,0,0,0.2),
            0 0 20px rgba(59, 130, 246, 0.5);
        }
        
        .bg-gradient-radial {
          background: radial-gradient(circle, var(--tw-gradient-stops));
        }
        
        .hexagon {
          clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
        }
        
        @keyframes float-3d {
          0%, 100% { 
            transform: translateY(0px) translateZ(0px) rotateX(0deg) rotateY(0deg); 
            opacity: 0.3; 
          }
          50% { 
            transform: translateY(-20px) translateZ(30px) rotateX(180deg) rotateY(180deg); 
            opacity: 0.8; 
          }
        }
        
        @media (max-width: 640px) {
          .rotateX-12, .rotateY-12, .rotateX-45, .rotateY-30, .rotateX-5, .rotateY-5 {
            transform: none;
          }
        }
      `}</style>
    </div>
  );
};

export default SplashScreen;
