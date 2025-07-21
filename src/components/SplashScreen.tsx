
import { useEffect, useState } from 'react';
import { GraduationCap, Sparkles, Star, BookOpen, Users, Trophy } from 'lucide-react';

interface SplashScreenProps {
  progress: number;
}

const SplashScreen = ({ progress }: SplashScreenProps) => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Floating Orbs */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-blue-400/30 to-purple-600/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-gradient-to-r from-purple-400/30 to-pink-600/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-1/2 w-32 h-32 bg-gradient-to-r from-indigo-400/30 to-blue-600/30 rounded-full blur-3xl animate-pulse delay-500"></div>
        
        {/* Floating Stars */}
        <Star className="absolute top-20 right-24 h-6 w-6 text-yellow-300 animate-bounce opacity-80" />
        <Star className="absolute bottom-32 left-20 h-4 w-4 text-blue-300 animate-bounce delay-300 opacity-70" />
        <Star className="absolute top-32 left-1/3 h-5 w-5 text-pink-300 animate-bounce delay-700 opacity-60" />
        <Sparkles className="absolute top-40 right-1/3 h-5 w-5 text-purple-300 animate-spin opacity-80" />
        <Sparkles className="absolute bottom-40 right-16 h-4 w-4 text-indigo-300 animate-spin delay-1000 opacity-70" />
        
        {/* Floating Icons */}
        <BookOpen className="absolute top-24 left-1/2 h-8 w-8 text-blue-400/60 animate-float opacity-50" />
        <Users className="absolute bottom-24 right-1/2 h-7 w-7 text-green-400/60 animate-float delay-500 opacity-50" />
        <Trophy className="absolute top-1/3 right-20 h-6 w-6 text-yellow-400/60 animate-float delay-1000 opacity-50" />
      </div>

      {/* Main Content */}
      <div className={`text-center max-w-lg px-8 relative z-10 transition-all duration-1000 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        {/* Logo Section */}
        <div className="mb-8">
          <div className="relative w-32 h-32 mx-auto mb-6">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 rounded-full shadow-2xl animate-pulse">
              <div className="absolute inset-4 bg-white/95 rounded-full flex items-center justify-center backdrop-blur-sm">
                <GraduationCap className="h-12 w-12 text-gray-700 animate-bounce" />
              </div>
              <Sparkles className="absolute -top-3 -right-3 h-6 w-6 text-yellow-300 animate-spin" />
              <Star className="absolute -bottom-2 -left-2 h-5 w-5 text-pink-300 animate-pulse" />
            </div>
          </div>
          
          <div className="space-y-3">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 bg-clip-text text-transparent animate-pulse">
              Axioms School
            </h1>
            <p className="text-gray-300 text-xl font-medium">Excellence in Education</p>
            <div className="flex items-center justify-center gap-2 text-blue-200">
              <Sparkles className="h-4 w-4 animate-spin" />
              <span className="text-sm">Empowering Future Leaders</span>
              <Sparkles className="h-4 w-4 animate-spin" />
            </div>
          </div>
        </div>

        {/* Progress Section */}
        <div className="space-y-6">
          <div className="relative w-full">
            <div className="w-full bg-gray-800/60 rounded-full h-4 overflow-hidden backdrop-blur-sm border border-gray-700/50">
              <div 
                className="h-full bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 rounded-full transition-all duration-500 ease-out relative"
                style={{ width: `${Math.min(progress, 100)}%` }}
              >
                <div className="absolute inset-0 bg-white/20 rounded-full animate-pulse"></div>
              </div>
            </div>
            
            <div className="absolute -top-10 left-1/2 transform -translate-x-1/2">
              <span className="text-white text-lg font-bold bg-gray-800/90 px-4 py-2 rounded-full border border-gray-600/50 backdrop-blur-sm">
                {Math.round(progress)}%
              </span>
            </div>
          </div>
          
          <div className="text-white space-y-3">
            <p className="text-2xl font-semibold animate-pulse">Loading...</p>
            <p className="text-lg text-gray-300">Preparing your learning experience</p>
          </div>
        </div>

        {/* Feature Icons */}
        <div className="flex justify-center items-center gap-6 mt-8">
          <div className="bg-blue-500/20 p-3 rounded-xl backdrop-blur-sm border border-blue-400/30 animate-bounce">
            <BookOpen className="h-6 w-6 text-blue-300" />
          </div>
          <div className="bg-green-500/20 p-3 rounded-xl backdrop-blur-sm border border-green-400/30 animate-bounce delay-200">
            <Users className="h-6 w-6 text-green-300" />
          </div>
          <div className="bg-yellow-500/20 p-3 rounded-xl backdrop-blur-sm border border-yellow-400/30 animate-bounce delay-400">
            <Trophy className="h-6 w-6 text-yellow-300" />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-8 left-0 right-0 text-center space-y-3">
        <p className="text-lg text-gray-300">
          Powered by <span className="text-purple-300 font-bold">Axioms</span>
        </p>
        <p className="text-sm text-gray-400">
          Crafted with ❤️ by <span className="text-purple-300 font-semibold">Satyam Rojha!</span>
        </p>
      </div>
    </div>
  );
};

export default SplashScreen;
