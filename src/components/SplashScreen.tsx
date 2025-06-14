
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-white via-gray-50 to-blue-50 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Soft floating shapes */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-100/40 rounded-full blur-3xl animate-pulse will-change-transform"></div>
        <div className="absolute bottom-1/3 right-1/3 w-56 h-56 bg-purple-100/40 rounded-full blur-3xl animate-pulse delay-700 will-change-transform"></div>
        <div className="absolute top-1/2 right-1/4 w-40 h-40 bg-pink-100/40 rounded-full blur-2xl animate-pulse delay-1000 will-change-transform"></div>
        
        {/* Floating particles */}
        <div className="absolute top-20 left-20 w-2 h-2 bg-blue-300 rounded-full animate-bounce delay-500 opacity-60"></div>
        <div className="absolute top-40 right-32 w-1 h-1 bg-purple-400 rounded-full animate-bounce delay-1000 opacity-50"></div>
        <div className="absolute bottom-32 left-40 w-1.5 h-1.5 bg-pink-400 rounded-full animate-bounce delay-700 opacity-40"></div>
        <div className="absolute top-60 left-1/2 w-1 h-1 bg-blue-400 rounded-full animate-bounce delay-300 opacity-50"></div>
        
        {/* Additional decorative stars */}
        <Star className="absolute top-16 right-20 h-4 w-4 text-yellow-400 animate-pulse opacity-60" />
        <Star className="absolute bottom-20 left-16 h-3 w-3 text-blue-400 animate-pulse delay-500 opacity-50" />
        <Star className="absolute top-1/3 left-1/3 h-2 w-2 text-purple-400 animate-pulse delay-1000 opacity-40" />
      </div>

      {/* Main Content */}
      <div className="text-center max-w-sm px-6 relative z-10 w-full">
        {/* Logo Section */}
        <div className="mb-8">
          <div className="relative mb-6">
            {/* Outer glow ring */}
            <div className="absolute inset-0 w-32 h-32 mx-auto bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 rounded-full blur-2xl opacity-60 animate-pulse"></div>
            
            {/* Main logo container */}
            <div className="relative w-32 h-32 mx-auto bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-2xl border-4 border-white/90 backdrop-blur-sm">
              {/* Inner white circle */}
              <div className="absolute inset-3 bg-white/95 rounded-full flex items-center justify-center backdrop-blur-sm shadow-inner">
                <IconComponent className="h-14 w-14 text-blue-600 drop-shadow-lg transition-all duration-700 ease-in-out" />
              </div>
              
              {/* Sparkle effects */}
              <Sparkles className="absolute -top-3 -right-3 h-7 w-7 text-yellow-400 animate-spin drop-shadow-lg" style={{ animationDuration: '3s' }} />
              <Sparkles className="absolute -bottom-3 -left-3 h-5 w-5 text-pink-400 animate-spin drop-shadow-lg" style={{ animationDuration: '4s', animationDirection: 'reverse' }} />
            </div>
          </div>
          
          <div className="space-y-3">
            <h1 className="text-5xl font-bold text-gray-800 mb-2 tracking-wide">
              Axioms School
            </h1>
            <p className="text-gray-600 text-xl font-medium">Excellence in Education</p>
            <div className="flex items-center justify-center gap-2 mt-6">
              <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce shadow-lg"></div>
              <div className="w-3 h-3 bg-purple-400 rounded-full animate-bounce delay-100 shadow-lg"></div>
              <div className="w-3 h-3 bg-pink-400 rounded-full animate-bounce delay-200 shadow-lg"></div>
            </div>
          </div>
        </div>

        {/* Loading Section */}
        <div className="space-y-6">
          <div className="relative w-full">
            {/* Progress bar background */}
            <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden shadow-inner border border-gray-300">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full transition-all duration-300 ease-out shadow-lg will-change-transform relative"
                style={{ width: `${Math.min(progress, 100)}%` }}
              >
                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-pulse"></div>
              </div>
            </div>
            
            {/* Progress percentage */}
            <div className="absolute -top-10 left-1/2 transform -translate-x-1/2">
              <span className="text-gray-700 text-sm font-bold bg-white/90 px-4 py-2 rounded-full backdrop-blur-sm border border-gray-200 shadow-lg">
                {Math.round(progress)}%
              </span>
            </div>
          </div>
          
          <div className="text-gray-700 space-y-2">
            <p className="text-xl font-semibold">Loading your experience{dots}</p>
            <p className="text-base text-gray-500">Preparing everything for you...</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-8 left-0 right-0 text-center">
        <div className="flex items-center justify-center gap-2 px-6">
          <Sparkles className="h-4 w-4 text-yellow-500" />
          <p className="text-sm text-gray-500 font-medium">
            Powered by Axioms Product with Satyam Rojha
          </p>
          <Sparkles className="h-4 w-4 text-pink-500" />
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
