import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Outlet, useLocation } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import { useLanguage } from "../../context/LanguageContext";
import AppSidebar from "./app-shell/AppSidebar";
import AppTopbar from "./app-shell/AppTopbar";
import {
  navConfig,
  getAreaLabel,
  getUiStrings,
  getTranslatedNavItems,
  getCarouselItems,
  translateLabel,
  translateDescription,
  defaultUser,
  mockNotifications,
  type AppArea,
  type AppLanguage,
} from "./app-shell/data";

interface AppShellProps {
  title: string;
  description: string;
  area: AppArea;
}

export default function AppShell({ title, description, area }: AppShellProps) {
  const { theme, setTheme } = useTheme();
  const { language, setLanguage } = useLanguage();
  const isDark = theme === "dark";
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const navItems = navConfig[area];
  const translatedNavItems = useMemo(
    () => getTranslatedNavItems(navItems, language as AppLanguage),
    [language, navItems]
  );

  const areaLabel = getAreaLabel(area, language as AppLanguage);
  const ui = getUiStrings(language as AppLanguage);
  const basePath = area === "student" ? "/dashboard" : `/${area}`;

  const activeItem = [...translatedNavItems].reverse().find(
    (item) => location.pathname === item.to || (item.to !== basePath && location.pathname.startsWith(item.to))
  );

  const displayTitle = activeItem ? activeItem.translatedLabel : translateLabel(title, language as AppLanguage);
  const displayDescription = activeItem
    ? activeItem.translatedDescription
    : translateDescription(description, language as AppLanguage);

  const isOverviewPage = activeItem?.to === basePath;
  const firstName = defaultUser.name.split(" ")[0];
  const finalTitle = isOverviewPage ? `${ui.welcomeBack}, ${firstName}!` : displayTitle;
  const finalDescription = isOverviewPage ? ui.overviewDescription : displayDescription;

  const carouselItems = useMemo(
    () => getCarouselItems(language as AppLanguage, finalTitle, finalDescription),
    [finalDescription, finalTitle, language]
  );

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <div
      className={`h-screen overflow-hidden p-4 transition-all duration-500 ease-in-out sm:p-5 ${
        isDark
          ? "bg-[radial-gradient(circle_at_top_left,rgba(212,175,55,0.08),transparent_20%),#050505] text-mg-white"
          : "bg-[radial-gradient(circle_at_top_left,rgba(212,175,55,0.12),transparent_24%),#f6f2e9] text-mg-light-text"
      }`}
    >
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm xl:hidden"
          />
        )}
      </AnimatePresence>

      <div
        className={`relative mx-auto grid h-full max-w-[1600px] gap-5 transition-[grid-template-columns] duration-500 ease-in-out ${
          isSidebarCollapsed ? "xl:grid-cols-[92px_minmax(0,1fr)]" : "xl:grid-cols-[280px_minmax(0,1fr)]"
        }`}
      >
        <AppSidebar
          area={area}
          navItems={translatedNavItems}
          isMobileMenuOpen={isMobileMenuOpen}
          isSidebarCollapsed={isSidebarCollapsed}
          onCloseMobile={() => setIsMobileMenuOpen(false)}
          onToggleCollapse={() => setIsSidebarCollapsed((prev) => !prev)}
          user={defaultUser}
        />

        <main
          className={`flex min-w-0 flex-col gap-5 overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full ${
            isDark
              ? "[&::-webkit-scrollbar-thumb]:bg-white/10 hover:[&::-webkit-scrollbar-thumb]:bg-white/20"
              : "[&::-webkit-scrollbar-thumb]:bg-black/10 hover:[&::-webkit-scrollbar-thumb]:bg-black/20"
          }`}
        >
          <AppTopbar
            areaLabel={areaLabel}
            menuLabel={ui.menu}
            carouselItems={carouselItems}
            dailyMotivationLabel={ui.dailyMotivation}
            announcementLabel={ui.announcement}
            notificationsLabel={ui.notifications}
            markAllReadLabel={ui.markAllRead}
            viewAllActivityLabel={ui.viewAllActivity}
            notifications={mockNotifications}
            language={language as AppLanguage}
            onLanguageChange={(value) => setLanguage(value)}
            onToggleMobileMenu={() => setIsMobileMenuOpen(true)}
            isMobileMenuOpen={isMobileMenuOpen}
            onToggleTheme={toggleTheme}
          />

          <div className="px-1 pb-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <Outlet />
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
}
