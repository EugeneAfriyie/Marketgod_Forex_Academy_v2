// src/components/WhyForex/WhyForex.tsx
import  { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";
import {
  TrendingUp,
  Globe,
  Clock,
  Shield,
  Zap,
  Users,
} from "lucide-react";

const WhyForex = () => {
  const { theme } = useTheme();
  const [index, setIndex] = useState(0);
  const controls = useAnimation();

  const reasons = [
    {
      icon: TrendingUp,
      title: "Trade 24/5",
      desc: "Markets open Sunday 10 PM to Friday 10 PM GMT — perfect for African side hustlers.",
    },
    {
      icon: Globe,
      title: "Global Access",
      desc: "Trade USD, EUR, GBP, JPY — from Accra to Tokyo. No limits.",
    },
    {
      icon: Clock,
      title: "Flexible Hours",
      desc: "Morning, midnight, or lunch break — you decide when to trade.",
    },
    {
      icon: Shield,
      title: "Low Entry Barrier",
      desc: "Start with as little as $100 — no degree, no office, no boss.",
    },
    {
      icon: Zap,
      title: "High Liquidity",
      desc: "Over $7.5 trillion traded daily — enter and exit in seconds.",
    },
    {
      icon: Users,
      title: "Leverage Power",
      desc: "Control $10,000 with $100. Smart risk, fast growth.",
    },
  ];

  // 🔁 Auto-rotate carousel every 4s
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % reasons.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [reasons.length]);

  // 🎞️ Animate rotation
  useEffect(() => {
    controls.start({
      rotateY: index * -60,
      transition: { duration: 1.2, ease: "easeInOut" },
    });
  }, [index, controls]);

  return (
    <section
      className={`relative overflow-hidden py-24 transition-colors duration-300 ${
        theme === "light" ? "bg-mg-light-bg" : "bg-mg-dark-bg"
      }`}
    >
      {/* Soft glowing background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-mg-gold/10 via-transparent to-mg-gold/10 blur-3xl opacity-40 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 px-6 items-center">
        {/* LEFT SIDE */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h2
            className={`text-4xl md:text-6xl font-extrabold leading-tight mb-6 ${
              theme === "light" ? "text-mg-light-text" : "text-mg-gold"
            }`}
          >
            Why <span className="text-mg-gold">Forex Trading</span>?
          </h2>
          <p
            className={`text-lg md:text-xl leading-relaxed mb-10 ${
              theme === "light"
                ? "text-mg-light-textSecondary"
                : "text-mg-dark-textSecondary"
            }`}
          >
            The world’s largest financial market — built for freedom, ambition,
            and opportunity. No office. No boss. Just skill.
          </p>

          <motion.a
            href="#plans"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-3 px-8 py-4 bg-mg-gold text-mg-black rounded-full font-bold uppercase tracking-wide shadow-gold-glow hover:shadow-gold-glow-lg transition"
          >
            Start Trading Now <TrendingUp size={20} />
          </motion.a>
        </motion.div>

        {/* RIGHT SIDE — 3D Carousel */}
        <div className="hidden lg:flex justify-center items-center perspective-[1200px]">
          <motion.div
            animate={controls}
            className="relative w-[280px] h-[280px]"
            style={{
              transformStyle: "preserve-3d",
            }}
          >
            {reasons.map((reason, i) => {
              const angle = (360 / reasons.length) * i;
              const radius = 400;
              return (
                <motion.div
                  key={i}
                  className={`absolute w-64 h-64 p-6 rounded-2xl border shadow-lg backdrop-blur-md transition-all ${
                    theme === "light"
                      ? "bg-white/80 border-mg-gold/20 hover:shadow-gold-glow-light"
                      : "bg-mg-charcoal/80 border-mg-gold/30 hover:shadow-gold-glow"
                  }`}
                  style={{
                    transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
                  }}
                >
                  <reason.icon
                    size={44}
                    className="text-mg-gold mb-4 drop-shadow-md"
                  />
                  <h3
                    className={`text-xl font-semibold mb-2 ${
                      theme === "light" ? "text-mg-light-text" : "text-mg-gold"
                    }`}
                  >
                    {reason.title}
                  </h3>
                  <p
                    className={`text-sm leading-relaxed ${
                      theme === "light"
                        ? "text-mg-light-textSecondary"
                        : "text-mg-dark-textSecondary"
                    }`}
                  >
                    {reason.desc}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Fallback for Mobile (Static Grid) */}
        <div className="grid sm:grid-cols-2 gap-8 lg:hidden">
          {reasons.map((reason, i) => (
            <div
              key={i}
              className={`p-6 rounded-2xl border shadow-lg backdrop-blur-md ${
                theme === "light"
                  ? "bg-white/80 border-mg-gold/20"
                  : "bg-mg-charcoal/80 border-mg-gold/30"
              }`}
            >
              <reason.icon size={40} className="text-mg-gold mb-4" />
              <h3
                className={`text-lg font-semibold ${
                  theme === "light" ? "text-mg-light-text" : "text-mg-gold"
                }`}
              >
                {reason.title}
              </h3>
              <p
                className={`text-sm ${
                  theme === "light"
                    ? "text-mg-light-textSecondary"
                    : "text-mg-dark-textSecondary"
                }`}
              >
                {reason.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyForex;



