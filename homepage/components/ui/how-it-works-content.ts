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
    title: "Drop Your Webinar Link",
    subtitle: "Hour 0 • 30 seconds",
    description:
      "Simply paste your YouTube or recording link into our portal. That's it. We already know your preferences from onboarding.",
    items: [
      "Works with YouTube, Zoom, Vimeo, or any video URL",
      "No forms to fill out",
      "Instant confirmation email",
      "Real-time progress tracking starts immediately",
    ],
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800",
    button: {
      url: "/portal-demo",
      text: "See Portal Demo",
    },
  },
  {
    icon: Sparkles,
    title: "AI + Human Processing",
    subtitle: "Hours 0-24 • Behind the scenes",
    description:
      "Our AI transcribes and analyzes your webinar while our team ensures everything matches your brand voice perfectly.",
    items: [
      "AI extracts key insights and quotes",
      "Creates 30+ unique content pieces",
      "Human editors ensure quality and accuracy",
      "Brand voice matching from your style guide",
      "SEO optimization for all written content",
    ],
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800",
  },
  {
    icon: Package,
    title: "Content Library Delivered",
    subtitle: "Hour 72 • Ready to publish",
    description:
      "Receive your complete content package organized by platform, with a publishing calendar and copy-paste ready formats.",
    items: [
      "2 SEO blog posts (2000+ words each)",
      "20+ LinkedIn posts (4 weeks of content)",
      "Monthly newsletter edition",
      "10+ short-form video clips",
      "5-7 carousel posts with swipe-ready graphics",
    ],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800",
    button: {
      url: "/sample-delivery",
      text: "View Sample Package",
    },
  },
  {
    icon: Calendar,
    title: "Compound Growth Begins",
    subtitle: "Ongoing • Watch metrics climb",
    description:
      "Your content works 24/7 to grow your audience. Each webinar builds on the last, creating exponential growth.",
    items: [
      "Average 2x increase in next webinar attendance",
      "500+ new email subscribers per month",
      "10,000+ social impressions per webinar",
      "3-5x more qualified leads",
      "Zero additional effort from your team",
    ],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800",
    button: {
      url: "/case-studies",
      text: "See Client Results",
    },
  },
];
