'use client'

import { cn } from '@/lib/utils'
import { GlassCard } from './glass-card'

interface Integration {
  name: string
  description: string
  icon: React.ReactNode
  status?: 'available' | 'coming-soon' | 'beta'
}

interface IntegrationGridProps {
  integrations: Integration[]
  className?: string
  columns?: 2 | 3 | 4
}

export function IntegrationGrid({ integrations, className, columns = 3 }: IntegrationGridProps) {
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
        <IntegrationCard key={index} integration={integration} />
      ))}
    </div>
  )
}

interface IntegrationCardProps {
  integration: Integration
  className?: string
}

function IntegrationCard({ integration, className }: IntegrationCardProps) {
  const statusColors = {
    available: 'bg-green-500/20 text-green-300 border-green-500/30',
    'coming-soon': 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    beta: 'bg-blue-500/20 text-blue-300 border-blue-500/30'
  }

  return (
    <GlassCard className={cn("p-6 hover:bg-white/8 transition-all duration-200", className)}>
      <div className="flex items-start gap-4">
        {/* Icon */}
        <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
          {integration.icon}
        </div>
        
        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="card-title-sm truncate">
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
          <p className="card-text">
            {integration.description}
          </p>
        </div>
      </div>
    </GlassCard>
  )
}