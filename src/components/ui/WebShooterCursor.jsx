import { useEffect, useRef } from "react";
import { spideyColors, rgba } from "@/lib/spidey-colors";

/**
 * Desktop-only custom cursor. Draws a red "web-shooter" marker that follows
 * the pointer and fires a short web-bolt from the bottom of the screen toward
 * the pointer on click. Disabled on touch / coarse pointers.
 */
export const WebShooterCursor = () => {
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
    let mouseX = width / 2;
    let mouseY = height / 2;
    let mouseActive = false;
    let lastFire = 0;
    let lastMoveTime = 0;
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

    const onMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      mouseActive = true;
      lastMoveTime = performance.now();
      if (!rafId) rafId = requestAnimationFrame(draw);
    };

    const fire = (e) => {
      const now = performance.now();
      if (now - lastFire < 90) return;
      lastFire = now;

      const tx = e.clientX;
      const ty = e.clientY;
      const ox = width / 2;
      const oy = height + 6;
      const dist = Math.hypot(tx - ox, ty - oy) || 1;
      const ux = (tx - ox) / dist;
      const uy = (ty - oy) / dist;
      const tipX = tx - ux * 10;
      const tipY = ty - uy * 10;

      const chordLen = dist * 0.5;
      const perp = { x: -uy, y: ux };
      const cx = (ox + tipX) / 2 + perp.x * chordLen * 0.12;
      const cy = (oy + tipY) / 2 + perp.y * chordLen * 0.12;

      bolts.push({ ox, oy, cx, cy, tipX, tipY, t: 0 });
      if (bolts.length > 6) bolts.shift();
      if (!rafId) rafId = requestAnimationFrame(draw);
    };

    const draw = () => {
      const now = performance.now();
      if (now - lastMoveTime > 400 && !bolts.length) {
        mouseActive = false;
      }
      const { redRGB } = spideyColors();
      ctx.clearRect(0, 0, width, height);

      // spider-web cursor: hub + spokes + arcs (reads as Spidey, not a crosshair)
      if (mouseActive) {
        const { blueRGB } = spideyColors();
        ctx.save();
        ctx.translate(mouseX, mouseY);

        // glow
        ctx.beginPath();
        ctx.fillStyle = rgba(redRGB, 0.22);
        ctx.shadowColor = rgba(redRGB, 0.8);
        ctx.shadowBlur = 14;
        ctx.arc(0, 0, 18, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        // web spokes
        ctx.strokeStyle = rgba(redRGB, 1);
        ctx.lineWidth = 1.8;
        ctx.shadowColor = rgba(redRGB, 0.6);
        ctx.shadowBlur = 5;
        for (let i = 0; i < 8; i += 1) {
          const a = (i / 8) * Math.PI * 2 - Math.PI / 2;
          ctx.beginPath();
          ctx.moveTo(Math.cos(a) * 3, Math.sin(a) * 3);
          ctx.lineTo(Math.cos(a) * 15, Math.sin(a) * 15);
          ctx.stroke();
        }

        // concentric web rings
        ctx.strokeStyle = rgba(redRGB, 0.9);
        ctx.lineWidth = 1.4;
        [5, 9, 13].forEach((r) => {
          ctx.beginPath();
          ctx.arc(0, 0, r, 0, Math.PI * 2);
          ctx.stroke();
        });
        ctx.shadowBlur = 0;

        // blue hub (web-shooter core)
        ctx.beginPath();
        ctx.fillStyle = rgba(blueRGB, 1);
        ctx.shadowColor = rgba(blueRGB, 0.9);
        ctx.shadowBlur = 8;
        ctx.arc(0, 0, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = "#f2f2f0";
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.shadowBlur = 0;

        ctx.restore();
      }

      // fired web bolts
      bolts.forEach((b) => {
        b.t += 0.06;
        const progress = Math.min(1, b.t);
        const alpha = Math.max(0, 1 - progress) * 0.9;

        // quadratic bezier from origin to tip
        ctx.beginPath();
        ctx.moveTo(b.ox, b.oy);
        ctx.quadraticCurveTo(b.cx, b.cy, b.tipX, b.tipY);
        ctx.strokeStyle = rgba(redRGB, alpha);
        ctx.lineWidth = 1.6;
        ctx.stroke();

        // web-hit ring at the tip
        if (progress < 0.3) {
          ctx.beginPath();
          ctx.strokeStyle = rgba(redRGB, alpha);
          ctx.lineWidth = 1;
          ctx.arc(b.tipX, b.tipY, 12 - progress * 12, 0, Math.PI * 2);
          ctx.stroke();
        }
      });

      if (bolts.length) {
        bolts = bolts.filter((b) => b.t < 1);
      }

      if (mouseActive || bolts.length) {
        rafId = requestAnimationFrame(draw);
      } else {
        rafId = 0;
      }
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", fire, { passive: true });

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", fire);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[70] hidden md:block"
    />
  );
};