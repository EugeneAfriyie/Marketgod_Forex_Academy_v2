import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../../Components/layout/AuthLayout";
import AuthField from "../../Components/common/AuthField";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [touched, setTouched] = useState(false);
  const navigate = useNavigate();

  const errors = useMemo(() => {
    if (!touched) return {};

    return {
      email: email.trim() ? "" : "Email is required.",
    };
  }, [email, touched]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setTouched(true);

    // Proceed if there are no validation errors
    if (email.trim()) {
      navigate("/login");
    }
  };

  return (
    <AuthLayout
      eyebrow="Recovery"
      title="Reset your password."
      description="Enter your account email to start recovery."
      asideTitle="Security matters."
      asideDescription="A clean recovery flow for secure account access."
      highlights={["Account recovery", "Secure reset flow", "Backend-ready form"]}
      footerPrompt="Remembered your password?"
      footerLinkLabel="Go to login"
      footerLinkTo="/login"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <AuthField
          id="forgot-email"
          label="Email address"
          type="email"
          value={email}
          onChange={setEmail}
          placeholder="you@example.com"
          error={errors.email}
        />

        <button
          type="submit"
          className="w-full rounded-2xl bg-mg-gold px-5 py-4 text-sm font-bold uppercase tracking-[0.25em] text-black shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all duration-300 hover:scale-[1.02] hover:bg-yellow-400 hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] active:scale-[0.98]"
        >
          Send Reset Link
        </button>
      </form>
    </AuthLayout>
  );
}



