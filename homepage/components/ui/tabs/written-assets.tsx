"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { slackTokens } from "@/lib/design-tokens";
import { ThinBlueBorderCard } from "@/components/ui/thin-blue-border-card";
import { cn } from "@/lib/utils";
import { InlineTooltip } from "@/components/ui/inline-tooltip";
import { Briefcase, FilePlus2, BarChart3, MailOpen, Check, Download, CheckCircle, FileText, Mail, Facebook, Twitter, Instagram as InstagramIcon } from "lucide-react";

// Simple platform logo components
function LinkedInLogo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );
}

function XLogo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  );
}

const hex = (hex: string, a: number) => {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!m) return hex;
  const r = parseInt(m[1], 16);
  const g = parseInt(m[2], 16);
  const b = parseInt(m[3], 16);
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}

export function WrittenBottomBar() {
  const blue500 = slackTokens.colors.blue[500];
  return (
    <ThinBlueBorderCard className="flex flex-col gap-4 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-4">
        <div
          className="flex h-12 w-12 items-center justify-center rounded-xl"
          style={{ background: hex(blue500, 0.12) }}
        >
          <FileText className="w-6 h-6" style={{ color: hex(blue500, 0.9) }} />
        </div>
        <div>
          <div className="text-white text-lg font-semibold">22+ Written Assets Per Webinar</div>
          <div className="text-sm" style={{ color: "#8B8D96" }}>
            Blog post, social copy, newsletter, and lead magnet that drive results
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

export default function WrittenAssets({ className }: { className?: string }) {
  return (
    <div className={cn("mx-auto w-full max-w-full sm:max-w-[1200px]", className)}>
      {/* Direct content - no inner frame */}
      <div className="mx-auto min-h-[600px] px-4 py-8 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 cards-grid">
          <BlogCard />
          <NewsletterCard />
          <SocialCopyCard />
          <LeadMagnetCard />
          <LandingPageCard />
          <PostSchedulingCard />
        </div>
      </div>
    </div>
  );
}

function CardBase({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      className="card hover-glow-blue relative h-full w-full rounded-xl border border-blue-500/20 bg-black p-5"
      whileHover={{ y: -4, boxShadow: "0 20px 40px rgba(59,130,246,0.10)" }}
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

function BlogCard() {
  return (
    <CardBase>
      <TitleRow icon={<FileText />} title="Blog Post" subtitle="1 SEO-optimized article (flexible length)" />
      {/* Page sheet */}
      <div className="mt-3 relative rounded-lg border overflow-hidden" style={{ borderColor: '#2A2B35', boxShadow: '0 6px 18px rgba(0,0,0,0.25)' }}>
        {/* page fold */}
        <div className="absolute top-2 right-2 w-3 h-3 rotate-45 bg-white/5 skeleton" />
        {/* Hero image placeholder */}
        <div className="h-16 bg-white/5 skeleton" />
        <div className="p-3 space-y-2">
          {/* Title */}
          <motion.div className="h-3 rounded bg-white/10 skeleton" initial={{ width: 0 }} animate={{ width: '70%' }} transition={{ duration: 0.8 }} />
          {/* Meta */}
          <motion.div className="h-2 rounded bg-white/10 skeleton" initial={{ width: 0 }} animate={{ width: '40%' }} transition={{ duration: 0.8, delay: 0.05 }} />
          <div className="h-px bg-white/5 my-1" />
          {/* Paragraph lines */}
          {[0.95, 0.88, 0.75].map((w, i) => (
            <motion.div key={i} className="h-2 rounded bg-white/10 skeleton" initial={{ width: 0 }} animate={{ width: `${w * 100}%` }} transition={{ duration: 0.8, delay: 0.1 + i * 0.08 }} />
          ))}
          {/* Footer tag */}
          <div className="mt-2 h-2 w-20 rounded bg-white/10 skeleton" />
        </div>
      </div>
    </CardBase>
  );
}

function NewsletterCard() {
  return (
    <CardBase>
      <TitleRow icon={<Mail />} title="Newsletter" subtitle="1 audience edition" />
      <div className="mt-3 rounded border overflow-hidden" style={{ borderColor: "#2A2B35" }}>
        {/* Header */}
        <div className="p-3 space-y-2">
          <motion.div className="h-3 w-2/3 rounded bg-white/10 skeleton" initial={{ width: 0 }} animate={{ width: '66%' }} transition={{ duration: 0.7 }} />
          <div className="h-px bg-white/5" />
          {/* Body */}
          {[0.95, 0.85, 0.7].map((w, i) => (
            <motion.div key={i} className="h-2 rounded bg-white/10 skeleton" initial={{ width: 0 }} animate={{ width: `${w * 100}%` }} transition={{ duration: 0.7, delay: 0.05 + i * 0.08 }} />
          ))}
          {/* CTA */}
          <div className="mt-2 h-6 w-24 rounded bg-white/10 skeleton" />
        </div>
      </div>
    </CardBase>
  );
}

function SocialCopyCard() {
  return (
    <CardBase>
      <TitleRow icon={<Briefcase />} title="Social Media Copy" subtitle="20 posts across all platforms" />
      <div className="mt-3 rounded border p-3" style={{ borderColor: "#2A2B35" }}>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-white/10" />
          <div className="h-2 w-24 rounded bg-white/10" />
        </div>
        <div className="mt-2 space-y-1.5">
          {[0.9, 0.7, 0.8, 0.6].map((w, i) => (
            <motion.div
              key={i}
              className="h-1.5 rounded bg-white/10 skeleton pulse-soft"
              initial={{ width: 0 }}
              animate={{ width: `${w * 100}%` }}
              transition={{ duration: 1, delay: i * 0.1 }}
            />
          ))}
        </div>
      </div>
    </CardBase>
  );
}

function LeadMagnetCard() {
  return (
    <CardBase>
      <TitleRow icon={<FilePlus2 />} title="Lead Magnet" subtitle="1 per webinar with landing page" />
      {/* Clear document with header stripe and stacked pages */}
      <div className="relative mt-3 h-32 overflow-hidden">
        {/* back pages */}
        <div className="absolute inset-2 translate-x-[2px] translate-y-[2px] rounded-lg border bg-white/5" style={{ borderColor: '#2A2B35' }} />
        <div className="absolute inset-2 translate-x-[4px] translate-y-[4px] rounded-lg border bg-white/5" style={{ borderColor: '#2A2B35' }} />
        {/* front page */}
        <div className="absolute inset-2 rounded-lg border bg-black/10" style={{ borderColor: '#2A2B35' }} />
        {/* spine/binding */}
        <div className="absolute top-2 bottom-2 left-3 w-2 rounded" style={{ background: 'rgba(255,255,255,0.08)' }} />
        {/* binding holes */}
        <div className="absolute left-3 top-6 bottom-6 flex flex-col justify-between">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.15)' }} />
          ))}
        </div>
        {/* Header stripe */}
        <div className="absolute left-4 right-4 top-4 h-3 rounded bg-white/10 skeleton" />
        {/* Body bullets */}
        <div className="absolute left-4 right-6 top-10 space-y-2">
          {[0.9, 0.8, 0.7].map((w, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-white/10 skeleton" />
              <motion.div className="h-2 rounded bg-white/10 skeleton" initial={{ width: 0 }} animate={{ width: `${w * 100}%` }} transition={{ duration: 0.7, delay: 0.05 + i * 0.08 }} />
            </div>
          ))}
        </div>
        {/* Badges */}
        <div className="absolute top-2 left-2 rounded-sm border px-1 py-0.5 text-[10px]" style={{ borderColor: '#2A2B35', background: '#0F1014', color: '#8B8D96' }}>
          PDF
        </div>
        <div className="absolute top-2 right-2 rounded-md border px-1.5 py-0.5 text-[11px]" style={{ borderColor: '#2A2B35', background: '#0F1014' }}>
          <Download className="w-3.5 h-3.5" />
        </div>
        <div className="absolute bottom-2 left-2 rounded-md border px-1.5 py-0.5 text-[11px]" style={{ borderColor: '#2A2B35', color: '#8B8D96', background: '#0F1014' }}>
          12 pages
        </div>
      </div>
    </CardBase>
  );
}

