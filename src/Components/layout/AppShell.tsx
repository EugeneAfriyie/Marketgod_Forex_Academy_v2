import { useState, useRef, useEffect, useMemo } from "react";
import { Outlet, NavLink, Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  BookOpen,
  LibraryBig,
  CalendarDays,
  Handshake,
  BadgeDollarSign,
  UserCircle2,
  LifeBuoy,
  ShieldCheck,
  Users,
  FolderKanban,
  BriefcaseBusiness,
  CreditCard,
  LogOut,
  Signal,
  Crown,
  Bell,
  Sun,
  Moon,
  ArrowRight,
} from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

interface AppShellProps {
  title: string;
  description: string;
  area: "student" | "admin" | "premium";
}

const navConfig = {
  student: [
    { to: "/dashboard", label: "Overview", icon: LayoutDashboard, description: "Welcome back! Here is a summary of your progress." },
    { to: "/dashboard/courses", label: "My Courses", icon: BookOpen, description: "Access your enrolled mentorship programs and courses." },
    { to: "/dashboard/resources", label: "Resources", icon: LibraryBig, description: "Download trading tools, templates, and essential files." },
    { to: "/dashboard/events", label: "Events", icon: CalendarDays, description: "Keep track of upcoming webinars and physical seminars." },
    { to: "/dashboard/collaboration", label: "Collaboration", icon: Handshake, description: "Connect and trade with the Marketgod community." },
    { to: "/dashboard/affiliate", label: "Affiliate", icon: BadgeDollarSign, description: "Manage your referral links and track your earnings." },
    { to: "/dashboard/profile", label: "Profile", icon: UserCircle2, description: "Update your personal details and account settings." },
    { to: "/dashboard/support", label: "Support", icon: LifeBuoy, description: "Need help? Reach out to the Marketgod support team." },
  ],
  admin: [
    { to: "/admin", label: "Overview", icon: LayoutDashboard, description: "Platform metrics, recent activity, and quick actions." },
    { to: "/admin/users", label: "Users", icon: Users, description: "Manage platform members, their access, and details." },
    { to: "/admin/roles", label: "Roles", icon: ShieldCheck, description: "Configure system permissions and staff access levels." },
    { to: "/admin/courses", label: "Courses", icon: FolderKanban, description: "Create, edit, and manage educational content." },
    { to: "/admin/subscriptions", label: "Subscriptions", icon: CreditCard, description: "Manage pricing plans and monitor active subscribers." },
    { to: "/admin/bookings", label: "Bookings", icon: BriefcaseBusiness, description: "Review and manage mentorship and event reservations." },
    { to: "/admin/support", label: "Support", icon: LifeBuoy, description: "Handle student inquiries, tickets, and assistance." },
  ],
  premium: [
    { to: "/premium", label: "VIP Overview", icon: LayoutDashboard, description: "Welcome to your exclusive premium workspace." },
    { to: "/premium/mentorship", label: "Mentorship", icon: Crown, description: "Access your high-level VIP mentorship content." },
    { to: "/premium/signals", label: "VIP Signals", icon: Signal, description: "Real-time trading signals, setups, and deep market analysis." },
    { to: "/premium/courses", label: "Pro Courses", icon: BookOpen, description: "Advanced trading courses and exclusive strategies." },
    { to: "/premium/resources", label: "Vault", icon: LibraryBig, description: "Exclusive tools, indicators, and private templates." },
    { to: "/premium/events", label: "Private Events", icon: CalendarDays, description: "Invite-only webinars, live sessions, and VIP meetups." },
    { to: "/premium/profile", label: "Profile", icon: UserCircle2, description: "Manage your premium account and preferences." },
    { to: "/premium/support", label: "Priority Support", icon: LifeBuoy, description: "Jump the queue with priority assistance and VIP care." },
  ],
} as const;

