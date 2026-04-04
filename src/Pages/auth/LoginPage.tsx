import { Link, useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import AuthLayout from "../../Components/layout/AuthLayout";
import AuthField from "../../Components/common/AuthField";
import { useTheme } from "../../context/ThemeContext";

export default function LoginPage() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [touched, setTouched] = useState(false);
  const navigate = useNavigate();

  const errors = useMemo(() => {
    if (!touched) return {};

    return {
      email: email.trim() ? "" : "Email is required.",
      password: password.trim() ? "" : "Password is required.",
    };
  }, [email, password, touched]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setTouched(true);

    // Proceed if there are no validation errors
    if (email.trim() && password.trim()) {
      navigate("/dashboard");
    }
  };

  return (
    <AuthLayout
      imagePosition="left"
      eyebrow="Welcome Back"
      title="Sign in to your Marketgod account."
      description="Access mentorship content, VIP products, bookings, and your dashboard."
      asideTitle="Premium access starts here."
      asideDescription="Secure entry into the student and admin experience."
      highlights={["Mentorship access", "VIP subscriptions", "Protected lessons"]}
      footerPrompt="Need an account?"
      footerLinkLabel="Create one"
      footerLinkTo="/register"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <AuthField
          id="login-email"
          label="Email address"
          type="email"
          value={email}
          onChange={setEmail}
          placeholder="you@example.com"
          error={errors.email}
        />

        <AuthField
          id="login-password"
          label="Password"
          type="password"
          value={password}
          onChange={setPassword}
          placeholder="Enter your password"
          error={errors.password}
        />

        <div className="flex items-center justify-between gap-4 text-sm">
          <label className={`inline-flex items-center gap-2 ${isDark ? "text-white/70" : "text-mg-light-textSecondary/80"}`}>
            <input
              type="checkbox"
              className={`h-4 w-4 rounded bg-transparent accent-mg-gold ${isDark ? "border-white/20" : "border-black/20"}`}
            />
            Remember me
          </label>

          <Link to="/forgot-password" className={`font-semibold text-mg-gold transition ${isDark ? "hover:text-white" : "hover:text-mg-light-text"}`}>
            Forgot password?
          </Link>
        </div>

        <button
          type="submit"
          className="w-full rounded-2xl bg-mg-gold px-5 py-3.5 text-sm font-bold uppercase tracking-[0.25em] text-black transition hover:brightness-110"
        >
          Sign In
        </button>
      </form>
    </AuthLayout>
  );
}



