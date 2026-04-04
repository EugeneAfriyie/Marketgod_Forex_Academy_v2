import type { LucideIcon } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import StudentSectionCard from "./StudentSectionCard";

interface FeatureItem {
  title: string;
  description: string;
  icon: LucideIcon;
}

interface StudentFeaturePageProps {
  title: string;
  description: string;
  items: FeatureItem[];
}

export default function StudentFeaturePage({ title, description, items }: StudentFeaturePageProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <StudentSectionCard title={title} description={description}>
      <div className="grid gap-4 lg:grid-cols-3">
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <article
              key={item.title}
              className={`rounded-[1.75rem] border p-5 ${
                isDark ? "border-white/10 bg-black/25" : "border-black/10 bg-[#faf7f0]"
              }`}
            >
              <div className={`inline-flex rounded-2xl p-3 ${isDark ? "bg-mg-gold/12" : "bg-mg-gold/16"}`}>
                <Icon size={20} className="text-mg-gold" />
              </div>
              <h3 className={`mt-4 text-lg font-bold ${isDark ? "text-white" : "text-mg-light-text"}`}>{item.title}</h3>
              <p className={`mt-3 text-sm leading-6 ${isDark ? "text-white/58" : "text-mg-light-textSecondary/78"}`}>
                {item.description}
              </p>
            </article>
          );
        })}
      </div>
    </StudentSectionCard>
  );
}



