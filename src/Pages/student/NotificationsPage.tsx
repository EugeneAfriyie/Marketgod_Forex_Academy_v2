import { useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { Bell, BookOpen, CalendarDays, Coins, Target, Wallet, CheckCircle2, Trash2 } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

const initialNotifications = [
  { id: 1, type: 'signal', title: 'New VIP Signal: XAUUSD Buy', detail: 'Check the Telegram channel for exact entry zones and TP/SL.', time: '10 minutes ago', icon: Target, unread: true },
  { id: 2, type: 'event', title: 'Live Session Reminder', detail: 'Mentorship live session "London Breakout Setup" starts in 1 hour.', time: '1 hour ago', icon: CalendarDays, unread: true },
  { id: 3, type: 'reward', title: 'Earned +250 MGC', detail: "Completed 'Post P&L in VIP' Task. Keep it up!", time: '2 hours ago', icon: Coins, unread: false },
  { id: 4, type: 'affiliate', title: 'Referral Payout Processed', detail: '$150.00 has been sent to your USDT Wallet.', time: '1 day ago', icon: Wallet, unread: false },
  { id: 5, type: 'course', title: 'New Lesson Unlocked', detail: "You now have access to 'Advanced Market Structure' in the Premium Vault.", time: '2 days ago', icon: BookOpen, unread: false },
];

export default function NotificationsPage() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [notifications, setNotifications] = useState(initialNotifications);

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, unread: false })));
  };

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, unread: false } : n));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const container: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } }
  };

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <div className="space-y-8 pb-10">
      {/* Hero Section */}
      <motion.div initial="hidden" animate="show" variants={container} className={`relative overflow-hidden rounded-[3rem] border shadow-lg ${isDark ? "border-white/5 bg-[#0a0a0a]" : "border-black/5 bg-white"}`}>
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-mg-gold/10 blur-[100px] rounded-full pointer-events-none" />
        <div className="relative z-10 p-8 md:p-12 lg:p-16 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className={`text-4xl md:text-5xl font-black mb-4 tracking-tight ${isDark ? "text-white" : "text-gray-900"}`}>
              {"Activity & "}
              <span className="text-mg-gold">{"Notifications."}</span>
            </h1>
            <p className={`max-w-2xl text-lg font-medium ${isDark ? "text-white/70" : "text-gray-600"}`}>
              {"Stay updated with your latest account activities, course unlocks, and premium signal alerts."}
            </p>
          </div>
          <div className={`shrink-0 flex items-center justify-center h-24 w-24 rounded-full border-4 shadow-2xl ${isDark ? "border-[#111] bg-white/5" : "border-white bg-black/5"}`}>
            <div className="relative">
              <Bell size={32} className={isDark ? "text-white" : "text-gray-900"} />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white shadow-lg animate-pulse">
                  {unreadCount}
                </span>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Feed Area */}
      <motion.div initial="hidden" animate="show" variants={container} className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-2">
          <h2 className={`text-xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
            All Activity
          </h2>
          <div className="flex items-center gap-3">
            <button onClick={markAllAsRead} disabled={unreadCount === 0} className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${isDark ? "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white" : "bg-black/5 text-gray-600 hover:bg-black/10 hover:text-black"}`}>
              <CheckCircle2 size={16} />
              Mark All Read
            </button>
            <button onClick={clearAll} disabled={notifications.length === 0} className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${isDark ? "bg-red-500/10 text-red-400 hover:bg-red-500/20" : "bg-red-50 text-red-600 hover:bg-red-100"}`}>
              <Trash2 size={16} />
              Clear All
            </button>
          </div>
        </div>

        <motion.div variants={item} className={`rounded-[2.5rem] border shadow-xl overflow-hidden ${isDark ? "border-white/10 bg-[#111111]" : "border-black/10 bg-white"}`}>
          <div className="divide-y divide-white/5 dark:divide-white/10 divide-black/5">
            <AnimatePresence mode="popLayout">
              {notifications.length === 0 ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-12 flex flex-col items-center justify-center text-center">
                  <div className="h-20 w-20 mb-4 rounded-full bg-mg-gold/10 text-mg-gold flex items-center justify-center">
                    <Bell size={40} className="opacity-50" />
                  </div>
                  <h3 className={`text-xl font-bold mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>You're all caught up!</h3>
                  <p className={`text-sm max-w-sm ${isDark ? "text-white/60" : "text-gray-500"}`}>You have no new notifications or activities to show.</p>
                </motion.div>
              ) : (
                notifications.map((notif) => {
                  const Icon = notif.icon;
                  return (
                    <motion.div 
                      layout
                      initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
                      key={notif.id} 
                      onClick={() => markAsRead(notif.id)}
                      className={`p-6 flex items-start gap-5 transition-colors cursor-pointer ${notif.unread ? (isDark ? "bg-mg-gold/5 hover:bg-mg-gold/10" : "bg-mg-gold/5 hover:bg-mg-gold/10") : (isDark ? "hover:bg-white/[0.02]" : "hover:bg-gray-50")}`}
                    >
                      <div className="relative mt-1">
                        <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl shadow-inner ${notif.unread ? "bg-mg-gold/20 text-mg-gold" : isDark ? "bg-white/5 text-white/50" : "bg-black/5 text-gray-500"}`}>
                          <Icon size={24} />
                        </div>
                        {notif.unread && (<span className={`absolute -top-1 -right-1 h-3.5 w-3.5 rounded-full bg-mg-gold shadow-[0_0_10px_rgba(212,175,55,0.8)] border-2 ${isDark ? "border-[#111111]" : "border-white"}`} />)}
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                          <h4 className={`text-lg font-bold ${notif.unread ? (isDark ? "text-white" : "text-gray-900") : (isDark ? "text-white/80" : "text-gray-700")}`}>{notif.title}</h4>
                          <span className={`text-xs font-bold uppercase tracking-wider ${notif.unread ? "text-mg-gold" : isDark ? "text-white/40" : "text-gray-400"}`}>{notif.time}</span>
                        </div>
                        <p className={`text-sm leading-relaxed ${notif.unread ? (isDark ? "text-white/80" : "text-gray-800") : (isDark ? "text-white/50" : "text-gray-500")}`}>{notif.detail}</p>
                      </div>
                    </motion.div>
                  );
                })
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}