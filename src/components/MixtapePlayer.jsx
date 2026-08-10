import { useEffect, useRef, useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Pause,
  Play,
  SkipBack,
  SkipForward,
} from "lucide-react";
import "./MixtapePlayer.css";

/**
 * Add royalty-free / CC0 files under /public/audio and list them here.
 * See /public/audio/README.md
 */
const TRACKS = [
  // Example (uncomment after adding a licensed file):
  // { id: "night-shift", title: "Night Shift Debug", src: "/audio/night-shift.mp3" },
];

const formatTime = (secs) => {
  if (!Number.isFinite(secs) || secs < 0) return "0:00";
  const m = Math.floor(secs / 60);
  const s = Math.floor(secs % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
};

export const MixtapePlayer = () => {
  const audioRef = useRef(null);
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
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

  return (
    <div
      className={[
        "mixtape-dock",
        expanded ? "mixtape-dock--open" : "",
        hasTracks ? "" : "mixtape-dock--empty",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <audio ref={audioRef} preload="metadata" />

      <div className="mixtape-dock__bar">
        <button
          type="button"
          className="mixtape-icon-btn mixtape-icon-btn--primary"
          onClick={toggle}
          disabled={!hasTracks}
          aria-label={playing ? "Pause" : "Play"}
        >
          {playing ? <Pause size={14} /> : <Play size={14} />}
        </button>

        <p className="mixtape-dock__title">
          currently swinging to:{" "}
          <strong>{track ? track.title : "— no cassette loaded —"}</strong>
        </p>

        <button
          type="button"
          className="mixtape-icon-btn"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          aria-label={expanded ? "Collapse player" : "Expand player"}
        >
          {expanded ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
        </button>
      </div>

      <div className="mixtape-dock__expanded" aria-hidden={!expanded}>
        <div className="mixtape-dock__expanded-inner space-y-3">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={prev}
              disabled={!hasTracks}
              className="mixtape-icon-btn"
              aria-label="Previous track"
            >
              <SkipBack size={14} />
            </button>
            <button
              type="button"
              onClick={toggle}
              disabled={!hasTracks}
              className="mixtape-icon-btn mixtape-icon-btn--primary"
              aria-label={playing ? "Pause" : "Play"}
            >
              {playing ? <Pause size={14} /> : <Play size={14} />}
            </button>
            <button
              type="button"
              onClick={next}
              disabled={!hasTracks}
              className="mixtape-icon-btn"
              aria-label="Next track"
            >
              <SkipForward size={14} />
            </button>
            <span className="ml-auto font-mono text-[10px] text-dim">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>

          <label className="block">
            <span className="sr-only">Scrubber</span>
            <input
              type="range"
              min={0}
              max={duration || 0}
              step={0.1}
              value={Math.min(currentTime, duration || 0)}
              onChange={onScrub}
              disabled={!hasTracks}
              className="mixtape-scrubber w-full accent-[#E62429] disabled:opacity-40"
            />
          </label>

          {!hasTracks && (
            <p className="font-mono text-[10px] text-dim">
              drop CC0 / licensed tracks in /public/audio — see README there
            </p>
          )}
        </div>
      </div>

      <div className="mixtape-dock__progress" aria-hidden="true">
        <div
          className={[
            "mixtape-dock__progress-fill",
            playing ? "mixtape-dock__progress-fill--playing" : "",
          ]
            .filter(Boolean)
            .join(" ")}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};
