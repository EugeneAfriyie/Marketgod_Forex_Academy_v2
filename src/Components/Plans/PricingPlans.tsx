import { motion, useMotionValue, useTransform } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import { Check, Send } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { useState, useRef, useEffect } from "react";

const features = [
  "Gold Strategy",
  "All Currency Strategy",
  "Market Structure",
  "Risk Management & Psychology",
  "1 Year Access to Mentorship",
  "Free Access to VIP Signals",
];

const PricingPlans = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [isRedirecting, setIsRedirecting] = useState(false);
  const redirectTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-50, 50], [15, -15]);
  const rotateY = useTransform(x, [-50, 50], [-15, 15]);
  const glowX = useTransform(x, [-50, 50], [-20, 20]);
  const glowY = useTransform(y, [-50, 50], [-20, 20]);

  const handleJoinClick = () => {
    setIsRedirecting(true);
    redirectTimeoutRef.current = setTimeout(() => {
      window.location.href = "https://t.me/paymarketgodbot";
      setIsRedirecting(false);
    }, 5000); // Wait 5 seconds
  };

  const cancelRedirect = () => {
    if (redirectTimeoutRef.current) {
      clearTimeout(redirectTimeoutRef.current);
    }
    setIsRedirecting(false);
  };

  useEffect(() => {
    return () => {
      if (redirectTimeoutRef.current) {
        clearTimeout(redirectTimeoutRef.current);
      }
    };
  }, []);

  return (
    <section id="pricing-plans" className="py-24 relative">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-4xl md:text-5xl font-black text-mg-black dark:text-mg-white"
        >
          Marketgod Mentorship
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`text-center max-w-2xl mx-auto mt-4 text-lg ${
            isDark ? "text-mg-paper/70" : "text-mg-charcoal/70"
          }`}
        >
          Unlock the full Marketgod Mentorship and gain access to my proven strategies, VIP signals, and one year of guided mentorship.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 flex justify-center relative"
        >
          {/* CONTENT RIGHT WITH 3D TILT */}
          <motion.div
            style={{ rotateX, rotateY }}
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const px = e.clientX - rect.left - rect.width / 2;
              const py = e.clientY - rect.top - rect.height / 2;
              x.set(px / 10);
              y.set(py / 10);
            }}
            onMouseLeave={() => {
              x.set(0);
              y.set(0);
            }}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full max-w-3xl relative bg-gradient-to-br from-white/20 to-white/5 dark:from-mg-charcoal/60 dark:to-mg-charcoal/20 p-8 md:p-12 rounded-3xl backdrop-blur-2xl border border-mg-gold/50 shadow-[0_0_50px_rgba(255,215,0,0.3)] cursor-pointer group"
          >
            {/* Massive Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-mg-gold/10 blur-[80px] rounded-full -z-10 pointer-events-none" />

            {/* LIMITED TAG */}
           {/* LIMITED TAG */}
<motion.div
  initial={{ scale: 1 }}
  whileHover={{ scale: 1.1 }}
  animate={{ scale: [1, 1.05, 1] }}
  transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
  className="absolute -top-4 right-8 bg-gradient-to-r from-mg-gold to-yellow-300 text-black font-black tracking-wider px-6 py-2 rounded-full text-sm z-20 shadow-[0_0_20px_rgba(255,215,0,0.6)] border-2 border-white/20"
>
  LIMITED
</motion.div>


            {/* GLOW */}
            <motion.div
              style={{ x: glowX, y: glowY }}
              className="absolute inset-0 rounded-3xl bg-gradient-to-br from-mg-gold/30 via-mg-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl pointer-events-none"
            />

            <h3 className={`text-xl md:text-4xl font-black ${isDark ? "text-white" : "text-mg-black"}`}>
              Marketgod Mentorship
            </h3>

            <div className="mt-6 flex items-baseline gap-3 relative z-10">
              <span className="text-4xl font-black text-mg-gold">$547</span>
              <span className={`text-2xl font-bold line-through ${isDark ? "text-mg-paper/40" : "text-mg-charcoal/40"}`}>
                $1247
              </span>
            </div>

            <p className={`mt-4 text-lg relative z-10 ${isDark ? "text-mg-paper/80" : "text-mg-charcoal/80"}`}>
              A complete roadmap to trading mastery. This mentorship covers everything from foundational concepts to advanced institutional strategies.
            </p>

            <h4 className="mt-8 mb-4 font-bold text-lg text-mg-gold uppercase tracking-wide relative z-10">
              What you will get:
            </h4>

            <ul className="space-y-4 relative z-10">
              {features.map((feature, i) => (
                <li key={i} className="flex items-center gap-3">
                  <div className="p-1 rounded-full bg-mg-gold/20"><Check className="w-4 h-4 text-mg-gold" /></div>
                  <span className={`${isDark ? "text-mg-paper/80" : "text-mg-charcoal/80"}`}>{feature}</span>
                </li>
              ))}
            </ul>

            <motion.button
              onClick={handleJoinClick}
              whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(212,175,55,0.5)" }}
              whileTap={{ scale: 0.95 }}
              className="block w-full text-center mt-10 py-5 rounded-full font-black text-lg bg-gradient-to-r from-mg-gold to-yellow-500 text-black hover:brightness-110 transition-all relative z-10 shadow-[0_0_20px_rgba(255,215,0,0.4)]"
            >
              Join Marketgod Mentorship
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Redirecting Popup */}
      <AnimatePresence>
        {isRedirecting && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[1000] flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 20, stiffness: 200 }}
              className="flex flex-col items-center gap-4 p-8 rounded-2xl bg-mg-dark-surface border border-mg-gold/50 w-full max-w-sm"
            >
              <Send size={32} className="text-mg-gold" />
              <h3 className="font-bold text-mg-paper text-lg">Redirecting to Telegram...</h3>
              <p className="text-mg-dark-textSecondary text-sm">Please complete your payment securely.</p>
              <button onClick={cancelRedirect} className="mt-4 px-6 py-2 text-xs font-semibold text-mg-paper rounded-full bg-white/10 hover:bg-white/20 transition-colors">
                Cancel
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default PricingPlans;



