import { BadgeCheck, CalendarClock } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import StudentSectionCard from "../../Components/student/StudentSectionCard";

const subscriptions = [
  { name: "Marketgod Mentorship", status: "Active", cycle: "Annual access", renews: "January 12, 2027" },
  { name: "VIP Signals", status: "Included", cycle: "Bundled with mentorship", renews: "Follows mentorship access" },
];

export default function SubscriptionsPage() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <StudentSectionCard
      title="My Subscriptions"
      description="A professional membership overview for the student portal, ready to connect to real backend plan and expiry data."
    >
      <div className="space-y-4">
        {subscriptions.map((subscription) => (
          <article
            key={subscription.name}
            className={`rounded-[1.75rem] border p-5 ${
              isDark ? "border-white/10 bg-black/25" : "border-black/10 bg-[#faf7f0]"
            }`}
          >
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div>
                <p className={`text-xl font-bold ${isDark ? "text-white" : "text-mg-light-text"}`}>{subscription.name}</p>
                <div className={`mt-3 flex flex-wrap gap-4 text-sm ${isDark ? "text-white/60" : "text-mg-light-textSecondary/80"}`}>
                  <span className="inline-flex items-center gap-2">
                    <BadgeCheck size={16} className="text-mg-gold" />
                    {subscription.cycle}
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <CalendarClock size={16} className="text-mg-gold" />
                    {subscription.renews}
                  </span>
                </div>
              </div>

              <span className="rounded-full bg-mg-gold/12 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-mg-gold">
                {subscription.status}
              </span>
            </div>
          </article>
        ))}
      </div>
    </StudentSectionCard>
  );
}



