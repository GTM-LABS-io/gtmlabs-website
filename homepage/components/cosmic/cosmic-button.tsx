'use client'

import { cn } from '@/lib/utils'
import { forwardRef } from 'react'

interface CosmicButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'glass' | 'brand' | 'navy' | 'deepTeal' | 'steelBlue' | 'monoDark'
  size?: 'sm' | 'md' | 'lg'
  glow?: boolean
}

export const CosmicButton = forwardRef<HTMLButtonElement, CosmicButtonProps>(
  ({ className, variant = 'primary', size = 'md', glow = false, children, ...props }, ref) => {
    const sizeClasses = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-sm',
      lg: 'px-6 py-3 text-base'
    }
    
    const variantClasses = {
      primary: 'bg-[#611f69] text-white font-medium hover:bg-[#7a2784] focus:outline-none focus:ring-2 focus:ring-[#611f69]/60',
      secondary: 'bg-white/10 text-white border border-white/20 hover:bg-white/15 backdrop-blur-sm',
      ghost: 'text-zinc-300 hover:text-white hover:bg-white/5',
      glass: 'bg-white/5 border border-white/10 backdrop-blur-md text-white hover:bg-white/10 focus:ring-2 focus:ring-white/20',
      // Brand now uses steel blue globally
      brand: 'bg-[#1B3A5A] text-[#E6F0FF] font-medium hover:bg-[#21476E] focus:outline-none focus:ring-2 focus:ring-[#1B3A5A]/40',
      // New darker options for evaluation
      navy: 'bg-[#0C1A31] text-[#BFDBFE] font-medium hover:bg-[#132542] focus:outline-none focus:ring-2 focus:ring-[#0C1A31]/40',
      deepTeal: 'bg-[#0F3B46] text-[#E6FFFA] font-medium hover:bg-[#125261] focus:outline-none focus:ring-2 focus:ring-[#0F3B46]/40',
      steelBlue: 'bg-[#1B3A5A] text-[#E6F0FF] font-medium hover:bg-[#21476E] focus:outline-none focus:ring-2 focus:ring-[#1B3A5A]/40',
      monoDark: 'bg-[#111827] text-white font-medium hover:bg-[#1F2937] focus:outline-none focus:ring-2 focus:ring-[#111827]/40'
    } as const

    return (
      <button
        ref={ref}
        className={cn(
          // Base styles
          "rounded-xl font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed",
          // Size
          sizeClasses[size],
          // Variant
          variantClasses[variant],
          // Glow effect (Slack purple hue)
          glow && "shadow-[0_0_20px_rgba(97,31,105,0.35)]",
          className
        )}
        {...props}
      >
        {children}
      </button>
    )
  }
)

CosmicButton.displayName = 'CosmicButton'