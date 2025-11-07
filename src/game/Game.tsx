import { useEffect, useRef, useState } from 'react'
import './Game.css'
import {
  GAME_WIDTH,
  GAME_HEIGHT,
  GROUND_HEIGHT,
  PIPE_WIDTH,
  BIRD_X,
  BIRD_WIDTH,
  BIRD_HEIGHT,
  CLOUD_SPEED,
  CLOUD_COUNT,
  COLLISION_MARGIN,
  DIFFICULTIES,
  type DifficultyKey,
  getEffectiveSettings,
} from './constants'
import { useGameLoop } from './useGameLoop'
import { playHit, playJump, playScore } from './audio'
import Background from './sprites/Background'
import PokemonGif from './sprites/PokemonGif'
import PipeSprite from './sprites/Pipe'

type Obstacle = { id: number; x: number; gapY: number }
type Cloud = { id: number; x: number; y: number; scale: number }

export function Game() {
  const [bgOffset, setBgOffset] = useState(0)
  const [difficulty, setDifficulty] = useState<DifficultyKey>('normal')
  const settings = DIFFICULTIES[difficulty]

  function createObstacle(i: number, set: typeof settings, startX?: number): Obstacle {
    const gapYMin = 120
    const gapYMax = GAME_HEIGHT - GROUND_HEIGHT - 120 - set.gapHeight
    return {
      id: i,
      x:
        startX ?? GAME_WIDTH + i * (set.pipeSpacingMin + Math.random() * set.pipeSpacingVar),
      gapY: Math.floor(gapYMin + Math.random() * (gapYMax - gapYMin)),
    }
  }

  const [obstacles, setObstacles] = useState<Obstacle[]>(() => [
    createObstacle(0, settings, GAME_WIDTH + 100),
    createObstacle(1, settings, GAME_WIDTH + 100 + settings.pipeSpacingMin),
    createObstacle(2, settings, GAME_WIDTH + 100 + settings.pipeSpacingMin * 2),
  ])
  const [birdY, setBirdY] = useState(GAME_HEIGHT * 0.5)
  const [birdVY, setBirdVY] = useState(0)
  const [score, setScore] = useState(0)
  const effective = getEffectiveSettings(settings, score)
  const [nextScoreId, setNextScoreId] = useState(0)
  const [flapKey, setFlapKey] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [isGameOver, setIsGameOver] = useState(false)
  const [isStarted, setIsStarted] = useState(false)
  const [bestScore, setBestScore] = useState<number>(() => {
    const v = localStorage.getItem('bestScore')
    return v ? parseInt(v, 10) || 0 : 0
  })
  const [character, setCharacter] = useState<'charizard' | 'pikachu' | 'jigglypuff'>(() => {
    const v = localStorage.getItem('character')
    const vv = v ? v.toLowerCase() : null
    const allowed = ['charizard', 'pikachu', 'jigglypuff'] as const
    return (allowed as readonly string[]).includes(vv || '') ? (vv as typeof allowed[number]) : 'charizard'
  })
  const rootRef = useRef<HTMLDivElement | null>(null)
  const [clouds, setClouds] = useState<Cloud[]>(() => {
    const arr: Cloud[] = []
    for (let i = 0; i < CLOUD_COUNT; i++) {
      arr.push({
        id: i,
        x: Math.random() * GAME_WIDTH,
        y: 40 + Math.random() * (GAME_HEIGHT - GROUND_HEIGHT - 120),
        scale: 0.8 + Math.random() * 0.6,
      })
    }
    return arr
  })

  function startGame() {
    setIsStarted(true)
    setIsRunning(true)
    setIsGameOver(false)
  }

  function jump() {
    if (!isStarted) {
      startGame()
    }
    if (!isRunning || isGameOver) return
    setBirdVY(-settings.jumpImpulse)
    setFlapKey((k) => k + 1)
    playJump()
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'ArrowUp') {
        e.preventDefault()
        jump()
      } else if (e.code === 'KeyR') {
        e.preventDefault()
        restart()
      } else if (e.code === 'KeyP') {
        e.preventDefault()
        setIsRunning((r) => !r)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isRunning, isGameOver])

  useEffect(() => {
    const el = rootRef.current
    if (!el) return
    const onPointer = (e: PointerEvent) => {
      e.preventDefault()
      if (!isStarted) return
      jump()
    }
    el.addEventListener('pointerdown', onPointer)
    return () => el.removeEventListener('pointerdown', onPointer)
  }, [rootRef.current, isRunning, isGameOver, isStarted])

  useGameLoop((dt) => {
    if (!isRunning || isGameOver) return

    setBgOffset((prev) => {
      const next = prev + effective.scrollSpeed * dt
      const loopW = GAME_WIDTH
      return next >= loopW ? next - loopW : next
    })

    setObstacles((prev) =>
      prev.map((o) => {
        let x = o.x - effective.scrollSpeed * dt
        if (x + PIPE_WIDTH < 0) {
          const lastX = Math.max(...prev.map((p) => p.x))
          x =
            Math.max(GAME_WIDTH, lastX) +
            effective.pipeSpacingMin +
            Math.random() * effective.pipeSpacingVar
          return createObstacle(o.id, effective, x)
        }
        return { ...o, x }
      }),
    )

    // Bird physics
    setBirdVY((vy) => vy + settings.gravity * dt)
    setBirdY((y) => {
      let ny = y + birdVY * dt
      const floor = GAME_HEIGHT - GROUND_HEIGHT - BIRD_HEIGHT / 2
      if (ny > floor) ny = floor
      if (ny < BIRD_HEIGHT / 2) ny = BIRD_HEIGHT / 2
      return ny
    })

    // Clouds parallax
    setClouds((prev) =>
      prev.map((c) => {
        let x = c.x - CLOUD_SPEED * dt
        if (x + 60 < 0) {
          x = GAME_WIDTH + Math.random() * 100
        }
        return { ...c, x }
      }),
    )

    // Scoring: when passing obstacle center beyond bird X and not yet scored
    setScore((s) => {
      const nextObs = obstacles.find((o) => o.id === nextScoreId)
      if (nextObs && nextObs.x + PIPE_WIDTH < BIRD_X) {
        setNextScoreId((id) => (id + 1) % obstacles.length)
        playScore()
        return s + 1
      }
      return s
    })

    // Collisions
    const birdRect = {
      x: BIRD_X + COLLISION_MARGIN,
      y: birdY - BIRD_HEIGHT / 2 + COLLISION_MARGIN,
      w: BIRD_WIDTH - COLLISION_MARGIN * 2,
      h: BIRD_HEIGHT - COLLISION_MARGIN * 2,
    }
    const hit = obstacles.some((o) => {
      const topRect = { x: o.x, y: 0, w: PIPE_WIDTH, h: o.gapY }
      const bottomHeight = GAME_HEIGHT - GROUND_HEIGHT - o.gapY - effective.gapHeight
      const bottomRect = {
        x: o.x,
        y: GAME_HEIGHT - GROUND_HEIGHT - bottomHeight,
        w: PIPE_WIDTH,
        h: bottomHeight,
      }
      return intersects(birdRect, topRect) || intersects(birdRect, bottomRect)
    })
    const floorY = GAME_HEIGHT - GROUND_HEIGHT - BIRD_HEIGHT / 2
    if (hit || birdY >= floorY) {
      setIsGameOver(true)
      setIsRunning(false)
      playHit()
      setBestScore((prev) => {
        const next = Math.max(prev, score)
        localStorage.setItem('bestScore', String(next))
        return next
      })
    }
  })

  function intersects(a: { x: number; y: number; w: number; h: number }, b: { x: number; y: number; w: number; h: number }) {
    const ax1 = a.x, ay1 = a.y
    const ax2 = ax1 + a.w, ay2 = ay1 + a.h
    const bx1 = b.x, by1 = b.y
    const bx2 = bx1 + b.w, by2 = by1 + b.h
    return ax1 < bx2 && ax2 > bx1 && ay1 < by2 && ay2 > by1
  }

  function restart() {
    setBgOffset(0)
    setObstacles([
      createObstacle(0, settings, GAME_WIDTH + 100),
      createObstacle(1, settings, GAME_WIDTH + 100 + settings.pipeSpacingMin),
      createObstacle(2, settings, GAME_WIDTH + 100 + settings.pipeSpacingMin * 2),
    ])
    setBirdY(GAME_HEIGHT * 0.5)
    setBirdVY(0)
    setScore(0)
    setNextScoreId(0)
    setIsGameOver(false)
    setIsStarted(false)
    setIsRunning(false)
  }

  function setDiff(d: DifficultyKey) {
    setDifficulty(d)
    // Recreate obstacles to reflect spacing on change
    setObstacles([
      createObstacle(0, DIFFICULTIES[d], GAME_WIDTH + 100),
      createObstacle(1, DIFFICULTIES[d], GAME_WIDTH + 100 + DIFFICULTIES[d].pipeSpacingMin),
      createObstacle(2, DIFFICULTIES[d], GAME_WIDTH + 100 + DIFFICULTIES[d].pipeSpacingMin * 2),
    ])
    setBirdY(GAME_HEIGHT * 0.5)
    setBirdVY(0)
  }

  function setChar(c: 'charizard' | 'pikachu' | 'jigglypuff') {
    setCharacter(c)
    localStorage.setItem('character', c)
  }

  function resetCharacter() {
    localStorage.removeItem('character')
    setCharacter('charizard')
  }

  function resetBest() {
    localStorage.removeItem('bestScore')
    setBestScore(0)
  }

  return (
    <div ref={rootRef} className="game-root" style={{ width: GAME_WIDTH, height: GAME_HEIGHT }}>
      {/* Background */}
      {(() => {
        // Cicla lo sfondo ogni 11 punti, partendo da un indice base
        // determinato dal personaggio scelto: Pikachu→day(0), Charizard→sunset(1), Jigglypuff→night(2)
        const variantNames = ['day', 'sunset', 'night'] as const
        const baseIdxMap: Record<'charizard' | 'pikachu' | 'jigglypuff', number> = {
          pikachu: 0,
          charizard: 1,
          jigglypuff: 2,
        }
        const idx = (baseIdxMap[character] + Math.floor(score / 11)) % 3
        const bgVariant: 'day' | 'sunset' | 'night' = variantNames[idx]
        return <Background key={bgVariant} variant={bgVariant} />
      })()}

      {clouds.map((c) => (
        <div
          key={c.id}
          className="cloud"
          style={{ transform: `translate3d(${c.x}px, ${c.y}px, 0) scale(${c.scale})` }}
        />
      ))}
      <div className="ground" style={{ transform: `translateX(-${bgOffset}px)` }} />

      {obstacles.map((o) => {
        const topHeight = o.gapY
        const bottomHeight = GAME_HEIGHT - GROUND_HEIGHT - o.gapY - effective.gapHeight
        const bottomTopY = GAME_HEIGHT - GROUND_HEIGHT - bottomHeight
        return (
          <div key={o.id}>
            <PipeSprite style={{ transform: `translate3d(${o.x}px, 0, 0)` }} height={topHeight} width={PIPE_WIDTH} flipped />
            <PipeSprite style={{ transform: `translate3d(${o.x}px, ${bottomTopY}px, 0)` }} height={bottomHeight} width={PIPE_WIDTH} />
          </div>
        )
      })}

      {(() => {
        const style: React.CSSProperties = {
          transform: `translate3d(${BIRD_X}px, ${birdY - BIRD_HEIGHT / 2}px, 0) rotate(${Math.max(-25, Math.min(45, (birdVY / 400) * 45))}deg)`,
        }
        const srcMap = {
          charizard: '/charizard.gif',
          pikachu: '/pikachu.gif',
          jigglypuff: '/jigglypuff.gif',
        } as const
        const src = `${srcMap[character]}?v=2&chr=${character}`
        return (
          <PokemonGif
            src={src}
            alt={character}
            width={BIRD_WIDTH}
            height={BIRD_HEIGHT}
            flapKey={flapKey}
            style={style}
          />
        )
      })()}

      <div className="hud">Score: {score} · Best: {bestScore}</div>

      <div className="hud-buttons">
        <button className="hud-btn" onClick={() => setIsRunning((r) => !r)}>{isRunning ? 'Pause' : 'Play'}</button>
        <button className="hud-btn" onClick={restart}>Restart</button>
      </div>

      {!isStarted && (
        <div className="overlay" onClick={startGame}>
          <div className="panel">
            <div className="title">Flappy — Ready?</div>
            <div>Tap/Space per iniziare</div>
            <div style={{ marginTop: 8 }}>Personaggio:</div>
            <div className="actions" style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
              <button className={"btn" + (character === 'charizard' ? ' active' : '')} onClick={(e) => { e.stopPropagation(); setChar('charizard') }}>Charizard</button>
              <button className={"btn" + (character === 'pikachu' ? ' active' : '')} onClick={(e) => { e.stopPropagation(); setChar('pikachu') }}>Pikachu</button>
              <button className={"btn" + (character === 'jigglypuff' ? ' active' : '')} onClick={(e) => { e.stopPropagation(); setChar('jigglypuff') }}>Jigglypuff</button>
            </div>
            <div style={{ marginTop: 8 }}>Difficoltà:</div>
            <div className="actions" style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
              <button className="btn" onClick={() => setDiff('easy')}>Easy</button>
              <button className="btn" onClick={() => setDiff('normal')}>Normal</button>
              <button className="btn" onClick={() => setDiff('hard')}>Hard</button>
            </div>
            <div className="actions" style={{ marginTop: 10 }}>
              <button className="btn" onClick={() => startGame()}>Start</button>
            </div>
            <div className="actions" style={{ marginTop: 10 }}>
              <button className="btn" onClick={resetBest}>Reset Best</button>
              <button className="btn" onClick={resetCharacter} style={{ marginLeft: 8 }}>Reset Character</button>
            </div>
          </div>
        </div>
      )}

      {isGameOver && (
        <div className="overlay">
          <div className="panel">
            <div className="title">Game Over</div>
            <div>Score: {score}</div>
            <div>Best: {bestScore}</div>
            <div className="actions">
              <button className="btn" onClick={restart}>
                Restart (R)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}