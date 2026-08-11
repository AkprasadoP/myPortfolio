/**
 * Fires a "web-swing" custom event toward the given element id. The SwingBolt
 * overlay listens and draws the arc. Call before/with the scroll.
 */
export const webSwingTo = (targetId) => {
  if (typeof window === "undefined") return;
  const el = document.getElementById(targetId);
  if (!el) return;
  const rect = el.getBoundingClientRect();
  window.dispatchEvent(
    new CustomEvent("web:swing", {
      detail: { x: rect.left + rect.width / 2, y: rect.top + 12 },
    })
  );
};