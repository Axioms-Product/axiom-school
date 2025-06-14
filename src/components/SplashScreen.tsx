
import { useEffect, useState } from 'react';
import { GraduationCap, BookOpen, Users, Award, Sparkles, Star, Heart, Zap, Rocket } from 'lucide-react';

interface SplashScreenProps {
  progress: number;
}

const SplashScreen = ({ progress }: SplashScreenProps) => {
  const [dots, setDots] = useState('');
  const [currentIcon, setCurrentIcon] = useState(0);
  const [glowIntensity, setGlowIntensity] = useState(0);

  const icons = [GraduationCap, BookOpen, Users, Award, Rocket, Zap];

  useEffect(() => {
    const dotsInterval = setInterval(() => {
      setDots(prev => {
        if (prev.length >= 3) return '';
        return prev + '.';
      });
    }, 200);

    const iconInterval = setInterval(() => {
      setCurrentIcon(prev => (prev + 1) % icons.length);
    }, 500);

    const glowInterval = setInterval(() => {
      setGlowIntensity(prev => (prev + 1) % 100);
    }, 50);

    return () => {
      clearInterval(dotsInterval);
      clearInterval(iconInterval);
      clearInterval(glowInterval);
    };
  }, []);

  const IconComponent = icons[currentIcon];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
      {/* Enhanced animated background */}
      <div className="absolute inset-0">
        {/* Large animated orbs */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse" 
             style={{ transform: `scale(${1 + Math.sin(glowIntensity * 0.1) * 0.1})` }}></div>
        <div className="absolute bottom-1/3 right-1/3 w-48 h-48 bg-gradient-to-br from-purple-400/20 to-pink-600/20 rounded-full blur-3xl animate-pulse delay-300"
             style={{ transform: `scale(${1 + Math.cos(glowIntensity * 0.08) * 0.15})` }}></div>
        <div className="absolute top-1/2 right-1/4 w-32 h-32 bg-gradient-to-br from-pink-400/15 to-orange-500/15 rounded-full blur-2xl animate-pulse delay-500"
             style={{ transform: `scale(${1 + Math.sin(glowIntensity * 0.12) * 0.2})` }}></div>
        
        {/* Enhanced floating particles */}
        {[...Array(12)].map((_, i) => (
          <div key={i} 
               className={`absolute w-1 h-1 bg-white/30 rounded-full animate-pulse`}
               style={{
                 top: `${20 + Math.sin(i * 2) * 30}%`,
                 left: `${15 + Math.cos(i * 3) * 70}%`,
                 animationDelay: `${i * 0.5}s`,
                 animationDuration: `${2 + i * 0.3}s`
               }}></div>
        ))}
        
        {/* Dynamic stars */}
        <Star className="absolute top-20 right-24 h-5 w-5 text-yellow-300 animate-pulse opacity-80" 
             style={{ transform: `rotate(${glowIntensity * 3}deg)` }} />
        <Star className="absolute bottom-24 left-20 h-4 w-4 text-blue-300 animate-pulse delay-200 opacity-60" 
             style={{ transform: `rotate(${-glowIntensity * 2}deg)` }} />
        <Star className="absolute top-40 left-40 h-3 w-3 text-purple-300 animate-pulse delay-400 opacity-50" />
        <Sparkles className="absolute top-24 left-1/2 h-4 w-4 text-pink-300 animate-spin opacity-70" 
                  style={{ animationDuration: '4s' }} />
        <Sparkles className="absolute bottom-40 right-40 h-5 w-5 text-indigo-300 animate-spin delay-1000 opacity-60" 
                  style={{ animationDuration: '5s' }} />
      </div>

      {/* Main Content */}
      <div className="text-center max-w-md px-8 relative z-10 w-full">
        {/* Enhanced Logo Section */}
        <div className="mb-8">
          <div className="relative mb-6">
            {/* Enhanced logo with dynamic glow */}
            <div className="relative w-32 h-32 mx-auto">
              <div className={`absolute inset-0 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 rounded-full shadow-2xl transition-all duration-300`}
                   style={{ 
                     boxShadow: `0 0 ${20 + glowIntensity * 0.5}px rgba(139, 92, 246, 0.6), 0 0 ${40 + glowIntensity}px rgba(59, 130, 246, 0.4)` 
                   }}>
                {/* Inner circle with icon */}
                <div className="absolute inset-4 bg-white/95 rounded-full flex items-center justify-center shadow-inner backdrop-blur-sm">
                  <IconComponent className="h-12 w-12 text-gray-700 transition-all duration-500 ease-in-out drop-shadow-md" 
                                style={{ transform: `scale(${1 + Math.sin(glowIntensity * 0.1) * 0.1})` }} />
                </div>
                
                {/* Enhanced sparkle effects */}
                <Sparkles className="absolute -top-3 -right-3 h-6 w-6 text-yellow-300 animate-spin opacity-90" 
                          style={{ animationDuration: '3s' }} />
                <Sparkles className="absolute -bottom-2 -left-2 h-4 w-4 text-pink-300 animate-spin delay-700 opacity-70" 
                          style={{ animationDuration: '4s' }} />
                <Star className="absolute -top-1 -left-3 h-3 w-3 text-blue-300 animate-pulse delay-300" />
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 bg-clip-text text-transparent tracking-wide drop-shadow-lg">
              Axioms School
            </h1>
            <p className="text-gray-300 text-lg font-semibold">Excellence in Education</p>
            
            {/* Enhanced loading dots */}
            <div className="flex items-center justify-center gap-2 mt-4">
              {[0, 1, 2].map((i) => (
                <div key={i} 
                     className={`w-3 h-3 rounded-full shadow-lg transition-all duration-300`}
                     style={{
                       backgroundColor: i === 0 ? '#60a5fa' : i === 1 ? '#a855f7' : '#ec4899',
                       transform: `scale(${1 + Math.sin((glowIntensity + i * 30) * 0.1) * 0.3})`,
                       animationDelay: `${i * 100}ms`
                     }}></div>
              ))}
            </div>
          </div>
        </div>

        {/* Enhanced Loading Section */}
        <div className="space-y-6">
          <div className="relative w-full">
            {/* Progress bar with glow effect */}
            <div className="w-full bg-gray-800/60 backdrop-blur-sm rounded-full h-4 overflow-hidden shadow-inner border border-gray-700/50">
              <div 
                className="h-full bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 rounded-full transition-all duration-300 ease-out relative shadow-lg"
                style={{ 
                  width: `${Math.min(progress, 100)}%`,
                  boxShadow: `0 0 15px rgba(139, 92, 246, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.2)`
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/10"></div>
              </div>
            </div>
            
            {/* Enhanced progress percentage */}
            <div className="absolute -top-10 left-1/2 transform -translate-x-1/2">
              <span className="text-white/90 text-sm font-bold bg-gray-800/80 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-600/50 shadow-xl">
                {Math.round(progress)}%
              </span>
            </div>
          </div>
          
          <div className="text-white/90 space-y-3">
            <p className="text-xl font-semibold">Loading{dots}</p>
            <p className="text-sm text-gray-300 font-medium">Preparing your experience...</p>
          </div>
        </div>
      </div>

      {/* Enhanced Footer */}
      <div className="absolute bottom-8 left-0 right-0 text-center space-y-4">
        <div className="flex items-center justify-center gap-2 px-4">
          <Sparkles className="h-5 w-5 text-yellow-400 opacity-80 animate-pulse" />
          <p className="text-base text-gray-300 font-semibold">
            Powered by Axioms
          </p>
          <Sparkles className="h-5 w-5 text-pink-400 opacity-80 animate-pulse delay-300" />
        </div>
        
        {/* Enhanced attribution */}
        <div className="flex items-center justify-center gap-2 px-4">
          <p className="text-sm text-gray-400 font-medium">
            Crafted with
          </p>
          <Heart className="h-4 w-4 text-red-400 animate-pulse" />
          <p className="text-sm text-gray-400 font-medium">
            by <span className="text-purple-300 font-semibold">Satyam Rojha!</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
