"use client";

import React from "react";
import { uiBlueprint as ui } from "@/components/ui/ui-blueprint";
import { Paperclip, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export type Channel = { name: string; active?: boolean };

export function BlueprintLeftPanel({
  channels,
  title = "CHANNELS",
  className,
}: {
  channels: Channel[];
  title?: string;
  className?: string;
}) {
  return (
    <aside className={cn("", className)} style={ui.fontStyle()}>
      <div className={ui.surfacePanel("flex items-center justify-between mb-2 !bg-white/5")}> 
        <span className={cn(ui.font.size.xs11, "tracking-[0.2em] uppercase", ui.colors.textSubtle)}>
          {title}
        </span>
        <button className={ui.iconButton("!px-1.5 !py-1")}>+</button>
      </div>
      <div className="space-y-1.5">
        {channels.map((c) => (
          <div
            key={c.name}
            className={cn(
              "px-2 py-1.5 rounded-md flex items-center justify-between border",
              c.active
                ? ui.classes.activeChannel
                : "text-slate-300 hover:bg-white/5 border-transparent"
            )}
          >
            <span>#{c.name}</span>
            {c.active && (
              <span className="text-[11px] bg-indigo-500/20 px-1.5 py-0.5 rounded">active</span>
            )}
          </div>
        ))}
      </div>
    </aside>
  );
}

export function BlueprintEntryCard({
  text,
  file,
  likes = 0,
  replies = 0,
  className,
}: {
  text: string;
  file?: string;
  likes?: number;
  replies?: number;
  className?: string;
}) {
  return (
    <div className={ui.surfacePanel(cn("", className))} style={ui.fontStyle()}>
      <div className={cn(ui.font.size.base14, ui.colors.textDefault)}>{text}</div>
      {file && (
        <div className="mt-2 inline-flex items-center gap-2 text-xs text-slate-200 bg-white/8 border border-white/15 rounded px-2 py-1">
          <Paperclip className="w-3 h-3" /> {file}
        </div>
      )}
      <div className="mt-2 text-xs text-slate-400 flex items-center gap-3">
        <span>👍 {likes}</span>
        <span>💬 {replies} replies</span>
      </div>
    </div>
  );
}

export function BlueprintComposer({
  defaultText,
  placeholder = "Message…",
  showOutcomeButton = true,
  onAttach,
  onPost,
  className,
}: {
  defaultText?: string;
  placeholder?: string;
  showOutcomeButton?: boolean;
  onAttach?: () => void;
  onPost?: () => void;
  className?: string;
}) {
  return (
    <div className={ui.surfacePanel(cn("mt-auto", className))} style={ui.fontStyle()}>
      <div className="flex items-center gap-2">
        <input
          className={cn(
            "flex-1 bg-transparent outline-none",
            ui.font.size.base14,
            "placeholder:text-slate-500",
            ui.colors.textDefault
          )}
          placeholder={placeholder}
          defaultValue={defaultText}
        />
        <button onClick={onAttach} className={ui.iconButton()}>
          <Paperclip className="w-3 h-3" /> Attach
        </button>
        {showOutcomeButton && (
          <button className={ui.iconButton()}>
            <Plus className="w-3 h-3" /> outcome
          </button>
        )}
        <button onClick={onPost} className={ui.accentButton()}>
          Post
        </button>
      </div>
    </div>
  );
}
