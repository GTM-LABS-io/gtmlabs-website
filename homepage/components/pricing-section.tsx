'use client';

import { useState } from 'react';
import { Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { InlineTooltip } from '@/components/ui/inline-tooltip';
import { FREE_PLAN_FEATURES, TOOLTIP_COPY, FREE_LIMITS_SUMMARY } from '@/lib/pricing-copy';
import { CONTACT_EMAIL } from '@/lib/brand';
import { useRouter } from 'next/navigation';

interface Plan {
  id: string;
  name: string;
  price: number;
  interval: string;
  description: string;
  features: string[];
  notIncluded?: string[];
  highlighted?: boolean;
  ctaText?: string;
}

const plans: Plan[] = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    interval: 'forever',
    description: 'Perfect for those sharing their work and experiences online',
    features: FREE_PLAN_FEATURES,
    highlighted: true,
    ctaText: 'Start Free'
  }
];

interface PricingSectionProps {
  showTitle?: boolean;
  className?: string;
  darkTheme?: boolean;
}

export function PricingSection({ showTitle = true, className = '', darkTheme = false }: PricingSectionProps) {
  const router = useRouter();
  const [isAnnual, setIsAnnual] = useState(false);

  const handlePlanSelect = (planId: string) => {
    if (planId === 'free') {
      router.push('/login');
    } else if (planId === 'pro') {
      // Contact sales or custom flow
      window.open(`mailto:${CONTACT_EMAIL}?subject=Pro%20Plan%20Inquiry`, '_blank');
    } else {
      router.push('/login?plan=' + planId);
    }
  };

  return (
    <section className={`py-20 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {showTitle && (
          <div className="text-center mb-16">
            <h2 className={`${darkTheme ? 'section-headline gradient-headline' : 'text-3xl sm:text-4xl font-bold text-gray-900' } mb-4`}>
              Start free. Upgrade when you need more.
            </h2>
            <p className={`${darkTheme ? 'section-description' : 'text-xl text-gray-600'} max-w-2xl mx-auto`}>
              Create channels, send messages, attach files, and share deep links. Add more capacity and control when you’re ready.
            </p>
            {/* Annual/Monthly Toggle */}
            <div className="flex items-center justify-center mt-8 gap-4">
              <span className={`text-sm ${
                !isAnnual 
                  ? (darkTheme ? 'text-white font-medium' : 'text-gray-900 font-medium')
                  : (darkTheme ? 'text-slate-400' : 'text-gray-500')
              }`}>
                Monthly
              </span>
              <button
                onClick={() => setIsAnnual(!isAnnual)}
                className={`relative w-12 h-6 rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 ${
                  darkTheme 
                    ? 'bg-slate-700 focus:ring-offset-slate-900' 
                    : 'bg-gray-200'
                }`}
              >
                <div
                  className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full shadow transform transition-transform duration-200 ease-in-out ${
                    isAnnual ? 'translate-x-6' : 'translate-x-0'
                  } ${darkTheme ? 'bg-slate-300' : 'bg-white'}`}
                />
              </button>
              <span className={`text-sm ${
                isAnnual 
                  ? (darkTheme ? 'text-white font-medium' : 'text-gray-900 font-medium')
                  : (darkTheme ? 'text-slate-400' : 'text-gray-500')
              }`}>
                Annual
                <span
                className={`ml-1 ${darkTheme ? 'brand-pill' : 'brand-pill-light'} section-pill-text`}
              >
                Save 20%
              </span>
              </span>
            </div>
          </div>
        )}

        <div className="flex justify-center">
          <div className="w-full max-w-[20rem]">

            {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative rounded-3xl border-2 p-8 transition-all duration-300 backdrop-blur-xl shadow-2xl before:absolute before:inset-[1px] before:rounded-[22px] before:border before:border-white/5 before:pointer-events-none ${
                plan.highlighted
                  ? (darkTheme 
                      ? 'border-white/10 bg-[#090C14] hover-feature-surface shadow-[0_0_50px_rgba(0,0,0,0.3)] hover:border-white/20' 
                      : 'border-purple-500 bg-purple-50 shadow-xl')
                  : (darkTheme 
                      ? 'border-white/10 bg-[#090C14] hover-feature-surface shadow-[0_0_30px_rgba(0,0,0,0.5)] hover:border-white/20' 
                      : 'border-gray-200 bg-white shadow-lg')
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className={`brand-pill section-pill-text`}>
                    Beta Access
                  </span>
                </div>
              )}

              <div className="text-center">
                <h3 className={`text-xl font-semibold mb-2 ${
                  darkTheme ? 'text-white' : 'text-gray-900'
                }`}>{plan.name}</h3>
                <div className="mb-4">
                  <span className={`text-4xl font-bold ${
                    darkTheme ? 'text-white' : 'text-gray-900'
                  }`}>
                    ${isAnnual && plan.price > 0 ? Math.round(plan.price * 0.8) : plan.price}
                  </span>
                  {plan.price > 0 && (
                    <span className={`ml-1 ${
                      darkTheme ? 'text-slate-400' : 'text-gray-500'
                    }`}>/{isAnnual ? 'year' : plan.interval}</span>
                  )}
                </div>
                <p className={`mb-6 ${
                  darkTheme ? 'text-slate-300' : 'text-gray-600'
                }`}>{plan.description}</p>

                <Button
                  onClick={() => handlePlanSelect(plan.id)}
                  variant={plan.highlighted ? 'brand' : undefined}
                  className={`w-full mb-6 ${!plan.highlighted ? 'bg-gray-900 hover:bg-gray-800' : ''}`}
                >
                  {plan.ctaText || 'Get Started'}
                </Button>

                <div className="space-y-3 text-left">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <Check className={`w-5 h-5 flex-shrink-0 ${
                        darkTheme ? 'text-green-400' : 'text-green-500'
                      }`} />
                      <span className={`text-sm ${
                        darkTheme ? 'text-slate-300' : 'text-gray-700'
                      }`}>
                        {feature.includes('Highlighted deep link sharing') ? (
                          <InlineTooltip
                            text="Highlighted deep link sharing"
                            tooltip={TOOLTIP_COPY.highlightedDeepLink}
                          />
                        ) : feature === FREE_LIMITS_SUMMARY ? (
                          <InlineTooltip
                            text={FREE_LIMITS_SUMMARY}
                            tooltip={TOOLTIP_COPY.limits}
                          />
                        ) : feature.toLowerCase().includes('powered by quickping') ? (
                          <InlineTooltip
                            text={feature}
                            tooltip={TOOLTIP_COPY.branding}
                          />
                        ) : (
                          feature
                        )}
                      </span>
                    </div>
                  ))}
                  {plan.notIncluded?.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3 opacity-50">
                      <X className={`w-5 h-5 flex-shrink-0 ${
                        darkTheme ? 'text-slate-500' : 'text-gray-400'
                      }`} />
                      <span className={`text-sm ${
                        darkTheme ? 'text-slate-400' : 'text-gray-500'
                      }`}>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            ))}
          </div>
        </div>

        {/* Details Bar */}
        <div
          className={`mt-12 rounded-2xl p-6 border flex flex-col md:flex-row items-center justify-between gap-4 relative overflow-hidden group ${
            darkTheme
              ? 'bg-[#090C14] border-white/10 text-white hover-feature-surface'
              : 'bg-gray-50 border-gray-200 text-gray-900'
          }`}
        >
          {/* Left: reassurance */}
          <div className={`text-sm ${darkTheme ? 'text-slate-200' : 'text-gray-700'}`}>
            No credit card for Free • Upgrade anytime • Downgrade safe
          </div>

          {/* Center: CTA to full comparison */}
          <Button
            onClick={() => router.push('/pricing#comparison')}
            className={`${
              darkTheme
                ? 'bg-white/10 hover:bg-white/20 text-white'
                : 'bg-gray-900 hover:bg-gray-800 text-white'
            } rounded-lg`}
          >
            See full comparison →
          </Button>

          {/* Right: tiny help link */}
          <button
            type="button"
            onClick={() => router.push('/#faq')}
            className={`text-xs underline-offset-4 hover:underline ${
              darkTheme ? 'text-slate-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Questions? View FAQs →
          </button>
          
        </div>
      </div>
    </section>
  );
}