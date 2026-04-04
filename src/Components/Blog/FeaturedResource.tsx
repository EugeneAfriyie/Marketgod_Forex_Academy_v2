// src/components/Blog/FeaturedResource.tsx
'use client';

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

interface FeaturedResourceProps {
  resource: {
    title: string;
    description: string;
    image: string;
    link: string;
    cta?: string;
  };
  className?: string;
}

const FeaturedResource: React.FC<FeaturedResourceProps> = ({
  resource,
  className = "",
}) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const { title, description, image, link, cta = "Join Now" } = resource;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className={`relative rounded-3xl overflow-hidden shadow-2xl mb-16 ${className}`}
    >
      {/* Background Image */}
      <div className="relative">
        <img
          src={image}
          alt={title}
          className="w-full h-72 sm:h-96 object-cover"
          loading="lazy"
        />
        {/* Gradient Overlay */}
        <div className={`absolute inset-0 bg-gradient-to-r 
          ${isDark 
            ? "from-mg-black/90 via-mg-black/70 to-transparent" 
            : "from-black/70 via-black/50 to-white/50"
          }`} 
        />
      </div>

      {/* Text Overlay */}
      <div className="absolute inset-0 flex items-center px-6 sm:px-10 md:px-16">
        <div className="max-w-xl">
          {/* Title */}
          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className={`text-2xl sm:text-3xl md:text-4xl font-black leading-tight
              ${isDark ? "text-mg-white" : "text-mg-gold"}`}
          >
            {title}
          </motion.h3>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className={`mt-3 text-sm sm:text-base leading-relaxed
              ${isDark ? "text-mg-paper/80" : "text-mg-white/80"}`}
          >
            {description}
          </motion.p>

          {/* CTA Button */}
          <motion.a
          whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(212,175,55,0.5)" }}
          whileTap={{ scale: 0.95 }}
            href={link}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className={`
              inline-flex items-center gap-2 mt-6 px-6 py-3 rounded-full font-bold text-sm sm:text-base
              transition-all duration-300 hover:scale-105
              ${isDark 
                ? "bg-mg-white text-black " 
                : "bg-mg-white  text-black "
              }
            `}
          >
            {cta} <ArrowRight size={18} />
          </motion.a>
        </div>
      </div>

      {/* Glow Effect */}
      <div className={`absolute inset-0 -z-10 pointer-events-none
        ${isDark 
          ? "bg-[radial-gradient(circle_at_bottom_left,rgba(255,215,0,0.15),transparent_70%)]" 
          : "bg-[radial-gradient(circle_at_bottom_left,rgba(0,255,136,0.10),transparent_70%)]"
        }`}
      />
    </motion.div>
  );
};

export default FeaturedResource;


