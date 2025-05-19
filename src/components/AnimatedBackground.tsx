
import React, { useRef, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import * as THREE from 'three';

// A simplified particle component that uses basic meshes
const Particle = ({ position, size, color }: { position: [number, number, number], size: number, color: string }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[size, 8, 8]} />
      <meshBasicMaterial color={color} transparent opacity={0.6} />
    </mesh>
  );
};

// Main particles field component
const ParticlesField = ({ count = 100 }) => {
  // Generate particles data only once with useMemo
  const particles = useMemo(() => {
    return Array.from({ length: count }, () => {
      // Generate random positions in a spherical pattern
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      const radius = 3 + Math.random() * 10;
      
      const position: [number, number, number] = [
        Math.sin(phi) * Math.cos(theta) * radius,
        Math.sin(phi) * Math.sin(theta) * radius,
        Math.cos(phi) * radius
      ];
      
      const size = 0.05 + Math.random() * 0.05;
      
      return {
        position,
        size,
        color: '#8b5cf6'
      };
    });
  }, [count]);
  
  return (
    <group>
      {particles.map((particle, index) => (
        <Particle 
          key={index} 
          position={particle.position} 
          size={particle.size} 
          color={particle.color} 
        />
      ))}
      <pointLight position={[0, 0, 0]} intensity={2} color="#8b5cf6" distance={20} />
    </group>
  );
};

// A simple central sphere
const CentralSphere = () => {
  return (
    <Sphere args={[1.5, 32, 32]} position={[0, 0, 0]}>
      <meshPhongMaterial color="#3b82f6" opacity={0.2} transparent />
    </Sphere>
  );
};

// Main component
const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 15], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.4} />
        <CentralSphere />
        <ParticlesField count={50} />
      </Canvas>
    </div>
  );
};

export default AnimatedBackground;
