"use client";

import React from "react";
import { CardBody, CardContainer } from "@/components/ui/3d-card";
import { uiBlueprint as ui } from "@/components/ui/ui-blueprint";

export default function CardWorkspaces() {
  return (
    <CardContainer className="inter-var" tiltStrength={12}>
      <CardBody
        className={ui.surfaceCard("relative w-full h-full p-0 overflow-hidden")}
        style={{ ...ui.fontStyle(), backgroundColor: ui.colors.ink }}
      >
        <div className="h-full flex flex-col">
          <div className="p-3 border-b border-white/10">
            <div className="text-[10px] tracking-widest uppercase mb-2 text-slate-400">W O R K S P A C E S</div>
          </div>
          <div className="flex-1 p-3 space-y-2">
            {[
              { name: "Portfolio", badge: "public" },
              { name: "Consulting", badge: null },
              { name: "Side project", badge: "Pro" },
            ].map((w, i) => (
              <div
                key={w.name}
                className={`flex items-center justify-between px-2 py-1 rounded text-sm ${
                  i === 0 ? "bg-indigo-600/30 text-white" : "text-slate-300 hover:bg-white/5"
                }`}
              >
                <span>{w.name}</span>
                {w.badge && (
                  <span
                    className={`text-[11px] px-1 py-0.5 rounded ${
                      w.badge === "Pro" ? "bg-purple-500/20 text-purple-200" : "bg-white/10 text-slate-200"
                    }`}
                  >
                    {w.badge}
                  </span>
                )}
              </div>
            ))}
          </div>
          <div className="mt-1 pt-1 pb-1 flex flex-col items-center">
            <div className="w-[30%] border-t border-white/15" />
            <div className="text-[11px] text-slate-400 mt-2 text-center">Keep audiences separate</div>
          </div>
        </div>
      </CardBody>
    </CardContainer>
  );
}
