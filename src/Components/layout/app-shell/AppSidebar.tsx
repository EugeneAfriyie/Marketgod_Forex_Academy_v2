import { Link, NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { BookOpen, LogOut, PanelLeftClose, PanelLeftOpen, X } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useTheme } from "../../../context/ThemeContext";
import type { AppArea, UserProfile } from "./data";

interface TranslatedNavItem {
  to: string;
  icon: LucideIcon;
  translatedLabel: string;
}

interface AppSidebarProps {
  area: AppArea;
  navItems: TranslatedNavItem[];
  isMobileMenuOpen: boolean;
  isSidebarCollapsed: boolean;
  onCloseMobile: () => void;
  onToggleCollapse: () => void;
  user: UserProfile;
}

export default function AppSidebar({
  area,
  navItems,
  isMobileMenuOpen,
  isSidebarCollapsed,
  onCloseMobile,
  onToggleCollapse,
  user,
}: AppSidebarProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const isRootArea = (to: string) => to === "/dashboard" || to === "/admin" || to === "/premium";

  return (
    <>
      <aside
        className={`fixed inset-y-4 left-4 z-50 flex w-[280px] flex-col rounded-[2rem] border p-4 shadow-2xl transition-all duration-500 ease-in-out xl:relative xl:inset-auto xl:z-auto xl:translate-x-0 ${
          isDark ? "border-white/10 bg-[#111111]/95 backdrop-blur-2xl" : "border-black/10 bg-white/95 backdrop-blur-2xl"
        } ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-[150%]"} ${isSidebarCollapsed ? "xl:w-[92px]" : "xl:w-[280px]"}`}
      >
        <Link to="/" className={`mb-8 flex items-center ${isSidebarCollapsed ? "xl:justify-center" : "gap-3"}`}>
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-mg-gold text-black">
            <BookOpen size={16} />
          </span>
          <span className={`text-lg font-bold ${isSidebarCollapsed ? "xl:hidden" : "block"}`}>Marketgod</span>
        </Link>

        <button
          onClick={onCloseMobile}
          className={`absolute top-6 right-5 xl:hidden rounded-full p-2 transition-colors ${
            isDark ? "bg-white/5 text-white hover:bg-white/10" : "bg-black/5 text-mg-light-text hover:bg-black/10"
          }`}
        >
          <X size={18} />
        </button>

        <nav
          className={`flex-1 space-y-1.5 overflow-y-auto pr-1 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full ${
            isDark ? "[&::-webkit-scrollbar-thumb]:bg-white/10 hover:[&::-webkit-scrollbar-thumb]:bg-white/20" : "[&::-webkit-scrollbar-thumb]:bg-black/10 hover:[&::-webkit-scrollbar-thumb]:bg-black/20"
          }`}
        >
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={isRootArea(item.to)}
              title={isSidebarCollapsed ? item.translatedLabel : undefined}
              className={({ isActive }) =>
                `relative flex items-center ${isSidebarCollapsed ? "xl:justify-center" : ""} gap-3.5 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-500 ease-in-out ${
                  isActive
                    ? isDark
                      ? "text-white"
                      : "text-mg-light-text"
                    : isDark
                      ? "text-white/60 hover:bg-white/5 hover:text-white"
                      : "text-mg-light-textSecondary hover:bg-black/[0.04] hover:text-mg-light-text"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <motion.div
                      layoutId={`active-nav-indicator-${area}`}
                      className={`absolute inset-0 rounded-xl ${isDark ? "bg-white/10" : "bg-black/5"}`}
                      transition={{ duration: 0.5, type: "spring", bounce: 0.2 }}
                    />
                  )}
                  <span className="relative z-10 shrink-0">
                    <item.icon size={18} />
                  </span>
                  <span className={`relative z-10 whitespace-nowrap transition-opacity duration-300 ${isSidebarCollapsed ? "xl:hidden xl:opacity-0" : "block opacity-100"}`}>
                    {item.translatedLabel}
                  </span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className={`mt-auto pt-5 flex ${isSidebarCollapsed ? "xl:flex-col xl:items-center xl:gap-3" : "flex-col"}`}>
          <div
            className={`flex items-center ${isSidebarCollapsed ? "xl:justify-center" : "gap-3"} rounded-xl p-3 transition-colors duration-500 ease-in-out ${
              isDark ? "bg-black/20" : "bg-black/5"
            }`}
          >
            <img src={user.avatar} alt="User Avatar" className="h-9 w-9 shrink-0 rounded-full object-cover" title={isSidebarCollapsed ? user.name : undefined} />
            <div className={`min-w-0 ${isSidebarCollapsed ? "xl:hidden" : "block"}`}>
              <p className="truncate text-sm font-semibold">{user.name}</p>
              <p className={`truncate text-xs ${isDark ? "text-white/50" : "text-mg-light-textSecondary/70"}`}>{user.email}</p>
            </div>
            <button
              className={`ml-auto flex-shrink-0 rounded-md p-2 transition-colors ${
                isDark ? "text-white/60 hover:bg-white/10 hover:text-white" : "text-mg-light-textSecondary hover:bg-black/10 hover:text-mg-light-text"
              } ${isSidebarCollapsed ? "xl:hidden" : "block"}`}
              title="Log out"
            >
              <LogOut size={16} />
            </button>
          </div>

          <button
            className={`hidden ${isSidebarCollapsed ? "xl:flex" : ""} justify-center rounded-xl p-2 transition-colors ${
              isDark ? "text-white/60 hover:bg-white/10 hover:text-white" : "text-mg-light-textSecondary hover:bg-black/10 hover:text-mg-light-text"
            }`}
            title="Log out"
          >
            <LogOut size={20} />
          </button>
        </div>
      </aside>

      <button
        onClick={onToggleCollapse}
        className={`hidden xl:flex absolute top-8 -translate-x-1/2 z-50 h-7 w-7 items-center justify-center rounded-full border-2 transition-all duration-500 ease-in-out ${
          isDark
            ? "bg-[#111111] border-white/10 text-white/60 hover:bg-white/10 hover:text-white"
            : "bg-white border-black/10 text-mg-light-textSecondary hover:bg-black/5 hover:text-mg-light-text"
        } ${isSidebarCollapsed ? "left-[88px]" : "left-[270px]"}`}
        title={isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {isSidebarCollapsed ? <PanelLeftOpen size={16} /> : <PanelLeftClose size={16} />}
      </button>
    </>
  );
}
