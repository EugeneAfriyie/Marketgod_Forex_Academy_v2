import { useState, useRef } from "react";
import { motion, AnimatePresence, type Variants, useMotionValue, useSpring, useTransform, useMotionTemplate } from "framer-motion";
import { User, Shield, Bell, Camera, Save, Loader2, Mail, Phone, Lock, MapPin, CreditCard, ShieldCheck, Send, Wifi, QrCode, BadgeCheck, X } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Mock User Data
const mockUser = {
    id: "MG-8924",
    role: "Student",
    name: "Eugene Afriyie",
    email: "kwame.trades@example.com",
    phone: "+233 50 123 4567",
    telegram: "@eugenetrading",
    country: "Ghana",
    bio: "Focused on Gold and EU. Trading the London breakout and New York overlap.",
    rank: "Elite Sniper",
    joinDate: "August 2025"
};
const getCardStyles = (rank: string, role: string) => {
    if (role === "Admin") {
        return {
            border: "border-white/20",
            frontBg: "from-black via-zinc-900 to-black",
            backBg: "bg-black",
            glow: "bg-white/10",
            text: "text-white",
            qrColor: "FFFFFF"
        };
    }
    if (role === "Mentor") {
        return {
            border: "border-white/20",
            frontBg: "from-zinc-800 via-zinc-900 to-black",
            backBg: "bg-zinc-900",
            glow: "bg-white/10",
            text: "text-white",
            qrColor: "FFFFFF"
        };
    }
    switch (rank) {
        case "Novice":
            return {
                border: "border-gray-300/40",
                frontBg: "from-gray-300 via-gray-400 to-gray-500",
                backBg: "bg-gray-400",
                glow: "bg-white/20",
                text: "text-gray-900",
                qrColor: "111827"
            };
        case "Pro":
            return {
                border: "border-zinc-500/40",
                frontBg: "from-zinc-700 via-zinc-800 to-zinc-900",
                backBg: "bg-zinc-800",
                glow: "bg-zinc-400/10",
                text: "text-zinc-300",
                qrColor: "D4D4D8"
            };
        case "VIP":
            return {
                border: "border-slate-400/40",
                frontBg: "from-slate-800 via-slate-900 to-black",
                backBg: "bg-slate-900",
                glow: "bg-slate-400/10",
                text: "text-slate-300",
                qrColor: "CBD5E1"
            };
        case "Elite Sniper":
        default:
            return {
                border: "border-mg-gold/40",
                frontBg: "from-zinc-900 via-black to-zinc-900",
                backBg: "bg-[#0a0a0a]",
                glow: "bg-mg-gold/20",
                text: "text-mg-gold",
                qrColor: "D4AF37"
            };
    }
};
export default function ProfilePage() {
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const [activeTab, setActiveTab] = useState<"general" | "security" | "notifications">("general");
    // Form States
    const [formData, setFormData] = useState(mockUser);
    const [passwords, setPasswords] = useState({ current: "", new: "", confirm: "" });
    const [notifications, setNotifications] = useState({ email: true, telegram: false, marketing: true });
    // Save State
    const [isSaving, setIsSaving] = useState(false);
    // Avatar Upload States
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const handleImageClick = () => {
        fileInputRef.current?.click();
    };
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatarUrl(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };
    // 3D Academy Card States & Physics
    const [isCardFlipped, setIsCardFlipped] = useState(false);
    const [isCardModalOpen, setIsCardModalOpen] = useState(false);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const mouseXSpring = useSpring(mouseX, { stiffness: 300, damping: 20 });
    const mouseYSpring = useSpring(mouseY, { stiffness: 300, damping: 20 });
    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);
    // Dynamic Glare Effect mapping
    const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ["100%", "0%"]);
    const glareY = useTransform(mouseYSpring, [-0.5, 0.5], ["100%", "0%"]);
    const backgroundOrigin = useMotionTemplate `${glareX} ${glareY}`;
    const cardFrontBackground = useMotionTemplate `radial-gradient(circle at ${backgroundOrigin}, rgba(255,255,255,0.8) 0%, transparent 60%)`;
    const cardBackBackground = useMotionTemplate `radial-gradient(circle at ${backgroundOrigin}, rgba(255,255,255,0.6) 0%, transparent 60%)`;
    const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
        mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
    };
    const handleCardMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };
    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        // Simulate API call
        setTimeout(() => {
            setIsSaving(false);
            toast.success("Changes saved successfully!");
        }, 1500);
    };
    const container: Variants = {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };
    const cardStyle = getCardStyles(formData.rank, formData.role);
    // Sub-renders for the 3D Card Front & Back to keep code DRY
    const renderCardFront = () => (<div className={`absolute inset-0 w-full h-full rounded-2xl border ${cardStyle.border} bg-gradient-to-br ${cardStyle.frontBg} shadow-2xl [backface-visibility:hidden] overflow-hidden p-5 flex flex-col justify-between`}>
      {/* Card Background Gloss */}
      <motion.div className="absolute inset-0 z-0 pointer-events-none mix-blend-overlay opacity-60" style={{ background: cardFrontBackground }}/>
      {/* Dynamic Rank Glow */}
      <div className={`absolute -top-20 -right-20 w-40 h-40 ${cardStyle.glow} blur-3xl rounded-full pointer-events-none`}/>
      
      {/* Header */}
      <div className="flex justify-between items-start relative z-10">
        <div className="flex items-center gap-2.5">
          <img src="/logo.png" alt="Logo" className="h-7 w-auto object-contain" onError={(e) => e.currentTarget.style.display = 'none'}/>
          <div className="flex flex-col items-start">
            <h2 className={`${cardStyle.text} font-black tracking-widest text-[10px] sm:text-xs uppercase leading-tight`}>MarketGod<br />Academy</h2>
            {formData.role !== "Student" && (<span className={`mt-1 rounded border ${cardStyle.border} ${cardStyle.text === 'text-black' || cardStyle.text === 'text-gray-900' ? 'bg-black/5' : 'bg-black/50'} px-1.5 py-0.5 text-[8px] font-black uppercase tracking-widest ${cardStyle.text}`}>
                {formData.role}
              </span>)}
          </div>
        </div>
        <Wifi size={24} className={`${cardStyle.text} opacity-80 rotate-90`}/>
      </div>
      
      {/* Chip */}
      <div className="relative z-10 w-10 h-7 rounded-md bg-gradient-to-br from-yellow-200 via-yellow-500 to-yellow-700 border border-yellow-600/50 flex items-center justify-center opacity-90 overflow-hidden">
        <div className="w-full h-[1px] bg-black/20 absolute top-1/3"/>
        <div className="w-full h-[1px] bg-black/20 absolute bottom-1/3"/>
        <div className="h-full w-[1px] bg-black/20 absolute left-1/3"/>
        <div className="h-full w-[1px] bg-black/20 absolute right-1/3"/>
      </div>
      
      {/* Personal Info Grid */}
      <div className="relative z-10 grid grid-cols-2 gap-x-2 gap-y-2 mt-2 mb-1">
        <div>
          <p className={`text-[6px] ${cardStyle.text} opacity-70 uppercase tracking-wider`}>{"Email"}</p>
          <p className={`text-[9px] ${cardStyle.text} opacity-90 font-mono truncate max-w-[140px]`}>{formData.email}</p>
        </div>
        <div>
          <p className={`text-[6px] ${cardStyle.text} opacity-70 uppercase tracking-wider`}>{"Phone"}</p>
          <p className={`text-[9px] ${cardStyle.text} opacity-90 font-mono truncate`}>{formData.phone}</p>
        </div>
        <div>
          <p className={`text-[6px] ${cardStyle.text} opacity-70 uppercase tracking-wider`}>{"Country"}</p>
          <p className={`text-[9px] ${cardStyle.text} opacity-90 font-mono truncate`}>{formData.country}</p>
        </div>
        <div>
          <p className={`text-[6px] ${cardStyle.text} opacity-70 uppercase tracking-wider`}>{"Joined"}</p>
          <p className={`text-[9px] ${cardStyle.text} opacity-90 font-mono truncate`}>{formData.joinDate}</p>
        </div>
      </div>

      {/* Footer Info */}
      <div className="relative z-10">
        <p className={`${cardStyle.text} opacity-50 text-[10px] uppercase tracking-widest font-bold mb-1`}>{formData.rank}</p>
        <div className="flex justify-between items-end">
          <p className={`${cardStyle.text} font-mono text-lg uppercase tracking-wider`}>{formData.name}</p>
          <p className={`${cardStyle.text} opacity-50 font-mono text-xs`}>{formData.id}</p>
        </div>
      </div>
    </div>);
    const renderCardBack = () => (<div className={`absolute inset-0 w-full h-full rounded-2xl border ${cardStyle.border} ${cardStyle.backBg} shadow-2xl [backface-visibility:hidden] [transform:rotateY(180deg)] overflow-hidden flex flex-col`}>
      <motion.div className="absolute inset-0 z-0 pointer-events-none mix-blend-overlay opacity-30" style={{ background: cardBackBackground }}/>
      <div className={`relative z-10 w-full h-10 mt-4 opacity-80 shrink-0 ${cardStyle.text === 'text-black' || cardStyle.text === 'text-gray-900' ? 'bg-gray-800' : 'bg-black'}`}/>
      
      {/* Contact Info just below Mag Stripe */}
      <div className={`relative z-10 flex justify-between items-center text-[5px] ${cardStyle.text} opacity-60 uppercase tracking-widest mt-1 px-5`}>
        <span>support@marketgod.academy</span>
        <span>marketgodacademy.com</span>
      </div>

      <div className="relative z-10 px-5 py-2 flex-1 flex flex-col justify-between">
        
        {/* Signature & Security Code */}
        <div className="flex flex-col mt-2">
          <span className={`text-[5px] uppercase ${cardStyle.text} opacity-60 mb-0.5 ml-1`}>{"Authorized Signature - Not valid unless signed"}</span>
          <div className="flex items-center gap-1.5">
            <div className="flex-1 h-7 bg-white border border-black/10 flex items-center px-3 rounded-sm bg-[repeating-linear-gradient(45deg,transparent,transparent_2px,rgba(0,0,0,0.05)_2px,rgba(0,0,0,0.05)_4px)]">
              <span className="font-serif text-black/80 italic text-sm opacity-80">{formData.name}</span>
            </div>
            <div className="w-8 h-7 bg-white border border-black/10 flex items-center justify-center rounded-sm text-[9px] font-mono text-black font-bold italic">
              892
            </div>
          </div>
        </div>
        
        <div className="flex justify-between items-end mt-auto mb-1">
          <p className={`text-[5px] ${cardStyle.text} opacity-60 uppercase leading-tight max-w-[170px]`}>
            {"This card remains the property of MarketGod Academy. Access is granted exclusively to the named member. If found, please return to the academy."}
          </p>
          <div className="flex items-center gap-2">
            {/* Holographic Seal */}
            <div className="h-6 w-6 rounded-full bg-gradient-to-tr from-yellow-300 via-yellow-600 to-yellow-800 flex items-center justify-center opacity-80 shadow-[0_0_8px_rgba(212,175,55,0.4)]">
              <ShieldCheck size={10} className="text-black opacity-70"/>
            </div>
            <img src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent('https://marketgodacademy.com/verify/' + formData.id)}&color=${cardStyle.qrColor}&bgcolor=0a0a0a`} alt="Verification QR Code" className={`w-7 h-7 shrink-0 rounded-sm border ${cardStyle.border}`} title="Scan to Verify ID"/>
          </div>
        </div>
      </div>
    </div>);
    return (<div className="space-y-8 pb-10">
      {/* Toast Notification Container */}
      <ToastContainer theme={isDark ? "dark" : "light"} position="bottom-right" autoClose={3000} />

      {/* Hero Section & Avatar */}
      <motion.div initial="hidden" animate="show" variants={container} className={`relative overflow-hidden rounded-[3rem] border shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-8 ${isDark ? "border-white/5 bg-[#0a0a0a]" : "border-black/5 bg-white"}`}>
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-mg-gold/10 blur-[100px] rounded-full pointer-events-none"/>
        
        <div className="relative z-10 p-8 md:p-12 flex flex-col xl:flex-row items-center justify-between gap-12 w-full">
          
          {/* Left Side: Avatar & Info */}
          <div className="flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
            {/* Avatar Upload */}
            <div className="relative shrink-0 group cursor-pointer" onClick={handleImageClick}>
              <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${cardStyle.frontBg} blur-[8px] opacity-60 group-hover:opacity-100 transition-opacity duration-500`}/>
              <div className={`relative h-32 w-32 rounded-full overflow-hidden border-[3px] flex items-center justify-center text-4xl font-black shadow-2xl transition-transform group-hover:scale-105 ${isDark ? "border-[#111] bg-[#111] text-white" : "border-white bg-gray-50 text-gray-900"}`}>
                {avatarUrl ? (<img src={avatarUrl} alt="Profile Avatar" className="h-full w-full object-cover"/>) : (formData.name.charAt(0))}
              </div>
            <button type="button" className="absolute bottom-0 right-0 h-10 w-10 rounded-full bg-mg-gold text-black flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
              <Camera size={18}/>
            </button>
            <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handleImageChange}/>
          </div>

            {/* User Info */}
            <div>
              <div className={`inline-flex items-center gap-2 rounded-full ${cardStyle.glow} px-3 py-1.5 text-xs font-bold uppercase tracking-wider ${cardStyle.text} border ${cardStyle.border} mb-3`}>
                <ShieldCheck size={14}/>
                {formData.rank}
              </div>
              <h1 className={`text-3xl md:text-4xl font-black mb-2 tracking-tight flex items-center justify-center md:justify-start gap-3 ${isDark ? "text-white" : "text-gray-900"}`}>
                {formData.name}
                <BadgeCheck size={28} className={`${cardStyle.text} drop-shadow-[0_0_15px_rgba(212,175,55,0.4)]`}/>
              </h1>
              <p className={`text-sm font-medium ${isDark ? "text-white/60" : "text-gray-500"}`}>
                {"Member since:"} {formData.joinDate}
              </p>
            </div>
          </div>

          {/* Right Side: Rotating Mini Academy Card */}
          <div className="shrink-0 flex flex-col items-center">
            <div className="relative group cursor-pointer rounded-2xl overflow-hidden shadow-2xl border border-mg-gold/20" onClick={() => setIsCardModalOpen(true)}>
              <div className="w-[204px] h-[128px] relative bg-black/80">
                <div className="perspective-[1000px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-[0.6]">
                  <motion.div animate={{ rotateY: [0, 360] }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }} style={{ transformStyle: "preserve-3d" }} className="relative w-[340px] h-[214px]">
                    {renderCardFront()}
                    {renderCardBack()}
                  </motion.div>
                </div>
              </div>
              
              {/* CTA Overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm z-10">
                 <span className="bg-mg-gold text-black px-4 py-2 rounded-xl font-bold text-sm uppercase tracking-wider shadow-[0_0_15px_rgba(212,175,55,0.4)] flex items-center gap-2 transition-transform scale-95 group-hover:scale-100">
                   <QrCode size={16}/> {"View Card"}
                 </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Navigation Tabs */}
      <motion.div initial="hidden" animate="show" variants={container} className="flex justify-center md:justify-start">
        <div className={`flex flex-wrap justify-center rounded-xl p-1 border shadow-inner w-full md:w-auto ${isDark ? "bg-[#0f141b] border-white/10" : "bg-white border-black/10"}`}>
          <button onClick={() => setActiveTab('general')} className={`flex flex-1 md:flex-none items-center justify-center gap-2 px-6 py-3 rounded-lg font-bold text-sm transition-all ${activeTab === 'general' ? 'bg-mg-gold text-black shadow-md' : isDark ? 'text-white/60 hover:text-white hover:bg-white/5' : 'text-gray-500 hover:text-black hover:bg-black/5'}`}>
            <User size={16}/>
            {"General"}
          </button>
          <button onClick={() => setActiveTab('security')} className={`flex flex-1 md:flex-none items-center justify-center gap-2 px-6 py-3 rounded-lg font-bold text-sm transition-all ${activeTab === 'security' ? 'bg-mg-gold text-black shadow-md' : isDark ? 'text-white/60 hover:text-white hover:bg-white/5' : 'text-gray-500 hover:text-black hover:bg-black/5'}`}>
            <Shield size={16}/>
            {"Security"}
          </button>
          <button onClick={() => setActiveTab('notifications')} className={`flex flex-1 md:flex-none items-center justify-center gap-2 px-6 py-3 rounded-lg font-bold text-sm transition-all ${activeTab === 'notifications' ? 'bg-mg-gold text-black shadow-md' : isDark ? 'text-white/60 hover:text-white hover:bg-white/5' : 'text-gray-500 hover:text-black hover:bg-black/5'}`}>
            <Bell size={16}/>
            {"Notifications"}
          </button>
        </div>
      </motion.div>

      {/* Tab Content */}
      <motion.div initial="hidden" animate="show" variants={container} className={`rounded-[2.5rem] border shadow-xl overflow-hidden ${isDark ? "border-white/10 bg-[#111111]" : "border-black/10 bg-white"}`}>
        <form onSubmit={handleSave}>
          <div className="p-8 md:p-10 lg:p-12">
            
            <AnimatePresence mode="wait">
              {/* GENERAL TAB */}
              {activeTab === 'general' && (<motion.div key="general" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.2 }} className="space-y-8">
                  <div>
                    <h2 className={`text-2xl font-black mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>{"Personal Information"}</h2>
                    <p className={`text-sm ${isDark ? "text-white/60" : "text-gray-500"}`}>{"Update your basic profile details and how others see you."}</p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className={`block text-sm font-bold mb-2 ${isDark ? "text-white/80" : "text-gray-700"}`}>{"Full Name"}</label>
                      <div className="relative">
                        <User size={18} className={`absolute left-4 top-1/2 -translate-y-1/2 ${isDark ? "text-white/40" : "text-gray-400"}`}/>
                        <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className={`w-full pl-12 pr-4 py-4 rounded-xl text-sm border focus:outline-none focus:border-mg-gold focus:ring-4 focus:ring-mg-gold/10 transition-all ${isDark ? "bg-black/20 border-white/10 text-white" : "bg-gray-50 border-black/10 text-gray-900"}`}/>
                      </div>
                    </div>
                    <div>
                      <label className={`block text-sm font-bold mb-2 ${isDark ? "text-white/80" : "text-gray-700"}`}>{"Email Address"}</label>
                      <div className="relative">
                        <Mail size={18} className={`absolute left-4 top-1/2 -translate-y-1/2 ${isDark ? "text-white/40" : "text-gray-400"}`}/>
                        <input type="email" value={formData.email} disabled className={`w-full pl-12 pr-4 py-4 rounded-xl text-sm border opacity-70 cursor-not-allowed focus:outline-none ${isDark ? "bg-black/40 border-white/5 text-white/70" : "bg-gray-100 border-black/5 text-gray-600"}`}/>
                      </div>
                      <p className="text-xs text-mg-gold mt-2 font-medium">{"Email can only be changed via support."}</p>
                    </div>
                    <div>
                      <label className={`block text-sm font-bold mb-2 ${isDark ? "text-white/80" : "text-gray-700"}`}>{"Phone Number"}</label>
                      <div className="relative">
                        <Phone size={18} className={`absolute left-4 top-1/2 -translate-y-1/2 ${isDark ? "text-white/40" : "text-gray-400"}`}/>
                        <input type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className={`w-full pl-12 pr-4 py-4 rounded-xl text-sm border focus:outline-none focus:border-mg-gold focus:ring-4 focus:ring-mg-gold/10 transition-all ${isDark ? "bg-black/20 border-white/10 text-white" : "bg-gray-50 border-black/10 text-gray-900"}`}/>
                      </div>
                    </div>
                    <div>
                      <label className={`block text-sm font-bold mb-2 ${isDark ? "text-white/80" : "text-gray-700"}`}>{"Telegram Username"}</label>
                      <div className="relative">
                        <Send size={18} className={`absolute left-4 top-1/2 -translate-y-1/2 ${isDark ? "text-white/40" : "text-gray-400"}`}/>
                        <input type="text" value={formData.telegram} onChange={(e) => setFormData({ ...formData, telegram: e.target.value })} className={`w-full pl-12 pr-4 py-4 rounded-xl text-sm border focus:outline-none focus:border-mg-gold focus:ring-4 focus:ring-mg-gold/10 transition-all ${isDark ? "bg-black/20 border-white/10 text-white" : "bg-gray-50 border-black/10 text-gray-900"}`}/>
                      </div>
                    </div>
                    <div>
                      <label className={`block text-sm font-bold mb-2 ${isDark ? "text-white/80" : "text-gray-700"}`}>{"Country"}</label>
                      <div className="relative">
                        <MapPin size={18} className={`absolute left-4 top-1/2 -translate-y-1/2 ${isDark ? "text-white/40" : "text-gray-400"}`}/>
                        <select value={formData.country} onChange={(e) => setFormData({ ...formData, country: e.target.value })} className={`w-full pl-12 pr-4 py-4 rounded-xl text-sm border focus:outline-none focus:border-mg-gold focus:ring-4 focus:ring-mg-gold/10 transition-all appearance-none ${isDark ? "bg-black/20 border-white/10 text-white" : "bg-gray-50 border-black/10 text-gray-900"}`}>
                          <option value="Ghana">Ghana</option>
                          <option value="Nigeria">Nigeria</option>
                          <option value="South Africa">South Africa</option>
                          <option value="United States">United States</option>
                          <option value="United Kingdom">United Kingdom</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className={`block text-sm font-bold mb-2 ${isDark ? "text-white/80" : "text-gray-700"}`}>{"Bio / Trading Style"}</label>
                    <textarea value={formData.bio} onChange={(e) => setFormData({ ...formData, bio: e.target.value })} rows={4} className={`w-full p-4 rounded-xl text-sm border focus:outline-none focus:border-mg-gold focus:ring-4 focus:ring-mg-gold/10 transition-all resize-none ${isDark ? "bg-black/20 border-white/10 text-white" : "bg-gray-50 border-black/10 text-gray-900"}`}/>
                  </div>
                </motion.div>)}

              {/* SECURITY TAB */}
              {activeTab === 'security' && (<motion.div key="security" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.2 }} className="space-y-8">
                  <div>
                    <h2 className={`text-2xl font-black mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>{"Account Security"}</h2>
                    <p className={`text-sm ${isDark ? "text-white/60" : "text-gray-500"}`}>{"Manage your password and security preferences."}</p>
                  </div>

                  <div className="max-w-2xl space-y-6">
                    <div>
                      <label className={`block text-sm font-bold mb-2 ${isDark ? "text-white/80" : "text-gray-700"}`}>{"Current Password"}</label>
                      <div className="relative">
                        <Lock size={18} className={`absolute left-4 top-1/2 -translate-y-1/2 ${isDark ? "text-white/40" : "text-gray-400"}`}/>
                        <input type="password" value={passwords.current} onChange={(e) => setPasswords({ ...passwords, current: e.target.value })} placeholder="••••••••" className={`w-full pl-12 pr-4 py-4 rounded-xl text-sm border focus:outline-none focus:border-mg-gold focus:ring-4 focus:ring-mg-gold/10 transition-all ${isDark ? "bg-black/20 border-white/10 text-white" : "bg-gray-50 border-black/10 text-gray-900"}`}/>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t border-white/5 dark:border-white/10 border-black/5">
                      <label className={`block text-sm font-bold mb-2 ${isDark ? "text-white/80" : "text-gray-700"}`}>{"New Password"}</label>
                      <div className="relative">
                        <Shield size={18} className={`absolute left-4 top-1/2 -translate-y-1/2 ${isDark ? "text-white/40" : "text-gray-400"}`}/>
                        <input type="password" value={passwords.new} onChange={(e) => setPasswords({ ...passwords, new: e.target.value })} placeholder="••••••••" className={`w-full pl-12 pr-4 py-4 rounded-xl text-sm border focus:outline-none focus:border-mg-gold focus:ring-4 focus:ring-mg-gold/10 transition-all ${isDark ? "bg-black/20 border-white/10 text-white" : "bg-gray-50 border-black/10 text-gray-900"}`}/>
                      </div>
                    </div>

                    <div>
                      <label className={`block text-sm font-bold mb-2 ${isDark ? "text-white/80" : "text-gray-700"}`}>{"Confirm New Password"}</label>
                      <div className="relative">
                        <ShieldCheck size={18} className={`absolute left-4 top-1/2 -translate-y-1/2 ${isDark ? "text-white/40" : "text-gray-400"}`}/>
                        <input type="password" value={passwords.confirm} onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })} placeholder="••••••••" className={`w-full pl-12 pr-4 py-4 rounded-xl text-sm border focus:outline-none focus:border-mg-gold focus:ring-4 focus:ring-mg-gold/10 transition-all ${isDark ? "bg-black/20 border-white/10 text-white" : "bg-gray-50 border-black/10 text-gray-900"}`}/>
                      </div>
                    </div>
                  </div>
                </motion.div>)}

              {/* NOTIFICATIONS TAB */}
              {activeTab === 'notifications' && (<motion.div key="notifications" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.2 }} className="space-y-8">
                  <div>
                    <h2 className={`text-2xl font-black mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>{"Notification Preferences"}</h2>
                    <p className={`text-sm ${isDark ? "text-white/60" : "text-gray-500"}`}>{"Choose how you want to be contacted."}</p>
                  </div>

                  <div className="max-w-2xl space-y-4">
                    {[
                { id: 'email', label: "Email Notifications", desc: "Receive updates about your account via email.", icon: Mail },
                { id: 'telegram', label: "Telegram Alerts", desc: "Get important security and login alerts to your Telegram.", icon: Send },
                { id: 'marketing', label: "Marketing & Offers", desc: "Receive news about new courses, live events, or merchandise.", icon: CreditCard },
            ].map((item) => (<div key={item.id} className={`flex items-center justify-between p-5 rounded-2xl border transition-colors ${isDark ? "bg-white/5 border-white/10" : "bg-gray-50 border-black/5"}`}>
                        <div className="flex items-center gap-4">
                          <div className={`flex h-10 w-10 items-center justify-center rounded-full ${isDark ? "bg-white/10 text-white" : "bg-black/5 text-gray-900"}`}>
                            <item.icon size={18}/>
                          </div>
                          <div>
                            <h4 className={`font-bold ${isDark ? "text-white" : "text-gray-900"}`}>{item.label}</h4>
                            <p className={`text-xs mt-1 ${isDark ? "text-white/50" : "text-gray-500"}`}>{item.desc}</p>
                          </div>
                        </div>
                        <button type="button" onClick={() => setNotifications(prev => ({ ...prev, [item.id]: !prev[item.id as keyof typeof prev] }))} className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${notifications[item.id as keyof typeof notifications] ? 'bg-mg-gold' : isDark ? 'bg-white/20' : 'bg-gray-300'}`}>
                          <span className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${notifications[item.id as keyof typeof notifications] ? 'translate-x-5' : 'translate-x-0'}`}/>
                        </button>
                      </div>))}
                  </div>
                </motion.div>)}
            </AnimatePresence>
          </div>

          {/* Footer Action Area */}
          <div className={`p-6 border-t flex items-center justify-between gap-4 ${isDark ? "bg-white/[0.02] border-white/10" : "bg-gray-50 border-black/10"}`}>
            <div className="ml-auto">
              <button type="submit" disabled={isSaving} className="flex items-center justify-center gap-2 min-w-[200px] rounded-xl bg-mg-gold px-5 py-4 text-sm font-black uppercase tracking-wider text-black transition-transform hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(212,175,55,0.3)]">
                {isSaving ? <Loader2 size={18} className="animate-spin text-black"/> : <Save size={18}/>}
                {isSaving ? ("Saving...") : ("Save Changes")}
              </button>
            </div>
          </div>
        </form>
      </motion.div>

      {/* 3D ID Card Modal */}
      <AnimatePresence>
        {isCardModalOpen && (<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[120] flex items-center justify-center bg-black/80 p-4 backdrop-blur-md" onClick={() => setIsCardModalOpen(false)}>
            <motion.div initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }} onClick={(e) => e.stopPropagation()} className="relative flex flex-col items-center">
              {/* Close Button */}
              <button onClick={() => setIsCardModalOpen(false)} className="absolute -top-16 right-0 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors">
                <X size={20}/>
              </button>
              
              {/* The Actual Interactive Card */}
              <div className="perspective-[1000px]" style={{ perspective: 1000 }}>
                <motion.div onMouseMove={handleCardMouseMove} onMouseLeave={handleCardMouseLeave} onClick={() => setIsCardFlipped(!isCardFlipped)} style={{ rotateX, rotateY, transformStyle: "preserve-3d" }} className="relative w-[340px] h-[214px] cursor-pointer group">
                  <motion.div animate={{ rotateY: isCardFlipped ? 180 : 0 }} transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }} style={{ transformStyle: "preserve-3d" }} className="absolute inset-0 w-full h-full">
                    {renderCardFront()}
                    {renderCardBack()}
                  </motion.div>
                </motion.div>
              </div>
              <p className="mt-8 text-xs font-bold uppercase tracking-widest text-white/50 bg-black/50 px-4 py-2 rounded-full backdrop-blur-sm border border-white/10">
                {"Hover to tilt • Click to flip"}
              </p>
            </motion.div>
          </motion.div>)}
      </AnimatePresence>

      {/* DEV SIMULATION TOGGLE - REMOVE LATER */}
      <div className="fixed bottom-6 left-6 z-[100] flex flex-col gap-2 p-3 rounded-2xl bg-black/90 backdrop-blur-md border border-white/20 shadow-2xl">
        <p className="text-[10px] font-bold text-white/50 uppercase tracking-wider text-center">Simulate Role & Rank</p>
        <div className="flex flex-wrap gap-2 justify-center">
          <button onClick={() => setFormData({ ...formData, role: 'Student', rank: 'Novice', id: 'MG-1001' })} className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${formData.rank === 'Novice' && formData.role === 'Student' ? "bg-gray-300 text-black" : "text-white/50 hover:bg-white/10"}`}>Novice</button>
          <button onClick={() => setFormData({ ...formData, role: 'Student', rank: 'Pro', id: 'MG-4042' })} className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${formData.rank === 'Pro' && formData.role === 'Student' ? "bg-zinc-500 text-white" : "text-white/50 hover:bg-white/10"}`}>Pro</button>
          <button onClick={() => setFormData({ ...formData, role: 'Student', rank: 'VIP', id: 'MG-7777' })} className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${formData.rank === 'VIP' && formData.role === 'Student' ? "bg-slate-400 text-black" : "text-white/50 hover:bg-white/10"}`}>VIP</button>
          <button onClick={() => setFormData({ ...formData, role: 'Student', rank: 'Elite Sniper', id: 'MG-8924' })} className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${formData.rank === 'Elite Sniper' && formData.role === 'Student' ? "bg-mg-gold text-black" : "text-white/50 hover:bg-white/10"}`}>Elite</button>
        </div>
        <div className="flex gap-2 justify-center mt-1">
          <button onClick={() => setFormData({ ...formData, role: 'Mentor', rank: 'Mentor', id: 'MG-M001' })} className={`flex-1 py-2 text-xs font-bold rounded-lg transition-colors ${formData.role === 'Mentor' ? "bg-white text-black" : "text-white/50 hover:bg-white/10"}`}>Mentor Card</button>
          <button onClick={() => setFormData({ ...formData, role: 'Admin', rank: 'Admin', id: 'MG-A000' })} className={`flex-1 py-2 text-xs font-bold rounded-lg transition-colors ${formData.role === 'Admin' ? "bg-black border border-white/20 text-white" : "text-white/50 hover:bg-white/10"}`}>Admin Card</button>
        </div>
      </div>
    </div>);
}
