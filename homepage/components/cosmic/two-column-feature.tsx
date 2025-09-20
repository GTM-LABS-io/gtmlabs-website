'use client'

import { cn } from '@/lib/utils'
import { GlassCard } from './glass-card'

interface TwoColumnFeatureProps {
  eyebrow?: string
  title: string
  description: string
  ctaLabel?: string
  onCtaClick?: () => void
  image?: React.ReactNode
  imageFrame?: 'glass' | 'plain'
  reverse?: boolean
  className?: string
  children?: React.ReactNode
}

export function TwoColumnFeature({
  eyebrow,
  title,
  description,
  ctaLabel,
  onCtaClick,
  image,
  imageFrame = 'glass',
  reverse,
  className,
  children,
}: TwoColumnFeatureProps) {
  return (
    <div className={cn('grid grid-cols-1 md:grid-cols-2 items-center gap-8 md:gap-12', className)}>
      <div className={cn('space-y-3', reverse && 'md:order-2')}
      >
        {eyebrow && (
          <div className="brand-pill section-pill-text">
            {eyebrow}
          </div>
        )}
        <h3 className="section-headline gradient-headline">{title}</h3>
        <p className="section-description">{description}</p>
        {children && (
          <div className="mt-2">
            {children}
          </div>
        )}
        {ctaLabel && (
          <button
            onClick={onCtaClick}
            className="mt-2 inline-flex items-center gap-2 text-[color:var(--brand-accent,#2f81f7)] hover:text-white hover:bg-white/5 rounded-lg px-2 py-1 transition-colors"
          >
            {ctaLabel} →
          </button>
        )}
      </div>
      <div className={cn('md:order-1', reverse && 'md:order-1')}
      >
        {/* Image or placeholder frame */}
        {image ? (
          imageFrame === 'plain' ? (
            <div>
              {image}
            </div>
          ) : (
            <div className="rounded-xl border border-white/10 bg-white/5 overflow-hidden">
              {image}
            </div>
          )
        ) : (
          <GlassCard className="h-56 md:h-64 flex items-center justify-center text-zinc-400">
            Screenshot / Demo
          </GlassCard>
        )}
      </div>
    </div>
  )
}
