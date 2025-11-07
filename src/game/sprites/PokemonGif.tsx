import React from 'react'

type PokemonGifProps = {
  src: string
  alt?: string
  width?: number
  height?: number
  flapKey?: number
  style?: React.CSSProperties
}

export default function PokemonGif({ src, alt = 'Pokemon', width = 34, height = 26, flapKey = 0, style }: PokemonGifProps) {
  return (
    <img
      key={flapKey}
      className="pokemon-gif"
      src={src}
      alt={alt}
      width={width}
      height={height}
      draggable={false}
      style={{ position: 'absolute', ...style }}
    />
  )
}