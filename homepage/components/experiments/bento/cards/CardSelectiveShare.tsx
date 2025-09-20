"use client";

import React, { useState } from "react";
import { CardBody, CardContainer } from "@/components/ui/3d-card";
import { uiBlueprint as ui } from "@/components/ui/ui-blueprint";
import { Hash, Link as LinkIcon, Lock, RotateCcw, Timer } from "lucide-react";

export function CardSelectiveShare() {
  const [toast, setToast] = useState<string | null>(null);

  return (
    <CardContainer className="inter-var group" containerClassName="py-2 md:py-0" tiltStrength={15}>
      <CardBody
        className={
          ui.surfaceCard("relative w-full h-full p-1 overflow-hidden") +
          " transition-[transform,box-shadow] duration-300 group-hover:-translate-y-px group-hover:shadow-[0_14px_40px_-24px_rgba(0,0,0,0.6)]"
        }
        style={{ ...ui.fontStyle(), backgroundColor: ui.colors.ink }}
      >
        {/* Channel header */}
        <div
          className="h-7 px-2.5 flex items-center gap-2 border-b border-white/10"
          style={{ backgroundColor: ui.colors.mainHeader }}
        >
          <Hash className="w-3 h-3 text-slate-300" />
          <div className="text-xs text-slate-200">marketing-channel</div>
        </div>
        {/* Blurred locked comment above */}
        <div className="mt-2 relative bg-white/5 rounded p-2 border border-white/10 overflow-hidden">
          <div className="absolute inset-0 backdrop-blur-sm bg-black/20" />
          <div className="relative flex items-start gap-2 opacity-60">
            <div className="w-6 h-6 rounded-full bg-slate-600" />
            <div className="flex-1">
              <div className="h-3 w-24 bg-white/10 rounded mb-1" />
              <div className="h-4 w-40 bg-white/10 rounded" />
            </div>
            <Lock className="w-4 h-4 text-slate-300" />
          </div>
          <div className="relative text-[10px] text-slate-400 mt-1">This comment is only accessible and viewable by the admin</div>
        </div>
        {/* Shared comment */}
        <div className="rounded p-3 my-2 border border-white/10 bg-white/10">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-purple-600 text-white font-bold flex items-center justify-center">Y</div>
            <div className="flex-1">
              <div className="text-[11px] text-slate-400 mb-1 flex items-center gap-2">
                You • 1 week ago
                <span className="text-[11px] bg-amber-500/20 text-amber-200 px-1.5 py-0.5 rounded">Private</span>
              </div>
              <div className="text-sm text-slate-200 mb-2">
                Rollout notes – v1.3 release. We’re shipping a sequence to improve activation and clarify handoffs. Key changes below.
              </div>
              <div className="text-[13px] text-slate-200 space-y-1">
                <div>1. Segment signups by intent</div>
                <div>2. Add guided checklist after first login</div>
                <div>3. Re-tiered onboarding; shipped checklist + guided tour</div>
              </div>
              {/* Highlighted attachment chip with soft glow */}
              <div className="mt-2 inline-flex items-center gap-2 text-[11px] bg-amber-400/15 text-amber-100 ring-1 ring-amber-300/40 shadow-[0_0_10px_rgba(251,191,36,0.25)] rounded px-2 py-1">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-300" />
                release-notes.md
              </div>
              <div className="flex items-center gap-1 mt-2 text-[11px] text-slate-300">
                <div className="bg-white/10 rounded px-2 py-0.5">3 👍</div>
                <div className="bg-white/10 rounded px-2 py-0.5">2 🧵</div>
              </div>
            </div>
          </div>
        </div>
        {/* Controls */}
        <div className="space-y-2">
          <div className="flex gap-1">
            <button
              onClick={() => setToast("Link copied")}
              className="bg-white/10 hover:bg-white/15 rounded px-2 py-1 flex-1 text-xs text-white justify-center inline-flex items-center transition-colors"
            >
              <LinkIcon className="w-3 h-3 mr-1" />Copy
            </button>
            <button className="bg-white/10 hover:bg-white/15 rounded px-2 py-1 flex-1 text-xs text-white justify-center inline-flex items-center transition-colors">
              <RotateCcw className="w-3 h-3 mr-1" />Rotate
            </button>
            <button className="bg-white/10 hover:bg-white/15 rounded px-2 py-1 flex-1 text-xs text-white justify-center inline-flex items-center transition-colors">
              <Timer className="w-3 h-3 mr-1" />Expire
            </button>
          </div>
        </div>
        {/* Blurred locked comment below */}
        <div className="mt-2 relative bg-white/5 rounded p-2 border border-white/10 overflow-hidden">
          <div className="absolute inset-0 backdrop-blur-sm bg-black/20" />
          <div className="relative flex items-start gap-2 opacity-60">
            <div className="w-6 h-6 rounded-full bg-slate-600" />
            <div className="flex-1">
              <div className="h-3 w-28 bg-white/10 rounded mb-1" />
              <div className="h-4 w-44 bg-white/10 rounded" />
            </div>
            <Lock className="w-4 h-4 text-slate-300" />
          </div>
          <div className="relative text-[10px] text-slate-400 mt-1">This comment is only accessible and viewable by the admin</div>
        </div>
        <div className="mt-1 pt-1 pb-2 flex flex-col items-center">
          <div className="w-[30%] border-t border-white/15" />
          <div className="text-[11px] text-slate-400 mt-2 text-center">Share a single comment; neighboring comments remain locked</div>
        </div>
        {toast && (
          <div className="absolute top-2 right-2 text-[11px] bg-emerald-500/20 text-emerald-200 px-2 py-1 rounded border border-emerald-500/30">
            {toast}
          </div>
        )}
      </CardBody>
    </CardContainer>
  );
}

export default CardSelectiveShare;
