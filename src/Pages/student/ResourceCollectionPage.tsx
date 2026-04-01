import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";
import { useLanguage } from "../../context/LanguageContext";
import { ArrowLeft, Download, ExternalLink, FileText, Globe, Instagram, PlayCircle, Send, Twitter, Video, Youtube, X, Crown, Loader2, CheckCircle2, XCircle, Lock } from "lucide-react";

// Mock Data for different resource collections
const collectionsData: Record<string, any> = {
  "pdf-guides": {
    isPremium: false,
    title: { en: "PDF Cheat Sheets", fr: "Fiches Pratiques PDF" },
    description: { en: "Download our most valuable, printable PDF guides and checklists to keep on your trading desk.", fr: "Téléchargez nos guides et listes de contrôle PDF les plus précieux et imprimables à conserver sur votre bureau de trading." },
    items: [
      { title: "Candlestick & Pattern Bible", desc: "A quick visual guide to spotting high-probability reversal patterns.", link: "#", icon: FileText },
      { title: "Session Timing Overlaps", desc: "Visual map of the most volatile hours (London & NY overlap).", link: "#", icon: FileText },
      { title: "Trading Plan Template", desc: "A blank, printable template to build and track your daily rules.", link: "#", icon: FileText },
    ]
  },
  "video-archives": {
    isPremium: false,
    title: { en: "Video Archives", fr: "Archives Vidéo" },
    description: { en: "Browse our full library of past live sessions and weekly breakdowns to sharpen your edge.", fr: "Parcourez notre bibliothèque complète de sessions en direct passées et d'analyses hebdomadaires pour affiner votre avantage." },
    items: [
      { title: "Sunday Market Prep - Q3 2024", desc: "Full archive of the third quarter's weekly market analysis.", link: "#", icon: PlayCircle },
      { title: "Live Session Replays - October", desc: "Raw, unedited replays of every live trading session from October.", link: "#", icon: PlayCircle },
      { title: "Psychology Sessions - Vol. 1", desc: "A collection of talks on mastering the mental game of trading.", link: "#", icon: PlayCircle },
    ]
  },
  "bootcamp-archives": {
    isPremium: true,
    title: { en: "Bootcamp Archives", fr: "Archives des Bootcamps" },
    description: { en: "Access all past intensive bootcamp recordings and exclusive workshop sessions.", fr: "Accédez à tous les enregistrements de nos bootcamps intensifs passés et à nos ateliers exclusifs." },
    items: [
      { title: "Sniper Entry Bootcamp - 2023", desc: "3-day intensive on finding the perfect entry.", link: "#", icon: PlayCircle },
      { title: "Psychology & Risk Bootcamp", desc: "Mastering the mental game and strict risk management.", link: "#", icon: PlayCircle },
      { title: "Account Flipping Workshop", desc: "High-risk, high-reward strategies for small accounts.", link: "#", icon: PlayCircle },
    ]
  },
  "social-media": {
    isPremium: false,
    title: { en: "Official Social Media", fr: "Réseaux Sociaux Officiels" },
    description: { en: "Connect with MarketGod Academy across all our official platforms to stay updated and engage with the community.", fr: "Connectez-vous avec MarketGod Academy sur toutes nos plateformes officielles pour rester informé." },
    items: [
      { title: "Telegram Community", desc: "Join 13k+ members for daily insights and discussions.", link: "https://t.me/marketgodcommunity", icon: Send },
      { title: "Instagram", desc: "Follow @eyram_dela for daily updates and lifestyle content.", link: "https://www.instagram.com/eyram_dela", icon: Instagram },
      { title: "YouTube", desc: "Subscribe for free weekly breakdowns and trading tutorials.", link: "https://www.youtube.com/@marketgodcommunity", icon: Youtube },
      { title: "X (Twitter)", desc: "Follow @eyramdela for quick market thoughts and updates.", link: "https://x.com/eyramdela", icon: Twitter },
      { title: "TikTok", desc: "Short-form trading lessons and quick tips.", link: "https://www.tiktok.com/@marketgodcommunity", icon: Video },
      { title: "Facebook", desc: "Connect with our official Facebook page.", link: "https://web.facebook.com/eyram.akpey", icon: Globe },
    ]
  }
};

