import { useState } from "react";
import { LifeBuoy, MessageSquare, Clock, CheckCircle2, Plus, FileText, Send, X, AlertCircle, ChevronRight, Mail, Loader2 } from "lucide-react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";
import { useLanguage } from "../../context/LanguageContext";

// --- MOCK DATA ---
const initialTickets = [
  { id: "TCK-2026-089", subject: "Cannot access Advanced Mastery Course", category: "Course Access", status: "open", date: "Oct 24, 2026", lastUpdate: "2 hours ago", message: "Hi, I recently upgraded to the Mentorship plan but the Advanced Mastery Course is still showing as locked for me. Could you please check my account?" },
  { id: "TCK-2026-085", subject: "Telegram VIP Bot not responding", category: "Technical", status: "in-progress", date: "Oct 22, 2026", lastUpdate: "1 day ago", message: "I've been trying to link my Telegram account via the bot but it doesn't reply to the /start command." },
  { id: "TCK-2026-042", subject: "How do I upgrade my Mentorship plan?", category: "Billing", status: "resolved", date: "Oct 15, 2026", lastUpdate: "1 week ago", message: "I am currently on the free plan and would like to know the best way to upgrade to the full Mentorship." },
];

const categories = [
  { value: "Course Access", label: { en: "Course Access", fr: "Accès aux Cours" } },
  { value: "Billing", label: { en: "Billing & Subscriptions", fr: "Facturation & Abonnements" } },
  { value: "Technical", label: { en: "Technical Issue", fr: "Problème Technique" } },
  { value: "General", label: { en: "General Inquiry", fr: "Question Générale" } },
];

