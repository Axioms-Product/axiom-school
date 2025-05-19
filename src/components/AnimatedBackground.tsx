
import { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere } from '@react-three/drei';
import * as THREE from 'three';

const ParticleField = ({ count = 100 }) => {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const light = useRef<THREE.PointLight>(null);
  
  useEffect(() => {
    if (!mesh.current) return;
    // Set initial positions of particles
    const dummy = new THREE.Object3D();
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const radius = 3 + Math.random() * 10;
      dummy.position.set(
        Math.sin(theta) * radius,
        (Math.random() - 0.5) * 5,
        Math.cos(theta) * radius
      );
      dummy.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.matrix);
    }
    mesh.current.instanceMatrix.needsUpdate = true;
  }, [count]);

  useFrame(({ clock }) => {
    if (!mesh.current || !light.current) return;
    
    const time = clock.getElapsedTime();
    
    // Animate the point light
    light.current.position.x = Math.sin(time * 0.3) * 10;
    light.current.position.y = Math.sin(time * 0.5) * 5;
    light.current.position.z = Math.cos(time * 0.3) * 10;
    
    // Animate particles
    const dummy = new THREE.Object3D();
    for (let i = 0; i < count; i++) {
      mesh.current.getMatrixAt(i, dummy.matrix);
      dummy.matrix.decompose(dummy.position, dummy.quaternion, dummy.scale);
      
      // Move particles in a wave pattern
      dummy.position.y = Math.sin(time * 0.5 + i * 0.1) * 1 + (Math.random() - 0.5) * 0.1;
      
      dummy.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.matrix);
    }
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <>
      <pointLight ref={light} distance={15} intensity={10} color="#8b5cf6" />
      <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
        <sphereGeometry args={[0.05, 24, 24]} />
        <meshBasicMaterial color="#8b5cf6" />
      </instancedMesh>
    </>
  );
};

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

const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 15], fov: 60 }}>
        <ambientLight intensity={0.4} />
        <FloatingSphere />
        <ParticleField count={200} />
        <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
      </Canvas>
    </div>
  );
};

export default AnimatedBackground;
