'use client';

import Image from 'next/image';
import { useMemo, useState } from 'react';

import { Discussion, DiscussionBody, DiscussionContent, DiscussionExpand, DiscussionItem, DiscussionReplies, DiscussionTitle } from '@/components/ui/discussion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { InlineTooltip } from './inline-tooltip';

type AddOn = {
  id: string;
  name: string;
  description: string;
  price: number;
};

type Persona = {
  name: string;
  handle: string;
  timeAgo: string;
  avatar: string;
  message: React.ReactNode;
};

type FAQThread = {
  id: string;
  categories: string[];
  questioner: Persona;
  answer: React.ReactNode;
};

const RESPONDENT = {
  name: 'Jovanny Tovar',
  handle: '@jovannytovar',
  avatar: '/tmpxjt7ojxb.png',
  timeAgo: 'moments ago',
};

const ADD_ONS: AddOn[] = [
  {
    id: 'landing-page',
    name: 'Landing Page Build',
    description: 'Hosted page + form integration + UTM set-up',
    price: 497,
  },
  {
    id: 'advanced-reporting',
    name: 'Advanced Reporting',
    description: 'Adds UTM tracking, landing conversions, and leads-over-time dashboards',
    price: 297,
  },
];

const ADVANCED_ANALYTICS_TOOLTIP = 'We tag every post with UTMs and track file_downloads in GA4 so you can see which channels drive subscribers.';

