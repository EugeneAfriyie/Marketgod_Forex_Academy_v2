// src/components/JoinCommunity/JoinCommunity3D.tsx
import { useRef, useState, Suspense, useMemo } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, Stars, Billboard, Text } from "@react-three/drei";
import { motion } from "framer-motion";
import CommunityModal from "./CommunityModal";
import { Instagram, Youtube, Send, Twitter, Facebook } from "lucide-react";
import * as THREE from "three";
import MarketGodStars from "./MarketGodStars";
import { useTheme } from "../../context/ThemeContext";

function GlobeWithLogos({ logos }: { logos: string[] }) {
  const { theme } = useTheme();
  const groupRef = useRef<THREE.Group>(null);
  const textures = useLoader(THREE.TextureLoader, logos);

  useFrame((_state, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.05;
  });

  const radius = 1;
  const logoPositions = useMemo(() => {
    return Array.from({ length: textures.length * 6 }).map(() => {
      const theta = Math.random() * Math.PI;
      const phi = Math.random() * 2 * Math.PI;
      return new THREE.Vector3(
        radius * Math.sin(theta) * Math.cos(phi),
        radius * Math.cos(theta),
        radius * Math.sin(theta) * Math.sin(phi)
      );
    });
  }, [textures.length]);

  const globeColor = theme === "dark" ? "#000000" : "gray";
  const emissiveColor = theme === "dark" ? "#D4AF37" : "#B8860B";

  return (
    <group ref={groupRef}>
      <mesh>
        <sphereGeometry args={[radius, 64, 64]} />
        <meshStandardMaterial color={globeColor} roughness={0.6} metalness={0.2} />
      </mesh>
      {logoPositions.map((pos, i) => (
        <Billboard key={i} position={pos}>
          <mesh>
            <planeGeometry args={[0.25, 0.25]} />
            <meshStandardMaterial
              map={textures[i % textures.length]}
              transparent
              emissive={emissiveColor}
              emissiveIntensity={0.3}
            />
          </mesh>
        </Billboard>
      ))}
      <OrbitingText />
    </group>
  );
}

function OrbitingText() {
  const { theme } = useTheme();
  const ref = useRef<THREE.Group>(null);
  const words = "MarketgodAcademy".split("");
  const radius = 2.3;

  useFrame((state) => {
    const t = state.clock.getElapsedTime() * 0.1;
    if (ref.current) ref.current.rotation.y = t;
  });

  const textColor = theme === "dark" ? "#D4AF37" : "#B8860B";

  return (
    <group ref={ref}>
      {words.map((word, i) => {
        const angle = (i / words.length) * Math.PI * 2;
        return (
          <Text
            key={i}
            position={[Math.cos(angle) * radius, 0, Math.sin(angle) * radius]}
            rotation={[0, -angle, 0]}
            fontSize={0.25}
            color={textColor}
            anchorX="center"
            anchorY="middle"
          >
            {word}
          </Text>
        );
      })}
    </group>
  );
}

