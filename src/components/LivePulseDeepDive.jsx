import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  archNodes,
  archEdges,
  archTrace,
  raceLanes,
  raceSteps,
  failLanes,
  failSteps,
  failNote,
  decisions,
} from "@/data/livepulse";
import "./LivePulseDeepDive.css";

const STEP_MS = 1100;

/** Advances 0..total-1 on a timer while `running`; returns [index, start]. */
const useStepper = (total, stepMs = STEP_MS) => {
  const [index, setIndex] = useState(-1);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return undefined;
    if (index >= total - 1) {
      setRunning(false);
      return undefined;
    }
    const t = window.setTimeout(() => setIndex((i) => i + 1), index < 0 ? 0 : stepMs);
    return () => window.clearTimeout(t);
  }, [running, index, total, stepMs]);

  const start = () => {
    setIndex(-1);
    setRunning(true);
  };

  return [index, start, running];
};

// —— 1. System architecture ——
const ArchNode = ({ id, node, active }) => (
  <g className={cn("lp-node", node.tone && `lp-node--${node.tone}`, active && "lp-node--active")} data-id={id}>
    <rect x={node.x} y={node.y} width={node.w} height={node.h} />
    <text x={node.x + 14} y={node.y + 24} className="lp-node__title">
      {node.title}
    </text>
    <text x={node.x + 14} y={node.y + 42} className="lp-node__sub">
      {node.sub}
    </text>
    {node.note && (
      <text x={node.x + 14} y={node.y + node.h - 14} className="lp-node__note">
        {node.note}
      </text>
    )}
  </g>
);

const ArchitectureSvg = ({ current, step, reduced }) => (
  <div className="lp-diagram">
    <svg viewBox="0 0 960 440" role="img" aria-label="LivePulse system architecture: browsers connect over WebSocket to two Fastify instances; instances share events through Redis Pub/Sub and persist state in PostgreSQL.">
      <defs>
        <marker id="lp-arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0 0 L8 4 L0 8 z" className="lp-arrowhead" />
        </marker>
      </defs>

      {archEdges.map((e) => {
        const [x1, y1] = e.from;
        const [x2, y2] = e.to;
        return (
          <g key={e.id} className={cn("lp-edge", e.tone && `lp-edge--${e.tone}`)}>
            <line x1={x1} y1={y1} x2={x2} y2={y2} markerEnd="url(#lp-arrow)" markerStart="url(#lp-arrow)" />
            {e.label && (
              <text x={(x1 + x2) / 2} y={(y1 + y2) / 2 - 8} textAnchor="middle" className="lp-edge__label">
                {e.label}
              </text>
            )}
          </g>
        );
      })}

      {Object.entries(archNodes).map(([id, node]) => (
        <ArchNode key={id} id={id} node={node} active={current?.node === id} />
      ))}

      {current && (
        <motion.circle
          key={step}
          r={6}
          className="lp-packet"
          initial={{ cx: current.from[0], cy: current.from[1] }}
          animate={{ cx: current.to[0], cy: current.to[1] }}
          transition={{ duration: reduced ? 0 : 0.7, ease: [0.4, 0, 0.2, 1] }}
        />
      )}
    </svg>
  </div>
);

const hasWebGL = () => {
  try {
    const c = document.createElement("canvas");
    return Boolean(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
};

/**
 * Orbitable 3D scene. three.js is fetched only when this panel nears the
 * viewport; until then (and without WebGL) the SVG diagram stands in.
 */
const Architecture3D = ({ path, onFail }) => {
  const hostRef = useRef(null);
  const sceneRef = useRef(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return undefined;
    let cancelled = false;

    const load = async () => {
      try {
        const { createArchScene } = await import("./livepulse/arch3d.js");
        if (cancelled) return;
        sceneRef.current = createArchScene(host, {
          reducedMotion: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
          // touch drags must keep scrolling the page
          interactive: window.matchMedia("(hover: hover) and (pointer: fine)").matches,
        });
        setReady(true);
      } catch {
        onFail();
      }
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        load();
      },
      { rootMargin: "400px" }
    );
    io.observe(host);

    return () => {
      cancelled = true;
      io.disconnect();
      sceneRef.current?.dispose();
      sceneRef.current = null;
    };
  }, [onFail]);

  useEffect(() => {
    sceneRef.current?.setStep(path ?? null);
  }, [path, ready]);

  return (
    <div
      ref={hostRef}
      className="lp3d"
      role="img"
      aria-label="3D view of LivePulse: browsers connect to two WebSocket instances, which fan events out through Redis and commit state to PostgreSQL."
    >
      {!ready && <span className="lp3d__loading">loading 3D view…</span>}
      <span className="lp3d__hint" aria-hidden="true">drag to orbit</span>
    </div>
  );
};

