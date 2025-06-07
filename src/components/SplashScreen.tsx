
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      <div className="text-center max-w-lg mx-auto px-4 sm:px-6">
        {/* Main Logo Container */}
        <div className="relative mb-8">
          <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-white/20 shadow-2xl">
            <Logo size="xl" className="justify-center mb-4" />
            <div className="h-1 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 rounded-full mx-auto w-24"></div>
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
        
        {/* Loading Section */}
        <div className="space-y-6">
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 sm:p-6 border border-white/20 shadow-lg">
            <p className="text-white text-lg sm:text-xl font-light mb-6">
              Initializing Learning Environment{dots}
            </p>
            
            {/* Progress bar */}
            <div className="relative w-full bg-white/20 rounded-full h-2 sm:h-3 mb-4 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 rounded-full transition-all duration-500 ease-out shadow-lg"
                style={{ width: `${Math.min(progress, 100)}%` }}
              >
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
