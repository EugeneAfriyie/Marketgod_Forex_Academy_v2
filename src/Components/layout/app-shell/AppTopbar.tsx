import { AnimatePresence, motion } from "framer-motion";
import { Menu, Moon, Sun } from "lucide-react";
import { Link } from "react-router-dom";
import { useTheme } from "../../../context/ThemeContext";
import type { CarouselItem, NotificationItem } from "./data";
import AppHeaderCarousel from "./AppHeaderCarousel";
import NotificationMenu from "./NotificationMenu";

const MiniMarketGodCoin = () => {
  return (
    <div className="relative w-4 h-4 sm:w-5 sm:h-5 shrink-0 perspective-[500px]" style={{ perspective: 500 }}>
      <motion.div animate={{ rotateY: [0, 360] }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }} className="w-full h-full relative" style={{ transformStyle: "preserve-3d" }}>
        {/* Front of Coin */}
        <div className="absolute inset-0 rounded-full border-[1px] border-yellow-200 flex items-center justify-center shadow-[0_0_10px_rgba(212,175,55,0.6)] bg-gradient-to-br from-yellow-400 via-mg-gold to-yellow-600 [backface-visibility:hidden]" style={{ transform: "translateZ(1.5px)" }}>
          <div className="w-[80%] h-[80%] rounded-full border border-yellow-300/50 flex items-center justify-center bg-gradient-to-tr from-yellow-500 to-mg-gold shadow-inner overflow-hidden">
            <img src="/ourteam/Eyram_Dela.png" alt="MG" className="w-full h-full object-cover mix-blend-luminosity opacity-90"/>
          </div>
        </div>

        {/* Edges */}
        <div className="absolute inset-0 rounded-full bg-yellow-600 border border-yellow-500" style={{ transform: "translateZ(1px) scale(0.98)" }}/>
        <div className="absolute inset-0 rounded-full bg-yellow-700" style={{ transform: "translateZ(0.5px)" }}/>
        <div className="absolute inset-0 rounded-full bg-yellow-900" style={{ transform: "translateZ(0px)" }}/>
        <div className="absolute inset-0 rounded-full bg-yellow-800" style={{ transform: "translateZ(-0.5px)" }}/>
        <div className="absolute inset-0 rounded-full bg-yellow-600 border border-yellow-500" style={{ transform: "translateZ(-1px) scale(0.98)" }}/>

        {/* Back of Coin */}
        <div className="absolute inset-0 rounded-full border-[1px] border-yellow-200 flex items-center justify-center shadow-[0_0_10px_rgba(212,175,55,0.6)] bg-gradient-to-br from-yellow-600 via-mg-gold to-yellow-400 [backface-visibility:hidden]" style={{ transform: "rotateY(180deg) translateZ(1.5px)" }}>
          <div className="relative w-[85%] h-[85%] rounded-full border-[1px] border-yellow-300/60 flex flex-col items-center justify-center bg-gradient-to-tr from-yellow-500 to-mg-gold shadow-inner overflow-hidden">
            <span className="font-black text-yellow-900/90 tracking-tighter text-[7px] drop-shadow-md">MGC</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

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
  onToggleMobileMenu: () => void;
  isMobileMenuOpen: boolean;
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
  onToggleMobileMenu,
  isMobileMenuOpen,
  onToggleTheme,
}: AppTopbarProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <header
      className={`relative z-40 rounded-b-[2rem] border-b p-5 shadow-xl transition-all duration-500 ease-in-out ${
        isDark ? "border-white/10 bg-[#111111]/80 backdrop-blur-2xl" : "border-black/10 bg-white/70 backdrop-blur-sm"
      }`}
    >
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div className="mb-2 xl:hidden">
          <button
            onClick={onToggleMobileMenu}
            aria-expanded={isMobileMenuOpen}
            aria-label="Open menu"
            className={`flex w-fit items-center gap-2 rounded-xl p-2.5 transition-colors ${
              isDark ? "bg-white/5 text-white hover:bg-white/10" : "bg-black/5 text-mg-light-text hover:bg-black/10"
            }`}
          >
            <Menu size={20} className="text-mg-gold" />
          </button>
        </div>

        <AppHeaderCarousel
          areaLabel={areaLabel}
          carouselItems={carouselItems}
          dailyMotivationLabel={dailyMotivationLabel}
          announcementLabel={announcementLabel}
        />

        <div className="absolute top-6 right-6 z-20 flex items-center gap-3 xl:relative xl:top-auto xl:right-auto">
          {/* Coin Balance */}
          <div className={`group relative flex items-center gap-2 rounded-full px-2 sm:px-3 py-1.5 border transition-colors cursor-pointer ${
            isDark ? "bg-mg-gold/10 border-mg-gold/20 text-mg-gold hover:bg-mg-gold/20" : "bg-mg-gold/10 border-mg-gold/30 text-mg-gold hover:bg-mg-gold/20"
          }`}>
            <MiniMarketGodCoin />
            <span className=" text-[.5rem] sm:text-sm font-black">1,250</span>

            {/* Tooltip */}
            <div className="pointer-events-none absolute top-full right-0 z-[100] pt-2 w-64 opacity-0 transition-all duration-300 group-hover:translate-y-1 group-hover:opacity-100 group-hover:pointer-events-auto">
              <div className="ml-auto mr-12 h-0 w-0 border-b-[6px] border-x-[6px] border-b-white/10 border-x-transparent" />
              <div className="rounded-xl border border-white/10 bg-[#111111]/95 p-4 shadow-2xl backdrop-blur-xl">
                <h4 className="mb-1.5 text-sm font-black text-mg-gold">MarketGod Coins (MGC)</h4>
                <p className="text-xs font-medium leading-relaxed text-white/70">
                  Earn MGC by completing tasks, finishing courses, and participating in the community. Spend them in the Rewards Hub to claim exclusive merch, 1-on-1 sessions, or funded account challenges!
                </p>
                <Link to="/dashboard/giveaways" className="mt-3 inline-block text-xs font-bold text-mg-gold hover:text-white transition-colors">
                  View Rewards Hub &rarr;
                </Link>
              </div>
            </div>
          </div>

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
