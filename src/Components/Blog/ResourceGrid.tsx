// src/components/Blog/ResourceGrid.tsx
import React, { useState, useEffect, useRef } from "react";
import { motion, useInView, animate } from "framer-motion";
import ResourceModal from "./ResourceModal";
import { Calendar, User, Youtube, Instagram, Send,  Twitter, Facebook } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

import type { Resource } from "../../types";

interface ResourceGridProps {
  resources: Resource[];
  selectedCategory: string;
  searchQuery: string;
}

const TikTokIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}
  >
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.08 1.07.9 1.9 1.9 2.23.69.22 1.43.16 2.12-.08.83-.29 1.5-.81 1.88-1.58.21-.43.3-.91.3-1.4v-8.41c-.45-.34-.85-.73-1.23-1.17-.02-.02-.03-.03-.05-.05-.21-.2-.4-.4-.58-.61-.01-.01-.02-.02-.02-.03-.3-.39-.59-.81-.84-1.25-.14-.24-.28-.5-.41-.75-.1-.19-.19-.39-.28-.59-.02-.05-.04-.09-.06-.14-.09-.2-.18-.4-.26-.6-.09-.23-.17-.46-.25-.7-.07-.2-.13-.4-.19-.6-.02-.06-.04-.12-.06-.18-.06-.19-.11-.38-.16-.57-.03-.12-.06-.24-.09-.36a.99.99 0 0 1-.03-.12c-.09-.3-.17-.6-.24-.91s-.13-.61-.17-.92c-.01-.07-.02-.14-.03-.21-.05-.3-.09-.6-.12-.91-.02-.15-.03-.3-.04-.45-.01-.15-.01-.3-.01-.45v-.01Z" />
  </svg>
);

const AnimatedCounter = ({ to, isDark }: { to: number; isDark: boolean }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });

  useEffect(() => {
    if (isInView && ref.current) {
      const controls = animate(0, to, {
        duration: 2,
        onUpdate(value) {
          if (ref.current) {
            ref.current.textContent = Math.round(value).toLocaleString();
          }
        },
      });
      return () => controls.stop();
    }
  }, [isInView, to]);

  return (
    <span ref={ref} className={`text-2xl font-black ${isDark ? "text-white" : "text-mg-charcoal"}`}>
      0
    </span>
  );
};

