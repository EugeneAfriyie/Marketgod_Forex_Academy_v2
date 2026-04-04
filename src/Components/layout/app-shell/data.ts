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
  Gift,
  Wrench,
  Award,
  GraduationCap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type AppArea = "student" | "admin" | "premium";

export interface NavItem {
  to: string;
  label: string;
  icon: LucideIcon;
  description: string;
  children?: NavItem[];
  group?: string;
}

export interface TranslatedNavItem extends NavItem {
  translatedLabel: string;
  translatedDescription: string;
  children?: TranslatedNavItem[];
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

export interface CarouselItem {
  type: "pageContext" | "quote" | "ad";
  title?: string;
  description?: string;
  text?: string;
  link?: string;
  img?: string;
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
    { to: "/dashboard", label: "Overview", icon: LayoutDashboard, description: "Welcome back! Here is a summary of your progress.", group: "Dashboard" },
    { to: "/dashboard/milestones", label: "Milestones", icon: Award, description: "Celebrate the user's achievements and growth inside the platform.", group: "Dashboard" },
    {
      to: "/dashboard/courses/all",
      label: "Courses",
      icon: BookOpen,
      description: "Browse all academy courses and manage your enrolled learning paths.",
      group: "Learning",
      children: [
        {
          to: "/dashboard/courses/all",
          label: "All Courses",
          icon: FolderKanban,
          description: "Display all courses currently available on the platform."
        },
        {
          to: "/dashboard/courses/enrolled",
          label: "Enrolled Courses",
          icon: BookOpen,
          description: "Display the courses this user has already enrolled in."
        }
      ]
    },
    { to: "/dashboard/mentorship", label: "Mentorship", icon: GraduationCap, description: "Explore all mentorship programs and coaching offerings we provide.", group: "Learning" },
    { to: "/dashboard/resources", label: "Resources", icon: LibraryBig, description: "Download trading tools, templates, and essential files.", group: "Learning" },
    { to: "/dashboard/signals", label: "Signals", icon: Signal, description: "Display the premium and standard signal services offered on the platform.", group: "Trading" },
    { to: "/dashboard/tools", label: "Tools", icon: Wrench, description: "Access trading utilities like calculators and other practical tools.", group: "Trading" },
    { to: "/dashboard/events", label: "Events", icon: CalendarDays, description: "Track tours, webinars, and past or upcoming academy events.", group: "Community" },
    { to: "/dashboard/collaboration", label: "Collaboration", icon: Handshake, description: "Present partnership opportunities for brands and organizations that want to work with us.", group: "Community" },
    { to: "/dashboard/meetings", label: "Meetings", icon: BriefcaseBusiness, description: "Book and manage private sessions with mentors and coaches.", group: "Community" },
    { to: "/dashboard/giveaways", label: "Giveaways", icon: Gift, description: "Complete tasks, challenges, or campaigns to unlock platform rewards.", group: "Community" },
    { to: "/dashboard/profile", label: "Profile", icon: UserCircle2, description: "Update your personal details and account settings.", group: "Settings" },
    { to: "/dashboard/affiliate", label: "Affiliate", icon: BadgeDollarSign, description: "Share our courses and offerings while tracking your referral rewards.", group: "Settings" },
    { to: "/dashboard/support", label: "Support", icon: LifeBuoy, description: "Need help? Reach out to the Marketgod support team.", group: "Settings" }
  ],
  admin: [
    { to: "/admin", label: "Overview", icon: LayoutDashboard, description: "Platform metrics, recent activity, and quick actions.", group: "Dashboard" },
    { to: "/admin/users", label: "Users", icon: Users, description: "Manage platform members, their access, and details.", group: "Management" },
    { to: "/admin/roles", label: "Roles", icon: ShieldCheck, description: "Configure system permissions and staff access levels.", group: "Management" },
    { to: "/admin/courses", label: "Courses", icon: FolderKanban, description: "Create, edit, and manage educational content.", group: "Content" },
    { to: "/admin/subscriptions", label: "Subscriptions", icon: CreditCard, description: "Manage pricing plans and monitor active subscribers.", group: "Financials" },
    { to: "/admin/bookings", label: "Bookings", icon: BriefcaseBusiness, description: "Review and manage mentorship and event reservations.", group: "Financials" },
    { to: "/admin/support", label: "Support", icon: LifeBuoy, description: "Handle student inquiries, tickets, and assistance.", group: "System" }
  ],
  premium: [
    { to: "/premium", label: "VIP Overview", icon: LayoutDashboard, description: "Welcome to your exclusive premium workspace.", group: "Dashboard" },
    { to: "/premium/mentorship", label: "Mentorship", icon: Crown, description: "Access your high-level VIP mentorship content.", group: "VIP Access" },
    { to: "/premium/signals", label: "VIP Signals", icon: Signal, description: "Real-time trading signals, setups, and deep market analysis.", group: "VIP Access" },
    { to: "/premium/courses", label: "Pro Courses", icon: BookOpen, description: "Advanced trading courses and exclusive strategies.", group: "VIP Access" },
    { to: "/premium/resources", label: "Vault", icon: LibraryBig, description: "Exclusive tools, indicators, and private templates.", group: "VIP Access" },
    { to: "/premium/events", label: "Private Events", icon: CalendarDays, description: "Invite-only webinars, live sessions, and VIP meetups.", group: "VIP Access" },
    { to: "/premium/profile", label: "Profile", icon: UserCircle2, description: "Manage your premium account and preferences.", group: "Settings" },
    { to: "/premium/support", label: "Priority Support", icon: LifeBuoy, description: "Jump the queue with priority assistance and VIP care.", group: "Settings" }
  ]
};
export function getAreaLabel(area: AppArea) {
  const labels = {
    student: "Student Workspace",
    admin: "Admin Workspace",
    premium: "Premium Workspace",
  } as const;

  return labels[area];
}

