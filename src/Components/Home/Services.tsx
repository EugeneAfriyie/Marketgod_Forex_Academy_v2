// src/components/Services/Services.tsx
import { motion } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";
import {
  UserCheck,
  Signal,
  Presentation,
  Users,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

const Services = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const services = [
    {
      number: "01",
      icon: UserCheck,
      title: "Mentorship Program",
      desc: "Unlock your full potential with personalized guidance. Our mentorship program offers structured learning and direct access to expert insights.",
      highlights: [
        "Weekly coaching sessions",
        "Market psychology training",
        "Trade analysis and feedback",
      ],
      cta: "Join Mentorship",
      href: "plans/#pricing",
    },
    {
      number: "02",
      icon: Signal,
      title: "Market Insights",
      desc: "Receive professional, high-probability trade setups and market analysis daily. We focus on Gold, Forex, and key market opportunities.",
      highlights: [
        "Daily market outlook",
        "Clear entry/exit zones",
        "Session-based analysis",
      ],
      cta: "Access Insights",
      href: "plans/#signals",
    },
    {
      number: "03",
      icon: Presentation,
      title: "Workshops & Webinars",
      desc: "Join our live educational sessions to master new strategies. Learn risk management and market behavior directly from industry experts.",
      highlights: [
        "Monthly global webinars",
        "Interactive Q&A sessions",
        "Live market walkthroughs",
      ],
      cta: "View Events",
      href: "#webinars",
    },
    {
      number: "04",
      icon: Users,
      title: "Trader Community",
      desc: "Connect with a global network of traders. Share knowledge, discuss strategies, and grow together in a supportive, professional environment.",
      highlights: [
        "Active discussion groups",
        "Trade idea sharing",
        "Professional development",
      ],
      cta: "Join Community",
      href: "https://t.me/marketgodcommunity",
    },
  ];

  return (
    <section
      id="services"
      className={`relative py-28 ${
        isDark ? "bg-black text-white" : "bg-white text-gray-900"
      }`}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center max-w-4xl mx-auto mb-20 px-6"
      >
        <h2 className="text-5xl md:text-6xl font-black leading-tight">
          A Complete Trading Ecosystem
        </h2>
        <p
          className={`mt-6 text-lg md:text-xl ${
            isDark ? "text-gray-300" : "text-gray-700"
          } leading-relaxed`}
        >
          We've built a complete ecosystem to support your journey, from foundational education and community support to expert insights and direct mentorship.
        </p>
      </motion.div>

      {/* Service Cards */}
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-10 px-6">
        {services.map((service, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            whileHover={{ y: -6 }}
            className={`relative p-8 rounded-3xl border ${
              isDark
                ? "bg-white/5 border-gray-700 hover:border-mg-gold"
                : "bg-gray-50 border-gray-200 hover:border-mg-gold"
            } transition-all cursor-pointer group`}
          >
            {/* Number */}
            <div className="absolute top-6 right-6 text-5xl font-black text-mg-black/10 dark:text-mg-white/10 select-none">
              {service.number}
            </div>

            {/* Icon */}
            <div className="mb-6">
              <service.icon
                size={46}
                className="text-mg-gold group-hover:text-gray-800 transition-colors"
              />
            </div>

            {/* Title */}
            <h3 className="text-2xl font-bold mb-3">{service.title}</h3>

            {/* Description */}
            <p
              className={`text-base leading-relaxed mb-6 ${
                isDark ? "text-gray-400" : "text-gray-700"
              }`}
            >
              {service.desc}
            </p>

            {/* Highlights */}
            <ul className="space-y-2 mb-8">
              {service.highlights.map((feat, j) => (
                <li key={j} className="flex items-center gap-2 text-sm">
                  <CheckCircle size={16} className="text-mg-gold" /> {feat}
                </li>
              ))}
            </ul>

            {/* CTA */}
            <motion.a
              href={service.href}
              whileHover={{ x: 4 ,boxShadow: "0 0 25px rgba(212,175,55,0.5)" }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold bg-mg-black dark:bg-mg-dark-text dark:text-mg-black text-white hover:bg-black transition-all"
            >
              {service.cta} <ArrowRight size={18} />
            </motion.a>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Services;



