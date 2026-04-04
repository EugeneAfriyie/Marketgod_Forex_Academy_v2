// src/components/MarketGodQuotes/MarketGodQuotes.tsx
import  { useState, useEffect } from "react";
import { motion, AnimatePresence,  } from "framer-motion";
import type { PanInfo } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";

interface Quote {
  text: string;
  name: string;
  role: string;
  img?: string;
}

const quotes: Quote[] = [
  {
    text: "Discipline is the bridge between goals and achievement.",
    img :"https://res.cloudinary.com/dzqdfaghg/image/upload/v1763522352/SnapInsta.to_511469271_18512807728003421_2788928110292631837_n_shzro3.jpg",
    name : "Eyram Dela - The Marketgod",
    role: "Founder, Marketgod Academy"
  },
  {
    text: "Patience and consistency beat emotions and impulsiveness.",
    role: "Senior Mentor",
    name: "Reuben Donasei",
    img:"https://res.cloudinary.com/dzqdfaghg/image/upload/v1763528538/55805e4a-88cd-4d12-ba4f-67e5bb9b119d.png",
  },
  {
    text: "Trade with a plan, not a hope.",
    role: "Founder, Marketgod Academy",
      img :"https://res.cloudinary.com/dzqdfaghg/image/upload/v1763522352/SnapInsta.to_511469271_18512807728003421_2788928110292631837_n_shzro3.jpg",
    name : "Eyram Dela - The Marketgod",
  },
  {
    text: "Every loss is a lesson. Every win is confirmation.",
   role: "Founder, Marketgod Academy",
      img :"https://res.cloudinary.com/dzqdfaghg/image/upload/v1763522352/SnapInsta.to_511469271_18512807728003421_2788928110292631837_n_shzro3.jpg",
    name : "Eyram Dela - The Marketgod",
  },
  {
    text: "Risk management is the difference between success and failure.",
     role: "Founder, Marketgod Academy",
      img :"https://res.cloudinary.com/dzqdfaghg/image/upload/v1763522352/SnapInsta.to_511469271_18512807728003421_2788928110292631837_n_shzro3.jpg",
    name : "Eyram Dela - The Marketgod",
  },
  {
    text: "Consistency compounds like interest. Trade smart, not often.",
    role: "Founder, Marketgod Academy",
      img :"https://res.cloudinary.com/dzqdfaghg/image/upload/v1763522352/SnapInsta.to_511469271_18512807728003421_2788928110292631837_n_shzro3.jpg",
    name : "Eyram Dela - The Marketgod",
  },
];

const swipeConfidenceThreshold = 10000; // threshold for swipe power
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

const MarketGodQuotes = () => {
  const { theme } = useTheme();
  const [current, setCurrent] = useState(0);

  const nextQuote = () => setCurrent((prev) => (prev + 1) % quotes.length);
  const prevQuote = () =>
    setCurrent((prev) => (prev - 1 + quotes.length) % quotes.length);

  // Auto-scroll every 6 seconds
  useEffect(() => {
    const interval = setInterval(nextQuote, 6000);
    return () => clearInterval(interval);
  }, []);

  const handleDragEnd = (_: any, info: PanInfo) => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;

    if (swipePower(offset, velocity) > swipeConfidenceThreshold) {
      offset < 0 ? nextQuote() : prevQuote();
    }
  };

  return (
    <section className="relative py-20 bg-gradient-to-b from-transparent to-mg-gold/5 overflow-hidden">
      <div className="max-w-5xl mx-auto px-6">

<div className="text-center mb-16 max-w-3xl mx-auto">
  {/* Title */}
  <motion.h2
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, ease: "easeOut" }}
    viewport={{ once: true }}
    className="text-3xl md:text-5xl font-black tracking-tight text-mg-black dark:text-mg-white capitalize relative inline-block pb-3"
  >
    Wisdom That Shapes Traders

    {/* Golden underline */}
    <span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-16 h-1 bg-gradient-to-r from-mg-gold to-mg-gold/40 rounded-full"></span>
  </motion.h2>

  {/* Description */}
  <motion.p
    initial={{ opacity: 0, y: 15 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
    viewport={{ once: true }}
    className={`mt-4 text-base md:text-lg leading-relaxed ${
      theme === "light"
        ? "text-mg-light-textSecondary"
        : "text-mg-paper/70"
    }`}
  >
    Insights, principles, and trading philosophy from the Marketgod Academy —
    crafted to guide you toward discipline, consistency, and mastery in the markets.
  </motion.p>
</div>

        <div className="relative flex flex-col md:flex-row items-center bg-white/90 dark:bg-mg-dark-bg/80 backdrop-blur-lg rounded-3xl shadow-xl overflow-hidden">
          {/* Left: Author Image */}
          <div className="md:w-1/3 w-full flex justify-center md:justify-start p-6">
            <img
              src={quotes[current].img}
              alt={quotes[current].name}
              className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-mg-gold shadow-lg"
            />
          </div>

          {/* Right: Quote Text */}
          <div className="md:w-2/3 w-full p-6 flex flex-col justify-center text-center md:text-left">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={handleDragEnd}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.6 }}
              >
                <p
                  className={`text-xl md:text-2xl font-semibold mb-3 ${
                    theme === "light" ? "text-mg-light-text" : "text-mg-paper"
                  }`}
                >
                  “{quotes[current].text}”
                </p>
                <p className="text-lg font-bold text-mg-black dark:text-mg-white block">
                  — {quotes[current].name}
                </p>
                <span
                  className={`text-sm font-medium text-mg-gold `}
                >
                  {quotes[current].role}
                </span>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Dots */}
            <div className="mt-6 flex justify-center md:justify-start gap-3">
              {quotes.map((_, i) => (
                <button
                aria-label="Go to quote"
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-3 h-3 rounded-full transition ${
                    i === current
                      ? "bg-mg-gold"
                      : "bg-mg-gold/40 hover:bg-mg-gold/70"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Optional Swipe Buttons for Desktop */}
        <div className="hidden md:flex justify-between mt-6">
          <button
            onClick={prevQuote}
            className="px-4 py-2 rounded-full bg-mg-gold/20 hover:bg-mg-gold/40 text-mg-gold font-bold"
          >
            Prev
          </button>
          <button
            onClick={nextQuote}
            className="px-4 py-2 rounded-full bg-mg-gold/20 hover:bg-mg-gold/40 text-mg-gold font-bold"
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
};

export default MarketGodQuotes;