export function getUiStrings() {
  return {
    menu: "Menu",
    notifications: "Notifications",
    markAllRead: "Mark all read",
    viewAllActivity: "View All Activity",
    dailyMotivation: "Daily Motivation",
    announcement: "Announcement",
    overviewDescription: "Here's a summary of your activity and progress.",
    welcomeBack: "Welcome back",
  };
}

export function translateLabel(label: string) {
  return label;
}

export function translateDescription(description: string) {
  return description;
}

export function getTranslatedNavItems(items: NavItem[]): TranslatedNavItem[] {
  return items.map((item) => ({
    ...item,
    translatedLabel: item.label,
    translatedDescription: item.description,
    children: item.children ? getTranslatedNavItems(item.children) : undefined
  }));
}

export function getCarouselItems(finalTitle: string, finalDescription: string) {
  return [
    { type: "pageContext" as const, title: finalTitle, description: finalDescription },
    { type: "quote" as const, text: "The secret of getting ahead is getting started." },
    { type: "ad" as const, text: "Upgrade to Premium for VIP signals!", link: "/premium/signals", img: "https://res.cloudinary.com/dzqdfaghg/image/upload/v1771486217/kumasi_ocr0pl.webp" },
    { type: "quote" as const, text: "Discipline is the bridge between goals and accomplishment." },
    { type: "ad" as const, text: "Join our next live webinar!", link: "/dashboard/events" },
    { type: "quote" as const, text: "The market is a device for transferring money from the impatient to the patient.", img: "https://res.cloudinary.com/dzqdfaghg/image/upload/v1771783834/d45de409-00cf-4b60-8f90-4d84964836aa.png" },
    { type: "ad" as const, text: "Book a 1-on-1 session with Eyram Dela.", link: "/dashboard/events" },
    { type: "quote" as const, text: "An investment in knowledge pays the best interest." }
  ];
}
