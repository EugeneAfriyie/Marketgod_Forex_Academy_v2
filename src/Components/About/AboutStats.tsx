// src/components/About/AboutStats.tsx
import { useEffect,  useRef } from "react";
import { motion, useInView, animate } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";
import { Users, TrendingUp, Award, Globe, Instagram, Youtube, Send,  Twitter, FacebookIcon } from "lucide-react";

const TikTokIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.08 1.07.9 1.9 1.9 2.23.69.22 1.43.16 2.12-.08.83-.29 1.5-.81 1.88-1.58.21-.43.3-.91.3-1.4v-8.41c-.45-.34-.85-.73-1.23-1.17-.02-.02-.03-.03-.05-.05-.21-.2-.4-.4-.58-.61-.01-.01-.02-.02-.02-.03-.3-.39-.59-.81-.84-1.25-.14-.24-.28-.5-.41-.75-.1-.19-.19-.39-.28-.59-.02-.05-.04-.09-.06-.14-.09-.2-.18-.4-.26-.6-.09-.23-.17-.46-.25-.7-.07-.2-.13-.4-.19-.6-.02-.06-.04-.12-.06-.18-.06-.19-.11-.38-.16-.57-.03-.12-.06-.24-.09-.36a.99.99 0 0 1-.03-.12c-.09-.3-.17-.6-.24-.91s-.13-.61-.17-.92c-.01-.07-.02-.14-.03-.21-.05-.3-.09-.6-.12-.91-.02-.15-.03-.3-.04-.45-.01-.15-.01-.3-.01-.45v-.01Z" />
  </svg>
);

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
    <span ref={ref} className="font-black  dark:text-mg-white">
      0
    </span>
  );
};

const AboutStats = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const stats = [
    { icon: Users, value: 10000, suffix: "+", label: "Students Trained", sub: "Across Ghana & Beyond" },
    { icon: TrendingUp, value: 87, suffix: "%", label: "VIP Win Rate", sub: "Sniper Strategy Verified" },
    { icon: Award, value: 1, suffix: "", label: "Exness Partner", sub: "Regulated & Trusted", logo: true },
    { icon: Globe, value: 1, suffix: "#", label: "Forex Academy", sub: "By Volume & Results" },
  ];

  const socials = [
    { name: "YouTube", icon: <Youtube className="w-7 h-7 text-red-500" />, followers: 21200, link: "https://www.youtube.com/@marketgodcommunity" },
    { name: "Instagram", icon: <Instagram className="w-7 h-7 text-pink-500" />, followers: 33700, link: "https://www.instagram.com/eyram_dela" },
    { name: "Telegram", icon: <Send className="w-7 h-7 text-cyan-500" />, followers: 13000, link: "https://t.me/marketgodcommunity" },
    { name: "TikTok", icon: <TikTokIcon className={`w-7 h-7 ${isDark ? 'text-white' : 'text-black'}`} />, followers: 10000, link: "https://www.tiktok.com/@eyramdela_?_r=1&_t=ZM-9229kTUvSTT" },
    { name: "X (Twitter)", icon: <Twitter className={`w-7 h-7 ${isDark ? 'text-white' : 'text-black'}`} />, followers: 5200, link: "https://x.com/eyramdela" },
    { name: "Facebook", icon: <FacebookIcon className={`w-7 h-7 ${isDark ? 'text-white' : 'text-black'}`} />, followers: 2000, link: "https://www.facebook.com/share/1E24KkebYt/?mibextid=wwXIfr" },
  ];

  return (
    <section className={`py-20 relative overflow-hidden ${isDark ? "bg-mg-charcoal.qty" : "bg-mg-paper"}`}>
      {/* Subtle Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full blur-3xl bg-mg-gold/20 -z-10" />

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0, transition: { duration: 0.7 } }}
          viewport={{ once: false, amount: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className={`text-4xl md:text-5xl font-black ${isDark ? "text-mg-white" : "text-mg-charcoal"}`}>
            Built on <span className="text-mg-green">Real Results</span>
          </h2>
          <p className={`mt-3 text-lg ${isDark ? "text-mg-paper/70" : "text-mg-charcoal/70"}`}>
            Not hype. Just proof.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-2  lg:grid-cols-4 gap-4 items-center md:gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          transition={{ staggerChildren: 0.15 }}
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              whileHover={{ y: -8, scale: 1.03 }}
              className="group"
            >
              <div className={`p-2 py-4 md:p-8 rounded-3xl border backdrop-blur-md transition-all duration-500
                ${isDark ? "bg-mg-black/50 border-mg-white/30 hover:bg-mg-black/70" : "bg-white/80 border-mg-gold/20 hover:bg-white"}
                hover:shadow-mg-gold/30 hover:scale-105`}
              >
                <div className="flex justify-center mb-5">
                  <div className=" p-0 md:p-4 rounded-full bg-mg-white/15 group-hover:bg-mg-gold/25 transition-all">
                    <stat.icon size={32} className="text-mg-gold group-hover:scale-110 transition-transform" />
                  </div>
                </div>

                <div className={`text-3xl md:text-5xl font-black text-center mb-2 ${isDark ? "text-mg-white" : "text-mg-black"}`}>
                  {typeof stat.value === 'number' ? (
                    <><AnimatedCounter to={stat.value} />{stat.suffix}</>
                  ) : (
                    stat.value
                  )}
                </div>

                <h3 className={`text-base md:text-lg font-bold text-center ${isDark ? "text-mg-paper" : "text-mg-charcoal"}`}>
                  {stat.label}
                </h3>
                <p className={`text-xs md:text-sm text-center ${isDark ? "text-mg-paper/60" : "text-mg-charcoal/60"}`}>
                  {stat.sub}
                </p>

                {stat.logo && (
                  <img src="/exness-logo.png" alt="Exness" className="h-6 mx-auto mt-3 opacity-80" />
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          transition={{ staggerChildren: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-5 gap-6 max-w-4xl mx-auto mt-12"
        >
          {socials.map((social) => (
            <motion.a
              key={social.name}
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              whileHover={{ y: -8, scale: 1.05 }}
              className={`
                col-span-1 md:col-span-1
                p-6 rounded-2xl flex flex-col items-center justify-center gap-3
                transition-all duration-300 transform hover:-translate-y-2
                ${isDark
                  ? "bg-mg-black/50 border border-mg-gold/30 hover:shadow-lg hover:shadow-mg-gold/10"
                  : "bg-white/80 border border-mg-green/10 hover:shadow-lg hover:shadow-mg-green/10"
                }
              `}
            >
              {social.icon}
              <div className="text-center">
                <AnimatedCounter to={social.followers}   />
                <p className={`text-xs font-medium uppercase tracking-wider ${isDark ? "text-mg-paper/70" : "text-mg-black/50"}`}>
                  {social.name}
                </p>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AboutStats;


