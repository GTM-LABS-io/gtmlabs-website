"use client"

import { motion } from "framer-motion"
import { forwardRef, type ComponentPropsWithoutRef, type ReactNode } from "react"
import { cn } from "@/lib/utils"

interface HeroButtonProps
  extends Omit<ComponentPropsWithoutRef<typeof motion.button>, "children"> {
  size?: "sm" | "md" | "lg"
  children: ReactNode
}

export const HeroButton = forwardRef<HTMLButtonElement, HeroButtonProps>(
  ({ className, size = "lg", children, ...props }, ref) => {
    return (
      <div className="group relative inline-block">
        <div
          className="absolute inset-0 rounded-lg blur-[3px] transition-all duration-300 group-hover:opacity-95"
          style={{
            transform: "scaleX(1.01) scaleY(1.03)",
            opacity: 0.6,
            background:
              "linear-gradient(90deg, #BFDBFE 0%, #BFDBFE 45%, #4a9cf9 50%, #2f81f7 55%, #2f81f7 100%)",
          }}
        />

        <motion.button
          ref={ref}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          className={cn(
            "relative inline-flex min-w-[118px] items-center justify-center font-medium transition-all duration-300",
            "bg-black border-none text-white",
            "rounded-lg",
            "shadow-[0_3px_10px_rgba(47,129,247,0.26),_0_0_8px_rgba(9,18,42,0.38)]",
            "hover:shadow-[0_5px_14px_rgba(47,129,247,0.32),_0_0_12px_rgba(9,18,42,0.42)]",
            {
              "px-6 py-1.5 text-xs h-8": size === "sm",
              "px-7 py-2 text-sm h-9": size === "md",
              "px-9 py-3 text-base h-11": size === "lg",
            },
            "focus:outline-none",
            className
          )}
          {...props}
        >
          <span className="flex items-center gap-2 font-semibold tracking-wide">{children}</span>
        </motion.button>
      </div>
    )
  }
)

HeroButton.displayName = "HeroButton"
