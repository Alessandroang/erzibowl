import React from 'react'

type PipeSpriteProps = {
  width?: number
  height: number
  flipped?: boolean
  style?: React.CSSProperties
}

export function PipeSprite({ width = 60, height, flipped = false, style }: PipeSpriteProps) {
  const capHeight = Math.min(24, Math.max(14, Math.round(width * 0.35)))
  return (
    <svg
      className="pipe-svg"
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
      style={{ position: 'absolute', transform: flipped ? 'scaleY(-1)' : undefined, ...style }}
    >
      <defs>
        <linearGradient id="pipeBody" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8bd34c" />
          <stop offset="100%" stopColor="#61a832" />
        </linearGradient>
        <linearGradient id="pipeCap" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#a8e063" />
          <stop offset="100%" stopColor="#65c75e" />
        </linearGradient>
      </defs>
      <rect x={0} y={capHeight} width={width} height={height - capHeight} fill="url(#pipeBody)" stroke="#4e8a2a" strokeWidth="2" />
      <rect x={-2} y={0} width={width + 4} height={capHeight} fill="url(#pipeCap)" stroke="#4e8a2a" strokeWidth="2" />
    </svg>
  )
}

export default PipeSprite