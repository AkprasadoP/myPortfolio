export default function Clipping({ date, children, className = "" }) {
  return (
    <div className={`clipping ${className}`.trim()}>
      <div className="clipping__byline">DAILY BUGLE WIRE — {date}</div>
      <p className="clipping__quote">{children}</p>
      <div className="clipping__footer">— J. Jonah Jameson, editor</div>
    </div>
  );
}