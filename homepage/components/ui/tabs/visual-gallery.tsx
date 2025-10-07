"use client";

import React from "react";
import { motion } from "framer-motion";
import { slackTokens } from "@/lib/design-tokens";
import { cn } from "@/lib/utils";
import { ThinBlueBorderCard } from "@/components/ui/thin-blue-border-card";
import { Palette, BarChart3, Layers, Play, Quote, PieChart, Grid2X2, Smartphone, Check, ChevronLeft, ChevronRight } from "lucide-react";

// LinkedIn logo component
function LinkedInLogo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );
}

const blue500 = slackTokens.colors.blue[500];

function hex(hex: string, a: number) {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!m) return hex;
  const r = parseInt(m[1], 16);
  const g = parseInt(m[2], 16);
  const b = parseInt(m[3], 16);
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}

export function VisualBottomBar() {
  const blue500 = slackTokens.colors.blue[500];
  return (
    <ThinBlueBorderCard className="flex flex-col gap-4 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-4">
        <div
          className="flex h-12 w-12 items-center justify-center rounded-xl"
          style={{ background: hex(blue500, 0.12) }}
        >
          <Palette className="w-6 h-6" style={{ color: hex(blue500, 0.9) }} />
        </div>
        <div>
          <div className="text-white text-lg font-semibold">10-15 Short-Form Video Clips</div>
          <div className="text-sm" style={{ color: "#8B8D96" }}>
            Platform-optimized vertical videos with captions, hooks, and calls-to-action
          </div>
        </div>
      </div>
      {/* See Sample button placeholder - styling retained for future enablement */}
      {false && (
        <button
          className="group inline-flex items-center rounded-lg border border-blue-500/20 px-4 py-2 text-sm text-blue-300 transition-colors"
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = hex(blue500, 0.12))}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
        >
          See Sample →
          <Check className="ml-2 w-4 h-4 opacity-0 transition-opacity duration-200 group-hover:opacity-100" style={{ color: hex(blue500, 0.9) }} />
        </button>
      )}
    </ThinBlueBorderCard>
  );
}

export default function VisualGallery({ className }: { className?: string }) {
  return (
    <div className={cn("mx-auto max-w-[1200px]", className)}>
      {/* Direct content - no inner frame */}
      <div className="mx-auto p-8 min-h-[600px]">
        <div className="grid grid-cols-12 gap-6 cards-grid">
          {/* Top Row - Primary Video Assets */}
          <VideoClipsCard className="col-span-12 md:col-span-6 h-[240px]" />
          <HookClipsCard className="col-span-12 md:col-span-6 h-[240px]" />
          {/* Bottom Row - Supplementary Visuals */}
          <CarouselGraphicsCard className="col-span-12 sm:col-span-6 h-[200px]" />
          <QuoteGraphicsCard className="col-span-12 sm:col-span-6 h-[200px]" />
        </div>
      </div>
    </div>
  );
}

