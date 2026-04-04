// // src/components/Services/Services.tsx
// import React from "react";
// import { motion } from "framer-motion";
// import { useTheme } from "../../context/ThemeContext";
// import { 
//   BookOpen, 
//   Signal, 
//   Users, 
//   Trophy, 
//   Shield, 
//   Zap,
//   ArrowRight 
// } from "lucide-react";

// import { video } from "framer-motion/client";

// const Services = () => {
//   const { theme } = useTheme();

//   const services = [
//     {
//       icon: BookOpen,
//       title: "Forex Mastery Course",
//       desc: "Lifetime access to price action, institutional order flow, and the Sniper MarketGod Strategy. From beginner to pro.",
//       price: "$547",
//       value: "Worth $1,299",
//       features: ["Self-paced videos", "PDF guides", "Real case studies"],
//       cta: "Join Course",
//       href: "#plans"
//     },
//     {
//       icon: Signal,
//       title: "VIP Live Signals",
//       desc: "High-probability trade alerts via Telegram. 87% win rate. 24/7 GMT. No AI — pure human analysis.",
//       price: "$97/mo",
//       value: "Daily signals",
//       features: ["Entry, TP, SL", "Breakdowns", "Risk management"],
//       cta: "Get Signals",
//       href: "#signals"
//     },
//     {
//       icon: Users,
//       title: "1-Year Mentorship",
//       desc: "Live group sessions, 1-on-1 coaching, and daily market breakdowns with Eyram Dela.",
//       price: "FREE",
//       value: "With Course",
//       features: ["Weekly live calls", "Q&A", "Trade reviews"],
//       cta: "Join Free",
//       href: "#plans"
//     },
//     {
//       icon: Trophy,
//       title: "Strategy Vault",
//       desc: "Proven systems, custom indicators, and psychology sessions. Build your edge.",
//       price: "Included",
//       value: "With Course",
//       features: ["Indicators", "Templates", "Mindset training"],
//       cta: "Access Vault",
//       href: "#plans"
//     },
//   ];

//   return (
//     <section id="services" className="py-24 relative overflow-hidden">
//       {/* Ghana Flag Stripe */}
//       <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-red-600 via-yellow-500 to-green-600 opacity-90 z-50 shadow-md" />

//       {/* Background Gradient */}
//       <div className="absolute inset-0 bg-gradient-to-b from-transparent via-mg-gold/5 to-transparent opacity-50" />

//       <div className="relative z-10 max-w-7xl mx-auto px-6">
//         {/* Header */}
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           className="text-center mb-16"
//         >
//           <h2 className={`text-4xl md:text-6xl font-black tracking-tight mb-4 ${
//             theme === "light" ? "text-mg-light-text" : "text-mg-gold"
//           }`}>
//             Our <span className="text-mg-gold">Services</span>
//           </h2>
//           <p className={`text-xl md:text-2xl max-w-3xl mx-auto ${
//             theme === "light" ? "text-mg-light-textSecondary" : "text-mg-dark-textSecondary"
//           }`}>
//             Everything you need to trade like a pro — from Ghana, for Africa.
//           </p>
//         </motion.div>

//         {/* Services Grid */}
//         <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
//           {services.map((service, i) => (
//             <motion.div
//               key={i}
//               initial={{ opacity: 0, y: 40 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ delay: i * 0.1 }}
//               whileHover={{ y: -8, scale: 1.03 }}
//               className={`relative p-8 rounded-3xl border-2 backdrop-blur-md transition-all cursor-pointer group ${
//                 theme === "light"
//                   ? "bg-white/90 border-mg-gold/30 shadow-xl"
//                   : "bg-mg-dark-bg/90 border-mg-gold/40 shadow-2xl"
//               }`}
//             >
//               {/* Icon */}
//               <div className="mb-6">
//                 <service.icon size={48} className="text-mg-gold" />
//               </div>

//               {/* Title */}
//               <h3 className={`text-2xl font-bold mb-3 ${
//                 theme === "light" ? "text-mg-light-text" : "text-mg-gold"
//               }`}>
//                 {service.title}
//               </h3>

//               {/* Desc */}
//               <p className={`text-base leading-relaxed mb-6 ${
//                 theme === "light" ? "text-mg-light-textSecondary" : "text-mg-dark-textSecondary"
//               }`}>
//                 {service.desc}
//               </p>

//               {/* Price */}
//               <div className="mb-4">
//                 <div className={`text-3xl font-black ${theme === "light" ? "text-mg-light-text" : "text-mg-gold"}`}>
//                   {service.price}
//                 </div>
//                 {service.value && (
//                   <div className="text-sm uppercase tracking-widest text-mg-gold/70">
//                     {service.value}
//                   </div>
//                 )}
//               </div>

//               {/* Features */}
//               <ul className="space-y-2 mb-8">
//                 {service.features.map((feat, j) => (
//                   <li key={j} className={`flex items-center gap-2 text-sm ${
//                     theme === "light" ? "text-mg-light-textSecondary" : "text-mg-dark-textSecondary"
//                   }`}>
//                     <Zap size={16} className="text-mg-gold" />
//                     {feat}
//                   </li>
//                 ))}
//               </ul>

//               {/* CTA */}
//               <motion.a
//                 href={service.href}
//                 whileHover={{ x: 4 }}
//                 className={`inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold uppercase tracking-wide transition-all ${
//                   service.price === "FREE" || service.price === "Included"
//                     ? "bg-mg-gold text-mg-black"
//                     : "bg-white/20 text-white border border-white/30 hover:bg-white/30"
//                 }`}
//               >
//                 {service.cta}
//                 <ArrowRight size={18} />
//               </motion.a>
//             </motion.div>
//           ))}
//         </div>

//         {/* Final CTA */}
//         <motion.div
//           initial={{ opacity: 0 }}
//           whileInView={{ opacity: 1 }}
//           viewport={{ once: true }}
//           transition={{ delay: 0.5 }}
//           className="text-center mt-16"
//         >
//           <motion.a
//             href="#plans"
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             className="inline-flex items-center gap-3 px-10 py-5 bg-mg-gold text-mg-black rounded-full font-bold uppercase tracking-widest shadow-xl"
//           >
//             Choose Your Plan Now
//             <Trophy size={24} />
//           </motion.a>
//         </motion.div>
//       </div>
//     </section>
//   );
// };

// export default Services;

















// video https://res.cloudinary.com/dzqdfaghg/video/upload/v1762586468/SnapInsta.to_AQMpQmG3g_9Al3k25-LfRZkEq6JEbtpWYT-fVyNlGZ8o4QiDlxfqsAJG0CKq2U0YB4ama5M5g9AoYTx7akojN20A0S-8_Btwq23_3t0_iq74ns.mp4


