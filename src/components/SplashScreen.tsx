
import { useEffect, useState } from 'react';
import Logo from '@/components/ui/logo';

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-blue-600 via-purple-600 to-cyan-600 overflow-hidden">
      {/* Floating geometric shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className={`absolute rounded-full bg-white/10 ${
              i % 3 === 0 ? 'animate-bounce' : i % 3 === 1 ? 'animate-pulse' : 'animate-ping'
            }`}
            style={{
              width: `${Math.random() * 100 + 20}px`,
              height: `${Math.random() * 100 + 20}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${2 + Math.random() * 3}s`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="z-10 text-center animate-scale-in max-w-md mx-auto px-6">
        {/* Enhanced Logo */}
        <div className="relative mb-8">
          <div className="bg-white/20 backdrop-blur-sm rounded-3xl p-8 border border-white/30 shadow-2xl">
            <Logo size="xl" className="justify-center" />
          </div>
        </div>
        
        {/* School Name */}
        <div className="mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-3 drop-shadow-lg">
            Axioms School
          </h1>
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-6 py-3 inline-block border border-white/30">
            <p className="text-white/90 text-lg font-medium">
              🎓 Excellence in Digital Education
            </p>
          </div>
        </div>
        
        {/* Loading Section */}
        <div className="space-y-6">
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 border border-white/30">
            <p className="text-white text-xl font-light mb-4">
              Initializing Learning Environment{dots}
            </p>
            
            {/* Progress bar */}
            <div className="w-full bg-white/20 rounded-full h-3 mb-4 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full transition-all duration-300 ease-out shadow-lg"
                style={{ width: `${Math.min(progress, 100)}%` }}
              ></div>
            </div>
            
            <p className="text-white/80 text-sm">
              {progress < 30 ? 'Loading resources...' : 
               progress < 60 ? 'Setting up interface...' : 
               progress < 90 ? 'Finalizing setup...' : 
               'Ready to learn!'}
            </p>
            
            {/* Loading dots */}
            <div className="flex justify-center space-x-2 mt-4">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-3 h-3 bg-white rounded-full animate-bounce"
                  style={{
                    animationDelay: `${i * 0.2}s`,
                    animationDuration: '1.4s'
                  }}
                />
              ))}
            </div>
          </div>
          
          {/* Educational icons */}
          <div className="flex justify-center space-x-6 mt-8">
            <div className="text-3xl animate-bounce" style={{ animationDelay: '0s' }}>📚</div>
            <div className="text-3xl animate-bounce" style={{ animationDelay: '0.2s' }}>🔬</div>
            <div className="text-3xl animate-bounce" style={{ animationDelay: '0.4s' }}>🎨</div>
            <div className="text-3xl animate-bounce" style={{ animationDelay: '0.6s' }}>💻</div>
            <div className="text-3xl animate-bounce" style={{ animationDelay: '0.8s' }}>🌟</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
