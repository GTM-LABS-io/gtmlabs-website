'use client'

import { cn } from '@/lib/utils'

interface MiniFeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
  className?: string
}

export function MiniFeatureCard({ icon, title, description, className }: MiniFeatureCardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl p-4 sm:p-5 transition-colors duration-200 border border-transparent hover-feature-surface',
        className
      )}
    >
      <div className="flex items-start gap-3">
        <div className="mt-0.5 text-[color:var(--brand-pill-text,#BFDBFE)]">
          {icon}
        </div>
        <div className="space-y-1">
          <div className="card-title-sm">{title}</div>
          <div className="card-text">{description}</div>
        </div>
      </div>
    </div>
  )
}
