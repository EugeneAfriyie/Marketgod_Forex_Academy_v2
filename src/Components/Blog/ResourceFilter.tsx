// src/components/Blog/ResourceFilter.tsx
'use client';

import React, { useMemo, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";
import { resources } from "../data/data";

interface ResourceFilterProps {
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
}

const ResourceFilter: React.FC<ResourceFilterProps> = ({
  selectedCategory,
  setSelectedCategory,
}) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const scrollRef = useRef<HTMLDivElement>(null);

  const categories = useMemo(() => {
    const set = new Set<string>(["All"]);
    resources.forEach((r) => set.add(r.category));
    return Array.from(set).sort((a, b) =>
      a === "All" ? -1 : b === "All" ? 1 : a.localeCompare(b)
    );
  }, []);

  /** Auto-center active pill */
  useEffect(() => {
    if (!scrollRef.current) return;

    const activeBtn = scrollRef.current.querySelector(
      `button[data-category="${selectedCategory}"]`
    ) as HTMLButtonElement;

    if (activeBtn) {
      const container = scrollRef.current;
      const buttonLeft = activeBtn.offsetLeft;
      const buttonWidth = activeBtn.offsetWidth;
      const containerWidth = container.offsetWidth;
      container.scrollLeft = buttonLeft - containerWidth / 2 + buttonWidth / 2;
    }
  }, [selectedCategory]);

  /** Drag-to-scroll (mouse + touch) */
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;

    const handleDown = (e: MouseEvent | TouchEvent) => {
      isDown = true;
      startX = "touches" in e ? e.touches[0].pageX : e.pageX;
      scrollLeft = container.scrollLeft;
    };

    const handleMove = (e: MouseEvent | TouchEvent) => {
      if (!isDown) return;
      e.preventDefault();
      const x = "touches" in e ? e.touches[0].pageX : e.pageX;
      const walk = (x - startX) * 1.2; // drag sensitivity
      container.scrollLeft = scrollLeft - walk;
    };

    const handleUp = () => {
      isDown = false;
    };

    container.addEventListener("mousedown", handleDown);
    container.addEventListener("mousemove", handleMove);
    container.addEventListener("mouseup", handleUp);
    container.addEventListener("mouseleave", handleUp);

    container.addEventListener("touchstart", handleDown);
    container.addEventListener("touchmove", handleMove);
    container.addEventListener("touchend", handleUp);

    return () => {
      container.removeEventListener("mousedown", handleDown);
      container.removeEventListener("mousemove", handleMove);
      container.removeEventListener("mouseup", handleUp);
      container.removeEventListener("mouseleave", handleUp);

      container.removeEventListener("touchstart", handleDown);
      container.removeEventListener("touchmove", handleMove);
      container.removeEventListener("touchend", handleUp);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className=" bg-inherit py-2 md:py-6  mb-2 px-4 overflow-x-auto"
    >
      {/* Header */}
     
      {/* Scrollable Pills */}
      <div
        ref={scrollRef}
        className="w-full px-2 overflow-x-auto no-scrollbar cursor-grab active:cursor-grabbing"
      >
        <div className="flex gap-3 flex-nowrap w-max md:justify-center px-4 md:px-0">
          {categories.map((cat) => (
            <motion.button
              key={cat}
              data-category={cat}
              onClick={() => setSelectedCategory(cat)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`
                flex-shrink-0 px-4 md:px-5 py-2.5 whitespace-nowrap rounded-full text-[.6rem] md:text-[.7rem] lg:text-sm font-bold transition-all duration-300 shadow-lg
                ${
                  selectedCategory === cat
                    ? "dark:bg-mg-white bg-mg-black dark:text-black text-white shadow-mg-green/60 ring-4 ring-mg-gold/30"
                    : isDark
                    ? "bg-mg-charcoal/60 text-mg-paper/90 hover:bg-mg-charcoal/80"
                    : "bg-white/80 text-mg-charcoal hover:bg-white/95"
                }
              `}
            >
              {cat}
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ResourceFilter;



