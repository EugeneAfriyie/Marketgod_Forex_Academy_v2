import { Download, FileText, PlayCircle } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { useLanguage } from "../../context/LanguageContext";
import StudentSectionCard from "../../Components/student/StudentSectionCard";

const resources = [
  { title: "Gold Trading Checklist", type: "PDF Guide", access: "Available now", icon: FileText },
  { title: "Session Timing Cheatsheet", type: "Quick Reference", access: "Available now", icon: Download },
  { title: "Replay Breakdown Library", type: "Video Resource", access: "Weekly updates", icon: PlayCircle },
];

export default function ResourcesPage() {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const isDark = theme === "dark";
  const isFrench = language === "fr";

  return (
    <StudentSectionCard
      title={isFrench ? "Ressources" : "Resources"}
      description={
        isFrench
          ? "Une bibliotheque de ressources pour guides, references telechargeables et contenus de revision."
          : "A curated student resource library for guides, downloadable references, and replay material."
      }
    >
      <div className="grid gap-4 lg:grid-cols-3">
        {resources.map((resource) => {
          const Icon = resource.icon;

          return (
            <article
              key={resource.title}
              className={`rounded-[1.75rem] border p-5 ${
                isDark ? "border-white/10 bg-black/25" : "border-black/10 bg-[#faf7f0]"
              }`}
            >
              <div className={`inline-flex rounded-2xl p-3 ${isDark ? "bg-mg-gold/12" : "bg-mg-gold/16"}`}>
                <Icon size={20} className="text-mg-gold" />
              </div>
              <h3 className={`mt-4 text-lg font-bold ${isDark ? "text-white" : "text-mg-light-text"}`}>{resource.title}</h3>
              <p className={`mt-2 text-sm ${isDark ? "text-white/58" : "text-mg-light-textSecondary/78"}`}>
                {isFrench
                  ? resource.type === "PDF Guide"
                    ? "Guide PDF"
                    : resource.type === "Quick Reference"
                      ? "Reference Rapide"
                      : "Ressource Video"
                  : resource.type}
              </p>
              <p className="mt-4 text-sm font-semibold text-mg-gold">
                {isFrench ? (resource.access === "Available now" ? "Disponible maintenant" : "Mises a jour hebdomadaires") : resource.access}
              </p>
            </article>
          );
        })}
      </div>
    </StudentSectionCard>
  );
}
