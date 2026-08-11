import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { leetcode } from "@/data/site";
import { readCachedJudge, refreshJudgeData } from "@/lib/leetcode-live";
import { ComicReveal } from "@/components/ui/ComicReveal";
import "./LeetCodeSection.css";

const STREAK_KEY = "judge-streak";

const format = (value, decimals) =>
  value.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

function useCountUp(to, started, { duration = 1300 } = {}) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!started) return undefined;
    let raf = 0;
    const t0 = performance.now();
    const tick = (now) => {
      const p = Math.min(1, (now - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(to * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [started, to, duration]);
  return value;
}

const StatCount = ({ to, decimals = 0, started, suffix = "" }) => {
  const value = useCountUp(to, started, { decimals });
  return (
    <>
      {format(value, decimals)}
      {suffix}
    </>
  );
};

const DifficultyBars = ({ difficulty, started }) => {
  const maxTotal = Math.max(...difficulty.map((d) => d.total));
  return (
    <div className="judge-bars space-y-3">
      {difficulty.map(({ level, solved, total, color }) => {
        const pct = maxTotal > 0 ? (solved / total) * 100 : 0;
        const width = maxTotal > 0 ? (total / maxTotal) * 100 : 0;
        return (
          <div key={level} className="judge-bar">
            <div className="judge-bar__row">
              <span className="judge-bar__label">{level}</span>
              <span className="judge-bar__count">
                {solved}
                <em>/{total}</em>
              </span>
            </div>
            <div className="judge-bar__track">
              <motion.div
                className="judge-bar__fill"
                style={{
                  width: `${width}%`,
                  background: color,
                  boxShadow: `0 0 10px ${color}66`,
                }}
                initial={{ scaleX: 0 }}
                animate={started ? { scaleX: 1 } : {}}
                transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="judge-bar__inner" style={{ background: color }} />
              </motion.div>
            </div>
            <div
              className="judge-bar__pct"
              style={{ width: `${pct}%`, background: color }}
            />
          </div>
        );
      })}
    </div>
  );
};

const SkillTiers = ({ skills }) => {
  const [flip, setFlip] = useState(0);
  return (
    <div className="judge-tiers space-y-4">
      {skills.map(({ tier, entries }) => (
        <div key={tier} className="judge-tier">
          <h4 className="judge-tier__title">{tier}</h4>
          <div className="judge-tier__chips">
            {entries.map(({ name, count }) => {
              const lit = flip > 0 && (name.length + count) % 3 === 0;
              return (
                <button
                  key={name}
                  type="button"
                  onClick={() => setFlip((f) => f + 1)}
                  className={lit ? "judge-chip judge-chip--lit" : "judge-chip"}
                  title="powers-up the chip"
                  aria-label={`${name} power-up`}
                >
                  <span className="judge-chip__name">{name}</span>
                  <span className="judge-chip__count">x{count}</span>
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

const ContestGauge = ({ contest, started }) => {
  const { rating, globalRank } = contest;
  const frac = Math.min(
    1,
    Math.max(0, (rating - contest.gauge.min) / (contest.gauge.max - contest.gauge.min))
  );
  const needleRotate = -90 + frac * 180;

  return (
    <div className="judge-gauge">
      <div className="judge-gauge__viz">
        <svg viewBox="0 0 200 104" className="judge-gauge__arc" aria-hidden="true">
          <path
            d="M 20 100 A 80 80 0 0 1 180 100"
            fill="none"
            stroke="#2a2a2e"
            strokeWidth="10"
            strokeLinecap="round"
          />
          <motion.path
            d="M 20 100 A 80 80 0 0 1 180 100"
            fill="none"
            stroke="url(#judge-gauge-grad)"
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={2 * Math.PI * 80 * (frac * 0.5)}
            initial={{ opacity: 0 }}
            animate={started ? { opacity: 1 } : {}}
            transition={{ duration: 1.4, delay: 0.3 }}
          />
          <defs>
            <linearGradient id="judge-gauge-grad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#00c2a8" />
              <stop offset="60%" stopColor="#ffc01e" />
              <stop offset="100%" stopColor="#ff375f" />
            </linearGradient>
          </defs>
          {[1350, 1500, 1700, 1850, 2000].map((mark) => {
            const f = Math.min(
              1,
              Math.max(0, (mark - contest.gauge.min) / (contest.gauge.max - contest.gauge.min))
            );
            const ang = ((-180 + f * 180) * Math.PI) / 180;
            return (
              <line
                key={mark}
                x1={100 + 66 * Math.cos(ang)}
                y1={100 + 66 * Math.sin(ang)}
                x2={100 + 74 * Math.cos(ang)}
                y2={100 + 74 * Math.sin(ang)}
                stroke="#3a3a40"
                strokeWidth="2"
              />
            );
          })}
        </svg>
        <motion.div
          className="judge-gauge__needle"
          initial={{ rotate: -90 }}
          animate={started ? { rotate: needleRotate } : {}}
          transition={{ type: "spring", stiffness: 45, damping: 8, delay: 0.35 }}
        />
        <div className="judge-gauge__cap" />
      </div>
      <p className="judge-gauge__rating">
        <StatCount to={rating} started={started} />
      </p>
      <p className="judge-gauge__stats">
        TOP {contest.topPct} · {globalRank} · {contest.attended} CONTESTS
      </p>
    </div>
  );
};

const StreakExtender = ({ maxStreak }) => {
  const [streak, setStreak] = useState(() => {
    try {
      const stored = Number(window.localStorage.getItem(STREAK_KEY));
      return Number.isFinite(stored) && stored > 0 ? stored : maxStreak;
    } catch {
      return maxStreak;
    }
  });
  const [thwip, setThwip] = useState(0);

  const extend = () => {
    setStreak((s) => s + 1);
    setThwip((t) => t + 1);
    try {
      window.localStorage.setItem(STREAK_KEY, String(streak + 1));
    } catch {
      /* best-effort */
    }
  };

  return (
    <div className="judge-streak">
      <button type="button" className="judge-streak__btn" onClick={extend}>
        <span className="judge-streak__fire" aria-hidden="true">
          OPTIMIZE
        </span>
        <span>+ EXTEND STREAK</span>
      </button>
      <div className="judge-streak__meta">
        <span>
          CURRENT: <b className="judge-streak__num">{streak}</b>d
          <span className="judge-streak__best"> · BEST: {maxStreak}d</span>
        </span>
        <span className="judge-streak__honesty">
          local-only. leetcode knows nothing of this.
        </span>
      </div>
      {thwip > 0 && (
        <span key={thwip} className="judge-burst">
          DAY +1!
        </span>
      )}
    </div>
  );
};

const Ticker = ({ data }) => {
  const line = [
    `${data.solved} SOLVED`,
    `${data.acceptance.toFixed(2)}% ACCEPTANCE`,
    `TOP ${data.contest.topPct}`,
    `RATING ${data.contest.rating}`,
    `${data.submissions} LIFETIME SUBMISSIONS`,
    `${data.pastYearSubmissions} THIS YEAR`,
    `${data.activeDays} ACTIVE DAYS`,
    data.mostRecentBadge.toUpperCase(),
  ].join("  ✦  ");

  return (
    <div className="judge-ticker" aria-hidden="true">
      <div className="judge-ticker__track">
        <span>{line}</span>
        <span>{line}</span>
      </div>
    </div>
  );
};

const FEED_META = {
  live: { label: "LIVE FEED", tone: "judge-feed--live" },
  cached: { label: "CACHED FEED", tone: "judge-feed--cached" },
  snapshot: { label: "BUNDLED SNAPSHOT", tone: "judge-feed--snapshot" },
};

export const LeetCodeSection = () => {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  const [data, setData] = useState(leetcode);
  const [source, setSource] = useState("snapshot");

  useEffect(() => {
    let alive = true;
    const cached = readCachedJudge(leetcode);
    if (cached) {
      setData(cached.data);
      setSource(cached.source);
    }
    (async () => {
      const fresh = await refreshJudgeData(leetcode);
      if (alive) {
        setData(fresh.data);
        setSource(fresh.source);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  const feed = FEED_META[source] ?? FEED_META.snapshot;

  return (
    <section id="judge" ref={sectionRef} className="scroll-mt-4">
      <ComicReveal className="judge-panel">
        <div className="judge-header">
          <span className="judge-header__led" />
          <span>judge_terminal.exe</span>
          <span className="judge-header__sub">
            akprasad14 · rank {data.rank}
            <span className={`judge-feed ${feed.tone}`}>● {feed.label}</span>
          </span>
        </div>

        <Ticker data={data} />

        <div className="p-5 sm:p-7">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="eyebrow judge-eyebrow">PROBLEM ARCHIVE</p>
              <h3 className="mt-1 font-display text-2xl tracking-wide text-cream sm:text-3xl">
                JUDGE FILE
              </h3>
            </div>
            <p className="max-w-sm font-mono text-xs leading-relaxed text-dim">
              The automated judge keeps score. I keep solving. Feed pulled live
              from{" "}
              <a
                href={data.profileUrl}
                target="_blank"
                rel="noreferrer"
                className="text-judge underline decoration-dotted underline-offset-2 hover:text-cream"
              >
                leetcode.com/u/{data.handle}
              </a>
              .
            </p>
          </div>

          {/* headline counters */}
          <div className="judge-counts">
            <div className="judge-count">
              <span className="judge-count__label">PROBLEMS SOLVED</span>
              <span className="judge-count__value">
                <StatCount to={data.solved} started={inView} />
              </span>
              <span className="judge-count__note">
                C++ {data.languages[0].count} · Py 1 · SQL 1
              </span>
            </div>
            <div className="judge-count">
              <span className="judge-count__label">ACCEPTANCE</span>
              <span className="judge-count__value">
                <StatCount to={data.acceptance} decimals={2} started={inView} suffix="%" />
              </span>
              <span className="judge-count__note">of {data.submissions} lifetime shots</span>
            </div>
            <div className="judge-count">
              <span className="judge-count__label">CONTEST RATING</span>
              <span className="judge-count__value">
                <StatCount to={data.contest.rating} started={inView} />
              </span>
              <span className="judge-count__note">top {data.contest.topPct} globally</span>
            </div>
            <div className="judge-count">
              <span className="judge-count__label">ACTIVE DAYS</span>
              <span className="judge-count__value">
                <StatCount to={data.activeDays} started={inView} />
              </span>
              <span className="judge-count__note">max streak {data.maxStreak}d</span>
            </div>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            {/* left column — difficulty + languages */}
            <div>
              <h4 className="judge-subhead">DIFFICULTY BREAKDOWN</h4>
              <DifficultyBars difficulty={data.difficulty} started={inView} />

              <div className="mt-6">
                <h4 className="judge-subhead">SUBMISSION LANGUAGE</h4>
                <div className="flex flex-wrap gap-2">
                  {data.languages.map(({ name, count }) => (
                    <span key={name} className="judge-lang">
                      {name} <b>{count}</b>
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <h4 className="judge-subhead">BEATS</h4>
                <div className="grid grid-cols-3 gap-2">
                  {data.beats.map(({ value, label }) => (
                    <div key={label} className="judge-beat">
                      <span
                        className={
                          value >= 94
                            ? "judge-beat__value judge-beat__value--hi"
                            : "judge-beat__value"
                        }
                      >
                        {value}%
                      </span>
                      <span className="judge-beat__label">{label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* right column — skills + contest gauge */}
            <div>
              <h4 className="judge-subhead">SKILL MATRIX · click chips to power-up</h4>
              <SkillTiers skills={data.skills} />

              <div className="mt-6">
                <h4 className="judge-subhead">CONTEST TELEMETRY</h4>
                <ContestGauge contest={data.contest} started={inView} />
              </div>
            </div>
          </div>

          {/* badges + streak */}
          <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <h4 className="judge-subhead">BADGES ON THE BELT</h4>
              <div className="flex flex-wrap gap-2">
                {data.badges.map((badge) => (
                  <span key={badge} className="judge-badge">
                    {badge}
                  </span>
                ))}
                <span className="judge-badge judge-badge--hot">★ MOST RECENT</span>
              </div>
            </div>
            <StreakExtender maxStreak={data.maxStreak} />
          </div>
        </div>
      </ComicReveal>
    </section>
  );
};