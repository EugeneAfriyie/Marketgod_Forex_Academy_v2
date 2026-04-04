import { useState } from "react";
import { Gift, Trophy, CheckCircle2, Circle, ExternalLink, Star, ArrowRight, Sparkles } from "lucide-react";
import { motion, type Variants } from "framer-motion";
import { Gift, Trophy, CheckCircle2, Circle, ExternalLink, Star, ArrowRight, Sparkles, Lock, Loader2, CalendarRange } from "lucide-react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";
import { useLanguage } from "../../context/LanguageContext";

// --- MOCK DATA ---
const activeGiveaways = [
const giveawaysData = [
  {
    id: "g1",
    status: "active",
    title: { en: "$10,000 Funded Account Challenge", fr: "Défi Compte Financé 10 000 $" },
    prize: "$10k Prop Firm Account",
    deadline: { en: "Ends in 5 Days", fr: "Se termine dans 5 jours" },
    participants: 1240,
    tasks: [
      { id: "t1", desc: { en: "Follow @eyram_dela on Instagram", fr: "Suivre @eyram_dela sur Instagram" }, completed: true, link: "https://instagram.com/eyram_dela" },
      { id: "t2", desc: { en: "Retweet the Pinned Post on X", fr: "Retweeter le post épinglé sur X" }, completed: false, link: "https://x.com/eyramdela" },
      { id: "t3", desc: { en: "Attend Sunday Market Prep Live", fr: "Assister à la préparation du marché en direct" }, completed: false, link: "/dashboard/events" },
    ]
  },
  {
    id: "g2",
    status: "active",
    title: { en: "Exclusive 1-on-1 Mentorship Call", fr: "Appel de Mentorat Exclusif 1-à-1" },
    prize: "Free 1-Hour Chart Review",
    deadline: { en: "Ends in 2 Weeks", fr: "Se termine dans 2 semaines" },
    participants: 856,
    tasks: [
      { id: "t4", desc: { en: "Complete Beginner Mastery Course", fr: "Terminer le cours Maîtrise pour Débutants" }, completed: true, link: "/dashboard/courses/enrolled" },
      { id: "t5", desc: { en: "Share your P&L in the VIP Telegram", fr: "Partager votre P&L dans le Telegram VIP" }, completed: true, link: "https://t.me/marketgodcommunity" },
      { id: "t6", desc: { en: "Leave a Review on a Past Mentorship Call", fr: "Laisser un avis sur un appel de mentorat passé" }, completed: false, link: "/dashboard/meetings" },
    ]
  },
  {
    id: "g3",
    status: "past",
    title: { en: "Summer Trading Bootcamp Giveaway", fr: "Cadeau du Bootcamp de Trading d'Été" },
    prize: "MacBook Pro M3",
    deadline: { en: "Ended Aug 2026", fr: "Terminé en Août 2026" },
    participants: 3450,
    tasks: []
  }
];

const pastWinners = [
  { name: "Kwame A.", prize: "$500 Cash Prize", date: "Oct 2026", avatar: "KA" },
  { name: "Sarah J.", prize: "$10k Funded Account", date: "Sep 2026", avatar: "SJ" },
  { name: "Michael T.", prize: "1-on-1 Mentorship", date: "Aug 2026", avatar: "MT" },
  { name: "Abigail D.", prize: "MarketGod Merch Box", date: "Jul 2026", avatar: "AD" },
  { name: "Kwame A.", prize: "$500 Cash Prize", challenge: "Q3 Market Prep", date: "Oct 2026", avatar: "KA" },
  { name: "Sarah J.", prize: "$10k Funded Account", challenge: "$10,000 Funded Account Challenge", date: "Sep 2026", avatar: "SJ" },
  { name: "Michael T.", prize: "1-on-1 Mentorship", challenge: "Sniper Entry Workshop", date: "Aug 2026", avatar: "MT" },
  { name: "Abigail D.", prize: "MarketGod Merch Box", challenge: "Summer Trading Bootcamp", date: "Jul 2026", avatar: "AD" },
];

export default function GiveawaysPage() {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const isDark = theme === "dark";
  const isFrench = language === "fr";

  // Tabs State
  const [activeTab, setActiveTab] = useState<"active" | "past">("active");

  // Tasks & Joined State
  const [tasksState, setTasksState] = useState<Record<string, boolean>>({});
  const [joinedGiveaways, setJoinedGiveaways] = useState<Record<string, boolean>>({});
  const [joinLoading, setJoinLoading] = useState<string | null>(null);

  const filteredGiveaways = giveawaysData.filter(g => g.status === activeTab);

  const toggleTask = (taskId: string) => {
    setTasksState(prev => ({ ...prev, [taskId]: !prev[taskId] }));
  };

  const handleJoinChallenge = (giveawayId: string) => {
    setJoinLoading(giveawayId);
    setTimeout(() => {
      setJoinedGiveaways(prev => ({ ...prev, [giveawayId]: true }));
      setJoinLoading(null);
    }, 1500);
  };

  const container: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  },
  item: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } }
  };

  return (
    <div className="space-y-8 pb-10">
      {/* Hero Section */}
      <motion.div initial="hidden" animate="show" variants={container} className={`relative overflow-hidden rounded-[3rem] border shadow-lg ${isDark ? "border-white/5 bg-[#0a0a0a]" : "border-black/5 bg-white"}`}>
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-mg-gold/10 blur-[100px] rounded-full pointer-events-none" />
        <div className="relative z-10 p-8 md:p-12 lg:p-16">
          <h1 className={`text-4xl md:text-5xl font-black mb-4 tracking-tight ${isDark ? "text-white" : "text-gray-900"}`}>
            {isFrench ? "Cadeaux & " : "Giveaways & "}
            <span className="text-mg-gold">{isFrench ? "Récompenses." : "Rewards."}</span>
          </h1>
          <p className={`max-w-2xl text-lg font-medium ${isDark ? "text-white/70" : "text-gray-600"}`}>
            {isFrench 
              ? "Accomplissez des tâches communautaires, accumulez des participations et gagnez des comptes financés, des prix en espèces et un mentorat exclusif."
              : "Complete community tasks, rack up entries, and win funded accounts, cash prizes, and exclusive mentorship."}
          </p>
        </div>
      </motion.div>

      {/* Tabs */}
      <motion.div initial="hidden" animate="show" variants={container} className="flex justify-center mb-2">
        <div className={`flex flex-wrap justify-center rounded-xl p-1 border shadow-inner ${isDark ? "bg-[#0f141b] border-white/10" : "bg-white border-black/10"}`}>
          <button 
            onClick={() => setActiveTab('active')} 
            className={`flex items-center gap-1.5 sm:gap-2 px-6 py-2.5 sm:px-10 sm:py-3.5 rounded-lg font-bold text-xs sm:text-sm transition-all ${activeTab === 'active' ? 'bg-mg-gold text-black shadow-md' : isDark ? 'text-white/60 hover:text-white hover:bg-white/5' : 'text-gray-500 hover:text-black hover:bg-black/5'}`}
          >
            {isFrench ? "Campagnes Actives" : "Active Campaigns"}
          </button>
          <button 
            onClick={() => setActiveTab('past')} 
            className={`flex items-center gap-1.5 sm:gap-2 px-6 py-2.5 sm:px-10 sm:py-3.5 rounded-lg font-bold text-xs sm:text-sm transition-all ${activeTab === 'past' ? 'bg-mg-gold text-black shadow-md' : isDark ? 'text-white/60 hover:text-white hover:bg-white/5' : 'text-gray-500 hover:text-black hover:bg-black/5'}`}
          >
            {isFrench ? "Campagnes Passées" : "Past Campaigns"}
          </button>
        </div>
      </motion.div>

      <div className="grid gap-8 lg:grid-cols-3">
        
        {/* Left Column: Active Giveaways */}
        <motion.div initial="hidden" animate="show" variants={container} className="lg:col-span-2 space-y-6">
          <div className="flex items-center gap-3 px-2">
            <Gift className="text-mg-gold" size={24} />
            <h2 className={`text-2xl font-black ${isDark ? "text-white" : "text-gray-900"}`}>
              {isFrench ? "Campagnes Actives" : "Active Campaigns"}
            </h2>
          </div>

          {activeGiveaways.map((giveaway, idx) => {
            // Calculate progress based on default mock + interactive state
        <AnimatePresence mode="wait">
          <motion.div key={activeTab} initial="hidden" animate="show" exit={{ opacity: 0, y: -20, transition: { duration: 0.2 } }} variants={container} className="lg:col-span-2 space-y-6">
            
            {filteredGiveaways.length === 0 ? (
              <div className={`text-center py-20 rounded-[2rem] border ${isDark ? "border-white/5 bg-[#111111]" : "border-black/5 bg-white"}`}>
                <p className={`text-lg font-medium ${isDark ? "text-white/50" : "text-gray-500"}`}>
                  {isFrench ? "Aucune campagne trouvée." : "No campaigns found."}
                </p>
              </div>
            ) : (
              filteredGiveaways.map((giveaway, idx) => {
                const isJoined = joinedGiveaways[giveaway.id];
            const totalTasks = giveaway.tasks.length;
            const completedTasks = giveaway.tasks.filter(t => tasksState[t.id] ?? t.completed).length;
            const progressPercent = (completedTasks / totalTasks) * 100;
                const completedTasks = totalTasks > 0 ? giveaway.tasks.filter(t => tasksState[t.id] ?? t.completed).length : 0;
                const progressPercent = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

            return (
              <motion.div variants={item} key={idx} className={`relative overflow-hidden rounded-[2.5rem] border shadow-xl ${isDark ? "border-white/10 bg-[#111111]" : "border-black/10 bg-white"}`}>
                {progressPercent === 100 && (
                  <div className="absolute top-0 right-0 p-6 opacity-10 pointer-events-none">
                    <Sparkles size={120} className="text-mg-gold" />
                  </div>
                )}
                
                <div className={`p-6 md:p-8 border-b ${isDark ? "border-white/10 bg-white/5" : "border-black/10 bg-black/5"}`}>
                  <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                    <span className="inline-flex items-center gap-1.5 rounded-md bg-mg-gold/20 px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-mg-gold">
                      {giveaway.deadline[isFrench ? 'fr' : 'en']}
                    </span>
                      <span className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-bold uppercase tracking-wider ${activeTab === 'past' ? (isDark ? 'bg-white/10 text-white/50' : 'bg-black/5 text-gray-500') : 'bg-mg-gold/20 text-mg-gold'}`}>
                        {activeTab === 'past' ? <CalendarRange size={14} /> : <Clock size={14} />}
                        {giveaway.deadline[isFrench ? 'fr' : 'en']}
                      </span>
                    <span className={`text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 ${isDark ? "text-white/50" : "text-gray-500"}`}>
                      <Star size={14} className="text-mg-gold" /> {giveaway.participants} {isFrench ? "Participations" : "Entries"}
                    </span>
                  </div>
                  <h3 className={`text-2xl font-black mb-1 ${isDark ? "text-white" : "text-gray-900"}`}>{giveaway.title[isFrench ? 'fr' : 'en']}</h3>
                  <p className={`text-sm font-bold ${isDark ? "text-mg-gold/80" : "text-mg-gold"}`}>Prize: {giveaway.prize}</p>
                </div>

                <div className="p-6 md:p-8">
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-sm font-bold ${isDark ? "text-white/70" : "text-gray-700"}`}>{isFrench ? "Votre Progression" : "Your Progress"}</span>
                    <span className="text-sm font-black text-mg-gold">{completedTasks} / {totalTasks}</span>
                  </div>
                  <div className={`h-2.5 w-full overflow-hidden rounded-full mb-8 ${isDark ? "bg-white/10" : "bg-black/10"}`}>
                    <div className="h-full rounded-full bg-mg-gold shadow-[0_0_10px_rgba(212,175,55,0.8)] transition-all duration-500" style={{ width: `${progressPercent}%` }} />
                  </div>

                  <div className="space-y-3">
                    {giveaway.tasks.map((task) => {
                      const isCompleted = tasksState[task.id] ?? task.completed;
                      return (
                        <div key={task.id} className={`flex items-center justify-between p-4 rounded-2xl border transition-colors ${isCompleted ? (isDark ? "border-mg-gold/30 bg-mg-gold/5" : "border-mg-gold/30 bg-mg-gold/10") : (isDark ? "border-white/10 bg-white/[0.02]" : "border-black/5 bg-gray-50")}`}>
                          <div className="flex items-center gap-3">
                            <button onClick={() => toggleTask(task.id)} className={`flex shrink-0 items-center justify-center transition-colors ${isCompleted ? "text-mg-gold" : isDark ? "text-white/20 hover:text-white/50" : "text-black/20 hover:text-black/50"}`}>
                              {isCompleted ? <CheckCircle2 size={24} /> : <Circle size={24} />}
                            </button>
                            <span className={`text-sm font-medium ${isCompleted ? (isDark ? "text-white/60 line-through" : "text-gray-500 line-through") : (isDark ? "text-white" : "text-gray-900")}`}>
                              {task.desc[isFrench ? 'fr' : 'en']}
                            </span>
                          </div>
                          <a href={task.link} target={task.link.startsWith("http") ? "_blank" : "_self"} rel="noreferrer" className={`shrink-0 p-2 rounded-full transition-colors ${isDark ? "bg-white/5 text-white/50 hover:text-white hover:bg-white/10" : "bg-black/5 text-gray-500 hover:text-black hover:bg-black/10"}`}>
                            {task.link.startsWith("http") ? <ExternalLink size={16} /> : <ArrowRight size={16} />}
                          </a>
                        </div>
                      );
                    })}
                  </div>
                  
                  {progressPercent === 100 && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-center">
                      <p className="text-sm font-bold text-green-500 flex items-center justify-center gap-2">
                        <CheckCircle2 size={18} /> {isFrench ? "Tâches terminées ! Vous êtes inscrit." : "Tasks Complete! You are entered."}
                      </p>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Right Column: Winners Board */}
        <motion.div initial="hidden" animate="show" variants={container} className="space-y-6">
          <div className="flex items-center gap-3 px-2">
            <Trophy className="text-mg-gold" size={24} />
            <h2 className={`text-2xl font-black ${isDark ? "text-white" : "text-gray-900"}`}>
              {isFrench ? "Tableau des Gagnants" : "Winners Board"}
            </h2>
          </div>

          <motion.div variants={item} className={`rounded-[2.5rem] border shadow-xl overflow-hidden ${isDark ? "border-white/10 bg-[#111111]" : "border-black/10 bg-white"}`}>
            <div className="divide-y divide-white/5 dark:divide-white/10 divide-black/5">
              {pastWinners.map((winner, idx) => (
                <div key={idx} className={`p-5 flex items-center gap-4 transition-colors hover:bg-mg-gold/5`}>
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-mg-gold text-black font-black shadow-lg">
                    {winner.avatar}
                  </div>
                  <div className="flex-1">
                    <h4 className={`font-bold ${isDark ? "text-white" : "text-gray-900"}`}>{winner.name}</h4>
                    <p className={`text-xs font-bold text-mg-gold mt-0.5`}>{winner.prize}</p>
                    <p className={`text-[10px] font-bold uppercase tracking-wider text-mg-gold mt-1`}>{winner.prize}</p>
                    <p className={`text-[10px] italic mt-0.5 ${isDark ? "text-white/40" : "text-gray-500"}`}>{winner.challenge}</p>
                  </div>
                  <span className={`text-xs font-bold uppercase tracking-wider ${isDark ? "text-white/40" : "text-gray-400"}`}>{winner.date}</span>
                  <span className={`text-[10px] font-bold uppercase tracking-wider ${isDark ? "text-white/40" : "text-gray-400"}`}>{winner.date}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>

      </div>
    </div>
  );
}