const FAQ_THREADS: FAQThread[] = [
  {
    id: 'audience--who',
    categories: ['Overview'],
    questioner: {
      name: 'GTM Labs',
      handle: '@gtmlabs',
      timeAgo: 'Pinned',
      avatar: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=facearea&facepad=2&w=160&h=160&q=80',
      message: <p className="text-[15px] leading-snug text-slate-200">Who is this for?</p>,
    },
    answer: (
      <div className="space-y-2 text-sm leading-relaxed text-slate-300">
        <p>B2B SaaS teams already running webinars. If you publish monthly and stay active on social, you&apos;ll see the fastest lift.</p>
      </div>
    ),
  },
  {
    id: 'audience--not-fit',
    categories: ['Overview'],
    questioner: {
      name: 'GTM Labs',
      handle: '@gtmlabs',
      timeAgo: 'Pinned',
      avatar: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=facearea&facepad=2&w=160&h=160&q=80',
      message: <p className="text-[15px] leading-snug text-slate-200">Who is not a great fit right now?</p>,
    },
    answer: (
      <div className="space-y-2 text-sm leading-relaxed text-slate-300">
        <p>Very early teams with sporadic content, or highly regulated enterprises requiring lengthy vendor onboarding. We move fastest when there&apos;s momentum.</p>
      </div>
    ),
  },
  {
    id: 'deliverables--what-you-get',
    categories: ['Deliverables'],
    questioner: {
      name: 'GTM Labs',
      handle: '@gtmlabs',
      timeAgo: 'Pinned',
      avatar: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=facearea&facepad=2&w=160&h=160&q=80',
      message: <p className="text-[15px] leading-snug text-slate-200">What do I actually get?</p>,
    },
    answer: (
      <div className="space-y-2 text-sm leading-relaxed text-slate-300">
        <p>A content library from one webinar: short clips, social posts, blog post, email content, plus optional lead magnet and newsletter issue. Counts match the pricing card and we tune the mix to your goal.</p>
      </div>
    ),
  },
  {
    id: 'process--overview',
    categories: ['Process'],
    questioner: {
      name: 'GTM Labs',
      handle: '@gtmlabs',
      timeAgo: 'Pinned',
      avatar: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=facearea&facepad=2&w=160&h=160&q=80',
      message: <p className="text-[15px] leading-snug text-slate-200">What is your process?</p>,
    },
    answer: (
      <div className="space-y-2 text-sm leading-relaxed text-slate-300">
        <ol className="list-decimal space-y-1 pl-5">
          <li>Share a recording link.</li>
          <li>We transcribe and analyze.</li>
          <li>We draft 30+ assets.</li>
          <li>You review in the portal and request edits.</li>
          <li>We schedule and publish once accounts connect.</li>
          <li>See results in your analytics panel.</li>
        </ol>
      </div>
    ),
  },
  {
    id: 'process--turnaround',
    categories: ['Process', 'SLA'],
    questioner: {
      name: 'Albert Einstein',
      handle: '@einstein',
      timeAgo: '1 hour ago',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=facearea&facepad=2&w=160&h=160&q=80',
      message: <p className="text-[15px] leading-snug text-slate-200">I&apos;ve got a launch coming. What&apos;s the turnaround?</p>,
    },
    answer: (
      <div className="space-y-2 text-sm leading-relaxed text-slate-300">
        <p>First draft in about 48 hours. Typical revision loop finishes within 72 business hours. The detailed SLA sits behind the pricing link.</p>
      </div>
    ),
  },
  {
    id: 'sla--link',
    categories: ['SLA'],
    questioner: {
      name: 'GTM Labs',
      handle: '@gtmlabs',
      timeAgo: 'Pinned',
      avatar: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=facearea&facepad=2&w=160&h=160&q=80',
      message: <p className="text-[15px] leading-snug text-slate-200">Why link the SLA instead of showing it all?</p>,
    },
    answer: (
      <div className="space-y-2 text-sm leading-relaxed text-slate-300">
        <p>To keep pricing scannable. The full policy is available via modal or on request so the card focuses on outcomes.</p>
      </div>
    ),
  },
  {
    id: 'sla--revisions',
    categories: ['Process', 'SLA'],
    questioner: {
      name: 'Serena Williams',
      handle: '@serena',
      timeAgo: '4 minutes ago',
      avatar: 'https://images.unsplash.com/photo-1520452112805-c6692c840af3?auto=format&fit=facearea&facepad=2&w=160&h=160&q=80',
      message: <p className="text-[15px] leading-snug text-slate-200">Do you offer unlimited revisions?</p>,
    },
    answer: (
      <div className="space-y-2 text-sm leading-relaxed text-slate-300">
        <p>Yes within plan scope. We aim for publish-ready approval. If scope changes, we confirm pricing before expanding.</p>
      </div>
    ),
  },
  {
    id: 'sla--miss-deadline',
    categories: ['SLA'],
    questioner: {
      name: 'GTM Labs',
      handle: '@gtmlabs',
      timeAgo: 'Pinned',
      avatar: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=facearea&facepad=2&w=160&h=160&q=80',
      message: <p className="text-[15px] leading-snug text-slate-200">What if you miss a deadline?</p>,
    },
    answer: (
      <div className="space-y-2 text-sm leading-relaxed text-slate-300">
        <p>Our SLA includes service credits whenever delays are on us. Credits apply automatically to the next invoice.</p>
      </div>
    ),
  },
  {
    id: 'process--inputs',
    categories: ['Process'],
    questioner: {
      name: 'Sheryl Sandberg',
      handle: '@sheryl',
      timeAgo: '12 minutes ago',
      avatar: 'https://images.unsplash.com/photo-1531891437562-4301cf35b7e4?auto=format&fit=facearea&facepad=2&w=160&h=160&q=80',
      message: <p className="text-[15px] leading-snug text-slate-200">What do you need from us to start?</p>,
    },
    answer: (
      <div className="space-y-2 text-sm leading-relaxed text-slate-300">
        <p>A webinar or long-form link, brand guidance (voice examples), and one approver with time for feedback.</p>
      </div>
    ),
  },
  {
    id: 'process--library',
    categories: ['Process'],
    questioner: {
      name: 'Gary Vaynerchuk',
      handle: '@garyvee',
      timeAgo: '2 minutes ago',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=facearea&facepad=2&w=160&h=160&q=80',
      message: <p className="text-[15px] leading-snug text-slate-200">Can you work from our old webinar library?</p>,
    },
    answer: (
      <div className="space-y-2 text-sm leading-relaxed text-slate-300">
        <p>Yes, back catalogs are high value. We prioritize sessions with the biggest upside and build a release calendar around them.</p>
      </div>
    ),
  },
  {
    id: 'analytics--reporting',
    categories: ['Analytics'],
    questioner: {
      name: 'Neil deGrasse Tyson',
      handle: '@neiltyson',
      timeAgo: '9 minutes ago',
      avatar: 'https://images.unsplash.com/photo-1481214110143-ed630356e1bb?auto=format&fit=facearea&facepad=2&w=160&h=160&q=80',
      message: <p className="text-[15px] leading-snug text-slate-200">How do you report results?</p>,
    },
    answer: (
      <div className="space-y-2 text-sm leading-relaxed text-slate-300">
        <p>Your portal shows per-platform and per-post metrics. Download links are tagged with UTMs and file_download events so you see which content drives subscribers.</p>
      </div>
    ),
  },
  {
    id: 'analytics--advanced',
    categories: ['Analytics'],
    questioner: {
      name: 'Marie Curie',
      handle: '@mariecurie',
      timeAgo: '42 minutes ago',
      avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=facearea&facepad=2&w=160&h=160&q=80',
      message: <p className="text-[15px] leading-snug text-slate-200">What counts as advanced analytics?</p>,
    },
    answer: (
      <div className="space-y-2 text-sm leading-relaxed text-slate-300">
        <p>Cross-channel attribution with UTMs, download/subscribe goals, and a monthly funnel view from social → landing page → download → subscriber.</p>
      </div>
    ),
  },
  {
    id: 'process--social-access',
    categories: ['Process'],
    questioner: {
      name: 'Ada Lovelace',
      handle: '@adalovelace',
      timeAgo: '29 minutes ago',
      avatar: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=facearea&facepad=2&w=160&h=160&q=80',
      message: <p className="text-[15px] leading-snug text-slate-200">Do you need access to our social accounts?</p>,
    },
    answer: (
      <div className="space-y-2 text-sm leading-relaxed text-slate-300">
        <p>Only if you want us to schedule and publish plus pull native analytics. Otherwise we hand off assets and copy for your team to post.</p>
      </div>
    ),
  },
  {
    id: 'deliverables--landing-add-on',
    categories: ['Deliverables'],
    questioner: {
      name: 'Steve Jobs',
      handle: '@steve',
      timeAgo: '18 minutes ago',
      avatar: 'https://images.unsplash.com/photo-1521120413309-829a8e30dfd0?auto=format&fit=facearea&facepad=2&w=160&h=160&q=80',
      message: <p className="text-[15px] leading-snug text-slate-200">Can you build the landing page for the lead magnet?</p>,
    },
    answer: (
      <div className="space-y-2 text-sm leading-relaxed text-slate-300">
        <p>We provide the PDF and copy. For hosting or page build, add the Landing Page add-on or we collaborate with your team.</p>
      </div>
    ),
  },
  {
    id: 'legal--ownership',
    categories: ['Legal'],
    questioner: {
      name: 'Oprah Winfrey',
      handle: '@oprah',
      timeAgo: '24 minutes ago',
      avatar: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=facearea&facepad=2&w=160&h=160&q=80',
      message: <p className="text-[15px] leading-snug text-slate-200">Who owns the content?</p>,
    },
    answer: (
      <div className="space-y-2 text-sm leading-relaxed text-slate-300">
        <p>You do. Once paid, every deliverable and source file is yours to reuse and remix.</p>
      </div>
    ),
  },
  {
    id: 'process--tone',
    categories: ['Process'],
    questioner: {
      name: 'Ada Lovelace',
      handle: '@adalovelace',
      timeAgo: '29 minutes ago',
      avatar: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=facearea&facepad=2&w=160&h=160&q=80',
      message: <p className="text-[15px] leading-snug text-slate-200">Can you match our tone and point of view?</p>,
    },
    answer: (
      <div className="space-y-2 text-sm leading-relaxed text-slate-300">
        <p>Yes. We ingest your past posts, brand docs, and SME notes. You get a sample pack before we scale production.</p>
      </div>
    ),
  },
  {
    id: 'legal--usage-rights',
    categories: ['Legal'],
    questioner: {
      name: 'Neil deGrasse Tyson',
      handle: '@neiltyson',
      timeAgo: '9 minutes ago',
      avatar: 'https://images.unsplash.com/photo-1481214110143-ed630356e1bb?auto=format&fit=facearea&facepad=2&w=160&h=160&q=80',
      message: <p className="text-[15px] leading-snug text-slate-200">What about usage rights for the source video?</p>,
    },
    answer: (
      <div className="space-y-2 text-sm leading-relaxed text-slate-300">
        <p>You confirm you own or have permission to repurpose the content you upload. We avoid third-party material without documented clearance.</p>
      </div>
    ),
  },
  {
    id: 'deliverables--add-ons',
    categories: ['Deliverables'],
    questioner: {
      name: 'Marie Curie',
      handle: '@mariecurie',
      timeAgo: '42 minutes ago',
      avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=facearea&facepad=2&w=160&h=160&q=80',
      message: <p className="text-[15px] leading-snug text-slate-200">How do add-ons work?</p>,
    },
    answer: (
      <div className="space-y-2 text-sm leading-relaxed text-slate-300">
        <p>Add them at checkout or later in your portal. Everything is self-serve—toggle on and off as needs change.</p>
      </div>
    ),
  },
  {
    id: 'process--pilot',
    categories: ['Process'],
    questioner: {
      name: 'Michelle Obama',
      handle: '@michelle',
      timeAgo: '6 minutes ago',
      avatar: 'https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=facearea&facepad=2&w=160&h=160&q=80',
      message: <p className="text-[15px] leading-snug text-slate-200">Can we start with a low-risk pilot?</p>,
    },
    answer: (
      <div className="space-y-2 text-sm leading-relaxed text-slate-300">
        <p>Yes. The Founding Partner or pilot option is time-boxed and scoped. If it works, it rolls into the standard plan smoothly.</p>
      </div>
    ),
  },
  {
    id: 'overview--audit',
    categories: ['Overview'],
    questioner: {
      name: 'GTM Labs',
      handle: '@gtmlabs',
      timeAgo: 'Pinned',
      avatar: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=facearea&facepad=2&w=160&h=160&q=80',
      message: <p className="text-[15px] leading-snug text-slate-200">Is the free audit really free?</p>,
    },
    answer: (
      <div className="space-y-2 text-sm leading-relaxed text-slate-300">
        <p>Yes. Paste a YouTube link and we deliver a mini content set plus a metrics snapshot. Integrations unlock scheduling and deeper analytics later.</p>
      </div>
    ),
  },
  {
    id: 'pricing--compact',
    categories: ['Pricing'],
    questioner: {
      name: 'Albert Einstein',
      handle: '@einstein',
      timeAgo: '1 hour ago',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=facearea&facepad=2&w=160&h=160&q=80',
      message: <p className="text-[15px] leading-snug text-slate-200">Why is your pricing page compact?</p>,
    },
    answer: (
      <div className="space-y-2 text-sm leading-relaxed text-slate-300">
        <p>Short bullets, one helper line under the main CTA, and extras like SLA links or tooltips stay tucked into micro UI so essentials remain visible.</p>
      </div>
    ),
  },
  {
    id: 'process--intake',
    categories: ['Process'],
    questioner: {
      name: 'Sheryl Sandberg',
      handle: '@sheryl',
      timeAgo: '12 minutes ago',
      avatar: 'https://images.unsplash.com/photo-1531891437562-4301cf35b7e4?auto=format&fit=facearea&facepad=2&w=160&h=160&q=80',
      message: <p className="text-[15px] leading-snug text-slate-200">What is in the intake form?</p>,
    },
    answer: (
      <div className="space-y-2 text-sm leading-relaxed text-slate-300">
        <p>Name, company email, source video link, primary goal, and voice notes. Labels sit above fields for clarity on mobile.</p>
      </div>
    ),
  },
  {
    id: 'overview--non-us',
    categories: ['Overview'],
    questioner: {
      name: 'GTM Labs',
      handle: '@gtmlabs',
      timeAgo: 'Pinned',
      avatar: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=facearea&facepad=2&w=160&h=160&q=80',
      message: <p className="text-[15px] leading-snug text-slate-200">Do you work with non-US teams?</p>,
    },
    answer: (
      <div className="space-y-2 text-sm leading-relaxed text-slate-300">
        <p>Yes. We just need time-zone overlap for reviews and deliver assets in English today.</p>
      </div>
    ),
  },
  {
    id: 'process--add-ons-detail',
    categories: ['Deliverables'],
    questioner: {
      name: 'Marie Curie',
      handle: '@mariecurie',
      timeAgo: '42 minutes ago',
      avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=facearea&facepad=2&w=160&h=160&q=80',
      message: <p className="text-[15px] leading-snug text-slate-200">What exactly do the add-ons cover?</p>,
    },
    answer: (
      <div className="space-y-3 text-sm leading-relaxed text-slate-300">
        <p>We offer two add-ons you can toggle when you need extra horsepower:</p>
        <div className="space-y-2">
          {ADD_ONS.map((addon) => (
            <div key={addon.id} className="rounded-lg border border-white/5 bg-white/5 p-3">
              <div className="mb-1 flex items-center justify-between">
                {addon.id === 'advanced-reporting' ? (
                  <InlineTooltip
                    text={addon.name}
                    tooltip={ADVANCED_ANALYTICS_TOOLTIP}
                    className="text-[13px] font-medium text-white"
                  />
                ) : (
                  <span className="text-[13px] font-medium text-white">{addon.name}</span>
                )}
                <span className="text-xs font-semibold text-blue-400">+${addon.price}/mo</span>
              </div>
              <p className="text-xs text-slate-400">{addon.description}</p>
            </div>
          ))}
        </div>
        <p className="text-xs text-slate-400">Advanced analytics adds UTMs, GA4 download tracking, and a funnel report connecting social → landing → download → subscriber.</p>
      </div>
    ),
  },
];

