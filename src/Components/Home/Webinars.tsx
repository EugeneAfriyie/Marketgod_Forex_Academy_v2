// src/components/Webinars/Webinars.tsx
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";
import { Calendar, Video, MapPin, X, ArrowRight, Send, Globe, Youtube } from "lucide-react";
import { useState } from "react";

const Webinars = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [showPopup, setShowPopup] = useState(false);

  const events = [
    {
      type: "Free Weekly Webinar",
      title: "Price Action Mastery",
      date: "Every weekend, 7 - 8 PM GMT",
      desc: "Live breakdown of market setups, Q&A, and Sniper Strategy demo. Perfect for Ghana evenings.",
      topics: ["Price action entries", "Risk management", "Live trade analysis"],
      price: "Free",
      join: "Register via Telegram",
      href: "https://t.me/marketgodcommunity",
      icon: Video,
    },
    {
      type: "Sniper Seminar",
      title: "Sniper Marketgod Strategy Workshop",
      date: "Scheduled Periodically (Virtual)",
      desc: "An intensive virtual workshop covering the Sniper Marketgod Strategy. Includes live simulations and Q&A. Spots are limited.",
      topics: ["Building trading systems", "Psychology mastery", "Ghana case studies"],
      price: "Paid Workshop",
      join: "Get Notified",
      href: "#",
      icon: Calendar,
      triggerPopup: true,
    },
    {
      type: "Free Physical Seminar",
      title: "Live Trading Experience Day",
      date: "Occasional In-Person Events (Global)",
      desc: "We host exclusive in-person trading experience days across different cities — live market execution, networking, mentorship, and intensive strategy reviews.",
      topics: ["Live market execution", "Trader networking", "Strategy reviews"],
      price: "Free",
      join: "Get Notified",
      href: "#",
      icon: MapPin,
      triggerPopup: true,
    },
  ];

  const socials = [
    { name: "Telegram", icon: Send, link: "https://t.me/marketgodcommunity" },
    { name: "Facebook", icon: Globe, link: "https://web.facebook.com/eyram.akpey" },
    { name: "Instagram", icon: Globe, link: "https://www.instagram.com/eyram_dela" },
    { name: "YouTube", icon: Youtube, link: "https://www.youtube.com/@marketgodcommunity" },
  ];

  return (
    <>
      <section id="webinars" className="relative py-32 overflow-hidden">
        {/* Background */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage: "ur('tps://res.cloudinary.com/dzqdfaghg/image/upload/v1763522353/SnapInsta.to_344115183_2414894028679317_1325419865450439379_n_uqflwo.jpg')",
          }}
        />
        {/* <div className="absolute inset-0 bg-black/70" />
        <div className="absolute inset-0 bg-gradient-to-br from-mg-gold/10 via-transparent to-mg-gold/5" /> */}

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="text-center mb-20"
          >
            <h2 className={`text-5xl md:text-7xl font-black tracking-tight mb-6 ${isDark ? "text-mg-white" : "text-mg-black"}`}>
              Webinars <span className="text-mg-gold">& </span>Seminars
            </h2>
            <p className={`text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed ${isDark ? "text-gray-300" : "text-gray-600"}`}>
              Live sessions with Eyram Dela. Hands-on trading. Ghana time.  
              <span className="text-mg-gold font-bold"> Real mastery — no fluff.</span>
            </p>
          </motion.div>

          {/* Events Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {events.map((event, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.8 }}
                whileHover={{ y: -12, scale: 1.02 }}
                className={`   ${event.price === "Free" ? "border border-mg-gray/50 hover:border-mg-black/50" : "border border-mg-gold/30 hover:border-mg-gold/50"}
                  relative p-8 rounded-3xl backdrop-blur-xl shadow-2xl transition-all duration-500 flex flex-col
                  ${isDark 
                    ? "bg-black/80   hover:shadow-gold-glow" 
                    : "bg-white/95 border-mg-gold/20 hover:border-mg-gold/40 hover:shadow-gold-glow-light"
                  }
                `}
              >
                <div className="flex-grow">
                  <div className="flex items-center gap-3 mb-5">
                    <event.icon size={28} className="text-mg-gold" />
                    <span className={`text-sm font-bold uppercase tracking-wider   ${isDark ? "text-mg-white" : "text-mg-black"}`}>
                      {event.type}
                    </span>
                  </div>

                  <h3 className={`text-2xl font-bold mb-3 ${isDark ? "text-white" : "text-black"}`}>
                    {event.title}
                  </h3>
                  <p className={`text-base mb-4 ${isDark ? "text-gray-400" : "text-gray-700"}`}>
                    {event.date}
                  </p>
                  <p className={`text-sm leading-relaxed mb-6 ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                    {event.desc}
                  </p>

                  <div className="mb-6">
                    <p className="text-xs uppercase tracking-widest text-mg-gold font-bold mb-3">Topics Covered</p>
                    <ul className="space-y-2">
                      {event.topics.map((topic, j) => (
                        <li key={j} className="flex items-center gap-3 text-sm">
                          <div className="w-1.5 h-1.5 bg-mg-gold rounded-full" />
                          <span className={isDark ? "text-gray-400" : "text-gray-600"}>{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* CTA Button */}
                {event.triggerPopup ? (
                  <motion.button
                    onClick={() => setShowPopup(true)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    className={`
                      w-full py-4 rounded-full font-bold uppercase tracking-wider transition-all duration-300
                      ${event.price === "Free" 
                        ? "bg-mg-black text-mg-white dark:bg-mg-white dark:text-mg-black hover:shadow-gold-glow-lg" 
                        : "border-2 border-mg-gold text-mg-gold hover:bg-mg-gold hover:text-black"
                      }
                    `}
                  >
                    {event.price === "Free" ? "Register Free" : "Get Notified"}
                    <ArrowRight className="inline ml-2" size={18} />
                  </motion.button>
                ) : (
                  <motion.a
                   whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    href={event.href}
                    target="_blank"
                    rel="noreferrer"
                    className="block w-full text-center py-4 rounded-full bg-mg-black dark:bg-mg-white text-mg-white dark:text-mg-black font-bold uppercase tracking-wider hover:shadow-gold-glow-lg transition-all"
                  >
                    Join Now <ArrowRight className="inline ml-2" size={18} />
                  </motion.a>
                )}
              </motion.div>
            ))}
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="text-center mt-20"
          >
            <motion.button
              onClick={() => setShowPopup(true)}
              whileHover={{ scale: 1.07 }}
              whileTap={{ scale: 0.95 }}
              className={`
                inline-flex items-center gap-4 px-6 md:px-12 py-6 rounded-full font-bold uppercase tracking-wider text-sm md:text-xl shadow-2xl
                transition-all duration-500 hover:shadow-gold-glow-lg
                bg-black text-white
                dark:bg-mg-white dark:text-black dark:hover:bg-white dark:hover:text-black
              `}
            >
              Stay Updated on All Events
              <Calendar size={28} />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Luxury Popup */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-xl z-[999] flex items-center justify-center p-6"
            onClick={() => setShowPopup(false)}
          >
            <motion.div
              initial={{ scale: 0.8, y: 100, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.8, y: 100, opacity: 0 }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="relative max-w-md w-full p-10 rounded-3xl bg-gradient-to-br from-black/90 to-mg-dark-surface/90 border-2 border-mg-gold/40 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowPopup(false)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition"
              >
                <X size={24} className="text-mg-gold" />
              </button>

              <div className="text-center mb-8">
                <div className="inline-flex p-5 rounded-full bg-mg-gold/10 mb-6">
                  <Calendar size={48} className="text-mg-gold" />
                </div>
                <h3 className="text-3xl font-black text-mg-gold mb-4">
                  No Events Scheduled Yet
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  Follow our channels to get instant notifications when new webinars and seminars are announced.
                </p>
              </div>

              <div className="space-y-4">
                <p className="text-center font-bold uppercase tracking-wider text-mg-gold">
                  Join Our Community
                </p>
                {socials.map((social, i) => (
                  <motion.a
                    key={i}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.03, x: 8 }}
                    className="flex items-center justify-between p-5 rounded-xl bg-white/5 border border-mg-gold/20 hover:bg-mg-gold/10 transition-all group"
                  >
                    <div className="flex items-center gap-4">
                      <social.icon size={24} className="text-mg-gold" />
                      <span className="font-bold text-white">{social.name}</span>
                    </div>
                    <ArrowRight size={20} className="text-mg-gold group-hover:translate-x-2 transition" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Webinars;


