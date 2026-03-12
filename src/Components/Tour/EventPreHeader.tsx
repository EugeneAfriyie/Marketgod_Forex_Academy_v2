import { motion } from "framer-motion";
import { useState } from "react";
import { Check } from "lucide-react";

const tourDates = [
  { city: "Ho", date: "21 Feb" },
  { city: "Takoradi", date: "7 Mar" },
  { city: "Kumasi", date: "21 Mar" },
  { city: "Tamale", date: "28 Mar" },
  { city: "Koforidua", date: "11 Apr" },
  { city: "Techiman", date: "25 Apr" },
];

const firstUpcoming = 2;

export default function EventPreHeader() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full bg-mg-black py-1.5 px-3 shadow-lg fex justify-center overflow-hidden relative z-[40]"
    >
      
        {/* CLOSE BUTTON */}
       <div className="flex justify-end">
         <button
          onClick={() => setVisible(false)}
          className=" text-mg-white hover:text-mg-gold transition-colors duration-300 text-[.5rem] sm:text-base border border-transparent hover:border-mg-gold rounded-full p-1 focus:outline-none focus:ring-2 focus:ring-mg-gold focus:ring-offset-2 "
          aria-label="Close banner"
        >
          ✕
        </button>
       </div>

      <div className="max-w-7xl w-full flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-6 relative">

        {/* LEFT SECTION */}
        <div className="flex items-center justify-between gap-2 w-full lg:w-auto">
          <div className="bg-mg-gold text-mg-black font-bold text-[0.55rem] sm:text-sm px-3 py-1 rounded-full shadow-gold-glow uppercase">
            Marketgod 2026 Tour
          </div>

           {/* CTA */}
        <div className="flex-shrink-0  lg:hidden">
          <motion.a
            href="https://mainstack.com/s/marketgod"
            className="relative overflow-hidden px-2 py-1 rounded-full font-bold uppercase tracking-wide text-[.5rem] flex items-center justify-center shadow-lg bg-mg-gold text-mg-black"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 25px rgba(212,175,55,0.5)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            Reserve Spot Now
          </motion.a>
        </div>

          
        </div>

        {/* TOUR DATES */}
        <div className="relative flex-1 overflow-hidden min-h-[24px] sm:min-h-[30px]">
          <motion.div
            className="flex gap-3 whitespace-nowrap"
            animate={{ x: ["0%", "-100%"] }}
            transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          >
            {tourDates.concat(tourDates).map((item, index) => {
              const isCompleted = index % tourDates.length < firstUpcoming;
              return (
                <div
                  key={index}
                  className={`flex-shrink-0 border rounded-full px-3 py-1 text-[0.6rem] sm:text-sm font-medium flex items-center gap-1 transition-all duration-300 ${
                    isCompleted ? "border-mg-dark-border text-mg-dark-textSecondary" : "border-mg-gold text-mg-white shadow-gold-glow"
                  }`}
                >
                  {isCompleted && <Check size={12} className="text-mg-gold" />}
                  {item.city} — {item.date}
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* CTA */}
        <div className="flex-shrink-0 hidden lg:flex">
          <motion.a
            href="https://mainstack.com/s/marketgod"
            className="relative overflow-hidden px-4 py-2 rounded-full font-bold uppercase tracking-wide text-xs flex items-center justify-center shadow-lg bg-mg-gold text-mg-black"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 25px rgba(212,175,55,0.5)",
            }}
            whileTap={{ scale: 0.95 }}
          >
           Reserve
          </motion.a>
        </div>

      </div>
    </motion.div>
  );
}