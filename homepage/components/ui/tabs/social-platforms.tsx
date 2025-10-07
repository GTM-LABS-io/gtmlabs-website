"use client";

import React from "react";
import { motion } from "framer-motion";
import { slackTokens } from "@/lib/design-tokens";
import { cn } from "@/lib/utils";
import { ThinBlueBorderCard } from "@/components/ui/thin-blue-border-card";
import { Rocket, Linkedin, Twitter, Instagram, Facebook, Youtube, Image as ImageIcon, Pin, Check, Share2 } from "lucide-react";

const blue500 = slackTokens.colors.blue[500];

function hex(hex: string, a: number) {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!m) return hex;
  const r = parseInt(m[1], 16);
  const g = parseInt(m[2], 16);
  const b = parseInt(m[3], 16);
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}

export function SocialBottomBar() {
  const blue500 = slackTokens.colors.blue[500];
  return (
    <ThinBlueBorderCard className="flex flex-col gap-4 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-4">
        <div
          className="flex h-12 w-12 items-center justify-center rounded-xl"
          style={{ background: hex(blue500, 0.12) }}
        >
          <Share2 className="w-6 h-6" style={{ color: hex(blue500, 0.9) }} />
        </div>
        <div>
          <div className="text-white text-lg font-semibold">20 social posts ready to schedule</div>
          <div className="text-sm" style={{ color: "#8B8D96" }}>
            Platform-optimized content that drives engagement and grows your following
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

export default function SocialPlatforms({ className }: { className?: string }) {
  return (
    <div className={cn("mx-auto max-w-[1200px]", className)}>
      {/* Direct content - no inner frame */}
      <div className="mx-auto p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 cards-grid">
          <PlatformCard icon={<Linkedin className="w-5 h-5" />} title="LinkedIn Carousel" subtitle="Swipe-ready carousel posts" variant="carousel" />
          <PlatformCard icon={<Twitter className="w-5 h-5" />} title="Twitter/X Posts" subtitle="Thread-style content" variant="thread" />
          <PlatformCard icon={<Instagram className="w-5 h-5" />} title="Instagram Content" subtitle="Stories + feed posts" variant="stories" />
          <PlatformCard icon={<Facebook className="w-5 h-5" />} title="Facebook Content" subtitle="Posts + stories" variant="fb" />
          <PlatformCard icon={<Youtube className="w-5 h-5" />} title="YouTube Shorts" subtitle="Short clips with captions" variant="yt" />
          <PlatformCard icon={<ImageIcon className="w-5 h-5" />} title="Pinterest Pins" subtitle="Clickable visuals" variant="pin" />
        </div>
      </div>
    </div>
  );
}

function CardBase({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      className="card hover-glow-blue rounded-xl border border-blue-500/20 bg-black p-5 h-[180px] overflow-hidden relative"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
}

function TitleRow({ icon, title, subtitle }: { icon: React.ReactNode; title: string; subtitle: string }) {
  return (
    <div>
      <div className="flex items-center gap-2">
        <span className="inline-flex items-center justify-center w-6 h-6 text-white">{icon}</span>
        <div className="text-white text-sm font-semibold">{title}</div>
      </div>
      <div className="text-[13px] mt-0.5" style={{ color: "#8B8D96" }}>{subtitle}</div>
    </div>
  );
}

function PlatformCard({ icon, title, subtitle, variant }: { icon: React.ReactNode; title: string; subtitle: string; variant: "carousel" | "thread" | "stories" | "fb" | "yt" | "pin" }) {
  const accent = variant === 'carousel' ? hex(blue500, 0.35)
    : variant === 'thread' ? 'rgba(255,255,255,0.15)'
    : variant === 'stories' ? hex(blue500, 0.25)
    : variant === 'fb' ? 'rgba(255,255,255,0.12)'
    : variant === 'yt' ? hex(blue500, 0.3)
    : 'rgba(255,255,255,0.12)';
  return (
    <CardBase>
      <TitleRow icon={icon} title={title} subtitle={subtitle} />
      {/* Visuals */}
      <div className="mt-3 h-[110px] rounded-lg border p-3 overflow-hidden" style={{ borderColor: accent }}>
        {variant === "carousel" && <CarouselVisual />}
        {variant === "thread" && <ThreadVisual />}
        {variant === "stories" && <StoriesVisual />}
        {variant === "fb" && <FBVisual />}
        {variant === "yt" && <YTVisual />}
        {variant === "pin" && <PinsVisual />}
      </div>
    </CardBase>
  );
}

function CarouselVisual() {
  return (
    <div className="relative h-full">
      <div className="h-full rounded-lg border overflow-hidden" style={{ borderColor: '#2A2B35', background: 'linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))' }}>
        {/* header: avatar + name */}
        <div className="flex items-center gap-2 p-2">
          <div className="w-5 h-5 rounded-full bg-white/10 skeleton" />
          <div className="h-2 w-24 rounded bg-white/10 skeleton" />
        </div>
        {/* slide viewport (16:9 feel) */}
        <div className="px-3 pb-6">
          <div className="relative h-28 rounded-md bg-white/5 skeleton overflow-hidden">
            {/* fake slide content */}
            <div className="absolute inset-0 p-3 space-y-2">
              <div className="h-3 w-2/3 rounded bg-white/10 skeleton" />
              <div className="h-2 w-1/2 rounded bg-white/10 skeleton" />
              <div className="h-2 w-5/6 rounded bg-white/10 skeleton" />
            </div>
            {/* arrows */}
            <div className="absolute inset-y-0 left-1 flex items-center">
              <div className="w-6 h-6 rounded-full bg-white/10 skeleton" />
            </div>
            <div className="absolute inset-y-0 right-1 flex items-center">
              <div className="w-6 h-6 rounded-full bg-white/10 skeleton" />
            </div>
          </div>
        </div>
        {/* nav dots */}
        <div className="absolute left-0 right-0 bottom-2 flex items-center justify-center gap-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className={`h-1.5 w-1.5 rounded-full bg-white/10 skeleton ${i === 0 ? 'scale-110' : ''}`} />
          ))}
          {/* page chip */}
          <div className="ml-3 rounded px-1.5 py-0.5 text-[10px] border" style={{ borderColor: '#2A2B35', color: '#8B8D96' }}>
            1/6
          </div>
        </div>
      </div>
    </div>
  );
}

