"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { slackTokens } from "@/lib/design-tokens";
import { cn } from "@/lib/utils";
import { Video, PanelsTopLeft, MessageSquare, Timer } from "lucide-react";

const blue500 = slackTokens.colors.blue[500];
const blue400 = slackTokens.colors.blue[400];
const blue600 = slackTokens.colors.blue[600];

const POSTS = Array.from({ length: 14 }).map((_, i) => {
  const types = ["Clip", "Hook", "Carousel"] as const;
  const t = types[i % types.length];
  const idx = (i % 12) + 1;
  const channel = ["LinkedIn", "X", "TikTok", "IG"][i % 4];
  const hook = [
    "Quick win insight",
    "Counter-intuitive angle",
    "Step-by-step tip",
    "Case snippet",
  ][i % 4];
  return {
    id: `post-${i}`,
    day: i + 1,
    badge: `${t} ${t === "Hook" ? String.fromCharCode(65 + (i % 3)) : String(idx).padStart(2, "0")}${t === "Clip" ? "/12" : ""}`,
    channel,
    hook,
    cta: ["Read more", "Try this", "Save this", "Reply"][i % 4],
  };
});

export default function SocialCalendar({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { margin: "-80px", once: false });
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [clipCount, setClipCount] = useState(0);

  // Fast tick-up to 12 on mount/inView
  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const duration = 400;
    const step = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      setClipCount(Math.floor(12 * p));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView]);

  const containerVariants = {
    show: {
      transition: { staggerChildren: 0.06 },
    },
  } as const;

  const itemVariants = {
    hidden: { opacity: 0, y: 8 },
    show: { opacity: 1, y: 0, transition: { duration: 0.25 } },
  } as const;

  return (
    <div
      ref={ref}
      className={cn("relative mx-auto max-w-5xl", className)}
      onMouseMove={(e) => {
        const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
        setCursor({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      }}
      role="region"
      aria-label="Social calendar grid"
    >
      {/* Title Row */}
      <div className="mb-3 flex items-baseline justify-between px-2">
        <div className="text-sm text-slate-300">14-day plan</div>
        <div className="flex items-center gap-3 text-xs text-slate-400">
          <span>Channels: LinkedIn, X, TikTok, IG</span>
          <span className="rounded px-1.5 py-0.5 border" style={{ borderColor: hex(blue500, 0.25), color: "#BFDBFE" }}>
            Clips {clipCount}/12
          </span>
        </div>
      </div>

      {/* Coverage bar */}
      <div className="px-2 mb-3">
        <div className="h-1.5 w-full rounded bg-white/10 overflow-hidden">
          <motion.div
            className="h-full"
            style={{ backgroundImage: `linear-gradient(to right, ${hex(blue500, 0.8)}, ${hex(blue500, 0.4)})` }}
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(100, Math.round((clipCount / 12) * 100))}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
        <div className="mt-1 text-[11px] text-slate-400">Coverage: {clipCount}/12 clips scheduled</div>
      </div>

      {/* Sweep line idle loop */}
      <motion.div
        className="pointer-events-none absolute top-8 bottom-2 left-0 right-0"
        initial={{ x: "-110%" }}
        animate={inView ? { x: ["-110%", "110%"], transition: { duration: 3.8, repeat: Infinity, repeatDelay: 1.2 } } : {}}
      >
        <div
          className="h-full w-24 rounded bg-gradient-to-r from-transparent to-transparent"
          style={{
            backgroundImage: `linear-gradient(to right, transparent, ${hex(blue500, 0.16)}, transparent)`,
          }}
        />
      </motion.div>

      {/* Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
        layout
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-2"
      >
        {POSTS.map((p, i) => (
          <CalendarTile key={p.id} p={p} i={i} cursor={cursor} />
        ))}
      </motion.div>

      {/* Copy chips (compact, brand-blue outline on hover) */}
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
        <CalloutChip icon={<Video className="w-3.5 h-3.5" />} text="10 to 15 clips and carousels" />
        <CalloutChip icon={<MessageSquare className="w-3.5 h-3.5" />} text="LinkedIn daily for two weeks" />
        <CalloutChip icon={<PanelsTopLeft className="w-3.5 h-3.5" />} text="Hooks, CTAs, and captions included" />
        <CalloutChip icon={<Timer className="w-3.5 h-3.5" />} text="Delivered in 72 hours" />
      </div>
    </div>
  );
}

