import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, BookOpen, Clock3, PlayCircle, CheckCircle2, Loader2, XCircle } from "lucide-react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";
import { useLanguage } from "../../context/LanguageContext";
import StudentSectionCard from "../../Components/student/StudentSectionCard";

const modules = [
  { title: "Module 1: Introduction to Forex", lessons: 4, duration: "1h 15m" },
  { title: "Module 2: Market Structure Basics", lessons: 6, duration: "2h 30m" },
  { title: "Module 3: Candlestick Anatomy", lessons: 5, duration: "1h 45m" },
  { title: "Module 4: Risk Management & Psychology", lessons: 9, duration: "3h 00m" },
];

// Mock course data to demonstrate Free vs Premium state
const courseData = {
  title: "Beginner Mastery Course",
  level: "Beginner",
  price: "Free", // Change to "Premium" to see the paid state
  description: "An eye-opening course for traders new to the forex industry, building the foundational knowledge to start your journey with confidence.",
  lessons: 24,
  duration: "8h 30m"
};

export default function CourseDetailsPage() {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const isDark = theme === "dark";
  const isFrench = language === "fr";
  const navigate = useNavigate();

  const [showEnrollModal, setShowEnrollModal] = useState(false);
  const [enrollmentState, setEnrollmentState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleCloseModal = () => {
    setShowEnrollModal(false);
    setEnrollmentState('idle');
  };

  const handleConfirmEnrollment = () => {
    setEnrollmentState('loading');

    // Simulate an API call
    setTimeout(() => {
      // 90% success rate for demonstration purposes
      const isSuccess = Math.random() > 0.1;

      if (isSuccess) {
        setEnrollmentState('success');
        setTimeout(() => {
          handleCloseModal();
          navigate("/dashboard/courses/enrolled");
        }, 2000);
      } else {
        setEnrollmentState('error');
      }
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

  return (
    <motion.div initial="hidden" animate="show" variants={container} className="space-y-6">
      {/* Back Button */}
      <motion.div variants={item}>
        <button
          onClick={() => navigate(-1)}
          className={`group inline-flex items-center gap-2 text-sm font-medium transition-colors ${
            isDark ? "text-white/60 hover:text-white" : "text-mg-light-textSecondary hover:text-black"
          }`}
        >
          <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
          {isFrench ? "Retour aux cours" : "Back to All Courses"}
        </button>
      </motion.div>

      {/* Course Hero Banner */}
      <motion.div variants={item} className={`overflow-hidden rounded-[2rem] border shadow-xl ${isDark ? "border-white/10 bg-black/25" : "border-black/10 bg-white"}`}>
        <div className="relative p-8 md:p-10">
          {/* Background graphic */}
          <div className="absolute top-0 right-0 p-8 opacity-5 blur-[2px]">
            <BookOpen size={180} className="text-mg-gold" />
          </div>
          
          <div className="relative z-10 max-w-3xl">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-mg-gold/12 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-mg-gold">
                {isFrench ? (courseData.level === "Beginner" ? "Débutant" : courseData.level) : courseData.level}
              </span>
              <span className={`rounded-full px-3 py-1 text-xs font-bold tracking-wider ${
                courseData.price === "Free" 
                  ? isDark ? "bg-green-500/20 text-green-400" : "bg-green-100 text-green-600"
                  : isDark ? "bg-blue-500/20 text-blue-400" : "bg-blue-100 text-blue-600"
              }`}>
                {courseData.price === "Free" ? (isFrench ? "Gratuit" : "Free") : "Premium"}
              </span>
            </div>
            <h1 className={`mt-4 text-3xl font-black md:text-5xl ${isDark ? "text-white" : "text-mg-light-text"}`}>
              {courseData.title}
            </h1>
            <p className={`mt-4 text-lg leading-relaxed ${isDark ? "text-white/70" : "text-mg-light-textSecondary"}`}>
              {courseData.description}
            </p>

            <div className={`mt-8 flex flex-wrap items-center gap-6 text-sm font-medium ${isDark ? "text-white/60" : "text-mg-light-textSecondary"}`}>
              <span className="flex items-center gap-2"><PlayCircle size={18} className="text-mg-gold" /> {courseData.lessons} {isFrench ? "Leçons" : "Lessons"}</span>
              <span className="flex items-center gap-2"><Clock3 size={18} className="text-mg-gold" /> {courseData.duration}</span>
            </div>

            <div className="mt-10">
              <button
                onClick={() => setShowEnrollModal(true)}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-mg-gold px-8 py-4 text-sm font-bold uppercase tracking-wider text-black shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] md:w-auto"
              >
                {courseData.price === "Free" 
                  ? (isFrench ? "S'inscrire gratuitement" : "Enroll for Free")
                  : (isFrench ? "Débloquer le cours" : "Unlock Course")}
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Course Modules Curriculum */}
      <StudentSectionCard
        title={isFrench ? "Aperçu du cours" : "Course Overview"}
        description={isFrench ? "Ce que vous allez apprendre dans ce cours." : "What you will learn in this course."}
      >
        <div className="grid gap-4 md:grid-cols-2">
          {modules.map((mod, i) => (
            <motion.div variants={item} key={i} className={`rounded-2xl border p-5 ${isDark ? "border-white/10 bg-white/[0.02]" : "border-black/10 bg-[#faf7f0]"}`}>
              <div className="flex items-start justify-between gap-4">
                <h3 className={`font-bold ${isDark ? "text-white" : "text-mg-light-text"}`}>{mod.title}</h3>
                <CheckCircle2 size={18} className={isDark ? "text-white/20" : "text-black/20"} />
              </div>
              <div className={`mt-4 flex items-center gap-4 text-xs font-semibold ${isDark ? "text-white/40" : "text-mg-light-textSecondary/60"}`}>
                <span>{mod.lessons} {isFrench ? "Leçons" : "Lessons"}</span>
                <span>•</span>
                <span>{mod.duration}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </StudentSectionCard>

      {/* Enrollment Confirmation Modal */}
      <AnimatePresence>
      {showEnrollModal && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className={`w-full max-w-md overflow-hidden rounded-3xl border shadow-2xl ${isDark ? "border-white/10 bg-[#111111]" : "border-black/10 bg-white"}`}
          >
            <AnimatePresence mode="wait">
            {enrollmentState === 'idle' && (
              <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                <div className={`p-6 ${isDark ? "bg-white/5" : "bg-black/5"}`}>
                  <h3 className={`text-xl font-bold ${isDark ? "text-white" : "text-mg-light-text"}`}>
                    {courseData.price === "Free" 
                      ? (isFrench ? "Confirmer l'inscription" : "Confirm Enrollment")
                      : (isFrench ? "Options d'accès" : "Access Options")}
                  </h3>
                </div>
                <div className="p-6">
                  {courseData.price === "Free" ? (
                    <p className={`text-sm leading-6 ${isDark ? "text-white/70" : "text-mg-light-textSecondary"}`}>
                      {isFrench
                        ? "Vous êtes sur le point de vous inscrire gratuitement à ce cours. N'oubliez pas : si vous souhaitez accéder à tous nos cours premium, ils sont entièrement inclus lorsque vous rejoignez le programme de mentorat Marketgod !"
                        : "You are about to enroll in this course for free. Remember: if you want access to all of our premium courses, they are fully included when you join the Marketgod Mentorship program!"}
                    </p>
                  ) : (
                    <p className={`text-sm leading-6 ${isDark ? "text-white/70" : "text-mg-light-textSecondary"}`}>
                      {isFrench
                        ? "Ceci est un cours Premium. Vous pouvez l'acheter individuellement, ou y accéder GRATUITEMENT en rejoignant notre programme de mentorat."
                        : "This is a Premium course. You can purchase it individually, or get access to it for FREE by joining our Mentorship program."}
                    </p>
                  )}
                  <div className="mt-8 flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={handleCloseModal}
                      className={`flex-1 rounded-xl border px-4 py-3 text-sm font-semibold transition-colors ${
                        isDark ? "border-white/10 text-white hover:bg-white/5" : "border-black/10 text-mg-light-text hover:bg-black/5"
                      }`}
                    >
                      {isFrench ? "Annuler" : "Cancel"}
                    </button>
                    {courseData.price === "Premium" && (
                      <button
                        onClick={() => { handleCloseModal(); navigate("/dashboard/mentorship"); }}
                        className={`flex-1 rounded-xl border border-mg-gold px-4 py-3 text-sm font-bold text-mg-gold transition-colors hover:bg-mg-gold/10`}
                      >
                        {isFrench ? "Rejoindre le Mentorat" : "Join Mentorship"}
                      </button>
                    )}
                    <button
                      onClick={handleConfirmEnrollment}
                      className="flex-1 rounded-xl bg-mg-gold px-4 py-3 text-sm font-bold text-black transition-transform hover:scale-[1.02] hover:shadow-[0_0_15px_rgba(212,175,55,0.4)]"
                    >
                      {courseData.price === "Free" 
                        ? (isFrench ? "M'inscrire" : "Enroll Now") 
                        : (isFrench ? "Acheter" : "Purchase")}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {enrollmentState === 'loading' && (
              <motion.div key="loading" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="flex flex-col items-center justify-center p-10 text-center">
                <Loader2 size={48} className="mb-6 animate-spin text-mg-gold" />
                <h3 className={`text-xl font-bold ${isDark ? "text-white" : "text-mg-light-text"}`}>
                  {isFrench ? "Inscription en cours..." : "Enrolling..."}
                </h3>
                <p className={`mt-2 text-sm ${isDark ? "text-white/60" : "text-mg-light-textSecondary"}`}>
                  {isFrench ? "Veuillez patienter un instant." : "Please wait a moment while we set up your course."}
                </p>
              </motion.div>
            )}

            {enrollmentState === 'success' && (
              <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="flex flex-col items-center justify-center p-10 text-center">
                <CheckCircle2 size={56} className="mb-6 text-green-500" />
                <h3 className={`text-xl font-bold ${isDark ? "text-white" : "text-mg-light-text"}`}>
                  {isFrench ? "Inscription réussie !" : "Successfully Enrolled!"}
                </h3>
                <p className={`mt-2 text-sm ${isDark ? "text-white/60" : "text-mg-light-textSecondary"}`}>
                  {isFrench ? "Redirection vers vos cours..." : "Redirecting to your learning space..."}
                </p>
              </motion.div>
            )}

            {enrollmentState === 'error' && (
              <motion.div key="error" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="flex flex-col items-center justify-center p-10 text-center">
                <XCircle size={56} className="mb-6 text-red-500" />
                <h3 className={`text-xl font-bold ${isDark ? "text-white" : "text-mg-light-text"}`}>
                  {isFrench ? "Échec de l'inscription" : "Enrollment Failed"}
                </h3>
                <p className={`mt-2 text-sm leading-relaxed ${isDark ? "text-white/60" : "text-mg-light-textSecondary"}`}>
                  {isFrench ? "Un problème est survenu lors de l'inscription. Veuillez vérifier votre connexion ou réessayer plus tard." : "There was a problem processing your enrollment. Please check your connection or try again later."}
                </p>
                <div className="mt-8 flex w-full gap-3">
                  <button
                    onClick={handleCloseModal}
                    className={`flex-1 rounded-xl border px-4 py-3 text-sm font-semibold transition-colors ${
                      isDark ? "border-white/10 text-white hover:bg-white/5" : "border-black/10 text-mg-light-text hover:bg-black/5"
                    }`}
                  >
                    {isFrench ? "Annuler" : "Cancel"}
                  </button>
                  <button
                    onClick={handleConfirmEnrollment}
                    className="flex-1 rounded-xl bg-mg-gold px-4 py-3 text-sm font-bold text-black transition-transform hover:scale-[1.02] hover:shadow-[0_0_15px_rgba(212,175,55,0.4)]"
                  >
                    {isFrench ? "Réessayer" : "Try Again"}
                  </button>
                </div>
              </motion.div>
            )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
      </AnimatePresence>
    </motion.div>
  );
}
