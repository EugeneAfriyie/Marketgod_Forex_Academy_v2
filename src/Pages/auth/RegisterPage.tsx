import { useMemo, useState } from "react";
import AuthLayout from "../../Components/layout/AuthLayout";
import AuthField from "../../Components/common/AuthField";
import { useTheme } from "../../context/ThemeContext";

export default function RegisterPage() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [touched, setTouched] = useState(false);

  const errors = useMemo(() => {
    if (!touched) return {};

    return {
      fullName: fullName.trim() ? "" : "Full name is required.",
      email: email.trim() ? "" : "Email is required.",
      password: password.trim() ? "" : "Password is required.",
      confirmPassword:
        confirmPassword.trim() && confirmPassword === password
          ? ""
          : "Passwords must match.",
    };
  }, [confirmPassword, email, fullName, password, touched]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setTouched(true);
  };

  return (
    <AuthLayout
      imagePosition="right"
      eyebrow="Create Account"
      title="Join Marketgod and unlock your student portal."
      description="Create your account to manage subscriptions, access paid course videos, track bookings, and prepare for the full mentorship experience."
      asideTitle="Built for serious learners."
      asideDescription="This registration flow is the entry point into the protected platform. Later it will connect directly to the MongoDB backend and role-based access system."
      highlights={["Profile setup", "Course access", "Future dashboard"]}
      footerPrompt="Already have an account?"
      footerLinkLabel="Sign in"
      footerLinkTo="/login"
    >
      <form onSubmit={handleSubmit} className="grid gap-5 md:grid-cols-2">
        <div className="md:col-span-2">
          <AuthField
            id="register-name"
            label="Full name"
            value={fullName}
            onChange={setFullName}
            placeholder="Enter your full name"
            error={errors.fullName}
          />
        </div>

        <AuthField
          id="register-email"
          label="Email address"
          type="email"
          value={email}
          onChange={setEmail}
          placeholder="you@example.com"
          error={errors.email}
        />

        <AuthField
          id="register-phone"
          label="Phone number"
          value={phone}
          onChange={setPhone}
          placeholder="+233..."
        />

        <AuthField
          id="register-password"
          label="Password"
          type="password"
          value={password}
          onChange={setPassword}
          placeholder="Create a password"
          error={errors.password}
        />

        <AuthField
          id="register-confirm-password"
          label="Confirm password"
          type="password"
          value={confirmPassword}
          onChange={setConfirmPassword}
          placeholder="Repeat your password"
          error={errors.confirmPassword}
        />

        <div className="md:col-span-2 space-y-4">
          <label className={`inline-flex items-start gap-3 text-sm ${isDark ? "text-white/70" : "text-mg-light-textSecondary/80"}`}>
            <input
              type="checkbox"
              className={`mt-1 h-4 w-4 rounded bg-transparent accent-mg-gold ${isDark ? "border-white/20" : "border-black/20"}`}
            />
            I agree to the platform terms and understand this account will later connect to protected student access and subscriptions.
          </label>

          <button
            type="submit"
            className="w-full rounded-2xl bg-mg-gold px-5 py-4 text-sm font-bold uppercase tracking-[0.25em] text-black transition hover:brightness-110"
          >
            Create Account
          </button>
        </div>
      </form>
    </AuthLayout>
  );
}
