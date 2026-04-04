// src/components/FAQ/FAQ.tsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";
import { ChevronDown, ChevronUp, TrendingUp } from "lucide-react";
import { useSwipeable } from "react-swipeable";
import FAQCTA from "./MarketGodFAQSection";
const faqIllustration = "https://res.cloudinary.com/dzqdfaghg/image/upload/v1763522350/SnapInsta.to_475913101_18485769337003421_2628299053802728044_n_or0wbw.jpg"; // replace with your image

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "What is Marketgod Academy?",
    answer:
      "Marketgod Academy is a trading mentorship platform focused on price action and institutional order flow. We prioritize pure market analysis—no AI, no bots, just discipline and results.",
  },
  {
    question: "Do I need prior trading experience?",
    answer:
      "No prior experience is required. Our courses and mentorship guide you from beginner to advanced trading strategies.",
  },
  {
    question: "How do I access live signals?",
    answer:
      "Once enrolled, you gain access to our live signal channels via Telegram and our web dashboard.",
  },
  {
    question: "Can I get one-on-one mentorship?",
    answer:
      "Yes! We provide personal mentorship sessions for our premium members to guide their trading journey.",
  },
];

const FAQ: React.FC = () => {
  const { theme } = useTheme();
  const [openIndex, setOpenIndex] = useState<number>(0); // Auto-open first FAQ

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  const swipeHandlers = useSwipeable({
    onSwipedUp: () => setOpenIndex((prev) => (prev + 1) % faqs.length),
    onSwipedDown: () =>
      setOpenIndex((prev) => (prev - 1 + faqs.length) % faqs.length),
    trackMouse: true,
  });

  return (
    <>
    <section
      className={`py-20 px-6 md:px-12 ${
        theme === "light" ? "bg-mg-light-bg" : "bg-mg-dark-bg"
      }`}
    >
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
        {/* Illustration */}
        <div className="lg:w-1/2 w-full">
          <img
            src={faqIllustration}
            alt="FAQ Illustration"
            className="w-full h-auto rounded-xl shadow-2xl"
          />
        </div>

        {/* FAQs */}
        <div className="lg:w-1/2 w-full flex flex-col gap-4" {...swipeHandlers}>
          <h2
            className={`text-4xl md:text-5xl font-extrabold mb-6 text-center lg:text-left ${
              theme === "light" ? "text-mg-light-text" : "text-mg-white"
            }`}
          >
            Frequently Asked <span className="text-mg-gold">Questions</span>
          </h2>
          <p
            className={`text-lg md:text-xl mb-8 text-center lg:text-left ${
              theme === "light"
                ? "text-mg-light-textSecondary"
                : "text-mg-dark-textSecondary"
            }`}
          >
            Everything you need to know about trading with Marketgod Academy.
          </p>

          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className={`border rounded-xl overflow-hidden transition-shadow ${
                theme === "light"
                  ? "border-mg-black/10 bg-white/80 shadow-lg"
                  : "border-mg-white/10 bg-mg-dark-bg/80 shadow-2xl"
              }`}
              whileHover={{ scale: 1.02 }}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center px-6 py-4 text-left focus:outline-none"
              >
                <span
                  className={`font-black text-lg ${
                    theme === "light"
                      ? "text-mg-light-text"
                      : "text-mg-white"
                  }`}
                >
                  {faq.question}
                </span>
                {openIndex === index ? (
                  <ChevronUp
                    className={`w-6 h-6 transition-transform ${
                      theme === "light"
                        ? "text-mg-light-text"
                        : "text-mg-white"
                    }`}
                  />
                ) : (
                  <ChevronDown
                    className={`w-6 h-6 transition-transform ${
                      theme === "light"
                        ? "text-mg-light-text"
                        : "text-mg-white"
                    }`}
                  />
                )}
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`px-6 pb-4 text-base leading-relaxed ${
                      theme === "light"
                        ? "text-mg-light-textSecondary"
                        : "text-mg-dark-textSecondary"
                    }`}
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 flex justify-center lg:justify-start"
          >
            <motion.a
             target='_blank'
              href="https://t.me/marketgodcommunity"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 px-8 py-4 dark:bg-mg-white bg-mg-black text-mg-white dark:text-mg-black rounded-full font-bold tracking-wide shadow-xl hover:shadow-gold-glow transition-shadow duration-300"
            >
              Join Marketgod Community
              <TrendingUp size={20} />
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
    <div id="faq-cta"><FAQCTA /></div>
    </>
  );
};

export default FAQ;



