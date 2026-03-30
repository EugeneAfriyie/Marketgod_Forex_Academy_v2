 import React, { useEffect, useRef, useState } from "react";

import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";
import type { PanInfo } from "framer-motion";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Clock,
} from "lucide-react";
import { useTheme } from "../../context/ThemeContext";


type CTA = { label: string; href: string; primary?: boolean };

type Slide = {
  id: string;
  type: "video" | "image";
  src: string; 
  title: React.ReactNode;
  subtitle?: string;
  desc?: React.ReactNode;
  ctas?: CTA[];
};

const slides: Slide[] = [
  {
  id: "tour-2026",
  type: "image",
  src: "https://res.cloudinary.com/dzqdfaghg/image/upload/v1771486217/kumasi_ocr0pl.webp", 
  title: (
    <>
      Marketgod <span className="text-mg-gold">2026 Tour</span>
    </>
  ),
  subtitle: "Live. Physical. Real Trading Experience.",
  desc: (
    <>
      The journey continues across Ghana.
      <br />
      <span className="text-mg-gold font-semibold">
        Next Stop: Koforidua — 11 Apr
      </span>
      <br />
      Limited seats. Serious traders only.
    </>
  ),
  ctas: [
    { label: "Reserve Your Seat", href: "https://mainstack.com/s/marketgod", primary: true },
    { label: "View All Cities", href: "https://mainstack.com/s/marketgod" }
  ],
},
  {
    id: "appreciation",
    type: "image",
    src: "https://res.cloudinary.com/dzqdfaghg/image/upload/v1771783834/d45de409-00cf-4b60-8f90-4d84964836aa.png",
    title: (
      <>
        Thank You <span className="text-mg-gold">Ho Takoradi, Kumasi & Tamale</span>
      </>
    ),
    subtitle: "The energy was unmatched.",
    desc: (
      <>
        We appreciate every trader who showed up.
        <br />
        History was made. Now we move to Tamale.
      </>
    ),
    ctas: [
      { label: "View Highlights", href: "https://www.instagram.com/eyram_dela", primary: true },
      { label: "Join Next City", href: "https://mainstack.com/s/marketgod" },
    ],
  },
  {
    id: "video",
    type: "video",
    src:
      "/img/hero-video.mp4", // swap with your hero video
    title: <>Learn to Trade <span className="text-mg-gold">Professionally</span></>,
    subtitle: "Structured mentorship • practical skills",
    desc: <>Clear lessons, live guidance, and practical trade plans for serious traders.</>,
    ctas: [{ label: "Create Your Account", href: "/register", primary: true }],
  },

  {
    id: "img-1",
    type: "image",
    src:
      "/img/hero-bg.png",
    title: <>Build <span className="text-mg-gold">Consistent Skills</span></>,
    subtitle: "Professional trading, clear guidance",
    desc: <>Methods backed by practice and market experience — focus on skill, not hype.</>,
    ctas: [{ label: "Explore The Platform", href: "/register" }],
  },
];

const AUTOPLAY_MS = 7000;
const DRAG_THRESHOLD = 80;



const getMarketSession = (hour: number) => {
  if (hour >= 0 && hour < 7) return "Asia Session";
  if (hour >= 7 && hour < 16) return "London Session";
  if (hour >= 13 && hour < 21) return "New York Session";
  return "Off Session";
};

