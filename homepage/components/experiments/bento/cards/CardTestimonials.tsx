"use client";

import React from "react";
import { CardBody, CardContainer } from "@/components/ui/3d-card";
import { uiBlueprint as ui } from "@/components/ui/ui-blueprint";
import { Linkedin } from "lucide-react";

export default function CardTestimonials() {
  return (
    <CardContainer className="inter-var" tiltStrength={12}>
      <CardBody
        className={ui.surfaceCard("relative w-full h-full p-2")}
        style={{ ...ui.fontStyle(), backgroundColor: ui.colors.ink }}
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-emerald-500 text-white font-bold flex items-center justify-center">P</div>
          <div className="flex-1">
            <div className="text-[12px] text-slate-300 flex items-center gap-2">
              <span className="font-medium text-slate-200">Priya Shah</span>
              <Linkedin className="w-3 h-3 text-sky-400" />
              <span className="text-slate-500">·</span>
              <span className="text-[11px] text-slate-400">Product Lead, Acme</span>
            </div>
            <div className="mt-1 text-sm text-slate-200 line-clamp-2">“Working with Y doubled activation in two months.”</div>
          </div>
        </div>
      </CardBody>
    </CardContainer>
  );
}
