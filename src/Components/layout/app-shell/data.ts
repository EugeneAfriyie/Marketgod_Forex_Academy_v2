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
  Signal,
  Crown,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type AppArea = "student" | "admin" | "premium";
export type AppLanguage = "en" | "fr" | "es" | "ar";

export interface NavItem {
  to: string;
  label: string;
  icon: LucideIcon;
  description: string;
}

export interface UserProfile {
  name: string;
  email: string;
  avatar: string;
}

export interface NotificationItem {
  id: number;
  title: string;
  desc: string;
  time: string;
  unread: boolean;
}

export const defaultUser: UserProfile = {
  name: "Eyram Dela",
  email: "eyram@marketgod.com",
  avatar: "https://github.com/shadcn.png",
};

export const mockNotifications: NotificationItem[] = [
  { id: 1, title: "New Gold VIP Signal", desc: "XAUUSD Buy Setup available.", time: "10m ago", unread: true },
  { id: 2, title: "Live Session Reminder", desc: "Mentorship live session starts in 1 hour.", time: "1h ago", unread: true },
  { id: 3, title: "Course Unlocked", desc: "You now have access to 'Advanced Market Structure'.", time: "2d ago", unread: false },
];

export const navConfig: Record<AppArea, NavItem[]> = {
  student: [
    { to: "/dashboard", label: "Overview", icon: LayoutDashboard, description: "Welcome back! Here is a summary of your progress." },
    { to: "/dashboard/courses", label: "My Courses", icon: BookOpen, description: "Access your enrolled mentorship programs and courses." },
    { to: "/dashboard/resources", label: "Resources", icon: LibraryBig, description: "Download trading tools, templates, and essential files." },
    { to: "/dashboard/events", label: "Events", icon: CalendarDays, description: "Keep track of upcoming webinars and physical seminars." },
    { to: "/dashboard/collaboration", label: "Collaboration", icon: Handshake, description: "Connect and trade with the Marketgod community." },
    { to: "/dashboard/affiliate", label: "Affiliate", icon: BadgeDollarSign, description: "Manage your referral links and track your earnings." },
    { to: "/dashboard/profile", label: "Profile", icon: UserCircle2, description: "Update your personal details and account settings." },
    { to: "/dashboard/support", label: "Support", icon: LifeBuoy, description: "Need help? Reach out to the Marketgod support team." }
  ],
  admin: [
    { to: "/admin", label: "Overview", icon: LayoutDashboard, description: "Platform metrics, recent activity, and quick actions." },
    { to: "/admin/users", label: "Users", icon: Users, description: "Manage platform members, their access, and details." },
    { to: "/admin/roles", label: "Roles", icon: ShieldCheck, description: "Configure system permissions and staff access levels." },
    { to: "/admin/courses", label: "Courses", icon: FolderKanban, description: "Create, edit, and manage educational content." },
    { to: "/admin/subscriptions", label: "Subscriptions", icon: CreditCard, description: "Manage pricing plans and monitor active subscribers." },
    { to: "/admin/bookings", label: "Bookings", icon: BriefcaseBusiness, description: "Review and manage mentorship and event reservations." },
    { to: "/admin/support", label: "Support", icon: LifeBuoy, description: "Handle student inquiries, tickets, and assistance." }
  ],
  premium: [
    { to: "/premium", label: "VIP Overview", icon: LayoutDashboard, description: "Welcome to your exclusive premium workspace." },
    { to: "/premium/mentorship", label: "Mentorship", icon: Crown, description: "Access your high-level VIP mentorship content." },
    { to: "/premium/signals", label: "VIP Signals", icon: Signal, description: "Real-time trading signals, setups, and deep market analysis." },
    { to: "/premium/courses", label: "Pro Courses", icon: BookOpen, description: "Advanced trading courses and exclusive strategies." },
    { to: "/premium/resources", label: "Vault", icon: LibraryBig, description: "Exclusive tools, indicators, and private templates." },
    { to: "/premium/events", label: "Private Events", icon: CalendarDays, description: "Invite-only webinars, live sessions, and VIP meetups." },
    { to: "/premium/profile", label: "Profile", icon: UserCircle2, description: "Manage your premium account and preferences." },
    { to: "/premium/support", label: "Priority Support", icon: LifeBuoy, description: "Jump the queue with priority assistance and VIP care." }
  ]
};

