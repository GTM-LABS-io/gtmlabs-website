'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CheckCircleIcon, ArrowLeft, Link as LinkIcon, FileText, Share2, Palette, Sparkles, Video, Users, Mail, TrendingUp, ChevronDown, ChevronUp } from 'lucide-react';
import { InlineTooltip } from '@/components/ui/inline-tooltip';
import { ThinBlueBorderCard } from '@/components/ui/thin-blue-border-card';
import { motion, AnimatePresence } from 'framer-motion';

type WorkflowStep = 'initial' | 'calendar';

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

// Tooltip copy for Founding Partners features
const FOUNDING_TOOLTIP_COPY = {
  webinarProcessing: 'We process up to 2 webinars per month, creating 30+ unique content assets from each recording including video clips, social posts, blogs, lead magnets, and newsletters.',
  videoClips: '15 short-form video clips extracted from your webinar, optimized for social media platforms with captions and hooks.',
  socialPosts: '20 professionally designed LinkedIn/social posts with images, copy, and CTAs that prompt comments like "Comment TEMPLATE for the guide." Includes automation setup to DM commenters with your lead magnet landing page.',
  blogContent: '1 long-form blog post per webinar (1,200-1,800 words), optimized for SEO and your brand voice.',
  leadMagnet: '1 professionally designed lead magnet per webinar (checklist, guide, or resource) with matching landing page. This is what you offer in your social post CTAs.',
  newsletter: '1 email newsletter per webinar designed to promote your next live webinar and nurture your growing email list.',
  turnaround: 'First drafts delivered within 48 hours of receiving your webinar. Unlimited revisions when initiated within 7 days of delivery. Once you start reviewing, we will iterate with you as long as needed to get it perfect.',
  brandVoice: 'We analyze your existing content to match your unique brand voice, tone, and style across all deliverables.',
  strategyCall: 'Monthly 30-minute strategy session to review performance, discuss upcoming webinars, and optimize your content approach.',
  schedulingPublishing: 'We handle scheduling so reporting just works. You approve everything before it goes live.',
  analytics: 'Per-platform & per-post metrics require connected accounts. We connect once and schedule posts from your workspace.',
  advancedAnalytics: 'We tag every post with UTMs and track file_downloads in GA4 so you can see which channels drive subscribers.',
  foundingPrice: 'Lock in $999/month forever as a founding partner. Regular price is $2,999/month. Only 2 spots available.',
};

