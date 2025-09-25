"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, type Variants } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type HowItWorksEntry = {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  subtitle: string;
  description: string;
  items?: string[];
  image?: string;
  button?: {
    url: string;
    text: string;
  };
};

export interface HowItWorksTimelineProps {
  title?: string;
  description?: string;
  entries: HowItWorksEntry[];
  className?: string;
}

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08 },
  },
};

const fade: Variants = {
  hidden: { opacity: 0, y: 8, filter: "blur(8px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { type: "spring" as const, stiffness: 120, damping: 16 } },
};

/**
 * Scroll-activated timeline.
 * - Left column is sticky and highlights the active item.
 * - Right column expands the active card and collapses the others.
 */
export default function HowItWorksTimeline({ title, description, entries, className }: HowItWorksTimelineProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const sentinelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const frameRef = useRef<number | null>(null);
  const lastIdxRef = useRef(0);
  const lastSwitchTimeRef = useRef(0);

  const setSentinelRef = (el: HTMLDivElement | null, i: number) => {
    sentinelRefs.current[i] = el;
  };

  useEffect(() => {
    const loop = () => {
      frameRef.current = requestAnimationFrame(loop);
      const centerY = window.innerHeight * 0.35; // original demo felt centered a bit higher
      let bestIndex = 0;
      let bestDist = Infinity;
      sentinelRefs.current.forEach((node, i) => {
        if (!node) return;
        const rect = node.getBoundingClientRect();
        const mid = rect.top + rect.height / 2;
        const dist = Math.abs(mid - centerY);
        if (dist < bestDist) {
          bestDist = dist;
          bestIndex = i;
        }
      });

      // Hysteresis to avoid ping-pong: require a margin and minimal interval
      const currentIndex = lastIdxRef.current;
      const currentNode = sentinelRefs.current[currentIndex];
      let currentDist = Infinity;
      if (currentNode) {
        const rect = currentNode.getBoundingClientRect();
        const mid = rect.top + rect.height / 2;
        currentDist = Math.abs(mid - centerY);
      }
      const margin = 80; // px, stronger hysteresis to avoid threshold ping-pong
      const now = performance.now();
      const minInterval = 320; // ms between switches to prevent rapid toggles
      if (bestIndex !== currentIndex && (bestDist + margin < currentDist) && (now - lastSwitchTimeRef.current > minInterval)) {
        lastIdxRef.current = bestIndex;
        setActiveIndex(bestIndex);
        lastSwitchTimeRef.current = now;
      }
    };
    frameRef.current = requestAnimationFrame(loop);
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <section className={cn("py-24", className)}>
      <div className="mx-auto w-full max-w-[1100px] px-4">
        {title && (
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl md:text-5xl font-bold gradient-headline">{title}</h2>
            {description && (
              <p className="mt-3 text-slate-400 md:text-lg">{description}</p>
            )}
          </div>
        )}

        <div className="mx-auto mt-14 max-w-4xl space-y-14 md:space-y-20">
          {entries.map((entry, index) => {
            const isActive = index === activeIndex;
            const Icon = entry.icon;
            return (
              <motion.div key={index} variants={container} initial="hidden" whileInView="show" viewport={{ amount: 0.4, once: false }} className="relative flex flex-col gap-4 md:flex-row md:gap-10">
                {/* Sticky meta column */}
                <motion.div variants={fade} className="md:sticky md:top-24 md:h-min w-full md:w-64 shrink-0">
                  <div className={cn("flex items-center gap-3 rounded-xl border px-3 py-2", isActive ? "border-slate-600/40 bg-white/5" : "border-slate-700/30 bg-white/[0.02]")}> 
                    <div className={cn("h-8 w-8 rounded-lg flex items-center justify-center", isActive ? "bg-blue-500/15" : "bg-white/10")}> 
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-semibold text-white/90">{entry.title}</div>
                      <div className="text-xs text-slate-400">{entry.subtitle}</div>
                    </div>
                  </div>
                </motion.div>

                {/* Invisible sentinel for proximity calc */}
                <div ref={(el) => setSentinelRef(el, index)} aria-hidden className="absolute -top-24 left-0 h-12 w-12 opacity-0" />

                {/* Content card */}
                <motion.article layout variants={fade} initial={false} transition={{ layout: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }} className={cn("flex-1 rounded-2xl border transition-all", isActive ? "border-slate-600/40 bg-[#0E1016] shadow-lg" : "border-slate-800/50 bg-[#0C0D12]")}> 
                  <div className="p-4 md:p-6">
                    {/* Skeleton visual instead of images */}
                    <div className="mb-4 h-64 w-full rounded-xl border skeleton overflow-hidden" style={{ borderColor: '#23242C' }}>
                      <div className="absolute inset-0 p-4 space-y-2">
                        <div className="h-3 w-2/3 rounded bg-white/10 skeleton" />
                        <div className="h-2 w-1/2 rounded bg-white/10 skeleton" />
                        <div className="h-2 w-5/6 rounded bg-white/10 skeleton" />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <h3 className={cn("text-lg md:text-xl font-semibold", isActive ? "text-white" : "text-white/80")}>{entry.title}</h3>
                      <p className={cn("text-sm leading-relaxed text-slate-400 transition-all", isActive ? "line-clamp-none" : "line-clamp-2")}>{entry.description}</p>
                    </div>

                    <motion.div layout className={cn("grid transition-all", isActive ? "grid-rows-[1fr] opacity-100 pt-3" : "grid-rows-[0fr] opacity-0")}> 
                      <div className="overflow-hidden">
                        {entry.items && entry.items.length > 0 && (
                          <ul className="mt-2 space-y-2">
                            {entry.items.map((item, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-blue-400/70" />
                                <span className="leading-relaxed">{item}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                        {entry.button && (
                          <div className="mt-4 flex justify-end">
                            <Button variant="default" size="sm" className="group">
                              <a href={entry.button.url} className="inline-flex items-center" target="_blank" rel="noreferrer">
                                {entry.button.text}
                                <ArrowUpRight className="ml-1.5 h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                              </a>
                            </Button>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  </div>
                </motion.article>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
