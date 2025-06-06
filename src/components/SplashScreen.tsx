
import { useEffect, useState } from 'react';
import Logo from '@/components/ui/logo';

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
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width=%2260%22%20height=%2260%22%20viewBox=%220%200%2060%2060%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg%20fill=%22none%22%20fill-rule=%22evenodd%22%3E%3Cg%20fill=%22%23ffffff%22%20fill-opacity=%220.1%22%3E%3Ccircle%20cx=%2260%22%20cy=%2212%22%20r=%224%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40"></div>
        
        {/* Floating orbs */}
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className={`absolute rounded-full bg-gradient-to-br from-white/20 to-blue-200/30 backdrop-blur-sm ${
              i % 4 === 0 ? 'animate-bounce' : 
              i % 4 === 1 ? 'animate-pulse' : 
              i % 4 === 2 ? 'animate-ping' : 'animate-spin'
            }`}
            style={{
              width: `${Math.random() * 80 + 30}px`,
              height: `${Math.random() * 80 + 30}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${3 + Math.random() * 4}s`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="z-10 text-center animate-scale-in max-w-lg mx-auto px-4 sm:px-6">
        {/* Main Logo Container */}
        <div className="relative mb-8">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-3xl blur-xl opacity-30 animate-pulse"></div>
            <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-white/20 shadow-2xl">
              <Logo size="xl" className="justify-center mb-4" />
              <div className="h-1 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 rounded-full mx-auto w-24"></div>
            </div>
          </div>
        </div>
        
        {/* School Branding */}
        <div className="mb-10">
          <h1 className="text-4xl sm:text-6xl font-bold text-white mb-4 tracking-tight">
            <span className="bg-gradient-to-r from-blue-200 via-white to-purple-200 bg-clip-text text-transparent">
              Axioms School
            </span>
          </h1>
          <div className="inline-block">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-4 sm:px-6 py-3 border border-white/20">
              <p className="text-blue-100 text-base sm:text-lg font-medium">
                🎓 Excellence in Digital Education
              </p>
            </div>
          </div>
        </div>
        
        {/* Enhanced Loading Section */}
        <div className="space-y-6">
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 sm:p-6 border border-white/20 shadow-lg">
            <div className="flex items-center justify-center mb-4">
              <div className="flex space-x-1">
                {dots.split('').map((_, i) => (
                  <div key={i} className="w-2 h-2 bg-blue-300 rounded-full animate-pulse"></div>
                ))}
              </div>
            </div>
            
            <p className="text-white text-lg sm:text-xl font-light mb-6">
              Initializing Learning Environment{dots}
            </p>
            
            {/* Modern Progress bar */}
            <div className="relative w-full bg-white/20 rounded-full h-2 sm:h-3 mb-4 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 rounded-full"></div>
              <div 
                className="h-full bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 rounded-full transition-all duration-500 ease-out shadow-lg relative overflow-hidden"
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
          
          {/* Feature Icons */}
          <div className="flex justify-center space-x-4 sm:space-x-6 mt-8">
            {['📚', '🔬', '🎨', '💻', '🌟', '🎯'].map((emoji, i) => (
              <div
                key={i}
                className="text-2xl sm:text-3xl animate-bounce bg-white/10 backdrop-blur-sm rounded-full p-2 sm:p-3 border border-white/20"
                style={{
                  animationDelay: `${i * 0.15}s`,
                  animationDuration: '2s'
                }}
              >
                {emoji}
              </div>
            ))}
          </div>
          
          {/* Bottom tagline */}
          <div className="mt-8 text-center">
            <p className="text-blue-200/80 text-sm sm:text-base font-light">
              Empowering minds • Shaping futures • Building tomorrow
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
