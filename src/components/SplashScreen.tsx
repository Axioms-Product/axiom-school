
import { useEffect, useState } from 'react';

interface SplashScreenProps {
  progress: number;
}

const SplashScreen = ({ progress }: SplashScreenProps) => {
  const [dots, setDots] = useState('');
  const [currentPhase, setCurrentPhase] = useState(0);

  const phases = [
    { text: '🚀 Initializing System', color: 'from-blue-500 to-cyan-600' },
    { text: '📚 Loading Resources', color: 'from-purple-500 to-pink-600' },
    { text: '⚡ Setting up Interface', color: 'from-green-500 to-teal-600' },
    { text: '✨ Finalizing Setup', color: 'from-orange-500 to-red-600' },
    { text: '🎯 Ready to Launch!', color: 'from-indigo-500 to-purple-600' }
  ];

  useEffect(() => {
    const dotsInterval = setInterval(() => {
      setDots(prev => {
        if (prev.length >= 3) return '';
        return prev + '.';
      });
    }, 400);

    return () => {
      clearInterval(dotsInterval);
    };
  }, []);

  useEffect(() => {
    if (progress < 20) setCurrentPhase(0);
    else if (progress < 40) setCurrentPhase(1);
    else if (progress < 60) setCurrentPhase(2);
    else if (progress < 80) setCurrentPhase(3);
    else setCurrentPhase(4);
  }, [progress]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 overflow-hidden">
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-20 h-20 md:w-32 md:h-32 bg-gradient-to-br from-cyan-400 to-blue-600 transform rotate-45 shadow-2xl opacity-70 animate-bounce"></div>
        <div className="absolute top-1/3 right-1/3 w-16 h-16 md:w-24 md:h-24 bg-gradient-to-br from-purple-400 to-pink-600 rounded-full shadow-xl opacity-60 animate-pulse"></div>
        <div className="absolute bottom-1/3 left-1/2 w-18 h-18 md:w-28 md:h-28 bg-gradient-to-br from-emerald-400 to-teal-600 transform -rotate-45 shadow-lg opacity-50 animate-spin"></div>
        <div className="absolute bottom-1/4 right-1/4 w-12 h-12 md:w-20 md:h-20 bg-gradient-to-br from-orange-400 to-red-600 rounded-full shadow-md opacity-80 animate-bounce"></div>
        
        <div className="absolute top-1/6 left-1/5 w-4 h-4 bg-white rounded-full opacity-60 animate-ping"></div>
        <div className="absolute top-2/3 right-1/6 w-3 h-3 bg-cyan-400 rounded-full opacity-80 animate-pulse"></div>
        <div className="absolute bottom-1/5 left-1/3 w-5 h-5 bg-purple-400 rounded-full opacity-50 animate-bounce"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-lg mx-auto px-6">
        {/* Enhanced Logo */}
        <div className="mb-10 relative">
          <div className="absolute inset-0 bg-gradient-radial from-blue-500/50 via-purple-500/40 to-transparent rounded-full blur-3xl scale-150 animate-pulse"></div>
          
          <div className="relative bg-gradient-to-br from-slate-800/95 via-blue-900/95 to-indigo-900/95 backdrop-blur-xl rounded-3xl p-10 border border-white/30 shadow-2xl transform hover:scale-105 transition-transform duration-500">
            <div className="absolute inset-4 bg-gradient-to-br from-blue-500/30 to-purple-500/30 rounded-2xl blur-sm animate-pulse"></div>
            
            <div className="relative">
              <h1 className="text-5xl md:text-6xl font-black text-white mb-4 tracking-wider">
                <span className="inline-block transform hover:scale-110 transition-transform duration-300 text-shadow-3d animate-pulse text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">A</span>
                <span className="inline-block transform hover:scale-110 transition-transform duration-300 delay-75 text-shadow-3d animate-pulse text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">X</span>
                <span className="inline-block transform hover:scale-110 transition-transform duration-300 delay-150 text-shadow-3d animate-pulse text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">I</span>
                <span className="inline-block transform hover:scale-110 transition-transform duration-300 delay-225 text-shadow-3d animate-pulse text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-red-500">O</span>
                <span className="inline-block transform hover:scale-110 transition-transform duration-300 delay-300 text-shadow-3d animate-pulse text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">M</span>
                <span className="inline-block transform hover:scale-110 transition-transform duration-300 delay-375 text-shadow-3d animate-pulse text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-500">S</span>
              </h1>
              <h2 className="text-xl md:text-2xl font-light text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-purple-200 tracking-[0.6em] animate-fade-in">
                SCHOOL
              </h2>
            </div>
          </div>
        </div>

        {/* Enhanced Loading Section */}
        <div className="space-y-8">
          <div className="bg-white/15 backdrop-blur-xl rounded-3xl p-8 border border-white/25 shadow-2xl">
            <p className="text-white text-xl font-light mb-8 animate-fade-in">
              {phases[currentPhase]?.text}{dots}
            </p>
            
            <div className="relative mb-8">
              <div className="w-full bg-white/25 rounded-full h-4 overflow-hidden shadow-inner">
                <div 
                  className={`h-full bg-gradient-to-r ${phases[currentPhase]?.color} rounded-full transition-all duration-700 ease-out shadow-lg relative overflow-hidden`}
                  style={{ width: `${Math.min(progress, 100)}%` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-pulse"></div>
                  <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/50 to-transparent rounded-full"></div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-between items-center text-base text-blue-100">
              <span className="font-medium animate-fade-in">
                Phase {currentPhase + 1} of 5
              </span>
              <span className="font-mono font-bold text-white text-2xl animate-scale-in">{Math.round(progress)}%</span>
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/15 animate-fade-in">
            <p className="text-blue-200/90 text-lg font-light">
              🎓 Empowering Education • 🚀 Innovation in Learning • ✨ Building Tomorrow
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
        
        @keyframes fade-in {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes scale-in {
          0% { opacity: 0; transform: scale(0.8); }
          100% { opacity: 1; transform: scale(1); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
        
        .animate-scale-in {
          animation: scale-in 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default SplashScreen;
