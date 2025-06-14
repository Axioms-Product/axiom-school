
import { useEffect, useState } from 'react';
import { GraduationCap, BookOpen, Users, Award, Sparkles, Star } from 'lucide-react';

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
    }, 150); // Much faster animation

    const iconInterval = setInterval(() => {
      setCurrentIcon(prev => (prev + 1) % icons.length);
    }, 400); // Faster icon switching

    return () => {
      clearInterval(dotsInterval);
      clearInterval(iconInterval);
    };
  }, []);

  const IconComponent = icons[currentIcon];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-white via-gray-50 to-blue-50 overflow-hidden">
      {/* Minimal background elements for performance */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-100/20 rounded-full blur-xl animate-pulse will-change-transform"></div>
        <div className="absolute bottom-1/3 right-1/3 w-24 h-24 bg-purple-100/20 rounded-full blur-xl animate-pulse delay-300 will-change-transform"></div>
        
        {/* Minimal decorative elements */}
        <Star className="absolute top-12 right-16 h-3 w-3 text-yellow-400 animate-pulse opacity-40" />
        <Star className="absolute bottom-16 left-12 h-2 w-2 text-blue-400 animate-pulse delay-200 opacity-30" />
      </div>

      {/* Main Content - Ultra mobile optimized */}
      <div className="text-center max-w-xs px-4 relative z-10 w-full">
        {/* Logo Section - Streamlined */}
        <div className="mb-4">
          <div className="relative mb-3">
            {/* Simplified logo container */}
            <div className="relative w-20 h-20 mx-auto bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg border-2 border-white/90">
              {/* Inner white circle */}
              <div className="absolute inset-2 bg-white/95 rounded-full flex items-center justify-center">
                <IconComponent className="h-8 w-8 text-blue-600 transition-all duration-300 ease-in-out" />
              </div>
              
              {/* Minimal sparkle effects */}
              <Sparkles className="absolute -top-1 -right-1 h-4 w-4 text-yellow-400 animate-spin opacity-60" style={{ animationDuration: '2s' }} />
            </div>
          </div>
          
          <div className="space-y-1">
            <h1 className="text-2xl font-bold text-gray-800 tracking-wide">
              Axioms School
            </h1>
            <p className="text-gray-600 text-sm font-medium">Excellence in Education</p>
            <div className="flex items-center justify-center gap-1 mt-2">
              <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce"></div>
              <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce delay-75"></div>
              <div className="w-1.5 h-1.5 bg-pink-400 rounded-full animate-bounce delay-150"></div>
            </div>
          </div>
        </div>

        {/* Loading Section - Simplified */}
        <div className="space-y-3">
          <div className="relative w-full">
            {/* Progress bar */}
            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden shadow-inner">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full transition-all duration-100 ease-out will-change-transform relative"
                style={{ width: `${Math.min(progress, 100)}%` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
              </div>
            </div>
            
            {/* Progress percentage */}
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
              <span className="text-gray-700 text-xs font-bold bg-white/90 px-2 py-1 rounded-full backdrop-blur-sm border border-gray-200 shadow-sm">
                {Math.round(progress)}%
              </span>
            </div>
          </div>
          
          <div className="text-gray-700 space-y-1">
            <p className="text-base font-semibold">Loading{dots}</p>
            <p className="text-xs text-gray-500">Almost ready...</p>
          </div>
        </div>
      </div>

      {/* Footer - Minimal */}
      <div className="absolute bottom-4 left-0 right-0 text-center">
        <div className="flex items-center justify-center gap-1 px-4">
          <Sparkles className="h-3 w-3 text-yellow-500 opacity-60" />
          <p className="text-xs text-gray-500 font-medium">
            Powered by Axioms
          </p>
          <Sparkles className="h-3 w-3 text-pink-500 opacity-60" />
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
