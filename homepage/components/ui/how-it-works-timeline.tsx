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
 * MOTION_GUARDS
 *
 * Guardrail: Do NOT modify these values without review.
 * Only card content (text/images) should be edited elsewhere.
 */
export const MOTION_GUARDS = Object.freeze({
  // Simple easing to match reference - no complex curves
  easing: "easeOut" as const,
  durations: Object.freeze({
    // Match reference: simple CSS transitions, no rushing
    layout: 0.3, // Keep Framer Motion minimal
    default: 0.3,
    css: 500, // 500ms like reference (duration-500)
    content: 500, // Main expand/collapse timing
    opacity: 300, // Slightly faster opacity
  }),
  zones: Object.freeze({
    expandStartRatio: 0.75, // expand starts 75% down the viewport
    collapseEndRatio: 0.5,  // collapse once bottom hits 50% (center)
    metaCenterRatio: 0.35,  // meta proximity center
  }),
});

/**
 * Scroll-activated timeline.
 * - Left column is sticky and highlights the active item.
 * - Right column expands the active card and collapses the others.
 */
export default function HowItWorksTimeline({ title, description, entries, className }: HowItWorksTimelineProps) {
  const [activeIndex, setActiveIndex] = useState(0); // Keep for meta card highlighting
  const [cardStates, setCardStates] = useState<boolean[]>(new Array(entries.length).fill(false)); // Individual card expand states
  const [navbarHeight, setNavbarHeight] = useState(80); // Default fallback
  const sentinelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const metaRefs = useRef<(HTMLDivElement | null)[]>([]);
  const frameRef = useRef<number | null>(null);
  const lastIdxRef = useRef(0);
  const lastSwitchTimeRef = useRef(0);

  // Dev-time watchdog to detect motion guard drift
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") {
      const expected = {
        easing: [0.23, 1, 0.32, 1] as const,
        durations: { layout: 1.2, default: 1.0, css: 1.0, content: 1.2, opacity: 1.0 },
        zones: { expandStartRatio: 0.75, collapseEndRatio: 0.5, metaCenterRatio: 0.35 },
      };
      const same =
        JSON.stringify(MOTION_GUARDS.easing) === JSON.stringify(expected.easing) &&
        JSON.stringify(MOTION_GUARDS.durations) === JSON.stringify(expected.durations) &&
        JSON.stringify(MOTION_GUARDS.zones) === JSON.stringify(expected.zones);
      if (!same) {
        // eslint-disable-next-line no-console
        console.warn("[HowItWorksTimeline] Motion guard values changed. This is restricted.");
      }
    }
  }, []);

  const setSentinelRef = (el: HTMLDivElement | null, i: number) => {
    sentinelRefs.current[i] = el;
  };

  const setCardRef = (el: HTMLElement | null, i: number) => {
    cardRefs.current[i] = el;
  };

  const setMetaRef = (el: HTMLDivElement | null, i: number) => {
    metaRefs.current[i] = el;
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
                    <div className="text-xs font-semibold">30+ clips</div>
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

  const renderMetaCard = (entry: HowItWorksEntry, isActive: boolean) => {
    const Icon = entry.icon;
    return (
      <ShimmerBorder
        className="block w-full"
        roundedClass="rounded-xl"
        borderColor="#3b82f6"
        duration={6}
        borderWidth={2}
      >
        <div
          className={cn(
            "flex items-center gap-3 rounded-xl border px-3 py-2",
            isActive ? "border-slate-600/40 bg-white/5" : "border-slate-700/30 bg-white/[0.02]"
          )}
        >
          <div
            className={cn(
              "h-8 w-8 rounded-lg flex items-center justify-center",
              isActive ? "bg-blue-500/15" : "bg-white/10"
            )}
          >
            <Icon className="h-4 w-4" />
          </div>
          <div className="flex-1">
            <div className="text-sm font-semibold text-white/90">{entry.title}</div>
            <div className="text-xs text-slate-400">{entry.subtitle}</div>
          </div>
        </div>
      </ShimmerBorder>
    );
  };

  useEffect(() => {
    const loop = () => {
      frameRef.current = requestAnimationFrame(loop);
      const viewportHeight = window.innerHeight;
      const expandZoneStart = viewportHeight * MOTION_GUARDS.zones.expandStartRatio;
      const expandZoneEnd = viewportHeight * MOTION_GUARDS.zones.collapseEndRatio;
      const centerY = viewportHeight * MOTION_GUARDS.zones.metaCenterRatio;
      
      // Calculate individual card states based on viewport position
      const newCardStates = cardRefs.current.map((card, i) => {
        if (!card) return false;
        const rect = card.getBoundingClientRect();
        const cardTop = rect.top;
        const cardBottom = rect.bottom;
        
        // Card should be expanded when it's in the "expansion zone" of the viewport
        const shouldExpand = cardTop < expandZoneStart && cardBottom > expandZoneEnd;
        return shouldExpand;
      });
      
      // Update card states if they changed
      setCardStates(prevStates => {
        const hasChanged = prevStates.some((state, i) => state !== newCardStates[i]);
        return hasChanged ? newCardStates : prevStates;
      });
      
      // Keep meta card highlighting logic for sticky left column
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

      // Hysteresis for meta card highlighting
      const currentIndex = lastIdxRef.current;
      const currentNode = sentinelRefs.current[currentIndex];
      let currentDist = Infinity;
      if (currentNode) {
        const rect = currentNode.getBoundingClientRect();
        const mid = rect.top + rect.height / 2;
        currentDist = Math.abs(mid - centerY);
      }
      const margin = 80;
      const now = performance.now();
      const minInterval = 320;
      
      if (
        bestIndex !== currentIndex &&
        (bestDist + margin < currentDist) &&
        (now - lastSwitchTimeRef.current > minInterval)
      ) {
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

  useEffect(() => {
    const setInitialIndex = () => setActiveIndex(0);
    setInitialIndex();
  }, []);

  // Calculate navbar height dynamically
  useEffect(() => {
    const calculateNavbarHeight = () => {
      const navbar = document.querySelector('header nav');
      if (navbar) {
        const rect = navbar.getBoundingClientRect();
        const computedHeight = rect.height;
        console.log(`📏 [NAVBAR HEIGHT] Calculated: ${computedHeight}px`);
        setNavbarHeight(computedHeight + 16); // Add 16px padding below navbar
      } else {
        // Fallback calculation based on CosmicHeader structure:
        // mt-2 (8px) + py-3/py-4 (12px/16px) + content height (~40px) + py-3/py-4 (12px/16px)
        const isMobile = window.innerWidth < 1024;
        const fallbackHeight = 8 + (isMobile ? 12 : 16) + 40 + (isMobile ? 12 : 16) + 16; // +16px padding
        console.log(`📏 [NAVBAR HEIGHT] Fallback: ${fallbackHeight}px (mobile: ${isMobile})`);
        setNavbarHeight(fallbackHeight);
      }
    };

    // Calculate on mount and when window resizes
    calculateNavbarHeight();
    
    const handleResize = () => {
      setTimeout(calculateNavbarHeight, 100); // Debounce for CSS transitions
    };
    
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', calculateNavbarHeight); // Recalc on scroll for dynamic navbar
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', calculateNavbarHeight);
    };
  }, []);

  // AGGRESSIVE LOGGING for sticky debugging
  useEffect(() => {
    if (process.env.NODE_ENV === "production") return;
    
    console.group(`🔍 [STICKY DEBUG] Active Index: ${activeIndex}`);
    
    // Log all meta cards and their sticky status
    metaRefs.current.forEach((meta, i) => {
      if (!meta) return;
      const metaStyles = window.getComputedStyle(meta);
      const rect = meta.getBoundingClientRect();
      const isCurrentlyActive = i === activeIndex;
      
      console.log(`📍 Meta Card ${i} ${isCurrentlyActive ? '(ACTIVE)' : ''}:`, {
        element: meta,
        position: metaStyles.position,
        top: metaStyles.top,
        zIndex: metaStyles.zIndex,
        transform: metaStyles.transform,
        rect: {
          top: rect.top,
          left: rect.left,
          width: rect.width,
          height: rect.height
        },
        viewport: {
          windowHeight: window.innerHeight,
          scrollY: window.scrollY
        },
        classes: meta.className,
        shouldStick: isCurrentlyActive,
        actuallySticking: metaStyles.position === 'sticky' && rect.top <= navbarHeight + 5 // Within 5px of target position
      });
    });
    
    // Check for sticky-breaking ancestors
    const activeMeta = metaRefs.current[activeIndex];
    if (activeMeta) {
      let ancestor = activeMeta.parentElement;
      let depth = 0;
      while (ancestor && depth < 8) {
        const styles = window.getComputedStyle(ancestor);
        const hasStickyBreaker = 
          styles.overflow !== 'visible' || 
          styles.transform !== 'none' ||
          styles.perspective !== 'none' ||
          styles.filter !== 'none';
          
        if (hasStickyBreaker) {
          console.warn(`⚠️  STICKY BREAKER at depth ${depth}:`, {
            element: ancestor,
            tagName: ancestor.tagName,
            className: ancestor.className,
            overflow: styles.overflow,
            transform: styles.transform,
            perspective: styles.perspective,
            filter: styles.filter
          });
        } else if (depth < 3) {
          // Log first few clean ancestors to confirm fix
          console.log(`✅ Clean ancestor at depth ${depth}:`, {
            tagName: ancestor.tagName,
            className: ancestor.className,
            overflow: styles.overflow
          });
        }
        
        ancestor = ancestor.parentElement;
        depth += 1;
      }
    }
    
    console.groupEnd();
  }, [activeIndex]);
  
  // Add scroll-based logging
  useEffect(() => {
    if (process.env.NODE_ENV === "production") return;
    
    let lastLogTime = 0;
    const handleScroll = () => {
      const now = Date.now();
      if (now - lastLogTime < 500) return; // Throttle to every 500ms
      lastLogTime = now;
      
      console.log(`📜 [SCROLL DEBUG] Y: ${window.scrollY}, Active: ${activeIndex}`);
      
      const activeMeta = metaRefs.current[activeIndex];
      if (activeMeta) {
        const rect = activeMeta.getBoundingClientRect();
        const styles = window.getComputedStyle(activeMeta);
        console.log(`🔗 Active meta position:`, {
          rect: { top: rect.top, left: rect.left },
          computed: { position: styles.position, top: styles.top },
          isSticking: styles.position === 'sticky' && rect.top <= 32
        });
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeIndex]);

  return (
    <section className={cn("py-24", className)}>
      <div className="mx-auto w-full max-w-[1100px] px-4">
        {title && (
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl md:text-5xl font-bold gradient-headline">{title}</h2>
            {description && <p className="mt-3 text-slate-400 md:text-lg">{description}</p>}
          </div>
        )}

        <div className="mx-auto mt-14 max-w-4xl space-y-14 md:space-y-20">
          {entries.map((entry, index) => {
            const isMetaActive = index === activeIndex; // For meta card highlighting
            const isCardExpanded = cardStates[index]; // For individual card expansion
            return (
              <div
                key={index}
                className="relative flex flex-col gap-4 md:flex-row md:items-start md:gap-10"
              >
                {/* Sticky meta column - simplified to match sample */}
                <div 
                  className="w-full shrink-0 md:w-64 md:h-min md:sticky"
                  style={{ top: `${navbarHeight}px` }}
                  ref={(el) => setMetaRef(el, index)}
                  data-meta-index={index}
                >
                  {renderMetaCard(entry, isMetaActive)}
                </div>

                <div
                  ref={(el) => setSentinelRef(el, index)}
                  aria-hidden
                  className="absolute -top-24 left-0 h-12 w-12 opacity-0"
                  data-debug-sentinel-index={index}
                />

                <motion.article
                  layout
                  variants={fade}
                  initial={false}
                  transition={{ 
                    layout: { duration: MOTION_GUARDS.durations.layout, ease: MOTION_GUARDS.easing },
                    default: { duration: MOTION_GUARDS.durations.default, ease: MOTION_GUARDS.easing }
                  }}
                  className={cn(
                    "flex-1 rounded-2xl border transition-all duration-300 ease-out",
                    isCardExpanded ? "border-blue-500/20 bg-black shadow-2xl shadow-blue-500/10" : "border-zinc-800/30 bg-black/95"
                  )}
                  data-debug-card-index={index}
                  style={{ transform: "none" }}
                  ref={(el) => setCardRef(el, index)}
                >
                  <div className="p-4 md:p-6">
                    <div className="mb-4">{renderSkeleton(index)}</div>
                    <div className="space-y-3">
                      <h3 className={cn("text-lg md:text-xl font-semibold", isCardExpanded ? "text-white" : "text-white/80")}>{entry.title}</h3>
                      <p
                        className={cn(
                          "text-sm leading-relaxed text-slate-400 transition-all",
                          isCardExpanded ? "line-clamp-none" : "line-clamp-2"
                        )}
                      >
                        {entry.description}
                      </p>
                    </div>

                    <motion.div
                      layout
                      className={cn(
                        "grid transition-all duration-500 ease-out",
                        isCardExpanded ? "grid-rows-[1fr] opacity-100 pt-3" : "grid-rows-[0fr] opacity-0"
                      )}
                      transition={{
                        duration: MOTION_GUARDS.durations.layout,
                        ease: MOTION_GUARDS.easing
                      }}
                    >
                      <div className="overflow-hidden">
                        {entry.items && entry.items.length > 0 && (
                          <div className="mt-3 rounded-xl border border-blue-500/20 bg-zinc-950/50 p-4">
                            <ul className="space-y-3">
                              {entry.items.map((item, i) => (
                                <li key={i} className="flex items-start gap-3 text-sm text-zinc-300">
                                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-400/80" />
                                  <span className="leading-relaxed">{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {entry.button && (
                          <div className="mt-4 flex justify-end">
                            <Button 
                              variant="default" 
                              size="sm" 
                              className="group bg-blue-600/90 hover:bg-blue-500 border-blue-500/30 transition-all duration-300 ease-out"
                            >
                              <a
                                href={entry.button.url}
                                className="inline-flex items-center"
                                target="_blank"
                                rel="noreferrer"
                              >
                                {entry.button.text}
                                <ArrowUpRight className="ml-1.5 h-3.5 w-3.5 transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                              </a>
                            </Button>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  </div>
                </motion.article>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
