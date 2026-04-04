"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight, Zap, Crown, Signal, X } from "lucide-react";
import MarketgodQuiz from "../Plans/MarketGodQuiz";

// -------------------------
// Service Cards
// -------------------------
type RecommendationKey = "mentorship" | "paidVIP" | "freeVIP" | "community";

interface RecommendationCard {
  title: string;
  subtitle?: string;
  price: string;
  priceUsd?: number;
  features: string[];
  href: string;
  ctaText: string;
}

const recommendations: Record<RecommendationKey, RecommendationCard> = {
  mentorship: {
    title: "Marketgod Mentorship",
    price: "$547",
    priceUsd: 547,
    features: [
      "Gold Strategy & All Currency Strategy",
      "Market Structure Mastery",
      "Risk Management & Psychology",
      "1 Year Access to Mentorship",
      "Free Access to VIP Signals",
    ],
    href: "/plans#pricing",
    ctaText: "Join Marketgod Mentorship",
  },
  paidVIP: {
    title: "VIP Signals (Most Purchased)",
    subtitle: "Accelerated Growth Edition",
    price: "$99/mo",
    features: [
      "87% Win Rate Signals",
      "Instant Telegram Alerts & Breakdowns",
      "Daily Market Analysis",
      "Priority Support",
    ],
    href: "https://t.me/paymarketgodbot",
    ctaText: "Get VIP Access",
  },
  freeVIP: {
    title: "Live Trading with Marketgod",
    subtitle: "Trade Like Marketgod",
    price: "Free",
    features: ["87% Win Rate Signals", "Instant Telegram Alerts", "Entry/Exit Breakdowns", "24/7 Support"],
    href: "/plans#signals", // Link to the section with the quiz modal
    ctaText: "Claim Free Access",
  },
  community: {
    title: "Free Learning Community",
    subtitle: "Start Learning Today",
    price: "Free",
    features: ["Access to tutorials & resources", "Join a supportive community", "Grow at your own pace"],
    href: "https://t.me/marketgodcommunity",
    ctaText: "Join Community",
  },
};

// -------------------------
// Steps (Questions)
// -------------------------
interface Step {
  key: string;
  question: string;
  options: string[];
  dependsOn?: string;
  condition?: (answers: Record<string, string>) => boolean;
}

const steps: Step[] = [
  {
    key: "monthsTrading",
    question: "How long have you been trading?",
    options: ["0–3 months", "4–9 months", "10–24 months", "2+ years"],
  },
  {
    key: "selfLevel",
    question: "How would you describe your trading level?",
    options: ["Beginner", "Intermediate", "Advanced"],
  },
  {
    key: "goal",
    question: "What brings you here?",
    options: [
      "I want full guidance (Mentorship)",
      "I want fast signals (VIP)",
      "I want to learn for free",
    ],
  },
  {
    key: "readyToInvest",
    question: "Are you ready to invest in your trading?",
    options: ["Yes", "No"],
    dependsOn: "goal",
    condition: (answers) => answers["goal"] !== "I want to learn for free",
  },
  {
    key: "investmentAmount",
    question: "How much are you ready to invest?",
    options: ["$0–$100", "$101–$500", "$501+"],
    dependsOn: "readyToInvest",
    condition: (answers) => answers["readyToInvest"] === "Yes",
  },
  {
    key: "timeCommitment",
    question: "How much time can you dedicate to trading weekly?",
    options: ["0–3 hours", "4–10 hours", "10+ hours"],
    dependsOn: "readyToInvest",
    condition: (answers) => answers["readyToInvest"] === "Yes",
  },
];

