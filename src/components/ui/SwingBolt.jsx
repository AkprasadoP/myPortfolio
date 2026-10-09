import { useEffect, useRef } from "react";
import { spideyColors, rgba } from "@/lib/spidey-colors";

/**
 * Full-screen overlay canvas that draws a red web-bolt arcing from the bottom
 * of the viewport to wherever `web:swing` events point. Used as a
 * "web-swing" flourish when navigating between sections.
 */
export const SwingBolt = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext("2d");
    if (!ctx) return undefined;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let rafId = 0;
    let bolts = [];

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const onSwing = (e) => {
      const { x, y } = e.detail;
      const ox = width / 2;
      const oy = height + 10;
      const dist = Math.hypot(x - ox, y - oy) || 1;
      const ux = (x - ox) / dist;
      const uy = (y - oy) / dist;
      const perp = { x: -uy, y: ux };
      const cx = (ox + x) / 2 + perp.x * dist * 0.16;
      const cy = (oy + y) / 2 + perp.y * dist * 0.16;
      bolts.push({ ox, oy, cx, cy, tx: x, ty: y, t: 0 });
      if (!rafId) rafId = requestAnimationFrame(draw);
    };

    const draw = () => {
      const { redRGB } = spideyColors();
      ctx.clearRect(0, 0, width, height);
      bolts.forEach((b) => {
        b.t += 0.055;
        const p = Math.min(1, b.t);
        const alpha = Math.max(0, 1 - p) * 0.98;

        // glow pass
        ctx.beginPath();
        ctx.moveTo(b.ox, b.oy);
        ctx.quadraticCurveTo(b.cx, b.cy, b.tx, b.ty);
        ctx.strokeStyle = rgba(redRGB, alpha * 0.4);
        ctx.lineWidth = 8;
        ctx.shadowColor = rgba(redRGB, 0.8);
        ctx.shadowBlur = 12;
        ctx.stroke();
        ctx.shadowBlur = 0;

        // main thread
        ctx.beginPath();
        ctx.moveTo(b.ox, b.oy);
        ctx.quadraticCurveTo(b.cx, b.cy, b.tx, b.ty);
        ctx.strokeStyle = rgba(redRGB, alpha);
        ctx.lineWidth = 3;
        ctx.stroke();

        // secondary fainter thread
        ctx.beginPath();
        ctx.moveTo(b.ox, b.oy);
        ctx.quadraticCurveTo(b.cx, b.cy, b.tx, b.ty);
        ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.5})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        if (p < 0.35) {
          ctx.beginPath();
          ctx.strokeStyle = rgba(redRGB, alpha);
          ctx.lineWidth = 2;
          ctx.shadowColor = rgba(redRGB, 0.9);
          ctx.shadowBlur = 8;
          ctx.arc(b.tx, b.ty, 14 - p * 14, 0, Math.PI * 2);
          ctx.stroke();
          ctx.shadowBlur = 0;
        }
      });
      bolts = bolts.filter((b) => b.t < 1);

      if (bolts.length) {
        rafId = requestAnimationFrame(draw);
      } else {
        rafId = 0;
      }
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("web:swing", onSwing);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("web:swing", onSwing);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[66] hidden md:block"
    />
  );
};