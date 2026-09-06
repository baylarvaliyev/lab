"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// A single stylized leaf, built as an extruded 2D shape so it catches light
// like a real blade rather than a flat plane.
function Leaf({
  position,
  rotation,
  scale = 1,
  color,
}: {
  position: [number, number, number];
  rotation: [number, number, number];
  scale?: number;
  color: string;
}) {
  const geometry = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.quadraticCurveTo(0.35, 0.5, 0.18, 1.3);
    shape.quadraticCurveTo(0.1, 1.65, 0, 1.85);
    shape.quadraticCurveTo(-0.1, 1.65, -0.18, 1.3);
    shape.quadraticCurveTo(-0.35, 0.5, 0, 0);
    return new THREE.ExtrudeGeometry(shape, {
      depth: 0.03,
      bevelEnabled: true,
      bevelThickness: 0.015,
      bevelSize: 0.015,
      bevelSegments: 2,
      curveSegments: 12,
    });
  }, []);

  return (
    <mesh geometry={geometry} position={position} rotation={rotation} scale={scale} castShadow receiveShadow>
      <meshStandardMaterial
        color={color}
        roughness={0.35}
        metalness={0.05}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

function Stem({ height, color }: { height: number; color: string }) {
  return (
    <mesh position={[0, height / 2, 0]} castShadow>
      <cylinderGeometry args={[0.025, 0.04, height, 8]} />
      <meshStandardMaterial color={color} roughness={0.5} />
    </mesh>
  );
}

// The soil core the plant grows out of -- a stack of translucent discs
// echoing the soil-strata analysis the lab performs.
function SoilCore() {
  const layers = [
    { y: -0.55, r: 1.05, h: 0.32, color: "#2b1c12" },
    { y: -0.28, r: 1.0, h: 0.28, color: "#4a2f1a" },
    { y: -0.04, r: 0.95, h: 0.24, color: "#6b4423" },
  ];
  return (
    <group>
      {layers.map((l, i) => (
        <mesh key={i} position={[0, l.y, 0]} receiveShadow>
          <cylinderGeometry args={[l.r, l.r * 1.04, l.h, 48]} />
          <meshStandardMaterial color={l.color} roughness={0.9} />
        </mesh>
      ))}
    </group>
  );
}

function Plant() {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.y = state.clock.elapsedTime * 0.18;
    group.current.position.y = Math.sin(state.clock.elapsedTime * 0.6) * 0.04;
  });

  const leafColors = ["#7fbf5a", "#95d66b", "#6aa84a"];

  return (
    <group ref={group}>
      <SoilCore />
      <Stem height={1.1} color="#5c7a3c" />
      {Array.from({ length: 7 }).map((_, i) => {
        const angle = (i / 7) * Math.PI * 2 + i * 0.6;
        const heightAlong = 0.25 + (i / 7) * 0.85;
        const radius = 0.05;
        return (
          <Leaf
            key={i}
            position={[Math.cos(angle) * radius, heightAlong, Math.sin(angle) * radius]}
            rotation={[
              (i % 2 === 0 ? -1 : 1) * 0.55,
              angle,
              (i % 2 === 0 ? 1 : -1) * 0.25,
            ]}
            scale={0.55 + (i / 7) * 0.35}
            color={leafColors[i % leafColors.length]}
          />
        );
      })}
    </group>
  );
}

function FloatingGrains() {
  const points = useMemo(() => {
    const count = 60;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 6;
      positions[i * 3 + 1] = Math.random() * 3 - 0.8;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }
    return positions;
  }, []);

  const ref = useRef<THREE.Points>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.03;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[points, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.025} color="#b9f227" transparent opacity={0.55} sizeAttenuation />
    </points>
  );
}

export default function PlantScene() {
  return (
    <Canvas
      shadows
      camera={{ position: [2.4, 1.4, 3.2], fov: 42 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.55} />
      <directionalLight
        position={[3, 4, 2]}
        intensity={1.6}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <pointLight position={[-3, 1, -2]} intensity={0.6} color="#34d399" />
      <Plant />
      <FloatingGrains />
    </Canvas>
  );
}