function VisualCardBase({ className, icon, title, subtitle, children }: { className?: string; icon: React.ReactNode; title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <motion.div
      className={cn("card hover-glow-blue rounded-xl border border-blue-500/20 bg-black p-4 overflow-hidden relative", className)}
      whileHover={{ y: -4, boxShadow: `0 20px 40px ${hex(blue500, 0.1)}` }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center justify-center w-6 h-6 text-white">{icon}</span>
          <div className="text-white text-sm font-semibold">{title}</div>
        </div>
        <div className="text-[12px]" style={{ color: '#8B8D96' }}>{subtitle}</div>
      </div>
      <div className="mt-3 h-[calc(100%-32px)]">
        {children}
      </div>
    </motion.div>
  );
}

function HookClipsCard({ className }: { className?: string }) {
  return (
    <VisualCardBase className={className} icon={<Play />} title="Hook Clips" subtitle="Attention-grabbing openers">
      <div className="grid grid-cols-3 gap-2 h-full">
        {[0, 1, 2].map((i) => (
          <motion.div 
            key={i} 
            className="relative rounded-lg border skeleton" 
            style={{ borderColor: '#2A2B35' }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.15 }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div style={{
                width: 0,
                height: 0,
                borderTop: '8px solid transparent',
                borderBottom: '8px solid transparent',
                borderLeft: '12px solid #ffffff'
              }} />
            </div>
            <div className="absolute bottom-1 left-1 right-1 text-[8px] text-center rounded bg-black/50 px-1" style={{ color: '#ffffff' }}>
              0:{(i + 1) * 5}s
            </div>
          </motion.div>
        ))}
      </div>
    </VisualCardBase>
  );
}

function CarouselGraphicsCard({ className }: { className?: string }) {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const totalSlides = 5;

  const slides = [
    { title: '75%', subtitle: 'More Content', detail: 'From each webinar' },
    { title: '10-15', subtitle: 'Video Clips', detail: 'Ready to publish' },
    { title: '20+', subtitle: 'Social Posts', detail: 'Cross-platform' },
    { title: 'SEO', subtitle: 'Optimized', detail: 'Blog content' },
    { title: '24/7', subtitle: 'Working', detail: 'For your brand' },
  ];

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % totalSlides);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);

  return (
    <VisualCardBase className={className} icon={<Layers />} title="LinkedIn Carousels" subtitle="Swipe-ready slide decks">
      <div className="relative h-full">
        {/* LinkedIn Logo Badge */}
        <div className="absolute top-2 right-2 z-10 w-5 h-5 rounded bg-blue-600/20 flex items-center justify-center">
          <LinkedInLogo className="w-3 h-3 text-blue-400" />
        </div>
        
        {/* Profile Avatar Skeleton */}
        <div className="absolute top-2 left-2 z-10 flex items-center gap-1.5">
          <div className="w-5 h-5 rounded-full bg-white/10 skeleton" />
          <div className="space-y-0.5">
            <div className="h-1.5 w-12 rounded bg-white/10 skeleton" />
            <div className="h-1 w-8 rounded bg-white/10 skeleton" />
          </div>
        </div>

        {/* Carousel preview */}
        <div className="h-full rounded-lg border overflow-hidden" style={{ borderColor: '#2A2B35' }}>
          <div className="relative h-full bg-gradient-to-br from-white/5 to-white/0">
            {/* Slide content */}
            <div className="absolute inset-0 pt-10 pb-8 px-4 flex items-center justify-center">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="text-center space-y-1"
              >
                <div className="text-2xl font-bold text-white/90">{slides[currentSlide].title}</div>
                <div className="text-xs text-white/70">{slides[currentSlide].subtitle}</div>
                <div className="text-[10px] text-slate-400/60">{slides[currentSlide].detail}</div>
              </motion.div>
            </div>

            {/* Navigation Arrows */}
            <button 
              onClick={prevSlide}
              className="absolute left-1 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center transition-colors"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-3 h-3 text-white" />
            </button>
            <button 
              onClick={nextSlide}
              className="absolute right-1 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center transition-colors"
              aria-label="Next slide"
            >
              <ChevronRight className="w-3 h-3 text-white" />
            </button>

            {/* Slide indicators */}
            <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
              {Array.from({ length: totalSlides }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  className={`h-1.5 rounded-full transition-all ${
                    i === currentSlide ? 'w-4 bg-blue-500/80' : 'w-1.5 bg-white/20 hover:bg-white/30'
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </VisualCardBase>
  );
}

// Platform logo components
function InstagramLogo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4c0 3.2-2.6 5.8-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8C2 4.6 4.6 2 7.8 2m-.2 2A3.6 3.6 0 004 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8c1.99 0 3.6-1.61 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 011.25 1.25A1.25 1.25 0 0117.25 8 1.25 1.25 0 0116 6.75a1.25 1.25 0 011.25-1.25M12 7a5 5 0 015 5 5 5 0 01-5 5 5 5 0 01-5-5 5 5 0 015-5m0 2a3 3 0 00-3 3 3 3 0 003 3 3 3 0 003-3 3 3 0 00-3-3z"/>
    </svg>
  );
}

function TikTokLogo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
    </svg>
  );
}

function YouTubeLogo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M10 15l5.19-3L10 9v6m11.56-7.83c.13.47.22 1.1.28 1.9.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83-.25.9-.83 1.48-1.73 1.73-.47.13-1.33.22-2.65.28-1.3.07-2.49.1-3.59.1L12 19c-4.19 0-6.8-.16-7.83-.44-.9-.25-1.48-.83-1.73-1.73-.13-.47-.22-1.1-.28-1.9-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83.25-.9.83-1.48 1.73-1.73.47-.13 1.33-.22 2.65-.28 1.3-.07 2.49-.1 3.59-.1L12 5c4.19 0 6.8.16 7.83.44.9.25 1.48.83 1.73 1.73z"/>
    </svg>
  );
}

function VideoClipsCard({ className }: { className?: string }) {
  const platforms = [
    { name: 'Instagram', logo: InstagramLogo, color: 'text-pink-400' },
    { name: 'TikTok', logo: TikTokLogo, color: 'text-cyan-400' },
    { name: 'YouTube', logo: YouTubeLogo, color: 'text-red-400' },
  ];

  return (
    <VisualCardBase className={className} icon={<Smartphone />} title="Short-Form Video Clips" subtitle="10-15 vertical videos per webinar">
      <div className="grid grid-cols-3 gap-3 h-full">
        {platforms.map((platform, i) => (
          <motion.div 
            key={platform.name} 
            className="relative rounded-lg border skeleton" 
            style={{ borderColor: '#2A2B35', background: 'linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))' }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 + i * 0.12 }}
          >
            {/* Play icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div style={{
                width: 0,
                height: 0,
                borderTop: '10px solid transparent',
                borderBottom: '10px solid transparent',
                borderLeft: '16px solid rgba(255,255,255,0.8)'
              }} />
            </div>
            {/* Platform logo badge */}
            <div className={`absolute top-2 left-2 w-4 h-4 rounded-full bg-black/70 flex items-center justify-center ${platform.color}`}>
              <platform.logo className="w-2.5 h-2.5" />
            </div>
            {/* Duration */}
            <div className="absolute bottom-2 left-2 right-2 text-center text-[9px]" style={{ color: '#8B8D96' }}>
              0:{30 + i * 15}s
            </div>
          </motion.div>
        ))}
      </div>
    </VisualCardBase>
  );
}

function QuoteGraphicsCard({ className }: { className?: string }) {
  return (
    <VisualCardBase className={className} icon={<Quote />} title="Quote Graphics" subtitle="Shareable insights">
      <div className="relative h-full p-3">
        <div className="pointer-events-none select-none absolute top-2 left-3 text-4xl opacity-20 z-0">“</div>
        <div className="pointer-events-none select-none absolute bottom-2 right-3 text-4xl opacity-20 z-0">”</div>
        <div className="relative z-10 mt-6 space-y-2">
          {[0.9, 0.8, 0.7].map((w, i) => (
            <motion.div key={i} className="h-2 rounded bg-white/10 skeleton" initial={{ width: 0 }} animate={{ width: `${w * 100}%` }} transition={{ duration: 0.7, delay: 0.1 + i * 0.08 }} />
          ))}
          <div className="pt-2">
            <div className="h-2 w-24 rounded bg-white/10 skeleton" />
          </div>
        </div>
      </div>
    </VisualCardBase>
  );
}



