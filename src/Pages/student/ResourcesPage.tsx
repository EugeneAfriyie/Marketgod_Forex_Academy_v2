import { Download, FileText, PlayCircle } from "lucide-react";
import { useState } from "react";
import { Calculator, Download, ExternalLink, FileText, FolderArchive, LineChart, Link2, PlayCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";
import { useLanguage } from "../../context/LanguageContext";
import StudentSectionCard from "../../Components/student/StudentSectionCard";

const categories = [
  { id: "all", label: { en: "All Resources", fr: "Toutes les Ressources" } },
  { id: "downloads", label: { en: "Cheat Sheets & PDFs", fr: "Fiches Pratiques" } },
  { id: "tools", label: { en: "Trading Tools", fr: "Outils de Trading" } },
  { id: "links", label: { en: "Platforms & Links", fr: "Plateformes & Liens" } },
  { id: "archives", label: { en: "Archives", fr: "Archives" } },
];

const resources = [
  { title: "Gold Trading Checklist", type: "PDF Guide", access: "Available now", icon: FileText },
  { title: "Session Timing Cheatsheet", type: "Quick Reference", access: "Available now", icon: Download },
  { title: "Replay Breakdown Library", type: "Video Resource", access: "Weekly updates", icon: PlayCircle },
  { category: "downloads", title: "Candlestick & Pattern Bible", type: "PDF Guide", desc: "A quick visual guide to spotting high-probability reversal patterns.", icon: FileText, action: "Download", link: "#" },
  { category: "downloads", title: "Session Timing Overlaps", type: "Quick Reference", desc: "Visual map of the most volatile hours (London & NY overlap).", icon: Download, action: "Download", link: "#" },
  { category: "downloads", title: "Trading Plan Template", type: "Printable PDF", desc: "A blank, printable template to build and track your daily rules.", icon: FileText, action: "Download", link: "#" },
  
  { category: "tools", title: "Risk & Lot Size Calculator", type: "Excel Sheet", desc: "Input your account size and risk % to get exact lot sizes instantly.", icon: Calculator, action: "Download", link: "#" },
  { category: "tools", title: "Trading Journal Template", type: "Notion Template", desc: "Track your wins, losses, and psychological state for every trade.", icon: FileText, action: "Duplicate", link: "#" },
  
  { category: "links", title: "Exness Broker", type: "Recommended Platform", desc: "The broker we trust for tight spreads and instant withdrawals.", icon: Link2, action: "Sign Up", link: "https://one.exnessonelink.com/boarding/sign-up/303589/a/eyram", external: true },
  { category: "links", title: "Marketgod Chart Layout", type: "TradingView", desc: "Copy Eyram's exact clean, black-and-white TradingView layout.", icon: LineChart, action: "Copy Layout", link: "#", external: true },
  
  { category: "archives", title: "Sunday Market Prep - Q3", type: "Video Archive", desc: "Library of past weekly breakdowns for backtesting studies.", icon: PlayCircle, action: "Watch", link: "#" },
  { category: "archives", title: "Live Session Replays", type: "Video Archive", desc: "Missed the London session? Catch up with raw, unedited replays.", icon: FolderArchive, action: "Access", link: "#" },
];

export default function ResourcesPage() {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const isDark = theme === "dark";
  const isFrench = language === "fr";

  const [activeCategory, setActiveCategory] = useState("all");

  const filteredResources = activeCategory === "all" 
    ? resources 
    : resources.filter(r => r.category === activeCategory);

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <StudentSectionCard
      title={isFrench ? "Ressources" : "Resources"}
      description={
        isFrench
          ? "Une bibliotheque de ressources pour guides, references telechargeables et contenus de revision."
          : "A curated student resource library for guides, downloadable references, and replay material."
      }
    >
      <div className="grid gap-4 lg:grid-cols-3">
        {resources.map((resource) => {
          const Icon = resource.icon;
    <div className="space-y-8 pb-10">
      {/* Hero Section */}
      <motion.div initial="hidden" animate="show" variants={container} className={`relative overflow-hidden rounded-[3rem] border shadow-lg ${isDark ? "border-white/5 bg-[#0a0a0a]" : "border-black/5 bg-white"}`}>
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-mg-gold/10 blur-[100px] rounded-full pointer-events-none" />
        <div className="relative z-10 p-8 md:p-12 lg:p-16">
          <h1 className={`text-4xl md:text-5xl font-black mb-4 tracking-tight ${isDark ? "text-white" : "text-gray-900"}`}>
            {isFrench ? "Le " : "The "}
            <span className="text-mg-gold">{isFrench ? "Coffre." : "Vault."}</span>
          </h1>
          <p className={`max-w-2xl text-lg font-medium ${isDark ? "text-white/70" : "text-gray-600"}`}>
            {isFrench 
              ? "Votre boîte à outils de trading complète. Téléchargez des fiches pratiques, accédez à des calculateurs de risque et copiez nos modèles exacts."
              : "Your complete trading toolkit. Download cheat sheets, access strict risk calculators, and copy our exact chart templates."}
          </p>
        </div>
      </motion.div>

          return (
            <article
              key={resource.title}
              className={`rounded-[1.75rem] border p-5 ${
                isDark ? "border-white/10 bg-black/25" : "border-black/10 bg-[#faf7f0]"
              }`}
            >
              <div className={`inline-flex rounded-2xl p-3 ${isDark ? "bg-mg-gold/12" : "bg-mg-gold/16"}`}>
                <Icon size={20} className="text-mg-gold" />
              </div>
              <h3 className={`mt-4 text-lg font-bold ${isDark ? "text-white" : "text-mg-light-text"}`}>{resource.title}</h3>
              <p className={`mt-2 text-sm ${isDark ? "text-white/58" : "text-mg-light-textSecondary/78"}`}>
                {isFrench
                  ? resource.type === "PDF Guide"
                    ? "Guide PDF"
                    : resource.type === "Quick Reference"
                      ? "Reference Rapide"
                      : "Ressource Video"
                  : resource.type}
              </p>
              <p className="mt-4 text-sm font-semibold text-mg-gold">
                {isFrench ? (resource.access === "Available now" ? "Disponible maintenant" : "Mises a jour hebdomadaires") : resource.access}
              </p>
            </article>
          );
        })}
      </div>
    </StudentSectionCard>
      {/* Category Filters */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ delay: 0.2 }}
        className="flex flex-wrap items-center gap-2 md:gap-3"
      >
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-5 py-2.5 rounded-full text-sm font-bold uppercase tracking-wider transition-all duration-300 ${
              activeCategory === cat.id
                ? "bg-mg-gold text-black shadow-[0_0_15px_rgba(212,175,55,0.4)]"
                : isDark 
                  ? "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white border border-white/5" 
                  : "bg-black/5 text-gray-600 hover:bg-black/10 hover:text-black border border-black/5"
            }`}
          >
            {isFrench ? cat.label.fr : cat.label.en}
          </button>
        ))}
      </motion.div>

      {/* Resources Grid */}
      <motion.div layout className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filteredResources.map((resource, idx) => {
            const Icon = resource.icon;
            
            return (
              <motion.a
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                key={resource.title + idx}
                href={resource.link}
                target={resource.external ? "_blank" : undefined}
                rel={resource.external ? "noreferrer" : undefined}
                className={`group relative flex flex-col justify-between overflow-hidden rounded-[2rem] border p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_15px_30px_-10px_rgba(0,0,0,0.2)] ${
                  isDark 
                    ? "border-white/5 bg-[#111111] hover:border-mg-gold/30 hover:bg-white/[0.02]" 
                    : "border-black/5 bg-white hover:border-mg-gold/30"
                }`}
              >
                <div>
                  <div className="flex items-start justify-between mb-6">
                    <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-mg-gold/10 text-mg-gold transition-transform duration-500 group-hover:scale-110 group-hover:bg-mg-gold group-hover:text-black">
                      <Icon size={24} />
                    </div>
                    <span className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${isDark ? "border-white/10 text-white/50" : "border-black/10 text-gray-500"}`}>
                      {resource.type}
                    </span>
                  </div>
                  
                  <h3 className={`mb-3 text-xl font-black tracking-tight ${isDark ? "text-white" : "text-gray-900"}`}>
                    {resource.title}
                  </h3>
                  <p className={`text-sm leading-relaxed font-medium ${isDark ? "text-white/60" : "text-gray-600"}`}>
                    {resource.desc}
                  </p>
                </div>

                <div className={`mt-8 pt-4 border-t flex items-center justify-between transition-colors ${isDark ? "border-white/10 group-hover:border-mg-gold/30" : "border-black/5 group-hover:border-mg-gold/30"}`}>
                  <span className="text-sm font-bold text-mg-gold uppercase tracking-wider">
                    {isFrench && resource.action === "Download" ? "Télécharger" : resource.action}
                  </span>
                  <div className={`flex h-8 w-8 items-center justify-center rounded-full transition-transform group-hover:translate-x-1 ${isDark ? "bg-white/5" : "bg-black/5"}`}>
                    {resource.external ? (
                      <ExternalLink size={16} className="text-mg-gold" />
                    ) : (
                      <Download size={16} className="text-mg-gold" />
                    )}
                  </div>
                </div>
              </motion.a>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
