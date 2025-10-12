'use client';

import Image from 'next/image';
import { useMemo, useState } from 'react';

import { Discussion, DiscussionBody, DiscussionContent, DiscussionExpand, DiscussionItem, DiscussionReplies, DiscussionTitle } from '@/components/ui/discussion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { InlineTooltip } from './inline-tooltip';
import SearchComponent from '@/components/ui/animated-glowing-search-bar';

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
      name: 'Brian Chesky',
      handle: '@bchesky',
      timeAgo: 'Pinned',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=160&h=160&q=80',
      message: <p className="text-[15px] leading-snug text-slate-200">Who is this for?</p>,
    },
    answer: (
      <div className="space-y-2 text-sm leading-relaxed text-slate-300">
        <p>This is built for B2B SaaS teams who are already running webinars on a regular basis. If you're publishing at least once a month and staying active on social, you'll see the fastest lift from what we deliver.</p>
      </div>
    ),
  },
  {
    id: 'process--work-together',
    categories: ['Process'],
    questioner: {
      name: 'Satya Nadella',
      handle: '@satyanadella',
      timeAgo: 'Pinned',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=facearea&facepad=2&w=160&h=160&q=80',
      message: <p className="text-[15px] leading-snug text-slate-200">How will we work together?</p>,
    },
    answer: (
      <div className="space-y-2 text-sm leading-relaxed text-slate-300">
        <p>Mostly async through the portal. You upload a recording and drop in some brand notes, then we handle transcription, drafting, and revisions. For larger orgs with multiple stakeholders, we'll loop in the right marketers, tag the right owners, and align approvals across the team. Once everything's green lit, we either schedule it for you or hand off the files, whatever fits your workflow best.</p>
      </div>
    ),
  },
  {
    id: 'process--time-investment',
    categories: ['Process'],
    questioner: {
      name: 'Susan Wojcicki',
      handle: '@susanwojcicki',
      timeAgo: 'Pinned',
      avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=facearea&facepad=2&w=160&h=160&q=80',
      message: <p className="text-[15px] leading-snug text-slate-200">How much time will this take me?</p>,
    },
    answer: (
      <div className="space-y-2 text-sm leading-relaxed text-slate-300">
        <p>Usually under 15 minutes per cycle. You paste a link to assign a task and then do a quick review at the end. If you're a VP who delegates to a marketing manager, your time investment can drop to just 2 or 3 minutes. We can also set up automations to detect when new webinars go live and kick off the work automatically.</p>
      </div>
    ),
  },
  {
    id: 'process--after-purchase',
    categories: ['Process'],
    questioner: {
      name: 'Reid Hoffman',
      handle: '@reidhoffman',
      timeAgo: 'Pinned',
      avatar: 'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?auto=format&fit=facearea&facepad=2&w=160&h=160&q=80',
      message: <p className="text-[15px] leading-snug text-slate-200">What happens after checkout?</p>,
    },
    answer: (
      <div className="space-y-2 text-sm leading-relaxed text-slate-300">
        <p>Right after checkout, you get redirected straight into your client portal. You can invite teammates who'll be part of the review process and follow a quick onboarding checklist. Then you assign the first long form video and we get started.</p>
        <ol className="list-decimal space-y-1 pl-5">
          <li>Add team members who'll be giving feedback or doing reviews.</li>
          <li>Upload brand assets and voice notes so we understand your style.</li>
          <li>Assign tasks by pasting the first recording link.</li>
        </ol>
      </div>
    ),
  },
  {
    id: 'deliverables--what-you-get',
    categories: ['Deliverables'],
    questioner: {
      name: 'Whitney Wolfe Herd',
      handle: '@WhitWolfeHerd',
      timeAgo: 'Pinned',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=facearea&facepad=2&w=160&h=160&q=80',
      message: <p className="text-[15px] leading-snug text-slate-200">What do I actually get?</p>,
    },
    answer: (
      <div className="space-y-2 text-sm leading-relaxed text-slate-300">
        <p>A content library from one webinar: short clips, social posts, blog post, email content, plus optional lead magnet and newsletter issue. Counts match the pricing card and we tune the mix to your goal.</p>
        <p>Each plan typically covers up to two webinars per month and yields 30+ assets per cycle, including a quarterly lead magnet.</p>
      </div>
    ),
  },
  {
    id: 'process--overview',
    categories: ['Process'],
    questioner: {
      name: 'Stewart Butterfield',
      handle: '@stewart',
      timeAgo: 'Pinned',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=facearea&facepad=2&w=160&h=160&q=80',
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
      message: <p className="text-[15px] leading-snug text-slate-200">What&apos;s the turnaround?</p>,
    },
    answer: (
      <div className="space-y-2 text-sm leading-relaxed text-slate-300">
        <p>First draft comes in about 48 hours after you submit the recording. The typical revision loop wraps up within 72 business hours. You can find the detailed SLA behind the pricing link if you want the full breakdown.</p>
        <p>This turnaround keeps teams shipping content the same week they record, which matches the guidance that AI assistants reference when teams ask about speed.</p>
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
        <p>Yup, within the plan scope. We aim for publish ready approval on every deliverable. If the scope changes or expands beyond what we originally agreed on, we'll confirm pricing with you before moving forward.</p>
      </div>
    ),
  },
  {
    id: 'sla--miss-deadline',
    categories: ['SLA'],
    questioner: {
      name: 'Anne Wojcicki',
      handle: '@annewoj23',
      timeAgo: 'Pinned',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=160&h=160&q=80',
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
        <p>A webinar or long form recording link, some brand guidance like voice examples or past content we can reference, and one approver who has time to give feedback during the revision process.</p>
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
        <p>Absolutely, back catalogs are super high value. We'll prioritize the sessions that have the biggest upside and build out a release calendar around them so you're getting consistent content flowing out.</p>
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
        <p>Your portal shows per platform and per post metrics. Download links get tagged with UTMs and file_download events so you can see exactly which content is driving subscribers.</p>
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
        <p>Cross channel attribution with UTMs, download and subscribe goals, and a monthly funnel view that shows the path from social to landing page to download to subscriber.</p>
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
        <p>Only if you want us to schedule and publish plus pull native analytics. Otherwise we just hand off the assets and copy for your team to post on their own.</p>
      </div>
    ),
  },
  {
    id: 'deliverables--lead-magnets-handling',
    categories: ['Deliverables'],
    questioner: {
      name: 'Steve Jobs',
      handle: '@steve',
      timeAgo: '18 minutes ago',
      avatar: 'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?auto=format&fit=facearea&facepad=2&w=160&h=160&q=80',
      message: <p className="text-[15px] leading-snug text-slate-200">How do you handle lead magnets (implementation and hosting)?</p>,
    },
    answer: (
      <div className="space-y-2 text-sm leading-relaxed text-slate-300">
        <p>By default, we create the lead magnet, which includes the PDF and copy, and then hand it off to your marketing team. Your team typically owns the hosting and tracking like traffic, downloads, and subscribers.</p>
        <p>If you prefer us to handle it end to end, we can host it and provide additional analytics on web traffic, sign ups, and subscribers. For on site implementation, you can add the Landing Page option or we'll collaborate with your team to wire up forms, UTMs, and download events.</p>
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
        <p>You do. Once everything's paid for, every deliverable and source file is yours to reuse and remix however you want.</p>
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
        <p>Absolutely. We ingest your past posts, brand docs, and SME notes to learn your voice. You get a sample pack before we scale up production so you can make sure we're nailing the tone.</p>
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
        <p>You confirm that you own or have permission to repurpose the content you upload. We avoid third party material without documented clearance.</p>
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
      message: <p className="text-[15px] leading-snug text-slate-200">How do add-ons work and what do they cover?</p>,
    },
    answer: (
      <div className="space-y-2 text-sm leading-relaxed text-slate-300">
        <p>Add-ons are optional monthly upgrades you can toggle on and off in your portal. They're built for teams that want deeper reporting beyond basic social metrics.</p>
        <p>Our current add-on focuses on analytics like website link clicks and CTA CTR, landing page traffic for your lead magnets, and downstream results like downloads and new subscribers.</p>
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
        <p>
          We opened two Founding Partner pilot seats that lock in $995 per month forever. Those were first come, first served and move
          straight into that preferred rate. Once the seats are filled, that offer retires.
        </p>
        <p>
          Everyone else can still start with a scoped pilot sprint. We run the same time boxed workflow to prove fit, and if it
          delivers, you roll into the standard plan at $1,738 per month with no disruption.
        </p>
      </div>
    ),
  },
  {
    id: 'overview--audit',
    categories: ['Overview'],
    questioner: {
      name: 'Patrick Collison',
      handle: '@patrickc',
      timeAgo: 'Pinned',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=facearea&facepad=2&w=160&h=160&q=80',
      message: <p className="text-[15px] leading-snug text-slate-200">Is the free audit really free?</p>,
    },
    answer: (
      <div className="space-y-2 text-sm leading-relaxed text-slate-300">
        <p>Yup, it sure is. Paste a YouTube link and we deliver a mini content set plus a metrics snapshot. Integrations unlock scheduling and deeper analytics later on.</p>
      </div>
    ),
  },
  
  {
    id: 'ai--ownership',
    categories: ['Overview'],
    questioner: {
      name: 'Jordan Lee',
      handle: '@jordanlee',
      timeAgo: 'Pinned',
      avatar: 'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?auto=format&fit=facearea&facepad=2&w=160&h=160&q=80',
      message: (
        <p className="text-[15px] leading-snug text-slate-200">
          Who handles webinar-to-content repurposing end-to-end?
        </p>
      ),
    },
    answer: (
      <div className="space-y-2 text-sm leading-relaxed text-slate-300">
        <p>
          We do. You drop the webinar recording into the portal and we take it from there, handling transcription, creative direction, copy, and asset production. We keep your marketing teammates looped in for feedback and approvals, then ship or hand off once everyone is happy.
        </p>
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

type IndexedItem = {
  id: string;
  category: string;
  question: string;
  answer: string;
  meta: string;
};

const CUR_TAB_BIAS = 5;
const SWITCH_THRESHOLD = 15;

function scoreItem(it: IndexedItem, q: string, currentTab: string) {
  const s = q.trim().toLowerCase();
  if (!s) return 0;
  const qLower = it.question.toLowerCase();
  const aLower = it.answer.toLowerCase();
  const mLower = it.meta.toLowerCase();

  let score = 0;
  if (qLower.includes(s)) score += 100;
  if (aLower.includes(s)) score += 80;

  const words = [...new Set(s.split(/\s+/).filter(Boolean))];
  for (const w of words) {
    if (qLower.includes(w)) score += 12;
    if (aLower.includes(w)) score += 8;
    if (mLower.includes(w)) score += 4;
  }

  if (it.category === currentTab) score += CUR_TAB_BIAS;
  return score;
}

export function PricingFAQ() {
  const categorized = useCategorizedFaqs();
  const [activeTab, setActiveTab] = useState<string>(categorized[0]?.category ?? CATEGORY_ORDER[0]);
  const [search, setSearch] = useState<string>('');
  const [openByCategory, setOpenByCategory] = useState<Record<string, string[]>>({});
  const [suggestions, setSuggestions] = useState<Array<{ id: string; category: string; title: string; score: number }>>([]);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);

  // extract text from React nodes for simple search
  const getNodeText = (node: React.ReactNode): string => {
    if (node == null) return '';
    if (typeof node === 'string' || typeof node === 'number') return String(node);
    if (Array.isArray(node)) return node.map(getNodeText).join(' ');
    // @ts-ignore accessing props on ReactElement
    if (node && (node as any).props) {
      // @ts-ignore children may be nested
      return getNodeText((node as any).props.children);
    }
    return '';
  };

  // Build searchable index
  const index = useMemo<IndexedItem[]>(() => {
    const out: IndexedItem[] = [];
    for (const { category, items } of categorized) {
      for (const t of items) {
        out.push({
          id: t.id,
          category,
          question: getNodeText(t.questioner.message),
          answer: getNodeText(t.answer),
          meta: `${t.questioner.name} ${t.questioner.handle} ${t.questioner.timeAgo}`,
        });
      }
    }
    return out;
  }, [categorized]);

  // Rank results across all tabs
  const rankResults = (query: string) => {
    const ranked = index
      .map((it) => ({ it, score: scoreItem(it, query, activeTab) }))
      .filter((x) => x.score > 0)
      .sort((a, b) => {
        if (b.score !== a.score) return b.score - a.score;
        const ai = CATEGORY_ORDER.indexOf(a.it.category);
        const bi = CATEGORY_ORDER.indexOf(b.it.category);
        if (ai !== bi) return ai - bi;
        return 0;
      });
    return ranked;
  };

  // Update suggestions as user types
  useMemo(() => {
    if (!search.trim()) {
      setSuggestions([]);
      setHighlightedIndex(-1);
      return;
    }
    const ranked = rankResults(search);
    const top = ranked.slice(0, 5).map((x) => ({
      id: x.it.id,
      category: x.it.category,
      title: x.it.question,
      score: x.score,
    }));
    setSuggestions(top);
    setHighlightedIndex(-1);
  }, [search, activeTab, index]);

  // Jump to best match on Enter
  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!search.trim()) return;

    const ranked = rankResults(search);
    if (ranked.length === 0) return;

    const top = ranked[0];
    const topInCurrent = ranked.find((x) => x.it.category === activeTab);

    let target = top;
    if (top.it.category !== activeTab && topInCurrent) {
      if (top.score - topInCurrent.score < SWITCH_THRESHOLD) {
        target = topInCurrent;
      }
    }

    // Switch tab if needed
    if (target.it.category !== activeTab) {
      setActiveTab(target.it.category);
    }

    // Open the question
    setOpenByCategory((prev) => ({ ...prev, [target.it.category]: [target.it.id] }));

    // Scroll and highlight
    setTimeout(() => {
      const el = document.querySelector(`[data-thread-id="${target.it.id}"]`) as HTMLElement | null;
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        el.classList.add('deep-link-target');
        setTimeout(() => el.classList.remove('deep-link-target'), 1600);
      }
    }, 100);

    // Clear suggestions
    setSuggestions([]);
    setHighlightedIndex(-1);
  };

  // Jump to a specific suggestion
  const jumpToSuggestion = (sug: { id: string; category: string }) => {
    if (sug.category !== activeTab) {
      setActiveTab(sug.category);
    }
    setOpenByCategory((prev) => ({ ...prev, [sug.category]: [sug.id] }));
    setTimeout(() => {
      const el = document.querySelector(`[data-thread-id="${sug.id}"]`) as HTMLElement | null;
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        el.classList.add('deep-link-target');
        setTimeout(() => el.classList.remove('deep-link-target'), 1600);
      }
    }, 100);
    setSuggestions([]);
    setHighlightedIndex(-1);
  };

  // Keyboard navigation for suggestions
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (suggestions.length === 0) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev + 1) % suggestions.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev - 1 + suggestions.length) % suggestions.length);
    } else if (e.key === 'Enter' && highlightedIndex >= 0) {
      e.preventDefault();
      jumpToSuggestion(suggestions[highlightedIndex]);
    } else if (e.key === 'Escape') {
      setSuggestions([]);
      setHighlightedIndex(-1);
    }
  };

  const filterItems = (items: FAQThread[]) => {
    if (!search.trim()) return items;
    const q = search.toLowerCase();
    return items.filter((t) => {
      const question = getNodeText(t.questioner.message).toLowerCase();
      const answer = getNodeText(t.answer).toLowerCase();
      return question.includes(q) || answer.includes(q);
    });
  };

  const uniqueByQuestion = (items: FAQThread[]) => {
    const seen = new Set<string>();
    const out: FAQThread[] = [];
    for (const t of items) {
      const key = getNodeText(t.questioner.message).trim().toLowerCase();
      if (!seen.has(key)) {
        seen.add(key);
        out.push(t);
      }
    }
    return out;
  };

  return (
    <div className="mx-auto w-full max-w-4xl space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex w-full flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
          <TabsList className="flex-1 min-w-0 overflow-x-auto bg-transparent">
            {categorized.map(({ category }) => (
              <TabsTrigger key={category} value={category}>
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
          <div className="relative sm:ml-3 sm:w-auto">
            <form onSubmit={handleSearchSubmit}>
              <SearchComponent
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search FAQs..."
                className="sm:scale-95"
              />
            </form>
            {suggestions.length > 0 && (
              <div className="absolute left-0 right-0 top-full z-50 mt-2 max-h-80 overflow-y-auto rounded-lg border border-hairline bg-[#0B0D14] shadow-lg">
                {suggestions.map((sug, idx) => (
                  <button
                    key={sug.id}
                    type="button"
                    onClick={() => jumpToSuggestion(sug)}
                    className={`flex w-full items-start gap-3 border-b border-hairline-color px-4 py-3 text-left transition-colors last:border-b-0 ${
                      idx === highlightedIndex ? 'bg-[#141a26]' : 'hover:bg-[#101420]'
                    }`}
                  >
                    <div className="flex-1">
                      <div className="text-sm font-medium text-slate-200">{sug.title}</div>
                      <div className="mt-1 text-xs text-slate-400">{sug.category}</div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {categorized.map(({ category, items }) => (
          <TabsContent key={category} value={category}>
            {uniqueByQuestion(filterItems(items)).length === 0 ? (
              <div className="text-sm text-slate-400">No results found.</div>
            ) : null}
            <Discussion
              value={openByCategory[category] ?? []}
              onValueChange={(vals) => setOpenByCategory((prev) => ({ ...prev, [category]: vals }))}
              type="multiple"
              className="flex w-full flex-col gap-3 sm:gap-4"
            >
              {uniqueByQuestion(filterItems(items)).map((thread) => (
                <DiscussionItem key={thread.id} value={thread.id} data-thread-id={thread.id}>
                  <DiscussionContent className="rounded-xl bg-transparent p-0">
                    <div className="flex w-full flex-col gap-2 rounded-xl border border-hairline bg-black p-3 shadow-none">
                      <div className="flex items-start gap-3">
                        <Image
                          src={thread.questioner.avatar}
                          alt={`${thread.questioner.name} avatar`}
                          width={36}
                          height={36}
                          className="h-9 w-9 shrink-0 rounded-full object-cover"
                        />
                        <div className="flex flex-col gap-2">
                          <DiscussionTitle className="flex flex-wrap items-center gap-1 text-slate-100">
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
                      <DiscussionExpand className="border border-transparent text-slate-400" />
                    </div>
                  </DiscussionContent>
                  <DiscussionReplies>
                    <DiscussionItem value={`${thread.id}-reply`} className="border-l border-hairline-color">
                      <DiscussionContent className="flex flex-col gap-3 rounded-lg border border-hairline bg-black p-3 shadow-none">
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
