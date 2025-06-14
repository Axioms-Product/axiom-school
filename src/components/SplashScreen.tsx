
import { useEffect, useState } from 'react';
import { GraduationCap, BookOpen, Users, Award, Sparkles, Star, Heart } from 'lucide-react';

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
    }, 150);

    const iconInterval = setInterval(() => {
      setCurrentIcon(prev => (prev + 1) % icons.length);
    }, 400);

    return () => {
      clearInterval(dotsInterval);
      clearInterval(iconInterval);
    };
  }, []);

  const IconComponent = icons[currentIcon];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 overflow-hidden">
      {/* Enhanced background elements */}
      <div className="absolute inset-0">
        {/* Animated gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-40 h-40 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-full blur-2xl animate-pulse will-change-transform"></div>
        <div className="absolute bottom-1/3 right-1/3 w-32 h-32 bg-gradient-to-br from-purple-200/30 to-pink-200/30 rounded-full blur-2xl animate-pulse delay-300 will-change-transform"></div>
        <div className="absolute top-1/2 right-1/4 w-24 h-24 bg-gradient-to-br from-pink-200/20 to-orange-200/20 rounded-full blur-xl animate-pulse delay-500 will-change-transform"></div>
        
        {/* Enhanced decorative elements */}
        <Star className="absolute top-16 right-20 h-4 w-4 text-yellow-400 animate-pulse opacity-60" />
        <Star className="absolute bottom-20 left-16 h-3 w-3 text-blue-400 animate-pulse delay-200 opacity-50" />
        <Star className="absolute top-32 left-32 h-2 w-2 text-purple-400 animate-pulse delay-400 opacity-40" />
        <Sparkles className="absolute top-20 left-1/2 h-3 w-3 text-pink-400 animate-spin opacity-50" style={{ animationDuration: '3s' }} />
        <Sparkles className="absolute bottom-32 right-32 h-4 w-4 text-indigo-400 animate-spin delay-1000 opacity-40" style={{ animationDuration: '4s' }} />
      </div>

      {/* Main Content - Enhanced design */}
      <div className="text-center max-w-sm px-6 relative z-10 w-full">
        {/* Logo Section - More sophisticated */}
        <div className="mb-6">
          <div className="relative mb-4">
            {/* Enhanced logo container with glow effect */}
            <div className="relative w-24 h-24 mx-auto bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-2xl border-4 border-white/95 animate-pulse-glow">
              {/* Inner white circle with subtle shadow */}
              <div className="absolute inset-3 bg-white/98 rounded-full flex items-center justify-center shadow-inner">
                <IconComponent className="h-10 w-10 text-blue-600 transition-all duration-300 ease-in-out drop-shadow-sm" />
              </div>
              
              {/* Enhanced sparkle effects */}
              <Sparkles className="absolute -top-2 -right-2 h-5 w-5 text-yellow-400 animate-spin opacity-80" style={{ animationDuration: '2s' }} />
              <Sparkles className="absolute -bottom-1 -left-1 h-3 w-3 text-pink-400 animate-spin delay-500 opacity-60" style={{ animationDuration: '3s' }} />
            </div>
          </div>
          
          <div className="space-y-2">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent tracking-wide">
              Axioms School
            </h1>
            <p className="text-gray-600 text-base font-semibold">Excellence in Education</p>
            <div className="flex items-center justify-center gap-1.5 mt-3">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce shadow-sm"></div>
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce delay-75 shadow-sm"></div>
              <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce delay-150 shadow-sm"></div>
            </div>
          </div>
        </div>

        {/* Loading Section - Enhanced */}
        <div className="space-y-4">
          <div className="relative w-full">
            {/* Enhanced progress bar */}
            <div className="w-full bg-gray-200/80 rounded-full h-3 overflow-hidden shadow-inner backdrop-blur-sm">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full transition-all duration-100 ease-out will-change-transform relative shadow-sm"
                style={{ width: `${Math.min(progress, 100)}%` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"></div>
              </div>
            </div>
            
            {/* Enhanced progress percentage */}
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
              <span className="text-gray-700 text-sm font-bold bg-white/95 px-3 py-1.5 rounded-full backdrop-blur-sm border border-gray-200/80 shadow-lg">
                {Math.round(progress)}%
              </span>
            </div>
          </div>
          
          <div className="text-gray-700 space-y-2">
            <p className="text-lg font-semibold">Loading{dots}</p>
            <p className="text-sm text-gray-500 font-medium">Almost ready...</p>
          </div>
        </div>
      </div>

      {/* Enhanced Footer with attribution */}
      <div className="absolute bottom-6 left-0 right-0 text-center space-y-3">
        <div className="flex items-center justify-center gap-1.5 px-4">
          <Sparkles className="h-4 w-4 text-yellow-500 opacity-70" />
          <p className="text-sm text-gray-600 font-semibold">
            Powered by Axioms
          </p>
          <Sparkles className="h-4 w-4 text-pink-500 opacity-70" />
        </div>
        
        {/* Attribution message */}
        <div className="flex items-center justify-center gap-2 px-4">
          <p className="text-xs text-gray-500 font-medium">
            Crafted with
          </p>
          <Heart className="h-3 w-3 text-red-500 animate-pulse" />
          <p className="text-xs text-gray-500 font-medium">
            by Satyam Rojha!
          </p>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
