"use client";

import React, { useEffect, useState } from "react";
import { CardBody, CardContainer } from "@/components/ui/3d-card";
import { uiBlueprint as ui } from "@/components/ui/ui-blueprint";
import { Hash } from "lucide-react";

function TypingDots() {
  const [step, setStep] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setStep((s) => (s + 1) % 3), 600);
    return () => clearInterval(id);
  }, []);
  const scale = (i: number) => (step === i ? "scale-100" : step === (i + 1) % 3 ? "scale-90" : "scale-75");
  return (
    <div className="flex items-center gap-1">
      <span className={`w-1.5 h-1.5 rounded-full bg-slate-300/80 transition-transform ${scale(0)}`} />
      <span className={`w-1.5 h-1.5 rounded-full bg-slate-300/65 transition-transform ${scale(1)}`} />
      <span className={`w-1.5 h-1.5 rounded-full bg-slate-300/50 transition-transform ${scale(2)}`} />
    </div>
  );
}

export default function CardDeepLink() {
  // stage: 0 = channel loading; 1 = message loading; 2 = fully loaded
  const [stage, setStage] = useState<0 | 1 | 2>(0);
  const [flash, setFlash] = useState(false);
  const [bubbleIn, setBubbleIn] = useState(false);
  const [authorIn, setAuthorIn] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    // Slow staged loading (more dramatic)
    timers.push(setTimeout(() => setStage(1), 1600));
    timers.push(setTimeout(() => setStage(2), 3200));
    // Turn on highlight once fully loaded; do not auto-dismiss
    timers.push(setTimeout(() => setFlash(true), 3500));
    return () => timers.forEach(clearTimeout);
  }, []);

  // Fade-in entrances once fully loaded
  useEffect(() => {
    if (stage === 2) {
      const tB = setTimeout(() => setBubbleIn(true), 250);
      const tA = setTimeout(() => setAuthorIn(true), 600);
      return () => {
        clearTimeout(tB);
        clearTimeout(tA);
      };
    }
  }, [stage]);

  const dismissHighlight = () => {
    if (!dismissed) {
      setDismissed(true);
      setFlash(false);
    }
  };

  return (
    <CardContainer className="inter-var group" tiltStrength={12}>
      <CardBody
        className={
          ui.surfaceCard("relative w-full h-full p-3 overflow-hidden") +
          " min-h-[14rem] transition-[transform,box-shadow] duration-300 group-hover:-translate-y-px group-hover:shadow-[0_14px_40px_-24px_rgba(0,0,0,0.6)]"
        }
        style={{ ...ui.fontStyle(), backgroundColor: ui.colors.ink }}
      >
        {/* Always render header to show the channel context, with staged loading */}
        <div
          className="flex flex-col h-full"
          onMouseDown={dismissHighlight}
          onTouchStart={dismissHighlight}
          onKeyDown={dismissHighlight}
          tabIndex={0}
        >
          <div
            className="h-8 px-3 flex items-center gap-2 border-b border-white/10"
            style={{ backgroundColor: ui.colors.mainHeader }}
          >
            <Hash className="w-3 h-3 text-slate-300" />
            <div className="text-xs text-slate-200">marketing-channel</div>
            {/* Channel loading dots on the right while stage < 1 */}
            {stage < 1 && <div className="ml-auto"><TypingDots /></div>}
          </div>

          {/* Message area */}
          <div className="flex-1 p-3">
            {stage < 2 ? (
              // Message loading state: show rounded opaque bubble with skeleton
              <div className="relative bg-white/10 rounded p-3 overflow-hidden border border-white/10">
                <div className="absolute inset-0 backdrop-blur-sm bg-black/20" />
                <div className="relative flex items-start gap-3 opacity-60">
                  <div className="w-8 h-8 rounded-full bg-slate-600" />
                  <div className="flex-1">
                    <div className="h-3 w-24 bg-white/10 rounded mb-1" />
                    <div className="h-4 w-40 bg-white/10 rounded" />
                  </div>
                </div>
              </div>
            ) : (
              // Fully loaded message bubble
              <div className={`bg-white/10 rounded p-3 overflow-hidden transition-all duration-700 ${bubbleIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[3px]"}`}>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-purple-600 text-white font-bold flex items-center justify-center">Y</div>
                  <div className="flex-1 min-w-0">
                    <div className={`text-[11px] text-slate-400 mb-1 truncate transition-all duration-700 ${authorIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[3px]"}`}>You • now</div>
                    <div className="text-sm text-slate-200 mb-2">
                      We’re consolidating launch ops in <span className="text-slate-100 font-medium">#marketing-channel</span> so folks have a single thread for artifacts and discussion. Below are the changes for this rollout:
                    </div>
                    <div className="text-[13px] text-slate-200 space-y-1">
                      <div>1. Segment signups by intent</div>
                      <div>2. Add guided checklist after first login</div>
                      <div>
                        3. {" "}
                        <span
                          className={
                            flash
                              ? "bg-amber-400/20 text-amber-100 ring-1 ring-amber-300/50 shadow-[0_0_10px_rgba(251,191,36,0.25)] rounded px-1.5 py-0.5"
                              : "bg-white/5 rounded px-1.5 py-0.5"
                          }
                        >
                          Re-tiered onboarding; shipped checklist + guided tour
                        </span>
                      </div>
                      <div>4. Clarify handoffs for activation blockers</div>
                    </div>
                    <div className="mt-2 text-[10px] text-slate-400 font-mono">/launches/q3-launch#L3</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Caption */}
          <div className="mt-1 pt-1 pb-2 flex flex-col items-center">
            <div className="w-[30%] border-t border-white/15" />
            <div className="text-[11px] text-slate-400 mt-2 text-center">Opens with line 3 highlighted</div>
          </div>
        </div>
      </CardBody>
    </CardContainer>
  );
}
