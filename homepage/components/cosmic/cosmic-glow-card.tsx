'use client'

import { GlowingEffect } from '@/components/ui/glowing-effect'
import { GlassCard } from './glass-card'
import { cn } from '@/lib/utils'

interface CosmicGlowCardProps {
  children: React.ReactNode
  className?: string
  variant?: 'default' | 'elevated' | 'minimal'
  glowIntensity?: 'subtle' | 'medium' | 'strong'
  hoverSurface?: boolean
}

export function CosmicGlowCard({ 
  children, 
  className,
  variant = 'default',
  glowIntensity = 'medium',
  hoverSurface = false
}: CosmicGlowCardProps) {
  const glowSettings = {
    subtle: { spread: 30, proximity: 120, blur: 1.5 },
    medium: { spread: 40, proximity: 150, blur: 2 },
    strong: { spread: 50, proximity: 180, blur: 2.5 }
  }

  const settings = glowSettings[glowIntensity]

  return (
    <div className={cn("relative", className)}>
      <GlassCard 
        variant={variant}
        className={cn("relative z-10", hoverSurface && "hover-feature-surface")}
      >
        {children}
      </GlassCard>
      
      {/* Mouse-tracking border glow effect */}
      <GlowingEffect
        disabled={false}
        spread={settings.spread}
        proximity={settings.proximity}
        blur={settings.blur}
        movementDuration={0.8}
        borderWidth={1}
        className="absolute inset-0"
      />
    </div>
  )
}