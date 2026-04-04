// src/Pages/NotFound.tsx
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className={`min-h-screen flex items-center justify-center px-6 ${isDark ? "bg-mg-black" : "bg-mg-light-bg"}`}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className={`text-9xl font-black mb-6 ${isDark ? "text-mg-gold" : "text-mg-charcoal"}`}>
          404
        </h1>
        <p className={`text-2xl mb-8 ${isDark ? "text-mg-paper/80" : "text-mg-charcoal/80"}`}>
          Oops! The market moved, and this page vanished.
        </p>

        <motion.a
          href="/"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center gap-3 px-8 py-4 bg-mg-gold text-mg-charcoal rounded-full font-bold uppercase tracking-wider shadow-xl hover:shadow-2xl transition-all"
        >
          <Home size={20} />
          Back to Home
          <ArrowLeft size={20} className="rotate-180" />
        </motion.a>
      </motion.div>
    </div>
  );
};

export default NotFound;


