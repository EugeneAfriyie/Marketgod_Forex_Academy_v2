import { Award, CheckCircle, Crown, Footprints, Star, Users, MessageSquare, Coins, ShieldCheck, Trophy } from "lucide-react";
import { motion, type Variants } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";
import StudentSectionCard from "../../Components/student/StudentSectionCard";

const milestones = [
    {
        title: "First Steps",
        description: "Set up your profile and verify your account to unlock the ecosystem.",
        icon: Footprints,
        unlocked: true,
        reward: 50,
    },
    {
        title: "Course Completist",
        description: "Finish your first complete course and pass the final knowledge check.",
        icon: CheckCircle,
        unlocked: true,
        reward: 250,
    },
    {
        title: "The Networker",
        description: "Get your first 3 active referrals via the Affiliate Program.",
        icon: Users,
        unlocked: false,
        reward: 500,
    },
    {
        title: "Inner Circle",
        description: "Join the VIP Mentorship program and attend a live session.",
        icon: Crown,
        unlocked: false,
        reward: 1000,
    },
    {
        title: "Sniper Execution",
        description: "Post a winning P&L screenshot in the VIP Telegram channel.",
        icon: MessageSquare,
        unlocked: false,
        reward: 500,
    },
    {
        title: "Platform Pro",
        description: "Unlock all available achievements on the platform.",
        icon: Award,
        unlocked: false,
        reward: 2000,
    },
];

export default function MilestonesPage() {
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const unlockedCount = milestones.filter((m) => m.unlocked).length;
    const totalMGC = milestones.reduce((sum, m) => (m.unlocked ? sum + m.reward : sum), 0);

    const container: Variants = {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };
    const item: Variants = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } }
    };
    return (<motion.div initial="hidden" animate="show" variants={container} className="space-y-6">
      
      {/* Rank Progress Banner */}
      <motion.div variants={item} className={`relative overflow-hidden rounded-[2.5rem] border shadow-xl p-8 md:p-12 ${isDark ? "border-white/10 bg-[#111111]" : "border-black/10 bg-white"}`}>
         <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
           <ShieldCheck size={200} className="text-mg-gold"/>
         </div>
         <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
           <div className="flex-1">
             <h2 className={`text-2xl md:text-3xl font-black mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>
               {"Elite Sniper Progression"}
             </h2>
             <p className={`text-sm font-medium mb-6 ${isDark ? "text-white/60" : "text-gray-600"}`}>
               {"Complete milestones to unlock higher ranks, exclusive ID card designs, and access to premium tools."}
             </p>
             
             <div className="space-y-3">
               <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider">
                 <span className={isDark ? "text-mg-gold" : "text-mg-gold"}>Current: Pro</span>
                 <span className={isDark ? "text-white/50" : "text-gray-400"}>Next: VIP (75%)</span>
               </div>
               <div className={`h-3 w-full rounded-full overflow-hidden shadow-inner ${isDark ? "bg-white/10" : "bg-black/10"}`}>
                 <div className="h-full bg-mg-gold rounded-full shadow-[0_0_10px_rgba(212,175,55,0.8)]" style={{ width: '75%' }}/>
               </div>
             </div>
           </div>
           <div className="shrink-0 flex flex-col items-center justify-center p-6 rounded-2xl border-2 border-mg-gold/30 bg-mg-gold/5">
             <Star size={32} className="text-mg-gold mb-2"/>
             <span className="text-3xl font-black text-mg-gold">Level 2</span>
           </div>
         </div>
      </motion.div>

      <StudentSectionCard title={"Achievement Milestones"} description={"Complete tasks to earn MarketGod Coins (MGC) and level up your profile."}>
        <motion.div variants={container} className="mb-8 grid gap-4 md:grid-cols-2">
          <motion.div variants={item} className={`rounded-[2rem] border p-6 md:p-8 flex items-center justify-between ${isDark ? "border-white/10 bg-black/25 hover:border-mg-gold/30" : "border-black/10 bg-[#faf7f0] hover:border-mg-gold/30"} transition-colors`}>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-mg-gold mb-1">{"Milestones Unlocked"}</p>
              <p className={`text-4xl font-black ${isDark ? "text-white" : "text-gray-900"}`}>
                {unlockedCount} <span className="text-xl font-bold opacity-30">/ {milestones.length}</span>
              </p>
            </div>
            <div className="h-16 w-16 rounded-2xl bg-mg-gold/10 text-mg-gold flex items-center justify-center">
              <Trophy size={32}/>
            </div>
          </motion.div>
          
          <motion.div variants={item} className={`rounded-[2rem] border p-6 md:p-8 flex items-center justify-between ${isDark ? "border-white/10 bg-black/25 hover:border-mg-gold/30" : "border-black/10 bg-[#faf7f0] hover:border-mg-gold/30"} transition-colors`}>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-mg-gold mb-1">{"Total MGC Earned"}</p>
              <p className={`text-4xl font-black ${isDark ? "text-white" : "text-gray-900"}`}>{totalMGC.toLocaleString()}</p>
            </div>
            <div className="h-16 w-16 rounded-2xl bg-mg-gold/10 text-mg-gold flex items-center justify-center shadow-[0_0_15px_rgba(212,175,55,0.3)]">
              <Coins size={32}/>
            </div>
          </motion.div>
        </motion.div>

        <motion.div variants={container} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {milestones.map((milestone) => {
            const Icon = milestone.icon;
            return (<motion.div variants={item} key={milestone.title} className={`relative overflow-hidden rounded-[2rem] border p-6 md:p-8 transition-all duration-300 ${milestone.unlocked
                    ? `shadow-lg hover:-translate-y-1 ${isDark ? "border-mg-gold/30 bg-white/[0.03]" : "border-mg-gold/50 bg-white"}`
                    : `${isDark ? "border-white/10 bg-black/20" : "border-black/10 bg-gray-50"}`}`}>
                {milestone.unlocked && (<div className="absolute top-0 right-0 h-16 w-16">
                    <div className="absolute transform rotate-45 bg-mg-gold text-center text-black font-semibold py-1 right-[-34px] top-[32px] w-[170px]">
                      {"Unlocked"}
                    </div>
                  </div>)}
                <div className={`inline-flex rounded-2xl p-4 mb-5 transition-colors ${milestone.unlocked ? `bg-mg-gold/15 text-mg-gold shadow-inner` : `${isDark ? "bg-white/5 text-white/30" : "bg-black/5 text-black/30"}`}`}>
                  <Icon size={28}/>
                </div>
                <h3 className={`text-xl font-bold ${milestone.unlocked ? (isDark ? "text-white" : "text-gray-900") : isDark ? "text-white/50" : "text-gray-500"}`}>
                  {milestone.title}
                </h3>
                <p className={`mt-2 text-sm leading-relaxed font-medium ${milestone.unlocked ? (isDark ? "text-white/60" : "text-gray-600") : isDark ? "text-white/40" : "text-gray-400"}`}>
                  {milestone.description}
                </p>
                <div className={`mt-6 flex items-center gap-1.5 text-xs font-black uppercase tracking-wider ${milestone.unlocked ? "text-mg-gold" : isDark ? "text-white/30" : "text-gray-400"}`}>
                  <Coins size={14}/>
                  +{milestone.reward} MGC
                </div>
              </motion.div>);
        })}
        </motion.div>
      </StudentSectionCard>
    </motion.div>);
}
