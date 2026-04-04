import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

// TEXT SEQUENCES
const SEQUENCE = [
  { main: "MarketGold", sub: "Academy" },
  { main: "MarketGold", sub: "trader smater,not harder" }
];

// PREMIUM TIMING PROFILE
const TYPE_SPEED = 500;           // Very slow: one-by-one, premium pace
const DELETE_SPEED = 500;        // Same slow speed for deletion (one-by-one)

const MAIN_PAUSE = 800;           // Short pause after MarketGold finishes typing
const SUB_PAUSE = 15000;          // Long pause after sub text (15 seconds; fits 10-20s request)
const AFTER_SUB_DELETE = 800;     // Pause after deleting sub text
const AFTER_MAIN_DELETE = 1200;   // Pause after deleting main text    // Pause after deleting main text

const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

const HeaderTypewriter: React.FC = () => {
  const [mainText, setMainText] = useState("");
  const [subText, setSubText] = useState("");
  const [cursorVisible, setCursorVisible] = useState(true);
  const hasStarted = useRef(false);

  // Blinking gold cursor
  useEffect(() => {
    const interval = setInterval(() => setCursorVisible((v) => !v), 500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (hasStarted.current) return;
    hasStarted.current = true;

    const type = async (full: string, set: (t: string) => void) => {
      for (let i = 0; i <= full.length; i++) {
        set(full.slice(0, i));
        await sleep(TYPE_SPEED);
      }
    };

    const erase = async (full: string, set: (t: string) => void) => {
      for (let i = full.length; i >= 0; i--) {
        set(full.slice(0, i));
        await sleep(DELETE_SPEED);
      }
    };

    const run = async () => {
      let cycle = 0;

      while (true) {
        const current = SEQUENCE[cycle % SEQUENCE.length];

        // TYPE MAIN TEXT
        await type(current.main, setMainText);
        await sleep(MAIN_PAUSE);

        // TYPE SUB TEXT
        await type(current.sub, setSubText);
        await sleep(SUB_PAUSE);

        // DELETE SUB
        await erase(current.sub, setSubText);
        await sleep(AFTER_SUB_DELETE);

        // DELETE MAIN
        await erase(current.main, setMainText);
        await sleep(AFTER_MAIN_DELETE);

        cycle++;
      }
    };

    run();
  }, []);

  return (
    <div className="flex flex-col leading-none select-none">

      {/* MAIN TEXT — Glow + Smooth Fade + Responsive Sizes */}
      <motion.h1
        className="font-black tracking-tight text-mg-gold 
                   drop-shadow-[0_0_8px_rgba(255,215,0,0.75)]
                   text-xl sm:text-2xl md:text-3xl lg:text-4xl"
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        transition={{ duration: 0.6 }}
      >
        {mainText}
        <span className="text-mg-gold font-light">
          {cursorVisible ? "|" : " "}
        </span>
      </motion.h1>

      {/* SUB TEXT — Fade + Elegant Tracking + Responsive */}
      <motion.p
        className="uppercase tracking-widest
                   text-mg-light-textSecondary dark:text-mg-dark-textSecondary
                   text-[9px] sm:text-[10px] md:text-xs lg:text-sm"
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        transition={{ duration: 0.6 }}
      >
        {subText}
      </motion.p>
    </div>
  );
};

export default HeaderTypewriter;



