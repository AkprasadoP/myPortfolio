import { useEffect, useState } from "react";

/**
 * Tracks a taut "web strand" between the active section and the next one
 * while scrolling inside #main-scroll-area. Disabled when reduced motion.
 */
export function useWebStrand({
  rootId = "main-scroll-area",
  sectionIds = [],
} = {}) {
  const [strand, setStrand] = useState(null);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionQuery.matches) {
      setStrand(null);
      return undefined;
    }

    const root = document.getElementById(rootId);
    if (!root || sectionIds.length < 2) return undefined;

    let raf = 0;

    const measure = () => {
      const rootRect = root.getBoundingClientRect();
      const mid = rootRect.top + rootRect.height * 0.35;

      let currentIdx = 0;
      sectionIds.forEach((id, index) => {
        const el = document.getElementById(id);
        if (!el) return;
        const rect = el.getBoundingClientRect();
        if (rect.top <= mid) currentIdx = index;
      });

      const nextIdx = Math.min(currentIdx + 1, sectionIds.length - 1);
      if (nextIdx === currentIdx) {
        setStrand(null);
        return;
      }

      const currentEl = document.getElementById(sectionIds[currentIdx]);
      const nextEl = document.getElementById(sectionIds[nextIdx]);
      if (!currentEl || !nextEl) {
        setStrand(null);
        return;
      }

      const currentRect = currentEl.getBoundingClientRect();
      const nextRect = nextEl.getBoundingClientRect();

      const startY = Math.min(
        rootRect.bottom - 8,
        Math.max(rootRect.top + 8, currentRect.bottom)
      );
      const endY = Math.min(
        rootRect.bottom - 8,
        Math.max(rootRect.top + 8, nextRect.top)
      );

      const gap = endY - startY;
      if (gap < 12) {
        // Snap / fade when sections are tight or we've crossed
        const progress = Math.min(
          1,
          Math.max(0, (mid - nextRect.top) / Math.max(1, nextRect.height * 0.25))
        );
        setStrand({
          top: startY - rootRect.top + root.scrollTop,
          height: Math.max(0, gap),
          opacity: Math.max(0, 0.55 * (1 - progress)),
          left: 18,
        });
        return;
      }

      const visibleGap = Math.min(gap, rootRect.height * 0.45);
      setStrand({
        top: startY - rootRect.top + root.scrollTop,
        height: visibleGap,
        opacity: 0.55,
        left: 18,
      });
    };

    const onScroll = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(measure);
    };

    const onMotionChange = () => {
      if (motionQuery.matches) setStrand(null);
      else measure();
    };

    measure();
    root.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    motionQuery.addEventListener?.("change", onMotionChange);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      root.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      motionQuery.removeEventListener?.("change", onMotionChange);
    };
  }, [rootId, sectionIds]);

  return strand;
}
