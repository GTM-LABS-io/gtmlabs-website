"use client";

import React from "react";
import { BentoGrid, BentoItem } from "@/components/experiments/BentoGrid";
import CardHeroRecruiter from "@/components/experiments/bento/cards/CardHeroRecruiter";
import CardLockedChannelComposite from "@/components/experiments/bento/cards/CardLockedChannelComposite";
import CardAttachmentsThread from "@/components/experiments/bento/cards/CardAttachmentsThread";
import CardWorkspaces from "@/components/experiments/bento/cards/CardWorkspaces";
import CardDeepLink from "@/components/experiments/bento/cards/CardDeepLink";
import CardTestimonials from "@/components/experiments/bento/cards/CardTestimonials";

export default function BentoSection() {
  return (
    <div className="hidden md:block">
      <BentoGrid>
        {/* Hero Left */}
        <BentoItem variant="lg">
          <CardHeroRecruiter />
        </BentoItem>

        {/* Combined Locked Channel Composite — replaces top-right + middle-right */}
        <BentoItem variant="md" className="md:col-start-5 md:row-start-1 md:row-span-2 md:-mt-3">
          <CardLockedChannelComposite />
        </BentoItem>

        {/* Attachments with right thread panel (wide) — directly under hero */}
        <BentoItem variant="lgwide" className="md:col-start-1 md:row-start-3 md:-mt-5">
          <CardAttachmentsThread />
        </BentoItem>

        {/* Row below attachments: left stack */}

        <BentoItem variant="sm" className="md:col-start-3 md:row-start-4 md:-mt-[2px]">
          <CardWorkspaces />
        </BentoItem>

        {/* Deep Link moved below as well (not in rightmost column) */}
        <BentoItem variant="sm" className="md:col-start-4 md:row-start-4 md:mt-[2px]">
          <CardDeepLink />
        </BentoItem>

        {/* Right-side second slot now occupied by the combined card above (row-span-2) */}

        {/* Testimonials footer (slight lift) */}
        <BentoItem variant="wide" className="md:col-start-1 md:row-start-5 md:-mt-[1px]">
          <CardTestimonials />
        </BentoItem>
      </BentoGrid>
    </div>
  );
}
