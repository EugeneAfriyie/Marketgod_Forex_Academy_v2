// Eugene Afriyie UEB3502023

import { useState } from "react";
import { motion, type Variants } from "framer-motion";
import { Calculator, DollarSign, Percent, ShieldCheck } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { useLanguage } from "../../context/LanguageContext";

export default function ToolsPage() {
  const { theme } = useTheme();
  const { language } = useLanguage();

  const isDark = theme === "dark";
  const isFrench = language === "fr";

  // State
  const [accountBalance, setAccountBalance] = useState<number | "">(10000);
  const [riskPercent, setRiskPercent] = useState<number | "">(1);
  const [stopLoss, setStopLoss] = useState<number | "">(20);
  const [pairType, setPairType] = useState("forex");

  // Values
  const balance = Number(accountBalance) || 0;
  const risk = Number(riskPercent) || 0;
  const sl = Number(stopLoss) || 0;

  const riskAmount = balance * (risk / 100);

  // Pip value logic
  let pipValuePerLot = 10;
  if (pairType === "gold") pipValuePerLot = 1;
  if (pairType === "crypto") pipValuePerLot = 0.1;

  const standardLots =
    sl > 0 && risk > 0 ? (riskAmount / sl) / pipValuePerLot : 0;

  const miniLots = standardLots * 10;
  const microLots = standardLots * 100;

  const container: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  const riskColor = isDark ? "text-white/60" : "text-gray-500";

  return (
    <div className={`relative min-h-screen p-6 ${isDark ? "bg-[#0b0f14]" : "bg-[#f7f9fc]"}`}>
      
      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      <motion.div initial="hidden" animate="show" variants={container} className="relative z-10 space-y-6">

        {/* HEADER */}
        <motion.div variants={item} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <Calculator className="text-mg-gold" />
            <h1 className="font-bold text-white text-lg">
              {isFrench ? "Calculateur" : "Risk Calculator"}
            </h1>
          </div>

          <div className="flex gap-2">
            {["forex", "gold", "crypto"].map((type) => (
              <button
                key={type}
                onClick={() => setPairType(type)}
                className={`px-3 py-1 text-xs rounded-lg transition ${
                  pairType === type
                    ? "bg-mg-gold/20 text-mg-gold"
                    : "bg-white/5 text-white/60"
                }`}
              >
                {type.toUpperCase()}
              </button>
            ))}
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6">

          {/* INPUT PANEL */}
          <motion.div variants={item} className="p-6 rounded-2xl border bg-white/[0.03] border-white/10 backdrop-blur-xl space-y-6">

            {/* Balance */}
            <div>
              <label className="text-sm text-white/70">Account Balance</label>
              <div className="relative mt-2">
                <DollarSign className="absolute left-3 top-3 text-mg-gold" size={18} />
                <input
                  type="number"
                  value={accountBalance}
                  onChange={(e) => setAccountBalance(e.target.value === "" ? "" : Number(e.target.value))}
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-[#0f141b] border border-white/10 text-white font-bold"
                />
              </div>
            </div>

            {/* Risk */}
            <div>
              <label className="text-sm text-white/70">Risk %</label>
              <div className="relative mt-2">
                <Percent className="absolute left-3 top-3 text-mg-gold" size={18} />
                <input
                  type="number"
                  value={riskPercent}
                  onChange={(e) => setRiskPercent(e.target.value === "" ? "" : Number(e.target.value))}
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-[#0f141b] border border-white/10 text-white font-bold"
                />
              </div>

              {/* Quick buttons */}
              <div className="flex gap-2 mt-3">
                {[0.5, 1, 2].map((r) => (
                  <button
                    key={r}
                    onClick={() => setRiskPercent(r)}
                    className="px-3 py-1 rounded bg-mg-gold/10 text-mg-gold text-sm"
                  >
                    {r}%
                  </button>
                ))}
              </div>
            </div>

            {/* Stop Loss */}
            <div>
              <label className="text-sm text-white/70">Stop Loss (pips)</label>
              <div className="relative mt-2">
                <ShieldCheck className="absolute left-3 top-3 text-mg-gold" size={18} />
                <input
                  type="number"
                  value={stopLoss}
                  onChange={(e) => setStopLoss(e.target.value === "" ? "" : Number(e.target.value))}
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-[#0f141b] border border-white/10 text-white font-bold"
                />
              </div>
            </div>

          </motion.div>

          {/* OUTPUT PANEL */}
          <motion.div variants={item} className="flex flex-col gap-6">

            {/* Risk Amount */}
            <div className="relative p-6 rounded-2xl border bg-gradient-to-br from-mg-gold/10 to-transparent border-mg-gold/20 backdrop-blur-xl">
              
              <p className="text-xs text-white/50 uppercase">
                Amount at Risk
              </p>

              <motion.h1
                key={riskAmount}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-5xl font-black text-mg-gold drop-shadow-[0_0_10px_rgba(255,215,0,0.4)]"
              >
                ${riskAmount.toFixed(2)}
              </motion.h1>

              <p className={`text-sm mt-2 ${riskColor}`}>
                {risk <= 2 ? "Safe Risk" : "High Risk"}
              </p>

              {/* live dot */}
              <span className="absolute top-4 right-4 flex h-3 w-3">
                <span className="animate-ping absolute h-full w-full rounded-full bg-mg-gold opacity-75"></span>
                <span className="relative h-3 w-3 rounded-full bg-mg-gold"></span>
              </span>
            </div>

            {/* LOT SIZES */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: "Standard", value: standardLots },
                { label: "Mini", value: miniLots },
                { label: "Micro", value: microLots }
              ].map((lot) => (
                <div
                  key={lot.label}
                  className="p-4 rounded-xl bg-white/5 border border-white/10 text-center hover:scale-105 transition"
                >
                  <p className="text-xs text-white/50">{lot.label}</p>
                  <p className="text-2xl font-black text-mg-gold">
                    {lot.value.toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}