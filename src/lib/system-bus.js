/**
 * Tiny DOM CustomEvent bus for cross-component commands
 * (palette → walkman / patrol / web-shooter).
 */

export const emitSystem = (name, detail = {}) => {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(name, { detail }));
};

export const onSystem = (name, handler) => {
  if (typeof window === "undefined") return () => {};
  const fn = (e) => handler(e.detail ?? {}, e);
  window.addEventListener(name, fn);
  return () => window.removeEventListener(name, fn);
};

export const EV = {
  WALKMAN_PLAY: "system:walkman-play",
  WALKMAN_PAUSE: "system:walkman-pause",
  PATROL_TOGGLE: "system:patrol-toggle",
  WEBSHOOTER_START: "system:webshooter-start",
  PALETTE_OPEN: "system:palette-open",
};
