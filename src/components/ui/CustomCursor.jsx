import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0
  });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('interactive')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  const variants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      scale: 1,
      opacity: 0.5,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 28,
        mass: 0.5
      }
    },
    hover: {
      x: mousePosition.x - 32,
      y: mousePosition.y - 32,
      scale: 1.5,
      opacity: 0.2,
      backgroundColor: "hsl(var(--primary))",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25,
        mass: 0.5
      }
    }
  };

  const dotVariants = {
    default: {
      x: mousePosition.x - 4,
      y: mousePosition.y - 4,
      opacity: 1,
    },
    hover: {
      x: mousePosition.x - 4,
      y: mousePosition.y - 4,
      opacity: 0,
    }
  };

  // Hide on touch devices
  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border-2 border-primary pointer-events-none z-[9999] mix-blend-difference"
        variants={variants}
        animate={isHovering ? "hover" : "default"}
      />
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-primary pointer-events-none z-[9999]"
        variants={dotVariants}
        animate={isHovering ? "hover" : "default"}
        transition={{ type: "tween", ease: "backOut", duration: 0.1 }}
      />
    </>
  );
};
