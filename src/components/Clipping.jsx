export default function Clipping({ date, children, className = "" }) {
  return (
    <div className={`clipping ${className}`.trim()}>
      <div className="clipping__byline">FIELD REPORT — {date}</div>
      <p className="clipping__quote">{children}</p>
    </div>
  );
}
