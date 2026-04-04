import { motion } from "framer-motion";
import { Facebook, Instagram, Send, Twitter, X, Youtube } from "lucide-react";

type LinkItem = { name: string; href: string; icon: React.ReactNode; subtitle?: string; };

const TikTokIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.08 1.07.9 1.9 1.9 2.23.69.22 1.43.16 2.12-.08.83-.29 1.5-.81 1.88-1.58.21-.43.3-.91.3-1.4v-8.41c-.45-.34-.85-.73-1.23-1.17-.02-.02-.03-.03-.05-.05-.21-.2-.4-.4-.58-.61-.01-.01-.02-.02-.02-.03-.3-.39-.59-.81-.84-1.25-.14-.24-.28-.5-.41-.75-.1-.19-.19-.39-.28-.59-.02-.05-.04-.09-.06-.14-.09-.2-.18-.4-.26-.6-.09-.23-.17-.46-.25-.7-.07-.2-.13-.4-.19-.6-.02-.06-.04-.12-.06-.18-.06-.19-.11-.38-.16-.57-.03-.12-.06-.24-.09-.36a.99.99 0 0 1-.03-.12c-.09-.3-.17-.6-.24-.91s-.13-.61-.17-.92c-.01-.07-.02-.14-.03-.21-.05-.3-.09-.6-.12-.91-.02-.15-.03-.3-.04-.45-.01-.15-.01-.3-.01-.45v-.01Z" />
  </svg>
);


const links: LinkItem[] =  [
      { name: "Telegram", href: "https://t.me/marketgodcommunity", icon: <Send /> },
      { name: "Instagram", href: "https://www.instagram.com/eyram_dela", icon: <Instagram /> },
      { name: "YouTube", href: "https://www.youtube.com/@marketgodcommunity", icon: <Youtube /> },
      { name: "Twitter (X)", href: "https://x.com/eyramdela ", icon: <Twitter /> },
      { name: "Facebook", href: "https://web.facebook.com/eyram.akpey", icon: <Facebook /> },
      { name: "TikTok", href: "https://www.tiktok.com/@eyramdela_?_r=1&_t=ZM-9229kTUvSTT", icon: <TikTokIcon  className={`w-7 h-7 `} /> },
];




export default function CommunityModal({
  open,
  onClose,

}: {
  open: boolean;
  onClose: () => void;
}) {
  if (!open) return null;

  return (
    <div
      aria-modal="true"
      role="dialog"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 sm:p-6"
    >
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/60 backdrop-blur-md"
        onClick={onClose}
        aria-hidden
      />

      {/* Modal Content */}
      <motion.div
        initial={{ y: 100, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 100, opacity: 0, scale: 0.95 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="relative w-full max-w-xl bg-[#0b0f19] rounded-2xl shadow-2xl overflow-hidden border border-[#00c896]/30"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#00c896]/20">
          <div>
            <h3 className="text-xl font-bold text-[#FFD700]">Join Community</h3>
            <p className="text-sm text-white/70">Choose a platform to connect with us</p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="p-2 rounded-full hover:bg-[#00c896]/20 transition"
          >
            <X className="w-5 h-5 text-[#FFD700]" />
          </button>
        </div>

        {/* Links Grid */}
        <div className="p-6">
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl bg-[#001022]/50 border border-[#FFD700]/20 hover:bg-[#FFD700]/10 hover:scale-105 transition-all"
                >
                  <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-gradient-to-br from-[#FFD700]/20 to-[#00c896]/20">
                    {l.icon}
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-white">{l.name}</div>
                    {l.subtitle && <div className="text-sm text-white/70">{l.subtitle}</div>}
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-[#00c896]/20 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-full bg-gradient-to-r from-[#FFD700] to-[#00c896] text-[#001F3F] font-semibold hover:brightness-95 transition"
          >
            Close
          </button>
        </div>
      </motion.div>
    </div>
  );
}



