// src/components/Blog/ResourceModal.tsx
'use client';

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Link2, Copy, ArrowLeft, Share2, Youtube, Instagram, Send, ChevronLeft, ChevronRight } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useTheme } from "../../context/ThemeContext";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";


import {type Resource } from "../../types";

const getYouTubeEmbedSrc = (url?: string) => {
  if (!url) return null;
  const m = url.match(/(?:v=|\/)([0-9A-Za-z_-]{11})(?:\?|&|$)/);
  if (m?.[1]) return `https://www.youtube.com/embed/${m[1]}`;
  const short = url.match(/youtu\.be\/([0-9A-Za-z_-]{11})/);
  if (short?.[1]) return `https://www.youtube.com/embed/${short[1]}`;
  return null;
};

const getCloudinaryVideoSrc = (url?: string) => {
  if (!url?.includes("cloudinary")) return null;
  const match = url.match(/public_id=([^&]+)/);
  if (match?.[1]) {
    return `https://res.cloudinary.com/dzqdfaghg/video/upload/${match[1]}.mp4`;
  }
  return null;
};

const formatDate = (date?: string) =>
  date
    ? new Date(date).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "Nov 2025";



    const detectPlatform = (url: string) => {
  if (!url) return "image";

  if (url.includes("instagram.com")) return "instagram";
  if (url.includes("tiktok.com")) return "tiktok";
  if (url.includes("t.me") || url.includes("telegram.org")) return "telegram";
  if (url.includes("youtu")) return "youtube";
  if (url.includes("cloudinary")) return "cloudinary";
  return "image";
};

declare global {
  interface Window {
    instgrm?: {
      Embeds: {
        process: () => void;
      };
    };
  }
}

const getEmbedSrc = (url: string) => {
  if (url.includes("tiktok.com"))
    return url.replace("/video/", "/embed/");

  if (url.includes("youtube.com/watch?v="))
    return "https://www.youtube.com/embed/" + url.split("v=")[1];

  if (url.includes("youtu.be"))
    return "https://www.youtube.com/embed/" + url.split("youtu.be/")[1];

  return url;
};




export default function ResourceModal({
  resource,
  onClose,
}: {
  resource: Resource;
  onClose: () => void;
}) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const overlayRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
const [_mainSwiper, setMainSwiper] = useState<any>(null);


  // Lock scroll + ESC
  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = original;
      document.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  // Click outside
  useEffect(() => {
    const onMouseDown = (e: MouseEvent) => {
      if (modalRef.current?.contains(e.target as Node)) return;
      onClose();
    };
    overlayRef.current?.addEventListener("mousedown", onMouseDown);
    return () => overlayRef.current?.removeEventListener("mousedown", onMouseDown);
  }, [onClose]);

  // Focus trap
  useEffect(() => {
    const modal = modalRef.current;
    if (!modal) return;
    modal.focus();

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const focusable = modal.querySelectorAll(
        'button, [href], input, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const first = focusable[0] as HTMLElement;
      const last = focusable[focusable.length - 1] as HTMLElement;

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleTab);
    return () => document.removeEventListener("keydown", handleTab);
  }, [onClose]);

  const youtubeSrc = getYouTubeEmbedSrc(resource.video);
  const cloudinarySrc = getCloudinaryVideoSrc(resource.video);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(
        `${window.location.origin}/insights#resource-${resource.id}`
      );
      alert("Link copied!");
    } catch {}
  };

  const copyText = async () => {
    try {
      await navigator.clipboard.writeText(resource.fullText || resource.description);
      alert("Text copied!");
    } catch {}
  };

  const share = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: resource.title,
          text: resource.description,
          url: `${window.location.origin}/insights#resource-${resource.id}`,
        });
      } catch {}
    } else {
      copyLink();
    }
  };

  const getPlatformIcon = () => {
    switch (resource.platform) {
      case "youtube": return <Youtube className="w-5 h-5 text-red-500" />;
      case "instagram": return <Instagram className="w-5 h-5 text-pink-500" />;
      case "telegram": return <Send className="w-5 h-5 text-cyan-500" />;
      default: return null;
    }
  };


  // Inside ResourceModal component, above return
