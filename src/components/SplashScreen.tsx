
import { useEffect, useState } from 'react';
import { GraduationCap, BookOpen, Users, Award, Sparkles } from 'lucide-react';

interface SplashScreenProps {
  progress: number;
}

const SplashScreen = ({ progress }: SplashScreenProps) => {
  const [dots, setDots] = useState('');
  const [currentIcon, setCurrentIcon] = useState(0);

  const icons = [GraduationCap, BookOpen, Users, Award];

  useEffect(() => {
    const dotsInterval = setInterval(() => {
      setDots(prev => {
        if (prev.length >= 3) return '';
        return prev + '.';
      });
    }, 400);

    const iconInterval = setInterval(() => {
      setCurrentIcon(prev => (prev + 1) % icons.length);
    }, 1000);

    return () => {
      clearInterval(dotsInterval);
      clearInterval(iconInterval);
    };
  }, []);

  const IconComponent = icons[currentIcon];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse will-change-transform"></div>
        <div className="absolute bottom-1/3 right-1/3 w-56 h-56 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-700 will-change-transform"></div>
        <div className="absolute top-1/2 right-1/4 w-40 h-40 bg-pink-500/20 rounded-full blur-2xl animate-pulse delay-1000 will-change-transform"></div>
        
        {/* Floating particles */}
        <div className="absolute top-20 left-20 w-2 h-2 bg-white/30 rounded-full animate-bounce delay-500"></div>
        <div className="absolute top-40 right-32 w-1 h-1 bg-purple-300/40 rounded-full animate-bounce delay-1000"></div>
        <div className="absolute bottom-32 left-40 w-1.5 h-1.5 bg-blue-300/40 rounded-full animate-bounce delay-700"></div>
      </div>

      {/* Main Content */}
      <div className="text-center max-w-sm px-6 relative z-10 w-full">
        {/* Logo Section */}
        <div className="mb-8">
          <div className="relative mb-6">
            {/* Outer glow ring */}
            <div className="absolute inset-0 w-28 h-28 mx-auto bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 rounded-full blur-lg opacity-60 animate-pulse"></div>
            
            {/* Main logo container */}
            <div className="relative w-28 h-28 mx-auto bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-full flex items-center justify-center shadow-2xl border-4 border-white/20 backdrop-blur-sm">
              <div className="absolute inset-2 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                <IconComponent className="h-12 w-12 text-white drop-shadow-lg transition-all duration-700 ease-in-out" />
              </div>
              
              {/* Sparkle effects */}
              <Sparkles className="absolute -top-2 -right-2 h-6 w-6 text-yellow-300 animate-spin" style={{ animationDuration: '3s' }} />
              <Sparkles className="absolute -bottom-2 -left-2 h-4 w-4 text-pink-300 animate-spin" style={{ animationDuration: '4s', animationDirection: 'reverse' }} />
            </div>
          </div>
          
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-white mb-2 tracking-wide bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
              Axioms School
            </h1>
            <p className="text-purple-200 text-lg font-medium">Excellence in Education</p>
            <div className="flex items-center justify-center gap-2 mt-4">
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce delay-100"></div>
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-200"></div>
            </div>
          </div>
        </div>

        {/* Loading Section */}
        <div className="space-y-6">
          <div className="relative w-full">
            {/* Progress bar background */}
            <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden backdrop-blur-sm border border-white/20">
              <div 
                className="h-full bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 rounded-full transition-all duration-300 ease-out shadow-lg will-change-transform relative"
                style={{ width: `${Math.min(progress, 100)}%` }}
              >
                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
              </div>
            </div>
            
            {/* Progress percentage */}
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
              <span className="text-white/90 text-sm font-bold bg-black/20 px-3 py-1 rounded-full backdrop-blur-sm border border-white/20">
                {Math.round(progress)}%
              </span>
            </div>
          </div>
          
          <div className="text-white/90 space-y-2">
            <p className="text-lg font-semibold">Loading your experience{dots}</p>
            <p className="text-sm text-purple-200">Preparing everything for you...</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-8 left-0 right-0 text-center">
        <p className="text-sm text-white/60 font-medium px-6">
          ✨ Powered by Axioms Product with Satyam Rojha ✨
        </p>
      </div>
    </div>
  );
};

export default SplashScreen;