export default function JoinCommunity3D() {
  const [open, setOpen] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === "dark";

const TikTokIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.08 1.07.9 1.9 1.9 2.23.69.22 1.43.16 2.12-.08.83-.29 1.5-.81 1.88-1.58.21-.43.3-.91.3-1.4v-8.41c-.45-.34-.85-.73-1.23-1.17-.02-.02-.03-.03-.05-.05-.21-.2-.4-.4-.58-.61-.01-.01-.02-.02-.02-.03-.3-.39-.59-.81-.84-1.25-.14-.24-.28-.5-.41-.75-.1-.19-.19-.39-.28-.59-.02-.05-.04-.09-.06-.14-.09-.2-.18-.4-.26-.6-.09-.23-.17-.46-.25-.7-.07-.2-.13-.4-.19-.6-.02-.06-.04-.12-.06-.18-.06-.19-.11-.38-.16-.57-.03-.12-.06-.24-.09-.36a.99.99 0 0 1-.03-.12c-.09-.3-.17-.6-.24-.91s-.13-.61-.17-.92c-.01-.07-.02-.14-.03-.21-.05-.3-.09-.6-.12-.91-.02-.15-.03-.3-.04-.45-.01-.15-.01-.3-.01-.45v-.01Z" />
  </svg>
);


  const links = useMemo(
    () => [
      { name: "Telegram", href: "https://t.me/marketgodcommunity", icon: <Send /> },
      { name: "Instagram", href: "https://www.instagram.com/eyram_dela", icon: <Instagram /> },
      { name: "YouTube", href: "https://www.youtube.com/@marketgodcommunity", icon: <Youtube /> },
      { name: "Twitter (X)", href: "https://x.com/eyramdela ", icon: <Twitter /> },
      { name: "TikTok", href: "https://www.tiktok.com/@eyramdela_", icon: <TikTokIcon /> },
      { name: "Facebook", href: "https://www.facebook.com/share/1E24KkebYt/?mibextid=wwXIfr", icon: <Facebook /> },

    ],
    []
  );

  return (
    <section
      className={`relative py-24 ${
        isDark
          ? "bg-gradient-to-t from-mg-black via-mg-charcoal to-mg-black"
          : "bg-gradient-to-t from-mg-light-bg via-mg-paper to-mg-light-bg"
      } text-mg-light-text dark:text-mg-dark-text`}
      id="community"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-black text-mg-black dark:text-mg-white mb-4">
            Join <span className="text-mg-gold">Marketgod</span> Community
          </h2>
          <p className="max-w-3xl mx-auto text-lg sm:text-xl text-mg-light-textSecondary dark:text-mg-dark-textSecondary">
            Connect with traders from across Africa and the world. All from the heart of Ghana.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left CTA */}
            <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative p-4 md:p-12 rounded-3xl border-4 border-mg-gold/40 backdrop-blur-xl shadow-2xl overflow-hidden"
            style={{
              backgroundImage: "url('https://res.cloudinary.com/dzqdfaghg/image/upload/v1763522353/SnapInsta.to_572477469_18538014796003421_360178860850559894_n_uuic8a.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-black/80" />
            
            {/* Gold Light Streaks */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-0 left-[-50%] w-[200%] h-1 bg-gradient-to-r from-transparent via-mg-gold/60 to-transparent animate-lightStreak1" />
              <div className="absolute top-1/3 left-[-50%] w-[200%] h-1 bg-gradient-to-r from-transparent via-mg-gold/40 to-transparent animate-lightStreak2" />
              <div className="absolute bottom-1/3 left-[-50%] w-[200%] h-1 bg-gradient-to-r from-transparent via-mg-gold/50 to-transparent animate-lightStreak3" />
            </div>

            <div className="relative z-10">
              <h3 className="text-4xl md:text-5xl font-black text-mg-white mb-6">
                Connect with Marketgod Academy
              </h3>
              <p className="text-xl text-gray-300 mb-10 leading-relaxed">
                VIP signals, mentorship, webinars — all guided by Marketgod experts.
              </p>

              {/* Social Links */}
              <div className="flex flex-wrap gap-4 mb-10">
                {links.map((l) => (
                  <motion.a
                    key={l.href}
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-3 px-6 py-4 rounded-xl bg-white/5 border border-mg-gold/30  text-white transition-all font-bold"
                  >
                    <span className="w-8 h-8 flex items-center justify-center text-mg-gold group-hover:text-black">
                      {l.icon}
                    </span>
                    <span>{l.name}</span>
                  </motion.a>
                ))}
              </div>

              {/* Main CTA Button */}
              <motion.button
                onClick={() => setOpen(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className={`
                  w-full p-3 md:py-6 rounded-2xl font-black text-2xl shadow-2xl transition-all duration-500 hover:shadow-gold-glow-lg
                    bg-mg-white 
                  text-black  
                `}
              >
                Join Community Now
              </motion.button>
            </div>
          </motion.div>

          {/* Right - 3D Globe */}
          <div className={`w-full h-[400px] sm:h-[500px] rounded-2xl overflow-hidden bg-mg-charcoal/60 dark:bg-mg-black/60  ${
        !isDark
          && "bg-gradient-to-t from-mg-black via-mg-charcoal to-mg-black"
      }
          
      }`}>
            <Canvas camera={{ position: [0, 0, 4] }}>
              <ambientLight intensity={0.5} />
              <directionalLight position={[4, 4, 4]} intensity={1} />
              <Suspense fallback={null}>
                <GlobeWithLogos logos={["/logo.png"]} />
                <Stars radius={40} depth={60} count={300} factor={4} fade />
                <MarketGodStars />
              </Suspense>
              <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.2} />
            </Canvas>
          </div>
        </div>
      </div>

      <CommunityModal open={open} onClose={() => setOpen(false)}  />
    
    </section>
  );
}


