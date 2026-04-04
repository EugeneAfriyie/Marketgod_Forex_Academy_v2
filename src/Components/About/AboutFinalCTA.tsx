// src/Components/About/FinalCTA.tsx

import { motion } from "framer-motion";
import { Twitter, Instagram, Youtube, Send, Facebook } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

const FinalCTA = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const socials = [
    { name: "Twitter", icon: <Twitter  className={`w-7 h-7 ${isDark ? 'text-white' : 'text-black'}`} />, link: "https://x.com/eyramdela" },
    { name: "Instagram", icon: <Instagram  className={`w-7 h-7 ${isDark ? 'text-white' : 'text-black'}`} />, link: "https://www.instagram.com/eyram_dela" },
    { name: "Facebook", icon: <Facebook  className={`w-7 h-7 ${isDark ? 'text-white' : 'text-black'}`}/>, link: "https://www.facebook.com/share/1E24KkebYt/?mibextid=wwXIfr" },
    { name: "YouTube", icon: <Youtube  className={`w-7 h-7 ${isDark ? 'text-white' : 'text-black'}`} />, link: "https://www.youtube.com/@marketgodcommunity" },
    { name: "TikTok", icon: <TikTokIcon className={`w-7 h-7 ${isDark ? 'text-white' : 'text-black'}`}/>, link: "https://www.tiktok.com/@eyramdela_?_r=1&_t=ZM-9229kTUvSTT" },
    { name: "Telegram", icon: <Send  className={`w-7 h-7 ${isDark ? 'text-white' : 'text-black'}`}/>, link: "https://t.me/marketgodcommunity" },
  ];

  return (
    <section
      className="relative py-32 overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url('/img/hero-bg.png')`,
      }}
    >
      {/* Overlay */}
      <div
        className={`absolute inset-0 ${
          isDark
            ? "bg-mg-black/80 "
            : "bg-mg-liht-bg/30 "
        }`}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className={`text-5xl md:text-6xl font-black mb-6 ${isDark ? "text-mg-paper" : "text-mg-white"}`}
        >
          Your Legacy Starts Here
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className={`text-xl md:text-2xl mb-12 ${isDark ? "text-mg-paper/80" : "text-mg-white/80"}`}
        >
          Trade like a <span className="text-mg-gold font-bold underline decoration-mg-gold decoration-4">Marketgod</span> and join thousands of successful traders.
        </motion.p>

        {/* CTA Button */}
        <motion.a
          href="/plans/#pricing"
          whileHover={{ scale: 1.05, boxShadow: "0 0 50px rgba(255,215,0,0.8)" }}
          whileTap={{ scale: 0.97 }}
          className="relative inline-block px-12 py-5 font-bold text-xl border border-white dark:border-none text-white rounded-full shadow-2xl transition-all mb-10"
        >
          {/* Rotating Gradient Glow */}
          <span className="absolute inset-0 rounded-full bg-gradient-to-r from-mg-gold via-yellow-400 to-mg-gold blur-xl opacity-60 animate-spin-slow pointer-events-none" />
          <span className="relative z-10">Enroll Now — Claim Your Seat</span>
        </motion.a>

        {/* Founder’s Socials */}
        <div className="flex justify-center items-center gap-6 mt-8">
          {socials.map((social, i) => (
            <motion.a
              key={i}
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.95 }}
              className={`w-12 h-12 flex items-center justify-center rounded-full shadow-lg ${isDark ? "bg-mg-charcoal text-mg-gold" : "bg-white text-mg-black"} transition-all`}
            >
          {  social.icon }
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;

const TikTokIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.08 1.07.9 1.9 1.9 2.23.69.22 1.43.16 2.12-.08.83-.29 1.5-.81 1.88-1.58.21-.43.3-.91.3-1.4v-8.41c-.45-.34-.85-.73-1.23-1.17-.02-.02-.03-.03-.05-.05-.21-.2-.4-.4-.58-.61-.01-.01-.02-.02-.02-.03-.3-.39-.59-.81-.84-1.25-.14-.24-.28-.5-.41-.75-.1-.19-.19-.39-.28-.59-.02-.05-.04-.09-.06-.14-.09-.2-.18-.4-.26-.6-.09-.23-.17-.46-.25-.7-.07-.2-.13-.4-.19-.6-.02-.06-.04-.12-.06-.18-.06-.19-.11-.38-.16-.57-.03-.12-.06-.24-.09-.36a.99.99 0 0 1-.03-.12c-.09-.3-.17-.6-.24-.91s-.13-.61-.17-.92c-.01-.07-.02-.14-.03-.21-.05-.3-.09-.6-.12-.91-.02-.15-.03-.3-.04-.45-.01-.15-.01-.3-.01-.45v-.01Z" />
  </svg>
);



