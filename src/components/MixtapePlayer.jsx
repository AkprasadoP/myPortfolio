import { useEffect, useRef, useState } from "react";
import "./MixtapePlayer.css";

/**
 * Personal mixtape — add files under /public/audio and list them here.
 * See /public/audio/README.md
 */
const TRACKS = [
  {
    id: "gone-gone-gone",
    title: "Gone, Gone, Gone — Phillip Phillips",
    src: "/audio/gone-gone-gone.mp3",
  },
  {
    id: "loser",
    title: "Loser — Tame Impala",
    src: "/audio/loser.mp3",
  },
];

const VOL_STEPS = 6;

const formatTime = (secs) => {
  if (!Number.isFinite(secs) || secs < 0) return "0:00";
  const m = Math.floor(secs / 60);
  const s = Math.floor(secs % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
};

const shortTitle = (title) => {
  if (!title) return "—";
  const base = title.split(" — ")[0].trim();
  return base.toUpperCase();
};

export const MixtapePlayer = () => {
  const audioRef = useRef(null);
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(4);
  const [expanded, setExpanded] = useState(false);

  const hasTracks = TRACKS.length > 0;
  const track = hasTracks ? TRACKS[index % TRACKS.length] : null;
  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !track) return undefined;

    audio.src = track.src;
    audio.load();
    setCurrentTime(0);
    setDuration(0);
    setPlaying(false);

    return undefined;
  }, [track]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return undefined;

    const onTime = () => setCurrentTime(audio.currentTime || 0);
    const onMeta = () => setDuration(audio.duration || 0);
    const onEnded = () => {
      if (!hasTracks) return;
      setIndex((i) => (i + 1) % TRACKS.length);
      setPlaying(true);
    };

    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("loadedmetadata", onMeta);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("loadedmetadata", onMeta);
      audio.removeEventListener("ended", onEnded);
    };
  }, [hasTracks]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !track) return;

    if (playing) {
      audio.play().catch(() => setPlaying(false));
    } else {
      audio.pause();
    }
  }, [playing, track]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = volume / VOL_STEPS;
  }, [volume]);

  const toggle = () => {
    if (!hasTracks) return;
    setPlaying((p) => !p);
  };

  const prev = () => {
    if (!hasTracks) return;
    setIndex((i) => (i - 1 + TRACKS.length) % TRACKS.length);
    setPlaying(true);
  };

  const next = () => {
    if (!hasTracks) return;
    setIndex((i) => (i + 1) % TRACKS.length);
    setPlaying(true);
  };

  const onScrub = (e) => {
    const audio = audioRef.current;
    if (!audio || !hasTracks) return;
    const value = Number(e.target.value);
    audio.currentTime = value;
    setCurrentTime(value);
  };

  const toggleExpanded = () => setExpanded((v) => !v);

  return (
    <div
      className={["deck", expanded ? "deck--expanded" : "deck--collapsed"]
        .filter(Boolean)
        .join(" ")}
      role="region"
      aria-label="Music player"
    >
      <div
        className={[
          "deck__device",
          hasTracks ? "" : "deck__device--empty",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <audio ref={audioRef} preload="metadata" />

        <button
          type="button"
          className="deck__bezel"
          onClick={toggleExpanded}
          aria-expanded={expanded}
          aria-controls="walkman-panel"
          aria-label={expanded ? "Collapse Walkman" : "Expand Walkman"}
        >
          <span className="inline-flex min-w-0 items-center gap-1.5">
            <span
              className={[
                "deck__bezel-dot",
                playing ? "deck__bezel-dot--live" : "",
              ]
                .filter(Boolean)
                .join(" ")}
            />
            <span className="deck__bezel-brand">walkman</span>
            {!expanded && (
              <span className="deck__bezel-now">
                <span className="deck__bezel-glyph" aria-hidden="true">
                  {playing ? "Ⅱ" : "▶"}
                </span>
                <span className="deck__bezel-track">
                  {hasTracks ? shortTitle(track?.title) : "EMPTY"}
                </span>
              </span>
            )}
          </span>
          <span className="deck__bezel-count">
            {hasTracks ? `${index + 1}/${TRACKS.length}` : "empty"}
          </span>
        </button>

        {expanded && (
          <div className="deck__screen" id="walkman-panel">
            <div className="deck__status-row">
              <button
                type="button"
                className="deck__transport"
                onClick={toggle}
                disabled={!hasTracks}
                aria-label={playing ? "Pause" : "Play"}
              >
                {playing ? "[Ⅱ]" : "[▶]"}
              </button>

              <div className="deck__copy">
                {playing ? (
                  <>
                    <p className="deck__label">currently playing:</p>
                    <p className="deck__track">
                      {track ? track.title : "— no cassette —"}
                    </p>
                  </>
                ) : (
                  <>
                    <p className="deck__label">status</p>
                    <p className="deck__paused">PLAYER PAUSED</p>
                    {track && (
                      <p className="deck__track" style={{ marginTop: "0.2rem" }}>
                        {track.title}
                      </p>
                    )}
                  </>
                )}
              </div>
            </div>

            <div className="deck__scrub">
              <div className="deck__scrub-rail">
                <div
                  className="deck__scrub-fill"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <input
                type="range"
                className="deck__scrub-input"
                min={0}
                max={duration || 0}
                step={0.1}
                value={Math.min(currentTime, duration || 0)}
                onChange={onScrub}
                disabled={!hasTracks}
                aria-label="Seek"
              />
            </div>

            <div className="deck__times">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>

            <div className="deck__footer-row">
              <div className="deck__vol" aria-label="Volume">
                <span>VOL</span>
                <div className="deck__vol-bars">
                  {Array.from({ length: VOL_STEPS }, (_, i) => {
                    const level = i + 1;
                    return (
                      <button
                        key={level}
                        type="button"
                        className={[
                          "deck__vol-bar",
                          level <= volume ? "deck__vol-bar--on" : "",
                        ]
                          .filter(Boolean)
                          .join(" ")}
                        style={{ height: `${40 + level * 10}%` }}
                        onClick={() => setVolume(level)}
                        aria-label={`Volume ${level} of ${VOL_STEPS}`}
                      />
                    );
                  })}
                </div>
              </div>

              <div className="deck__skip">
                <button
                  type="button"
                  className="deck__skip-btn"
                  onClick={prev}
                  disabled={!hasTracks}
                  aria-label="Previous track"
                >
                  ◀
                </button>
                <button
                  type="button"
                  className="deck__skip-btn"
                  onClick={next}
                  disabled={!hasTracks}
                  aria-label="Next track"
                >
                  ▶
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
