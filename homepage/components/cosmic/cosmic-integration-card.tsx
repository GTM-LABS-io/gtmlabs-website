'use client'

import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { CosmicGlowCard } from './cosmic-glow-card'

interface Integration {
  name: string
  description: string
  icon: ReactNode
  status?: 'available' | 'coming-soon' | 'beta'
}

interface CosmicIntegrationCardProps {
  integration: Integration
  className?: string
}

export function CosmicIntegrationCard({ integration, className }: CosmicIntegrationCardProps) {
  const statusColors = {
    available: 'bg-green-500/20 text-green-300 border-green-500/30',
    'coming-soon': 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    beta: 'bg-blue-500/20 text-blue-300 border-blue-500/30'
  }

  return (
    <CosmicGlowCard 
      variant="default" 
      glowIntensity="subtle"
      hoverSurface
      className={cn("transition-all duration-300 hover:scale-[1.02]", className)}
    >
        <div className="flex items-start gap-4">
          {/* Icon */}
          <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
            {integration.icon}
          </div>
          
          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-medium text-white truncate">
                {integration.name}
              </h3>
              {integration.status && (
                <span className={cn(
                  "px-2 py-0.5 rounded-full text-xs font-medium border",
                  statusColors[integration.status]
                )}>
                  {integration.status === 'coming-soon' ? 'Coming Soon' : integration.status}
                </span>
              )}
            </div>
            <p className="text-sm text-zinc-400 leading-relaxed">
              {integration.description}
            </p>
          </div>
        </div>
      </CosmicGlowCard>
  )
}

interface CosmicIntegrationGridProps {
  integrations: Integration[]
  className?: string
  columns?: 2 | 3 | 4
}

export function CosmicIntegrationGrid({ integrations, className, columns = 3 }: CosmicIntegrationGridProps) {
  const gridClasses = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
  }

  return (
    <div className={cn(
      "grid gap-6",
      gridClasses[columns],
      className
    )}>
      {integrations.map((integration, index) => (
        <CosmicIntegrationCard key={index} integration={integration} />
      ))}
    </div>
  )
}