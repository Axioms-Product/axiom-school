
import { GraduationCap, BookOpen, Star } from 'lucide-react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  className?: string;
}

const Logo = ({ size = 'md', showText = true, className = '' }: LogoProps) => {
  const sizeClasses = {
    sm: { icon: 'h-6 w-6', text: 'text-lg', container: 'h-10 w-10' },
    md: { icon: 'h-8 w-8', text: 'text-xl', container: 'h-14 w-14' },
    lg: { icon: 'h-10 w-10', text: 'text-3xl', container: 'h-18 w-18' },
    xl: { icon: 'h-12 w-12', text: 'text-4xl', container: 'h-24 w-24' }
  };

  const { icon, text, container } = sizeClasses[size];

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <div className="relative">
        {/* Main logo container with 3D effect */}
        <div className={`${container} rounded-2xl bg-gradient-to-tr from-blue-500 via-purple-500 to-cyan-500 flex items-center justify-center shadow-2xl card-3d relative overflow-hidden`}>
          {/* Animated background pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
          <div className="absolute inset-0 animated-gradient opacity-30"></div>
          
          {/* Main icon */}
          <GraduationCap className={`${icon} text-white relative z-10`} />
          
          {/* Floating decorative elements */}
          <BookOpen className="absolute top-1 right-1 h-3 w-3 text-white/60 animate-pulse" />
          <Star className="absolute bottom-1 left-1 h-2 w-2 text-yellow-300 animate-bounce" />
        </div>
        
        {/* Glow effect */}
        <div className={`absolute inset-0 rounded-2xl bg-gradient-to-tr from-blue-500 via-purple-500 to-cyan-500 blur-xl opacity-30 animate-pulse`}></div>
        
        {/* Orbiting dots */}
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-ping"></div>
        <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-pink-400 rounded-full animate-bounce"></div>
      </div>
      
      {showText && (
        <div className="relative">
          <h1 className={`${text} font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 neon-text`}>
            Axioms School
          </h1>
          {size === 'xl' && (
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 font-medium">
              🌟 Learning Excellence Platform
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Logo;
