"use client";

import { TwoColumnFeature, MiniFeatureCard } from '@/components/cosmic';
import { DollarSign, Repeat, BarChart3, Zap, Shield, Target, TrendingUp } from 'lucide-react';
import { MultiplierAnimation, BalanceScaleAnimation, FogLiftAnimation, FlywheelAnimation } from './how-we-help-animations';

export default function HowWeHelpSection() {
  return (
    <section id="how-we-help" className="space-y-14">
      <div className="text-center">
        <h2 className="section-headline gradient-headline">How We Help</h2>
        <p className="text-center text-lg md:text-xl text-slate-400 mt-4 max-w-[700px] mx-auto">
          Stop throwing money away. Give your team a chance. Walk into the board meeting with real numbers.
        </p>
      </div>
      
      {/* ROW 1: Stop Throwing It All Away */}
      <TwoColumnFeature
        eyebrow="ROI"
        title="Stop Throwing It All Away"
        description="You put weeks into that webinar, production, speakers, promotion, your team's time. We turn that single recording into 30+ assets that work for a month, so nothing gets wasted."
        imageFrame="plain"
        image={<MultiplierAnimation />}
      >
        <div className="space-y-3">
          <MiniFeatureCard
            icon={<DollarSign className="w-5 h-5 text-blue-300" />}
            title="Multiply Your Investment"
            description="One webinar becomes 30+ clips, posts, blogs, and newsletters. Every dollar you spent compounds across channels for weeks instead of dying after one use."
          />
          <MiniFeatureCard
            icon={<Repeat className="w-5 h-5 text-blue-300" />}
            title="Stop Starting from Zero"
            description="Each webinar feeds the next one. Content promotes upcoming events, grows your list, and builds momentum. No more one-and-done campaigns."
          />
        </div>
      </TwoColumnFeature>

      {/* ROW 2: Give Your Team a Fighting Chance */}
      <TwoColumnFeature
        eyebrow="Leverage"
        title="Give Your Team a Fighting Chance"
        description="Your team is maxed out, working late, and you can't hire more people. We give them 10x output without adding a single hour to their week."
        reverse
        imageFrame="plain"
        image={<BalanceScaleAnimation />}
      >
        <div className="space-y-3">
          <MiniFeatureCard
            icon={<Zap className="w-5 h-5 text-blue-300" />}
            title="10x Output, Same Team"
            description="One recording becomes a month of content. Your team focuses on strategy and creative while we handle execution. No more scrambling to fill the calendar."
          />
          <MiniFeatureCard
            icon={<Shield className="w-5 h-5 text-blue-300" />}
            title="Protect Your Team's Time"
            description="No late nights. No weekend work. No burnout. We deliver finished assets in 48 hours so your team can focus on what only they can do."
          />
        </div>
      </TwoColumnFeature>

      {/* ROW 3: Walk In with Real Numbers */}
      <TwoColumnFeature
        eyebrow="Attribution"
        title="Walk In with Real Numbers"
        description="Someone always asks if it's working, and you're stuck showing likes and impressions, metrics that feel hollow when the real question is about revenue. We track every post from first touch to subscriber, so you finally have the numbers that matter."
        imageFrame="plain"
        image={<FogLiftAnimation />}
      >
        <div className="space-y-3">
          <MiniFeatureCard
            icon={<BarChart3 className="w-5 h-5 text-blue-300" />}
            title="Finally See What's Actually Working"
            description="Stop wondering which content matters. See the exact path from post to click to subscriber. Know which clips fill webinars and which posts die in the feed. The guessing stops here."
          />
          <MiniFeatureCard
            icon={<Target className="w-5 h-5 text-blue-300" />}
            title="Back It Up When It Counts"
            description="Stakeholder meeting tomorrow? Pull the report. Board asking questions? Show the funnel. Budget review coming up? Here's your pipeline impact. You're not scrambling for proof, you already have it."
          />
        </div>
      </TwoColumnFeature>

      {/* ROW 4: Turn Marketing Into a Revenue Engine */}
      <TwoColumnFeature
        eyebrow="Revenue"
        title="Turn Marketing Into a Revenue Engine"
        description="You're writing checks for marketing every month and wondering when it starts paying for itself. We make every webinar work 10x harder so marketing becomes the growth channel you invest in, not the cost center you tolerate."
        reverse
        imageFrame="plain"
        image={<FlywheelAnimation />}
      >
        <div className="space-y-3">
          <MiniFeatureCard
            icon={<Repeat className="w-5 h-5 text-blue-300" />}
            title="Compound Your Returns"
            description="One event generates a month of leads. Content feeds the funnel continuously. Your board finally sees marketing as ROI, not overhead."
          />
          <MiniFeatureCard
            icon={<TrendingUp className="w-5 h-5 text-blue-300" />}
            title="Scale the Growth Channel"
            description="Turn one-time investments into ongoing revenue engines. Every webinar becomes a repeatable system that drives predictable pipeline growth."
          />
        </div>
      </TwoColumnFeature>
    </section>
  );
}