export default function ResourceCollectionPage() {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const isDark = theme === "dark";
  const isFrench = language === "fr";
  const navigate = useNavigate();
  const { collectionId } = useParams();
  
  // State to manage the active video for the modal
  const [activeVideo, setActiveVideo] = useState<{title: string, desc: string, link: string} | null>(null);
  
  // Premium Lock States
  const [isPremiumUser, setIsPremiumUser] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentState, setPaymentState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleProcessPayment = () => {
    setPaymentState('loading');
    setTimeout(() => {
      const isSuccess = Math.random() > 0.2;
      if (isSuccess) {
        setPaymentState('success');
        setTimeout(() => {
          setIsPremiumUser(true);
          setShowPaymentModal(false);
          setPaymentState('idle');
        }, 2000);
      } else {
        setPaymentState('error');
      }
    }, 2000);
  };

  // Check if the current collection is meant for video playback
  const isVideoCollection = collectionId === 'video-archives' || collectionId === 'bootcamp-archives';
  
  // Lock body scroll when modal is open
  if (typeof window !== 'undefined') { document.body.style.overflow = activeVideo ? 'hidden' : 'auto'; }

  const collection = collectionId ? collectionsData[collectionId as keyof typeof collectionsData] : null;

  if (!collection) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-8">
        <h1 className="text-2xl font-bold">Collection Not Found</h1>
        <p className="mt-2 text-mg-light-textSecondary dark:text-mg-dark-textSecondary">This resource collection does not exist.</p>
        <button onClick={() => navigate(-1)} className="mt-6 rounded-xl bg-mg-gold px-6 py-3 text-sm font-bold text-black">Go Back</button>
      </div>
    );
  }

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  return (
    <div className="space-y-8 pb-10">
      <motion.div initial="hidden" animate="show" variants={container}>
        <motion.button
          variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
          onClick={() => navigate(-1)}
          className={`group inline-flex items-center gap-2 text-sm font-medium transition-colors ${
            isDark ? "text-white/60 hover:text-white" : "text-gray-600 hover:text-black"
          }`}
        >
          <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
          {isFrench ? "Retour aux Ressources" : "Back to Resources"}
        </motion.button>
      </motion.div>

      <motion.div initial="hidden" animate="show" variants={container} className={`relative overflow-hidden rounded-[3rem] border shadow-lg ${isDark ? "border-white/5 bg-[#0a0a0a]" : "border-black/5 bg-white"}`}>
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-mg-gold/10 blur-[100px] rounded-full pointer-events-none" />
        <div className="relative z-10 p-8 md:p-12 lg:p-16">
          <h1 className={`text-4xl md:text-5xl font-black mb-4 tracking-tight ${isDark ? "text-white" : "text-gray-900"}`}>
            {isFrench ? collection.title.fr : collection.title.en}
          </h1>
          <p className={`max-w-2xl text-lg font-medium ${isDark ? "text-white/70" : "text-gray-600"}`}>
            {isFrench ? collection.description.fr : collection.description.en}
          </p>
        </div>
      </motion.div>

      {/* Content Area - Check for Premium Lock */}
      {collection.isPremium && !isPremiumUser ? (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className={`flex flex-col items-center text-center p-12 md:p-16 border rounded-[3rem] shadow-xl ${isDark ? "bg-[#111111] border-white/5" : "bg-white border-black/5"}`}>
           <div className="p-5 rounded-full bg-mg-gold/10 text-mg-gold mb-6 shadow-[0_0_20px_rgba(212,175,55,0.2)]">
             <Lock size={40} />
           </div>
           <h2 className={`text-2xl md:text-4xl font-black mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>
             {isFrench ? "Accès VIP Requis" : "VIP Access Required"}
           </h2>
           <p className={`text-lg max-w-xl font-medium mb-10 ${isDark ? "text-white/60" : "text-gray-600"}`}>
             {isFrench ? "Les archives des bootcamps sont réservées aux membres VIP. Abonnez-vous à notre mentorat premium pour débloquer ce contenu exclusif." : "The Bootcamp Archives are reserved for MarketGod VIP members. Subscribe to our premium mentorship to unlock this exclusive content."}
           </p>
           <button onClick={() => setShowPaymentModal(true)} className="inline-flex items-center gap-3 rounded-2xl bg-mg-gold px-10 py-5 text-sm font-black uppercase tracking-wider text-black hover:scale-105 shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all">
             <Crown size={20} />
             {isFrench ? "S'abonner au VIP" : "Subscribe to VIP"}
           </button>
        </motion.div>
      ) : (
      <motion.div 
        layout 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="space-y-4"
      >
        {collection.items.map((resource: any, idx: number) => {
          const Icon = resource.icon;
          return (
            <motion.a
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 + 0.3 }}
              key={resource.title}
              href={resource.link}
              target="_blank"
              onClick={(e) => {
                if (isVideoCollection) {
                  e.preventDefault(); // Stop from opening new tab
                  setActiveVideo(resource); // Open modal instead
                }
              }}
              rel="noreferrer"
              className={`group flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-[2rem] border p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
                isDark 
                  ? "border-white/5 bg-[#111111] hover:border-mg-gold/30" 
                  : "border-black/5 bg-white hover:border-mg-gold/30"
              }`}
            >
              <div className="flex items-center gap-5">
                <div className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-mg-gold/10 text-mg-gold">
                  <Icon size={24} />
                </div>
                <div>
                  <h3 className={`font-bold tracking-tight ${isDark ? "text-white" : "text-gray-900"}`}>
                    {resource.title}
                  </h3>
                  <p className={`text-sm font-medium ${isDark ? "text-white/60" : "text-gray-600"}`}>
                    {resource.desc}
                  </p>
                </div>
              </div>
              <button className="w-full sm:w-auto shrink-0 flex items-center justify-center gap-2 rounded-xl bg-mg-gold px-6 py-3 text-sm font-bold text-black transition-transform hover:scale-105 shadow-[0_0_15px_rgba(212,175,55,0.4)]">
                {collectionId === 'pdf-guides' ? <Download size={16} /> : collectionId === 'social-media' ? <ExternalLink size={16} /> : <PlayCircle size={16} />}
                <span>{collectionId === 'pdf-guides' ? (isFrench ? 'Télécharger' : 'Download') : collectionId === 'social-media' ? (isFrench ? 'Ouvrir' : 'Open Link') : (isFrench ? 'Regarder' : 'Watch')}</span>
              </button>
            </motion.a>
          );
        })}
      </motion.div>
      )}

      {/* Video Player Modal */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
            onClick={() => setActiveVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()} // Prevent clicking inside the modal from closing it
              className={`relative w-full max-w-4xl overflow-hidden rounded-[2rem] border shadow-2xl ${isDark ? "border-white/10 bg-[#111111]" : "border-black/10 bg-white"}`}
            >
              <div className={`flex items-center justify-between border-b p-4 px-6 ${isDark ? "border-white/10" : "border-black/10"}`}>
                <h3 className={`font-bold ${isDark ? "text-white" : "text-gray-900"}`}>{activeVideo.title}</h3>
                <button onClick={() => setActiveVideo(null)} className={`rounded-full p-2 transition-colors ${isDark ? "bg-white/10 text-white hover:bg-white/20" : "bg-black/5 text-gray-600 hover:bg-black/10 hover:text-black"}`}>
                  <X size={20} />
                </button>
              </div>
              
              {/* Video Placeholder Area - Replace with actual <video> or <iframe> later */}
              <div className="relative aspect-video w-full bg-black">
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white/40">
                  <PlayCircle size={64} className="mb-4 opacity-50" />
                  <p className="font-semibold uppercase tracking-widest text-sm">Video Player Placeholder</p>
                  <p className="text-xs opacity-60 mt-2 font-mono">Source: {activeVideo.link}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Premium Payment Modal */}
      <AnimatePresence>
        {showPaymentModal && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
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
                      <div className="mb-8 flex justify-between items-center">
                        <span className={`font-bold ${isDark ? "text-white" : "text-gray-900"}`}>{isFrench ? "Abonnement Annuel" : "Annual Subscription"}</span>
                        <span className="text-xl font-black text-mg-gold">$499.00</span>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-3">
                        <button onClick={() => setShowPaymentModal(false)} className={`flex-1 rounded-xl border px-4 py-3 text-sm font-semibold transition-colors ${isDark ? "border-white/10 text-white hover:bg-white/5" : "border-black/10 text-gray-900 hover:bg-black/5"}`}>
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
                      <button onClick={() => setShowPaymentModal(false)} className={`flex-1 rounded-xl border px-4 py-3 text-sm font-semibold transition-colors ${isDark ? "border-white/10 text-white hover:bg-white/5" : "border-black/10 text-gray-900 hover:bg-black/5"}`}>{isFrench ? "Annuler" : "Cancel"}</button>
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