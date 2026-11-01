/**
 * Static corner web — spokes radiating from the top-right corner with
 * sagging silk rings between them. Hairline, low-contrast, never animated:
 * it should read as architecture, not as a mascot.
 */
const W = 1000;
const H = 760;
const SPOKES = 11;
const RINGS = [70, 130, 200, 280, 370, 470, 580, 700, 830];

const buildWeb = () => {
  const cx = W;
  const cy = 0;
  // fan from straight left (180°) to straight down (90°)
  const angles = Array.from(
    { length: SPOKES },
    (_, i) => Math.PI / 2 + (Math.PI / 2) * (i / (SPOKES - 1))
  );
  const reach = Math.hypot(W, H);
  const spokes = angles.map((a) => ({
    x: cx + Math.cos(a) * reach,
    y: cy + Math.sin(a) * reach,
  }));

  const rings = RINGS.map((r) => {
    let d = "";
    angles.forEach((a, i) => {
      const x = cx + Math.cos(a) * r;
      const y = cy + Math.sin(a) * r;
      if (i === 0) {
        d += `M${x.toFixed(1)} ${y.toFixed(1)}`;
        return;
      }
      // control point pulled toward the hub so each segment sags like silk
      const mid = (a + angles[i - 1]) / 2;
      const sag = r * 0.93;
      const qx = cx + Math.cos(mid) * sag;
      const qy = cy + Math.sin(mid) * sag;
      d += ` Q${qx.toFixed(1)} ${qy.toFixed(1)} ${x.toFixed(1)} ${y.toFixed(1)}`;
    });
    return d;
  });

  return { cx, cy, spokes, rings };
};

const WEB = buildWeb();

const WebSvg = ({ className }) => (
  <svg
    className={className}
    viewBox={`0 0 ${W} ${H}`}
    fill="none"
    stroke="currentColor"
    strokeWidth="1"
    vectorEffect="non-scaling-stroke"
    preserveAspectRatio="xMaxYMin meet"
  >
    {WEB.spokes.map((s, i) => (
      <line key={`s${i}`} x1={WEB.cx} y1={WEB.cy} x2={s.x} y2={s.y} />
    ))}
    {WEB.rings.map((d, i) => (
      <path key={`r${i}`} d={d} />
    ))}
  </svg>
);

export const WebNoir = () => (
  <div className="web-noir" aria-hidden="true">
    <WebSvg />
    <WebSvg className="web-noir__low" />
  </div>
);
