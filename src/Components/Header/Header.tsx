// src/components/Header.tsx
import { useState, useEffect } from "react";
import { Sun, Moon, Menu, Home, Info, Layers, BookOpen, Phone } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Drawer from "../MobileMenuDrawer/MobileMenuDrawer";
import EventPreHeader from "../Tour/EventPreHeader";

// Typewriter Component
const TypewriterText: React.FC = () => {
  const [h1Text, setH1Text] = useState("");
  const [pText, setPText] = useState("");
  const [phase, setPhase] = useState<"typing-h1" | "typing-p" | "deleting-p" | "deleting-h1">("typing-h1");
  const [loop, setLoop] = useState(0);

  const phrases = [
    { h1: "Marketgod", p: "Academy" }, 
    { h1: "Marketgod", p: "Where Markets Meets Mastery" },
  ];

  const current = phrases[loop % 2];

  useEffect(() => {
    const typingSpeed = 150;
    const deletingSpeed = 100;
    const pauseDuration = 5000;

    // let timer: NodeJS.Timeout;
    let timer: ReturnType<typeof setTimeout>;

    if (phase === "typing-h1") {
      if (h1Text.length < current.h1.length) {
        timer = setTimeout(() => {
          setH1Text(current.h1.slice(0, h1Text.length + 1));
        }, typingSpeed);
      } else {
        setPhase("typing-p");
      }
    } 
    else if (phase === "typing-p") {
      if (pText.length < current.p.length) {
        timer = setTimeout(() => {
          setPText(current.p.slice(0, pText.length + 1));
        }, typingSpeed);
      } else {
        timer = setTimeout(() => setPhase("deleting-p"), pauseDuration);
      }
    } 
    else if (phase === "deleting-p") {
      if (pText.length > 0) {
        timer = setTimeout(() => {
          setPText(current.p.slice(0, pText.length - 1));
        }, deletingSpeed);
      } else {
        setPhase("deleting-h1");
      }
    } 
    else if (phase === "deleting-h1") {
      if (h1Text.length > 0) {
        timer = setTimeout(() => {
          setH1Text(current.h1.slice(0, h1Text.length - 1));
        }, deletingSpeed);
      } else {
        setLoop(loop + 1);
        setPhase("typing-h1");
      }
    }

    return () => clearTimeout(timer);
  }, [h1Text, pText, phase, loop, current]);

  return (
    <div className="flex flex-col leading-tight -mt-1">
      <h1 className="text-sm font-black text-mg-gold tracking-tighter overflow-hidden whitespace-nowrap">
        Market<span className="dark:text-mg-paper text-mg-light-text">god</span>
        {phase === "typing-h1" && <span className="inline-block w-0.5 h-4 bg-mg-gold ml-1 animate-pulse" />}
      </h1>
      <p className="text-[.5rem] md:text-xs uppercase tracking-widest dark:text-mg-dark-textSecondary text-mg-light-textSecondary flex items-center gap-1 mt-0.5">
        {pText}
        {phase === "typing-p" && <span className="inline-block w-0.5 h-3 bg-mg-gold ml-1 animate-pulse" />}
      </p>
    </div>
  );
};


