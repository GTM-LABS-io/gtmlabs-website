'use client'

import {
  CosmicBackground,
  GlassCard,
  CosmicButton,
  CosmicHeader,
  IntegrationGrid,
  CosmicPill,
  TwoColumnFeature,
  MiniFeatureCard
} from '@/components/cosmic'
import { TiltedScroll } from '@/components/ui/tilted-scroll'
import DisplayCards from '@/components/ui/display-cards'
import AnalyticsCards from '@/components/ui/analytics-cards'
import CustomizationGraph from '@/components/ui/customization-graph'
import { PricingSection } from '@/components/pricing-section'
import { ShimmerBorder } from '@/components/ui/shimmer-border'
import { AnimatedGroup } from '@/components/ui/animated-group'
import { ContainerTextFlip } from '@/components/container-text-flip'
import RuixenFeaturedImageSection from '@/components/ui/ruixen-featured-image-section'
import ProblemParallaxCards from '@/components/ui/problem-parallax-cards'
import HowItWorksSection from '@/components/ui/how-it-works-section'
import {
  MessageCircle,
  FileText,
  Zap,
  Sparkles,
  Cpu,
  Database,
  Cloud,
  Layers,
  Code2,
  Globe,
  Palette,
  BarChart3,
  ListChecks,
  Timer,
  Sliders
} from 'lucide-react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { APP_NAME, CONTACT_EMAIL, SITE_URL } from '@/lib/brand'

const transitionVariants = {
  item: {
    hidden: {
      opacity: 0,
      filter: 'blur(12px)',
      y: 12,
    },
    visible: {
      opacity: 1,
      filter: 'blur(0px)',
      y: 0,
      transition: {
        type: 'spring' as const,
        bounce: 0.3,
        duration: 1.5,
      },
    },
  },
}

