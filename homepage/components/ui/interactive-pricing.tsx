'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CheckCircleIcon, ArrowLeft, Link as LinkIcon, FileText, Share2, Palette } from 'lucide-react';
import { ThinBlueBorderCard } from '@/components/ui/thin-blue-border-card';
import { motion, AnimatePresence } from 'framer-motion';

type WorkflowStep = 'initial' | 'calendar';

// Removed ContactFormData interface since Zcal handles contact collection

// Animated Assets Showcase Component
function AnimatedAssetsShowcase() {
  const assets = [
    { icon: FileText, label: 'Blogs', count: '15+', color: 'text-green-400', delay: 0 },
    { icon: Share2, label: 'Social', count: '20+', color: 'text-blue-400', delay: 0.1 },
    { icon: Palette, label: 'Lead Magnets', count: '15+', color: 'text-purple-400', delay: 0.2 },
  ];

  return (
    <ThinBlueBorderCard className="p-6 relative overflow-hidden">
      {/* Animated background elements */}
      <motion.div
        className="absolute top-0 right-0 w-20 h-20 bg-blue-500/5 rounded-full"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      <motion.div
        className="absolute bottom-0 left-0 w-16 h-16 bg-purple-500/5 rounded-full"
        animate={{
          scale: [1, 1.1, 1],
          rotate: [360, 180, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      <div className="relative z-10 space-y-4">
        <motion.div
          className="text-center space-y-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="text-3xl font-bold text-blue-400"
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            50+
          </motion.div>
          <div className="text-sm text-slate-400 font-medium">Assets per webinar</div>
          <div className="text-xs text-slate-500">Blog posts, social content, lead magnets & more</div>
        </motion.div>

        {/* Animated asset types */}
        <div className="grid grid-cols-3 gap-3">
          {assets.map((asset, index) => (
            <motion.div
              key={asset.label}
              className="text-center space-y-2"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.5, 
                delay: 0.3 + asset.delay,
                ease: "easeOut"
              }}
            >
              <motion.div
                className="mx-auto w-8 h-8 rounded-lg bg-zinc-900/50 flex items-center justify-center"
                whileHover={{ scale: 1.1 }}
                animate={{
                  boxShadow: [
                    "0 0 0px rgba(59, 130, 246, 0)",
                    "0 0 20px rgba(59, 130, 246, 0.1)",
                    "0 0 0px rgba(59, 130, 246, 0)"
                  ]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: asset.delay * 2
                }}
              >
                <asset.icon className={`w-4 h-4 ${asset.color}`} />
              </motion.div>
              <div className="space-y-1">
                <div className={`text-xs font-medium ${asset.color}`}>{asset.count}</div>
                <div className="text-xs text-slate-500">{asset.label}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Floating particles */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/30 rounded-full"
            style={{
              left: `${20 + i * 30}%`,
              top: `${30 + i * 20}%`
            }}
            animate={{
              y: [-10, 10, -10],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut"
            }}
          />
        ))}
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
  
  // Fixed base size to enforce Zcal two-column layout without horizontal scrolling
  const BASE_CAL_WIDTH = 960; // px, >= 800 keeps two-column (avatar + calendar)
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
              Start free. Upgrade when you need more.
            </h2>
            <p className="section-description max-w-2xl mx-auto">
              Create channels, send messages, attach files, and share deep links. Add more capacity and control when you're ready.
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
                  Free Trial
                </h2>
                <span className="my-3 block text-3xl font-bold text-blue-400">
                  $0
                </span>
                <p className="text-slate-400 text-sm">
                  Get a sample of our work to see if we're a good fit
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
                  <Button 
                    onClick={handleGetContentClick}
                    disabled={!contentUrl.trim()}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <LinkIcon className="w-4 h-4 mr-2" />
                    Get Content
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

            <ul className="text-slate-400 space-y-3 text-sm">
              {[
                'One piece of long-form content processed',
                'Sample blog post & social content',
                '15-minute consultation call',
                'No commitment required'
              ].map((item, index) => (
                <li key={index} className="flex items-center gap-2">
                  <CheckCircleIcon className="h-4 w-4 text-blue-400 flex-shrink-0" />
                  <span className={!isExpanded ? 'text-xs' : ''}>{item}</span>
                </li>
              ))}
            </ul>
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
                {/* Pro Pricing */}
                <div className="flex flex-col justify-between space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold text-white">Pro Monthly Package</h2>
                    <span className="my-3 block text-3xl font-bold text-blue-400">
                      $2,999
                    </span>
                    <p className="text-slate-400 text-sm">
                      Full-service content repurposing for scaling businesses
                    </p>
                  </div>
                  
                  {/* Animated Assets Showcase */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key="assets-showcase"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                    >
                      <AnimatedAssetsShowcase />
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Features */}
                <div className="relative w-full">
                  <div className="text-sm font-medium text-white mb-4">Everything in Free plus:</div>
                  <ul className="text-slate-400 space-y-3 text-sm">
                    {[
                      'Unlimited webinar processing',
                      '2-3 blog posts per webinar',
                      '15+ social media posts',
                      '5+ lead magnets & guides',
                      'Email sequence templates',
                      'Custom brand voice training',
                      'Priority 48-hour delivery',
                      'Dedicated account manager',
                      'Monthly strategy calls',
                      'Performance analytics & reporting'
                    ].map((item, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <CheckCircleIcon className="h-4 w-4 text-blue-400 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  {/* Call to Action */}
                  <div className="mt-8">
                    <Button className="w-full bg-blue-600 text-white hover:bg-blue-700">
                      Get Started
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}

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