const labelMap: Record<string, Partial<Record<AppLanguage, string>>> = {
  Overview: { fr: "Vue d'ensemble", es: "Resumen", ar: "???? ????" },
  "My Courses": { fr: "Mes Cours", es: "Mis Cursos", ar: "??????" },
  Resources: { fr: "Ressources", es: "Recursos", ar: "???????" },
  Events: { fr: "Evenements", es: "Eventos", ar: "?????????" },
  Collaboration: { fr: "Collaboration", es: "Colaboracion", ar: "???????" },
  Affiliate: { fr: "Affiliation", es: "Afiliados", ar: "????????" },
  Profile: { fr: "Profil", es: "Perfil", ar: "????? ??????" },
  Support: { fr: "Support", es: "Soporte", ar: "?????" },
  Users: { fr: "Utilisateurs", es: "Usuarios", ar: "??????????" },
  Roles: { fr: "Roles", es: "Roles", ar: "???????" },
  Courses: { fr: "Cours", es: "Cursos", ar: "???????" },
  Subscriptions: { fr: "Abonnements", es: "Suscripciones", ar: "??????????" },
  Bookings: { fr: "Reservations", es: "Reservas", ar: "????????" },
  "VIP Overview": { fr: "Vue VIP", es: "Vista VIP", ar: "???? VIP" },
  Mentorship: { fr: "Mentorat", es: "Mentoria", ar: "???????" },
  "VIP Signals": { fr: "Signaux VIP", es: "Senales VIP", ar: "?????? VIP" },
  "Pro Courses": { fr: "Cours Pro", es: "Cursos Pro", ar: "??????? ??????????" },
  Vault: { fr: "Coffre", es: "Boveda", ar: "??????" },
  "Private Events": { fr: "Evenements Prives", es: "Eventos Privados", ar: "????????? ??????" },
  "Priority Support": { fr: "Support Prioritaire", es: "Soporte Prioritario", ar: "????? ????????" }
};