const ArchitectureView = () => {
  const reduced = useReducedMotion();
  const [step, start, running] = useStepper(archTrace.length);
  const current = step >= 0 ? archTrace[step] : null;
  // 3D needs room for its labels; phones get the 2D diagram (which scrolls sideways)
  const [use3D, setUse3D] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(min-width: 640px)").matches &&
      hasWebGL()
  );
  const [onFail] = useState(() => () => setUse3D(false));

  return (
    <div>
      {use3D ? (
        <Architecture3D path={current?.path} onFail={onFail} />
      ) : (
        <ArchitectureSvg current={current} step={step} reduced={reduced} />
      )}

      <div className="lp-controls">
        <button type="button" onClick={start} disabled={running} className="btn-system btn-system-primary">
          {running ? "Tracing…" : step >= 0 ? "Replay event ↻" : "Trace one answer →"}
        </button>
        <p className="lp-caption" aria-live="polite">
          {current ? (
            <>
              <span className="lp-caption__n">{String(step + 1).padStart(2, "0")}/{String(archTrace.length).padStart(2, "0")}</span>
              {current.text}
            </>
          ) : (
            "PostgreSQL owns persistent state — it stands tallest. Redis distributes committed events between instances. Each instance only talks to the sockets it holds."
          )}
        </p>
      </div>
    </div>
  );
};

// —— 2 & 3. Sequence step-throughs ——
const Sequence = ({ lanes, steps, index }) => (
  <div className="lp-seq">
    <div className="lp-seq__lanes" aria-hidden="true">
      {lanes.map((l) => (
        <span key={l.id}>{l.label}</span>
      ))}
    </div>
    <ol className="lp-seq__rows">
      {steps.map((s, i) => {
        const col = lanes.findIndex((l) => l.id === s.lane);
        const shown = i <= index;
        return (
          <li
            key={`${i}-${s.text}`}
            className={cn("lp-seq__row", shown && "lp-seq__row--shown", i === index && "lp-seq__row--current")}
          >
            <span className="lp-seq__n">{String(i + 1).padStart(2, "0")}</span>
            <span
              className={cn("lp-seq__msg", s.tone && `lp-seq__msg--${s.tone}`)}
              style={{ "--col": col }}
            >
              <span className="lp-seq__who">{lanes[col].label}</span>
              {s.text}
            </span>
          </li>
        );
      })}
    </ol>
  </div>
);

const RaceView = () => {
  const [first, setFirst] = useState("A");
  const steps = raceSteps(first);
  const [index, start, running] = useStepper(steps.length, 750);

  const run = (who) => {
    setFirst(who);
    start();
  };

  return (
    <div>
      <p className="lp-lede">
        Two students submit the correct answer at the same moment, on different
        instances. The winner is decided by <em>lock acquisition and commit
        order</em> inside PostgreSQL — not client timestamps, not network
        arrival.
      </p>
      <div className="lp-controls lp-controls--top">
        <button type="button" onClick={() => run("A")} disabled={running} className="btn-system btn-system-primary">
          Run race →
        </button>
        <button type="button" onClick={() => run(first === "A" ? "B" : "A")} disabled={running} className="btn-system">
          Swap who locks first
        </button>
        <span className="lp-chip">
          lock goes to <b>Student {first}</b>
        </span>
      </div>
      <Sequence lanes={raceLanes} steps={steps} index={index} />
    </div>
  );
};

const FailureView = () => {
  const [index, start, running] = useStepper(failSteps.length, 850);

  return (
    <div>
      <p className="lp-lede">
        The trade-off, shown rather than hidden: what happens when an instance
        dies <em>after</em> COMMIT but <em>before</em> its Redis publish lands.
      </p>
      <div className="lp-controls lp-controls--top">
        <button type="button" onClick={start} disabled={running} className="btn-system btn-system-primary">
          {index >= 0 && !running ? "Replay crash ↻" : "Simulate crash →"}
        </button>
      </div>
      <Sequence lanes={failLanes} steps={failSteps} index={index} />
      <p className="lp-note">
        <span className="text-spidey-red">known limit</span> · {failNote}
      </p>
    </div>
  );
};

const TABS = [
  { id: "arch", label: "System architecture", View: ArchitectureView },
  { id: "race", label: "First-correct-wins", View: RaceView },
  { id: "fail", label: "Failure window", View: FailureView },
];

export const LivePulseDeepDive = () => {
  const [tab, setTab] = useState("arch");
  const { View } = TABS.find((t) => t.id === tab);

  return (
    <div id="livepulse-deep-dive" className="panel accent-red mt-8 scroll-mt-24">
      <div className="panel-header">
        <span>Case file 01 · LivePulse — architecture deep dive</span>
        <span>distributed systems · concurrency</span>
      </div>

      <div className="p-5 sm:p-7">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h3 className="font-display text-3xl uppercase leading-none text-fg sm:text-4xl">
              How LivePulse stays correct
            </h3>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">
              Real-time engagement infrastructure for live classes. Three
              views of what is actually implemented — press play on each.
            </p>
          </div>
        </div>

        <div className="lp-tabs" role="tablist" aria-label="LivePulse deep dive">
          {TABS.map((t, i) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={tab === t.id}
              onClick={() => setTab(t.id)}
              className={cn("lp-tab", tab === t.id && "lp-tab--active")}
            >
              <span className="lp-tab__n">{String(i + 1).padStart(2, "0")}</span>
              {t.label}
            </button>
          ))}
        </div>

        <div role="tabpanel">
          <View key={tab} />
        </div>

        <div className="mt-10 border-t border-line pt-6">
          <p className="meta-label mb-4">Engineering decisions</p>
          <ul className="grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {decisions.map((d) => (
              <li key={d.title} className="bg-panel p-4">
                <p className="text-sm font-semibold text-fg">{d.title}</p>
                <p className="mt-1 text-[13px] leading-relaxed text-muted">{d.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