function ThreadVisual() {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <div className="w-5 h-5 rounded-full bg-white/10 skeleton" />
        <div className="h-2 w-20 rounded bg-white/10 skeleton" />
        <div className="h-2 w-10 rounded bg-white/10 skeleton" />
        {/* timestamp bar */}
        <div className="h-2 w-8 rounded bg-white/10 skeleton" />
      </div>
      <div className="space-y-2">
        {[0.9, 0.7, 0.85, 0.6, 0.8].map((w, i) => (
          <motion.div key={i} className="h-2 rounded bg-white/10 skeleton pulse-soft" initial={{ width: 0 }} animate={{ width: `${w * 100}%` }} transition={{ duration: 0.7, delay: i * 0.08 }} />
        ))}
      </div>
    </div>
  );
}

function StoriesVisual() {
  return (
    <div className="flex items-center gap-2 h-full">
      {[0, 1, 2].map((i) => (
        <motion.div key={i} className="flex-1 h-full rounded bg-gradient-to-b from-white/10 to-white/0 skeleton" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.1 }} />
      ))}
    </div>
  );
}

function FBVisual() {
  return (
    <div>
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded-full bg-white/10" />
        <div className="h-2 w-24 rounded bg-white/10" />
      </div>
      <div className="mt-2 space-y-1.5">
        {[0.95, 0.8, 0.6].map((w, i) => (
          <motion.div key={i} className="h-2 rounded bg-white/10 skeleton pulse-soft" initial={{ width: 0 }} animate={{ width: `${w * 100}%` }} transition={{ duration: 0.6, delay: i * 0.1 }} />
        ))}
      </div>
    </div>
  );
}

function YTVisual() {
  return (
  <div>
    <div className="h-4 w-24 rounded bg-white/10" />
    <div className="mt-2 space-y-1.5">
      {[0.9, 0.85, 0.8, 0.75].map((w, i) => (
        <motion.div key={i} className="h-2 rounded bg-white/10 skeleton pulse-soft" initial={{ width: 0 }} animate={{ width: `${w * 100}%` }} transition={{ duration: 0.6, delay: i * 0.08 }} />
      ))}
    </div>
  </div>
  );
}

function PinsVisual() {
  return (
    <div className="grid grid-cols-4 gap-1 h-full">
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div key={i} className="rounded bg-white/10 skeleton" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} />
      ))}
    </div>
  );
}