// -------------------------
// Quiz Hook
// -------------------------
function useMarketgodQuiz() {
  const [started, setStarted] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResult, setShowResult] = useState(false);

  const startQuiz = () => {
    setStarted(true);
    setStepIndex(0);
    setAnswers({});
    setShowResult(false);
  };

  const selectOption = (key: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));

    // go to next valid step
    let nextIndex = stepIndex + 1;
    while (nextIndex < steps.length) {
      const step = steps[nextIndex];
      if (!step.condition || step.condition({ ...answers, [key]: value })) break;
      nextIndex++;
    }

    if (nextIndex >= steps.length) setShowResult(true);
    else setStepIndex(nextIndex);
  };

  const goBack = () => {
    let prevIndex = stepIndex - 1;
    while (prevIndex >= 0) {
      const step = steps[prevIndex];
      if (!step.condition || step.condition(answers)) break;
      prevIndex--;
    }
    if (prevIndex < 0) setStarted(false);
    else setStepIndex(prevIndex);
  };

  const computeRecommendation = () => {
    const { goal, readyToInvest, investmentAmount, timeCommitment } = answers;

    let recommendationKey: RecommendationKey;
    let description = "";

    if (goal === "I want full guidance (Mentorship)" && readyToInvest === "Yes" && investmentAmount !== "$0–$100" && timeCommitment !== "0–3 hours") {
      recommendationKey = "mentorship";
      description = "You’re ready to take your trading to the next level with Marketgod Mentorship.";
    } else if (goal === "I want fast signals (VIP)" && readyToInvest === "Yes" && (investmentAmount === "$101–$500" || investmentAmount === "$501+")) {
      recommendationKey = "paidVIP";
      description = "VIP Signals (Most Purchased) is perfect for you — get fast, high-probability alerts.";
    } else if (goal === "I want fast signals (VIP)" && (readyToInvest === "No" || investmentAmount === "$0–$100")) {
      recommendationKey = "freeVIP";
      description = "Join Live Trading with Marketgod via our partnership link and start trading immediately.";
    } else {
      recommendationKey = "community";
      description = "Start learning with our Free Learning Community and grow your trading skills.";
    }

    return { recommendationCard: recommendations[recommendationKey], description };
  };

  const result = showResult ? computeRecommendation() : null;

  return { started, stepIndex, showResult, steps, answers, result, startQuiz, selectOption, goBack };
}

// -------------------------
// Panels
// -------------------------
interface IntroPanelProps {
  onStart: () => void;
}
const IntroPanel = ({ onStart }: IntroPanelProps) => {
  const features = [
    {
      icon: Crown,
      title: "Full Mentorship Access",
      desc: "Our quiz can determine if you're ready for direct mentorship, which includes our VIP signals for free.",
    },
    {
      icon: Signal,
      title: "High-Winrate Signals",
      desc: "Discover if our paid or free VIP signal groups are the right fit to accelerate your trading journey.",
    },
    {
      icon: Zap,
      title: "Personalized Roadmap",
      desc: "Get a clear, actionable recommendation in under 60 seconds. No more guessing what to do next.",
    },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="dark:bg-mg-dark-surface/50 bg-mg-light-surface/80 border border-mg-gold/30 rounded-3xl p-8 shadow-2xl"
    >
      <h3 className="text-3xl font-bold text-center dark:text-mg-white text-mg-black mb-4">Why Take This Quiz?</h3>
      <p className="text-center dark:text-mg-dark-textSecondary text-mg-light-textSecondary mb-10 max-w-2xl mx-auto">
        Your trading journey is unique. Instead of guessing, let our smart quiz analyze your goals, experience, and commitment to recommend the perfect Marketgod program for you.
      </p>

      <div className="grid md:grid-cols-3 gap-6 mb-10">
        {features.map((feat, i) => (
          <div key={i} className="text-center p-4 dark:bg-mg-dark-surface/80 bg-mg-light-bg rounded-xl border dark:border-mg-dark-border border-mg-light-border">
            <feat.icon className="w-8 h-8 mx-auto text-mg-gold mb-3" />
            <h4 className="font-bold dark:text-mg-dark-text text-mg-light-text mb-1">{feat.title}</h4>
            <p className="text-xs dark:text-mg-dark-textSecondary text-mg-light-textSecondary">{feat.desc}</p>
          </div>
        ))}
      </div>

      <motion.button onClick={onStart} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }} className="w-full py-4 dark:bg-mg-white bg-mg-black dark:text-mg-black  text-mg-white font-bold rounded-xl text-lg shadow-lg hover:shadow-gold-glow transition-shadow">
        Start the 60-Second Quiz <ArrowRight className="inline w-5 h-5 ml-2" />
      </motion.button>
    </motion.div>
  );
};
interface QuizPanelProps {
  stepIndex: number;
  steps: Step[];
  selectOption: (key: string, value: string) => void;
  goBack: () => void;
}

