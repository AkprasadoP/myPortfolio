import { useCallback, useEffect, useRef, useState } from "react";
import { spideyColors, rgba } from "@/lib/spidey-colors";
import { onSystem, EV } from "@/lib/system-bus";

const ROUND_MS = 60_000;
const SPAWN_MS = 900;
const BOSS_AFTER = 15;
const BOSS_HP = 5;
const BOSS_BONUS = 10;
const LEADER_KEY = "web-shooter-leaderboard";
const RANK_COLORS = ["#ffd400", "#c8c8d0", "#cd7f32", "#8a8a8e", "#8a8a8e"];
const RANK_LABELS = ["1ST", "2ND", "3RD", "4TH", "5TH"];
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

const spawnBoss = (width) => ({
  x: width / 2,
  y: -48,
  r: 38,
  hp: BOSS_HP,
  maxHp: BOSS_HP,
  vy: 26,
  vx: 55,
  flash: 0,
  label: "PRODUCTION INCIDENT",
});

const loadLeaderboard = () => {
  try {
    const raw = window.localStorage.getItem(LEADER_KEY);
    const list = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(list)) return [];
    return list
      .filter(
        (item) =>
          item &&
          typeof item.score === "number" &&
          typeof item.at === "number"
      )
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);
  } catch {
    return [];
  }
};

const saveLeaderboard = (list) => {
  try {
    window.localStorage.setItem(LEADER_KEY, JSON.stringify(list));
  } catch {
    /* storage unavailable — ignore */
  }
};

const formatStamp = (at) => {
  const d = new Date(at);
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  const hh = String(d.getHours()).padStart(2, "0");
  const mi = String(d.getMinutes()).padStart(2, "0");
  return `${mm}.${dd} ${hh}:${mi}`;
};

