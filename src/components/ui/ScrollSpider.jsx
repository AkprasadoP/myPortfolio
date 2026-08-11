import { useEffect, useRef, useState } from "react";
import { navItems } from "@/data/site";
import { SpideyMaskMini } from "@/components/ui/SpideyEmblem";

/**
 * Spidey mask that crawls down the left edge with scroll progress.
 * Section lanterns light as he passes. Hidden on touch / reduced-motion.
 */
export const ScrollSpider = () => {
  const [enabled, setEnabled] = useState(true);
  const [progress, setProgress] = useState(0);
  const [markers, setMarkers] = useState([]);
  const rafRef = useRef(0);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const setFromQuery = () => {
      const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
      setEnabled(!reduced.matches && fine.matches);
    };
    setFromQuery();
    reduced.addEventListener?.("change", setFromQuery);
    return () => reduced.removeEventListener?.("change", setFromQuery);
  }, []);

  useEffect(() => {
    if (!enabled) return undefined;

    const root = document.getElementById("main-scroll-area");
    if (!root) return undefined;

    const measure = () => {
      const rootRect = root.getBoundingClientRect();
      const max = root.scrollHeight - root.clientHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, root.scrollTop / max)) : 0;
      setProgress((prev) => (Math.abs(prev - p) > 0.01 ? p : prev));

      setMarkers(
        navItems
          .map((item) => {
            const el = document.getElementById(item.id);
            if (!el) return null;
            const rect = el.getBoundingClientRect();
            const contentY = rect.top - rootRect.top + root.scrollTop;
            const yPct = max > 0 ? Math.min(100, (contentY / max) * 100) : 0;
            return { id: item.id, yPct };
          })
          .filter(Boolean)
      );
      rafRef.current = 0;
    };

    const onScroll = () => {
      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(measure);
      }
    };

    measure();
    root.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      root.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [enabled]);

  if (!enabled) return null;

  const top = `calc(${progress * 100}% + ${8 - progress * 8}px)`;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed bottom-0 left-1 top-0 z-[30] hidden md:block"
    >
      {markers.map((m) => {
        const lit = progress >= m.yPct / 100;
        return (
          <span
            key={m.id}
            className={`ledge-lantern ${lit ? "ledge-lantern--lit" : ""}`}
            style={{ top: `${m.yPct}%` }}
            title={m.id}
          />
        );
      })}

      <div className="scroll-spider-wrap" style={{ top }}>
        <div
          className={`drop-shadow-[0_2px_8px_rgba(230,36,41,0.5)] ${
            progress > 0.98 ? "scale-x-[-1]" : ""
          }`}
        >
          <SpideyMaskMini size={26} />
        </div>
      </div>
    </div>
  );
};
