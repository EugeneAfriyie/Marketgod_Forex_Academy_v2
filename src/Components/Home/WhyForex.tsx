// src/components/Home/WhyForex.tsx
import { useEffect, useState } from "react";
import { motion, useAnimation} from "framer-motion";
// import { type MotionProps } from "framer-motion";
import type { PanInfo } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";
import {
  TrendingUp,
  Globe,
  Clock,
  Shield,
  Zap,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Reason {
  icon: LucideIcon;
  title: string;
  desc: string;
}

const WhyForex = () => {
  const { theme } = useTheme();
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [stackIndex, setStackIndex] = useState(0);
  const [dragX, setDragX] = useState(0);
  const controls = useAnimation();

  const reasons: Reason[] = [
    { icon: TrendingUp, title: "Trade 24/5", desc: "Markets open Sunday 10 PM to Friday 10 PM GMT — perfect for African side hustlers." },
    { icon: Globe, title: "Global Access", desc: "Trade USD, EUR, GBP, JPY — from Accra to Tokyo. No limits." },
    { icon: Clock, title: "Flexible Hours", desc: "Morning, midnight, or lunch break — you decide when to trade." },
    { icon: Shield, title: "Low Entry Barrier", desc: "Start with as little as $100 — no degree, no office, no boss." },
    { icon: Zap, title: "High Liquidity", desc: "Over $7.5 trillion traded daily — enter and exit in seconds." },
    { icon: Users, title: "Leverage Power", desc: "Control $10,000 with $100. Smart risk, fast growth." },
  ];

  // Auto-rotate carousel (desktop)
  useEffect(() => {
    const interval = setInterval(() => {
      setCarouselIndex((prev) => (prev + 1) % reasons.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [reasons.length]);

  // Sync carousel rotation with Framer Motion
  useEffect(() => {
    controls.start({
      rotateY: carouselIndex * -60,
      transition: { duration: 1.2, ease: "easeInOut" },
    });
  }, [carouselIndex, controls]);

  // Mobile swipe handlers
  const handleDrag = (
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    setDragX(info.offset.x);
  };

  const handleDragEnd = (
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    const threshold = 80;
    if (info.offset.x < -threshold && stackIndex < reasons.length - 1) {
      setStackIndex(stackIndex + 1);
    } else if (info.offset.x > threshold && stackIndex > 0) {
      setStackIndex(stackIndex - 1);
    }
    setDragX(0);
  };

  return (
    <section
      className={`relative overflow-hidden py-24 transition-colors duration-300 ${
        theme === "light" ? "bg-mg-light-bg" : "bg-mg-dark-bg"
      }`}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-mg-gold/10 via-transparent to-mg-gold/10 blur-3xl opacity-40 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto grid gap-20 px-6 items-center">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h2
            className={`text-4xl md:text-6xl font-extrabold leading-tight mb-6 ${
              theme === "light" ? "text-mg-light-text" : "text-mg-white"
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
            The world’s largest financial market — built for freedom,
            ambition, and opportunity. No office. No boss. Just skill.
          </p>

          <motion.a
            href="plans/#pricing"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-3 px-8 py-4 bg-mg-black dark:bg-mg-white text-mg-white dark:text-mg-black rounded-full font-bold uppercase tracking-wide shadow-gold-glow hover:shadow-gold-glow-lg transition"
          >
            Start Trading Now <TrendingUp size={20} />
          </motion.a>
        </motion.div>

        {/* Desktop 3D Carousel */}
        {/* Desktop 3D Carousel */}
<div className="hidden md:flex justify-center items-center perspective-[1200px]">
  <motion.div
    animate={controls}
    className="relative w-[300px] h-[300px]"
    style={{ transformStyle: "preserve-3d" }}
  >
    {reasons.map((reason, i) => {
      const angle = (360 / reasons.length) * i;
      const radius = 420;

      return (
        <motion.div
          key={i}
          className={`absolute w-72 h-72 p-7 rounded-2xl border shadow-lg backdrop-blur-md transition-all ${
            theme === "light"
              ? "bg-white/85 border-mg-gold/20 hover:shadow-gold-glow-light"
              : "bg-mg-charcoal/85 border-mg-gold/30 hover:shadow-gold-glow"
          }`}
          style={{
            transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
          }}
        >
          <reason.icon size={48} className="text-mg-gold mb-4 drop-shadow-md" />
          <h3
            className={`text-xl font-semibold mb-2 ${
              theme === "light" ? "text-mg-light-text" : "text-mg-white"
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

{/* Mobile Stack Carousel */}
<div className="md:hidden relative h-[460px] overflow-hidden">
  {reasons.map((reason, i) => {
    const isActive = i === stackIndex;
    const offset = i - stackIndex;
    const zIndex = reasons.length - Math.abs(offset);
    const isAtStart = stackIndex === 0 && offset === 0 && dragX > 0;
    const isAtEnd = stackIndex === reasons.length - 1 && offset === 0 && dragX < 0;

    return (
      <motion.div
        key={i}
        drag="x"
        dragConstraints={{ left: -300, right: 300 }}
        onDrag={handleDrag}
        onDragEnd={handleDragEnd}
        animate={{
          x: isActive ? dragX : offset * 20,
          scale: isActive
            ? isAtStart || isAtEnd
              ? 0.95
              : 1
            : 0.92 - Math.abs(offset) * 0.05,
          opacity: isActive
            ? isAtStart || isAtEnd
              ? 0.7
              : 1
            : 0.7 - Math.abs(offset) * 0.2,
          rotate: isActive ? 0 : offset * 3,
        }}
        transition={{
          type: "spring",
          stiffness: isAtStart || isAtEnd ? 400 : 300,
          damping: isAtStart || isAtEnd ? 25 : 30,
        }}
        style={{ zIndex }}
        className={`absolute inset-x-6 top-0 h-full p-8 rounded-2xl border backdrop-blur-sm shadow-xl transition-all ${
          theme === "light"
            ? "bg-white/90 border-mg-gold/30"
            : "bg-mg-dark-bg/90 border-mg-gold/40"
        }`}
      >
        <reason.icon size={44} className="text-mg-gold mb-3" />
        <h3
          className={`text-xl font-bold mb-2 ${
            theme === "light" ? "text-mg-light-text" : "text-mg-gold"
          }`}
        >
          {reason.title}
        </h3>
        <p
          className={`text-base ${
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

  {/* Dots */}
  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-50">
    {reasons.map((_, i) => (
      <motion.div
        key={i}
        className={`w-2 h-2 rounded-full transition-all ${
          i === stackIndex ? "bg-mg-gold w-6" : "bg-white/40"
        }`}
        animate={{ scale: i === stackIndex ? 1.3 : 1 }}
      />
    ))}
  </div>
</div>
      </div>
    </section>
  );
};

export default WhyForex;


