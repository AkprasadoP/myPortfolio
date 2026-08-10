import { useCallback, useEffect, useRef, useState } from "react";

const ROUND_MS = 60_000;
const SPAWN_MS = 900;
const BUG_TYPES = [
  { label: "ERR", color: "#E62429" },
  { label: "BUG", color: "#1F75FE" },
  { label: "NaN", color: "#E62429" },
  { label: "404", color: "#1F75FE" },
  { label: "null", color: "#8A8A8E" },
];

const randomBug = (width) => {
  const type = BUG_TYPES[Math.floor(Math.random() * BUG_TYPES.length)];
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    x: 24 + Math.random() * Math.max(40, width - 48),
    y: -20,
    r: 14 + Math.random() * 6,
    vy: 55 + Math.random() * 70,
    ...type,
  };
};

export const WebShooterGame = () => {
  const canvasRef = useRef(null);
  const wrapRef = useRef(null);
  const stateRef = useRef({
    running: false,
    bugs: [],
    webs: [],
    score: 0,
    cursor: { x: 0, y: 0 },
    startedAt: 0,
    lastSpawn: 0,
    lastFrame: 0,
  });

  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(ROUND_MS / 1000);
  const [running, setRunning] = useState(false);
  const [finished, setFinished] = useState(false);
  const [finalScore, setFinalScore] = useState(0);

  const endRound = useCallback(() => {
    const s = stateRef.current;
    s.running = false;
    setRunning(false);
    setFinished(true);
    setFinalScore(s.score);
    setTimeLeft(0);
  }, []);

  const startRound = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const s = stateRef.current;
    s.running = true;
    s.bugs = [];
    s.webs = [];
    s.score = 0;
    s.startedAt = performance.now();
    s.lastSpawn = 0;
    s.lastFrame = performance.now();
    s.cursor = { x: canvas.width / 2, y: canvas.height / 2 };

    setScore(0);
    setTimeLeft(ROUND_MS / 1000);
    setFinished(false);
    setFinalScore(0);
    setRunning(true);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return undefined;

    const ctx = canvas.getContext("2d");
    if (!ctx) return undefined;

    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.max(280, Math.floor(rect.width));
      const h = Math.max(220, Math.min(320, Math.floor(w * 0.55)));
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      canvas.dataset.cssW = String(w);
      canvas.dataset.cssH = String(h);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    let raf = 0;

    const draw = (now) => {
      const w = Number(canvas.dataset.cssW) || canvas.clientWidth;
      const h = Number(canvas.dataset.cssH) || canvas.clientHeight;
      const s = stateRef.current;

      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = "#0e0e10";
      ctx.fillRect(0, 0, w, h);

      // faint grid
      ctx.strokeStyle = "rgba(42,42,46,0.9)";
      ctx.lineWidth = 1;
      for (let x = 0; x < w; x += 24) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += 24) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      if (s.running) {
        const dt = Math.min(0.033, (now - s.lastFrame) / 1000);
        s.lastFrame = now;

        const elapsed = now - s.startedAt;
        const left = Math.max(0, ROUND_MS - elapsed);
        const secs = Math.ceil(left / 1000);
        if (secs !== s._secs) {
          s._secs = secs;
          setTimeLeft(secs);
        }

        if (left <= 0) {
          endRound();
        } else {
          if (now - s.lastSpawn > SPAWN_MS) {
            s.bugs.push(randomBug(w));
            s.lastSpawn = now;
          }

          s.bugs = s.bugs.filter((b) => {
            b.y += b.vy * dt;
            return b.y - b.r < h + 10;
          });

          s.webs = s.webs.filter((web) => {
            web.t += dt * 4.5;
            return web.t < 1;
          });

          // hit test
          s.webs.forEach((web) => {
            if (web.hit) return;
            s.bugs = s.bugs.filter((b) => {
              const dx = b.x - web.tx;
              const dy = b.y - web.ty;
              const hit = Math.hypot(dx, dy) < b.r + 10 && web.t > 0.15;
              if (hit) {
                web.hit = true;
                s.score += 1;
                setScore(s.score);
              }
              return !hit;
            });
          });
        }
      }

      // bugs
      s.bugs.forEach((b) => {
        ctx.beginPath();
        ctx.fillStyle = b.color;
        ctx.strokeStyle = "#F2F2F0";
        ctx.lineWidth = 1;
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = "#0A0A0C";
        ctx.font = "bold 9px Courier New, monospace";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(b.label, b.x, b.y);
      });

      // web lines
      const originX = w / 2;
      const originY = h - 8;
      s.webs.forEach((web) => {
        const x = originX + (web.tx - originX) * Math.min(1, web.t);
        const y = originY + (web.ty - originY) * Math.min(1, web.t);
        ctx.beginPath();
        ctx.strokeStyle = `rgba(230, 36, 41, ${1 - web.t * 0.65})`;
        ctx.lineWidth = 1.5;
        ctx.moveTo(originX, originY);
        ctx.lineTo(x, y);
        ctx.stroke();
      });

      // crosshair
      const { x: cx, y: cy } = s.cursor;
      ctx.strokeStyle = "rgba(230, 36, 41, 0.85)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(cx - 10, cy);
      ctx.lineTo(cx + 10, cy);
      ctx.moveTo(cx, cy - 10);
      ctx.lineTo(cx, cy + 10);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(cx, cy, 6, 0, Math.PI * 2);
      ctx.stroke();

      // launcher
      ctx.fillStyle = "#1F75FE";
      ctx.fillRect(originX - 10, originY - 4, 20, 4);

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [endRound]);

  const pointerPos = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
    return {
      x: clientX - rect.left,
      y: clientY - rect.top,
    };
  };

  const onPointerMove = (e) => {
    stateRef.current.cursor = pointerPos(e);
  };

  const onPointerDown = (e) => {
    e.preventDefault();
    const pos = pointerPos(e);
    stateRef.current.cursor = pos;
    if (!stateRef.current.running) return;
    stateRef.current.webs.push({
      tx: pos.x,
      ty: pos.y,
      t: 0,
      hit: false,
    });
  };

  return (
    <div className="mt-6 border border-line bg-inset">
      <div className="panel-header" style={{ "--panel-accent": "#E62429" }}>
        <span>web_shooter.exe</span>
        <span>gadget / demo</span>
      </div>

      <div className="space-y-3 p-3 sm:p-4">
        <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-[11px] tracking-[0.08em] text-muted">
          <span>
            SCORE <span className="text-spidey-red">{score}</span>
          </span>
          <span>
            BUGS SQUASHED <span className="text-spidey-blue">{score}</span>
          </span>
          <span>
            TIME <span className="text-cream">{timeLeft}s</span>
          </span>
        </div>

        <div ref={wrapRef} className="relative w-full touch-none">
          <canvas
            ref={canvasRef}
            className="block w-full cursor-none border border-line bg-inset"
            onMouseMove={onPointerMove}
            onMouseDown={onPointerDown}
            onTouchStart={onPointerDown}
            onTouchMove={onPointerMove}
          />

          {!running && !finished && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-bg/80 p-4 text-center">
              <p className="font-mono text-xs text-muted">
                Squash falling bugs with web-lines. 60s round.
              </p>
              <button
                type="button"
                onClick={startRound}
                className="btn-system btn-system-primary"
              >
                [ start ]
              </button>
            </div>
          )}

          {finished && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-bg/85 p-4 text-center">
              <p className="font-mono text-xs leading-relaxed text-cream">
                RUN COMPLETE — {finalScore} BUGS SQUASHED
              </p>
              <button
                type="button"
                onClick={startRound}
                className="btn-system btn-system-primary"
              >
                [ run again ]
              </button>
            </div>
          )}
        </div>

        <p className="font-mono text-[10px] text-dim">
          tip: aim with cursor / finger · click / tap to fire
        </p>
      </div>
    </div>
  );
};
