import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";
import { Signal, Zap, AlertTriangle, ArrowRight, X, Send } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import MarketgodQuiz from "./MarketGodQuiz"; 
import { useState, useRef, useEffect } from "react";

interface Plan {
  number: string;
  title: string;
  subtitle: string;
  desc: string;
  features: string[];
  price: string;
  oldPrice?: string;
  badge: string;
  limited?: string;
  href: string;
  highlight?: boolean;
  requiresDisclaimer?: boolean;
}

interface CardInnerProps {
  plan: Plan;
  isDark: boolean;
  onFreeClick: () => void;   // ← NEW
  onPaidClick: () => void;
}

const metallicGold = "bg-gradient-to-br from-[#F7E7B5] via-[#D4AF37] to-[#B8860B]";

const signals = [
  {
    number: "01",
    title: "Live Trading with Marketgod",
    subtitle: "Trade Like Marketgod",
    desc: "Real-time, high-probability signals delivered straight to your phone. Perfect for beginners getting started.",
    features: [
      "87% Win Rate Signals",
      "Instant Telegram Alerts",
      "Entry/Exit Breakdowns",
      "24/7 Support",
    ],
    price: "Free",
    badge: "Free Access",
    limited: "321/1000 Spots Left",
    href: "", // not used for free
  },
  {
    number: "02",
    title: "VIP Signals (Most Purchased)",
    subtitle: "Accelerated Growth Edition",
    desc: "For serious traders who want faster results, deeper insights, and priority alerts.",
    features: [
      "87% Win Rate Signals",
      "Instant Telegram Alerts",
      "Entry/Exit Breakdowns",
      "Daily Market Breakdowns",
      "Priority Support",
    ],
    price: "$99/mo",
    oldPrice: "$150/mo",
    badge: "Best Value",
    href: "https://t.me/paymarketgodbot",
    highlight: true,
    requiresDisclaimer: true,
  },
  // {
  //   number: "03",
  //   title: "Gold Inner Circle",
  //   subtitle: "Elite Trading Experience",
  //   desc: "Exclusive access to master-level insights, deeper mentorship, and advanced institutional concepts.",
  //   features: [
  //     "Advanced Gold & Currency Strategies",
  //     "Institutional Market Breakdown",
  //     "Weekly Live Sessions",
  //     "VIP Priority Support",
  //   ],
  //   price: "$120/mo",
  //   badge: "High Demand",
  //   href: "https://t.me/livetradewithmarketgodbot",
  //   highlight: true,
  // },
];

