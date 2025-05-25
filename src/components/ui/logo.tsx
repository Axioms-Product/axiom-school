
import { GraduationCap } from 'lucide-react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  className?: string;
}

const Logo = ({ size = 'md', showText = true, className = '' }: LogoProps) => {
  const sizeClasses = {
    sm: { icon: 'h-8 w-8', text: 'text-xl', container: 'h-8 w-8' },
    md: { icon: 'h-12 w-12', text: 'text-2xl', container: 'h-12 w-12' },
    lg: { icon: 'h-16 w-16', text: 'text-4xl', container: 'h-16 w-16' },
    xl: { icon: 'h-20 w-20', text: 'text-5xl', container: 'h-20 w-20' }
  };

  const { icon, text, container } = sizeClasses[size];

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="relative">
        <div className={`${container} rounded-full bg-gradient-to-tr from-blue-500 via-purple-500 to-cyan-500 animate-pulse-glow flex items-center justify-center shadow-2xl`}>
          <GraduationCap className={`${icon} text-white`} />
        </div>
        <div className={`absolute inset-0 rounded-full bg-gradient-to-tr from-blue-500 via-purple-500 to-cyan-500 blur-md opacity-50 animate-pulse`}></div>
      </div>
      {showText && (
        <div>
          <h1 className={`${text} font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400`}>
            Axioms School
          </h1>
        </div>
      )}
    </div>
  );
};

export default Logo;
