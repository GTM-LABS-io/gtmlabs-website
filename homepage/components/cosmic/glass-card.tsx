'use client'

import { cn } from '@/lib/utils'

interface GlassCardProps {
  children: React.ReactNode
  className?: string
  variant?: 'default' | 'elevated' | 'minimal'
  blurLevel?: 'sm' | 'md' | 'lg'
}

export function GlassCard({ 
  children, 
  className,
  variant = 'default',
  blurLevel = 'md'
}: GlassCardProps) {
  const blurClasses = {
    sm: 'backdrop-blur-sm',
    md: 'backdrop-blur-md',
    lg: 'backdrop-blur-lg'
  }
  
  const variantClasses = {
    default: 'bg-[#090C14] border-white/10 shadow-[0_1px_0_0_rgba(255,255,255,.06)_inset,0_20px_40px_-20px_rgba(0,0,0,.6)]',
    elevated: 'bg-[#090C14] border-white/15 shadow-[0_1px_0_0_rgba(255,255,255,.08)_inset,0_32px_64px_-24px_rgba(0,0,0,.8)]',
    minimal: 'bg-[#090C14] border-white/8 shadow-[0_8px_32px_-8px_rgba(0,0,0,.4)]'
  }

  return (
    <div className={cn(
      // Base glass effect
      "rounded-2xl border",
      blurClasses[blurLevel],
      variantClasses[variant],
      className
    )}>
      {children}
    </div>
  )
}