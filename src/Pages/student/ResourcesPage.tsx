import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Calculator, Download, ExternalLink, FileText, FolderArchive, LineChart, Link2, PlayCircle, Share2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";
import { useLanguage } from "../../context/LanguageContext";

const categories = [
  { id: "all", label: { en: "All Resources", fr: "Toutes les Ressources" } },
  { id: "downloads", label: { en: "Cheat Sheets & PDFs", fr: "Fiches Pratiques" } },
  { id: "tools", label: { en: "Trading Tools", fr: "Outils de Trading" } },
  { id: "links", label: { en: "Platforms & Links", fr: "Plateformes & Liens" } },
  { id: "archives", label: { en: "Archives", fr: "Archives" } },
];

const resources = [
  { slug: "pdf-guides", category: "downloads", title: "PDF Cheat Sheets", type: "Collection", desc: "A library of our most valuable, printable PDF guides and checklists.", icon: FileText, action: "View Collection", isCollection: true },
  { category: "tools", title: "Risk & Lot Size Calculator", type: "Internal Tool", desc: "Calculate your position size, lot size, and account exposure instantly.", icon: Calculator, action: "Open Tool", link: "/dashboard/tools" },
  { category: "tools", title: "Trading Journal Template", type: "Notion Template", desc: "Track your wins, losses, and psychological state for every trade.", icon: FileText, action: "Duplicate", link: "#" },
  { category: "links", title: "Exness Broker", type: "Recommended Platform", desc: "The broker we trust for tight spreads and instant withdrawals.", icon: Link2, action: "Sign Up", link: "https://one.exnessonelink.com/boarding/sign-up/303589/a/eyram", external: true },
  { category: "links", title: "Marketgod Chart Layout", type: "TradingView", desc: "Copy Eyram's exact clean, black-and-white TradingView layout.", icon: LineChart, action: "Copy Layout", link: "#", external: true },
  { slug: "social-media", category: "links", title: "Official Social Media", type: "Collection", desc: "Connect with us across all our official platforms and channels.", icon: Share2, action: "View Collection", isCollection: true },
  { slug: "video-archives", category: "archives", title: "Video Archives", type: "Collection", desc: "Browse our full library of past live sessions and weekly breakdowns.", icon: FolderArchive, action: "View Collection", isCollection: true },
  { slug: "bootcamp-archives", category: "archives", title: "Bootcamp Archives", type: "Premium Collection", desc: "Past intensive bootcamp recordings and workshops.", icon: FolderArchive, action: "View Collection", isCollection: true },
];

export default function ResourcesPage() {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const isDark = theme === "dark";
  const isFrench = language === "fr";
  const navigate = useNavigate();

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
                href={resource.isCollection ? `/dashboard/resources/${resource.slug}` : resource.link}
                onClick={(e) => {
                  if (resource.isCollection) {
                    e.preventDefault();
                    navigate(`/dashboard/resources/${resource.slug}`);
                  } else if (!resource.external && resource.link !== "#") {
                    e.preventDefault();
                    navigate(resource.link);
                  }
                }}
                target={!resource.isCollection && resource.external ? "_blank" : undefined}
                rel={!resource.isCollection && resource.external ? "noreferrer" : undefined}
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
                    {isFrench && resource.action === "View Collection" ? "Voir la Collection" : isFrench && resource.action === "Download" ? "Télécharger" : isFrench && resource.action === "Open Tool" ? "Ouvrir l'Outil" : resource.action}
                  </span>
                  <div className={`flex h-8 w-8 items-center justify-center rounded-full transition-transform group-hover:translate-x-1 ${isDark ? "bg-white/5" : "bg-black/5"}`}>
                    {resource.isCollection ? (
                      <ArrowRight size={16} className="text-mg-gold" />
                    ) : resource.link === "/dashboard/tools" ? (
                      <ArrowRight size={16} className="text-mg-gold" />
                    ) : resource.external ? (
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
