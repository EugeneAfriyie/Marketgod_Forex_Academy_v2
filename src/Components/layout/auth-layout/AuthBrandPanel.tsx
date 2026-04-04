import { motion } from "framer-motion";

interface AuthBrandPanelProps {
  eyebrow: string;
  asideTitle: string;
  asideDescription: string;
  highlights: string[];
  imagePosition: "left" | "right";
  isDark: boolean;
}

export default function AuthBrandPanel({
  eyebrow,
  asideTitle,
  asideDescription,
  highlights,
  imagePosition,
  isDark,
}: AuthBrandPanelProps) {
  return (
    <motion.aside
      layout
      transition={{ duration: 0.7, type: "spring", bounce: 0.2 }}
      className={`relative hidden lg:flex flex-col justify-between overflow-hidden p-8 transition-colors duration-500 ease-in-out xl:p-12 ${
        imagePosition === "right"
          ? isDark
            ? "lg:order-last border-l border-white/5 bg-black"
            : "lg:order-last border-l border-black/5 bg-[#f1ead8]"
          : isDark
            ? "border-r border-white/5 bg-black"
            : "border-r border-black/5 bg-[#f1ead8]"
      }`}
    >
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

      <div className="relative z-10 mt-auto max-w-sm">
        <p className={`text-[11px] font-semibold uppercase tracking-[0.28em] ${isDark ? "text-white/50" : "text-white/70"}`}>
          {eyebrow}
        </p>
        <h2 className="mt-2 text-3xl font-black leading-tight text-white">{asideTitle}</h2>
        <p className={`mt-3 text-sm leading-relaxed ${isDark ? "text-white/70" : "text-white/85"}`}>{asideDescription}</p>

        <div className="mt-8 flex flex-col gap-4">
          {highlights.slice(0, 3).map((item) => (
            <div key={item} className="flex items-center gap-3">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-mg-gold/20 text-mg-gold">
                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className={`text-sm font-medium ${isDark ? "text-white/80" : "text-white"}`}>{item}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.aside>
  );
}



