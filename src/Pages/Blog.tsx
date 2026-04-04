// src/pages/Blog.tsx
import React, { useEffect, useState } from "react";
import { Filter, Instagram, Search, Send, Youtube } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import FeaturedResource from "../Components/Blog/FeaturedResource";
import ResourceFilter from "../Components/Blog/ResourceFilter";
import ResourceGrid from "../Components/Blog/ResourceGrid";
import Testimonials from "../Components/Home/Testimonials";
import FAQ from "../Components/Home/FAQ";
import { resources } from "../Components/data/data";

const  Blog: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [rawQuery, setRawQuery] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // 300ms debounce for search
  useEffect(() => {
    const timer = setTimeout(() => setSearchQuery(rawQuery.toLowerCase()), 300);
    return () => clearTimeout(timer);
  }, [rawQuery]);

  return (
    <>
     
      <main className={`min-h-screen font-montserrat ${
        isDark 
          ? "bg-gradient-to-b from-mg-black via-mg-charcoal to-mg-black text-mg-paper" 
          : "bg-gradient-to-b from-white via-gray-50 to-white text-mg-charcoal"
      }`}>
        {/* Hero Section */}
    {/* HERO SECTION — INSIGHTS HUB */}
<section className="relative py-28 text-center overflow-hidden">
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    className="max-w-5xl mx-auto px-6"
  >
    {/* MAIN TITLE */}
    <h1 className={`text-5xl sm:text-6xl md:text-7xl font-black bg-clip-text text-transparent mb-6
      ${isDark ? "bg-white" : "bg-black"} text-transparent bg-clip-text`}
      style={{ WebkitTextFillColor: isDark ? "white" : "black" }}
    >
      Marketgod Blog
    </h1>

    {/* SUBTITLE — SOCIAL, VIDEOS, SIGNALS, IDEAS */}
    <p className={`text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed mb-8 ${
      isDark ? "text-mg-paper/70" : "text-mg-charcoal/70"
    }`}>
      Daily <span className="font-bold">trading ideas</span>, 
      <span className="font-bold text-mg-gold"> live signals</span>, 
      YouTube breakdowns, community updates, 
      and <span className="font-bold">real market talk</span> — all in one place.
    </p>

    {/* SOCIAL PROOF BADGES */}
    <div className="flex flex-wrap justify-center gap-4 mt-10">
      <a 
        href="https://youtube.com/@marketgod" 
        target="_blank" 
        rel="noopener"
        className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold transition-all border-2 ${isDark ? "border-white/20 bg-white/5 text-white hover:bg-white hover:text-black" : "border-black/10 bg-black/5 text-black hover:bg-black hover:text-white"}`}
      >
        <Youtube size={18} /> YouTube
      </a>
      <a 
        href="https://www.youtube.com/@marketgodcommunity" 
        target="_blank" 
        rel="noopener"
        className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold transition-all border-2 ${isDark ? "border-white/20 bg-white/5 text-white hover:bg-white hover:text-black" : "border-black/10 bg-black/5 text-black hover:bg-black hover:text-white"}`}
      >
        <Send size={18} /> Telegram
      </a>
      <a 
        href="https://www.instagram.com/eyram_dela" 
        target="_blank" 
        rel="noopener"
        className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold transition-all border-2 ${isDark ? "border-white/20 bg-white/5 text-white hover:bg-white hover:text-black" : "border-black/10 bg-black/5 text-black hover:bg-black hover:text-white"}`}
      >
        <Instagram size={18} /> Instagram
      </a>
    </div>
  </motion.div>

  {/* GLOW BACKGROUND */}
  <div className={`absolute inset-0 -z-10 ${
    isDark 
      ? "bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.15),transparent_70%)]" 
      : "bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.05),transparent_70%)]"
  }`} />
</section>

       <FeaturedResource
  resource={{
    title: "Marketgod 2026 Tour — Live Trading Experience",
    description:
      "Join Eyram Dela live in your city. Real market breakdowns, sniper entries, mindset training, and powerful networking. Limited seats available.",
    image: "https://res.cloudinary.com/dzqdfaghg/image/upload/v1771486217/kumasi_ocr0pl.webp", // replace with tour banner image
    link: "https://mainstack.com/s/marketgod", 
  }}
/>
      <div className="max-w-7xl mx-auto md:px-2 space-y-16">
        {/* Featured Academy */}

        {/* Filter + Search */}

        <div className=" ">
         
                <div className={`${
      isDark 
        ? "bg-gradient-to-b from-mg-black via-mg-charcoal to-mg-black text-mg-paper" 
        : "bg-gradient-to-b from-white via-gray-50 to-white text-mg-charcoal"}
     sticky top-[4.5rem] md:top-[4rem] md:pt-5  w-full z-40`}>
                  <div
                  className={`hidden md:flex items-center justify-center gap-2 text-sm font-medium mb-4 ${
                    isDark ? "text-mg-paper/60" : "text-mg-charcoal/60"
                  }`}
                >
                  <Filter size={18} className="text-mg-gold" />
                  <span>Filter by Category</span>
                </div>
       <div className="grid md:grid-flow-col  items-cente  z-50  ">
         
          <ResourceFilter 
            selectedCategory={selectedCategory} 
            setSelectedCategory={setSelectedCategory} 
            

          />
        <div className={`relative w-full md:w-80 m-aut items-center flex `}>
              <Search
                className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${
                  isDark ? "text-mg-paper/50" : "text-mg-charcoal/50"
                }`}
              />
              <input
                value={rawQuery}
            onChange={(e) => setRawQuery(e.target.value)}
            placeholder="Search Marketgod resources..."
                className={`
                  w-full pl-10 pr-4 py-3 rounded-full text-sm transition-all
                  focus:outline-none focus:ring-2 focus:ring-mg-gold/50 
                  ${isDark
                    ? "bg-mg-black/50 border border-mg-white/20 text-mg-paper shadow-gold-glow placeholder-mg-paper/40"
                    : "bg-white/80 border border-black/10 text-mg-charcoal shadow-lg placeholder-mg-charcoal/40"
                  } 
                `}
              />
            </div>
       </div>
                 </div>
          


        {/* Resource Grid */}
        <ResourceGrid
          resources={resources}
          selectedCategory={selectedCategory}
          searchQuery={searchQuery}
        />
        </div>

        {/* Giveaway Feature */}
        <FeaturedResource
          resource={{
            title: "Gold Inner Circle Closing, FREE VIP Slots Now Open!",
            description: "I'm closing Gold Inner Circle but opening FREE VIP slots until the end of the year. Join now for a chance at our 1,000-member live trading day!",
            image: "https://res.cloudinary.com/dzqdfaghg/image/upload/v1763522350/SnapInsta.to_285991748_3240193386223050_1023995396682830775_n_j2rm79.jpg",
            link: "https://t.me/livetradewithmarketgodbot",
          }}
        />

        {/* Testimonials + FAQ */}
        <Testimonials />
        <FAQ />
      </div>
    </main>
    </>
  );
};

export default Blog;