const QuizPanel = ({ stepIndex, steps, selectOption, goBack }: QuizPanelProps) => {
  const current = steps[stepIndex];
  return (
    <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="dark:bg-mg-dark-surface bg-mg-light-surface border border-mg-gold/50 rounded-2xl p-6 shadow-2xl">
      <h4 className="text-xl font-bold dark:text-mg-dark-text text-mg-light-text mb-5">{current.question}</h4>
      <div className="space-y-3">
        {current.options.map((opt: string) => (
          <motion.button key={opt} onClick={() => selectOption(current.key, opt)} className="w-full text-left p-4 rounded-xl dark:bg-mg-dark-bg bg-mg-light-bg border border-transparent hover:border-mg-gold dark:hover:bg-mg-gold/10 hover:bg-mg-gold/5 transition-all dark:text-mg-dark-text text-mg-light-text">
            {opt}
          </motion.button>
        ))}
      </div>
      <button onClick={goBack} className="mt-6 text-sm text-mg-gold underline hover:brightness-110">Back</button>
    </motion.div>
  );
};

interface ResultPanelProps {
  result: {
    recommendationCard: RecommendationCard;
    description: string;
  };
  onRetake: () => void;
  onClaimFreeVip: () => void;
}
const ResultPanel = ({ result, onRetake, onClaimFreeVip }: ResultPanelProps) => {
  const { recommendationCard, description } = result;
  return (
    <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="dark:bg-mg-dark-surface bg-mg-light-surface border border-mg-gold/80 rounded-3xl p-8 shadow-2xl">
      <h3 className="text-3xl font-bold dark:text-mg-white text-mg-black mb-3">Your Perfect Match</h3>
      <p className="dark:text-mg-dark-textSecondary text-mg-light-textSecondary mb-8 leading-relaxed">{description}</p>

      <div className="dark:bg-mg-dark-bg bg-mg-light-bg border border-mg-gold/50 rounded-2xl p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h4 className="text-2xl font-bold text-mg-gold">{recommendationCard.title}</h4>
            {recommendationCard.subtitle && <p className="text-sm dark:text-mg-dark-textSecondary text-mg-light-textSecondary">{recommendationCard.subtitle}</p>}
          </div>
          <div className="text-right">
            {recommendationCard.priceUsd && <p className="text-2xl font-bold dark:text-mg-dark-text text-mg-light-text">${recommendationCard.priceUsd}</p>}
            {!recommendationCard.priceUsd && <p className="text-2xl font-bold dark:text-mg-dark-text text-mg-light-text">{recommendationCard.price}</p>}
          </div>
        </div>

        <ul className="space-y-2 dark:text-mg-dark-textSecondary text-mg-light-textSecondary text-sm mb-6">
          {(recommendationCard.features ?? []).map((f: string, i: number) => (
            <li key={i} className="flex items-center gap-2">
              <div className="w-1 h-1 bg-mg-gold rounded-full" />
              {f}
            </li>
          ))}
        </ul>

        {recommendationCard.ctaText === "Claim Free Access" ? (
          <button
            onClick={onClaimFreeVip}
            className="block w-full text-center py-4 rounded-xl font-bold text-lg dark:bg-mg-white bg-mg-black dark:text-mg-black text-mg-white shadow-lg hover:shadow-yellow-400/40 transition-shadow"
          >
            {recommendationCard.ctaText}
          </button>
        ) : (
          recommendationCard.href && (
            <a href={recommendationCard.href} target="_blank" rel="noopener noreferrer" className="block w-full text-center py-4 rounded-xl font-bold text-lg dark:bg-mg-white bg-mg-black dark:text-mg-black text-mg-white shadow-lg hover:shadow-yellow-400/40 transition-shadow">
              {recommendationCard.ctaText}
            </a>
          )
        )}
      </div>

      <div className="md:flex grid grid-cols-2 flex-wrap justify-center items-center gap-4 mt-8">
        <button onClick={onRetake} className="px-5 py-2 border dark:border-mg-dark-border border-mg-light-border dark:text-mg-dark-textSecondary text-mg-light-textSecondary rounded-full dark:hover:bg-mg-dark-surface hover:bg-mg-light-surface transition">Retake Quiz</button>
        <a
          href="/contact"
          className="px-5 py-2 border dark:border-mg-dark-border border-mg-light-border dark:text-mg-dark-textSecondary text-mg-light-textSecondary rounded-full dark:hover:bg-mg-dark-surface hover:bg-mg-light-surface transition"
        >
          Contact Us
        </a>
      </div>
        <a href="/plans" className="px-5 py-2 dark:bg-mg-dark-surface bg-mg-light-surface dark:text-mg-dark-text text-mg-light-text rounded-full dark:hover:bg-mg-dark-surface/80 hover:bg-mg-light-surface/80 transition font-black">
          View All Plans
        </a>
    </motion.div>
  );
};

