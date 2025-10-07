"use client";

import React from "react";
import { motion } from "framer-motion";
import { slackTokens } from "@/lib/design-tokens";
import { cn } from "@/lib/utils";
import { ThinBlueBorderCard } from "@/components/ui/thin-blue-border-card";
import { Palette, BarChart3, Layers, Play, Quote, PieChart, Grid2X2, Smartphone, Check } from "lucide-react";

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
          <div className="text-white text-lg font-semibold">15 video clips and visual assets</div>
          <div className="text-sm" style={{ color: "#8B8D96" }}>
            Ready-to-publish short-form clips optimized for maximum reach across every channel
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
          {/* Top Row */}
          <InfographicsCard className="col-span-12 md:col-span-6 h-[240px]" />
          <SlideDecksCard className="col-span-12 md:col-span-6 h-[240px]" />
          {/* Middle Row */}
          <VideoClipsCard className="col-span-12 sm:col-span-6 md:col-span-4 h-[160px]" />
          <QuoteGraphicsCard className="col-span-12 sm:col-span-6 md:col-span-4 h-[160px]" />
          <DataVizCard className="col-span-12 sm:col-span-6 md:col-span-4 h-[160px]" />
          {/* Bottom Row */}
          <ThumbnailSetsCard className="col-span-12 sm:col-span-6 md:col-span-3 h-[160px]" />
          <SocialTemplatesCard className="col-span-12 sm:col-span-6 md:col-span-3 h-[160px]" />
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

function InfographicsCard({ className }: { className?: string }) {
  return (
    <VisualCardBase className={className} icon={<BarChart3 />} title="Data Infographics" subtitle="Complex data simplified">
      <div className="flex items-end gap-2 h-full px-2 pb-2">
        {[0.3, 0.6, 0.9, 0.5, 0.75].map((h, i) => (
          <motion.div
            key={i}
            className="flex-1 rounded-t skeleton"
            style={{ background: `linear-gradient(0deg, ${hex(blue500, 0.35)}, ${hex(blue500, 0.12)})` }}
            initial={{ height: 0 }}
            animate={{ height: `${h * 100}%` }}
            transition={{ duration: 0.8, delay: 0.1 + i * 0.08 }}
          />
        ))}
      </div>
    </VisualCardBase>
  );
}

function SlideDecksCard({ className }: { className?: string }) {
  return (
    <VisualCardBase className={className} icon={<Layers />} title="Presentation Slides" subtitle="Ready-to-present decks">
      <div className="relative h-full">
        <div className="grid grid-cols-12 gap-3 h-full">
          {/* Main slide viewport (16:9 feel) */}
          <div className="col-span-8 h-full">
            <div className="relative h-full rounded-md border overflow-hidden skeleton" style={{ borderColor: '#2A2B35' }}>
              <div className="absolute inset-0 p-4 space-y-2">
                <div className="h-3 w-2/3 rounded bg-white/10 skeleton" />
                <div className="h-2 w-4/6 rounded bg-white/10 skeleton" />
                <div className="h-2 w-5/6 rounded bg-white/10 skeleton" />
                <div className="h-px w-full bg-white/5 my-1" />
                <div className="h-2 w-3/4 rounded bg-white/10 skeleton" />
                <div className="h-2 w-2/4 rounded bg-white/10 skeleton" />
              </div>
              {/* slide controls */}
              <div className="absolute inset-y-0 left-2 flex items-center">
                <div className="w-6 h-6 rounded-full bg-white/10 skeleton" />
              </div>
              <div className="absolute inset-y-0 right-2 flex items-center">
                <div className="w-6 h-6 rounded-full bg-white/10 skeleton" />
              </div>
            </div>
          </div>
          {/* Thumbnails column */}
          <div className="col-span-4 h-full flex flex-col gap-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <motion.div
                key={i}
                className={`flex-1 rounded-md border overflow-hidden skeleton ${i === 0 ? 'ring-1' : ''}`}
                style={{ borderColor: '#2A2B35' }}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.08 }}
              >
                <div className="p-2 space-y-1.5">
                  <div className="h-2 w-2/3 rounded bg-white/10 skeleton" />
                  <div className="h-2 w-1/2 rounded bg-white/10 skeleton" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </VisualCardBase>
  );
}

function VideoClipsCard({ className }: { className?: string }) {
  return (
    <VisualCardBase className={className} icon={<Play />} title="Video Clips" subtitle="Short, snackable edits">
      <div className="relative h-full rounded-lg border skeleton" style={{ borderColor: '#2A2B35' }}>
        <div className="absolute inset-0 flex items-center justify-center">
          <div style={{
            width: 0,
            height: 0,
            borderTop: '10px solid transparent',
            borderBottom: '10px solid transparent',
            borderLeft: '16px solid #ffffff'
          }} />
        </div>
        <div className="absolute bottom-2 left-2 right-2 h-1.5 rounded bg-white/10 overflow-hidden">
          <motion.div className="h-full" initial={{ width: 0 }} animate={{ width: '70%' }} transition={{ duration: 1.2 }} style={{ background: `linear-gradient(90deg, ${hex(blue500, 0.8)}, ${hex(blue500, 0.4)})` }} />
        </div>
        <div className="absolute top-2 left-2 rounded px-1.5 py-0.5 text-[11px]" style={{ background: '#0F1014', color: '#8B8D96' }}>0:43</div>
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

function DataVizCard({ className }: { className?: string }) {
  return (
    <VisualCardBase className={className} icon={<PieChart />} title="Data Visualizations" subtitle="Clarity at a glance">
      <motion.div className="mx-auto mt-2 h-24 w-24 rounded-full" style={{ background: `conic-gradient(${hex(blue500, 0.8)} 0 120deg, rgba(255,255,255,0.15) 120deg 210deg, rgba(255,255,255,0.08) 210deg)` }} whileHover={{ rotate: 10 }} transition={{ type: 'spring', stiffness: 120, damping: 12 }} />
    </VisualCardBase>
  );
}

function ThumbnailSetsCard({ className }: { className?: string }) {
  return (
    <VisualCardBase className={className} icon={<Grid2X2 />} title="Thumbnail Sets" subtitle="Variants for testing">
      <div className="grid grid-cols-2 grid-rows-2 gap-2 h-full">
        {Array.from({ length: 4 }).map((_, i) => (
          <motion.div key={i} className="rounded bg-white/10 skeleton" whileHover={{ scale: 1.05 }} />
        ))}
      </div>
    </VisualCardBase>
  );
}

function SocialTemplatesCard({ className }: { className?: string }) {
  return (
    <VisualCardBase className={className} icon={<Smartphone />} title="Social Templates" subtitle="Reusable layouts">
      <div className="relative h-full">
        <div className="absolute inset-4 rounded-[24px] border" style={{ borderColor: '#2A2B35' }} />
        <div className="absolute top-6 left-1/2 -translate-x-1/2 w-10 h-1.5 rounded bg-white/10" />
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-20 h-2 rounded bg-white/10" />
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[70%] h-24 rounded bg-white/10 skeleton" />
      </div>
    </VisualCardBase>
  );
}
