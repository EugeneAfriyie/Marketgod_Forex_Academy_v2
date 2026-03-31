import { AnimatePresence, motion } from "framer-motion";
import { Menu, Moon, Sun } from "lucide-react";
import { useTheme } from "../../../context/ThemeContext";
import type { AppLanguage, CarouselItem, NotificationItem } from "./data";
import AppHeaderCarousel from "./AppHeaderCarousel";
import LanguageMenu from "./LanguageMenu";
import NotificationMenu from "./NotificationMenu";

interface AppTopbarProps {
  areaLabel: string;
  menuLabel: string;
  carouselItems: CarouselItem[];
  dailyMotivationLabel: string;
  announcementLabel: string;
  notificationsLabel: string;
  markAllReadLabel: string;
  viewAllActivityLabel: string;
  notifications: NotificationItem[];
  language: AppLanguage;
  onLanguageChange: (language: AppLanguage) => void;
  onToggleMobileMenu: () => void;
  onToggleTheme: () => void;
}

export default function AppTopbar({
  areaLabel,
  menuLabel,
  carouselItems,
  dailyMotivationLabel,
  announcementLabel,
  notificationsLabel,
  markAllReadLabel,
  viewAllActivityLabel,
  notifications,
  language,
  onLanguageChange,
  onToggleMobileMenu,
  onToggleTheme,
}: AppTopbarProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <header
      className={`relative z-10 rounded-b-[2rem] border-b p-5 shadow-xl transition-all duration-500 ease-in-out ${
        isDark ? "border-white/10 bg-[#111111]/80 backdrop-blur-2xl" : "border-black/10 bg-white/70 backdrop-blur-sm"
      }`}
    >
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div className="mb-2 xl:hidden">
          <button
            onClick={onToggleMobileMenu}
            className={`flex w-fit items-center gap-2 rounded-xl p-2.5 transition-colors ${
              isDark ? "bg-white/5 text-white hover:bg-white/10" : "bg-black/5 text-mg-light-text hover:bg-black/10"
            }`}
          >
            <Menu size={20} className="text-mg-gold" />
            <span className="text-sm font-bold">{menuLabel}</span>
          </button>
        </div>

        <AppHeaderCarousel
          areaLabel={areaLabel}
          carouselItems={carouselItems}
          dailyMotivationLabel={dailyMotivationLabel}
          announcementLabel={announcementLabel}
        />

        <div className="absolute top-6 right-6 z-20 flex items-center gap-3 xl:relative xl:top-auto xl:right-auto">
          <LanguageMenu language={language} onChange={onLanguageChange} />

          <button
            onClick={onToggleTheme}
            className={`relative flex h-[40px] w-[40px] items-center justify-center rounded-full transition-colors ${
              isDark ? "bg-white/5 text-white hover:bg-white/10" : "bg-black/5 text-mg-light-text hover:bg-black/10"
            }`}
            aria-label="Toggle theme"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={theme}
                initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
                transition={{ duration: 0.2 }}
              >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
              </motion.div>
            </AnimatePresence>
          </button>

          <NotificationMenu
            notifications={notifications}
            title={notificationsLabel}
            markAllReadLabel={markAllReadLabel}
            viewAllLabel={viewAllActivityLabel}
          />
        </div>
      </div>
    </header>
  );
}
