 "use client";

import React from "react";
import { BentoGrid, BentoItem } from "@/components/experiments/BentoGrid";
import CardLockedChannelComposite from "@/components/experiments/bento/cards/CardLockedChannelComposite";
import CardAttachmentsThread from "@/components/experiments/bento/cards/CardAttachmentsThread";
import CardHeroRecruiter from "@/components/experiments/bento/cards/CardHeroRecruiter";

// Option B: Single 4-col BentoItem section that contains both Hero and Attachments stacked
// internally to guarantee near-seamless adjacency.
function HeroPlusAttachments() {
  return (
    <div className="relative w-full h-full">
      <div className="space-y-0">
        <CardHeroRecruiter />
        {/* Add breathing room between the two rows */}
        <div className="h-1 md:h-2" />
        <CardAttachmentsThread />
      </div>
    </div>
  );
}

export default function BentoSectionOptionB() {
  return (
    <>
      {/* Mobile: root page stack; preserves exact card content, only changes flow */}
      <div className="md:hidden px-2 space-y-3 overflow-x-hidden max-w-[calc(100vw-1rem)]">
        <HeroPlusAttachments />
        <CardLockedChannelComposite />
      </div>

      {/* Desktop unchanged */}
      <div className="hidden md:block">
        <BentoGrid>
          {/* Single 4-col container with both hero and attachments */}
          <BentoItem variant="lg">
            <HeroPlusAttachments />
          </BentoItem>

          {/* Right column: Combined Locked Channel Composite replaces the two small cards */}
          <BentoItem variant="md" className="md:col-start-5 md:row-start-1 md:row-span-2 md:-mt-[2px]">
            <CardLockedChannelComposite />
          </BentoItem>

          {/* Production Option B intentionally omits additional cards to focus on the primary narrative */}
        </BentoGrid>
      </div>
    </>
  );
}
