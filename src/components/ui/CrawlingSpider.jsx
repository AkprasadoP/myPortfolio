import { useEffect, useRef, useState } from "react";
import { SpideyMaskMini } from "@/components/ui/SpideyEmblem";

/**
 * Mini Spidey climbs the left scroll-strand rail, driven by the same
 * scroll progress as ScrollSpider / section lanterns. Vertical position
 * is clamped below #system-chrome so Home at scroll 0 never covers the
 * title bar.
 */
export const CrawlingSpider = () => {
  const [enabled, setEnabled] = useState(true);
  const [progress, setProgress] = useState(0);
  const [chromeBottom, setChromeBottom] = useState(48);
  const rafRef = useRef(0);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const setFromQuery = () => {
      setEnabled(!reduced.matches);
    };
    setFromQuery();
    reduced.addEventListener?.("change", setFromQuery);
    return () => reduced.removeEventListener?.("change", setFromQuery);
  }, []);

  useEffect(() => {
    const measureChrome = () => {
      const chrome = document.getElementById("system-chrome");
      if (!chrome) return;
      setChromeBottom(Math.max(36, Math.round(chrome.getBoundingClientRect().bottom)));
    };

    measureChrome();
    window.addEventListener("resize", measureChrome);
    const ro =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(measureChrome)
        : null;
    const chrome = document.getElementById("system-chrome");
    if (chrome && ro) ro.observe(chrome);

    return () => {
      window.removeEventListener("resize", measureChrome);
      ro?.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!enabled) return undefined;

    const root = document.getElementById("main-scroll-area");
    if (!root) return undefined;

    const measure = () => {
      const max = root.scrollHeight - root.clientHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, root.scrollTop / max)) : 0;
      setProgress((prev) => (Math.abs(prev - p) > 0.005 ? p : prev));
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

  // Same formula ScrollSpider used: progress × rail height.
  // Clamp only so Home @ scroll 0 sits under #system-chrome, not in it.
  const vh = typeof window !== "undefined" ? window.innerHeight : 800;
  const naturalTop = progress * vh + (8 - progress * 8);
  const topPx = Math.max(chromeBottom + 4, Math.round(naturalTop));

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed bottom-0 left-1 top-0 z-[35] hidden md:block"
    >
      <div className="scroll-spider-wrap" style={{ top: topPx }}>
        <div
          className={`crawling-spider drop-shadow-[0_2px_8px_rgba(230,36,41,0.5)] ${
            progress > 0.98 ? "scale-x-[-1]" : ""
          }`}
        >
          <SpideyMaskMini size={26} />
        </div>
      </div>
    </div>
  );
};
