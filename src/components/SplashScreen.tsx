
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 overflow-hidden">
      {/* Enhanced 3D Background Elements */}
      <div className="absolute inset-0">
        {/* Floating 3D geometric shapes */}
        <div className="absolute top-1/4 left-1/4 w-16 h-16 md:w-24 md:h-24 bg-gradient-to-br from-cyan-400 to-blue-600 transform rotate-45 shadow-2xl opacity-70 animate-pulse"></div>
        <div className="absolute top-1/3 right-1/3 w-12 h-12 md:w-20 md:h-20 bg-gradient-to-br from-purple-400 to-pink-600 transform rotate-12 shadow-xl opacity-60 animate-bounce"></div>
        <div className="absolute bottom-1/3 left-1/2 w-14 h-14 md:w-22 md:h-22 bg-gradient-to-br from-emerald-400 to-teal-600 transform -rotate-45 shadow-lg opacity-50"></div>
        <div className="absolute bottom-1/4 right-1/4 w-10 h-10 md:w-16 md:h-16 bg-gradient-to-br from-orange-400 to-red-600 transform rotate-30 shadow-md opacity-80"></div>
        
        {/* Hexagonal elements */}
        <div className="absolute top-1/2 left-1/6 w-12 h-20 md:w-16 md:h-28 bg-gradient-to-b from-violet-400 to-purple-600 opacity-40 clip-path-hexagon"></div>
        <div className="absolute top-1/6 right-1/5 w-8 h-14 md:w-12 md:h-20 bg-gradient-to-b from-pink-400 to-rose-600 opacity-60 clip-path-hexagon"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-md mx-auto px-6">
        {/* Enhanced 3D Logo */}
        <div className="mb-8 relative">
          <div className="absolute inset-0 bg-gradient-radial from-blue-500/40 via-purple-500/30 to-transparent rounded-full blur-3xl scale-150"></div>
          
          <div className="relative bg-gradient-to-br from-slate-800/95 via-blue-900/95 to-indigo-900/95 backdrop-blur-xl rounded-3xl p-8 border border-white/30 shadow-2xl transform hover:scale-105 transition-transform duration-500">
            <div className="absolute inset-3 bg-gradient-to-br from-blue-500/30 to-purple-500/30 rounded-2xl blur-sm"></div>
            
            <div className="relative">
              <h1 className="text-5xl md:text-6xl font-black text-white mb-3 tracking-wider">
                <span className="inline-block transform hover:scale-110 transition-transform duration-300 text-shadow-3d">A</span>
                <span className="inline-block transform hover:scale-110 transition-transform duration-300 delay-75 text-shadow-3d">X</span>
                <span className="inline-block transform hover:scale-110 transition-transform duration-300 delay-150 text-shadow-3d">I</span>
                <span className="inline-block transform hover:scale-110 transition-transform duration-300 delay-225 text-shadow-3d">O</span>
                <span className="inline-block transform hover:scale-110 transition-transform duration-300 delay-300 text-shadow-3d">M</span>
                <span className="inline-block transform hover:scale-110 transition-transform duration-300 delay-375 text-shadow-3d">S</span>
              </h1>
              <h2 className="text-xl md:text-2xl font-light text-blue-200/90 tracking-[0.5em]">
                SCHOOL
              </h2>
            </div>
            
            {/* Corner accents */}
            <div className="absolute top-3 left-3 w-4 h-4 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full shadow-lg"></div>
            <div className="absolute top-3 right-3 w-3 h-3 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full shadow-md"></div>
            <div className="absolute bottom-3 left-3 w-3 h-3 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full shadow-md"></div>
            <div className="absolute bottom-3 right-3 w-4 h-4 bg-gradient-to-br from-orange-400 to-red-500 rounded-full shadow-lg"></div>
          </div>
        </div>

        {/* Enhanced Loading Section */}
        <div className="space-y-6">
          <div className="bg-white/15 backdrop-blur-xl rounded-2xl p-6 border border-white/25 shadow-2xl">
            <p className="text-white text-lg font-light mb-6">
              Initializing Learning Environment{dots}
            </p>
            
            <div className="relative mb-6">
              <div className="w-full bg-white/25 rounded-full h-4 overflow-hidden shadow-inner">
                <div 
                  className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-full transition-all duration-500 ease-out shadow-lg relative overflow-hidden"
                  style={{ width: `${Math.min(progress, 100)}%` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-pulse"></div>
                  <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/50 to-transparent rounded-full"></div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-between items-center text-sm text-blue-100">
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
          
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/15">
            <p className="text-blue-200/90 text-base font-light">
              Empowering minds • Shaping futures • Building tomorrow
            </p>
          </div>
        </div>
      </div>

      <style>{`
        .text-shadow-3d {
          text-shadow: 
            3px 3px 0px rgba(0,0,0,0.4),
            6px 6px 12px rgba(0,0,0,0.3),
            0 0 25px rgba(59, 130, 246, 0.6);
        }
        
        .bg-gradient-radial {
          background: radial-gradient(circle, var(--tw-gradient-stops));
        }
        
        .clip-path-hexagon {
          clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
        }
      `}</style>
    </div>
  );
};

export default SplashScreen;
