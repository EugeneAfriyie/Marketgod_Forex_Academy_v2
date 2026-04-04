import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

const items = [
  {
    title: "Beginners",
    desc: "Those with little to no experience who want to understand forex from the ground up.",
  },
  {
    title: "Side Hustlers & Entrepreneurs",
    desc: "People looking for a second income stream with a skill that pays long-term.",
  },
  {
    title: "Students & Young Professionals",
    desc: "Anyone who wants to build early financial independence.",
  },
  {
    title: "Traders Who Need Structure",
    desc: "Those with knowledge but lacking consistency, discipline, or a clear system.",
  },
];

const WhoIsFor = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-3xl md:text-5xl font-extrabold text-center mb-14"
      >
        <span className="text-mg-gold">Who Is</span>{" "}
        <span className={isDark ? "text-white" : "text-mg-black"}>
          This Course For?
        </span>
      </motion.h2>

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-14 items-center">
        {/* IMAGE SIDE */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative"
        >
          {/* — Reduced glow (only soft gold now) — */}
          {/* <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-mg-gold/30 to-transparent blur-3xl opacity-40" /> */}

          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="relative rounded-3xl overflow-hidden shadow-xl border border-mg-gold/20"
          >
            <img
              src="https://res.cloudinary.com/dzqdfaghg/image/upload/v1763522350/SnapInsta.to_475805185_18485769334003421_4253108973963297143_n_otuucy.jpg"
              alt="Who This Course Is For"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          </motion.div>
        </motion.div>

        {/* TEXT SIDE */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          {/* Intro Text */}
          <p
            className={`text-lg md:text-xl leading-relaxed mb-10 ${
              isDark ? "text-mg-white" : "text-mg-black/70"
            }`}
          >
            Whether you're a complete beginner or someone who struggles with
            consistency, this program gives you the structure, clarity, and
            discipline needed to trade with confidence.
          </p>

          {/* Bullet List */}
          <div className="space-y-7">
            {items.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="flex items-start gap-4"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 180,
                    delay: i * 0.15,
                  }}
                >
                  <CheckCircle className="text-mg-gold w-7 h-7 flex-shrink-0" />
                </motion.div>

                <div>
                  <p className={`text-lg font-semibold dark:text-mg-paper text-mg-black`}>
                    {item.title}
                  </p>
                  <p
                    className={`text-base md:text-lg ${
                      isDark ? "text-mg-paper/90" : "text-mg-black/90"
                    }`}
                  >
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.a
            href="#pricing"
            whileHover={{ scale: 1.06 , boxShadow: "0 0 25px rgba(212,175,55,0.5)" }}
          whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 mt-12 px-8 py-4 rounded-full font-bold text-lg 
            bg-mg-black text-white dark:bg-mg-white dark:text-mg-black shadow-lg hover:shadow-mg-green/40 transition-all"
          >
            Join the Program
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default WhoIsFor;



