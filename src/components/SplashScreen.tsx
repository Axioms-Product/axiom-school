
import { useEffect, useState } from 'react';
import { GraduationCap, BookOpen, Users, Award, Sparkles, Star, School } from 'lucide-react';

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white overflow-hidden">
      {/* Enhanced Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Soft floating shapes with improved colors */}
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-blue-50 rounded-full blur-3xl animate-pulse will-change-transform"></div>
        <div className="absolute bottom-1/3 right-1/3 w-64 h-64 bg-indigo-50 rounded-full blur-3xl animate-pulse delay-700 will-change-transform"></div>
        <div className="absolute top-1/2 right-1/4 w-48 h-48 bg-purple-50 rounded-full blur-2xl animate-pulse delay-1000 will-change-transform"></div>
        
        {/* Floating particles with better positioning */}
        <div className="absolute top-20 left-20 w-3 h-3 bg-blue-400 rounded-full animate-bounce delay-500 opacity-70"></div>
        <div className="absolute top-40 right-32 w-2 h-2 bg-indigo-400 rounded-full animate-bounce delay-1000 opacity-60"></div>
        <div className="absolute bottom-32 left-40 w-2.5 h-2.5 bg-purple-400 rounded-full animate-bounce delay-700 opacity-50"></div>
        <div className="absolute top-60 left-1/2 w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-300 opacity-60"></div>
        
        {/* Enhanced decorative stars */}
        <Star className="absolute top-16 right-20 h-5 w-5 text-yellow-500 animate-pulse opacity-70" />
        <Star className="absolute bottom-20 left-16 h-4 w-4 text-blue-500 animate-pulse delay-500 opacity-60" />
        <Star className="absolute top-1/3 left-1/3 h-3 w-3 text-indigo-500 animate-pulse delay-1000 opacity-50" />
        <School className="absolute top-32 left-1/2 h-6 w-6 text-purple-400 animate-pulse delay-1500 opacity-40" />
      </div>

      {/* Main Content */}
      <div className="text-center max-w-sm px-6 relative z-10 w-full">
        {/* Enhanced Logo Section */}
        <div className="mb-10">
          <div className="relative mb-8">
            {/* Outer glow ring with improved effect */}
            <div className="absolute inset-0 w-36 h-36 mx-auto bg-gradient-to-r from-blue-100 via-indigo-100 to-purple-100 rounded-full blur-3xl opacity-80 animate-pulse"></div>
            
            {/* Main logo container with better gradient */}
            <div className="relative w-36 h-36 mx-auto bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-full flex items-center justify-center shadow-2xl border-4 border-white backdrop-blur-sm">
              {/* Inner white circle with subtle shadow */}
              <div className="absolute inset-4 bg-white rounded-full flex items-center justify-center backdrop-blur-sm shadow-inner">
                <IconComponent className="h-16 w-16 text-blue-600 drop-shadow-lg transition-all duration-700 ease-in-out" />
              </div>
              
              {/* Enhanced sparkle effects */}
              <Sparkles className="absolute -top-4 -right-4 h-8 w-8 text-yellow-400 animate-spin drop-shadow-lg" style={{ animationDuration: '3s' }} />
              <Sparkles className="absolute -bottom-4 -left-4 h-6 w-6 text-purple-400 animate-spin drop-shadow-lg" style={{ animationDuration: '4s', animationDirection: 'reverse' }} />
              <Sparkles className="absolute -top-2 -left-6 h-5 w-5 text-pink-400 animate-spin drop-shadow-lg" style={{ animationDuration: '2.5s' }} />
            </div>
          </div>
          
          <div className="space-y-4">
            <h1 className="text-6xl font-bold text-gray-900 mb-3 tracking-wide">
              Axioms School
            </h1>
            <p className="text-gray-700 text-2xl font-semibold">Excellence in Education</p>
            <div className="flex items-center justify-center gap-3 mt-8">
              <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce shadow-lg"></div>
              <div className="w-4 h-4 bg-indigo-500 rounded-full animate-bounce delay-100 shadow-lg"></div>
              <div className="w-4 h-4 bg-purple-500 rounded-full animate-bounce delay-200 shadow-lg"></div>
            </div>
          </div>
        </div>

        {/* Enhanced Loading Section */}
        <div className="space-y-8">
          <div className="relative w-full">
            {/* Progress bar background with better styling */}
            <div className="w-full bg-gray-100 rounded-full h-5 overflow-hidden shadow-inner border-2 border-gray-200">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-full transition-all duration-500 ease-out shadow-lg will-change-transform relative"
                style={{ width: `${Math.min(progress, 100)}%` }}
              >
                {/* Enhanced shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-pulse"></div>
              </div>
            </div>
            
            {/* Progress percentage with better styling */}
            <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
              <span className="text-gray-800 text-lg font-bold bg-white px-5 py-2 rounded-full backdrop-blur-sm border-2 border-gray-200 shadow-xl">
                {Math.round(progress)}%
              </span>
            </div>
          </div>
          
          <div className="text-gray-800 space-y-3">
            <p className="text-2xl font-bold">Loading your experience{dots}</p>
            <p className="text-lg text-gray-600">Preparing everything for you...</p>
          </div>
        </div>
      </div>

      {/* Enhanced Footer */}
      <div className="absolute bottom-10 left-0 right-0 text-center">
        <div className="flex items-center justify-center gap-3 px-6">
          <Sparkles className="h-5 w-5 text-yellow-500" />
          <p className="text-base text-gray-600 font-semibold">
            Powered by Axioms Product with Satyam Rojha
          </p>
          <Sparkles className="h-5 w-5 text-purple-500" />
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
