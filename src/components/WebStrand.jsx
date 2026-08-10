import { useMemo } from "react";
import { useWebStrand } from "@/hooks/useWebStrand";
import { navItems } from "@/data/site";
import "./WebStrand.css";

export const WebStrand = () => {
  const sectionIds = useMemo(() => navItems.map((item) => item.id), []);
  const strand = useWebStrand({ sectionIds });

  if (!strand || strand.opacity <= 0.02) return null;

  return (
    <div
      className="web-strand"
      aria-hidden="true"
      style={{
        top: `${strand.top}px`,
        left: `${strand.left}px`,
        height: `${strand.height}px`,
        opacity: strand.opacity,
      }}
    />
  );
};