export const WebShooterGame = () => {
  const canvasRef = useRef(null);
  const wrapRef = useRef(null);
  const stateRef = useRef({
    running: false,
    bugs: [],
    webs: [],
    strands: [],
    score: 0,
    squashed: 0,
    boss: null,
    bossSpawned: false,
    cursor: { x: 0, y: 0 },
    startedAt: 0,
    lastSpawn: 0,
    lastFrame: 0,
    incidentUntil: 0,
  });

  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(ROUND_MS / 1000);
  const [running, setRunning] = useState(false);
  const [finished, setFinished] = useState(false);
  const [finalScore, setFinalScore] = useState(0);
  const [leaderboard, setLeaderboard] = useState(loadLeaderboard);
  const [isRecord, setIsRecord] = useState(false);
  const [incidentMsg, setIncidentMsg] = useState("");
  const leaderboardRef = useRef(leaderboard);

  const highScore = leaderboard[0]?.score ?? 0;

  useEffect(() => {
    leaderboardRef.current = leaderboard;
  }, [leaderboard]);

  const endRound = useCallback(() => {
    const s = stateRef.current;
    s.running = false;
    setRunning(false);
    setFinished(true);
    setFinalScore(s.score);
    setTimeLeft(0);

    const final = s.score;
    if (final > 0) {
      const prev = leaderboardRef.current;
      const isNew =
        final > (prev[0]?.score ?? 0) || prev.length === 0;
      setIsRecord(isNew);
      const next = [...prev, { score: final, at: Date.now() }]
        .sort((a, b) => b.score - a.score)
        .slice(0, 5);
      leaderboardRef.current = next;
      setLeaderboard(next);
      saveLeaderboard(next);
    }
  }, []);

  const startRound = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const s = stateRef.current;
    s.running = true;
    s.bugs = [];
    s.webs = [];
    s.strands = [];
    s.score = 0;
    s.squashed = 0;
    s.boss = null;
    s.bossSpawned = false;
    s.incidentUntil = 0;
    s.startedAt = performance.now();
    s.lastSpawn = 0;
    s.lastFrame = performance.now();
    s.cursor = { x: canvas.width / 2, y: canvas.height / 2 };

    setScore(0);
    setTimeLeft(ROUND_MS / 1000);
    setFinished(false);
    setFinalScore(0);
    setIsRecord(false);
    setIncidentMsg("");
    setRunning(true);
  }, []);

  useEffect(() => onSystem(EV.WEBSHOOTER_START, () => startRound()), [startRound]);

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

      // accumulated web-strand backdrop — lingers from every fired shot
      if (s.strands.length > 0) {
        for (const strand of s.strands) {
          // main thread
          ctx.beginPath();
          ctx.moveTo(strand.ox, strand.oy);
          ctx.lineTo(strand.tx, strand.ty);
          ctx.strokeStyle = "rgba(242, 242, 240, 0.09)";
          ctx.lineWidth = 1;
          ctx.stroke();
        }
        // radial web hub at the launcher
        ctx.strokeStyle = "rgba(242, 242, 240, 0.08)";
        ctx.lineWidth = 0.8;
        for (const radius of [18, 34]) {
          ctx.beginPath();
          ctx.arc(w / 2, h - 8, radius, 0, Math.PI * 2);
          ctx.stroke();
          ctx.beginPath();
          for (let a = 0; a < Math.PI * 2; a += Math.PI / 5) {
            const rx = w / 2 + Math.cos(a) * radius;
            const ry = h - 8 + Math.sin(a) * radius;
            ctx.moveTo(w / 2, h - 8);
            ctx.lineTo(rx, ry);
          }
          ctx.stroke();
        }
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
          if (
            !s.bossSpawned &&
            s.squashed >= BOSS_AFTER
          ) {
            s.boss = spawnBoss(w);
            s.bossSpawned = true;
          }

          if (now - s.lastSpawn > SPAWN_MS) {
            s.bugs.push(randomBug(w));
            s.lastSpawn = now;
          }

          s.bugs = s.bugs.filter((b) => {
            b.y += b.vy * dt;
            return b.y - b.r < h + 10;
          });

          if (s.boss) {
            s.boss.y += s.boss.vy * dt;
            s.boss.x += s.boss.vx * dt;
            if (s.boss.x < s.boss.r + 8 || s.boss.x > w - s.boss.r - 8) {
              s.boss.vx *= -1;
            }
            if (s.boss.y > h + s.boss.r) {
              s.boss.y = -s.boss.r;
            }
            if (s.boss.flash > 0) s.boss.flash -= dt;
          }

          if (s.incidentUntil && now > s.incidentUntil) {
            s.incidentUntil = 0;
            setIncidentMsg("");
          }

          s.webs = s.webs.filter((web) => {
            web.t += dt * 4.5;
            return web.t < 1;
          });

          // hit test — boss first, then regular bugs
          s.webs.forEach((web) => {
            if (web.hit) return;
            if (s.boss && web.t > 0.15) {
              const dx = s.boss.x - web.tx;
              const dy = s.boss.y - web.ty;
              if (Math.hypot(dx, dy) < s.boss.r + 12) {
                web.hit = true;
                s.boss.hp -= 1;
                s.boss.flash = 0.18;
                if (s.boss.hp <= 0) {
                  s.boss = null;
                  s.score += BOSS_BONUS;
                  setScore(s.score);
                  s.incidentUntil = now + 2200;
                  setIncidentMsg("INCIDENT RESOLVED");
                }
                return;
              }
            }
            s.bugs = s.bugs.filter((b) => {
              const dx = b.x - web.tx;
              const dy = b.y - web.ty;
              const hit = Math.hypot(dx, dy) < b.r + 10 && web.t > 0.15;
              if (hit) {
                web.hit = true;
                s.score += 1;
                s.squashed += 1;
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

      // boss — PRODUCTION INCIDENT
      if (s.boss) {
        const b = s.boss;
        const cracked = b.maxHp - b.hp;
        ctx.beginPath();
        ctx.fillStyle = b.flash > 0 ? "#ffb0b0" : "#E62429";
        ctx.strokeStyle = "#F2F2F0";
        ctx.lineWidth = 2.5;
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // crack lines grow with damage
        if (cracked > 0) {
          ctx.strokeStyle = "rgba(10,10,12,0.85)";
          ctx.lineWidth = 1.6;
          for (let i = 0; i < cracked; i += 1) {
            const a = -Math.PI / 2 + (i / BOSS_HP) * Math.PI * 2;
            ctx.beginPath();
            ctx.moveTo(b.x, b.y);
            ctx.lineTo(
              b.x + Math.cos(a) * b.r * 0.92,
              b.y + Math.sin(a) * b.r * 0.92
            );
            ctx.stroke();
          }
        }

        ctx.fillStyle = "#F2F2F0";
        ctx.font = "bold 8px Courier New, monospace";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("PRODUCTION", b.x, b.y - 6);
        ctx.fillText("INCIDENT", b.x, b.y + 5);
        ctx.fillStyle = "#0A0A0C";
        ctx.font = "bold 9px Courier New, monospace";
        ctx.fillText(`${b.hp}/${b.maxHp}`, b.x, b.y + 18);
      }

      // web lines
      const originX = w / 2;
      const originY = h - 8;
      const { redRGB, blueRGB } = spideyColors();
      s.webs.forEach((web) => {
        const x = originX + (web.tx - originX) * Math.min(1, web.t);
        const y = originY + (web.ty - originY) * Math.min(1, web.t);
        ctx.beginPath();
        ctx.strokeStyle = rgba(redRGB, (1 - web.t * 0.65).toFixed(3));
        ctx.lineWidth = 1.5;
        ctx.moveTo(originX, originY);
        ctx.lineTo(x, y);
        ctx.stroke();
      });

      // crosshair
      const { x: cx, y: cy } = s.cursor;
      ctx.strokeStyle = rgba(redRGB, 0.85);
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
      ctx.fillStyle = rgba(blueRGB, 1);
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
    const canvas = canvasRef.current;
    const w = Number(canvas?.dataset.cssW) || canvas?.clientWidth || 300;
    const h = Number(canvas?.dataset.cssH) || canvas?.clientHeight || 200;
    const originX = w / 2;
    const originY = h - 8;
    stateRef.current.strands.push({ ox: originX, oy: originY, tx: pos.x, ty: pos.y });
    if (stateRef.current.strands.length > 130) {
      stateRef.current.strands.shift();
    }
  };

  return (
    <div className="mt-6 border border-line bg-inset">
      <div className="panel-header" style={{ "--panel-accent": "#E62429" }}>
        <span>web_shooter.exe</span>
        <span>gadget / field demo</span>
      </div>

      <div className="space-y-3 p-3 sm:p-4">
        <p className="font-mono text-[10px] tracking-[0.1em] text-dim">
          [ city-wide bug infestation — your only weapon is the web-shooter ]
        </p>
        <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-[11px] tracking-[0.08em] text-muted">
          <span>
            SCORE <span className="text-spidey-red">{score}</span>
          </span>
          <span>
            BUGS SQUASHED <span className="text-spidey-blue">{score}</span>
          </span>
          <span>
            THREAT WINDOW <span className="text-cream">{timeLeft}s</span>
          </span>
          <span>
            HIGH SCORE <span className="text-bugle">{highScore}</span>
          </span>
        </div>

        <div
          ref={wrapRef}
          id="web-shooter-game"
          className="relative w-full touch-none"
        >
          <canvas
            ref={canvasRef}
            className="block w-full cursor-none border border-line bg-inset"
            onMouseMove={onPointerMove}
            onMouseDown={onPointerDown}
            onTouchStart={onPointerDown}
            onTouchMove={onPointerMove}
          />

          {incidentMsg && running && (
            <div className="pointer-events-none absolute inset-x-0 top-3 z-10 flex justify-center">
              <span className="border border-crt-dim bg-[#1e2a1c] px-3 py-1 font-mono text-[11px] tracking-[0.16em] text-crt">
                {incidentMsg}
              </span>
            </div>
          )}

          {!running && !finished && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-bg/80 p-4 text-center">
              <p className="font-mono text-xs text-muted">
                The city needs you, hero. Squash 15 bugs to trigger a
                PRODUCTION INCIDENT. 60s patrol.
              </p>
              <button
                type="button"
                onClick={startRound}
                className="btn-system btn-system-primary"
              >
                [ start patrol ]
              </button>
            </div>
          )}

          {finished && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-bg/85 p-4 text-center">
              <p className="font-mono text-xs leading-relaxed text-cream">
                PATROL COMPLETE — {finalScore} BUGS SQUASHED
              </p>
              {isRecord && (
                <p className="animate-blink font-display text-sm tracking-[0.14em] text-bugle">
                  ★ NEW HIGH SCORE ★
                </p>
              )}
              <p className="font-mono text-[10px] text-dim">
                {finalScore === 0
                  ? "even the city has off days."
                  : finalScore > 15
                  ? "the neighborhood is proud of you."
                  : "decent work, hero."}
              </p>
              <button
                type="button"
                onClick={startRound}
                className="btn-system btn-system-primary"
              >
                [ patrol again ]
              </button>
            </div>
          )}
        </div>

        <p className="font-mono text-[10px] text-dim">
          tip: aim with cursor / finger · click / tap to fire
        </p>

        {leaderboard.length > 0 && (
          <div className="border border-line bg-bg">
            <div className="flex items-center justify-between border-b border-line px-3 py-2 font-mono text-[10px] tracking-[0.14em] text-spidey-red">
              <span>HALL OF HEROES / TOP PATROLS</span>
              <span className="text-dim">persisted locally</span>
            </div>
            <ul className="divide-y divide-line">
              {leaderboard.map((entry, idx) => (
                <li
                  key={`${entry.at}-${idx}`}
                  className="flex items-center gap-3 px-3 py-1.5 font-mono text-[11px]"
                >
                  <span
                    className="w-10 shrink-0 tracking-[0.1em]"
                    style={{ color: RANK_COLORS[idx] }}
                  >
                    {RANK_LABELS[idx]}
                  </span>
                  <span className="text-cream">{entry.score} bugs</span>
                  <span className="ml-auto text-dim">
                    {formatStamp(entry.at)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
