// src/components/About/AboutVisionMissionValues.tsx
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView, animate } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";
import { Eye, Target, HeartHandshake, Trophy,  X, ChevronRight, Instagram, Youtube, Send, Twitter } from "lucide-react";

const TikTokIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.08 1.07.9 1.9 1.9 2.23.69.22 1.43.16 2.12-.08.83-.29 1.5-.81 1.88-1.58.21-.43.3-.91.3-1.4v-8.41c-.45-.34-.85-.73-1.23-1.17-.02-.02-.03-.03-.05-.05-.21-.2-.4-.4-.58-.61-.01-.01-.02-.02-.02-.03-.3-.39-.59-.81-.84-1.25-.14-.24-.28-.5-.41-.75-.1-.19-.19-.39-.28-.59-.02-.05-.04-.09-.06-.14-.09-.2-.18-.4-.26-.6-.09-.23-.17-.46-.25-.7-.07-.2-.13-.4-.19-.6-.02-.06-.04-.12-.06-.18-.06-.19-.11-.38-.16-.57-.03-.12-.06-.24-.09-.36a.99.99 0 0 1-.03-.12c-.09-.3-.17-.6-.24-.91s-.13-.61-.17-.92c-.01-.07-.02-.14-.03-.21-.05-.3-.09-.6-.12-.91-.02-.15-.03-.3-.04-.45-.01-.15-.01-.3-.01-.45v-.01Z" />
  </svg>
);

const AnimatedCounter = ({ to, isDark }: { to: number; isDark: boolean }) => {
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
    <span ref={ref} className={`text-2xl font-black ${isDark ? "text-white" : "text-mg-white"}`}>
      0
    </span>
  );
};

