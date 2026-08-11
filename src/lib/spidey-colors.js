/**
 * Reads the current spidey palette from CSS variables at call time, so the
 * canvas-based effects (background, trail, cursor, bolts, radar) follow the
 * patrol-mode theme swap live.
 */
const hexToRgb = (hex) => {
  const clean = hex.replace("#", "");
  if (clean.length !== 6) return null;
  const num = parseInt(clean, 16);
  if (Number.isNaN(num)) return null;
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
};

export const rgba = ([r, g, b], alpha) =>
  `rgba(${r}, ${g}, ${b}, ${alpha})`;

export const spideyColors = () => {
  const cs = getComputedStyle(document.documentElement);
  const red =
    cs.getPropertyValue("--spidey-red").trim() || "#e62429";
  const blue =
    cs.getPropertyValue("--spidey-blue").trim() || "#1f75fe";
  return {
    red,
    blue,
    redRGB: hexToRgb(red) ?? [230, 36, 41],
    blueRGB: hexToRgb(blue) ?? [31, 117, 254],
  };
};