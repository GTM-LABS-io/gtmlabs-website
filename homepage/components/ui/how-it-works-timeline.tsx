"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, type Variants } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ShimmerBorder } from "@/components/ui/shimmer-border";

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

  const renderSkeleton = (index: number) => {
    switch (index) {
      case 0:
        return (
          <div className="relative flex h-64 w-full flex-col overflow-hidden rounded-xl border border-[#23242C] bg-[#0B0D14] p-4">
            <div className="absolute inset-x-4 top-4 h-12 rounded-full bg-gradient-to-r from-blue-500/25 via-transparent to-blue-500/25 blur-xl" />
            <div className="relative z-10 flex h-full flex-col justify-between gap-4 text-[11px] text-slate-300/85">
              <div className="flex items-center justify-between uppercase tracking-[0.18em] text-[10px] text-slate-400/85">
                <span>Portal Preview</span>
                <span className="rounded-full bg-blue-500/20 px-2 py-0.5 text-[10px] font-semibold text-blue-100/90">30s</span>
              </div>
              <div className="space-y-3 rounded-xl border border-white/10 bg-[#11131C] p-4">
                <div className="text-xs font-semibold text-white/85">Paste webinar URL</div>
                <div className="rounded-lg border border-white/10 bg-[#0B0D14] px-3 py-2 font-mono text-[11px] text-slate-300/90">
                  https://youtube.com/your-webinar
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="flex items-center gap-1 rounded-full bg-blue-500/20 px-2 py-0.5 text-blue-100/90">
                    <span className="h-2 w-2 rounded-full bg-blue-300" />
                    Auto import
                  </span>
                  <span className="flex items-center gap-1 rounded-full bg-white/5 px-2 py-0.5 text-slate-200/80">
                    <span className="h-2 w-2 rounded-full bg-emerald-400/80" />
                    Status: ready
                  </span>
                  <span className="flex items-center gap-1 rounded-full bg-white/5 px-2 py-0.5 text-slate-200/80">
                    <span className="h-2 w-2 rounded-full bg-amber-300/80" />
                    Progress sync
                  </span>
                </div>
                <div className="flex justify-end">
                  <span className="rounded-md bg-blue-500/35 px-3 py-1 text-[10px] font-semibold text-blue-100">Upload confirmed</span>
                </div>
              </div>
              <div className="flex items-center gap-2 rounded-lg border border-white/5 bg-[#10131C] px-3 py-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400/70" />
                <span className="text-[10px] text-slate-400/85">Real-time progress tracker syncing</span>
              </div>
            </div>
          </div>
        );
      case 1:
        return (
          <div className="relative grid h-64 w-full overflow-hidden rounded-xl border border-[#23242C] bg-[#0B0D14] p-4 md:grid-cols-2">
            <div className="space-y-3 text-[11px] text-slate-300/85">
              <div className="flex items-center gap-2 text-xs font-medium text-white/85">
                <span className="rounded bg-blue-500/20 px-2 py-1 uppercase tracking-wide text-blue-200">AI workflow</span>
                <span className="text-slate-400/80">Hours 0-24</span>
              </div>
              <div className="rounded-lg border border-white/10 bg-[#11131C] p-3">
                <div className="text-xs font-semibold text-white/80">Transcript + analysis</div>
                <div className="mt-2 text-[10px] text-slate-400/75">
                  Model extracts hooks, timestamps, and quotable moments.
                </div>
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <div className="rounded-md bg-blue-500/20 p-2 text-blue-100/90">
                    <div className="text-xs font-semibold">50+ clips</div>
                    <div className="text-[10px]">Auto-generated</div>
                  </div>
                  <div className="rounded-md bg-white/5 p-2">
                    <div className="text-xs font-semibold text-white/85">Quote bank</div>
                    <div className="text-[10px] text-slate-400/75">Highlight extraction</div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 text-[10px] text-slate-400/80">
                {['Brand voice', 'Style guide', 'Editorial QA'].map((label) => (
                  <div key={label} className="rounded-md border border-white/10 bg-[#11131C] p-2">
                    <div className="text-xs font-semibold text-white/80">{label}</div>
                    <div className="mt-1 text-[10px]">Human review</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col justify-between rounded-lg border border-white/10 bg-[#11131C] p-4 text-[11px] text-slate-300/85">
              {[
                {
                  label: 'AI draft',
                  detail: 'Scripted captions + thumbnails',
                },
                {
                  label: 'Design pass',
                  detail: 'Layouts & storyboards set',
                },
                {
                  label: 'Human QA',
                  detail: 'Brand voice match + fact check',
                },
                {
                  label: 'Delivery prep',
                  detail: 'Package uploading to library',
                },
              ].map((step) => (
                <div key={step.label} className="flex items-start gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border border-blue-500/40 bg-blue-500/15 text-[10px] font-semibold text-blue-100/90">
                    {step.label.split(' ')[0]}
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-white/85">{step.label}</div>
                    <div className="text-[10px] text-slate-400/75">{step.detail}</div>
                  </div>
                </div>
              ))}
              <div className="rounded-lg border border-blue-500/30 bg-blue-500/10 p-3 text-left text-[10px] text-blue-100/90">
                <div className="text-xs font-semibold uppercase tracking-wide">Status: on track</div>
                <div className="mt-1">Editors polishing hero assets now.</div>
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="relative flex h-64 w-full flex-col overflow-hidden rounded-xl border border-[#23242C] bg-[#0B0D14] p-4">
            <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-purple-500/20 via-transparent to-transparent" />
            <div className="relative z-10 flex flex-1 flex-col gap-4 text-[11px] text-slate-300/85">
              <div className="grid flex-1 grid-cols-2 gap-3">
                {[
                  { title: 'SEO blog x2', detail: '2000+ words each', accent: 'bg-purple-500/25' },
                  { title: 'LinkedIn pack', detail: '20+ ready-to-post updates', accent: 'bg-blue-500/25' },
                  { title: 'Newsletter', detail: 'Monthly edition drafted', accent: 'bg-amber-500/25' },
                  { title: 'Short clips', detail: '10+ vertical edits', accent: 'bg-emerald-500/25' },
                ].map((card) => (
                  <div key={card.title} className="rounded-xl border border-white/10 bg-[#11131C] p-3">
                    <div className="text-xs font-semibold text-white/85">{card.title}</div>
                    <div className="mt-1 text-[10px] text-slate-400/75">{card.detail}</div>
                    <div className={`mt-3 h-8 rounded-md ${card.accent}`} />
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between rounded-lg border border-white/10 bg-[#10131C] px-3 py-2">
                <div>
                  <div className="text-xs font-semibold text-white/85">Publishing calendar</div>
                  <div className="text-[10px] text-slate-400/80">Drag-and-drop into your CMS</div>
                </div>
                <div className="rounded bg-blue-500/25 px-3 py-1 text-[10px] font-medium text-blue-100">Copy-ready</div>
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="relative flex h-64 w-full flex-col overflow-hidden rounded-xl border border-[#23242C] bg-[#0B0D14] p-4">
            <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-emerald-500/20 via-transparent to-transparent" />
            <div className="relative z-10 flex flex-1 flex-col text-[11px] text-slate-300/85">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/30 text-xs font-semibold text-emerald-100">ROI</div>
                <div>
                  <div className="text-xs font-semibold text-white/85">Growth dashboard</div>
                  <div className="text-[10px] text-slate-400/75">Compounding reach from every drop</div>
                </div>
              </div>
              <div className="flex flex-1 items-end gap-2 text-[10px] text-slate-400/80">
                {[
                  { label: 'Webinar', height: 45 },
                  { label: 'Email', height: 55 },
                  { label: 'Social', height: 68 },
                  { label: 'Leads', height: 82 },
                  { label: 'Sales', height: 90 },
                  { label: 'Retention', height: 94 },
                ].map((bar) => (
                  <div key={bar.label} className="flex flex-1 flex-col items-center justify-end gap-2">
                    <div className="w-full rounded-t bg-emerald-500/30" style={{ height: `${bar.height}%` }} />
                    <div>{bar.label}</div>
                  </div>
                ))}
              </div>
              <div className="mt-4 grid grid-cols-3 gap-3 text-[10px] text-slate-400/80">
                {[
                  { title: '+2x attendance', detail: 'Next webinar lift' },
                  { title: '500+ subs', detail: 'Monthly list growth' },
                  { title: '3-5x SQLs', detail: 'Pipeline velocity' },
                ].map((stat) => (
                  <div key={stat.title} className="rounded-lg border border-white/10 bg-[#11131C] p-3">
                    <div className="text-xs font-semibold text-white/85">{stat.title}</div>
                    <div className="mt-1 text-[10px]">{stat.detail}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="relative h-64 w-full overflow-hidden rounded-xl border border-[#23242C] bg-[#0B0D14] p-4">
            <div className="h-full w-full animate-pulse rounded-lg bg-white/5" />
          </div>
        );
    }
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
                  <ShimmerBorder className="block w-full" roundedClass="rounded-xl" borderColor="#3b82f6" duration={6} borderWidth={2}>
                    <div className={cn("flex items-center gap-3 rounded-xl border px-3 py-2", isActive ? "border-slate-600/40 bg-white/5" : "border-slate-700/30 bg-white/[0.02]")}> 
                      <div className={cn("h-8 w-8 rounded-lg flex items-center justify-center", isActive ? "bg-blue-500/15" : "bg-white/10")}> 
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-semibold text-white/90">{entry.title}</div>
                        <div className="text-xs text-slate-400">{entry.subtitle}</div>
                      </div>
                    </div>
                  </ShimmerBorder>
                </motion.div>

                {/* Invisible sentinel for proximity calc */}
                <div ref={(el) => setSentinelRef(el, index)} aria-hidden className="absolute -top-24 left-0 h-12 w-12 opacity-0" />

                {/* Content card */}
                <motion.article layout variants={fade} initial={false} transition={{ layout: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }} className={cn("flex-1 rounded-2xl border transition-all", isActive ? "border-slate-600/40 bg-[#0E1016] shadow-lg" : "border-slate-800/50 bg-[#0C0D12]")}> 
                  <div className="p-4 md:p-6">
                    {/* Skeleton visual tailored to each card */}
                    <div className="mb-4">{renderSkeleton(index)}</div>
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
