// Eugene Afriyie UEB3502023
import { useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { Calculator, DollarSign, Percent, ShieldCheck, Copy, Check, Info, CalendarDays, LineChart, Activity } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
// Custom Tooltip for Mobile (Tap) & Desktop (Hover)
const TooltipInfo = ({ text, align = "center" }: {
    text: string;
    align?: "left" | "center" | "right";
}) => (<div className="group relative flex items-center justify-center outline-none" tabIndex={0}>
    <Info size={14} className="text-white/40 cursor-help transition-colors group-hover:text-mg-gold group-focus:text-mg-gold"/>
    <div className={`pointer-events-none absolute bottom-full z-50 mb-2 w-max max-w-[160px] sm:max-w-[200px] opacity-0 transition-opacity group-hover:opacity-100 group-focus:opacity-100 ${align === 'left' ? 'left-0 lg:left-1/2 lg:-translate-x-1/2' :
        align === 'right' ? 'right-0 lg:right-auto lg:left-1/2 lg:-translate-x-1/2' :
            'left-1/2 -translate-x-1/2'}`}>
      <div className="rounded-lg bg-black border border-white/20 px-3 py-2 text-[10px] sm:text-xs font-medium text-white shadow-2xl text-center whitespace-normal leading-tight">
        {text}
      </div>
      {/* Little triangle pointer */}
      <div className={`h-0 w-0 border-x-[5px] border-t-[5px] border-x-transparent border-t-white/20 ${align === 'left' ? 'ml-1.5 lg:mx-auto' :
        align === 'right' ? 'mr-1.5 ml-auto lg:mx-auto' :
            'mx-auto'}`}/>
    </div>
  </div>);
// Highly Reliable Iframe Component for MQL5 (Tradays)
const EconomicCalendarWidget = ({ isDark }: {
    isDark: boolean;
}) => {
    const lang = "en";
    const mode = isDark ? "2" : "1";
    return (<div className="flex flex-col h-full w-full">
      <iframe src={`https://www.tradays.com/${lang}/economic-calendar/widget?mode=${mode}&utm_source=marketgod`} className="w-full flex-1 border-none rounded-xl" title="Economic Calendar"/>
      <div className="text-center pt-3 text-[10px] opacity-50">
        <a href="https://www.mql5.com/" target="_blank" rel="noreferrer" className="hover:text-mg-gold transition-colors">
          Powered by MQL5 Algo Trading Community
        </a>
      </div>
    </div>);
};
// Highly Reliable Iframe Component for TradingView Advanced Chart
const AdvancedChartWidget = ({ isDark }: {
    isDark: boolean;
}) => {
    const theme = isDark ? "dark" : "light";
    const lang = "en";
    const src = `https://s.tradingview.com/widgetembed/?symbol=FX%3AEURUSD&interval=D&symboledit=1&saveimage=1&toolbarbg=f1f3f6&theme=${theme}&style=1&timezone=Etc%2FUTC&locale=${lang}&hide_side_toolbar=0&allow_symbol_change=1`;
    return (<div className="flex flex-col h-full w-full">
      <iframe src={src} className="w-full flex-1 border-none rounded-xl" title="Advanced Chart"/>
    </div>);
};
// Highly Reliable Iframe Component for TradingView Market Heatmap
const MarketHeatmapWidget = ({ isDark }: {
    isDark: boolean;
}) => {
    const config = {
        width: "100%",
        height: "100%",
        currencies: ["EUR", "USD", "JPY", "GBP", "CHF", "AUD", "CAD", "NZD"],
        isTransparent: true,
        colorTheme: isDark ? "dark" : "light",
        locale: "en"
    };
    const encodedConfig = encodeURIComponent(JSON.stringify(config));
    const src = `https://s.tradingview.com/embed-widget/forex-cross-rates/?locale=${"en"}#${encodedConfig}`;
    return (<div className="flex flex-col h-full w-full">
      <iframe src={src} className="w-full flex-1 border-none rounded-xl" title="Market Heatmap"/>
    </div>);
};
// Extracted Risk Calculator Component
const RiskCalculator = ({ isDark, item }: {
    isDark: boolean;
    item: Variants;
}) => {
    // Calculator State
    const [accountBalance, setAccountBalance] = useState<number | "">(10000);
    const [riskMode, setRiskMode] = useState<"percent" | "amount">("percent");
    const [riskPercent, setRiskPercent] = useState<number | "">(1);
    const [riskAmountInput, setRiskAmountInput] = useState<number | "">(100);
    const [slMode, setSlMode] = useState<"pips" | "price">("pips");
    const [stopLoss, setStopLoss] = useState<number | "">(20);
    const [entryPrice, setEntryPrice] = useState<number | "">("");
    const [exitPrice, setExitPrice] = useState<number | "">("");
    const [pairType, setPairType] = useState("forex");
    const [tradeDirection, setTradeDirection] = useState<"buy" | "sell">("buy");
    const [copiedField, setCopiedField] = useState<string | null>(null);
    // Calculated Values
    const balance = Number(accountBalance) || 0;
    const risk = Number(riskPercent) || 0;
    const riskAmtVal = Number(riskAmountInput) || 0;
    const actualRiskAmount = riskMode === "percent" ? balance * (risk / 100) : riskAmtVal;
    const actualRiskPercent = balance > 0 ? (actualRiskAmount / balance) * 100 : 0;
    let calculatedPips = 0;
    let finalExitPrice: number | "" = exitPrice;
    let slError: string | null = null;
    if (slMode === "pips") {
        calculatedPips = Number(stopLoss) || 0;
        const entry = Number(entryPrice) || 0;
        if (entry > 0 && calculatedPips > 0) {
            let pipDivider = 1;
            if (pairType === "forex")
                pipDivider = entry > 20 ? 100 : 100000;
            else if (pairType === "gold")
                pipDivider = 100;
            else if (pairType === "silver")
                pipDivider = 1000;
            else if (pairType === "btc")
                pipDivider = 1000;
            else if (pairType === "eth")
                pipDivider = 100000;
            const priceDiff = calculatedPips / pipDivider;
            finalExitPrice = tradeDirection === "buy" ? entry - priceDiff : entry + priceDiff;
        }
    }
    else {
        const entry = Number(entryPrice) || 0;
        const exit = Number(exitPrice) || 0;
        if (entry > 0 && exit > 0) {
            if (tradeDirection === "buy" && exit >= entry) {
                slError = "SL must be lower than Entry for a Buy.";
            }
            else if (tradeDirection === "sell" && exit <= entry) {
                slError = "SL must be higher than Entry for a Sell.";
            }
            else {
                const diff = Math.abs(entry - exit);
                if (pairType === "forex") {
                    calculatedPips = diff * (entry > 20 ? 100 : 10000);
                }
                else if (pairType === "gold") {
                    calculatedPips = diff * 100;
                }
                else if (pairType === "silver") {
                    calculatedPips = diff * 1000;
                }
                else if (pairType === "btc") {
                    calculatedPips = diff * 1000;
                }
                else if (pairType === "eth") {
                    calculatedPips = diff * 100000;
                }
            }
        }
    }
    // Pip value logic based on specific MT5 contract scaling
    let pipValuePerLot = 10; // Forex
    if (pairType === "gold")
        pipValuePerLot = 1;
    if (pairType === "silver")
        pipValuePerLot = 5;
    if (pairType === "btc")
        pipValuePerLot = 0.001;
    if (pairType === "eth")
        pipValuePerLot = 0.1;
    let standardLots = calculatedPips > 0 && actualRiskAmount > 0 ? (actualRiskAmount / calculatedPips) / pipValuePerLot : 0;
    // The absolute minimum standard lot size allowed on MT4/MT5 is 0.01
    if (standardLots > 0 && standardLots < 0.01) {
        standardLots = 0.01;
    }
    const miniLots = standardLots * 10;
    const microLots = standardLots * 100;
    const handleCopy = (text: string, field: string) => {
        navigator.clipboard.writeText(text);
        setCopiedField(field);
        setTimeout(() => setCopiedField(null), 2000);
    };
    const riskColor = isDark ? "text-white/60" : "text-gray-500";
    return (<div className="space-y-4 sm:space-y-6">
            {/* HEADER */}
            <motion.div variants={item} className={`flex flex-col sm:flex-row items-center justify-between p-3 sm:p-4 gap-4 sm:gap-0 rounded-xl border backdrop-blur-xl ${isDark ? "bg-white/5 border-white/10" : "bg-white/50 border-black/10"}`}>
          <div className="flex items-center gap-3">
            <Calculator className="text-mg-gold"/>
            <h1 className="font-bold text-white text-lg">
              {"Risk Calculator"}
            </h1>
          </div>

          <div className="flex flex-col items-end gap-2 sm:flex-row sm:items-center sm:gap-4">
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-mg-gold/20 text-mg-gold text-xs font-bold border border-mg-gold/30">1</span>
              <span className="text-xs font-bold uppercase tracking-widest text-white/70">{"Select Asset"}</span>
            </div>
            
            <div className="flex flex-wrap justify-center sm:justify-end gap-1.5 rounded-xl bg-[#0f141b] p-1 border border-white/10 shadow-inner">
              {["forex", "gold", "silver", "btc", "eth"].map((type) => (<button key={type} onClick={() => setPairType(type)} className={`px-3 py-1 sm:px-4 sm:py-1.5 text-[10px] sm:text-xs font-bold rounded-lg transition-all ${pairType === type
                ? "bg-mg-gold text-black shadow-md"
                : "text-white/60 hover:text-white hover:bg-white/5"}`}>
                  {type.toUpperCase()}
                </button>))}
            </div>
          </div>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-4 lg:gap-6">

          {/* INPUT PANEL */}
              <motion.div variants={item} className={`p-4 sm:p-6 rounded-xl sm:rounded-2xl border backdrop-blur-xl space-y-4 sm:space-y-6 ${isDark ? "bg-white/[0.03] border-white/10" : "bg-white border-black/10"}`}>

            {/* Balance */}
            <div>
              <label className="flex items-center gap-2 text-sm text-white/70">Account Balance <TooltipInfo text={"Your total trading capital"} align="left"/></label>
              <div className="relative mt-2">
                <DollarSign className="absolute left-3 top-3 text-mg-gold" size={18}/>
                <input type="number" value={accountBalance} onChange={(e) => setAccountBalance(e.target.value === "" ? "" : Number(e.target.value))} className="w-full pl-10 pr-4 py-2.5 sm:py-3 rounded-lg bg-[#0f141b] border border-white/10 text-white font-bold text-sm sm:text-base focus:outline-none focus:border-mg-gold transition-colors"/>
              </div>
            </div>

            {/* Risk */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="flex items-center gap-2 text-sm text-white/70">Risk <TooltipInfo text={"The amount you are willing to lose"} align="left"/></label>
                <div className="flex bg-[#0f141b] rounded-lg p-1 border border-white/10">
                  <button onClick={() => setRiskMode("percent")} className={`px-2 py-1 text-[10px] uppercase font-bold rounded ${riskMode === 'percent' ? 'bg-mg-gold text-black' : 'text-white/50'}`}>Percent</button>
                  <button onClick={() => setRiskMode("amount")} className={`px-2 py-1 text-[10px] uppercase font-bold rounded ${riskMode === 'amount' ? 'bg-mg-gold text-black' : 'text-white/50'}`}>Amount</button>
                </div>
              </div>
              
              {riskMode === "percent" ? (<div>
                  <div className="relative">
                    <Percent className="absolute left-3 top-3 text-mg-gold" size={18}/>
                    <input type="number" value={riskPercent} onChange={(e) => setRiskPercent(e.target.value === "" ? "" : Number(e.target.value))} className="w-full pl-10 pr-4 py-2.5 sm:py-3 rounded-lg bg-[#0f141b] border border-white/10 text-white font-bold text-sm sm:text-base focus:outline-none focus:border-mg-gold transition-colors"/>
                  </div>
                  <div className="flex gap-2 mt-3">
                    {[0.5, 1, 2].map((r) => (<button key={r} onClick={() => setRiskPercent(r)} className="px-3 py-1 rounded bg-mg-gold/10 text-mg-gold text-sm hover:bg-mg-gold/20 transition">
                        {r}%
                      </button>))}
                  </div>
                </div>) : (<div className="relative">
                  <DollarSign className="absolute left-3 top-3 text-mg-gold" size={18}/>
                  <input type="number" value={riskAmountInput} onChange={(e) => setRiskAmountInput(e.target.value === "" ? "" : Number(e.target.value))} className="w-full pl-10 pr-4 py-2.5 sm:py-3 rounded-lg bg-[#0f141b] border border-white/10 text-white font-bold text-sm sm:text-base focus:outline-none focus:border-mg-gold transition-colors"/>
                </div>)}
            </div>

            {/* Trade Direction */}
            <div>
              <label className="flex items-center gap-2 text-sm text-white/70">{"Trade Direction"} <TooltipInfo text={"Buy (Long) or Sell (Short)"} align="left"/></label>
              <div className="flex bg-[#0f141b] rounded-lg p-1 border border-white/10 mt-2">
                <button onClick={() => setTradeDirection("buy")} className={`flex-1 py-2 sm:py-3 text-[10px] sm:text-xs uppercase font-bold rounded-md transition-colors ${tradeDirection === 'buy' ? 'bg-white text-black shadow-sm' : 'text-white/50 hover:text-white'}`}>Buy</button>
                <button onClick={() => setTradeDirection("sell")} className={`flex-1 py-2 sm:py-3 text-[10px] sm:text-xs uppercase font-bold rounded-md transition-colors ${tradeDirection === 'sell' ? 'bg-white text-black shadow-sm' : 'text-white/50 hover:text-white'}`}>Sell</button>
              </div>
            </div>

            {/* Entry Price */}
            <div>
              <label className="flex items-center gap-2 text-sm text-white/70">Entry Price {slMode === "price" && <span className="text-mg-gold">*</span>} <TooltipInfo text={"Your market entry price"} align="left"/></label>
              <div className="relative mt-2">
                <DollarSign className="absolute left-3 top-3 text-mg-gold" size={18}/>
                <input type="number" value={entryPrice} onChange={(e) => setEntryPrice(e.target.value === "" ? "" : Number(e.target.value))} placeholder="e.g. 2000.50" className="w-full pl-10 pr-4 py-2.5 sm:py-3 rounded-lg bg-[#0f141b] border border-white/10 text-white font-bold text-sm sm:text-base focus:outline-none focus:border-mg-gold transition-colors"/>
              </div>
            </div>

            {/* Stop Loss */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="flex items-center gap-2 text-sm text-white/70">Stop Loss <TooltipInfo text={"Your invalidation level (in Pips or Price)"} align="left"/></label>
                <div className="flex bg-[#0f141b] rounded-lg p-1 border border-white/10">
                  <button onClick={() => setSlMode("pips")} className={`px-2 py-1 text-[10px] uppercase font-bold rounded ${slMode === 'pips' ? 'bg-mg-gold text-black' : 'text-white/50'}`}>In Pips</button>
                  <button onClick={() => setSlMode("price")} className={`px-2 py-1 text-[10px] uppercase font-bold rounded ${slMode === 'price' ? 'bg-mg-gold text-black' : 'text-white/50'}`}>Exit Price</button>
                </div>
              </div>
              
              {slMode === "pips" ? (<div className="relative">
                  <ShieldCheck className="absolute left-3 top-3 text-mg-gold" size={18}/>
                  <input type="number" value={stopLoss} onChange={(e) => setStopLoss(e.target.value === "" ? "" : Number(e.target.value))} placeholder="e.g. 20" className="w-full pl-10 pr-4 py-2.5 sm:py-3 rounded-lg bg-[#0f141b] border border-white/10 text-white font-bold text-sm sm:text-base focus:outline-none focus:border-mg-gold transition-colors"/>
                </div>) : (<div>
                  <div className="relative">
                    <ShieldCheck className={`absolute left-3 top-3 ${slError ? "text-red-500" : "text-mg-gold"}`} size={18}/>
                    <input type="number" value={exitPrice} onChange={(e) => setExitPrice(e.target.value === "" ? "" : Number(e.target.value))} placeholder="e.g. 1998.50" className={`w-full pl-10 pr-4 py-2.5 sm:py-3 rounded-lg bg-[#0f141b] border ${slError ? "border-red-500/50 focus:border-red-500" : "border-white/10 focus:border-mg-gold"} text-white font-bold text-sm sm:text-base focus:outline-none transition-colors`}/>
                  </div>
                  {slError && <p className="text-red-500 text-xs mt-2 font-medium">{slError}</p>}
                </div>)}
            </div>

            {/* Contract Size Info */}
            <div className="flex flex-col gap-2 sm:gap-3 p-3 sm:p-4 rounded-xl bg-[#0f141b] border border-white/10">
              <div className="flex items-center justify-between">
                <span className="text-sm text-white/70 flex items-center gap-2">
                  {"Contract Size"} 
                  <TooltipInfo text={"Standard contract size on MT4/MT5"} align="left"/>
                </span>
                <span className="font-bold text-mg-gold">
                  {pairType === "forex" ? "100,000" : pairType === "gold" ? "100" : pairType === "silver" ? "500" : "1"}
                </span>
              </div>
              <p className="text-[10px] leading-relaxed text-white/40 italic">
                {"* Disclaimer: Contract sizes may vary by broker. Please verify the exact specifications on your trading platform (MT4/MT5) before executing live trades."}
              </p>
            </div>

          </motion.div>

          {/* OUTPUT PANEL */}
          <motion.div variants={item} className="flex flex-col gap-4 sm:gap-6">

            {/* Risk Amount */}
            <div className="relative p-4 sm:p-6 rounded-xl sm:rounded-2xl border bg-gradient-to-br from-mg-gold/10 to-transparent border-mg-gold/20 backdrop-blur-xl">
              
              <p className="text-xs text-white/50 uppercase">
                Amount at Risk {riskMode === "amount" && balance > 0 && <span className="font-bold text-white/70 tracking-wider">({actualRiskPercent.toFixed(2)}%)</span>}
              </p>

              <motion.h1 key={actualRiskAmount} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-4xl sm:text-5xl font-black text-mg-gold drop-shadow-[0_0_10px_rgba(255,215,0,0.4)]">
                ${actualRiskAmount.toFixed(2)}
              </motion.h1>

              <p className={`text-sm mt-2 ${riskColor}`}>
                {actualRiskPercent <= 2 ? "Safe Risk" : actualRiskPercent <= 5 ? "Moderate Risk" : "High Risk"}
                {slMode === "price" && calculatedPips > 0 && <span className="ml-2 font-bold text-white/70">• {calculatedPips.toFixed(1)} Pips SL</span>}
              </p>

              {/* live dot */}
              <span className="absolute top-4 right-4 flex h-3 w-3">
                <span className="animate-ping absolute h-full w-full rounded-full bg-mg-gold opacity-75"></span>
                <span className="relative h-3 w-3 rounded-full bg-mg-gold"></span>
              </span>
            </div>

            {/* LOT SIZES */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4">
              {[
            { label: "Standard", value: standardLots, info: "Volume: 1.00 (100,000 units)", align: "left" as const },
            { label: "Mini", value: miniLots, info: "Volume: 0.10 (10,000 units)", align: "center" as const },
            { label: "Micro", value: microLots, info: "Volume: 0.01 (1,000 units)", align: "right" as const }
        ].map((lot) => (<div key={lot.label} className="relative p-3 sm:p-4 rounded-lg sm:rounded-xl bg-white/5 border border-white/10 text-center hover:scale-105 transition">
                  <div className="absolute top-2 right-2">
                    <TooltipInfo text={lot.info} align={lot.align}/>
                  </div>
                  <p className="text-[10px] sm:text-xs text-white/50">{lot.label}</p>
                  <p className="text-lg sm:text-2xl font-black text-mg-gold mt-1 sm:mt-0">
                    {lot.value.toFixed(2)}
                  </p>
                </div>))}
            </div>

            {/* EXECUTION DETAILS SUMMARY FOR COPYING */}
            <div className={`p-4 sm:p-6 rounded-xl sm:rounded-2xl border backdrop-blur-xl ${isDark ? "bg-white/[0.03] border-white/10" : "bg-white border-black/10"}`}>
              <h3 className="text-sm font-bold text-white/70 uppercase tracking-wider mb-4">
                {"Execution Details"}
              </h3>
              <div className="space-y-2 sm:space-y-3">
                {/* Direction */}
                <div className="flex items-center justify-between p-2.5 sm:p-3 rounded-lg sm:rounded-xl bg-[#0f141b] border border-white/5">
                  <span className="text-sm text-white/60">{"Direction"}</span>
                  <span className="font-bold text-white uppercase">{tradeDirection}</span>
                </div>

                {/* Entry Price */}
                {entryPrice !== "" && (<div className="flex items-center justify-between p-2.5 sm:p-3 rounded-lg sm:rounded-xl bg-[#0f141b] border border-white/5">
                    <span className="text-sm text-white/60">{"Entry Price"}</span>
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-white">{entryPrice}</span>
                      <button onClick={() => handleCopy(String(entryPrice), "entry")} className="text-mg-gold hover:text-white transition" aria-label="Copy Entry Price">
                        {copiedField === "entry" ? <Check size={14} className="sm:w-4 sm:h-4"/> : <Copy size={14} className="sm:w-4 sm:h-4"/>}
                      </button>
                    </div>
                  </div>)}

                {/* Exit Price */}
                {finalExitPrice !== "" && (<div className="flex items-center justify-between p-2.5 sm:p-3 rounded-lg sm:rounded-xl bg-[#0f141b] border border-white/5">
                    <span className="text-sm text-white/60">{"Exit Price (SL)"}</span>
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-white">
                        {typeof finalExitPrice === 'number' ? String(Number(finalExitPrice.toFixed(5))) : finalExitPrice}
                      </span>
                      <button onClick={() => handleCopy(String(typeof finalExitPrice === 'number' ? Number(finalExitPrice.toFixed(5)) : finalExitPrice), "exit")} className="text-mg-gold hover:text-white transition" aria-label="Copy Exit Price">
                        {copiedField === "exit" ? <Check size={14} className="sm:w-4 sm:h-4"/> : <Copy size={14} className="sm:w-4 sm:h-4"/>}
                      </button>
                    </div>
                  </div>)}

                {/* Stop Loss (Pips) */}
                {calculatedPips > 0 && (<div className="flex items-center justify-between p-2.5 sm:p-3 rounded-lg sm:rounded-xl bg-[#0f141b] border border-white/5">
                    <span className="text-sm text-white/60">{"Stop Loss (Pips)"}</span>
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-white">{calculatedPips.toFixed(1)}</span>
                      <button onClick={() => handleCopy(calculatedPips.toFixed(1), "pips")} className="text-mg-gold hover:text-white transition" aria-label="Copy Pips">
                        {copiedField === "pips" ? <Check size={14} className="sm:w-4 sm:h-4"/> : <Copy size={14} className="sm:w-4 sm:h-4"/>}
                      </button>
                    </div>
                  </div>)}

                {/* Standard Lot Size */}
                {standardLots > 0 && (<div className="flex items-center justify-between p-2.5 sm:p-3 rounded-lg sm:rounded-xl bg-[#0f141b] border border-white/5">
                    <span className="text-sm text-white/60">{"Lot Size (Standard)"}</span>
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-mg-gold">{standardLots.toFixed(2)}</span>
                      <button onClick={() => handleCopy(standardLots.toFixed(2), "lot")} className="text-mg-gold hover:text-white transition" aria-label="Copy Lot Size">
                        {copiedField === "lot" ? <Check size={14} className="sm:w-4 sm:h-4"/> : <Copy size={14} className="sm:w-4 sm:h-4"/>}
                      </button>
                    </div>
                  </div>)}
              </div>
            </div>

          </motion.div>
        </div>
          </div>);
};
export default function ToolsPage() {
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const [activeTab, setActiveTab] = useState<"calculator" | "calendar" | "chart" | "heatmap">("calculator");
    const container: Variants = {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };
    const item: Variants = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };
    return (<div className={`relative min-h-screen overflow-x-hidden p-3 sm:p-6 ${isDark ? "bg-[#0b0f14]" : "bg-[#f7f9fc]"}`}>
      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"/>

      <motion.div initial="hidden" animate="show" variants={container} className="relative z-10 space-y-4 sm:space-y-6">
        {/* TOOL TABS */}
        <motion.div variants={item} className="flex justify-center mb-2">
          <div className={`flex flex-wrap justify-center rounded-xl p-1 border shadow-inner ${isDark ? "bg-[#0f141b] border-white/10" : "bg-white border-black/10"}`}>
            <button onClick={() => setActiveTab('calculator')} className={`flex items-center gap-1.5 sm:gap-2 px-3 py-2 sm:px-6 sm:py-3 rounded-lg font-bold text-xs sm:text-sm transition-all ${activeTab === 'calculator' ? 'bg-mg-gold text-black shadow-md' : isDark ? 'text-white/60 hover:text-white hover:bg-white/5' : 'text-gray-500 hover:text-black hover:bg-black/5'}`}>
              <Calculator className="w-4 h-4 sm:w-[18px] sm:h-[18px]"/>
              {"Risk Calculator"}
            </button>
            <button onClick={() => setActiveTab('calendar')} className={`flex items-center gap-1.5 sm:gap-2 px-3 py-2 sm:px-6 sm:py-3 rounded-lg font-bold text-xs sm:text-sm transition-all ${activeTab === 'calendar' ? 'bg-mg-gold text-black shadow-md' : isDark ? 'text-white/60 hover:text-white hover:bg-white/5' : 'text-gray-500 hover:text-black hover:bg-black/5'}`}>
              <CalendarDays className="w-4 h-4 sm:w-[18px] sm:h-[18px]"/>
              {"Economic Calendar"}
            </button>
            <button onClick={() => setActiveTab('chart')} className={`flex items-center gap-1.5 sm:gap-2 px-3 py-2 sm:px-6 sm:py-3 rounded-lg font-bold text-xs sm:text-sm transition-all ${activeTab === 'chart' ? 'bg-mg-gold text-black shadow-md' : isDark ? 'text-white/60 hover:text-white hover:bg-white/5' : 'text-gray-500 hover:text-black hover:bg-black/5'}`}>
              <LineChart className="w-4 h-4 sm:w-[18px] sm:h-[18px]"/>
              {"Advanced Chart"}
            </button>
            <button onClick={() => setActiveTab('heatmap')} className={`flex items-center gap-1.5 sm:gap-2 px-3 py-2 sm:px-6 sm:py-3 rounded-lg font-bold text-xs sm:text-sm transition-all ${activeTab === 'heatmap' ? 'bg-mg-gold text-black shadow-md' : isDark ? 'text-white/60 hover:text-white hover:bg-white/5' : 'text-gray-500 hover:text-black hover:bg-black/5'}`}>
              <Activity className="w-4 h-4 sm:w-[18px] sm:h-[18px]"/>
              {"Market Heatmap"}
            </button>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {/* ACTIVE TOOL VIEW */}
          {activeTab === 'calculator' && (<motion.div key="calculator" initial="hidden" animate="show" exit={{ opacity: 0, y: -20, transition: { duration: 0.2 } }} variants={container} className="w-full">
              <RiskCalculator isDark={isDark} item={item}/>
            </motion.div>)}

          {/* ECONOMIC CALENDAR TOOL */}
          {activeTab === 'calendar' && (<motion.div key="calendar" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20, transition: { duration: 0.2 } }} className={`h-[calc(100vh-140px)] min-h-[500px] sm:min-h-[600px] w-full rounded-xl sm:rounded-2xl overflow-hidden border p-2 sm:p-4 backdrop-blur-xl ${isDark ? "bg-white/[0.03] border-white/10" : "bg-white border-black/10"}`}>
              <EconomicCalendarWidget isDark={isDark}/>
            </motion.div>)}

          {/* ADVANCED CHART TOOL */}
          {activeTab === 'chart' && (<motion.div key="chart" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20, transition: { duration: 0.2 } }} className={`h-[calc(100vh-140px)] min-h-[500px] sm:min-h-[600px] w-full rounded-xl sm:rounded-2xl overflow-hidden border p-2 sm:p-4 backdrop-blur-xl ${isDark ? "bg-white/[0.03] border-white/10" : "bg-white border-black/10"}`}>
              <AdvancedChartWidget isDark={isDark}/>
            </motion.div>)}

          {/* MARKET HEATMAP TOOL */}
          {activeTab === 'heatmap' && (<motion.div key="heatmap" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20, transition: { duration: 0.2 } }} className={`h-[calc(100vh-140px)] min-h-[500px] sm:min-h-[600px] w-full rounded-xl sm:rounded-2xl overflow-hidden border p-2 sm:p-4 backdrop-blur-xl ${isDark ? "bg-white/[0.03] border-white/10" : "bg-white border-black/10"}`}>
              <MarketHeatmapWidget isDark={isDark}/>
            </motion.div>)}
        </AnimatePresence>
      </motion.div>
    </div>);
}

