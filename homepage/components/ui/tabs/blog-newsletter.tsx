"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { slackTokens } from "@/lib/design-tokens";
import { cn } from "@/lib/utils";

const blue500 = slackTokens.colors.blue[500];

const OUTLINE = [
  { level: 1, text: "Turning a Webinar into Evergreen Content" },
  { level: 2, text: "Find the Core Thesis" },
  { level: 2, text: "Outline the Pillar Article" },
  { level: 3, text: "Intro: Setup the Problem" },
  { level: 3, text: "Section: 5 Key Takeaways" },
  { level: 3, text: "Case Example: Real Outcomes" },
  { level: 2, text: "Support Articles" },
  { level: 3, text: "How-to: Tactical Guide" },
  { level: 3, text: "SEO: What to Target" },
  { level: 2, text: "Summary + CTA" },
];

function hex(hex: string, a: number) {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!m) return hex;
  const r = parseInt(m[1], 16);
  const g = parseInt(m[2], 16);
  const b = parseInt(m[3], 16);
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}

export default function BlogNewsletter({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { margin: "-80px", once: false });

  const [activeIdx, setActiveIdx] = useState(0);
  const [progress, setProgress] = useState(0);
  const outlineRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<Array<HTMLLIElement | null>>([]);

  // Idle loop: glide through outline, update progress bar
  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    let last = performance.now();
    let t = 0;
    const step = (now: number) => {
      const dt = Math.min(100, now - last);
      last = now;
      t += dt;
      if (t > 900) {
        setActiveIdx((v) => (v + 1) % OUTLINE.length);
        t = 0;
      }
      setProgress((p) => (p + dt * 0.0005) % 1);
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView]);

  // Auto-scroll outline as active item changes
  useEffect(() => {
    const el = itemRefs.current[activeIdx];
    const container = outlineRef.current;
    if (el && container) {
      el.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
  }, [activeIdx]);

  return (
    <div ref={ref} className={cn("mx-auto max-w-5xl", className)}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Outline */}
        <div ref={outlineRef} className="rounded-xl border border-white/10 bg-[#0B121E] p-3 max-h-56 overflow-y-auto">
          <div className="text-sm text-slate-300 mb-2">Outline</div>
          <ul className="space-y-1">
            {OUTLINE.map((item, idx) => (
              <li
                key={idx}
                ref={(el) => { itemRefs.current[idx] = el }}
                className={cn("relative text-sm rounded px-2 py-1", activeIdx === idx && "bg-white/5")}
                style={{ paddingLeft: `${(item.level - 1) * 12}px` }}
              >
                {/* Cursor bar */}
                {activeIdx === idx && (
                  <motion.span
                    className="absolute left-0 top-1/2 -translate-y-1/2 h-4 w-0.5 rounded bg-blue-500"
                    initial={{ opacity: 0, scaleY: 0.5 }}
                    animate={{ opacity: 1, scaleY: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                )}
                <span className={cn("text-slate-400", activeIdx === idx && "text-white")}>{item.text}</span>
              </li>
            ))}
          </ul>
        </div>
        {/* Reading view */}
        <div className="rounded-xl border border-white/10 bg-[#0B121E] p-3">
          <div className="flex items-center justify-between text-sm text-slate-300 mb-2">
            <span>Pillar article preview</span>
            <span className="text-xs text-slate-400">~ 7 min read</span>
          </div>
          <div className="h-40 rounded bg-white/5 mb-3" />
          {/* Progress bar */}
          <div className="h-2 w-full rounded bg-white/10 overflow-hidden">
            <motion.div
              className="h-full"
              style={{ backgroundImage: `linear-gradient(to right, ${hex(blue500, 0.8)}, ${hex(blue500, 0.5)})` }}
              initial={{ width: 0 }}
              animate={{ width: `${Math.max(10, Math.floor(progress * 100))}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>
        </div>
      </div>

      {/* Newsletter Series */}
      <div className="mt-4">
        <div className="text-sm text-slate-300 mb-2">Newsletter Series</div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <SubjectCard title="Issue 1" subjects={["5 takeaways", "3 patterns", "What to save"]} />
          <SubjectCard title="Issue 2" subjects={["Case example", "How it landed", "Why it worked"]} />
          <SubjectCard title="Issue 3" subjects={["How-to", "Checklist", "Template"]} />
        </div>
        {/* Engagement stats strip */}
        <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-2 text-[12px] text-slate-300">
          <EngageStat label="Open rate" value={42} suffix="%" />
          <EngageStat label="CTR" value={6.4} suffix="%" />
          <EngageStat label="Sends" value={3} suffix=" emails" />
          <EngageStat label="Links inside" value={5} suffix="" />
        </div>
      </div>

      {/* Copy points */}
      <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-slate-300">
        <li className="hover-blue-outline rounded border border-white/10 bg-[#0B121E] px-3 py-2">1 pillar blog + 2 support articles</li>
        <li className="hover-blue-outline rounded border border-white/10 bg-[#0B121E] px-3 py-2">3-email mini series (nurture)</li>
        <li className="hover-blue-outline rounded border border-white/10 bg-[#0B121E] px-3 py-2">Internal links + meta ready</li>
        <li className="hover-blue-outline rounded border border-white/10 bg-[#0B121E] px-3 py-2">Editor-friendly handoff</li>
      </ul>
    </div>
  );
}

function SubjectCard({ title, subjects }: { title: string; subjects: string[] }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { margin: "-80px", once: false });
  const [idx, setIdx] = useState(0);
  const [typed, setTyped] = useState("");

  // Smooth typewriter without stale closures
  useEffect(() => {
    if (!inView) return;
    const target = subjects[idx % subjects.length];
    let pos = 0;
    let timer: number | undefined;
    const step = () => {
      setTyped(target.slice(0, pos));
      pos += 1;
      if (pos <= target.length) {
        timer = window.setTimeout(step, 60);
      } else {
        timer = window.setTimeout(() => setIdx((v) => (v + 1) % subjects.length), 800);
      }
    };
    step();
    return () => {
      if (timer) window.clearTimeout(timer);
    };
  }, [inView, idx, subjects]);

  return (
    <div ref={ref} className="rounded-xl border border-white/10 bg-[#0B121E] p-3 focus-within:ring-2 focus-within:ring-blue-500">
      <div className="text-sm text-slate-300 mb-2">{title}</div>
      <div className="rounded bg-white/5 p-3 h-20 flex items-center text-slate-200 text-sm">
        <span className="text-slate-400 mr-2">Subject:</span>
        <span className="tabular-nums inline-flex items-center gap-1">
          {typed}
          <motion.span
            initial={{ opacity: 1 }}
            animate={{ opacity: [1, 0.2, 1] }}
            transition={{ duration: 0.9, repeat: Infinity }}
          >|
          </motion.span>
        </span>
      </div>
    </div>
  );
}

function EngageStat({ label, value, suffix }: { label: string; value: number; suffix: string }) {
  return (
    <div className="rounded-lg border border-white/10 bg-[#0B121E] p-2">
      <div className="text-[11px] text-slate-400">{label}</div>
      <div className="flex items-end justify-between">
        <div className="text-sm font-semibold text-white">
          {value}
          {suffix}
        </div>
        <div className="w-14 h-1.5 bg-white/10 rounded overflow-hidden">
          <motion.div
            className="h-full"
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(100, Math.round((value / 100) * 100))}%` }}
            transition={{ duration: 0.5 }}
            style={{ background: `linear-gradient(90deg, ${hex(blue500, 0.8)}, ${hex(blue500, 0.4)})` }}
          />
        </div>
      </div>
    </div>
  );
}
