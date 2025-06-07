
import { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text3D, Center } from '@react-three/drei';
import * as THREE from 'three';

interface SplashScreenProps {
  progress: number;
}

function AnimatedLogo() {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation((prev) => prev + 0.01);
    }, 16);
    return () => clearInterval(interval);
  }, []);

  return (
    <Center>
      <group rotation={[0, rotation, 0]}>
        <Text3D
          font="/fonts/helvetiker_regular.typeface.json"
          size={0.8}
          height={0.2}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.02}
          bevelSize={0.02}
          bevelOffset={0}
          bevelSegments={5}
        >
          AXIOMS
          <meshStandardMaterial 
            color="#3b82f6" 
            metalness={0.8}
            roughness={0.2}
          />
        </Text3D>
        <Text3D
          font="/fonts/helvetiker_regular.typeface.json"
          size={0.4}
          height={0.1}
          position={[0, -1.2, 0]}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.01}
          bevelSize={0.01}
          bevelOffset={0}
          bevelSegments={3}
        >
          SCHOOL
          <meshStandardMaterial 
            color="#8b5cf6" 
            metalness={0.6}
            roughness={0.3}
          />
        </Text3D>
      </group>
    </Center>
  );
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
      {/* 3D Canvas Background */}
      <div className="absolute inset-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <spotLight position={[-10, -10, -10]} angle={0.15} penumbra={1} intensity={0.5} />
          <AnimatedLogo />
          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={1} />
        </Canvas>
      </div>

      {/* Overlay Content */}
      <div className="relative z-10 text-center max-w-lg mx-auto px-4 sm:px-6">
        {/* Loading Section */}
        <div className="space-y-6 mt-8">
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 sm:p-6 border border-white/20 shadow-lg">
            <p className="text-white text-lg sm:text-xl font-light mb-6">
              Initializing Learning Environment{dots}
            </p>
            
            {/* Progress bar */}
            <div className="relative w-full bg-white/20 rounded-full h-2 sm:h-3 mb-4 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 rounded-full transition-all duration-500 ease-out shadow-lg"
                style={{ width: `${Math.min(progress, 100)}%` }}
              >
              </div>
            </div>
            
            <div className="flex justify-between text-xs sm:text-sm text-blue-100">
              <span>
                {progress < 25 ? '📚 Loading curricula...' : 
                 progress < 50 ? '⚡ Setting up interface...' : 
                 progress < 75 ? '🔧 Configuring systems...' : 
                 progress < 95 ? '✨ Finalizing setup...' : 
                 '🚀 Ready to learn!'}
              </span>
              <span className="font-mono">{Math.round(progress)}%</span>
            </div>
          </div>
          
          {/* Bottom tagline */}
          <div className="mt-8 text-center">
            <p className="text-blue-200/80 text-sm sm:text-base font-light">
              Empowering minds • Shaping futures • Building tomorrow
            </p>
          </div>
        </div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default SplashScreen;
