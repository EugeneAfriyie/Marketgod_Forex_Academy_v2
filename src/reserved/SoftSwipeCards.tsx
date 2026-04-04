import React, { useState } from "react";
import { motion } from "framer-motion";
import { Brain, Users, Target, Zap } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const points = [
  { icon: Target, title: "Clarity", text: "Understand market structure, not just signals." },
  { icon: Zap, title: "Speed", text: "Learn in months what takes most traders years." },
  { icon: Brain, title: "Discipline", text: "Build consistency and master emotional control." },
  { icon: Users, title: "Community", text: "Grow with traders who push you forward." },
];

const SoftSwipeCards = () => {
  const { theme } = useTheme();
  const [dragX, setDragX] = useState(0);

  const handleTouchMove = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    setDragX(touch.clientX / 50); // small movement, adjust divisor for sensitivity
  };

  const handleTouchEnd = () => setDragX(0);

  return (
    <div className="flex gap-6 overflow-x-auto py-2 lg:grid lg:grid-cols-2 lg:gap-6">
      {points.map((p, i) => (
        <motion.div
          key={i}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          style={{ x: dragX }}
          whileHover={{ scale: 1.05, y: -4 }}
          className={`flex-shrink-0 w-72 lg:w-auto p-5 rounded-2xl border backdrop-blur-sm transition-all cursor-pointer ${
            theme === "light"
              ? "bg-white/80 border-mg-gold/20 shadow-md hover:shadow-gold-glow"
              : "bg-mg-dark-bg/80 border-mg-gold/30 shadow-lg hover:shadow-gold-glow-lg"
          }`}
        >
          <p.icon
            size={36}
            className={`mx-auto mb-3 ${theme === "light" ? "text-mg-gold" : "text-[#00c896]"}`}
          />
          <h3 className={`text-lg font-bold mb-1 ${theme === "light" ? "text-mg-charcoal" : "text-mg-gold"}`}>
            {p.title}
          </h3>
          <p className={`text-sm ${theme === "light" ? "text-mg-light-textSecondary" : "text-mg-dark-textSecondary"}`}>
            {p.text}
          </p>
        </motion.div>
      ))}
    </div>
  );
};

export default SoftSwipeCards;