const descriptionMap: Record<string, Partial<Record<AppLanguage, string>>> = {
  "Welcome back! Here is a summary of your progress.": { fr: "Bon retour ! Voici un resume de votre progression.", es: "Bienvenido de nuevo. Aqui tienes un resumen de tu progreso.", ar: "????? ??????! ??? ???? ??????." },
  "Access your enrolled mentorship programs and courses.": { fr: "Accedez a vos programmes de mentorat et a vos cours.", es: "Accede a tus programas de mentoria y cursos inscritos.", ar: "???? ??? ????? ??????? ???????? ??????? ????." },
  "Download trading tools, templates, and essential files.": { fr: "Telechargez des outils de trading, des modeles et des fichiers essentiels.", es: "Descarga herramientas de trading, plantillas y archivos esenciales.", ar: "?? ?????? ????? ??????? ???????? ???????? ??????." },
  "Keep track of upcoming webinars and physical seminars.": { fr: "Suivez les webinaires et seminaires physiques a venir.", es: "Sigue los proximos webinars y seminarios presenciales.", ar: "???? ??????????? ???????? ???????? ???????." },
  "Connect and trade with the Marketgod community.": { fr: "Connectez-vous et tradez avec la communaute Marketgod.", es: "Conecta y opera con la comunidad de Marketgod.", ar: "????? ?????? ?? ????? ????? ???." },
  "Manage your referral links and track your earnings.": { fr: "Gerez vos liens de parrainage et suivez vos gains.", es: "Gestiona tus enlaces de referido y sigue tus ganancias.", ar: "???? ????? ??????? ????? ??????." },
  "Update your personal details and account settings.": { fr: "Mettez a jour vos informations personnelles et les parametres du compte.", es: "Actualiza tus datos personales y configuracion de cuenta.", ar: "???? ??????? ??????? ???????? ??????." },
  "Need help? Reach out to the Marketgod support team.": { fr: "Besoin d'aide ? Contactez l'equipe support de Marketgod.", es: "Necesitas ayuda? Contacta al equipo de soporte de Marketgod.", ar: "?? ????? ??????? ????? ?? ???? ??? ????? ???." },
  "Platform metrics, recent activity, and quick actions.": { fr: "Indicateurs de la plateforme, activite recente et actions rapides.", es: "Metricas de la plataforma, actividad reciente y acciones rapidas.", ar: "??????? ?????? ??????? ?????? ?????????? ???????." },
  "Manage platform members, their access, and details.": { fr: "Gerez les membres, leurs acces et leurs details.", es: "Gestiona los miembros, sus accesos y detalles.", ar: "???? ??????? ?????????? ?????????." },
  "Configure system permissions and staff access levels.": { fr: "Configurez les permissions du systeme et les niveaux d'acces.", es: "Configura permisos del sistema y niveles de acceso del personal.", ar: "?? ???? ??????? ?????? ???????? ???? ??????." },
  "Create, edit, and manage educational content.": { fr: "Creez, modifiez et gerez le contenu educatif.", es: "Crea, edita y administra contenido educativo.", ar: "???? ????? ???? ??????? ????????." },
  "Manage pricing plans and monitor active subscribers.": { fr: "Gerez les offres tarifaires et les abonnes actifs.", es: "Gestiona planes de precios y monitorea suscriptores activos.", ar: "???? ??? ??????? ????? ????????? ???????." },
  "Review and manage mentorship and event reservations.": { fr: "Consultez et gerez les reservations de mentorat et d'evenements.", es: "Revisa y gestiona reservas de mentoria y eventos.", ar: "???? ????? ?????? ??????? ??????????." },
  "Handle student inquiries, tickets, and assistance.": { fr: "Gerez les demandes, tickets et l'assistance des etudiants.", es: "Gestiona consultas, tickets y asistencia a estudiantes.", ar: "????? ?? ????????? ?????? ???????? ?????????." },
  "Welcome to your exclusive premium workspace.": { fr: "Bienvenue dans votre espace premium exclusif.", es: "Bienvenido a tu espacio premium exclusivo.", ar: "????? ?? ?? ?????? ??????? ???????." },
  "Access your high-level VIP mentorship content.": { fr: "Accedez a votre contenu de mentorat VIP avance.", es: "Accede a tu contenido VIP de mentoria avanzada.", ar: "???? ??? ????? ??????? VIP ???????." },
  "Real-time trading signals, setups, and deep market analysis.": { fr: "Signaux de trading en temps reel, configurations et analyse approfondie.", es: "Senales en tiempo real, setups y analisis profundo del mercado.", ar: "?????? ????? ????? ???????? ????? ?????." },
  "Advanced trading courses and exclusive strategies.": { fr: "Cours avances et strategies exclusives.", es: "Cursos avanzados y estrategias exclusivas.", ar: "????? ?????? ???????????? ?????." },
  "Exclusive tools, indicators, and private templates.": { fr: "Outils exclusifs, indicateurs et modeles prives.", es: "Herramientas exclusivas, indicadores y plantillas privadas.", ar: "????? ??????? ?????? ???? ??????." },
  "Invite-only webinars, live sessions, and VIP meetups.": { fr: "Webinaires sur invitation, sessions live et rencontres VIP.", es: "Webinars por invitacion, sesiones en vivo y encuentros VIP.", ar: "????????? ???? ?????? ?????? ??????? VIP." },
  "Manage your premium account and preferences.": { fr: "Gerez votre compte premium et vos preferences.", es: "Gestiona tu cuenta premium y preferencias.", ar: "???? ????? ?????? ?????????." },
  "Jump the queue with priority assistance and VIP care.": { fr: "Passez en priorite avec une assistance VIP.", es: "Salta la fila con asistencia prioritaria VIP.", ar: "???? ??? ?????? ?? ????? ???????? VIP." }
};

export function getAreaLabel(area: AppArea, language: AppLanguage) {
  const labels = {
    student: { en: "Student Workspace", fr: "Espace Etudiant", es: "Espacio del Estudiante", ar: "????? ??????" },
    admin: { en: "Admin Workspace", fr: "Espace Admin", es: "Espacio de Admin", ar: "????? ???????" },
    premium: { en: "Premium Workspace", fr: "Espace Premium", es: "Espacio Premium", ar: "??????? ???????" }
  } as const;

  return labels[area][language];
}

