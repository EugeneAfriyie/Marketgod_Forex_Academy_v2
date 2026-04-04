import { CalendarCheck2, Clock3, Video } from "lucide-react";
import StudentFeaturePage from "../../Components/student/StudentFeaturePage";
import { useState } from "react";
import { CalendarCheck2, Clock3, Video, Calendar, User, ArrowRight, CheckCircle2, Loader2, FileText, PlayCircle, XCircle, Lock, Crown } from "lucide-react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";
import { useLanguage } from "../../context/LanguageContext";
import { Link } from "react-router-dom";

const items = [
// --- MOCK DATA ---
const sessionTypes = [
  {
    title: "Mentor Sessions",
    description: "Book one-on-one or group sessions with mentors directly from the platform.",
    icon: Video,
    id: "technical",
    title: { en: "1-on-1 Chart Review", fr: "Analyse Technique 1-à-1" },
    duration: "45 Min",
    desc: { en: "Bring your marked-up charts. We will review your setups, correct your mistakes, and refine your sniper entries.", fr: "Apportez vos graphiques. Nous examinerons vos configurations et affinerons vos entrées." },
  },
  {
    title: "Upcoming Schedule",
    description: "Keep the student's confirmed meeting times, reminders, and attendance details in one place.",
    icon: CalendarCheck2,
    id: "psychology",
    title: { en: "Psychology Coaching", fr: "Coaching Psychologique" },
    duration: "30 Min",
    desc: { en: "Struggling with FOMO, over-leveraging, or revenge trading? Let's fix your mindset and build strict discipline.", fr: "Vous luttez contre le FOMO ou le sur-effet de levier ? Corrigeons votre mentalité." }
  }
];

const availableDates = ["Mon, Oct 26", "Wed, Oct 28", "Fri, Oct 30", "Mon, Nov 2"];
const availableTimes = ["09:00 AM", "11:30 AM", "14:00 PM", "16:45 PM"];

const initialUpcomingSessions = [
  {
    id: "up1",
    type: { en: "1-on-1 Chart Review", fr: "Analyse Technique 1-à-1" },
    date: "Wed, Oct 28, 2026",
    time: "14:00 GMT",
    mentor: "Eyram Dela",
    link: "#"
  }
];

const pastSessions = [
  {
    id: "p1",
    type: { en: "Psychology Coaching", fr: "Coaching Psychologique" },
    date: "Oct 10, 2026",
    time: "10:00 GMT",
    mentor: "Eyram Dela",
    notes: { en: "Identified emotional triggers during losing streaks. Action item: Cut lot size by half for the next 2 weeks and journal all feelings.", fr: "Déclencheurs émotionnels identifiés. Action : Réduire la taille du lot de moitié." }
  },
  {
    title: "Session History",
    description: "Review past meetings, outcomes, and follow-up action points from each session.",
    icon: Clock3,
  },
    id: "p2",
    type: { en: "1-on-1 Chart Review", fr: "Analyse Technique 1-à-1" },
    date: "Sep 25, 2026",
    time: "16:00 GMT",
    mentor: "Eyram Dela",
    notes: { en: "Reviewed Gold liquidity sweeps. Student needs to wait for the H1 candle close before executing.", fr: "Revue des balayages de liquidité sur l'Or. L'étudiant doit attendre la clôture de la bougie H1." }
  }
];

