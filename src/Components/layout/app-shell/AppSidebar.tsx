import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, LogOut, PanelLeftClose, PanelLeftOpen, X, ChevronDown } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useTheme } from "../../../context/ThemeContext";
import type { AppArea, UserProfile } from "./data";

interface TranslatedNavItem {
  to: string;
  icon: LucideIcon;
  translatedLabel: string;
  group?: string;
  children?: TranslatedNavItem[];
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

  const navigate = useNavigate();
  const handleLogout = () => {
    onCloseMobile();
    navigate("/login");
  };
  const location = useLocation();

  // Submenu state
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>(() => {
    const initialState: Record<string, boolean> = {};
    navItems.forEach((item) => {
      if (item.children) {
        const isActive = location.pathname === item.to || item.children.some(child => location.pathname === child.to);
        if (isActive) initialState[item.to] = true;
      }
    });
    return initialState;
  });

  // Keep submenus dynamically opened if navigating directly to a child route
  useEffect(() => {
    navItems.forEach((item) => {
      if (item.children) {
        const isActive = location.pathname === item.to || item.children.some(child => location.pathname === child.to);
        if (isActive) {
          setOpenMenus(prev => ({ ...prev, [item.to]: true }));
        }
      }
    });
  }, [location.pathname, navItems]);

  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const handleTouchStart = (e: React.TouchEvent) => setTouchStartX(e.targetTouches[0].clientX);
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    if (touchStartX - touchEndX > 50) onCloseMobile();
    setTouchStartX(null);
  };

  const toggleSubmenu = (e: React.MouseEvent, key: string) => {
    e.preventDefault();
    e.stopPropagation();
    setOpenMenus((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const tooltipClass = `absolute left-1/2 -translate-x-1/2 top-full mt-2 px-3 py-1.5 text-xs font-semibold whitespace-nowrap rounded-lg shadow-xl opacity-0 scale-95 origin-top pointer-events-none group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 z-50 ${
    isDark ? "bg-white text-black" : "bg-black text-white"
  }`;
  
  const profilePath = area === "student" ? "/dashboard/profile" : `/${area}/profile`;

  return (
    <>
      <aside
        aria-hidden={!isMobileMenuOpen}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className={`fixed inset-y-4 left-4 z-50 flex w-[280px] min-h-0 flex-col rounded-[2rem] border p-4 shadow-2xl transition-all duration-500 ease-in-out xl:relative xl:inset-auto xl:z-auto xl:h-full xl:translate-x-0 ${
          isDark ? "border-white/10 bg-[#111111]/95 backdrop-blur-2xl" : "border-black/10 bg-white/95 backdrop-blur-2xl"
        } ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-[150%]"} ${isSidebarCollapsed ? "xl:w-[92px]" : "xl:w-[280px]"}`}
      >
      <Link to="/" onClick={onCloseMobile} className={`group relative z-40 mb-8 flex items-center ${isSidebarCollapsed ? "xl:justify-center" : "gap-3"}`}>
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-mg-gold text-black">
            <BookOpen size={16} />
          </span>
          <span className={`text-lg font-bold ${isSidebarCollapsed ? "xl:hidden" : "block"}`}>Marketgod</span>
          {isSidebarCollapsed && (
            <span className={`${tooltipClass} hidden xl:block`}>Marketgod Academy</span>
          )}
        </Link>

        <button
          onClick={onCloseMobile}
          aria-label="Close sidebar"
          className={`absolute top-6 right-5 z-50 xl:hidden rounded-full p-2 transition-colors ${
            isDark ? "bg-white/5 text-white hover:bg-white/10" : "bg-black/5 text-mg-light-text hover:bg-black/10"
          }`}
        >
          <X size={18} />
        </button>

        <nav
          className={`relative z-10 flex-1 flex flex-col gap-6 overflow-y-auto overflow-x-hidden pr-1 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full ${
            isDark ? "[&::-webkit-scrollbar-thumb]:bg-white/10 hover:[&::-webkit-scrollbar-thumb]:bg-white/20" : "[&::-webkit-scrollbar-thumb]:bg-black/10 hover:[&::-webkit-scrollbar-thumb]:bg-black/20"
          }`}
        >
          {navItems.reduce((acc, item) => {
            const groupName = item.group || "Menu";
            if (acc.length === 0 || acc[acc.length - 1].name !== groupName) {
              acc.push({ name: groupName, items: [] });
            }
            acc[acc.length - 1].items.push(item);
            return acc;
          }, [] as { name: string; items: TranslatedNavItem[] }[]).map((group, groupIndex) => (
            <div key={group.name} className="flex flex-col space-y-1.5">
              <div className={`px-4 pb-1 transition-opacity duration-300 ${isSidebarCollapsed ? "xl:hidden xl:opacity-0" : "block opacity-100"}`}>
                <span className={`text-[11px] font-bold uppercase tracking-wider ${isDark ? "text-white/40" : "text-mg-light-textSecondary/60"}`}>
                  {group.name}
                </span>
              </div>
              {isSidebarCollapsed && groupIndex > 0 && (
                <div className={`hidden xl:block mx-4 mb-2 mt-1 border-t ${isDark ? "border-white/10" : "border-black/5"}`} />
              )}
              {group.items.map((item) => (
                <div key={item.to} className="relative z-20 flex flex-col hover:z-30">
                  <NavLink
                    to={item.to}
                    end={isRootArea(item.to)}
                    onClick={onCloseMobile}
                    className={({ isActive }) =>
                      `group relative flex items-center ${isSidebarCollapsed ? "xl:justify-center" : "justify-between"} gap-3.5 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-500 ease-in-out ${
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
                        <div className={`relative z-10 flex items-center gap-3.5 ${isSidebarCollapsed ? "xl:justify-center xl:w-full" : ""}`}>
                          <span className="shrink-0">
                            <item.icon size={18} />
                          </span>
                          <span className={`whitespace-nowrap transition-opacity duration-300 ${isSidebarCollapsed ? "xl:hidden xl:opacity-0" : "block opacity-100"}`}>
                            {item.translatedLabel}
                          </span>
                        </div>

                        {item.children && !isSidebarCollapsed && (
                          <button
                            onClick={(e) => toggleSubmenu(e, item.to)}
                            className={`relative z-10 ml-auto flex shrink-0 items-center justify-center rounded-md p-1 transition-colors ${isDark ? "hover:bg-white/20" : "hover:bg-black/10"}`}
                            aria-label="Toggle submenu"
                          >
                            <ChevronDown size={16} className={`transition-transform duration-300 ${openMenus[item.to] ? "-rotate-180" : ""}`} />
                          </button>
                        )}

                        {isSidebarCollapsed && (
                          <span className={`${tooltipClass} hidden xl:block`}>
                            {item.translatedLabel}
                          </span>
                        )}
                      </>
                    )}
                  </NavLink>

                  <AnimatePresence>
                    {item.children && openMenus[item.to] && !isSidebarCollapsed && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="flex flex-col space-y-1 overflow-hidden pl-11 pr-2 pt-1"
                      >
                        {item.children.map((child) => (
                          <NavLink
                            key={child.to}
                            to={child.to}
                            end={isRootArea(child.to)}
                            onClick={onCloseMobile}
                            className={({ isActive }) =>
                              `relative block rounded-lg px-3 py-2 text-xs font-medium transition-colors ${
                                isActive
                                  ? isDark ? "text-white bg-white/10" : "text-mg-light-text bg-black/5"
                                  : isDark ? "text-white/60 hover:text-white hover:bg-white/5" : "text-mg-light-textSecondary hover:text-mg-light-text hover:bg-black/5"
                              }`
                            }
                          >
                            {child.translatedLabel}
                          </NavLink>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          ))}
        </nav>

        <div className={`mt-auto pt-5 flex ${isSidebarCollapsed ? "xl:flex-col xl:items-center xl:gap-3" : "flex-col"}`}>
          <div
            className={`relative z-20 flex items-center hover:z-30 ${isSidebarCollapsed ? "xl:justify-center" : "gap-3"} rounded-xl p-2 transition-colors duration-500 ease-in-out ${
              isDark ? "bg-black/20" : "bg-black/5" // Note: group class is not needed here for hover
            }`}
          >
          <Link to={profilePath} onClick={onCloseMobile} className="group relative flex flex-1 items-center gap-3 min-w-0 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-mg-gold">
              <img src={user.avatar} alt="User Avatar" className="h-9 w-9 shrink-0 rounded-full object-cover" />
              <div className={`min-w-0 ${isSidebarCollapsed ? "xl:hidden" : "block"}`}>
                <p className="truncate text-sm font-semibold transition-colors group-hover:text-mg-gold">{user.name}</p>
                <p className={`truncate text-xs ${isDark ? "text-white/50" : "text-mg-light-textSecondary/70"}`}>{user.email}</p>
              </div>
              {isSidebarCollapsed && (
                <span className={`${tooltipClass} hidden xl:block`}>
                  {user.name}
                </span>
              )}
            </Link>
            <button
              onClick={handleLogout}
              aria-label="Log out"
              className={`ml-auto flex-shrink-0 rounded-md p-2 transition-colors ${
                isDark ? "text-white/60 hover:bg-red-500/20 hover:text-red-400" : "text-mg-light-textSecondary hover:bg-red-50 hover:text-red-600"
              } ${isSidebarCollapsed ? "xl:hidden" : "block"}`}
            >
              <LogOut size={16} />
            </button>
          </div>

          <button
            onClick={handleLogout}
            aria-label="Log out"
            className={`group relative z-20 hidden ${isSidebarCollapsed ? "xl:flex" : ""} justify-center rounded-xl p-2.5 transition-colors hover:z-30 ${
              isDark ? "text-white/60 hover:bg-red-500/20 hover:text-red-400" : "text-mg-light-textSecondary hover:bg-red-50 hover:text-red-600"
            }`}
          >
            <LogOut size={20} />
            <span className={`${tooltipClass} hidden xl:block`}>Log out</span>
          </button>
        </div>
      </aside>

      <button
        onClick={onToggleCollapse}
        aria-label={isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        aria-expanded={!isSidebarCollapsed}
        className={`hidden xl:flex absolute top-8 -translate-x-1/2 z-50 h-7 w-7 items-center justify-center rounded-full border-2 transition-all duration-500 ease-in-out ${
          isDark
            ? "bg-[#111111] border-white/10 text-white/60 hover:bg-white/10 hover:text-white"
            : "bg-white border-black/10 text-mg-light-textSecondary hover:bg-black/5 hover:text-mg-light-text"
        } ${isSidebarCollapsed ? "left-[92px]" : "left-[280px]"}`}
      >
        {isSidebarCollapsed ? <PanelLeftOpen size={16} /> : <PanelLeftClose size={16} />}
      </button>
    </>
  );
}
