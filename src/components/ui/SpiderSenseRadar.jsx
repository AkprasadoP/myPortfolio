import { useEffect, useRef, useState } from "react";
import { spideyColors, rgba } from "@/lib/spidey-colors";

/**
 * Fixed "spider-sense" indicator in the corner. Sparks/pulses whenever the
 * pointer enters any interactive element (a[href], button, summary menu).
 * Disabled on touch devices.
 */
export const SpiderSenseRadar = () => {
  const [active, setActive] = useState(false);
  const canvasRef = useRef(null);
  const activeRef = useRef(false);

  activeRef.current = active;

  useEffect(() => {
    const finePointer = window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    );
    if (!finePointer.matches) return undefined;

    const onOver = (e) => {
      const el = e.target instanceof Element ? e.target : null;
      if (!el) return;
      const interactive =
        el.closest("a, button, input, textarea, select, summary, label");
      const next = Boolean(interactive);
      if (next !== activeRef.current) setActive(next);
    };

    window.addEventListener("pointerover", onOver, { passive: true });
    return () => window.removeEventListener("pointerover", onOver);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext("2d");
    if (!ctx) return undefined;

    const SIZE = 64;
    canvas.width = SIZE * 2;
    canvas.height = SIZE * 2;
    canvas.style.width = `${SIZE}px`;
    canvas.style.height = `${SIZE}px`;
    ctx.setTransform(2, 0, 0, 2, 0, 0);
    const cx = SIZE / 2;
    const cy = SIZE / 2;

    let rafId = 0;
    const start = performance.now();

    const draw = (now) => {
      const { redRGB, blueRGB } = spideyColors();
      ctx.clearRect(0, 0, SIZE, SIZE);
      const on = activeRef.current;
      const t = (now - start) / 1000;

      // radar rings
      ctx.strokeStyle = on ? rgba(redRGB, 0.4) : rgba(blueRGB, 0.2);
      ctx.lineWidth = 1;
      for (let r = 8; r <= 24; r += 6) {
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.stroke();
      }

      // rotating sweep arm
      const sweepAng = t * 1.6 + (on ? Math.sin(t * 6) * 0.4 : 0);
      const armR = on ? 26 : 20;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + Math.cos(sweepAng) * armR, cy + Math.sin(sweepAng) * armR);
      ctx.strokeStyle = on ? rgba(redRGB, 0.7) : rgba(blueRGB, 0.5);
      ctx.lineWidth = 1.4;
      ctx.stroke();

      // center spider dot
      ctx.beginPath();
      ctx.fillStyle = on ? spideyColors().red : spideyColors().blue;
      ctx.arc(cx, cy, 2.5, 0, Math.PI * 2);
      ctx.fill();

      // when triggered, pulse a warning ring
      if (on) {
        const pr = ((t * 90) % 26) + 6;
        ctx.beginPath();
        ctx.strokeStyle = rgba(redRGB, Math.max(0, 0.7 - pr / 30));
        ctx.lineWidth = 1.4;
        ctx.arc(cx, cy, pr, 0, Math.PI * 2);
        ctx.stroke();
      }

      rafId = requestAnimationFrame(draw);
    };

    rafId = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed bottom-3 right-3 z-[55] hidden md:block"
    >
      <canvas ref={canvasRef} />
      <p
        className={`mt-1 text-center font-mono text-[8px] tracking-[0.2em] transition-colors ${
          active ? "text-spidey-red" : "text-dim"
        }`}
      >
        SENSE {active ? "AC TIVE" : "STANDBY"}
      </p>
    </div>
  );
};