const CATEGORY_ORDER = ['Overview', 'Process', 'Deliverables', 'Analytics', 'Pricing', 'SLA', 'Legal'];

function useCategorizedFaqs() {
  return useMemo(() => {
    const grouped = new Map<string, FAQThread[]>();
    FAQ_THREADS.forEach((thread) => {
      thread.categories.forEach((category) => {
        const bucket = grouped.get(category) ?? [];
        bucket.push(thread);
        grouped.set(category, bucket);
      });
    });

    const ordered = CATEGORY_ORDER.filter((category) => grouped.has(category));
    return ordered.map((category) => ({ category, items: grouped.get(category)! }));
  }, []);
}

export function PricingFAQ() {
  const categorized = useCategorizedFaqs();
  const [activeTab, setActiveTab] = useState<string>(categorized[0]?.category ?? CATEGORY_ORDER[0]);

  return (
    <div className="mx-auto w-full max-w-4xl space-y-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-semibold uppercase tracking-[0.18em] text-slate-300">Frequently Asked Questions</h2>
        <p className="text-sm text-slate-400">Quick answers to the questions teams ask before rolling out the repurposing engine.</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full justify-start overflow-x-auto">
          {categorized.map(({ category }) => (
            <TabsTrigger key={category} value={category}>
              {category}
            </TabsTrigger>
          ))}
        </TabsList>

        {categorized.map(({ category, items }) => (
          <TabsContent key={category} value={category}>
            <Discussion
              defaultValue={[items[0]?.id ?? '']}
              type="multiple"
              className="flex w-full flex-col gap-3 sm:gap-4"
            >
              {items.map((thread) => (
                <DiscussionItem key={thread.id} value={thread.id}>
                  <DiscussionContent className="flex flex-col gap-3 rounded-xl border border-white/10 bg-white/5 p-3 shadow-sm backdrop-blur-sm transition hover:border-white/20">
                    <div className="flex items-start gap-3">
                      <Image
                        src={thread.questioner.avatar}
                        alt={`${thread.questioner.name} avatar`}
                        width={36}
                        height={36}
                        className="h-9 w-9 shrink-0 rounded-full object-cover"
                      />
                      <div className="flex flex-col gap-2">
                        <DiscussionTitle className="flex flex-wrap items-center gap-1 text-white">
                          <span>{thread.questioner.name}</span>
                          <span className="text-[11px] text-muted-foreground">{thread.questioner.handle}</span>
                          <span className="text-[11px] text-muted-foreground">•</span>
                          <span className="text-[11px] text-muted-foreground">{thread.questioner.timeAgo}</span>
                        </DiscussionTitle>
                        <DiscussionBody className="text-sm text-slate-200">
                          {thread.questioner.message}
                        </DiscussionBody>
                      </div>
                    </div>
                    <DiscussionExpand className="text-muted-foreground" />
                  </DiscussionContent>
                  <DiscussionReplies>
                    <DiscussionItem value={`${thread.id}-reply`} className="border-l border-white/10">
                      <DiscussionContent className="flex flex-col gap-3 rounded-lg border border-white/10 bg-black/40 p-3 shadow-sm">
                        <div className="flex items-start gap-3">
                          <Image
                            src={RESPONDENT.avatar}
                            alt={`${RESPONDENT.name} avatar`}
                            width={36}
                            height={36}
                            className="h-9 w-9 shrink-0 rounded-full object-cover"
                          />
                          <div className="flex flex-col gap-2">
                            <DiscussionTitle className="flex flex-wrap items-center gap-1 text-white">
                              <span>{RESPONDENT.name}</span>
                              <span className="text-[11px] text-muted-foreground">{RESPONDENT.handle}</span>
                              <span className="text-[11px] text-muted-foreground">•</span>
                              <span className="text-[11px] text-muted-foreground">{RESPONDENT.timeAgo}</span>
                            </DiscussionTitle>
                            <DiscussionBody className="text-sm text-slate-200">
                              {thread.answer}
                            </DiscussionBody>
                          </div>
                        </div>
                      </DiscussionContent>
                    </DiscussionItem>
                  </DiscussionReplies>
                </DiscussionItem>
              ))}
            </Discussion>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
