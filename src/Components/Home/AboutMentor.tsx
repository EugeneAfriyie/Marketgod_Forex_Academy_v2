// src/components/About/AboutMentor.tsx
import { useState, useRef, useEffect } from "react";
import { motion, useInView, animate } from "framer-motion";
// import { useTheme } from "../../context/ThemeContext";
import { 
  Users, 
  Award, 
  Zap, 
  TrendingUp, 
  ArrowRight, 
  ChevronDown, 
  ChevronUp, 
  GraduationCap 
} from "lucide-react";
import CommunityModal from "./CommunityModal";

const AnimatedCounter = ({ to }: { to: number }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });

  useEffect(() => {
    if (isInView && ref.current) {
      const controls = animate(0, to, {
        duration: 2,
        onUpdate(value) {
          if (ref.current) {
            ref.current.textContent = Math.round(value).toLocaleString();
          }
        },
      });
      return () => controls.stop();
    }
  }, [isInView, to]);

  return (
    <span ref={ref} className="font-black">
      0
    </span>
  );
};

const AboutMentor = () => {
  const [isExpanded, setIsExpanded] = useState(false);
    const [open, setOpen] = useState(false);
  

  const stats = [
    { icon: Users, value: 10000, suffix: "+", label: "Active Traders" },
    { icon: Award, value: 87, suffix: "%", label: "Win Rate" },
    { icon: Zap, value: "24/7", label: "Live Alerts" }, // This is not a number, so it won't be animated
    { icon: TrendingUp, value: 5, suffix: "+", label: "Years of Mastery" },
  ];

  return (
    <>
    <section id="about" className="py-20 relative overflow-hidden">
      {/* Subtle Background Gradient */}
      <div className="absolute inset-0 opacity-5 bg-gradient-to-br from-mg-gold/10 via-transparent to-mg-gold/5" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-4 text-mg-light-text dark:text-mg-dark-text">
            Meet the <span className="text-mg-gold">Marketgod</span>
          </h2>
          <p className="text-xl md:text-2xl max-w-2xl mx-auto text-mg-light-textSecondary dark:text-mg-dark-textSecondary">
            Empowering traders worldwide with pure price action mastery — no AI, no bots, just discipline and results.
          </p>
        </motion.div>

        {/* Founder Bio */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          transition={{ staggerChildren: 0.2 }}
          className="grid md:grid-cols-2 gap-12 items-center mb-16"
        >
          {/* Image */}
          <motion.div className="order-2 md:order-1" variants={{ hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1 } }} transition={{ duration: 0.7 }}>
            <img
              src="https://res.cloudinary.com/dzqdfaghg/image/upload/v1763522352/SnapInsta.to_511469271_18512807728003421_2788928110292631837_n_shzro3.jpg"
              alt="Eyram Dela - The Marketgod"
              className="w-full h-96 object-cover rounded-3xl shadow-2xl border-4 border-mg-gold/30"
            />
          </motion.div>

          {/* Text */}
          <motion.div className="space-y-6 order-1 md:order-2" variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}>
            <motion.h3 variants={{ hidden: { opacity: 0, x: -30 }, visible: { opacity: 1, x: 0 } }} className="text-3xl font-bold text-mg-light-text dark:text-mg-dark-text">
              Eyram Dela – The Marketgod
            </motion.h3>

            <motion.p variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="text-lg leading-relaxed text-mg-light-text dark:text-mg-dark-text">
              Renowned Ghanaian forex trader, mentor, and digital entrepreneur. With a sharp eye for market trends and a passion for teaching, Eyram has empowered thousands of traders across Africa to master the markets with precision and confidence — using only price action, institutional order flow, and unbreakable discipline.
            </motion.p>

            {/* Expandable Content */}
            <motion.div
              initial={false}
              animate={{ height: isExpanded ? "auto" : 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <p className="text-lg leading-relaxed mt-4 text-mg-light-text dark:text-mg-dark-text">
                From humble beginnings in Accra, Eyram turned his passion into a proven system. He’s traded live in front of thousands, built the <span className="font-bold text-mg-gold">Marketgod Strategy</span>, and now teaches it step-by-step. His mission? To prove that <span className="font-bold text-mg-gold">Ghanaian traders can dominate global markets</span> — without AI, without shortcuts.
              </p>
              <p className="text-lg italic mt-4 text-mg-light-textSecondary dark:text-mg-dark-textSecondary">
                “I don’t sell dreams. I sell results.”
              </p>
            </motion.div>

            <motion.p variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="text-lg italic text-mg-light-textSecondary dark:text-mg-dark-textSecondary">
              "Not for cry babies. Built for traders who want to WIN."
            </motion.p>

            {/* Buttons */}
            <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="flex flex-col sm:flex-row gap-3 mt-6">
              <motion.button
                onClick={() => setIsExpanded(!isExpanded)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold uppercase tracking-wide border-2 transition-all border-mg-gold text-mg-gold hover:bg-mg-gold/10"
              >
                {isExpanded ? (
                  <>See Less <ChevronUp size={20} /></>
                ) : (
                  <>See More <ChevronDown size={20} /></>
                )}
              </motion.button>

              <motion.button
                
                onClick={() => setOpen(true)}
                whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(212,175,55,0.5)" }}
          whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold uppercase tracking-wide transition-all bg-mg-black text-mg-paper dark:bg-mg-paper dark:text-mg-black"
              >
                Meet Eyram <ArrowRight size={20} />
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Mission & Who It's For */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          className="grid md:grid-cols-2 gap-12 text-center"
          transition={{ staggerChildren: 0.2 }}
        >
          {/* Mission */}
          <motion.div variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }} className="space-y-6">
            <h3 className="text-2xl font-bold text-mg-light-text dark:text-mg-dark-text">
              Our Mission
            </h3>
           <p className="text-lg text-mg-light-text dark:text-mg-dark-text">
  Our mission is to connect ambition with global financial markets. We provide traders worldwide with a structured, skill-based education grounded in price action, risk management, and psychological discipline, supporting sustainable participation and long-term financial independence through real trading.
</p>

            <div className="flex justify-center">
              <div className="w-24 h-1 bg-mg-gold"></div>
            </div>
          </motion.div>

          {/* Who It's For */}
          <motion.div variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }} className="space-y-6">
            <h3 className="text-2xl font-bold text-mg-light-text dark:text-mg-dark-text">
              Who It's For
            </h3>
            <ul className="text-left space-y-4 max-w-md mx-auto">
              {[
                { icon: Award, text: "Beginners seeking structure in a fast-paced economy" },
                { icon: Users, text: "Side hustlers and entrepreneurs building wealth" },
                { icon: GraduationCap, text: "Students and young professionals starting early" },
                { icon: Zap, text: "Intermediate traders needing discipline and consistency" },
              ].map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0, transition: { delay: i * 0.1 } }}
                  viewport={{ once: false }}
                  className="flex items-center gap-3 text-mg-light-text dark:text-mg-dark-text"
                >
                  <item.icon size={20} className="text-mg-gold flex-shrink-0" />
                  <span>{item.text}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          transition={{ staggerChildren: 0.15 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 pt-16 border-t border-mg-gold/20"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              whileHover={{ y: -6, scale: 1.05 }}
              className="text-center group"
            >
              <div className="flex justify-center mb-3">
                <div className="p-3 rounded-full bg-mg-gold/10 group-hover:bg-mg-gold/20 transition-all">
                  <stat.icon size={24} className="text-mg-gold" />
                </div>
              </div>
              <div className="text-3xl md:text-4xl font-black mb-1 text-mg-light-text dark:text-mg-dark-text">
                {typeof stat.value === 'number' ? (
                  <><AnimatedCounter to={stat.value} />{stat.suffix}</>
                ) : (
                  stat.value
                )}
              </div>
              <div className="text-sm uppercase tracking-widest text-mg-light-textSecondary dark:text-mg-dark-text">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>

         <CommunityModal open={open} onClose={() => setOpen(false)} />
   
    </>

  );
};

export default AboutMentor;