const MediaRenderer = ({ src }: { src: string }) => {
  const platform = detectPlatform(src);
  const embed = getEmbedSrc(src);
  const containerRef = useRef<HTMLDivElement>(null);

  switch (platform) {
    case "instagram":
      useEffect(() => {
        const scriptId = "instagram-embed-script";
        let script = document.getElementById(scriptId) as HTMLScriptElement;

        const processEmbed = () => {
          if (window.instgrm) {
            window.instgrm.Embeds.process();
          }
        };

        if (!script) {
          script = document.createElement("script");
          script.id = scriptId;
          script.async = true;
          script.src = "https://www.instagram.com/embed.js";
          script.onload = processEmbed;
          document.body.appendChild(script);
        } else {
          processEmbed();
        }

        return () => {
          // The cleanup logic might be complex if you need to remove the embed
          // but for now, we can leave the script in the body.
        };
      }, [src]);

      return (
        <div ref={containerRef} className="w-full h-full flex justify-center items-center p-4 bg-black">
          <blockquote className="instagram-media" data-instgrm-permalink={src} data-instgrm-version="14" style={{ maxWidth: '540px', width: 'calc(100% - 2px)', background: 'white', border: '1px solid rgb(219, 219, 219)', borderRadius: '3px', boxShadow: 'none', display: 'block', margin: '0 0 12px', minWidth: '326px', padding: '0' }}></blockquote>
        </div>
      );
    case "telegram":
      useEffect(() => {
        const scriptId = "telegram-widget-script";
        let script = document.getElementById(scriptId) as HTMLScriptElement;

        if (!script) {
          script = document.createElement("script");
          script.id = scriptId;
          script.async = true;
          script.src = "https://telegram.org/js/telegram-widget.js?22";
          document.body.appendChild(script);
        }
      }, []);

      const postPath = new URL(src).pathname.slice(1);

      return (
        <div className="w-full h-full flex justify-center items-start p-4 bg-black overflow-y-auto">
          <div className="w-full max-w-xl">
            <blockquote
              className="telegram-post"
              data-telegram-post={postPath}
              data-width="100%"
            ></blockquote>
          </div>
        </div>
      );
    case "youtube":
    case "tiktok":
      return (
        <iframe
          src={embed}
          className="w-full h-full"
          allow="fullscreen; autoplay; encrypted-media;"
        />
      );
    case "cloudinary":
      return (
        <video controls className="w-full h-full object-cover">
          <source src={src} type="video/mp4" />
        </video>
      );
    default:
      return (
        <img
        alt=""
         loading="lazy"
          src={src}
          className="w-full h-full object-cover"
        
        />
      );
  }
};

