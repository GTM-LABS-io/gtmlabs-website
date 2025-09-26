"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface ThinBlueBorderCardProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "inner";
  isActive?: boolean;
}

/**
 * Standardized thin blue border card component
 * Based on the timeline cards styling:
 * - Pure black background (#000000)
 * - Thin blue border (border-blue-500/20)
 * - Subtle shadow when active
 */
export function ThinBlueBorderCard({ 
  children, 
  className = "", 
  variant = "default",
  isActive = false 
}: ThinBlueBorderCardProps) {
  const baseStyles = "rounded-xl border transition-all duration-300 ease-out";
  
  const variantStyles = {
    default: cn(
      baseStyles,
      "bg-black", // Pure black background
      isActive 
        ? "border-blue-500/20 shadow-2xl shadow-blue-500/10" 
        : "border-blue-500/15"
    ),
    inner: cn(
      baseStyles,
      "bg-zinc-950/50", // Slightly transparent for inner elements
      "border-blue-500/20"
    )
  };

  return (
    <div className={cn(variantStyles[variant], className)}>
      {children}
    </div>
  );
}

/**
 * Inner content wrapper for lists/text within the card
 * Matches the timeline card inner styling
 */
export function ThinBlueBorderCardInner({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <ThinBlueBorderCard variant="inner" className={cn("p-4", className)}>
      {children}
    </ThinBlueBorderCard>
  );
}