const Signals = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [open, setOpen] = useState(false); // ← Start closed
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const redirectTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleFreeClick = () => {
    setOpen(true);
  };
  const handlePaidClick = () => {
    setShowDisclaimer(true);
  };

  const handleProceedToPayment = () => {
    setIsRedirecting(true);
    setShowDisclaimer(false);
    redirectTimeoutRef.current = setTimeout(() => {
      window.location.href = "https://t.me/paymarketgodbot";
      setIsRedirecting(false);
    }, 5000); // Wait 5 seconds before redirecting
  };

  const cancelRedirect = () => {
    if (redirectTimeoutRef.current) {
      clearTimeout(redirectTimeoutRef.current);
    }
    setIsRedirecting(false);
  };

  useEffect(() => {
    // Cleanup timeout on component unmount
    return () => {
      if (redirectTimeoutRef.current) {
        clearTimeout(redirectTimeoutRef.current);
      }
    };
  }, []);

  return (
    <>
      <section id="pricing" className="py-24 relative overflow-hidden">
        {/* Background Image & Overlay */}

        
        
        
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          
          <div className={`${isDark ? "text-mg-paper" : "text-mg-charcoal"}`}>
            <h2 className="text-center text-4xl font-black mb-4">
              Premium Signal Packages
            </h2>
            <p className="text-center text-lg mb-16 opacity-70 max-w-2xl mx-auto">
              Whether you're starting out or scaling your trading, choose the package that fits your journey.
            </p>
          </div>
           {/* Swipe indicator (mobile only) */}
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="md:hidden text-center text-xs text-mg-gold mb-4"
                  >
                    👉 Swipe to explore
                  </motion.p>

          {/* MOBILE CAROUSEL */}
          <div className="md:hidden">
            <Swiper
              modules={[Pagination]}
              pagination={{ clickable: true }}
              spaceBetween={20}
              slidesPerView={1}
            >
              {signals.map((plan, index) => (
                <SwiperSlide key={index}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className={`relative p-[2px] rounded-3xl shadow-xl ${
                      plan.highlight ? metallicGold : "bg-gray-500/30"
                    }`}
                  >
                    <CardInner plan={plan} isDark={isDark} onFreeClick={handleFreeClick} onPaidClick={handlePaidClick} />
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* DESKTOP GRID */}
          <div className="hidden md:grid md:grid-cols-2 gap-20 md:px-16">
            {signals.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                whileHover={{
                  rotateX: 6,
                  rotateY: -6,
                  scale: 1.04,
                  transition: { type: "spring", stiffness: 150, damping: 10 },
                }}
                style={{ transformPerspective: 1000 }}
                className={`relative p-[2px] rounded-3xl shadow-xl ${
                  plan.highlight ?  "bg-gray-500/30" : metallicGold
                }`}
              >
                <CardInner plan={plan} isDark={isDark} onFreeClick={handleFreeClick} onPaidClick={handlePaidClick} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* MODAL */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/60"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="relative w-full max-w-md max-h-[85vh] overflow-y-auto rounded-2xl p-5 shadow-2x dark:bg-black dark:border-mg-blue/30 bg-white border border-yellow-400/30"
              
              onClick={(e) => e.stopPropagation()}
            >
              <motion.button
                onClick={() => setOpen(false)}
                className="absolute top-3 right-3 p-1.5 rounded-full bg-mg-charcoal/50 hover:bg-red-600/50 text-mg-paper/70 hover:text-white transition"
                aria-label="Close modal"
              >
                X
              </motion.button>

              <MarketgodQuiz />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Disclaimer Popup */}
      <AnimatePresence>
        {showDisclaimer && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-xl z-[999] flex items-center justify-center p-6 "
            onClick={() => setShowDisclaimer(false)}
          >
            <motion.div
              initial={{ scale: 0.8, y: 100, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.8, y: 100, opacity: 0 }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="relative max-w-lg w-full p-5 rounded-3xl bg-gradient-to-br from-black/90 to-mg-dark-surface/90 border-2 border-mg-gold/40 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowDisclaimer(false)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition"
              >
                <X size={24} className="text-mg-gold" />
              </button>

              <div className="text-center mb-8">
                <div className="inline-flex p-5 rounded-full bg-mg-gold/10 mb-6">
                  <AlertTriangle size={48} className="text-mg-gold" />
                </div>
                <h3 className="text-3xl font-black text-mg-gold mb-4">
                  Risk Disclaimer
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  Trading Forex involves significant risk and is not suitable for all investors. Past performance is not indicative of future results. Signals are for educational purposes and should not be considered financial advice.
                  Trading involves substantial risk and is not suitable for every investor. While we provide our specific trade setups (entry, stop loss, and take profit), you are solely responsible for the trades you execute in your own account. We are not liable for any profits or losses.
                </p>
              </div>

              <motion.button
                onClick={handleProceedToPayment}
                whileHover={{ scale: 1.05 }}
                className="w-full flex items-center justify-center gap-3 py-4 rounded-full font-bold uppercase tracking-wider transition-all duration-300 bg-mg-gold text-black hover:shadow-gold-glow-lg"
              >
                I Understand, Proceed
                <ArrowRight size={18} />
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Redirecting Popup */}
      <AnimatePresence>
        {isRedirecting && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[1000] flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 20, stiffness: 200 }}
              className="flex flex-col items-center gap-4 p-8 rounded-2xl bg-mg-dark-surface border border-mg-gold/50 w-full max-w-sm"
            >
              <Send size={32} className="text-mg-gold" />
              <h3 className="font-bold text-mg-paper text-lg">Redirecting to Telegram...</h3>
              <p className="text-mg-dark-textSecondary text-sm">Please complete your payment securely.</p>
              <button onClick={cancelRedirect} className="mt-4 px-6 py-2 text-xs font-semibold text-mg-paper rounded-full bg-white/10 hover:bg-white/20 transition-colors">
                Cancel
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// Reusable inner card component
const CardInner: React.FC<CardInnerProps> = ({ plan, isDark, onFreeClick, onPaidClick }) => {
  const isFree = plan.price === "Free";

  return (
    <div
      className={`rounded-3xl p-8 h-full ${
        isDark ? "bg-mg-black" : "bg-white"
      }`}
    >
      {/* Badge */}
      <span
        className={`absolute top-4 right-4 text-xs font-bold px-3 py-1 rounded-full 
          ${
            plan.highlight
              ? "bg-white/10 text-white"
              : isDark ? "bg-mg-dark-surface text-mg-paper/70" : "bg-mg-light-gray text-mg-dark-gray"
          }`}
      >
        {plan.badge}
      </span>

      {/* LIMITED SPOTS — ONLY ON FREE CARD */}
      {plan.limited && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 200 }}
          className="absolute top-4 left-4"
        >
          <div className="flex items-center gap-2 px-3 py-1.5 bg-red-600/90 backdrop-blur-sm rounded-full text-white text-xs font-black shadow-lg animate-pulse">
            <Zap size={14} />
            {plan.limited}
          </div>
        </motion.div>
      )}

      {/* Number */}
      <div className="text-6xl font-black opacity-10">{plan.number}</div>

      {/* Icon */}
      <Signal className="w-10 h-10 text-mg-gold mb-4" />

      {/* Title */}
      <h3 className={`text-2xl font-bold ${isDark ? "text-mg-paper" : "text-mg-charcoal"}`}>
        {plan.title}
      </h3>
      <p className="text-mg-gold font-semibold mt-1">{plan.subtitle}</p>

      {/* Description */}
      <p className={`mt-4 opacity-70 text-sm leading-relaxed ${isDark ? "text-mg-paper" : "text-mg-charcoal"}`}>
        {plan.desc}
      </p>

      {/* Features */}
      <ul className="mt-6 space-y-3">
        {plan.features.map((item, i) => (
          <li key={i} className={`flex items-center gap-2 ${isDark ? "text-mg-paper" : "text-mg-charcoal"}`}>
            <span className="w-2 h-2 rounded-full bg-mg-gold" />
            <span className="text-sm opacity-80">{item}</span>
          </li>
        ))}
      </ul>

      {/* Price */}
      <div className="flex items-baseline gap-3 mt-8">
        <div className={`${isDark ? "text-mg-paper" : "text-mg-charcoal"} text-3xl font-black`}>
          {plan.price}
        </div>
        {plan.oldPrice && (
          <div className="text-xl font-semibold text-gray-500 line-through">{plan.oldPrice}</div>
        )}
      </div>

      {/* CTA */}
      {isFree ? (
        <button
          onClick={onFreeClick}
          className="mt-6 block w-full text-center py-3 rounded-full font-semibold transition-all bg-mg-gold text-black hover:brightness-110 shadow-lg hover:shadow-mg-gold/30"
        >
          Claim Your Free Spot
        </button>
      ) : plan.requiresDisclaimer ? (
        <button
          onClick={onPaidClick}
          className={`
            mt-6 block w-full text-center py-3 rounded-full font-semibold transition-all border-2
            ${plan.highlight
              ? ` ${isDark ? "border-mg-paper/30 bg-mg-paper text-black" : " border-mg-black/30 bg-black text-white"}`
              : "bg-mg-gold text-black border-mg-gold hover:brightness-110"
            }`}
        >
          Get Started
        </button>
      ) : (
        <motion.a
        whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(212,175,55,0.5)" }}
          whileTap={{ scale: 0.95 }}
          href={plan.href}
          className={`
            mt-6 block w-full text-center py-3 rounded-full font-semibold transition-all border-2
            ${plan.highlight
              ? ` ${isDark ? "border-mg-paper/30 bg-mg-paper text-black" : " border-mg-black/30 bg-black text-white"}`
              : "bg-mg-gold text-black border-mg-gold hover:brightness-110"
            }`}
        >
          Get Started
        </motion.a>
      )}
    </div>
  );
};

export default Signals;


