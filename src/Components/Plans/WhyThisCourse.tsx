import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";
import { Check } from "lucide-react";

const highlights = [
  "🎯 The  Marketgod Strategy",
  "📊 How to Build A Personal Trading System From Scratch",
  "👨🏽‍💼 My Proven Risk Management Formula",
  "📚 Real-World Case Studies & Live Breakdowns",
  "📈 The Fast Lane to Forex Independence",
];

const WhyThisCourse: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <section
      className={`py-24 relative overflow-hidden ${
        isDark ? "bg-mg-black" : "bg-mg-light-bg"
      }`}
    >
      {/* PARALLAX GOLD BACKGLOW */}
      <motion.div
        initial={{ opacity: 0.15, y: 0 }}
        animate={{ opacity: 0.25, y: -30 }}
        transition={{ duration: 6, repeat: Infinity, repeatType: "reverse" }}
        className="absolute inset-0 pointer-events-none blur-3xl bg-gradient-to-r from-mg-gold/20 via-transparent to-mg-gold/20"
      />

      <div className="max-w-7xl mx-auto px-6 relative">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 relative inline-block w-full"
        >
          <h2
            className={`text-4xl md:text-5xl font-black mb-4 relative inline-block ${
              isDark ? "text-mg-white" : "text-mg-black"
            }`}
          >
            Why This Course?

  
          </h2>

          <p
            className={`text-lg md:text-xl max-w-3xl mx-auto ${
              isDark ? "text-mg-paper/70" : "text-mg-charcoal/70"
            }`}
          >
            This course is your fast track to mastering Forex trading the
            Marketgod way — with systems, risk management and real breakdowns
            that create actual results.
          </p>
        </motion.div>

        {/* VIDEO + HIGHLIGHTS */}
        <div className="flex flex-col md:flex-row items-center gap-12">

          {/* VIDEO WITH GOLD HOVER PULSE */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full md:w-1/2 relative rounded-3xl overflow-hidden shadow-2xl 
              group transition-all"
          >
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/PDjm4Mpivng?si=5e0drfLjKIxWZlzr"
              className="w-full h-[300px] md:h-[350px] rounded-3xl"
              allowFullScreen
            ></iframe>

            {/* Golden pulse on hover */}
            <div
              className="absolute inset-0 rounded-3xl pointer-events-none 
                bg-gradient-to-r from-mg-gold/10 to-mg-gold/10 opacity-0 
                group-hover:opacity-30 transition-all duration-500"
            />
          </motion.div>

          {/* HIGHLIGHTS */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full md:w-1/2 space-y-6"
          >
            <ul className="space-y-4">
              {highlights.map((item, index) => (
                <motion.li
                  key={index}
                  whileHover={{ y: -4 }}
                  className="flex items-start gap-3 p-3 rounded-xl transition-all
                    hover:shadow-lg hover:shadow-mg-gold/20 
                    hover:bg-mg-gold/5"
                >
                  <Check
                    size={24}
                    className={`mt-1 ${
                      isDark ? "text-mg-green" : "text-mg-green"
                    }`}
                  />
                  <span
                    className={`text-lg md:text-xl ${
                      isDark ? "text-mg-paper/80" : "text-mg-charcoal/80"
                    }`}
                  >
                    {item}
                  </span>
                </motion.li>
              ))}
            </ul>

            {/* CTA WITH LIMITED-BADGE */}
            <div className="flex f  items-center gap-3 mt-6">
              <motion.a
            href="#pricing"
            whileHover={{ scale: 1.06 , boxShadow: "0 0 25px rgba(212,175,55,0.5)" }}
          whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 md:px-8 p-4 py-4 rounded-full font-bold  text-center text-sm lg:text-lg 
            bg-mg-black text-white dark:bg-mg-white dark:text-mg-black shadow-lg hover:shadow-mg-green/40 transition-all"
          >
                Enroll Today
              </motion.a>

              {/* BADGE */}
              <span className="text-xs font-bold px-4 py-2 rounded-full 
                bg-mg-gold/20 text-mg-gold border border-mg-gold/40">
                🔥 Limited Spots available
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* SHIMMER ANIMATION STYLE */}
      <style>
        {`
          .shimmer {
            background: linear-gradient(
              120deg,
              transparent 0%,
              rgba(255, 215, 0, 0.45) 50%,
              transparent 100%
            );
            animation: shine 3s infinite;
            background-size: 200% 100%;
          }

          @keyframes shine {
            0% { background-position: 200% 0; }
            100% { background-position: -200% 0; }
          }
        `}
      </style>
    </section>
  );
};

export default WhyThisCourse;



