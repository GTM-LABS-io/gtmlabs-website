"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";

interface DisplayCardProps {
  className?: string;
  icon?: React.ReactNode;
  title?: string;
  description?: string;
  date?: string;
  iconClassName?: string;
  titleClassName?: string;
  variant?: 'dark' | 'glass';
}

function DisplayCard({
  className,
  icon = <Sparkles className="size-4" />,
  title = "Featured",
  description = "Discover amazing content",
  date = "Just now",
  iconClassName = "",
  titleClassName = "",
  variant = 'dark',
}: DisplayCardProps) {
  const base = "group relative flex h-32 sm:h-36 min-w-[16rem] w-[calc(100%-4rem-8px)] sm:w-[calc(100%-5rem-12px)] md:w-[calc(100%-7rem-16px)] max-w-[42rem] -skew-y-[8deg] select-none flex-col justify-between rounded-xl px-4 py-3 transition-all duration-700 [&>*]:flex [&>*]:items-center [&>*]:gap-2 before:content-[''] before:pointer-events-none before:absolute before:inset-0 before:bg-[linear-gradient(to_left,rgba(0,0,0,0.7),transparent_160px),linear-gradient(to_bottom,rgba(0,0,0,0.6),transparent_96px)] after:pointer-events-none after:absolute after:inset-0 after:bg-[radial-gradient(720px_720px_at_100%_0%,rgba(0,0,0,0.92),transparent_60%)]";
  const glass = "border-2 bg-muted/70 backdrop-blur-sm after:absolute after:-right-1 after:top-[-5%] after:h-[110%] after:w-[20rem] after:bg-gradient-to-l after:from-background after:to-transparent after:content-[''] hover:border-white/20 hover:bg-muted";
  const dark = "border border-white/10 bg-[#090C14] hover-feature-surface opacity-90 hover:opacity-100 backdrop-blur-sm hover:backdrop-blur-0 hover:border-white/20";
  return (
    <div
      className={cn(base, variant === 'glass' ? glass : dark, className)}
    >
      <div>
        <span className="relative inline-block rounded-full p-1 bg-[color:var(--brand-pill-bg,#09122A)] text-white transition-colors group-hover:text-[color:var(--brand-pill-text,#BFDBFE)]">
          {icon}
        </span>
        <p className={cn(
          "text-lg font-medium text-white transition-colors group-hover:text-[color:var(--brand-pill-text,#BFDBFE)]",
          titleClassName
        )}>{title}</p>
      </div>
      <p className="whitespace-nowrap text-lg text-slate-200">{description}</p>
      <p className="text-slate-400">{date}</p>
    </div>
  );
}

interface DisplayCardsProps {
  cards?: DisplayCardProps[];
}

export default function DisplayCards({ cards }: DisplayCardsProps) {
  const defaultCards = [
    {
      icon: <Sparkles className="size-4" />,
      title: "Featured",
      description: "Discover amazing content",
      date: "Just now",
      className: "[grid-area:stack] hover:-translate-y-10",
    },
    {
      icon: <Sparkles className="size-4" />,
      title: "Popular",
      description: "Trending this week",
      date: "2 days ago",
      className: "[grid-area:stack] translate-x-8 translate-y-6 sm:translate-x-12 sm:translate-y-8 md:translate-x-16 md:translate-y-10 hover:-translate-y-1",
    },
    {
      icon: <Sparkles className="size-4" />,
      title: "New",
      description: "Latest updates and features",
      date: "Today",
      className: "[grid-area:stack] translate-x-12 translate-y-12 sm:translate-x-16 sm:translate-y-16 md:translate-x-24 md:translate-y-20 hover:translate-y-10",
    },
  ];

  const displayCards = cards || defaultCards;

  return (
    <div className="grid [grid-template-areas:'stack'] place-items-center opacity-100 animate-in fade-in-0 duration-700 overflow-visible py-4">
      {displayCards.map((cardProps, index) => (
        <DisplayCard key={index} {...cardProps} />
      ))}
    </div>
  );
}
