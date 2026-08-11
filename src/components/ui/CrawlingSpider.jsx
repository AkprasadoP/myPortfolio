import { useEffect, useState } from "react";
import { SpideyMaskMini } from "@/components/ui/SpideyEmblem";

/**
 * Mini Spidey mask that crawls left-to-right along the top of the viewport,
 * then respawns. Hidden for reduced-motion users.
 */
export const CrawlingSpider = () => {
  const [enabled, setEnabled] = useState(true);
  const [key, setKey] = useState(0);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    setEnabled(!reduced.matches);
    const onChange = () => setEnabled(!reduced.matches);
    reduced.addEventListener?.("change", onChange);
    return () => reduced.removeEventListener?.("change", onChange);
  }, []);

  useEffect(() => {
    if (!enabled) return undefined;
    const t = window.setTimeout(() => setKey((k) => k + 1), 26000);
    return () => window.clearTimeout(t);
  }, [enabled, key]);

  if (!enabled) return null;

  return (
    <div
      key={key}
      className="pointer-events-none fixed top-1.5 z-[45] hidden md:block"
      style={{
        animation: "crawl-across 24s linear forwards",
      }}
    >
      <div className="crawling-spider drop-shadow-[0_2px_6px_rgba(230,36,41,0.45)]">
        <SpideyMaskMini size={32} />
      </div>
    </div>
  );
};
