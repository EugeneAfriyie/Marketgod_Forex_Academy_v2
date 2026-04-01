import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Calculator, Download, ExternalLink, FileText, FolderArchive, LineChart, Link2, Share2, Crown, Loader2, CheckCircle2, XCircle, Lock } from "lucide-react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";
import { useLanguage } from "../../context/LanguageContext";

const categories = [
  { id: "all", label: { en: "All Resources", fr: "Toutes les Ressources" } },
  { id: "downloads", label: { en: "Cheat Sheets & PDFs", fr: "Fiches Pratiques" } },
  { id: "tools", label: { en: "Trading Tools", fr: "Outils de Trading" } },
  { id: "links", label: { en: "Platforms & Links", fr: "Plateformes & Liens" } },
  { id: "archives", label: { en: "Archives", fr: "Archives" } },
];

const resources: any[] = [
  { slug: "pdf-guides", category: "downloads", title: "PDF Cheat Sheets", type: "Collection", desc: "A library of our most valuable, printable PDF guides and checklists.", icon: FileText, action: "View Collection", isCollection: true },
  { category: "tools", title: "Risk & Lot Size Calculator", type: "Internal Tool", desc: "Calculate your position size, lot size, and account exposure instantly.", icon: Calculator, action: "Open Tool", link: "/dashboard/tools" },
  { category: "tools", title: "Trading Journal Template", type: "Notion Template", desc: "Track your wins, losses, and psychological state for every trade.", icon: FileText, action: "Duplicate", link: "#" },
  { category: "links", title: "Exness Broker", type: "Recommended Platform", desc: "The broker we trust for tight spreads and instant withdrawals.", icon: Link2, action: "Sign Up", link: "https://one.exnessonelink.com/boarding/sign-up/303589/a/eyram", external: true },
  { category: "links", title: "Marketgod Chart Layout", type: "TradingView", desc: "Copy Eyram's exact clean, black-and-white TradingView layout.", icon: LineChart, action: "Copy Layout", link: "#", external: true },
  { slug: "social-media", category: "links", title: "Official Social Media", type: "Collection", desc: "Connect with us across all our official platforms and channels.", icon: Share2, action: "View Collection", isCollection: true },
  { slug: "video-archives", category: "archives", title: "Video Archives", type: "Collection", desc: "Browse our full library of past live sessions and weekly breakdowns.", icon: FolderArchive, action: "View Collection", isCollection: true },
  { slug: "bootcamp-archives", category: "archives", title: "Bootcamp Archives", type: "Premium Collection", desc: "Past intensive bootcamp recordings and workshops.", icon: FolderArchive, action: "View Collection", isCollection: true, isPremium: true },
];