// -------------------------
// Main Component
// -------------------------
export default function MarketgodSmartQuiz() {
  const { started, stepIndex, showResult, steps, result, startQuiz, selectOption, goBack } = useMarketgodQuiz();
  const [showFreeVipModal, setShowFreeVipModal] = useState(false);

  const handleClaimFreeVip = () => {
    setShowFreeVipModal(true);
  };

  return (
    <section className="relative py-24 px-6 md:px-16 dark:bg-mg-dark-bg bg-mg-light-bg dark:text-mg-dark-text text-mg-light-text overflow-hidden">
      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-mg-gold/10 px-4 py-1 rounded-full border border-mg-gold/50 text-mg-gold mb-4">
            <Sparkles className="w-4 h-4" />
            AI-Powered Matching
          </div>
          <h2 className="text-5xl md:text-6xl font-bold dark:text-mg-white text-mg-black mb-4">
            Which <span className="text-mg-gold">Marketgod Program</span> Fits You?
          </h2>
          <p className="text-xl dark:text-mg-dark-textSecondary text-mg-light-textSecondary max-w-3xl mx-auto">
            Answer a few questions to get your personalized plan.
          </p>
        </div>

        <AnimatePresence mode="wait">
          {!started && <IntroPanel onStart={startQuiz} />}
          {started && !showResult && <QuizPanel stepIndex={stepIndex} steps={steps} selectOption={selectOption} goBack={goBack} />}
          {showResult && result && <ResultPanel result={result} onRetake={startQuiz} onClaimFreeVip={handleClaimFreeVip} />}
        </AnimatePresence>
      </div>

      {/* MODAL for Free VIP Quiz */}
      <AnimatePresence>
        {showFreeVipModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setShowFreeVipModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="relative w-full max-w-md max-h-[85vh] overflow-y-auto rounded-2xl p-5 shadow-2xl dark:bg-mg-dark-surface bg-mg-light-surface border dark:border-mg-gold/30 border-mg-gold/30"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.button
                onClick={() => setShowFreeVipModal(false)}
                className="absolute top-3 right-3 p-1.5 rounded-full bg-mg-dark-surface/50 hover:bg-red-600/50 text-mg-paper/70 hover:text-white transition"
                aria-label="Close modal"
              >
                <X size={16} />
              </motion.button>
              <MarketgodQuiz />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}



