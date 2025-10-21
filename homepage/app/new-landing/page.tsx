'use client'

import {
  CosmicBackground,
  GlassCard,
  CosmicButton,
  CosmicHeader,
  CosmicPill,
  TwoColumnFeature,
  MiniFeatureCard
} from '@/components/cosmic'
import { TiltedScroll } from '@/components/ui/tilted-scroll'
import DisplayCards from '@/components/ui/display-cards'
import AnalyticsCards from '@/components/ui/analytics-cards'
import CustomizationGraph from '@/components/ui/customization-graph'
import { ContentLibraryCards } from '@/components/ui/content-library-cards'

import { ShimmerBorder } from '@/components/ui/shimmer-border'
import { AnimatedGroup } from '@/components/ui/animated-group'
import { ContainerTextFlip } from '@/components/container-text-flip'
import ProblemParallaxCards from '@/components/ui/problem-parallax-cards'
import HowWeHelpSection from '@/components/ui/how-we-help-section'
import HowItWorksSection from '@/components/ui/how-it-works-section'
import { InteractivePricingSection } from '@/components/ui/interactive-pricing-section'
import { PricingFAQ } from '@/components/ui/pricing-faq'
import {
  MessageCircle,
  FileText,
  Zap,
  Sparkles,
  Layers,
  Palette,
  BarChart3,
  ListChecks,
  Sliders,
  CheckCircle,
  Smartphone,
  FileEdit
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import Script from 'next/script'
import { Button } from '@/components/ui/button'
import { Banner } from '@/components/ui/banner'
import { HeroButton } from '@/components/ui/hero-button'
import { APP_NAME, CONTACT_EMAIL, SITE_URL } from '@/lib/brand'
import { logOverflowCandidates } from '@/lib/debug-layout'

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

const structuredDataJson = JSON.stringify({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}#organization`,
      name: APP_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}/gtm-labs-logo.png`,
      contactPoint: [
        {
          '@type': 'ContactPoint',
          email: CONTACT_EMAIL,
          contactType: 'sales',
          areaServed: 'Global',
        },
      ],
      sameAs: ['https://www.linkedin.com/company/gtm-labs'],
    },
    {
      '@type': 'Service',
      '@id': `${SITE_URL}#webinar-repurposing`,
      name: 'Webinar → Content (Monthly)',
      serviceType: 'Webinar content repurposing',
      provider: {
        '@id': `${SITE_URL}#organization`,
      },
      areaServed: 'Global',
      description:
        'GTM LABS converts each recorded webinar into 30+ channel-ready assets—blogs, LinkedIn threads, newsletters, landing copy, short-form clips, and quarterly lead magnets—delivered within 72 hours.',
      offers: {
        '@type': 'Offer',
        price: '1738',
        priceCurrency: 'USD',
        url: `${SITE_URL}/#pricing`,
        availability: 'https://schema.org/InStock',
        priceValidUntil: '2026-01-01',
      },
    },
    {
      '@type': 'FAQPage',
      '@id': `${SITE_URL}/#voice-faq`,
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Who can repurpose our webinars into multichannel content?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'GTM LABS specializes in webinar repurposing for B2B SaaS, delivering 30+ on-brand assets from every recording within 72 hours.',
          },
        },
        {
          '@type': 'Question',
          name: 'How fast does GTM LABS turn a webinar into deliverables?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'First drafts arrive in about 48 hours and the full package, including revisions, is handed off within roughly 72 business hours.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is included in the GTM LABS monthly plan?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The monthly plan covers up to two webinars, yielding blog posts, LinkedIn threads, newsletters, landing copy, short-form scripts, and a quarterly lead magnet plus analytics support.',
          },
        },
      ],
    },
    {
      '@type': 'FAQPage',
      '@id': `${SITE_URL}/#pricing-faq`,
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Who is this for?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'B2B SaaS teams already running webinars. If you publish monthly and stay active on social, you will see the fastest lift.',
          },
        },
        {
          '@type': 'Question',
          name: 'What do I actually get?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'A content library from one webinar: short clips, social posts, blog post, email content, plus optional lead magnet and newsletter issue. Counts match the pricing card and we tune the mix to your goal.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is your process?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Share a recording link. We transcribe and analyze, draft 30 plus assets, route for review, schedule once accounts connect, and report results inside the analytics panel.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is the turnaround?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'First draft in about 48 hours. Typical revision loop finishes within 72 business hours. The detailed SLA sits behind the pricing link.',
          },
        },
        {
          '@type': 'Question',
          name: 'Do you offer unlimited revisions?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes within plan scope. We aim for publish-ready approval. If scope changes, we confirm pricing before expanding.',
          },
        },
        {
          '@type': 'Question',
          name: 'How do you report results?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Your portal shows per-platform and per-post metrics. Download links are tagged with UTMs and file_download events so you see which content drives subscribers.',
          },
        },
      ],
    },
    {
      '@type': 'HowTo',
      '@id': `${SITE_URL}#webinar-to-content-howto`,
      name: 'Repurpose a webinar into 30+ assets with GTM LABS',
      description:
        'Follow GTM LABS four-step workflow to transform a webinar recording into a full content library within 72 hours.',
      totalTime: 'PT72H',
      estimatedCost: {
        '@type': 'MonetaryAmount',
        currency: 'USD',
        value: '1738',
      },
      tool: [
        {
          '@type': 'HowToTool',
          name: 'GTM LABS client portal',
        },
        {
          '@type': 'HowToTool',
          name: 'Brand style guide and voice notes',
        },
      ],
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Drop Your Link',
          text: 'Share your webinar recording URL or upload the video file inside the client portal—no extensive brief required.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Sit Back & Relax',
          text: 'AI extracts the best moments, we draft 30 plus assets, and human editors align everything to your brand voice.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Review & Approve',
          text: 'Review your blog posts, social clips, newsletters, landing copy, and lead magnet in the portal and request edits as needed.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Watch Growth Happen',
          text: 'Launch content, track analytics, and keep the repurposing flywheel running to grow reach and subscribers.',
        },
      ],
    },
  ],
})

