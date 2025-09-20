'use client'

import { cn } from '@/lib/utils'

interface CosmicPillProps extends React.HTMLAttributes<HTMLDivElement> {
  iconLeft?: React.ReactNode
  iconRight?: React.ReactNode
  tone?: 'brand' | 'neutral'
  size?: 'sm' | 'md'
}

export function CosmicPill({
  className,
  children,
  iconLeft,
  iconRight,
  tone = 'brand',
  size = 'md',
  ...props
}: CosmicPillProps) {
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm'
  }

  const toneClasses = {
    brand: 'bg-[color:var(--brand-pill-bg,#09122A)] text-[color:var(--brand-pill-text,#BFDBFE)] border border-[color:var(--brand-pill-border,rgba(47,129,247,0.25))] section-pill-text shadow-[0_0_0_1px_rgba(255,255,255,0.04)]',
    neutral: 'bg-white/5 text-white/90 border border-white/10'
  }

  return (
    <div
      className={cn(
        'inline-flex items-center gap-2 rounded-full font-medium tracking-[-0.01em] backdrop-blur-sm transition-colors',
        sizeClasses[size],
        toneClasses[tone],
        className,
      )}
      {...props}
    >
      {iconLeft && <span className="shrink-0" aria-hidden>{iconLeft}</span>}
      <span className="whitespace-nowrap">{children}</span>
      {iconRight && <span className="shrink-0" aria-hidden>{iconRight}</span>}
    </div>
  )
}
