"use client";

import React from "react";
import { BentoGrid, BentoItem } from "@/components/experiments/BentoGrid";
import CardLockedChannelComposite from "@/components/experiments/bento/cards/CardLockedChannelComposite";

// Minimal section that showcases the combined 'Locked Channel Composite' card
// Non-destructive: does not alter existing sections; rendered separately for comparison
export default function BentoSectionOptionC() {
  return (
    <div className="hidden md:block">
      <BentoGrid>
        {/* Showcase the combined card in the right column position to simulate actual placement */}
        <BentoItem variant="md" className="md:col-start-5 md:row-start-1 md:-mt-3">
          <CardLockedChannelComposite />
        </BentoItem>
      </BentoGrid>
    </div>
  );
}
