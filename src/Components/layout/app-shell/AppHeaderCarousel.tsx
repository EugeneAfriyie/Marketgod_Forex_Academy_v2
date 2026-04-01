import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useTheme } from "../../../context/ThemeContext";
import type { CarouselItem } from "./data";

interface AppHeaderCarouselProps {
  areaLabel: string;
  carouselItems: CarouselItem[];
  dailyMotivationLabel: string;
  announcementLabel: string;
}

export default function AppHeaderCarousel({
  areaLabel,
  carouselItems,
  dailyMotivationLabel,
  announcementLabel,
}: AppHeaderCarouselProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    setCarouselIndex(0);
  }, [areaLabel, carouselItems]);

  const stopInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const startInterval = () => {
    stopInterval();
    intervalRef.current = setInterval(() => {
      setDirection(1);
      setCarouselIndex((prevIndex) => (prevIndex + 1) % carouselItems.length);
    }, 4000);
  };

  useEffect(() => {
    startInterval();
    return () => stopInterval();
  }, [carouselItems]);

  const onDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: { offset: { x: number } }) => {
    const threshold = 75;

    if (info.offset.x > threshold) {
      setDirection(-1);
      setCarouselIndex((prev) => (prev - 1 + carouselItems.length) % carouselItems.length);
    } else if (info.offset.x < -threshold) {
      setDirection(1);
      setCarouselIndex((prev) => (prev + 1) % carouselItems.length);
    }
  };

  const currentItem = carouselItems[carouselIndex];
  const hasBgImage = Boolean(currentItem.img);

  return (
    <div
      className="relative h-[110px] w-full overflow-hidden rounded-lg sm:h-[120px]"
      onMouseEnter={stopInterval}
      onMouseLeave={startInterval}
    >
      <AnimatePresence>
        {currentItem.img && (
          <motion.div
            key={`${carouselIndex}-bg`}
            initial={{ opacity: 0, scale: 1.2 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${currentItem.img})` }}
          />
        )}
      </AnimatePresence>

      {currentItem.img && <div className="absolute inset-0 bg-black/60" />}

      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={carouselIndex}
          custom={direction}
          initial={{ opacity: 0, x: direction > 0 ? "50%" : "-50%" }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: direction < 0 ? "50%" : "-50%" }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.5}
          onDragEnd={onDragEnd}
          className="absolute inset-0 flex cursor-grab flex-col justify-center active:cursor-grabbing"
        >
          {currentItem.type === "pageContext" && (
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-mg-gold">{areaLabel}</p>
              <h1 className={`mt-2 text-3xl font-black md:text-4xl ${!hasBgImage && !isDark ? "text-mg-light-text" : "text-white"}`}>
                {currentItem.title}
              </h1>
              <p className={`mt-2 max-w-2xl text-sm leading-6 ${!hasBgImage && !isDark ? "text-mg-light-textSecondary/80" : "text-white/65"}`}>
                {currentItem.description}
              </p>
            </div>
          )}

          {currentItem.type === "quote" && (
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-mg-gold">{dailyMotivationLabel}</p>
              <p className={`mt-4 max-w-3xl text-lg italic md:text-xl ${!hasBgImage && !isDark ? "text-mg-light-textSecondary/80" : "text-white/60"}`}>
                "{currentItem.text}"
              </p>
            </div>
          )}

          {currentItem.type === "ad" && currentItem.link && (
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-mg-gold">{announcementLabel}</p>
              <Link
                to={currentItem.link}
                className={`mt-4 inline-flex items-center gap-3 text-lg font-bold uppercase tracking-wider ${
                  !hasBgImage && !isDark ? "text-yellow-600 hover:text-yellow-700" : "text-mg-gold hover:text-yellow-300"
                }`}
              >
                <span className="h-3 w-3 animate-pulse rounded-full bg-current" />
                <span>{currentItem.text}</span>
                <ArrowRight size={20} />
              </Link>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-2">
        {carouselItems.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              if (index === carouselIndex) return;
              setDirection(index > carouselIndex ? 1 : -1);
              setCarouselIndex(index);
            }}
            className={`h-1.5 rounded-full transition-all duration-300 ${index === carouselIndex ? "w-5 bg-mg-gold" : "w-1.5 bg-white/40"}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
