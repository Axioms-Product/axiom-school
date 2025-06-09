
import { useEffect, useState } from 'react';
import { Progress } from '@/components/ui/progress';
import Logo from '@/components/ui/logo';

interface SplashScreenProps {
  progress: number;
}

const SplashScreen = ({ progress }: SplashScreenProps) => {
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowText(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-900 flex items-center justify-center">
      <div className="text-center space-y-8 px-4">
        {/* Logo */}
        <div className="flex justify-center transform hover:scale-105 transition-transform duration-300">
          <Logo size="xl" showText={true} />
        </div>
        
        {/* Loading Text */}
        <div className={`space-y-2 transition-opacity duration-1000 ${showText ? 'opacity-100' : 'opacity-0'}`}>
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
            Welcome to Axioms School
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Preparing your learning environment...
          </p>
        </div>
        
        {/* Progress Bar */}
        <div className="w-80 max-w-sm mx-auto space-y-2">
          <Progress value={progress} className="h-2" />
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {Math.round(progress)}% loaded
          </div>
        </div>
        
        {/* Loading dots animation */}
        <div className="flex justify-center space-x-1">
          <div className="w-2 h-2 bg-indigo-600 rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-indigo-600 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-2 h-2 bg-indigo-600 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
