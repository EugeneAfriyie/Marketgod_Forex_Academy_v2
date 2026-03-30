import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useTheme } from "../../../context/ThemeContext";

interface CarouselItem {
  type: "pageContext" | "quote" | "ad";
  title?: string;
  description?: string;
  text?: string;
  link?: string;
  img?: string;
}

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

  useEffect(() => {
    setCarouselIndex(0);
  }, [areaLabel, carouselItems]);

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setCarouselIndex((prevIndex) => (prevIndex + 1) % carouselItems.length);
    }, 7000);

    return () => clearInterval(interval);
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

  return (
    <div className="relative h-[110px] w-full overflow-hidden rounded-lg sm:h-[120px]">
      <AnimatePresence>
        {carouselItems[carouselIndex].img && (
          <motion.div
            key={`${carouselIndex}-bg`}
            initial={{ opacity: 0, scale: 1.2 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${carouselItems[carouselIndex].img})` }}
          />
        )}
      </AnimatePresence>

      {carouselItems[carouselIndex].img && <div className="absolute inset-0 bg-black/60" />}

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
          {(() => {
            const item = carouselItems[carouselIndex];
            const hasBgImage = !!item.img;

            switch (item.type) {
              case "pageContext":
                return (
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-mg-gold">{areaLabel}</p>
                    <h1 className={`mt-2 text-3xl font-black md:text-4xl ${!hasBgImage && !isDark ? "text-mg-light-text" : "text-white"}`}>
                      {item.title}
                    </h1>
                    <p className={`mt-2 max-w-2xl text-sm leading-6 ${!hasBgImage && !isDark ? "text-mg-light-textSecondary/80" : "text-white/65"}`}>
                      {item.description}
                    </p>
                  </div>
                );
              case "quote":
                return (
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-mg-gold">{dailyMotivationLabel}</p>
                    <p className={`mt-4 max-w-3xl text-lg italic md:text-xl ${!hasBgImage && !isDark ? "text-mg-light-textSecondary/80" : "text-white/60"}`}>
                      "{item.text}"
                    </p>
                  </div>
                );
              case "ad":
                return (
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-mg-gold">{announcementLabel}</p>
                    <Link
                      to={item.link!}
                      className={`mt-4 inline-flex items-center gap-3 text-lg font-bold uppercase tracking-wider ${
                        !hasBgImage && !isDark ? "text-yellow-600 hover:text-yellow-700" : "text-mg-gold hover:text-yellow-300"
                      }`}
                    >
                      <span className="h-3 w-3 rounded-full bg-current animate-pulse" />
                      <span>{item.text}</span>
                      <ArrowRight size={20} />
                    </Link>
                  </div>
                );
              default:
                return null;
            }
          })()}
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-2">
        {carouselItems.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              if (i === carouselIndex) return;
              setDirection(i > carouselIndex ? 1 : -1);
              setCarouselIndex(i);
            }}
            className={`h-1.5 rounded-full transition-all duration-300 ${i === carouselIndex ? "w-5 bg-mg-gold" : "w-1.5 bg-white/40"}`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
