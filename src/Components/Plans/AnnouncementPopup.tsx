import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Zap } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const AnnouncementPopup: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  useEffect(() => {
    const hasSeenPopup = sessionStorage.getItem('hasSeenVipPopup');

    const timer = setTimeout(() => {
      if (!hasSeenPopup) {
        setIsOpen(true);
        sessionStorage.setItem('hasSeenVipPopup', 'true');
      }
    }, 3500); // show popup after 3.5s

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => setIsOpen(false);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
            className={`relative w-full max-w-md md:max-w-lg lg:max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl border-2 shadow-2xl
              ${isDark
                ? 'bg-gradient-to-br from-mg-charcoal via-mg-black to-mg-black border-mg-gold/40'
                : 'bg-white border-mg-gold/30'
              }`}
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              aria-label="Close popup"
              className={`absolute top-4 right-4 p-2 rounded-full transition-colors z-20
                ${isDark ? 'text-mg-paper/50 hover:bg-mg-gold/10 hover:text-mg-paper' : 'text-mg-charcoal/50 hover:bg-gray-200 hover:text-mg-charcoal'}
              `}
            >
              <X size={24} />
            </button>

            {/* Header */}
            <div className={`p-6 text-center border-b ${isDark ? 'border-mg-gold/20' : 'border-gray-200'}`}>
              <img
              src="https://res.cloudinary.com/dzqdfaghg/image/upload/v1763522352/SnapInsta.to_511469271_18512807728003421_2788928110292631837_n_shzro3.jpg"
                alt="MarketGod VIP Access"
                className="w-24 h-24 mx-auto mb-4 rounded-full object-cover border-2 border-yellow-400 shadow-lg"
              />
              <h2 className={`text-2xl md:text-3xl font-black ${isDark ? 'text-mg-white' : 'text-mg-black'}`}>
                🚀 Trade with <span className="text-mg-gold">MarketGod </span>for FREE!
              </h2>
            </div>

            {/* Body */}
            <div className="p-6 md:p-8 space-y-4 text-sm md:text-base">
              <p className={`${isDark ? 'text-mg-paper/80' : 'text-mg-charcoal/80'}`}>
                Unlock VIP access — live signals, market breakdowns, mentorship, and daily guidance. No subscription required.
              </p>

              <div className={`p-4 rounded-lg border ${isDark ? 'bg-mg-black/40 border-mg-gold/20' : 'bg-gray-50 border-gray-200'}`}>
                <p className={`font-bold ${isDark ? 'text-mg-paper' : 'text-mg-charcoal'}`}>🎁 Join FREE VIP:</p>
                <a
                  href="https://t.me/livetradewithmarketgodbot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-mg-gold font-bold underline block mt-1"
                >
                  @livetradewithmarketgodbot
                </a>
              </div>

              <p className={`${isDark ? 'text-mg-paper/80' : 'text-mg-charcoal/80'}`}>
                ⚠️ Make sure your trading account has at least $50 to execute trades.
              </p>
            </div>

            {/* CTA */}
            <div className="p-6 border-t bg-black/10">
              <a
                href="https://t.me/livetradewithmarketgodbot"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-black  dark:bg-mg-white text-mg-white dark:text-black font-bold rounded-full shadow-lg shadow-mg-gold/20 hover:scale-105 transition-transform"
              >
                <Zap size={20} />
                Join FREE VIP Now
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AnnouncementPopup;



