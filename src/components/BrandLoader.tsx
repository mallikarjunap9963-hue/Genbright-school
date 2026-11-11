import { useEffect, useMemo } from 'react'
import './BrandLoader.css'

interface BrandLoaderProps {
  onComplete: () => void
  durationMs?: number
}

interface RingSpec {
  id: number
  d: string
  stroke: string
  strokeWidth: number
  opacity: number
  delayMs: number
  direction: 'cw' | 'ccw'
}

/**
 * Generates a smooth closed scalloped/lobed SVG path around (cx, cy).
 */
function buildScallopedPath(
  cx: number,
  cy: number,
  baseRadius: number,
  amplitude: number,
  lobes: number,
  phaseDeg: number,
  steps = 180
): string {
  const phaseRad = (phaseDeg * Math.PI) / 180
  const points: string[] = []

  for (let i = 0; i < steps; i++) {
    const theta = (i / steps) * Math.PI * 2
    const r = baseRadius + amplitude * Math.sin(lobes * theta + phaseRad)
    const x = cx + r * Math.cos(theta)
    const y = cy + r * Math.sin(theta)
    points.push(`${i === 0 ? 'M' : 'L'}${x.toFixed(2)},${y.toFixed(2)}`)
  }

  return `${points.join(' ')} Z`
}

export function BrandLoader({ onComplete, durationMs = 2600 }: BrandLoaderProps) {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      onComplete()
      return
    }
    const timer = window.setTimeout(onComplete, durationMs)
    return () => window.clearTimeout(timer)
  }, [onComplete, durationMs])

  const rings = useMemo<RingSpec[]>(() => {
    const specs: RingSpec[] = []
    const count = 15
    for (let i = 0; i < count; i++) {
      const progress = i / (count - 1)
      const baseRadius = 86 + i * 21
      const amplitude = 5.5 + progress * 20
      const phaseDeg = i * 11.5
      const isGoldAccent = i === 4 || i === 9 || i === 13
      specs.push({
        id: i,
        d: buildScallopedPath(500, 500, baseRadius, amplitude, 10, phaseDeg),
        stroke: isGoldAccent ? 'var(--gb-clay)' : 'var(--gb-forest)',
        strokeWidth: isGoldAccent ? 1.15 : 1.1,
        opacity: isGoldAccent ? 0.58 : 0.36 + progress * 0.44,
        delayMs: i * 48,
        direction: i % 2 === 0 ? 'cw' : 'ccw',
      })
    }
    return specs
  }, [])

  const curtainOuterPath = useMemo(
    () => buildScallopedPath(500, 500, 390, 34, 9, 12, 160),
    []
  )
  const curtainInnerPath = useMemo(
    () => buildScallopedPath(500, 500, 360, 28, 9, 28, 160),
    []
  )

  return (
    <div
      className="gb-loader"
      role="status"
      aria-live="polite"
      aria-label="Loading GenBright World School"
    >
      {/* Blooming concentric scalloped spirograph wireframe rings */}
      <svg
        className="gb-loader__rings-svg"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <g className="gb-loader__rings-group">
          {rings.map((ring) => (
            <path
              key={ring.id}
              d={ring.d}
              fill="none"
              stroke={ring.stroke}
              strokeWidth={ring.strokeWidth}
              strokeOpacity={ring.opacity}
              className={`gb-loader__ring gb-loader__ring--${ring.direction}`}
              style={{ animationDelay: `${ring.delayMs}ms` }}
            />
          ))}
        </g>
      </svg>

      {/* Immediate centered GenBright logo */}
      <div className="gb-loader__logo-wrap">
        <div className="gb-loader__logo-halo" aria-hidden="true" />
        <img
          src="/genbright-logo.png"
          alt="GenBright World School"
          className="gb-loader__logo"
        />
      </div>

      {/* Full-screen wavy scalloped forest curtain reveal */}
      <svg
        className="gb-loader__curtain-svg"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <path
          d={curtainOuterPath}
          fill="var(--gb-forest)"
          className="gb-loader__curtain-outer"
        />
        <path
          d={curtainInnerPath}
          fill="var(--gb-ivory)"
          fillOpacity="0.22"
          className="gb-loader__curtain-inner"
        />
      </svg>
    </div>
  )
}

