# Marketgod Platform Blueprint

## Vision

Build Marketgod into a professional mentorship platform where public visitors can discover the brand, students can subscribe and learn through a secure dashboard, and admins can manage users, courses, subscriptions, bookings, and operations from one system.

## Product Goals

1. Present Marketgod as a premium, trusted, world-class mentorship brand.
2. Convert public visitors into registered users, subscribers, and students.
3. Give paying users secure access to courses, videos, mentorship content, and VIP offers.
4. Give admins full control over users, plans, courses, bookings, and support workflows.
5. Keep version 1 simple enough to ship, while leaving room for future growth.

## Primary Roles

### 1. Student / Client

The standard user role for customers and learners.

Core permissions:

1. Register and log in.
2. Update profile details.
3. Subscribe to mentorship or VIP products.
4. View purchased courses and protected lesson videos.
5. View subscription status.
6. Book sessions or events.
7. Contact support.

### 2. Admin

The management role for operating the platform.

Core permissions:

1. Log in to the admin dashboard.
2. Manage users.
3. Assign or update roles.
4. Create and manage courses, modules, and lessons.
5. Manage subscriptions and product access.
6. Manage bookings and tour/event reservations.
7. Manage support tickets.
8. View dashboard metrics and recent activity.

## Core Platform Areas

### 1. Public Marketing Site

This is the current website area.

Includes:

1. Home
2. About
3. Plans
4. Blog / resources
5. Contact
6. Tour and event promotion

### 2. Authentication

Required pages and flows:

1. Register
2. Login
3. Forgot password
4. Reset password
5. Logout

### 3. Student Dashboard

Student-facing app area for protected content and account management.

Includes:

1. Dashboard overview
2. My courses
3. Course details
4. Lesson player / video page
5. My subscriptions
6. My bookings
7. Profile settings
8. Support

### 4. Admin Dashboard

Admin-facing area for managing the business.

Includes:

1. Dashboard overview
2. User management
3. Role management
4. Course management
5. Lesson / video management
6. Subscription management
7. Booking management
8. Support management

## Student Features

### Account

1. Create account.
2. Log in securely.
3. Update name, email, phone, and profile photo.
4. Change password.
5. View account status.

### Courses and Learning

1. View purchased or assigned courses.
2. Open a course and see its modules and lessons.
3. Watch lesson videos.
4. See locked lessons if access is not active.
5. Resume from previous lesson later.

### Subscriptions

1. View available mentorship and VIP plans.
2. Subscribe to a plan.
3. View current active subscription.
4. View start date, expiry date, and status.

### Bookings

1. Book an event, session, or admin-approved slot.
2. View booking status.
3. View date, time, and booking notes.

### Support

1. Create support ticket.
2. View ticket history.
3. View ticket status.

## Admin Features

### Dashboard Overview

1. Total users
2. Active subscriptions
3. Total bookings
4. Total courses
5. Recent registrations
6. Recent payments later
7. Recent support tickets

### User Management

1. View all users.
2. Search and filter users.
3. View a user profile.
4. Assign or change roles.
5. Activate or deactivate accounts later if needed.

### Course Management

1. Create course.
2. Edit course.
3. Add modules.
4. Add lessons.
5. Attach video URLs or media references.
6. Publish or unpublish content later.

### Subscription Management

1. Create plans.
2. Edit plans.
3. Assign access to users.
4. View active and expired subscriptions.
5. Track which users belong to which plan.

### Booking Management

1. View all bookings.
2. Approve or update bookings.
3. Manage event/tour seat allocation later.

### Support Management

1. View all tickets.
2. Update ticket status.
3. Add admin notes later.

## MVP Scope

The first version should focus on launching a functional mentorship platform, not every advanced idea at once.

### MVP Features

1. Public marketing site remains available.
2. User registration and login.
3. Student dashboard shell.
4. Admin dashboard shell.
5. Profile page.
6. Course listing for students.
7. Course details with lesson list.
8. Subscription plans UI.
9. Booking page and booking list.
10. Admin user management.
11. Admin course management.
12. Admin subscription management.
13. Admin booking management.

### Later Features

1. Payment gateway integration
2. Automatic subscription renewal
3. Progress tracking
4. Certificates
5. Notifications
6. Referral system
7. Mentor and support-staff roles
8. Advanced analytics
9. In-app messaging

## Page Map

### Public Pages

1. `/`
2. `/about`
3. `/plans`
4. `/blog`
5. `/contact`

### Auth Pages

1. `/login`
2. `/register`
3. `/forgot-password`
4. `/reset-password`

### Student Pages

1. `/dashboard`
2. `/dashboard/courses`
3. `/dashboard/courses/:courseId`
4. `/dashboard/courses/:courseId/lessons/:lessonId`
5. `/dashboard/subscriptions`
6. `/dashboard/bookings`
7. `/dashboard/profile`
8. `/dashboard/support`

### Admin Pages

1. `/admin`
2. `/admin/users`
3. `/admin/roles`
4. `/admin/courses`
5. `/admin/courses/:courseId`
6. `/admin/subscriptions`
7. `/admin/bookings`
8. `/admin/support`

## Frontend Build Order

Since the frontend will be built before the backend, use mock data and realistic UI flows.

### Phase 1: App Structure

1. Set up folder structure.
2. Add route groups for public, auth, student, and admin.
3. Create shared layout components.

### Phase 2: Authentication UI

1. Login page
2. Register page
3. Forgot password page

### Phase 3: Student Dashboard UI

1. Dashboard home
2. My courses
3. Course details
4. Lesson player page
5. Subscriptions page
6. Bookings page
7. Profile page
8. Support page

### Phase 4: Admin Dashboard UI

1. Admin dashboard home
2. Users page
3. Roles page
4. Courses page
5. Subscriptions page
6. Bookings page
7. Support page

### Phase 5: Frontend Integration Preparation

1. Replace raw mock data with service layer functions.
2. Define API request shapes.
3. Add route protection placeholders.
4. Prepare forms to match backend payloads.

## Backend Preview

Backend will be built after the frontend phase.

Recommended stack:

1. Node.js
2. Express.js
3. MongoDB
4. Mongoose
5. JWT authentication

Suggested backend modules:

1. auth
2. users
3. roles
4. courses
5. lessons
6. subscriptions
7. bookings
8. support

## Proposed Frontend Folder Direction

When restructuring the frontend, aim for:

```text
src/
  assets/
  components/
    common/
    layout/
    marketing/
    student/
    admin/
  pages/
    public/
    auth/
    student/
    admin/
  features/
    auth/
    users/
    courses/
    subscriptions/
    bookings/
    support/
  services/
  hooks/
  context/
  routes/
  types/
  utils/
```

## Open Decisions

These should be clarified before backend implementation:

1. Which payment gateway will be used for mentorship and VIP subscriptions.
2. Whether course videos will be hosted on Cloudinary, Vimeo, YouTube private links, or another platform.
3. Whether bookings are for tour events, consultations, or both.
4. Whether admin-created users are allowed or registration is only public self-signup.
5. Whether VIP signals access is only a subscription record or should later connect to Telegram/community automation.

## Immediate Next Step

Start frontend work from this blueprint in the following order:

1. Refine folder structure.
2. Create route shells.
3. Build auth pages.
4. Build student dashboard pages.
5. Build admin dashboard pages.
6. Only after that, begin backend implementation.
