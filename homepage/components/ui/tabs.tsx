"use client";

import * as TabsPrimitive from "@radix-ui/react-tabs";
import * as React from "react";

import { cn } from "@/lib/utils";
import { BorderBeam } from "@/components/magicui/border-beam";

const Tabs = TabsPrimitive.Root;

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "flex flex-nowrap items-center gap-1.5 rounded-xl bg-transparent p-1 text-[11px] text-slate-300",
      className,
    )}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "group relative z-0 isolate overflow-visible rounded-lg px-3 py-1.5 text-xs font-semibold text-slate-300 transition-all duration-300",
      "data-[state=active]:text-white",
      "after:absolute after:inset-0 after:z-[1] after:rounded-[inherit] after:border after:border-[#23242C] after:bg-[#050b17]/95 after:transition-transform after:duration-300 after:content-['']",
      className,
    )}
    {...props}
  >
    <span
      aria-hidden
      className="pointer-events-none absolute inset-0 -m-[4px] rounded-[inherit] opacity-0 transition-opacity duration-500 group-data-[state=active]:opacity-100"
    >
      <BorderBeam
        duration={6}
        size={28}
        colorFrom="#2563eb"
        colorTo="#38bdf8"
        borderWidth={1}
      />
    </span>
    <span className="relative z-[2] flex items-center gap-1">{children}</span>
  </TabsPrimitive.Trigger>
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn("mt-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60", className)}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsContent, TabsList, TabsTrigger };
