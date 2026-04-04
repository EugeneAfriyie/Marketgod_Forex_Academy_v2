// src/components/ExnessPartner/ExnessPartner.tsx
import { motion } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";
import { ArrowRight, Zap, Shield, Globe, Clock, CreditCard } from "lucide-react";

const ExnessPartner = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const features = [
    { icon: Zap, title: "0.0 Pips Spread", text: "Trade Gold & Forex at true market cost." },
    { icon: Shield, title: "Instant Withdrawals", text: "MTN MoMo, Vodafone Cash, Crypto — in seconds." },
    { icon: Clock, title: "24/7 GMT Support", text: "Live chat in English & local languages." },
    { icon: Globe, title: "1:Unlimited Leverage", text: "Grow $100 into real wins with smart risk." },
    { icon: CreditCard, title: "Mobile Money & Crypto", text: "Fund & withdraw from Ghana instantly." },
  ];

  return (
    <section id="exness" className="relative py-32 overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{
          backgroundImage: `url('hps://res.cloudinary.com/dzqdfaghg/image/upload/v1763526791/43981ea6-0bd8-44b8-be03-01a3659c1ac8.png')`,
        }}
      />
      {/* <div className="absolute inset-0 bg-black/70" />
      <div className="absolute inset-0 bg-gradient-to-br from-mg-gold/15 via-transparent to-mg-gold/10" /> */}


      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-7xl font-black tracking-tight mb-6 dark:text-white">
            Trade with <span className="text-mg-gold">Exness</span>
          </h2>
          <p className={`text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed ${isDark ? "text-gray-300" : "text-gray-600"}`}>
            <span className="text-mg-gold font-bold">Marketgod </span> Academy’s Official Broker —  
            Built for Ghana. Trusted by over 2M+ traders worldwide.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-8 mb-16">
          {features.map((feat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.7 }}
              whileHover={{ y: -8 }}
              className={`
                p-8 rounded-3xl border backdrop-blur-xl text-center shadow-2xl transition-all duration-500
                ${isDark 
                  ? "bg-black/70 border-mg-gold/30 hover:border-mg-gold/60 hover:shadow-gold-glow" 
                  : "bg-white/90 border-mg-gold/20 hover:border-mg-gold/50 hover:shadow-gold-glow-light"
                }
              `}
            >
              <feat.icon size={40} className="mx-auto mb-4 text-mg-gold" />
              <h3 className={`text-base font-black mb-2 ${isDark ? "text-white" : "text-black"}`}>
                {feat.title}
              </h3>
              <p className={`text-sm leading-relaxed ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                {feat.text}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className={`
            relative p-4 md:p-12 rounded-3xl border-mg-white/50 border backdrop-blur-xl shadow-2xl text-center max-w-5xl mx-auto
            ${isDark 
              ? "bg-black/80 " 
              : "bg-white/95 "
            }
          `}
        >
          {/* Badge */}
          <div className="absolute -top-7 left-1/2 -translate-x-1/2 px-4 md:px-8 py-3 bg-mg-gold text-black rounded-full text-[.5rem] md:text-sm font-bold uppercase tracking-wider shadow-2xl">
            Exclusive Partner Bonus
          </div>

          <h3 className="text-3xl md:text-4xl font-black mb-6 text-mg-black dark:text-white">
            Open Exness Account via Marketgod
          </h3>

          <p className={`text-lg md:text-xl mb-10 max-w-3xl mx-auto leading-relaxed ${isDark ? "text-gray-300" : "text-gray-700"}`}>
            Get <span className="text-mg-gold font-black">1-Month VIP Signals FREE</span> + 
            <span className="text-mg-gold font-black"> Bonus Credits</span> on first deposit.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            {/* Main CTA */}
            <motion.a
              href="https://one.exnessonelink.com/boarding/sign-up/303589/a/eyram"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.07 }}
              whileTap={{ scale: 0.95 }}
              className={`
                inline-flex items-center gap-4 px-6 md:px-12 py-7 rounded-full font-bold uppercase tracking-widest md:text-xl shadow-2xl
                transition-all duration-500 hover:shadow-gold-glow-lg
                bg-black text-white  
                dark:bg-mg-white dark:text-black dark:hover:bg-white dark:hover:text-black
              `}
            >
              Open Exness Account Now
              <ArrowRight size={28} />
            </motion.a>

            {/* Secondary CTA */}
            <motion.a
              href="/plans/#signals"
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center gap-3 px-8 py-5 rounded-full border-2 dark:border-mg-white  dark:text-mg-white  text-black font-bold uppercase transition-all"
            >
              Learn About VIP Signals
            </motion.a>
          </div>

          <p className={`text-xs mt-8 ${isDark ? "text-gray-500" : "text-gray-600"} font-medium`}>
            Regulated by CySEC, FCA, FSCA • Minimum Deposit: $10 • No Requotes
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ExnessPartner;


