import { useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { BellRing, Target, ShieldAlert, LineChart, Smartphone, Zap, CheckCircle2, Loader2, XCircle, Send, AlertTriangle, ExternalLink, HelpCircle } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { Link } from "react-router-dom";
const features = [
    {
        title: "Sniper Entries",
        description: "Exact price points for entries. No guessing, no wide zones. We enter with precision to minimize drawdown.",
        icon: Target,
    },
    {
        title: "Instant Mobile Alerts",
        description: "Receive push notifications directly on Telegram the second a setup aligns with our strict criteria.",
        icon: BellRing,
    },
    {
        title: "Full Chart Markups",
        description: "We don't just send 'Buy' or 'Sell'. Every signal includes the annotated chart so you understand the exact 'why' behind the trade.",
        icon: LineChart,
    },
    {
        title: "Strict Risk Management",
        description: "Every setup includes precise Stop Loss and multiple Take Profit levels to ensure your capital is always protected.",
        icon: ShieldAlert,
    },
];
const offerings = [
    {
        id: 'gold-cabal',
        title: 'The Gold Cabal 2026',
        subtitle: { en: 'VIP Gold Signals', fr: 'Signaux Or VIP' },
        description: { en: 'Ready to level up your trading game? Join our Gold Cabal where we’re calling out massive gold trades — we’re talking 1000-2000+ pips monthly!', fr: 'Prêt à améliorer votre trading ? Rejoignez notre Gold Cabal où nous annonçons des trades massifs sur l\'or — 1000-2000+ pips par mois !' },
        features: { en: ['Weekly sniper calls', 'Overflowing testimonials', '1000-2000+ pips monthly'], fr: ['Appels sniper hebdomadaires', 'Témoignages abondants', '1000-2000+ pips par mois'] },
        cta: { en: 'Join The Cabal', fr: 'Rejoindre le Cabal' },
        icon: Target,
        price: '$99.00',
        priceTerm: { en: 'Monthly', fr: 'Mensuel' },
    },
    {
        id: 'trade-live',
        title: 'Trade with MarketGod',
        subtitle: { en: 'Free Signals via Partner', fr: 'Signaux Gratuits via Partenaire' },
        description: { en: 'Don\'t want to pay for signals? Get redirected to our Telegram bot for instructions on how to sign up with our trusted broker partner and receive our hourly signals completely free.', fr: 'Pas envie de payer ? Laissez notre bot Telegram vous guider pour vous inscrire avec notre courtier partenaire et recevoir nos signaux gratuitement.' },
        features: { en: ['Free hourly signals', 'Access via Exness partnership', 'Earn while you learn'], fr: ['Signaux horaires gratuits', 'Accès via partenariat Exness', 'Gagnez en apprenant'] },
        cta: { en: 'Get Setup on Telegram', fr: 'Configurer sur Telegram' },
        icon: Zap,
        price: 'Free',
        priceTerm: { en: 'with Partner', fr: 'avec Partenaire' },
    },
    {
        id: 'flip-account',
        title: 'Flip with MarketGod',
        subtitle: { en: 'Account Management', fr: 'Gestion de Compte' },
        description: { en: 'A high-risk, high-reward service. You deposit funds, our expert traders flip the account for you, and we share the profits. For serious investors only.', fr: 'Un service à haut risque et haute récompense. Vous déposez des fonds, nos traders experts les font fructifier, et nous partageons les bénéfices.' },
        features: { en: ['Hands-free trading', 'Profit sharing model', 'High-risk, high-reward'], fr: ['Trading mains libres', 'Modèle de partage des profits', 'Haut risque, haute récompense'] },
        cta: { en: 'Apply to Flip', fr: 'Postuler pour le Flip' },
        icon: ShieldAlert,
        price: 'Profit Share',
        priceTerm: { en: 'on Profits', fr: 'sur les Profits' },
    },
];
export default function SignalsPage() {
    const { theme } = useTheme();
    const isDark = theme === "dark";
    // MOCK STATE: Toggle this to `true` to view the active subscriber dashboard!
    const [isSubscribed] = useState(false);
    // Payment Modal State
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [paymentState, setPaymentState] = useState<'idle' | 'loading' | 'redirecting' | 'success' | 'error'>('idle');
    // Disclaimer State
    const [showDisclaimer, setShowDisclaimer] = useState(false);
    const [selectedOffer, setSelectedOffer] = useState<typeof offerings[0] | null>(null);
    const handleOfferClick = (offer: typeof offerings[0]) => {
        setSelectedOffer(offer);
        setShowDisclaimer(true);
    };
    const handleAcceptDisclaimer = () => {
        setShowDisclaimer(false);
        if (selectedOffer?.id === 'gold-cabal') {
            setShowPaymentModal(true);
            setPaymentState('idle');
        }
        else if (selectedOffer?.id === 'trade-live') {
            window.open('https://t.me/marketgod_bot', '_blank'); // Placeholder bot link
        }
        else if (selectedOffer?.id === 'flip-account') {
            window.open('https://t.me/delatrades', '_blank'); // Placeholder admin chat
        }
    };
    const handleProcessPayment = () => {
        setPaymentState('loading');
        setTimeout(() => {
            setPaymentState('redirecting');
            setTimeout(() => {
                window.open('https://t.me/marketgodcommunity', '_blank'); // Redirect to Telegram for actual payment
                // Note: For mock purposes, we can optionally set setIsSubscribed(true) here later to test the dashboard view.
            }, 2000);
        }, 1500);
    };
    const sectionVariant: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };
    const gridContainerVariant: Variants = {
        hidden: {},
        visible: { transition: { staggerChildren: 0.1 } }
    };
    const gridItemVariant: Variants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
    };
    // ==========================================
    // SUBSCRIBED VIEW (ACTIVE DASHBOARD)
    // ==========================================
    if (isSubscribed) {
        return (<div className="space-y-8 pb-10">
        <motion.div initial="hidden" animate="visible" variants={sectionVariant} className={`relative overflow-hidden rounded-[3rem] border shadow-2xl ${isDark ? "border-mg-gold/30 bg-[#0a0a0a]" : "border-mg-gold/40 bg-white"}`}>
          <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none"><Target size={250} className="text-mg-gold"/></div>
          <div className="absolute inset-0 bg-gradient-to-br from-mg-gold/10 via-transparent to-transparent pointer-events-none"/>
          
          <div className="relative z-10 p-10 md:p-16 flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-mg-gold/10 border border-mg-gold/30 px-4 py-1.5 text-xs font-black uppercase tracking-[0.2em] text-mg-gold mb-6 shadow-[0_0_15px_rgba(212,175,55,0.2)]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-mg-gold opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-mg-gold"></span>
              </span>
              {"Signals Active"}
            </div>
            <h1 className={`text-4xl md:text-5xl font-black mb-4 tracking-tight ${isDark ? "text-white" : "text-gray-900"}`}>
              {"Welcome to the "}
              <span className="text-mg-gold">{"VIP Channel."}</span>
            </h1>
            <p className={`max-w-2xl text-lg font-medium mb-10 ${isDark ? "text-white/70" : "text-gray-600"}`}>
              {"Your subscription is active. Make sure you have joined the secure Telegram channel to receive our instant push alerts."}
            </p>
            
            <a href="https://t.me/marketgodcommunity" // Replace with actual VIP signals link
         target="_blank" rel="noreferrer" className="group relative overflow-hidden inline-flex items-center gap-3 rounded-2xl bg-mg-gold px-12 py-5 text-base font-black uppercase tracking-[0.15em] text-black shadow-[0_0_30px_rgba(212,175,55,0.5)] transition-all hover:scale-105">
              <Send size={20} className="relative z-10"/>
              <span className="relative z-10">{"Open VIP Channel"}</span>
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/50 to-transparent group-hover:animate-shimmer"/>
            </a>
          </div>
        </motion.div>

        {/* Recent Performance Preview */}
        <motion.div initial="hidden" animate="visible" variants={sectionVariant} className={`p-8 md:p-12 rounded-[3rem] border ${isDark ? "border-white/5 bg-[#111111]" : "border-black/5 bg-white"}`}>
          <h3 className={`text-2xl font-black mb-6 ${isDark ? "text-white" : "text-gray-900"}`}>
            {"Execution Rules"}
          </h3>
          <div className="grid sm:grid-cols-2 gap-4">
             <div className={`p-5 rounded-2xl ${isDark ? "bg-white/5" : "bg-black/5"}`}>
                <span className="text-mg-gold font-bold mb-2 block">01. Risk Management</span>
                <p className={`text-sm ${isDark ? "text-white/70" : "text-gray-600"}`}>Never risk more than 1-2% of your account per signal. Always use the provided Stop Loss.</p>
             </div>
             <div className={`p-5 rounded-2xl ${isDark ? "bg-white/5" : "bg-black/5"}`}>
                <span className="text-mg-gold font-bold mb-2 block">02. Trade Management</span>
                <p className={`text-sm ${isDark ? "text-white/70" : "text-gray-600"}`}>Move your Stop Loss to breakeven once Take Profit 1 (TP1) is hit to secure your capital.</p>
             </div>
          </div>
        </motion.div>

        {/* Support Section */}
        <motion.div initial="hidden" animate="visible" variants={sectionVariant} className={`overflow-hidden rounded-[3rem] border ${isDark ? "border-white/5 bg-[#111111]" : "border-black/5 bg-[#faf7f0]"}`}>
          <div className="p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex flex-col md:flex-row items-center text-center md:text-left gap-6">
              <div className="h-16 w-16 shrink-0 rounded-full bg-mg-gold/10 text-mg-gold flex items-center justify-center">
                <HelpCircle size={32}/>
              </div>
              <div>
                <h3 className={`text-2xl font-black mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>
                  {"Need Help?"}
                </h3>
                <p className={`font-medium ${isDark ? "text-white/60" : "text-gray-600"}`}>
                  {"If you are facing any challenges with your signals or the VIP channel, our team is here."}
                </p>
              </div>
            </div>
            <Link to="/dashboard/support" className="shrink-0 whitespace-nowrap rounded-xl border-2 border-mg-gold px-8 py-4 text-sm font-black uppercase tracking-wider text-mg-gold transition-colors hover:bg-mg-gold/10">
              {"Contact Support"}
            </Link>
          </div>
        </motion.div>
      </div>);
    }
    // ==========================================
    // UNENROLLED VIEW (SALES LANDING PAGE)
    // ==========================================
    return (<div className="space-y-16 pb-16">
      {/* Hero Section */}
      <motion.div initial="hidden" animate="visible" variants={sectionVariant} className={`relative overflow-hidden rounded-[3rem] border shadow-2xl ${isDark ? "border-white/5 bg-[#0a0a0a]" : "border-black/5 bg-white"}`}>
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-mg-gold/10 blur-[120px] rounded-full pointer-events-none"/>
        
        <div className="relative z-10 p-10 md:p-16 lg:p-24 flex flex-col items-center text-center">
          <h1 className={`text-4xl md:text-6xl lg:text-7xl font-black mb-6 tracking-tight ${isDark ? "text-white" : "text-gray-900"}`}>
            {"Earn While You "}
            <span className="text-mg-gold">{"Learn."}</span>
          </h1>
          <p className={`max-w-3xl text-lg md:text-xl leading-relaxed font-medium ${isDark ? "text-white/70" : "text-gray-600"}`}>
            {"Not profitable yet? Execute high-probability setups with precision. Let us do the heavy lifting and analysis while you compound your account."}
          </p>
        </div>
      </motion.div>

      {/* The Problem / General Intro */}
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={sectionVariant} className={`overflow-hidden rounded-[3rem] border ${isDark ? "border-white/5 bg-[#111111]" : "border-black/5 bg-[#111111]"}`}>
        <div className="p-10 md:p-16 lg:p-20 text-center">
          <h2 className="text-3xl md:text-4xl font-black mb-6 text-white tracking-tight">
            {"The bridge between theory and profit."}
          </h2>
          <p className="max-w-4xl mx-auto text-lg leading-relaxed font-medium text-white/70">
            {"Learning Forex takes time. Many traders get stuck in the frustrating cycle of blown accounts before finding consistency. A professional signal service is the shortcut: it allows you to leverage the experience of market veterans, protect your capital, and generate income while you develop your own psychological edge."}
          </p>
        </div>
      </motion.div>

      {/* The MarketGod Difference */}
      <div className="grid lg:grid-cols-2 gap-8 items-center">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={sectionVariant} className="order-2 lg:order-1">
          <h2 className={`text-3xl md:text-4xl font-black mb-6 ${isDark ? "text-white" : "text-gray-900"}`}>
            {"Why MarketGod Signals?"}
          </h2>
          <p className={`text-lg mb-8 leading-relaxed ${isDark ? "text-white/70" : "text-gray-600"}`}>
            {"We are not a standard signal channel that blindly tells you to click buttons. We are an educational academy first."}
          </p>
          <div className="space-y-6">
             {[
            "Detailed trade logic and context with every signal",
            "Massive Risk-to-Reward ratios (1:3 up to 1:10+)",
            "Fewer trades, better setups (Quality over Quantity)",
            "Transparent trade management updates"
        ].map((point, idx) => (<div key={idx} className="flex items-start gap-4">
                 <CheckCircle2 size={24} className="mt-0.5 shrink-0 text-mg-gold drop-shadow-[0_0_8px_rgba(212,175,55,0.5)]"/>
                 <p className={`text-lg font-bold ${isDark ? "text-white/90" : "text-gray-800"}`}>{point}</p>
               </div>))}
          </div>
        </motion.div>
        
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={sectionVariant} className="order-1 lg:order-2 relative aspect-square md:aspect-video lg:aspect-square overflow-hidden rounded-[3rem] border border-mg-gold/20 bg-mg-gold/5 flex items-center justify-center">
          {/* Abstract Phone/App Graphic representation */}
          <div className="relative w-48 h-96 rounded-[3rem] border-8 border-gray-900 bg-black shadow-2xl flex flex-col p-4">
            <div className="w-1/2 h-1 bg-gray-800 mx-auto rounded-full mb-6"></div>
            <div className="flex-1 space-y-3">
               <div className="w-full bg-white/10 text-white text-[10px] font-bold p-3 rounded-xl border border-white/20">BUY XAUUSD @ 5045.50</div>
               <div className="w-3/4 h-2 bg-white/20 rounded-full"></div>
               <div className="w-1/2 h-2 bg-white/20 rounded-full mb-4"></div>
               <div className="w-full aspect-video bg-mg-gold/20 rounded-lg flex items-center justify-center"><LineChart size={24} className="text-mg-gold"/></div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Features Grid */}
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={gridContainerVariant} className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (<motion.div variants={gridItemVariant} key={idx} className={`group relative overflow-hidden rounded-[2rem] border p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(212,175,55,0.15)] ${isDark ? "border-white/5 bg-white/[0.01] hover:bg-white/[0.03] hover:border-mg-gold/30 backdrop-blur-md" : "border-black/5 bg-[#faf7f0] hover:bg-white hover:border-mg-gold/30"}`}>
              <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-mg-gold/20 to-mg-gold/5 border border-mg-gold/20 text-mg-gold shadow-inner transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                <Icon size={24}/>
              </div>
              <h3 className={`mb-3 text-lg font-black ${isDark ? "text-white" : "text-gray-900"}`}>{feature.title}</h3>
              <p className={`text-sm leading-relaxed font-medium ${isDark ? "text-white/60" : "text-gray-600"}`}>{feature.description}</p>
            </motion.div>);
        })}
      </motion.div>

      {/* Offerings Grid */}
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={sectionVariant}>
        <div className="text-center mb-12">
          <h2 className={`text-3xl md:text-4xl font-black ${isDark ? "text-white" : "text-gray-900"}`}>
            {"Choose Your Edge"}
          </h2>
          <p className={`mt-3 text-lg max-w-2xl mx-auto ${isDark ? "text-white/60" : "text-gray-600"}`}>
            {"We offer three unique pathways to accelerate your trading journey."}
          </p>
        </div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={gridContainerVariant} className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {offerings.map((offer) => {
            const Icon = offer.icon;
            return (<motion.div variants={gridItemVariant} key={offer.id} className={`flex flex-col rounded-[2.5rem] border p-8 transition-all duration-300 ${isDark ? "border-white/5 bg-[#111111]" : "border-black/5 bg-white"}`}>
              <div className="flex-1">
                <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-mg-gold/10 text-mg-gold">
                  <Icon size={28}/>
                </div>
                <h3 className={`mb-2 text-2xl font-black ${isDark ? "text-white" : "text-gray-900"}`}>{offer.title}</h3>
                <p className={`text-sm font-bold uppercase tracking-wider mb-4 ${isDark ? "text-mg-gold/80" : "text-mg-gold"}`}>
                  {offer.subtitle.en}
                </p>
                <p className={`text-sm leading-relaxed font-medium mb-6 ${isDark ? "text-white/60" : "text-gray-600"}`}>
                  {offer.description.en}
                </p>
                <div className="space-y-3">
                  {(offer.features.en).map((point, idx) => (<div key={idx} className="flex items-center gap-3 text-sm">
                      <CheckCircle2 size={16} className="shrink-0 text-green-500"/>
                      <span className={isDark ? "text-white/80" : "text-gray-700"}>{point}</span>
                    </div>))}
                </div>
              </div>

              <div className="mt-8">
                <div className={`text-center mb-6 py-4 border-y ${isDark ? "border-white/5" : "border-black/5"}`}>
                  <span className="text-4xl font-black text-mg-gold">{offer.price}</span>
                  <span className={`ml-2 font-semibold ${isDark ? "text-white/50" : "text-gray-500"}`}>/ {offer.priceTerm.en}</span>
                </div>
                
                <button onClick={() => handleOfferClick(offer)} className={`w-full flex items-center justify-center gap-2 text-center rounded-xl px-6 py-4 text-sm font-bold uppercase tracking-wider transition-transform hover:scale-[1.02] ${offer.id === 'gold-cabal' ? "bg-mg-gold text-black shadow-[0_0_15px_rgba(212,175,55,0.3)]" : "border-2 border-mg-gold text-mg-gold hover:bg-mg-gold/10"}`}>
                  {offer.cta.en}
                </button>
              </div>
            </motion.div>);
        })}
        </motion.div>
      </motion.div>

      {/* Support Section */}
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }} variants={sectionVariant} className={`overflow-hidden rounded-[3rem] border ${isDark ? "border-white/5 bg-[#111111]" : "border-black/5 bg-[#faf7f0]"}`}>
        <div className="p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col md:flex-row items-center text-center md:text-left gap-6">
            <div className="h-16 w-16 shrink-0 rounded-full bg-mg-gold/10 text-mg-gold flex items-center justify-center">
              <HelpCircle size={32}/>
            </div>
            <div>
              <h3 className={`text-2xl font-black mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>
                {"Facing Challenges?"}
              </h3>
              <p className={`font-medium ${isDark ? "text-white/60" : "text-gray-600"}`}>
                {"Issues with payments, Telegram access, or general questions? We can help."}
              </p>
            </div>
          </div>
          <Link to="/dashboard/support" className="shrink-0 whitespace-nowrap rounded-xl border-2 border-mg-gold px-8 py-4 text-sm font-black uppercase tracking-wider text-mg-gold transition-colors hover:bg-mg-gold/10">
            {"Contact Support"}
          </Link>
        </div>
      </motion.div>

      {/* Page-Level Risk Disclaimer */}
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }} variants={sectionVariant} className={`mt-16 pt-12 border-t ${isDark ? "border-white/10" : "border-black/10"}`}>
        <div className="max-w-4xl mx-auto">
          <h3 className={`flex items-center gap-3 text-xl font-black mb-4 ${isDark ? "text-white/40" : "text-gray-400"}`}>
            <AlertTriangle size={24}/>
            {"High Risk Warning"}
          </h3>
          <div className={`space-y-4 text-sm leading-relaxed text-justify ${isDark ? "text-white/40" : "text-gray-500"}`}>
            <p>
              {"Trading foreign exchange (Forex) on margin carries a high level of risk, and may not be suitable for all investors. The high degree of leverage can work against you as well as for you."}
            </p>
            <p>
              {"Before deciding to trade foreign exchange you should carefully consider your investment objectives, level of experience, and risk appetite. Our signals and account flipping services are provided for educational and executive purposes, but past performance does not guarantee future results. You should not invest money that you cannot afford to lose."}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Pre-Action Risk Disclaimer Modal */}
      <AnimatePresence>
        {showDisclaimer && (<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[120] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
            <motion.div initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 20 }} className={`w-full max-w-lg overflow-hidden rounded-[2rem] border shadow-2xl ${isDark ? "border-white/10 bg-[#111111]" : "border-black/10 bg-white"}`}>
              <div className={`p-6 flex flex-col items-center text-center border-b ${isDark ? "bg-white/5 border-white/10" : "bg-black/5 border-black/10"}`}>
                <div className={`h-16 w-16 flex items-center justify-center rounded-full mb-4 ${isDark ? "bg-white/10 text-white" : "bg-black/10 text-gray-900"}`}>
                  <ShieldAlert size={32}/>
                </div>
                <h3 className={`text-2xl font-black ${isDark ? "text-white" : "text-gray-900"}`}>
                  {"Risk Acknowledgment"}
                </h3>
              </div>
              <div className="p-8">
                <p className={`text-sm leading-relaxed mb-8 text-justify ${isDark ? "text-white/70" : "text-gray-600"}`}>
                  {"By proceeding, you acknowledge that financial trading is inherently risky. MarketGod provides insights and setups, but you take full responsibility for your investment decisions. Money lost in the financial markets cannot be refunded by the academy."}
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <button onClick={() => setShowDisclaimer(false)} className={`flex-1 rounded-xl border px-4 py-3 text-sm font-bold uppercase tracking-wider transition-colors ${isDark ? "border-white/10 text-white hover:bg-white/5" : "border-black/10 text-gray-900 hover:bg-black/5"}`}>
                    {"Cancel"}
                  </button>
                  <button onClick={handleAcceptDisclaimer} className={`flex-1 rounded-xl px-4 py-3 text-sm font-black uppercase tracking-wider transition-transform hover:scale-[1.02] shadow-lg ${isDark ? "bg-white text-black" : "bg-black text-white"}`}>
                    {"I Accept the Risks"}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>)}
      </AnimatePresence>

      {/* VIP Checkout Modal */}
      <AnimatePresence>
        {showPaymentModal && (<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[110] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
            <motion.div initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 20 }} className={`w-full max-w-md overflow-hidden rounded-[2rem] border shadow-2xl ${isDark ? "border-white/10 bg-[#111111]" : "border-black/10 bg-white"}`}>
              <AnimatePresence mode="wait">
                {paymentState === 'idle' && (<motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                    <div className={`p-6 border-b ${isDark ? "bg-white/5 border-white/10" : "bg-black/5 border-black/10"}`}>
                      <h3 className={`text-xl font-black flex items-center gap-3 ${isDark ? "text-white" : "text-gray-900"}`}>
                        <Smartphone size={24} className="text-mg-gold"/>
                        {"VIP Signals Subscription"}
                      </h3>
                    </div>
                    <div className="p-6">
                      <div className="mb-8 space-y-3">
                        <div className="flex justify-between items-center text-sm font-medium">
                          <span className={isDark ? "text-white/60" : "text-gray-600"}>The Gold Cabal 2026</span>
                          <span className={`font-bold ${isDark ? "text-white" : "text-gray-900"}`}>$99.00</span>
                        </div>
                        <div className={`pt-3 border-t flex justify-between items-center ${isDark ? "border-white/10" : "border-black/10"}`}>
                          <span className={`font-bold uppercase tracking-wider text-sm ${isDark ? "text-white" : "text-gray-900"}`}>{"Total Today"}</span>
                          <span className="text-2xl font-black text-mg-gold">$99.00</span>
                        </div>
                      </div>
                      <p className={`text-xs mb-8 leading-relaxed font-medium ${isDark ? "text-white/50" : "text-gray-500"}`}>
                        {"By confirming, you will be granted immediate access to the VIP Telegram channel for 30 days."}
                      </p>
                      <div className="flex flex-col sm:flex-row gap-3">
                        <button onClick={() => setShowPaymentModal(false)} className={`flex-1 rounded-xl border px-4 py-3 text-sm font-bold uppercase tracking-wider transition-colors ${isDark ? "border-white/10 text-white hover:bg-white/5" : "border-black/10 text-gray-900 hover:bg-black/5"}`}>
                          {"Cancel"}
                        </button>
                        <button onClick={handleProcessPayment} className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-mg-gold px-4 py-3 text-sm font-black uppercase tracking-wider text-black transition-transform hover:scale-[1.02] hover:shadow-[0_0_15px_rgba(212,175,55,0.4)]">
                          {"Continue to Telegram"}
                          <ExternalLink size={16}/>
                        </button>
                      </div>
                    </div>
                  </motion.div>)}
                {paymentState === 'loading' && (<motion.div key="loading" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="flex flex-col items-center justify-center p-12 text-center">
                    <Loader2 size={48} className="mb-6 animate-spin text-mg-gold"/>
                    <h3 className={`text-xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>{"Activating..."}</h3>
                  </motion.div>)}
                {paymentState === 'redirecting' && (<motion.div key="redirecting" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="flex flex-col items-center justify-center p-12 text-center">
                    <Send size={48} className="mb-6 text-mg-gold drop-shadow-[0_0_15px_rgba(212,175,55,0.4)] animate-bounce"/>
                    <h3 className={`text-xl font-bold mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>{"Redirecting to Telegram..."}</h3>
                    <p className={`text-sm ${isDark ? "text-white/60" : "text-gray-600"}`}>{"You will finalize your payment via our secure bot."}</p>
                  </motion.div>)}
                {paymentState === 'success' && (<motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="flex flex-col items-center justify-center p-12 text-center">
                    <CheckCircle2 size={64} className="mb-6 text-mg-gold drop-shadow-[0_0_15px_rgba(212,175,55,0.4)]"/>
                    <h3 className={`text-2xl font-black ${isDark ? "text-white" : "text-gray-900"}`}>{"Access Granted!"}</h3>
                  </motion.div>)}
                {paymentState === 'error' && (<motion.div key="error" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="flex flex-col items-center justify-center p-12 text-center">
                    <XCircle size={64} className={`mb-6 ${isDark ? "text-white" : "text-gray-900"}`}/>
                    <h3 className={`text-xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>{"Transaction Failed"}</h3>
                    <div className="mt-8 flex w-full gap-3">
                      <button onClick={() => setShowPaymentModal(false)} className={`flex-1 rounded-xl border px-4 py-3 text-sm font-bold uppercase tracking-wider transition-colors ${isDark ? "border-white/10 text-white hover:bg-white/5" : "border-black/10 text-gray-900 hover:bg-black/5"}`}>{"Close"}</button>
                      <button onClick={() => setPaymentState('idle')} className="flex-1 rounded-xl bg-mg-gold px-4 py-3 text-sm font-black uppercase tracking-wider text-black transition-transform hover:scale-[1.02]">{"Try Again"}</button>
                    </div>
                  </motion.div>)}
              </AnimatePresence>
            </motion.div>
          </motion.div>)}
      </AnimatePresence>
    </div>);
}
