"use client";

import React from "react";
import HowItWorksTimeline, { type HowItWorksEntry } from "@/components/ui/how-it-works-timeline";
import { howItWorksEntries } from "@/components/ui/how-it-works-content";

export default function HowItWorksSection() {
  return (
    <HowItWorksTimeline
      title="From Webinar to Content Library in 72 Hours"
      description="Drop your link, we handle everything. No meetings, no briefings, just results."
      entries={howItWorksEntries}
    />
  );
}
