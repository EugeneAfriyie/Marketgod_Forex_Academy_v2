import { useState } from "react";
import { ArrowRight, BookOpen, Calendar, CheckCircle2, Crown, MessageCircle, PlayCircle, ShieldCheck, Star, Target, TrendingUp, UsersRound, Video, Loader2, XCircle, HelpCircle, AlertTriangle } from "lucide-react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { Link } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
const features = [
    {
        title: "Live Trading Sessions",
        description: "Look over our shoulders and trade live. Watch how experts analyze the market, execute sniper entries, and manage risk in real-time.",
        icon: Video,
    },
    {
        title: "The Ultimate Vault",
        description: "Instantly unlock every premium course on the platform. From absolute beginner concepts to elite, high-risk account flipping strategies.",
        icon: BookOpen,
    },
    {
        title: "VIP Signals & Alerts",
        description: "Don't miss a move. Receive high-probability trade setups directly to your phone, complete with precise entry, stop loss, and take profit zones.",
        icon: Target,
    },
    {
        title: "The Inner Circle",
        description: "Trading alone is a disadvantage. Join a private, elite network of driven traders. Share charts, ask questions, and elevate your edge.",
        icon: UsersRound,
    },
    {
        title: "Sunday Market Prep",
        description: "Start the week with an unfair advantage. Get detailed video breakdowns of the upcoming week so you know exactly which zones to target.",
        icon: PlayCircle,
    },
    {
        title: "1-on-1 Mentorship",
        description: "Stop guessing what went wrong. Get personalized, direct feedback on your trades and strategies from consistently profitable mentors.",
        icon: ShieldCheck,
    },
];
const benefits = [
    "Skip years of painful trial and error in the markets.",
    "Stop blowing accounts and avoid costly beginner mistakes.",
    "Develop a mechanical, emotion-free trading psychology.",
    "Learn the exact blueprints to pass prop firm challenges.",
    "Gain access to institutional-level market insights.",
    "Build a strictly disciplined, highly profitable daily routine."
];
const stats = [
    { value: "5,000+", label: { en: "Active Traders", fr: "Traders Actifs" }, icon: UsersRound },
    { value: "$5M+", label: { en: "Funded Capital", fr: "Capital Financé" }, icon: TrendingUp },
    { value: "98%", label: { en: "Success Rate", fr: "Taux de Réussite" }, icon: Star },
];
export default function MentorshipPage() {
    const { theme } = useTheme();
    const isDark = theme === "dark";
    // MOCK STATE: This will come from your user auth/subscription context later.
    // Set to `false` to see the sales page.
    // Set to `true` to see the active mentorship hub.
    const [isEnrolled, setIsEnrolled] = useState(false);
    // Payment Modal State
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [paymentState, setPaymentState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const handleOpenPayment = () => {
        setShowPaymentModal(true);
        setPaymentState('idle');
    };
    const handleClosePayment = () => {
        setShowPaymentModal(false);
        setTimeout(() => setPaymentState('idle'), 300);
    };
    const handleProcessPayment = () => {
        setPaymentState('loading');
        setTimeout(() => {
            const isSuccess = Math.random() > 0.2; // 80% chance of success for demonstration
            if (isSuccess) {
                setPaymentState('success');
                setTimeout(() => {
                    setIsEnrolled(true);
                    setShowPaymentModal(false);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                }, 2000);
            }
            else {
                setPaymentState('error');
            }
        }, 2000);
    };
    const sectionVariant: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        }
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
    // ENROLLED VIEW (ACTIVE MENTORSHIP HUB)
    // ==========================================
    if (isEnrolled) {
        return (<div className="space-y-8 pb-10">
        {/* Active Hero Section */}
        <motion.div initial="hidden" animate="visible" variants={sectionVariant} className={`relative overflow-hidden rounded-[3rem] border shadow-2xl ${isDark ? "border-mg-gold/30 bg-[#0a0a0a]" : "border-mg-gold/40 bg-white"}`}>
          <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none"><Crown size={250} className="text-mg-gold"/></div>
          <div className="absolute inset-0 bg-gradient-to-br from-mg-gold/10 via-transparent to-transparent pointer-events-none"/>
          
          <div className="relative z-10 p-10 md:p-16 flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-mg-gold/10 border border-mg-gold/30 px-4 py-1.5 text-xs font-black uppercase tracking-[0.2em] text-mg-gold mb-6 shadow-[0_0_15px_rgba(212,175,55,0.2)]">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-mg-gold opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-mg-gold"></span>
                </span>
                {"Active Subscription"}
              </div>
              <h1 className={`text-4xl md:text-5xl font-black mb-4 tracking-tight ${isDark ? "text-white" : "text-gray-900"}`}>
                {"Welcome to "}
                <span className="text-mg-gold">{"The Inner Circle."}</span>
              </h1>
              <p className={`max-w-2xl text-lg font-medium ${isDark ? "text-white/70" : "text-gray-600"}`}>
                {"You have full access to our live trading sessions, the VIP community, and the premium vault. This is where your profitability journey accelerates."}
              </p>
            </div>
            
            {/* Next Live Session Highlight Card */}
            <div className={`shrink-0 rounded-2xl border p-6 backdrop-blur-md ${isDark ? "bg-white/5 border-white/10" : "bg-black/5 border-black/10"}`}>
               <p className={`text-xs font-bold uppercase tracking-wider mb-2 ${isDark ? "text-mg-gold/80" : "text-mg-gold"}`}>
                 {"Next Live Session"}
               </p>
               <h3 className={`text-xl font-bold mb-1 ${isDark ? "text-white" : "text-gray-900"}`}>London Breakout Setup</h3>
               <p className={`text-sm mb-5 ${isDark ? "text-white/60" : "text-gray-600"}`}>Today at 8:00 AM GMT</p>
               <a href="https://zoom.us/j/1234567890" // Placeholder Zoom link
         target="_blank" rel="noreferrer" className="w-full flex items-center justify-center gap-2 rounded-xl bg-mg-gold px-6 py-3 text-sm font-bold text-black transition-transform hover:scale-105 shadow-[0_0_15px_rgba(212,175,55,0.4)]">
                 <Video size={16}/>
                 {"Join Trading Room"}
               </a>
            </div>
          </div>
        </motion.div>

        {/* Mentorship Hub Action Grid */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={gridContainerVariant} className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
          
          {/* VIP Community Card */}
          <motion.div variants={gridItemVariant} className={`group relative overflow-hidden rounded-[2rem] border p-8 transition-all hover:-translate-y-1 hover:shadow-xl ${isDark ? "border-white/10 bg-black/20 hover:border-mg-gold/50" : "border-black/10 bg-[#faf7f0] hover:border-mg-gold/50"}`}>
            <div className={`mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl ${isDark ? "bg-white/10 text-white" : "bg-black/5 text-gray-900"}`}>
              <MessageCircle size={24}/>
            </div>
            <h3 className={`mb-2 text-2xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>{"VIP Community"}</h3>
            <p className={`mb-6 text-sm leading-relaxed ${isDark ? "text-white/60" : "text-gray-600"}`}>
              {"Join the exclusive Telegram group for daily analysis, discussions, and signal setups."}
            </p>
            <a href="https://t.me/marketgodcommunity" target="_blank" rel="noreferrer" className={`inline-flex items-center gap-2 text-sm font-bold transition-transform group-hover:translate-x-1 ${isDark ? "text-white" : "text-gray-900"}`}>
              {"Open Telegram"} <ArrowRight size={16}/>
            </a>
          </motion.div>

          {/* 1-on-1 Booking Card */}
          <motion.div variants={gridItemVariant} className={`group relative overflow-hidden rounded-[2rem] border p-8 transition-all hover:-translate-y-1 hover:shadow-xl ${isDark ? "border-white/10 bg-black/20 hover:border-mg-gold/50" : "border-black/10 bg-[#faf7f0] hover:border-mg-gold/50"}`}>
            <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-mg-gold/20 text-mg-gold">
              <Calendar size={24}/>
            </div>
            <h3 className={`mb-2 text-2xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>{"1-on-1 Mentorship"}</h3>
            <p className={`mb-6 text-sm leading-relaxed ${isDark ? "text-white/60" : "text-gray-600"}`}>
              {"Book your private chart review and psychology session with our expert mentors."}
            </p>
            <Link to="/dashboard/meetings" className={`inline-flex items-center gap-2 text-sm font-bold text-mg-gold transition-transform group-hover:translate-x-1`}>
              {"Schedule a Call"} <ArrowRight size={16}/>
            </Link>
          </motion.div>

          {/* VIP Signals Card */}
          <motion.div variants={gridItemVariant} className={`group relative overflow-hidden rounded-[2rem] border p-8 transition-all hover:-translate-y-1 hover:shadow-xl ${isDark ? "border-white/10 bg-black/20 hover:border-mg-gold/50" : "border-black/10 bg-[#faf7f0] hover:border-mg-gold/50"}`}>
            <div className={`mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl ${isDark ? "bg-white/10 text-white" : "bg-black/5 text-gray-900"}`}>
              <Target size={24}/>
            </div>
            <h3 className={`mb-2 text-2xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>{"VIP Signals"}</h3>
            <p className={`mb-6 text-sm leading-relaxed ${isDark ? "text-white/60" : "text-gray-600"}`}>
              {"View the latest high-probability trade setups and entry zones from our snipers."}
            </p>
            <Link to="/dashboard/signals" className={`inline-flex items-center gap-2 text-sm font-bold transition-transform group-hover:translate-x-1 ${isDark ? "text-white" : "text-gray-900"}`}>
              {"View Signals Dashboard"} <ArrowRight size={16}/>
            </Link>
          </motion.div>

          {/* Premium Vault / Courses Card */}
          <motion.div variants={gridItemVariant} className={`group relative overflow-hidden rounded-[2rem] border p-8 transition-all hover:-translate-y-1 hover:shadow-xl ${isDark ? "border-white/10 bg-black/20 hover:border-mg-gold/50" : "border-black/10 bg-[#faf7f0] hover:border-mg-gold/50"}`}>
            <div className={`mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl ${isDark ? "bg-white/10 text-white" : "bg-black/5 text-gray-900"}`}>
              <BookOpen size={24}/>
            </div>
            <h3 className={`mb-2 text-2xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>{"The Premium Vault"}</h3>
            <p className={`mb-6 text-sm leading-relaxed ${isDark ? "text-white/60" : "text-gray-600"}`}>
              {"Get instant access to all our advanced courses, including account flipping strategies."}
            </p>
            <Link to="/dashboard/courses/enrolled" className={`inline-flex items-center gap-2 text-sm font-bold transition-transform group-hover:translate-x-1 ${isDark ? "text-white" : "text-gray-900"}`}>
              {"Resume Learning"} <ArrowRight size={16}/>
            </Link>
          </motion.div>
        </motion.div>
      </div>);
    }
    // ==========================================
    // UNENROLLED VIEW (SALES LANDING PAGE)
    // ==========================================
    return (<div className="space-y-8 pb-10">
      {/* Hero Section */}
      <motion.div initial="hidden" animate="visible" variants={sectionVariant} className={`relative overflow-hidden rounded-[3rem] border shadow-2xl ${isDark ? "border-white/5 bg-[#0a0a0a]" : "border-mg-gold/20 bg-white"}`}>
        {/* Premium Ambient Glows */}
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-mg-gold/20 blur-[120px] rounded-full pointer-events-none mix-blend-screen"/>
        <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-mg-gold/10 blur-[100px] rounded-full pointer-events-none"/>
        
        <div className="relative z-10 p-10 md:p-16 lg:p-24 flex flex-col items-center text-center">
          <span className="inline-block rounded-full bg-mg-gold/20 border border-mg-gold/50 px-5 py-2 text-xs font-black uppercase tracking-[0.25em] text-mg-gold mb-6 shadow-[0_0_15px_rgba(212,175,55,0.2)]">
            {"Exclusive VIP Access"}
          </span>
          <h1 className={`text-4xl md:text-6xl lg:text-7xl font-black mb-6 tracking-tight ${isDark ? "text-white" : "text-gray-900"}`}>
            {"Trade Like A "}
            <span className="bg-gradient-to-r from-mg-gold to-yellow-200 bg-clip-text text-transparent drop-shadow-sm">Marketgod</span>
          </h1>
          <p className={`max-w-3xl text-lg md:text-xl leading-relaxed font-medium ${isDark ? "text-white/70" : "text-gray-600"}`}>
            {"Stop guessing. Start dominating. Join the elite circle, get unlimited access to the premium vault, trade live with us, and fast-track your journey to consistent profitability."}
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <button onClick={handleOpenPayment} className="group relative overflow-hidden rounded-xl bg-mg-gold px-10 py-5 text-sm font-black uppercase tracking-[0.15em] text-black shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(212,175,55,0.6)]">
              <span className="relative z-10">{"Claim Your Edge Now"}</span>
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:animate-shimmer"/>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Trust & Social Proof Bar */}
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }} variants={gridContainerVariant} className={`grid grid-cols-1 md:grid-cols-3 gap-6 rounded-[2rem] border p-8 shadow-lg backdrop-blur-xl ${isDark ? "border-white/5 bg-white/[0.02]" : "border-black/5 bg-[#faf7f0]/50"}`}>
        {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (<motion.div variants={gridItemVariant} key={idx} className={`flex flex-col items-center justify-center text-center ${idx !== stats.length - 1 ? (isDark ? "md:border-r border-white/10" : "md:border-r border-black/10") : ""}`}>
              <div className="mb-3 rounded-full bg-mg-gold/10 p-3 text-mg-gold">
                <Icon size={24}/>
              </div>
              <h3 className={`text-3xl font-black tracking-tight ${isDark ? "text-white" : "text-gray-900"}`}>
                {stat.value}
              </h3>
              <p className={`mt-1 text-sm font-bold uppercase tracking-widest ${isDark ? "text-white/50" : "text-gray-500"}`}>
                {stat.label.en}
              </p>
            </motion.div>);
        })}
      </motion.div>

      {/* Features Grid */}
      <div className="pt-8">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.8 }} variants={sectionVariant} className="mb-8 text-center">
          <h2 className={`text-3xl md:text-4xl font-black ${isDark ? "text-white" : "text-gray-900"}`}>
            {"The Ultimate Arsenal"}
          </h2>
          <p className={`mt-3 text-lg ${isDark ? "text-mg-gold/80" : "text-mg-gold"}`}>
            {"Everything you need to destroy the markets, all in one place."}
          </p>
        </motion.div>
        
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={gridContainerVariant} className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (<motion.div variants={gridItemVariant} key={idx} className={`group relative overflow-hidden rounded-[2rem] border p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(212,175,55,0.15)] ${isDark ? "border-white/5 bg-white/[0.01] hover:bg-white/[0.03] hover:border-mg-gold/30 backdrop-blur-md" : "border-black/5 bg-[#faf7f0] hover:bg-white hover:border-mg-gold/30"}`}>
                <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-mg-gold/20 to-mg-gold/5 border border-mg-gold/20 text-mg-gold shadow-inner transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                  <Icon size={24}/>
                </div>
                <h3 className={`mb-3 text-xl font-black ${isDark ? "text-white" : "text-gray-900"}`}>{feature.title}</h3>
                <p className={`text-sm leading-relaxed font-medium ${isDark ? "text-white/60" : "text-gray-600"}`}>{feature.description}</p>
              </motion.div>);
        })}
        </motion.div>
      </div>

      {/* Benefits Section */}
      <div className="pt-8">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={sectionVariant} className={`relative overflow-hidden rounded-[3rem] border shadow-2xl lg:grid lg:grid-cols-2 ${isDark ? "border-white/5 bg-[#0a0a0a]" : "border-black/5 bg-white"}`}>
           {/* Subtly glowing badge */}
           <div className="absolute top-0 right-0 p-10 opacity-10 pointer-events-none"><Crown size={200} className="text-mg-gold"/></div>
           
           <div className={`relative z-10 p-10 md:p-16 lg:flex lg:flex-col lg:justify-center ${isDark ? "bg-gradient-to-r from-black to-transparent" : "bg-gradient-to-r from-gray-50 to-transparent"}`}>
              <h2 className={`text-3xl md:text-4xl font-black mb-5 leading-tight ${isDark ? "text-white" : "text-gray-900"}`}>
                {"Stop Losing."} <br />
                <span className="text-mg-gold">{"Start Winning."}</span>
              </h2>
              <p className={`text-lg leading-relaxed font-medium ${isDark ? "text-white/70" : "text-gray-600"}`}>
                {"The market is ruthless to the unprepared. Our mentorship is the ultimate shortcut, engineered to transform confused beginners into cold, calculated, and consistently profitable snipers."}
              </p>
           </div>
           <div className="relative z-10 p-10 md:p-16 flex items-center">
             <div className="space-y-5">
               {benefits.map((benefit, idx) => (<div key={idx} className="flex items-start gap-4">
                   <CheckCircle2 size={24} className="mt-0.5 shrink-0 text-mg-gold drop-shadow-[0_0_8px_rgba(212,175,55,0.5)]"/>
                   <p className={`text-lg font-bold ${isDark ? "text-white/90" : "text-gray-800"}`}>{benefit}</p>
                 </div>))}
             </div>
           </div>
        </motion.div>
      </div>

      {/* Final CTA */}
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }} variants={sectionVariant} className="mt-8 relative overflow-hidden rounded-[3rem] p-10 md:p-16 text-center shadow-2xl border border-mg-gold/30">
        <div className="absolute inset-0 bg-mg-gold/10 backdrop-blur-xl"/>
        <div className="relative z-10">
          <h2 className={`text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight ${isDark ? "text-white" : "text-gray-900"}`}>
            {"Your Edge Awaits."}
          </h2>
          <p className={`mx-auto max-w-2xl mb-10 text-xl font-medium ${isDark ? "text-white/80" : "text-gray-800"}`}>
            {"Don't trade another day without a proven system and an army of winners behind you."}
          </p>
          <div className="flex justify-center">
            <button onClick={handleOpenPayment} className="group relative overflow-hidden inline-flex items-center gap-3 rounded-2xl bg-mg-gold px-12 py-6 text-base font-black uppercase tracking-[0.15em] text-black shadow-[0_0_30px_rgba(212,175,55,0.5)] transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(212,175,55,0.7)]">
              <span className="relative z-10">{"Unlock VIP Access Now"}</span>
              <ArrowRight size={22} className="relative z-10 transition-transform group-hover:translate-x-2"/>
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/50 to-transparent group-hover:animate-shimmer"/>
            </button>
          </div>
        </div>
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
                {"Have Questions?"}
              </h3>
              <p className={`font-medium ${isDark ? "text-white/60" : "text-gray-600"}`}>
                {"Unsure if the mentorship is right for you? Our support team can help answer any questions you have."}
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

      {/* Payment Checkout Modal */}
      <AnimatePresence>
        {showPaymentModal && (<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
            <motion.div initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 20 }} className={`w-full max-w-md overflow-hidden rounded-3xl border shadow-2xl ${isDark ? "border-white/10 bg-[#111111]" : "border-black/10 bg-white"}`}>
              <AnimatePresence mode="wait">
                {paymentState === 'idle' && (<motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                    <div className={`p-6 ${isDark ? "bg-white/5" : "bg-black/5"}`}>
                      <h3 className={`text-xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
                        {"Mentorship Details"}
                      </h3>
                    </div>
                    <div className="p-6">
                      <div className="mb-6 space-y-3">
                        <div className="flex justify-between items-center">
                          <span className={isDark ? "text-white/60" : "text-gray-600"}>{"Annual Subscription"}</span>
                          <span className={`font-bold ${isDark ? "text-white" : "text-gray-900"}`}>$499.00</span>
                        </div>
                        <div className={`pt-3 border-t flex justify-between items-center ${isDark ? "border-white/10" : "border-black/10"}`}>
                          <span className={`font-bold ${isDark ? "text-white" : "text-gray-900"}`}>{"Total Due"}</span>
                          <span className="text-xl font-black text-mg-gold">$499.00</span>
                        </div>
                      </div>
                      <p className={`text-sm mb-8 leading-relaxed ${isDark ? "text-white/60" : "text-gray-600"}`}>
                        {"You are about to unlock full VIP access. This transaction is secure and encrypted."}
                      </p>
                      <div className="flex flex-col sm:flex-row gap-3">
                        <button onClick={handleClosePayment} className={`flex-1 rounded-xl border px-4 py-3 text-sm font-semibold transition-colors ${isDark ? "border-white/10 text-white hover:bg-white/5" : "border-black/10 text-gray-900 hover:bg-black/5"}`}>
                          {"Cancel"}
                        </button>
                        <button onClick={handleProcessPayment} className="flex-1 rounded-xl bg-mg-gold px-4 py-3 text-sm font-black uppercase tracking-wider text-black transition-transform hover:scale-[1.02] hover:shadow-[0_0_15px_rgba(212,175,55,0.4)]">
                          {"Pay Now"}
                        </button>
                      </div>
                    </div>
                  </motion.div>)}

                {paymentState === 'loading' && (<motion.div key="loading" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="flex flex-col items-center justify-center p-10 text-center">
                    <Loader2 size={48} className="mb-6 animate-spin text-mg-gold"/>
                    <h3 className={`text-xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>{"Processing..."}</h3>
                    <p className={`mt-2 text-sm ${isDark ? "text-white/60" : "text-gray-600"}`}>{"Please wait a moment."}</p>
                  </motion.div>)}

                {paymentState === 'success' && (<motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="flex flex-col items-center justify-center p-10 text-center">
                    <CheckCircle2 size={56} className="mb-6 text-green-500"/>
                    <h3 className={`text-xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>{"Payment Successful!"}</h3>
                    <p className={`mt-2 text-sm ${isDark ? "text-white/60" : "text-gray-600"}`}>{"Redirecting..."}</p>
                  </motion.div>)}

                {paymentState === 'error' && (<motion.div key="error" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="flex flex-col items-center justify-center p-10 text-center">
                    <XCircle size={56} className="mb-6 text-red-500"/>
                    <h3 className={`text-xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>{"Payment Failed"}</h3>
                    <p className={`mt-2 mb-6 text-sm ${isDark ? "text-white/60" : "text-gray-600"}`}>{"Please try again."}</p>
                    <div className="flex w-full gap-3">
                      <button onClick={handleClosePayment} className={`flex-1 rounded-xl border px-4 py-3 text-sm font-semibold transition-colors ${isDark ? "border-white/10 text-white hover:bg-white/5" : "border-black/10 text-gray-900 hover:bg-black/5"}`}>{"Cancel"}</button>
                      <button onClick={() => setPaymentState('idle')} className="flex-1 rounded-xl bg-mg-gold px-4 py-3 text-sm font-black uppercase tracking-wider text-black transition-transform hover:scale-[1.02] hover:shadow-[0_0_15px_rgba(212,175,55,0.4)]">{"Try Again"}</button>
                    </div>
                  </motion.div>)}
              </AnimatePresence>
            </motion.div>
          </motion.div>)}
      </AnimatePresence>
    </div>);
}