// Removed ContactFormData interface since Zcal handles contact collection
// Animated Flywheel Showcase Component
function AnimatedFlywheelShowcase() {
  return (
    <ThinBlueBorderCard className="p-6 relative overflow-hidden h-[280px] flex items-center justify-center">
      {/* Background glow */}
      <motion.div
        className="absolute inset-0 bg-gradient-radial from-blue-500/5 via-transparent to-transparent"
        animate={{
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <div className="relative w-full h-full flex items-center justify-center">
        {/* Center: Webinar */}
        <motion.div
          className="absolute z-20 w-16 h-16 rounded-full bg-blue-500/20 border border-blue-400/40 flex items-center justify-center shadow-lg backdrop-blur-sm"
          animate={{
            scale: [1, 1.05, 1],
            borderColor: ['rgba(96, 165, 250, 0.4)', 'rgba(96, 165, 250, 0.6)', 'rgba(96, 165, 250, 0.4)'],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Video className="w-7 h-7 text-blue-300" />
        </motion.div>
        <div className="absolute z-20 top-1/2 left-1/2 -translate-x-1/2 translate-y-12 text-xs font-semibold text-slate-400 whitespace-nowrap">Webinar</div>

        {/* Orbiting Elements */}
        {[
          { icon: FileText, label: 'Content', angle: 0, color: 'bg-blue-500/15 border-blue-400/30', iconColor: 'text-blue-300' },
          { icon: Users, label: 'Leads', angle: 90, color: 'bg-slate-500/15 border-slate-400/30', iconColor: 'text-slate-300' },
          { icon: Mail, label: 'Email List', angle: 180, color: 'bg-blue-400/15 border-blue-300/30', iconColor: 'text-blue-200' },
          { icon: TrendingUp, label: 'Signups', angle: 270, color: 'bg-slate-400/15 border-slate-300/30', iconColor: 'text-slate-200' },
        ].map((item, index) => {
          const Icon = item.icon;
          const radius = 70; // radius of orbit in pixels
          
          return (
            <motion.div
              key={item.label}
              className="absolute z-10"
              style={{
                width: '1px',
                height: '1px',
              }}
              animate={{
                rotate: [item.angle, item.angle + 360],
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: "linear",
                delay: 0
              }}
            >
              <motion.div
                className="flex flex-col items-center gap-1"
                style={{
                  position: 'absolute',
                  left: `${radius}px`,
                  top: '0px',
                  transformOrigin: 'center',
                }}
                animate={{
                  rotate: [-item.angle, -item.angle - 360],
                }}
                transition={{
                  duration: 15,
                  repeat: Infinity,
                  ease: "linear",
                  delay: 0
                }}
              >
                <motion.div
                  className={`w-11 h-11 rounded-full ${item.color} border flex items-center justify-center shadow-md backdrop-blur-sm`}
                  whileHover={{ scale: 1.1 }}
                  animate={{
                    y: [-2, 2, -2],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.3
                  }}
                >
                  <Icon className={`w-5 h-5 ${item.iconColor}`} />
                </motion.div>
                <span className="text-[10px] font-medium text-slate-400 whitespace-nowrap">
                  {item.label}
                </span>
              </motion.div>
            </motion.div>
          );
        })}

        {/* Orbital rings */}
        <motion.div
          className="absolute w-[140px] h-[140px] rounded-full border border-blue-400/15"
          animate={{
            scale: [1, 1.01, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute w-[160px] h-[160px] rounded-full border border-blue-400/10"
          style={{
            borderStyle: 'dashed',
          }}
        />

        {/* Growth indicator */}
        <motion.div
          className="absolute -bottom-2 right-4 bg-blue-500/10 border border-blue-400/20 rounded-lg px-3 py-1.5 flex items-center gap-2 backdrop-blur-sm"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <motion.div
            animate={{
              y: [-2, 0, -2],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <TrendingUp className="w-4 h-4 text-blue-300" />
          </motion.div>
          <div className="text-[10px] text-slate-300 font-medium">List Growth</div>
        </motion.div>
      </div>
    </ThinBlueBorderCard>
  );
}

export function InteractivePricing() {
  const [currentStep, setCurrentStep] = useState<WorkflowStep>('initial');
  const [contentUrl, setContentUrl] = useState('');
  const [isExpanded, setIsExpanded] = useState(true); // Controls sidebar expansion
  const [calendarScale, setCalendarScale] = useState(0.75); // Dynamic scale for calendar depth effect
  const [containerDimensions, setContainerDimensions] = useState({ width: 0, height: 0 });
  const [baseCalHeight, setBaseCalHeight] = useState(600); // Unscaled calendar height used for iframe
  const [auditDetailsOpen, setAuditDetailsOpen] = useState(false); // Controls audit details accordion
  const [detailsModalOpen, setDetailsModalOpen] = useState(false); // Controls details modal for SLA/scope
  
  
  // Responsive base size to enforce Zcal two-column layout without horizontal scrolling
  const BASE_CAL_WIDTH = 960; // px, >= 800 keeps two-column (avatar + calendar) on desktop
  const MIN_SCALE = 0.35;
  const MAX_SCALE = 0.85;
  const MIN_BASE_HEIGHT = 520;
  const MAX_BASE_HEIGHT = 720;
  const MIN_VISUAL_HEIGHT = 360;
  const MAX_VISUAL_HEIGHT = 680;

  // Load Zcal script once and keep it loaded
  useEffect(() => {
    // Check if script already exists
    const existingScript = document.querySelector('script[src="https://static.zcal.co/embed/v1/embed.js"]');
    
    if (!existingScript) {
      const script = document.createElement('script');
      script.src = 'https://static.zcal.co/embed/v1/embed.js';
      script.async = true;
      script.onload = () => {
        // Force widget reinitialization when script loads
        if (currentStep === 'calendar') {
          setTimeout(() => {
            // Trigger Zcal to reinitialize widgets
            if ((window as any).zcal) {
              (window as any).zcal.init();
            }
          }, 100);
        }
      };
      document.head.appendChild(script);
    } else if (currentStep === 'calendar') {
      // Script exists, force reinitialization
      setTimeout(() => {
        if ((window as any).zcal) {
          (window as any).zcal.init();
        }
      }, 100);
    }
  }, [currentStep]);

  // Dynamic calendar scaling based on container size
  useEffect(() => {
    if (currentStep !== 'calendar') return;

    const calendarContainer = document.getElementById('calendar-container');
    if (!calendarContainer) return;

    const resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;

      const { width } = entry.contentRect;
      // Available viewport height for the calendar (minimize vertical scroll)
      const rect = calendarContainer.getBoundingClientRect();
      const viewportAvailable = Math.max(320, window.innerHeight - rect.top - 32); // 32px bottom buffer

      setContainerDimensions({ width, height: viewportAvailable });

      // Compute scale: fit BASE_CAL_WIDTH into available width
      const widthScale = width / BASE_CAL_WIDTH;
      const optimalScale = Math.min(Math.max(widthScale, MIN_SCALE), MAX_SCALE);
      setCalendarScale(optimalScale);

      // Compute base (unscaled) height so that scaled height fits viewportAvailable
      // Ensure reasonable bounds (520-720)
      const targetVisualHeight = Math.min(Math.max(MIN_VISUAL_HEIGHT, viewportAvailable), MAX_VISUAL_HEIGHT);
      const computedBaseHeight = Math.round(targetVisualHeight / optimalScale);
      setBaseCalHeight(Math.min(Math.max(computedBaseHeight, MIN_BASE_HEIGHT), MAX_BASE_HEIGHT));
    });

    resizeObserver.observe(calendarContainer);

    return () => {
      resizeObserver.disconnect();
    };
  }, [currentStep]);

  const handleGetContentClick = () => {
    if (contentUrl.trim()) {
      setCurrentStep('calendar');
      setIsExpanded(false); // Collapse the left panel
    }
  };

  const handleBackToInitial = () => {
    setCurrentStep('initial');
    setIsExpanded(true); // Expand the left panel
    setContentUrl('');
  };

  const clampedCalendarScale = Math.min(Math.max(calendarScale, MIN_SCALE), MAX_SCALE);
  const depthOffset = Math.round(200 + (1 - clampedCalendarScale) * 600);
  const visualCalendarHeight = Math.round(baseCalHeight * clampedCalendarScale);

  return (
    <div className="mx-auto max-w-6xl">
      {/* Heading - Hide when calendar is active */}
      <AnimatePresence>
        {currentStep === 'initial' && (
          <motion.div 
            className="mx-auto mb-8 max-w-2xl text-center"
            initial={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="section-headline gradient-headline mb-4">
              Done-for-you webinar repurposing that actually drives signups
            </h2>
            <p className="section-description max-w-2xl mx-auto">
              Stop wrestling with AI tools and content calendars. We transform your webinars into 30+ publish-ready assets. Strategically sequenced to grow your list and fill your next event.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Calendar Header - Only show when calendar is active */}
      <AnimatePresence>
        {currentStep === 'calendar' && (
          <motion.div 
            className="mx-auto mb-8 max-w-2xl text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="section-headline gradient-headline mb-4">
              Schedule Your Content Review
            </h2>
            <p className="section-description max-w-2xl mx-auto">
              Pick a time for your 15-minute call to review the content we created for you
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dynamic Pricing Grid - Changes based on expansion state */}
      <div className="bg-black rounded-xl border border-blue-500/20 overflow-hidden">
        <div className={`grid transition-all duration-500 ease-out ${
          isExpanded ? 'md:grid-cols-6' : 'md:grid-cols-12'
        }`}>
          
          {/* Left Panel - Collapsible */}
          <motion.div 
            className={`flex h-full flex-col gap-6 border-b border-blue-500/20 ${
              isExpanded ? 'p-6' : 'p-4'
            } ${
              isExpanded 
                ? 'md:col-span-2 md:border-r md:border-b-0' 
                : 'md:col-span-3 md:border-r md:border-b-0'
            }`}
            layout
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {/* Back Button - Shows when collapsed */}
            <AnimatePresence>
              {!isExpanded && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="mb-4"
                >
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleBackToInitial}
                    className="text-slate-400 hover:text-white hover:bg-blue-500/10 p-2"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex flex-col gap-6">
              <div className="space-y-4">
                <h2 className="inline rounded-sm bg-blue-500/10 p-1 text-xl font-semibold text-white">
                  Free Sample Audit
                </h2>
                <span className="my-3 block text-3xl font-bold text-blue-400">
                  $0
                </span>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Paste a YouTube URL. We'll turn it into a mini content library and show you the numbers.
                </p>
              </div>

              {isExpanded && (
                <motion.div 
                  className="space-y-3"
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <Label htmlFor="content-url" className="text-white text-sm font-medium">
                    Your content URL
                  </Label>
                  <Input
                    id="content-url"
                    type="url"
                    placeholder="https://youtube.com/watch?v=..."
                    value={contentUrl}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setContentUrl(e.target.value)}
                    className="bg-zinc-950 border-blue-500/30 text-white placeholder:text-slate-500 focus:border-blue-400"
                  />
                  <p className="text-xs text-slate-500 mt-1">
                    Paste a YouTube link. We'll auto-pull the transcript.
                  </p>
                  <Button 
                    onClick={handleGetContentClick}
                    disabled={!contentUrl.trim()}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg animate-soft-glow"
                  >
                    <LinkIcon className="w-4 h-4 mr-2" />
                    Get Free Audit
                  </Button>
                </motion.div>
              )}

              {!isExpanded && contentUrl && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-2"
                >
                  <div className="text-xs text-slate-500">Processing:</div>
                  <div className="text-sm text-blue-300 bg-blue-500/10 rounded px-2 py-1 truncate">
                    {contentUrl}
                  </div>
                </motion.div>
              )}
            </div>

            <div className="bg-blue-500/5 h-px w-full" />

            {/* Accordion for Audit Details */}
            <div className="space-y-2">
              <button
                onClick={() => setAuditDetailsOpen(!auditDetailsOpen)}
                className="flex items-center justify-between w-full text-left text-sm font-medium text-white hover:text-blue-300 transition-colors"
              >
                <span>What you'll get in the free audit</span>
                {auditDetailsOpen ? (
                  <ChevronUp className="w-4 h-4 text-blue-400" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-blue-400" />
                )}
              </button>
              
              <AnimatePresence>
                {auditDetailsOpen && (
                  <motion.ul
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-slate-400 space-y-3 text-sm pt-2"
                  >
                    {[
                      '10 short clips',
                      '6–8 social posts',
                      '1 short blog (~600 words)',
                      '1 lead magnet',
                    ].map((item, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <CheckCircleIcon className="h-4 w-4 text-blue-400 flex-shrink-0" />
                        <span className={!isExpanded ? 'text-xs' : ''}>{item}</span>
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
              
              {auditDetailsOpen && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-2 pt-2"
                >
                  <p className="text-xs text-slate-400 leading-relaxed">
                    <span className="font-medium">Note:</span> We deliver the lead magnet + copy. Hosting/landing page is an add-on.
                  </p>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Paid plans include scheduling, publishing, and per-post metrics.
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Right Column - Expands when left collapses */}
          <motion.div 
            className={`relative z-10 overflow-hidden ${
              isExpanded ? 'p-6' : 'p-4'
            } ${
              isExpanded ? 'md:col-span-4' : 'md:col-span-9'
            }`}
            layout
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {/* Initial State - Pro Plan & Features */}
            {currentStep === 'initial' && (
              <motion.div 
                className="grid gap-8 lg:grid-cols-2"
                layout
                transition={{ duration: 0.3 }}
              >
                {/* Founding Partners Pricing - Restructured */}
                <div className="flex flex-col space-y-6">
                  {/* Header with Badge at top */}
                  <div className="relative">
                    {/* Founding Partners Badge - Compact corner badge */}
                    <div className="absolute -top-1 -right-1">
                      <span className="inline-flex items-center gap-0.5 rounded-full bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 px-1.5 py-0.5 text-[9px] font-semibold text-amber-300 leading-tight">
                        <Sparkles className="w-2 h-2" />
                        Pilot · 2 spots
                      </span>
                    </div>
                    <h2 className="text-xl font-semibold text-white mb-1">Founding Partners</h2>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold text-blue-400">
                        $795
                      </span>
                      <span className="text-sm text-slate-400">
                        /mo for 6 months
                      </span>
                    </div>
                    <p className="text-amber-300 text-sm mt-2 font-medium">
                      $795/mo for 6 months → then $1,738/mo
                    </p>
                    <p className="text-slate-400 text-sm mt-2">
                      Secure pilot pricing. Limited to 2 companies.
                    </p>
                  </div>
                  
                  {/* Animated Assets Showcase - moved up */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key="assets-showcase"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                    >
                      <AnimatedFlywheelShowcase />
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Compact Feature List */}
                <div className="relative w-full">
                  <div className="mb-6">
                    <h3 className="text-sm font-medium text-white mb-4">What you get:</h3>
                    <ul className="text-slate-300 space-y-2.5 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircleIcon className="h-4 w-4 text-blue-400 flex-shrink-0 mt-0.5" />
                        <span>Up to 2 webinars/month (≤120 min total source video)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircleIcon className="h-4 w-4 text-blue-400 flex-shrink-0 mt-0.5" />
                        <span>30+ assets: clips, posts, blog, lead magnet, newsletter</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircleIcon className="h-4 w-4 text-blue-400 flex-shrink-0 mt-0.5" />
                        <span>72-hour standard turnaround</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircleIcon className="h-4 w-4 text-blue-400 flex-shrink-0 mt-0.5" />
                        <span>Brand voice matching</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircleIcon className="h-4 w-4 text-blue-400 flex-shrink-0 mt-0.5" />
                        <span>Scheduling + publishing from your portal</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircleIcon className="h-4 w-4 text-blue-400 flex-shrink-0 mt-0.5" />
                        <span>Per-platform + per-post metrics in your portal</span>
                      </li>
                    </ul>
                  </div>

                  {/* CTA Section */}
                  <div className="mt-8 space-y-4">
                    <Button
                      className="w-full bg-blue-600 text-white hover:bg-blue-700"
                      onClick={() => {
                        if (typeof window !== 'undefined') {
                          window.location.href = 'https://account.gtmlabs.io/services/9UcVMV8grrQGxuVBgGk4Rcjc/checkouts';
                        }
                      }}
                    >
                      Get Started
                    </Button>
                    
                    <p className="text-xs text-slate-400 text-center leading-relaxed">
                      We handle scheduling so reporting just works. You approve everything before it goes live.{' '}
                      <button
                        onClick={() => setDetailsModalOpen(true)}
                        className="text-blue-400 hover:text-blue-300 underline"
                      >
                        View details
                      </button>
                    </p>
                    
                    <p className="text-xs text-slate-500 text-center">
                      Add-ons available at checkout and in your portal.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Details Modal (SLA & Scope) */}
            <AnimatePresence>
              {detailsModalOpen && (
                <>
                  {/* Overlay */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setDetailsModalOpen(false)}
                    className="fixed inset-0 bg-black/80 z-50"
                  />
                  
                  {/* Modal */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="fixed inset-0 z-50 flex items-center justify-center p-4"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="bg-zinc-900 border border-blue-500/20 rounded-xl max-w-2xl w-full p-6 shadow-2xl max-h-[80vh] overflow-y-auto">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-semibold text-white">Service Details</h3>
                        <button
                          onClick={() => setDetailsModalOpen(false)}
                          className="text-slate-400 hover:text-white transition-colors"
                        >
                          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                      
                      <div className="space-y-6 text-sm text-slate-300">
                        {/* SLA Section */}
                        <div>
                          <h4 className="font-semibold text-white mb-3">Service Level Agreement</h4>
                          <div className="space-y-2">
                            <p><span className="text-white font-medium">First draft:</span> 48 hours from receiving source + brief</p>
                            <p><span className="text-white font-medium">Revisions:</span> 72-hour cycles, Monday–Friday</p>
                            <p><span className="text-white font-medium">Urgent questions:</span> 24-hour response during business hours</p>
                            <p className="text-xs text-slate-400 mt-3">
                              Business hours: Mon–Fri, 9am–6pm PT (excluding U.S. federal holidays)
                            </p>
                          </div>
                        </div>

                        {/* Fair Use Section */}
                        <div>
                          <h4 className="font-semibold text-white mb-3">Fair Use & Scope</h4>
                          <div className="space-y-2">
                            <p><span className="text-white font-medium">Included:</span> Up to 2 webinars per month with ≤120 minutes of total source video</p>
                            <p><span className="text-white font-medium">Asset breakdown:</span> 10–15 clips, ~20 social posts, 1 blog, 1 lead magnet, 1 newsletter per webinar</p>
                            <p className="text-xs text-slate-400 mt-3">
                              Need more? Extra source hours, advanced analytics, landing pages, and design polish are available as add-ons at checkout or anytime in your portal.
                            </p>
                          </div>
                        </div>

                        {/* Workflow Section */}
                        <div>
                          <h4 className="font-semibold text-white mb-3">How It Works</h4>
                          <div className="space-y-2">
                            <p><span className="text-white font-medium">1. Submit:</span> Upload your webinar recording + fill out brief</p>
                            <p><span className="text-white font-medium">2. Review:</span> Approve drafts in your portal</p>
                            <p><span className="text-white font-medium">3. Publish:</span> We schedule to LinkedIn, YouTube, X, TikTok</p>
                            <p><span className="text-white font-medium">4. Track:</span> Per-post and per-platform metrics in your portal</p>
                          </div>
                        </div>

                        {/* Support Section */}
                        <div>
                          <h4 className="font-semibold text-white mb-3">Support</h4>
                          <p>Email us at <a href="mailto:support@gtmlabs.io" className="text-blue-400 hover:text-blue-300 underline">support@gtmlabs.io</a> or message us in your portal.</p>
                          <p className="mt-2">
                            <a href="/legal/sla" className="text-blue-400 hover:text-blue-300 underline">
                              View full SLA →
                            </a>
                          </p>
                        </div>
                      </div>
                      
                      <div className="mt-6 flex justify-end">
                        <Button
                          onClick={() => setDetailsModalOpen(false)}
                          className="bg-blue-600 hover:bg-blue-700 text-white"
                        >
                          Got it
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>

            {/* Calendar State - Dynamic Responsive Calendar */}
            {currentStep === 'calendar' && (
              <motion.div 
                className="w-full"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                {/* Dynamic Calendar Container */}
                <div 
                  id="calendar-container"
                  className="w-full bg-zinc-950/50 rounded-2xl border border-blue-500/20 flex items-start justify-center"
                  style={{
                    minHeight: '320px',
                    height: `${visualCalendarHeight}px`,
                    padding: '0 12px 12px',
                    perspective: '1600px',
                    transformStyle: 'preserve-3d',
                    overflowX: 'hidden',
                    overflowY: 'auto',
                  }}
                >
                  {/* Dynamically Scaled Calendar */}
                  <div
                    className="overflow-visible will-change-transform"
                    style={{
                      width: `${BASE_CAL_WIDTH}px`,
                      height: `${baseCalHeight}px`,
                      transform: `translateZ(-${depthOffset}px) scale(${clampedCalendarScale})`,
                      transformOrigin: 'top center',
                      transition: 'transform 0.4s ease, filter 0.4s ease',
                      filter: `drop-shadow(0 18px 48px rgba(37, 99, 235, ${0.12 + (1 - clampedCalendarScale) * 0.18}))`,
                    }}
                  >
                    {/* Optimized Iframe for Two-Column Layout */}
                    <iframe 
                      key={`calendar-${currentStep}-${contentUrl}-${clampedCalendarScale.toFixed(2)}`}
                      src={`https://zcal.co/i/kISITCqo?embed=1&embedType=iframe&layout=desktop`}
                      loading="lazy" 
                      style={{
                        border: 'none',
                        width: `${BASE_CAL_WIDTH}px`,
                        height: `${baseCalHeight}px`,
                        borderRadius: '1rem',
                        minWidth: '800px', // Force two-column layout
                      }}
                      scrolling="auto"
                      id="calendar-iframe"
                      allow="camera; microphone; autoplay; encrypted-media; fullscreen"
                    />
                    
                    {/* Fallback Widget */}
                    <div 
                      className="zcal-inline-widget hidden"
                      key={`widget-${currentStep}-${contentUrl}-${clampedCalendarScale.toFixed(2)}`}
                      style={{
                        width: `${BASE_CAL_WIDTH}px`,
                        height: `${baseCalHeight}px`,
                        minWidth: '800px', // Force two-column layout
                      }}
                    >
                      <a href="https://zcal.co/i/kISITCqo">GTM LABS - Schedule a meeting</a>
                    </div>
                  </div>

                  {/* Debug Info (remove in production) */}
                  {process.env.NODE_ENV === 'development' && (
                    <div className="text-xs text-slate-500 p-2 border-t border-blue-500/10">
                      Scale: {clampedCalendarScale.toFixed(2)} | Depth: {depthOffset}px | Container: {containerDimensions.width}x{containerDimensions.height} | Base: {BASE_CAL_WIDTH}x{baseCalHeight}
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
      
    </div>
  );
}
