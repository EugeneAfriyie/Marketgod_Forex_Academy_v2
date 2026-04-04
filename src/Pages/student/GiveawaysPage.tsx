import { useState } from "react";
import { Trophy, CheckCircle2, ExternalLink,  Sparkles, Loader2, Clock, Coins, Target, Gift,  Check, X, Users, CalendarDays } from "lucide-react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";
// --- MOCK DATA ---
const initialTasks = [
    { id: "t1", title: { en: "Follow @eyram_dela on Instagram", fr: "Suivre @eyram_dela sur IG" }, points: 50, status: "open", link: "https://instagram.com/eyram_dela" },
    { id: "t2", title: { en: "Retweet the Pinned Post on X", fr: "Retweeter le post épinglé sur X" }, points: 100, status: "open", link: "https://x.com/eyramdela" },
    { id: "t3", title: { en: "Post a P&L Screenshot in VIP", fr: "Publier une capture P&L dans le VIP" }, points: 250, status: "pending", link: "#" },
    { id: "t4", title: { en: "Complete Beginner Mastery Course", fr: "Terminer le cours Débutant" }, points: 1000, status: "completed", link: "#" },
];
const initialChallenges = [
    {
        id: "c1",
        title: { en: "$10,000 Prop Firm Challenge", fr: "Défi Prop Firm 10 000 $" },
        prize: "$10k Prop Firm Account",
        cost: 1000,
        startDate: "Nov 1, 2026",
        endDate: "Nov 15, 2026",
        participants: 1240,
        entered: false
    },
    {
        id: "c2",
        title: { en: "1-on-1 Sniper Mentorship Call", fr: "Appel de Mentorat Sniper 1-à-1" },
        prize: "1 Hour Private Session",
        cost: 500,
        startDate: "Nov 5, 2026",
        endDate: "Nov 20, 2026",
        participants: 856,
        entered: true
    }
];
const initialRewards = [
    {
        id: "r1",
        title: { en: "50% Off Any Premium Course", fr: "50% de réduction sur un cours premium" },
        cost: 1500,
        claimed: false
    },
    {
        id: "r2",
        title: { en: "Official MarketGod Hoodie", fr: "Sweat à capuche officiel MarketGod" },
        cost: 3000,
        claimed: false
    }
];
const pastWinners = [
    { name: "Kwame A.", prize: "$500 Cash Prize", challenge: "Q3 Market Prep", date: "Oct 2026", avatar: "KA", participants: 1842 },
    { name: "Sarah J.", prize: "$10k Funded Account", challenge: "$10,000 Funded Account Challenge", date: "Sep 2026", avatar: "SJ", participants: 3240 },
    { name: "Michael T.", prize: "1-on-1 Mentorship", challenge: "Sniper Entry Workshop", date: "Aug 2026", avatar: "MT", participants: 850 },
    { name: "Abigail D.", prize: "MarketGod Merch Box", challenge: "Summer Trading Bootcamp", date: "Jul 2026", avatar: "AD", participants: 4120 },
];
// Custom 3D MarketGod Coin Component
const MarketGodCoin = () => {
    return (<div className="relative w-12 h-12 sm:w-16 sm:h-16 shrink-0 perspective-[1000px]" style={{ perspective: 1000 }}>
      <motion.div animate={{ rotateY: [0, 360] }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }} className="w-full h-full relative" style={{ transformStyle: "preserve-3d" }}>
        {/* Front of Coin */}
        <div className="absolute inset-0 rounded-full border-[2px] border-yellow-200 flex items-center justify-center shadow-[0_0_25px_rgba(212,175,55,0.6)] bg-gradient-to-br from-yellow-400 via-mg-gold to-yellow-600 [backface-visibility:hidden]" style={{ transform: "translateZ(4px)" }}>
          <div className="w-[80%] h-[80%] rounded-full border border-yellow-300/50 flex items-center justify-center bg-gradient-to-tr from-yellow-500 to-mg-gold shadow-inner overflow-hidden">
            <img src="/ourteam/Eyram_Dela.png" alt="Eyram Dela" className="w-full h-full object-cover mix-blend-luminosity opacity-90"/>
          </div>
        </div>

        {/* Edges to give 3D physical thickness and beveled curve */}
        <div className="absolute inset-0 rounded-full bg-yellow-600 border border-yellow-500" style={{ transform: "translateZ(3px) scale(0.98)" }}/>
        <div className="absolute inset-0 rounded-full bg-yellow-700" style={{ transform: "translateZ(2px)" }}/>
        <div className="absolute inset-0 rounded-full bg-yellow-800" style={{ transform: "translateZ(1px)" }}/>
        <div className="absolute inset-0 rounded-full bg-yellow-900" style={{ transform: "translateZ(0px)" }}/>
        <div className="absolute inset-0 rounded-full bg-yellow-800" style={{ transform: "translateZ(-1px)" }}/>
        <div className="absolute inset-0 rounded-full bg-yellow-700" style={{ transform: "translateZ(-2px)" }}/>
        <div className="absolute inset-0 rounded-full bg-yellow-600 border border-yellow-500" style={{ transform: "translateZ(-3px) scale(0.98)" }}/>

        {/* Back of Coin */}
        <div className="absolute inset-0 rounded-full border-[2px] border-yellow-200 flex items-center justify-center shadow-[0_0_25px_rgba(212,175,55,0.6)] bg-gradient-to-br from-yellow-600 via-mg-gold to-yellow-400 [backface-visibility:hidden]" style={{ transform: "rotateY(180deg) translateZ(4px)" }}>
          <div className="relative w-[85%] h-[85%] rounded-full border-[2px] border-yellow-300/60 flex flex-col items-center justify-center bg-gradient-to-tr from-yellow-500 to-mg-gold shadow-inner overflow-hidden">
            <div className="absolute inset-0 border border-dashed border-yellow-700/40 rounded-full m-1 animate-[spin_10s_linear_infinite]"/>
            <span className="font-black text-yellow-900/90 tracking-tighter text-sm sm:text-lg drop-shadow-md">MGP</span>
            <span className="text-[5px] sm:text-[6px] font-black text-yellow-800/80 tracking-[0.2em] mt-0.5">MARKETGOD</span>
          </div>
        </div>
      </motion.div>
    </div>);
};
export default function GiveawaysPage() {
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const [userPoints, setUserPoints] = useState(1250);
    const [activeTab, setActiveTab] = useState<"tasks" | "rewards" | "challenges">("tasks");
    const [tasks, setTasks] = useState(initialTasks);
    const [challenges, setChallenges] = useState(initialChallenges);
    const [rewards, setRewards] = useState(initialRewards);
    const [actionLoading, setActionLoading] = useState<string | null>(null);
    // Verification Modal State
    const [taskSubmitModal, setTaskSubmitModal] = useState<{
        isOpen: boolean;
        taskId: string | null;
    }>({ isOpen: false, taskId: null });
    const [proofInput, setProofInput] = useState("");
    const openTaskSubmitModal = (taskId: string) => {
        setTaskSubmitModal({ isOpen: true, taskId });
        setProofInput("");
    };
    const confirmTaskSubmit = () => {
        if (!proofInput.trim() || !taskSubmitModal.taskId)
            return;
        // Here you would send `proofInput` to the backend for the admin to review
        setTasks(prev => prev.map(t => t.id === taskSubmitModal.taskId ? { ...t, status: "pending" } : t));
        setTaskSubmitModal({ isOpen: false, taskId: null });
        setProofInput("");
    };
    const handleClaimReward = (rewardId: string, cost: number) => {
        if (userPoints < cost)
            return;
        setActionLoading(rewardId);
        setTimeout(() => {
            setUserPoints(prev => prev - cost);
            setRewards(prev => prev.map(r => r.id === rewardId ? { ...r, claimed: true } : r));
            setActionLoading(null);
        }, 1500);
    };
    const handleEnterChallenge = (challengeId: string, cost: number) => {
        if (userPoints < cost)
            return;
        setActionLoading(challengeId);
        setTimeout(() => {
            setUserPoints(prev => prev - cost);
            setChallenges(prev => prev.map(c => c.id === challengeId ? { ...c, entered: true } : c));
            setActionLoading(null);
        }, 1500);
    };
    const container: Variants = {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };
    const item: Variants = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } }
    };
    return (<div className="space-y-8 pb-10">
      {/* Hero Section */}
      <motion.div initial="hidden" animate="show" variants={container} className={`relative overflow-hidden rounded-[3rem] border shadow-lg flex flex-col md:flex-row md:items-center justify-between ${isDark ? "border-white/5 bg-[#0a0a0a]" : "border-black/5 bg-white"}`}>
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-mg-gold/10 blur-[100px] rounded-full pointer-events-none"/>
        <div className="relative z-10 p-8 md:p-12 lg:p-16">
          <h1 className={`text-4xl md:text-5xl font-black mb-4 tracking-tight ${isDark ? "text-white" : "text-gray-900"}`}>
            {"Rewards "}
            <span className="text-mg-gold">{"Hub."}</span>
          </h1>
          <p className={`max-w-2xl text-lg font-medium ${isDark ? "text-white/70" : "text-gray-600"}`}>
            {"Earn points by completing tasks, then spend them to claim exclusive rewards or enter high-stakes giveaways."}
          </p>
        </div>
        
        {/* Points Display */}
        <div className={`relative z-10 p-8 md:p-12 lg:p-16 border-t md:border-t-0 md:border-l flex flex-col items-center justify-center shrink-0 ${isDark ? "border-white/10 bg-white/5" : "border-black/10 bg-black/5"}`}>
          <p className={`text-sm font-bold uppercase tracking-wider mb-4 ${isDark ? "text-mg-gold/80" : "text-mg-gold"}`}>
            {"Your Balance"}
          </p>
          <motion.div key={userPoints} initial={{ scale: 1.2 }} animate={{ scale: 1 }} className="flex items-center gap-4">
            <MarketGodCoin />
            <span className="text-5xl font-black text-mg-gold drop-shadow-[0_0_15px_rgba(212,175,55,0.4)]">{userPoints}</span>
          </motion.div>
          <p className={`text-xs mt-4 font-bold uppercase tracking-widest ${isDark ? "text-white/50" : "text-gray-500"}`}>
            {"MarketGod Points (MGP)"}
          </p>
        </div>
      </motion.div>

      {/* Tabs */}
      <motion.div initial="hidden" animate="show" variants={container} className="flex justify-center mb-2">
        <div className={`flex flex-wrap justify-center rounded-xl p-1 border shadow-inner ${isDark ? "bg-[#0f141b] border-white/10" : "bg-white border-black/10"}`}>
          <button onClick={() => setActiveTab('tasks')} className={`flex items-center gap-1.5 sm:gap-2 px-6 py-2.5 sm:px-8 sm:py-3.5 rounded-lg font-bold text-xs sm:text-sm transition-all ${activeTab === 'tasks' ? 'bg-mg-gold text-black shadow-md' : isDark ? 'text-white/60 hover:text-white hover:bg-white/5' : 'text-gray-500 hover:text-black hover:bg-black/5'}`}>
            <Target size={16}/>
            {"Tasks (Earn)"}
          </button>
          <button onClick={() => setActiveTab('rewards')} className={`flex items-center gap-1.5 sm:gap-2 px-6 py-2.5 sm:px-8 sm:py-3.5 rounded-lg font-bold text-xs sm:text-sm transition-all ${activeTab === 'rewards' ? 'bg-mg-gold text-black shadow-md' : isDark ? 'text-white/60 hover:text-white hover:bg-white/5' : 'text-gray-500 hover:text-black hover:bg-black/5'}`}>
            <Gift size={16}/>
            {"Rewards Store"}
          </button>
          <button onClick={() => setActiveTab('challenges')} className={`flex items-center gap-1.5 sm:gap-2 px-6 py-2.5 sm:px-8 sm:py-3.5 rounded-lg font-bold text-xs sm:text-sm transition-all ${activeTab === 'challenges' ? 'bg-mg-gold text-black shadow-md' : isDark ? 'text-white/60 hover:text-white hover:bg-white/5' : 'text-gray-500 hover:text-black hover:bg-black/5'}`}>
            <Trophy size={16}/>
            {"Challenges"}
          </button>
        </div>
      </motion.div>

      <div className="grid gap-8 lg:grid-cols-3">
        
        {/* Left Column: Main Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div key={activeTab} initial="hidden" animate="show" exit={{ opacity: 0, y: -20, transition: { duration: 0.2 } }} variants={container} className="lg:col-span-2 space-y-6">
            
            {/* TASKS TAB */}
            {activeTab === 'tasks' && tasks.map((task) => (<motion.div variants={item} key={task.id} className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-[2rem] border ${isDark ? "bg-[#111111] border-white/10" : "bg-white border-black/10"}`}>
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-mg-gold bg-mg-gold/10 px-2 py-1 rounded-md">
                      <Coins size={14}/> +{task.points} MGP
                    </span>
                    {task.status === "pending" && (<span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-400 bg-blue-500/10 px-2 py-1 rounded-md">
                        <Clock size={14}/> {"Under Review"}
                      </span>)}
                    {task.status === "completed" && (<span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-green-500 bg-green-500/10 px-2 py-1 rounded-md">
                        <Check size={14}/> {"Completed"}
                      </span>)}
                  </div>
                  <h3 className={`text-lg font-bold ${isDark ? "text-white" : "text-gray-900"}`}>{task.title['en']}</h3>
                </div>
                
                <div className="shrink-0">
                  {task.status === "open" && (<div className="flex items-center gap-2">
                      <a href={task.link} target="_blank" rel="noreferrer" className={`p-3.5 rounded-xl border transition-colors ${isDark ? "border-white/20 text-white hover:bg-white/10" : "border-black/20 text-black hover:bg-black/5"}`}>
                        <ExternalLink size={18}/>
                      </a>
                      <button onClick={() => openTaskSubmitModal(task.id)} disabled={actionLoading === task.id} className="flex items-center justify-center min-w-[120px] rounded-xl bg-mg-gold px-6 py-3.5 text-sm font-black uppercase tracking-wider text-black transition-transform hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100">
                        {actionLoading === task.id ? <Loader2 size={18} className="animate-spin text-black"/> : ("Submit")}
                      </button>
                    </div>)}
                  {task.status !== "open" && (<button disabled className={`w-full sm:w-auto flex items-center justify-center min-w-[120px] rounded-xl px-6 py-3.5 text-sm font-bold uppercase tracking-wider border-2 border-dashed ${isDark ? "border-white/20 text-white/30" : "border-black/20 text-gray-400"}`}>
                      {task.status === "pending" ? ("Pending") : ("Completed")}
                    </button>)}
                </div>
              </motion.div>))}

            {/* REWARDS STORE TAB */}
            {activeTab === 'rewards' && rewards.map((reward) => (<motion.div variants={item} key={reward.id} className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-[2rem] border ${isDark ? "bg-[#111111] border-white/10" : "bg-white border-black/10"}`}>
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`flex items-center gap-1.5 text-xs font-black uppercase tracking-wider px-2 py-1 rounded-md ${reward.claimed ? "text-green-500 bg-green-500/10" : "text-gray-400 bg-gray-500/10"}`}>
                      <Coins size={14}/> {reward.cost} MGP
                    </span>
                  </div>
                  <h3 className={`text-lg font-bold ${isDark ? "text-white" : "text-gray-900"}`}>{reward.title['en']}</h3>
                </div>
                
                <div className="shrink-0">
                  {reward.claimed ? (<button disabled className={`w-full sm:w-auto flex items-center justify-center min-w-[140px] gap-2 rounded-xl px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-green-500 bg-green-500/10 border border-green-500/20`}>
                      <CheckCircle2 size={18}/> {"Claimed"}
                    </button>) : (<button onClick={() => handleClaimReward(reward.id, reward.cost)} disabled={actionLoading === reward.id || userPoints < reward.cost} className={`flex items-center justify-center min-w-[140px] rounded-xl px-6 py-3.5 text-sm font-black uppercase tracking-wider transition-transform hover:scale-[1.02] disabled:hover:scale-100 disabled:opacity-50 disabled:cursor-not-allowed ${userPoints < reward.cost ? (isDark ? "bg-white/10 text-white/50" : "bg-black/10 text-black/50") : "bg-mg-gold text-black shadow-[0_0_15px_rgba(212,175,55,0.3)]"}`}>
                      {actionLoading === reward.id ? <Loader2 size={18} className="animate-spin text-black"/> : userPoints < reward.cost ? ("Not Enough Pts") : ("Claim Reward")}
                    </button>)}
                </div>
              </motion.div>))}

            {/* CHALLENGES (RAFFLES) TAB */}
            {activeTab === 'challenges' && challenges.map((challenge) => (<motion.div variants={item} key={challenge.id} className={`relative overflow-hidden flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 md:p-8 rounded-[2.5rem] border shadow-xl ${isDark ? "bg-[#111111] border-white/10" : "bg-white border-black/10"}`}>
                {challenge.entered && (<div className="absolute top-0 right-0 p-6 opacity-10 pointer-events-none">
                    <Sparkles size={120} className="text-mg-gold"/>
                  </div>)}
                <div className="relative z-10 flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className={`flex items-center gap-1.5 text-xs font-black uppercase tracking-wider px-2 py-1 rounded-md ${challenge.entered ? "text-green-500 bg-green-500/10" : "text-gray-400 bg-gray-500/10"}`}>
                      <Coins size={14}/> {challenge.cost} MGP {"Entry"}
                    </span>
                    <span className={`flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider ${isDark ? "text-white/50" : "text-gray-500"}`}>
                      <CalendarDays size={14} className="text-mg-gold"/> {challenge.startDate} — {challenge.endDate}
                    </span>
                  </div>
                  <h3 className={`text-2xl font-black mb-1 ${isDark ? "text-white" : "text-gray-900"}`}>{challenge.title['en']}</h3>
                  <p className={`text-sm font-bold mb-4 ${isDark ? "text-mg-gold/80" : "text-mg-gold"}`}>Prize: {challenge.prize}</p>
                  
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                      {[...Array(3)].map((_, i) => (<div key={i} className={`w-6 h-6 rounded-full border-2 ${isDark ? "border-[#111111] bg-white/10" : "border-white bg-black/10"}`}/>))}
                    </div>
                    <span className={`text-xs font-bold ${isDark ? "text-white/50" : "text-gray-500"}`}>
                      {challenge.participants} {"entered"}
                    </span>
                  </div>
                </div>
                
                <div className="relative z-10 shrink-0 w-full sm:w-auto mt-4 sm:mt-0">
                  {challenge.entered ? (<div className="flex flex-col items-center gap-2 w-full sm:w-[160px] p-4 rounded-xl bg-green-500/10 border border-green-500/20">
                      <CheckCircle2 size={24} className="text-green-500"/>
                      <span className="text-xs font-bold uppercase tracking-wider text-green-500 text-center">
                        {"Successfully Entered"}
                      </span>
                    </div>) : (<button onClick={() => handleEnterChallenge(challenge.id, challenge.cost)} disabled={actionLoading === challenge.id || userPoints < challenge.cost} className={`flex items-center justify-center w-full sm:w-[160px] py-4 rounded-xl text-sm font-black uppercase tracking-wider transition-transform hover:scale-[1.02] disabled:hover:scale-100 disabled:opacity-50 disabled:cursor-not-allowed ${userPoints < challenge.cost ? (isDark ? "bg-white/10 text-white/50" : "bg-black/10 text-black/50") : "bg-mg-gold text-black shadow-[0_0_15px_rgba(212,175,55,0.3)]"}`}>
                      {actionLoading === challenge.id ? <Loader2 size={18} className="animate-spin text-black"/> : userPoints < challenge.cost ? ("Not Enough Pts") : ("Enter Now")}
                    </button>)}
                </div>
              </motion.div>))}

          </motion.div>
        </AnimatePresence>

        {/* Right Column: Winners Board */}
        <motion.div initial="hidden" animate="show" variants={container} className="space-y-6">
          <div className="flex items-center gap-3 px-2">
            <Trophy className="text-mg-gold" size={24}/>
            <h2 className={`text-2xl font-black ${isDark ? "text-white" : "text-gray-900"}`}>
              {"Winners Board"}
            </h2>
          </div>

          <motion.div variants={item} className={`rounded-[2.5rem] border shadow-xl overflow-hidden ${isDark ? "border-white/10 bg-[#111111]" : "border-black/10 bg-white"}`}>
            <div className="divide-y divide-white/5 dark:divide-white/10 divide-black/5">
              {pastWinners.map((winner, idx) => (<div key={idx} className={`p-5 flex items-center gap-4 transition-colors hover:bg-mg-gold/5`}>
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-mg-gold text-black font-black shadow-lg">
                    {winner.avatar}
                  </div>
                  <div className="flex-1">
                    <h4 className={`font-bold ${isDark ? "text-white" : "text-gray-900"}`}>{winner.name}</h4>
                    <p className={`text-[10px] font-bold uppercase tracking-wider text-mg-gold mt-1`}>{winner.prize}</p>
                    <p className={`text-[10px] italic mt-0.5 ${isDark ? "text-white/40" : "text-gray-500"}`}>
                      {"Challenge: "} {winner.challenge}
                    </p>
                    <p className={`text-[10px] flex items-center gap-1 mt-1 ${isDark ? "text-white/30" : "text-gray-400"}`}>
                      <Users size={10}/> {winner.participants} {"entries"}
                    </p>
                  </div>
                  <span className={`text-[10px] font-bold uppercase tracking-wider ${isDark ? "text-white/40" : "text-gray-400"}`}>{winner.date}</span>
                </div>))}
            </div>
          </motion.div>
        </motion.div>

      </div>

      {/* Task Verification Modal */}
      <AnimatePresence>
        {taskSubmitModal.isOpen && (<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[110] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
            <motion.div initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 20 }} className={`w-full max-w-md overflow-hidden rounded-[2rem] border shadow-2xl ${isDark ? "border-white/10 bg-[#111111]" : "border-black/10 bg-white"}`}>
              <div className={`flex items-center justify-between border-b p-5 ${isDark ? "border-white/10 bg-white/5" : "border-black/10 bg-black/5"}`}>
                <h3 className={`text-lg font-bold flex items-center gap-2 ${isDark ? "text-white" : "text-gray-900"}`}>
                  <Target size={18} className="text-mg-gold"/>
                  {"Task Verification"}
                </h3>
                <button onClick={() => setTaskSubmitModal({ isOpen: false, taskId: null })} className={`rounded-full p-2 transition-colors ${isDark ? "bg-white/10 text-white hover:bg-white/20" : "bg-black/10 text-gray-600 hover:bg-black/20"}`}>
                  <X size={18}/>
                </button>
              </div>
              <div className="p-6 space-y-4">
                <p className={`text-sm font-medium ${isDark ? "text-white/70" : "text-gray-600"}`}>
                  {"Please provide your username or a link so our team can verify your submission:"}
                </p>
                <input value={proofInput} onChange={(e) => setProofInput(e.target.value)} placeholder={"e.g., @my_username or post link"} className={`w-full p-4 rounded-xl text-sm border focus:outline-none focus:border-mg-gold ${isDark ? "bg-black/20 border-white/10 text-white placeholder-white/30" : "bg-gray-50 border-black/10 text-gray-900 placeholder-gray-400"}`}/>
                <div className="flex gap-3 pt-2">
                  <button onClick={() => setTaskSubmitModal({ isOpen: false, taskId: null })} className={`flex-1 rounded-xl border px-4 py-3 text-sm font-semibold transition-colors ${isDark ? "border-white/10 text-white hover:bg-white/5" : "border-black/10 text-gray-900 hover:bg-black/5"}`}>
                    {"Cancel"}
                  </button>
                  <button onClick={confirmTaskSubmit} disabled={!proofInput.trim()} className="flex-1 rounded-xl bg-mg-gold px-4 py-3 text-sm font-black uppercase tracking-wider text-black transition-transform hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed">
                    {"Submit"}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>)}
      </AnimatePresence>
    </div>);
}

