"use client";

import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import React from "react";

import { cn } from "@/lib/utils";

/**
 * DiscussionItem visually groups a question and its replies within an accordion layout.
 */
export function DiscussionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      className={cn(
        "relative mt-1 pl-3 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-px before:bg-gradient-to-b before:from-border/80 before:via-border/50 before:to-border/20",
        className,
      )}
      {...props}
    />
  );
}

/**
 * DiscussionContent wraps the main header area for an accordion item.
 */
export function DiscussionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Header>) {
  return (
    <AccordionPrimitive.Header className={cn("flex", className)} {...props}>
      {children}
    </AccordionPrimitive.Header>
  );
}

/**
 * DiscussionExpand renders the trigger that toggles replies visibility.
 */
export function DiscussionExpand({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Trigger
      className={cn(
        "mt-1 flex w-full items-center justify-between rounded-md border border-white/10 px-3 py-1.5 text-left text-[11px] font-medium tracking-tight text-muted-foreground transition-colors hover:border-white/20 hover:text-white [&[data-state=open]>svg]:rotate-180",
        className,
      )}
      {...props}
    >
      Show Replies
      <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" />
    </AccordionPrimitive.Trigger>
  );
}

/**
 * DiscussionTitle highlights the author metadata within a discussion item.
 */
export function DiscussionTitle({
  children,
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("text-sm font-semibold", className)} {...props}>
      {children}
    </div>
  );
}

/**
 * DiscussionBody displays rich text content for questions or replies.
 */
export function DiscussionBody({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("text-sm leading-relaxed", className)} {...props}>
      {children}
    </div>
  );
}

/**
 * DiscussionReplies nests follow-up responses underneath a discussion item.
 */
export function DiscussionReplies({
  children,
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      className={cn(
        "overflow-hidden pl-6 text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
        className,
      )}
      {...props}
    >
      {children}
    </AccordionPrimitive.Content>
  );
}

/**
 * Discussion orchestrates the accordion root for the threaded discussion UI.
 */
export function Discussion({
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return <AccordionPrimitive.Root data-slot="accordion" {...props} />;
}
