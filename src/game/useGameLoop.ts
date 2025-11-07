import { useEffect, useRef } from 'react'

export function useGameLoop(callback: (dt: number) => void) {
  const cbRef = useRef(callback)
  useEffect(() => {
    cbRef.current = callback
  }, [callback])

  useEffect(() => {
    let raf = 0
    let last = performance.now()

    const loop = (now: number) => {
      const dt = (now - last) / 1000 // seconds
      last = now
      cbRef.current(dt)
      raf = requestAnimationFrame(loop)
    }

    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [])
}