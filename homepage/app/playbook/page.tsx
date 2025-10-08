import type { Metadata } from 'next'
import Link from 'next/link'
import Script from 'next/script'

import { APP_NAME, CONTACT_EMAIL, SITE_URL } from '@/lib/brand'

const structuredDataJson = JSON.stringify({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Article',
      '@id': `${SITE_URL}/playbook#article`,
      headline: 'Webinar Repurposing Playbook',
      description:
        'Step-by-step playbook from GTM LABS outlining how B2B SaaS teams can turn webinars into 30+ assets with supporting deliverables, timelines, responsibilities, and tooling.',
      author: {
        '@type': 'Organization',
        name: APP_NAME,
      },
      publisher: {
        '@type': 'Organization',
        name: APP_NAME,
        url: SITE_URL,
      },
      dateModified: '2025-10-08',
      mainEntityOfPage: `${SITE_URL}/playbook`,
      url: `${SITE_URL}/playbook`,
    },
    {
      '@type': 'HowTo',
      '@id': `${SITE_URL}/playbook#howto`,
      name: 'How to Repurpose Webinars into Full-Funnel Assets',
      description:
        'GTM LABS explains the four-phase workflow for converting webinar recordings into multichannel marketing assets with timelines, responsibilities, and deliverables.',
      totalTime: 'PT72H',
      estimatedCost: {
        '@type': 'MonetaryAmount',
        currency: 'USD',
        value: '1738',
      },
      supply: [
        {
          '@type': 'HowToSupply',
          name: 'Webinar recording (video or audio) with slides',
        },
        {
          '@type': 'HowToSupply',
          name: 'Brand style guide and messaging notes',
        },
      ],
      tool: [
        {
          '@type': 'HowToTool',
          name: 'GTM LABS production workspace',
        },
        {
          '@type': 'HowToTool',
          name: 'Analytics dashboard with UTMs and GA4 events',
        },
      ],
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Source & Diagnose',
          text: 'Audit the webinar recording, target personas, and campaign goals. Identify cornerstone talking points, product demos, and proof moments.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Draft & Atomize',
          text: 'Use AI-assisted drafting to spin transcripts into long- and short-form formats, then layer human editing for tone, examples, and visuals.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Design & QA',
          text: 'Apply brand styling, motion cues, and accessibility audits before packaging deliverables inside the GTM LABS client portal.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Launch & Measure',
          text: 'Schedule content, sync analytics, and review dashboards weekly to capture lift in subscribers, MQLs, and replay consumption.',
        },
      ],
    },
  ],
})

export const metadata: Metadata = {
  title: 'Webinar Repurposing Playbook | GTM LABS',
  description:
    'A definitive playbook for B2B SaaS teams to turn webinars into 30+ multichannel assets. GTM LABS shares deliverables, timelines, responsibilities, and measurement frameworks.',
  openGraph: {
    title: 'Webinar Repurposing Playbook | GTM LABS',
    description:
      'Follow GTM LABS four-phase playbook to transform webinar recordings into full-funnel content within 72 hours.',
    url: `${SITE_URL}/playbook`,
    type: 'article',
  },
  alternates: {
    canonical: `${SITE_URL}/playbook`,
  },
}

