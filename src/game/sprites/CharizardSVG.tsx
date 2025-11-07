import React from 'react'

type CharizardSpriteProps = {
  width?: number
  height?: number
  flapKey?: number
  style?: React.CSSProperties
}

export default function CharizardSVG({ width = 34, height = 26, flapKey = 0, style }: CharizardSpriteProps) {
  const w = width
  const h = height
  return (
    <svg
      className="charizard-svg"
      viewBox={`0 0 ${w} ${h}`}
      width={w}
      height={h}
      style={{ position: 'absolute', ...style }}
    >
      <defs>
        <linearGradient id="czBody" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f28c28" />
          <stop offset="100%" stopColor="#d9731a" />
        </linearGradient>
        <linearGradient id="czWing" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4ea4a4" />
          <stop offset="100%" stopColor="#2c6b6b" />
        </linearGradient>
        <linearGradient id="czBelly" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f7d8a0" />
          <stop offset="100%" stopColor="#e8c27a" />
        </linearGradient>
        <linearGradient id="czFlame" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffd54f" />
          <stop offset="100%" stopColor="#ff6f00" />
        </linearGradient>
      </defs>
      <g>
        {/* body */}
        <ellipse cx={w * 0.45} cy={h * 0.6} rx={w * 0.34} ry={h * 0.26} fill="url(#czBody)" stroke="#b55b12" strokeWidth={1} />
        {/* belly */}
        <ellipse cx={w * 0.42} cy={h * 0.68} rx={w * 0.22} ry={h * 0.18} fill="url(#czBelly)" stroke="#c79b53" strokeWidth={0.7} />
        {/* head */}
        <circle cx={w * 0.72} cy={h * 0.42} r={h * 0.16} fill="url(#czBody)" stroke="#b55b12" strokeWidth={1} />
        {/* snout */}
        <polygon points={`${w * 0.82},${h * 0.42} ${w * 0.98},${h * 0.46} ${w * 0.82},${h * 0.52}`} fill="#f28c28" stroke="#b55b12" strokeWidth={1} />
        {/* eye */}
        <circle cx={w * 0.74} cy={h * 0.38} r={h * 0.035} fill="#fff" />
        <circle cx={w * 0.74} cy={h * 0.38} r={h * 0.02} fill="#222" />
        {/* horns */}
        <polygon points={`${w * 0.68},${h * 0.28} ${w * 0.72},${h * 0.36} ${w * 0.64},${h * 0.34}`} fill="#d9731a" />
        <polygon points={`${w * 0.78},${h * 0.28} ${w * 0.76},${h * 0.36} ${w * 0.84},${h * 0.34}`} fill="#d9731a" />

        {/* far wing (back) */}
        <path d={`M ${w * 0.30} ${h * 0.30} C ${w * 0.18} ${h * 0.00}, ${w * 0.05} ${h * 0.20}, ${w * 0.14} ${h * 0.36} L ${w * 0.10} ${h * 0.54} C ${w * 0.24} ${h * 0.48}, ${w * 0.28} ${h * 0.42}, ${w * 0.30} ${h * 0.30} Z`} fill="#2f7a7a" opacity={0.4} />

        {/* near wing (front) — flaps on tap */}
        <g key={flapKey} className="char-wing wing-flap-tap">
          <path d={`M ${w * 0.34} ${h * 0.32} C ${w * 0.22} ${h * 0.02}, ${w * 0.08} ${h * 0.22}, ${w * 0.18} ${h * 0.40} L ${w * 0.14} ${h * 0.58} C ${w * 0.28} ${h * 0.52}, ${w * 0.32} ${h * 0.44}, ${w * 0.34} ${h * 0.32} Z`} fill="url(#czWing)" stroke="#1f5454" strokeWidth={0.8} />
        </g>

        {/* tail + flame */}
        <path d={`M ${w * 0.18} ${h * 0.70} C ${w * 0.08} ${h * 0.62}, ${w * 0.06} ${h * 0.70}, ${w * 0.08} ${h * 0.78}`} fill="none" stroke="#b55b12" strokeWidth={1} />
        <path d={`M ${w * 0.06} ${h * 0.78} C ${w * 0.02} ${h * 0.72}, ${w * 0.02} ${h * 0.86}, ${w * 0.08} ${h * 0.84} C ${w * 0.04} ${h * 0.86}, ${w * 0.10} ${h * 0.90}, ${w * 0.12} ${h * 0.82} Z`} fill="url(#czFlame)" stroke="#ff6f00" strokeWidth={0.6} />
      </g>
    </svg>
  )
}