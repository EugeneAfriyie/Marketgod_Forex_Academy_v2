import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import './Footer.css';
import { ArrowUp, Globe, Instagram, LucideFacebook, Mail, MessageCircle, Phone, Send, Shield, Twitter, Youtube } from "lucide-react";

const Footer = () => {
  const currentYear = useMemo(() => new Date().getFullYear(), []);

  // Back to Top Button State
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setShowScrollTop(window.pageYOffset > 500);
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const TikTokIcon = ({ size, ...props }: React.SVGProps<SVGSVGElement> & { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width={size} height={size} {...props}>
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.08 1.07.9 1.9 1.9 2.23.69.22 1.43.16 2.12-.08.83-.29 1.5-.81 1.88-1.58.21-.43.3-.91.3-1.4v-8.41c-.45-.34-.85-.73-1.23-1.17-.02-.02-.03-.03-.05-.05-.21-.2-.4-.4-.58-.61-.01-.01-.02-.02-.02-.03-.3-.39-.59-.81-.84-1.25-.14-.24-.28-.5-.41-.75-.1-.19-.19-.39-.28-.59-.02-.05-.04-.09-.06-.14-.09-.2-.18-.4-.26-.6-.09-.23-.17-.46-.25-.7-.07-.2-.13-.4-.19-.6-.02-.06-.04-.12-.06-.18-.06-.19-.11-.38-.16-.57-.03-.12-.06-.24-.09-.36a.99.99 0 0 1-.03-.12c-.09-.3-.17-.6-.24-.91s-.13-.61-.17-.92c-.01-.07-.02-.14-.03-.21-.05-.3-.09-.6-.12-.91-.02-.15-.03-.3-.04-.45-.01-.15-.01-.3-.01-.45v-.01Z" />
  </svg>
);

  const socials = [
    { Icon: Instagram, href: "https://www.instagram.com/eyram_dela", label: "Instagram" },
    { Icon: Twitter, href: "https://x.com/eyramdela", label: "X (Twitter)" },
    { Icon: Youtube, href: "https://www.youtube.com/@marketgodcommunity", label: "YouTube" },
    { Icon: Send, href: "https://t.me/marketgodcommunity", label: "Telegram" },
    { Icon: LucideFacebook, href: "https://www.facebook.com/share/1E24KkebYt/?mibextid=wwXIfr", label: "Facebook" },
    { Icon: TikTokIcon, href: "https://www.tiktok.com/@eyramdela_?_r=1&_t=ZM-9229kTUvSTT", label: "Tictok" },
   
  ];

  const links = {
    company: [
      { label: "About Us", href: "/about" },
      { label: "Blog", href: "/blog" },
      { label: "Contact", href: "/contact" },
      { label: "Plans", href: "/plans" },
    ],
    resources: [
      { label: "Community", href: "https://t.me/marketgodcommunity" },
      { label: "Mentorship", href: "/plans" },
      { label: "VIP Signals", href: "/plans/#signals" },
      { label: "Free Content", href: "https://www.youtube.com/@marketgodcommunity" },
    ],
  };

  return (
    <>
      {showScrollTop && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          whileHover={{ scale: 1.1, rotate: -5 }}
          whileTap={{ scale: 0.95 }}
          onClick={scrollToTop}
          className="fixed bottom-20 right-8 z-50 p-2 rounded-full bg-mg-gold text-mg-black shadow-2xl hover:shadow-gold-glow transition-all duration-300"
          aria-label="Back to top"
        >
          <ArrowUp size={18} className="transition-transform group-hover:-translate-y-1" />
        </motion.button>
      )}

      <footer className="relative overflow-hidden bg-mg-black text-mg-paper mt-auto">
        {/* Cinematic Background */}
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: `url('/logo.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "brightness(0.3) contrast(1.3)"
        }} />

        {/* Golden Glow */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: "radial-gradient(circle at 20% 20%, rgba(212,175,55,0.12), transparent 60%), radial-gradient(circle at 80% 80%, rgba(212,175,55,0.08), transparent 60%)"
        }} />


        {/* Footer Slogan */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
          <div className="relative w-full h-full flex items-center justify-center footer-perspective-container">
            <div className="text-5xl md:text-9xl lg:text-[12rem] font-black tracking-[0.2em] uppercase select-none footer-slogan opacity-30"
              style={{
                color: "rgba(212, 175, 55, 0.06)",
                transform: "translateZ(-600px) rotateX(45deg) scale(0.85)",
                transformStyle: "preserve-3d",
                textShadow: "0 0 80px rgba(212,175,55,0.15)"
              }}
            >
              Marketgod Academy — Built For the World
            </div>
          </div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
          <div className="grid md:grid-cols-4 gap-12 lg:gap-16">

            {/* BRAND */}
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex flex-col gap-6">
              <div className="flex items-center gap-3">
                <img src="/logo.png" alt="Marketgod Academy" className="w-20 h-20 rounded-full border-4 border-mg-gold shadow-2xl p-1 bg-mg-dark-surface" />
                <div>
                  <h3 className="text-2xl font-black text-mg-gold tracking-tight">Marketgod</h3>
                  <p className="text-xs text-mg-dark-textSecondary font-semibold">ACADEMY</p>
                </div>
              </div>
              <p className="text-sm leading-relaxed text-mg-dark-textSecondary">
                Empowering <span className="text-mg-gold font-bold">traders worldwide</span> with elite mentorship, real-time signals, and battle-tested strategies.
              </p>
              <div className="flex gap-3 items-center">
                <div className="flex items-center gap-1 text-xs font-semibold text-mg-dark-textSecondary">
                  <Shield size={14} />
                  <span>Regulated Partner</span>
                </div>
                <div className="flex items-center gap-1 text-xs font-semibold text-mg-gold">
                  <Globe size={14} />
                  <span>12k+</span><span className="text-mg-white"> Traders </span>
                </div>
              </div>
              <div className="flex gap-3">
                {socials.map(({ Icon, href, label }, i) => (
                  <motion.a key={i} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} whileHover={{ scale: 1.15, rotate: 5 }} className="group p-3 rounded-full bg-mg-gold/15 backdrop-blur-sm border border-mg-gold/30 hover:bg-mg-gold/30 transition-all duration-300">
                    <Icon size={18} className="text-mg-gold transition-colors" />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* COMPANY */}
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
              <h3 className="text-lg font-bold mb-5 text-mg-white tracking-wider">Company</h3>
              <ul className="space-y-3">
                {links.company.map((link, i) => (
                  <li key={i}>
                    <a href={link.href} className="text-sm ay transition-all duration-300 flex items-center gap-2 group text-mg-dark-textSecondary">
                      <span className="w-1 h-1 bg-mg-white rounded-full opacity-0 group-hover:opacity-100 transition"></span>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* RESOURCES */}
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
              <h3 className="text-lg font-bold mb-5 text-mg-white tracking-wider">Resources</h3>
              <ul className="space-y-3">
                {links.resources.map((link, i) => (
                  <li key={i}>
                    <a href={link.href} className="text-sm transition-all duration-300 flex items-center gap-2 group text-mg-dark-textSecondary">
                      <span className="w-1 h-1 bg-mg-white rounded-full opacity-0 group-hover:opacity-100 transition"></span>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* COMMUNITY & CONTACT */}
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="flex flex-col gap-6">
              <div>
                <h3 className="text-lg font-bold mb-3 text-mg-white tracking-wider">Join Our Community</h3>
                <p className="text-sm mb-5 text-mg-dark-textSecondary">
                  Connect with 10,000+ traders. Get live updates, free tools, and support.
                </p>
              </div>

              <div className="space-y-3 text-sm">
                <a href="mailto:marketgodacademy@gmail.com" className="flex items-center gap-2 text-mg-dark-textSecondary hover:text-mg-gold transition">
                  <Mail size={16} />
                  marketgodacademy@gmail.com
                </a>
                <a href="tel:+233599002863" className="flex items-center gap-2 text-mg-dark-textSecondary hover:text-mg-gold transition">
                  <Phone size={16} />
                  +233 59 900 28637 (WhatsApp)

                </a>
              </div>

              <motion.a href="https://t.me/delatrades" target="_blank" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-mg-paper text-mg-black rounded-full font-bold uppercase tracking-wider shadow-xl hover:shadow-2xl transition-all duration-300">
                <MessageCircle size={20} />
                Chat on Telegram Now
              </motion.a>
            </motion.div>
          </div>

          {/* DISCLAIMER */}
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.5 }} className="mt-16 pt-8 border-t border-mg-dark-border text-xs text-mg-dark-textSecondary">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-3 text-center md:text-left">
                <p className="font-semibold text-mg-white">© {currentYear} <span className="text-mg-gold">Marketgod </span> Academy. All rights reserved.</p>
                <p className="leading-relaxed italic">
                  <strong>IMPORTANT RISK DISCLOSURE:</strong> Trading foreign exchange, cryptocurrencies, and contracts for difference (CFDs) on margin carries a high level of risk and may not be suitable for all investors. The high degree of leverage can work against you as well as for you. Before deciding to trade any such leveraged products you should carefully consider your investment objectives, level of experience, and risk appetite. The possibility exists that you could sustain a loss of some or all of your initial investment and therefore you should not invest money that you cannot afford to lose. You should be aware of all the risks associated with trading on margin, and seek advice from an independent financial advisor if you have any doubts.
                </p>
              </div>
              <div className="flex flex-col items-center md:items-end gap-4">
                <div className="flex gap-4 text-xs">
                  <a href="/legal#terms" className="hover:text-mg-gold transition">Terms of Service</a>
                  <a href="/legal#privacy" className="hover:text-mg-gold transition">Privacy Policy</a>
                  <a href="/legal#disclaimer" className="hover:text-mg-gold transition">Risk Disclaimer</a>
                </div>
                <div className="text-center md:text-right">
                  <p className="text-mg-dark-textSecondary font-semibold ">Site proudly crafted & designed by</p>
                  <a href="https://wa.me/233551217385" target="_blank" rel="noopener noreferrer" className="text-mg-gold font-bold text-[.5rem] tracking-wider hover:underline">Eugene Afriyie</a>
              
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
