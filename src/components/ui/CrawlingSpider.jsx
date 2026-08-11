import { useEffect, useRef, useState } from "react";
import { SpideyMaskMini } from "@/components/ui/SpideyEmblem";

const CYCLE_MS = 22_000;
const PAUSE_MS = 4_000;

/**
 * Mini Spidey mask that crawls in a dedicated lane *below* SystemChrome,
 * so it never overlaps title-bar text (PERSONAL SYSTEM / PATROL / ONLINE).
 * Lane top is measured from #system-chrome height — not hardcoded.
 */
export const CrawlingSpider = () => {
  const [enabled, setEnabled] = useState(true);
  const [laneTop, setLaneTop] = useState(48);
  const wrapRef = useRef(null);
  const rafRef = useRef(0);
  const startRef = useRef(0);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    setEnabled(!reduced.matches);
    const onChange = () => setEnabled(!reduced.matches);
    reduced.addEventListener?.("change", onChange);
    return () => reduced.removeEventListener?.("change", onChange);
  }, []);

  useEffect(() => {
    const measure = () => {
      const chrome = document.getElementById("system-chrome");
      if (!chrome) return;
      const rect = chrome.getBoundingClientRect();
      // Sit just under the sticky chrome — never inside the title bar.
      setLaneTop(Math.max(36, Math.round(rect.bottom + 2)));
    };

    measure();
    window.addEventListener("resize", measure);
    const ro =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(measure)
        : null;
    const chrome = document.getElementById("system-chrome");
    if (chrome && ro) ro.observe(chrome);

    return () => {
      window.removeEventListener("resize", measure);
      ro?.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!enabled) return undefined;
    const el = wrapRef.current;
    if (!el) return undefined;

    const spiderW = window.matchMedia("(min-width: 768px)").matches ? 34 : 24;
    startRef.current = performance.now();

    const tick = (now) => {
      const elapsed = (now - startRef.current) % (CYCLE_MS + PAUSE_MS);
      if (elapsed < CYCLE_MS) {
        const p = elapsed / CYCLE_MS;
        const x = -spiderW + p * (window.innerWidth + spiderW * 2);
        el.style.transform = `translate3d(${x}px, 0, 0)`;
        el.style.opacity = "1";
      } else {
        // brief pause off-screen before respawn
        el.style.transform = `translate3d(${-spiderW}px, 0, 0)`;
        el.style.opacity = "0";
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [enabled, laneTop]);

  if (!enabled) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 z-[35] h-7 w-full overflow-hidden"
      style={{ top: laneTop }}
    >
      <div
        ref={wrapRef}
        className="crawling-spider absolute top-0 will-change-transform drop-shadow-[0_2px_6px_rgba(230,36,41,0.45)]"
        style={{ transform: "translate3d(-40px, 0, 0)" }}
      >
        <span className="md:hidden">
          <SpideyMaskMini size={22} />
        </span>
        <span className="hidden md:inline">
          <SpideyMaskMini size={32} />
        </span>
      </div>
    </div>
  );
};
