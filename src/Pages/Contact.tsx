"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {  Send, Instagram, MessageSquare, Ticket, MapPin, Clock } from "lucide-react";
import FAQ from "../Components/Home/FAQ";
import MarketGodSupportTicketModal from "../Components/data/Contact/MarketgodSupportTicketModal";

export default function MarketGodContactHero() {
  const [showContacts, setShowContacts] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const socialRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (socialRef.current && !socialRef.current.contains(e.target as Node)) {
        setShowContacts(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <>

   
      <section
        className="relative flex flex-col items-center justify-center text-center text-white p-6 bg-gradient-to-b from-[#090d14] via-[#0e1624] to-[#090d14] overflow-hidden"
      >
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://res.cloudinary.com/djeorsh5d/image/upload/v1761804514/06f5adb8-b5f4-4516-ba21-82078fb4cb98.png"
            alt="Marketgod Trading Academy"
            className="w-full h-full object-cover opacity-30"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#090d14]/95 via-[#0e1624]/70 to-transparent" />
        </div>

        {/* Glow Accents */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-20 w-96 h-96 bg-mg-white rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-mg-gold rounded-full blur-3xl animate-pulse delay-700" />
        </div>

        <div className="relative z-10 max-w-4xl">
          {/* Icon */}
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="flex justify-center mb-6"
          >
            <div className="p-5 bg-gradient-to-br from-mg-white to-mg-white rounded-full shadow-2xl shadow-mg-gold/70">
              <MessageSquare className="w-14 h-14 text-black" />
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-bold text-mg-white mb-4"
          >
            Contact <span className="text-mg-gold">Marketgod</span> Support
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-[#ffffffcc] mb-8 leading-relaxed max-w-3xl mx-auto"
          >
            Whether you're a trader, mentorship student, or signals member — the 
            <strong className="text-mg-gold"> Marketgod Team</strong> is always ready to assist.
            <br />
            <span className="text-mg-gold">Fast replies </span>within 1–3 hours via Telegram, Call, or Support Ticket.
          </motion.p>

          {/* Quick Info */}
          <div className="flex flex-col sm:flex-row justify-center gap-6 mb-8 text-sm text-[#ffffff99]">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-mg-gold" />
              <span> Accra, Ghana (HQ)</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-mg-gold" />
              <span>Mon–Sat: 8 AM – 7 PM GMT</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center" ref={socialRef}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-3 px-8 py-4 bg-mg-gold text-black font-bold rounded-full shadow-xl hover:shadow-2xl hover:shadow-mg-gold/70 transition-all"
            >
              <Ticket className="w-6 h-6" />
              Open Support Ticket
            </motion.button>

            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowContacts(!showContacts)}
                className="flex items-center gap-3 px-8 py-4 bg-white text-black font-bold rounded-full shadow-xl hover:shadow-2xl hover:shadow-white/70 transition-all"
              >
                <MessageSquare className="w-6 h-6" />
                Contact Marketgod
              </motion.button>

              <AnimatePresence>
                {showContacts && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 bg-[#0e1624] border border-mg-gold/30 rounded-2xl p-5 shadow-2xl flex flex-col items-center gap-4"
                  >
                   <a
                      href="https://wa.me/233599002863"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex flex-col items-center gap-1 text-mg-gold hover:scale-110 transition-transform"
                    >
                      <MessageSquare className="w-8 h-8" />
                      <span className="text-xs font-medium">WhatsApp</span>
                    </a>
                    <a
                      href="https://t.me/delatrades"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex flex-col items-center gap-1 text-mg-gold hover:scale-110 transition-transform"
                    >
                      <Send className="w-8 h-8" />
                      <span className="text-xs font-medium">Telegram</span>
                    </a>
                    <a
                      href="https://www.instagram.com/eyram_dela"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex flex-col items-center gap-1 text-[#FFD700] hover:scale-110 transition-transform"
                    >
                      <Instagram className="w-8 h-8" />
                      <span className="text-xs font-medium">Instagram</span>
                    </a>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      <FAQ />

      <MarketGodSupportTicketModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}



