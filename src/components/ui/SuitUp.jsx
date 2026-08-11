import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const STEPS = [
  "donning mask…",
  "calibrating web-shooters…",
  "sensing…",
  "suit-up complete",
];

/**
 * One-time "suiting up" intro overlay shown on first mount. Auto-dismisses
 * after the step sequence, respects prefers-reduced-motion.
 */
export const SuitUp = () => {
  const [visible, setVisible] = useState(true);
  const [step, setStep] = useState(0);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) {
      setVisible(false);
      return undefined;
    }

    const timers = [];
    let current = 0;
    const advance = () => {
      if (current >= STEPS.length) {
        setVisible(false);
        return;
      }
      setStep(current);
      current += 1;
      timers.push(window.setTimeout(advance, current <= 3 ? 360 : 900));
    };
    timers.push(window.setTimeout(advance, 350));

    return () => timers.forEach((t) => window.clearTimeout(t));
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="suitup"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-bg"
        >
          <div className="flex flex-col items-center gap-6 px-6">
            {/* spider emblem — simple line spider */}
            <svg
              width="96"
              height="96"
              viewBox="0 0 96 96"
              fill="none"
              aria-hidden="true"
              className="drop-shadow-[0_0_14px_rgba(230,36,41,0.55)]"
            >
              <circle cx="48" cy="48" r="34" stroke="#e62429" strokeWidth="2" />
              <circle cx="48" cy="48" r="22" stroke="#e62429" strokeWidth="1.4" opacity="0.6" />
              <g stroke="#e62429" strokeWidth="2" strokeLinecap="round">
                <path d="M48 20v56M20 48h56" />
                <path d="M30 30l36 36M66 30L30 66" />
              </g>
              <g fill="#e62429">
                <circle cx="44" cy="44" r="2" />
                <circle cx="52" cy="44" r="2" />
                <circle cx="44" cy="52" r="2" />
                <circle cx="52" cy="52" r="2" />
              </g>
            </svg>

            <div className="font-mono text-xs tracking-[0.18em] text-spidey-red">
              SUITING UP
            </div>

            <div className="w-56">
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="h-4 text-center font-mono text-[10px] text-muted"
              >
                {STEPS[Math.min(step, STEPS.length - 1)]}
              </motion.div>
              <div className="mt-2 h-1 w-full overflow-hidden border border-line">
                <motion.div
                  key={`bar-${step}`}
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  className="h-full bg-spidey-red"
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};