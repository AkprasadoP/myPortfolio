import { useEffect, useRef, useState } from "react";
import { navItems } from "@/data/site";

/**
 * A spider that crawls down the left edge of the page, its position tied to
 * scroll progress inside #main-scroll-area. Each section leaves a lit
 * "lantern" ledge behind it as the spider passes — a progress rail of beacons.
 * Hidden on touch / reduced-motion.
 */
export const ScrollSpider = () => {
  const [enabled, setEnabled] = useState(true);
  const [progress, setProgress] = useState(0);
  const [markers, setMarkers] = useState([]);
  const rafRef = useRef(0);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const setFromQuery = () => {
      const fine = window.matchMedia(
        "(hover: hover) and (pointer: fine)"
      );
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
      className="pointer-events-none fixed bottom-0 left-1.5 top-0 z-[30] hidden md:block"
    >
      {/* section lantern ledges */}
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
        <div className={progress > 0.98 ? "scale-x-[-1]" : ""}>
          <svg
            width="22"
            height="20"
            viewBox="0 0 40 36"
            fill="none"
          >
            <ellipse
              cx="20"
              cy="18"
              rx="6"
              ry="9"
              fill="#0e0e10"
              stroke="#e62429"
              strokeWidth="1.6"
            />
            <circle cx="20" cy="10" r="3" fill="#e62429" />
            <g stroke="#0a0a0c" strokeWidth="2" strokeLinecap="round">
              <path className="spider-leg spider-leg--a" d="M15 12L6 6" />
              <path className="spider-leg spider-leg--b" d="M15 14L5 12" />
              <path className="spider-leg spider-leg--c" d="M15 17L6 19" />
              <path className="spider-leg spider-leg--d" d="M25 12L34 6" />
              <path className="spider-leg spider-leg--e" d="M25 14L35 12" />
              <path className="spider-leg spider-leg--f" d="M25 17L34 19" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
};