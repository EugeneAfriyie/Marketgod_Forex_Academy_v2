import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronRight, Instagram, Send, MessageCircle, Facebook, Mail } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";

interface NavLink {
  name: string;
  href: string;
}

interface MobileMenuDrawerProps {
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
  navLinks: NavLink[];
}

const MobileMenuDrawer: React.FC<MobileMenuDrawerProps> = ({ menuOpen, setMenuOpen, navLinks }) => {
  const { theme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const isDark = theme === "dark";

  const bgClass = isDark 
    ? "bg-gradient-to-t from-black via-mg-dark-surface to-black" 
    : "bg-gradient-to-t from-mg-light-bg via-white to-mg-light-bg";
  
  const textClass = isDark ? "text-white" : "text-black";
  const accentClass = "text-mg-gold";

  const handleBackdropClick = () => setMenuOpen(false);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    if (location.pathname !== href) {
      navigate(href);
    }
  };

  const socials = [
    { icon: Instagram, link: "https://instagram.com/marketgodacademy", label: "Instagram" },
    { icon: Send, link: "https://t.me/marketgodcommunity", label: "Telegram" },
    { icon: MessageCircle, link: "https://wa.me/233557560380", label: "WhatsApp" },
    { icon: Facebook, link: "https://web.facebook.com/eyram.akpey", label: "Facebook" },
    { icon: Mail, link: "mailto:support@marketgodtrading.com", label: "Email" },
  ];

  return (
    <AnimatePresence>
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xl pb-2"
          onClick={handleBackdropClick}
        >
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 120, damping: 25 }}
            className={`relative w-full h-full ${bgClass} flex flex-col overflow-y-auto`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-2 right-3 p-4 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-mg-gold/30 transition-all z-10"
            >
              <X size={24} className={accentClass} />
            </button>

            {/* Hero Image */}
            <div className="relative mt-10 px-4 mb-12">
              <div
                className="h-64 bg-cover bg-center rounded-3xl shadow-2xl border-4 border-mg-gold/40 overflow-hidden"
                style={{
                  backgroundImage: "url('https://res.cloudinary.com/dzqdfaghg/image/upload/v1763578745/Black_White_Gradient_Digital_Marketing_Instagram_Post_f2zh1x.png')",
                }}
              />
            </div>


            {/* Navigation Links */}
            <nav className="flex-1 px-8 pb-8">
              <div className="space-y-8">
                {navLinks.map((link) => {
                  const isActive = location.pathname === link.href;

                  return (
                    <motion.div
                      key={link.name}
                      onClick={() => handleNavClick(link.href)}
                      whileHover={{ x: 12 }}
                      whileTap={{ scale: 0.98 }}
                      className={`block pb- border-b-2 transition-all duration-500 cursor-pointer ${
                        isActive
                          ? `border-mg-gold ${accentClass} font-black text-xl`
                          : `border-white/10 ${textClass} hover:text-mg-gold`
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-[1rem] font-black">{link.name}</h3>
                          <p className={`text-sm mt-2 opacity-70 ${isActive ? "text-mg-gold/80" : ""}`}>
                            {link.name === "Home" && "Return to dashboard"}
                            {link.name === "Plans" && "MarketGod VIP Plans & Courses"}
                            {link.name === "Blog" && "MarketGod Blog - Trading Tips & Insights"}
                            {link.name === "About" && "Our story & mission"}
                            {link.name === "Contact" && "24/7 elite support"}
                          </p>
                        </div>
                        <ChevronRight size={32} className={`${isActive ? accentClass : "opacity-50"}`} />
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </nav>

            {/* Social Links */}
            <div className="px-8 py-10 border-t border-mg-gold/20">
              <p className={`text-center text-sm font-bold uppercase tracking-widest mb-8 ${textClass} opacity-80`}>
                Connect With Us
              </p>
              <div className="flex justify-center gap-3">
                {socials.map((social, i) => (
                  <motion.a
                    key={i}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.3, rotate: 12 }}
                    className="p-3 rounded-2xl bg-white/5 backdrop-blur-xl border border-mg-gold/30  transition-all"
                  >
                    <social.icon size={12} className={accentClass} />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Final CTA */}
            <div className="px-8 pb-5">
              <motion.div
                onClick={() => {
                  setMenuOpen(false);
                  navigate("/plans");
                }}
                 whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(212,175,55,0.5)" }}
                  whileTap={{ scale: 0.95 }}
                className={`
                  block text-center py-5 rounded-3xl font-black text-xl shadow-2xl transition-all duration-500 hover:shadow-gold-glow-lg cursor-pointer
                  bg-black text-white  
                  dark:bg-mg-white dark:text-black dark:hover:bg-white dark:hover:text-black
                `}
              >
                Join VIP Now
              </motion.div>
            </div>

            {/* Footer */}
            <div className="p-8  text-center border-t border-mg-gold/20">
              <p className={`text-xs tracking-widest ${textClass} opacity-70`}>
                © 2025 MarketGod Academy • Accra, Ghana
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileMenuDrawer;