const sections = [
    {
      title: "Our Vision",
      icon: Eye,
      gradient: "from-gray-700 to-black",
      desc: "To ignite a global revolution in trading mastery — where every individual, from Accra to Nigeria,Kenya,South Afica,Tokyo, Mumbai to New York, rises through pure skill. We see a world where financial freedom is earned, not inherited — built on discipline, precision, and relentless execution.",
      highlight: "The World Will Trade Like Marketgods.",
      image: "https://res.cloudinary.com/dzqdfaghg/image/upload/v1763522351/SnapInsta.to_476486638_18486717355003421_7261407871444466837_n_tzqjpz.jpg",
      delay: 0.2
    },
    {
      title: "Our Mission",
      icon: Target,
      gradient: "from-gray-700 to-black",
      desc: "To empower 1,000,000 traders worldwide with institutional-grade price action systems — no indicators, no bots, no excuses. From live trade rooms to real-time signals, we forge elite traders who dominate any market, any session, anywhere on Earth.",
      highlight: "We Don’t Teach. We Transform.",
      image: "https://res.cloudinary.com/dzqdfaghg/image/upload/v1763522351/SnapInsta.to_475926916_18485769319003421_8435447212825371714_n_lh3gee.jpg",
      delay: 0.4
    },
    {
      title: "Our Values",
      icon: HeartHandshake,
      gradient: "from-gray-700 to-black",
      desc: "Precision in every move. Discipline in every breath. Hustle in every hour. Integrity in every trade. Community across continents. We are a global army of market warriors — bound by one code: Win clean. Win big. Win together.",
      highlight: "One Code. One World. One Victory.",
      image: "https://res.cloudinary.com/dzqdfaghg/image/upload/v1763528004/SnapInsta.to_475264988_18485506594003421_2211319760570591478_n_q0hxkd.jpg",
      delay: 0.6
    },
  ];

  const fullStory = [
    {
      title: "The Full Vision",
      body: `
        <p class="text-lg leading-relaxed mb-6">We are building the <span class="text-mg-gold font-bold">global standard</span> in trading education for the <span class="text-mg-gold font-bold">entire world</span>.</p>
        <p class="text-lg leading-relaxed mb-6">We see traders in London, Tokyo, New York, and Sydney using the same sniper entries. We see funded accounts in 50+ countries. We see <span class="text-mg-gold">Marketgod Academy</span> as the Harvard of trading — respected, replicated, and revered worldwide.</p>
        <ul class="space-y-4 mb-8">
          <li class="flx items-center gap-3"><Globe class="w-5 h-5 text-mg-gold" /> 10,000+ traders trained by 2035</li>
          <li class="flx items-center gap-3"><Globe class="w-5 h-5 text-mg-gold" /> Students in 10+ countries</li>
          <li class="flx items-center gap-3"><Globe class="w-5 h-5 text-mg-gold" /> $500K+ in student profits globally</li>
        </ul>
        <p class="text-xl font-bold text-mg-gold italic">This is not just a dream. This is a <span class="underline">global destiny</span>.</p>
      `,
      image: "https://res.cloudinary.com/dzqdfaghg/image/upload/v1763522356/SnapInsta.to_474859260_18484062667003421_7213063944480426565_n_t6f0nh.jpg"
    },
    {
      title: "The Full Mission",
      body: `
        <p class="text-lg leading-relaxed mb-6">We wake up every day to <span class="text-mg-gold font-bold">arm the world</span> with real trading weapons. No fluff. No fake gurus. Just results.</p>
        <p class="text-lg leading-relaxed mb-6">Our mission: <span class="font-bold">1,000,000 funded traders</span>. From Tokyo open to New York close — our students execute with surgical precision. Live. Daily. Globally.</p>
        <div class="grid md:grid-cols-3 gap-6 my-8">
          <div class="bg-mg-charcoal/30 p-6 rounded-2xl border border-mg-gold/20 text-center">
            <h4 class="text-xl font-bold text-mg-gold mb-2">Sniper Entries</h4>
            <p class="text-sm">87% win rate. Used in 47 countries.</p>
          </div>
          <div class="bg-mg-charcoal/30 p-6 rounded-2xl border border-mg-gold/20 text-center">
            <h4 class="text-xl font-bold text-mg-gold mb-2">Live Trade Room</h4>
            <p class="text-sm">24/5. Real money. Real results.</p>
          </div>
          <div class="bg-mg-charcoal/30 p-6 rounded-2xl border border-mg-gold/20 text-center">
            <h4 class="text-xl font-bold text-mg-gold mb-2">Global Community</h4>
            <p class="text-sm">50,000+ members. 12 languages.</p>
          </div>
        </div>
        <p class="text-xl font-bold text-mg-gold italic">We don’t just teach trading. We <span class="underline">globalize dominance</span>.</p>
      `,
      image: "https://res.cloudinary.com/dzqdfaghg/image/upload/v1763522356/SnapInsta.to_470877567_18477335110003421_828290523445540008_n_bbbsya.jpg"
    },
    {
      title: "The Full Values",
      body: `
        <p class="text-lg leading-relaxed mb-6">Our values are not suggestions. They are <span class="text-mg-gold font-bold">non-negotiable laws</span> — enforced in every trade, every room, every country.</p>
        <div class="space-y-8">
          <div class="flex items-start gap-4">
            <div class="w-12 h-12 rounded-full bg-gradient-to-br from-red-600 to-orange-700 flex items-center justify-center flex-shrink-0">
              <Target class="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 class="text-xl font-bold text-mg-gold mb-2">Precision</h4>
              <p>One pip off = failure. We hit targets. Every time. Everywhere.</p>
            </div>
          </div>
          <div class="flex items-start gap-4">
            <div class="w-12 h-12 rounded-full bg-gradient-to-br from-mg-green to-emerald-700 flex items-center justify-center flex-shrink-0">
              <Shield class="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 class="text-xl font-bold text-mg-gold mb-2">Discipline</h4>
              <p>Rules over emotions. From Tokyo to Toronto.</p>
            </div>
          </div>
          <div class="flex items-start gap-4">
            <div class="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-500 to-mg-gold flex items-center justify-center flex-shrink-0">
              <Zap class="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 class="text-xl font-bold text-mg-gold mb-2">Hustle</h4>
              <p>We trade when others sleep. Because the market never closes.</p>
            </div>
          </div>
          <div class="flex items-start gap-4">
            <div class="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-pink-700 flex items-center justify-center flex-shrink-0">
              <HeartHandshake class="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 class="text-xl font-bold text-mg-gold mb-2">Community</h4>
              <p>One family. One code. One world.</p>
            </div>
          </div>
        </div>
        <p class="text-xl font-bold text-mg-gold italic mt-8">This is not a course. This is a <span class="underline">global movement</span>.</p>
      `,
      image: "https://res.cloudinary.com/dzqdfaghg/image/upload/v1763528004/SnapInsta.to_475264988_18485506594003421_2211319760570591478_n_q0hxkd.jpg"
    },
  ];

