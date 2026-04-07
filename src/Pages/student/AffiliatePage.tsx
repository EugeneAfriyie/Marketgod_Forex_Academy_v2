import { useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { BadgeDollarSign, Link2, TrendingUp, Users, Copy, CheckCircle2,  Wallet, Share2, X, Loader2, Bitcoin, Landmark, Smartphone, MessageCircle, Twitter, Send, Facebook, Download, Image as ImageIcon, FileText, History, Megaphone, Percent, Zap, RefreshCcw, UserPlus, Target, ArrowRight } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
// --- MOCK DATA ---
const stats = [
    { id: 'clicks', label: { en: "Link Clicks", fr: "Clics sur le lien" }, value: "1,248", icon: Link2, trend: "+12%" },
    { id: 'referrals', label: { en: "Active Referrals", fr: "Parrainages Actifs" }, value: "34", icon: Users, trend: "+3 this week" },
    { id: 'earnings', label: { en: "Total Earnings", fr: "Gains Totaux" }, value: "$1,420.00", icon: BadgeDollarSign, trend: "Available" },
];
const recentReferrals = [
    { user: "Michael T.", plan: "Mentorship Program", date: "Oct 24, 2026", commission: "+$109.40", status: "Paid" },
    { user: "Sarah J.", plan: "VIP Signals", date: "Oct 22, 2026", commission: "+$19.80", status: "Pending" },
    { user: "David O.", plan: "Mentorship Program", date: "Oct 15, 2026", commission: "+$109.40", status: "Paid" },
    { user: "Kwame A.", plan: "Sniper Workshop", date: "Oct 10, 2026", commission: "+$13.40", status: "Paid" },
];
const allReferrals = [
    ...recentReferrals,
    { user: "Emmanuel K.", plan: "VIP Signals", date: "Oct 05, 2026", commission: "+$19.80", status: "Paid" },
    { user: "Jessica W.", plan: "Sniper Workshop", date: "Oct 02, 2026", commission: "+$13.40", status: "Paid" },
    { user: "Samuel O.", plan: "Mentorship Program", date: "Sep 28, 2026", commission: "+$109.40", status: "Paid" },
    { user: "Linda A.", plan: "Mentorship Program", date: "Sep 25, 2026", commission: "+$109.40", status: "Paid" },
    { user: "Frank D.", plan: "VIP Signals", date: "Sep 20, 2026", commission: "+$19.80", status: "Paid" },
];
const payoutHistory = [
    { id: "PO-8921", amount: "$500.00", date: "Sep 15, 2026", method: "Crypto (USDT)", status: "Completed" },
    { id: "PO-7542", amount: "$150.00", date: "Aug 01, 2026", method: "Mobile Money", status: "Completed" },
];
const marketingAssets = [
    { id: "ma1", title: { en: "Instagram Story Banners", fr: "Bannières Story IG" }, format: "ZIP", size: "12 MB", icon: ImageIcon },
    { id: "ma2", title: { en: "Email Swipe Copy", fr: "Modèles d'Emails" }, format: "PDF", size: "1.2 MB", icon: FileText },
    { id: "ma3", title: { en: "MarketGod Logos", fr: "Logos MarketGod" }, format: "PNG", size: "4.5 MB", icon: ImageIcon },
];
export default function AffiliatePage() {
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const [copied, setCopied] = useState(false);
    const referralLink = "https://marketgodacademy.com/join?ref=MG-2026-ELITE";
    // DEV SIMULATION STATE
    const [isRegistered, setIsRegistered] = useState(false);
    const [isRegistering, setIsRegistering] = useState(false);
    const [hasReferrals, setHasReferrals] = useState(true);
    const activeStats = hasReferrals ? stats : [
        { id: 'clicks', label: { en: "Link Clicks", fr: "Clics sur le lien" }, value: "0", icon: Link2, trend: "0%" },
        { id: 'referrals', label: { en: "Active Referrals", fr: "Parrainages Actifs" }, value: "0", icon: Users, trend: "0 this week" },
        { id: 'earnings', label: { en: "Total Earnings", fr: "Gains Totaux" }, value: "$0.00", icon: BadgeDollarSign, trend: "Available" },
    ];
    const activeRecentReferrals = hasReferrals ? recentReferrals : [];
    const activeAllReferrals = hasReferrals ? allReferrals : [];
    const activePayoutHistory = hasReferrals ? payoutHistory : [];
    const walletBalance = hasReferrals ? "$420.00" : "$0.00";
    const handleRegister = () => {
        setIsRegistering(true);
        setTimeout(() => {
            setIsRegistering(false);
            setIsRegistered(true);
        }, 1500);
    };
    // Share links
    const shareText = encodeURIComponent("Ready to dominate the markets? Join MarketGod Academy using my link!");
    const encodedLink = encodeURIComponent(referralLink);
    const handleCopy = () => {
        navigator.clipboard.writeText(referralLink);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };
    // Payout Modal State
    const [showPayoutModal, setShowPayoutModal] = useState(false);
    const [payoutState, setPayoutState] = useState<'idle' | 'loading' | 'success'>('idle');
    const [payoutMethod, setPayoutMethod] = useState<'crypto' | 'bank' | 'momo'>('crypto');
    const [payoutAddress, setPayoutAddress] = useState("");
    const handleProcessPayout = (e: React.FormEvent) => {
        e.preventDefault();
        if (!payoutAddress.trim())
            return;
        setPayoutState('loading');
        setTimeout(() => {
            setPayoutState('success');
        }, 2000);
    };
    const closePayoutModal = () => {
        setShowPayoutModal(false);
        setTimeout(() => {
            setPayoutState('idle');
            setPayoutAddress("");
        }, 300);
    };
    // All Referrals Modal State
    const [showAllReferralsModal, setShowAllReferralsModal] = useState(false);
    // Payout History Modal State
    const [showPayoutHistoryModal, setShowPayoutHistoryModal] = useState(false);
    const container: Variants = {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };
    const item: Variants = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } }
    };
    // ==========================================
    // UNREGISTERED VIEW (AFFILIATE PROMO PAGE)
    // ==========================================
    if (!isRegistered) {
        return (<div key="unregistered-view" className="space-y-16 pb-16">
        {/* Hero Section */}
        <motion.div initial="hidden" animate="show" variants={container} className={`relative overflow-hidden rounded-[3rem] border shadow-2xl ${isDark ? "border-white/5 bg-[#0a0a0a]" : "border-black/5 bg-white"}`}>
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-mg-gold/10 blur-[120px] rounded-full pointer-events-none"/>
          <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none"><Megaphone size={250} className="text-mg-gold"/></div>
          
          <div className="relative z-10 p-8 sm:p-10 md:p-16 lg:p-24 flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-mg-gold/10 border border-mg-gold/30 px-4 py-1.5 text-xs font-black uppercase tracking-[0.2em] text-mg-gold mb-6 shadow-[0_0_15px_rgba(212,175,55,0.2)]">
              <TrendingUp size={14}/>
              {"Partner Program"}
            </div>
            <h1 className={`text-4xl md:text-6xl lg:text-7xl font-black mb-6 tracking-tight ${isDark ? "text-white" : "text-gray-900"}`}>
              {"Share the Mastery. "} <br />
              <span className="text-mg-gold">{"Earn Passive Income."}</span>
            </h1>
            <p className={`max-w-3xl text-lg md:text-xl leading-relaxed font-medium mb-10 ${isDark ? "text-white/70" : "text-gray-600"}`}>
              {"Join the MarketGod Affiliate Program and earn a recurring 20% commission for every student you bring in. Turn your network into a brand new income stream."}
            </p>
            
            <button onClick={handleRegister} disabled={isRegistering} className="group relative overflow-hidden inline-flex items-center justify-center gap-3 rounded-2xl bg-mg-gold px-6 sm:px-12 py-4 sm:py-5 text-xs sm:text-sm font-black uppercase tracking-[0.15em] text-black shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(212,175,55,0.6)] disabled:opacity-70 disabled:hover:scale-100">
              {isRegistering ? <Loader2 size={20} className="animate-spin relative z-10"/> : <UserPlus size={20} className="relative z-10"/>}
              <span className="relative z-10">{isRegistering ? ("Setting up account...") : ("Become an Affiliate")}</span>
              {!isRegistering && <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/50 to-transparent group-hover:animate-shimmer"/>}
            </button>
          </div>
        </motion.div>

        {/* The Value of Referrals / Earning Potential */}
        <motion.div initial="hidden" animate="show" variants={container} className="relative z-10">
          <div className="text-center mb-12">
             <h2 className={`text-3xl md:text-4xl font-black mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>
               {"Why Grow Your Network?"}
             </h2>
             <p className={`max-w-2xl mx-auto text-lg font-medium ${isDark ? "text-white/60" : "text-gray-600"}`}>
               {"Every successful trader knows the power of multiple income streams. Affiliate marketing allows you to fund your own trading accounts without risking personal capital."}
             </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
             <motion.div variants={item} className={`p-6 sm:p-8 rounded-[2.5rem] border text-center transition-transform hover:-translate-y-1 hover:shadow-xl ${isDark ? "bg-[#111111] border-white/5" : "bg-[#faf7f0] border-black/5"}`}>
                <div className="mx-auto w-16 h-16 bg-green-500/10 text-green-500 flex items-center justify-center rounded-2xl mb-6 shadow-inner">
                  <BadgeDollarSign size={32}/>
                </div>
                <h3 className={`text-3xl font-black mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>~$100</h3>
                <p className={`font-bold uppercase tracking-wider text-xs mb-4 ${isDark ? "text-mg-gold/80" : "text-mg-gold"}`}>{"Per VIP Signup"}</p>
                <p className={`text-sm font-medium leading-relaxed ${isDark ? "text-white/60" : "text-gray-500"}`}>{"Earn roughly $100 for every single student who joins the annual mentorship through your link."}</p>
             </motion.div>

             <motion.div variants={item} className={`p-6 sm:p-8 rounded-[2.5rem] border text-center transition-transform hover:-translate-y-1 hover:shadow-xl ${isDark ? "bg-[#111111] border-white/5" : "bg-[#faf7f0] border-black/5"}`}>
                <div className="mx-auto w-16 h-16 bg-mg-gold/10 text-mg-gold flex items-center justify-center rounded-2xl mb-6 shadow-inner">
                  <Target size={32}/>
                </div>
                <h3 className={`text-3xl font-black mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>10 {"Members"}</h3>
                <p className={`font-bold uppercase tracking-wider text-xs mb-4 ${isDark ? "text-mg-gold/80" : "text-mg-gold"}`}>{"= A Funded Account"}</p>
                <p className={`text-sm font-medium leading-relaxed ${isDark ? "text-white/60" : "text-gray-500"}`}>{"Refer just 10 people and you've earned $1,000—enough to buy a $100k Prop Firm challenge!"}</p>
             </motion.div>

             <motion.div variants={item} className={`p-6 sm:p-8 rounded-[2.5rem] border text-center transition-transform hover:-translate-y-1 hover:shadow-xl ${isDark ? "bg-[#111111] border-white/5" : "bg-[#faf7f0] border-black/5"}`}>
                <div className="mx-auto w-16 h-16 bg-blue-500/10 text-blue-500 flex items-center justify-center rounded-2xl mb-6 shadow-inner">
                  <TrendingUp size={32}/>
                </div>
                <h3 className={`text-3xl font-black mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>∞</h3>
                <p className={`font-bold uppercase tracking-wider text-xs mb-4 ${isDark ? "text-mg-gold/80" : "text-mg-gold"}`}>{"Unlimited Potential"}</p>
                <p className={`text-sm font-medium leading-relaxed ${isDark ? "text-white/60" : "text-gray-500"}`}>{"There is no cap. The more students you help discover MarketGod, the more you earn every single month."}</p>
             </motion.div>
          </div>
        </motion.div>

        {/* How it Works */}
        <motion.div initial="hidden" animate="show" variants={container} className="text-center">
          <h2 className={`text-3xl md:text-4xl font-black mb-12 ${isDark ? "text-white" : "text-gray-900"}`}>
            {"How it Works"}
          </h2>
          <div className="grid md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-1/4 left-1/6 right-1/6 h-0.5 bg-gradient-to-r from-transparent via-mg-gold/30 to-transparent -z-10"/>
            
            {[
                { icon: Link2, title: "1. Get Your Link", desc: "Sign up to instantly generate your unique affiliate tracking link." },
                { icon: Share2, title: "2. Share with others", desc: "Promote the academy on your social media, blogs, or directly to friends." },
                { icon: BadgeDollarSign, title: "3. Get Paid", desc: "Earn 20% on every sale. Withdraw via Crypto, Bank, or Mobile Money." }
            ].map((step, idx) => (<motion.div variants={item} key={idx} className={`flex flex-col items-center p-6 sm:p-8 rounded-[2rem] border bg-opacity-50 backdrop-blur-sm ${isDark ? "bg-[#111111] border-white/5" : "bg-[#faf7f0] border-black/5"}`}>
                <div className="h-16 w-16 rounded-full bg-mg-gold/10 flex items-center justify-center text-mg-gold mb-6 border border-mg-gold/20 shadow-inner">
                  <step.icon size={28}/>
                </div>
                <h3 className={`text-xl font-bold mb-3 ${isDark ? "text-white" : "text-gray-900"}`}>{step.title}</h3>
                <p className={`text-sm font-medium leading-relaxed ${isDark ? "text-white/60" : "text-gray-600"}`}>{step.desc}</p>
              </motion.div>))}
          </div>
        </motion.div>

        {/* Why Join Grid */}
        <motion.div initial="hidden" animate="show" variants={container}>
          <div className="grid gap-6 md:grid-cols-2">
            {[
                { icon: Percent, title: "High Commissions", desc: "We offer a highly competitive 20% flat commission rate on our courses and subscriptions." },
                { icon: RefreshCcw, title: "Recurring Revenue", desc: "For subscription products, you get paid every single time your referral renews their VIP access." },
                { icon: Zap, title: "Fast Payouts", desc: "Request your earnings at any time with lightning-fast 24-48 hour processing times." },
                { icon: FileText, title: "Marketing Assets", desc: "Gain access to high-converting banners, logos, and email swipe copy to make promoting easy." }
            ].map((benefit, idx) => (<motion.div variants={item} key={idx} className={`flex items-start gap-4 sm:gap-5 p-6 sm:p-8 rounded-[2.5rem] border transition-transform hover:-translate-y-1 ${isDark ? "bg-white/[0.02] border-white/5 hover:border-mg-gold/30" : "bg-white border-black/5 hover:border-mg-gold/30"}`}>
                <div className="shrink-0 p-4 rounded-2xl bg-mg-gold/10 text-mg-gold">
                  <benefit.icon size={24}/>
                </div>
                <div>
                  <h4 className={`text-xl font-black mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>{benefit.title}</h4>
                  <p className={`text-sm font-medium leading-relaxed ${isDark ? "text-white/60" : "text-gray-600"}`}>{benefit.desc}</p>
                </div>
              </motion.div>))}
          </div>
        </motion.div>

        {/* Final CTA */}
        <motion.div initial="hidden" animate="show" variants={container} className="relative overflow-hidden rounded-[3rem] p-8 sm:p-10 md:p-16 text-center shadow-2xl border border-mg-gold/30">
          <div className="absolute inset-0 bg-mg-gold/10 backdrop-blur-xl"/>
          <div className="relative z-10">
            <h2 className={`text-3xl md:text-5xl font-black mb-6 tracking-tight ${isDark ? "text-white" : "text-gray-900"}`}>
              {"Ready to scale your income?"}
            </h2>
            <p className={`mx-auto max-w-2xl mb-10 text-lg font-medium ${isDark ? "text-white/80" : "text-gray-800"}`}>
              {"Signing up is free and takes less than 30 seconds."}
            </p>
            <button onClick={handleRegister} disabled={isRegistering} className="group relative overflow-hidden inline-flex items-center justify-center gap-3 rounded-2xl bg-mg-gold w-full sm:w-auto px-6 sm:px-10 py-4 sm:py-5 text-xs sm:text-sm font-black uppercase tracking-[0.15em] text-black shadow-[0_0_30px_rgba(212,175,55,0.5)] transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(212,175,55,0.7)] disabled:opacity-70 disabled:hover:scale-100">
              {isRegistering ? <Loader2 size={18} className="animate-spin relative z-10"/> : null}
              <span className="relative z-10">{isRegistering ? ("Generating your link...") : ("Generate My Link")}</span>
              {!isRegistering && <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/50 to-transparent group-hover:animate-shimmer"/>}
            </button>
          </div>
        </motion.div>

        {/* DEV SIMULATION TOGGLE - REMOVE LATER */}
        <div className="fixed bottom-6 left-6 z-[100] flex flex-col gap-2 p-3 rounded-2xl bg-black/90 backdrop-blur-md border border-white/20 shadow-2xl">
          <p className="text-[10px] font-bold text-white/50 uppercase tracking-wider text-center">Simulate Role</p>
          <div className="flex gap-2">
            <button onClick={() => setIsRegistered(false)} className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors ${!isRegistered ? "bg-red-500 text-white" : "text-white/50 hover:bg-white/10"}`}>Not Registered</button>
            <button onClick={() => { setIsRegistered(true); setHasReferrals(false); }} className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors ${isRegistered && !hasReferrals ? "bg-mg-gold text-black" : "text-white/50 hover:bg-white/10"}`}>New Affiliate</button>
            <button onClick={() => { setIsRegistered(true); setHasReferrals(true); }} className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors ${isRegistered && hasReferrals ? "bg-mg-gold text-black" : "text-white/50 hover:bg-white/10"}`}>Active Affiliate</button>
          </div>
        </div>
      </div>);
    }
    // ==========================================
    // REGISTERED VIEW (AFFILIATE DASHBOARD)
    // ==========================================
    return (<div key="registered-view" className="space-y-8 pb-10">
      {/* Hero Section */}
      <motion.div initial="hidden" animate="show" variants={container} className={`relative overflow-hidden rounded-[3rem] border shadow-lg flex flex-col md:flex-row md:items-center justify-between ${isDark ? "border-white/5 bg-[#0a0a0a]" : "border-black/5 bg-white"}`}>
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-mg-gold/10 blur-[100px] rounded-full pointer-events-none"/>
        <div className="relative z-10 p-6 sm:p-8 md:p-12 lg:p-16 flex-1">
          <h1 className={`text-4xl md:text-5xl font-black mb-4 tracking-tight ${isDark ? "text-white" : "text-gray-900"}`}>
            {"Affiliate "}
            <span className="text-mg-gold">{"Program."}</span>
          </h1>
          <p className={`max-w-2xl text-lg font-medium ${isDark ? "text-white/70" : "text-gray-600"}`}>
            {"Share your unique referral link to earn a 20% commission on every new student who joins MarketGod Academy."}
          </p>
        </div>

        {/* Wallet Display */}
        <div className={`relative z-10 p-6 sm:p-8 md:p-12 lg:p-16 border-t md:border-t-0 md:border-l flex flex-col items-center justify-center shrink-0 ${isDark ? "border-white/10 bg-white/5" : "border-black/10 bg-black/5"}`}>
          <p className={`text-sm font-bold uppercase tracking-wider mb-2 ${isDark ? "text-mg-gold/80" : "text-mg-gold"}`}>
            {"Wallet Balance"}
          </p>
          <div className="flex items-center gap-3">
            <Wallet size={32} className="text-mg-gold drop-shadow-[0_0_15px_rgba(212,175,55,0.5)]"/>
            <span className="text-4xl sm:text-5xl font-black text-mg-gold">{walletBalance}</span>
          </div>
          <div className="mt-6 flex flex-col w-full gap-3">
            <button onClick={() => setShowPayoutModal(true)} disabled={!hasReferrals} className={`w-full rounded-xl bg-mg-gold px-6 py-3.5 text-sm font-black uppercase tracking-wider text-black shadow-[0_0_15px_rgba(212,175,55,0.3)] transition-transform hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed`}>
              {"Request Payout"}
            </button>
            <button onClick={() => setShowPayoutHistoryModal(true)} className={`flex items-center justify-center gap-2 w-full rounded-xl border-2 px-6 py-3 text-sm font-bold uppercase tracking-wider transition-colors ${isDark ? "border-mg-gold/50 text-mg-gold hover:bg-mg-gold/10" : "border-mg-gold text-mg-gold hover:bg-mg-gold/10"}`}>
              <History size={16}/>
              {"Payout History"}
            </button>
          </div>
        </div>
      </motion.div>

      {/* Link Copier & Share */}
      <motion.div initial="hidden" animate="show" variants={container} className="grid md:grid-cols-3 gap-6">
        <motion.div variants={item} className={`md:col-span-2 p-6 sm:p-8 rounded-[2rem] border shadow-lg ${isDark ? "bg-[#111111] border-white/10" : "bg-white border-black/10"}`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <h2 className={`text-xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
              {"Your Referral Link"}
            </h2>
            <span className="flex items-center gap-1.5 text-sm font-bold text-green-500 bg-green-500/10 px-3 py-1 rounded-lg">
              <TrendingUp size={16}/> 20% Commission
            </span>
          </div>
          
          <div className={`flex flex-col sm:flex-row items-stretch sm:items-center gap-3 p-2 rounded-2xl border ${isDark ? "bg-black/50 border-white/10" : "bg-gray-50 border-black/10"}`}>
            <div className="flex-1 relative w-full overflow-hidden">
               <input 
                 type="text" 
                 readOnly 
                 value={referralLink} 
                 className={`w-full px-4 py-2 sm:py-2 bg-transparent font-mono text-xs sm:text-sm outline-none text-center sm:text-left ${isDark ? "text-white/70" : "text-gray-600"}`} 
                 onClick={(e) => e.currentTarget.select()}
               />
            </div>
            <button onClick={handleCopy} className={`shrink-0 flex items-center justify-center gap-2 px-6 py-3 sm:py-4 rounded-xl font-bold text-sm transition-all ${copied ? "bg-green-500 text-white" : "bg-mg-gold text-black hover:scale-[1.02]"}`}>
              {copied ? <CheckCircle2 size={18}/> : <Copy size={18}/>}
              {copied ? ("Copied!") : ("Copy Link")}
            </button>
          </div>
        </motion.div>
        
        <motion.div variants={item} className={`flex flex-col justify-center items-center text-center p-6 sm:p-8 rounded-[2rem] border shadow-lg ${isDark ? "bg-[#111111] border-white/10" : "bg-white border-black/10"}`}>
          <h3 className={`font-black mb-1 ${isDark ? "text-white" : "text-gray-900"}`}>{"Quick Share"}</h3>
          <p className={`text-xs mb-5 ${isDark ? "text-white/50" : "text-gray-500"}`}>{"Broadcast to your networks."}</p>
          <div className="grid grid-cols-4 gap-2 sm:gap-3 w-full mt-2">
             <a href={`https://wa.me/?text=${shareText}%20${encodedLink}`} target="_blank" rel="noreferrer" aria-label="Share on WhatsApp" className="flex items-center justify-center p-3 sm:p-4 rounded-xl bg-green-500/10 text-green-500 hover:bg-green-500 hover:text-white transition-colors aspect-square"><MessageCircle size={20}/></a>
             <a href={`https://twitter.com/intent/tweet?text=${shareText}&url=${encodedLink}`} target="_blank" rel="noreferrer" aria-label="Share on X" className="flex items-center justify-center p-3 sm:p-4 rounded-xl bg-blue-400/10 text-blue-400 hover:bg-blue-400 hover:text-white transition-colors aspect-square"><Twitter size={20}/></a>
             <a href={`https://t.me/share/url?url=${encodedLink}&text=${shareText}`} target="_blank" rel="noreferrer" aria-label="Share on Telegram" className="flex items-center justify-center p-3 sm:p-4 rounded-xl bg-blue-500/10 text-blue-500 hover:bg-blue-500 hover:text-white transition-colors aspect-square"><Send size={20}/></a>
             <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodedLink}`} target="_blank" rel="noreferrer" aria-label="Share on Facebook" className="flex items-center justify-center p-3 sm:p-4 rounded-xl bg-blue-600/10 text-blue-600 hover:bg-blue-600 hover:text-white transition-colors aspect-square"><Facebook size={20}/></a>
          </div>
        </motion.div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div initial="hidden" animate="show" variants={container} className="grid gap-6 md:grid-cols-3">
        {activeStats.map((stat) => {
            const Icon = stat.icon;
            return (<motion.article variants={item} key={stat.id} className={`relative overflow-hidden rounded-[2rem] border p-6 transition-all hover:-translate-y-1 hover:shadow-xl ${isDark ? "border-white/10 bg-black/25 hover:border-mg-gold/30" : "border-black/10 bg-[#faf7f0] hover:border-mg-gold/30"}`}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className={`text-sm font-bold uppercase tracking-wider ${isDark ? "text-white/50" : "text-gray-500"}`}>
                    {stat.label.en}
                  </p>
                  <p className={`mt-2 text-3xl font-black ${isDark ? "text-white" : "text-gray-900"}`}>{stat.value}</p>
                </div>
                <div className={`rounded-xl p-3 ${isDark ? "bg-white/5" : "bg-black/5"}`}>
                  <Icon size={20} className="text-mg-gold"/>
                </div>
              </div>
              <p className={`mt-4 text-xs font-semibold ${isDark ? "text-mg-gold/80" : "text-mg-gold"}`}>
                {stat.trend}
              </p>
            </motion.article>);
        })}
      </motion.div>

      {/* Marketing Assets */}
      <motion.div initial="hidden" animate="show" variants={container} className="space-y-6">
        <div className="flex items-center gap-3 px-2">
          <Download className="text-mg-gold" size={24}/>
          <h2 className={`text-2xl font-black ${isDark ? "text-white" : "text-gray-900"}`}>
            {"Marketing Assets"}
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {marketingAssets.map((asset) => {
            const Icon = asset.icon;
            return (<motion.div variants={item} key={asset.id} className={`group flex items-center justify-between p-6 rounded-[2rem] border transition-all hover:-translate-y-1 hover:shadow-xl ${isDark ? "bg-[#111111] border-white/10 hover:border-mg-gold/30" : "bg-white border-black/10 hover:border-mg-gold/30"}`}>
                <div className="flex items-center gap-4">
                  <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${isDark ? "bg-white/5 text-mg-gold" : "bg-black/5 text-mg-gold"}`}>
                    <Icon size={24}/>
                  </div>
                  <div>
                    <h4 className={`font-bold mb-1 ${isDark ? "text-white" : "text-gray-900"}`}>{asset.title.en}</h4>
                    <p className={`text-xs font-semibold uppercase tracking-wider ${isDark ? "text-white/40" : "text-gray-500"}`}>{asset.format} • {asset.size}</p>
                  </div>
                </div>
                <button className={`shrink-0 p-3 rounded-full transition-colors ${isDark ? "bg-white/5 text-white/60 hover:text-white hover:bg-mg-gold/20" : "bg-black/5 text-gray-600 hover:text-black hover:bg-mg-gold/20"}`}>
                  <Download size={18}/>
                </button>
              </motion.div>);
        })}
        </div>
      </motion.div>

      {/* Recent Referrals Table */}
      <motion.div initial="hidden" animate="show" variants={container} className="space-y-6">
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-3">
            <Users className="text-mg-gold" size={24}/>
            <h2 className={`sm:text-2xl font-black ${isDark ? "text-white" : "text-gray-900"}`}>
              {"Recent Referrals"}
            </h2>
          </div>
          <button onClick={() => setShowAllReferralsModal(true)} className={`group flex items-center gap-1.5 text-sm font-bold uppercase tracking-wider transition-colors hover:text-mg-gold ${isDark ? "text-white/50" : "text-gray-500"}`}>
            {"View All"}
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        <motion.div variants={item} className={`rounded-[2.5rem] border shadow-xl overflow-hidden ${isDark ? "border-white/10 bg-[#111111]" : "border-black/10 bg-white"}`}>
          <div className="divide-y divide-white/5 dark:divide-white/10 divide-black/5">
            {activeRecentReferrals.length === 0 ? (<div className="p-8 sm:p-12 flex flex-col items-center justify-center text-center">
                <div className="h-16 w-16 mb-4 rounded-full bg-mg-gold/10 text-mg-gold flex items-center justify-center">
                  <Users size={32}/>
                </div>
                <h3 className={`text-xl font-bold mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>{"No referrals yet"}</h3>
                <p className={`text-sm max-w-sm ${isDark ? "text-white/60" : "text-gray-500"}`}>{"Share your link above to start earning commissions!"}</p>
              </div>) : (activeRecentReferrals.map((ref, idx) => (<div key={idx} className={`p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors hover:bg-mg-gold/5`}>
                  <div>
                    <h4 className={`text-lg font-bold mb-1 ${isDark ? "text-white" : "text-gray-900"}`}>{ref.user}</h4>
                    <p className={`text-xs font-semibold uppercase tracking-wider ${isDark ? "text-mg-gold/80" : "text-mg-gold"}`}>{ref.plan}</p>
                  </div>
                  
                  <div className="flex items-center justify-between sm:flex-col sm:items-end gap-2 sm:pl-6 sm:border-l border-white/5 dark:border-white/10 border-black/5">
                    <span className="text-lg font-black text-green-500">{ref.commission}</span>
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] ${isDark ? "text-white/40" : "text-gray-500"}`}>{ref.date}</span>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${ref.status === 'Paid' ? (isDark ? "bg-green-500/20 text-green-400" : "bg-green-100 text-green-700") :
                (isDark ? "bg-yellow-500/20 text-yellow-400" : "bg-yellow-100 text-yellow-700")}`}>
                        {ref.status === 'Paid' ? ("Paid") : ("Pending")}
                      </span>
                    </div>
                  </div>
                </div>)))}
          </div>
        </motion.div>
      </motion.div>

      {/* Request Payout Modal */}
      <AnimatePresence>
        {showPayoutModal && (<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[110] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
            <motion.div initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 20 }} className={`w-full max-w-md overflow-hidden rounded-[2rem] border shadow-2xl ${isDark ? "border-white/10 bg-[#111111]" : "border-black/10 bg-white"}`}>
              <AnimatePresence mode="wait">
                {payoutState === 'idle' && (<motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                    <div className={`flex items-center justify-between border-b p-4 sm:p-5 ${isDark ? "border-white/10 bg-white/5" : "border-black/10 bg-black/5"}`}>
                      <div>
                        <h3 className={`text-lg font-bold flex items-center gap-2 ${isDark ? "text-white" : "text-gray-900"}`}>
                          <Wallet size={18} className="text-mg-gold"/>
                          {"Withdraw Funds"}
                        </h3>
                        <p className={`text-xs font-medium mt-1 ${isDark ? "text-mg-gold" : "text-mg-gold"}`}>
                          {"Available Balance: "} {walletBalance}
                        </p>
                      </div>
                      <button onClick={closePayoutModal} className={`rounded-full p-2 transition-colors ${isDark ? "bg-white/10 text-white hover:bg-white/20" : "bg-black/10 text-gray-600 hover:bg-black/20"}`}>
                        <X size={18}/>
                      </button>
                    </div>
                    
                    <form onSubmit={handleProcessPayout} className="p-4 sm:p-6 space-y-5">
                      <div>
                        <label className={`block text-sm font-bold mb-3 ${isDark ? "text-white/80" : "text-gray-700"}`}>
                          {"Payout Method"}
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                          <button type="button" onClick={() => setPayoutMethod('crypto')} className={`flex flex-col items-center justify-center gap-2 p-3 rounded-xl border transition-all ${payoutMethod === 'crypto' ? "border-mg-gold bg-mg-gold/10 text-mg-gold" : isDark ? "border-white/10 text-white/50 hover:border-white/30" : "border-black/10 text-gray-400 hover:border-black/30"}`}>
                            <Bitcoin size={20}/>
                            <span className="text-[10px] font-bold uppercase tracking-wider">Crypto</span>
                          </button>
                          <button type="button" onClick={() => setPayoutMethod('momo')} className={`flex flex-col items-center justify-center gap-2 p-3 rounded-xl border transition-all ${payoutMethod === 'momo' ? "border-mg-gold bg-mg-gold/10 text-mg-gold" : isDark ? "border-white/10 text-white/50 hover:border-white/30" : "border-black/10 text-gray-400 hover:border-black/30"}`}>
                            <Smartphone size={20}/>
                            <span className="text-[10px] font-bold uppercase tracking-wider">MoMo</span>
                          </button>
                          <button type="button" onClick={() => setPayoutMethod('bank')} className={`flex flex-col items-center justify-center gap-2 p-3 rounded-xl border transition-all ${payoutMethod === 'bank' ? "border-mg-gold bg-mg-gold/10 text-mg-gold" : isDark ? "border-white/10 text-white/50 hover:border-white/30" : "border-black/10 text-gray-400 hover:border-black/30"}`}>
                            <Landmark size={20}/>
                            <span className="text-[10px] font-bold uppercase tracking-wider">Bank</span>
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className={`block text-sm font-bold mb-2 ${isDark ? "text-white/80" : "text-gray-700"}`}>
                          {payoutMethod === 'crypto' ? ("USDT Wallet Address (TRC20)") : payoutMethod === 'momo' ? ("Mobile Money Number") : ("Bank Account Number")}
                        </label>
                        <input required value={payoutAddress} onChange={(e) => setPayoutAddress(e.target.value)} placeholder={payoutMethod === 'crypto' ? "T..." : payoutMethod === 'momo' ? "+233..." : "Account Number"} className={`w-full p-4 rounded-xl text-sm border focus:outline-none focus:border-mg-gold transition-colors ${isDark ? "bg-black/20 border-white/10 text-white placeholder-white/30" : "bg-gray-50 border-black/10 text-gray-900 placeholder-gray-400"}`}/>
                      </div>
                      
                      <div className="pt-2">
                        <button type="submit" disabled={!payoutAddress.trim()} className="w-full flex items-center justify-center gap-2 rounded-xl bg-mg-gold px-4 py-4 text-sm font-black uppercase tracking-wider text-black transition-transform hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(212,175,55,0.3)]">
                          {"Submit Request"}
                        </button>
                      </div>
                    </form>
                  </motion.div>)}

                {payoutState === 'loading' && (<motion.div key="loading" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="flex flex-col items-center justify-center p-12 text-center">
                    <Loader2 size={48} className="mb-6 animate-spin text-mg-gold"/>
                    <h3 className={`text-xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>{"Processing..."}</h3>
                  </motion.div>)}

                {payoutState === 'success' && (<motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="flex flex-col items-center justify-center p-12 text-center">
                    <CheckCircle2 size={64} className="mb-6 text-mg-gold drop-shadow-[0_0_15px_rgba(212,175,55,0.4)]"/>
                    <h3 className={`text-2xl font-black mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>{"Request Submitted!"}</h3>
                    <p className={`text-sm mb-8 ${isDark ? "text-white/60" : "text-gray-600"}`}>
                      {"Your payout will be processed within 24-48 hours."}
                    </p>
                    <button onClick={closePayoutModal} className={`w-full rounded-xl border px-4 py-3.5 text-sm font-bold uppercase tracking-wider transition-colors ${isDark ? "border-white/10 text-white hover:bg-white/5" : "border-black/10 text-gray-900 hover:bg-black/5"}`}>
                      {"Close"}
                    </button>
                  </motion.div>)}
              </AnimatePresence>
            </motion.div>
          </motion.div>)}
      </AnimatePresence>

      {/* All Referrals Modal */}
      <AnimatePresence>
        {showAllReferralsModal && (<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[110] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm" onClick={() => setShowAllReferralsModal(false)}>
            <motion.div initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 20 }} onClick={(e) => e.stopPropagation()} className={`w-full max-w-2xl flex flex-col overflow-hidden rounded-[2rem] border shadow-2xl max-h-[85vh] ${isDark ? "border-white/10 bg-[#111111]" : "border-black/10 bg-white"}`}>
              <div className={`flex items-center justify-between border-b p-4 sm:p-5 ${isDark ? "border-white/10 bg-white/5" : "border-black/10 bg-black/5"}`}>
                <h3 className={`text-lg font-bold flex items-center gap-2 ${isDark ? "text-white" : "text-gray-900"}`}>
                  <Users size={18} className="text-mg-gold"/>
                  {`All Referrals (${allReferrals.length})`}
                </h3>
                <button onClick={() => setShowAllReferralsModal(false)} className={`rounded-full p-2 transition-colors ${isDark ? "bg-white/10 text-white hover:bg-white/20" : "bg-black/10 text-gray-600 hover:bg-black/20"}`}>
                  <X size={18}/>
                </button>
              </div>
              
              <div className="overflow-y-auto p-2">
                <div className="divide-y divide-white/5 dark:divide-white/10 divide-black/5">
                  {activeAllReferrals.length === 0 ? (<div className="p-8 sm:p-12 flex flex-col items-center justify-center text-center">
                      <div className="h-16 w-16 mb-4 rounded-full bg-mg-gold/10 text-mg-gold flex items-center justify-center">
                        <Users size={32}/>
                      </div>
                      <h3 className={`text-xl font-bold mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>{"No referrals yet"}</h3>
                      <p className={`text-sm max-w-sm ${isDark ? "text-white/60" : "text-gray-500"}`}>{"Share your link to see your referrals appear here."}</p>
                    </div>) : (activeAllReferrals.map((ref, idx) => (<div key={idx} className={`p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors hover:bg-mg-gold/5 rounded-xl mx-2 my-1`}>
                        <div>
                          <h4 className={`text-lg font-bold mb-1 ${isDark ? "text-white" : "text-gray-900"}`}>{ref.user}</h4>
                          <p className={`text-xs font-semibold uppercase tracking-wider ${isDark ? "text-mg-gold/80" : "text-mg-gold"}`}>{ref.plan}</p>
                        </div>
                        <div className="flex items-center justify-between sm:flex-col sm:items-end gap-2 sm:pl-6 sm:border-l border-white/5 dark:border-white/10 border-black/5">
                          <span className="text-lg font-black text-green-500">{ref.commission}</span>
                          <div className="flex items-center gap-2">
                            <span className={`text-[10px] ${isDark ? "text-white/40" : "text-gray-500"}`}>{ref.date}</span>
                            <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${ref.status === 'Paid' ? (isDark ? "bg-green-500/20 text-green-400" : "bg-green-100 text-green-700") : (isDark ? "bg-yellow-500/20 text-yellow-400" : "bg-yellow-100 text-yellow-700")}`}>
                              {ref.status === 'Paid' ? ("Paid") : ("Pending")}
                            </span>
                          </div>
                        </div>
                      </div>)))}
                </div>
              </div>
            </motion.div>
          </motion.div>)}
      </AnimatePresence>

      {/* Payout History Modal */}
      <AnimatePresence>
        {showPayoutHistoryModal && (<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[110] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm" onClick={() => setShowPayoutHistoryModal(false)}>
            <motion.div initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 20 }} onClick={(e) => e.stopPropagation()} className={`w-full max-w-2xl flex flex-col overflow-hidden rounded-[2rem] border shadow-2xl max-h-[85vh] ${isDark ? "border-white/10 bg-[#111111]" : "border-black/10 bg-white"}`}>
              <div className={`flex items-center justify-between border-b p-4 sm:p-5 ${isDark ? "border-white/10 bg-white/5" : "border-black/10 bg-black/5"}`}>
                <h3 className={`text-lg font-bold flex items-center gap-2 ${isDark ? "text-white" : "text-gray-900"}`}>
                  <History size={18} className="text-mg-gold"/>
                  {"Payout History"}
                </h3>
                <button onClick={() => setShowPayoutHistoryModal(false)} className={`rounded-full p-2 transition-colors ${isDark ? "bg-white/10 text-white hover:bg-white/20" : "bg-black/10 text-gray-600 hover:bg-black/20"}`}>
                  <X size={18}/>
                </button>
              </div>
              
              <div className="overflow-y-auto p-2">
                <div className="divide-y divide-white/5 dark:divide-white/10 divide-black/5">
                  {activePayoutHistory.length === 0 ? (<div className="p-8 text-center text-sm text-gray-500">{"No payout history found."}</div>) : (activePayoutHistory.map((payout, idx) => (<div key={idx} className={`p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors hover:bg-mg-gold/5 rounded-xl mx-2 my-1`}>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className={`text-lg font-bold ${isDark ? "text-white" : "text-gray-900"}`}>{payout.amount}</h4>
                            <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${payout.status === 'Completed' ? (isDark ? "bg-green-500/20 text-green-400" : "bg-green-100 text-green-700") : (isDark ? "bg-yellow-500/20 text-yellow-400" : "bg-yellow-100 text-yellow-700")}`}>
                              {payout.status === 'Completed' ? ("Completed") : ("Pending")}
                            </span>
                          </div>
                          <p className={`text-xs font-semibold uppercase tracking-wider ${isDark ? "text-mg-gold/80" : "text-mg-gold"}`}>ID: {payout.id}</p>
                        </div>
                        <div className="flex flex-col sm:items-end gap-1">
                           <span className={`text-sm font-medium ${isDark ? "text-white/80" : "text-gray-700"}`}>{payout.method}</span>
                           <span className={`text-[10px] ${isDark ? "text-white/40" : "text-gray-500"}`}>{payout.date}</span>
                        </div>
                      </div>)))}
                </div>
              </div>
            </motion.div>
          </motion.div>)}
      </AnimatePresence>

      {/* DEV SIMULATION TOGGLE - REMOVE LATER */}
      <div className="fixed bottom-6 left-6 z-[100] flex flex-col gap-2 p-3 rounded-2xl bg-black/90 backdrop-blur-md border border-white/20 shadow-2xl">
        <p className="text-[10px] font-bold text-white/50 uppercase tracking-wider text-center">Simulate Role</p>
        <div className="flex gap-2">
          <button onClick={() => setIsRegistered(false)} className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors ${!isRegistered ? "bg-red-500 text-white" : "text-white/50 hover:bg-white/10"}`}>Not Registered</button>
          <button onClick={() => { setIsRegistered(true); setHasReferrals(false); }} className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors ${isRegistered && !hasReferrals ? "bg-mg-gold text-black" : "text-white/50 hover:bg-white/10"}`}>New Affiliate</button>
          <button onClick={() => { setIsRegistered(true); setHasReferrals(true); }} className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors ${isRegistered && hasReferrals ? "bg-mg-gold text-black" : "text-white/50 hover:bg-white/10"}`}>Active Affiliate</button>
        </div>
      </div>
    </div>);
}
