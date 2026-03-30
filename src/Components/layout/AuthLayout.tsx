import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";

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

  return (
    <main
      className={`min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8 relative isolate transition-colors duration-500 ease-in-out ${
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

        {/* Image & Branding Panel */}
        <motion.aside
          layout
          transition={{ duration: 0.7, type: "spring", bounce: 0.2 }}
          className={`relative hidden lg:flex flex-col justify-between p-8 xl:p-12 overflow-hidden transition-colors duration-500 ease-in-out ${
            imagePosition === "right"
              ? isDark
                ? "lg:order-last border-l border-white/5 bg-black"
                : "lg:order-last border-l border-black/5 bg-[#f1ead8]"
              : isDark
                ? "border-r border-white/5 bg-black"
                : "border-r border-black/5 bg-[#f1ead8]"
          }`}
        >
          {/* Background Image & Overlays */}
          <img
            src="/img/hero-bg-1.png"
            alt="Marketgod trading mentorship"
            className="absolute inset-0 h-full w-full object-cover opacity-40 mix-blend-luminosity"
          />
          <div
            className={`absolute inset-0 ${
              isDark
                ? "bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent"
                : "bg-gradient-to-t from-[#1f1c15] via-[#1f1c15]/35 to-transparent"
            }`}
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(212,175,55,0.15),transparent_40%)]" />

          <div className="relative z-10">
            <div className="inline-flex w-fit rounded-full border border-mg-gold/30 bg-mg-gold/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.28em] text-mg-gold backdrop-blur-md">
              Premium Access
            </div>
          </div>

          <div className="relative z-10 max-w-sm mt-auto">
            <p className={`text-[11px] font-semibold uppercase tracking-[0.28em] transition-colors duration-500 ease-in-out ${isDark ? "text-white/50" : "text-white/70"}`}>{eyebrow}</p>
            <h2 className="mt-2 text-3xl font-black leading-tight text-white">{asideTitle}</h2>
            <p className={`mt-3 text-sm leading-relaxed transition-colors duration-500 ease-in-out ${isDark ? "text-white/70" : "text-white/85"}`}>{asideDescription}</p>

            <div className="mt-8 flex flex-col gap-4">
              {highlights.slice(0, 3).map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-mg-gold/20 text-mg-gold">
                    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className={`text-sm font-medium transition-colors duration-500 ease-in-out ${isDark ? "text-white/80" : "text-white"}`}>{item}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.aside>

        {/* Form Section (Scrollable internally) */}
        <motion.section
          layout
          transition={{ duration: 0.7, type: "spring", bounce: 0.2 }}
          className={`relative flex flex-col p-6 sm:p-10 xl:p-14 overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full ${
            isDark ? "[&::-webkit-scrollbar-thumb]:bg-white/10 hover:[&::-webkit-scrollbar-thumb]:bg-white/20" : "[&::-webkit-scrollbar-thumb]:bg-black/10 hover:[&::-webkit-scrollbar-thumb]:bg-black/20"
          } ${imagePosition === "right" ? "lg:order-first" : ""}`}
        >
          <div className="w-full max-w-md mx-auto my-auto">
            <Link to="/" className="inline-flex w-fit items-center gap-3 text-[11px] font-bold tracking-[0.2em] text-mg-gold uppercase transition-opacity hover:opacity-80">
              <span className="h-2 w-2 rounded-full bg-mg-gold shadow-[0_0_10px_rgba(212,175,55,0.8)]" />
              Marketgod Academy
            </Link>

            <div className="mt-8">
            <h1 className={`text-3xl font-black leading-tight sm:text-4xl transition-colors duration-500 ease-in-out ${isDark ? "text-white" : "text-mg-light-text"}`}>{title}</h1>
            <p className={`mt-3 text-sm leading-relaxed transition-colors duration-500 ease-in-out ${isDark ? "text-white/60" : "text-mg-light-textSecondary/80"}`}>{description}</p>
            </div>

          <div className={`my-8 h-px w-full transition-all duration-500 ease-in-out ${isDark ? "bg-gradient-to-r from-mg-gold/30 via-white/10 to-transparent" : "bg-gradient-to-r from-mg-gold/45 via-black/10 to-transparent"}`} />

            <div>
              {children}
            </div>

          <div className={`mt-8 pt-4 text-sm transition-colors duration-500 ease-in-out ${isDark ? "text-white/50" : "text-mg-light-textSecondary/75"}`}>
              {footerPrompt}{" "}
            <Link to={footerLinkTo} className={`font-semibold text-mg-gold transition-colors duration-500 ease-in-out ${isDark ? "hover:text-white" : "hover:text-mg-light-text"}`}>
                {footerLinkLabel}
              </Link>
            </div>
          </div>
        </motion.section>
      </div>
    </main>
  );
}
