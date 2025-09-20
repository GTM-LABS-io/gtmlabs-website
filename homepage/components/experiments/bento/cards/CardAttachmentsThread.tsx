"use client";

import React, { useEffect, useRef, useState } from "react";
import { CardBody, CardContainer } from "@/components/ui/3d-card";
import { uiBlueprint as ui } from "@/components/ui/ui-blueprint";
import { Hash, Paperclip } from "lucide-react";

export function CardAttachmentsThread() {
  // Lightweight demo animation state
  const [attachStage, setAttachStage] = useState<number>(0); // 0: idle, 1: choose files, 2: send, 3: show thread & auto-scroll
  const repliesRef = useRef<HTMLDivElement | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    timers.push(setTimeout(() => setAttachStage(1), 600));
    timers.push(setTimeout(() => setAttachStage(2), 1300));
    timers.push(setTimeout(() => setAttachStage(3), 2200));
    return () => timers.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (attachStage < 3 || !repliesRef.current) return;
    const el = repliesRef.current;
    let i = 0;
    const id = setInterval(() => {
      el.scrollTo({ top: i % 2 ? 0 : 240, behavior: "smooth" });
      i++;
    }, 2200);
    return () => clearInterval(id);
  }, [attachStage]);

  const avatarColorFor = (name: string) => {
    const palette = [
      "bg-emerald-600",
      "bg-sky-600",
      "bg-violet-600",
      "bg-rose-600",
      "bg-amber-600",
      "bg-cyan-600",
      "bg-lime-600",
      "bg-fuchsia-600",
    ];
    const i = name.split("").reduce((a, c) => a + c.charCodeAt(0), 0) % palette.length;
    return palette[i];
  };

  const replies = [
    { name: "Priya", baseMins: 120, msg: "Added 3 customer quotes we can reference in the deck.", files: ["quotes.csv"] },
    { name: "Devon", baseMins: 60, msg: "Refreshed KPI dashboard to include August cohort.", files: ["kpi-aug.png", "funnel.csv"] },
    { name: "Alex", baseMins: 55, msg: "Uploaded the onboarding wireframe for review.", files: ["wireframe.pdf"] },
    { name: "Mina", baseMins: 35, msg: "Synthesized CS feedback into a quick summary.", files: ["feedback.md"] },
    { name: "Sam", baseMins: 22, msg: "Localization copy drafts attached.", files: ["copy-de.md", "copy-fr.md"] },
  ].map((r, i) => ({
    ...r,
    mins: Math.max(5, r.baseMins - (i * 3 + 2)),
  }));

  return (
    <CardContainer className="inter-var group w-full md:w-full md:items-start md:justify-start" containerClassName="py-2 md:py-0 md:items-start md:justify-start" tiltStrength={12}>
      <CardBody
        className={
          ui.surfaceCard("relative w-full h-full md:h-auto md:w-full p-1 md:p-3 overflow-hidden") +
          ` transition-[transform,box-shadow,opacity,transform] duration-500 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[2px]"} group-hover:-translate-y-px group-hover:shadow-[0_14px_40px_-24px_rgba(0,0,0,0.6)]`
        }
        style={{ ...ui.fontStyle(), backgroundColor: ui.colors.ink }}
      >
        {/* Demo cursor overlay */}
        <div
          className="pointer-events-none absolute z-50"
          style={{
            left: attachStage === 0 ? "90%" : attachStage === 1 ? "75%" : attachStage === 2 ? "20%" : "10%",
            top: attachStage === 0 ? "10%" : attachStage === 1 ? "26%" : attachStage === 2 ? "82%" : "10%",
            transition: "left .6s ease, top .6s ease, opacity .4s",
            opacity: attachStage > 0 && attachStage < 3 ? 1 : 0,
          }}
        >
          <div className="rotate-[20deg]">
            <div className="w-0 h-0 border-t-[12px] border-l-[7px] border-r-[7px] border-transparent border-t-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]" />
          </div>
        </div>

        {/* Channel header */}
        <div
          className="h-7 md:h-8 px-2.5 md:px-3 flex items-center gap-2 border-b border-white/10"
          style={{ backgroundColor: ui.colors.mainHeader }}
        >
          <Hash className="w-3 h-3 text-slate-300" />
          <div className="text-xs text-slate-200">marketing-channel</div>
          <div className="ml-auto text-[10px] text-slate-500">You are posting</div>
        </div>

        {/* Composer -> Posted Entry sequence */}
        <div className="p-2 md:p-3">
          {attachStage < 2 ? (
            <div className="relative bg-white/5 rounded-lg p-2 border border-white/10">
              <div className="text-[12px] text-slate-400 mb-2">Write a comment…</div>
              {/* Drop zone hint when choosing files */}
              <div className={`transition-all ${attachStage === 1 ? "opacity-100 scale-[1.01]" : "opacity-0"} pointer-events-none`}>
                <div className="border-2 border-dashed border-white/20 rounded p-3 text-center text-[11px] text-slate-400">
                  Drop 3 files to attach
                </div>
              </div>
              {/* Fake cursor */}
              {attachStage === 1 && (
                <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full border-2 border-white/80 shadow-[0_0_0_2px_rgba(0,0,0,0.2)]" />
              )}
              <div className="mt-2 flex flex-wrap gap-1">
                {["KPI-dashboard.png", "onboarding-wire.pdf", "release-notes.md"].slice(0, attachStage ? 3 : 0).map((name) => (
                  <div key={name} className="bg-white/10 rounded inline-flex items-center gap-2 px-2 py-1 text-[11px] text-slate-300">
                    <Paperclip className="w-3 h-3" />
                    <span>{name}</span>
                  </div>
                ))}
              </div>
              <div className="mt-2 flex items-center gap-2">
                <button className={`px-2 py-1 rounded text-xs ${attachStage === 1 ? "bg-indigo-600/60 text-white" : "bg-white/10 text-slate-300"}`}>Send</button>
                <div className="text-[11px] text-slate-500">Drag files in, then send</div>
              </div>
            </div>
          ) : (
            <div className="block md:grid space-y-3 md:space-y-0" style={{ gridTemplateColumns: "1fr 1.1fr", gap: "0.5rem" }}>
              {/* Left: original posted entry */}
              <div className="bg-white/10 rounded p-2 md:p-3 overflow-hidden">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-purple-600 text-white font-bold flex items-center justify-center text-xs md:text-base">Y</div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] md:text-[11px] text-slate-400 mb-1 truncate">You • now</div>
                    <div className="text-xs md:text-sm text-slate-200 mb-2 line-clamp-3">
                      We’re consolidating launch ops in <span className="text-slate-100 font-medium">#marketing-channel</span> so folks have a single thread for artifacts and discussion. Below are the docs for this week’s rollout:
                    </div>
                    <div className="text-xs md:text-[13px] text-slate-200 space-y-1">
                      <div>1. Audience and channel matrix</div>
                      <div>2. Release checklist and owners</div>
                      <div>3. Re-tiered onboarding; shipped checklist + guided tour</div>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {["KPI-dashboard.png", "onboarding-wire.pdf", "release-notes.md"].map((name) => (
                        <div
                          key={name}
                          className={`rounded inline-flex items-center gap-2 px-2 py-1 text-[11px] ${
                            name === "release-notes.md"
                              ? "bg-amber-400/15 text-amber-100 ring-1 ring-amber-300/40 shadow-[0_0_10px_rgba(251,191,36,0.25)]"
                              : "bg-white/10 text-slate-300"
                          }`}
                        >
                          <Paperclip className={`w-3 h-3 ${name === "release-notes.md" ? "text-amber-300" : ""}`} />
                          <span>{name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              {/* Right: thread panel */}
              <div className="bg-white/5 rounded p-1 md:p-2 border border-white/10 overflow-hidden">
                {/* Original again */}
                <div className="text-[11px] text-slate-400 mb-1">Original post</div>
                <div className="bg-white/10 rounded p-2 mb-2">
                  <div className="text-[12px] text-slate-200 line-clamp-2">We’re consolidating launch ops in #marketing-channel…</div>
                </div>
                <div className="h-px bg-white/10 mb-2" />
                <div ref={repliesRef} className="max-h-[10rem] overflow-y-auto space-y-2 pr-1">
                  {replies.map((r, i) => (
                    <div key={i} className="bg-white/0 rounded p-2 text-[12px] text-slate-300 flex items-start gap-2">
                      <div className={`w-5 h-5 rounded-full ${avatarColorFor(r.name)} text-white text-[10px] flex items-center justify-center`}>
                        {r.name[0]}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[11px] text-slate-500 mb-0.5 truncate">{r.name} • {r.mins}m ago</div>
                        <div className="truncate">{r.msg}</div>
                        <div className="mt-1 flex flex-wrap gap-1">
                          {r.files.map((name, j) => (
                            <div
                              key={j}
                              className="px-2 py-0.5 rounded text-[11px] inline-flex items-center gap-1 bg-white/10 text-slate-200 ring-1 ring-amber-300/25 shadow-[0_0_8px_rgba(251,191,36,0.25)]"
                            >
                              <Paperclip className="w-3 h-3 text-amber-300" />
                              <span>{name}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="mt-0.5 md:mt-0.5 pt-0.5 md:pt-0.5 pb-1.5 md:pb-1.5 flex flex-col items-center">
          <div className="w-[30%] border-t border-white/15" />
          <div className="text-[11px] text-slate-400 mt-1 text-center">Drop files into the editor, post, then view thread on the right</div>
        </div>
      </CardBody>
    </CardContainer>
  );
}

export default CardAttachmentsThread;
