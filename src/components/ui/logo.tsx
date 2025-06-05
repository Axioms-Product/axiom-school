
import { BookOpen, Atom, Lightbulb } from 'lucide-react';

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
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="relative">
        {/* Main logo container */}
        <div className={`${container} rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center shadow-lg relative overflow-hidden`}>
          {/* Background pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
          
          {/* Main icon - Atom symbol */}
          <Atom className={`${icon} text-white relative z-10`} />
          
          {/* Floating elements */}
          <Lightbulb className="absolute top-1 right-1 h-3 w-3 text-yellow-300 animate-pulse" />
          <BookOpen className="absolute bottom-1 left-1 h-3 w-3 text-blue-200 animate-bounce" style={{ animationDelay: '0.5s' }} />
        </div>
        
        {/* Glow effect */}
        <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 blur-lg opacity-20 animate-pulse`}></div>
      </div>
      
      {showText && (
        <div className="relative">
          <h1 className={`${text} font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent`}>
            Axioms School
          </h1>
          {size === 'xl' && (
            <p className="text-sm text-gray-600 mt-1 font-medium">
              🚀 Smart Learning Platform
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Logo;
