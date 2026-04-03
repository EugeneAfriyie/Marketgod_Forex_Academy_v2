import { useNavigate, Link, useParams } from "react-router-dom";
import { ArrowLeft, PlayCircle, CheckCircle2, Lock, Clock3, ArrowRight, Play } from "lucide-react";
import { motion, type Variants } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";
import { useLanguage } from "../../context/LanguageContext";
import StudentSectionCard from "../../Components/student/StudentSectionCard";

// Mock Data
const courseData = {
  title: "Beginner Mastery Course",
  progress: 35,
  description: "An eye-opening course for traders new to the forex industry, building the foundational knowledge to start your journey with confidence.",
  modules: [
    {
      title: "Module 1: Introduction to Forex",
      lessons: [
        { id: 1, title: "What is Forex?", duration: "15:20", status: "completed" },
        { id: 2, title: "Currency Pairs & Pips", duration: "22:10", status: "completed" },
        { id: 3, title: "Market Sessions", duration: "18:45", status: "current" }
      ]
    },
    {
      title: "Module 2: Market Structure Basics",
      lessons: [
        { id: 4, title: "Uptrends and Downtrends", duration: "25:30", status: "locked" },
        { id: 5, title: "Support and Resistance", duration: "30:00", status: "locked" }
      ]
    }
  ]
};

const relatedCourses = [
  { title: "Advanced Mastery Course", level: "Advanced", duration: "12h 15m" },
  { title: "Mindset and Discipline", level: "All Levels", duration: "3h 15m" }
];

