/**
 * Stylized Spider-Man in a web-swing pose — dense suit webbing, classic
 * angular lenses, blue under-suit panels, and a filled chest spider emblem.
 */
export const SpiderFigure = ({ width = 250, height = 370, className = "" }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 260 380"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <defs>
        <radialGradient id="fig-red" cx="50%" cy="28%" r="85%">
          <stop offset="0%" stopColor="#ff5a52" />
          <stop offset="50%" stopColor="#e62429" />
          <stop offset="100%" stopColor="#9a1218" />
        </radialGradient>
        <linearGradient id="fig-blue" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#4a92ff" />
          <stop offset="100%" stopColor="#123f8f" />
        </linearGradient>
        <pattern
          id="suit-web"
          width="14"
          height="12"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(0)"
        >
          <path
            d="M0 6 H14 M7 0 V12"
            stroke="#0a0a0c"
            strokeWidth="1.1"
            opacity="0.55"
          />
          <path
            d="M0 0 L14 12 M14 0 L0 12"
            stroke="#0a0a0c"
            strokeWidth="0.7"
            opacity="0.35"
          />
        </pattern>
      </defs>

      {/* web lines held overhead */}
      <g stroke="#f2f2f0" fill="none" strokeLinecap="round">
        <path d="M4 0 C42 28 64 64 86 118" strokeWidth="2.4" opacity="0.75" />
        <path d="M256 0 C218 28 196 64 174 118" strokeWidth="2.4" opacity="0.75" />
        <path d="M18 18 C40 40 58 70 78 100" strokeWidth="1.2" opacity="0.35" />
        <path d="M242 18 C220 40 202 70 182 100" strokeWidth="1.2" opacity="0.35" />
        {/* web strands branching */}
        <path d="M40 40 C52 52 60 66 70 84" strokeWidth="1" opacity="0.25" />
        <path d="M220 40 C208 52 200 66 190 84" strokeWidth="1" opacity="0.25" />
      </g>

      {/* hands gripping webs */}
      <g stroke="#0a0a0c" strokeWidth="3.2" strokeLinejoin="round">
        <circle cx="88" cy="120" r="13" fill="url(#fig-red)" />
        <circle cx="172" cy="120" r="13" fill="url(#fig-red)" />
        {/* web-shooter wrist bands */}
        <rect x="80" y="128" width="16" height="5" rx="1" fill="#0a0a0c" />
        <rect x="164" y="128" width="16" height="5" rx="1" fill="#0a0a0c" />
      </g>

      {/* blue arms */}
      <path
        d="M86 122 C96 152 104 170 110 192 L132 196 C128 168 118 146 98 128 Z"
        fill="url(#fig-blue)"
        stroke="#0a0a0c"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      <path
        d="M174 122 C164 152 156 170 150 192 L128 196 C132 168 142 146 162 128 Z"
        fill="url(#fig-blue)"
        stroke="#0a0a0c"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      {/* arm webbing hint */}
      <g stroke="#0a0a0c" strokeWidth="1.4" fill="none" opacity="0.45">
        <path d="M96 140 C104 152 108 164 110 176" />
        <path d="M164 140 C156 152 152 164 150 176" />
      </g>

      {/* head / mask */}
      <path
        d="M130 110 C104 110 94 128 94 154 C94 180 108 194 130 194 C152 194 166 180 166 154 C166 128 156 110 130 110 Z"
        fill="url(#fig-red)"
        stroke="#0a0a0c"
        strokeWidth="4"
      />
      {/* head webbing */}
      <g stroke="#0a0a0c" strokeWidth="1.8" fill="none">
        <path d="M130 112 V154" />
        <path d="M130 112 C118 128 114 140 114 154" />
        <path d="M130 112 C142 128 146 140 146 154" />
        <path d="M106 128 C116 122 124 120 130 120 C136 120 144 122 154 128" />
        <path d="M100 146 C114 138 124 136 130 136 C136 136 146 138 160 146" />
      </g>

      {/* classic white lenses */}
      <path
        d="M126 144 C126 124 104 116 92 130 C82 142 84 162 100 174 C114 182 128 176 132 162 C134 156 132 150 126 144 Z"
        fill="#ffffff"
        stroke="#0a0a0c"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <path
        d="M134 144 C134 124 156 116 168 130 C178 142 176 162 160 174 C146 182 132 176 128 162 C126 156 128 150 134 144 Z"
        fill="#ffffff"
        stroke="#0a0a0c"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <path
        d="M108 138 c7 -8 14 -8 18 -3 c-7 2 -12 5 -16 9 z"
        fill="#1f75fe"
        opacity="0.25"
      />
      <path
        d="M152 138 c-7 -8 -14 -8 -18 -3 c7 2 12 5 16 9 z"
        fill="#1f75fe"
        opacity="0.25"
      />

      {/* torso */}
      <path
        d="M104 192 C88 198 86 224 90 246 C94 268 104 278 118 278 C124 278 128 274 128 262 L130 262 L132 262 C132 274 136 278 142 278 C156 278 166 268 170 246 C174 224 172 198 156 192 C150 188 142 188 136 192 L130 196 L124 192 C118 188 110 188 104 192 Z"
        fill="url(#fig-red)"
        stroke="#0a0a0c"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      {/* suit web pattern overlay on torso */}
      <path
        d="M104 192 C88 198 86 224 90 246 C94 268 104 278 118 278 C124 278 128 274 128 262 L130 262 L132 262 C132 274 136 278 142 278 C156 278 166 268 170 246 C174 224 172 198 156 192 C150 188 142 188 136 192 L130 196 L124 192 C118 188 110 188 104 192 Z"
        fill="url(#suit-web)"
        opacity="0.85"
      />

      {/* blue side panels */}
      <path
        d="M102 198 C92 214 90 232 92 248 C100 232 108 216 114 204 Z"
        fill="url(#fig-blue)"
        stroke="#0a0a0c"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path
        d="M158 198 C168 214 170 232 168 248 C160 232 152 216 146 204 Z"
        fill="url(#fig-blue)"
        stroke="#0a0a0c"
        strokeWidth="3"
        strokeLinejoin="round"
      />

      {/* filled chest spider emblem */}
      <g transform="translate(130 232) scale(0.72)">
        <ellipse cx="0" cy="4" rx="7" ry="9" fill="#0a0a0c" />
        <ellipse cx="0" cy="-6" rx="5" ry="5.5" fill="#0a0a0c" />
        <g stroke="#0a0a0c" strokeWidth="2.4" strokeLinecap="round" fill="none">
          <path d="M-3 -10 L-5 -15 M3 -10 L5 -15" />
          <path d="M-4 -4 C-12 -8 -18 -12 -24 -14" />
          <path d="M4 -4 C12 -8 18 -12 24 -14" />
          <path d="M-5 2 C-14 2 -20 4 -26 8" />
          <path d="M5 2 C14 2 20 4 26 8" />
          <path d="M-5 8 C-14 12 -20 18 -24 24" />
          <path d="M5 8 C14 12 20 18 24 24" />
          <path d="M-3 14 C-10 20 -14 24 -18 28" />
          <path d="M3 14 C10 20 14 24 18 28" />
        </g>
      </g>

      {/* blue legs */}
      <path
        d="M118 272 C110 284 108 298 110 314 L114 322 C116 330 118 338 120 344 L140 344 C142 338 144 330 146 322 L150 314 C152 298 150 284 142 272 Z"
        fill="url(#fig-blue)"
        stroke="#0a0a0c"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      <path d="M130 274 V342" stroke="#0a0a0c" strokeWidth="3" />
      {/* leg webbing */}
      <g stroke="#0a0a0c" strokeWidth="1.4" fill="none" opacity="0.5">
        <path d="M118 290 H142 M116 306 H144 M118 322 H142" />
      </g>

      {/* red boots */}
      <path
        d="M110 312 C100 322 98 338 104 354 L120 360 L126 342 C124 332 120 322 116 314 Z"
        fill="url(#fig-red)"
        stroke="#0a0a0c"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      <path
        d="M150 312 C160 322 162 338 156 354 L140 360 L134 342 C136 332 140 322 144 314 Z"
        fill="url(#fig-red)"
        stroke="#0a0a0c"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      <g stroke="#0a0a0c" strokeWidth="1.6" fill="none" opacity="0.75">
        <path d="M114 328 C122 324 128 324 134 328 M116 338 C124 334 130 334 136 338" />
        <path d="M146 328 C138 324 132 324 126 328 M144 338 C136 334 130 334 124 338" />
      </g>
    </svg>
  );
};