function CalendarTile({ p, i, cursor }: { p: (typeof POSTS)[number]; i: number; cursor: { x: number; y: number } }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { margin: "-80px", once: false });
  const [hovered, setHovered] = useState(false);
  const [focus, setFocus] = useState(false);

  // Magnetic nudge ~1-2px
  const [tx, ty] = useMemo(() => {
    const el = ref.current;
    if (!el) return [0, 0];
    const rect = el.getBoundingClientRect();
    const localX = cursor.x - (rect.left - el.parentElement!.getBoundingClientRect().left);
    const localY = cursor.y - (rect.top - el.parentElement!.getBoundingClientRect().top);
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const dx = (localX - cx) / rect.width;
    const dy = (localY - cy) / rect.height;
    // Only nudge when hovered to reduce jitter on large pointer moves
    if (!hovered) return [0, 0];
    return [dx * 2, dy * 2];
  }, [cursor.x, cursor.y, hovered]);

  const itemVariants = {
    hidden: { opacity: 0, y: 8 },
    show: { opacity: 1, y: 0, transition: { duration: 0.25, delay: i * 0.05 } },
  } as const;

  return (
    <motion.div
      ref={ref}
      variants={itemVariants}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      layout
      className="group relative rounded-lg border border-white/10 bg-[#0B121E] p-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 transition-transform focus-visible:scale-[1.01] transform-gpu"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
      style={{
        transform: `translate(${tx}px, ${ty}px)`,
        boxShadow: hovered ? `0 0 0 1px ${hex(blue500, 0.7)}, 0 10px 26px ${hex(blue500, 0.25)}` : undefined,
      }}
      whileHover={{ y: -4 }}
      tabIndex={0}
      role="button"
      aria-label={`Day ${p.day} ${p.channel} post`}
    >
      {/* Channel halo */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: hovered ? 0.18 : 0.1 }}
        transition={{ duration: 0.25 }}
        style={{
          boxShadow: `0 0 0 1px ${hex(blue500, 0.15)}, 0 6px 18px ${hex(blue500, 0.18)}`,
        }}
      />

      {/* Channel pill */}
      <motion.span
        className="absolute top-2 right-2 z-10 rounded-full border bg-[#0C1423]/80 text-[#BFDBFE] px-1.5 py-0.5 text-[10px]"
        style={{ borderColor: hex(blue500, 0.25) }}
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, delay: 0.05 + i * 0.02 }}
      >
        {channelAbbr(p.channel)}
      </motion.span>
      <div className="flex items-center justify-between text-[11px] text-slate-400">
        <span>Day {p.day}</span>
        <span
          className="rounded px-1 py-0.5 border"
          style={{ borderColor: hex(blue500, 0.25), color: "#BFDBFE" }}
        >
          {p.badge}
        </span>
      </div>
      <div className="mt-2 h-24 rounded bg-white/5 will-change-transform" />
      {/* Hover metadata */}
      <motion.div
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 4 }}
        className="mt-2 text-[11px] text-slate-300"
      >
        <div className="flex items-center justify-between"><span>Hook</span><span className="text-slate-400">{p.hook}</span></div>
        <div className="flex items-center justify-between"><span>CTA</span><span className="text-slate-400">{p.cta}</span></div>
        <div className="flex items-center justify-between"><span>Target</span><span className="text-slate-400">{p.channel}</span></div>
      </motion.div>
    </motion.div>
  );
}

function hex(hex: string, a: number) {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!m) return hex;
  const r = parseInt(m[1], 16);
  const g = parseInt(m[2], 16);
  const b = parseInt(m[3], 16);
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}

function CalloutChip({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="hover-blue-outline rounded-lg border border-white/10 bg-[#0B121E] px-3 py-2 flex items-center gap-2">
      <span className="inline-flex items-center justify-center w-6 h-6 rounded-md border border-white/10 bg-white/5 text-white">
        {icon}
      </span>
      <span className="text-sm text-slate-300">{text}</span>
    </div>
  );
}

function channelAbbr(ch: string) {
  switch (ch) {
    case 'LinkedIn': return 'LI';
    case 'TikTok': return 'TT';
    case 'IG': return 'IG';
    case 'X': return 'X';
    default: return ch.slice(0, 2).toUpperCase();
  }
}
