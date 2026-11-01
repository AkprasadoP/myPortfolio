/**
 * Classic Spider-Man chest emblem — filled black spider silhouette.
 * Used as the compact brand mark in the header and footer.
 */
export const SpideyEmblem = ({
  size = 24,
  className = "",
  fill = "#0a0a0c",
  stroke = "none",
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      {/* abdomen + cephalothorax */}
      <ellipse cx="32" cy="38" rx="11" ry="14" fill={fill} stroke={stroke} />
      <ellipse cx="32" cy="22" rx="8" ry="9" fill={fill} stroke={stroke} />
      {/* fangs */}
      <path d="M28 14 L26 8 M36 14 L38 8" stroke={fill} strokeWidth="2.2" strokeLinecap="round" />
      {/* legs — classic 4 pairs, bent */}
      <g stroke={fill} strokeWidth="2.6" strokeLinecap="round" fill="none">
        <path d="M24 18 C14 10 8 6 2 4" />
        <path d="M40 18 C50 10 56 6 62 4" />
        <path d="M22 26 C12 24 6 22 1 20" />
        <path d="M42 26 C52 24 58 22 63 20" />
        <path d="M22 36 C12 38 6 42 1 46" />
        <path d="M42 36 C52 38 58 42 63 46" />
        <path d="M24 46 C16 52 10 56 4 60" />
        <path d="M40 46 C48 52 54 56 60 60" />
      </g>
    </svg>
  );
};
