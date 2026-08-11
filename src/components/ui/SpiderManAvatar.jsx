/**
 * Classic Spider-Man mask — dense radial webbing, oversized angular lenses,
 * and a black forehead spider emblem. Reads as Spidey at a glance.
 */
export const SpiderManAvatar = ({ size = 200, className = "" }) => {
  return (
    <svg
      width={size}
      height={size * 0.95}
      viewBox="0 0 220 210"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <defs>
        <radialGradient id="mask-red" cx="50%" cy="32%" r="78%">
          <stop offset="0%" stopColor="#ff5c54" />
          <stop offset="45%" stopColor="#e62429" />
          <stop offset="100%" stopColor="#8f1016" />
        </radialGradient>
        <radialGradient id="lens-glow" cx="40%" cy="35%" r="70%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="55%" stopColor="#e8f0ff" />
          <stop offset="100%" stopColor="#9db8ff" />
        </radialGradient>
      </defs>

      {/* mask shell */}
      <path
        d="M110 8 C54 8 18 50 18 102 C18 158 60 200 110 200 C160 200 202 158 202 102 C202 50 166 8 110 8 Z"
        fill="url(#mask-red)"
        stroke="#0a0a0c"
        strokeWidth="5.5"
      />

      {/* dense classic webbing — spokes from forehead center */}
      <g stroke="#0a0a0c" strokeWidth="2.4" fill="none" strokeLinecap="round">
        <path d="M110 14 V96" />
        <path d="M110 14 C88 40 76 66 72 96" />
        <path d="M110 14 C132 40 144 66 148 96" />
        <path d="M110 14 C70 34 48 58 40 88" />
        <path d="M110 14 C150 34 172 58 180 88" />
        <path d="M110 14 C58 28 36 48 28 72" />
        <path d="M110 14 C162 28 184 48 192 72" />
      </g>

      {/* concentric web arcs */}
      <g stroke="#0a0a0c" strokeWidth="2.2" fill="none">
        <path d="M52 36 C72 28 92 24 110 24 C128 24 148 28 168 36" />
        <path d="M36 58 C58 46 84 40 110 40 C136 40 162 46 184 58" />
        <path d="M26 82 C52 68 80 62 110 62 C140 62 168 68 194 82" />
        <path d="M24 104 C54 90 82 84 110 84 C138 84 166 90 196 104" />
        <path d="M28 126 C56 116 84 112 110 112 C136 112 164 116 192 126" />
        <path d="M40 152 C68 144 90 142 110 142 C130 142 152 144 180 152" />
        <path d="M58 174 C80 168 96 166 110 166 C124 166 140 168 162 174" />
      </g>

      {/* lower cheek / jaw web crosses */}
      <g stroke="#0a0a0c" strokeWidth="2" fill="none" opacity="0.85">
        <path d="M48 140 L70 168 M70 140 L48 168" />
        <path d="M172 140 L150 168 M150 140 L172 168" />
        <path d="M90 178 C100 172 110 170 120 172 C130 174 138 178 146 184" />
      </g>

      {/* LEFT eye — classic large angular lens */}
      <path
        d="M22 118
           C28 62 88 42 114 62
           C128 72 126 104 98 122
           C72 138 36 136 22 118 Z"
        fill="url(#lens-glow)"
        stroke="#0a0a0c"
        strokeWidth="6"
        strokeLinejoin="round"
      />
      {/* RIGHT eye */}
      <path
        d="M198 118
           C192 62 132 42 106 62
           C92 72 94 104 122 122
           C148 138 184 136 198 118 Z"
        fill="url(#lens-glow)"
        stroke="#0a0a0c"
        strokeWidth="6"
        strokeLinejoin="round"
      />

      {/* lens inner rim shadow */}
      <path
        d="M36 112 C42 74 80 58 102 70 C112 76 112 96 96 110 C80 122 48 120 36 112 Z"
        fill="#1f75fe"
        opacity="0.18"
      />
      <path
        d="M184 112 C178 74 140 58 118 70 C108 76 108 96 124 110 C140 122 172 120 184 112 Z"
        fill="#1f75fe"
        opacity="0.18"
      />

      {/* forehead spider emblem (filled) */}
      <g fill="#0a0a0c">
        <ellipse cx="110" cy="48" rx="5.5" ry="7" />
        <ellipse cx="110" cy="38" rx="4" ry="4.5" />
        <g stroke="#0a0a0c" strokeWidth="2" strokeLinecap="round" fill="none">
          <path d="M106 34 L103 28 M114 34 L117 28" />
          <path d="M106 40 C98 36 92 32 86 28" />
          <path d="M114 40 C122 36 128 32 134 28" />
          <path d="M105 46 C96 46 90 48 84 52" />
          <path d="M115 46 C124 46 130 48 136 52" />
          <path d="M105 52 C96 56 90 62 86 68" />
          <path d="M115 52 C124 56 130 62 134 68" />
        </g>
      </g>
    </svg>
  );
};
