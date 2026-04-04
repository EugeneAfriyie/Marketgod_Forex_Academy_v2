// src/components/SeminarCarousel/SeminarCarousel.tsx
import  { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
// import { useTheme } from "../../context/ThemeContext";
import { ArrowLeft, ArrowRight, Video } from "lucide-react";

const SeminarCarousel = () => {
  // const { theme } = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);

  // 7 Photos + 1 Video
  const media = [
    { type: "image", src: "https://res.cloudinary.com/dzqdfaghg/image/upload/v1763525187/SnapInsta.to_572477469_18538014796003421_360178860850559894_n_ucgfhu.jpg", alt: "Eyram Dela on stage" },
    { type: "image", src: "https://res.cloudinary.com/dzqdfaghg/image/upload/v1763525186/SnapInsta.to_574261719_18538314220003421_959973786091435173_n_ydzw2o.jpg", alt: "Audience networking" },
    { type: "image", src: "https://res.cloudinary.com/dzqdfaghg/image/upload/v1763525187/SnapInsta.to_572477469_18538014796003421_360178860850559894_n_ucgfhu.jpg", alt: "Live trading demo" },
    { type: "image", src: "https://res.cloudinary.com/dzqdfaghg/image/upload/v1763525170/SnapInsta.to_573290402_18538014832003421_3796424749225276508_n_yui0or.jpg", alt: "Ghana flag group photo" },
    { type: "image", src: "https://res.cloudinary.com/dzqdfaghg/image/upload/v1763525169/SnapInsta.to_573626362_18538014823003421_6315298945725636023_n_jy5iic.jpg", alt: "Exness merch giveaway" },
    { type: "image", src: "https://res.cloudinary.com/dzqdfaghg/image/upload/v1763525163/SnapInsta.to_573691633_18538014814003421_3174334620940786836_n_rhdkcl.jpg", alt: "Closing session" },
    // { type: "video", src: "dQw4w9WgXcQ", alt: "Event highlight video" }, // YouTube ID
  ];

  // Auto-play every 4s
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % media.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [media.length]);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % media.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + media.length) % media.length);

 
  return (
    <section id="seminar-carousel" className="py-20 relative overflow-hidden">

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-4 text-mg-light-text dark:text-mg-dark-text">
            Seminar Highlights – <span className="text-mg-gold">Accra 2025</span>
          </h2>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto text-mg-light-textSecondary dark:text-mg-dark-textSecondary">
            Relive the biggest Forex event in Ghana — live trading, expert insights, and Exness magic.
          </p>
        </motion.div>

        {/* Carousel Container */}
        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ x: 100 }}
              animate={{ x: 0 }}
              exit={{ x: -100 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="relative"
            >
              {media[currentIndex].type === "image" ? (
                <img
                  src={media[currentIndex].src}
                  alt={media[currentIndex].alt}
                  className="w-full h-96 md:h-[500px] object-cover rounded-3xl shadow-2xl"
                />
              ) : (
                <div className="relative w-full h-96 md:h-[500px] rounded-3xl shadow-2xl overflow-hidden">
                  <iframe
                    src={`https://www.youtube.com/embed/${media[currentIndex].src}?autoplay=1&mute=0&loop=1&playlist=${media[currentIndex].src}`}
                    title={media[currentIndex].alt}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                  <div className="absolute top-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-xs">
                    <Video size={12} className="inline mr-1" />
                    Watch Video
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Dots */}
          <div className="flex justify-center gap-3 mt-8">
            {media.map((_, i) => (
              <motion.button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`w-3 h-3 rounded-full transition-all ${
                  i === currentIndex ? "bg-mg-gold w-8" : "bg-mg-gold/30"
                }`}
                whileHover={{ scale: 1.3 }}
              />
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            aria-label="Previous slide"
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-mg-gold/20 backdrop-blur-md border border-mg-gold/30 text-mg-gold hover:bg-mg-gold/40 transition-all"
          >
            <ArrowLeft size={24} />
          </button>
          <button
           aria-label="Next slide"
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-mg-gold/20 backdrop-blur-md border border-mg-gold/30 text-mg-gold hover:bg-mg-gold/40 transition-all"
          >
            <ArrowRight size={24} />
          </button>
        </div>

     

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="text-center mt-16"
        >
          <motion.a
            href="#webinars"
          whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(212,175,55,0.5)" }}
          whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 px-10 py-5 bg-mg-black text-mg-paper dark:bg-mg-paper dark:text-mg-black rounded-full font-bold uppercase tracking-wider shadow-xl hover:shadow-2xl transition-all"
          >
            Register for Next Event
            <ArrowRight size={24} />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default SeminarCarousel;


