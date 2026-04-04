// src/components/Contact/SupportTicketGlassy.tsx
import React, { useEffect, useRef, useState, useMemo } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { Headset, X, CheckCircle2, Copy, Check } from "lucide-react";
import emailjs from "@emailjs/browser";

interface SupportTicketProps {
  isOpen: boolean;
  onClose: () => void;
  emailjsConfig?: {
    serviceId: string;
    templateId: string;        // admin template
    userTemplateId?: string;   // user template (optional)
    publicKey: string;
  };
}

/* -------------------------------------------------
   Default EmailJS config – replace only if you want
   to override from the parent component
   ------------------------------------------------- */
const DEFAULT_CONFIG = {
  serviceId: "service_dn1tgt5",
  templateId: "template_5xoflno",      // ADMIN: To Email = support@marketgodacademy.com
  userTemplateId: "template_xl2wqxw",  // USER:  To Email = {{email}}
  publicKey: "90H-S_Yy2-bFrluTr",
};

const COOLDOWN_HOURS = 1;
const STORAGE_KEY_TIME = "support_last_submit_time";
const STORAGE_KEY_ID = "support_last_ticket_id";

export default function MarketGodSupportTicketModal({
  isOpen,
  onClose,
  emailjsConfig = DEFAULT_CONFIG,
}: SupportTicketProps) {
  /* ------------------- STATE ------------------- */
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    phone: "",
    telegram: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [globalError, setGlobalError] = useState<string | null>(null);
  const [cooldownActive, setCooldownActive] = useState(false);
  const [remainingTime, setRemainingTime] = useState<string>("");

  const modalRef = useRef<HTMLDivElement | null>(null);

  /* ------------------- EMAILJS INIT ------------------- */
  useEffect(() => {
    emailjs.init(emailjsConfig.publicKey);
  }, [emailjsConfig.publicKey]);

  /* ------------------- COOLDOWN LOGIC ------------------- */
  useEffect(() => {
    if (!isOpen) return;

    const lastTime = localStorage.getItem(STORAGE_KEY_TIME);
    const lastId = localStorage.getItem(STORAGE_KEY_ID);

    if (lastTime && lastId) {
      const elapsed = Date.now() - parseInt(lastTime);
      const cooldownMs = COOLDOWN_HOURS * 60 * 60 * 1000;

      if (elapsed < cooldownMs) {
        setCooldownActive(true);
        setTicketId(lastId);
        startCountdown(cooldownMs - elapsed);
      } else {
        clearCooldown();
      }
    }
  }, [isOpen]);

  const startCountdown = (msLeft: number) => {
    const update = () => {
      const remaining =
        msLeft - (Date.now() - parseInt(localStorage.getItem(STORAGE_KEY_TIME)!));
      if (remaining <= 0) {
        clearCooldown();
        return;
      }
      const h = Math.floor(remaining / (1000 * 60 * 60));
      const m = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((remaining % (1000 * 60)) / 1000);
      setRemainingTime(`${h}h ${m}m ${s}s`);
      setTimeout(update, 1000);
    };
    update();
  };

  const clearCooldown = () => {
    localStorage.removeItem(STORAGE_KEY_TIME);
    localStorage.removeItem(STORAGE_KEY_ID);
    setCooldownActive(false);
    setTicketId(null);
    setRemainingTime("");
  };

  /* ------------------- ACCESSIBILITY ------------------- */
  useEffect(() => {
    if (!isOpen || !modalRef.current) return;
    const focusable = modalRef.current.querySelectorAll<HTMLElement>(
      'button, [href], input, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        resetAndClose();
        return;
      }
      if (e.key === "Tab") {
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };
    document.addEventListener("keydown", handler);
    setTimeout(() => first?.focus(), 100);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen, cooldownActive]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        !isLoading &&
        !isSubmitting &&
        modalRef.current &&
        !modalRef.current.contains(e.target as Node)
      ) {
        resetAndClose();
      }
    };
    if (isOpen) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isOpen, isLoading, isSubmitting]);

  /* ------------------- FORM HANDLERS ------------------- */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.email.trim()) newErrors.email = "Email is required.";
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(formData.email))
      newErrors.email = "Invalid email.";
    if (!formData.subject.trim()) newErrors.subject = "Subject is required.";
    if (!formData.message.trim()) newErrors.message = "Message is required.";
    if (!formData.phone.trim()) newErrors.phone = "Phone is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const generateTicketId = () => {
    const date = new Date().toISOString().slice(2, 10).replace(/-/g, "");
    const ms = String(new Date().getMilliseconds()).padStart(3, "0");
    const rand = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `TCK-${date}-${ms}-${rand}`;
  };

  /* ------------------- EMAILJS SEND ------------------- */
  const sendWithEmailJS = async () => {
    const newId = generateTicketId();
    const now = new Date();
    const date = now.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
    const time = now.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
    const current_year = now.getFullYear();

    const telegramHandle = formData.telegram?.trim();
    const telegram_html = telegramHandle
      ? `<a href="https://t.me/${telegramHandle}" style="color:#D4AF37; text-decoration:none;">@${telegramHandle}</a>`
      : '—';

    const params = {
      name: formData.name?.trim() || "—",
      email: formData.email?.trim() || "—",
      phone: formData.phone?.trim() || "—",
      telegram: telegramHandle || "—", // Keep for plain text needs
      telegram_html: telegram_html,   // New variable for the HTML template
      subject: formData.subject?.trim() || "No subject",
      message: formData.message?.trim() || "No message",
      ticket_id: newId,
      date,
      time,
      current_year,
      ticket_url: `https://marketgodacademy.com/ticket/${newId}`,
    };

    try {
      // 1. ADMIN EMAIL (To: support@marketgodacademy.com)
      await emailjs.send(
        emailjsConfig.serviceId,
        emailjsConfig.templateId,
        params,
        emailjsConfig.publicKey
      );

      // 2. USER EMAIL (To: {{email}} in template)
      await emailjs.send(
        emailjsConfig.serviceId,
        emailjsConfig.userTemplateId ?? emailjsConfig.templateId,
        params,
        emailjsConfig.publicKey
      );
    } catch (err: any) {
      throw new Error(err?.text || "Failed to send emails");
    }

    localStorage.setItem(STORAGE_KEY_TIME, Date.now().toString());
    localStorage.setItem(STORAGE_KEY_ID, newId);
    return newId;
  };
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (isSubmitting || cooldownActive) return;

  setIsSubmitting(true);
  setIsLoading(true);
  setGlobalError(null);

  if (!validateForm()) {
    setIsSubmitting(false);
    setIsLoading(false);
    return;
  }

  try {
    // 1. SEND EMAILS
    const newId = await sendWithEmailJS();
    setTicketId(newId);
    setIsSubmitted(true);
    setCooldownActive(true);
    startCountdown(COOLDOWN_HOURS * 60 * 60 * 1000);

    // 2. SEND TO GOOGLE SHEET (AFTER EMAIL SUCCESS)
    const MAKE_WEBHOOK = "https://hook.eu2.make.com/zuwpxtukmk4fjcfvq2bkbc1226a3y46i";
    
    try {
      await fetch(MAKE_WEBHOOK, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          timestamp: new Date().toISOString(),
          ticket_id: newId,
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          telegram: formData.telegram.trim(),
          subject: formData.subject.trim(),
          message: formData.message.trim(),
          status: "New"
        }),
      });
    } catch (err) {
      console.warn("Google Sheet log failed (non-critical)", err);
      // Don't block user if sheet fails
    }

    setTimeout(() => resetAndClose(), 4500);
  } catch (err: any) {
    setGlobalError(err?.text || "Failed to send. Please try again.");
  } finally {
    setIsSubmitting(false);
    setIsLoading(false);
  }
};

  

  const copyTicketId = async () => {
    if (!ticketId) return;
    try {
      await navigator.clipboard.writeText(ticketId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  const resetAndClose = () => {
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
      phone: "",
      telegram: "",
    });
    setErrors({});
    setIsSubmitted(false);
    setGlobalError(null);
    onClose();
  };

  /* ------------------- ANIMATIONS ------------------- */
  const blobVariants = useMemo((): Variants => ({
    float: {
      y: [0, -12, 0],
      x: [0, 8, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        repeatType: "mirror" as const,
        ease: "easeInOut",
      },
    },
  }), []);

  /* ------------------- FIELDS WITH TYPE ------------------- */
  const fields = [
    { key: "name", label: "Full name*", required: true } as const,
    { key: "email", label: "Email address*", required: true } as const,
    { key: "subject", label: "Subject*", required: true, colSpan: true } as const,
    {
      key: "message",
      label: "Describe your issue*",
      required: true,
      colSpan: true,
      textarea: true,
    } as const,
    { key: "phone", label: "Phone number*", required: true } as const,
    { key: "telegram", label: "Telegram (optional)", required: false } as const,
  ] as const;

  type Field = typeof fields[number];

  /* ------------------- RENDER ------------------- */
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="support-title"
          aria-describedby="support-description"
          className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-b from-[#0b0f19]/80 to-[#121826]/80 p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* background blobs */}
          <div className="pointer-events-none absolute -top-24 left-8 w-72 h-72 rounded-full blur-3xl bg-mg-gold/10" />
          <motion.div
            variants={blobVariants}
            animate="float"
            className="pointer-events-none absolute -bottom-28 right-12 w-72 h-72 rounded-full blur-3xl bg-mg-gold/10"
          />

          {/* modal */}
          <motion.div
            ref={modalRef}
            className="relative w-full max-w-2xl rounded-2xl p-1 bg-gradient-to-br from-white/5 to-white/3 border border-mg-gold/20 shadow-[0_8px_40px_rgba(212,175,55,0.1)]"
            initial={{ scale: 0.98, y: 10, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.98, y: 10, opacity: 0 }}
            transition={{ type: "spring", stiffness: 280, damping: 30 }}
          >
            <div className="rounded-2xl bg-[#121826]/70 backdrop-blur-md p-6 md:p-8 border border-mg-gold/10">
              <div className="flex flex-col items-start gap-4">
                {/* header */}
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl  flex items-center justify-center shadow-gold-glow">
                      <Headset className="w-7 h-7 text-gold" />
                    </div>
                    <div>
                      <h3 id="support-title" className="text-xl font-semibold text-white">
                        Contact Support
                      </h3>
                      <p id="support-description" className="text-sm text-[#e6ffffcc] mt-1">
                        We usually reply within <strong>2–4 hours</strong>.
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={resetAndClose}
                    disabled={isLoading || isSubmitting}
                    aria-label="Close"
                    className={`rounded-md p-2 hover:bg-[#ffffff06] transition ${
                      isLoading || isSubmitting ? "opacity-40 cursor-not-allowed" : ""
                    }`}
                  >
                    <X className="w-5 h-5 text-[#e6ffffcc]" />
                  </button>
                </div>

                {/* COOLDOWN SCREEN */}
                {cooldownActive ? (
                  <div className="w-full flex flex-col items-center gap-6 py-8">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-mg-gold to-yellow-500 flex items-center justify-center shadow-lg">
                      <CheckCircle2 className="w-10 h-10 text-white" />
                    </div>
                    <div className="text-center">
                        <h4 className="text-lg font-semibold text-white" aria-live="polite">
                        Ticket Already Sent
                      </h4>
                        <p className="text-sm text-white/80 mt-1">
                        Next ticket in:
                      </p>
                      <p className="text-2xl font-mono text-mg-gold mt-2">
                        {remainingTime}
                      </p>
                    </div>
                    {ticketId && (
                      <div className="inline-flex items-center gap-3 bg-[#0b1220]/60 px-4 py-2 rounded-lg border border-mg-gold/20">
                        <span className="font-mono text-white/80">{ticketId}</span>
                        <motion.button onClick={copyTicketId} className="text-white/80 hover:text-white" aria-label="Copy ticket ID">
                          {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                        </motion.button>
                      </div>
                    )}
                    <button
                      onClick={resetAndClose}
                      className="px-6 py-2 rounded-md text-sm font-medium text-white bg-mg-gold/10 hover:bg-mg-gold/20"
                    >
                      Close
                    </button>
                  </div>
                ) : (
                  /* NORMAL FORM */
                  <form onSubmit={handleSubmit} className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                    {fields.map((field: Field) => {
                      const isTextArea = "textarea" in field && field.textarea;
                      const colSpanClass = "colSpan" in field && field.colSpan ? "md:col-span-2" : "";
                      const errorMsg = errors[field.key];
                      const commonProps = {
                        id: field.key,
                        name: field.key,
                        value: formData[field.key as keyof typeof formData],
                        onChange: handleChange,
                        placeholder: " ",
                        className: `peer block w-full rounded-lg border transition-colors ${
                          errorMsg ? "border-rose-500" : "border-[#ffffff0a]"
                        } bg-[#0b1220] px-4 py-3 text-sm text-white placeholder-transparent focus:outline-none focus:ring-2 ${
                          errorMsg ? "focus:ring-rose-500/40" : "focus:ring-[#00ffcc33]"
                        } ${isTextArea ? "resize-none" : ""}`,
                      };

                      return (
                        <div key={field.key} className={`relative ${colSpanClass}`}>
                          {isTextArea ? (
                            <textarea {...commonProps} rows={5} />
                          ) : (
                            <input
                              {...commonProps}
                              type={field.key === "email" ? "email" : "text"}
                            />
                          )}
                          <label
                            htmlFor={field.key}
                            className="absolute left-3 -top-2.5 text-xs bg-[#121826]/70 px-1 text-mg-white/80 peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-placeholder-shown:text-mg-white/70 transition-all"
                          >
                            {field.label}
                          </label>
                          {errorMsg && <p className="text-xs text-rose-400 mt-1">{errorMsg}</p>}
                        </div>
                      );
                    })}

                    {globalError && (
                      <div className="md:col-span-2 text-center text-sm text-rose-500 mt-1">
                        {globalError}
                      </div>
                    )}

                    <div className="md:col-span-2 mt-1">
                      <motion.button
                        type="submit"
                        whileHover={{ scale: isLoading || isSubmitting ? 1 : 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        disabled={isLoading || isSubmitting}
                        className={`w-full rounded-lg py-3.5 font-semibold shadow-xl transition-all flex items-center justify-center gap-3 bg-mg-white text-black ${                isLoading || isSubmitting ? "opacity-80 cursor-not-allowed" : "hover:brightness-105"
                        }`}                      >
                        {isLoading ? (
                          <>
                            <motion.span
                              className="w-5 h-5 border-2 border-black border-t-transparent rounded-full"
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            />
                            Sending...
                          </>
                        ) : (
                          <>
                            <svg
                              className="w-5 h-5 -ml-1"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              aria-hidden
                            >
                              <path d="M2 12L22 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                              <path d="M15 5L21 12L15 19" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            Send Message
                          </>
                        )}
                      </motion.button>
                    </div>
                  </form>
                )}
              </div>
            </div>

            {/* SUCCESS OVERLAY */}
            <AnimatePresence>
              {isSubmitted && !cooldownActive && (
                <motion.div
                  className="absolute inset-0 flex items-center justify-center bg-black/40"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <motion.div
                    className="w-full max-w-md rounded-xl bg-[#121826]/80 backdrop-blur-md p-6 shadow-[0_20px_60px_rgba(212,175,55,0.15)] border border-mg-gold/20"
                    initial={{ scale: 0.9, y: 12, opacity: 0 }}
                    animate={{ scale: 1, y: 0, opacity: 1 }}
                    exit={{ scale: 0.9, y: 12, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 28 }}
                  >
                    <div className="flex flex-col items-center gap-4 text-center">
                      <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-mg-gold to-yellow-500 flex items-center justify-center shadow-lg">
                        <CheckCircle2 className="w-10 h-10 text-gold" />
                      </div>
                      <h4 className="text-lg font-semibold text-white" aria-live="polite">Ticket Sent!</h4>
                      <p className="text-sm text-white/80">
                        Thanks — our team will get back to you soon.
                      </p>
                      <div aria-live="polite" className="sr-only">
                        Support ticket submitted successfully. Ticket ID: {ticketId}
                      </div>
                      {ticketId && (
                        <div className="mt-2 inline-flex items-center gap-3 bg-[#0b1220]/60 px-4 py-2 rounded-lg border border-mg-gold/20">
                          <span className="font-mono text-white/80">{ticketId}</span>
                          <motion.button onClick={copyTicketId} className="text-white/80 hover:text-white" aria-label="Copy ticket ID">
                            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                          </motion.button>
                        </div>
                      )}
                      <button
                        onClick={resetAndClose}
                        className="mt-4 px-4 py-2 rounded-md text-sm font-medium text-white bg-mg-gold/10 hover:bg-mg-gold/20"
                      >
                        Close
                      </button>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}


