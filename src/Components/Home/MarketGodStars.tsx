// src/components/JoinCommunity/MarketGodStars.tsx
import { useMemo, useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { TextureLoader, PointsMaterial } from "three";   // <-- public API
import { useTheme } from "../../context/ThemeContext";

import marketGodLogo from "/logo.png";

export default function MarketGodStars() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const pointsRef = useRef<THREE.Points>(null);
  const globeRef = useRef<THREE.Mesh>(null);
  const texture = useLoader(TextureLoader, marketGodLogo);

  // -------------------------------------------------
  // 1. Random star positions on a sphere
  // -------------------------------------------------
  const geometry = useMemo(() => {
    const count = 1200;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const radius = 2;
    const gold = new THREE.Color("#D4AF37");
    const green = new THREE.Color("#00c896");

    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI;
      const phi = Math.random() * 2 * Math.PI;

      const x = radius * Math.sin(theta) * Math.cos(phi);
      const y = radius * Math.cos(theta);
      const z = radius * Math.sin(theta) * Math.sin(phi);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      // Gold to Green gradient based on latitude (y)
      const t = (y + radius) / (2 * radius); // 0 to 1
      const c = gold.clone().lerp(green, t * 0.8);
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    const geom = new THREE.BufferGeometry();
    geom.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geom.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    return geom;
  }, []);

  // -------------------------------------------------
  // 2. Animation loop
  // -------------------------------------------------
  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (pointsRef.current) {
      pointsRef.current.rotation.y = t * 0.08;

      // `pointsMaterial` is guaranteed to be PointsMaterial because we create it below
      const mat = pointsRef.current.material as PointsMaterial;
      mat.opacity = 0.75 + Math.sin(t * 6) * 0.15;
    }

    if (globeRef.current) {
      globeRef.current.rotation.y = t * 0.05;
    }
  });

  // -------------------------------------------------
  // 3. Render
  // -------------------------------------------------
  return (
    <group>
      {/* Globe with logo */}
      <mesh ref={globeRef}>
        <sphereGeometry args={[1.02, 64, 64]} />
        <meshStandardMaterial
          map={texture}
          metalness={0.4}
          roughness={0.6}
          emissive={isDark ? "#00c896" : "#000000"}
          emissiveIntensity={0.25}
          transparent
          opacity={0.95}
        />
      </mesh>

      {/* Orbiting stars */}
      <points ref={pointsRef}>
        <bufferGeometry attach="geometry" {...geometry} />
        <pointsMaterial
          vertexColors
          size={0.07}
          sizeAttenuation
          transparent
          opacity={0.9}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {/* Lighting */}
      <ambientLight intensity={0.4} color={isDark ? "#D4AF37" : "#B8860B"} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} color="#00c896" />
      <pointLight position={[0, 0, 0]} intensity={0.5} color="#D4AF37" />
    </group>
  );
}


