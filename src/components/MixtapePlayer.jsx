import { useEffect, useRef, useState } from "react";

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

  const hasTracks = TRACKS.length > 0;
  const track = hasTracks ? TRACKS[index % TRACKS.length] : null;

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
    <div className="border border-line bg-inset">
      <div className="flex items-center gap-2 border-b border-line bg-[#18181c] px-3 py-2 font-mono text-[11px] tracking-[0.14em] uppercase">
        <span className="h-1.5 w-1.5 bg-spidey-red" />
        <span className="text-spidey-red">mixtape.wav</span>
        <span className="ml-auto text-dim">walkman / local</span>
      </div>

      <div className="space-y-3 p-3 sm:px-4 sm:py-3">
        <audio ref={audioRef} preload="metadata" />

        <p className="font-mono text-[11px] text-muted">
          currently swinging to:{" "}
          <span className="text-cream">
            {track ? track.title : "— no cassette loaded —"}
          </span>
        </p>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={prev}
            disabled={!hasTracks}
            className="btn-system px-2 py-1 text-[10px] disabled:opacity-40"
          >
            [ prev ]
          </button>
          <button
            type="button"
            onClick={toggle}
            disabled={!hasTracks}
            className="btn-system btn-system-primary px-2 py-1 text-[10px] disabled:opacity-40"
          >
            {playing ? "[ pause ]" : "[ play ]"}
          </button>
          <button
            type="button"
            onClick={next}
            disabled={!hasTracks}
            className="btn-system px-2 py-1 text-[10px] disabled:opacity-40"
          >
            [ next ]
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
  );
};
