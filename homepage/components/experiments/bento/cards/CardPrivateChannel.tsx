"use client";

import React from "react";
import { CardBody, CardContainer } from "@/components/ui/3d-card";
import { uiBlueprint as ui } from "@/components/ui/ui-blueprint";
import { Hash, Lock } from "lucide-react";

export default function CardPrivateChannel() {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => { const t = setTimeout(() => setMounted(true), 50); return () => clearTimeout(t); }, []);
  return (
    <CardContainer className="inter-var group" containerClassName="py-2 md:py-0" tiltStrength={15}>
      <CardBody
        className={
          ui.surfaceCard("relative w-full h-full p-0 overflow-hidden") +
          ` transition-[transform,box-shadow,opacity,transform] duration-500 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[2px]"} group-hover:-translate-y-px group-hover:shadow-[0_14px_40px_-24px_rgba(0,0,0,0.6)]`
        }
        style={{ ...ui.fontStyle(), backgroundColor: ui.colors.ink }}
      >
        <div className="flex">
          {/* Mini left panel */}
          <div className="relative w-16 p-1.5 rounded-l-2xl" style={{ backgroundColor: ui.colors.mainHeader }}>
            {/* Guaranteed full-height divider */}
            <div className="absolute right-0 top-0 bottom-0 w-px bg-white/30 pointer-events-none" />
            <div className="space-y-1">
              <div className="flex items-center gap-1 px-1 py-0.5 text-xs text-slate-300">
                <span className="text-slate-500">#</span>
                <span className="text-xs">gen</span>
              </div>
              <div className="bg-indigo-600/30 px-1 py-0.5 text-xs rounded text-white border-l-2">
                <span className="text-slate-200">inc</span>
              </div>
            </div>
          </div>
          {/* Main area with lock message */}
          <div className="flex-1 flex flex-col">
            {/* Header */}
            <div className="h-8 px-2.5 pt-1.5 border-b border-white/20" style={{ backgroundColor: ui.colors.mainHeader }}>
              <div className="text-xs font-bold text-white flex items-center gap-1">
                <Hash className="w-3 h-3" />
                incidents
                <Lock className="w-3 h-3 ml-auto text-slate-400" />
              </div>
            </div>
            {/* Lock message */}
            <div className="flex-1 flex items-center justify-center p-2 pb-1.5">
              <div className="text-center">
                <div className="text-sm text-white mb-1">You're not a member of this private channel</div>
                <div className="text-[11px] text-slate-400 mb-3">You'll need an invite to view messages and files.</div>
                <div className="flex gap-1">
                  <button className="bg-white/10 hover:bg-white/15 rounded px-2 py-1 text-xs text-white transition-colors">Request</button>
                  <button className="bg-white/10 hover:bg-white/15 rounded px-2 py-1 text-xs text-white transition-colors">Contact</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Description with partial-width divider */}
        <div className="mt-0.5 pt-0.5 pb-1.5 flex flex-col items-center">
          <div className="w-[30%] border-t border-white/15" />
          <div className="text-[11px] text-slate-400 mt-2 text-center">Show the channel name, keep contents private.</div>
        </div>
      </CardBody>
    </CardContainer>
  );
}
