"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { slackTokens } from "@/lib/design-tokens";
import { cn } from "@/lib/utils";
import { ThinBlueBorderCard } from "@/components/ui/thin-blue-border-card";
import { FileText, Mail, Briefcase, FilePlus2, BarChart3, MailOpen, Check, Download, CheckCircle } from "lucide-react";

const blue500 = slackTokens.colors.blue[500];

function hex(hex: string, a: number) {
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
          <div className="text-white text-lg font-semibold">10+ Written Assets Per Webinar</div>
          <div className="text-sm" style={{ color: "#8B8D96" }}>
            Long-form blog posts, email newsletters, and lead magnets designed to convert
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
          <LinkedInCard />
          <LeadMagnetCard />
          <ExecSummaryCard />
          <EmailSeqCard />
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
      <TitleRow icon={<FileText />} title="Blog Posts" subtitle="2,000+ word SEO articles" />
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
      <TitleRow icon={<Mail />} title="Newsletters" subtitle="Weekly digest ready" />
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

function LinkedInCard() {
  return (
    <CardBase>
      <TitleRow icon={<Briefcase />} title="LinkedIn Content" subtitle="10+ posts per webinar" />
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
      <TitleRow icon={<FilePlus2 />} title="Lead Magnets" subtitle="Downloadable guides" />
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

function ExecSummaryCard() {
  return (
    <CardBase>
      <TitleRow icon={<BarChart3 />} title="Executive Summaries" subtitle="Key insights extracted" />
      <ul className="mt-3 space-y-1.5 text-[13px]">
        {[
          { text: "Top 5 takeaways", w: 0.85 },
          { text: "What to prioritize", w: 0.72 },
          { text: "Risks and blockers", w: 0.65 },
        ].map((t, i) => (
          <motion.li
            key={i}
            className="flex items-center gap-2"
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + i * 0.12 }}
          >
            <motion.span
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1 + i * 0.12 }}
            >
              <CheckCircle className="w-4 h-4" style={{ color: hex(blue500, 0.9) }} />
            </motion.span>
            <div className="h-2 rounded bg-white/10 skeleton" style={{ width: `${t.w * 100}%` }} />
          </motion.li>
        ))}
      </ul>
    </CardBase>
  );
}

function EmailSeqCard() {
  return (
    <CardBase>
      <TitleRow icon={<MailOpen />} title="Email Sequences" subtitle="5-part nurture series" />
      <div className="mt-4 px-1">
        <div className="flex items-end justify-between">
          {[
            { label: 'Thank you' },
            { label: 'Value tip' },
            { label: 'Case study' },
            { label: 'Offer' },
            { label: 'Reminder' },
          ].map((step, i) => (
            <div key={i} className="flex flex-col items-center">
              <motion.div className="w-3 h-3 rounded-full bg-white/10 skeleton" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 + i * 0.08 }} />
              <div className="mt-1 text-[11px]" style={{ color: '#8B8D96' }}>{step.label}</div>
            </div>
          ))}
        </div>
        {/* connectors */}
        <div className="mt-2 flex items-center justify-between">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex-1 mx-1 h-1 rounded bg-white/10 skeleton" />
          ))}
        </div>
      </div>
    </CardBase>
  );
}
