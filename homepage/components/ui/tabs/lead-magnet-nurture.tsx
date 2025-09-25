"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { slackTokens } from "@/lib/design-tokens";
import { cn } from "@/lib/utils";
import { Download, Mail, Handshake, DollarSign } from "lucide-react";

const blue500 = slackTokens.colors.blue[500];

function hex(hex: string, a: number) {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!m) return hex;
  const r = parseInt(m[1], 16);
  const g = parseInt(m[2], 16);
  const b = parseInt(m[3], 16);
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}

export default function LeadMagnetNurture({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { margin: "-80px", once: false });
  const [flip, setFlip] = useState(false);

  // Idle loop: flip PDF cover
  useEffect(() => {
    if (!inView) return;
    const t = setInterval(() => setFlip((f) => !f), 2200);
    return () => clearInterval(t);
  }, [inView]);

  return (
    <div ref={ref} className={cn("mx-auto max-w-5xl", className)}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Center PDF mock (span 2 cols on md) */}
        <div className="md:col-span-2 flex items-center justify-center">
          <motion.div
            className="relative w-72 h-44 [perspective:1000px]"
            animate={{}}
          >
            <motion.div
              className="absolute inset-0 rounded-xl border bg-[#0B121E] text-white"
              style={{ transformStyle: "preserve-3d", borderColor: hex(blue500, 0.3) }}
              animate={{ rotateY: flip ? 180 : 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* front cover */}
              <div className="absolute inset-0 p-4" style={{ backfaceVisibility: "hidden" }}>
                <div className="h-full w-full rounded-lg border border-white/10 bg-white/5 flex flex-col justify-between p-4">
                  <div>
                    <div className="text-sm text-slate-300">Downloadable Guide</div>
                    <h4 className="mt-2 font-semibold">Your Webinar to Lead Magnet</h4>
                  </div>
                  <div className="text-[11px] text-slate-400">PDF • 12 pages</div>
                </div>
              </div>
              {/* back content page */}
              <div className="absolute inset-0 p-4" style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}>
                <div className="h-full w-full rounded-lg border border-white/10 bg-white/5 p-3">
                  <div className="h-4 w-24 bg-white/10 rounded mb-2" />
                  <div className="h-16 w-full bg-white/10 rounded mb-2" />
                  <div className="grid grid-cols-3 gap-2">
                    <div className="h-16 bg-white/10 rounded" />
                    <div className="h-16 bg-white/10 rounded" />
                    <div className="h-16 bg-white/10 rounded" />
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
        {/* Right landing card */}
        <LandingCard />
      </div>

      {/* Nurture Flow */}
      <div className="mt-6">
        <FlowLine />
      </div>

      {/* Copy points */}
      <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-slate-300">
        <li className="hover-blue-outline rounded border border-white/10 bg-[#0B121E] px-3 py-2">1 downloadable guide / checklist</li>
        <li className="hover-blue-outline rounded border border-white/10 bg-[#0B121E] px-3 py-2">Landing copy + form microcopy</li>
        <li className="hover-blue-outline rounded border border-white/10 bg-[#0B121E] px-3 py-2">4-step email follow-up</li>
        <li className="hover-blue-outline rounded border border-white/10 bg-[#0B121E] px-3 py-2">UTM plan + simple KPI sheet</li>
      </ul>
    </div>
  );
}