function LandingPageCard() {
  return (
    <CardBase>
      <TitleRow icon={<FilePlus2 />} title="Landing Pages" subtitle="Lead magnet capture pages" />
      {/* Browser window mockup */}
      <div className="mt-3 relative rounded-lg border overflow-hidden" style={{ borderColor: '#2A2B35' }}>
        {/* Browser chrome */}
        <div className="flex items-center gap-1 border-b px-2 py-1.5" style={{ borderColor: '#2A2B35', background: '#0F1014' }}>
          <div className="w-2 h-2 rounded-full bg-white/10" />
          <div className="w-2 h-2 rounded-full bg-white/10" />
          <div className="w-2 h-2 rounded-full bg-white/10" />
        </div>
        {/* Page content */}
        <div className="p-3 space-y-2">
          {/* Headline */}
          <motion.div className="h-3 w-3/4 rounded bg-white/10 skeleton" initial={{ width: 0 }} animate={{ width: '75%' }} transition={{ duration: 0.7 }} />
          {/* Subhead */}
          <motion.div className="h-2 w-5/6 rounded bg-white/10 skeleton" initial={{ width: 0 }} animate={{ width: '83%' }} transition={{ duration: 0.7, delay: 0.1 }} />
          {/* CTA Button */}
          <div className="mt-3 flex justify-center">
            <div className="h-6 w-24 rounded bg-blue-500/30 skeleton" />
          </div>
        </div>
      </div>
    </CardBase>
  );
}

