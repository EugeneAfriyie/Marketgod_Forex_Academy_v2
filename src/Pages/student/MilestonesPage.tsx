import { Award, BarChart3, CheckCircle, Crown, Footprints, Star } from "lucide-react";
import { motion, type Variants } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";
import { useLanguage } from "../../context/LanguageContext";
import StudentSectionCard from "../../Components/student/StudentSectionCard";

const milestones = [
  {
    title: "First Steps",
    description: "Complete your first lesson to start your journey.",
    icon: Footprints,
    unlocked: true,
    xp: 50,
  },
  {
    title: "Course Completist",
    description: "Finish an entire course from start to finish.",
    icon: CheckCircle,
    unlocked: true,
    xp: 250,
  },
  {
    title: "Growth Spurt",
    description: "Watch 5 hours of content in a single week.",
    icon: BarChart3,
    unlocked: true,
    xp: 150,
  },
  {
    title: "Masterclass Graduate",
    description: "Complete the Gold Sniper Masterclass.",
    icon: Crown,
    unlocked: false,
    xp: 1000,
  },
  {
    title: "Recognized Student",
    description: "Surface notable achievements that deserve visibility.",
    icon: Star,
    unlocked: false,
    xp: 500,
  },
  {
    title: "Platform Pro",
    description: "Unlock all available achievements on the platform.",
    icon: Award,
    unlocked: false,
    xp: 2000,
  },
];

export default function MilestonesPage() {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const isDark = theme === "dark";
  const isFrench = language === "fr";

  const unlockedCount = milestones.filter((m) => m.unlocked).length;
  const totalXP = milestones.reduce((sum, m) => (m.unlocked ? sum + m.xp : sum), 0);

  const container: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };
  const item: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } }
  };

  return (
    <motion.div initial="hidden" animate="show" variants={container} className="space-y-5">
      <StudentSectionCard
        title={isFrench ? "Jalons" : "Milestones"}
        description={isFrench ? "Célébrez vos réussites et votre croissance au sein de la plateforme." : "Celebrate your achievements and growth inside the platform."}
      >
        <motion.div variants={container} initial="hidden" animate="show" className="mb-8 grid gap-4 md:grid-cols-3">
          <motion.div variants={item} className={`rounded-2xl border p-5 ${isDark ? "border-white/10 bg-black/25" : "border-black/10 bg-white/50"}`}>
            <p className="text-sm font-medium text-mg-gold">{isFrench ? "Jalons Débloqués" : "Milestones Unlocked"}</p>
            <p className={`mt-2 text-3xl font-black ${isDark ? "text-white" : "text-mg-light-text"}`}>
              {unlockedCount} <span className="text-lg font-medium text-white/40">/ {milestones.length}</span>
            </p>
          </motion.div>
          <motion.div variants={item} className={`rounded-2xl border p-5 ${isDark ? "border-white/10 bg-black/25" : "border-black/10 bg-white/50"}`}>
            <p className="text-sm font-medium text-mg-gold">{isFrench ? "Total XP Gagné" : "Total XP Earned"}</p>
            <p className={`mt-2 text-3xl font-black ${isDark ? "text-white" : "text-mg-light-text"}`}>{totalXP.toLocaleString()}</p>
          </motion.div>
        </motion.div>

        <motion.div variants={container} initial="hidden" animate="show" className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {milestones.map((milestone) => {
            const Icon = milestone.icon;
            return (
              <motion.div
                variants={item}
                key={milestone.title}
                className={`relative overflow-hidden rounded-3xl border p-6 transition-all duration-300 ${
                  milestone.unlocked
                    ? `shadow-lg hover:shadow-gold-glow ${isDark ? "border-mg-gold/30 bg-white/[0.03]" : "border-mg-gold/50 bg-white"}`
                    : `${isDark ? "border-white/10 bg-black/20" : "border-black/10 bg-gray-50"}`
                }`}
              >
                {milestone.unlocked && (
                  <div className="absolute top-0 right-0 h-16 w-16">
                    <div className="absolute transform rotate-45 bg-mg-gold text-center text-black font-semibold py-1 right-[-34px] top-[32px] w-[170px]">
                      {isFrench ? "Débloqué" : "Unlocked"}
                    </div>
                  </div>
                )}
                <div
                  className={`inline-flex rounded-2xl p-3 mb-4 transition-colors ${
                    milestone.unlocked ? `bg-mg-gold/15 text-mg-gold` : `${isDark ? "bg-white/5 text-white/40" : "bg-black/5 text-black/40"}`
                  }`}
                >
                  <Icon size={24} />
                </div>
                <h3 className={`text-lg font-bold ${milestone.unlocked ? (isDark ? "text-white" : "text-mg-light-text") : isDark ? "text-white/50" : "text-mg-light-textSecondary"}`}>
                  {milestone.title}
                </h3>
                <p className={`mt-2 text-sm leading-6 ${milestone.unlocked ? (isDark ? "text-white/60" : "text-mg-light-textSecondary") : isDark ? "text-white/40" : "text-mg-light-textSecondary/60"}`}>
                  {milestone.description}
                </p>
                <p className={`mt-4 text-xs font-bold uppercase tracking-wider ${milestone.unlocked ? "text-mg-gold" : isDark ? "text-white/30" : "text-black/30"}`}>
                  {milestone.xp} XP
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </StudentSectionCard>
    </motion.div>
  );
}
