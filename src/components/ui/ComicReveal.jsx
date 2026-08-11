import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const FALLBACK_BURSTS = ["POW!", "BAM!", "WHAM!", "ZAP!"];

/**
 * Wraps a panel with a comic-book entrance: the card pops in with a springy
 * scale/rotate overshoot, and a burst word ("POW!", "WHAM!") slams at the
 * corner once when it scrolls into view.
 */
export const ComicReveal = ({
  children,
  className = "",
  burst,
  delay = 0,
  ...rest
}) => {
  const [hit, setHit] = useState(false);
  const word = burst ?? FALLBACK_BURSTS[0];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.74, rotate: -2, y: 28 }}
      whileInView={{ opacity: 1, scale: 1, rotate: 0, y: 0 }}
      exit={{ opacity: 0, scale: 0.94 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ type: "spring", stiffness: 240, damping: 21, delay }}
      onViewportEnter={() => setHit(true)}
      className={cn("relative", className)}
      {...rest}
    >
      {children}
      {hit && (
        <motion.span
          aria-hidden="true"
          initial={{ opacity: 1, scale: 3, rotate: -14 }}
          animate={{ opacity: 0, scale: 0.9, rotate: 6 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.18 }}
          className="comic-burst-word"
        >
          {word}
        </motion.span>
      )}
    </motion.div>
  );
};