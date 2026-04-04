import { useState } from "react";
import { Link } from "react-router-dom";
import { CalendarRange, MapPin,  Video, Clock, ArrowRight, Calendar, Sparkles } from "lucide-react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";
const eventsData = [
    {
        id: "price-action-mastery",
        status: "active",
        isNew: true,
        type: { en: "Free Weekly Webinar", fr: "Webinaire Hebdo Gratuit" },
        title: "Weekly Market Breakdown & Psychology",
        date: "Every Thursday",
        time: "7:00 PM GMT",
        venue: { en: "Live on Telegram", fr: "En direct sur Telegram" },
        city: { en: "Free Community", fr: "Communauté Gratuite" },
        desc: {
            en: "Join our free Telegram community every Thursday for a comprehensive weekly overview. We dive into live market breakdowns, trading psychology sessions, and analyze the charts together. Join the group to access the meeting link!",
            fr: "Rejoignez notre communauté Telegram gratuite chaque jeudi pour un aperçu hebdomadaire complet. Nous plongeons dans des analyses de marché en direct, des sessions de psychologie de trading, et analysons les graphiques ensemble. Rejoignez le groupe pour y accéder !"
        },
        price: { en: "Free", fr: "Gratuit" },
        action: { en: "Join Telegram to Access", fr: "Rejoindre le Telegram" },
        externalLink: "https://t.me/marketgodcommunity",
        icon: Video,
    },
    {
        id: "marketgod-workshop",
        status: "active",
        isNew: true,
        type: { en: "Sniper Seminar", fr: "Séminaire Sniper" },
        title: "MarketGod Strategy Workshop",
        date: "Dec 15, 2025",
        time: "9:00 AM GMT",
        venue: { en: "Virtual Workshop", fr: "Atelier Virtuel" },
        city: { en: "Global (Online)", fr: "Mondial (En ligne)" },
        desc: {
            en: "Half-day interactive session with live trading simulations and 1-on-1 feedback. Limited to 100 spots.",
            fr: "Session interactive d'une demi-journée avec simulations de trading en direct et retours personnalisés."
        },
        price: { en: "$67 (Early Bird)", fr: "67 $ (Prévente)" },
        action: { en: "View Details", fr: "Voir les détails" },
        icon: Calendar,
    },
    {
        id: "ghana-tour-2026",
        status: "active",
        isNew: true,
        type: { en: "National Tour", fr: "Tournée Nationale" },
        title: "Marketgod 2026 Ghana Tour",
        date: "Feb 21 - Apr 25, 2026",
        time: "09:00 AM GMT",
        venue: { en: "6 Cities Across Ghana", fr: "6 Villes à travers le Ghana" },
        city: { en: "Ghana", fr: "Ghana" },
        desc: {
            en: "The stage is set. Market God is bringing hands-on mentorship to six cities across Ghana. Prepare for live sessions and real strategies.",
            fr: "La scène est prête. Market God apporte un mentorat pratique dans six villes à travers le Ghana. Préparez-vous pour des sessions en direct."
        },
        price: { en: "Active Tour", fr: "Tournée Active" },
        action: { en: "View Tour Stops", fr: "Voir les étapes" },
        icon: MapPin,
    },
    {
        id: "q3-review",
        status: "past",
        isNew: false,
        type: { en: "Past Webinar", fr: "Webinaire Passé" },
        title: "Q3 Market Review",
        date: "October 1, 2024",
        time: "7:00 PM GMT",
        venue: { en: "Archived", fr: "Archivé" },
        city: { en: "Global (Online)", fr: "Mondial (En ligne)" },
        desc: {
            en: "A comprehensive review of the Q3 market performance and key takeaways.",
            fr: "Une revue complète de la performance du marché au 3e trimestre et des principaux enseignements."
        },
        price: { en: "Free", fr: "Gratuit" },
        action: { en: "View Details", fr: "Voir les détails" },
        icon: Video,
    },
    {
        id: "ghana-tour-2025",
        status: "past",
        isNew: false,
        type: { en: "Past Tour", fr: "Tournée Passée" },
        title: "Marketgod 2025 Ghana Tour",
        date: "Feb 21 - Apr 25, 2025",
        time: "09:00 AM GMT",
        venue: { en: "Archived", fr: "Archivé" },
        city: { en: "Ghana", fr: "Ghana" },
        desc: {
            en: "The historic 2025 nationwide tour that changed the landscape of Forex in Ghana. Relive the moments and watch the archived breakdowns.",
            fr: "La tournée nationale historique de 2025 qui a changé le paysage du Forex au Ghana. Revivez les moments et regardez les archives."
        },
        price: { en: "Free", fr: "Gratuit" },
        action: { en: "View Archives", fr: "Voir les archives" },
        icon: MapPin,
    }
];
export default function EventsPage() {
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const [activeTab, setActiveTab] = useState<"active" | "past">("active");
    const filteredEvents = eventsData.filter((event) => event.status === activeTab);
    const container: Variants = {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };
    const item: Variants = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } }
    };
    return (<div className="space-y-8 pb-10">
      {/* Hero Section */}
      <motion.div initial="hidden" animate="show" variants={container} className={`relative overflow-hidden rounded-[3rem] border shadow-lg ${isDark ? "border-white/5 bg-[#0a0a0a]" : "border-black/5 bg-white"}`}>
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-mg-gold/10 blur-[100px] rounded-full pointer-events-none"/>
        <div className="relative z-10 p-8 md:p-12 lg:p-16">
          <h1 className={`text-4xl md:text-5xl font-black mb-4 tracking-tight ${isDark ? "text-white" : "text-gray-900"}`}>
            {"Live Trading & "}
            <span className="text-mg-gold">{"Seminars."}</span>
          </h1>
          <p className={`max-w-2xl text-lg font-medium ${isDark ? "text-white/70" : "text-gray-600"}`}>
            {"Join Eyram Dela for live market breakdowns, exclusive virtual workshops, and physical meetups (No AI — just mastery)."}
          </p>
        </div>
      </motion.div>

      {/* Tabs */}
      <motion.div initial="hidden" animate="show" variants={container} className="flex justify-center mb-2">
        <div className={`flex flex-wrap justify-center rounded-xl p-1 border shadow-inner ${isDark ? "bg-[#0f141b] border-white/10" : "bg-white border-black/10"}`}>
          <button onClick={() => setActiveTab('active')} className={`flex items-center gap-1.5 sm:gap-2 px-6 py-2.5 sm:px-10 sm:py-3.5 rounded-lg font-bold text-xs sm:text-sm transition-all ${activeTab === 'active' ? 'bg-mg-gold text-black shadow-md' : isDark ? 'text-white/60 hover:text-white hover:bg-white/5' : 'text-gray-500 hover:text-black hover:bg-black/5'}`}>
            {"Active Events"}
          </button>
          <button onClick={() => setActiveTab('past')} className={`flex items-center gap-1.5 sm:gap-2 px-6 py-2.5 sm:px-10 sm:py-3.5 rounded-lg font-bold text-xs sm:text-sm transition-all ${activeTab === 'past' ? 'bg-mg-gold text-black shadow-md' : isDark ? 'text-white/60 hover:text-white hover:bg-white/5' : 'text-gray-500 hover:text-black hover:bg-black/5'}`}>
            {"Past Events"}
          </button>
        </div>
      </motion.div>

      {/* Events List */}
      <AnimatePresence mode="wait">
        <motion.div key={activeTab} initial="hidden" animate="show" exit={{ opacity: 0, y: -20, transition: { duration: 0.2 } }} variants={container} className="space-y-6">
          {filteredEvents.length > 0 ? (filteredEvents.map((event, idx) => {
            const Icon = event.icon;
            return (<motion.article variants={item} key={idx} className={`group relative overflow-hidden rounded-[2rem] border p-6 md:p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_30px_-10px_rgba(0,0,0,0.2)] ${isDark
                    ? "border-white/5 bg-[#111111] hover:border-mg-gold/30"
                    : "border-black/5 bg-white hover:border-mg-gold/30"}`}>
                  <div className="flex flex-col md:flex-row gap-6 md:gap-10">
                    
                    {/* Left Side: Date / Info */}
                    <div className={`md:w-1/3 flex flex-col justify-center space-y-4 md:border-r ${isDark ? "border-white/10" : "border-black/10"} md:pr-6`}>
                      <div className="inline-flex items-center gap-2">
                        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-mg-gold/10 text-mg-gold">
                          <Icon size={20}/>
                        </span>
                        <div className="flex flex-col gap-1">
                          <span className={`text-xs font-bold uppercase tracking-wider ${isDark ? "text-mg-gold" : "text-mg-gold"}`}>
                            {event.type.en}
                          </span>
                          {event.isNew && (<span className="inline-flex items-center gap-1 w-max rounded-md bg-red-500/10 px-2 py-0.5 text-[10px] font-black text-red-500 uppercase tracking-widest border border-red-500/20">
                              <Sparkles size={10}/>
                              {"New"}
                            </span>)}
                        </div>
                      </div>
                      <div className="space-y-2.5">
                        <div className={`flex items-center gap-3 text-sm font-semibold ${isDark ? "text-white/80" : "text-gray-700"}`}>
                          <CalendarRange size={16} className={isDark ? "text-white/40" : "text-gray-400"}/>
                          {event.date}
                        </div>
                        <div className={`flex items-center gap-3 text-sm font-semibold ${isDark ? "text-white/80" : "text-gray-700"}`}>
                          <Clock size={16} className={isDark ? "text-white/40" : "text-gray-400"}/>
                          {event.time}
                        </div>
                        <div className={`flex items-center gap-3 text-sm font-semibold ${isDark ? "text-white/80" : "text-gray-700"}`}>
                          <MapPin size={16} className={isDark ? "text-white/40" : "text-gray-400"}/>
                          <span>{event.venue.en}</span>
                          <span className={`ml-auto text-xs px-2.5 py-1 rounded-lg font-bold border ${isDark ? "bg-white/5 border-white/10 text-white/50" : "bg-black/5 border-black/10 text-gray-500"}`}>
                            {event.city.en}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Right Side: Details / Action */}
                    <div className="md:w-2/3 flex flex-col justify-between">
                      <div>
                        <h3 className={`text-2xl font-black mb-3 ${isDark ? "text-white" : "text-gray-900"}`}>{event.title}</h3>
                        <p className={`text-sm leading-relaxed font-medium mb-6 ${isDark ? "text-white/60" : "text-gray-600"}`}>
                          {event.desc.en}
                        </p>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-auto">
                        <div className="text-xl font-black text-mg-gold">
                          {event.price.en}
                        </div>
                        {event.externalLink ? (<a href={event.externalLink} target="_blank" rel="noreferrer" className={`inline-flex items-center justify-center gap-2 rounded-xl px-8 py-3.5 text-sm font-bold uppercase tracking-wider transition-all ${event.price.en === "Free" || event.price.en === "N/A" ? "bg-mg-gold text-black shadow-[0_0_15px_rgba(212,175,55,0.4)] hover:scale-105" : `border-2 border-mg-gold text-mg-gold hover:bg-mg-gold/10`}`}>
                            {event.action.en}
                            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1"/>
                          </a>) : (<Link to={`/dashboard/events/${event.id}`} className={`inline-flex items-center justify-center gap-2 rounded-xl px-8 py-3.5 text-sm font-bold uppercase tracking-wider transition-all ${event.price.en === "Free" || event.price.en === "N/A" ? "bg-mg-gold text-black shadow-[0_0_15px_rgba(212,175,55,0.4)] hover:scale-105" : `border-2 border-mg-gold text-mg-gold hover:bg-mg-gold/10`}`}>
                            {event.action.en}
                            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1"/>
                          </Link>)}
                      </div>
                    </div>

                  </div>
                </motion.article>);
        })) : (<div className={`text-center py-20 rounded-[2rem] border ${isDark ? "border-white/5 bg-[#111111]" : "border-black/5 bg-white"}`}>
              <p className={`text-lg font-medium ${isDark ? "text-white/50" : "text-gray-500"}`}>
                {"No events found at this time."}
              </p>
            </div>)}
        </motion.div>
      </AnimatePresence>
    </div>);
}

