import { ArrowUpRight, BookOpen, CalendarDays, CreditCard, PlayCircle } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import StudentSectionCard from "../../Components/student/StudentSectionCard";

const stats = [
  { label: "Active Programs", value: "2", note: "Mentorship + VIP", icon: CreditCard },
  { label: "Courses Available", value: "6", note: "Protected lessons", icon: BookOpen },
  { label: "Upcoming Booking", value: "1", note: "Thursday, 7:00 PM", icon: CalendarDays },
];

const recentLessons = [
  { title: "Gold Structure Mastery", module: "Module 3", progress: "72%" },
  { title: "Sniper Entry Framework", module: "Module 2", progress: "48%" },
  { title: "Mindset and Discipline", module: "Module 1", progress: "100%" },
];

const quickActions = [
  { title: "Continue a lesson", detail: "Jump back into your last course module." },
  { title: "Review subscription", detail: "Confirm plan status and upcoming renewal." },
  { title: "Book a session", detail: "Reserve the next available mentorship slot." },
];

export default function DashboardPage() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className="space-y-5">
      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.label}
              className={`rounded-[1.75rem] border p-5 shadow-xl ${
                isDark ? "border-white/10 bg-white/[0.04]" : "border-black/10 bg-white/75 backdrop-blur-sm"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className={`text-sm ${isDark ? "text-white/58" : "text-mg-light-textSecondary/80"}`}>{stat.label}</p>
                  <p className={`mt-3 text-4xl font-black ${isDark ? "text-white" : "text-mg-light-text"}`}>{stat.value}</p>
                  <p className="mt-2 text-sm text-mg-gold">{stat.note}</p>
                </div>
                <div className={`rounded-2xl p-3 ${isDark ? "bg-mg-gold/12" : "bg-mg-gold/16"}`}>
                  <Icon size={20} className="text-mg-gold" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid gap-5 xl:grid-cols-[1.2fr_0.8fr]">
        <StudentSectionCard
          title="Continue Learning"
          description="Your recent lessons and progress should be front and center, so students always know what to watch next."
        >
          <div className="space-y-3">
            {recentLessons.map((lesson) => (
              <div
                key={lesson.title}
                className={`rounded-3xl border p-4 ${
                  isDark ? "border-white/10 bg-black/25" : "border-black/10 bg-[#faf7f0]"
                }`}
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className={`font-semibold ${isDark ? "text-white" : "text-mg-light-text"}`}>{lesson.title}</p>
                    <p className={`mt-1 text-sm ${isDark ? "text-white/55" : "text-mg-light-textSecondary/78"}`}>{lesson.module}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-mg-gold">{lesson.progress}</p>
                    <p className={`mt-1 text-xs ${isDark ? "text-white/45" : "text-mg-light-textSecondary/65"}`}>Completed</p>
                  </div>
                </div>
                <div className={`mt-4 h-2 overflow-hidden rounded-full ${isDark ? "bg-white/10" : "bg-black/8"}`}>
                  <div className="h-full rounded-full bg-mg-gold" style={{ width: lesson.progress }} />
                </div>
              </div>
            ))}
          </div>
        </StudentSectionCard>

        <StudentSectionCard
          title="Quick Actions"
          description="These become high-intent entry points once the real backend flows are connected."
        >
          <div className="space-y-3">
            {quickActions.map((action) => (
              <div
                key={action.title}
                className={`rounded-3xl border p-4 ${
                  isDark ? "border-white/10 bg-black/25" : "border-black/10 bg-[#faf7f0]"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className={`font-semibold ${isDark ? "text-white" : "text-mg-light-text"}`}>{action.title}</p>
                    <p className={`mt-2 text-sm leading-6 ${isDark ? "text-white/58" : "text-mg-light-textSecondary/78"}`}>{action.detail}</p>
                  </div>
                  <ArrowUpRight size={18} className="mt-1 text-mg-gold" />
                </div>
              </div>
            ))}
          </div>
        </StudentSectionCard>
      </div>

      <StudentSectionCard
        title="Membership Snapshot"
        description="A compact summary of what the student currently has access to inside the platform."
      >
        <div className="grid gap-4 md:grid-cols-2">
          <div className={`rounded-3xl border p-5 ${isDark ? "border-white/10 bg-black/25" : "border-black/10 bg-[#faf7f0]"}`}>
            <p className="text-sm text-mg-gold">Marketgod Mentorship</p>
            <p className={`mt-2 text-2xl font-black ${isDark ? "text-white" : "text-mg-light-text"}`}>Active</p>
            <p className={`mt-2 text-sm ${isDark ? "text-white/58" : "text-mg-light-textSecondary/78"}`}>Renews after payment flow is connected.</p>
          </div>
          <div className={`rounded-3xl border p-5 ${isDark ? "border-white/10 bg-black/25" : "border-black/10 bg-[#faf7f0]"}`}>
            <p className="text-sm text-mg-gold">VIP Signals</p>
            <div className="mt-2 flex items-center gap-2">
              <PlayCircle size={18} className="text-mg-gold" />
              <p className={`text-2xl font-black ${isDark ? "text-white" : "text-mg-light-text"}`}>Included</p>
            </div>
            <p className={`mt-2 text-sm ${isDark ? "text-white/58" : "text-mg-light-textSecondary/78"}`}>Ready for backend access control and expiry rules.</p>
          </div>
        </div>
      </StudentSectionCard>
    </div>
  );
}
