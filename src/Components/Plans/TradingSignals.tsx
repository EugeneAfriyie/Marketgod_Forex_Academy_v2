import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { motion } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";
import { Lightbulb, Target, Brain } from "lucide-react"; // icons

const slides = [
  {
    title: "Discipline Over Emotion",
    time: "1",
    icon: Lightbulb,
    desc: "Trading mastery begins with discipline. Strategies alone won’t save you — your mindset and execution determine everything.",
  },
  {
    title: "Simplify Your Approach",
    time: "2",
    icon: Target,
    desc: "Clarity beats complexity. Focus on one pair, one setup, one system — and watch your results transform.",
  },
  {
    title: "Self-Mastery & Patience",
    time: "3",
    icon: Brain,
    desc: "Fix your mindset before fixing your charts. Patience and emotional control are the foundations of consistent profits.",
  },
];

const TradingSignals: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <section
      className={`py-20 md:py-24 relative overflow-hidden ${
        isDark ? "bg-mg-black" : "bg-mg-light-bg"
      }`}
    >
      {/* Soft premium glow */}
      {/* <div className="absolute inset-0 pointer-events-none opacity-20 blur-3xl bg-gradient-to-r from-mg-gold via-transparent to-mg-gold"></div> */}

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14 md:mb-20"
        >
          <h2
            className={`text-3xl md:text-5xl font-extrabold leading-tight mb-4 ${
              isDark ? "text-mg-paper" : "text-mg-black"
            }`}
          >
            Key Trading <span className="text-mg-gold">Lessons</span>
          </h2>
          <p
            className={`text-sm md:text-lg max-w-2xl mx-auto ${
              isDark ? "text-mg-paper/70" : "text-mg-dark-gray/80"
            }`}
          >
            Elevate your discipline, clarity, and emotional control with premium insights rooted in real trading experience.
          </p>
        </motion.div>

        {/* Swipe indicator (mobile only) */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="md:hidden text-center text-xs text-mg-gold mb-4"
        >
          👉 Swipe to explore
        </motion.p>

        {/* Slider */}
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={20}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          breakpoints={{
            380: { slidesPerView: 1.1 },
            480: { slidesPerView: 1.2 },
            640: { slidesPerView: 1.4 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="pb-12"
        >
          {slides.map((slide, index) => {
            const Icon = slide.icon;

            return (
              <SwiperSlide key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  whileHover={{ rotateX: 6, rotateY: -6, scale: 1.02 }}
                  className={`p-5 md:p-8 rounded-3xl shadow-2xl border group transition-all duration-300 backdrop-blur-xl 
                  ${
                    isDark
                      ? "bg-mg-dark-surface/50 border-mg-dark-border hover:border-mg-gold hover:shadow-mg-gold/20"
                      : "bg-mg-light-surface border-mg-light-border hover:border-mg-gold hover:shadow-mg-gold/20"
                  }`}
                >
                  {/* Icon */}
                  <div
                    className={`w-12 h-12 mb-4 flex items-center justify-center rounded-xl border 
                    ${
                      isDark
                        ? "border-mg-gold/30 bg-mg-gold/10"
                        : "border-mg-gold/30 bg-mg-gold/5"
                    }`}
                  >
                    <Icon className="w-6 h-6 text-mg-gold" />
                  </div>

                  {/* Title */}
                  <h3
                    className={`text-xl md:text-2xl font-bold mb-2  transition ${
                      isDark ? "text-mg-paper" : "text-mg-black"
                    }`}
                  >
                    {slide.title}
                  </h3>

                  {/* Time badge */}
                  <span
                    className={`text-xs tracking-wider uppercase mb-4 inline-block px-3 py-1 rounded-full border 
                    ${
                      isDark
                        ? "text-mg-paper/60 border-mg-paper/20"
                        : "text-mg-dark-gray/70 border-mg-dark-gray/20"
                    }`}
                  >
                    {slide.time}
                  </span>

                  {/* Description */}
                  <p
                    className={`text-sm md:text-base leading-relaxed ${
                      isDark ? "text-mg-paper" : "text-mg-charcoal"
                    }`}
                  >
                    {slide.desc}
                  </p>
                </motion.div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
};

export default TradingSignals;



