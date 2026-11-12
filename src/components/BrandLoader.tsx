import { useEffect, useMemo } from 'react'
import './BrandLoader.css'

interface BrandLoaderProps {
  onComplete: () => void
  durationMs?: number
}

interface WaveRibbonPath {
  id: number
  d: string
  stroke: string
  strokeWidth: number
  opacity: number
  delayMs: number
}

/**
 * Builds a precision Guilloché / Moiré harmonic loop around (cx, cy).
 * Generates the signature undulating, overlapping ribbon seen in high-end
 * brand seals and banknote guilloché engraving.
 */
function buildGuillocheWavePath(
  cx: number,
  cy: number,
  baseRadius: number,
  amplitude: number,
  lobes: number,
  phaseRad: number,
  harmonicAmp = 3.5,
  steps = 280
): string {
  const points: string[] = []

  for (let i = 0; i <= steps; i++) {
    const theta = (i / steps) * Math.PI * 2
    // Primary harmonic + secondary nuance harmonic creates rich contour curvature
    const r =
      baseRadius +
      amplitude * Math.sin(lobes * theta + phaseRad) +
      harmonicAmp * Math.cos(2 * lobes * theta + 2 * phaseRad)

    const x = cx + r * Math.cos(theta)
    const y = cy + r * Math.sin(theta)
    points.push(`${i === 0 ? 'M' : 'L'}${x.toFixed(2)},${y.toFixed(2)}`)
  }

  return `${points.join(' ')} Z`
}

/**
 * Generates a scalloped outer border for the academic circular badge seal
 * scaled proportionally to the enlarged central logo disc.
 */
function buildSealScallopPath(
  cx: number,
  cy: number,
  radius: number,
  scallops = 24,
  amplitude = 7.5,
  steps = 144
): string {
  const points: string[] = []
  for (let i = 0; i <= steps; i++) {
    const theta = (i / steps) * Math.PI * 2
    const r = radius + amplitude * Math.sin(scallops * theta)
    const x = cx + r * Math.cos(theta)
    const y = cy + r * Math.sin(theta)
    points.push(`${i === 0 ? 'M' : 'L'}${x.toFixed(2)},${y.toFixed(2)}`)
  }
  return `${points.join(' ')} Z`
}

