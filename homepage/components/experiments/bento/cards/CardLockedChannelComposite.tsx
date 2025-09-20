"use client";

import React, { useEffect, useRef, useState } from "react";
import { CardBody, CardContainer } from "@/components/ui/3d-card";
import { uiBlueprint as ui } from "@/components/ui/ui-blueprint";
import { Lock, Link as LinkIcon, ChevronDown, Hash } from "lucide-react";

export default function CardLockedChannelComposite() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const anchorRef = useRef<HTMLDivElement>(null);
  const [linked, setLinked] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [pingMetric, setPingMetric] = useState(false);

  // On mount, show deep-link pill; only auto-scroll and show guidance when URL explicitly opts-in
  useEffect(() => {
    const isBrowser = typeof window !== "undefined";
    const shouldAutoScroll = isBrowser && (
      window.location.hash.includes("deep-link") ||
      new URLSearchParams(window.location.search).get("autoscroll") === "1"
    );

    const t1 = setTimeout(() => setLinked(true), 2400); // show deep-link pill last

    let tToastOn: ReturnType<typeof setTimeout> | undefined;
    let t2: ReturnType<typeof setTimeout> | undefined;
    let tToastOff: ReturnType<typeof setTimeout> | undefined;
    let tHintOn: ReturnType<typeof setTimeout> | undefined;
    let tHintOff: ReturnType<typeof setTimeout> | undefined;
    let tPingOn: ReturnType<typeof setTimeout> | undefined;
    let tPingOff: ReturnType<typeof setTimeout> | undefined;

    if (shouldAutoScroll) {
      tToastOn = setTimeout(() => setShowToast(true), 300);
      t2 = setTimeout(() => {
        anchorRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 900);
      tToastOff = setTimeout(() => setShowToast(false), 1200);
      tHintOn = setTimeout(() => setShowHint(true), 1300);
      tHintOff = setTimeout(() => setShowHint(false), 2200);
      tPingOn = setTimeout(() => setPingMetric(true), 1700);
      tPingOff = setTimeout(() => setPingMetric(false), 2200);
    }

    return () => {
      clearTimeout(t1);
      if (tToastOn) clearTimeout(tToastOn);
      if (t2) clearTimeout(t2);
      if (tToastOff) clearTimeout(tToastOff);
      if (tHintOn) clearTimeout(tHintOn);
      if (tHintOff) clearTimeout(tHintOff);
      if (tPingOn) clearTimeout(tPingOn);
      if (tPingOff) clearTimeout(tPingOff);
    };
  }, []);

  return (
    <CardContainer className="inter-var group relative" containerClassName="py-2 md:py-0 md:items-start md:justify-start" tiltStrength={15}>
      {/* Deep-link pill above the card, touching top-right corner */}
      <div className={`absolute -top-3 -right-2 z-20 transition-all duration-500 ${linked ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1"}`}>
        <div className="inline-flex items-center gap-1.5 text-[10px] bg-purple-600/20 text-purple-200 border border-purple-400/30 rounded px-2 py-1 shadow-[0_6px_20px_-10px_rgba(139,92,246,0.4)]">
          <LinkIcon className="w-3 h-3" /> Deep link
        </div>
      </div>
      <CardBody
        className={
          ui.surfaceCard("relative w-full h-full md:h-auto md:w-full p-0 overflow-hidden") +
          " transition-[transform,box-shadow] duration-300 group-hover:-translate-y-px group-hover:shadow-[0_14px_40px_-24px_rgba(0,0,0,0.6)]"
        }
        style={{ ...ui.fontStyle(), backgroundColor: ui.colors.ink }}
      >

        {/* Arrival toast */}
        <div className={`absolute left-1/2 -translate-x-1/2 top-2 z-10 transition-all duration-500 ${showToast ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1"}`}>
          <div className="inline-flex items-center gap-1.5 text-[11px] bg-white/10 text-slate-100 border border-white/15 rounded px-2.5 py-1.5 shadow-[0_8px_22px_-12px_rgba(0,0,0,0.6)]">
            <LinkIcon className="w-3 h-3" /> Link clicked → Opening Incidents channel…
          </div>
        </div>
        {/* Two-tier layout so the left sidebar ends above the divider */}
        <div className="flex flex-col h-full">
          {/* Row: left sidebar + main (header + messages) */}
          <div className="flex">
            {/* Left channel panel */}
            <div className="relative w-16 md:w-20 p-1 md:p-1.5 rounded-l-2xl" style={{ backgroundColor: ui.colors.mainHeader }}>
              <div className="absolute right-0 top-0 bottom-0 w-px bg-white/30 pointer-events-none" />
              <div className="space-y-1">
                <div className="flex items-center gap-0.5 md:gap-1 rounded px-0.5 md:px-1 py-0.5 text-[9px] md:text-[11px] text-slate-200">
                  <Hash className="w-2 h-2 md:w-3 md:h-3 text-slate-400" />
                  <span>General</span>
                </div>
                <div className="flex items-center gap-0.5 md:gap-1 rounded px-0.5 md:px-1 py-0.5 text-[9px] md:text-[11px] text-white bg-indigo-600/30 border-l-2 border-indigo-400/50">
                  <Lock className="w-2 h-2 md:w-3 md:h-3" />
                  <span>Incidents</span>
                </div>
              </div>
            </div>

            {/* Main area */}
            <div className="flex-1 flex flex-col">
              {/* Header: lock icon in place of hash */}
              <div className="h-7 md:h-8 px-1.5 md:px-2.5 pt-1 md:pt-1.5 border-b border-white/20" style={{ backgroundColor: ui.colors.mainHeader }}>
                <div className="text-[10px] md:text-xs font-bold text-white flex items-center gap-0.5 md:gap-1">
                  <Lock className="w-2 h-2 md:w-3 md:h-3" />
                  incidents
                  <span className="ml-auto text-[8px] md:text-[10px] text-slate-400">private</span>
                </div>
              </div>

              {/* Stacked messages: blurred locked, visible (deep-linked), blurred locked */}
              <div ref={scrollRef} className="flex-1 p-2 space-y-2 overflow-y-auto scroll-smooth">
                {/* Scroll hint */}
                <div className={`absolute right-2 top-10 z-10 transition-all duration-500 ${showHint ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1"}`}>
                  <div className="inline-flex items-center gap-1.5 text-[10px] bg-white/10 text-white border border-white/15 rounded px-2 py-1">
                    <ChevronDown className="w-3 h-3 animate-bounce" /> Scrolling to shared comment
                  </div>
                </div>
                {/* Top blurred/locked message */}
                <div className="relative bg-white/5 rounded p-2 border border-white/10 overflow-hidden">
                  <div className="absolute inset-0 backdrop-blur-sm bg-black/20" />
                  <div className="relative flex items-start gap-2 opacity-60">
                    <div className="w-6 h-6 rounded-full bg-slate-600" />
                    <div className="flex-1">
                      <div className="h-3 w-24 bg-white/10 rounded mb-1" />
                      <div className="h-4 w-40 bg-white/10 rounded" />
                    </div>
                    <Lock className="w-4 h-4 text-slate-300 animate-pulse [animation-delay:0.3s]" />
                  </div>
                  <div className="relative text-[10px] text-slate-400 mt-1">This comment is only accessible and viewable by the admin</div>
                </div>

                {/* Visible message bubble (deep-linked) with sentence highlighting */}
                <div ref={anchorRef} className="relative rounded p-3 border border-white/10 bg-white/10 ring-1 ring-purple-400/30">
                  {/* Animated left accent bar to imply "shared" */}
                  <div className="absolute left-0 top-0 bottom-0 w-[2px] rounded-l bg-gradient-to-b from-amber-300/70 to-rose-400/70 animate-pulse" />
                  {/* Soft glow border */}
                  <div className="pointer-events-none absolute inset-0 rounded shadow-[0_0_0_3px_rgba(251,191,36,0.12)]" />
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-purple-600 text-white font-bold flex items-center justify-center">Y</div>
                    <div className="flex-1">
                      <div className="text-[11px] text-slate-300 mb-1 flex items-center gap-2">
                        You • 1 week ago
                        <span className="text-[11px] bg-purple-600/25 text-purple-200 px-1.5 py-0.5 rounded animate-pulse">Deep linked</span>
                      </div>
                      {/* Three concise sentences; last sentence has metric highlight */}
                      <div className="text-[13px] text-slate-200 space-y-1">
                        <p>We rolled out the onboarding sequence across new trials.</p>
                        <p>Guided checklists clarified next steps and cut drop-off.</p>
                        <p className="relative">
                          Result:
                          <span className={`relative ml-1 inline-block align-baseline px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-100 ring-1 ring-purple-400/30 ${linked ? "" : ""}`}>
                            {pingMetric && (
                              <span className="absolute -inset-1 rounded bg-purple-400/30 animate-ping" />
                            )}
                            <span className="relative">Activation up 27%</span>
                          </span>
                          in two months.
                        </p>
                      </div>
                      <div className="flex items-center gap-1 mt-2 text-[11px] text-slate-300">
                        <div className="bg-white/10 rounded px-2 py-0.5">3 👍</div>
                        <div className="bg-white/10 rounded px-2 py-0.5">2 🧵</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom blurred/locked message */}
                <div className="relative bg-white/5 rounded p-2 border border-white/10 overflow-hidden">
                  <div className="absolute inset-0 backdrop-blur-sm bg-black/20" />
                  <div className="relative flex items-start gap-2 opacity-60">
                    <div className="w-6 h-6 rounded-full bg-slate-600" />
                    <div className="flex-1">
                      <div className="h-3 w-28 bg-white/10 rounded mb-1" />
                      <div className="h-4 w-44 bg-white/10 rounded" />
                    </div>
                    <Lock className="w-4 h-4 text-slate-300 animate-pulse [animation-delay:0.6s]" />
                  </div>
                  <div className="relative text-[10px] text-slate-400 mt-1">Neighboring comments remain locked</div>
                </div>
              </div>
            </div>
          </div>

          {/* Caption merging both concepts (sits below the sidebar) */}
          <div className="mt-0.5 pt-0.5 pb-1.5 flex flex-col items-center">
            <div className="w-[30%] border-t border-white/15" />
            <div className="text-[11px] text-slate-400 mt-2 md:mt-1 text-center">
              Share a single comment; neighboring comments remain locked. Channel name remains visible.
            </div>
          </div>
        </div>
      </CardBody>
    </CardContainer>
  );
}
