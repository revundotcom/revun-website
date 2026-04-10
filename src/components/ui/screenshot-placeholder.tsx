"use client"

import { cn } from "@/lib/utils"

interface ScreenshotPlaceholderProps {
  label: string
  aspect?: "mobile" | "desktop" | "tablet"
  className?: string
}

const aspectClasses = {
  mobile: "aspect-[9/19.5]",
  desktop: "aspect-[16/10]",
  tablet: "aspect-[4/3]",
} as const

export function ScreenshotPlaceholder({
  label,
  aspect = "desktop",
  className,
}: ScreenshotPlaceholderProps) {
  return (
    <div
      className={cn(
        "relative flex min-h-[120px] w-full items-center justify-center overflow-hidden rounded-sm bg-gradient-to-br from-[#176FEB] to-[#0B5AD4]",
        aspectClasses[aspect],
        className
      )}
    >
      {/* Grid pattern overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-2 px-4 text-center">
        <span className="text-base font-semibold text-white sm:text-lg">
          {label}
        </span>
        <span className="text-xs text-white/60">Preview</span>
      </div>
    </div>
  )
}
