import { Route, Routes } from "react-router-dom";
import { SEOData, getBlogSEO } from "../Components/SEO/SEOData";
import SEO from "../Components/SEO/SEO";
import { useLocation } from "react-router-dom";
import PublicSiteLayout from "../Components/layout/PublicSiteLayout";
import AppShell from "../Components/layout/AppShell";
import HomePage from "../Pages/public/HomePage";
import AboutPage from "../Pages/public/AboutPage";
import PlansPage from "../Pages/public/PlansPage";
import BlogPage from "../Pages/public/BlogPage";
import ContactPage from "../Pages/public/ContactPage";
import LegalPage from "../Pages/public/LegalPage";
import BlogPostPage from "../Pages/public/BlogPostPage";
import NotFoundPage from "../Pages/public/NotFoundPage";
import LoginPage from "../Pages/auth/LoginPage";
import RegisterPage from "../Pages/auth/RegisterPage";
import ForgotPasswordPage from "../Pages/auth/ForgotPasswordPage";
import DashboardPage from "../Pages/student/DashboardPage";
import CoursesPage from "../Pages/student/CoursesPage";
import CourseDetailsPage from "../Pages/student/CourseDetailsPage";
import LessonPlayerPage from "../Pages/student/LessonPlayerPage";
import ResourcesPage from "../Pages/student/ResourcesPage";
import EventsPage from "../Pages/student/EventsPage";
import CollaborationPage from "../Pages/student/CollaborationPage";
import AffiliatePage from "../Pages/student/AffiliatePage";
import ProfilePage from "../Pages/student/ProfilePage";
import SupportPage from "../Pages/student/SupportPage";
import AdminDashboardPage from "../Pages/admin/AdminDashboardPage";
import AdminUsersPage from "../Pages/admin/AdminUsersPage";
import AdminRolesPage from "../Pages/admin/AdminRolesPage";
import AdminCoursesPage from "../Pages/admin/AdminCoursesPage";
import AdminCourseDetailsPage from "../Pages/admin/AdminCourseDetailsPage";
import AdminSubscriptionsPage from "../Pages/admin/AdminSubscriptionsPage";
import AdminBookingsPage from "../Pages/admin/AdminBookingsPage";
import AdminSupportPage from "../Pages/admin/AdminSupportPage";

function RouteSEO() {
  const location = useLocation();
  const seo = location.pathname.startsWith("/blog/")
    ? getBlogSEO(location.pathname.split("/blog/")[1]) || SEOData["/blog"]
    : SEOData[location.pathname] || SEOData["/"];

  return <SEO {...seo} />;
}

export default function AppRoutes() {
  return (
    <>
      <RouteSEO />
      <Routes>
        <Route element={<PublicSiteLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/plans" element={<PlansPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/legal" element={<LegalPage />} />
        </Route>

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />

        <Route
          path="/dashboard"
          element={
            <AppShell
              area="student"
              title="Student Dashboard"
              description="This app area will become the protected student workspace for courses, subscriptions, profile management, and support."
            />
          }
        >
          <Route index element={<DashboardPage />} />
          <Route path="courses" element={<CoursesPage />} />
          <Route path="courses/:courseId" element={<CourseDetailsPage />} />
          <Route path="courses/:courseId/lessons/:lessonId" element={<LessonPlayerPage />} />
          <Route path="resources" element={<ResourcesPage />} />
          <Route path="events" element={<EventsPage />} />
          <Route path="collaboration" element={<CollaborationPage />} />
          <Route path="affiliate" element={<AffiliatePage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="support" element={<SupportPage />} />
        </Route>

        <Route
          path="/premium"
          element={
            <AppShell
              area="premium"
              title="Premium Dashboard"
              description="Your exclusive workspace for VIP signals, advanced mentorship, and premium resources."
            />
          }
        >
          <Route index element={<DashboardPage />} />
          <Route path="mentorship" element={<CoursesPage />} />
          <Route path="signals" element={<ResourcesPage />} />
          <Route path="courses" element={<CoursesPage />} />
          <Route path="courses/:courseId" element={<CourseDetailsPage />} />
          <Route path="courses/:courseId/lessons/:lessonId" element={<LessonPlayerPage />} />
          <Route path="resources" element={<ResourcesPage />} />
          <Route path="events" element={<EventsPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="support" element={<SupportPage />} />
        </Route>

        <Route
          path="/admin"
          element={
            <AppShell
              area="admin"
              title="Admin Dashboard"
              description="This app area will become the control center for users, courses, subscriptions, bookings, and support operations."
            />
          }
        >
          <Route index element={<AdminDashboardPage />} />
          <Route path="users" element={<AdminUsersPage />} />
          <Route path="roles" element={<AdminRolesPage />} />
          <Route path="courses" element={<AdminCoursesPage />} />
          <Route path="courses/:courseId" element={<AdminCourseDetailsPage />} />
          <Route path="subscriptions" element={<AdminSubscriptionsPage />} />
          <Route path="bookings" element={<AdminBookingsPage />} />
          <Route path="support" element={<AdminSupportPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}
