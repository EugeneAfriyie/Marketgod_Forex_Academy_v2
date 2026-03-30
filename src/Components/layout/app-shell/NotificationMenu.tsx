import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bell } from "lucide-react";
import { useTheme } from "../../../context/ThemeContext";

interface NotificationItem {
  id: number;
  title: string;
  desc: string;
  time: string;
  unread: boolean;
}

interface NotificationMenuProps {
  notifications: NotificationItem[];
  title: string;
  markAllReadLabel: string;
  viewAllLabel: string;
}

export default function NotificationMenu({
  notifications,
  title,
  markAllReadLabel,
  viewAllLabel,
}: NotificationMenuProps) {
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
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className={`relative rounded-full p-2.5 transition-colors ${
          isDark ? "bg-white/5 text-white hover:bg-white/10" : "bg-black/5 text-mg-light-text hover:bg-black/10"
        }`}
        aria-label="Notifications"
      >
        <Bell size={20} />
        {notifications.some((item) => item.unread) && (
          <span className="absolute top-2.5 right-2.5 h-2 w-2 rounded-full bg-mg-gold shadow-[0_0_8px_rgba(212,175,55,0.8)]" />
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={`absolute right-0 top-full mt-3 z-50 w-80 overflow-hidden rounded-2xl border shadow-2xl backdrop-blur-2xl sm:w-96 ${
              isDark ? "border-white/10 bg-[#151515]/95" : "border-black/10 bg-white/95"
            }`}
          >
            <div className={`flex items-center justify-between border-b p-4 ${isDark ? "border-white/10" : "border-black/5"}`}>
              <h3 className="font-bold">{title}</h3>
              <button className="text-xs font-semibold text-mg-gold hover:underline">{markAllReadLabel}</button>
            </div>

            <div className="max-h-[320px] overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-mg-gold/30 hover:[&::-webkit-scrollbar-thumb]:bg-mg-gold/50">
              {notifications.map((item) => (
                <div
                  key={item.id}
                  className={`flex cursor-pointer gap-4 border-b p-4 transition-colors ${
                    isDark ? "border-white/5 hover:bg-white/5" : "border-black/5 hover:bg-black/5"
                  }`}
                >
                  <div className="mt-1 flex h-2 w-2 shrink-0 items-center justify-center">
                    {item.unread && <span className="h-2 w-2 rounded-full bg-mg-gold shadow-[0_0_8px_rgba(212,175,55,0.8)]" />}
                  </div>
                  <div>
                    <p className={`text-sm font-semibold ${isDark ? "text-white" : "text-mg-light-text"}`}>{item.title}</p>
                    <p className={`mt-0.5 text-xs leading-5 ${isDark ? "text-white/60" : "text-mg-light-textSecondary/80"}`}>{item.desc}</p>
                    <p className={`mt-2 text-[10px] font-bold uppercase tracking-wider ${isDark ? "text-white/40" : "text-mg-light-textSecondary/60"}`}>{item.time}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className={`border-t p-3 text-center ${isDark ? "border-white/10 bg-black/20" : "border-black/5 bg-gray-50/50"}`}>
              <button
                className={`text-xs font-bold transition-colors ${
                  isDark ? "text-white/60 hover:text-white" : "text-mg-light-textSecondary hover:text-mg-light-text"
                }`}
              >
                {viewAllLabel}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
