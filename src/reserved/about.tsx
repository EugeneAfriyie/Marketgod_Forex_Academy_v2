// src/pages/About.tsx
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { 
  Globe, 
  Users, 
  TrendingUp, 
  Award, 
  Heart, 
  Shield, 
  Star, 
  ArrowRight,
  Home,
  Laptop,
  GraduationCap,
  Lightbulb,
  Target,

} from "lucide-react";

const About = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const stats = [
    { icon: Users, value: "10,000+", label: "Students Trained" },
    { icon: TrendingUp, value: "87%", label: "VIP Win Rate" },
    { icon: Award, value: "SNS Partner", label: "Official Broker" },
    { icon: Globe, value: "Ghana #1", label: "Forex Academy" },
  ];

  return (
    <div className={`min-h-screen ${isDark ? "bg-mg-black" : "bg-mg-light-bg"}`}>
      {/* HERO: THE ORIGIN STORY */}
      <section className="relative overflow-hidden py-24">
        {/* Ghana Flag Wave */}
        <div className="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-red-600 via-yellow-500 to-green-600 opacity-90 shadow-lg z-50" />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h1 className={`text-5xl md:text-7xl font-black tracking-tight mb-6 ${
              isDark ? "text-mg-gold" : "text-mg-charcoal"
            }`}>
              The <span className="text-mg-green">MarketGod</span> Story
            </h1>
            <p className={`text-xl md:text-2xl max-w-4xl mx-auto mb-12 ${
              isDark ? "text-mg-paper/80" : "text-mg-charcoal/80"
            }`}>
              From a <span className="text-mg-gold font-bold">university dorm</span> to 
              <span className="text-mg-gold font-bold"> locked in a room</span> — 
              this is the <span className="text-mg-green">real Ghanaian hustle</span> that built an empire.
            </p>

            {/* Portrait + Core Quote */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-8">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="relative"
              >
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                  alt="MarketGod - Eyram Dela"
                  className="w-64 h-64 rounded-full object-cover border-8 border-mg-gold shadow-2xl"
                />
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-mg-green text-white px-6 py-2 rounded-full font-bold text-sm">
                  Founder & Lead Mentor
                </div>
              </motion.div>

              <motion.blockquote
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className={`max-w-xl text-left p-8 rounded-3xl border-l-8 border-mg-gold ${
                  isDark ? "bg-mg-charcoal/50" : "bg-mg-paper/80"
                }`}
              >
                <p className={`text-lg italic mb-4 ${isDark ? "text-mg-paper" : "text-mg-charcoal"}`}>
                  "I used to <span className="text-mg-gold font-bold">beg my mother for money</span> to trade. 
                  She’d ask: <span className="text-red-500">'What are you doing in that room all day?'</span> 
                  Now, I teach <span className="text-mg-green font-bold">10,000+ Ghanaians</span> how to win."
                </p>
                <footer className="text-mg-green font-bold">— MarketGod (Eyram Dela)</footer>
              </motion.blockquote>
            </div>
          </motion.div>
        </div>
      </section>

      {/* STATS BAR */}
      <section className={`py-12 ${isDark ? "bg-mg-charcoal" : "bg-mg-paper"}`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <stat.icon size={40} className="mx-auto mb-3 text-mg-gold" />
                <p className={`text-3xl font-black ${isDark ? "text-mg-gold" : "text-mg-charcoal"}`}>
                  {stat.value}
                </p>
                <p className={`text-sm ${isDark ? "text-mg-paper/70" : "text-mg-charcoal/70"}`}>
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* THE JOURNEY TIMELINE */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className={`text-4xl md:text-5xl font-black text-center mb-16 ${
              isDark ? "text-mg-gold" : "text-mg-charcoal"
            }`}
          >
            From Dorm Room to National Stage
          </motion.h2>

          <div className="space-y-16">
            {[
              { 
                year: "University Days", 
                icon: GraduationCap,
                title: "First Touch of Forex", 
                desc: "Introduced to charts. No clarity. Just curiosity.",
                color: "text-blue-500"
              },
              { 
                year: "Post-Graduation", 
                icon: Home,
                title: "Locked in a Room", 
                desc: "Staring at charts 18 hours a day. Family pressure: 'What are you doing?'",
                color: "text-red-500"
              },
              { 
                year: "The Hustle", 
                icon: Laptop,
                title: "Borrowed from Mum", 
                desc: "Collected money to trade. Lost it all. But never quit.",
                color: "text-orange-500"
              },
              { 
                year: "Breakthrough", 
                icon: Lightbulb,
                title: "Sniper Strategy Born", 
                desc: "87% win rate system. Built in silence. Tested with fire.",
                color: "text-mg-green"
              },
              { 
                year: "2023 – Now", 
                icon: Users,
                title: "10,000+ Students", 
                desc: "Free PDFs. VIP Signals. SNS Partnership. Ghana tours.",
                color: "text-mg-gold"
              },
              { 
                year: "November 1, 2025", 
                icon: Star,
                title: "National Theatre", 
                desc: "200+ traders. Exness merch. History made in Accra.",
                color: "text-purple-500"
              },
            ].map((milestone, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className={`flex flex-col md:flex-row items-center gap-8 ${
                  i % 2 === 1 ? "md:flex-row-reverse" : ""
                }`}
              >
                <div className="flex-1 text-center md:text-left">
                  <p className={`font-bold text-lg ${milestone.color}`}>
                    {milestone.year}
                  </p>
                  <h3 className={`text-2xl font-bold mb-2 ${isDark ? "text-mg-gold" : "text-mg-charcoal"}`}>
                    {milestone.title}
                  </h3>
                  <p className={`${isDark ? "text-mg-paper/70" : "text-mg-charcoal/70"}`}>
                    {milestone.desc}
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 rounded-full bg-mg-gold/20 border-4 border-mg-gold flex items-center justify-center">
                    <milestone.icon size={36} className={`text-mg-gold`} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* VALUES & MISSION */}
      <section className={`py-20 ${isDark ? "bg-mg-charcoal" : "bg-mg-paper"}`}>
        <div className="max-w-7xl mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className={`text-4xl md:text-5xl font-black text-center mb-16 ${
              isDark ? "text-mg-gold" : "text-mg-charcoal"
            }`}
          >
            What We Stand For
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Target, title: "Clarity", desc: "No confusion. Just sniper entries." },
              { icon: Heart, title: "Family", desc: "We don’t sell courses. We build traders." },
              { icon: Shield, title: "Real Risk", desc: "We teach you to protect your capital — first." },
            ].map((value, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`p-8 rounded-3xl border text-center backdrop-blur-md ${
                  isDark ? "bg-mg-black/50 border-mg-gold/30" : "bg-mg-light-bg/80 border-mg-gold/20"
                }`}
              >
                <value.icon size={56} className="mx-auto mb-4 text-mg-gold" />
                <h3 className={`text-2xl font-bold mb-3 ${isDark ? "text-mg-gold" : "text-mg-charcoal"}`}>
                  {value.title}
                </h3>
                <p className={`text-lg ${isDark ? "text-mg-paper/80" : "text-mg-charcoal/80"}`}>
                  {value.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h2 className={`text-4xl md:text-6xl font-black mb-6 ${
              isDark ? "text-mg-gold" : "text-mg-charcoal"
            }`}>
              Your Turn to Rise
            </h2>
            <p className={`text-xl mb-8 max-w-3xl mx-auto ${
              isDark ? "text-mg-paper/80" : "text-mg-charcoal/80"
            }`}>
              MarketGod didn’t quit in the room. Now he teaches the world. 
              <span className="text-mg-green font-bold"> Will you?</span>
            </p>
            <motion.a
              href="/plans"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 px-12 py-6 bg-mg-gold text-mg-charcoal rounded-full font-bold uppercase tracking-wider text-lg shadow-xl hover:shadow-2xl transition-all"
            >
              Join the Academy
              <ArrowRight size={28} />
            </motion.a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;


