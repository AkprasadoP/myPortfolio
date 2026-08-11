/**
 * Classic Spider-Man chest emblem — filled black spider silhouette.
 * Used in chrome, crawl mascots, and as a compact brand mark.
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

/**
 * Mini Spider-Man mask head for crawl/scroll mascots.
 */
export const SpideyMaskMini = ({ size = 28, className = "" }) => {
  const uid = `mini-${size}`;
  return (
    <svg
      width={size}
      height={size * 0.95}
      viewBox="0 0 48 46"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <defs>
        <radialGradient id={`${uid}-red`} cx="50%" cy="35%" r="70%">
          <stop offset="0%" stopColor="#ff4a42" />
          <stop offset="70%" stopColor="#e62429" />
          <stop offset="100%" stopColor="#9e1218" />
        </radialGradient>
      </defs>
      <ellipse
        cx="24"
        cy="24"
        rx="20"
        ry="20"
        fill={`url(#${uid}-red)`}
        stroke="#0a0a0c"
        strokeWidth="2.4"
      />
      {/* web spokes */}
      <g stroke="#0a0a0c" strokeWidth="1.1" fill="none" opacity="0.9">
        <path d="M24 6 V24" />
        <path d="M24 6 C18 14 16 20 16 24" />
        <path d="M24 6 C30 14 32 20 32 24" />
        <path d="M10 16 C16 18 20 20 24 20 C28 20 32 18 38 16" />
        <path d="M8 24 C14 22 19 21 24 21 C29 21 34 22 40 24" />
      </g>
      {/* eyes */}
      <path
        d="M8 26 C10 16 20 12 24 16 C26 18 25 24 20 28 C15 31 9 30 8 26 Z"
        fill="#fff"
        stroke="#0a0a0c"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M40 26 C38 16 28 12 24 16 C22 18 23 24 28 28 C33 31 39 30 40 26 Z"
        fill="#fff"
        stroke="#0a0a0c"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
};