export default function SupportPage() {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const isDark = theme === "dark";
  const isFrench = language === "fr";

  const [tickets, setTickets] = useState(initialTickets);
  
  // New Ticket Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [newTicket, setNewTicket] = useState({ subject: "", category: "Course Access", message: "" });

  // View Ticket Modal State
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<any>(null);

  const handleOpenModal = () => {
    setIsModalOpen(true);
    setIsSuccess(false);
    setNewTicket({ subject: "", category: "Course Access", message: "" });
  };

  const handleSubmitTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTicket.subject.trim() || !newTicket.message.trim()) return;
    
    setIsSubmitting(true);
    setTimeout(() => {
      const ticket = {
        id: `TCK-2026-${Math.floor(Math.random() * 900) + 100}`,
        subject: newTicket.subject,
        category: newTicket.category,
        status: "open",
        date: "Just now",
        lastUpdate: "Just now",
        message: newTicket.message
      };
      setTickets(prev => [ticket, ...prev]);
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 2000);
  };

  const handleViewTicket = (ticket: any) => {
    setSelectedTicket(ticket);
    setIsViewModalOpen(true);
  };

  const container: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };
  const item: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } }
  };

  return (
    <div className="space-y-8 pb-10">
      {/* Hero Section */}
      <motion.div initial="hidden" animate="show" variants={container} className={`relative overflow-hidden rounded-[3rem] border shadow-lg ${isDark ? "border-white/5 bg-[#0a0a0a]" : "border-black/5 bg-white"}`}>
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-mg-gold/10 blur-[100px] rounded-full pointer-events-none" />
        <div className="relative z-10 p-8 md:p-12 lg:p-16 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div>
            <h1 className={`text-4xl md:text-5xl font-black mb-4 tracking-tight ${isDark ? "text-white" : "text-gray-900"}`}>
              {isFrench ? "Centre d'" : "Support "}
              <span className="text-mg-gold">{isFrench ? "Assistance." : "Center."}</span>
            </h1>
            <p className={`max-w-xl text-lg font-medium ${isDark ? "text-white/70" : "text-gray-600"}`}>
              {isFrench 
                ? "Besoin d'aide avec votre compte, un cours ou un paiement ? Créez un ticket ci-dessous et notre équipe vous répondra rapidement."
                : "Need help with your account, a course, or a payment? Create a ticket below and our team will get back to you shortly."}
            </p>
          </div>
          <button 
            onClick={handleOpenModal}
            className="shrink-0 flex items-center justify-center gap-2 rounded-xl bg-mg-gold px-8 py-4 text-sm font-black uppercase tracking-wider text-black shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-transform hover:scale-[1.02]"
          >
            <Plus size={18} />
            {isFrench ? "Nouveau Ticket" : "Open New Ticket"}
          </button>
        </div>
      </motion.div>

      {/* Quick Contacts */}
      <motion.div initial="hidden" animate="show" variants={container} className="grid sm:grid-cols-2 gap-6">
        <motion.a variants={item} href="https://t.me/delatrades" target="_blank" rel="noreferrer" className={`group relative overflow-hidden flex items-center gap-5 p-6 rounded-[2rem] border transition-all hover:-translate-y-1 hover:shadow-lg ${isDark ? "bg-[#111111] border-white/5 hover:border-mg-gold/30" : "bg-white border-black/5 hover:border-mg-gold/30"}`}>
           <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl transition-colors ${isDark ? "bg-white/5 text-mg-gold group-hover:bg-mg-gold group-hover:text-black" : "bg-black/5 text-mg-gold group-hover:bg-mg-gold group-hover:text-black"}`}>
             <Send size={24} />
           </div>
           <div>
             <h3 className={`text-lg font-bold mb-1 ${isDark ? "text-white" : "text-gray-900"}`}>{isFrench ? "Support Telegram" : "Telegram Support"}</h3>
             <p className={`text-sm ${isDark ? "text-white/60" : "text-gray-500"}`}>{isFrench ? "Discutez directement avec un agent." : "Chat directly with an agent."}</p>
           </div>
        </motion.a>
        <motion.a variants={item} href="mailto:support@marketgodtrading.com" className={`group relative overflow-hidden flex items-center gap-5 p-6 rounded-[2rem] border transition-all hover:-translate-y-1 hover:shadow-lg ${isDark ? "bg-[#111111] border-white/5 hover:border-mg-gold/30" : "bg-white border-black/5 hover:border-mg-gold/30"}`}>
           <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl transition-colors ${isDark ? "bg-white/5 text-mg-gold group-hover:bg-mg-gold group-hover:text-black" : "bg-black/5 text-mg-gold group-hover:bg-mg-gold group-hover:text-black"}`}>
             <Mail size={24} />
           </div>
           <div>
             <h3 className={`text-lg font-bold mb-1 ${isDark ? "text-white" : "text-gray-900"}`}>{isFrench ? "Support Email" : "Email Support"}</h3>
             <p className={`text-sm ${isDark ? "text-white/60" : "text-gray-500"}`}>{isFrench ? "Pour les questions complexes." : "For complex or billing inquiries."}</p>
           </div>
        </motion.a>
      </motion.div>

      {/* Ticket History */}
      <motion.div initial="hidden" animate="show" variants={container} className="space-y-6">
        <div className="flex items-center gap-3 px-2">
          <LifeBuoy className="text-mg-gold" size={24} />
          <h2 className={`text-2xl font-black ${isDark ? "text-white" : "text-gray-900"}`}>
            {isFrench ? "Vos Tickets" : "Your Tickets"}
          </h2>
        </div>

        <motion.div variants={item} className={`rounded-[2.5rem] border shadow-xl overflow-hidden ${isDark ? "border-white/10 bg-[#111111]" : "border-black/10 bg-white"}`}>
          {tickets.length === 0 ? (
            <div className="p-12 text-center">
              <FileText size={48} className="mx-auto mb-4 text-mg-gold opacity-50" />
              <h3 className={`text-xl font-bold mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>{isFrench ? "Aucun ticket" : "No Support Tickets"}</h3>
              <p className={isDark ? "text-white/50" : "text-gray-500"}>{isFrench ? "Vous n'avez soumis aucune demande d'assistance." : "You haven't submitted any support requests yet."}</p>
            </div>
          ) : (
            <div className="divide-y divide-white/5 dark:divide-white/10 divide-black/5">
              {tickets.map((ticket, idx) => (
                <div key={idx} onClick={() => handleViewTicket(ticket)} className={`group p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors hover:bg-mg-gold/5 cursor-pointer`}>
                  <div className="flex items-start gap-4">
                    <div className={`mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${isDark ? "bg-white/5" : "bg-black/5"}`}>
                      {ticket.status === 'open' && <AlertCircle size={18} className="text-mg-gold" />}
                      {ticket.status === 'in-progress' && <Clock size={18} className="text-blue-400" />}
                      {ticket.status === 'resolved' && <CheckCircle2 size={18} className="text-green-500" />}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-[10px] font-bold uppercase tracking-wider ${isDark ? "text-white/40" : "text-gray-500"}`}>{ticket.id}</span>
                        <span className="text-[10px] text-gray-500">•</span>
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${isDark ? "bg-white/10 text-white/70" : "bg-black/5 text-gray-600"}`}>
                          {ticket.category}
                        </span>
                      </div>
                      <h4 className={`text-lg font-bold mb-1 ${isDark ? "text-white" : "text-gray-900"}`}>{ticket.subject}</h4>
                      <p className={`text-xs ${isDark ? "text-white/50" : "text-gray-500"}`}>
                        {isFrench ? "Dernière mise à jour :" : "Last updated:"} {ticket.lastUpdate}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between md:flex-col md:items-end gap-2 md:pl-6 md:border-l border-white/5 dark:border-white/10 border-black/5">
                     <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider ${
                        ticket.status === 'open' ? (isDark ? "bg-mg-gold/20 text-mg-gold" : "bg-mg-gold/20 text-yellow-700") :
                        ticket.status === 'in-progress' ? (isDark ? "bg-blue-500/20 text-blue-400" : "bg-blue-100 text-blue-700") :
                        (isDark ? "bg-green-500/20 text-green-400" : "bg-green-100 text-green-700")
                     }`}>
                       {ticket.status === 'open' && (isFrench ? "Ouvert" : "Open")}
                       {ticket.status === 'in-progress' && (isFrench ? "En cours" : "In Progress")}
                       {ticket.status === 'resolved' && (isFrench ? "Résolu" : "Resolved")}
                     </span>
                     <span className={`text-xs flex items-center gap-1 ${isDark ? "text-white/40 group-hover:text-mg-gold" : "text-gray-400 group-hover:text-mg-gold"} transition-colors`}>
                       {isFrench ? "Voir les détails" : "View Details"} <ChevronRight size={14} />
                     </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </motion.div>

      {/* New Ticket Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className={`w-full max-w-lg overflow-hidden rounded-[2rem] border shadow-2xl ${isDark ? "border-white/10 bg-[#111111]" : "border-black/10 bg-white"}`}
            >
              <AnimatePresence mode="wait">
                {!isSuccess ? (
                  <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <div className={`flex items-center justify-between border-b p-6 ${isDark ? "border-white/10 bg-white/5" : "border-black/10 bg-black/5"}`}>
                      <h3 className={`text-xl font-bold flex items-center gap-2 ${isDark ? "text-white" : "text-gray-900"}`}>
                        <MessageSquare size={20} className="text-mg-gold" />
                        {isFrench ? "Ouvrir un Ticket" : "Open a Support Ticket"}
                      </h3>
                      <button onClick={() => setIsModalOpen(false)} className={`rounded-full p-2 transition-colors ${isDark ? "bg-white/10 text-white hover:bg-white/20" : "bg-black/10 text-gray-600 hover:bg-black/20"}`}>
                        <X size={20} />
                      </button>
                    </div>
                    
                    <form onSubmit={handleSubmitTicket} className="p-6 space-y-5">
                      <div>
                        <label className={`block text-sm font-bold mb-2 ${isDark ? "text-white/80" : "text-gray-700"}`}>
                          {isFrench ? "Catégorie" : "Category"}
                        </label>
                        <select
                          value={newTicket.category}
                          onChange={(e) => setNewTicket({...newTicket, category: e.target.value})}
                          className={`w-full p-3.5 rounded-xl text-sm border focus:outline-none focus:border-mg-gold transition-colors ${isDark ? "bg-black/20 border-white/10 text-white" : "bg-gray-50 border-black/10 text-gray-900"}`}
                        >
                          {categories.map(cat => (
                            <option key={cat.value} value={cat.value} className={isDark ? "bg-[#111111]" : ""}>
                              {isFrench ? cat.label.fr : cat.label.en}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className={`block text-sm font-bold mb-2 ${isDark ? "text-white/80" : "text-gray-700"}`}>
                          {isFrench ? "Sujet" : "Subject"}
                        </label>
                        <input
                          required
                          value={newTicket.subject}
                          onChange={(e) => setNewTicket({...newTicket, subject: e.target.value})}
                          placeholder={isFrench ? "Bref résumé de votre problème" : "Brief summary of your issue"}
                          className={`w-full p-3.5 rounded-xl text-sm border focus:outline-none focus:border-mg-gold transition-colors ${isDark ? "bg-black/20 border-white/10 text-white placeholder-white/30" : "bg-gray-50 border-black/10 text-gray-900 placeholder-gray-400"}`}
                        />
                      </div>

                      <div>
                        <label className={`block text-sm font-bold mb-2 ${isDark ? "text-white/80" : "text-gray-700"}`}>
                          {isFrench ? "Message" : "Message"}
                        </label>
                        <textarea
                          required
                          value={newTicket.message}
                          onChange={(e) => setNewTicket({...newTicket, message: e.target.value})}
                          placeholder={isFrench ? "Veuillez fournir autant de détails que possible..." : "Please provide as many details as possible..."}
                          className={`w-full p-3.5 rounded-xl text-sm border focus:outline-none focus:border-mg-gold min-h-[120px] resize-none transition-colors ${isDark ? "bg-black/20 border-white/10 text-white placeholder-white/30" : "bg-gray-50 border-black/10 text-gray-900 placeholder-gray-400"}`}
                        />
                      </div>
                      
                      <div className="pt-2">
                        <button 
                          type="submit"
                          disabled={isSubmitting || !newTicket.subject.trim() || !newTicket.message.trim()}
                          className="w-full flex items-center justify-center gap-2 rounded-xl bg-mg-gold px-4 py-4 text-sm font-black uppercase tracking-wider text-black transition-transform hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed"
                        >
                          {isSubmitting ? <Loader2 size={18} className="animate-spin text-black" /> : <Send size={18} />}
                          {isSubmitting ? (isFrench ? "Envoi..." : "Submitting...") : (isFrench ? "Soumettre le Ticket" : "Submit Ticket")}
                        </button>
                      </div>
                    </form>
                  </motion.div>
                ) : (
                  <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center p-12 text-center">
                    <CheckCircle2 size={64} className="mb-6 text-mg-gold drop-shadow-[0_0_15px_rgba(212,175,55,0.4)]" />
                    <h3 className={`text-2xl font-black mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>{isFrench ? "Ticket Créé !" : "Ticket Created!"}</h3>
                    <p className={`text-sm mb-8 ${isDark ? "text-white/60" : "text-gray-600"}`}>
                      {isFrench 
                        ? "Votre demande d'assistance a été soumise avec succès. Notre équipe vous répondra sous peu." 
                        : "Your support request has been submitted successfully. Our team will respond shortly."}
                    </p>
                    <button onClick={() => setIsModalOpen(false)} className={`w-full rounded-xl border px-4 py-3.5 text-sm font-bold uppercase tracking-wider transition-colors ${isDark ? "border-white/10 text-white hover:bg-white/5" : "border-black/10 text-gray-900 hover:bg-black/5"}`}>
                      {isFrench ? "Fermer" : "Close"}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Ticket Details Modal */}
      <AnimatePresence>
        {isViewModalOpen && selectedTicket && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
            onClick={() => setIsViewModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className={`w-full max-w-2xl overflow-hidden rounded-[2rem] border shadow-2xl flex flex-col max-h-[85vh] ${isDark ? "border-white/10 bg-[#111111]" : "border-black/10 bg-white"}`}
            >
              <div className={`flex items-start justify-between border-b p-6 ${isDark ? "border-white/10 bg-white/5" : "border-black/10 bg-black/5"}`}>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-xs font-bold uppercase tracking-wider ${isDark ? "text-white/40" : "text-gray-500"}`}>{selectedTicket.id}</span>
                    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                      selectedTicket.status === 'open' ? (isDark ? "bg-mg-gold/20 text-mg-gold" : "bg-mg-gold/20 text-yellow-700") :
                      selectedTicket.status === 'in-progress' ? (isDark ? "bg-blue-500/20 text-blue-400" : "bg-blue-100 text-blue-700") :
                      (isDark ? "bg-green-500/20 text-green-400" : "bg-green-100 text-green-700")
                    }`}>
                      {selectedTicket.status === 'open' && (isFrench ? "Ouvert" : "Open")}
                      {selectedTicket.status === 'in-progress' && (isFrench ? "En cours" : "In Progress")}
                      {selectedTicket.status === 'resolved' && (isFrench ? "Résolu" : "Resolved")}
                    </span>
                  </div>
                  <h3 className={`text-xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
                    {selectedTicket.subject}
                  </h3>
                </div>
                <button onClick={() => setIsViewModalOpen(false)} className={`shrink-0 rounded-full p-2 transition-colors ${isDark ? "bg-white/10 text-white hover:bg-white/20" : "bg-black/10 text-gray-600 hover:bg-black/20"}`}>
                  <X size={20} />
                </button>
              </div>
              
              <div className="p-6 overflow-y-auto flex-1 space-y-6">
                {/* Original Message */}
                <div className={`p-5 rounded-2xl border ${isDark ? "border-white/5 bg-white/[0.02]" : "border-black/5 bg-gray-50"}`}>
                  <div className="flex items-center justify-between mb-4 border-b pb-4 border-white/5 dark:border-white/10 border-black/5">
                    <div className="flex items-center gap-3">
                       <div className="h-10 w-10 rounded-full bg-mg-gold/20 text-mg-gold flex items-center justify-center font-bold">ME</div>
                       <span className={`text-sm font-bold ${isDark ? "text-white" : "text-gray-900"}`}>{isFrench ? "Vous" : "You"}</span>
                    </div>
                    <span className={`text-xs font-medium ${isDark ? "text-white/40" : "text-gray-500"}`}>{selectedTicket.date}</span>
                  </div>
                  <p className={`text-sm leading-relaxed whitespace-pre-wrap ${isDark ? "text-white/80" : "text-gray-700"}`}>{selectedTicket.message}</p>
                </div>

                {/* System/Admin response placeholder */}
                {selectedTicket.status !== 'open' && (
                  <div className={`p-5 rounded-2xl border ${isDark ? "border-mg-gold/20 bg-mg-gold/5" : "border-mg-gold/20 bg-mg-gold/10"}`}>
                    <div className="flex items-center justify-between mb-4 border-b pb-4 border-mg-gold/10">
                      <div className="flex items-center gap-3">
                         <div className="h-10 w-10 rounded-full bg-mg-gold text-black flex items-center justify-center font-bold"><LifeBuoy size={18} /></div>
                         <span className={`text-sm font-bold ${isDark ? "text-white" : "text-gray-900"}`}>MarketGod Support</span>
                      </div>
                      <span className={`text-xs font-medium ${isDark ? "text-white/40" : "text-gray-500"}`}>{selectedTicket.lastUpdate}</span>
                    </div>
                    <p className={`text-sm leading-relaxed ${isDark ? "text-white/80" : "text-gray-700"}`}>
                      {selectedTicket.status === 'resolved' 
                        ? (isFrench ? "Ce ticket a été résolu et clôturé par notre équipe de support. Si vous avez d'autres questions, veuillez ouvrir un nouveau ticket." : "This ticket has been resolved and closed by our support team. If you have further questions, please open a new ticket.")
                        : (isFrench ? "Notre équipe examine actuellement votre problème. Nous vous répondrons très bientôt." : "Our team is currently reviewing your issue. We will get back to you shortly.")}
                    </p>
                  </div>
                )}
              </div>

              <div className={`p-4 border-t ${isDark ? "border-white/10 bg-white/5" : "border-black/10 bg-black/5"}`}>
                <button onClick={() => setIsViewModalOpen(false)} className={`w-full rounded-xl border px-4 py-3.5 text-sm font-bold uppercase tracking-wider transition-colors ${isDark ? "border-white/10 text-white hover:bg-white/5" : "border-black/10 text-gray-900 hover:bg-black/5"}`}>
                  {isFrench ? "Fermer" : "Close"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