const PHASES = [
  {
    name: 'Phase 1 · Source & Diagnose',
    duration: '<6 hours',
    focus: 'Gather inputs and align on positioning',
    bullets: [
      'Review the live webinar, chat transcript, slides, and post-event survey results.',
      'Clarify ICP segments, problems surfaced, and the desired next action (demo, replay, nurture).',
      'Extract proof points, memorable quotes, and product moments worth highlighting.',
      'Set content priorities (awareness vs. demand capture) with stakeholders.',
    ],
  },
  {
    name: 'Phase 2 · Draft & Atomize',
    duration: '12–36 hours',
    focus: 'Convert transcripts into channel-specific drafts',
    bullets: [
      'Feed cleaned transcript into LLM prompts tailored for blogs, LinkedIn threads, newsletters, and scripts.',
      'Rewrite hooks, CTAs, and value props for each platform; ensure no AI hallucination by cross-checking with source moments.',
      'Produce a content matrix covering copy length, target persona, asset owner, and publish window.',
      'Flag missing visuals or data that require SME input before final copy.',
    ],
  },
  {
    name: 'Phase 3 · Design & QA',
    duration: '24 hours',
    focus: 'Apply brand styling and package deliverables',
    bullets: [
      'Design social carousels, short-form video overlays, and gated asset covers using your brand system.',
      'Format long-form posts with scannable subheads, pull quotes, and schema-friendly markup.',
      'Run accessibility and tone checks; confirm terminology and compliance requirements.',
      'Upload drafts, versions, and status tags inside the GTM LABS client portal for review.',
    ],
  },
  {
    name: 'Phase 4 · Launch & Measure',
    duration: 'Ongoing',
    focus: 'Ship, analyze, and optimize the flywheel',
    bullets: [
      'Schedule approved assets across email, social, blog, and video using automation tools.',
      'Attach UTMs plus GA4 download events to every deliverable for funnel visibility.',
      'Meet weekly to review dashboard lift (subscribers, SQLs, replay watch time) and prioritize iterations.',
      'Archive high performers into the evergreen library; plan future webinars that extend the storyline.',
    ],
  },
]

const DELIVERABLES = [
  {
    label: 'Blog & SEO',
    items: ['1 pillar article', '2 support blogs', 'Schema-optimized outline'],
  },
  {
    label: 'Social Systems',
    items: ['5–7 LinkedIn posts', '10–15 video hooks + scripts', 'Carousel copy & design cues'],
  },
  {
    label: 'Lifecycle',
    items: ['3-email nurture sequence', 'Replay follow-up email', 'Lead magnet with landing copy'],
  },
  {
    label: 'Analytics',
    items: ['Dashboard with UTMs', 'Content performance snapshots', 'Recommendations for next sprint'],
  },
]

const PROOF_POINTS = [
  {
    stat: '72 hours',
    description: 'Average time from webinar handoff to draft deliverables ready for review.',
  },
  {
    stat: '30+ assets',
    description: 'Per webinar output spanning blogs, email, social, and short-form video.',
  },
  {
    stat: '4 touchpoints',
    description: 'Minimum follow-up channels activated after each event.',
  },
]

