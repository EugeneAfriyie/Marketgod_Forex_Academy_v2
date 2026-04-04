import  { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";
import MarketGodQuiz from "./MarketGodQuiz";
import { Zap, ArrowRight } from "lucide-react";

const PromoBanner = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Compact Banner */}
      <section className={`py-10 px-4 rounded-2xl max-w-4xl mx-auto my-8 shadow-lg border ${
        isDark 
          ? "bg-mg-black/50 border-mg-white/20" 
          : "bg-mg-light-surface border-mg-light-border"
      }`}>
        <div className="text-center">
          <h2 className={`text-2xl md:text-3xl font-black mb-3`}>
            <span className={isDark ? "text-mg-paper" : "text-mg-black"}>
              Trade with <span className="text-mg-gold">Marketgod</span>
            </span>
            <span className="block text-mg-gold">For <span className="underline decoration-mg-gold">FREE</span></span>
          </h2>

          <p className={`text-sm md:text-base mb-5 ${isDark ? "text-mg-paper/70" : "text-mg-dark-gray"}`}>
            Live signals + mentorship. No cost. Just qualify.
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setOpen(true)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-mg-black text-white dark:bg-mg-white dark:text-black font-bold text-sm md:text-base rounded-full shadow-md hover:shadow-mg-gold/50 transition-all"
          >
            <Zap size={18} />
            Check If You Qualify
            <ArrowRight size={18} />
          </motion.button>
        </div>
      </section>

      {/* Lean Modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/60"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className={`relative w-full max-w-md max-h-[85vh] overflow-y-auto rounded-2xl p-5 shadow-2xl ${
                isDark ? "bg-mg-charcoal border border-mg-gold/30" : "bg-white border border-yellow-400/30"
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setOpen(false)}
                className="absolute top-3 right-3 p-1.5 rounded-full bg-mg-dark-surface/50 hover:bg-mg-dark-surface text-mg-paper/70 hover:text-white transition"
              >
                X
              </button>

              <MarketGodQuiz />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PromoBanner;


