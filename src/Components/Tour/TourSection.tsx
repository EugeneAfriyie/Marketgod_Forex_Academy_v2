import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { Check } from "lucide-react";

export default function TourSectionVideoLeft() {
  const tourDates = [
    { city: "Ho", date: "21 Feb" },
    { city: "Takoradi", date: "7 Mar" },
    { city: "Kumasi", date: "21 Mar" },
    { city: "Tamale", date: "28 Mar" },
    { city: "Koforidua", date: "11 Apr" },
    { city: "Techiman", date: "25 Apr" },
  ];

  const firstUpcoming = 4;

  // Scroll-trigger animation
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.3 });

  useEffect(() => {
    if (inView) controls.start("visible");
  }, [controls, inView]);

  // Variants for staggered tour dates
  const datesVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" as const },
    }),
  };

  return (
    <section
      ref={ref}
      className="relative w-full flex flex-col lg:flex-row items-center gap-8 py-16 px-4 lg:px-24 overflow-hidden bg-mg-dark-bg"
    >
      {/* Left Video Section */}
<div className="lg:w-1/2 w-full h-80 lg:h-[500px] relative rounded-2xl overflow-hidden shadow-2xl">
  {/* Wrapper for parallax */}
  <motion.div
    initial={{ y: 0 }}
    animate={{ y: inView ? -20 : 0 }}
    transition={{ type: "spring", stiffness: 20, damping: 10 }}
    className="w-full h-full"
  >
    <video
      src="https://res.cloudinary.com/dzqdfaghg/video/upload/v1771486226/SnapInsta.to_AQPsddf-wYv5pqzPsA1sDoEOu-ndz6ijPp1vOvDZGsRpJtCQ7ENdTQzeoDvWf3fZrLPntm5CMo_Lckkp-tbC-8nJ_jddm9o.mp4"
      muted
      loop
      playsInline
      controls
      className="w-full h-full object-cover"
    />
  </motion.div>

  {/* Badge */}
  <div className="absolute top-4 left-4 bg-mg-gold text-mg-black text-xs font-bold px-3 py-1 rounded-full shadow-gold-glow">
    2026 Ghana Tour
  </div>
</div>



      {/* Right Content */}
     <motion.div
  initial="hidden"
  animate={controls}
  variants={{
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  }}
  className="lg:w-1/2 w-full flex flex-col gap-4"
>
  {/* Headline */}
  <h2 className="text-4xl lg:text-5xl font-bold text-mg-gold uppercase">
    Step Into the Action
  </h2>

  {/* New description */}
  <p className="text-mg-dark-textSecondary text-sm lg:text-base leading-relaxed">
    The stage is set. The cities await. This year, Market God is bringing hands-on mentorship to six cities across Ghana. Prepare for live sessions, real strategies, and the chance to elevate your trading journey like never before.
  </p>

  {/* Tour Dates with staggered animation */}
  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
    {tourDates.map((item, index) => (
      <motion.div
        key={index}
        custom={index}
        initial="hidden"
        animate={controls}
        variants={datesVariants}
        className={`border rounded-lg px-3 py-2 text-xs sm:text-sm flex items-center justify-center gap-2
          ${index === firstUpcoming ? "border-mg-gold font-semibold text-mg-white shadow-gold-glow" : "border-mg-dark-border text-mg-dark-textSecondary"}`}
      >
        {index < firstUpcoming && <Check size={14} className="text-mg-gold" />}
        {item.city} — {item.date}
      </motion.div>
    ))}
  </div>

  {/* Psychological Trigger */}
<motion.div
  initial={{ opacity: 0, y: 10 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 1, duration: 0.6 }}
  className="text-xs text-mg-white mb-4 italic space-y-2"
>
  <p>Don’t just watch. Be part of the movement.</p>
  <p>
    If you’ll be attending the tour, make sure you join{" "}
    <a
      href="https://t.me/Livetradewithmarketgodbot"
      className="text-mg-gold underline"
      target="_blank"
      rel="noopener noreferrer"
    >
      @livetradewithmarketgodbot
    </a>{" "}
    🔥 Lock in with MARKETGOD and stand a chance to win amazing prizes. Don’t miss out 🚀
  </p>
</motion.div>



  {/* CTA Button */}
  <motion.a
    href="https://mainstack.com/s/marketgod"
    target="_blank"
    rel="noopener noreferrer"
    whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(212,175,55,0.6)" }}
    className="mt-6 self-start bg-mg-gold text-mg-black font-semibold py-3 px-6 rounded-xl shadow-gold-glow transition-all duration-300 inline-block"
  >
    Reserve Your Spot
  </motion.a>
</motion.div>

    </section>
  );
}



