import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

interface AuthFormPanelProps {
  title: string;
  description: string;
  children: ReactNode;
  footerPrompt: string;
  footerLinkLabel: string;
  footerLinkTo: string;
  imagePosition: "left" | "right";
  isDark: boolean;
}

export default function AuthFormPanel({
  title,
  description,
  children,
  footerPrompt,
  footerLinkLabel,
  footerLinkTo,
  imagePosition,
  isDark,
}: AuthFormPanelProps) {
  return (
    <motion.section
      layout
      transition={{ duration: 0.7, type: "spring", bounce: 0.2 }}
      className={`relative flex flex-col overflow-y-auto p-6 sm:p-10 xl:p-14 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full ${
        isDark
          ? "[&::-webkit-scrollbar-thumb]:bg-white/10 hover:[&::-webkit-scrollbar-thumb]:bg-white/20"
          : "[&::-webkit-scrollbar-thumb]:bg-black/10 hover:[&::-webkit-scrollbar-thumb]:bg-black/20"
      } ${imagePosition === "right" ? "lg:order-first" : ""}`}
    >
      <div className="mx-auto my-auto w-full max-w-md">
        <Link
          to="/"
          className="inline-flex w-fit items-center gap-3 text-[11px] font-bold uppercase tracking-[0.2em] text-mg-gold transition-opacity hover:opacity-80"
        >
          <span className="h-2 w-2 rounded-full bg-mg-gold shadow-[0_0_10px_rgba(212,175,55,0.8)]" />
          Marketgod Academy
        </Link>

        <div className="mt-8">
          <h1 className={`text-3xl font-black leading-tight sm:text-4xl ${isDark ? "text-white" : "text-mg-light-text"}`}>{title}</h1>
          <p className={`mt-3 text-sm leading-relaxed ${isDark ? "text-white/60" : "text-mg-light-textSecondary/80"}`}>{description}</p>
        </div>

        <div
          className={`my-8 h-px w-full ${
            isDark
              ? "bg-gradient-to-r from-mg-gold/30 via-white/10 to-transparent"
              : "bg-gradient-to-r from-mg-gold/45 via-black/10 to-transparent"
          }`}
        />

        <div>{children}</div>

        <div className={`mt-8 pt-4 text-sm ${isDark ? "text-white/50" : "text-mg-light-textSecondary/75"}`}>
          {footerPrompt}{" "}
          <Link to={footerLinkTo} className={`font-semibold text-mg-gold ${isDark ? "hover:text-white" : "hover:text-mg-light-text"}`}>
            {footerLinkLabel}
          </Link>
        </div>
      </div>
    </motion.section>
  );
}



