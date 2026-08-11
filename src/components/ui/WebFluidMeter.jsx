import { useEffect, useRef, useState } from "react";

/**
 * Web-fluid cartridge meter. A horizontal gauge that slowly drains like a
 * real web-shooter cartridge. Refills when empty. Decorative easter egg.
 */
export const WebFluidMeter = () => {
  const [charge, setCharge] = useState(92);
  const rafRef = useRef(0);

  useEffect(() => {
    let last = performance.now();
    const tick = (now) => {
      const dt = (now - last) / 1000;
      last = now;
      setCharge((prev) => {
        let next = prev - dt * 1.1;
        if (next <= 0) return 100;
        return next;
      });
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const low = charge < 25;
  const pct = Math.max(0, Math.floor(charge));

  return (
    <div className="w-full max-w-[180px]">
      <div className="flex items-baseline justify-between font-mono text-[9px] tracking-[0.16em]">
        <span className={low ? "text-spidey-red" : "text-dim"}>
          WEB-FLUID{low ? " · LOW" : ""}
        </span>
        <span className={low ? "animate-blink text-spidey-red" : "text-dim"}>
          {pct}%
        </span>
      </div>
      <div className="mt-1 h-2.5 w-full border border-line-strong bg-inset">
        <div
          className={`h-full transition-[width] duration-200 ${
            low
              ? "bg-spidey-red"
              : "bg-gradient-to-b from-spidey-red/80 to-spidey-red"
          }`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
};