
import { useEffect, useState } from 'react';
import { GraduationCap, BookOpen, Users, Award } from 'lucide-react';

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
    }, 500);

    const iconInterval = setInterval(() => {
      setCurrentIcon(prev => (prev + 1) % icons.length);
    }, 800);

    return () => {
      clearInterval(dotsInterval);
      clearInterval(iconInterval);
    };
  }, []);

  const IconComponent = icons[currentIcon];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 overflow-hidden">
      {/* Optimized Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white/5 rounded-full blur-xl animate-pulse will-change-transform"></div>
        <div className="absolute bottom-1/3 right-1/3 w-24 h-24 bg-white/10 rounded-full blur-2xl animate-pulse delay-500 will-change-transform"></div>
        <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-white/5 rounded-full blur-lg animate-pulse delay-1000 will-change-transform"></div>
      </div>

      {/* Main Content - Mobile Optimized */}
      <div className="text-center max-w-xs px-4 relative z-10 w-full">
        {/* Logo Animation - Simplified */}
        <div className="mb-6 sm:mb-8">
          <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto bg-white/20 backdrop-blur-sm rounded-2xl sm:rounded-3xl flex items-center justify-center shadow-xl mb-4 sm:mb-6 border border-white/20 transition-transform duration-500 will-change-transform">
            <IconComponent className="h-10 w-10 sm:h-12 sm:w-12 text-white transition-all duration-500 ease-in-out" />
          </div>
          
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2 tracking-wide">Axioms School</h1>
          <p className="text-white/80 text-sm font-medium">Excellence in Education</p>
        </div>

        {/* Loading Animation - Optimized */}
        <div className="space-y-4 sm:space-y-6">
          <div className="relative w-full">
            <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden backdrop-blur-sm">
              <div 
                className="h-full bg-gradient-to-r from-yellow-400 via-pink-400 to-white rounded-full transition-all duration-300 ease-out shadow-sm will-change-transform"
                style={{ width: `${Math.min(progress, 100)}%` }}
              ></div>
            </div>
          </div>
          
          <div className="text-white/90">
            <p className="text-sm font-medium">Initializing{dots}</p>
            <p className="text-xs text-white/70 mt-1">{progress}% Complete</p>
          </div>
        </div>
      </div>

      {/* Footer - Simplified */}
      <div className="absolute bottom-6 sm:bottom-8 left-0 right-0 text-center">
        <p className="text-xs text-white/60 font-medium px-4">Powered By Axioms Product with Satyam Rojha!</p>
      </div>
    </div>
  );
};

export default SplashScreen;
