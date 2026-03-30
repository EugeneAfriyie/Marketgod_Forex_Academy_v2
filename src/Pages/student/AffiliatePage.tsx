import { BadgeDollarSign, Link2, TrendingUp } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import StudentSectionCard from "../../Components/student/StudentSectionCard";

const affiliateStats = [
  { label: "Referral Code", value: "MG-2026-ELITE", icon: Link2 },
  { label: "Referred Users", value: "14", icon: TrendingUp },
  { label: "Estimated Payout", value: "$420", icon: BadgeDollarSign },
];

export default function AffiliatePage() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <StudentSectionCard
      title="Affiliate"
      description="This page will grow into the affiliate and referral center for students who promote the platform."
    >
      <div className="grid gap-4 md:grid-cols-3">
        {affiliateStats.map((item) => {
          const Icon = item.icon;

          return (
            <article
              key={item.label}
              className={`rounded-[1.75rem] border p-5 ${
                isDark ? "border-white/10 bg-black/25" : "border-black/10 bg-[#faf7f0]"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className={`text-sm ${isDark ? "text-white/58" : "text-mg-light-textSecondary/78"}`}>{item.label}</p>
                  <p className={`mt-3 text-2xl font-black ${isDark ? "text-white" : "text-mg-light-text"}`}>{item.value}</p>
                </div>
                <Icon size={18} className="text-mg-gold" />
              </div>
            </article>
          );
        })}
      </div>
    </StudentSectionCard>
  );
}