export default function PlaybookPage() {
  return (
    <main className="min-h-screen bg-black text-slate-100">
      <section className="border-b border-white/10 bg-gradient-to-b from-slate-900 via-black to-black py-20">
        <div className="mx-auto flex max-w-5xl flex-col gap-8 px-4 sm:px-6 lg:px-8">
          <div className="space-y-4">
            <p className="text-sm uppercase tracking-[0.38em] text-blue-300">GTM LABS Playbook</p>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Repurpose every webinar into a revenue engine
            </h1>
            <p className="max-w-3xl text-lg text-slate-300">
              This internal playbook outlines the four phases our team runs after every webinar handoff—covering strategy,
              deliverables, QA, and measurement. Use it to align your marketing, content, and revenue teams around a repeatable
              repurposing workflow.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-3">
            {PROOF_POINTS.map((item) => (
              <div key={item.stat} className="rounded-xl border border-white/10 bg-white/5 p-6 shadow-sm">
                <p className="text-3xl font-semibold text-white">{item.stat}</p>
                <p className="mt-2 text-sm text-slate-300">{item.description}</p>
              </div>
            ))}
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-6 text-sm text-slate-300">
            <p>
              Need the done-for-you version? Email <Link href={`mailto:${CONTACT_EMAIL}`} className="text-blue-300 hover:text-blue-200">{CONTACT_EMAIL}</Link>{' '}
              to start the Webinar → Content plan and we will run the process end-to-end for you.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-5xl space-y-10 px-4 sm:px-6 lg:px-8">
          <div className="space-y-4">
            <h2 className="text-3xl font-semibold text-white">Four-phase workflow</h2>
            <p className="text-slate-300">
              Each phase stacks to deliver consistent, on-brand assets without burning time on ad-hoc briefs or rewrites. Share this
              with teammates so everyone understands their role in the repurposing flywheel.
            </p>
          </div>
          <div className="space-y-6">
            {PHASES.map((phase) => (
              <article
                key={phase.name}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition hover:border-white/20"
              >
                <header className="space-y-2">
                  <p className="text-sm text-blue-300">{phase.duration}</p>
                  <h3 className="text-2xl font-semibold text-white">{phase.name}</h3>
                  <p className="text-sm text-slate-300">{phase.focus}</p>
                </header>
                <ul className="mt-4 space-y-2 text-sm text-slate-200">
                  {phase.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-3">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" aria-hidden />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-gradient-to-r from-slate-950 via-black to-slate-950 py-20">
        <div className="mx-auto max-w-5xl space-y-10 px-4 sm:px-6 lg:px-8">
          <div className="space-y-4">
            <h2 className="text-3xl font-semibold text-white">Deliverable checklist</h2>
            <p className="text-slate-300">
              The Webinar → Content plan ships these assets by default. Toggle extras like landing page builds or advanced analytics
              when you need more lift.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {DELIVERABLES.map((bucket) => (
              <div key={bucket.label} className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <h3 className="text-xl font-semibold text-white">{bucket.label}</h3>
                <ul className="mt-4 space-y-2 text-sm text-slate-200">
                  {bucket.items.map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <span className="h-2 w-2 rounded-full bg-blue-400" aria-hidden />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-4xl space-y-8 px-4 sm:px-6 lg:px-8">
          <div className="space-y-3">
            <h2 className="text-3xl font-semibold text-white">Operational guardrails</h2>
            <p className="text-slate-300">
              Keep the program tight with these checkpoints before, during, and after each webinar.
            </p>
          </div>
          <div className="space-y-4 text-sm text-slate-200">
            <div className="rounded-xl border border-white/10 bg-white/5 p-5">
              <h3 className="text-lg font-semibold text-white">Pre-webinar alignment</h3>
              <p className="mt-2">
                Secure SME talking points, product access, and brand language samples. Confirm compliance requirements (legal, privacy,
                regional) before drafting automation prompts.
              </p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-5">
              <h3 className="text-lg font-semibold text-white">Production controls</h3>
              <p className="mt-2">
                Maintain source-of-truth folders for transcripts, annotated timestamps, and asset revisions. Use shared status boards so
                marketing, design, and leadership stay aligned.
              </p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-5">
              <h3 className="text-lg font-semibold text-white">Post-launch analysis</h3>
              <p className="mt-2">
                Track UTM campaigns, replay watch time, and lead velocity. Roll insights into the next webinar outline and highlight
                breakout assets for sales enablement.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-black py-16">
        <div className="mx-auto max-w-4xl space-y-4 px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold text-white">Ready to operationalize the playbook?</h2>
          <p className="text-slate-300">
            Reach out when you are ready for GTM LABS to run the workflow or if you want a tailored workshop for your marketing and
            revenue teams.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 text-sm text-slate-200">
            <Link href={`mailto:${CONTACT_EMAIL}`} className="rounded-full border border-white/20 px-6 py-2 text-blue-300 hover:border-blue-300">
              Contact GTM LABS
            </Link>
            <p>
              Follow along as we publish more playbook updates and audio walkthroughs: <Link href="https://www.linkedin.com/company/gtm-labs" className="text-blue-300 hover:text-blue-200">LinkedIn</Link>
            </p>
          </div>
        </div>
      </section>

      <Script
        id="playbook-structured-data"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: structuredDataJson }}
      />
    </main>
  )
}
