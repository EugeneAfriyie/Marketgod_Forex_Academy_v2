import { Clock3, PlayCircle, ArrowRight, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";
import { useLanguage } from "../../context/LanguageContext";
import StudentSectionCard from "../../Components/student/StudentSectionCard";

const enrolledCourses = [
  {
    title: "Beginner Mastery Course",
    level: "Beginner",
    description: "An eye-opening course for traders new to the forex industry, building the foundational knowledge to start your journey with confidence.",
    lessons: 24,
    duration: "8h 30m",
    progress: 35,
  },
  {
    title: "Mindset and Discipline",
    level: "All Levels",
    description: "Master the psychological aspect of trading, which is crucial for long-term success.",
    lessons: 9,
    duration: "3h 15m",
    progress: 100,
  },
  {
    title: "Advanced Mastery Course",
    level: "Advanced",
    description: "Dive deep into advanced strategies, market psychology, and institutional concepts to refine your edge and trade with precision.",
    lessons: 18,
    duration: "12h 15m",
    progress: 0,
  },
];

export default function EnrolledCoursesPage() {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const isDark = theme === "dark";
  const isFrench = language === "fr";

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <motion.div initial="hidden" animate="show" variants={container}>
      <StudentSectionCard
        title={isFrench ? "Cours Inscrits" : "Enrolled Courses"}
        description={
          isFrench
            ? "Vos cours actifs et terminés. Reprenez là où vous vous êtes arrêté ou commencez un nouveau cours."
            : "Your active and completed courses. Pick up where you left off or start a new learning path."
        }
      >
      <div className="grid gap-4 lg:grid-cols-2">
        {enrolledCourses.map((course) => {
          const slug = course.title.toLowerCase().replace(/\s+/g, "-");
          const isCompleted = course.progress === 100;
          const isNotStarted = course.progress === 0;

          const getCtaLabel = () => {
            if (isNotStarted) return isFrench ? "Commencer le cours" : "Start Course";
            return isFrench ? "Reprendre le cours" : "Resume Course";
          };

          return (
            <motion.article
              variants={item}
              key={course.title}
              className={`flex flex-col rounded-[1.75rem] border p-5 transition-all duration-300 ${
                isDark ? "border-white/10 bg-black/25" : "border-black/10 bg-[#faf7f0]"
              }`}
            >
              <div className="flex-1">
                <div className="flex items-center justify-between gap-4">
                  <span className="rounded-full bg-mg-gold/12 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-mg-gold">
                    {course.level}
                  </span>
                  <span className={`text-sm font-bold ${isCompleted ? "text-green-400" : isDark ? "text-white/60" : "text-mg-light-textSecondary/80"}`}>
                    {isCompleted ? (isFrench ? "Terminé" : "Completed") : `${course.progress}%`}
                  </span>
                </div>

                <h3 className={`mt-4 text-xl font-bold ${isDark ? "text-white" : "text-mg-light-text"}`}>{course.title}</h3>
                <p className={`mt-1 text-sm leading-6 ${isDark ? "text-white/60" : "text-mg-light-textSecondary"}`}>{course.description}</p>

                <div className={`mt-4 flex items-center gap-5 text-sm ${isDark ? "text-white/60" : "text-mg-light-textSecondary"}`}>
                  <span className="inline-flex items-center gap-2">
                    <PlayCircle size={16} className="text-mg-gold" />
                    {course.lessons} {isFrench ? "leçons" : "lessons"}
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <Clock3 size={16} className="text-mg-gold" />
                    {course.duration}
                  </span>
                </div>
              </div>

              <div className="mt-6">
                <div className={`h-2 w-full overflow-hidden rounded-full ${isDark ? "bg-white/10" : "bg-black/10"}`}>
                  <div className="h-full rounded-full bg-mg-gold" style={{ width: `${course.progress}%` }} />
                </div>
                
                {isCompleted ? (
                  <Link
                    to={`/dashboard/courses/${slug}/overview`}
                    className={`group mt-5 flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed py-3 text-sm font-bold uppercase tracking-wider transition-all hover:bg-green-500/10 ${isDark ? "border-green-500/30 text-green-400" : "border-green-500/30 text-green-600"}`}
                  >
                    <CheckCircle size={16} className="transition-transform group-hover:scale-110" />
                    <span>{isFrench ? "Revoir le cours" : "Review Course"}</span>
                  </Link>
                ) : (
                  <Link
                    to={`/dashboard/courses/${slug}/overview`}
                    className={`group mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-mg-gold px-6 py-3 text-sm font-bold uppercase tracking-wider text-black transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(212,175,55,0.4)]`}
                  >
                    <span>{getCtaLabel()}</span>
                    <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                  </Link>
                )}
              </div>
            </motion.article>
          );
        })}
      </div>
      </StudentSectionCard>
    </motion.div>
  );
}
