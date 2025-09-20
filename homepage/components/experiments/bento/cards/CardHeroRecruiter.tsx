"use client";

import React from "react";
import { CardBody, CardContainer } from "@/components/ui/3d-card";
import { uiBlueprint as ui } from "@/components/ui/ui-blueprint";
import { MessageCircle, Paperclip } from "lucide-react";

function ChatMessage({ author, text, delay = 0 }: { author: string; text: string; delay?: number }) {
  const [visible, setVisible] = React.useState(false);
  React.useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);
  const isSarah = author.toLowerCase().startsWith("sarah");
  const initial = isSarah ? "S" : "Y";
  return (
    <div className={`flex items-start gap-3 transition-all duration-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}>
      <div
        className={`${ui.classes.replyAvatar} flex items-center justify-center`}
        style={{ backgroundColor: isSarah ? "rgba(34,197,94,0.8)" : "#7c3aed" }}
      >
        {initial}
      </div>
      <div className="flex-1">
        <div className={ui.font.size.xs11 + " " + ui.colors.textSubtle + " mb-1"}>{author}</div>
        <div className={"rounded-lg bg-white/10 border border-white/10 px-3 py-2 text-white " + ui.font.size.sm12}>{text}</div>
      </div>
    </div>
  );
}

export default function CardHeroRecruiter() {
  return (
    <CardContainer className="inter-var group w-full md:w-full md:items-start md:justify-start" containerClassName="py-2 md:py-0 md:items-start md:justify-start" tiltStrength={10}>
      <CardBody
        className={
          ui.surfaceCard("relative w-full h-full md:h-auto md:w-full p-0 overflow-hidden") +
          " transition-[transform,box-shadow] duration-300 group-hover:-translate-y-px group-hover:shadow-[0_14px_40px_-24px_rgba(0,0,0,0.6)]"
        }
        style={{ ...ui.fontStyle(), backgroundColor: ui.colors.ink }}
      >
        <div className="relative z-[3] h-full flex flex-col">
          {/* Top content area */}
          <div className="grid grid-cols-[8rem_1fr] md:grid-cols-[13rem_1fr] flex-1">
            {/* Left panel with channels and DMs */}
            <div className="relative h-full w-full rounded-l-2xl" style={{ backgroundColor: ui.colors.mainHeader }}>
              {/* Full-height divider tied to left column */}
              <div className="absolute right-0 top-0 bottom-0 w-px bg-white/30" />
              <div className="p-2 md:p-3 h-full">
                {/* Channels section */}
                <div className="text-[9px] md:text-[10px] tracking-widest uppercase mb-1 md:mb-2 text-slate-400">CHANNELS</div>
                <div className="space-y-1 mb-3 md:mb-4">
                  <div className="flex items-center gap-1 md:gap-2 px-1 md:px-2 py-1 text-xs md:text-sm text-slate-300">
                    <span className="text-slate-500">#</span>
                    <span>general</span>
                  </div>
                </div>
                {/* Border separator */}
                <div className="border-t border-white/20 pt-2 md:pt-3">
                  <div className="flex items-center justify-between mb-1 md:mb-2">
                    <span className="text-[8px] md:text-[10px] tracking-widest uppercase text-slate-400">DMs</span>
                    <span className="w-2 h-2 rounded-full bg-red-400" />
                  </div>
                  <div className="space-y-1">
                    <div className="bg-indigo-600/30 rounded px-1 md:px-2 py-1 text-xs md:text-sm text-white">
                      <span>Sarah (Recruiter)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main chat area */}
            <div className="flex-1 flex flex-col">
              {/* Header */}
              <div className="h-10 md:h-12 px-2 md:px-4 pt-2 md:pt-3 border-b border-white/20" style={{ backgroundColor: ui.colors.mainHeader }}>
                <div className="text-xs md:text-sm font-bold text-white">Sarah (Recruiter)</div>
              </div>
              {/* Messages */}
              <div className="flex-1 p-2 md:p-4 space-y-2 md:space-y-3 overflow-y-auto">
                <ChatMessage author="Sarah" text="Hi! Are you authorized to work in the U.S.?" delay={0} />
                <ChatMessage author="You" text="Yes, U.S. citizen." delay={200} />
                <ChatMessage author="Sarah" text="Will you require future sponsorship?" delay={400} />
                <ChatMessage author="You" text="No." delay={600} />
                {/* You message with attachments */}
                <div className="flex items-start gap-2 md:gap-3">
                  <div className="w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center bg-purple-600 text-white font-bold text-xs md:text-sm">Y</div>
                  <div className="flex-1">
                    <div className="text-[10px] md:text-[11px] text-slate-400 mb-1">You</div>
                    <div className="bg-white/10 rounded p-2 md:p-3 text-xs md:text-sm text-white">
                      6+ years PM experience. Here's my résumé and calendar link.
                      <div className="flex items-center gap-1 md:gap-2 mt-1 md:mt-2">
                        <div className="bg-white/10 rounded px-1 md:px-2 py-1 text-[10px] md:text-xs text-slate-300 inline-flex items-center gap-1">
                          <Paperclip className="w-2 h-2 md:w-3 md:h-3" /> Resume.pdf
                        </div>
                        <div className="bg-purple-600/50 text-white rounded px-1 md:px-2 py-1 text-[10px] md:text-xs inline-flex items-center gap-1">
                          <MessageCircle className="w-2 h-2 md:w-3 md:h-3" /> Calendar
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Bottom spacer to separate from divider/caption section (ultra-tight) */}
              <div className="h-px" />
            </div>
          </div>
          {/* Partial-width divider + caption (outside top grid) */}
          <div className="px-2 md:px-4 pb-3 md:pb-2 pt-0 flex flex-col items-center">
            <div className="w-[30%] border-t border-white/15 mt-2 md:mt-1" />
            <p className="text-[10px] md:text-[11px] text-slate-400 mt-1 md:mt-1 mb-1 md:mb-1 text-center">
              Share your Threadfolio link instead of writing the same thing over and over again.
            </p>
          </div>
        </div>
      </CardBody>
    </CardContainer>
  );
}
