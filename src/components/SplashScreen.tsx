
import { useEffect, useState } from 'react';
import { GraduationCap } from 'lucide-react';

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      {/* Main Content */}
      <div className="text-center max-w-xs mx-auto px-6">
        {/* Logo */}
        <div className="mb-12">
          <div className="w-24 h-24 mx-auto bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg mb-6">
            <GraduationCap className="h-12 w-12 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Axioms School</h1>
          <p className="text-gray-600">Learning made simple</p>
        </div>

        {/* Loading Animation */}
        <div className="space-y-6">
          <div className="relative">
            <div className="w-full bg-gray-200 rounded-full h-1 overflow-hidden">
              <div 
                className="h-full bg-blue-600 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${Math.min(progress, 100)}%` }}
              ></div>
            </div>
          </div>
          
          <div className="text-gray-600">
            <p className="text-sm">Loading{dots}</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <p className="text-xs text-gray-400">© 2024 Axioms School</p>
      </div>
    </div>
  );
};

export default SplashScreen;