export function getUiStrings(language: AppLanguage) {
  return {
    menu: language === "ar" ? "???????" : "Menu",
    notifications: language === "fr" ? "Notifications" : language === "es" ? "Notificaciones" : language === "ar" ? "?????????" : "Notifications",
    markAllRead: language === "fr" ? "Tout marquer comme lu" : language === "es" ? "Marcar todo como leido" : language === "ar" ? "????? ???? ??????" : "Mark all read",
    viewAllActivity: language === "fr" ? "Voir toute l'activite" : language === "es" ? "Ver toda la actividad" : language === "ar" ? "??? ?? ??????" : "View All Activity",
    dailyMotivation: language === "fr" ? "Motivation du jour" : language === "es" ? "Motivacion diaria" : language === "ar" ? "????? ?????" : "Daily Motivation",
    announcement: language === "fr" ? "Annonce" : language === "es" ? "Anuncio" : language === "ar" ? "?????" : "Announcement",
    overviewDescription: language === "fr" ? "Voici un resume de votre activite et de votre progression." : language === "es" ? "Aqui tienes un resumen de tu actividad y progreso." : language === "ar" ? "??? ???? ?????? ??????." : "Here's a summary of your activity and progress.",
    welcomeBack: language === "fr" ? "Bon retour" : language === "es" ? "Bienvenido de nuevo" : language === "ar" ? "????? ??????" : "Welcome back"
  };
}

export function translateLabel(label: string, language: AppLanguage) {
  return labelMap[label]?.[language] || label;
}

export function translateDescription(description: string, language: AppLanguage) {
  return descriptionMap[description]?.[language] || description;
}

export function getTranslatedNavItems(items: NavItem[], language: AppLanguage) {
  return items.map((item) => ({
    ...item,
    translatedLabel: translateLabel(item.label, language),
    translatedDescription: translateDescription(item.description, language)
  }));
}

export function getCarouselItems(language: AppLanguage, finalTitle: string, finalDescription: string) {
  return [
    { type: "pageContext" as const, title: finalTitle, description: finalDescription },
    { type: "quote" as const, text: language === "fr" ? "Le secret pour avancer, c'est de commencer." : language === "es" ? "El secreto para avanzar es empezar." : language === "ar" ? "?? ?????? ?? ?? ????." : "The secret of getting ahead is getting started." },
    { type: "ad" as const, text: language === "fr" ? "Passez au Premium pour les signaux VIP !" : language === "es" ? "Sube a Premium para senales VIP!" : language === "ar" ? "?? ???????? ??? ??????? ??????? VIP!" : "Upgrade to Premium for VIP signals!", link: "/premium/signals", img: "https://res.cloudinary.com/dzqdfaghg/image/upload/v1771486217/kumasi_ocr0pl.webp" },
    { type: "quote" as const, text: language === "fr" ? "La discipline est le pont entre les objectifs et l'accomplissement." : language === "es" ? "La disciplina es el puente entre las metas y el logro." : language === "ar" ? "???????? ?? ????? ??? ??????? ????????." : "Discipline is the bridge between goals and accomplishment." },
    { type: "ad" as const, text: language === "fr" ? "Participez a notre prochain webinaire !" : language === "es" ? "Unete a nuestro proximo webinar!" : language === "ar" ? "???? ??? ????????? ??????!" : "Join our next live webinar!", link: "/dashboard/events" },
    { type: "quote" as const, text: language === "fr" ? "Le marche transfere l'argent des impatients vers les patients." : language === "es" ? "El mercado transfiere dinero de los impacientes a los pacientes." : language === "ar" ? "????? ???? ????? ?? ??? ?????? ??? ??????." : "The market is a device for transferring money from the impatient to the patient.", img: "https://res.cloudinary.com/dzqdfaghg/image/upload/v1771783834/d45de409-00cf-4b60-8f90-4d84964836aa.png" },
    { type: "ad" as const, text: language === "fr" ? "Reservez une session 1-a-1 avec Eyram Dela." : language === "es" ? "Reserva una sesion 1-a-1 con Eyram Dela." : language === "ar" ? "???? ???? 1-1 ?? ????? ????." : "Book a 1-on-1 session with Eyram Dela.", link: "/dashboard/events" },
    { type: "quote" as const, text: language === "fr" ? "Investir dans la connaissance rapporte le meilleur interet." : language === "es" ? "Invertir en conocimiento da el mejor interes." : language === "ar" ? "????????? ?? ??????? ???? ???? ????." : "An investment in knowledge pays the best interest." }
  ];
}
