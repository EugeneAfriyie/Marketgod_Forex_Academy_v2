import { useState } from "react";
import { MessageSquareMore, UsersRound, Video, ArrowRight, Search, Zap, ShieldCheck, Loader2, CheckCircle2, UserPlus, Clock, Send, Users, Bell, Lock, Crown } from "lucide-react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";
import { Link } from "react-router-dom";
const spaces = [
    {
        id: "hub",
        title: { en: "Student Conversation Hub", fr: "Hub de Conversation" },
        detail: { en: "Our 24/7 active channel for community questions, trade setups, and insight sharing.", fr: "Notre canal actif 24/7 pour les questions, les configurations et le partage." },
        icon: MessageSquareMore,
        action: { en: "Join Telegram", fr: "Rejoindre Telegram" },
        link: "https://t.me/marketgodcommunity",
        status: "active"
    },
    {
        id: "buddy",
        title: { en: "Trading Buddy Matchmaker", fr: "Recherche de Partenaire" },
        detail: { en: "Find a 1-on-1 accountability partner at your exact skill level to grow and share setups together.", fr: "Trouvez un partenaire de responsabilité en 1-à-1 à votre niveau pour grandir ensemble." },
        icon: UserPlus,
        action: { en: "Find a Buddy", fr: "Trouver un Partenaire" },
        link: "#matchmaking",
        status: "active"
    },
    {
        id: "group",
        title: { en: "Peer Accountability Circle", fr: "Cercle de Responsabilité" },
        detail: { en: "Join small, focused student groups (5-10 members) for maximum trading discipline and weekly check-ins.", fr: "Rejoignez de petits groupes (5-10) pour la discipline de trading et les suivis." },
        icon: UsersRound,
        action: { en: "Find a Group", fr: "Trouver un Groupe" },
        link: "#matchmaking",
        status: "active"
    },
    {
        id: "live",
        title: { en: "Live Review Room", fr: "Salle de Revue Live" },
        detail: { en: "An exclusive space for live lesson discussions, chart feedback, and group backtesting.", fr: "Un espace exclusif pour les discussions en direct et les retours sur graphiques." },
        icon: Video,
        action: { en: "Coming Soon", fr: "Bientôt Disponible" },
        link: "#",
        status: "locked"
    },
];
export default function CollaborationPage() {
    const { theme } = useTheme();
    const isDark = theme === "dark";
    // MOCK STATE: This will come from your user auth/subscription context later.
    // Set to `false` to see the locked sales/teaser page for regular users.
    // Set to `true` to see the active collaboration hub.
    const [isPremium, setIsPremium] = useState(false);
    // Trading Buddy Matchmaker State
    const [matchMode, setMatchMode] = useState<'buddy' | 'group'>('buddy');
    // Mocked from user profile/activity backend data
const [matchingState, setMatchingState] = useState<'idle' | 'searching' | 'found' | 'sending' | 'accepted'>('idle');
    // Simulator Notification State
    const [notifications, setNotifications] = useState<any[]>([]);
    const [showNotifications, setShowNotifications] = useState(false);
    const handleMatchmaking = () => {
        setMatchingState('searching');
        setTimeout(() => setMatchingState('found'), 2500);
    };
    const handleSendRequest = () => {
        setMatchingState('sending');
        // Simulate sending the request to the OTHER person's notification center
        setNotifications([{
                id: Date.now(),
                title: isGroup ? ("Group Join Request") : ("Buddy Match Request"),
                message: isGroup
                    ? ("A student wants to join the 'Alpha Snipers' squad.")
                    : ("An Intermediate student wants to be your trading buddy.")
            }]);
        // Auto-open the notification popup to easily guide the tester!
        setShowNotifications(true);
    };
    const handleAcceptRequest = () => {
        setNotifications([]);
        setShowNotifications(false);
        setMatchingState('accepted'); // Unlock the UI for the original sender
    };
    const handleDeclineRequest = () => {
        setNotifications([]);
        setShowNotifications(false);
        setMatchingState('idle'); // Reset the sender's UI
    };
    const isGroup = matchMode === 'group';
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
        return (<div className="space-y-8 pb-10">
        {/* Locked Hero Section */}
        <motion.div initial="hidden" animate="show" variants={container} className={`relative overflow-hidden rounded-[3rem] border shadow-2xl ${isDark ? "border-mg-gold/30 bg-[#0a0a0a]" : "border-mg-gold/40 bg-white"}`}>
          <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none"><Crown size={250} className="text-mg-gold"/></div>
          <div className="absolute inset-0 bg-gradient-to-br from-mg-gold/10 via-transparent to-transparent pointer-events-none"/>
          
          <div className="relative z-10 p-10 md:p-16 lg:p-20 flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-mg-gold/10 border border-mg-gold/30 px-4 py-1.5 text-xs font-black uppercase tracking-[0.2em] text-mg-gold mb-6 shadow-[0_0_15px_rgba(212,175,55,0.2)]">
              <Lock size={14}/>
              {"VIP Access Required"}
            </div>
            <h1 className={`text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight ${isDark ? "text-white" : "text-gray-900"}`}>
              {"Trading is a Multiplayer Game."} <br />
              <span className="text-mg-gold">{"Unlock the Inner Circle."}</span>
            </h1>
            <p className={`max-w-3xl text-lg md:text-xl font-medium mb-10 leading-relaxed ${isDark ? "text-white/70" : "text-gray-600"}`}>
              {"Collaboration is the best-kept secret of profitable traders. As a Premium member, you will gain access to our 24/7 Telegram Hub, get matched with strict accountability partners, and join live chart reviews."}
            </p>
            
            <Link to="/dashboard/mentorship" className="group relative overflow-hidden inline-flex items-center gap-3 rounded-2xl bg-mg-gold px-10 py-5 text-sm font-black uppercase tracking-[0.15em] text-black shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(212,175,55,0.6)]">
              <Crown size={20} className="relative z-10"/>
              <span className="relative z-10">{"Join Mentorship to Unlock"}</span>
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/50 to-transparent group-hover:animate-shimmer"/>
            </Link>
          </div>
        </motion.div>

        {/* Preview of Locked Features */}
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }} variants={container} className="grid gap-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
          {spaces.map((space, idx) => {
                const Icon = space.icon;
                return (<motion.article variants={item} key={idx} className={`relative overflow-hidden rounded-[2rem] border p-8 flex flex-col transition-all duration-300 opacity-75 grayscale-[30%] ${isDark ? "border-white/5 bg-[#111111]" : "border-black/5 bg-[#faf7f0]"}`}>
                <div className="absolute top-6 right-6">
                  <Lock size={20} className={isDark ? "text-white/20" : "text-black/20"}/>
                </div>
                <div>
                  <div className={`mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl ${isDark ? "bg-white/5 text-mg-gold/50" : "bg-black/5 text-mg-gold/50"}`}>
                    <Icon size={28}/>
                  </div>
                  <h3 className={`text-xl font-black mb-3 ${isDark ? "text-white" : "text-gray-900"}`}>
                    {space.title.en}
                  </h3>
                  <p className={`text-sm leading-relaxed font-medium ${isDark ? "text-white/60" : "text-gray-600"}`}>
                    {space.detail.en}
                  </p>
                </div>
              </motion.article>);
            })}
        </motion.div>

        {/* DEV SIMULATION TOGGLE - REMOVE LATER */}
        <div className="fixed bottom-6 left-6 z-[100] flex flex-col gap-2 p-3 rounded-2xl bg-black/90 backdrop-blur-md border border-white/20 shadow-2xl">
          <p className="text-[10px] font-bold text-white/50 uppercase tracking-wider text-center">Simulate Role</p>
          <div className="flex gap-2">
            <button onClick={() => setIsPremium(false)} className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors ${!isPremium ? "bg-red-500 text-white" : "text-white/50 hover:bg-white/10"}`}>Regular User</button>
            <button onClick={() => setIsPremium(true)} className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors ${isPremium ? "bg-mg-gold text-black" : "text-white/50 hover:bg-white/10"}`}>Premium User</button>
          </div>
        </div>
      </div>);
    }
    // ==========================================
    // PREMIUM VIEW (ACTIVE COLLABORATION HUB)
    // ==========================================
    return (<div className="space-y-8 pb-10">
      {/* Hero Section */}
      <motion.div initial="hidden" animate="show" variants={container} className={`relative overflow-hidden rounded-[3rem] border shadow-lg ${isDark ? "border-white/5 bg-[#0a0a0a]" : "border-black/5 bg-white"}`}>
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-mg-gold/10 blur-[100px] rounded-full pointer-events-none"/>
        <div className="relative z-10 p-8 md:p-12 lg:p-16">
          <h1 className={`text-4xl md:text-5xl font-black mb-4 tracking-tight ${isDark ? "text-white" : "text-gray-900"}`}>
            {"Community & "}
            <span className="text-mg-gold">{"Collaboration."}</span>
          </h1>
          <p className={`max-w-2xl text-lg font-medium ${isDark ? "text-white/70" : "text-gray-600"}`}>
            {"A dedicated area for student interaction, finding accountability partners, and peer support."}
          </p>
        </div>
      </motion.div>

      {/* Collaboration Hubs Grid */}
      <motion.div initial="hidden" animate="show" variants={container} className="grid gap-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
        {spaces.map((space, idx) => {
            const Icon = space.icon;
            const isLocked = space.status === "locked";
            return (<motion.article variants={item} key={idx} className={`group relative overflow-hidden rounded-[2rem] border p-8 flex flex-col justify-between transition-all duration-300 ${!isLocked ? "hover:-translate-y-1 hover:shadow-xl" : "opacity-80"} ${isDark ? "border-white/5 bg-[#111111] hover:border-mg-gold/30" : "border-black/5 bg-white hover:border-mg-gold/30"}`}>
              <div>
                <div className={`mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl ${isDark ? "bg-white/5 text-mg-gold" : "bg-black/5 text-mg-gold"}`}>
                  <Icon size={28}/>
                </div>
                <h3 className={`text-xl font-black mb-3 ${isDark ? "text-white" : "text-gray-900"}`}>
                  {space.title.en}
                </h3>
                <p className={`text-sm leading-relaxed font-medium mb-8 ${isDark ? "text-white/60" : "text-gray-600"}`}>
                  {space.detail.en}
                </p>
              </div>

              {isLocked ? (<div className={`inline-flex items-center justify-center w-full gap-2 rounded-xl px-4 py-3.5 text-sm font-bold uppercase tracking-wider border-2 border-dashed ${isDark ? "border-white/20 text-white/40" : "border-black/20 text-gray-400"}`}>
                  <ShieldCheck size={16}/>
                  {space.action.en}
                </div>) : (<a href={space.link} onClick={(e) => {
                        if (space.id === 'buddy' || space.id === 'group') {
                            e.preventDefault();
                            setMatchMode(space.id);
                            setMatchingState('idle');
                            document.getElementById('matchmaking')?.scrollIntoView({ behavior: 'smooth' });
                        }
                    }} target={space.link.startsWith("http") && !space.link.startsWith("#") ? "_blank" : "_self"} rel="noreferrer" className={`inline-flex items-center justify-center w-full gap-2 rounded-xl px-4 py-3.5 text-sm font-bold uppercase tracking-wider transition-all border-2 border-mg-gold text-mg-gold hover:bg-mg-gold/10`}>
                  {space.action.en}
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1"/>
                </a>)}
            </motion.article>);
        })}
      </motion.div>

      {/* Matchmaking Section */}
      <motion.div initial="hidden" animate="show" variants={container} id="matchmaking" className={`relative overflow-hidden rounded-[3rem] border shadow-lg mt-8 ${isDark ? "border-white/5 bg-[#111111]" : "border-black/5 bg-[#faf7f0]"}`}>
        <div className="p-8 md:p-12 flex flex-col lg:flex-row items-center gap-10">
          <div className="lg:w-1/2">
            <div className="inline-flex items-center gap-2 rounded-full bg-mg-gold/10 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-mg-gold mb-4 border border-mg-gold/20">
              <Zap size={14}/>
              {"New Feature"}
            </div>
            <h2 className={`text-3xl md:text-4xl font-black mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>
              {(isGroup ? "Find an Accountability Group" : "Find a Trading Buddy")}
            </h2>
            <p className={`text-lg font-medium mb-6 ${isDark ? "text-white/60" : "text-gray-600"}`}>
              {(isGroup ? "Join a small, focused squad of 5-10 traders. Share setups, track progress, and stay strictly disciplined together." : "Trading is tough solo. Get matched with a fellow MarketGod student to share markups, hold each other accountable, and grow together.")}
            </p>
          </div>

          <div className={`lg:w-1/2 w-full p-6 sm:p-8 rounded-[2rem] border ${isDark ? "border-white/10 bg-black/40" : "border-black/10 bg-white"}`}>
            <AnimatePresence mode="wait">
              {matchingState === 'idle' && (<motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <label className={`block text-sm font-bold mb-3 ${isDark ? "text-white/80" : "text-gray-700"}`}>
                    {"Your Assessed Level:"}
                  </label>
                  
                  <div className={`mb-6 rounded-2xl border p-5 flex items-center gap-4 ${isDark ? "bg-white/5 border-white/10" : "bg-black/5 border-black/10"}`}>
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-mg-gold/20 text-mg-gold">
                      <ShieldCheck size={24}/>
                    </div>
                    <div>
                      <p className={`text-xl font-black ${isDark ? "text-mg-gold" : "text-mg-gold"}`}>
                        {"Intermediate"}
                      </p>
                      <p className={`mt-1 text-xs font-medium leading-relaxed ${isDark ? "text-white/60" : "text-gray-600"}`}>
                        {"Based on your onboarding data and course completion, we will match you with peers at this exact level."}
                      </p>
                    </div>
                  </div>
                  <button onClick={handleMatchmaking} className="w-full flex items-center justify-center gap-2 rounded-xl bg-mg-gold px-8 py-4 text-sm font-black uppercase tracking-wider text-black shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-transform hover:scale-[1.02]">
                    <Search size={18}/>
                    {(isGroup ? "Match Me With a Group" : "Match Me With a Buddy")}
                  </button>
                </motion.div>)}

              {matchingState === 'searching' && (<motion.div key="searching" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center justify-center py-8">
                  <Loader2 size={48} className="animate-spin text-mg-gold mb-6"/>
                  <h3 className={`text-xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>{(isGroup ? "Searching for an open group..." : "Searching for the perfect match...")}</h3>
                  <p className={`text-sm mt-2 ${isDark ? "text-white/50" : "text-gray-500"}`}>
                    {"Scanning for active Intermediate profiles..."}
                  </p>
                </motion.div>)}

              {matchingState === 'found' && (<motion.div key="found" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center text-center py-4">
                  {isGroup ? (<Users size={64} className="text-mg-gold drop-shadow-[0_0_15px_rgba(212,175,55,0.4)] mb-4"/>) : (<UserPlus size={64} className="text-mg-gold drop-shadow-[0_0_15px_rgba(212,175,55,0.4)] mb-4"/>)}
                  <h3 className={`text-2xl font-black mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>{(isGroup ? "Group Found!" : "Partner Found!")}</h3>
                  <p className={`text-sm mb-6 ${isDark ? "text-white/70" : "text-gray-600"}`}>
                    {(isGroup ? "We found an active group with an open slot: " : "We've matched you with ")} 
                    <strong>{isGroup ? "'Alpha Snipers'" : "Kwame A."}</strong> ({"Same Level"})
                  </p>
                  <button onClick={handleSendRequest} className="w-full flex items-center justify-center gap-2 rounded-xl bg-mg-gold px-8 py-3.5 text-sm font-black uppercase tracking-wider text-black shadow-[0_0_15px_rgba(212,175,55,0.3)] transition-transform hover:scale-[1.02]">
                    <Send size={18}/>
                    {(isGroup ? "Send Request to Admin" : "Send Request")}
                  </button>
                  <button onClick={() => setMatchingState('idle')} className={`mt-3 w-full flex items-center justify-center gap-2 rounded-xl px-8 py-3.5 text-sm font-bold uppercase tracking-wider transition-colors ${isDark ? "text-white/50 hover:text-white hover:bg-white/5" : "text-gray-500 hover:text-black hover:bg-black/5"}`}>
                    {"Skip"}
                  </button>
                </motion.div>)}

              {matchingState === 'sending' && (<motion.div key="sending" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center justify-center py-8 text-center">
                  <Clock size={48} className="animate-pulse text-mg-gold mb-6"/>
                  <h3 className={`text-xl font-black ${isDark ? "text-white" : "text-gray-900"}`}>{"Request Sent!"}</h3>
                  <p className={`text-sm mt-2 max-w-xs ${isDark ? "text-white/50" : "text-gray-500"}`}>
                    {(isGroup ? "Waiting for the group admin to approve your request..." : "Waiting for Kwame A. to accept your connection request...")}
                  </p>
                  <p className="mt-8 text-xs font-bold uppercase tracking-widest text-mg-gold animate-bounce">
                    {"👉 Check the bell on the bottom right to simulate the recipient!"}
                  </p>
                </motion.div>)}

              {matchingState === 'accepted' && (<motion.div key="accepted" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center text-center py-4">
                  <CheckCircle2 size={64} className="text-mg-gold drop-shadow-[0_0_15px_rgba(212,175,55,0.4)] mb-4"/>
                  <h3 className={`text-2xl font-black mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>
                    {(isGroup ? "Request Approved!" : "Request Accepted!")}
                  </h3>
                  <p className={`text-sm mb-6 ${isDark ? "text-white/70" : "text-gray-600"}`}>
                    {(isGroup ? "The admin has approved your request. You can now access the group chat:" : "Kwame A. has shared their Telegram ID:")} <br />
                    <strong className="text-xl tracking-wider text-mg-gold mt-2 block">{isGroup ? "t.me/alpha_snipers_mg" : "@kwame_trades"}</strong>
                  </p>
                  <a href="https://t.me/marketgodcommunity" target="_blank" rel="noreferrer" className="w-full flex items-center justify-center gap-2 rounded-xl bg-mg-gold px-8 py-3.5 text-sm font-black uppercase tracking-wider text-black shadow-[0_0_15px_rgba(212,175,55,0.3)] transition-transform hover:scale-[1.02]">
                    {isGroup ? <Users size={18}/> : <MessageSquareMore size={18}/>}
                    {(isGroup ? "Join Group Chat" : "Start Chatting")}
                  </a>
                  <button onClick={() => setMatchingState('idle')} className={`mt-3 w-full flex items-center justify-center gap-2 rounded-xl px-8 py-3.5 text-sm font-bold uppercase tracking-wider transition-colors ${isDark ? "text-white/50 hover:text-white hover:bg-white/5" : "text-gray-500 hover:text-black hover:bg-black/5"}`}>
                    {(isGroup ? "Find Another Group" : "Find Another Buddy")}
                  </button>
                </motion.div>)}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      {/* Floating Simulator Notification Bell */}
      <div className="fixed bottom-6 right-6 z-50">
        <div className="relative">
          <button onClick={() => setShowNotifications(!showNotifications)} className={`relative flex h-14 w-14 items-center justify-center rounded-full border-2 transition-all ${isDark ? "bg-[#111111] border-mg-gold/50 text-mg-gold hover:bg-mg-gold/10" : "bg-white border-mg-gold/50 text-mg-gold hover:bg-mg-gold/10"} backdrop-blur-md shadow-[0_10px_25px_rgba(0,0,0,0.3)]`}>
            <Bell size={24}/>
            {notifications.length > 0 && (<span className="absolute top-0 right-0 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white shadow-lg animate-bounce">
                {notifications.length}
              </span>)}
          </button>

          <AnimatePresence>
            {showNotifications && (<motion.div initial={{ opacity: 0, y: 20, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.95 }} className={`absolute bottom-full right-0 mb-4 w-80 overflow-hidden rounded-2xl border shadow-2xl ${isDark ? "border-white/10 bg-[#111111]" : "border-black/10 bg-white"}`}>
                <div className={`border-b p-4 ${isDark ? "border-white/10 bg-white/5" : "border-black/10 bg-black/5"}`}>
                  <h4 className={`font-bold ${isDark ? "text-white" : "text-gray-900"}`}>{"Recipient Simulator"}</h4>
                </div>
                <div className="p-2 max-h-[300px] overflow-y-auto">
                  {notifications.length === 0 ? (<p className={`p-6 text-center text-sm font-medium ${isDark ? "text-white/50" : "text-gray-500"}`}>
                      {"No pending requests."}
                    </p>) : (notifications.map(notif => (<div key={notif.id} className={`m-2 p-4 rounded-xl border ${isDark ? "border-mg-gold/20 bg-mg-gold/5" : "border-mg-gold/20 bg-mg-gold/10"}`}>
                        <p className={`text-xs font-bold uppercase tracking-wider text-mg-gold mb-2`}>{notif.title}</p>
                        <p className={`text-sm mb-5 leading-relaxed font-medium ${isDark ? "text-white/80" : "text-gray-800"}`}>{notif.message}</p>
                        <div className="flex gap-2">
                          <button onClick={handleAcceptRequest} className="flex-1 rounded-lg bg-mg-gold py-2.5 text-xs font-black uppercase tracking-wider text-black hover:scale-105 transition-transform shadow-[0_0_10px_rgba(212,175,55,0.4)]">
                            {"Accept"}
                          </button>
                          <button onClick={handleDeclineRequest} className={`flex-1 rounded-lg border py-2.5 text-xs font-bold uppercase tracking-wider transition-colors ${isDark ? "border-white/20 text-white hover:bg-white/10" : "border-black/20 text-black hover:bg-black/10"}`}>
                            {"Decline"}
                          </button>
                        </div>
                      </div>)))}
                </div>
              </motion.div>)}
          </AnimatePresence>
        </div>
      </div>

      {/* DEV SIMULATION TOGGLE - REMOVE LATER */}
      <div className="fixed bottom-6 left-6 z-[100] flex flex-col gap-2 p-3 rounded-2xl bg-black/90 backdrop-blur-md border border-white/20 shadow-2xl">
        <p className="text-[10px] font-bold text-white/50 uppercase tracking-wider text-center">Simulate Role</p>
        <div className="flex gap-2">
          <button onClick={() => setIsPremium(false)} className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors ${!isPremium ? "bg-red-500 text-white" : "text-white/50 hover:bg-white/10"}`}>Regular User</button>
          <button onClick={() => setIsPremium(true)} className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors ${isPremium ? "bg-mg-gold text-black" : "text-white/50 hover:bg-white/10"}`}>Premium User</button>
        </div>
      </div>
    </div>);
}

