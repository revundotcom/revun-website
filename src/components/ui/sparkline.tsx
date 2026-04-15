'use client'

import { useId } from 'react'

interface SparklineProps {
  data: number[]
  width?: number
  height?: number
  color?: string
  showFill?: boolean
  className?: string
}

export function Sparkline({
  data,
  width = 80,
  height = 24,
  color = '#176FEB',
  showFill = true,
  className,
}: SparklineProps) {
  // Hooks must run unconditionally — call useId before any early return
  // (prior version broke rules-of-hooks and triggered hydration mismatches
  // whenever data.length < 2 on server vs client).
  const gradientId = useId()

  if (data.length < 2) return null

  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1
  const padding = 2

  const points = data.map((val, i) => {
    const x = padding + (i / (data.length - 1)) * (width - padding * 2)
    const y = height - padding - ((val - min) / range) * (height - padding * 2)
    return `${x},${y}`
  })

  const polylinePoints = points.join(' ')
  const fillPoints = `${padding},${height - padding} ${polylinePoints} ${width - padding},${height - padding}`

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={className}
      aria-hidden
    >
      {showFill && (
        <>
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity="0.2" />
              <stop offset="100%" stopColor={color} stopOpacity="0" />
            </linearGradient>
          </defs>
          <polygon points={fillPoints} fill={`url(#${gradientId})`} />
        </>
      )}
      <polyline
        points={polylinePoints}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
