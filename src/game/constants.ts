export const GAME_WIDTH = 420
export const GAME_HEIGHT = 640
export const GROUND_HEIGHT = 100
export const SCROLL_SPEED = 120 // px per secondo
export const PIPE_WIDTH = 60
export const PIPE_GAP_HEIGHT = 160
export const PIPE_SPACING_MIN = 260
export const PIPE_SPACING_VARIANCE = 180
export const BIRD_X = 100
export const BIRD_WIDTH = 34
export const BIRD_HEIGHT = 26
export const GRAVITY = 900 // px/s^2
export const JUMP_IMPULSE = 280 // px/s
export const CLOUD_SPEED = 30
export const CLOUD_COUNT = 4
export const COLLISION_MARGIN = 4

export type DifficultyKey = 'easy' | 'normal' | 'hard'
export type GameSettings = {
  scrollSpeed: number
  gapHeight: number
  pipeSpacingMin: number
  pipeSpacingVar: number
  gravity: number
  jumpImpulse: number
}

export const DIFFICULTIES: Record<DifficultyKey, GameSettings> = {
  easy: {
    scrollSpeed: SCROLL_SPEED - 20,
    gapHeight: PIPE_GAP_HEIGHT + 40,
    pipeSpacingMin: PIPE_SPACING_MIN + 40,
    pipeSpacingVar: PIPE_SPACING_VARIANCE,
    gravity: GRAVITY * 0.95,
    jumpImpulse: JUMP_IMPULSE * 1.05,
  },
  normal: {
    scrollSpeed: SCROLL_SPEED,
    gapHeight: PIPE_GAP_HEIGHT,
    pipeSpacingMin: PIPE_SPACING_MIN,
    pipeSpacingVar: PIPE_SPACING_VARIANCE,
    gravity: GRAVITY,
    jumpImpulse: JUMP_IMPULSE,
  },
  hard: {
    scrollSpeed: SCROLL_SPEED + 20,
    gapHeight: PIPE_GAP_HEIGHT - 40,
    pipeSpacingMin: PIPE_SPACING_MIN - 40,
    pipeSpacingVar: PIPE_SPACING_VARIANCE + 40,
    gravity: GRAVITY * 1.05,
    jumpImpulse: JUMP_IMPULSE * 0.95,
  },
}

export function getEffectiveSettings(base: GameSettings, score: number): GameSettings {
  const speedInc = Math.min(40, score * 1.2)
  const gapDec = Math.min(50, score * 2)
  const spacingDec = Math.min(50, score * 1)
  return {
    scrollSpeed: base.scrollSpeed + speedInc,
    gapHeight: Math.max(100, base.gapHeight - gapDec),
    pipeSpacingMin: Math.max(180, base.pipeSpacingMin - spacingDec),
    pipeSpacingVar: base.pipeSpacingVar,
    gravity: base.gravity,
    jumpImpulse: base.jumpImpulse,
  }
}