const AboutVisionMissionValues: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [isModalOpen, setIsModalOpen] = useState(false);

  const socials = [
    { name: "YouTube", icon: <Youtube className="w-7 h-7 text-mg-gold" />, followers: 21200, link: "https://www.youtube.com/@marketgodcommunity" },
    { name: "Instagram", icon: <Instagram className="w-7 h-7 text-mg-gold" />, followers: 33700, link: "https://www.instagram.com/eyram_dela" },
    { name: "Telegram", icon: <Send className="w-7 h-7 text-mg-gold" />, followers: 13000, link: "https://t.me/marketgodcommunity" },
    { name: "TikTok", icon: <TikTokIcon className="w-7 h-7 text-mg-gold" />, followers: 10000, link: "https://www.tiktok.com/@marketgodcommunity" },
    { name: "X (Twitter)", icon: <Twitter className="w-7 h-7 text-mg-gold" />, followers: 5200, link: "https://x.com/eyramdela" },
  ];

  return (
    <>
      <section className={`py-32 relative overflow-hidden ${isDark ? "bg-gradient-to-b from-mg-black via-mg-charcoal to-black" : "bg-gradient-to-b from-mg-light-bg via-white to-mg-light-bg"}`}>
        
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1 }} className="text-center mb-24 px-6">
          <h1 className={`text-3xl md:text-7xl font-black mb-6 leading-tight`}>
            <span className={`${isDark ? "text-mg-white" : "text-mg-black"} block`}>This Is Not a Dream.</span>
            <span className="text-mg-gold block text-4xl md:text-8xl">This Is <span className="underline decoration-mg-gold decoration-4">Destiny.</span></span>
          </h1>
          <p className={`text-xl md:text-2xl max-w-4xl mx-auto font-medium ${isDark ? "text-mg-paper/80" : "text-mg-charcoal/80"}`}>
            Vision. Mission. Values. — Forged in Ghana. Proven in the Markets.
          </p>
        </motion.div>

        {/* Sections */}
        {sections.map((section, i) => {
          const isEven = i % 2 === 0;
          return (
            <div key={i} className={`grid md:grid-cols-2 gap-16 p-4 md:gap-10 items-center mb-32 last:mb-0 ${isEven ? "md:[&>:first-child]:order-1 md:[&>:last-child]:order-2" : "md:[&>:first-child]:order-2 md:[&>:last-child]:order-1"}`}>
              
              {/* Image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative group"
              >
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-mg-gold/20 to-mg-green/20 blur-3xl scale-95 group-hover:scale-100 transition-transform duration-700 -z-10" />
                <motion.img
                  src={section.image}
                  loading="lazy"
                  alt={section.title}
                  className="w-full h-48 md:h-[420px] object-cover rounded-3xl shadow-2xl border-4 border-mg-gold/30 group-hover:border-mg-gold/60 transition-all duration-700"
                  whileHover={{ scale: 1.03 }}
                />
              </motion.div>

              {/* Text */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.3 }}
                transition={{ staggerChildren: 0.15 }}
                className="space-y-8 px-4 md:px-0"
              >
                <motion.div
                  variants={{ hidden: { opacity: 0, x: isEven ? 50 : -50 }, visible: { opacity: 1, x: 0 } }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="flex items-center gap-5"
                >
                  <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${section.gradient} p-4 shadow-2xl`}>
                    <section.icon size={44} className="text-white" />
                  </div>
                  <h3 className={`text-4xl md:text-5xl font-black ${isDark ? "text-mg-white" : "text-mg-charcoal"}`}>{section.title}</h3>
                </motion.div>
                <motion.p
                  variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className={`text-sm sm:text-lg md:text-xl leading-relaxed font-medium ${isDark ? "text-mg-paper" : "text-mg-charcoal"}`}
                >
                  {section.desc}
                </motion.p>
                <motion.blockquote
                  variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="relative pl-8 border-l-4 border-mg-gold"
                >
                  <p className="text-2xl md:text-3xl font-bold italic text-mg-gold leading-tight">
                    “{section.highlight}”
                  </p>
                </motion.blockquote>
              </motion.div>
            </div>
          );
        })}

        {/* CTA */}
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.8 }} className="text-center mt-20">
          <motion.button onClick={() => setIsModalOpen(true)} whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(212,175,55,0.5)" }}
          whileTap={{ scale: 0.95 }} className="inline-flex items-center gap-4 px-10 py-5 bg-mg-black text-white rounded-full font-bold text-xl dark:bg-mg-paper dark:text-mg-black shadow-2xl hover:shadow-mg-gold/60 transition-all">
            See the Full Story <ChevronRight size={28} />
          </motion.button>
        </motion.div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
              
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}           
              className="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-6 bg-black/90 backdrop-blur-2xl" 
              onClick={() => setIsModalOpen(false)}
          >

            <motion.div
             initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} 
             exit={{ scale: 0.8, opacity: 0 }} 
             transition={{ type: "spring", stiffness: 300, damping: 30 }} 
             className="relative max-w-5xl w-full max-h-[90vh] overflow-y-auto bg-gradient-to-br from-mg-charcoal via-black to-mg-black rounded-3xl shadow-2xl p-4 md:p-12" 
             onClick={(e) => e.stopPropagation()}
             >
              <button  onClick={() => setIsModalOpen(false)} className="absolute top-6 hidden md:flex right-6 p-2 rounded-full bg-mg-gold/20 hover:bg-mg-gold/40 transition-all"><X size={28} className="text-mg-gold" /></button>

              <div className="gap-3 w-full text-center mb-12 left-0 fixed  right 0 p-1 shadow-sm shadow-slate-400 md:static top-0 md-trans bg-gradient-to-br from-mg-charcoal via-black to-mg-black ">

                <button  
                  onClick={() => setIsModalOpen(false)} 
                  className="flex  md:hidden text-[.7rem]  p-1 rounded-md  bg-mg-gold text-black bg-mg-gold/20 hover:bg-mg-gold/40 transition-all">
                    Back
              </button>

                <div className="">
                  <h2 className=" text-2xl  sm:text-3xl md:text-6xl font-black text-mg-white md:mb-4">
                    The Full Story
                </h2>
                <p className="  text-[.7rem] sm:text-sm md:text-xl text-mg-paper/80">
                    Vision. Mission. Values. — The Complete Blueprint
                </p>
                </div>

              

              </div>


              {fullStory.map((item, i) => (
                <div key={i} className="mb-16 last:mb-0 mt-9 md-mt-0 text-mg-paper">
                  <h3 className="text-3xl md:text-4xl font-black text-mg-white mb-6 text-center">{item.title}</h3>
                  <img src={item.image} loading="lazy" alt={item.title} className="w-full h-80 object-cover rounded-3xl shadow-xl mb-8" />
                  <div className={`prose prose-lg max-w-none ${isDark ? "prose-invert" : ""}`} dangerouslySetInnerHTML={{ __html: item.body }} />
                </div>
              ))}
              <div className="text-center mt-16">
               <motion.a
          href="/plans"
          whileHover={{ scale: 1.05, boxShadow: "0 0 50px rgba(255,215,0,0.8)" }}
          whileTap={{ scale: 0.97 }}
          className="relative inline-flex gap-3 px-12 py-5 font-bold text-xl border border-white dark:border-none text-white rounded-full shadow-2xl transition-all mb-10"
        >
          {/* Rotating Gradient Glow */}
          <span className="absolute inset-0 rounded-full bg-gradient-to-r from-mg-gold via-yellow-400 to-mg-gold blur-xl opacity-60 animate-spin-slow pointer-events-none" />
          <span className="relative z-10 inine">   Join the Movement Now </span> <Trophy size={28} />
        </motion.a>
              </div>

            

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 1 }}
                className="grid grid-cols-2 md:grid-cols-5 gap-6 max-w-4xl mx-auto mt-16"
              >
                {socials.map((social) => (
                  <a
                    key={social.name}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`
                      col-span-1 md:col-span-1
                      p-6 rounded-2xl flex flex-col items-center justify-center gap-3
                      transition-all duration-300 transform hover:-translate-y-2
                      bg-mg-charcoal/60 border border-mg-white/10 hover:shadow-lg hover:shadow-mg-gold/10
                    `}
                  >
                    {social.icon}
                    <div className="text-center">
                      <AnimatedCounter to={social.followers} isDark={isDark} />
                      <p className={`text-xs font-medium uppercase tracking-wider text-mg-paper/50`}>
                        {social.name}
                      </p>
                    </div>
                  </a>
                ))}
              </motion.div>
            
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AboutVisionMissionValues;



