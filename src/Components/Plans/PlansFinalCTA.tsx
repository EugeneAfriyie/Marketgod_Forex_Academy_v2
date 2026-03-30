import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const PlansFinalCTA: React.FC = () => {
  const navigate = useNavigate();

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative flex flex-col items-center justify-center py-24 rounded-3xl shadow-2xl px-3 md:mx-16 overflow-hidden"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity30"
        style={{
          backgroundImage: "url('https://res.cloudinary.com/dzqdfaghg/image/upload/v1763530484/SnapInsta.to_468951874_18474324778003421_9174265825508903679_n_u7nfxb.jpg')", // replace with your image path
        }}
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 " />

      {/* Content */}
      <div className="relative z-10 text-center text-mg-gold">
        <h2 className="text-3xl md:text-5xl font-extrabold mb-6 text-white">
          Ready to Transform Your Forex Journey?
        </h2>
        <p className="text-[1rem] md:text-xl max-w-2xl m-auto mb-8 text-white/90 text-center">
          Join the Marketgod Mentorship and VIP Signals now. Learn, trade, and build
          your trading system with proven strategies.
        </p>
        <motion.button
        whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(212,175,55,0.5)" }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/register")}
          className="bg-mg-white text-black  px-8 py-4 rounded-full font-bold shadow-lg hover:shadow-mg-gold/50 transition-all"
        >
          Create Your Account
        </motion.button>
      </div>
    </motion.section>
  );
};

export default PlansFinalCTA;
