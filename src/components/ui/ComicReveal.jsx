import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Quiet panel entrance on scroll — fade + short rise.
 * No POW/BAM burst stickers.
 */
export const ComicReveal = ({ children, className = "", delay = 0, ...rest }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-48px" }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay }}
      className={cn("relative", className)}
      {...rest}
    >
      {children}
    </motion.div>
  );
};
