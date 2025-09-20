"use client";

import * as React from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

export function InlineTooltip({
  text,
  tooltip,
  className,
}: {
  text: string;
  tooltip: string;
  className?: string;
}) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span className={cn("underline decoration-dotted underline-offset-4 cursor-help", className)}>
            {text}
          </span>
        </TooltipTrigger>
        <TooltipContent sideOffset={6} className="max-w-xs text-left leading-snug">
          {tooltip}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
