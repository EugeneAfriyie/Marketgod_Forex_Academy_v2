// src/components/WhyMentorshipMatters/WhyMentorshipMatters.tsx
import { motion } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";
import { Brain, Users, Target, Zap, ArrowRight } from "lucide-react";

const WhyMentorshipMatters = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const points = [
    { icon: Target, title: "Clarity", text: "Understand market structure, not just signals." },
    { icon: Zap, title: "Speed", text: "Learn in months what takes most traders years." },
    { icon: Brain, title: "Discipline", text: "Build consistency and master emotional control." },
    { icon: Users, title: "Community", text: "Grow with traders who push you forward." },
  ];

  return (
    <section className={`relative py-32 overflow-hidden ${isDark ? "bg-black" : "bg-mg-light-bg"}`}>
      {/* Subtle Gold Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-mg-gold/10 via-transparent to-mg-gold/5 pointer-events-none" />
      
      

      <div className="relative z-10 max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        {/* LEFT: Image */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="order-2 lg:order-1"
        >
          <img
            src="https://res.cloudinary.com/dzqdfaghg/image/upload/v1763522350/SnapInsta.to_475855951_18485769310003421_2639630250731726422_n_ov7o6i.jpg"
            alt="Marketgod Mentorship"
            className="rounded-3xl shadow-2xl w-full object-cover border-8 border-mg-gold/20"
          />
        </motion.div>

        {/* RIGHT: Content */}
        <div className="order-1 lg:order-2 text-center lg:text-left">
          {/* Header */}
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="text-5xl md:text-7xl font-black leading-tight mb-8 dark:text-white"
          >
            Why <span className="text-mg-gold">Mentorship</span> Matters
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className={`text-lg md:text-xl mb-12 max-w-2xl ${isDark ? "text-gray-300" : "text-gray-600"} leading-relaxed`}
          >
            Trading alone costs you time, money, and confidence.  
            Mentorship gives you direction — the kind that turns confusion into clarity and losses into lessons.
          </motion.p>

          {/* Points Grid */}
          <div className="grid sm:grid-cols-2 gap-8 mb-12">
            {points.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.7 }}
                whileHover={{ y: -8, scale: 1.03 }}
                className={`
                  p-8 rounded-3xl  backdrop-blur-xl transition-all duration-500
                  ${isDark 
                    ? "bg-mg-dark-surface/70 bordermg-gold/30 hover:border-mg-gold/60 shadow-lg" 
                    : "bg-white/90 border-mg-god/20 hover:border-mg-gold/40 hover:shadow-gold-glow-light"
                  }
                `}
              >
                {/* Number Circle */}
                <div className="absolute top-5 right-4 w-12 h-12 rounded-full text-2xl opacity-55 dark:text-white  font-black  mb-5 ">
                  {(i + 1).toString().padStart(2, "0")}
                </div>

                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-xl bg-mg-gold/10">
                    <p.icon size={28} className="text-mg-gold" />
                  </div>
                  <h3 className={`text-2xl font-bold ${isDark ? "text-white" : "text-black"}`}>
                    {p.title}
                  </h3>
                </div>

                <p className={`text-base leading-relaxed ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                  {p.text}
                </p>
              </motion.div>
            ))}
          </div>

          {/* CTA Button — Now PERFECT in both modes */}
          <motion.a
            href="/plans/#pricing"
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 0.95 }}
            className={`
              inline-flex items-center gap-4 px-5 md:px-10 py-6 rounded-full font-bold uppercase tracking-wider text-sm md:text-lg shadow-2xl
              transition-all duration-500 hover:shadow-gold-glow-lg
              bg-black text-white 
              dark:bg-mg-white dark:text-black dark:hover:bg-white dark:hover:text-black
            `}
          >
            Start Your Mentorship Journey
            <ArrowRight size={24} />
          </motion.a>
        </div>
      </div>
    </section>
  );
};

export default WhyMentorshipMatters;


