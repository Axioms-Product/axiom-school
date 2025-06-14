
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
    }, 300); // Faster animation

    const iconInterval = setInterval(() => {
      setCurrentIcon(prev => (prev + 1) % icons.length);
    }, 800); // Faster icon switching

    return () => {
      clearInterval(dotsInterval);
      clearInterval(iconInterval);
    };
  }, []);

  const IconComponent = icons[currentIcon];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-white via-gray-50 to-blue-50 overflow-hidden">
      {/* Optimized Background Elements */}
      <div className="absolute inset-0">
        {/* Reduced blur for better performance */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-100/30 rounded-full blur-2xl animate-pulse will-change-transform"></div>
        <div className="absolute bottom-1/3 right-1/3 w-48 h-48 bg-purple-100/30 rounded-full blur-2xl animate-pulse delay-500 will-change-transform"></div>
        <div className="absolute top-1/2 right-1/4 w-32 h-32 bg-pink-100/30 rounded-full blur-xl animate-pulse delay-700 will-change-transform"></div>
        
        {/* Optimized floating particles */}
        <div className="absolute top-16 left-16 w-2 h-2 bg-blue-300 rounded-full animate-bounce delay-300 opacity-60"></div>
        <div className="absolute top-32 right-24 w-1 h-1 bg-purple-400 rounded-full animate-bounce delay-600 opacity-50"></div>
        <div className="absolute bottom-24 left-32 w-1.5 h-1.5 bg-pink-400 rounded-full animate-bounce delay-400 opacity-40"></div>
        
        {/* Optimized decorative stars */}
        <Star className="absolute top-12 right-16 h-3 w-3 text-yellow-400 animate-pulse opacity-60" />
        <Star className="absolute bottom-16 left-12 h-2 w-2 text-blue-400 animate-pulse delay-300 opacity-50" />
      </div>

      {/* Main Content - Mobile Optimized */}
      <div className="text-center max-w-xs sm:max-w-sm px-4 sm:px-6 relative z-10 w-full">
        {/* Logo Section - Responsive */}
        <div className="mb-6 sm:mb-8">
          <div className="relative mb-4 sm:mb-6">
            {/* Optimized outer glow ring */}
            <div className="absolute inset-0 w-24 h-24 sm:w-32 sm:h-32 mx-auto bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 rounded-full blur-xl opacity-50 animate-pulse"></div>
            
            {/* Main logo container - Responsive */}
            <div className="relative w-24 h-24 sm:w-32 sm:h-32 mx-auto bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-xl border-3 border-white/90 backdrop-blur-sm">
              {/* Inner white circle */}
              <div className="absolute inset-2 sm:inset-3 bg-white/95 rounded-full flex items-center justify-center backdrop-blur-sm shadow-inner">
                <IconComponent className="h-10 w-10 sm:h-14 sm:w-14 text-blue-600 drop-shadow-lg transition-all duration-500 ease-in-out" />
              </div>
              
              {/* Optimized sparkle effects */}
              <Sparkles className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 h-5 w-5 sm:h-7 sm:w-7 text-yellow-400 animate-spin drop-shadow-lg" style={{ animationDuration: '2s' }} />
              <Sparkles className="absolute -bottom-2 -left-2 sm:-bottom-3 sm:-left-3 h-4 w-4 sm:h-5 sm:w-5 text-pink-400 animate-spin drop-shadow-lg" style={{ animationDuration: '3s', animationDirection: 'reverse' }} />
            </div>
          </div>
          
          <div className="space-y-2 sm:space-y-3">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-1 sm:mb-2 tracking-wide">
              Axioms School
            </h1>
            <p className="text-gray-600 text-lg sm:text-xl font-medium">Excellence in Education</p>
            <div className="flex items-center justify-center gap-2 mt-4 sm:mt-6">
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-blue-400 rounded-full animate-bounce shadow-lg"></div>
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-purple-400 rounded-full animate-bounce delay-100 shadow-lg"></div>
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-pink-400 rounded-full animate-bounce delay-200 shadow-lg"></div>
            </div>
          </div>
        </div>

        {/* Loading Section - Mobile Optimized */}
        <div className="space-y-4 sm:space-y-6">
          <div className="relative w-full">
            {/* Progress bar background */}
            <div className="w-full bg-gray-200 rounded-full h-3 sm:h-4 overflow-hidden shadow-inner border border-gray-300">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full transition-all duration-200 ease-out shadow-lg will-change-transform relative"
                style={{ width: `${Math.min(progress, 100)}%` }}
              >
                {/* Optimized shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
              </div>
            </div>
            
            {/* Progress percentage - Mobile Optimized */}
            <div className="absolute -top-8 sm:-top-10 left-1/2 transform -translate-x-1/2">
              <span className="text-gray-700 text-xs sm:text-sm font-bold bg-white/90 px-3 py-1 sm:px-4 sm:py-2 rounded-full backdrop-blur-sm border border-gray-200 shadow-lg">
                {Math.round(progress)}%
              </span>
            </div>
          </div>
          
          <div className="text-gray-700 space-y-1 sm:space-y-2">
            <p className="text-lg sm:text-xl font-semibold">Loading{dots}</p>
            <p className="text-sm sm:text-base text-gray-500">Getting ready...</p>
          </div>
        </div>
      </div>

      {/* Footer - Mobile Optimized */}
      <div className="absolute bottom-4 sm:bottom-8 left-0 right-0 text-center">
        <div className="flex items-center justify-center gap-1 sm:gap-2 px-4 sm:px-6">
          <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-500" />
          <p className="text-xs sm:text-sm text-gray-500 font-medium">
            Powered by Axioms
          </p>
          <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 text-pink-500" />
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
