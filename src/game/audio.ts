let ctx: AudioContext | null = null

function ensureCtx() {
  if (!ctx) ctx = new (window.AudioContext || (window as any).webkitAudioContext)()
}

function beep(freq: number, duration: number, type: OscillatorType = 'sine', gain = 0.05) {
  try {
    ensureCtx()
    if (!ctx) return
    const osc = ctx.createOscillator()
    const g = ctx.createGain()
    osc.type = type
    osc.frequency.value = freq
    g.gain.value = gain
    osc.connect(g)
    g.connect(ctx.destination)
    osc.start()
    setTimeout(() => osc.stop(), duration)
  } catch {}
}

export function playJump() {
  beep(800, 120, 'square', 0.04)
}

export function playScore() {
  beep(1200, 150, 'triangle', 0.05)
}

export function playHit() {
  beep(200, 200, 'sawtooth', 0.07)
}