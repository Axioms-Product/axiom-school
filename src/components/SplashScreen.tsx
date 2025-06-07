
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
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Floating geometric shapes */}
        <div className="absolute top-20 left-20 w-16 h-16 bg-blue-500/20 rounded-lg animate-pulse transform rotate-45"></div>
        <div className="absolute top-40 right-32 w-8 h-8 bg-purple-500/30 rounded-full animate-bounce"></div>
        <div className="absolute bottom-32 left-40 w-12 h-12 bg-indigo-400/25 rounded-lg animate-spin"></div>
        <div className="absolute bottom-20 right-20 w-6 h-6 bg-blue-400/40 rounded-full animate-ping"></div>
        
        {/* Animated lines */}
        <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent animate-pulse"></div>
        <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-400/30 to-transparent animate-pulse delay-1000"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-lg mx-auto px-4 sm:px-6">
        {/* Animated Logo */}
        <div className="mb-8 relative">
          {/* Logo Background Glow */}
          <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
          
          {/* Logo Text with Animation */}
          <div className="relative">
            <h1 className="text-5xl sm:text-7xl font-bold text-white mb-4 tracking-wider transform transition-all duration-1000 animate-fade-in">
              <span className="inline-block animate-bounce delay-100">A</span>
              <span className="inline-block animate-bounce delay-200">X</span>
              <span className="inline-block animate-bounce delay-300">I</span>
              <span className="inline-block animate-bounce delay-400">O</span>
              <span className="inline-block animate-bounce delay-500">M</span>
              <span className="inline-block animate-bounce delay-600">S</span>
            </h1>
            <h2 className="text-xl sm:text-2xl font-light text-blue-200 tracking-widest animate-fade-in delay-1000">
              SCHOOL
            </h2>
          </div>
          
          {/* Decorative Elements */}
          <div className="absolute -top-4 -left-4 w-3 h-3 bg-blue-400 rounded-full animate-ping"></div>
          <div className="absolute -top-2 -right-6 w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
          <div className="absolute -bottom-2 left-8 w-2 h-2 bg-indigo-400 rounded-full animate-bounce"></div>
        </div>

        {/* Loading Section */}
        <div className="space-y-6">
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 sm:p-6 border border-white/20 shadow-lg transform transition-all duration-500 hover:scale-105">
            <p className="text-white text-lg sm:text-xl font-light mb-6">
              Initializing Learning Environment{dots}
            </p>
            
            {/* Progress bar */}
            <div className="relative w-full bg-white/20 rounded-full h-2 sm:h-3 mb-4 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 rounded-full transition-all duration-500 ease-out shadow-lg"
                style={{ width: `${Math.min(progress, 100)}%` }}
              >
                <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
              </div>
            </div>
            
            <div className="flex justify-between text-xs sm:text-sm text-blue-100">
              <span>
                {progress < 25 ? '📚 Loading curricula...' : 
                 progress < 50 ? '⚡ Setting up interface...' : 
                 progress < 75 ? '🔧 Configuring systems...' : 
                 progress < 95 ? '✨ Finalizing setup...' : 
                 '🚀 Ready to learn!'}
              </span>
              <span className="font-mono">{Math.round(progress)}%</span>
            </div>
          </div>
          
          {/* Bottom tagline */}
          <div className="mt-8 text-center">
            <p className="text-blue-200/80 text-sm sm:text-base font-light animate-fade-in delay-2000">
              Empowering minds • Shaping futures • Building tomorrow
            </p>
          </div>
        </div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 sm:w-2 sm:h-2 bg-white/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.3; }
          50% { transform: translateY(-20px) rotate(180deg); opacity: 0.8; }
        }
        @keyframes fade-in {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default SplashScreen;