function LandingCard() {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="rounded-xl border border-white/10 bg-[#0B121E] p-3 hover-blue-outline focus-within:ring-2 focus-within:ring-blue-500"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="text-sm text-slate-300 mb-2">Landing Preview</div>
      <div className="rounded-lg border border-white/10 bg-white/5 p-3">
        <div className="font-semibold text-white mb-2">Get the Guide</div>
        <ul className="text-[13px] text-slate-300 space-y-1 mb-3">
          <li>What to say on your landing</li>
          <li>Checklist: must-haves</li>
          <li>CTA copy examples</li>
        </ul>
        <div className="h-9 rounded bg-white/10 overflow-hidden relative">
          <div className="absolute inset-0 animate-pulse" style={{ background: `linear-gradient(90deg, ${hex(blue500, 0.12)} 0%, ${hex(blue500, 0.3)} 50%, ${hex(blue500, 0.12)} 100%)`, backgroundSize: '200% 100%' }} />
        </div>
        {/* CTA button with pulse */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          className="mt-3 inline-flex items-center gap-2 rounded-lg border px-3 py-1.5 text-sm text-white"
          style={{ borderColor: hex(blue500, 0.4), background: `linear-gradient(90deg, ${hex(blue500, 0.25)}, ${hex(blue500, 0.15)})` }}
        >
          Download now
          <motion.span
            className="inline-block w-2 h-2 rounded-full"
            style={{ backgroundColor: hex(blue500, 0.9) }}
            animate={{ opacity: [1, 0.4, 1], scale: [1, 1.15, 1] }}
            transition={{ duration: 1.2, repeat: Infinity }}
          />
        </motion.button>
        <div className="mt-2 text-[11px] text-slate-400">We will never spam you</div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 4 }}
        className="mt-2 text-[11px] text-slate-300"
      >
        Microcopy: clear privacy, instant download
      </motion.div>
    </div>
  );
}

function FlowLine() {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { margin: "-80px", once: false });
  const [cursor, setCursor] = useState({ x: 0, y: 0 });

  const steps = ["DL", "Thank-you", "Value email", "CTA email"];

  return (
    <div
      ref={ref}
      className="relative rounded-xl border border-white/10 bg-[#0B121E] p-3"
      onMouseMove={(e) => {
        const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
        setCursor({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      }}
      role="region"
      aria-label="Nurture flow"
    >
      <div className="text-sm text-slate-300 mb-2">Nurture flow</div>
      <div className="relative h-20">
        {/* baseline */}
        <div className="absolute top-1/2 left-4 right-4 -translate-y-1/2 h-1 bg-white/10 rounded" />
        {/* animated gradient sweep */}
        <motion.div
          className="absolute top-1/2 -translate-y-1/2 h-1 rounded"
          style={{ left: '1rem', right: '1rem', background: `linear-gradient(90deg, ${hex(blue500, 0.15)}, ${hex(blue500, 0.6)}, ${hex(blue500, 0.15)})` }}
          initial={{ width: 0 }}
          animate={inView ? { width: 'calc(100% - 2rem)' } : { width: 0 }}
          transition={{ duration: 1.2 }}
        />
        {/* nodes */}
        <div className="absolute inset-0 flex items-center justify-between px-4">
          {steps.map((s, i) => (
            <FlowNode key={i} label={s} i={i} inView={inView} cursor={cursor} />
          ))}
        </div>
      </div>
    </div>
  );
}

function FlowNode({ label, i, inView, cursor }: { label: string; i: number; inView: boolean; cursor: { x: number; y: number } }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [hovered, setHovered] = useState(false);
  const [tx, ty] = useMemo(() => {
    const el = ref.current;
    if (!el) return [0, 0];
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (cursor.x - (cx - el.parentElement!.getBoundingClientRect().left)) / rect.width;
    const dy = (cursor.y - (cy - el.parentElement!.getBoundingClientRect().top)) / rect.height;
    // Only nudge when hovered
    return hovered ? [dx * 2, dy * 2] : [0, 0];
  }, [cursor.x, cursor.y]);

  const Icon = label.startsWith('DL') ? Download : label.startsWith('Thank') ? Mail : label.startsWith('Value') ? Handshake : DollarSign;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
      transition={{ delay: i * 0.2, duration: 0.3 }}
      className={cn("inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[12px] border bg-[#0B121E] text-slate-200", hovered ? "shadow" : "")}
      style={{ borderColor: hex(blue500, 0.35), transform: `translate(${tx}px, ${ty}px)` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      tabIndex={0}
    >
      <Icon className="w-3.5 h-3.5 text-blue-300" />
      <span>{label}</span>
    </motion.div>
  );
}
