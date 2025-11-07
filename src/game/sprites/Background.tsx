import React from 'react'

type BackgroundProps = {
  style?: React.CSSProperties
  variant?: 'day' | 'sunset' | 'night'
}

export default function Background({ style, variant = 'day' }: BackgroundProps) {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 800 450"
      preserveAspectRatio="none"
      style={{ position: 'absolute', inset: 0, zIndex: 1, ...style }}
    >
      <defs>
        <linearGradient id="skyDay" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#a2d9ff" />
          <stop offset="100%" stopColor="#e6f7ff" />
        </linearGradient>
        <linearGradient id="skySunset" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffb199" />
          <stop offset="100%" stopColor="#ffd6a5" />
        </linearGradient>
        <linearGradient id="skyNight" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0d1b2a" />
          <stop offset="100%" stopColor="#1b263b" />
        </linearGradient>
      </defs>
      {/* Sky fill and scenery variants */}
      {variant === 'day' && (
        <g>
          <rect x="0" y="0" width="800" height="450" fill="url(#skyDay)" />
          <g fill="#b6d7a8" opacity="0.7">
            <path d="M0 300 L80 240 L140 280 L200 220 L260 270 L320 230 L380 280 L440 240 L500 290 L560 250 L620 300 L680 260 L740 310 L800 270 L800 450 L0 450 Z" />
          </g>
          <g fill="#93c47d" opacity="0.9">
            <path d="M0 340 Q50 320 90 340 T180 340 T270 340 T360 340 T450 340 T540 340 T630 340 T720 340 T800 340 L800 450 L0 450 Z" />
          </g>
          <g fill="#a4c2f4" opacity="0.35">
            <rect x="60" y="270" width="40" height="90" />
            <rect x="110" y="250" width="55" height="110" />
            <rect x="180" y="290" width="45" height="70" />
            <rect x="240" y="260" width="70" height="100" />
            <rect x="330" y="275" width="50" height="85" />
            <rect x="390" y="245" width="80" height="115" />
            <rect x="490" y="280" width="60" height="80" />
            <rect x="560" y="260" width="70" height="100" />
            <rect x="640" y="290" width="50" height="70" />
          </g>
        </g>
      )}
      {variant === 'sunset' && (
        <g>
          <rect x="0" y="0" width="800" height="450" fill="url(#skySunset)" />
          <g fill="#d9a8ff" opacity="0.6">
            <path d="M0 300 L80 240 L140 280 L200 220 L260 270 L320 230 L380 280 L440 240 L500 290 L560 250 L620 300 L680 260 L740 310 L800 270 L800 450 L0 450 Z" />
          </g>
          <g fill="#f7b267" opacity="0.9">
            <path d="M0 340 Q50 320 90 340 T180 340 T270 340 T360 340 T450 340 T540 340 T630 340 T720 340 T800 340 L800 450 L0 450 Z" />
          </g>
          <g fill="#774936" opacity="0.4">
            <rect x="60" y="270" width="40" height="90" />
            <rect x="110" y="250" width="55" height="110" />
            <rect x="180" y="290" width="45" height="70" />
            <rect x="240" y="260" width="70" height="100" />
            <rect x="330" y="275" width="50" height="85" />
            <rect x="390" y="245" width="80" height="115" />
            <rect x="490" y="280" width="60" height="80" />
            <rect x="560" y="260" width="70" height="100" />
            <rect x="640" y="290" width="50" height="70" />
          </g>
        </g>
      )}
      {variant === 'night' && (
        <g>
          <rect x="0" y="0" width="800" height="450" fill="url(#skyNight)" />
          {/* Moon */}
          <circle cx="680" cy="100" r="30" fill="#fff8e1" opacity="0.9" />
          {/* Stars */}
          <g fill="#eaeff7" opacity="0.9">
            <circle cx="100" cy="60" r="2" />
            <circle cx="200" cy="90" r="1.5" />
            <circle cx="300" cy="40" r="2" />
            <circle cx="420" cy="80" r="1.5" />
            <circle cx="520" cy="50" r="2" />
            <circle cx="600" cy="70" r="1.8" />
          </g>
          <g fill="#4f6d7a" opacity="0.7">
            <path d="M0 300 L80 240 L140 280 L200 220 L260 270 L320 230 L380 280 L440 240 L500 290 L560 250 L620 300 L680 260 L740 310 L800 270 L800 450 L0 450 Z" />
          </g>
          <g fill="#3b4d61" opacity="0.9">
            <path d="M0 340 Q50 320 90 340 T180 340 T270 340 T360 340 T450 340 T540 340 T630 340 T720 340 T800 340 L800 450 L0 450 Z" />
          </g>
          <g fill="#2b3a42" opacity="0.5">
            <rect x="60" y="270" width="40" height="90" />
            <rect x="110" y="250" width="55" height="110" />
            <rect x="180" y="290" width="45" height="70" />
            <rect x="240" y="260" width="70" height="100" />
            <rect x="330" y="275" width="50" height="85" />
            <rect x="390" y="245" width="80" height="115" />
            <rect x="490" y="280" width="60" height="80" />
            <rect x="560" y="260" width="70" height="100" />
            <rect x="640" y="290" width="50" height="70" />
          </g>
        </g>
      )}
    </svg>
  )
}