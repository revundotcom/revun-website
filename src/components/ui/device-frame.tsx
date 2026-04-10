"use client"

import { cn } from "@/lib/utils"

interface DeviceFrameProps {
  device: "iphone" | "android" | "tablet" | "desktop" | "laptop"
  children: React.ReactNode
  className?: string
  label?: string
}

function IPhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative rounded-[32px] border-[2.5px] border-[#1a1a1a] bg-[#1a1a1a] p-[6px] shadow-lg shadow-black/20">
      {/* Dynamic Island */}
      <div className="absolute top-[6px] left-1/2 z-10 h-[18px] w-[80px] -translate-x-1/2 rounded-full bg-[#0d0d0d]" />
      {/* Screen */}
      <div className="relative overflow-hidden rounded-[26px] bg-white">
        {children}
      </div>
      {/* Home indicator */}
      <div className="mx-auto mt-1.5 h-[4px] w-[80px] rounded-full bg-white/30" />
    </div>
  )
}

function AndroidFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative rounded-[24px] border-[3px] border-[#1a1a1a] bg-[#1a1a1a] p-[8px] shadow-xl shadow-black/25">
      {/* Camera punch-hole */}
      <div className="absolute top-[14px] left-1/2 z-10 h-[10px] w-[10px] -translate-x-1/2 rounded-full bg-[#0d0d0d] ring-1 ring-[#333]" />
      {/* Screen */}
      <div className="relative overflow-hidden rounded-[16px] bg-white">
        {children}
      </div>
    </div>
  )
}

function TabletFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative rounded-[20px] border-[3px] border-[#1a1a1a] bg-[#1a1a1a] p-[12px] shadow-xl shadow-black/25">
      {/* Camera */}
      <div className="absolute top-[18px] left-1/2 z-10 h-[8px] w-[8px] -translate-x-1/2 rounded-full bg-[#0d0d0d] ring-1 ring-[#333]" />
      {/* Screen */}
      <div className="relative overflow-hidden rounded-[10px] bg-white">
        {children}
      </div>
    </div>
  )
}

function DesktopFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center">
      {/* Monitor */}
      <div className="relative rounded-[12px] border-[3px] border-[#1a1a1a] bg-[#1a1a1a] p-[8px] shadow-xl shadow-black/25">
        {/* Screen */}
        <div className="relative overflow-hidden rounded-[4px] bg-white">
          {children}
        </div>
        {/* Brand dot */}
        <div className="mx-auto mt-[6px] mb-[2px] h-[6px] w-[6px] rounded-full bg-[#333]" />
      </div>
      {/* Stand neck */}
      <div className="h-[20px] w-[40px] bg-gradient-to-b from-[#2a2a2a] to-[#1a1a1a]" />
      {/* Stand base */}
      <div className="h-[6px] w-[80px] rounded-b-md bg-gradient-to-b from-[#2a2a2a] to-[#1a1a1a]" />
    </div>
  )
}

function LaptopFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center">
      {/* Screen lid */}
      <div className="relative rounded-t-[12px] border-[3px] border-b-0 border-[#1a1a1a] bg-[#1a1a1a] p-[8px] pb-[4px] shadow-xl shadow-black/25">
        {/* Camera */}
        <div className="absolute top-[6px] left-1/2 z-10 h-[5px] w-[5px] -translate-x-1/2 rounded-full bg-[#0d0d0d] ring-1 ring-[#333]" />
        {/* Screen */}
        <div className="relative overflow-hidden rounded-[4px] bg-white">
          {children}
        </div>
      </div>
      {/* Keyboard base / hinge */}
      <div className="h-[4px] w-[calc(100%+16px)] rounded-b-lg bg-gradient-to-b from-[#2a2a2a] to-[#3a3a3a] shadow-md" />
      <div className="h-[12px] w-[calc(100%+24px)] rounded-b-xl bg-gradient-to-b from-[#2a2a2a] to-[#1a1a1a]" />
    </div>
  )
}

const frameComponents = {
  iphone: IPhoneFrame,
  android: AndroidFrame,
  tablet: TabletFrame,
  desktop: DesktopFrame,
  laptop: LaptopFrame,
} as const

export function DeviceFrame({
  device,
  children,
  className,
  label,
}: DeviceFrameProps) {
  const Frame = frameComponents[device]

  return (
    <div className={cn("inline-flex flex-col items-center gap-3", className)}>
      <Frame>{children}</Frame>
      {label && (
        <span className="text-sm font-semibold text-[#0A1628]">
          {label}
        </span>
      )}
    </div>
  )
}
