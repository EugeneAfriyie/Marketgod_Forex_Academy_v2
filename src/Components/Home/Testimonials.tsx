// Eugene Afriyie UEB3502023
// src/components/Testimonials/Testimonials.tsx
import  { useEffect, useRef, useState } from "react";
import { motion,  AnimatePresence, useMotionValue, animate } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";
import { Star,  ArrowRight, X, ChevronLeft, ChevronRight } from "lucide-react";

interface Testimonial {
  name: string;
  role: string;
  before: string;
  after: string;
  text: string;
  rating: number;
  avatar: string;
}

const Testimonials = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  // const controls = useAnimation(); // We'll keep this for the manual scroll animation
  const [isPaused, setIsPaused] = useState(false);
  const [selectedTestimonial, setSelectedTestimonial] = useState<Testimonial | null>(null);

  const testimonials = [
    {
      name: "Jake Obeng",
      role: "Mentorship Student",
      before: "Lacked a clear market approach.",
      after: "Gained confidence & profitability.",
      text: "Joining the Market God Mentorship under Eyram Dela has been one of the most transformative decisions of my professional journey. Over the past year, the mentorship has not only sharpened my trading strategy but also reshaped my entire approach to financial markets. Eyram’s unique ability to break down complex market movements into simple, actionable insights has been nothing short of remarkable. His mentorship style is disciplined, insightful, and deeply empowering—pushing me to trust my analysis and remain consistent even in uncertain conditions.What sets Eyram apart is his unwavering commitment to the growth of each mentee. He goes beyond technical charts and dives into mindset, discipline, and long-term vision. Through his guidance, I’ve developed confidence in my decisions, increased my profitability, and most importantly, adopted a mindset that prioritizes growth over quick wins. I am truly grateful to be part of the Market God community—it has elevated not only my trading, but my thinking as well..",
      rating: 5,
      avatar: "/Testimonials/JAKE_OBENG.png",
    },
    {
      name: "Kwashie Senanu Prince",
      role: "Full-Time Trader",
      before: "Missing pieces to the trading puzzle.",
      after: "Became a confident full-time trader.",
      text: "I'm proud to be a full-time trader. My trading journey truly blossomed in March 2024 when I had the wonderful opportunity to join the Marketgod Mentorship Program. Learning under the brilliant guidance of Eyram Dela felt like finding the missing pieces to my trading puzzle. I gained crucial skills in technical chart analysis and trade execution strategies, but what truly sweetened the deal was the deep dive into emotional discipline and trading psychology. These insights have been absolutely pivotal in shaping me into the trader I am today.This program was more than just skill-building; it was a complete transformation of my market mindset. With newfound emotional control and smarter strategic planning, I've seen my performance soar, bringing a real sense of accomplishment. Today, I'm thrilled to say that I'm doing great in my trading career, experiencing consistent growth and confidence. My heartfelt thanks goes to the Marketgod Mentorship for their foundational lessons and unwavering support. I wholeheartedly recommend this incredible program to anyone aspiring to achieve genuine success in trading",
      rating: 5,
      avatar: "/Testimonials/Kwashie_Senanu_Prince.png",
    },
    {
      name: "Emmanuel Awotwi",
      role: "Mentorship Member",
      before: "Inconsistent trading results.",
      after: "Profitable every month since joining.",
      text: "The Marketgod mentorship has been a game-changer for me. The technical analysis lessons are excellent, and I've been profitable every month since joining. I will highly recommend this mentorship community to anyone looking to improve their trading skills.",
      rating: 5,
      avatar: "/Testimonials/Emmanuel_Awotwi.png",
    },
    {
      name: "Martin",
      role: "Funded Trader (FTMO)",
      before: "Felt confused and lacked confidence.",
      after: "Became a full-time funded trader.",
      text: "This forex mentorship (Marketgod) was a game-changer. The clarity, practical strategies, and one-on-one guidance turned confusion into confidence. Highly recommended for anyone serious about mastering the markets. I am now a full time funded trader wiTH FTMO.",
      rating: 5,
      avatar: "/Testimonials/Martin.png",
    },
   
  ];

  // Duplicate for seamless loop
  const duplicated = [...testimonials, ...testimonials, ...testimonials];

  // Auto-scroll logic
  useEffect(() => {
    let animation: any;

    const startAnimation = () => {
      const containerWidth = containerRef.current?.scrollWidth || 0;
      const scrollDistance = containerWidth / 3;

      animation = animate(x, [-scrollDistance, 0], {
        ease: "linear",
        duration: 60, // Adjust for speed (e.g., 40 for faster)
        repeat: Infinity,
        onRepeat: () => {
          // This ensures the loop is seamless
          x.set(0);
        },
      });
    };

    if (!isPaused) {
      startAnimation();
    }

    return () => {
      animation?.stop();
    };
  }, [isPaused, x]);

  const truncateText = (text: string, wordLimit: number) => {
    const words = text.split(' ');
    return words.length > wordLimit ? words.slice(0, wordLimit).join(' ') + '...' : text;
  };

  const handleScroll = (direction: 'left' | 'right') => {
    setIsPaused(true);
    const cardWidth = 320; // w-80
    const gap = 24; // gap-6
    const scrollAmount = cardWidth + gap;
    const currentX = x.get();

    const newX = currentX + (direction === 'left' ? scrollAmount : -scrollAmount);

    // Animate to the new position
    animate(x, newX, { type: "spring", stiffness: 400, damping: 40 });

    // Briefly pause auto-scroll after manual interaction
    setTimeout(() => setIsPaused(false), 5000);
  };

  return (
    <section
      id="testimonials"
      className={`py-20 relative overflow-hidden ${
        isDark
          ? "bg-gradient-to-b from-mg-charcoal to-mg-black"
          : "bg-gradient-to-b from-mg-paper to-mg-light-bg"
      }`}
    >
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className={`text-4xl md:text-6xl font-black tracking-tight mb-4 ${
            isDark ? "text-mg-white" : "text-mg-black"
          }`}>
            Real Traders. <span className="text-mg-gold">Real Wins.</span>
          </h2>
          <p className={`text-lg md:text-xl max-w-3xl mx-auto ${
            isDark ? "text-mg-paper/70" : "text-mg-charcoal/70"
          }`}>
            <span className="text-mg-gold font-bold">10,000+</span> Ghanaian traders winning daily.
          </p>
        </motion.div>

        {/* Auto-Scrolling Carousel */}
        <div className="relative">
          <div
            className="overflow-hidden"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
          <motion.div
            ref={containerRef}
            style={{ x }}
            className="flex gap-6 py-4 cursor-grab"
            drag="x"
            dragConstraints={{
              left: -(duplicated.length * (320 + 24)), // card width + gap
              right: 0,
            }}
            whileTap={{ cursor: "grabbing" }}
            onDragStart={() => setIsPaused(true)}
            onDragEnd={() => {
              // Resume auto-scroll after a delay
              setTimeout(() => {
                setIsPaused(false);
              }, 3000);
            }}
          >
            {duplicated.map((t, i) => (
              <motion.div
                key={i}
                className={`relative flex-shrink-0 w-80 h-[26rem] p-8 flex flex-col justify-between rounded-3xl border backdrop-blur-xl shadow-xl transition-all overflow-hidden ${
                  isDark
                    ? "bg-mg-charcoal/80 border-mg-gold/40"
                    : "bg-mg-paper/95 border-mg-gold/30"
                }`}
                whileHover={{ scale: 1.03 }}
              >
                {/* Background Quote */}
                <div className={`absolute -top-2 -left-2 text-8xl font-black opacity-5 ${isDark ? 'text-mg-gold' : 'text-mg-charcoal'}`}>“</div>
                <div className={`absolute -bottom-4 -right-4 text-8xl font-black opacity-5 ${isDark ? 'text-mg-gold' : 'text-mg-charcoal'}`}>”</div>

                <div className="relative z-10">
                  {/* Stars */}
                  <div className="flex gap-1 mb-3">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} size={16} className="fill-mg-gold text-mg-gold" />
                    ))}
                  </div>

                  {/* Text */}
                  <p className={`text-sm mb-4 leading-relaxed ${
                    isDark ? "text-mg-paper/80" : "text-mg-charcoal/80"
                  }`}>
                    {truncateText(t.text, 30)}
                  </p>

                  {/* Transformation */}
                  <div className="mb-4">
                    <div className="flex items-center gap-2 text-xs font-semibold">
                      <span className={`px-2 py-1 rounded-md ${isDark ? 'bg-red-500/20 text-red-400' : 'bg-red-100 text-red-600'}`}>
                        {t.before}
                      </span>
                      <ArrowRight size={14} className={`${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                      <span className={`px-2 py-1 rounded-md ${isDark ? 'bg-green-500/20 text-green-400' : 'bg-green-100 text-green-600'}`}>
                        {t.after}
                      </span>
                    </div>
                  </div>

                  <button 
                    onClick={() => setSelectedTestimonial(t)}
                    className={`text-sm font-bold text-mg-gold hover:underline ${isDark ? 'text-mg-white' : 'text-yellow-600'}`}
                  >
                    Read Full Story
                  </button>
                </div>

                {/* Signature */}
                <div className="relative z-10 flex items-center gap-4 pt-4 border-t border-white/10">
                  <img
                    loading="lazy"
                    src={t.avatar}
                    alt={t.name}
                    className="w-20 h-24 rounded-full border-2 border-mg-gold shadow-md object-cover"
                  />
                  <div>
                    <h3 className={`font-bold text-base ${isDark ? "text-mg-white" : "text-mg-black"}`}>
                      {t.name}
                    </h3>
                    <p className={`text-xs ${isDark ? "text-mg-paper/60" : "text-mg-charcoal/60"}`}>{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
          </div>

          {/* Manual Scroll Buttons */}
          <div className="hidden md:flex absolute top-1/2 -translate-y-1/2 w-full justify-between px-0 md:-px-8">
            <motion.button
              onClick={() => handleScroll('left')}
              className="z-20 p-2 rounded-full bg-mg-gold/80 text-mg-charcoal shadow-lg hover:bg-mg-gold transition-colors disabled:opacity-50"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeft size={24} />
            </motion.button>
            <motion.button
              onClick={() => handleScroll('right')}
              className="z-20 p-2 rounded-full bg-mg-gold/80 text-mg-charcoal shadow-lg hover:bg-mg-gold transition-colors disabled:opacity-50"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronRight size={24} />
            </motion.button>
          </div>

        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center mt-12"
        >
          <motion.a
            href="https://t.me/marketgodcommunity"
           whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(212,175,55,0.5)" }}
          whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 px-10 py-5 bg-mg-dark-bg  dark:bg-mg-white text-mg-white dark:text-mg-black rounded-full font-bold uppercase tracking-wider shadow-xl hover:shadow-2xl transition-all"
          >
            Join 10,000+ Winners Today
            <ArrowRight size={24} />
          </motion.a>
        </motion.div>
      </div>

      {/* Testimonial Modal */}
      <AnimatePresence>
        {selectedTestimonial && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[999] flex items-center justify-center p-4"
            onClick={() => setSelectedTestimonial(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              transition={{ type: "spring", damping: 20, stiffness: 200 }}
              className={`relative max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8 rounded-3xl shadow-2xl border-2 ${
                isDark ? 'bg-mg-charcoal border-mg-gold/40' : 'bg-mg-paper border-yellow-500/30'
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                aria-label="Close testimonial"
                onClick={() => setSelectedTestimonial(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition"
              >
                <X size={20} className="text-yellow-400" />
              </button>

              {/* Signature Header */}
              <div className="flex items-center gap-4 mb-6">
                <img
                  src={selectedTestimonial.avatar}
                  alt={selectedTestimonial.name}
                  className="w-20 h-24 rounded-full border-2 border-mg-gold shadow-md object-cover"
                />
                <div>
                  <h3 className={`font-bold text-xl ${isDark ? "text-mg-gold" : "text-mg-charcoal"}`}>
                    {selectedTestimonial.name}
                  </h3>
                  <p className={`text-sm ${isDark ? "text-mg-paper/60" : "text-mg-charcoal/60"}`}>{selectedTestimonial.role}</p>
                </div>
              </div>

              {/* Full Text */}
              <div className={`prose prose-sm ${isDark ? 'prose-invert' : ''} max-w-none text-left leading-relaxed ${isDark ? 'text-mg-paper/90' : 'text-mg-charcoal/90'}`}>
                <p>{selectedTestimonial.text}</p>
              </div>

              {/* Transformation Footer */}
              <div className="mt-8 pt-4 border-t border-white/10">
                <h4 className={`text-xs uppercase font-bold tracking-wider mb-3 ${isDark ? 'text-mg-paper/60' : 'text-mg-charcoal/60'}`}>
                  The Transformation
                </h4>
                <div className="flex items-center gap-3 text-sm font-semibold">
                  <span className={`px-3 py-1.5 rounded-lg ${isDark ? 'bg-red-500/20 text-red-400' : 'bg-red-100 text-red-600'}`}>
                    {selectedTestimonial.before}
                  </span>
                  <ArrowRight size={16} className={`${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                  <span className={`px-3 py-1.5 rounded-lg ${isDark ? 'bg-green-500/20 text-green-400' : 'bg-green-100 text-green-600'}`}>
                    {selectedTestimonial.after}
                  </span>
                </div>
              </div>

              

              

              {/* CTA Button */}
              <div className="mt-8">
                <motion.a
                
                  href="/plans#pricing"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.03, boxShadow: "0px 10px 30px rgba(255, 215, 0, 0.4)" }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="block w-full text-center py-4 rounded-xl bg-mg-gold text-mg-charcoal font-bold text-lg shadow-lg"
                >
                  Start Your Success Story
                </motion.a>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Testimonials;


