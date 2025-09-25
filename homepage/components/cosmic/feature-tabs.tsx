'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { GlassCard } from './glass-card'
import { uiBlueprint as ui } from '@/components/ui/ui-blueprint'
import { MessageSquare, BarChart3, Share2, Sparkles } from 'lucide-react'

interface Tab {
  id: string
  label: string
  content: React.ReactNode
}

interface FeatureTabsProps {
  tabs: Tab[]
  defaultTab?: string
  className?: string
}

export function FeatureTabs({ tabs, defaultTab, className }: FeatureTabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id)

  const activeContent = tabs.find(tab => tab.id === activeTab)?.content

  // Tab descriptions mapping
  const tabDescriptions = {
    compose: {
      title: "Channel-based Portfolio",
      description: "Build a portfolio that feels like a workspace. Organize work into channels for campaigns, launches, or projects. Post entries as messages with files and links, then use threads to add depth so everything stays organized and searchable."
    },
    analyze: {
      title: "Summaries at a Glance",
      description: "Surface the signal first. Summaries up top, deeper context in the thread. Recruiters jump straight to what matters and find it fast."
    },
    share: {
      title: "Share the Whole or a Moment",
      description: "Share your full workspace, a single channel, an entry, or even a deep link that scrolls to and highlights a specific sentence. Control what the world sees while keeping sensitive work protected."
    }
  }

  const currentDescription = tabDescriptions[activeTab as keyof typeof tabDescriptions]

  const getTabIcon = (id?: string) => {
    switch (id) {
      case 'compose':
      case 'organize':
        return <MessageSquare className="w-4 h-4 text-blue-300" />
      case 'analyze':
      case 'insights':
        return <BarChart3 className="w-4 h-4 text-blue-300" />
      case 'share':
      case 'publish':
        return <Share2 className="w-4 h-4 text-blue-300" />
      default:
        return <Sparkles className="w-4 h-4 text-blue-300" />
    }
  }

  return (
    <section className={cn("mx-auto max-w-6xl space-y-6", className)} style={ui.fontStyle()}>
      {/* Tab Navigation - Enhanced for mobile */}
      <div className="flex justify-center">
        <div className="inline-flex rounded-xl bg-[#090C14] p-1" role="tablist" aria-label="Feature tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-sm sm:text-base font-medium transition-all duration-200 min-w-[80px] sm:min-w-[100px] inline-flex items-center gap-2 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none",
                activeTab === tab.id
                  ? "bg-[#191A23] text-[color:var(--brand-pill-text,#BFDBFE)] shadow-sm"
                  : "text-[color:var(--brand-pill-text,#BFDBFE)] hover:bg-[#191A23]/40"
              )}
              role="tab"
              aria-selected={activeTab === tab.id}
              aria-controls={`panel-${tab.id}`}
              tabIndex={activeTab === tab.id ? 0 : -1}
              onKeyDown={(e) => {
                if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
                  e.preventDefault();
                  const idx = tabs.findIndex(t => t.id === activeTab);
                  const next = e.key === 'ArrowRight' ? (idx + 1) % tabs.length : (idx - 1 + tabs.length) % tabs.length;
                  setActiveTab(tabs[next].id);
                }
              }}
            >
              {getTabIcon(tab.id)}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content - Mobile optimized */}
      <div>
        <GlassCard variant="elevated" className="overflow-hidden bg-[#090C14]">
          <div className="relative min-h-[300px] sm:min-h-[400px]">
            <AnimatePresence mode="wait">
              {tabs.map((tab) => (
                activeTab === tab.id && (
                  <motion.div
                    key={tab.id}
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -12 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className={cn("p-4 sm:p-0")}
                    role="tabpanel"
                    id={`panel-${tab.id}`}
                    aria-labelledby={tab.id}
                  >
                    {tab.content}
                  </motion.div>
                )
              ))}
            </AnimatePresence>
            
            {/* Subtle gradient overlay at bottom */}
            <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/20 to-transparent" />
          </div>
        </GlassCard>
      </div>

      {/* Bottom Description Component - Mobile prominent */}
      {currentDescription && (
        <div 
          className="rounded-xl p-4 sm:p-6 border border-white/10 backdrop-blur-sm transition-all duration-200 text-center sm:text-left"
          style={{
            backgroundColor: ui.colors.mainHeader,
            ...ui.fontStyle()
          }}
        >
          <h3 className="card-title-sm mb-2 sm:mb-3 inline-flex items-center gap-2">
            {getTabIcon(activeTab)}
            <span className="gradient-headline">{currentDescription.title}</span>
          </h3>
          <p className="card-text">
            {currentDescription.description}
          </p>
        </div>
      )}
    </section>
  )
}

// Screenshot wrapper component
interface ScreenshotProps {
  src: string
  alt: string
  className?: string
}

export function Screenshot({ src, alt, className }: ScreenshotProps) {
  return (
    <div className={cn("relative", className)}>
      <img 
        src={src} 
        alt={alt} 
        className="w-full h-auto rounded-lg"
      />
    </div>
  )
}