import React from "react";
import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";

const ResourcesHero: React.FC = () => {
  return (
    <section className="relative py-24 px-6 text-center font-montserrat overflow-hidden bg-gradient-to-b from-[#0b0f19] via-[#121826] to-[#0b0f19] text-white">
      {/* subtle glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,200,150,0.08),transparent_70%)]" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative max-w-3xl mx-auto"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex justify-center mb-6"
        >
          <div className="p-4 bg-[#00c896]/10 rounded-full">
            <BookOpen className="w-10 h-10 text-[#00c896]" />
          </div>
        </motion.div>

        <h1 className="text-3xl sm:text-5xl font-bold text-[#00c896] mb-4">
          Explore Trading Resources
        </h1>

        <p className="text-white/70 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
          Gain access to in-depth articles, trading guides, and educational materials
          designed to help you grow as a trader — from fundamentals to advanced strategies.
        </p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-8"
        >
          <a
            href="#resources"
            className="inline-block px-8 py-3 bg-[#00c896] text-black font-semibold rounded-2xl 
                       hover:scale-105 hover:shadow-[0_0_25px_rgba(0,200,150,0.5)] transition-all duration-300"
          >
            Browse Resources
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ResourcesHero;



