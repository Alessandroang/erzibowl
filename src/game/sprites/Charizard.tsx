import React from 'react'

type CharizardSpriteProps = {
  width?: number
  height?: number
  flapKey?: number
  style?: React.CSSProperties
}

export default function CharizardSprite({ width = 34, height = 26, flapKey = 0, style }: CharizardSpriteProps) {
  return (
    <img
      key={flapKey}
      className="charizard-img"
      src="/charizard.gif"
      alt="Charizard"
      width={width}
      height={height}
      style={{ position: 'absolute', ...style }}
    />
  )
}