const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate(); // ← THIS IS THE KEY

  const [menuOpen, setMenuOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastY, setLastY] = useState(0);

  const { scrollY } = useScroll();
  const headerHeight = useTransform(scrollY, [0, 120], [84, 64]);
  const blurAmount = useTransform(scrollY, [0, 120], [20, 30]);
  const blurStyle = {
    backdropFilter: `blur(${blurAmount.get()}px)`,
    WebkitBackdropFilter: `blur(${blurAmount.get()}px)`,
  };
  const headerStyle = { ...blurStyle, height: headerHeight.get() };

  useEffect(() => {
    const onScroll = () => {
      if (location.pathname.startsWith("/blog")) {
        setVisible(true);
      } else if (window.scrollY > lastY && window.scrollY > 100) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      setLastY(window.scrollY);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [lastY, location.pathname]);

  const navLinks = [
    { name: "Home", icon: <Home size={22} />, id: "/" },
    { name: "Plans", icon: <Layers size={22} />, id: "/plans" },
    { name: "Blog", icon: <BookOpen size={22} />, id: "/blog" },
    { name: "Contact", icon: <Phone size={22} />, id: "/contact" },
    { name: "About", icon: <Info size={22} />, id: "/about" },
  ];

  const pulse = useSpring(1, { stiffness: 200, damping: 10 });
  useEffect(() => {
    pulse.set(window.scrollY > 30 ? 1.05 : 1);
  }, [scrollY, pulse]);

  // SMOOTH NAVIGATION WITHOUT REFRESH
  const handleNavClick = (path: string) => {
    navigate(path);
    window.scrollTo(0, 0); // Optional: scroll to top
  };

  return (
    <>
     
     <div className="fixed top-0 left-0 w-full z-40 flex flex-col">

    <EventPreHeader />
      {/* DESKTOP HEADER */}
      <motion.header
        animate={{ y: visible ? 0 : -190 }}
        transition={{ duration: 0.35 }}
        style={headerStyle}
        className={`
          hidden lg:flex items-center  w-full z-40 
          px-6 py-3 backdrop-blur-md bordr-b shadow-lg transition-all duration-300
          ${theme === "light"
            ? "bg-mg-light-surface/90 border-mg-light-border"
            : "bg-mg-dark-surface/95 border-mg-dark-border"
          }
        `}
      >
        {/* LOGO */}
        <div className="flex items-center gap-3 cursor-pointer w-1/4" onClick={() => handleNavClick("/")}>
          <div className="relative bg-black rounded-full">
            <img
              src="/logo-2.png"
              alt="Marketgod"
              className={`w-12 h-12 rounded-full object-cover border-2 
                ${theme === "light" ? "border-mg-black/70 shadow-gold-glow-light" : "border-mg-white shadow-gold-glow"}
              `}
            />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-mg-gold rounded-full animate-ping opacity-75" />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-mg-gold rounded-full" />
          </div>
          <TypewriterText />
        </div>

        {/* DESKTOP NAV */}
        <nav className="flex-1 flex justify-center">
          <div className="flex items-center gap-6">
            {navLinks.map((link) => {
              const active = location.pathname === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`
                    relative font-medium uppercase tracking-widest text-xs transition-all duration-300 cursor-pointer
                    ${active 
                      ? "text-mg-gold" 
                      : theme === "light" 
                        ? "text-mg-light-textSecondary hover:text-mg-gold" 
                        : "text-mg-dark-textSecondary hover:text-mg-gold"
                    }
                  `}
                >
                  <motion.span
                    whileHover={{ y: -4, scale: 1.08, x: 2, transition: { type: "spring", stiffness: 400 } }}
                    className="inline-block"
                  >
                    {link.name}
                  </motion.span>

                  {active && (
                    <motion.div
                      layoutId="activePill"
                      className="absolute -bottom-1.5 left-0 w-full h-0.5 bg-mg-gold rounded-full"
                      style={{
                        boxShadow: theme === "light"
                          ? "0 0 10px rgba(212, 175, 55, 0.5)"
                          : "0 0 12px rgba(212, 175, 55, 0.7)",
                      }}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </nav>

        {/* JOIN BUTTON + THEME */}
        <div className="flex items-center gap-4">
          <motion.button
            onClick={() => handleNavClick("/register")}
            className="relative overflow-hidden px-6 py-2.5 rounded-full font-bold uppercase tracking-wide text-xs flex items-center gap-2 shadow-lg bg-mg-black text-mg-paper dark:bg-mg-paper dark:text-mg-black"
            style={{ scale: pulse }}
             whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(212,175,55,0.5)" }}
          whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10">Get Started</span>
            <motion.div
              className="absolute inset-0 bg-mg-gold/80"
              initial={{ x: "-120%" }}
              whileHover={{ x: "120%" }}
              transition={{ duration: 0.6 }}
            />
          </motion.button>

          <motion.button
            onClick={toggleTheme}
            className={`p-2 rounded-full transition-all ${
              theme === "light" ? "bg-mg-light-border/40 hover:bg-mg-gold/15" : "bg-mg-dark-border/40 hover:bg-mg-gold/15"
            }`}
            whileHover={{ rotate: 360, scale: 1.15 }}
          >
            {theme === "light" ? <Moon size={18} className="text-mg-light-text" /> : <Sun size={18} className="text-mg-gold" />}
          </motion.button>
        </div>
      </motion.header>

      {/* MOBILE HEADER (Top) */}
      <motion.nav
        animate={{ y: visible ? 0 : -100, opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.35 }}
        className={`
          w-full lg:hidden flex justify-between items-center p-4
          backdrop-blur-md border-t z-40
          ${theme === "light" ? "bg-mg-light-surface/90 border-mg-light-border" : "bg-mg-dark-surface/95 border-mg-dark-border"}
        `}
      >
        {/* LOGO */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleNavClick("/")}>
          <img
            src="/logo-2.png"
            alt="Marketgod"
            className={`w-10 h-10 rounded-full object-cover border-2 ${
              theme === "light" ? "border-mg-black/70" : "border-mg-white"
            }`}
          />
          <TypewriterText />
        </div>

        {/* CONTROLS */}
        <div className="flex items-center gap-2">
          <motion.button
            onClick={toggleTheme}
            className={`p-2.5 rounded-full transition-all ${
              theme === "light" ? "bg-mg-light-border/40" : "bg-mg-dark-border/40"
            }`}
            whileTap={{ scale: 0.9, rotate: 90 }}
          >
            {theme === "light" ? <Moon size={20} className="text-mg-light-text" /> : <Sun size={20} className="text-mg-gold" />}
          </motion.button>
          <motion.button onClick={() => setMenuOpen(true)} className="p-2.5 rounded-full" whileTap={{ scale: 0.9 }}>
            <Menu size={24} className={theme === "light" ? "text-mg-light-text" : "text-mg-paper"} />
          </motion.button>
        </div>
      </motion.nav>
     </div>

      {/* MOBILE DRAWER */}
      <Drawer
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        navLinks={navLinks.map(l => ({ name: l.name, href: l.id }))}
      />
    </>
  );
};

export default Header;