function PostSchedulingCard() {
  const platforms = [
    { platform: 'LinkedIn', time: '9:00 AM', color: 'bg-blue-500/30', logo: LinkedInLogo, iconColor: 'text-blue-400' },
    { platform: 'Twitter/X', time: '2:00 PM', color: 'bg-cyan-500/30', logo: XLogo, iconColor: 'text-slate-300' },
    { platform: 'Instagram', time: '5:00 PM', color: 'bg-purple-500/30', logo: InstagramIcon, iconColor: 'text-pink-400' },
  ];

  return (
    <CardBase>
      <TitleRow icon={<BarChart3 />} title="Post Scheduling" subtitle="Automated across all platforms" />
      {/* Scheduling timeline mockup */}
      <div className="mt-3 space-y-3">
        {/* Platform rows with scheduled times */}
        {platforms.map((item, i) => (
          <motion.div
            key={item.platform}
            className="flex items-center gap-2"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + i * 0.1 }}
          >
            <div className={`flex-shrink-0 w-6 h-6 rounded-full bg-white/5 flex items-center justify-center ${item.iconColor}`}>
              <item.logo className="w-3 h-3" />
            </div>
            <div className="flex-1 rounded-lg border p-2" style={{ borderColor: '#2A2B35' }}>
              <div className="flex items-center justify-between">
                <span className="text-xs text-white/85">{item.platform}</span>
                <span className="text-[10px] text-slate-400/75">{item.time}</span>
              </div>
              <div className={`mt-1.5 h-1.5 rounded-full ${item.color}`} style={{ width: `${60 + i * 10}%` }} />
            </div>
          </motion.div>
        ))}
        {/* Optional: Multi-language note */}
        <div className="mt-3 rounded-lg border border-white/10 bg-[#11131C] p-2">
          <div className="text-[10px] text-slate-400/75">
            Optional: <InlineTooltip 
              text="Multi-language support"
              tooltip="We can translate both short-form video clips and social media posts into multiple languages, helping you reach different audiences and expand into new markets."
            /> available
          </div>
        </div>
      </div>
    </CardBase>
  );
}
