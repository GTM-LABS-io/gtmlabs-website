'use client'

import { cn } from '@/lib/utils'

interface CosmicBackgroundProps {
  children: React.ReactNode
  className?: string
  variant?: 'hero' | 'section' | 'minimal'
  showStars?: boolean
  showVignette?: boolean
  brand?: 'cosmic' | 'navy' | 'black'
}

export function CosmicBackground({ 
  children, 
  className,
  variant = 'section',
  showStars = true,
  showVignette = true,
  brand = 'cosmic'
}: CosmicBackgroundProps) {
  return (
    <div className={cn(
      // Base background
      brand === 'black'
        ? 'relative bg-black'
        : "relative bg-[radial-gradient(120%_80%_at_50%_-20%,#0b0f1a_0%,#070a10_45%,#05070b_70%,#040509_100%)]",
      "text-zinc-200",
      className
    )}>
      {/* Brand gradient overlay */}
      {brand === 'cosmic' && (
        <div className="pointer-events-none absolute inset-0 mix-blend-screen opacity-30 bg-[radial-gradient(60%_60%_at_30%_0%,theme(colors.indigo.600/.35),transparent_60%),radial-gradient(50%_50%_at_80%_-10%,theme(colors.fuchsia.600/.3),transparent_60%)]" />
      )}
      {brand === 'navy' && (
        <div className="pointer-events-none absolute inset-0 mix-blend-screen opacity-35 bg-[radial-gradient(60%_60%_at_30%_0%,rgba(47,129,247,0.35),transparent_60%),radial-gradient(50%_50%_at_80%_-10%,rgba(15,30,54,0.55),transparent_60%)]" />
      )}
      
      {/* Starfield */}
      {showStars && brand !== 'black' && (
        <div 
          className="pointer-events-none absolute inset-0 opacity-25"
          style={{
            backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'><defs><filter id='noise'><feTurbulence type='turbulence' baseFrequency='0.9' numOctaves='1' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.4 0'/></filter></defs><rect width='100%25' height='100%25' filter='url(%23noise)'/></svg>")`,
            backgroundSize: '200px 200px'
          }}
        />
      )}
      
      {/* Vignette effect */}
      {showVignette && brand !== 'black' && (
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_70%_at_50%_15%,transparent_60%,#040509_100%)]" />
      )}
      
      {/* Hero spotlight effect */}
      {variant === 'hero' && brand !== 'black' && (
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(closest-side_at_50%_20%,rgba(255,255,255,0.08),transparent_70%)]" />
      )}
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}