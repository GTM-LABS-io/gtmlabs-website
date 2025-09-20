'use client'

import { PricingSection } from '@/components/pricing-section'

export default function PricingPage() {
  return (
    <main className="min-h-screen">
      <section className="pt-16 pb-10 text-center">
        <h1 className="text-4xl font-bold text-white">Pricing</h1>
        <p className="text-slate-300 mt-3">Start free. Upgrade when you need more.</p>
      </section>

      <section className="relative py-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.06)_0%,transparent_55%)] pointer-events-none" />
        <div className="relative z-10">
          <PricingSection showTitle={false} className="bg-transparent" darkTheme={true} />
        </div>
      </section>

      {/* Comparison anchor target */}
      <section id="comparison" className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold text-white mb-4">Plan comparison</h2>
          <p className="text-slate-300">Detailed comparison coming soon. For now, the Free plan is available during beta.</p>
        </div>
      </section>
    </main>
  )
}
