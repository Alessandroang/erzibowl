import React from 'react'

type PikachuSpriteProps = {
  width?: number
  height?: number
  flapKey?: number
  style?: React.CSSProperties
}

export default function PikachuSprite({ width = 34, height = 26, flapKey = 0, style }: PikachuSpriteProps) {
  const w = width
  const h = height
  return (
    <svg
      className="pikachu-svg"
      viewBox={`0 0 ${w} ${h}`}
      width={w}
      height={h}
      style={{ position: 'absolute', ...style }}
    >
      <defs>
        <linearGradient id="pkBody" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffd83b" />
          <stop offset="100%" stopColor="#e6c02f" />
        </linearGradient>
      </defs>
      <g>
        {/* body */}
        <ellipse cx={w * 0.46} cy={h * 0.62} rx={w * 0.32} ry={h * 0.24} fill="url(#pkBody)" stroke="#c7a126" strokeWidth={1} />
        {/* head */}
        <circle cx={w * 0.72} cy={h * 0.46} r={h * 0.16} fill="url(#pkBody)" stroke="#c7a126" strokeWidth={1} />
        {/* eyes */}
        <circle cx={w * 0.68} cy={h * 0.44} r={h * 0.03} fill="#222" />
        <circle cx={w * 0.76} cy={h * 0.44} r={h * 0.03} fill="#222" />
        {/* cheeks */}
        <circle cx={w * 0.66} cy={h * 0.52} r={h * 0.03} fill="#ff6b6b" />
        <circle cx={w * 0.78} cy={h * 0.52} r={h * 0.03} fill="#ff6b6b" />

        {/* ears (wiggle on tap) */}
        <g key={flapKey} className="ear ear-wiggle-tap">
          <polygon points={`${w * 0.64},${h * 0.30} ${w * 0.68},${h * 0.44} ${w * 0.58},${h * 0.40}`} fill="#ffd83b" stroke="#c7a126" strokeWidth={1} />
          <polygon points={`${w * 0.64},${h * 0.30} ${w * 0.60},${h * 0.36} ${w * 0.58},${h * 0.40}`} fill="#222" />
          <polygon points={`${w * 0.80},${h * 0.30} ${w * 0.76},${h * 0.44} ${w * 0.86},${h * 0.40}`} fill="#ffd83b" stroke="#c7a126" strokeWidth={1} />
          <polygon points={`${w * 0.80},${h * 0.30} ${w * 0.84},${h * 0.36} ${w * 0.86},${h * 0.40}`} fill="#222" />
        </g>

        {/* tail (zigzag) */}
        <path d={`M ${w * 0.24} ${h * 0.62} L ${w * 0.16} ${h * 0.56} L ${w * 0.18} ${h * 0.70} L ${w * 0.10} ${h * 0.66}`} stroke="#c7a126" strokeWidth={1.2} />
      </g>
    </svg>
  )
}