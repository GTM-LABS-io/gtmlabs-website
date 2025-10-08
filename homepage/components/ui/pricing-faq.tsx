'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { InlineTooltip } from './inline-tooltip';

// Add-ons data
type AddOn = {
  id: string;
  name: string;
  description: string;
  price: number;
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

// Tooltip for Advanced Reporting
const ADVANCED_ANALYTICS_TOOLTIP = 'We tag every post with UTMs and track file_downloads in GA4 so you can see which channels drive subscribers.';

type FAQItem = {
  id: string;
  question: string;
  answer: React.ReactNode;
};

export function PricingFAQ() {
  const [openItems, setOpenItems] = useState<string[]>(['turnaround']); // Open first item by default

  const toggleItem = (id: string) => {
    setOpenItems(prev =>
      prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const faqItems: FAQItem[] = [
    {
      id: 'turnaround',
      question: "What's your turnaround?",
      answer: (
        <div className="space-y-3">
          <p className="text-slate-300">
            We deliver your first draft within <span className="font-medium text-white">48 hours</span> of receiving your source link and brief. Revisions land within <span className="font-medium text-white">72 hours</span>, Monday–Friday.
          </p>
          <p className="text-slate-300">
            If we miss a stated turnaround for reasons within our control, we issue a service credit per our SLA.
          </p>
          <p className="text-sm text-slate-400">
            <span className="font-medium">Fair-use:</span> up to 120 minutes of source video per month.{' '}
            <a href="/legal/sla" className="text-blue-400 hover:text-blue-300 underline">
              Read the full SLA
            </a>
          </p>
        </div>
      ),
    },
    {
      id: 'addons',
      question: "What add-ons are available?",
      answer: (
        <div className="space-y-4">
          <p className="text-slate-300">
            We offer two add-ons to extend your plan:
          </p>
          
          <div className="space-y-3">
            {ADD_ONS.map((addon) => (
              <div key={addon.id} className="p-4 rounded-lg border border-white/10 bg-zinc-950/50">
                <div className="flex items-center justify-between mb-2">
                  {addon.id === 'advanced-reporting' ? (
                    <InlineTooltip
                      text={addon.name}
                      tooltip={ADVANCED_ANALYTICS_TOOLTIP}
                      className="text-sm font-medium text-white"
                    />
                  ) : (
                    <span className="text-sm font-medium text-white">{addon.name}</span>
                  )}
                  <span className="text-sm font-semibold text-blue-400">+${addon.price}/mo</span>
                </div>
                <p className="text-xs text-slate-400">{addon.description}</p>
              </div>
            ))}
          </div>
          
          <div className="p-4 rounded-lg bg-blue-500/5 border border-blue-500/20">
            <p className="text-xs text-slate-400 leading-relaxed">
              <span className="font-medium text-slate-300">Fair use:</span> "Up to 2 webinars/month" and "30+ assets" reflect typical scope for &lt;120 minutes of total source content per month. Heavier volumes or extra videos use the "Extra source hours" add-on.
            </p>
            <p className="text-xs text-slate-400 leading-relaxed mt-2">
              <span className="font-medium text-slate-300">Advanced analytics add-on:</span> Includes UTMs, GA4 download tracking, and a monthly funnel report with social → landing page → download → subscriber KPIs.
            </p>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="w-full max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-white mb-6">Frequently Asked Questions</h2>
      
      <div className="space-y-4">
        {faqItems.map((item) => {
          const isOpen = openItems.includes(item.id);
          
          return (
            <div
              key={item.id}
              className="border border-white/10 rounded-lg bg-zinc-950/50 overflow-hidden"
            >
              <button
                onClick={() => toggleItem(item.id)}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-white/5 transition-colors"
              >
                <span className="text-lg font-medium text-white">{item.question}</span>
                {isOpen ? (
                  <ChevronUp className="w-5 h-5 text-blue-400 flex-shrink-0 ml-4" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-blue-400 flex-shrink-0 ml-4" />
                )}
              </button>
              
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 pt-0 text-sm">
                      {item.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
