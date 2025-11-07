import React from 'react'

type JigglypuffSpriteProps = {
  width?: number
  height?: number
  flapKey?: number
  style?: React.CSSProperties
}

export default function JigglypuffSprite({ width = 34, height = 26, flapKey = 0, style }: JigglypuffSpriteProps) {
  const w = width
  const h = height
  return (
    <svg
      className="jigglypuff-svg"
      viewBox={`0 0 ${w} ${h}`}
      width={w}
      height={h}
      style={{ position: 'absolute', ...style }}
    >
      <defs>
        <linearGradient id="jpBody" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f8a8c8" />
          <stop offset="100%" stopColor="#e688b2" />
        </linearGradient>
      </defs>
      <g className="puff puff-bounce-tap" key={flapKey}>
        {/* body */}
        <circle cx={w * 0.50} cy={h * 0.56} r={Math.min(w, h) * 0.35} fill="url(#jpBody)" stroke="#bd6c91" strokeWidth={1} />
        {/* tuft */}
        <path d={`M ${w * 0.52} ${h * 0.30} C ${w * 0.56} ${h * 0.22}, ${w * 0.42} ${h * 0.18}, ${w * 0.44} ${h * 0.28}`} fill="#f8a8c8" stroke="#bd6c91" strokeWidth={0.8} />
        {/* ears */}
        <polygon points={`${w * 0.36},${h * 0.36} ${w * 0.42},${h * 0.48} ${w * 0.30},${h * 0.48}`} fill="#f8a8c8" stroke="#bd6c91" strokeWidth={0.8} />
        <polygon points={`${w * 0.64},${h * 0.36} ${w * 0.58},${h * 0.48} ${w * 0.70},${h * 0.48}`} fill="#f8a8c8" stroke="#bd6c91" strokeWidth={0.8} />
        {/* eyes */}
        <circle cx={w * 0.44} cy={h * 0.58} r={h * 0.045} fill="#1b3c59" />
        <circle cx={w * 0.56} cy={h * 0.58} r={h * 0.045} fill="#1b3c59" />
        {/* mouth */}
        <path d={`M ${w * 0.48} ${h * 0.70} Q ${w * 0.50} ${h * 0.72}, ${w * 0.52} ${h * 0.70}`} stroke="#1b3c59" strokeWidth={0.8} fill="none" />
      </g>
    </svg>
  )
}