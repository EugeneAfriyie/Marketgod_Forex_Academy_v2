import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence, wrap } from "framer-motion";
import { BookOpen, TrendingUp, Zap, UserCheck, PlayCircle, Rocket } from "lucide-react";

// Each slide now supports: bgImage | bgVideo
interface Slide {
  id: number;
  bgImage?: string;
  bgVideo?: string;
  title: React.ReactNode;
  subtitle: string;
  desc: React.ReactNode;
  ctas: {
    label: string;
    href: string;
    icon: React.ReactNode;
    primary?: boolean;
  }[];
}

const slides: Slide[] = [
  {
    id: 1,
    bgImage: "https://res.cloudinary.com/dzqdfaghg/image/upload/v1763522352/SnapInsta.to_323366471_856911432307051_8922110729981919576_n_fhs0t5.jpg",
    title: (
      <>
        Elite Trading <span className="text-mg-gold">Mentorship</span>
      </>
    ),
    subtitle: "Personalized Guidance. Proven Strategies. Real Results.",
    desc: (
      <>
        Accelerate your trading journey with one-on-one coaching from our lead mentors. Master our system, refine your psychology, and trade with institutional-grade precision.
      </>
    ),
    ctas: [
      { label: "View Mentorship Plans", href: "#pricing", icon: <UserCheck size={17} />, primary: true },
      { label: "Who Is This For?", href: "#who-is-this-for", icon: <BookOpen size={17} /> },
    ],
  },
  {
    id: 2,
    bgImage:
      "https://res.cloudinary.com/dzqdfaghg/image/upload/v1763522350/SnapInsta.to_285991748_3240193386223050_1023995396682830775_n_j2rm79.jpg",
    title: (
      <>
        High-Accuracy <span className="text-mg-gold">Trade Signals</span>
      </>
    ),
    subtitle: "Sniper Entries. Delivered Daily.",
    desc: (
      <>
        Receive real-time, high-probability trade setups directly from our analysts. Trade alongside the pros and profit from our expertise, 24/5.
      </>
    ),
    ctas: [
      { label: "View Signal Plans", href: "#signals", icon: <Zap size={17} />, primary: true },
      { label: "Learn More", href: "https://t.me/marketgodcommunity", icon: <TrendingUp size={17} /> },
    ],
  },
  {
    id: 3,
    bgImage: "https://res.cloudinary.com/dzqdfaghg/image/upload/v1763522353/SnapInsta.to_240486111_201792035182182_4884390349298402290_n_kxaalr.jpg",
    title: (
      <>
        Your Trading Journey <span className="text-mg-gold">Starts Here</span>
      </>
    ),
    subtitle: "Select the plan that fits your goals and take the first step toward financial freedom.",
    desc: (
      <>
        Whether you need direct mentorship or high-accuracy signals, we have a plan designed to elevate your trading and help you achieve your financial goals.
      </>
    ),
    ctas: [
      { label: "Get Started", href: "#pricing", icon: <Rocket size={17} />, primary: true },
      { label: "Watch Video", href: "#why-this-course", icon: <PlayCircle size={17} /> },
    ],
  },
];



const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
  }),
};

const PlansHero = () => {
  const [[page, direction], setPage] = useState([0, 0]);
  const slideIndex = wrap(0, slides.length, page);

  const paginate = useCallback((newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  }, [page]);

  const goToSlide = (newSlideIndex: number) => {
    const newDirection = newSlideIndex > slideIndex ? 1 : -1;
    setPage([page + (newSlideIndex - slideIndex), newDirection]);
  };

  useEffect(() => {
    const interval = setInterval(
      () => paginate(1),
      7000
    );
    return () => clearInterval(interval);
  }, [paginate]);

  const slide = slides[slideIndex];

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">

      {/* Background video */}
      {slide.bgVideo && (
        <video
          src={slide.bgVideo}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover brightness-[0.55]"
        />
      )}

      {/* Background image */}
      {slide.bgImage && (
        <div
          className="absolute inset-0 bg-cover bg-center brightness-[0.55]"
          style={{ backgroundImage: `url(${slide.bgImage})` }}
        />
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* CONTENT */}
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={page}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          className="relative z-10 text-center px-6 max-w-4xl"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(_, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);
            if (swipe < -swipeConfidenceThreshold) paginate(1);
            else if (swipe > swipeConfidenceThreshold) paginate(-1);
          }}
        >
          <h1 className="text-white text-4xl md:text-7xl font-black drop-shadow-xl leading-tight">
            {slide.title}
          </h1>

          <p className="text-white/80 text-xl md:text-2xl mt-2 font-medium">
            {slide.subtitle}
          </p>

          <p className="text-white/70 text-lg md:text-xl max-w-3xl mt-4 mx-auto">
            {slide.desc}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            {slide.ctas.map((cta, i) => (
              <motion.a
                key={i}
                href={cta.href}
                whileHover={{ scale: 1.07 }}
                whileTap={{ scale: 0.93 }}
                className={`px-8 py-4 rounded-full font-bold uppercase tracking-wide flex items-center gap-3 transition-all shadow-lg backdrop-blur-sm ${
                  cta.primary
                    ? "bg-mg-gold text-black hover:shadow-gold-glow"
                    : "bg-white/15 text-white border border-white/30 hover:bg-white/20"
                }`}
              >
                {cta.label}
                {cta.icon}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
        {slides.map((_, i) => (
          <motion.div
            key={i}
            onClick={() => goToSlide(i)}
            className={`h-2.5 rounded-full transition-all cursor-pointer ${
              slideIndex === i ? "bg-mg-gold w-10" : "bg-white/40 w-2.5"
            }`}
            animate={{ scale: slideIndex === i ? 1.2 : 1 }}
          />
        ))}
      </div>
    </section>
  );
};

export default PlansHero;



