import { useEffect, useMemo, useRef, useState } from "react";
import { navItems, site } from "@/data/site";
import { webSwingTo } from "@/lib/swing";
import { emitSystem, onSystem, EV } from "@/lib/system-bus";

const scrollToId = (id) => {
  const element = document.getElementById(id);
  const main = document.getElementById("main-scroll-area");
  if (!element || !main) return;
  webSwingTo(id);
  main.scrollTo({ top: element.offsetTop - 8, behavior: "smooth" });
};

const GOTO_NICE = {
  home: "home",
  notes: "notes",
  experience: "patrol log",
  stack: "gadgets",
  projects: "case files",
  experiments: "lab notes",
  judge: "judge file",
  contact: "contact",
};

const buildCommands = () => [
  ...navItems.map((nav) => {
    const nice = GOTO_NICE[nav.id] ?? nav.id;
    return {
      id: `goto-${nav.id}`,
      label: `goto ${nice}`,
      hint: `Swing to ${nav.label}`,
      keywords: `goto ${nice} ${nav.label} ${nav.id} ${nav.code}`,
      run: () => scrollToId(nav.id),
    };
  }),
  {
    id: "play-game",
    label: "play game",
    hint: "Open Gadgets · start web_shooter.exe",
    keywords: "play game web shooter patrol bugs start",
    run: () => {
      scrollToId("stack");
      window.setTimeout(() => emitSystem(EV.WEBSHOOTER_START), 420);
    },
  },
  {
    id: "toggle-patrol",
    label: "toggle patrol",
    hint: "Flip patrol night / inverted mode",
    keywords: "toggle patrol mode night inverted",
    run: () => emitSystem(EV.PATROL_TOGGLE),
  },
  {
    id: "play-music",
    label: "play music",
    hint: "Start Walkman playback",
    keywords: "play music walkman mixtape audio",
    run: () => emitSystem(EV.WALKMAN_PLAY),
  },
  {
    id: "pause-music",
    label: "pause music",
    hint: "Pause Walkman playback",
    keywords: "pause music walkman mixtape stop",
    run: () => emitSystem(EV.WALKMAN_PAUSE),
  },
  {
    id: "download-resume",
    label: "download resume",
    hint: site.resumeUrl,
    keywords: "download resume cv pdf",
    run: () => {
      const a = document.createElement("a");
      a.href = site.resumeUrl;
      a.download = "";
      a.rel = "noreferrer";
      document.body.appendChild(a);
      a.click();
      a.remove();
    },
  },
  {
    id: "email-me",
    label: "email me",
    hint: site.email,
    keywords: "email me mail contact mailto",
    run: () => {
      window.location.href = `mailto:${site.email}`;
    },
  },
];

const scoreCommand = (cmd, query) => {
  const q = query.trim().toLowerCase();
  if (!q) return 1;
  const label = cmd.label.toLowerCase();
  const keys = cmd.keywords.toLowerCase();
  if (label === q) return 100;
  if (label.startsWith(q)) return 80;
  if (label.includes(q)) return 60;
  if (keys.includes(q)) return 40;
  const tokens = q.split(/\s+/).filter(Boolean);
  let hit = 0;
  tokens.forEach((t) => {
    if (keys.includes(t)) hit += 12;
  });
  return hit;
};

const isTypingTarget = (el) => {
  if (!el || !(el instanceof HTMLElement)) return false;
  const tag = el.tagName;
  if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return true;
  if (el.isContentEditable) return true;
  return false;
};

export const CommandPalette = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const inputRef = useRef(null);
  const commands = useMemo(() => buildCommands(), []);

  const results = useMemo(() => {
    const ranked = commands
      .map((cmd) => ({ cmd, score: scoreCommand(cmd, query) }))
      .filter((r) => r.score > 0)
      .sort(
        (a, b) => b.score - a.score || a.cmd.label.localeCompare(b.cmd.label)
      );
    return ranked.map((r) => r.cmd);
  }, [commands, query]);

  useEffect(() => {
    setSelected(0);
  }, [query, open]);

  useEffect(() => {
    if (!open) return undefined;
    const t = window.setTimeout(() => inputRef.current?.focus(), 30);
    return () => window.clearTimeout(t);
  }, [open]);

  useEffect(() => onSystem(EV.PALETTE_OPEN, () => {
    setOpen(true);
    setQuery("");
  }), []);

  useEffect(() => {
    const onKey = (e) => {
      const metaK = (e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k";
      if (metaK) {
        e.preventDefault();
        setOpen((v) => !v);
        setQuery("");
        return;
      }

      if (
        e.key === "/" &&
        !e.metaKey &&
        !e.ctrlKey &&
        !e.altKey &&
        !isTypingTarget(document.activeElement)
      ) {
        e.preventDefault();
        setOpen(true);
        setQuery("");
        return;
      }

      if (e.key === "Escape" && open) {
        e.preventDefault();
        setOpen(false);
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const runSelected = (cmd) => {
    if (!cmd) return;
    setOpen(false);
    setQuery("");
    cmd.run();
  };

  const onInputKey = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelected((i) => Math.min(results.length - 1, i + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelected((i) => Math.max(0, i - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      runSelected(results[selected]);
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center bg-black/70 px-3 pt-[12vh] sm:pt-[16vh]"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) setOpen(false);
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
    >
      <div className="w-full max-w-lg border border-spidey-red bg-panel shadow-[4px_4px_0_rgba(0,0,0,0.55)]">
        <div className="flex items-center justify-between border-b border-line bg-inset px-3 py-2 font-mono text-[10px] tracking-[0.14em] text-dim">
          <span className="text-spidey-red">COMMAND.EXE</span>
          <span>ESC close · ↑↓ · enter</span>
        </div>

        <div className="border-b border-line px-3 py-2">
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onInputKey}
            placeholder="type a command… goto patrol log · play game · toggle patrol"
            className="w-full border-0 bg-transparent font-mono text-sm text-cream outline-none placeholder:text-dim"
            autoComplete="off"
            spellCheck={false}
          />
        </div>

        <ul className="max-h-[46vh] overflow-y-auto py-1">
          {results.length === 0 && (
            <li className="px-3 py-4 font-mono text-xs text-dim">
              no matching commands
            </li>
          )}
          {results.map((cmd, idx) => {
            const active = idx === selected;
            return (
              <li key={cmd.id}>
                <button
                  type="button"
                  onMouseEnter={() => setSelected(idx)}
                  onClick={() => runSelected(cmd)}
                  className={[
                    "flex w-full items-center justify-between gap-3 px-3 py-2.5 text-left font-mono text-xs",
                    active
                      ? "bg-inset text-cream"
                      : "text-muted hover:bg-inset/60 hover:text-fg",
                  ].join(" ")}
                >
                  <span>
                    <span className="text-spidey-blue">&gt;</span> {cmd.label}
                  </span>
                  <span className="truncate text-[10px] text-dim">
                    {cmd.hint}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

        <div className="border-t border-line px-3 py-2 font-mono text-[10px] tracking-[0.1em] text-dim">
          {results.length} matches · friendly neighborhood CLI
        </div>
      </div>
    </div>
  );
};
