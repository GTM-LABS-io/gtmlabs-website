import React, { ReactNode } from "react";
import clsx from "clsx";

type BentoGridProps = {
  className?: string;
  children: ReactNode;
};

export function BentoGrid({ className, children }: BentoGridProps) {
  return (
    <div
      className={clsx(
        // Mobile: single column stack, slightly tighter rows
        "w-full grid grid-cols-1 auto-rows-[10rem] gap-y-1",
        // Desktop+: 6-col storyboard; pack rows tighter
        "md:grid-cols-6 md:auto-rows-auto md:[grid-auto-flow:dense] md:gap-x-1.5 md:gap-y-0",
        className
      )}
    >
      {children}
    </div>
  );
}

// Predefined size variants for predictable Tailwind classes (avoids dynamic class generation)
// lg = 4x2, md = 2x1, sm = 2x1 (same span as md, but you can style differently if desired)
export type BentoItemVariant = "xl" | "lg" | "md" | "sm" | "wide" | "lgwide";

const variantClasses: Record<BentoItemVariant, string> = {
  xl: "md:col-span-6 md:row-span-2",
  lg: "md:col-span-4 md:row-span-2",
  md: "md:col-span-2 md:row-span-1",
  sm: "md:col-span-2 md:row-span-1",
  wide: "md:col-span-6 md:row-span-1",
  lgwide: "md:col-span-4 md:row-span-1",
};

type BentoItemProps = {
  variant: BentoItemVariant;
  className?: string;
  children: ReactNode;
};

export function BentoItem({ variant, className, children }: BentoItemProps) {
  return (
    <div className={clsx("col-span-1", variantClasses[variant], className)}>
      {children}
    </div>
  );
}