export default function NewLandingPage() {
  const router = useRouter();
  // Header nav items: Pricing goes to main pricing page, FAQ smooth scrolls on this page
  const navItems = [
    { name: 'Pricing', href: '/#pricing' },
    {
      name: 'FAQ',
      href: '#faq',
      onClick: (e: React.MouseEvent) => {
        e.preventDefault()
        if (typeof document !== 'undefined') {
          document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' })
        }
      }
    }
  ]

  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const faqs = [
    {
      question: "Is there a free plan?",
      answer: "Yes. Create channels, publish threads, and share your public link on the free plan. Upgrade for Recruiter Mode, PDF résumé attach, and early importer access."
    },
    {
      question: "Do I need to rebuild my whole portfolio?",
      answer: "No. Start with one case study. Paste text, drop your artifacts, pin an outcome. Add more over time."
    },
    {
      question: "Can I cancel anytime?",
      answer: "Absolutely. Self-serve cancel, no lock-in."
    },
    {
      question: "Is my data private?",
      answer: "Admin view is private to you; public pages are read-only. You decide what's visible. You can unpublish anytime."
    },
    {
      question: "Does it work on mobile?",
      answer: "Yes. Public pages are tuned for quick, on the go skimming."
    },
    {
      question: "Custom domain and analytics?",
      answer: `Subdomains first (yourhandle.${new URL(SITE_URL).hostname}). Custom domains and lightweight analytics are rolling out to Pro.`
    }
  ]
  return (
    <>
      <CosmicHeader menuItems={navItems} showScrolledCta={false} />
      
      <CosmicBackground variant="hero" className="min-h-screen" brand="black">
        <main>
          <div className="container mx-auto px-4 pt-20 lg:pt-24 space-y-16 md:space-y-20">
        
            {/* Hero Section - Single Column */}
            <section className="text-center space-y-8">
              <AnimatedGroup
                variants={{
                  container: {
                    visible: {
                      transition: {
                        staggerChildren: 0.05,
                        delayChildren: 0.3,
                      },
                    },
                  },
                  ...transitionVariants,
                }}
                className="space-y-8"
              >
                {/* Brand Pill above headline */}
                <div className="flex justify-center">
                  <CosmicPill tone="brand" size="md" className="section-pill-text">
                    Repurpose
                  </CosmicPill>
                </div>

                {/* Animated Headline */}
                <div className="flex flex-col items-center gap-4">
                  <h1 className="hero-headline gradient-headline">
                    Repurpose long-form content into
                  </h1>
                  <div className="h-20 md:h-24 flex items-center justify-center">
                    <ContainerTextFlip
                      words={["blog posts", "LinkedIn content", "newsletters", "lead magnets", "30 pieces of content"]}
                      interval={2300}
                      animationDuration={240}
                      className="text-4xl md:text-5xl font-bold rounded-lg border border-white/20 bg-[#090C14] backdrop-blur-sm px-4 py-2 h-full flex items-center justify-center"
                      textClassName="text-white whitespace-nowrap"
                    />
                  </div>
                </div>
                
                <p className="section-description max-w-3xl mx-auto">
                  We transform your recorded webinars into blog posts, LinkedIn content, newsletters, and lead magnets - all on autopilot
                </p>

                {/* Benefit Pills (smaller) */}
                <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 mb-3 sm:mb-5 px-2">
                  <span className="brand-pill section-pill-text inline-flex items-center gap-1.5 sm:gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-medium">
                    <MessageCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    Channels & threads
                  </span>
                  <span className="brand-pill section-pill-text inline-flex items-center gap-1.5 sm:gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-medium">
                    <FileText className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    Rich attachments
                  </span>
                  <span className="brand-pill section-pill-text inline-flex items-center gap-1.5 sm:gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-medium">
                    <Zap className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    30-second reads
                  </span>
                </div>
                
                {/* CTA Buttons: shimmer only on primary */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <ShimmerBorder roundedClass="rounded-xl">
                    <CosmicButton variant="steelBlueInverted" size="lg" onClick={() => router.push('/login')}>
                      Start Free Trial
                    </CosmicButton>
                  </ShimmerBorder>
                  <CosmicButton
                    variant="monoDark"
                    size="lg"
                    onClick={() => router.push('/#benefits')}
                  >
                    See How It Works
                  </CosmicButton>
                </div>
                <div className="mt-6 text-sm text-slate-400">
                  Free plan • No card required
                </div>
              </AnimatedGroup>
            </section>

            {/* Problem Section */}
            <section id="problem" className="space-y-6">
              <ProblemParallaxCards />
            </section>

            {/* How It Works Timeline */}
            <section id="how-it-works" className="relative space-y-6 overflow-visible">
              <HowItWorksSection />
            </section>

            {/* Removed older FeatureTabs block; new Ruixen tabbed section below is authoritative */}

            {/* Ruixen Featured Image Section (new, separate from existing FeatureTabs) */}
            <section id="features-ruixen" className="space-y-12">
              <RuixenFeaturedImageSection />
            </section>

            

            {/* Benefits - Alternating two-column features */}
            <section id="benefits" className="space-y-14">
              <div className="text-center">
                <h2 className="section-headline gradient-headline">Powered by AI, Delivered with Precision</h2>
              </div>
              <TwoColumnFeature
                eyebrow="Repurpose"
                title="The Fastest Way to Repurpose Webinars"
                description="Get blog posts, LinkedIn content, newsletters, and lead magnets. Delivered in 48 hours."
                imageFrame="plain"
                image={
                  <TiltedScroll
                    items={[
                      { id: '1', text: 'Upload webinar once' },
                      { id: '2', text: '30+ assets created automatically' },
                      { id: '3', text: 'Ready to post in 48 hours' },
                      { id: '4', text: 'Blog posts written for you' },
                      { id: '5', text: 'LinkedIn content in bulk' },
                      { id: '6', text: 'Social clips that grab attention' },
                    ]}
                    className="mx-auto"
                  />
                }
              >
                <div className="space-y-3">
                  <MiniFeatureCard
                    icon={<Sparkles className="w-5 h-5 text-blue-300" />}
                    title="Fully Managed"
                    description="Upload once; we handle writing, design, and delivery."
                  />
                  <MiniFeatureCard
                    icon={<Zap className="w-5 h-5 text-blue-300" />}
                    title="Zero Hassle"
                    description="No extra tools. Brand voice applied. Publish-ready."
                  />
                </div>
              </TwoColumnFeature>
              <TwoColumnFeature
                eyebrow="Branding"
                title="Keep Every Asset On-Brand"
                description="Your webinar repurposing does not just save time; it looks like you created it yourself. Every blog, post, and clip matches your brand voice and design."
                reverse
                imageFrame="plain"
                image={<DisplayCards />}
              >
                {/* Mini Feature Cards under Themes */}
                <div className="space-y-3">
                  <MiniFeatureCard
                    icon={<Palette className="w-5 h-5 text-blue-300" />}
                    title="Custom Brand Guidelines"
                    description="We adapt your colors, fonts, and tone so each content piece feels native to your company."
                  />
                  <MiniFeatureCard
                    icon={<Layers className="w-5 h-5 text-blue-300" />}
                    title="Multiple Formats, One Brand"
                    description="From LinkedIn threads to PDF lead magnets, your brand stays consistent across every channel."
                  />
                </div>
              </TwoColumnFeature>
              <TwoColumnFeature
                eyebrow="Results"
                title="Actionable Results"
                description="See exactly how your repurposed content performs. Track views, clicks, and shares across every channel so you know what is working and what is not."
                imageFrame="plain"
                image={<AnalyticsCards className="mx-auto" />}
              >
                <div className="space-y-3">
                  <MiniFeatureCard
                    icon={<BarChart3 className="w-5 h-5 text-blue-300" />}
                    title="Engagement & Reach"
                    description="Measure impressions, engagement rates, and traffic driven from each piece."
                  />
                  <MiniFeatureCard
                    icon={<ListChecks className="w-5 h-5 text-blue-300" />}
                    title="Lead Impact"
                    description="Track which content pieces generate signups, downloads, or webinar replays."
                  />
                </div>
              </TwoColumnFeature>
              <TwoColumnFeature
                eyebrow="Customization"
                title="Personalized Repurposing"
                description="Not all webinars are the same, your content should not be either. We tailor assets to match your audience, industry, and brand tone."
                imageFrame="plain"
                image={<CustomizationGraph className="mx-auto" />}
                reverse
              >
                <div className="space-y-3">
                  <MiniFeatureCard
                    icon={<Sliders className="w-5 h-5 text-blue-300" />}
                    title="Persona-Based Content"
                    description="Repurposed outputs written and styled for executives, prospects, or community audiences."
                  />
                  <MiniFeatureCard
                    icon={<Sparkles className="w-5 h-5 text-blue-300" />}
                    title="Channel-Specific Formats"
                    description="Clips optimized for LinkedIn vs TikTok, blogs written for SEO vs thought leadership."
                  />
                </div>
              </TwoColumnFeature>
            </section>

            {/* Tech Stack Section */}
            <section id="stack" className="space-y-6">
              <div className="text-center space-y-2">
                <h2 className="section-headline gradient-headline">Built with Modern Tech Stack</h2>
                <p className="section-description">Fast, reliable, and secure by default.</p>
              </div>
              <IntegrationGrid
                integrations={[
                  { name: 'Next.js', description: 'App Router, streaming UI, image optimization', icon: <Code2 className="w-5 h-5 text-white/90" /> },
                  { name: 'React', description: 'Modern client components and interactions', icon: <Cpu className="w-5 h-5 text-white/90" /> },
                  { name: 'Tailwind CSS', description: 'Utility-first styling with design tokens', icon: <Layers className="w-5 h-5 text-white/90" /> },
                  { name: 'Supabase', description: 'Postgres, Auth, and storage', icon: <Database className="w-5 h-5 text-white/90" /> },
                  { name: 'Vercel', description: 'Global edge delivery and serverless', icon: <Cloud className="w-5 h-5 text-white/90" /> },
                  { name: 'Open Web', description: 'Accessible, SEO-friendly, and responsive', icon: <Globe className="w-5 h-5 text-white/90" /> },
                ]}
                className="max-w-6xl mx-auto"
              />
            </section>

            {/* Pricing Section (inline on new landing, cosmic-blended) */}
            <section id="pricing" className="relative py-20">
              <div className="relative z-10">
                <PricingSection showTitle={true} className="bg-transparent" darkTheme={true} />
              </div>
            </section>

            {/* FAQ Section (cosmic-blended) */}
            <section id="faq" className="relative py-20" style={{paddingTop: '80px', paddingBottom: '80px'}}>
              <div className="relative z-10">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="text-center mb-16">
                    <h2 className="section-headline gradient-headline mb-4" style={{letterSpacing: '-0.015em', transform: 'translateX(-1px)'}}>
                      Frequently Asked Questions
                    </h2>
                  </div>
                  <div className="grid gap-4" style={{gap: '16px'}}>
                    {faqs.map((faq, index) => (
                      <div key={index} className="border border-slate-600/20 rounded-2xl bg-slate-800/10 backdrop-blur-lg hover-feature-surface transition-all duration-300 transform-gpu hover:scale-[1.01] hover:-translate-y-1 shadow-lg">
                        <button
                          onClick={() => setOpenFaq(openFaq === index ? null : index)}
                          className="w-full px-6 py-4 text-left flex justify-between items-center transition-colors duration-300"
                        >
                          <span className="font-medium text-white">{faq.question}</span>
                          <span className={`text-slate-400 transition-transform ${openFaq === index ? 'rotate-180' : ''}`}>⌄</span>
                        </button>
                        {openFaq === index && (
                          <div className="px-6 pb-4 text-slate-300 border-t border-slate-700/30">
                            {faq.answer}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
            {/* CTA Section */}
            <section id="about" className="text-center space-y-8">
              <div className="relative max-w-4xl mx-auto">
                <GlassCard variant="elevated" className="p-12 hover-feature-surface">
                  <h2 className="section-headline gradient-headline mb-4">
                    Make it effortless for reviewers to see your best work
                  </h2>
                  <p className="section-description mb-8">
                    Channels for structure. Threads for context. Deep links that scroll and highlight what matters most.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button 
                      variant="brand"
                      className="shadow-lg hover:shadow-xl transition-all duration-200"
                      onClick={() => router.push('/login')}
                    >
                      Create Your Free Portfolio
                    </Button>
                    <Button 
                      variant="outline" 
                      className="bg-white/5 border-white/10 text-white hover:bg-white/10 hover:text-white"
                      onClick={() => router.push('/#benefits')}
                    >
                      See How It Works
                    </Button>
                  </div>
                </GlassCard>
              </div>
            </section>

            {/* Footer */}
            <footer className="bg-black text-white py-12 border-t border-slate-700/50 relative">
              <div className="absolute inset-0 bg-black" />
              <div className="relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="flex flex-col md:flex-row justify-between items-center">
                    <Link href="/" className="flex items-center gap-3 mb-4 md:mb-0">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 via-sky-500 to-fuchsia-500 flex items-center justify-center">
                        <Sparkles className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-xl font-bold text-white">{APP_NAME}</span>
                    </Link>
                    <div className="flex gap-6 text-sm text-slate-400">
                      <Link href="/terms" className="transition-colors hover:text-blue-400">Terms</Link>
                      <Link href="/privacy" className="transition-colors hover:text-blue-400">Privacy</Link>
                      <a href={`mailto:${CONTACT_EMAIL}`} className="transition-colors hover:text-blue-400">Contact</a>
                    </div>
                  </div>
                  <div className="border-t border-slate-700/50 mt-8 pt-8 text-center text-sm text-slate-400">
                    <p>&copy; 2024 {APP_NAME}. All rights reserved.</p>
                  </div>
                </div>
              </div>
            </footer>

          </div>
        </main>
      </CosmicBackground>
    </>
  )
}

