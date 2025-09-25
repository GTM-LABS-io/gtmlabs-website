"use client";

import React, { useEffect } from "react";
import { cn } from "@/lib/utils";
import { Sparkles, FileText, Clapperboard, BookOpen } from "lucide-react";

interface DisplayCardProps {
  className?: string;
  icon?: React.ReactNode;
  title?: string;
  description?: string;
  date?: string;
  iconClassName?: string;
  titleClassName?: string;
}

function DisplayCard({
  className,
  icon = <Sparkles className="size-4 text-blue-300" />,
  title = "On-brand assets",
  description = "Repurposed from your webinar — ready to publish",
  date = "48 hours delivery",
  iconClassName = "text-blue-300",
  titleClassName = "text-white",
}: DisplayCardProps) {
  return (
    <div
      data-guard="display-card"
      className={cn(
        "relative isolate flex h-36 w-[22rem] -skew-y-[8deg] select-none flex-col justify-between rounded-xl border-2 border-white/10 bg-[#000]/90 backdrop-blur-sm px-4 py-3 transition-all duration-700 after:pointer-events-none after:absolute after:-right-1 after:top-[-5%] after:h-[110%] after:w-[20rem] after:bg-gradient-to-l after:from-[#000] after:to-transparent after:rounded-tr-2xl after:content-[''] hover:border-white/20 hover:bg-[#000] [&>*]:flex [&>*]:items-center [&>*]:gap-2",
        className
      )}
    >
      <div>
        <span className="relative inline-block rounded-full bg-blue-900/60 p-1">
          {icon}
        </span>
        <p data-guard-role="title" className={cn("text-lg font-medium text-white truncate", titleClassName)}>{title}</p>
      </div>
      <p data-guard-role="description" className="whitespace-nowrap truncate text-lg text-slate-300">{description}</p>
      <p data-guard-role="meta" className="text-slate-400">{date}</p>
    </div>
  );
}

interface DisplayCardsProps {
  cards?: DisplayCardProps[];
}

export default function DisplayCards({ cards }: DisplayCardsProps) {
  // Guardrails: require explicit unlock key to modify structure or messaging
  const FRAME_DELETE_KEY = "RUIXEN_BEAM_FRAME_OK";
  const providedKey = process.env.NEXT_PUBLIC_FRAME_DELETE_KEY;
  const canEditCards = providedKey === FRAME_DELETE_KEY;

  const defaultCards = [
    {
      icon: <Sparkles className="size-4 text-blue-300" />,
      title: "Repurposed",
      description: "From webinar to blog post",
      date: "1 recording → 5 blogs",
      className:
        "[grid-area:stack] hover:-translate-y-10 grayscale-[100%] hover:grayscale-0",
    },
    {
      icon: <Sparkles className="size-4 text-blue-300" />,
      title: "Social-Ready",
      description: "Clips cut for LinkedIn & TikTok",
      date: "10+ posts per webinar",
      className:
        "[grid-area:stack] translate-x-12 translate-y-10 hover:-translate-y-1 grayscale-[100%] hover:grayscale-0",
    },
    {
      icon: <Sparkles className="size-4 text-blue-300" />,
      title: "Evergreen",
      description: "Lead magnet PDFs & guides",
      date: "Delivered in 48 hours",
      className: "[grid-area:stack] translate-x-24 translate-y-20 hover:translate-y-10",
    },
  ];

  const displayCards = cards || defaultCards;

  // Dev-only guard: watch for structural or messaging mutations
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production' && !canEditCards) {
      const root = document.querySelector('[data-guard="display-cards"]');
      if (!root) return;
      const observer = new MutationObserver((mutations) => {
        for (const m of mutations) {
          if (m.type === 'childList' || m.type === 'attributes' || m.type === 'characterData') {
            // eslint-disable-next-line no-console
            console.error(
              'Guardrail: DisplayCards is locked. To intentionally modify structure or messaging, set NEXT_PUBLIC_FRAME_DELETE_KEY=RUIXEN_BEAM_FRAME_OK and restart your dev server.'
            );
            break;
          }
        }
      });
      observer.observe(root, { subtree: true, attributes: true, childList: true, characterData: true });
      return () => observer.disconnect();
    }
  }, [canEditCards]);

  return (
    <div
      className="grid [grid-template-areas:'stack'] place-items-center opacity-100 animate-in fade-in-0 duration-700"
      data-guard="display-cards"
      data-locked={canEditCards ? "false" : "true"}
    >
      {displayCards.map((cardProps, index) => (
        <DisplayCard key={index} {...cardProps} />
      ))}
    </div>
  );
}
