import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Languages } from "lucide-react";
import { useTheme } from "../../../context/ThemeContext";
import type { AppLanguage } from "./data";

interface LanguageMenuProps {
  language: AppLanguage;
  onChange: (language: AppLanguage) => void;
}

const options: Array<{ value: AppLanguage; label: string; short: string }> = [
  { value: "en", label: "English", short: "EN" },
  { value: "fr", label: "Francais", short: "FR" },
  { value: "es", label: "Espanol", short: "ES" },
  { value: "ar", label: "العربية", short: "AR" },
];

export default function LanguageMenu({ language, onChange }: LanguageMenuProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <div className="relative hidden sm:block" ref={ref}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className={`relative flex h-[40px] w-[40px] items-center justify-center rounded-full transition-colors ${
          isDark ? "bg-white/5 text-white hover:bg-white/10" : "bg-black/5 text-mg-light-text hover:bg-black/10"
        }`}
        aria-label="Language menu"
      >
        <Languages size={18} className="text-mg-gold" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={`absolute right-0 top-full mt-3 min-w-[180px] rounded-2xl border p-2 shadow-2xl backdrop-blur-2xl ${
              isDark ? "border-white/10 bg-[#151515]/95" : "border-black/10 bg-white/95"
            }`}
          >
            {options.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  onChange(option.value);
                  setOpen(false);
                }}
                className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors ${
                  language === option.value
                    ? "bg-mg-gold text-black"
                    : isDark
                      ? "text-white/70 hover:bg-white/10 hover:text-white"
                      : "text-mg-light-textSecondary hover:bg-black/5 hover:text-mg-light-text"
                }`}
                aria-label={`Switch language to ${option.label}`}
              >
                <span>{option.label}</span>
                <span className="text-xs tracking-[0.18em]">{option.short}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
