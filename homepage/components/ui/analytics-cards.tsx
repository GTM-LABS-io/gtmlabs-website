"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { BarChart3, Eye, Share2, MousePointerClick, Linkedin, Mail, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import { slackTokens } from "@/lib/design-tokens";

function hexToRgba(hex: string, alpha: number) {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!m) return hex;
  const r = parseInt(m[1], 16);
  const g = parseInt(m[2], 16);
  const b = parseInt(m[3], 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

/**
 * Animated analytics card grid to visually support the Results section.
 * - Idle loop: numbers gently count up then reset.
 * - Hover: card scales, counter nudges, tooltip fades.
 * - Scroll into view: bars fill and counters animate from 0.
 */
export default function AnalyticsCards({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const inView = useInView(containerRef, { margin: "-80px", once: false });

  return (
    <div ref={containerRef} className={cn("w-full max-w-xl mx-auto", className)}>
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        <MetricCard
          icon={<Share2 className="w-4 h-4" />}
          label="Shares"
          target={125}
          suffix="+"
          tooltip="Shares in the last 7 days"
          inView={inView}
        />
        <MetricCard
          icon={<Eye className="w-4 h-4" />}
          label="Views"
          target={2300}
          suffix=""
          tooltip="Total views across channels"
          inView={inView}
        />
        <MetricCard
          icon={<MousePointerClick className="w-4 h-4" />}
          label="CTR"
          target={35}
          suffix="%"
          tooltip="Click through rate"
          inView={inView}
        />
        <MiniChannels inView={inView} />
      </div>
      <div className="mt-4 rounded-xl border border-white/10 bg-[#090C14] p-3">
        <div className="flex items-center mb-2 gap-2 text-slate-200">
          <BarChart3 className="w-4 h-4 text-blue-300" />
          <span className="text-sm">Engagement by week</span>
        </div>
        <Bars inView={inView} />
      </div>
    </div>
  );
}

function MetricCard({
  icon,
  label,
  target,
  suffix,
  tooltip,
  inView,
}: {
  icon: React.ReactNode;
  label: string;
  target: number;
  suffix: string;
  tooltip: string;
  inView: boolean;
}) {
  const [flipped, setFlipped] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const count = useCountUp({ to: target, durationMs: 1300, loop: true, inView });
  const display = hovered ? count + 1 : count;

  const onMove: React.MouseEventHandler<HTMLDivElement> = (e) => {
    const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width; // 0..1
    const py = (e.clientY - rect.top) / rect.height; // 0..1
    const max = 10; // increased tilt intensity
    const ry = (px - 0.5) * max * 2; // left/right
    const rx = -(py - 0.5) * max * 2; // up/down
    setTilt({ rx, ry });
  };

  return (
    <motion.div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setTilt({ rx: 0, ry: 0 }); }}
      onMouseMove={onMove}
      onClick={() => setFlipped((f) => !f)}
      whileHover={{ scale: 1.05 }}
      className="relative rounded-xl border bg-[#090C14] p-3 shadow-sm cursor-pointer select-none perspective-1000"
      style={{
        transformStyle: "preserve-3d",
        transform: `perspective(800px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
        borderColor: hovered ? slackTokens.colors.blue[500] : 'rgba(255,255,255,0.1)',
        boxShadow: hovered
          ? `0 0 0 1px ${slackTokens.colors.blue[500]}, 0 10px 28px ${hexToRgba(slackTokens.colors.blue[500], 0.25)}`
          : '0 12px 30px rgba(0,0,0,0.4)'
      }}
    >
      <motion.div
        className="flex items-center justify-between gap-3"
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ type: "spring", stiffness: 180, damping: 18 }}
        style={{ backfaceVisibility: "hidden" }}
      >
        <div className="inline-flex items-center gap-2 text-slate-200">
          <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-white/5 text-white border border-white/10">
            {icon}
          </span>
          <span className="text-xs text-slate-400">{label}</span>
        </div>
        <motion.div className="text-lg font-semibold text-white tabular-nums"
          animate={hovered ? { scale: [1, 1.25, 1] } : { scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          {display}
          {suffix}
        </motion.div>
      </motion.div>

      {/* back side */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{ rotateY: flipped ? 0 : -180 }}
        transition={{ type: "spring", stiffness: 180, damping: 18 }}
        style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
      >
        {/* Donut ring: views by channel */}
        <DonutViewsByChannel />
      </motion.div>

      {/* tooltip */}
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 6 }}
        className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-black/70 px-2 py-1 text-[10px] text-slate-200 border border-white/10"
      >
        {tooltip}
      </motion.div>
    </motion.div>
  );
}

function Bars({ inView }: { inView: boolean }) {
  const barWidths = [30, 55, 68, 82, 74, 88];
  const blueStart = slackTokens.colors.blue[400];
  const blueEnd = slackTokens.colors.blue[600];
  return (
    <div className="space-y-1.5">
      {barWidths.map((w, i) => (
        <div key={i} className="h-2 w-full rounded bg-white/5 overflow-hidden">
          <motion.div
            className="h-full"
            style={{ backgroundImage: `linear-gradient(to right, ${blueStart}, ${blueEnd})` }}
            initial={{ width: 0 }}
            animate={inView ? { width: `${w}%`, transition: { duration: 1.2 } } : { width: 0 }}
          />
        </div>
      ))}
    </div>
  );
}

function MiniChannels({ inView }: { inView: boolean }) {
  const items = useMemo(
    () => [
      { icon: <Linkedin className="w-3.5 h-3.5" />, label: "LinkedIn", value: 10 },
      { icon: <Mail className="w-3.5 h-3.5" />, label: "Email", value: 4 },
      { icon: <FileText className="w-3.5 h-3.5" />, label: "Blog", value: 3 },
    ],
    []
  );
  return (
    <div className="rounded-xl border border-white/10 bg-[#090C14] p-3">
      <div className="grid grid-cols-3 gap-2">
        {items.map((it, i) => (
          <motion.div
            key={i}
            className="rounded-lg bg-white/5 p-2 text-center"
            whileHover={{ scale: 1.06 }}
          >
            <div className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-white/10 text-white mb-1">
              {it.icon}
            </div>
            <div className="text-[10px] text-slate-300">{it.label}</div>
            <div className="text-sm font-semibold text-white tabular-nums">{inView ? it.value : 0}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function useCountUp({ to, durationMs, loop, inView }: { to: number; durationMs: number; loop?: boolean; inView: boolean }) {
  const [val, setVal] = useState(0);
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    let raf = 0;
    let resetTimer: ReturnType<typeof setTimeout> | null = null;

    const step = (t: number) => {
      if (startRef.current == null) startRef.current = t;
      const progress = Math.min(1, (t - startRef.current) / durationMs);
      const next = Math.floor(progress * to);
      setVal(next);
      if (progress < 1 && inView) {
        raf = requestAnimationFrame(step);
      } else if (loop && inView) {
        resetTimer = setTimeout(() => {
          startRef.current = null;
          raf = requestAnimationFrame(step);
        }, 1200);
      }
    };

    if (inView) raf = requestAnimationFrame(step);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      if (resetTimer) clearTimeout(resetTimer);
      startRef.current = null;
    };
  }, [to, durationMs, loop, inView]);

  return val;
}

function DonutViewsByChannel() {
  const size = 120;
  const stroke = 10;
  const r = (size - stroke) / 2;
  const cx = size / 2;
  const cy = size / 2;
  const C = 2 * Math.PI * r;

  // Example distribution and colors (brand blues)
  const segments = [
    { pct: 0.45, color: slackTokens.colors.blue[600] },
    { pct: 0.30, color: slackTokens.colors.blue[500] },
    { pct: 0.15, color: slackTokens.colors.blue[400] },
    { pct: 0.10, color: '#ffffff' },
  ];

  // Animate by revealing dashoffset from full circumference to remaining
  const [reveal, setReveal] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    let start: number | null = null;
    const duration = 900; // ms
    const step = (t: number) => {
      if (start == null) start = t;
      const p = Math.min(1, (t - start) / duration);
      setReveal(p);
      if (p < 1) rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  let acc = 0;

  return (
    <div className="flex flex-col items-center justify-center text-slate-200">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}
        className="drop-shadow-[0_8px_24px_rgba(0,0,0,0.35)]">
        {/* background track */}
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth={stroke} />
        {segments.map((seg, i) => {
          const length = C * seg.pct;
          const gap = C - length;
          const offset = (C * (1 - acc)) + gap; // start at end of arc
          acc += seg.pct;
          return (
            <circle
              key={i}
              cx={cx}
              cy={cy}
              r={r}
              fill="none"
              stroke={seg.color}
              strokeWidth={stroke}
              strokeDasharray={`${length} ${gap}`}
              strokeDashoffset={(1 - reveal) * (length + gap)}
              transform={`rotate(-90 ${cx} ${cy})`}
              style={{ transition: 'stroke-dashoffset 0.9s ease-out' }}
            />
          );
        })}
      </svg>
      <div className="mt-2 text-[11px] text-slate-300">Views by channel</div>
    </div>
  );
}