const StructuredData = ({ resource }: { resource: Resource }) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": resource.title,
    "description": resource.description,
    "image": resource.image,
    "author": {
      "@type": "Person",
      "name": resource.author || "Eyram Dela(MarketGod)"
    },
    "publisher": {
      "@type": "Organization",
      "name": "MarketGod Academy",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.marketgodacademy.com/logo.png" // Replace with your actual logo URL
      }
    },
    "datePublished": resource.date,
  };

  return (
    <script type="application/ld+json">{JSON.stringify(schema)}</script>
  );
};

  return (
    <AnimatePresence>
      <motion.div
        key="resource-modal"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[9999] flex items-center justify-center"
      >
        <>
          <title>{`${resource.title} | MarketGod Insights`}</title>
          <meta name="description" content={resource.description} />
          <StructuredData resource={resource} />
        </>

        <motion.div
          ref={overlayRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.85 }}
          exit={{ opacity: 0 }}
          className={`absolute inset-0 ${isDark ? "bg-mg-black/90" : "bg-mg-charcoal/90"} backdrop-blur-sm`}
        />

        <motion.div
          ref={modalRef}
          onClick={(e) => e.stopPropagation()}
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 40, opacity: 0 }}
          transition={{ type: "spring", stiffness: 250, damping: 25 }}
          className={`relative z-10 w-full h-full overflow-auto
            ${isDark ? "bg-mg-black text-mg-paper" : "bg-white text-mg-charcoal"}
          `}
          role="dialog"
          aria-modal="true"
          aria-labelledby="resource-title"
          tabIndex={-1}
        >
          {/* Header */}
          <header className={`sticky top-0 z-20 backdrop-blur-xl border-b
            ${isDark 
              ? "bg-mg-black/80 border-mg-gold/10" 
              : "bg-white/80 border-mg-green/10"
            }`}
          >
            <div className="flex items-center justify-between px-4 py-3 md:px-6">
              <button
                onClick={onClose}
                className={`flex items-center gap-1.5 font-medium transition
                  ${isDark ? "text-mg-paper/80 hover:text-mg-paper" : "text-mg-charcoal/80 hover:text-mg-charcoal"}
                `}
                aria-label="Go back"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="text-sm md:hidden">Back</span>
              </button>

              <div className="hidden md:flex items-center gap-3">
                {resource.link && (
                  <a
                    href={resource.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition
                      ${isDark 
                        ? "bg-mg-charcoal/50 hover:bg-mg-charcoal/70 text-mg-paper" 
                        : "bg-gray-100 hover:bg-gray-200 text-mg-charcoal"
                      }`}
                  >
                    <Link2 className="w-4 h-4" /> Open Source
                  </a>
                )}
                <button
                  onClick={copyLink}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition
                    ${isDark 
                      ? "bg-mg-charcoal/50 hover:bg-mg-charcoal/70 text-mg-paper" 
                      : "bg-gray-100 hover:bg-gray-200 text-mg-charcoal"
                    }`}
                >
                  <Copy className="w-4 h-4" /> Copy Link
                </button>
                <button
                  onClick={copyText}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition
                    ${isDark 
                      ? "bg-mg-charcoal/50 hover:bg-mg-charcoal/70 text-mg-paper" 
                      : "bg-gray-100 hover:bg-gray-200 text-mg-charcoal"
                    }`}
                >
                  <Copy className="w-4 h-4" /> Copy Text
                </button>
                <button
                  onClick={share}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition
                    ${isDark 
                      ? "bg-mg-charcoal/50 hover:bg-mg-charcoal/70 text-mg-paper" 
                      : "bg-gray-100 hover:bg-gray-200 text-mg-charcoal"
                    }`}
                >
                  <Share2 className="w-4 h-4" /> Share
                </button>
                <button
                  onClick={onClose}
                  className={`ml-2 p-2 rounded-full transition
                    ${isDark 
                      ? "bg-mg-charcoal/50 hover:bg-mg-charcoal/70" 
                      : "bg-gray-100 hover:bg-gray-200"
                    }`}
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          </header>

          {/* Media */}
         <div className="bg-gradient-to-b from-mg-charcoal/20 to-transparent">
  {resource.media && resource.media.length > 0 ? (
  <>
    {/* MAIN SLIDER */}
    <Swiper
      modules={[Navigation, Pagination, Thumbs]}
      navigation={{
        nextEl: ".next-btn",
        prevEl: ".prev-btn",
      }}
      pagination={{ clickable: true }}
      thumbs={{ swiper: thumbsSwiper }}
      onSwiper={(swiper) => setMainSwiper(swiper)}
      className="w-full h-[50vh] md:h-[70vh] rounded-2xl overflow-hidden"
    >
      {resource.media.map((item, idx) => (
        <SwiperSlide key={idx}>
          <div className="w-full h-full bg-black relative">
            <MediaRenderer src={item.src} />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>

    {/* CUSTOM ARROWS */}
    <div className="flex justify-between mt-3 px-4">
      <button className="prev-btn w-10 h-10 flex items-center justify-center rounded-full bg-white/90 shadow hover:bg-gray-100">
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button className="next-btn w-10 h-10 flex items-center justify-center rounded-full bg-white/90 shadow hover:bg-gray-100">
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>

    {/* THUMBNAILS */}
    <Swiper
      modules={[Thumbs]}
      onSwiper={setThumbsSwiper}
      slidesPerView={4}
      spaceBetween={12}
      watchSlidesProgress
      className="mt-4"
    >
      {resource.media.map((item, idx) => (
        <SwiperSlide key={idx + Math.random() * 100}>
          <div className="aspect-square rounded-lg overflow-hidden border cursor-pointer w-12 h-12 ml-5">
            <img
              alt=""
              loading="lazy"
              src={item.thumbnail || item.src}
              className="w-full h-full object-cover"
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  </>
) : (
  // fallback
  <>
    {cloudinarySrc ? (
      <video controls className="w-full h-[50vh] md:h-[70vh] object-cover">
        <source src={cloudinarySrc} type="video/mp4" />
      </video>
    ) : youtubeSrc ? (
      <iframe
        title={resource.title}
        src={`${youtubeSrc}?rel=0&modestbranding=1&autoplay=0`}
        allowFullScreen
        className="w-full h-12 md:h-12"
        loading="lazy"
      />
    ) : (
      <img
        src={resource.image}
        alt={resource.title}
        className="w-full h-12 md:h-12 object-cover"
      />
    )}
  </>
)}

</div>


          {/* Content */}
          <div className="max-w-5xl mx-auto px-6 py-10 space-y-8">
            {/* Title */}
            <div>
              <h1 id="resource-title" className={`
                text-3xl md:text-4xl font-black leading-tight
                ${isDark 
                    ? "bg-clip-text text-transparent bg-gradient-to-r from-mg-white via-mg-white/50 to-mg-gold" 
                    : "bg-clip-text text-transparent bg-gradient-to-l  from-mg-black via-mg-black to-mg-gold"
                  }`}
              >
                {resource.title}
              </h1>
              <div className={`flex flex-wrap items-center gap-4 mt-3 text-sm font-medium
                ${isDark ? "text-mg-paper/60" : "text-mg-charcoal/60"}
              `}>
                <span>{resource.author ?? "MarketGod"}</span>
                <span>•</span>
                <span>{formatDate(resource.date)}</span>
                <span>•</span>
                <span className="text-mg-green">{resource.category}</span>
                {resource.platform && (
                  <>
                    <span>•</span>
                    <span className="flex items-center gap-1.5">
                      {getPlatformIcon()}
                      {resource.platform.charAt(0).toUpperCase() + resource.platform.slice(1)}
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Markdown Content */}
            <div className={`prose prose-lg max-w-none
              ${isDark ? "prose-invert" : ""}
            `}>
              {resource.fullText ? (
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    h2: ({ children }) => (
                      <h2 className={`text-2xl font-black mt-8 mb-4
                        ${isDark ? "text-mg-gold" : "text-mg-charcoal"}
                      `}>{children}</h2>
                    ),
                    p: ({ children }) => (
                      <p className={`leading-relaxed mb-5
                        ${isDark ? "text-mg-paper/80" : "text-mg-charcoal/80"}
                      `}>{children}</p>
                    ),
                    img: ({ src, alt }) => (
                      <img src={src} alt={alt} className="rounded-2xl my-8 w-full object-cover shadow-xl" loading="lazy" />
                    ),
                    a: ({ href, children }) => (
                      <a href={href} className="text-mg-green underline hover:text-mg-gold font-medium" target="_blank" rel="noopener">
                        {children}
                      </a>
                    ),
                    blockquote: ({ children }) => (
                      <blockquote className={`border-l-4 pl-6 italic my-6
                        ${isDark 
                          ? "border-mg-gold/50 text-mg-paper/70 bg-mg-charcoal/30" 
                          : "border-mg-green/50 text-mg-charcoal/70 bg-gray-50"
                        } py-4 rounded-r-xl`}
                      >
                        {children}
                      </blockquote>
                    ),
                  }}
                >
                  {resource.fullText}
                </ReactMarkdown>
              ) : (
                <p className={isDark ? "text-mg-paper/80" : "text-mg-charcoal/80"}>
                  {resource.description}
                </p>
              )}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
              <motion.a
              whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(212,175,55,0.5)" }}
          whileTap={{ scale: 0.95 }}
                href="https://t.me/livetradewithmarketgodbot"
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center justify-center gap-2 px-8 py-4  font-black rounded-full shadow-xl   transition-all text-lg  ${isDark 
                    ? "bg-mg-white text-mg-black " 
                    : "bg-mg-gold  text-mg-white  shadow-lg"
                  } `}
              >
                Join VIP Signals
              </motion.a>
              <motion.a
              whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(212,175,55,0.5)" }}
          whileTap={{ scale: 0.95 }}
                href="https://t.me/delatrades"
                className={`px-8 py-4 border-2 font-black rounded-full transition-all 
                  ${isDark 
                    ? "border-mg-gold text-mg-gold " 
                    : "border-mg-green bg-black text-mg-white hover:bg-mg-green/10 shadow-lg"
                  }`}
              >
                Book 1-on-1 Mentorship
              </motion.a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}





