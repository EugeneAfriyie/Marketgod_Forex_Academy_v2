import { Clock3, PlayCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, type Variants } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";
import { useLanguage } from "../../context/LanguageContext";
import StudentSectionCard from "../../Components/student/StudentSectionCard";

const courses = [
  {
    title: "Beginner Mastery Course",
    level: "Beginner",
    description: "An eye-opening course for traders new to the forex industry, building the foundational knowledge to start your journey with confidence.",
    lessons: 24,
    duration: "8h 30m",
    price: "Free",
  },
  {
    title: "Advanced Mastery Course",
    level: "Advanced",
    description: "Dive deep into advanced strategies, market psychology, and institutional concepts to refine your edge and trade with precision.",
    lessons: 18,
    duration: "12h 15m",
    price: "Premium",
  },
  {
    title: "Flipping Mastery Course",
    level: "Expert",
    description: "Learn the art of the 'account flip'. This specialized course teaches high-risk, high-reward techniques for rapid account growth.",
    lessons: 12,
    duration: "6h 45m",
    price: "Premium",
  },
];

export default function CoursesPage() {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const isDark = theme === "dark";
  const isFrench = language === "fr";

  const container: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };
  const item: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } }
  };

  return (
    <motion.div initial="hidden" animate="show" variants={container}>
      <StudentSectionCard
        title={isFrench ? "Tous les Cours" : "All Courses"}
        description={
          isFrench
            ? "Cette page presente l'ensemble des cours disponibles sur la plateforme, qu'ils soient deja debloques ou non."
            : "This page presents the full course catalog available on the platform, whether the user is already enrolled or not."
        }
      >
      <div className="grid gap-4 lg:grid-cols-2">
        {courses.map((course) => {
          const slug = course.title.toLowerCase().replace(/\s+/g, "-");

          return (
            <motion.div variants={item} key={course.title}>
              <Link
                to={`/dashboard/courses/${slug}`}
                className={`group relative block overflow-hidden rounded-[1.75rem] border p-5 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                  isDark
                    ? "border-white/10 bg-black/25 hover:border-white/20"
                    : "border-black/10 bg-[#faf7f0] hover:border-black/20"
                }`}
              >
              <div>
                <div className="flex items-center justify-between gap-4">
                  <span className="rounded-full bg-mg-gold/12 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-mg-gold">
                    {isFrench ? (course.level === "Beginner" ? "Débutant" : course.level === "Advanced" ? "Avancé" : "Expert") : course.level}
                  </span>
                  <span className={`rounded-full px-3 py-1 text-xs font-bold tracking-wider ${
                    course.price === "Free" 
                      ? isDark ? "bg-green-500/20 text-green-400" : "bg-green-100 text-green-600"
                      : isDark ? "bg-blue-500/20 text-blue-400" : "bg-blue-100 text-blue-600"
                  }`}>
                    {course.price === "Free" ? (isFrench ? "Gratuit" : "Free") : "Premium"}
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

                <div className={`mt-6 flex items-center justify-between border-t pt-4 transition-colors ${isDark ? "border-white/10 group-hover:border-mg-gold/30" : "border-black/5 group-hover:border-mg-gold/30"}`}>
                  <span className="text-sm font-semibold text-mg-gold">
                    {isFrench ? "Voir les détails du cours" : "View Course Details"}
                  </span>
                  <div className={`flex h-8 w-8 items-center justify-center rounded-full transition-transform group-hover:translate-x-1 ${isDark ? "bg-white/5" : "bg-black/5"}`}>
                    <ArrowRight size={16} className="text-mg-gold" />
                  </div>
                </div>
              </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
      </StudentSectionCard>
    </motion.div>
  );
}
