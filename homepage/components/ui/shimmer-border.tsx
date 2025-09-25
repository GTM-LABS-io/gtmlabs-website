"use client"

import { animate, motion, useMotionTemplate, useMotionValue } from "framer-motion"
import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

/**
 * ShimmerBorder wraps its children and renders a moving masked border
 * identical to the tabs' shimmering effect in `ruixen-featured-image-section`.
 */
export function ShimmerBorder({
  children,
  className,
  borderColor = "#3b82f6", // tailwind blue-500, matches the tabs example
  duration = 4,
  roundedClass = "rounded-xl",
  borderWidth = 2,
}: {
  children: React.ReactNode
  className?: string
  borderColor?: string
  duration?: number
  /** Tailwind rounded-* class to match the wrapped element's radius */
  roundedClass?: string
  /** Border thickness in pixels */
  borderWidth?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const xPercent = useMotionValue(100)
  const yPercent = useMotionValue(0)
  const maskImage = useMotionTemplate`radial-gradient(100px 50px at ${xPercent}% ${yPercent}%, black, transparent)`

  useEffect(() => {
    if (!ref.current) return
    const { height, width } = ref.current.getBoundingClientRect()
    const circumference = height * 2 + width * 2
    const times = [
      0,
      width / circumference,
      (width + height) / circumference,
      (width * 2 + height) / circumference,
      1,
    ]

    const xAnim = animate(xPercent, [0, 100, 100, 0, 0], {
      duration,
      times,
      ease: "linear",
      repeat: Infinity,
      repeatType: "loop",
    })
    const yAnim = animate(yPercent, [0, 0, 100, 100, 0], {
      duration,
      times,
      ease: "linear",
      repeat: Infinity,
      repeatType: "loop",
    })

    return () => {
      xAnim.stop()
      yAnim.stop()
    }
  }, [duration, xPercent, yPercent])

  return (
    <div ref={ref} className={cn("relative inline-block", className)}>
      {/* content */}
      {children}
      {/* shimmer border overlay */}
      <motion.div
        style={{ maskImage, borderColor, borderWidth, margin: -borderWidth }}
        className={cn("pointer-events-none absolute inset-0 -m-px border z-10", roundedClass)}
      />
    </div>
  )
}
