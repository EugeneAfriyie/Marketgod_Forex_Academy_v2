import { Award, BookOpen, CalendarDays, CreditCard, LibraryBig, UserCircle2, Coins, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, type Variants } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";
import StudentSectionCard from "../../Components/student/StudentSectionCard";
const stats = [
    { label: "Coin Balance", value: "1,250", note: "MarketGod Coins", icon: Coins, link: "/dashboard/giveaways" },
    { label: "Active Programs", value: "2", note: "Mentorship + VIP", icon: CreditCard, link: "/dashboard/subscriptions" },
    { label: "Courses Available", value: "6", note: "Protected lessons", icon: BookOpen, link: "/dashboard/courses" },
    { label: "Upcoming Booking", value: "1", note: "Thursday, 7:00 PM", icon: CalendarDays, link: "/dashboard/meetings" },
];
const recentLessons = [
    { title: "Gold Structure Mastery", progress: 72 },
    { title: "Sniper Entry Framework", progress: 48 },
    { title: "Mindset and Discipline", progress: 100 },
];
const quickActions = [
    { title: "My Courses", icon: BookOpen, to: "/dashboard/courses/enrolled" },
    { title: "My Profile", icon: UserCircle2, to: "/dashboard/profile" },
    { title: "Book a Session", icon: CalendarDays, to: "/dashboard/meetings" },
    { title: "Resources", icon: LibraryBig, to: "/dashboard/resources" },
];
const activityFeed = [
    { type: 'course', title: 'New Module Unlocked: Advanced Wyckoff', detail: "In 'Gold Sniper Masterclass'", time: '2h ago', icon: BookOpen, to: '/dashboard/courses/enrolled' },
    { type: 'event', title: 'Live Market Breakdown', detail: 'Starts in 30 minutes', time: 'Now', icon: CalendarDays, to: '/dashboard/events' },
    { type: 'resource', title: 'New PDF Added: Session Timings', detail: 'In the Resources section', time: '1d ago', icon: LibraryBig, to: '/dashboard/resources' },
    { type: 'milestone', title: 'Achievement Unlocked: 10 Hours Watched', detail: 'Keep up the great work!', time: '3d ago', icon: Award, to: '/dashboard/milestones' },
];
export default function DashboardPage() {
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const container: Variants = {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };
    const item: Variants = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } }
    };
    return (<motion.div initial="hidden" animate="show" variants={container} className="space-y-5">
      {/* Top Stat Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
            const Icon = stat.icon;
            return (<motion.div variants={item} key={stat.label}>
              <Link to={stat.link} className={`block h-full group rounded-[1.75rem] border p-5 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:border-mg-gold/30 ${isDark ? "border-white/10 bg-white/[0.02] hover:bg-white/[0.04]" : "border-black/10 bg-white/75 backdrop-blur-sm hover:bg-white"}`}>
                <div className="flex items-start justify-between gap-4">
                <div>
                  <p className={`text-sm ${isDark ? "text-white/58" : "text-mg-light-textSecondary/80"}`}>
                    {stat.label}
                  </p>
                  <p className={`mt-3 text-4xl font-black ${isDark ? "text-white" : "text-mg-light-text"}`}>{stat.value}</p>
                  <p className="mt-2 text-sm text-mg-gold">
                    {stat.note}
                  </p>
                </div>
                <div className={`rounded-2xl p-3 transition-colors duration-300 ${isDark ? "bg-mg-gold/12 group-hover:bg-mg-gold/20" : "bg-mg-gold/16 group-hover:bg-mg-gold/25"}`}>
                  <Icon size={20} className="text-mg-gold"/>
                </div>
                </div>
              </Link>
            </motion.div>);
        })}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left Column: Activity Feed */}
        <div className="lg:col-span-2">
          <StudentSectionCard title={"Recent Activity"} description={"The latest updates from across the platform."}>
            <div className="flex flex-col gap-2">
              {activityFeed.map((feedItem) => {
            const Icon = feedItem.icon;
            return (<motion.div variants={item} key={feedItem.title}>
                    <Link to={feedItem.to} className={`group flex items-start gap-5 rounded-[1.5rem] p-4 transition-all duration-300 border border-transparent ${isDark ? 'hover:bg-[#151515] hover:border-white/5' : 'hover:bg-gray-50 hover:border-black/5'}`}>
                    <div className={`mt-1 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl transition-colors shadow-inner ${isDark ? 'bg-white/5 group-hover:bg-mg-gold/20 group-hover:text-mg-gold' : 'bg-black/5 group-hover:bg-mg-gold/20 group-hover:text-mg-gold'}`}>
                      <Icon size={20} className={isDark ? "text-white/70 group-hover:text-mg-gold" : "text-gray-600 group-hover:text-mg-gold"}/>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-baseline justify-between">
                        <p className={`font-bold ${isDark ? 'text-white' : 'text-mg-light-text'}`}>{feedItem.title}</p>
                        <p className={`text-xs font-medium ${isDark ? 'text-white/40' : 'text-mg-light-textSecondary/60'}`}>{feedItem.time}</p>
                      </div>
                      <p className={`mt-0.5 text-sm ${isDark ? 'text-white/60' : 'text-mg-light-textSecondary'}`}>{feedItem.detail}</p>
                    </div>
                    </Link>
                  </motion.div>);
        })}
            </div>
            <Link to="/dashboard/notifications" className={`mt-4 block text-center text-xs font-bold uppercase tracking-wider transition-colors ${isDark ? "text-white/40 hover:text-mg-gold" : "text-gray-400 hover:text-mg-gold"}`}>View All Activity</Link>
          </StudentSectionCard>
        </div>

        {/* Right Column: Progress & Quick Links */}
        <div className="flex flex-col gap-6">
          <StudentSectionCard title={"Continue Learning"} description={"Pick up where you left off."}>
            <div className="space-y-5">
              {recentLessons.map((lesson) => (<motion.div variants={item} key={lesson.title}>
                  <div className="flex items-baseline justify-between mb-1">
                    <p className={`text-sm font-bold ${isDark ? 'text-white' : 'text-mg-light-text'}`}>{lesson.title}</p>
                    <p className={`text-xs font-black ${lesson.progress === 100 ? (isDark ? 'text-green-400' : 'text-green-600') : 'text-mg-gold'}`}>{lesson.progress}%</p>
                  </div>
                  <p className={`text-xs font-medium mb-3 ${isDark ? 'text-white/50' : 'text-gray-500'}`}>{lesson.course}</p>
                  <div className={`h-2.5 w-full overflow-hidden rounded-full shadow-inner ${isDark ? "bg-white/10" : "bg-black/10"}`}>
                    <div className="h-full rounded-full bg-mg-gold" style={{ width: `${lesson.progress}%` }}/>
                  </div>
                </motion.div>))}
              <Link to="/dashboard/courses/enrolled" className={`mt-2 flex items-center justify-center gap-2 rounded-xl border-2 border-dashed py-3 text-xs font-bold uppercase tracking-wider transition-colors ${isDark ? "border-white/20 text-white/50 hover:text-white hover:bg-white/5" : "border-black/20 text-gray-500 hover:text-black hover:bg-black/5"}`}>
                {"View All Enrolled"} <ArrowRight size={14}/>
              </Link>
            </div>
          </StudentSectionCard>

          <StudentSectionCard title={"Ecosystem"} description={"Explore the MarketGod Hubs."}>
            <div className="grid grid-cols-2 gap-3">
            {quickActions.map((action) => {
            const Icon = action.icon;
            return (<motion.div variants={item} key={action.title}>
                  <Link to={action.to} className={`block h-full group flex flex-col items-center justify-center gap-3 rounded-2xl border p-5 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-mg-gold/50 ${isDark ? "border-white/10 bg-white/[0.03] hover:bg-white/5" : "border-black/10 bg-white/50 hover:bg-white"}`}>
                    <div className={`p-3 rounded-full transition-colors ${isDark ? "bg-white/5 group-hover:bg-mg-gold/10" : "bg-black/5 group-hover:bg-mg-gold/10"}`}>
                      <Icon size={22} className="text-mg-gold"/>
                    </div>
                    <p className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-white/80' : 'text-mg-light-text'}`}>{action.title}</p>
                </Link>
              </motion.div>);
        })}
            </div>
          </StudentSectionCard>
        </div>
      </div>
    </motion.div>);
}
