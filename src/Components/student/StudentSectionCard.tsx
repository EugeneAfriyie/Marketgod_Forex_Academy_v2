import type { ReactNode } from "react";
import { useTheme } from "../../context/ThemeContext";

interface StudentSectionCardProps {
  title: string;
  description?: string;
  children: ReactNode;
}

export default function StudentSectionCard({ title, description, children }: StudentSectionCardProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <section
      className={`rounded-[1.75rem] border p-5 shadow-xl ${
        isDark ? "border-white/10 bg-white/[0.04]" : "border-black/10 bg-white/75 backdrop-blur-sm"
      }`}
    >
      <div className="mb-5">
        <h2 className={`text-xl font-bold ${isDark ? "text-white" : "text-mg-light-text"}`}>{title}</h2>
        {description && (
          <p className={`mt-2 text-sm leading-6 ${isDark ? "text-white/60" : "text-mg-light-textSecondary/78"}`}>{description}</p>
        )}
      </div>
      {children}
    </section>
  );
}
