import { Zap, Sparkles, Package, Calendar } from "lucide-react";
import type { HowItWorksEntry } from "@/components/ui/how-it-works-timeline";

/**
 * Content-only file for the How It Works section.
 * Guardrail: Only edit text, items, image URLs, and button URL/text below.
 * Do not modify component logic; that lives in how-it-works-timeline.tsx.
 */
export const howItWorksEntries: HowItWorksEntry[] = [
  {
    icon: Zap,
    title: "Drop Your Link",
    subtitle: "0 hrs • Share webinar",
    description:
      "Share your webinar recording URL or upload your video file to the client portal. We handle the rest—no complicated briefing documents required.",
    items: [],
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800",
  },
  {
    icon: Sparkles,
    title: "Sit Back & Relax",
    subtitle: "<48 hrs • 30+ assets",
    description:
      "Our AI analyzes your webinar and extracts the best moments. Then, our team refines everything to match your brand voice and messaging.",
    items: [
      "AI extracts key insights and quotes",
      "We create 30+ assets per webinar",
      "Human editors ensure quality and accuracy",
      "Brand voice matching from your style guide",
      "SEO-optimized content for maximum reach",
    ],
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800",
  },
  {
    icon: Package,
    title: "Review & Approve",
    subtitle: "72 hrs • Ready for feedback",
    description:
      "All your repurposed assets are uploaded to your client portal where you can review, request edits, and schedule posts.",
    items: [
      "SEO-optimized blog post",
      "20 social media posts across all platforms",
      "Newsletter edition to engage your audience",
      "10-15 short-form video clips ready to publish",
      "Lead magnet with landing page",
      "Automated post scheduling across all platforms",
    ],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800",
  },
  {
    icon: Calendar,
    title: "Watch Growth Happen",
    subtitle: "Ongoing • Compounding",
    description:
      "Your content works 24/7 to grow your audience. Each webinar builds on the last, creating a flywheel of compounding reach and engagement.",
    items: [
      "Build a content library that works around the clock",
      "Grow your email list consistently between events",
      "Increase reach and visibility across all channels",
      "Re-engage your audience with valuable touchpoints",
      "Maximize ROI from every webinar you produce",
      "Zero additional effort from your team",
    ],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800",
  },
];
