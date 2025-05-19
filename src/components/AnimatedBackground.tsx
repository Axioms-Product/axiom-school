
import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import * as THREE from 'three';

// This component creates individual particles instead of using instancedMesh
const Particles = ({ count = 100 }) => {
  const particles = Array.from({ length: count }, (_, i) => {
    const theta = Math.random() * Math.PI * 2;
    const radius = 3 + Math.random() * 10;
    // Explicitly type as [number, number, number] to satisfy TypeScript
    const position: [number, number, number] = [
      Math.sin(theta) * radius,
      (Math.random() - 0.5) * 2,
      Math.cos(theta) * radius
    ];
    return {
      position,
      id: i
    };
  });
  
  return (
    <group>
      {particles.map((particle) => (
        <ParticlePoint key={particle.id} position={particle.position} index={particle.id} />
      ))}
      <pointLight position={[0, 0, 0]} intensity={10} color="#8b5cf6" distance={15} />
    </group>
  );
};

// Type definition for particle point props
interface ParticlePointProps {
  position: [number, number, number];
  index: number;
}

const ParticlePoint = ({ position, index }: ParticlePointProps) => {
  const ref = useRef<THREE.Mesh>(null);
  
  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    if (ref.current) {
      // Add some gentle wavey motion
      ref.current.position.y = position[1] + Math.sin(time * 0.5 + index * 0.1) * 0.5;
    }
  });
  
  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[0.05, 8, 8]} />
      <meshBasicMaterial color="#8b5cf6" />
    </mesh>
  );
};

// This component is used inside the Canvas
const FloatingSphere = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.position.y = Math.sin(time * 0.5) * 0.5;
      meshRef.current.rotation.x = time * 0.2;
      meshRef.current.rotation.z = time * 0.1;
    }
  });
  
  return (
    <Sphere ref={meshRef} args={[2, 32, 32]} position={[0, 0, 0]}>
      <meshPhongMaterial color="#3b82f6" opacity={0.2} transparent />
    </Sphere>
  );
};

// Main component that sets up the 3D scene
const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 15], fov: 60 }}>
        <ambientLight intensity={0.4} />
        <FloatingSphere />
        <Particles count={100} />
      </Canvas>
    </div>
  );
};

export default AnimatedBackground;
