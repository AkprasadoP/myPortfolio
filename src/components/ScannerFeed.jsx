import { useEffect, useMemo, useRef, useState } from "react";
import "./ScannerFeed.css";

const DISPATCH_LINES = [
  "merge conflict reported near main branch",
  "suspect: off-by-one error, last seen in loop counter",
  "unhandled promise rejection pacing downtown",
  "CORS policy refusing entry at api gateway",
  "zombie process spotted — pid unknown",
  "null reference crossing midtown heap",
  "hydration mismatch between server and client",
  "race condition fleeing toward production",
  "memory leak drip reported in cache layer",
  "flaky test failing under full moon conditions",
  "deprecated API still answering calls after hours",
  "silent exception swallowed near try/catch alley",
  "type error impersonating a string again",
  "CSS specificity war escalating in layout district",
  "env var missing — last seen in staging",
  "websocket dropped connection mid-handshake",
  "bundle size exceeding soft limit downtown",
  "TODO comment left as evidence at scene",
  "infinite render loop circling the component tree",
  "dark mode flashbang during first paint",
];

const formatStamp = (date) => {
  const h = String(date.getHours()).padStart(2, "0");
  const m = String(date.getMinutes()).padStart(2, "0");
  const s = String(date.getSeconds()).padStart(2, "0");
  return `${h}:${m}:${s}`;
};

const pickLine = (pool, last) => {
  let next = pool[Math.floor(Math.random() * pool.length)];
  let guard = 0;
  while (next === last && guard < 5) {
    next = pool[Math.floor(Math.random() * pool.length)];
    guard += 1;
  }
  return next;
};

export const ScannerFeed = () => {
  const listRef = useRef(null);
  const lastLineRef = useRef("");
  const [lines, setLines] = useState(() => {
    const now = new Date();
    return [
      {
        id: "seed-0",
        stamp: formatStamp(new Date(now.getTime() - 4000)),
        text: pickLine(DISPATCH_LINES, ""),
      },
      {
        id: "seed-1",
        stamp: formatStamp(new Date(now.getTime() - 2000)),
        text: pickLine(DISPATCH_LINES, ""),
      },
    ];
  });

  const bars = useMemo(
    () => Array.from({ length: 28 }, (_, i) => i),
    []
  );

  useEffect(() => {
    const id = window.setInterval(() => {
      setLines((prev) => {
        const text = pickLine(DISPATCH_LINES, lastLineRef.current);
        lastLineRef.current = text;
        const next = [
          ...prev,
          {
            id: `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
            stamp: formatStamp(new Date()),
            text,
          },
        ].slice(-12);
        return next;
      });
    }, 2800 + Math.floor(Math.random() * 1200));

    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [lines]);

  return (
    <div className="mt-6 border border-line bg-inset">
      <div className="flex items-center gap-2 border-b border-line bg-[#18181c] px-3 py-2 font-mono text-[11px] tracking-[0.14em] uppercase">
        <span className="h-1.5 w-1.5 bg-spidey-blue" />
        <span className="text-spidey-blue">scanner.log</span>
        <span className="ml-auto text-dim">read-only</span>
      </div>

      <div className="space-y-3 p-3 sm:p-4">
        <div
          className="flex h-10 items-end gap-[3px] border border-line bg-bg px-2 py-1.5"
          aria-hidden="true"
        >
          {bars.map((i) => (
            <span
              key={i}
              className="scanner-bar w-[3px] flex-1 bg-spidey-red/80"
              style={{ animationDelay: `${(i % 7) * 0.11}s` }}
            />
          ))}
        </div>

        <div
          ref={listRef}
          className="max-h-44 overflow-y-auto border border-line bg-bg px-3 py-2 font-mono text-[11px] leading-relaxed"
        >
          {lines.map((line, index) => {
            const age = lines.length - 1 - index;
            const opacity = age > 8 ? 0.35 : age > 5 ? 0.55 : age > 2 ? 0.75 : 1;
            return (
              <p
                key={line.id}
                className="text-muted transition-opacity duration-500"
                style={{ opacity }}
              >
                <span className="text-spidey-red">[{line.stamp}]</span>{" "}
                <span className="text-fg">{line.text}</span>
              </p>
            );
          })}
        </div>

        <p className="font-mono text-[10px] text-dim">
          dispatch channel · monitoring local anomalies
        </p>
      </div>
    </div>
  );
};