export default function ResourcesPage() {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const isDark = theme === "dark";
  const isFrench = language === "fr";
  const navigate = useNavigate();

  const [activeCategory, setActiveCategory] = useState("all");
  
  // Mock Premium User State
  const [isPremiumUser, setIsPremiumUser] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [paymentState, setPaymentState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [pendingResource, setPendingResource] = useState<any>(null);

  const handleProcessPayment = () => {
    setPaymentState('loading');
    setTimeout(() => {
      const isSuccess = Math.random() > 0.2; // 80% success rate
      if (isSuccess) {
        setPaymentState('success');
        setTimeout(() => {
          setIsPremiumUser(true);
          setShowUpgradeModal(false);
          setPaymentState('idle');
          if (pendingResource) {
            if (pendingResource.isCollection) navigate(`/dashboard/resources/${pendingResource.slug}`);
            else if (!pendingResource.external && pendingResource.link !== "#") navigate(pendingResource.link);
            else if (pendingResource.external) window.open(pendingResource.link, '_blank');
          }
        }, 2000);
      } else {
        setPaymentState('error');
      }
    }, 2000);
  };

  const filteredResources = activeCategory === "all" 
    ? resources 
    : resources.filter(r => r.category === activeCategory);

  const container: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
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
                  if (resource.isPremium && !isPremiumUser) {
                    e.preventDefault();
                    setPendingResource(resource);
                    setShowUpgradeModal(true);
                    setPaymentState('idle');
                    return;
                  }
                  if (resource.isCollection) {
                    e.preventDefault();
                    navigate(`/dashboard/resources/${resource.slug}`);
                  } else if (!resource.external && resource.link && resource.link !== "#") {
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
                    <div className={`flex items-center gap-2 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${isDark ? "border-white/10 text-white/50" : "border-black/10 text-gray-500"}`}>
                      {resource.isPremium && !isPremiumUser && (
                         <Lock size={12} className="text-mg-gold" />
                      )}
                      <span>{resource.type}</span>
                    </div>
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

      {/* Premium Upgrade Modal */}
      <AnimatePresence>
        {showUpgradeModal && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className={`w-full max-w-md overflow-hidden rounded-3xl border shadow-2xl ${isDark ? "border-white/10 bg-[#111111]" : "border-black/10 bg-white"}`}
            >
              <AnimatePresence mode="wait">
                {paymentState === 'idle' && (
                  <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                    <div className={`p-6 border-b ${isDark ? "bg-white/5 border-white/10" : "bg-black/5 border-black/10"}`}>
                      <h3 className={`text-xl font-bold flex items-center gap-3 ${isDark ? "text-white" : "text-gray-900"}`}>
                        <Crown size={24} className="text-mg-gold" />
                        {isFrench ? "Accès VIP Requis" : "VIP Access Required"}
                      </h3>
                    </div>
                    <div className="p-6">
                      <p className={`text-sm mb-6 leading-relaxed ${isDark ? "text-white/60" : "text-gray-600"}`}>
                        {isFrench 
                          ? "Ce contenu est réservé aux membres VIP de MarketGod. Abonnez-vous à notre mentorat premium pour débloquer cet outil et tout autre contenu exclusif." 
                          : "This material is reserved for MarketGod VIP members. Subscribe to our premium mentorship to unlock this and all other exclusive content."}
                      </p>
                      <div className="mb-8 flex justify-between items-center">
                        <span className={`font-bold ${isDark ? "text-white" : "text-gray-900"}`}>{isFrench ? "Abonnement Annuel" : "Annual Subscription"}</span>
                        <span className="text-xl font-black text-mg-gold">$499.00</span>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-3">
                        <button onClick={() => setShowUpgradeModal(false)} className={`flex-1 rounded-xl border px-4 py-3 text-sm font-semibold transition-colors ${isDark ? "border-white/10 text-white hover:bg-white/5" : "border-black/10 text-gray-900 hover:bg-black/5"}`}>
                          {isFrench ? "Annuler" : "Cancel"}
                        </button>
                        <button onClick={handleProcessPayment} className="flex-1 rounded-xl bg-mg-gold px-4 py-3 text-sm font-black uppercase tracking-wider text-black transition-transform hover:scale-[1.02] hover:shadow-[0_0_15px_rgba(212,175,55,0.4)]">
                          {isFrench ? "Payer" : "Pay Now"}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
                {paymentState === 'loading' && (
                  <motion.div key="loading" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="flex flex-col items-center justify-center p-10 text-center">
                    <Loader2 size={48} className="mb-6 animate-spin text-mg-gold" />
                    <h3 className={`text-xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>{isFrench ? "Traitement..." : "Processing..."}</h3>
                  </motion.div>
                )}
                {paymentState === 'success' && (
                  <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="flex flex-col items-center justify-center p-10 text-center">
                    <CheckCircle2 size={56} className="mb-6 text-green-500" />
                    <h3 className={`text-xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>{isFrench ? "Paiement Réussi !" : "Payment Successful!"}</h3>
                  </motion.div>
                )}
                {paymentState === 'error' && (
                  <motion.div key="error" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="flex flex-col items-center justify-center p-10 text-center">
                    <XCircle size={56} className="mb-6 text-red-500" />
                    <h3 className={`text-xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>{isFrench ? "Échec du paiement" : "Payment Failed"}</h3>
                    <div className="mt-6 flex w-full gap-3">
                      <button onClick={() => setShowUpgradeModal(false)} className={`flex-1 rounded-xl border px-4 py-3 text-sm font-semibold transition-colors ${isDark ? "border-white/10 text-white hover:bg-white/5" : "border-black/10 text-gray-900 hover:bg-black/5"}`}>{isFrench ? "Annuler" : "Cancel"}</button>
                      <button onClick={() => setPaymentState('idle')} className="flex-1 rounded-xl bg-mg-gold px-4 py-3 text-sm font-black uppercase tracking-wider text-black transition-transform hover:scale-[1.02]">{isFrench ? "Réessayer" : "Try Again"}</button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