export default function EnrolledCourseOverviewPage() {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const isDark = theme === "dark";
  const isFrench = language === "fr";
  const navigate = useNavigate();
  
  const { courseId } = useParams();
  const slug = courseId || "beginner-mastery-course";

  const container: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };
  const item: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } }
  };

  return (
    <motion.div initial="hidden" animate="show" variants={container} className="space-y-6">
      {/* Back to Enrolled Courses */}
      <motion.div variants={item}>
        <button
          onClick={() => navigate("/dashboard/courses/enrolled")}
          className={`group inline-flex items-center gap-2 text-sm font-medium transition-colors ${
            isDark ? "text-white/60 hover:text-white" : "text-mg-light-textSecondary hover:text-black"
          }`}
        >
          <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
          {isFrench ? "Retour à mes cours" : "Back to My Courses"}
        </button>
      </motion.div>

      {/* Hero Overview */}
      <motion.div variants={item} className={`overflow-hidden rounded-[2rem] border shadow-xl ${isDark ? "border-white/10 bg-black/25" : "border-black/10 bg-white"}`}>
        <div className="p-8 md:p-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="flex-1">
            <h1 className={`text-3xl font-black md:text-4xl ${isDark ? "text-white" : "text-mg-light-text"}`}>
              {courseData.title}
            </h1>
            <p className={`mt-3 text-sm md:text-base leading-relaxed ${isDark ? "text-white/70" : "text-mg-light-textSecondary"}`}>
              {courseData.description}
            </p>
            <div className="mt-6">
              <div className="flex items-center justify-between mb-2">
                <span className={`text-sm font-bold ${isDark ? "text-white" : "text-mg-light-text"}`}>{isFrench ? "Progression Globale" : "Overall Progress"}</span>
                <span className="text-sm font-bold text-mg-gold">{courseData.progress}%</span>
              </div>
              <div className={`h-2 w-full max-w-md overflow-hidden rounded-full ${isDark ? "bg-white/10" : "bg-black/10"}`}>
                <div className="h-full rounded-full bg-mg-gold shadow-[0_0_10px_rgba(212,175,55,0.8)]" style={{ width: `${courseData.progress}%` }} />
              </div>
            </div>
          </div>
          <div className="shrink-0">
            <Link
              to={`/dashboard/courses/${slug}/lessons/3`}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-mg-gold px-8 py-4 text-sm font-bold uppercase tracking-wider text-black shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] md:w-auto"
            >
              <Play size={18} className="fill-black" />
              {isFrench ? "Reprendre le cours" : "Resume Course"}
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Class/Lesson View */}
      <StudentSectionCard
        title={isFrench ? "Programme du cours" : "Course Syllabus"}
        description={isFrench ? "Sélectionnez une leçon ci-dessous pour commencer à regarder." : "Select a lesson below to start watching."}
      >
        <div className="space-y-8">
          {courseData.modules.map((mod, mIdx) => (
            <div key={mIdx}>
              <h3 className={`mb-4 text-sm font-bold uppercase tracking-wider ${isDark ? "text-white/60" : "text-mg-light-textSecondary"}`}>
                {mod.title}
              </h3>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {mod.lessons.map((lesson) => {
                  const isLocked = lesson.status === "locked";
                  const isCompleted = lesson.status === "completed";
                  const isCurrent = lesson.status === "current";

                  return (
                    <motion.div variants={item} key={lesson.id}>
                      <Link
                        to={isLocked ? "#" : `/dashboard/courses/${slug}/lessons/${lesson.id}`}
                        className={`group relative block h-full overflow-hidden rounded-2xl border p-5 transition-all duration-300 ${
                          isLocked 
                            ? isDark ? "border-white/5 bg-white/[0.01] cursor-not-allowed opacity-50" : "border-black/5 bg-black/[0.01] cursor-not-allowed opacity-50"
                            : isCurrent
                              ? isDark ? "border-mg-gold/50 bg-mg-gold/10 hover:-translate-y-1 hover:shadow-lg" : "border-mg-gold/50 bg-mg-gold/10 hover:-translate-y-1 hover:shadow-lg"
                              : isDark ? "border-white/10 bg-black/20 hover:border-white/20 hover:-translate-y-1 hover:bg-white/5" : "border-black/10 bg-[#faf7f0] hover:border-black/20 hover:-translate-y-1 hover:bg-black/5"
                        }`}
                      >
                        <div>
                        <div className="mb-4 flex items-center justify-between">
                          <div className={`flex h-10 w-10 items-center justify-center rounded-full ${isCurrent ? "bg-mg-gold text-black shadow-[0_0_15px_rgba(212,175,55,0.4)]" : isCompleted ? (isDark ? "bg-white/10 text-white" : "bg-black/5 text-gray-900") : isDark ? "bg-white/5 text-white/40" : "bg-black/5 text-black/40"}`}>
                            {isCompleted ? <CheckCircle2 size={20} /> : isLocked ? <Lock size={20} /> : <PlayCircle size={20} />}
                          </div>
                          <div className={`flex items-center gap-1.5 text-xs font-semibold ${isDark ? "text-white/40" : "text-mg-light-textSecondary/60"}`}>
                            <Clock3 size={14} />
                            {lesson.duration}
                          </div>
                        </div>
                        <h4 className={`font-bold ${isCurrent ? (isDark ? "text-white" : "text-mg-light-text") : isDark ? "text-white/80" : "text-mg-light-text"}`}>{lesson.title}</h4>
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </StudentSectionCard>

      {/* Related Courses */}
      <StudentSectionCard title={isFrench ? "Cours Associés" : "Related Courses"} description={isFrench ? "Élargissez vos connaissances." : "Expand your knowledge with these recommendations."}>
        <div className="grid gap-4 md:grid-cols-2">
          {relatedCourses.map((course) => (
            <motion.div variants={item} key={course.title}>
              <Link to={`/dashboard/courses/${course.title.toLowerCase().replace(/\s+/g, "-")}`} className={`group flex items-center justify-between rounded-2xl border p-4 transition-all hover:border-mg-gold/50 hover:bg-mg-gold/5 ${isDark ? "border-white/10 bg-white/[0.02]" : "border-black/10 bg-[#faf7f0]"}`}>
                <div>
                  <p className="text-xs font-bold text-mg-gold uppercase tracking-wider mb-1">{course.level}</p>
                  <h4 className={`font-bold ${isDark ? "text-white" : "text-mg-light-text"}`}>{course.title}</h4>
                </div>
                <ArrowRight size={18} className={`transition-transform group-hover:translate-x-1 ${isDark ? "text-white/40 group-hover:text-mg-gold" : "text-mg-light-textSecondary/40 group-hover:text-mg-gold"}`} />
              </Link>
            </motion.div>
          ))}
        </div>
      </StudentSectionCard>
    </motion.div>
  );
}