import { useEffect, useRef } from "react";
import { spideyColors, rgba } from "@/lib/spidey-colors";

/**
 * Desktop-only thin red cursor trail. Disabled on touch / coarse pointers.
 */
export const WebTrail = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const finePointer = window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    );
    if (!finePointer.matches) return undefined;

    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const ctx = canvas.getContext("2d");
    if (!ctx) return undefined;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let rafId = 0;
    let lastX = null;
    let lastY = null;
    let lastMove = 0;
    const segments = [];
    const LIFE_MS = 150;
    const MAX_SEGMENTS = 40;

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

    const onMove = (e) => {
      const now = performance.now();
      if (lastX != null && lastY != null) {
        segments.push({
          x1: lastX,
          y1: lastY,
          x2: e.clientX,
          y2: e.clientY,
          t: now,
        });
        if (segments.length > MAX_SEGMENTS) segments.shift();
      }
      lastX = e.clientX;
      lastY = e.clientY;
      lastMove = now;
    };

    const draw = (now) => {
      ctx.clearRect(0, 0, width, height);

      while (segments.length && now - segments[0].t > LIFE_MS) {
        segments.shift();
      }

      for (const seg of segments) {
        const age = now - seg.t;
        const alpha = Math.max(0, 1 - age / LIFE_MS) * 0.55;
        ctx.beginPath();
        ctx.strokeStyle = rgba(spideyColors().redRGB, alpha);
        ctx.lineWidth = 1.1;
        ctx.lineCap = "round";
        ctx.moveTo(seg.x1, seg.y1);
        ctx.lineTo(seg.x2, seg.y2);
        ctx.stroke();
      }

      if (segments.length || now - lastMove < LIFE_MS) {
        rafId = requestAnimationFrame(draw);
      } else {
        rafId = 0;
      }
    };

    const ensureLoop = () => {
      if (!rafId) rafId = requestAnimationFrame(draw);
    };

    const onMoveStart = (e) => {
      onMove(e);
      ensureLoop();
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMoveStart, { passive: true });

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMoveStart);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[60] hidden md:block"
    />
  );
};