export default function AppShell({ title, description, area }: AppShellProps) {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";
  const location = useLocation();
  const navItems = navConfig[area];
  const areaLabel = area === "student" ? "Student Workspace" : area === "premium" ? "Premium Workspace" : "Admin Workspace";

  // Mock user data for presentation
  const user = {
    name: "Eyram Dela",
    email: "eyram@marketgod.com",
    avatar: "https://github.com/shadcn.png",
  };

  // Dynamically find the active route item to update the header
  const basePath = area === "student" ? "/dashboard" : `/${area}`;
  const activeItem = [...navItems].reverse().find(
    (item) =>
      location.pathname === item.to ||
      (item.to !== basePath && location.pathname.startsWith(item.to))
  );

  const displayTitle = activeItem ? activeItem.label : title;
  const displayDescription = activeItem ? activeItem.description : description;

  // Personalize welcome message on overview pages
  const isOverviewPage = activeItem?.to === basePath;
  const finalTitle = isOverviewPage ? `Welcome back, ${user.name.split(" ")[0]}!` : displayTitle;
  const finalDescription = isOverviewPage ? `Here's a summary of your activity and progress.` : displayDescription;

  // Carousel state for header content
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const carouselItems = useMemo(() => [
    { type: "pageContext", title: finalTitle, description: finalDescription },
    { type: "quote", text: "The secret of getting ahead is getting started." },
    { type: "ad", text: "Upgrade to Premium for VIP signals!", link: "/premium/signals", img: "https://res.cloudinary.com/dzqdfaghg/image/upload/v1771486217/kumasi_ocr0pl.webp" },
    { type: "quote", text: "Discipline is the bridge between goals and accomplishment." },
    { type: "ad", text: "Join our next live webinar!", link: "/dashboard/events" },
    { type: "quote", text: "The market is a device for transferring money from the impatient to the patient.", img: "https://res.cloudinary.com/dzqdfaghg/image/upload/v1771783834/d45de409-00cf-4b60-8f90-4d84964836aa.png" },
    { type: "ad", text: "Book a 1-on-1 session with Eyram Dela.", link: "/dashboard/events" },
    { type: "quote", text: "An investment in knowledge pays the best interest." },
  ], [finalTitle, finalDescription]);

  // Reset carousel to show page title on navigation
  useEffect(() => {
    setCarouselIndex(0);
  }, [location.pathname]);

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setCarouselIndex((prevIndex) => (prevIndex + 1) % carouselItems.length);
    }, 7000); // Change every 7 seconds
    return () => clearInterval(interval);
  }, [carouselItems]);

  const onDragEnd = (e: any, { offset }: any) => {
    const DRAG_THRESHOLD = 75;
    if (offset.x > DRAG_THRESHOLD) {
      setDirection(-1);
      setCarouselIndex((prev) => (prev - 1 + carouselItems.length) % carouselItems.length);
    } else if (offset.x < -DRAG_THRESHOLD) {
      setDirection(1);
      setCarouselIndex((prev) => (prev + 1) % carouselItems.length);
    }
  };

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  // Notification state & click-outside handler
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    };
    if (showNotifications) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showNotifications]);

  // Mock notification data for presentation
  const mockNotifications = [
    { id: 1, title: "New Gold VIP Signal", desc: "XAUUSD Buy Setup available.", time: "10m ago", unread: true },
    { id: 2, title: "Live Session Reminder", desc: "Mentorship live session starts in 1 hour.", time: "1h ago", unread: true },
    { id: 3, title: "Course Unlocked", desc: "You now have access to 'Advanced Market Structure'.", time: "2d ago", unread: false },
  ];

  return (
    <div
      className={`h-screen overflow-hidden p-4 sm:p-5 transition-all duration-500 ease-in-out ${
        isDark
          ? "bg-[radial-gradient(circle_at_top_left,rgba(212,175,55,0.08),transparent_20%),#050505] text-mg-white"
          : "bg-[radial-gradient(circle_at_top_left,rgba(212,175,55,0.12),transparent_24%),#f6f2e9] text-mg-light-text"
      }`}
    >
      <div className="mx-auto grid h-full max-w-[1600px] gap-5 xl:grid-cols-[280px_minmax(0,1fr)]">
        <aside
          className={`flex h-full flex-col rounded-[2rem] border p-5 shadow-xl transition-all duration-500 ease-in-out ${
            isDark
              ? "border-white/10 bg-[#111111]/80 backdrop-blur-2xl"
              : "border-black/10 bg-white/70 backdrop-blur-sm"
          }`}
        >
          <Link to="/" className="mb-8 flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-mg-gold text-black">
              <BookOpen size={16} />
            </span>
            <span className="text-lg font-bold">Marketgod</span>
          </Link>

          <nav className="flex-1 space-y-1.5 overflow-y-auto pr-1 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-white/10">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/dashboard" || item.to === "/admin" || item.to === "/premium"}
                className={({ isActive }) =>
                  `relative flex items-center gap-3.5 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-500 ease-in-out ${
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
                        layoutId="active-nav-indicator"
                        className={`absolute inset-0 rounded-xl ${
                          isDark ? "bg-white/10" : "bg-black/5"
                        }`}
                        transition={{ duration: 0.5, type: "spring", bounce: 0.2 }}
                      />
                    )}
                    <span className="relative z-10">
                      <item.icon size={18} />
                    </span>
                    <span className="relative z-10">{item.label}</span>
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="mt-auto pt-5">
            <div
              className={`flex items-center gap-3 rounded-xl p-3 transition-colors duration-500 ease-in-out ${
                isDark ? "bg-black/20" : "bg-black/5"
              }`}
            >
              <img src={user.avatar} alt="User Avatar" className="h-9 w-9 rounded-full object-cover" />
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold">{user.name}</p>
                <p className={`truncate text-xs ${isDark ? "text-white/50" : "text-mg-light-textSecondary/70"}`}>{user.email}</p>
              </div>
              <button className="ml-auto flex-shrink-0 rounded-md p-2 text-white/60 transition-colors hover:bg-white/10 hover:text-white">
                <LogOut size={16} />
              </button>
            </div>
          </div>
        </aside>

        <main className="flex min-w-0 flex-col gap-5 overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-white/10">
          <header
            className={`sticky top-0 z-10 rounded-b-[2rem] border-b p-6 shadow-xl transition-all duration-500 ease-in-out ${
              isDark
                ? "border-white/10 bg-[#111111]/80 backdrop-blur-2xl"
                : "border-black/10 bg-white/70 backdrop-blur-sm"
            }`}
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="relative h-[110px] sm:h-[120px] w-full overflow-hidden rounded-lg">
                <AnimatePresence>
                  {carouselItems[carouselIndex].img && (
                    <motion.div
                      key={`${carouselIndex}-bg`}
                      initial={{ opacity: 0, scale: 1.2 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.2 }}
                      transition={{ duration: 0.7, ease: "easeInOut" }}
                      className="absolute inset-0 bg-cover bg-center"
                      style={{
                        backgroundImage: `url(${carouselItems[carouselIndex].img})`,
                      }}
                    />
                  )}
                </AnimatePresence>

                {carouselItems[carouselIndex].img && (
                  <div className="absolute inset-0 bg-black/60" />
                )}

                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={carouselIndex}
                    custom={direction}
                    initial={{ opacity: 0, x: direction > 0 ? "50%" : "-50%" }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: direction < 0 ? "50%" : "-50%" }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.5}
                    onDragEnd={onDragEnd}
                    className="absolute inset-0 flex flex-col justify-center cursor-grab active:cursor-grabbing"
                  >
                    {(() => {
                      const item = carouselItems[carouselIndex];
                      const hasBgImage = !!item.img;
                      switch (item.type) {
                        case "pageContext":
                          return (
                            <div>
                              <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-mg-gold">{areaLabel}</p>
                              <h1 className={`mt-2 text-3xl font-black md:text-4xl transition-colors duration-500 ease-in-out ${!hasBgImage && !isDark ? "text-mg-light-text" : "text-white"}`}>{item.title}</h1>
                              <p className={`mt-2 max-w-2xl text-sm leading-6 transition-colors duration-500 ease-in-out ${!hasBgImage && !isDark ? "text-mg-light-textSecondary/80" : "text-white/65"}`}>{item.description}</p>
                            </div>
                          );
                        case "quote":
                          return (
                            <div>
                              <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-mg-gold">Daily Motivation</p>
                              <p className={`mt-4 text-lg md:text-xl italic max-w-3xl ${!hasBgImage && !isDark ? "text-mg-light-textSecondary/80" : "text-white/60"}`}>
                                "{item.text}"
                              </p>
                            </div>
                          );
                        case "ad":
                          return (
                            <div>
                              <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-mg-gold">Announcement</p>
                              <Link to={item.link!} className={`mt-4 inline-flex items-center gap-3 text-lg font-bold uppercase tracking-wider transition-colors ${!hasBgImage && !isDark ? "text-yellow-600 hover:text-yellow-700" : "text-mg-gold hover:text-yellow-300"}`}>
                                <span className="h-3 w-3 rounded-full bg-current animate-pulse" />
                                <span>{item.text}</span>
                                <ArrowRight size={20} />
                              </Link>
                            </div>
                          );
                        default: return null;
                      }
                    })()}
                  </motion.div>
                </AnimatePresence>
                {/* Carousel Dots */}
                <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-2">
                  {carouselItems.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        if (i === carouselIndex) return;
                        setDirection(i > carouselIndex ? 1 : -1);
                        setCarouselIndex(i);
                      }}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        i === carouselIndex ? "w-5 bg-mg-gold" : "w-1.5 bg-white/40"
                      }`}
                      aria-label={`Go to slide ${i + 1}`}
                    />
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3 sm:self-start">
                <button
                  onClick={toggleTheme}
                  className={`relative flex items-center justify-center h-[40px] w-[40px] rounded-full transition-colors ${
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

                <div className="relative" ref={notificationRef}>
                  <button
                    onClick={() => setShowNotifications((prev) => !prev)}
                    className={`relative rounded-full p-2.5 transition-colors ${
                      isDark ? "bg-white/5 text-white hover:bg-white/10" : "bg-black/5 text-mg-light-text hover:bg-black/10"
                    }`}
                    aria-label="Notifications"
                  >
                    <Bell size={20} />
                    {/* Notification badge dot */}
                    {mockNotifications.some((n) => n.unread) && (
                      <span className="absolute top-2.5 right-2.5 h-2 w-2 rounded-full bg-mg-gold shadow-[0_0_8px_rgba(212,175,55,0.8)]" />
                    )}
                  </button>

                  <AnimatePresence>
                    {showNotifications && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className={`absolute right-0 top-full mt-3 w-80 sm:w-96 rounded-2xl border shadow-2xl backdrop-blur-2xl z-50 overflow-hidden ${
                          isDark ? "border-white/10 bg-[#151515]/95" : "border-black/10 bg-white/95"
                        }`}
                      >
                        <div className={`flex items-center justify-between border-b p-4 ${isDark ? "border-white/10" : "border-black/5"}`}>
                          <h3 className="font-bold">Notifications</h3>
                          <button className="text-xs font-semibold text-mg-gold hover:underline">Mark all read</button>
                        </div>
                        
                        <div className="max-h-[320px] overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-mg-gold/30 hover:[&::-webkit-scrollbar-thumb]:bg-mg-gold/50">
                          {mockNotifications.map((notif) => (
                            <div key={notif.id} className={`flex gap-4 border-b p-4 transition-colors cursor-pointer hover:${isDark ? "bg-white/5" : "bg-black/5"} ${isDark ? "border-white/5" : "border-black/5"}`}>
                              <div className="mt-1 flex h-2 w-2 flex-shrink-0 items-center justify-center">
                                {notif.unread && <span className="h-2 w-2 rounded-full bg-mg-gold shadow-[0_0_8px_rgba(212,175,55,0.8)]" />}
                              </div>
                              <div>
                                <p className={`text-sm font-semibold ${isDark ? "text-white" : "text-mg-light-text"}`}>{notif.title}</p>
                                <p className={`mt-0.5 text-xs leading-5 ${isDark ? "text-white/60" : "text-mg-light-textSecondary/80"}`}>{notif.desc}</p>
                                <p className={`mt-2 text-[10px] font-bold uppercase tracking-wider ${isDark ? "text-white/40" : "text-mg-light-textSecondary/60"}`}>{notif.time}</p>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className={`p-3 text-center border-t bg-black/20 ${isDark ? "border-white/10" : "border-black/5 bg-gray-50/50"}`}>
                          <button className={`text-xs font-bold transition-colors ${
                            isDark ? "text-white/60 hover:text-white" : "text-mg-light-textSecondary hover:text-mg-light-text"
                          }`}>
                            View All Activity
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </header>

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
