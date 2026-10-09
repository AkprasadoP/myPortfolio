import { useState, useCallback } from "react";

let _counter = 0;

/**
 * Hook — call `fire()` on any interaction to spawn a red ink-flash burst.
 * No childish POW/THWIP text — just a cinematic ink-splat radial flash.
 * Returns [bursts, fire] — render <ComicBursts bursts={bursts} /> anywhere.
 */
export const useComicBurst = () => {
  const [bursts, setBursts] = useState([]);

  const fire = useCallback(() => {
    const id = ++_counter;
    setBursts((prev) => [...prev, { id }]);
    setTimeout(() => {
      setBursts((prev) => prev.filter((b) => b.id !== id));
    }, 500);
  }, []);

  return [bursts, fire];
};

/**
 * Renders active burst overlays — ink-flash, not cartoon words.
 */
export const ComicBursts = ({ bursts }) => {
  if (!bursts.length) return null;
  return (
    <>
      {bursts.map((b) => (
        <span key={b.id} className="ink-flash" aria-hidden="true" />
      ))}
    </>
  );
};
