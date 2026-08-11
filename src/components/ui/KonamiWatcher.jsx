import { useEffect, useRef } from "react";

const KONAMI = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

/**
 * Watches the keyboard for the Konami code (↑↑↓↓←→←→BA). On a match, fires
 * the `onMatch` callback and shows a full-screen mask flash overlay.
 */
export const KonamiWatcher = ({ onMatch }) => {
  const idxRef = useRef(0);
  const flashRef = useRef(false);

  useEffect(() => {
    const triggerFlash = () => {
      if (flashRef.current) return;
      flashRef.current = true;
      const el = document.createElement("div");
      el.className = "konami-flash";
      el.innerHTML = `
        <div class="konami-flash__glow"></div>
        <span class="konami-flash__title">KRAVEN&apos;S LAIR DISABLED</span>
        <span class="konami-flash__sub">spider-sense re-calibrated · auto suit-up</span>
      `;
      document.body.appendChild(el);
      window.setTimeout(() => {
        el.classList.add("konami-flash--out");
        window.setTimeout(() => el.remove(), 700);
        flashRef.current = false;
      }, 1300);
    };

    const onKey = (e) => {
      const key =
        e.key.length === 1
          ? e.key.toLowerCase()
          : e.key;
      const expect = KONAMI[idxRef.current];
      if (key === expect) {
        idxRef.current += 1;
        if (idxRef.current === KONAMI.length) {
          idxRef.current = 0;
          onMatch();
          triggerFlash();
        }
      } else {
        // reset unless it's a prefix re-start (double ArrowUp)
        const prefixOk = KONAMI[0] === key;
        idxRef.current = prefixOk ? 1 : 0;
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};