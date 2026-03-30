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
  Languages,
  ArrowRight,
  Menu,
  X,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { useLanguage } from "../../context/LanguageContext";

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
  const { language, setLanguage } = useLanguage();
  const isDark = theme === "dark";
  const location = useLocation();
  const navItems = navConfig[area];
  const isFrench = language === "fr";
  const isSpanish = language === "es";
  const isArabic = language === "ar";

  const translations = {
    areaLabel:
      area === "student"
        ? isFrench
          ? "Espace Etudiant"
          : isSpanish
            ? "Espacio del Estudiante"
            : isArabic
              ? "مساحة الطالب"
              : "Student Workspace"
        : area === "premium"
          ? isFrench
            ? "Espace Premium"
            : isSpanish
              ? "Espacio Premium"
              : isArabic
                ? "المساحة المميزة"
                : "Premium Workspace"
          : isFrench
            ? "Espace Admin"
            : isSpanish
              ? "Espacio de Admin"
              : isArabic
                ? "مساحة الادارة"
                : "Admin Workspace",
    menu: isArabic ? "القائمة" : "Menu",
    notifications: isFrench ? "Notifications" : isSpanish ? "Notificaciones" : isArabic ? "الاشعارات" : "Notifications",
    markAllRead: isFrench ? "Tout marquer comme lu" : isSpanish ? "Marcar todo como leido" : isArabic ? "تحديد الكل كمقروء" : "Mark all read",
    viewAllActivity: isFrench ? "Voir toute l'activite" : isSpanish ? "Ver toda la actividad" : isArabic ? "عرض كل النشاط" : "View All Activity",
    dailyMotivation: isFrench ? "Motivation du jour" : isSpanish ? "Motivacion diaria" : isArabic ? "تحفيز اليوم" : "Daily Motivation",
    announcement: isFrench ? "Annonce" : isSpanish ? "Anuncio" : isArabic ? "اعلان" : "Announcement",
    overviewDescription: isFrench
      ? "Voici un resume de votre activite et de votre progression."
      : isSpanish
        ? "Aqui tienes un resumen de tu actividad y progreso."
        : isArabic
          ? "هذا ملخص لنشاطك وتقدمك."
          : "Here's a summary of your activity and progress.",
    welcomeBack: isFrench ? "Bon retour" : isSpanish ? "Bienvenido de nuevo" : isArabic ? "مرحبا بعودتك" : "Welcome back",
  };

  const translateLabel = (label: string) => {
    const map: Record<string, { fr?: string; es?: string; ar?: string }> = {
      Overview: { fr: "Vue d'ensemble", es: "Resumen", ar: "نظرة عامة" },
      "My Courses": { fr: "Mes Cours", es: "Mis Cursos", ar: "دوراتي" },
      Resources: { fr: "Ressources", es: "Recursos", ar: "الموارد" },
      Events: { fr: "Evenements", es: "Eventos", ar: "الفعاليات" },
      Collaboration: { fr: "Collaboration", es: "Colaboracion", ar: "التعاون" },
      Affiliate: { fr: "Affiliation", es: "Afiliados", ar: "الافلييت" },
      Profile: { fr: "Profil", es: "Perfil", ar: "الملف الشخصي" },
      Support: { fr: "Support", es: "Soporte", ar: "الدعم" },
      Users: { fr: "Utilisateurs", es: "Usuarios", ar: "المستخدمون" },
      Roles: { fr: "Roles", es: "Roles", ar: "الادوار" },
      Courses: { fr: "Cours", es: "Cursos", ar: "الدورات" },
      Subscriptions: { fr: "Abonnements", es: "Suscripciones", ar: "الاشتراكات" },
      Bookings: { fr: "Reservations", es: "Reservas", ar: "الحجوزات" },
      "VIP Overview": { fr: "Vue VIP", es: "Vista VIP", ar: "نظرة VIP" },
      Mentorship: { fr: "Mentorat", es: "Mentoria", ar: "الارشاد" },
      "VIP Signals": { fr: "Signaux VIP", es: "Senales VIP", ar: "اشارات VIP" },
      "Pro Courses": { fr: "Cours Pro", es: "Cursos Pro", ar: "الدورات الاحترافية" },
      Vault: { fr: "Coffre", es: "Boveda", ar: "الخزنة" },
      "Private Events": { fr: "Evenements Prives", es: "Eventos Privados", ar: "الفعاليات الخاصة" },
      "Priority Support": { fr: "Support Prioritaire", es: "Soporte Prioritario", ar: "الدعم الاولوية" },
    };

    if (isFrench) return map[label]?.fr || label;
    if (isSpanish) return map[label]?.es || label;
    if (isArabic) return map[label]?.ar || label;
    return label;
  };

  const translateDescription = (text: string) => {
    const map: Record<string, { fr?: string; es?: string; ar?: string }> = {
      "Welcome back! Here is a summary of your progress.": {
        fr: "Bon retour ! Voici un resume de votre progression.",
        es: "Bienvenido de nuevo. Aqui tienes un resumen de tu progreso.",
        ar: "مرحبا بعودتك! هذا ملخص لتقدمك.",
      },
      "Access your enrolled mentorship programs and courses.": {
        fr: "Accedez a vos programmes de mentorat et a vos cours.",
        es: "Accede a tus programas de mentoria y cursos inscritos.",
        ar: "ادخل الى برامج الارشاد والدورات المسجلة لديك.",
      },
      "Download trading tools, templates, and essential files.": {
        fr: "Telechargez des outils de trading, des modeles et des fichiers essentiels.",
        es: "Descarga herramientas de trading, plantillas y archivos esenciales.",
        ar: "قم بتنزيل ادوات التداول والقوالب والملفات المهمة.",
      },
      "Keep track of upcoming webinars and physical seminars.": {
        fr: "Suivez les webinaires et seminaires physiques a venir.",
        es: "Sigue los proximos webinars y seminarios presenciales.",
        ar: "تابع الويبينارات والندوات الحضورية القادمة.",
      },
      "Connect and trade with the Marketgod community.": {
        fr: "Connectez-vous et tradez avec la communaute Marketgod.",
        es: "Conecta y opera con la comunidad de Marketgod.",
        ar: "تواصل وتداول مع مجتمع ماركت غود.",
      },
      "Manage your referral links and track your earnings.": {
        fr: "Gerez vos liens de parrainage et suivez vos gains.",
        es: "Gestiona tus enlaces de referido y sigue tus ganancias.",
        ar: "ادِر روابط الاحالة وتابع ارباحك.",
      },
      "Update your personal details and account settings.": {
        fr: "Mettez a jour vos informations personnelles et les parametres du compte.",
        es: "Actualiza tus datos personales y configuracion de cuenta.",
        ar: "حدّث بياناتك الشخصية واعدادات الحساب.",
      },
      "Need help? Reach out to the Marketgod support team.": {
        fr: "Besoin d'aide ? Contactez l'equipe support de Marketgod.",
        es: "Necesitas ayuda? Contacta al equipo de soporte de Marketgod.",
        ar: "هل تحتاج مساعدة؟ تواصل مع فريق دعم ماركت غود.",
      },
      "Platform metrics, recent activity, and quick actions.": {
        fr: "Indicateurs de la plateforme, activite recente et actions rapides.",
        es: "Metricas de la plataforma, actividad reciente y acciones rapidas.",
        ar: "احصاءات المنصة والنشاط الاخير والاجراءات السريعة.",
      },
      "Manage platform members, their access, and details.": {
        fr: "Gerez les membres, leurs acces et leurs details.",
        es: "Gestiona los miembros, sus accesos y detalles.",
        ar: "ادِر الاعضاء وصلاحياتهم وبياناتهم.",
      },
      "Configure system permissions and staff access levels.": {
        fr: "Configurez les permissions du systeme et les niveaux d'acces.",
        es: "Configura permisos del sistema y niveles de acceso del personal.",
        ar: "قم بضبط صلاحيات النظام ومستويات وصول الفريق.",
      },
      "Create, edit, and manage educational content.": {
        fr: "Creez, modifiez et gerez le contenu educatif.",
        es: "Crea, edita y administra contenido educativo.",
        ar: "انشئ وعدّل وادر المحتوى التعليمي.",
      },
      "Manage pricing plans and monitor active subscribers.": {
        fr: "Gerez les offres tarifaires et les abonnes actifs.",
        es: "Gestiona planes de precios y monitorea suscriptores activos.",
        ar: "ادِر خطط الاسعار وراقب المشتركين النشطين.",
      },
      "Review and manage mentorship and event reservations.": {
        fr: "Consultez et gerez les reservations de mentorat et d'evenements.",
        es: "Revisa y gestiona reservas de mentoria y eventos.",
        ar: "راجع وادِر حجوزات الارشاد والفعاليات.",
      },
      "Handle student inquiries, tickets, and assistance.": {
        fr: "Gerez les demandes, tickets et l'assistance des etudiants.",
        es: "Gestiona consultas, tickets y asistencia a estudiantes.",
        ar: "تعامل مع استفسارات الطلاب والتذاكر والمساعدة.",
      },
      "Welcome to your exclusive premium workspace.": {
        fr: "Bienvenue dans votre espace premium exclusif.",
        es: "Bienvenido a tu espacio premium exclusivo.",
        ar: "مرحبا بك في مساحتك المميزة الحصرية.",
      },
      "Access your high-level VIP mentorship content.": {
        fr: "Accedez a votre contenu de mentorat VIP avance.",
        es: "Accede a tu contenido VIP de mentoria avanzada.",
        ar: "ادخل الى محتوى الارشاد VIP المتقدم.",
      },
      "Real-time trading signals, setups, and deep market analysis.": {
        fr: "Signaux de trading en temps reel, configurations et analyse approfondie.",
        es: "Senales en tiempo real, setups y analisis profundo del mercado.",
        ar: "اشارات تداول فورية وتحليلات عميقة للسوق.",
      },
      "Advanced trading courses and exclusive strategies.": {
        fr: "Cours avances et strategies exclusives.",
        es: "Cursos avanzados y estrategias exclusivas.",
        ar: "دورات متقدمة واستراتيجيات حصرية.",
      },
      "Exclusive tools, indicators, and private templates.": {
        fr: "Outils exclusifs, indicateurs et modeles prives.",
        es: "Herramientas exclusivas, indicadores y plantillas privadas.",
        ar: "ادوات ومؤشرات وقوالب خاصة وحصرية.",
      },
      "Invite-only webinars, live sessions, and VIP meetups.": {
        fr: "Webinaires sur invitation, sessions live et rencontres VIP.",
        es: "Webinars por invitacion, sesiones en vivo y encuentros VIP.",
        ar: "ويبينارات خاصة وجلسات مباشرة ولقاءات VIP.",
      },
      "Manage your premium account and preferences.": {
        fr: "Gerez votre compte premium et vos preferences.",
        es: "Gestiona tu cuenta premium y preferencias.",
        ar: "ادِر حسابك المميز وتفضيلاتك.",
      },
      "Jump the queue with priority assistance and VIP care.": {
        fr: "Passez en priorite avec une assistance VIP.",
        es: "Salta la fila con asistencia prioritaria VIP.",
        ar: "احصل على اولوية في الدعم والعناية VIP.",
      },
    };

    if (isFrench) return map[text]?.fr || text;
    if (isSpanish) return map[text]?.es || text;
    if (isArabic) return map[text]?.ar || text;
    return text;
  };

  const areaLabel = translations.areaLabel;
  const translatedNavItems = navItems.map((item) => ({
    ...item,
    translatedLabel: translateLabel(item.label),
    translatedDescription: translateDescription(item.description),
  }));

  // Mock user data for presentation
  const user = {
    name: "Eyram Dela",
    email: "eyram@marketgod.com",
    avatar: "https://github.com/shadcn.png",
  };

  // Dynamically find the active route item to update the header
  const basePath = area === "student" ? "/dashboard" : `/${area}`;
  const activeItem = [...translatedNavItems].reverse().find(
    (item) =>
      location.pathname === item.to ||
      (item.to !== basePath && location.pathname.startsWith(item.to))
  );

  const displayTitle = activeItem ? activeItem.translatedLabel : isFrench ? translateLabel(title) : title;
  const displayDescription = activeItem ? activeItem.translatedDescription : isFrench ? translateDescription(description) : description;

  // Personalize welcome message on overview pages
  const isOverviewPage = activeItem?.to === basePath;
  const finalTitle = isOverviewPage
    ? isArabic
      ? `${translations.welcomeBack}، ${user.name.split(" ")[0]}!`
      : `${translations.welcomeBack}, ${user.name.split(" ")[0]} !`
    : displayTitle;
  const finalDescription = isOverviewPage ? translations.overviewDescription : displayDescription;

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  // Carousel state for header content
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const carouselItems = useMemo(() => [
    { type: "pageContext", title: finalTitle, description: finalDescription },
    { type: "quote", text: isFrench ? "Le secret pour avancer, c'est de commencer." : "The secret of getting ahead is getting started." },
    { type: "ad", text: isFrench ? "Passez au Premium pour les signaux VIP !" : "Upgrade to Premium for VIP signals!", link: "/premium/signals", img: "https://res.cloudinary.com/dzqdfaghg/image/upload/v1771486217/kumasi_ocr0pl.webp" },
    { type: "quote", text: isFrench ? "La discipline est le pont entre les objectifs et l'accomplissement." : "Discipline is the bridge between goals and accomplishment." },
    { type: "ad", text: isFrench ? "Participez a notre prochain webinaire !" : "Join our next live webinar!", link: "/dashboard/events" },
    { type: "quote", text: isFrench ? "Le marche transfere l'argent des impatients vers les patients." : "The market is a device for transferring money from the impatient to the patient.", img: "https://res.cloudinary.com/dzqdfaghg/image/upload/v1771783834/d45de409-00cf-4b60-8f90-4d84964836aa.png" },
    { type: "ad", text: isFrench ? "Reservez une session 1-a-1 avec Eyram Dela." : "Book a 1-on-1 session with Eyram Dela.", link: "/dashboard/events" },
    { type: "quote", text: isFrench ? "Investir dans la connaissance rapporte le meilleur interet." : "An investment in knowledge pays the best interest." },
  ], [finalTitle, finalDescription, isFrench]);

  // Reset carousel to show page title on navigation
  useEffect(() => {
    setIsMobileMenuOpen(false);
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
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const languageRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (languageRef.current && !languageRef.current.contains(event.target as Node)) {
        setShowLanguageMenu(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    };
    if (showNotifications || showLanguageMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showNotifications, showLanguageMenu]);

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
      {/* Mobile Sidebar Overlay */}
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

      <div className={`relative mx-auto grid h-full max-w-[1600px] scale-[0.96] gap-4 origin-top transition-[grid-template-columns] duration-500 ease-in-out ${isSidebarCollapsed ? 'xl:grid-cols-[88px_minmax(0,1fr)]' : 'xl:grid-cols-[270px_minmax(0,1fr)]'} 2xl:scale-100`}>
        <aside
          className={`fixed inset-y-4 left-4 z-50 flex w-[280px] flex-col rounded-[2rem] border p-4 shadow-2xl transition-all duration-500 ease-in-out xl:relative xl:inset-auto xl:z-auto xl:w-auto xl:translate-x-0 ${
            isDark
              ? "border-white/10 bg-[#111111]/95 backdrop-blur-2xl"
              : "border-black/10 bg-white/95 backdrop-blur-2xl"
          } ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-[150%]"}`}
        >
          <div className={`mb-8 flex items-center ${isSidebarCollapsed ? 'xl:justify-center' : ''}`}>
            <Link to="/" className="flex items-center gap-3" title={isSidebarCollapsed ? "Marketgod Academy" : undefined}>
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-mg-gold text-black">
                <BookOpen size={16} />
              </span>
              <span className={`text-lg font-bold transition-all duration-300 ${isSidebarCollapsed ? 'xl:hidden' : 'block'}`}>Marketgod</span>
            </Link>
          
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className={`absolute top-6 right-5 xl:hidden p-2 rounded-full transition-colors ${isDark ? "bg-white/5 text-white hover:bg-white/10" : "bg-black/5 text-mg-light-text hover:bg-black/10"}`}
          >
            <X size={18} />
          </button>
          </div>

          <nav className={`flex-1 space-y-1.5 overflow-y-auto pr-1 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full ${
            isDark ? "[&::-webkit-scrollbar-thumb]:bg-white/10 hover:[&::-webkit-scrollbar-thumb]:bg-white/20" : "[&::-webkit-scrollbar-thumb]:bg-black/10 hover:[&::-webkit-scrollbar-thumb]:bg-black/20"
          }`}>
            {translatedNavItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/dashboard" || item.to === "/admin" || item.to === "/premium"}
                title={isSidebarCollapsed ? item.translatedLabel : undefined}
                className={({ isActive }) =>
                  `relative flex items-center ${isSidebarCollapsed ? 'xl:justify-center' : ''} gap-3.5 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-500 ease-in-out ${
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
                    <span className="relative z-10 shrink-0">
                      <item.icon size={18} />
                    </span>
                    <span className={`relative z-10 whitespace-nowrap transition-opacity duration-300 ${isSidebarCollapsed ? 'xl:hidden xl:opacity-0' : 'block opacity-100'}`}>
                      {item.translatedLabel}
                    </span>
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <div className={`mt-auto pt-5 flex ${isSidebarCollapsed ? 'xl:flex-col xl:items-center xl:gap-3' : 'flex-col'}`}>
            <div
              className={`flex items-center ${isSidebarCollapsed ? 'xl:justify-center' : 'gap-3'} rounded-xl p-3 transition-colors duration-500 ease-in-out ${
                isDark ? "bg-black/20" : "bg-black/5"
              }`}
            >
              <img src={user.avatar} alt="User Avatar" className="h-9 w-9 shrink-0 rounded-full object-cover" title={isSidebarCollapsed ? user.name : undefined} />
              <div className={`min-w-0 ${isSidebarCollapsed ? 'xl:hidden' : 'block'}`}>
                <p className="truncate text-sm font-semibold">{user.name}</p>
                <p className={`truncate text-xs ${isDark ? "text-white/50" : "text-mg-light-textSecondary/70"}`}>{user.email}</p>
              </div>
              <button className={`ml-auto flex-shrink-0 rounded-md p-2 transition-colors ${isDark ? "text-white/60 hover:bg-white/10 hover:text-white" : "text-mg-light-textSecondary hover:bg-black/10 hover:text-mg-light-text"} ${isSidebarCollapsed ? 'xl:hidden' : 'block'}`} title="Log out">
                <LogOut size={16} />
              </button>
            </div>
            
            {/* Show standalone logout button when collapsed */}
            <button className={`hidden ${isSidebarCollapsed ? 'xl:flex' : ''} p-2 rounded-xl justify-center transition-colors ${isDark ? 'text-white/60 hover:bg-white/10 hover:text-white' : 'text-mg-light-textSecondary hover:bg-black/10 hover:text-mg-light-text'}`} title="Log out">
                <LogOut size={20} />
            </button>
          </div>
        </aside>

        {/* Sidebar Collapse Toggle Button */}
        <button
          onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          className={`hidden xl:flex absolute top-8 -translate-x-1/2 z-50 items-center justify-center h-7 w-7 rounded-full border-2 transition-all duration-500 ease-in-out ${
            isDark
              ? "bg-[#111111] border-white/10 text-white/60 hover:bg-white/10 hover:text-white"
              : "bg-white border-black/10 text-mg-light-textSecondary hover:bg-black/5 hover:text-mg-light-text"
          } ${isSidebarCollapsed ? 'left-[88px]' : 'left-[270px]'}`}
          title={isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isSidebarCollapsed ? <PanelLeftOpen size={16} /> : <PanelLeftClose size={16} />}
        </button>

        <main className={`flex min-w-0 flex-col gap-5 overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full ${
          isDark ? "[&::-webkit-scrollbar-thumb]:bg-white/10 hover:[&::-webkit-scrollbar-thumb]:bg-white/20" : "[&::-webkit-scrollbar-thumb]:bg-black/10 hover:[&::-webkit-scrollbar-thumb]:bg-black/20"
        }`}>
          <header
            className={`relative z-10 rounded-b-[2rem] border-b p-5 shadow-xl transition-all duration-500 ease-in-out ${
              isDark
                ? "border-white/10 bg-[#111111]/80 backdrop-blur-2xl"
                : "border-black/10 bg-white/70 backdrop-blur-sm"
            }`}
          >
            <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
              
              {/* Mobile Menu Button */}
              <div className="xl:hidden mb-2">
                <button
                  onClick={() => setIsMobileMenuOpen(true)}
                  className={`flex items-center gap-2 p-2.5 w-fit rounded-xl transition-colors ${
                    isDark ? "bg-white/5 text-white hover:bg-white/10" : "bg-black/5 text-mg-light-text hover:bg-black/10"
                  }`}
                >
                  <Menu size={20} className="text-mg-gold" />
                  <span className="font-bold text-sm">{translations.menu}</span>
                </button>
              </div>

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
                              <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-mg-gold">{translations.dailyMotivation}</p>
                              <p className={`mt-4 text-lg md:text-xl italic max-w-3xl ${!hasBgImage && !isDark ? "text-mg-light-textSecondary/80" : "text-white/60"}`}>
                                "{item.text}"
                              </p>
                            </div>
                          );
                        case "ad":
                          return (
                            <div>
                              <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-mg-gold">{translations.announcement}</p>
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

              <div className="absolute top-6 right-6 xl:relative xl:top-auto xl:right-auto flex items-center gap-3 z-20">
                <div className="relative hidden sm:block" ref={languageRef}>
                  <button
                    onClick={() => setShowLanguageMenu((prev) => !prev)}
                    className={`relative flex h-[40px] w-[40px] items-center justify-center rounded-full transition-colors ${
                      isDark ? "bg-white/5 text-white hover:bg-white/10" : "bg-black/5 text-mg-light-text hover:bg-black/10"
                    }`}
                    aria-label="Language menu"
                  >
                    <Languages size={18} className="text-mg-gold" />
                  </button>

                  <AnimatePresence>
                    {showLanguageMenu && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className={`absolute right-0 top-full mt-3 min-w-[180px] rounded-2xl border p-2 shadow-2xl backdrop-blur-2xl ${
                          isDark ? "border-white/10 bg-[#151515]/95" : "border-black/10 bg-white/95"
                        }`}
                      >
                        {[
                          { value: "en", label: "English", short: "EN" },
                          { value: "fr", label: "Francais", short: "FR" },
                          { value: "es", label: "Espanol", short: "ES" },
                          { value: "ar", label: "Arabic", short: "AR" },
                        ].map((option) => (
                          <button
                            key={option.value}
                            onClick={() => {
                              setLanguage(option.value as "en" | "fr" | "es" | "ar");
                              setShowLanguageMenu(false);
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
                          <h3 className="font-bold">{translations.notifications}</h3>
                          <button className="text-xs font-semibold text-mg-gold hover:underline">{translations.markAllRead}</button>
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
                            {translations.viewAllActivity}
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
