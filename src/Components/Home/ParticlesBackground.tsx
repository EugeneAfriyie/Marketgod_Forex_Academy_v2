// src/components/ParticlesBackground.tsx
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

const ParticlesBackground = () => {
  const particlesInit = async (main: any) => {
    await loadFull(main);
  };

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        fullScreen: { enable: false },
        fpsLimit: 60,
        particles: {
          number: { value: 40, density: { enable: true, area: 800 } },
          color: { value: "#FFD700" },
          shape: { type: "circle" },
          opacity: { value: 0.3, random: true },
          size: { value: { min: 1, max: 3 } },
          move: { enable: true, speed: 0.6, direction: "none", outModes: "out" },
          links: { enable: true, distance: 120, color: "#FFD700", opacity: 0.15, width: 1 },
        },
        interactivity: {
          events: {
            onHover: { enable: true, mode: "repulse" },
            onClick: { enable: true, mode: "push" },
          },
          modes: {
            repulse: { distance: 80 },
            push: { quantity: 4 },
          },
        },
        detectRetina: true,
      }}
    />
  );
};

export default ParticlesBackground;