const ResourceGrid: React.FC<ResourceGridProps> = ({ 
  resources, 
  selectedCategory, 
  searchQuery 
}) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [active, setActive] = useState<Resource | null>(null);
  const [visibleCount, setVisibleCount] = useState(9);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setVisibleCount(9); // Reset on filter or search change
  }, [selectedCategory, searchQuery]);

  const filteredResources = resources
    .filter((res) => selectedCategory === "All" || res.category === selectedCategory)
    .filter((res) => 
      res.title.toLowerCase().includes(searchQuery) ||
      res.description.toLowerCase().includes(searchQuery)
    );
  
  const visibleResources = filteredResources.slice(0, visibleCount);

  const handleLoadMore = () => {
    setIsLoading(true);
    setTimeout(() => {
      setVisibleCount(prevCount => prevCount + 6);
      setIsLoading(false);
    }, 800); // Simulate loading delay
  };
  const handleCardClick = (resource: Resource) => {
    setActive(resource);
  };

  const getPlatformIcon = (platform?: string) => {
    switch (platform) {
      case "youtube": return <Youtube size={14} className="text-red-500" />;
      case "instagram": return <Instagram size={14} className="text-pink-500" />;
      case "telegram": return <Send size={14} className="text-cyan-500" />;
      default: return null;
    }
  };

  const Loader = () => (
    <motion.div
      initial="initial"
      animate="animate"
      variants={{
        animate: { transition: { staggerChildren: 0.1 } }
      }}
      className="flex items-center justify-center gap-2 h-[56px]" // Match button height
    >
      {[0, 1, 2].map(i => (
        <motion.div
          key={i}
          variants={{
            initial: { y: 0 },
            animate: {
              y: [0, -12, 0],
              transition: { duration: 1.2, repeat: Infinity, ease: "easeInOut" }
            }
          }}
          className={`w-3 h-3 rounded-full ${isDark ? 'bg-mg-gold' : 'bg-mg-green'}`}
        />
      ))}
    </motion.div>
  );

  return (
    <>
      <motion.section
        id="resources"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="px-0 sm:px-10 md:px-16 py-16"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 ">
          {visibleResources.map((resource, index) => (
            <motion.article
              key={resource.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 100, damping: 20, delay: (index % 3) * 0.1 }}
              viewport={{ once: true, amount: 0.1 }}
              onClick={() => handleCardClick(resource)}
              className={`grid md:block grid-cols-2 gap-4 
                cursor-pointer rounded-3xl overflow-hidden shadow-xl
                transition-all duration-500 group
                ${isDark 
                  ? "bg-mg-charcoal/60 border border-mg-gold/10 hover:shadow-mg-gold/30" 
                  : "bg-white/80 border border-mg-green/10 hover:shadow-mg-green/30"
                }
              `}
            >
              {/* Image Container */}
              <div className="relative overflow-hidden h-28 md:h-56">
                <img
                  src={resource.image}
                  alt={resource.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                />
                
                {/* Gradient Overlay on Hover */}
                <div className={`
                  absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500
                  ${isDark 
                    ? "bg-gradient-to-t from-mg-black/90 via-mg-black/50 to-transparent" 
                    : "bg-gradient-to-t from-white/30 via-white/40 to-transparent"
                  }`}
                />

                {/* Category Badge */}
                <div className={`
                  absolute left-4 top-4 px-3 py-1.5 rounded-full text-xs font-bold backdrop-blur-sm
                  ${isDark 
                    ? "bg-mg-green/20 text-mg-white border border-mg-green/30" 
                    : "bg-mg-black/10 text-mg-white border border-mg-green/20"
                  }`}
                >
                  {resource.category}
                </div>

                {/* Platform Icon */}
                {resource.platform && (
                  <div className={`absolute right-4 top-4 px-3 py-1.5 rounded-full text-xs font-bold backdrop-blur-sm ${isDark 
                    ? "bg-mg-green/20 text-mg-white border border-mg-green/30" 
                    : "bg-mg-black/10 text-mg-white border border-mg-green/20"
                  } `}>
                    {getPlatformIcon(resource.platform)}
                  </div>
                )}
              </div>

              {/* Content */}
              <div className=" p-1 md:p-6 space-y-3  h-28 md:h-56">
                {/* Title */}
                <h3 className={` text-[.6rem]
                  md:text-xl font-black line-clamp-2
                  ${isDark 
                    ? "bg-clip-text text-transparent bg-gradient-to-r from-mg-white via-mg-white/50 to-mg-gold" 
                    : "bg-clip-text text-transparent bg-gradient-to-l  from-mg-black via-mg-black to-mg-gold"
                  }`}
                >
                  {resource.title}
                </h3>

                {/* Description */}
                <p className={`text-[.4rem] md:text-sm leading-relaxed line-clamp-3
                  ${isDark ? "text-mg-paper/70" : "text-mg-charcoal/70"}
                `}>
                  {resource.description}
                </p>

                {/* Meta */}
                <div className={`
                  flex items-center justify-between text-[.5rem] md:text-xs font-medium
                  ${isDark ? "text-mg-paper/50" : "text-mg-charcoal/50"}
                `}>
                  <div className="flex items-center gap-1.5 ">
                    <User size={14} className="text-mg-gold" />
                    <span>{resource.author ?? "Marketgod"}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar size={14} className="text-mg-green" />
                    <span>
                      {resource.date 
                        ? new Date(resource.date).toLocaleDateString("en-GB", { 
                            day: "numeric", month: "short" 
                          })
                        : ""
                      }
                    </span>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Load More Button */}
        {visibleCount < filteredResources.length && (
          <div className="text-center mt-16">
            {isLoading ? (
              <Loader />
            ) : (
              <button
                onClick={handleLoadMore}
                className={`
                  px-8 py-4 border-2 font-black rounded-full transition-all hover:scale-105
                  ${isDark 
                    ? "border-mg-gold text-mg-gold hover:bg-mg-gold/10" 
                    : "border-mg-green text-mg-green hover:bg-mg-green/10"
                  }`}
              >
                Load More
              </button>
            )}
          </div>
        )}

        {/* End of Content Footer */}
        <div className="text-center mt-24 pt-16 border-t border-dashed border-gray-500/30">
          <h4 className={`text-2xl font-black ${isDark ? "text-mg-paper" : "text-mg-charcoal"}`}>
            You've Reached the End!
          </h4>
          <p className={`mt-2 text-base ${isDark ? "text-mg-paper/60" : "text-mg-charcoal/60"}`}>
            Follow for more updates and new content.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 max-w-4xl mx-auto mt-12">
            {[
              { name: "YouTube", icon: <Youtube className="w-7 h-7 text-red-500" />, followers: 21200, link: "https://www.youtube.com/@marketgodcommunity" },
              { name: "Instagram", icon: <Instagram className="w-7 h-7 text-pink-500" />, followers: 33700, link: "https://www.instagram.com/eyram_dela" },
              { name: "Telegram", icon: <Send className="w-7 h-7 text-cyan-500" />, followers: 13000, link: "https://t.me/marketgodcommunity" },
              { name: "TikTok", icon: <TikTokIcon className={`w-7 h-7 ${isDark ? 'text-white' : 'text-black'}`} />, followers: 10000, link: "https://www.tiktok.com/@marketgodcommunity" },
              { name: "X (Twitter)", icon: <Twitter className={`w-7 h-7 ${isDark ? 'text-white' : 'text-black'}`} />, followers: 5200, link: "https://x.com/eyramdela" },
              { name: "Facebook", icon: <Facebook className="w-7 h-7 text-blue-600" />, followers: 2000, link: "https://www.facebook.com/share/1E24KkebYt/?mibextid=wwXIfr" },
            ].map((social) => (
              <motion.a
                key={social.name}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -8, scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
                className={`
                  col-span-1 md:col-span-1
                  p-6 rounded-2xl flex flex-col items-center justify-center gap-3
                  ${isDark 
                    ? "bg-mg-charcoal/60 border border-mg-gold/10 hover:shadow-lg hover:shadow-mg-gold/10" 
                    : "bg-white/80 border border-mg-green/10 hover:shadow-lg hover:shadow-mg-green/10"
                  }
                `}
              >
                {social.icon}
                <div className="text-center">
                  <AnimatedCounter to={social.followers} isDark={isDark} />
                  <p className={`text-xs font-medium uppercase tracking-wider ${isDark ? "text-mg-paper/50" : "text-mg-charcoal/50"}`}>
                    {social.name}
                  </p>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Modal */}
      {active && (
        <ResourceModal
          resource={active}
          onClose={() => setActive(null)}
        />
      )}
    </>
  );
};

export default ResourceGrid;


