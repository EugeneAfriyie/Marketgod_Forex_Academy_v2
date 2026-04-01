import type { ReactNode } from "react";
import { useTheme } from "../../context/ThemeContext";
import { useLanguage } from "../../context/LanguageContext";
import AuthBrandPanel from "./auth-layout/AuthBrandPanel";
import AuthFormPanel from "./auth-layout/AuthFormPanel";

interface AuthLayoutProps {
  eyebrow: string;
  title: string;
  description: string;
  asideTitle: string;
  asideDescription: string;
  highlights: string[];
  children: ReactNode;
  footerPrompt: string;
  footerLinkLabel: string;
  footerLinkTo: string;
  imagePosition?: "left" | "right";
}

export default function AuthLayout({
  eyebrow,
  title,
  description,
  asideTitle,
  asideDescription,
  highlights,
  children,
  footerPrompt,
  footerLinkLabel,
  footerLinkTo,
  imagePosition = "left",
}: AuthLayoutProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const { language } = useLanguage();
  const isFrench = language === "fr";
  const currentYear = new Date().getFullYear();

  return (
    <main
      // Changed to flex-col to accommodate footer
      className={`min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 relative isolate transition-colors duration-500 ease-in-out ${
        isDark ? "bg-[#050505] text-mg-white" : "bg-[#f7f3ea] text-mg-light-text"
      }`}
    >
      {/* Global Background Effects */}
      <div
        className={`absolute inset-0 -z-10 ${
          isDark
            ? "bg-[radial-gradient(circle_at_top_left,rgba(212,175,55,0.08),transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.01),transparent_50%)]"
            : "bg-[radial-gradient(circle_at_top_left,rgba(212,175,55,0.14),transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.65),transparent_50%)]"
        }`}
      />

      {/* Main Unified Card Container */}
      <div
        className={`w-full max-w-[1100px] grid grid-cols-1 ${imagePosition === "right" ? "lg:grid-cols-[1.1fr_0.9fr]" : "lg:grid-cols-[0.9fr_1.1fr]"} rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden backdrop-blur-2xl lg:h-[85vh] lg:max-h-[850px] lg:min-h-[600px] transition-all duration-500 ease-in-out ${
          isDark
            ? "border border-white/10 bg-[#0a0a0a]/90 shadow-[0_20px_80px_rgba(0,0,0,0.6)]"
            : "border border-black/10 bg-white/85 shadow-[0_20px_80px_rgba(0,0,0,0.12)]"
        }`}
      >
        <AuthBrandPanel
          eyebrow={eyebrow}
          asideTitle={asideTitle}
          asideDescription={asideDescription}
          highlights={highlights}
          imagePosition={imagePosition}
          isDark={isDark}
        />

        <AuthFormPanel
          title={title}
          description={description}
          footerPrompt={footerPrompt}
          footerLinkLabel={footerLinkLabel}
          footerLinkTo={footerLinkTo}
          imagePosition={imagePosition}
          isDark={isDark}
        >
          {children}
        </AuthFormPanel>
      </div>

      {/* Auth Page Footer */}
      <div className="w-full max-w-[1100px] mt-8 px-4 text-center">
        <p className={`text-xs font-medium ${isDark ? "text-white/40" : "text-gray-500"}`}>
          &copy; {currentYear} Marketgod Academy. {isFrench ? "Tous droits réservés." : "All rights reserved."}
        </p>
        <p className={`mt-2 text-xs font-medium ${isDark ? "text-white/30" : "text-gray-400"}`}>
          {isFrench ? "Le trading comporte des risques. Assurez-vous de comprendre ces risques avant d'investir." : "Trading involves high risk. Ensure you fully understand these risks before investing."}
        </p>
      </div>
    </main>
  );
}
