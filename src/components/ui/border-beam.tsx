import { cn } from '@/lib/utils'

interface BorderBeamProps {
  size?: number
  duration?: number
  borderWidth?: number
  colorFrom?: string
  colorTo?: string
  className?: string
}

export function BorderBeam({
  size = 200,
  duration = 15,
  borderWidth = 1.5,
  colorFrom = '#176FEB',
  colorTo = '#4A91F0',
  className,
}: BorderBeamProps) {
  return (
    <div
      className={cn(
        'pointer-events-none absolute inset-0 rounded-[inherit] [border:calc(var(--bw))_solid_transparent]',
        className
      )}
      style={
        {
          '--bw': `${borderWidth}px`,
          '--size': `${size}px`,
          '--duration': `${duration}s`,
          '--color-from': colorFrom,
          '--color-to': colorTo,
          background: `linear-gradient(to right, transparent, var(--color-from), var(--color-to), transparent) border-box`,
          WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
          animation: 'border-beam var(--duration) linear infinite',
          backgroundSize: `var(--size) 100%`,
          backgroundRepeat: 'no-repeat',
        } as React.CSSProperties
      }
    >
      <style>{`
        @keyframes border-beam { to { background-position: 100% 0; } }
      `}</style>
    </div>
  )
}
