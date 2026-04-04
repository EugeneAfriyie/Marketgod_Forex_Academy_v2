// // src/Components/Header/Header.tsx
// import  { useState } from "react";
// import { motion } from "framer-motion";
// import { Link, useLocation } from "react-router-dom";
// import { useTheme } from "../../context/ThemeContext";
// import { Menu, X, Sun, Moon } from "lucide-react";

// const Header = () => {
//   const { theme, toggleTheme } = useTheme();
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const location = useLocation();

//   const navItems = [
//     { label: "Home", path: "/" },
//     { label: "About", path: "/about" },
//     { label: "Plans", path: "/plans" },
//     { label: "Blog", path: "/blog" },
//     { label: "Contact", path: "/contact" },
//   ];

//   const isActive = (path: string) => location.pathname === path;

//   return (
//     <header className={`sticky top-0 z-50 backdrop-blur-md border-b ${
//       theme === "light" ? "bg-mg-paper/90 border-mg-gold/20" : "bg-mg-charcoal/90 border-mg-gold/30"
//     }`}>
//       {/* Ghana Flag Stripe */}
//       <div className="h-1 bg-gradient-to-r from-red-600 via-yellow-500 to-green-600" />

//       <div className="max-w-7xl mx-auto px-6">
//         <div className="flex items-center justify-between h-20">
//           {/* LOGO */}
//           <Link to="/" className="flex items-center gap-3">
//             <img src="/logo.png" alt="MarketGod" className="bg-black w-12 h-12 rounded-full border-2 border-mg-gold" />
//             <div>
//               <h1 className="text-xl font-black text-mg-gold">MarketGod</h1>
//               <p className="text-xs text-mg-green font-semibold">ACADEMY</p>
//             </div>
//           </Link>

//           {/* DESKTOP NAV */}
//           <nav className="hidden md:flex items-center gap-8">
//             {navItems.map((item) => (
//               <Link
//                 key={item.path}
//                 to={item.path}
//                 className={`font-semibold transition-all ${
//                   isActive(item.path)
//                     ? "text-mg-gold"
//                     : theme === "light" ? "text-mg-charcoal/70 hover:text-mg-gold" : "text-mg-paper/70 hover:text-mg-gold"
//                 }`}
//               >
//                 {item.label}
//                 {isActive(item.path) && (
//                   <motion.div
//                     layoutId="activeNav"
//                     className="h-0.5 bg-mg-gold mt-1"
//                   />
//                 )}
//               </Link>
//             ))}

//             {/* THEME TOGGLE */}
//             <button
//               onClick={toggleTheme}
//               className="p-2 rounded-full bg-mg-gold/20 hover:bg-mg-gold/40 transition-all"
//             >
//               {theme === "light" ? <Moon size={20} className="text-mg-gold" /> : <Sun size={20} className="text-mg-gold" />}
//             </button>
//           </nav>

//           {/* MOBILE MENU BUTTON */}
//           <button
//             onClick={() => setMobileOpen(!mobileOpen)}
//             className="md:hidden p-2"
//           >
//             {mobileOpen ? <X size={28} className="text-mg-gold" /> : <Menu size={28} className="text-mg-gold" />}
//           </button>
//         </div>

//         {/* MOBILE NAV */}
//         <motion.div
//           initial={false}
//           animate={{ height: mobileOpen ? "auto" : 0 }}
//           className="md:hidden overflow-hidden"
//         >
//           <nav className="py-4 space-y-3">
//             {navItems.map((item) => (
//               <Link
//                 key={item.path}
//                 to={item.path}
//                 onClick={() => setMobileOpen(false)}
//                 className={`block px-4 py-2 rounded-lg font-semibold transition-all ${
//                   isActive(item.path)
//                     ? "bg-mg-gold text-mg-charcoal"
//                     : theme === "light" ? "text-mg-charcoal hover:bg-mg-gold/10" : "text-mg-paper hover:bg-mg-gold/10"
//                 }`}
//               >
//                 {item.label}
//               </Link>
//             ))}
//             <button
//               onClick={toggleTheme}
//               className="flex items-center gap-2 px-4 py-2 w-full text-left font-semibold"
//             >
//               {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
//               {theme === "light" ? "Dark Mode" : "Light Mode"}
//             </button>
//           </nav>
//         </motion.div>
//       </div>
//     </header>
//   );
// };

// export default Header;


