"use client";

import React from "react";
import { BentoGrid, BentoItem } from "@/components/experiments/BentoGrid";
import CardHeroRecruiter from "@/components/experiments/bento/cards/CardHeroRecruiter";
import CardPrivateChannel from "@/components/experiments/bento/cards/CardPrivateChannel";
import CardSelectiveShare from "@/components/experiments/bento/cards/CardSelectiveShare";
import CardAttachmentsThread from "@/components/experiments/bento/cards/CardAttachmentsThread";
import CardWorkspaces from "@/components/experiments/bento/cards/CardWorkspaces";
import CardDeepLink from "@/components/experiments/bento/cards/CardDeepLink";
import CardTestimonials from "@/components/experiments/bento/cards/CardTestimonials";

// Option A: Hero is 4x1 (lgwide) and Attachments sits directly beneath it at row 2.
// This removes the structural row gap and shows true adjacency.
export default function BentoSectionOptionA() {
  return (
    <div className="hidden md:block">
      <BentoGrid>
        {/* Hero: 4x1 */}
        <BentoItem variant="lgwide">
          <CardHeroRecruiter />
        </BentoItem>

        {/* Top-right next to hero (raised more) */}
        <BentoItem variant="md" className="md:col-start-5 md:row-start-1 md:-mt-3">
          <CardSelectiveShare />
        </BentoItem>

        {/* Attachments directly under hero */}
        <BentoItem variant="lgwide" className="md:col-start-1 md:row-start-2 md:-mt-2">
          <CardAttachmentsThread />
        </BentoItem>

        {/* Row 3 (left stack) */}
        <BentoItem variant="sm" className="md:col-start-3 md:row-start-3 md:-mt-[2px]">
          <CardWorkspaces />
        </BentoItem>
        <BentoItem variant="sm" className="md:col-start-4 md:row-start-3 md:mt-[2px]">
          <CardDeepLink />
        </BentoItem>

        {/* Private Channel aligned to same row as attachments (row 2, right) - pulled up more */}
        <BentoItem variant="md" className="md:col-start-5 md:row-start-2 md:-mt-7">
          <CardPrivateChannel />
        </BentoItem>

        {/* Footer */}
        <BentoItem variant="wide" className="md:col-start-1 md:row-start-4 md:-mt-[1px]">
          <CardTestimonials />
        </BentoItem>
      </BentoGrid>
    </div>
  );
}
