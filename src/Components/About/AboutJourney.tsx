// src/components/About/AboutJourney.tsx
import { motion, useInView, animate } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";
import {
  GraduationCap,
  Home,
  Laptop,
  Lightbulb,
  Users,
  Star,
  Instagram,
  Youtube,
  // Music,
  Send,
  Twitter,
  Facebook,
} from "lucide-react";
import { useEffect, useRef } from "react";

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
    <span ref={ref} className={`text-2xl font-black ${isDark ? "text-white" : "text-mg-charcoal"}`}>
      0
    </span>
  );
};

const AboutJourney = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const timeline = [
    {
      year: "University Days",
      icon: GraduationCap,
      title: "First Touch of Forex",
      desc: "Introduced to charts. No clarity. Just curiosity.",
      quote: "Curiosity became obsession. Obsession became mastery.",
      color: "text-blue-500",
    },
    {
      year: "Post-Graduation",
      icon: Home,
      title: "Locked in a Room",
      desc: "Staring at charts 18 hours a day. Family pressure: 'What are you doing?'",
      quote: "Sometimes isolation is the only way to find illumination.",
      color: "text-red-500",
    },
    {
      year: "The Hustle",
      icon: Laptop,
      title: "Borrowed from Mum",
      desc: "Collected money to trade. Lost it all. But never quit.",
      quote: "You either lose the money or lose the lesson — never both.",
      color: "text-orange-500",
    },
    {
      year: "Breakthrough",
      icon: Lightbulb,
      title: "Sniper Strategy Born",
      desc: "87% win rate system. Built in silence. Tested with fire.",
      quote: "Precision, patience, and purpose — that’s the real edge.",
      color: "text-mg-green",
    },
    {
      year: "2023 – Now",
      icon: Users,
      title: "10,000+ Students",
      desc: "Free PDFs. VIP Signals. Exness Partnership. Ghana tours.",
      quote: "It’s no longer about me — it’s about the next generation of traders.",
      color: "text-mg-gold",
    },
    {
      year: "2025 & Beyond",
      icon: Star,
      title: "National Tours & Seminars",
      desc: "First major forex tour. Webinars. Seminars. 200+ traders. Exness partnership. Ghana-wide impact.",
      quote: "We’re not just trading charts — we’re changing lives.",
      color: "text-purple-500",
    },
  ];

  const socials = [
    { name: "YouTube", icon: <Youtube className="w-7 h-7 text-red-500" />, followers: 21200, link: "https://www.youtube.com/@marketgodcommunity" },
    { name: "Instagram", icon: <Instagram className="w-7 h-7 text-pink-500" />, followers: 33700, link: "https://www.instagram.com/eyram_dela" },
    { name: "Telegram", icon: <Send className="w-7 h-7 text-cyan-500" />, followers: 13000, link: "https://t.me/marketgodcommunity" },
    { name: "TikTok", icon: <TikTokIcon className={`w-7 h-7 ${isDark ? 'text-white' : 'text-black'}`} />, followers: 10000, link: "https://www.tiktok.com/@marketgodcommunity" },
    { name: "X (Twitter)", icon: <Twitter className={`w-7 h-7 ${isDark ? 'text-white' : 'text-black'}`} />, followers: 5200, link: "https://x.com/eyramdela" },
       { name: "Facebook", icon: <Facebook className={`w-7 h-7 ${isDark ? 'text-white' : 'text-black'}`} />, followers: 2000, link: "https://www.facebook.com/share/1E24KkebYt/?mibextid=wwXIfr" },
  ];


  return (
    <section
      className={`relative py-24 overflow-hidden ${
        isDark
          ? "bg-gradient-to-b from-mg-black via-black to-mg-charcoal"
          : "bg-gradient-to-b from-mg-light-bg via-white to-mg-light-bg"
      }`}
    >
      {/* Background Texture */}
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />

      {/* Animated Glow */}
      <motion.div
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,215,0,0.08)_0%,transparent_70%)]"
        animate={{ opacity: [0.4, 0.6, 0.4] }}
        transition={{ duration: 6, repeat: Infinity }}
      />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className={`text-4xl md:text-5xl font-black mb-4 ${isDark ? "text-mg-white" : "text-mg-charcoal"}`}>
            From Dorm Room to <span className="text-mg-green">National Stage</span>
          </h2>
          <p className={`text-lg ${isDark ? "text-mg-paper/70" : "text-mg-charcoal/70"}`}>
            Every loss was a lesson. Every win was proof.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-mg-gold/50 via-mg-green/50 to-mg-gold/50 rounded-full" />

          {timeline.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0, transition: { type: "spring", stiffness: 100, damping: 20 } }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ delay: i * 0.2, duration: 0.8 }}
              className={`flex items-center justify-center mb-16 ${
                i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              } flex-col md:flex-row`}
            >
              {/* Card */}
              <div className={`w-full md:w-5/12 p-6 md:p-8 rounded-3xl border backdrop-blur-md shadow-xl ${
                isDark
                  ? "bg-mg-charcoal/50 border-mg-white/30"
                  : "bg-white/80 border-mg-gold/20"
              }`}>
                <p className={`font-bold text-lg mb-2 ${item.color}`}>{item.year}</p>
                <h3 className={`text-2xl font-bold mb-3 ${isDark ? "text-mg-gold" : "text-mg-charcoal"}`}>
                  {item.title}
                </h3>
                <p className={`${isDark ? "text-mg-paper/70" : "text-mg-charcoal/70"}`}>
                  {item.desc}
                </p>
                {item.quote && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.5 }}
                    transition={{ delay: 0.3 }}
                    className="mt-4 italic text-mg-gold/80 text-sm"
                  >
                    “{item.quote}”
                  </motion.p>
                )}
              </div>

              {/* Icon Node */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-16 h-16 md:w-20 md:h-20 z-10">
                <div className="w-full h-full rounded-full bg-mg-gold/20 border-4 border-mg-gold flex items-center justify-center shadow-lg">
                  <item.icon size={32} className="text-mg-gold" />
                </div>
                <motion.div
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                  className="absolute inset-0 rounded-full border-2 border-mg-gold opacity-0"
                  style={{ animation: "pulse 2s infinite" }}
                />
              </div>

              {/* Spacer */}
              <div className="w-full md:w-5/12" />
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0, transition: { duration: 0.8 } }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.8 }}
          className="text-center mt-24"
        >
          <h3 className="text-3xl md:text-4xl font-black mb-4 text-mg-black dark:text-mg-white">
            Your Journey Starts Now
          </h3>
          <p className={`mb-8 text-lg ${isDark ? "text-mg-paper/70" : "text-mg-charcoal/70"}`}>
            Join the <span className="text-mg-gold font-bold">Marketgod Academy</span> and start mastering the charts.
          </p>

          {/* CTA Button */}
          <motion.a
            href="/plans/#pricing"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-3 px-8 py-4 bg-mg-black text-mg-white dark:bg-mg-white dark:text-mg-black rounded-full font-bold shadow-lg hover:bg-mg-gold hover:text-mg-charcoal transition-all"
          >
            Enroll Today
            <Star size={20} />
          </motion.a>

          {/* Social Links */}
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
                  ${isDark 
                    ? "bg-mg-charcoal/60 border border-mg-gold/10 hover:shadow-lg hover:shadow-mg-gold/10" 
                    : "bg-white/80 border border-mg-green/10 hover:shadow-lg hover:shadow-mg-green/10"
                  }
                `}
              >
                {social.icon}
                <div className="text-center">
                  <AnimatedCounter to={social.followers} isDark={isDark} />
                  <p className={`text-xs font-medium uppercase tracking-wider ${isDark ? "text-mg-paper/50" : "text-mg-charcoal/50"}`}>
                    {social.name}
                  </p>
                </div>
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Custom Pulse Animation */}
      <style >{`
        @keyframes pulse {
          0% { opacity: 0; transform: scale(1); }
          50% { opacity: 0.5; }
          100% { opacity: 0; transform: scale(1.5); }
        }
      `}</style>
    </section>
  );
};

export default AboutJourney;


