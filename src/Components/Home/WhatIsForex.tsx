// Eugene Afriyie UEB3502023
// src/components/WhatIsForex/WhatIsForex.tsx

import { motion } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";
import { Globe, TrendingUp, Clock, Users, Shield, ArrowRight } from "lucide-react";

const WhatIsForex = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const gold = isDark ? "text-yellow-400" : "text-yellow-600"; // minimal gold

  const facts = [
    { icon: Globe, title: "World’s Largest Market", text: "Over $7.5 trillion traded daily — larger than all global stock markets combined." },
    { icon: TrendingUp, title: "24/5 Trading", text: "A global market open across all time zones from Monday to Friday." },
    { icon: Clock, title: "High Liquidity", text: "Instant buying and selling with fast order execution." },
    { icon: Users, title: "Open to Everyone", text: "No degree or background required. Accessible worldwide." },
    { icon: Shield, title: "Trade Both Directions", text: "Opportunities whether prices rise or fall." },
  ];

  return (
    <section
      id="what-is-forex"
      className={`py-24 relative overflow-hidden ${
        isDark ? "bg-black text-white" : "bg-white text-gray-900"
      }`}
    >
      <div className="relative max-w-7xl mx-auto px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: false, amount: 0.3 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">
            What is <span className={gold}>Forex?</span>
          </h2>
          <div className={`w-16 h-1 mx-auto rounded-full mb-6 ${isDark ? "bg-yellow-400" : "bg-yellow-600"}`}></div>

          <p className={`text-xl md:text-2xl max-w-3xl mx-auto ${isDark ? "text-gray-300/80" : "text-gray-700/80"}`}>
            The global foreign exchange market where currencies are bought, sold, and exchanged worldwide.
          </p>
        </motion.div>

        {/* Facts Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {facts.slice(0, 3).map((fact, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -8, scale: 1.03 }}
              className={`p-8 rounded-3xl border text-center transition-shadow duration-300 ${
                isDark
                  ? "bg-white/5 border-gray-700 shadow-lg shadow-gray-500/30"
                  : "bg-gray-50 border-gray-200 shadow-lg"
              }`}
            >
              <fact.icon size={48} className={`   mx-auto mb-4 opacity-80`} />
              <h3 className="text-xl font-semibold mb-2">{fact.title}</h3>
              <p className={`${isDark ? "text-gray-400" : "text-gray-700"} text-sm`}>
                {fact.text}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {facts.slice(3).map((fact, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -8, scale: 1.03 }}
              className={`p-8 rounded-3xl border text-center transition-shadow duration-300 ${
                isDark
                  ? "bg-white/5 border-gray-700 shadow-lg shadow-gray-500/30"
                  : "bg-gray-50 border-gray-200 shadow-lg"
              }`}
            >
              <fact.icon size={48} className={` mx-auto mb-4 opacity-80`} />
              <h3 className="text-xl font-semibold mb-2">{fact.title}</h3>
              <p className={`${isDark ? "text-gray-400" : "text-gray-700"} text-sm`}>
                {fact.text}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1, transition: { delay: 0.2, duration: 0.5 } }}
          viewport={{ once: false, amount: 0.5 }}
          className="text-center"
        >
          <motion.a
            target="_blank"
            href="https://youtu.be/TDDPHx9G8dQ?si=xjj96erjV7wemjga"
            whileHover={{ scale: 1.05,  boxShadow: "0 0 25px rgba(212,175,55,0.5)" }}
            whileTap={{ scale: 0.95 }}
            className={`inline-flex items-center gap-3 px-10 py-4 rounded-full font-semibold tracking-wide border transition-all
              ${isDark ? "bg-mg-white text-mg-black " 
                       : "bg-mg-black text-mg-white hover:bg-yellow-600 hover:text-white"}
            `}
          >
            Watch Intro Video <ArrowRight size={22} />
          </motion.a>
          <p className={`${isDark ? "text-gray-400" : "text-gray-600"} text-sm mt-4`}>
            A clear, beginner-friendly explanation of how Forex works.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default WhatIsForex;



