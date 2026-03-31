import { Clock3, PlayCircle } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { useLanguage } from "../../context/LanguageContext";
import StudentSectionCard from "../../Components/student/StudentSectionCard";

const courses = [
  { title: "Market Structure Foundations", lessons: 18, progress: "72%", status: "Active" },
  { title: "Gold Sniper Masterclass", lessons: 12, progress: "48%", status: "Active" },
  { title: "Risk and Trading Psychology", lessons: 9, progress: "100%", status: "Completed" },
];

export default function CoursesPage() {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const isDark = theme === "dark";
  const isFrench = language === "fr";

  return (
    <StudentSectionCard
      title={isFrench ? "Tous les Cours" : "All Courses"}
      description={
        isFrench
          ? "Cette page presente l'ensemble des cours disponibles sur la plateforme, qu'ils soient deja debloques ou non."
          : "This page presents the full course catalog available on the platform, whether the user is already enrolled or not."
      }
    >
      <div className="grid gap-4 lg:grid-cols-2">
        {courses.map((course) => (
          <article
            key={course.title}
            className={`rounded-[1.75rem] border p-5 ${
              isDark ? "border-white/10 bg-black/25" : "border-black/10 bg-[#faf7f0]"
            }`}
          >
            <div className="flex items-center justify-between gap-4">
              <span className="rounded-full bg-mg-gold/12 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-mg-gold">
                {isFrench ? (course.status === "Active" ? "Actif" : "Termine") : course.status}
              </span>
              <span className={`text-sm ${isDark ? "text-white/55" : "text-mg-light-textSecondary/75"}`}>{course.progress}</span>
            </div>

            <h3 className={`mt-4 text-xl font-bold ${isDark ? "text-white" : "text-mg-light-text"}`}>{course.title}</h3>

            <div className={`mt-4 flex items-center gap-5 text-sm ${isDark ? "text-white/58" : "text-mg-light-textSecondary/78"}`}>
              <span className="inline-flex items-center gap-2">
                <PlayCircle size={16} className="text-mg-gold" />
                {course.lessons} {isFrench ? "lecons" : "lessons"}
              </span>
              <span className="inline-flex items-center gap-2">
                <Clock3 size={16} className="text-mg-gold" />
                {isFrench ? "Progression suivie" : "Progress tracked"}
              </span>
            </div>

            <div className={`mt-5 h-2 overflow-hidden rounded-full ${isDark ? "bg-white/10" : "bg-black/8"}`}>
              <div className="h-full rounded-full bg-mg-gold" style={{ width: course.progress }} />
            </div>
          </article>
        ))}
      </div>
    </StudentSectionCard>
  );
}