export default function MeetingsPage() {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const isDark = theme === "dark";
  const isFrench = language === "fr";

  // MOCK STATE: This will come from your user auth/subscription context later.
  // Set to `false` to see the locked sales/teaser page for regular users.
  // Set to `true` to see the active booking dashboard.
  const [isPremium, setIsPremium] = useState(false);

  const [activeTab, setActiveTab] = useState<"book" | "upcoming" | "history">("book");
  
  // Dynamic Upcoming Sessions State
  const [upcomingSessions, setUpcomingSessions] = useState(initialUpcomingSessions);

  // Booking State
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  
  // Modal State
  const [bookingState, setBookingState] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleBookSession = () => {
    if (!selectedType || !selectedDate || !selectedTime) return;
    setBookingState('loading');
    setTimeout(() => {
      // Dynamically add the new booking to the Upcoming tab!
      const newBooking = {
        id: `up-${Date.now()}`,
        type: sessionTypes.find(t => t.id === selectedType)?.title || { en: "New Session", fr: "Nouvelle Session" },
        date: selectedDate,
        time: selectedTime,
        mentor: "Eyram Dela",
        link: "#"
      };
      setUpcomingSessions(prev => [newBooking, ...prev]);
      setBookingState('success');
    }, 2000);
  };

  const resetBooking = () => {
    setBookingState('idle');
    setSelectedType(null);
    setSelectedDate(null);
    setSelectedTime(null);
    setActiveTab('upcoming'); // Send them to see their new booking!
  };

  const handleCancelSession = (id: string) => {
    setUpcomingSessions(prev => prev.filter(session => session.id !== id));
  };

  const container: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };
  const item: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } }
  };

  // ==========================================
  // REGULAR USER VIEW (LOCKED TEASER PAGE)
  // ==========================================
  if (!isPremium) {
    return (
      <div className="space-y-8 pb-10">
        {/* Locked Hero Section */}
        <motion.div initial="hidden" animate="show" variants={container} className={`relative overflow-hidden rounded-[3rem] border shadow-2xl ${isDark ? "border-mg-gold/30 bg-[#0a0a0a]" : "border-mg-gold/40 bg-white"}`}>
          <div className="absolute top-0 left-10 p-10 opacity-5 pointer-events-none"><User size={250} className="text-mg-gold" /></div>
          <div className="absolute inset-0 bg-gradient-to-br from-mg-gold/10 via-transparent to-transparent pointer-events-none" />
          
          <div className="relative z-10 p-10 md:p-16 lg:p-20 flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-mg-gold/10 border border-mg-gold/30 px-4 py-1.5 text-xs font-black uppercase tracking-[0.2em] text-mg-gold mb-6 shadow-[0_0_15px_rgba(212,175,55,0.2)]">
              <Lock size={14} />
              {isFrench ? "Accès VIP Requis" : "VIP Access Required"}
            </div>
            <h1 className={`text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight ${isDark ? "text-white" : "text-gray-900"}`}>
              {isFrench ? "Arrêtez de deviner." : "Stop Guessing."} <br/>
              <span className="text-mg-gold">{isFrench ? "Faites évaluer vos graphiques." : "Get Your Charts Reviewed."}</span>
            </h1>
            <p className={`max-w-3xl text-lg md:text-xl font-medium mb-10 leading-relaxed ${isDark ? "text-white/70" : "text-gray-600"}`}>
              {isFrench 
                ? "Rien n'accélère plus votre rentabilité qu'un retour direct d'un professionnel. En tant que membre Premium, vous pouvez réserver des séances individuelles privées pour la révision de graphiques, la correction d'erreurs et le coaching psychologique."
                : "Nothing accelerates your profitability faster than direct feedback from a professional. As a Premium member, you can book private 1-on-1 sessions for chart reviews, mistake correction, and trading psychology coaching."}
            </p>
            
            <Link
              to="/dashboard/mentorship" 
              className="group relative overflow-hidden inline-flex items-center gap-3 rounded-2xl bg-mg-gold px-10 py-5 text-sm font-black uppercase tracking-[0.15em] text-black shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(212,175,55,0.6)]"
            >
              <Crown size={20} className="relative z-10" />
              <span className="relative z-10">{isFrench ? "Rejoindre le Mentorat pour Débloquer" : "Join Mentorship to Unlock"}</span>
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/50 to-transparent group-hover:animate-shimmer" />
            </Link>
          </div>
        </motion.div>

        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={container} className="grid gap-6 md:grid-cols-2">
           {sessionTypes.map((type, idx) => (
             <motion.div variants={item} key={idx} className={`relative overflow-hidden p-8 rounded-[2rem] border transition-all opacity-75 grayscale-[30%] ${isDark ? "border-white/5 bg-[#111111]" : "border-black/5 bg-[#faf7f0]"}`}>
                <div className="absolute top-6 right-6"><Lock size={20} className={isDark ? "text-white/20" : "text-black/20"} /></div>
                <h3 className={`text-xl font-bold mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>{isFrench ? type.title.fr : type.title.en}</h3>
                <p className={`text-sm ${isDark ? "text-white/60" : "text-gray-500"}`}>{isFrench ? type.desc.fr : type.desc.en}</p>
             </motion.div>
           ))}
        </motion.div>

        {/* DEV SIMULATION TOGGLE - REMOVE LATER */}
        <div className="fixed bottom-6 left-6 z-[100] flex flex-col gap-2 p-3 rounded-2xl bg-black/90 backdrop-blur-md border border-white/20 shadow-2xl">
          <p className="text-[10px] font-bold text-white/50 uppercase tracking-wider text-center">Simulate Role</p>
          <div className="flex gap-2">
            <button onClick={() => setIsPremium(false)} className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors ${!isPremium ? "bg-red-500 text-white" : "text-white/50 hover:bg-white/10"}`}>Regular User</button>
            <button onClick={() => setIsPremium(true)} className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors ${isPremium ? "bg-mg-gold text-black" : "text-white/50 hover:bg-white/10"}`}>Premium User</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <StudentFeaturePage
      title="Meetings"
      description="Students will use this area to manage mentor calls, live sessions, and any scheduled coaching meetings."
      items={items}
    />
    <div className="space-y-8 pb-10">
      {/* Hero Section */}
      <motion.div initial="hidden" animate="show" variants={container} className={`relative overflow-hidden rounded-[3rem] border shadow-lg ${isDark ? "border-white/5 bg-[#0a0a0a]" : "border-black/5 bg-white"}`}>
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-mg-gold/10 blur-[100px] rounded-full pointer-events-none" />
        <div className="relative z-10 p-8 md:p-12 lg:p-16">
          <h1 className={`text-4xl md:text-5xl font-black mb-4 tracking-tight ${isDark ? "text-white" : "text-gray-900"}`}>
            {isFrench ? "Appels de " : "Mentorship "}
            <span className="text-mg-gold">{isFrench ? "Mentorat." : "Meetings."}</span>
          </h1>
          <p className={`max-w-2xl text-lg font-medium ${isDark ? "text-white/70" : "text-gray-600"}`}>
            {isFrench 
              ? "Réservez vos séances privées individuelles, consultez vos appels à venir et revoyez les notes de vos séances passées."
              : "Book your private 1-on-1 sessions, view your upcoming calls, and review the notes from your past sessions."}
          </p>
        </div>
      </motion.div>

      {/* Tabs */}
      <motion.div initial="hidden" animate="show" variants={container} className="flex justify-center mb-2">
        <div className={`flex flex-wrap justify-center rounded-xl p-1 border shadow-inner ${isDark ? "bg-[#0f141b] border-white/10" : "bg-white border-black/10"}`}>
          <button 
            onClick={() => setActiveTab('book')} 
            className={`flex items-center gap-1.5 sm:gap-2 px-6 py-2.5 sm:px-8 sm:py-3 rounded-lg font-bold text-xs sm:text-sm transition-all ${activeTab === 'book' ? 'bg-mg-gold text-black shadow-md' : isDark ? 'text-white/60 hover:text-white hover:bg-white/5' : 'text-gray-500 hover:text-black hover:bg-black/5'}`}
          >
            {isFrench ? "Réserver une session" : "Book a Session"}
          </button>
          <button 
            onClick={() => setActiveTab('upcoming')} 
            className={`flex items-center gap-1.5 sm:gap-2 px-6 py-2.5 sm:px-8 sm:py-3 rounded-lg font-bold text-xs sm:text-sm transition-all ${activeTab === 'upcoming' ? 'bg-mg-gold text-black shadow-md' : isDark ? 'text-white/60 hover:text-white hover:bg-white/5' : 'text-gray-500 hover:text-black hover:bg-black/5'}`}
          >
            {isFrench ? "À venir" : "Upcoming"}
            <span className={`ml-1 flex h-5 w-5 items-center justify-center rounded-full text-[10px] ${activeTab === 'upcoming' ? 'bg-black text-mg-gold' : isDark ? 'bg-white/10' : 'bg-black/10'}`}>{upcomingSessions.length}</span>
          </button>
          <button 
            onClick={() => setActiveTab('history')} 
            className={`flex items-center gap-1.5 sm:gap-2 px-6 py-2.5 sm:px-8 sm:py-3 rounded-lg font-bold text-xs sm:text-sm transition-all ${activeTab === 'history' ? 'bg-mg-gold text-black shadow-md' : isDark ? 'text-white/60 hover:text-white hover:bg-white/5' : 'text-gray-500 hover:text-black hover:bg-black/5'}`}
          >
            {isFrench ? "Historique" : "History"}
          </button>
        </div>
      </motion.div>

      {/* Content Area */}
      <AnimatePresence mode="wait">
        
        {/* BOOKING TAB */}
        {activeTab === 'book' && (
          <motion.div key="book" initial="hidden" animate="show" exit={{ opacity: 0, y: -20 }} variants={container} className="grid lg:grid-cols-2 gap-8">
            {/* Left Column: Flow Selection */}
            <div className="space-y-8">
              
              {/* Step 1: Type */}
              <motion.div variants={item} className={`p-6 md:p-8 rounded-[2rem] border ${isDark ? "border-white/10 bg-[#111111]" : "border-black/10 bg-white"}`}>
                <div className="flex items-center gap-3 mb-6">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-mg-gold/20 text-mg-gold font-bold">1</span>
                  <h2 className={`text-xl font-black ${isDark ? "text-white" : "text-gray-900"}`}>{isFrench ? "Type de Session" : "Session Type"}</h2>
                </div>
                <div className="grid gap-4">
                  {sessionTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => setSelectedType(type.id)}
                      className={`text-left p-5 rounded-2xl border-2 transition-all ${selectedType === type.id ? "border-mg-gold bg-mg-gold/5" : isDark ? "border-white/5 bg-white/[0.02] hover:border-white/20" : "border-black/5 bg-black/[0.02] hover:border-black/20"}`}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <h3 className={`font-bold ${isDark ? "text-white" : "text-gray-900"}`}>{isFrench ? type.title.fr : type.title.en}</h3>
                        <span className={`text-xs font-bold px-2 py-1 rounded-md ${isDark ? "bg-white/10 text-white/70" : "bg-black/5 text-gray-600"}`}>{type.duration}</span>
                      </div>
                      <p className={`text-sm ${isDark ? "text-white/60" : "text-gray-500"}`}>{isFrench ? type.desc.fr : type.desc.en}</p>
                    </button>
                  ))}
                </div>
              </motion.div>

              {/* Step 2: Date & Time */}
              <motion.div variants={item} className={`p-6 md:p-8 rounded-[2rem] border ${!selectedType ? "opacity-50 pointer-events-none grayscale" : ""} ${isDark ? "border-white/10 bg-[#111111]" : "border-black/10 bg-white"}`}>
                <div className="flex items-center gap-3 mb-6">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-mg-gold/20 text-mg-gold font-bold">2</span>
                  <h2 className={`text-xl font-black ${isDark ? "text-white" : "text-gray-900"}`}>{isFrench ? "Date & Heure (GMT)" : "Date & Time (GMT)"}</h2>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <label className={`text-sm font-bold mb-3 block ${isDark ? "text-white/70" : "text-gray-700"}`}>{isFrench ? "Sélectionner une Date" : "Select Date"}</label>
                    <div className="flex flex-wrap gap-2">
                      {availableDates.map(date => (
                        <button
                          key={date}
                          onClick={() => setSelectedDate(date)}
                          className={`px-4 py-2.5 rounded-xl text-sm font-bold border transition-all ${selectedDate === date ? "bg-mg-gold border-mg-gold text-black shadow-md" : isDark ? "border-white/10 text-white/60 hover:bg-white/5" : "border-black/10 text-gray-600 hover:bg-black/5"}`}
                        >
                          {date}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className={`text-sm font-bold mb-3 block ${isDark ? "text-white/70" : "text-gray-700"}`}>{isFrench ? "Sélectionner une Heure" : "Select Time"}</label>
                    <div className="flex flex-wrap gap-2">
                      {availableTimes.map(time => (
                        <button
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          className={`px-4 py-2.5 rounded-xl text-sm font-bold border transition-all ${selectedTime === time ? "bg-mg-gold border-mg-gold text-black shadow-md" : isDark ? "border-white/10 text-white/60 hover:bg-white/5" : "border-black/10 text-gray-600 hover:bg-black/5"}`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right Column: Confirmation Summary */}
            <motion.div variants={item}>
              <div className={`sticky top-24 p-6 md:p-8 rounded-[2.5rem] border shadow-2xl ${isDark ? "border-white/10 bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a]" : "border-black/10 bg-gradient-to-b from-white to-gray-50"}`}>
                <h2 className={`text-2xl font-black mb-6 ${isDark ? "text-white" : "text-gray-900"}`}>{isFrench ? "Résumé de la Réservation" : "Booking Summary"}</h2>
                
                <div className="space-y-4 mb-8">
                  <div className={`p-4 rounded-xl border ${isDark ? "bg-black/50 border-white/5" : "bg-black/5 border-black/5"}`}>
                    <p className={`text-xs font-bold uppercase tracking-wider mb-1 ${isDark ? "text-mg-gold/70" : "text-mg-gold"}`}>{isFrench ? "Type" : "Type"}</p>
                    <p className={`font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>
                      {selectedType ? sessionTypes.find(t => t.id === selectedType)?.title[isFrench ? 'fr' : 'en'] : (isFrench ? "Sélectionnez un type" : "Select a session type")}
                    </p>
                  </div>
                  <div className={`p-4 rounded-xl border ${isDark ? "bg-black/50 border-white/5" : "bg-black/5 border-black/5"}`}>
                    <p className={`text-xs font-bold uppercase tracking-wider mb-1 ${isDark ? "text-mg-gold/70" : "text-mg-gold"}`}>{isFrench ? "Date & Heure" : "Date & Time"}</p>
                    <p className={`font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>
                      {selectedDate && selectedTime ? `${selectedDate} @ ${selectedTime}` : (isFrench ? "Sélectionnez une date et heure" : "Select date and time")}
                    </p>
                  </div>
                  <div className={`p-4 rounded-xl border ${isDark ? "bg-black/50 border-white/5" : "bg-black/5 border-black/5"}`}>
                    <p className={`text-xs font-bold uppercase tracking-wider mb-1 ${isDark ? "text-mg-gold/70" : "text-mg-gold"}`}>{isFrench ? "Mentor" : "Mentor"}</p>
                    <p className={`font-semibold flex items-center gap-2 ${isDark ? "text-white" : "text-gray-900"}`}>
                      <User size={16} className="text-mg-gold" /> Eyram Dela
                    </p>
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  {bookingState === 'idle' ? (
                    <motion.button 
                      key="btn"
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      disabled={!selectedType || !selectedDate || !selectedTime}
                      onClick={handleBookSession}
                      className="w-full flex items-center justify-center gap-2 rounded-xl bg-mg-gold px-8 py-4 text-sm font-black uppercase tracking-wider text-black shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-transform hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed"
                    >
                      {isFrench ? "Confirmer la Réservation" : "Confirm Booking"}
                      <ArrowRight size={18} />
                    </motion.button>
                  ) : bookingState === 'loading' ? (
                    <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex justify-center p-4">
                      <Loader2 size={32} className="animate-spin text-mg-gold" />
                    </motion.div>
                  ) : (
                    <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
                      <CheckCircle2 size={48} className="mx-auto text-green-500 mb-3" />
                      <h3 className={`text-xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>{isFrench ? "Session Réservée !" : "Session Booked!"}</h3>
                      <p className={`text-sm mt-1 mb-4 ${isDark ? "text-white/60" : "text-gray-500"}`}>{isFrench ? "Un email de confirmation a été envoyé." : "A confirmation email has been sent."}</p>
                      <button onClick={resetBooking} className={`text-sm font-bold uppercase tracking-wider underline ${isDark ? "text-white/60 hover:text-white" : "text-gray-500 hover:text-black"}`}>
                        {isFrench ? "Voir mes sessions" : "View my sessions"}
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* UPCOMING TAB */}
        {activeTab === 'upcoming' && (
          <motion.div key="upcoming" initial="hidden" animate="show" exit={{ opacity: 0, y: -20 }} variants={container} className="space-y-6">
            {upcomingSessions.length === 0 ? (
              <div className={`p-12 text-center rounded-[2rem] border ${isDark ? "border-white/5 bg-[#111111]" : "border-black/5 bg-white"}`}>
                <CalendarCheck2 size={48} className="mx-auto mb-4 text-mg-gold opacity-50" />
                <h3 className={`text-xl font-bold mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>{isFrench ? "Aucune session à venir" : "No Upcoming Sessions"}</h3>
                <p className={isDark ? "text-white/50" : "text-gray-500"}>{isFrench ? "Vous n'avez pas de rendez-vous prévus." : "You have no scheduled mentor calls."}</p>
              </div>
            ) : (
              upcomingSessions.map((session, idx) => (
                <motion.div variants={item} key={idx} className={`relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6 p-6 md:p-8 rounded-[2rem] border shadow-lg ${isDark ? "border-white/10 bg-[#111111]" : "border-black/10 bg-white"}`}>
                  <div className="absolute top-0 left-0 w-1 h-full bg-mg-gold" />
                  <div className="flex items-start gap-5">
                    <div className="hidden sm:flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-mg-gold/10 text-mg-gold">
                      <Calendar size={28} />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className={`text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-md ${isDark ? "bg-white/10 text-white/70" : "bg-black/5 text-gray-600"}`}>
                          {isFrench ? session.type.fr : session.type.en}
                        </span>
                        <span className="flex items-center gap-1.5 text-xs font-bold text-mg-gold">
                          <User size={14} /> {session.mentor}
                        </span>
                      </div>
                      <h3 className={`text-2xl font-black mb-1 ${isDark ? "text-white" : "text-gray-900"}`}>{session.date}</h3>
                      <p className={`flex items-center gap-2 text-sm font-medium ${isDark ? "text-white/60" : "text-gray-600"}`}>
                        <Clock3 size={16} className={isDark ? "text-white/40" : "text-gray-400"} /> {session.time}
                      </p>
                    </div>
                  </div>
                  <div className="shrink-0 flex flex-col gap-3">
                    <a href={session.link} className={`flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-sm font-black uppercase tracking-wider transition-all border-2 ${isDark ? "border-mg-gold/50 text-mg-gold hover:bg-mg-gold/10" : "border-mg-gold text-mg-gold hover:bg-mg-gold/10"}`}>
                      <Video size={18} />
                      {isFrench ? "Lien de Réunion" : "Meeting Link"}
                    </a>
                    <button onClick={() => handleCancelSession(session.id)} className={`flex items-center justify-center gap-2 px-8 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${isDark ? "text-white/50 hover:text-red-400 hover:bg-red-500/10" : "text-gray-500 hover:text-red-600 hover:bg-red-50"}`}>
                      <XCircle size={14} />
                      {isFrench ? "Annuler" : "Cancel"}
                    </button>
                  </div>
                </motion.div>
              ))
            )}
          </motion.div>
        )}

        {/* HISTORY TAB */}
        {activeTab === 'history' && (
          <motion.div key="history" initial="hidden" animate="show" exit={{ opacity: 0, y: -20 }} variants={container} className="space-y-6">
            {pastSessions.length === 0 ? (
               <div className={`p-12 text-center rounded-[2rem] border ${isDark ? "border-white/5 bg-[#111111]" : "border-black/5 bg-white"}`}>
                 <Clock3 size={48} className="mx-auto mb-4 text-mg-gold opacity-50" />
                 <h3 className={`text-xl font-bold mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>{isFrench ? "Aucun historique" : "No Session History"}</h3>
               </div>
            ) : (
              pastSessions.map((session, idx) => (
                <motion.div variants={item} key={idx} className={`p-6 md:p-8 rounded-[2rem] border ${isDark ? "border-white/5 bg-white/[0.02]" : "border-black/5 bg-[#faf7f0]"}`}>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                    <div>
                      <h3 className={`text-lg font-bold mb-1 ${isDark ? "text-white" : "text-gray-900"}`}>{isFrench ? session.type.fr : session.type.en}</h3>
                      <p className={`text-sm flex items-center gap-2 ${isDark ? "text-white/50" : "text-gray-500"}`}>
                        <CalendarCheck2 size={14} /> {session.date} • {session.time}
                      </p>
                    </div>
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold ${isDark ? "bg-white/5 text-white/70" : "bg-black/5 text-gray-700"}`}>
                      <User size={14} className="text-mg-gold" /> {session.mentor}
                    </span>
                  </div>
                  
                  <div className={`p-5 rounded-2xl border ${isDark ? "bg-[#111111] border-white/10" : "bg-white border-black/10"}`}>
                    <div className="flex items-center gap-2 mb-3">
                      <FileText size={16} className="text-mg-gold" />
                      <h4 className={`text-sm font-bold uppercase tracking-wider ${isDark ? "text-white/80" : "text-gray-800"}`}>{isFrench ? "Notes du Mentor" : "Mentor Notes"}</h4>
                    </div>
                    <p className={`text-sm leading-relaxed ${isDark ? "text-white/60" : "text-gray-600"}`}>
                      {isFrench ? session.notes.fr : session.notes.en}
                    </p>
                  </div>

                  <div className="mt-4 flex justify-end">
                    <button className={`inline-flex items-center gap-2 text-sm font-bold transition-colors ${isDark ? "text-mg-gold hover:text-white" : "text-mg-gold hover:text-black"}`}>
                      <PlayCircle size={16} />
                      {isFrench ? "Demander l'enregistrement" : "Request Recording"}
                    </button>
                  </div>
                </motion.div>
              ))
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* DEV SIMULATION TOGGLE - REMOVE LATER */}
      <div className="fixed bottom-6 left-6 z-[100] flex flex-col gap-2 p-3 rounded-2xl bg-black/90 backdrop-blur-md border border-white/20 shadow-2xl">
        <p className="text-[10px] font-bold text-white/50 uppercase tracking-wider text-center">Simulate Role</p>
        <div className="flex gap-2">
          <button onClick={() => setIsPremium(false)} className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors ${!isPremium ? "bg-red-500 text-white" : "text-white/50 hover:bg-white/10"}`}>Regular User</button>
          <button onClick={() => setIsPremium(true)} className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors ${isPremium ? "bg-mg-gold text-black" : "text-white/50 hover:bg-white/10"}`}>Premium User</button>
        </div>
      </div>
    </div>
  );
}