export default function NewLandingPage() {
  const router = useRouter();
  // Header nav items: How It Works and FAQ smooth scroll on this page
  const navItems = [
    {
      name: 'How It Works',
      href: '#benefits',
      onClick: (e: React.MouseEvent) => {
        e.preventDefault()
        if (typeof document !== 'undefined') {
          document.getElementById('benefits')?.scrollIntoView({ behavior: 'smooth' })
        }
      }
    },
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

  const [showBanner, setShowBanner] = useState(true)
  useEffect(() => {
    const logAllSections = () => {
      const sections = document.querySelectorAll('section')
      console.groupCollapsed(`[Layout] Section scan @ ${new Date().toISOString()}`)
      console.log('document', {
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
        bodyScrollWidth: document.body.scrollWidth,
      })
      sections.forEach((node, index) => {
        const rect = node.getBoundingClientRect()
        console.log(`section[${index}]#${node.id || 'no-id'}`, {
          rect: {
            width: rect.width,
            height: rect.height,
            left: rect.left,
            right: rect.right,
          },
          scrollWidth: node.scrollWidth,
          offsetWidth: node instanceof HTMLElement ? node.offsetWidth : null,
          className: node instanceof HTMLElement ? node.className : undefined,
        })
      })
      console.groupEnd()
      logOverflowCandidates()
    }

    logAllSections()
    window.addEventListener('resize', logAllSections)

    return () => {
      window.removeEventListener('resize', logAllSections)
    }
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      ;(window as any).__gtmLogOverflow = logOverflowCandidates
    }
  }, [])
  const scrollToPricing = () => {
    if (typeof document !== 'undefined') {
      document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })
    }
  }

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
                {/* Founding Partner Banner - Moved to where pill was */}
                <div className="flex justify-center">
                  <Banner
                    show={showBanner}
                    onHide={() => setShowBanner(false)}
                    variant="branded"
                    size="default"
                    title="Founding Partner Program"
                    description="Start at $795/mo for 6 months, then lock in $995/mo forever. Only 2 spots left."
                    showShade={true}
                    closable={true}
                    icon={<Sparkles className="w-5 h-5 text-blue-400" />}
                    action={
                      <HeroButton
                        size="sm"
                        className="px-6 py-1.5 text-[11px] font-medium tracking-wide"
                        onClick={scrollToPricing}
                      >
                        Learn More →
                      </HeroButton>
                    }
                  />
                </div>

                {/* Animated Headline */}
                <div className="flex flex-col items-center gap-4">
                  <h1 className="hero-headline gradient-headline">
                    Repurpose long-form content into
                  </h1>
                  <div className="h-20 md:h-24 flex items-center justify-center">
                    <ContainerTextFlip
                      words={["blog posts", "LinkedIn content", "newsletters", "lead magnets", "30+ pieces of content"]}
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
                  <span className="brand-pill section-pill-text inline-flex items-center gap-1.5 sm:gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-medium whitespace-normal sm:whitespace-nowrap">
                    <MessageCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5 flex-shrink-0" />
                    Short-form clips
                  </span>
                  <span className="brand-pill section-pill-text inline-flex items-center gap-1.5 sm:gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-medium whitespace-normal sm:whitespace-nowrap">
                    <FileText className="w-3 h-3 sm:w-3.5 sm:h-3.5 flex-shrink-0" />
                    Blog posts & newsletters
                  </span>
                  <span className="brand-pill section-pill-text inline-flex items-center gap-1.5 sm:gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-medium whitespace-normal sm:whitespace-nowrap">
                    <Zap className="w-3 h-3 sm:w-3.5 sm:h-3.5 flex-shrink-0" />
                    Lead magnets & pages
                  </span>
                </div>
                
                {/* CTA Buttons: shimmer only on primary */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <ShimmerBorder roundedClass="rounded-xl">
                    <CosmicButton
                      variant="steelBlueInverted"
                      size="lg"
                      onClick={() => router.push('/#pricing')}
                    >
                      Get Sample Project
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
                  No strings attached
                </div>
              </AnimatedGroup>
            </section>

            {/* Problem Section */}
            <section id="problem" className="space-y-6">
              <ProblemParallaxCards />
            </section>

            {/* How We Help Section */}
            <section id="how-we-help" className="space-y-6">
              <HowWeHelpSection />
            </section>

            {/* How It Works Timeline */}
            <section id="how-it-works" className="relative space-y-6 overflow-visible">
              <HowItWorksSection />
            </section>

            {/* Removed older FeatureTabs block; new Ruixen tabbed section below is authoritative */}

            {/* Benefits - Alternating two-column features */}
            <section id="benefits" className="space-y-14">
              <div className="text-center">
                <h2 className="section-headline gradient-headline">What You Get (And How We Deliver It)</h2>
              </div>
              <TwoColumnFeature
                eyebrow="Speed"
                title="Stop Waiting Weeks for Content"
                description="Your team doesn't have bandwidth to turn around content in days, but your calendar doesn't wait. We deliver 30+ finished assets in 48 hours so you can move at the speed your business actually needs."
                imageFrame="plain"
                image={
                  <TiltedScroll
                    items={[
                      { id: '1', text: 'Upload webinar once' },
                      { id: '2', text: '30+ assets created automatically' },
                      { id: '3', text: 'Ready to post in 72 hours' },
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
                    icon={<Zap className="w-5 h-5 text-blue-300" />}
                    title="Ship This Week, Not Next Month"
                    description="No waiting on freelancers or internal queues. Content arrives ready to publish while your webinar is still relevant."
                  />
                  <MiniFeatureCard
                    icon={<CheckCircle className="w-5 h-5 text-blue-300" />}
                    title="Zero Project Management"
                    description="You approve once at the end, not baby-sit through every draft. No Slack threads, no status updates, no chasing people down."
                  />
                </div>
              </TwoColumnFeature>
              <TwoColumnFeature
                eyebrow="Quality"
                title="Looks Like Your Team Made It"
                description="You can't hand this off to just anyone without it sounding generic or off-brand. We match your visual style and tone so closely that even your team won't know it came from outside."
                reverse
                imageFrame="plain"
                image={<DisplayCards />}
              >
                <div className="space-y-3">
                  <MiniFeatureCard
                    icon={<Palette className="w-5 h-5 text-blue-300" />}
                    title="Matches Your Visual Standards"
                    description="Your colors, fonts, logo placement, and design style on every asset. Nothing looks cheap or rushed."
                  />
                  <MiniFeatureCard
                    icon={<MessageCircle className="w-5 h-5 text-blue-300" />}
                    title="Sounds Like You Wrote It"
                    description="We study your existing content to replicate your terminology and tone. Your CEO won't ask why it sounds different."
                  />
                </div>
              </TwoColumnFeature>
              <TwoColumnFeature
                eyebrow="Deliverables"
                title="Everything You Need for a Month"
                description="You're not getting clips and hoping they work. You're getting a full content system: social posts with copy, blogs ready to publish, newsletters drafted, and lead magnets designed."
                imageFrame="plain"
                image={<ContentLibraryCards />}
              >
                <div className="space-y-3">
                  <MiniFeatureCard
                    icon={<Smartphone className="w-5 h-5 text-blue-300" />}
                    title="Social & Video Content"
                    description="12 clips optimized for each platform, 8 posts with visuals and copy, carousel content for LinkedIn. Everything scheduled and ready to publish."
                  />
                  <MiniFeatureCard
                    icon={<FileEdit className="w-5 h-5 text-blue-300" />}
                    title="Written & Lead Gen Assets"
                    description="SEO blog post to drive organic traffic, newsletter to send your list, lead magnet PDF to capture new subscribers. Each one moves prospects closer to signing up for your next webinar."
                  />
                </div>
              </TwoColumnFeature>
            </section>

            {/* Interactive Pricing Section */}
            <section id="pricing" className="relative py-20">
              <div className="relative z-10">
                <InteractivePricingSection />
              </div>
            </section>

            {/* FAQ Section (comment-thread style) */}
            <section id="faq" className="relative py-20" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
              <div className="relative z-10">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
                  <div className="text-center space-y-4">
                    <h2
                      className="section-headline gradient-headline"
                      style={{ letterSpacing: '-0.015em', transform: 'translateX(-1px)' }}
                    >
                      Frequently Asked Questions
                    </h2>
                    <p className="section-description text-slate-300">
                      Quick answers about scope, process, analytics, pricing, and everything in between.
                    </p>
                  </div>
                  <PricingFAQ />
                </div>
              </div>
            </section>
            {/* Footer */}
            <footer className="bg-black text-white py-12 border-t border-slate-700/50 relative">
              <div className="absolute inset-0 bg-black" />
              <div className="relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="flex flex-col md:flex-row justify-between items-center">
                    <Link href="/" className="flex items-center gap-3 mb-4 md:mb-0">
                      <Image
                        src="/gtm-labs-logo.png"
                        alt={`${APP_NAME} logo`}
                        width={32}
                        height={32}
                      />
                      <span className="text-xl font-bold text-white">{APP_NAME}</span>
                    </Link>
                    <div className="flex gap-6 text-sm text-slate-400">
                      <Link href="/terms" className="transition-colors hover:text-blue-400">Terms</Link>
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
        <Script
          id="llm-structured-data"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: structuredDataJson }}
        />
      </CosmicBackground>
    </>
  )
}
