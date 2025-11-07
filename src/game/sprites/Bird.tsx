import React from 'react'

type BirdSpriteProps = {
  width?: number
  height?: number
  style?: React.CSSProperties
}

export function BirdSprite({ width = 40, height = 30, style }: BirdSpriteProps) {
  const w = width
  const h = height
  return (
    <svg
      className="bird-svg"
      viewBox={`0 0 ${w} ${h}`}
      width={w}
      height={h}
      style={{
        position: 'absolute',
        ...style,
      }}
    >
      <defs>
        <linearGradient id="birdBody" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffce54" />
          <stop offset="100%" stopColor="#f6bb42" />
        </linearGradient>
        <linearGradient id="birdWing" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f9e2a8" />
          <stop offset="100%" stopColor="#e7c97e" />
        </linearGradient>
      </defs>
      <g>
        {/* Body */}
        <ellipse cx={w * 0.45} cy={h * 0.55} rx={w * 0.35} ry={h * 0.28} fill="url(#birdBody)" stroke="#cfa13a" strokeWidth="1" />
        {/* Head */}
        <circle cx={w * 0.75} cy={h * 0.42} r={h * 0.16} fill="url(#birdBody)" stroke="#cfa13a" strokeWidth="1" />
        {/* Eye */}
        <circle cx={w * 0.8} cy={h * 0.38} r={h * 0.05} fill="#fff" />
        <circle cx={w * 0.8} cy={h * 0.38} r={h * 0.03} fill="#333" />
        {/* Beak */}
        <polygon points={`${w * 0.88},${h * 0.42} ${w * 1.0},${h * 0.45} ${w * 0.88},${h * 0.5}`} fill="#f6a623" stroke="#d48813" strokeWidth="1" />
        {/* Wing */}
        <g className="wing">
          <path d={`M ${w * 0.38} ${h * 0.42} C ${w * 0.28} ${h * 0.52}, ${w * 0.28} ${h * 0.75}, ${w * 0.38} ${h * 0.82} C ${w * 0.52} ${h * 0.82}, ${w * 0.52} ${h * 0.55}, ${w * 0.38} ${h * 0.42} Z`} fill="url(#birdWing)" stroke="#cfa13a" strokeWidth="1" />
        </g>
        {/* Tail */}
        <polygon points={`${w * 0.18},${h * 0.5} ${w * 0.05},${h * 0.45} ${w * 0.05},${h * 0.6}`} fill="#e7c97e" stroke="#cfa13a" strokeWidth="1" />
      </g>
    </svg>
  )
}

export default BirdSprite