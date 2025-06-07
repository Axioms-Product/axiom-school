
import { useEffect, useState } from 'react';

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 overflow-hidden">
      {/* Enhanced 3D Background */}
      <div className="absolute inset-0">
        {/* 3D Grid Background */}
        <div className="absolute inset-0 opacity-30">
          <div className="grid-3d"></div>
        </div>
        
        {/* Floating 3D Geometric Shapes */}
        <div className="absolute top-20 left-20 w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl animate-float-3d transform-gpu shadow-2xl"></div>
        <div className="absolute top-40 right-32 w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-bounce-3d transform-gpu shadow-xl"></div>
        <div className="absolute bottom-32 left-40 w-16 h-16 bg-gradient-to-r from-indigo-400 to-cyan-400 rounded-lg animate-spin-3d transform-gpu shadow-2xl"></div>
        <div className="absolute bottom-20 right-20 w-8 h-8 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full animate-pulse-3d transform-gpu shadow-lg"></div>
        
        {/* Additional 3D Elements */}
        <div className="absolute top-1/3 left-1/4 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-md animate-wiggle transform-gpu shadow-lg"></div>
        <div className="absolute bottom-1/3 right-1/4 w-10 h-10 bg-gradient-to-r from-rose-400 to-pink-400 rounded-full animate-float-reverse transform-gpu shadow-xl"></div>
        
        {/* Dynamic Light Rays */}
        <div className="absolute top-0 left-1/4 w-1 h-full bg-gradient-to-b from-transparent via-blue-400/50 to-transparent animate-light-ray"></div>
        <div className="absolute top-0 right-1/3 w-1 h-full bg-gradient-to-b from-transparent via-purple-400/40 to-transparent animate-light-ray-delayed"></div>
        
        {/* Animated Rings */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-96 h-96 border-2 border-blue-400/30 rounded-full animate-ring-expand"></div>
          <div className="absolute inset-8 border-2 border-purple-400/20 rounded-full animate-ring-expand-delayed"></div>
          <div className="absolute inset-16 border-2 border-cyan-400/10 rounded-full animate-ring-expand-slow"></div>
        </div>
      </div>

      {/* Main Content with Enhanced 3D Effects */}
      <div className="relative z-10 text-center max-w-2xl mx-auto px-4 sm:px-6">
        {/* 3D Logo Container */}
        <div className="mb-12 relative perspective-1000">
          {/* Logo Background with 3D Glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-pink-500/30 rounded-full blur-3xl animate-glow-pulse transform-gpu"></div>
          
          {/* Main Logo with 3D Transform */}
          <div className="relative transform-gpu preserve-3d">
            <h1 className="text-6xl sm:text-8xl font-bold mb-6 tracking-wider logo-3d">
              <span className="inline-block animate-letter-bounce delay-100 text-gradient-3d">A</span>
              <span className="inline-block animate-letter-bounce delay-200 text-gradient-3d">X</span>
              <span className="inline-block animate-letter-bounce delay-300 text-gradient-3d">I</span>
              <span className="inline-block animate-letter-bounce delay-400 text-gradient-3d">O</span>
              <span className="inline-block animate-letter-bounce delay-500 text-gradient-3d">M</span>
              <span className="inline-block animate-letter-bounce delay-600 text-gradient-3d">S</span>
            </h1>
            <h2 className="text-2xl sm:text-3xl font-light text-blue-200 tracking-[0.3em] animate-fade-slide-up delay-1000 text-shadow-3d">
              SCHOOL
            </h2>
          </div>
          
          {/* 3D Decorative Particles */}
          <div className="absolute -top-6 -left-6 w-4 h-4 bg-blue-400 rounded-full animate-orbit shadow-lg"></div>
          <div className="absolute -top-4 -right-8 w-3 h-3 bg-purple-400 rounded-full animate-orbit-reverse shadow-md"></div>
          <div className="absolute -bottom-4 left-12 w-3 h-3 bg-cyan-400 rounded-full animate-float-mini shadow-md"></div>
        </div>

        {/* Enhanced Loading Section */}
        <div className="space-y-8">
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-white/30 shadow-2xl transform-gpu hover:scale-105 transition-transform duration-500 loading-container-3d">
            <p className="text-white text-xl sm:text-2xl font-light mb-8 animate-text-glow">
              Initializing Learning Environment{dots}
            </p>
            
            {/* 3D Progress Bar */}
            <div className="relative w-full bg-white/20 rounded-full h-4 sm:h-5 mb-6 overflow-hidden progress-3d">
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 rounded-full"></div>
              <div 
                className="h-full bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 rounded-full transition-all duration-700 ease-out shadow-lg progress-bar-3d"
                style={{ width: `${Math.min(progress, 100)}%` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/40 to-transparent animate-shimmer"></div>
              </div>
            </div>
            
            <div className="flex justify-between text-sm sm:text-base text-blue-100">
              <span className="animate-fade-in">
                {progress < 20 ? '📚 Loading curricula...' : 
                 progress < 40 ? '⚡ Setting up interface...' : 
                 progress < 60 ? '🔧 Configuring systems...' : 
                 progress < 80 ? '🎨 Applying themes...' :
                 progress < 95 ? '✨ Finalizing setup...' : 
                 '🚀 Ready to learn!'}
              </span>
              <span className="font-mono text-lg font-bold animate-counter">{Math.round(progress)}%</span>
            </div>
          </div>
          
          {/* Enhanced Tagline */}
          <div className="mt-12 text-center">
            <p className="text-blue-200/90 text-lg sm:text-xl font-light animate-fade-slide-up delay-2000 tagline-3d">
              Empowering minds • Shaping futures • Building tomorrow
            </p>
          </div>
        </div>
      </div>

      {/* Enhanced Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 25 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full particle-3d"
            style={{
              width: `${Math.random() * 6 + 2}px`,
              height: `${Math.random() * 6 + 2}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: `linear-gradient(45deg, 
                hsl(${Math.random() * 60 + 200}, 70%, 60%), 
                hsl(${Math.random() * 60 + 260}, 80%, 70%))`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${4 + Math.random() * 6}s`,
              boxShadow: '0 0 20px rgba(255,255,255,0.3)'
            }}
          />
        ))}
      </div>

      {/* Advanced CSS Animations */}
      <style>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        
        .preserve-3d {
          transform-style: preserve-3d;
        }
        
        .transform-gpu {
          transform: translateZ(0);
          will-change: transform;
        }
        
        .text-gradient-3d {
          background: linear-gradient(45deg, #60a5fa, #a855f7, #ec4899);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-shadow: 0 4px 8px rgba(0,0,0,0.3);
        }
        
        .text-shadow-3d {
          text-shadow: 0 2px 4px rgba(0,0,0,0.5), 0 4px 8px rgba(0,0,0,0.3);
        }
        
        .logo-3d {
          transform: rotateX(15deg) rotateY(-5deg);
          text-shadow: 
            0 1px 0 rgba(255,255,255,0.4),
            0 2px 0 rgba(0,0,0,0.2),
            0 3px 0 rgba(0,0,0,0.1),
            0 4px 8px rgba(0,0,0,0.3);
        }
        
        .loading-container-3d {
          transform: perspective(1000px) rotateX(5deg);
          box-shadow: 
            0 20px 40px rgba(0,0,0,0.3),
            0 0 0 1px rgba(255,255,255,0.1) inset;
        }
        
        .progress-3d {
          transform: perspective(500px) rotateX(10deg);
          box-shadow: 
            0 4px 8px rgba(0,0,0,0.2) inset,
            0 1px 0 rgba(255,255,255,0.1);
        }
        
        .progress-bar-3d {
          box-shadow: 
            0 2px 4px rgba(0,0,0,0.2),
            0 0 20px rgba(96,165,250,0.5);
        }
        
        .particle-3d {
          animation: particle-float-3d ease-in-out infinite;
        }
        
        .tagline-3d {
          text-shadow: 0 2px 4px rgba(0,0,0,0.5);
        }
        
        .grid-3d {
          background-image: 
            linear-gradient(rgba(96,165,250,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(96,165,250,0.1) 1px, transparent 1px);
          background-size: 50px 50px;
          animation: grid-move 20s linear infinite;
        }
        
        @keyframes particle-float-3d {
          0%, 100% { 
            transform: translate3d(0, 0, 0) rotate(0deg) scale(1); 
            opacity: 0.4; 
          }
          25% { 
            transform: translate3d(20px, -30px, 10px) rotate(90deg) scale(1.2); 
            opacity: 0.8; 
          }
          50% { 
            transform: translate3d(-15px, -60px, 20px) rotate(180deg) scale(0.8); 
            opacity: 1; 
          }
          75% { 
            transform: translate3d(-25px, -30px, 15px) rotate(270deg) scale(1.1); 
            opacity: 0.6; 
          }
        }
        
        @keyframes float-3d {
          0%, 100% { 
            transform: translate3d(0, 0, 0) rotateX(0deg) rotateY(0deg); 
          }
          25% { 
            transform: translate3d(10px, -20px, 15px) rotateX(15deg) rotateY(15deg); 
          }
          50% { 
            transform: translate3d(-5px, -40px, 25px) rotateX(30deg) rotateY(-10deg); 
          }
          75% { 
            transform: translate3d(-15px, -20px, 10px) rotateX(15deg) rotateY(25deg); 
          }
        }
        
        @keyframes bounce-3d {
          0%, 100% { 
            transform: translate3d(0, 0, 0) scale(1) rotateZ(0deg); 
          }
          50% { 
            transform: translate3d(0, -30px, 20px) scale(1.2) rotateZ(180deg); 
          }
        }
        
        @keyframes spin-3d {
          from { 
            transform: rotate3d(1, 1, 0, 0deg) scale(1); 
          }
          to { 
            transform: rotate3d(1, 1, 0, 360deg) scale(1.1); 
          }
        }
        
        @keyframes pulse-3d {
          0%, 100% { 
            transform: scale(1) rotateZ(0deg); 
            box-shadow: 0 0 20px rgba(52,211,153,0.5); 
          }
          50% { 
            transform: scale(1.3) rotateZ(180deg); 
            box-shadow: 0 0 40px rgba(52,211,153,0.8); 
          }
        }
        
        @keyframes letter-bounce {
          0%, 100% { 
            transform: translateY(0) rotateX(0deg); 
          }
          50% { 
            transform: translateY(-20px) rotateX(15deg); 
          }
        }
        
        @keyframes glow-pulse {
          0%, 100% { 
            transform: scale(1); 
            opacity: 0.3; 
          }
          50% { 
            transform: scale(1.2); 
            opacity: 0.6; 
          }
        }
        
        @keyframes fade-slide-up {
          0% { 
            opacity: 0; 
            transform: translateY(30px) rotateX(45deg); 
          }
          100% { 
            opacity: 1; 
            transform: translateY(0) rotateX(0deg); 
          }
        }
        
        @keyframes shimmer {
          0% { 
            transform: translateX(-100%); 
          }
          100% { 
            transform: translateX(100%); 
          }
        }
        
        @keyframes text-glow {
          0%, 100% { 
            text-shadow: 0 0 20px rgba(96,165,250,0.5); 
          }
          50% { 
            text-shadow: 0 0 30px rgba(96,165,250,0.8), 0 0 40px rgba(168,85,247,0.5); 
          }
        }
        
        @keyframes orbit {
          from { 
            transform: rotate(0deg) translateX(30px) rotate(0deg); 
          }
          to { 
            transform: rotate(360deg) translateX(30px) rotate(-360deg); 
          }
        }
        
        @keyframes orbit-reverse {
          from { 
            transform: rotate(360deg) translateX(25px) rotate(-360deg); 
          }
          to { 
            transform: rotate(0deg) translateX(25px) rotate(0deg); 
          }
        }
        
        @keyframes float-mini {
          0%, 100% { 
            transform: translateY(0px) scale(1); 
          }
          50% { 
            transform: translateY(-10px) scale(1.1); 
          }
        }
        
        @keyframes ring-expand {
          0% { 
            transform: scale(0.8) rotate(0deg); 
            opacity: 0.8; 
          }
          100% { 
            transform: scale(1.2) rotate(360deg); 
            opacity: 0; 
          }
        }
        
        @keyframes ring-expand-delayed {
          0% { 
            transform: scale(0.6) rotate(0deg); 
            opacity: 0.6; 
          }
          100% { 
            transform: scale(1.4) rotate(-360deg); 
            opacity: 0; 
          }
        }
        
        @keyframes ring-expand-slow {
          0% { 
            transform: scale(0.4) rotate(0deg); 
            opacity: 0.4; 
          }
          100% { 
            transform: scale(1.6) rotate(720deg); 
            opacity: 0; 
          }
        }
        
        @keyframes light-ray {
          0%, 100% { 
            opacity: 0.2; 
            transform: scaleY(0.8); 
          }
          50% { 
            opacity: 0.6; 
            transform: scaleY(1.2); 
          }
        }
        
        @keyframes light-ray-delayed {
          0%, 100% { 
            opacity: 0.1; 
            transform: scaleY(0.6); 
          }
          50% { 
            opacity: 0.4; 
            transform: scaleY(1.4); 
          }
        }
        
        @keyframes wiggle {
          0%, 100% { 
            transform: rotate(-3deg) scale(1); 
          }
          50% { 
            transform: rotate(3deg) scale(1.1); 
          }
        }
        
        @keyframes float-reverse {
          0%, 100% { 
            transform: translate3d(0, 0, 0) rotate(0deg); 
          }
          25% { 
            transform: translate3d(-15px, 25px, -10px) rotate(-90deg); 
          }
          50% { 
            transform: translate3d(10px, 50px, -20px) rotate(-180deg); 
          }
          75% { 
            transform: translate3d(20px, 25px, -15px) rotate(-270deg); 
          }
        }
        
        @keyframes counter {
          from { 
            transform: scale(0.8); 
          }
          to { 
            transform: scale(1); 
          }
        }
        
        @keyframes grid-move {
          0% { 
            transform: translate(0, 0); 
          }
          100% { 
            transform: translate(50px, 50px); 
          }
        }
        
        /* Animation Classes */
        .animate-float-3d { animation: float-3d 6s ease-in-out infinite; }
        .animate-bounce-3d { animation: bounce-3d 3s ease-in-out infinite; }
        .animate-spin-3d { animation: spin-3d 4s linear infinite; }
        .animate-pulse-3d { animation: pulse-3d 2s ease-in-out infinite; }
        .animate-letter-bounce { animation: letter-bounce 2s ease-in-out infinite; }
        .animate-glow-pulse { animation: glow-pulse 3s ease-in-out infinite; }
        .animate-fade-slide-up { animation: fade-slide-up 1s ease-out forwards; }
        .animate-shimmer { animation: shimmer 2s ease-in-out infinite; }
        .animate-text-glow { animation: text-glow 4s ease-in-out infinite; }
        .animate-orbit { animation: orbit 8s linear infinite; }
        .animate-orbit-reverse { animation: orbit-reverse 6s linear infinite; }
        .animate-float-mini { animation: float-mini 3s ease-in-out infinite; }
        .animate-ring-expand { animation: ring-expand 3s ease-out infinite; }
        .animate-ring-expand-delayed { animation: ring-expand-delayed 3s ease-out infinite 0.5s; }
        .animate-ring-expand-slow { animation: ring-expand-slow 4s ease-out infinite 1s; }
        .animate-light-ray { animation: light-ray 4s ease-in-out infinite; }
        .animate-light-ray-delayed { animation: light-ray-delayed 4s ease-in-out infinite 2s; }
        .animate-wiggle { animation: wiggle 2s ease-in-out infinite; }
        .animate-float-reverse { animation: float-reverse 8s ease-in-out infinite; }
        .animate-counter { animation: counter 0.5s ease-out; }
        
        /* Delay Classes */
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-400 { animation-delay: 0.4s; }
        .delay-500 { animation-delay: 0.5s; }
        .delay-600 { animation-delay: 0.6s; }
        .delay-1000 { animation-delay: 1s; }
        .delay-2000 { animation-delay: 2s; }
      `}</style>
    </div>
  );
};

export default SplashScreen;