export function BrandLoader({ onComplete, durationMs = 2800 }: BrandLoaderProps) {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      onComplete()
      return
    }
    const timer = window.setTimeout(onComplete, durationMs)
    return () => window.clearTimeout(timer)
  }, [onComplete, durationMs])

  // 44 nested harmonic contour loops forming the moiré ribbon, scaled proportionally
  const waveRibbon = useMemo<WaveRibbonPath[]>(() => {
    const paths: WaveRibbonPath[] = []
    const count = 44
    const lobes = 13 // 13 undulations around the circle matching the reference
    const cx = 500
    const cy = 500

    // GenBright Theme Palette
    const palette = [
      { color: 'var(--gb-forest)', width: 1.15, opacityBase: 0.8 },
      { color: 'var(--gb-forest-mid)', width: 1.1, opacityBase: 0.74 },
      { color: 'var(--gb-forest)', width: 1.2, opacityBase: 0.84 },
      { color: 'var(--gb-gold)', width: 1.25, opacityBase: 0.9 }, // Golden thread accent
      { color: 'var(--gb-forest)', width: 1.15, opacityBase: 0.78 },
      { color: 'var(--gb-forest-soft)', width: 1.05, opacityBase: 0.7 },
      { color: 'var(--gb-clay)', width: 1.2, opacityBase: 0.86 }, // Warm clay gold accent
      { color: 'var(--gb-forest)', width: 1.15, opacityBase: 0.8 },
    ]

    for (let i = 0; i < count; i++) {
      const t = i / (count - 1) // 0 to 1
      // Proportionally scaled: base radius spans from 232 (clearing the enlarged central seal) to 458
      const baseRadius = 232 + 226 * t
      // Amplitude expands organically from 18px inner to 32px outer
      const amplitude = 18 + 14 * t
      // Phase shifts across 2.25 * PI, creating the progressive criss-cross moiré weave
      const phaseRad = t * Math.PI * 2.25

      const palItem = palette[i % palette.length]
      // Inner and outer boundaries fade slightly; dense core remains prominent
      const envelope = Math.sin(Math.PI * (0.08 + 0.84 * t))
      const opacity = Math.min(0.92, Math.max(0.35, palItem.opacityBase * envelope))

      paths.push({
        id: i,
        d: buildGuillocheWavePath(cx, cy, baseRadius, amplitude, lobes, phaseRad),
        stroke: palItem.color,
        strokeWidth: palItem.width,
        opacity,
        delayMs: Math.round(i * 18),
      })
    }
    return paths
  }, [])

  // Proportionally scaled outer seal border paths around enlarged central logo disc
  const sealScallopBorder = useMemo(() => buildSealScallopPath(500, 500, 206, 24, 7.5), [])
  const sealInnerRing = useMemo(() => buildSealScallopPath(500, 500, 192, 24, 3), [])

  return (
    <div
      className="gb-loader"
      role="status"
      aria-live="polite"
      aria-label="Loading GenBright World School"
    >
      {/* Precision Guilloché / Moiré Annular Wave Ribbon */}
      <svg
        className="gb-loader__svg"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
      >
        <defs>
          {/* Subtle central radial vignette to give academic depth */}
          <radialGradient id="gbLoaderCenterGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="68%" stopColor="#fcfbf7" stopOpacity="0.97" />
            <stop offset="100%" stopColor="#f6f2e8" stopOpacity="0" />
          </radialGradient>

          {/* Arched text paths scaled for the enlarged circular academic badge seal */}
          <path
            id="gbSealTopArc"
            d="M 328,500 A 172,172 0 0,1 672,500"
            fill="none"
          />
          <path
            id="gbSealBottomArc"
            d="M 672,500 A 172,172 0 0,1 328,500"
            fill="none"
          />
        </defs>

        {/* Moiré Ribbon Waves Layer (Proportionally Scaled) */}
        <g className="gb-loader__waves-group">
          {waveRibbon.map((wave) => (
            <path
              key={wave.id}
              d={wave.d}
              fill="none"
              stroke={wave.stroke}
              strokeWidth={wave.strokeWidth}
              strokeOpacity={wave.opacity}
              className="gb-loader__wave-line"
              style={{
                animationDelay: `${wave.delayMs}ms`,
              }}
            />
          ))}
        </g>

        {/* Central Academic Seal Badge (Enlarged Background Circles & Framing) */}
        <g className="gb-loader__seal-group">
          {/* Background disc halo clearing the wave ribbon */}
          <circle cx="500" cy="500" r="226" fill="url(#gbLoaderCenterGlow)" />
          <circle cx="500" cy="500" r="214" fill="#ffffff" />

          {/* Scalloped outer seal perimeter */}
          <path
            d={sealScallopBorder}
            fill="none"
            stroke="var(--gb-forest)"
            strokeWidth="2.8"
            strokeOpacity="0.92"
            className="gb-loader__seal-scallop"
          />

          {/* Inner hairline gold ring */}
          <path
            d={sealInnerRing}
            fill="none"
            stroke="var(--gb-gold)"
            strokeWidth="1.3"
            strokeOpacity="0.88"
          />

          {/* Seal Circular Ring Border */}
          <circle
            cx="500"
            cy="500"
            r="192"
            fill="none"
            stroke="var(--gb-forest)"
            strokeWidth="1"
            strokeOpacity="0.4"
          />
          <circle
            cx="500"
            cy="500"
            r="152"
            fill="none"
            stroke="var(--gb-forest)"
            strokeWidth="1.2"
            strokeOpacity="0.5"
          />

          {/* Circular Text: GENBRIGHT WORLD SCHOOL · HYDERABAD */}
          <text className="gb-loader__seal-text" fill="var(--gb-forest)">
            <textPath
              href="#gbSealTopArc"
              startOffset="50%"
              textAnchor="middle"
            >
              GENBRIGHT WORLD SCHOOL
            </textPath>
          </text>
          <text className="gb-loader__seal-text gb-loader__seal-text--bottom" fill="var(--gb-forest)">
            <textPath
              href="#gbSealBottomArc"
              startOffset="50%"
              textAnchor="middle"
            >
              • HYDERABAD 2026 •
            </textPath>
          </text>

          {/* Enlarged Central Logo Disc & Inner Framing */}
          <circle
            cx="500"
            cy="500"
            r="144"
            fill="var(--gb-text-light)"
            stroke="var(--gb-gold)"
            strokeWidth="1.8"
            strokeOpacity="0.75"
          />
        </g>
      </svg>

      {/* Enlarged Centered GenBright Logo Container (h-64 w-64 md:h-72 md:w-72, reduced p-2 padding) */}
      <div className="gb-loader__logo-wrap h-64 w-64 md:h-72 md:w-72 p-2">
        <img
          src="/genbright-logo.png"
          alt="GenBright World School"
          className="gb-loader__logo"
        />
      </div>

      {/* Elegant Radial Curtain Wipe to Reveal Website */}
      <div className="gb-loader__reveal-curtain" aria-hidden="true" />
    </div>
  )
}