const LiveMarketTime = () => {
  const [time, setTime] = useState("");
  const [session, setSession] = useState("");
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const utc = new Date(now.toISOString());
      const hour = utc.getUTCHours();
      const day = utc.getUTCDay();

      setTime(
        utc.toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );

      setSession(getMarketSession(hour));
      setIsOpen(day !== 0 && day !== 6);
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold tracking-wide backdrop-blur-lg ring-1
        ${
          isOpen
            ? "bg-black/30 text-white ring-white/10"
            : "bg-black/20 text-white/50 ring-white/5 grayscale"
        }`}
    >
      <span className={isOpen ? "text-green-400" : "text-red-400"}>
        {isOpen ? "Market Open" : "Market Closed"}
      </span>

      <span className="text-white/30">•</span>

      <span className="text-white/80">{session}</span>

      <span className="text-white/30">•</span>

      <Clock size={14} className="text-mg-gold" />

      <time className="tabular-nums font-semibold">
        {time || "--:--:--"}
      </time>

      <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/10 text-white/60">
        GMT
      </span>
    </div>
  );
};




const HeroCarousel: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const prefersReducedMotion = typeof window !== "undefined" && window.matchMedia
    ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
    : false;

  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const autoplayRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // For drag spring (subtle)
  const x = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 30 });

  // Autoplay
  useEffect(() => {
    if (prefersReducedMotion) return;
    if (paused || hovered) return;
    autoplayRef.current = window.setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, AUTOPLAY_MS);
    return () => {
      if (autoplayRef.current) {
        window.clearInterval(autoplayRef.current);
        autoplayRef.current = null;
      }
    };
  }, [paused, hovered, prefersReducedMotion]);

  // Pause on focus for accessibility
  useEffect(() => {
    const onFocusIn = () => setPaused(true);
    const onFocusOut = () => setPaused(false);
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener("focusin", onFocusIn);
    el.addEventListener("focusout", onFocusOut);
    return () => {
      el.removeEventListener("focusin", onFocusIn);
      el.removeEventListener("focusout", onFocusOut);
    };
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        setIndex((i) => (i + 1) % slides.length);
      } else if (e.key === "ArrowLeft") {
        setIndex((i) => (i - 1 + slides.length) % slides.length);
      } else if (e.key === " " || e.key === "Spacebar") {
        // toggle pause/resume on space
        e.preventDefault();
        setPaused((p) => !p);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Drag handling (swipe)
  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.x < -DRAG_THRESHOLD) {
      setIndex((i) => (i + 1) % slides.length);
    } else if (info.offset.x > DRAG_THRESHOLD) {
      setIndex((i) => (i - 1 + slides.length) % slides.length);
    }
    x.set(0);
  };

  // Helper UI
  const prev = () => setIndex((i) => (i - 1 + slides.length) % slides.length);
  const next = () => setIndex((i) => (i + 1) % slides.length);

  const current = slides[index];

  return (
    <section
      ref={containerRef}
      aria-roledescription="carousel"
      className={`relative min-h-[92vh] md:min-h-[90vh] flex items-center justify-center overflow-hidden select-none md:mt-10`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* background layers */}
      <AnimatePresence mode="popLayout" initial={false}>
        {current.type === "video" ? (
          <motion.video
            key={current.id}
            autoPlay
            muted
            loop
            playsInline
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 w-full h-full object-cover"
            src={current.src}
          />
        ) : (
          <motion.div
            key={current.id}
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.9 }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${current.src})` }}
          />
        )}
      </AnimatePresence>

      {/* dark overlay for readability */}
      <div className={`absolute inset-0 ${isDark ? "bg-black/55" : "bg-black/60"} `} />

      {/* subtle gold radial spotlight for first slide only (minimal) */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            index === 0
              ? "radial-gradient(circle at 20% 30%, rgba(212,175,55,0.08), transparent 25%)"
              : "transparent",
        }}
      />

      {/* content container (draggable) */}
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        onDragEnd={handleDragEnd}
        style={{ x: springX }}
        dragElastic={0.25}
        className="relative z-20 w-full max-w-6xl px-6"
      >
        <div className="mx-auto text-center max-w-3xl">
          <motion.div
            key={current.id + "-content"}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="space-y-6"
          >
            {/* label bar */}
            <LiveMarketTime />

            {/* headline */}
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-white drop-shadow-lg">
              {current.title}
            </h1>

            {current.subtitle && (
              <h2 className="text-lg md:text-xl text-white/90 font-medium">{current.subtitle}</h2>
            )}

            {current.desc && (
              <p className="text-sm md:text-base text-white/80 max-w-2xl mx-auto">
                {current.desc}
              </p>
            )}

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 justify-center mt-3">
              {(current.ctas ?? []).map((cta, i) => (
                <a
                  key={i}
                  href={cta.href}
                  className={`inline-flex items-center gap-3 px-6 py-3 rounded-full font-semibold transition-transform transform ${
                    cta.primary
                      ? "bg-mg-gold text-mg-charcoal shadow-sm hover:scale-[1.03]"
                      : "bg-white text-black border border-white/20 hover:scale-[1.03]"
                  }`}
                >
                  <span>{cta.label}</span>
                  <ArrowRight size={16} />
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* left / right controls (visible on md+) */}
      <div className="hidden md:flex absolute inset-y-0 left-6 items-center z-30">
        <button
          onClick={prev}
          aria-label="Previous slide"
          className="p-2 rounded-full bg-black/40 hover:bg-black/60 text-white transition"
        >
          <ChevronLeft size={22} />
        </button>
      </div>

      <div className="hidden md:flex absolute inset-y-0 right-6 items-center z-30">
        <button
          onClick={next}
          aria-label="Next slide"
          className="p-2 rounded-full bg-black/40 hover:bg-black/60 text-white transition"
        >
          <ChevronRight size={22} />
        </button>
      </div>

      {/* bottom controls: dots + play/pause */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-4">
        {/* dots */}
        <div className="flex items-center gap-2">
          {slides.map((s, i) => (
            <button
              key={s.id}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`w-3 h-3 rounded-full transition-all ${
                i === index ? "w-8 bg-mg-gold shadow-gold-glow" : "bg-white/40"
              }`}
            />
          ))}
        </div>

      
      </div>
    </section>
  );
};

export default HeroCarousel;
