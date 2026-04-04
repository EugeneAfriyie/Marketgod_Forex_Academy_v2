// src/components/About/AboutHero.tsx

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const AboutHero = () => {



  return (
    <section className="relative overflow-hidden py-32 md:py-44">
      {/* === PARALLAX BG === */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://res.cloudinary.com/dzqdfaghg/image/upload/v1763522351/SnapInsta.to_322660411_898835291127050_9203872977349659886_n_bdajly.jpg')`,
        }}
        initial={{ scale: 1 }}
        animate={{ scale: 1.12 }}
        transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
      />

      {/* === OVERLAY === */}
      <div className="absolute z-10 inset-0 bg-gradient-to-t from-black/70 via-black/70 to-black/90" />


      {/* === CONTENT === */}
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div className="text-center text-white">
          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-black tracking-tight mb-6 drop-shadow-2xl"
          >
            The <span className="text-mg-green">Marketgod</span> Story
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl max-w-4xl mx-auto mb-12 leading-relaxed drop-shadow-md"
          >
            From a <span className="text-mg-gold font-bold">university dorm</span> to 
            <span className="text-mg-gold font-bold"> locked in a room</span> — 
            this is the <span className="text-mg-green font-bold">real Ghanaian hustle</span> that built an empire.
          </motion.p>

          {/* Portrait + Quote */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-16">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, type: "spring", stiffness: 120 }}
              className="relative"
            >
              <div className="absolute inset-0 w-72 h-72 rounded-full blur-3xl bg-mg-gold/30 -z-10" />
              <img
                src="https://res.cloudinary.com/dzqdfaghg/image/upload/v1763522350/SnapInsta.to_320260939_5672262492849628_1617341641572155430_n_1_zsx8li.jpg"
                alt="Marketgod - Eyram Dela"
                className="w-64 h-64 rounded-full object-cover border-8 border-mg-gold shadow-2xl"
              />
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-mg-green text-white px-6 py-2 rounded-full font-bold text-sm shadow-lg">
                Founder & Lead Mentor
              </div>
            </motion.div>

            <motion.blockquote
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut",delay: 0.6 }}
              className="max-w-xl text-left p-8 rounded-3xl border-l-8 border-mg-gold bg-white/10 backdrop-blur-lg shadow-2xl"
            >
              <p className="text-lg italic mb-4 leading-relaxed text-white drop-shadow">
                "I used to <span className="text-mg-gold font-bold">beg my mother for money</span> to trade. 
                She’d ask: <span className="text-red-400">'What are you doing in that room all day?'</span> 
                Now, I teach <span className="text-mg-green font-bold">10,000+ Ghanaians</span> how to win."
              </p>
              <footer className="text-mg-green font-bold text-right drop-shadow">
                — Marketgod (Eyram Dela)
              </footer>
            </motion.blockquote>
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
            className="mt-16"
          >
            <motion.a
              href="/plans/#pricing"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-3 px-8 py-4 bg-mg-white text-mg-black rounded-full font-bold text-lg shadow-2xl hover:shadow-mg-gold/50 transition-all"
            >
              Join the Legacy
              <ArrowRight size={24} />
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutHero;


