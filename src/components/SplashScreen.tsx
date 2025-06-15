
import { useEffect, useState } from 'react';
import { GraduationCap, Sparkles, Star } from 'lucide-react';

interface SplashScreenProps {
  progress: number;
}

const SplashScreen = ({ progress }: SplashScreenProps) => {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const dotsInterval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.');
    }, 300);

    return () => clearInterval(dotsInterval);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
      {/* Simplified background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/3 w-32 h-32 bg-gradient-to-br from-purple-400/20 to-pink-600/20 rounded-full blur-3xl animate-pulse delay-300"></div>
        
        <Star className="absolute top-20 right-24 h-4 w-4 text-yellow-300 animate-pulse opacity-80" />
        <Star className="absolute bottom-24 left-20 h-3 w-3 text-blue-300 animate-pulse delay-200 opacity-60" />
        <Sparkles className="absolute top-24 left-1/2 h-4 w-4 text-pink-300 animate-spin opacity-70" />
      </div>

      {/* Simplified main content */}
      <div className="text-center max-w-md px-8 relative z-10 w-full">
        <div className="mb-6">
          <div className="relative w-24 h-24 mx-auto mb-4">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 rounded-full shadow-xl">
              <div className="absolute inset-3 bg-white/95 rounded-full flex items-center justify-center">
                <GraduationCap className="h-8 w-8 text-gray-700" />
              </div>
              <Sparkles className="absolute -top-2 -right-2 h-4 w-4 text-yellow-300 animate-spin" />
            </div>
          </div>
          
          <div className="space-y-2">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">
              Axioms School
            </h1>
            <p className="text-gray-300 text-base">Excellence in Education</p>
          </div>
        </div>

        {/* Simplified loading section */}
        <div className="space-y-4">
          <div className="relative w-full">
            <div className="w-full bg-gray-800/60 rounded-full h-3 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${Math.min(progress, 100)}%` }}
              ></div>
            </div>
            
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
              <span className="text-white/90 text-sm font-bold bg-gray-800/80 px-3 py-1 rounded-full">
                {Math.round(progress)}%
              </span>
            </div>
          </div>
          
          <div className="text-white/90 space-y-2">
            <p className="text-lg font-semibold">Loading{dots}</p>
            <p className="text-sm text-gray-300">Preparing your experience...</p>
          </div>
        </div>
      </div>

      {/* Simplified footer */}
      <div className="absolute bottom-6 left-0 right-0 text-center space-y-2">
        <p className="text-sm text-gray-300">
          Powered by <span className="text-purple-300 font-semibold">Axioms</span>
        </p>
        <p className="text-xs text-gray-400">
          Crafted with ❤️ by <span className="text-purple-300">Satyam Rojha!</span>
        </p>
      </div>
    </div>
  );
};

export default SplashScreen;
