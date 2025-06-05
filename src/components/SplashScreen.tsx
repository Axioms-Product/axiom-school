
import { useEffect, useState } from 'react';
import Logo from '@/components/ui/logo';

const SplashScreen = () => {
  const [dots, setDots] = useState('');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const dotsInterval = setInterval(() => {
      setDots(prev => {
        if (prev.length >= 3) return '';
        return prev + '.';
      });
    }, 500);

    // Simulate loading progress
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) return 100;
        return prev + Math.random() * 15;
      });
    }, 200);

    return () => {
      clearInterval(dotsInterval);
      clearInterval(progressInterval);
    };
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center animated-gradient relative overflow-hidden">
      {/* Floating geometric shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className={`absolute rounded-full bg-white/10 ${
              i % 3 === 0 ? 'float' : i % 3 === 1 ? 'float-delayed' : 'float-slow'
            }`}
            style={{
              width: `${Math.random() * 100 + 20}px`,
              height: `${Math.random() * 100 + 20}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${4 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      {/* Geometric pattern background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            radial-gradient(circle at 25% 25%, rgba(255,255,255,0.2) 2px, transparent 2px),
            radial-gradient(circle at 75% 75%, rgba(255,255,255,0.2) 2px, transparent 2px),
            linear-gradient(45deg, transparent 40%, rgba(255,255,255,0.1) 50%, transparent 60%)
          `,
          backgroundSize: '50px 50px, 50px 50px, 100px 100px'
        }}></div>
      </div>

      <div className="z-10 text-center animate-scale-in">
        {/* Enhanced Logo with 3D effect */}
        <div className="relative mb-8">
          <div className="card-3d bg-white/20 rounded-3xl p-8 border border-white/30">
            <Logo size="xl" className="justify-center" />
          </div>
          
          {/* Orbiting elements */}
          <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-full animate-pulse opacity-80"></div>
          <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-pink-400 rounded-full animate-bounce opacity-80"></div>
          <div className="absolute top-1/2 -right-8 w-4 h-4 bg-cyan-400 rounded-full float opacity-80"></div>
        </div>
        
        {/* School Name with enhanced styling */}
        <div className="mb-12">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white mb-4 neon-text">
            Axioms School
          </h1>
          <div className="glass-effect rounded-2xl px-6 py-3 inline-block border border-white/30">
            <p className="text-white/90 text-lg sm:text-xl font-medium">
              🎓 Excellence in Digital Education
            </p>
          </div>
        </div>
        
        {/* Enhanced Loading Section */}
        <div className="space-y-6">
          <div className="glass-effect rounded-2xl p-6 border border-white/30 max-w-md mx-auto">
            <p className="text-white text-xl font-light mb-4">
              Initializing Learning Environment{dots}
            </p>
            
            {/* Progress bar */}
            <div className="w-full bg-white/20 rounded-full h-3 mb-4 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${Math.min(progress, 100)}%` }}
              ></div>
            </div>
            
            {/* Loading dots */}
            <div className="flex justify-center space-x-2">
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
          
          {/* Educational icons floating */}
          <div className="flex justify-center space-x-8 mt-8">
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
