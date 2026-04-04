// src/components/Hero/Hero.tsx
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, TrendingUp, ArrowRight } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const Hero = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      const rect = document.body.getBoundingClientRect();
      setMousePos({
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100,
      });
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const timeString = currentTime.toLocaleTimeString("en-GB", {
    timeZone: "GMT",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">

      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://res.cloudinary.com/dzqdfaghg/image/upload/v1763522350/SnapInsta.to_285991748_3240193386223050_1023995396682830775_n_j2rm79.jpg')",
        }}
      />
      <div className="absolute inset-0 bg-black/80" />

      {/* Mouse-Following Gold Glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: `radial-gradient(600px circle at ${mousePos.x}% ${mousePos.y}%, rgba(212,175,55,0.25), transparent 50%)`,
        }}
        transition={{ type: "tween", ease: "easeOut" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        {/* Live GMT Clock */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-4 bg-white/10 backdrop-blur-xl border border-mg-gold/30 rounded-full px-8 py-4 text-mg-gold font-bold text-lg tracking-wider shadow-2xl mb-10"
        >
          <span className="animate-pulse">●</span>
          Accra, Ghana • GMT • {timeString}
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-5xl md:text-8xl font-black tracking-tight leading-tight mb-8"
        >
          Learn to Trade <br />
          <span className="text-mg-gold text-6xl md:text-9xl">Professionally</span>
        </motion.h1>

        <motion.h3
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-2xl md:text-4xl font-bold text-white/90 mb-10"
        >
          Structured Mentorship. Practical Skills.
        </motion.h3>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-lg md:text-2xl text-gray-300 max-w-4xl mx-auto mb-16 leading-relaxed"
        >
          Gain access to clear, actionable strategies and guidance from experienced traders.  
          Build consistent trading skills through practical lessons and structured mentorship.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
        >
          <motion.a
            href="/plans#pricing-plans"
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 0.95 }}
            className={`
              inline-flex items-center gap-4 px-12 py-7 rounded-full font-black text-2xl shadow-2xl transition-all duration-500 hover:shadow-gold-glow-lg
              bg-black text-white hover:bg-mg-gold hover:text-black
              dark:bg-mg-gold dark:text-black dark:hover:bg-white dark:hover:text-black
            `}
          >
            Start Learning Now
            <BookOpen size={32} />
          </motion.a>

          <motion.a
            href="/programs"
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center gap-3 px-10 py-6 rounded-full border-4 border-mg-gold text-mg-gold hover:bg-mg-gold hover:text-black font-bold text-xl transition-all"
          >
            View All Programs
            <TrendingUp size={28} />
          </motion.a>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 15, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <div className="w-8 h-14 border-4 border-mg-gold/50 rounded-full flex justify-center">
          <motion.div
            className="w-2 h-6 bg-mg-gold rounded-full mt-3"
            animate={{ y: [0, 20, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;


