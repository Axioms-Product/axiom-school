
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-1/4 right-10 w-32 h-32 bg-white/5 rounded-full blur-2xl animate-pulse delay-300"></div>
        <div className="absolute bottom-1/4 left-1/4 w-24 h-24 bg-white/10 rounded-full blur-xl animate-pulse delay-700"></div>
      </div>

      {/* Main Content */}
      <div className="text-center max-w-xs mx-auto px-6 relative z-10">
        {/* Logo with Animation */}
        <div className="mb-8">
          <div className="relative">
            <div className="w-24 h-24 mx-auto bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center shadow-2xl mb-6 border border-white/30">
              <IconComponent className="h-12 w-12 text-white transition-all duration-500 ease-in-out" />
            </div>
            {/* Floating particles */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2">
              <div className="w-2 h-2 bg-white/40 rounded-full animate-bounce delay-100"></div>
            </div>
            <div className="absolute top-4 right-4">
              <div className="w-1 h-1 bg-white/60 rounded-full animate-bounce delay-300"></div>
            </div>
            <div className="absolute bottom-4 left-4">
              <div className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce delay-500"></div>
            </div>
          </div>
          
          <h1 className="text-3xl font-bold text-white mb-2 tracking-wide">Axioms School</h1>
          <p className="text-white/80 text-sm font-medium">Excellence in Education</p>
        </div>

        {/* Loading Animation */}
        <div className="space-y-6">
          <div className="relative">
            <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden backdrop-blur-sm">
              <div 
                className="h-full bg-gradient-to-r from-yellow-400 via-pink-400 to-white rounded-full transition-all duration-300 ease-out shadow-lg"
                style={{ width: `${Math.min(progress, 100)}%` }}
              ></div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full animate-pulse"></div>
          </div>
          
          <div className="text-white/90">
            <p className="text-sm font-medium">Initializing{dots}</p>
            <p className="text-xs text-white/70 mt-1">{progress}% Complete</p>
          </div>
        </div>
      </div>

      {/* Enhanced Footer - Centered */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center">
        <div className="text-center">
          <p className="text-xs text-white/60 font-medium">Powered By Axioms Product with Satyam Rojha!</p>
          <div className="flex items-center justify-center gap-1 mt-1">
            <div className="w-1 h-1 bg-white/40 rounded-full"></div>
            <div className="w-1 h-1 bg-white/60 rounded-full animate-pulse"></div>
            <div className="w-1 h-1 bg-white/40 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
