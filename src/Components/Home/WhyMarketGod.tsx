// src/components/Home/WhyMarketGod.tsx
import { motion } from "framer-motion";
import { Shield, TrendingUp, Brain, Users, Globe, Zap } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

const features = [
  {
    icon: Globe,
    title: "Global Access, African Excellence",
    desc: "Trade global markets confidently — powered by strategy, discipline, and a world-class Ghanaian foundation.",
  },
  {
    icon: Shield,
    title: "Trusted by Professionals",
    desc: "Learn under the mentorship of Eyram Dela — Ghana’s respected trading voice shaping traders across continents.",
  },
  {
    icon: TrendingUp,
    title: "Built for Growth & Consistency",
    desc: "We focus on mastery, not hype. Our programs are designed to grow traders — one skill, one mindset, one milestone at a time.",
  },
  {
    icon: Brain,
    title: "Institutional Trading Insight",
    desc: "Gain clarity into how banks and institutions think — liquidity, timing, and precision behind every market move.",
  },
  {
    icon: Users,
    title: "A Global Trader Community",
    desc: "Join 10,000+ traders in our Academy network — united by discipline, results, and a shared pursuit of excellence.",
  },
  {
    icon: Zap,
    title: "Aligned with the World’s Market Clock",
    desc: "Our sessions follow GMT — the global heartbeat of financial markets. Trade and learn in real time.",
  },
];

const WhyMarketGod = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
   <section
  id="why-marketgod"
  className={`relative overflow-hidden py-32 transition-all duration-700 ${
    isDark ? "bg-mg-dark-bg text-white" : "bg-mg-light-bg text-black"
  }`}
>
  {/* MASTER IN-VIEW CONTAINER — This does the magic */}
  <motion.div
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 1.2, ease: "easeOut" }}
    className="relative z-10"
  >
    {/* ← Put ALL your existing content (video, header, grid, etc.) inside this motion.div */}
    {/* Background Video */}
    <video className="absolute inset-0 w-full h-full object-cover opacity-10" autoPlay loop muted playsInline>
      <source src="h://res.cloudinary.com/dzqdfaghg/video/upload/v1763522358/SnapInsta.to_AQP0tcL1lrqBV9tJmnWw2gz7dabRB843S2VJqC_RVgoV48eubGC22GfznUeiLS9vIhAjtapLVa3fDJAutZzyhNk7mwedL4JKUMyshm8_aod3wo.mp4" type="video/mp4" />
    </video>

    {/* Gold Glow Overlay — now animated */}
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 2, ease: "easeOut" }}
      className="absolute inset-0 bg-gradient-to-br from-mg-gold/5 via-transparent to-mg-gold/5"
    />

    {/* Header — elegant fade-up + gold text reveal */}
   {/* HEADER + DESCRIPTION + CTA */}
<div className="relative z-10 text-center max-w-4xl mx-auto px-6 mb-20">
  {/* Headline */}
  <motion.h2
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 1, ease: "easeOut" }}
    className="text-5xl md:text-7xl font-black leading-tight"
  >
    Why Choose <span className="text-mg-gold">Marketgod</span> Academy
  </motion.h2>

  {/* Description */}
  <motion.p
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
    className={`mt-8 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto ${
      isDark ? "text-mg-dark-textSecondary" : "text-mg-light-textSecondary"
    }`}
  >
    Marketgod Academy isn’t just a trading school — it’s a legacy.  
    Founded in <span className="text-mg-gold font-bold">Ghana</span>, built for traders across the globe.  
    We combine education, mindset, and market precision to help you trade like a professional — from anywhere.
  </motion.p>

  {/* CTA Button - with subtle scale + glow */}
  <motion.div
    initial={{ opacity: 0, y: 40, scale: 0.9 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
    className="mt-12 inline-block"
  >
    <motion.a
      href="/plans/#pricing"
      whileHover={{ scale: 1.07, boxShadow: "0 0 40px rgba(212, 175, 55, 0.6)" }}
      whileTap={{ scale: 0.98 }}
      className={`
        inline-flex items-center gap-3 px-12 py-5 rounded-full font-bold uppercase tracking-wider shadow-xl
        transition-all duration-500 hover:shadow-gold-glow-lg
        bg-black text-white 
        dark:bg-mg-white dark:text-black 
      `}
    >
      Join The Academy <Globe size={24} />
    </motion.a>
  </motion.div>
</div>

    {/* Feature Grid — staggered elegant entrance */}
    <div className="relative z-10 max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-10 px-6">
  {features.map((f, i) => (
    <motion.div
      key={i}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 0.8,
        delay: i * 0.15,        // beautiful stagger
        ease: [0.22, 1, 0.36, 1], // smooth "easeOutCubic"-like
      }}
      whileHover={{ 
        y: -12,
        transition: { duration: 0.4 }
      }}
      className={`
        group relative p-8 rounded-3xl border overflow-hidden
        backdrop-blur-xl transition-all duration-500 cursor-default
        ${isDark 
          ? "bg-mg-dark-surface/80 border-mg-gold/20 hover:border-mg-gold/50 hover:shadow-mg-white/20 hover:shadow-lg" 
          : "bg-white/90 border-mg-gold/10 hover:border-mg-gold/30 hover:shadow-lg"
        }
      `}
    >
      {/* Number */}
      <div className={`absolute top-4 right-6 text-7xl font-black opacity-10 ${isDark ? "text-white" : "text-black"}  select-none`}>
        {(i + 1).toString().padStart(2, "0")}
      </div>

      <div className="relative z-10 flex flex-col items-start space-y-5">
        <motion.div 
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ duration: 0.4 }}
          className={`p-4 rounded-2xl ${isDark ? "bg-mg-white/10 " : "bg-mg-black/10 "}`}
        >
          <f.icon size={32} className="text-mg-gold/70" />
        </motion.div>
        <h3 className={`text-xl font-bold ${isDark ? "text-white" : "text-black"}`}>
          {f.title}
        </h3>
        <p className={`text-sm leading-relaxed ${isDark ? "text-mg-dark-textSecondary" : "text-mg-light-textSecondary"}`}>
          {f.desc}
        </p>
      </div>
    </motion.div>
  ))}
</div>
  </motion.div>

  {/* Bottom Glow */}
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 2, ease: "easeOut" }}
    className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-mg-gold/5 rounded-full blur-3xl"
  />
</section>
  );
};

export default WhyMarketGod;


