import { useEffect, useRef } from "react";
import { spideyColors, rgba } from "@/lib/spidey-colors";

const STRAND_SEED = [
  { x: 0.08, top: -20, height: 42, lean: 24 },
  { x: 0.22, top: 10, height: 36, lean: -16 },
  { x: 0.4, top: -30, height: 48, lean: 20 },
  { x: 0.62, top: 5, height: 40, lean: -22 },
  { x: 0.82, top: -25, height: 46, lean: 18 },
  { x: 0.94, top: 15, height: 34, lean: -14 },
  { x: 0.03, top: 40, height: 30, lean: 10 },
];

const randRange = (min, max) => min + Math.random() * (max - min);

/**
 * Fixed viewport canvas that renders luminous web lines, drifting
 * "web-fluid" particles, and a subtle NYC-skyline back layer. Purely
 * decorative — never intercepts pointer events.
 */
export const WebBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext("2d");
    if (!ctx) return undefined;

    let width = 0;
    let height = 0;
    let rafId = 0;
    let skyline = [];
    let strands = [];
    let particles = [];
    const mouse = { nx: 0, ny: 0 };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      skyline = Array.from({ length: Math.ceil(width / 46) + 1 }, (_, i) => {
        const w = 30 + Math.random() * 26;
        const h = 60 + Math.random() * 180;
        const lit = Math.random() < 0.35;
        return { x: i * 46, w, h, lit };
      });

      strands = STRAND_SEED.map((s) => ({
        x: width * s.x,
        top: s.top,
        height: (height * s.height) / 100,
        lean: s.lean,
        sway: randRange(-1.2, 1.2),
        sate: randRange(0, Math.PI * 2),
      }));

      particles = Array.from({ length: 16 }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: randRange(0.6, 1.8),
        vx: randRange(-0.08, 0.08),
        vy: randRange(-0.16, -0.05),
        alpha: randRange(0.12, 0.5),
      }));
    };

    const drawWebStrand = (s, now) => {
      const { blueRGB } = spideyColors();
      const t = s.sate + now * 0.00045;
      const parallax = mouse.nx * 14;
      const swayX = Math.sin(t) * s.sway * 3 + parallax;
      ctx.beginPath();
      ctx.strokeStyle = rgba(blueRGB, 0.35);
      ctx.lineWidth = 2;
      ctx.shadowColor = rgba(blueRGB, 0.5);
      ctx.shadowBlur = 4;
      ctx.moveTo(s.x + swayX, s.top);
      ctx.lineTo(s.x + swayX + s.lean, s.top + s.height);
      ctx.stroke();
      ctx.shadowBlur = 0;

      const steps = 5;
      for (let i = 0; i <= steps; i += 1) {
        const y = s.top + (s.height * i) / steps;
        const baseX = s.x + swayX + (s.lean * i) / steps;
        ctx.beginPath();
        ctx.strokeStyle = rgba(blueRGB, 0.25);
        ctx.lineWidth = 1.2;
        ctx.moveTo(baseX - 26 + swayX * 0.5, y);
        ctx.lineTo(baseX + 26 + swayX * 0.5, y);
        ctx.stroke();
      }
    };

    const draw = (now) => {
      const { redRGB, blueRGB } = spideyColors();
      ctx.clearRect(0, 0, width, height);

      // NYC skyline — faint silhouettes at the bottom, parallax with mouse
      const skyOffset = mouse.nx * 26;
      ctx.save();
      ctx.globalAlpha = 0.5;
      for (const b of skyline) {
        const bx = b.x + skyOffset;
        ctx.fillStyle = b.lit ? rgba(blueRGB, 0.1) : "rgba(10, 12, 16, 0.55)";
        ctx.fillRect(bx, height - b.h - 2, b.w, b.h + 2);
        if (b.lit) {
          ctx.fillStyle = rgba(redRGB, 0.18);
          for (let wy = 0; wy < 6; wy += 1) {
            const wx = bx + 4 + Math.random() * (b.w - 8);
            const yy = height - b.h + Math.random() * (b.h - 4);
            ctx.fillRect(wx, yy, 2, 2);
          }
        }
      }
      // antenna layers — the far layer shifts slightly against the skyline
      ctx.globalAlpha = 0.22;
      ctx.fillStyle = "rgba(10, 12, 16, 0.7)";
      for (let i = 0; i < width; i += 110) {
        const hx = ((i * 0.62) % width) - skyOffset * 0.6;
        const hh = 34 + ((i * 13) % 60);
        ctx.fillRect(hx, height - hh - 2, 8, hh + 2);
      }
      ctx.restore();

      // web strands
      strands.forEach((s) => drawWebStrand(s, now));

      // drifting web-fluid particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < -4) {
          p.y = height + 4;
          p.x = Math.random() * width;
        }
        if (p.x < -4) p.x = width + 4;
        if (p.x > width + 4) p.x = -4;
        ctx.beginPath();
        ctx.fillStyle = rgba(redRGB, p.alpha * 1.8);
        ctx.shadowColor = rgba(redRGB, 0.6);
        ctx.shadowBlur = 4;
        ctx.arc(p.x, p.y, p.r * 1.4, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      rafId = requestAnimationFrame(draw);
    };

    resize();
    rafId = requestAnimationFrame(draw);
    const onPointerMove = (e) => {
      mouse.nx = (e.clientX / width) * 2 - 1;
      mouse.ny = (e.clientY / height) * 2 - 1;
    };
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointerMove, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0"
    />
  );
};