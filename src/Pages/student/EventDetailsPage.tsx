import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, CalendarRange, Clock, MapPin, Info, PlayCircle, Image as ImageIcon, CheckCircle2, Loader2, X, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";
import { useLanguage } from "../../context/LanguageContext";

// Mock Database for Detailed Event & Tour Data
const eventDetailsDB: Record<string, any> = {
  "ghana-tour-2026": {
    title: { en: "Marketgod 2026 Ghana Tour", fr: "Tournée Ghana 2026 de Marketgod" },
    generalDesc: { 
      en: "The stage is set. The cities await. This year, Market God is bringing hands-on mentorship to six cities across Ghana. Prepare for live sessions, real strategies, and the chance to elevate your trading journey like never before.",
      fr: "La scène est prête. Les villes attendent. Cette année, Market God apporte un mentorat pratique dans six villes du Ghana. Préparez-vous pour des sessions en direct et de vraies stratégies."
    },
    date: "Feb 21 - Apr 25, 2026",
    time: "09:00 AM GMT",
    baseVenue: { en: "6 Cities Across Ghana", fr: "6 Villes à travers le Ghana" },
    status: "Active Tour",
    mediaHighlights: [
      {
        id: "t1",
        type: "image",
        url: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&q=80&w=1000",
        city: { en: "Ho", fr: "Ho" },
        date: "February 21, 2026",
        venue: { en: "Volta Serene Hotel", fr: "Hôtel Volta Serene" },
        status: "Completed",
        gallery: [
          { type: "image", url: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&q=80&w=1000" },
          { type: "video", url: "https://res.cloudinary.com/dzqdfaghg/video/upload/v1771486226/SnapInsta.to_AQPsddf-wYv5pqzPsA1sDoEOu-ndz6ijPp1vOvDZGsRpJtCQ7ENdTQzeoDvWf3fZrLPntm5CMo_Lckkp-tbC-8nJ_jddm9o.mp4" },
          { type: "image", url: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1000" }
        ],
        specificDetails: {
          en: "The kickoff in the Volta Region! We set the stage with foundational market structure, live Q&A, and networking with the community.",
          fr: "Le coup d'envoi dans la région de la Volta ! Nous avons préparé le terrain avec la structure de base du marché et des questions-réponses en direct."
        }
      },
      {
        id: "t2",
        type: "image",
        url: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1000",
        city: { en: "Takoradi", fr: "Takoradi" },
        date: "March 7, 2026",
        venue: { en: "Best Western Plus Atlantic Hotel", fr: "Hôtel Best Western Plus Atlantic" },
        status: "Completed",
        gallery: [
          { type: "image", url: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1000" },
          { type: "image", url: "https://images.unsplash.com/photo-1561489422-45de3d015e3e?auto=format&fit=crop&q=80&w=1000" }
        ],
        specificDetails: {
          en: "Taking over the Oil City. A deep dive into institutional trading concepts, liquidity sweeps, and managing larger accounts.",
          fr: "Prise de contrôle de la ville pétrolière. Une plongée approfondie dans les concepts de trading institutionnel et la gestion de compte."
        }
      },
      {
        id: "t3",
        type: "image",
        url: "https://images.unsplash.com/photo-1561489422-45de3d015e3e?auto=format&fit=crop&q=80&w=1000",
        city: { en: "Kumasi", fr: "Kumasi" },
        date: "March 21, 2026",
        venue: { en: "Golden Tulip Kumasi City", fr: "Golden Tulip Kumasi City" },
        status: "Completed",
        specificDetails: {
          en: "A massive turnout in Oseikrom. We spent the entire day breaking down the sniper entry framework and performing live chart reviews.",
          fr: "Une participation massive à Oseikrom. Nous avons passé la journée entière à analyser le cadre d'entrée sniper et les graphiques en direct."
        }
      },
      {
        id: "t4",
        type: "video",
        url: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&q=80&w=1000",
        city: { en: "Tamale", fr: "Tamale" },
        date: "March 28, 2026",
        venue: { en: "Modern City Hotel", fr: "Hôtel Modern City" },
        status: "Completed",
        specificDetails: {
          en: "The Northern Region edition. Focused heavily on high-probability setups, psychology, and building discipline.",
          fr: "L'édition de la région du Nord. Fortement axée sur les configurations à haute probabilité, la psychologie et la discipline."
        }
      },
      {
        id: "t5",
        type: "image",
        url: "https://images.unsplash.com/photo-1558008258-3256797b43f3?auto=format&fit=crop&q=80&w=1000",
        city: { en: "Koforidua", fr: "Koforidua" },
        date: "April 11, 2026",
        venue: { en: "Capital View Hotel", fr: "Hôtel Capital View" },
        status: "Upcoming",
        specificDetails: {
          en: "Eastern Region, get ready! We are bringing the full MarketGod live trading experience to you. Secure your seat.",
          fr: "Région de l'Est, préparez-vous ! Nous vous apportons l'expérience complète de trading en direct de MarketGod."
        }
      },
      {
        id: "t6",
        type: "image",
        url: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=1000",
        city: { en: "Techiman", fr: "Techiman" },
        date: "April 25, 2026",
        venue: { en: "Encom Hotel", fr: "Hôtel Encom" },
        status: "Selling Fast",
        specificDetails: {
          en: "The grand finale of the 2026 Ghana Tour. Expect surprises, massive live trades, and an unforgettable closing celebration.",
          fr: "La grande finale de la Tournée Ghana 2026. Attendez-vous à des surprises, des trades en direct et une célébration inoubliable."
        }
      }
    ]
      },
      "ghana-tour-2025": {
        title: { en: "Marketgod 2025 Ghana Tour Archives", fr: "Archives Tournée Ghana 2025 Marketgod" },
        generalDesc: {
          en: "The historic 2025 nationwide tour that changed the landscape of Forex in Ghana. We hit 6 major cities, traded live, and created a new generation of funded snipers. Relive the moments and watch the archived breakdowns.",
          fr: "La tournée nationale historique de 2025 qui a changé le paysage du Forex au Ghana. Nous avons visité 6 grandes villes, tradé en direct et créé une nouvelle génération de snipers financés. Revivez les moments et regardez les analyses archivées."
        },
        date: "Feb 21 - Apr 25, 2025",
        time: "09:00 AM GMT",
        baseVenue: { en: "6 Cities Across Ghana", fr: "6 Villes à travers le Ghana" },
        status: "Archived Tour",
        mediaHighlights: [
          {
            id: "p1",
            type: "image",
            url: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&q=80&w=1000",
            city: { en: "Ho", fr: "Ho" },
            date: "February 21, 2025",
            venue: { en: "Volta Serene Hotel", fr: "Hôtel Volta Serene" },
            status: "Archived Photos",
            gallery: [
              { type: "image", url: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&q=80&w=1000" },
              { type: "image", url: "https://images.unsplash.com/photo-1558008258-3256797b43f3?auto=format&fit=crop&q=80&w=1000" },
              { type: "image", url: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=1000" }
            ],
            specificDetails: {
              en: "The massive kickoff in the Volta Region! Over 300 students attended the seminar.",
              fr: "Le coup d'envoi massif dans la région de la Volta ! Plus de 300 étudiants ont assisté au séminaire."
            }
          },
          {
            id: "p2",
            type: "image",
            url: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1000",
            city: { en: "Takoradi", fr: "Takoradi" },
            date: "March 7, 2025",
            venue: { en: "Best Western Plus Atlantic Hotel", fr: "Hôtel Best Western Plus Atlantic" },
            status: "Archived Photos",
            specificDetails: {
              en: "The Oil City delivered! A deep dive into institutional trading concepts and managing larger accounts.",
              fr: "La ville pétrolière a assuré ! Une plongée approfondie dans les concepts de trading institutionnel."
            }
          },
          {
            id: "p3",
            type: "video",
            url: "https://images.unsplash.com/photo-1561489422-45de3d015e3e?auto=format&fit=crop&q=80&w=1000",
            city: { en: "Kumasi", fr: "Kumasi" },
            date: "March 21, 2025",
            venue: { en: "Golden Tulip Kumasi City", fr: "Golden Tulip Kumasi City" },
            status: "Archived Video",
            specificDetails: {
              en: "Oseikrom was unforgettable. Watch the full 2-hour replay of the sniper entry framework breakdown.",
              fr: "Oseikrom était inoubliable. Regardez la rediffusion complète de l'analyse du cadre d'entrée sniper."
            }
          },
          {
            id: "p4",
            type: "video",
            url: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&q=80&w=1000",
            city: { en: "Tamale", fr: "Tamale" },
            date: "March 28, 2025",
            venue: { en: "Modern City Hotel", fr: "Hôtel Modern City" },
            status: "Archived Video",
            specificDetails: {
              en: "The Northern Region edition. Relive the high-probability setup examples we discussed.",
              fr: "L'édition de la région du Nord. Revivez les exemples de configurations à haute probabilité dont nous avons discuté."
            }
          },
          {
            id: "p5",
            type: "image",
            url: "https://images.unsplash.com/photo-1558008258-3256797b43f3?auto=format&fit=crop&q=80&w=1000",
            city: { en: "Koforidua", fr: "Koforidua" },
            date: "April 11, 2025",
            venue: { en: "Capital View Hotel", fr: "Hôtel Capital View" },
            status: "Archived Photos",
            specificDetails: {
              en: "Eastern Region brought the energy! Incredible live trading experience and networking.",
              fr: "La région de l'Est a apporté l'énergie ! Incroyable expérience de trading en direct et réseautage."
            }
          },
          {
            id: "p6",
            type: "video",
            url: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=1000",
            city: { en: "Techiman", fr: "Techiman" },
            date: "April 25, 2025",
            venue: { en: "Encom Hotel", fr: "Hôtel Encom" },
            status: "Archived Video",
            specificDetails: {
              en: "The explosive grand finale of the 2025 Ghana Tour. Watch the recap of the massive live trades and closing celebration.",
              fr: "La grande finale explosive de la Tournée Ghana 2025. Regardez le récapitulatif des trades en direct et de la célébration."
            }
          }
        ]
      }
    };

export default function EventDetailsPage() {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const isDark = theme === "dark";
  const isFrench = language === "fr";
  
  const navigate = useNavigate();
  const { eventId } = useParams();
  
  // Fallback if event isn't found in DB
  const event = eventId && eventDetailsDB[eventId] 
    ? eventDetailsDB[eventId] 
    : {
        title: { en: "Event Details", fr: "Détails de l'événement" },
        generalDesc: { en: "No specific details have been added for this event yet. Stay tuned!", fr: "Aucun détail spécifique n'a encore été ajouté pour cet événement. Restez à l'écoute !" },
        date: "TBD",
        time: "TBD",
        baseVenue: { en: "TBD", fr: "À déterminer" },
        mediaHighlights: []
      };

  // Booking Modal State
  const [selectedStop, setSelectedStop] = useState<any>(null);
  const [bookingState, setBookingState] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleBookSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingState('loading');
    setTimeout(() => {
      setBookingState('success');
    }, 1500);
  };

  const closeBookingModal = () => {
    setSelectedStop(null);
    setTimeout(() => setBookingState('idle'), 300);
  };

  // Highlights Carousel Modal State
  const [highlightStop, setHighlightStop] = useState<any>(null);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);

  const openHighlights = (stop: any) => {
    setHighlightStop(stop);
    setCurrentMediaIndex(0);
  };

  const activeGallery = highlightStop?.gallery || (highlightStop ? [{ type: highlightStop.type, url: highlightStop.url }] : []);
  const currentMedia = activeGallery[currentMediaIndex];

  // Instagram Reels/Stories style navigation across entire tour
  const currentStopIndex = event.mediaHighlights.findIndex((s: any) => s.id === highlightStop?.id);
  
  const nextMedia = () => {
    if (currentMediaIndex < activeGallery.length - 1) {
      setCurrentMediaIndex((prev) => prev + 1);
    } else {
      const nextStopIndex = (currentStopIndex + 1) % event.mediaHighlights.length;
      setHighlightStop(event.mediaHighlights[nextStopIndex]);
      setCurrentMediaIndex(0);
    }
  };

  const prevMedia = () => {
    if (currentMediaIndex > 0) {
      setCurrentMediaIndex((prev) => prev - 1);
    } else {
      const prevStopIndex = (currentStopIndex - 1 + event.mediaHighlights.length) % event.mediaHighlights.length;
      const prevStop = event.mediaHighlights[prevStopIndex];
      const prevGallery = prevStop.gallery || [{ type: prevStop.type, url: prevStop.url }];
      setHighlightStop(prevStop);
      setCurrentMediaIndex(prevGallery.length - 1);
    }
  };

  const showArrows = event.mediaHighlights.length > 1 || activeGallery.length > 1;

  const container: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };
  const item: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } }
  };

  return (
    <motion.div initial="hidden" animate="show" variants={container} className="space-y-8 pb-10">
      
      {/* Back Button */}
      <motion.div variants={item}>
        <button
          onClick={() => navigate(-1)}
          className={`group inline-flex items-center gap-2 text-sm font-medium transition-colors ${
            isDark ? "text-white/60 hover:text-white" : "text-gray-500 hover:text-black"
          }`}
        >
          <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
          {isFrench ? "Retour aux événements" : "Back to Events"}
        </button>
      </motion.div>

      {/* General Event Hero Section */}
      <motion.div variants={item} className={`relative overflow-hidden rounded-[3rem] border shadow-lg ${isDark ? "border-white/5 bg-[#0a0a0a]" : "border-black/5 bg-white"}`}>
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-mg-gold/10 blur-[100px] rounded-full pointer-events-none" />
        <div className="relative z-10 p-8 md:p-12 lg:p-16">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-2 rounded-lg bg-mg-gold/10 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-mg-gold border border-mg-gold/20">
              <Info size={14} />
              {isFrench ? "Détails Généraux" : "General Overview"}
            </span>
          </div>
          
          <h1 className={`text-3xl md:text-5xl font-black mb-6 tracking-tight ${isDark ? "text-white" : "text-gray-900"}`}>
            {isFrench ? event.title.fr : event.title.en}
          </h1>
          
          <p className={`max-w-3xl text-lg md:text-xl font-medium mb-8 leading-relaxed ${isDark ? "text-white/70" : "text-gray-600"}`}>
            {isFrench ? event.generalDesc.fr : event.generalDesc.en}
          </p>

          <div className={`flex flex-wrap gap-6 pt-6 border-t ${isDark ? "border-white/10" : "border-black/10"}`}>
            <div className={`flex items-center gap-3 text-sm font-semibold ${isDark ? "text-white/80" : "text-gray-700"}`}>
              <CalendarRange size={18} className="text-mg-gold" />
              {event.date}
            </div>
            <div className={`flex items-center gap-3 text-sm font-semibold ${isDark ? "text-white/80" : "text-gray-700"}`}>
              <Clock size={18} className="text-mg-gold" />
              {event.time}
            </div>
            <div className={`flex items-center gap-3 text-sm font-semibold ${isDark ? "text-white/80" : "text-gray-700"}`}>
              <MapPin size={18} className="text-mg-gold" />
              {isFrench ? event.baseVenue.fr : event.baseVenue.en}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Media / Tour Highlights Section */}
      {event.mediaHighlights.length > 0 && (
        <motion.div variants={item} className="space-y-6">
          <h2 className={`text-2xl font-black px-2 ${isDark ? "text-white" : "text-gray-900"}`}>
            {isFrench ? "Faits saillants de la tournée et médias" : "Tour Highlights & Media"}
          </h2>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {event.mediaHighlights.map((media: any) => (
              <motion.div key={media.id} className={`group relative overflow-hidden rounded-[2rem] border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${isDark ? "border-white/10 bg-[#111111]" : "border-black/10 bg-[#faf7f0]"}`}>
                {/* Media Thumbnail */}
                <div className="relative h-48 w-full overflow-hidden bg-black/20">
                  <img src={media.url} alt={media.city.en} className="w-full h-full object-cover opacity-80 transition-transform duration-500 group-hover:scale-105 group-hover:opacity-100" />
                  <div className="absolute top-4 left-4 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 backdrop-blur-md text-white border border-white/20">
                    {media.type === "video" ? <PlayCircle size={16} /> : <ImageIcon size={16} />}
                  </div>
                </div>
                
                {/* Media / Tour Stop Specific Details */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className={`text-xl font-black tracking-tight ${isDark ? "text-mg-gold" : "text-mg-gold"}`}>{isFrench ? media.city.fr : media.city.en}</h3>
                    {media.status && (
                      <span className={`text-[9px] uppercase font-black px-2 py-1 rounded-md tracking-widest ${media.status.includes('Archived') ? (isDark ? 'bg-white/10 text-white/60' : 'bg-black/5 text-gray-500') : 'bg-mg-gold/10 text-mg-gold border border-mg-gold/20'}`}>
                        {media.status}
                      </span>
                    )}
                  </div>
                  
                  <div className="space-y-1.5 mb-4">
                    <p className={`text-xs font-bold uppercase tracking-wider flex items-center gap-2 ${isDark ? "text-white/50" : "text-gray-500"}`}>
                      <CalendarRange size={14} className={isDark ? "text-white/30" : "text-gray-400"} /> {media.date}
                    </p>
                    {media.venue && (
                      <p className={`text-xs font-bold uppercase tracking-wider flex items-center gap-2 ${isDark ? "text-white/50" : "text-gray-500"}`}>
                        <MapPin size={14} className={isDark ? "text-white/30" : "text-gray-400"} /> {isFrench ? media.venue.fr : media.venue.en}
                      </p>
                    )}
                  </div>
                  
                  <p className={`text-sm leading-relaxed font-medium ${isDark ? "text-white/70" : "text-gray-600"}`}>{isFrench ? media.specificDetails.fr : media.specificDetails.en}</p>

                  <div className="mt-6 flex flex-col gap-3">
                    {media.status !== "Completed" && !media.status.includes('Archived') && (
                      <button
                        onClick={() => { setSelectedStop(media); setBookingState('idle'); }}
                        className="w-full rounded-xl bg-mg-gold px-4 py-3 text-sm font-bold uppercase tracking-wider text-black shadow-lg transition-transform hover:scale-[1.02]"
                      >
                        {isFrench ? "Réserver ma place" : "Book My Seat"}
                      </button>
                    )}
                    
                    {(media.status === "Completed" || media.status.includes('Archived') || media.gallery) && (
                      <button
                        onClick={() => openHighlights(media)}
                        className={`w-full rounded-xl border px-4 py-3 text-sm font-bold uppercase tracking-wider transition-colors ${isDark ? "border-mg-gold/30 text-mg-gold hover:bg-mg-gold/10" : "border-mg-gold text-mg-gold hover:bg-mg-gold/10"}`}
                      >
                        {isFrench ? "Voir les temps forts" : "View Highlights"}
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Booking Form Modal */}
      <AnimatePresence>
        {selectedStop && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className={`w-full max-w-md overflow-hidden rounded-[2rem] border shadow-2xl ${isDark ? "border-white/10 bg-[#111111]" : "border-black/10 bg-white"}`}
            >
              <AnimatePresence mode="wait">
                {bookingState === 'idle' && (
                  <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                    <div className={`flex items-center justify-between border-b p-5 ${isDark ? "border-white/10 bg-white/5" : "border-black/10 bg-black/5"}`}>
                      <div>
                        <h3 className={`text-lg font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
                          {isFrench ? "Réserver pour " : "Book for "}{isFrench ? selectedStop.city.fr : selectedStop.city.en}
                        </h3>
                        <p className={`text-xs font-medium mt-1 ${isDark ? "text-mg-gold" : "text-mg-gold"}`}>
                          {selectedStop.date}
                        </p>
                      </div>
                      <button onClick={closeBookingModal} className={`rounded-full p-2 transition-colors ${isDark ? "bg-white/10 text-white hover:bg-white/20" : "bg-black/10 text-gray-600 hover:bg-black/20"}`}>
                        <X size={18} />
                      </button>
                    </div>
                    
                    <form onSubmit={handleBookSubmit} className="p-6 space-y-4">
                      <div>
                        <label className={`text-sm font-semibold ${isDark ? "text-white/80" : "text-gray-700"}`}>{isFrench ? "Nom Complet" : "Full Name"}</label>
                        <input required type="text" placeholder="John Doe" className={`mt-1 w-full rounded-xl border p-3 text-sm outline-none transition-colors focus:border-mg-gold ${isDark ? 'border-white/10 bg-black/20 text-white' : 'border-black/10 bg-black/5 text-gray-900'}`} />
                      </div>
                      <div>
                        <label className={`text-sm font-semibold ${isDark ? "text-white/80" : "text-gray-700"}`}>{isFrench ? "Adresse Email" : "Email Address"}</label>
                        <input required type="email" placeholder="john@example.com" className={`mt-1 w-full rounded-xl border p-3 text-sm outline-none transition-colors focus:border-mg-gold ${isDark ? 'border-white/10 bg-black/20 text-white' : 'border-black/10 bg-black/5 text-gray-900'}`} />
                      </div>
                      <div>
                        <label className={`text-sm font-semibold ${isDark ? "text-white/80" : "text-gray-700"}`}>{isFrench ? "Numéro de Téléphone" : "Phone Number"}</label>
                        <input required type="tel" placeholder="+233 50 000 0000" className={`mt-1 w-full rounded-xl border p-3 text-sm outline-none transition-colors focus:border-mg-gold ${isDark ? 'border-white/10 bg-black/20 text-white' : 'border-black/10 bg-black/5 text-gray-900'}`} />
                      </div>
                      
                      <div className="pt-2">
                        <button type="submit" className="w-full rounded-xl bg-mg-gold px-4 py-3.5 text-sm font-black uppercase tracking-wider text-black shadow-[0_0_15px_rgba(212,175,55,0.3)] transition-transform hover:scale-[1.02]">
                          {isFrench ? "Confirmer la Réservation" : "Confirm Booking"}
                        </button>
                      </div>
                    </form>
                  </motion.div>
                )}

                {bookingState === 'loading' && (
                  <motion.div key="loading" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="flex flex-col items-center justify-center p-12 text-center">
                    <Loader2 size={48} className="mb-6 animate-spin text-mg-gold" />
                    <h3 className={`text-xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>{isFrench ? "Traitement de la réservation..." : "Processing Booking..."}</h3>
                  </motion.div>
                )}

                {bookingState === 'success' && (
                  <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="flex flex-col items-center justify-center p-12 text-center">
                    <CheckCircle2 size={64} className="mb-6 text-mg-gold drop-shadow-[0_0_15px_rgba(212,175,55,0.4)]" />
                    <h3 className={`text-2xl font-black mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>{isFrench ? "Place Réservée !" : "Seat Reserved!"}</h3>
                    <p className={`text-sm mb-8 ${isDark ? "text-white/60" : "text-gray-600"}`}>
                      {isFrench 
                        ? `Votre place pour ${selectedStop.city.fr} a été confirmée. Vérifiez votre email pour les détails.` 
                        : `Your seat for ${selectedStop.city.en} has been confirmed. Check your email for details.`}
                    </p>
                    <button onClick={closeBookingModal} className={`w-full rounded-xl border px-4 py-3 text-sm font-bold uppercase tracking-wider transition-colors ${isDark ? "border-white/10 text-white hover:bg-white/5" : "border-black/10 text-gray-900 hover:bg-black/5"}`}>
                      {isFrench ? "Fermer" : "Close"}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Highlights Carousel Modal */}
      <AnimatePresence>
        {highlightStop && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 sm:p-8 backdrop-blur-xl"
            onClick={() => setHighlightStop(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className={`relative w-full max-w-5xl h-[90vh] sm:h-[85vh] overflow-hidden rounded-[2.5rem] border shadow-2xl flex flex-col ${isDark ? "border-white/10 bg-[#0b0f14]" : "border-black/10 bg-white"}`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Floating Cinematic Header */}
              <div className="absolute top-0 left-0 right-0 z-20 flex flex-col p-5 sm:p-6 bg-gradient-to-b from-black/80 via-black/40 to-transparent pointer-events-none">
                {/* Instagram Story Progress Bars */}
                {activeGallery.length > 1 && (
                  <div className="flex gap-1.5 w-full mb-4">
                    {activeGallery.map((_: any, idx: number) => (
                      <div key={idx} className="h-1 sm:h-1.5 flex-1 bg-white/30 rounded-full overflow-hidden backdrop-blur-sm">
                        <div className={`h-full bg-mg-gold transition-all duration-300 ease-out ${idx <= currentMediaIndex ? 'w-full' : 'w-0'}`} />
                      </div>
                    ))}
                  </div>
                )}
                <div className="flex items-start justify-between w-full pointer-events-auto">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-black text-white drop-shadow-lg leading-none">
                      {isFrench ? highlightStop.city.fr : highlightStop.city.en} <span className="text-mg-gold">{isFrench ? "Temps Forts" : "Highlights"}</span>
                    </h3>
                    <p className="text-[10px] sm:text-xs font-bold mt-2 text-white/80 drop-shadow-md uppercase tracking-widest flex items-center gap-1.5">
                      <MapPin size={14} className="text-mg-gold" />
                      {isFrench ? highlightStop.venue.fr : highlightStop.venue.en}
                    </p>
                  </div>
                  <button 
                    onClick={() => setHighlightStop(null)} 
                    className="rounded-full bg-white/20 p-2 sm:p-2.5 text-white backdrop-blur-md transition-all duration-300 hover:bg-mg-gold hover:text-black hover:scale-110 hover:rotate-90"
                  >
                    <X size={20} strokeWidth={3} />
                  </button>
                </div>
              </div>

              {/* Carousel Viewport */}
              <div className="relative flex-1 w-full bg-black/95 flex items-center justify-center overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentMediaIndex}
                    initial={{ opacity: 0, scale: 0.95, filter: "blur(8px)" }} 
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }} 
                    exit={{ opacity: 0, scale: 1.05, filter: "blur(8px)" }} 
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="w-full h-full flex items-center justify-center p-2 sm:p-6"
                  >
                    {currentMedia.type === 'video' ? (
                      <video src={currentMedia.url} controls autoPlay className="w-full h-full object-contain rounded-2xl shadow-2xl" />
                    ) : (
                      <img src={currentMedia.url} alt="Highlight" className="w-full h-full object-contain rounded-2xl shadow-2xl" />
                    )}
                  </motion.div>
                </AnimatePresence>

                {/* Navigation Arrows */}
                {showArrows && (
                  <>
                    <button onClick={prevMedia} className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 sm:p-4 text-white backdrop-blur-md border border-white/20 transition-all duration-300 hover:bg-mg-gold hover:text-black hover:scale-110 shadow-lg">
                      <ChevronLeft size={24} strokeWidth={3} />
                    </button>
                    <button onClick={nextMedia} className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 sm:p-4 text-white backdrop-blur-md border border-white/20 transition-all duration-300 hover:bg-mg-gold hover:text-black hover:scale-110 shadow-lg">
                      <ChevronRight size={24} strokeWidth={3} />
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnails / Dots indicator */}
              {activeGallery.length > 1 && (
                <div className={`shrink-0 p-4 sm:p-5 flex justify-center gap-3 sm:gap-4 overflow-x-auto ${isDark ? "bg-[#0b0f14]" : "bg-gray-50"}`}>
                  {activeGallery.map((item: any, idx: number) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentMediaIndex(idx)}
                      className={`relative h-14 w-14 sm:h-16 sm:w-16 shrink-0 rounded-2xl transition-all duration-300 ease-out border-[3px] overflow-hidden ${
                        currentMediaIndex === idx 
                          ? "border-mg-gold opacity-100 scale-110 shadow-[0_0_15px_rgba(212,175,55,0.4)]" 
                          : "border-transparent opacity-40 hover:opacity-100 hover:scale-105"
                      }`}
                    >
                      {item.type === 'video' ? <video src={item.url} className="h-full w-full object-cover rounded-xl" /> : <img src={item.url} className="h-full w-full object-cover rounded-xl" />}
                      {item.type === 'video' && <div className="absolute inset-0 flex items-center justify-center bg-black/30"><PlayCircle size={16} className="text-white" /></div>}
                    </button>
                  ))}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}