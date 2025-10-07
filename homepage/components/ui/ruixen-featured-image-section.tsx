"use client"
import { ComponentPropsWithoutRef, useEffect, useRef, useState } from "react"
import {
  animate,
  motion,
  useMotionTemplate,
  useMotionValue,
  AnimatePresence,
} from "framer-motion"
import { FileText, Share2, Palette } from "lucide-react"
import { BorderBeam } from "@/components/magicui/border-beam"
import { slackTokens } from "@/lib/design-tokens"
import { uiBlueprint as ui } from "@/components/ui/ui-blueprint"
import WrittenAssets from "@/components/ui/tabs/written-assets"
import { WrittenBottomBar } from "@/components/ui/tabs/written-assets"
import SocialPlatforms from "@/components/ui/tabs/social-platforms"
import { SocialBottomBar } from "@/components/ui/tabs/social-platforms"
import VisualGallery from "@/components/ui/tabs/visual-gallery"
import { VisualBottomBar } from "@/components/ui/tabs/visual-gallery"

const tabs = [
  { id: "written", icon: FileText, title: "Written" },
  { id: "social", icon: Share2, title: "Social" },
  { id: "visual", icon: Palette, title: "Visual" },
]

const FeatureTab = (
  props: (typeof tabs)[number] & ComponentPropsWithoutRef<'button'> & { selected: boolean }
) => {
  const { icon: Icon, title, selected, onClick, id } = props
  return (
    <div
      className="relative overflow-hidden rounded-lg border"
      style={{ width: 120, height: 48, borderColor: selected ? 'transparent' : 'rgba(255,255,255,0.1)' }}
    >
      <button
        onClick={onClick}
        className="inline-flex items-center justify-center gap-2 rounded-lg w-full h-full"
        style={{
          fontSize: 16,
          fontWeight: 600,
          backgroundColor: selected ? '#1F2937' : 'transparent',
          color: selected ? '#FFFFFF' : '#6B7280',
          transition: 'background-color 200ms ease',
        }}
        role="tab"
        aria-selected={selected}
        aria-controls={`panel-${id}`}
        id={`tab-${id}`}
        onMouseEnter={(e) => {
          if (!selected) e.currentTarget.style.backgroundColor = '#1A1B23'
        }}
        onMouseLeave={(e) => {
          if (!selected) e.currentTarget.style.backgroundColor = 'transparent'
        }}
      >
        <Icon className="w-4 h-4" />
        <span>{title}</span>
      </button>
      {selected && (
        <BorderBeam
          duration={5}
          size={32}
          colorFrom={slackTokens.colors.blue[600]}
          colorTo={slackTokens.colors.blue[500]}
          borderWidth={1}
          initialOffset={10}
        />
      )}
    </div>
  )
}

export default function RuixenFeaturedImageSection() {
  // 0 is the index of the tab.
  const [selectedTab, setSelectedTab] = useState(0)
  const [isDesktop, setIsDesktop] = useState(false)
  // Guardrail: do not remove the double white frame + blue beam unless the key matches.
  // Set NEXT_PUBLIC_FRAME_DELETE_KEY="RUIXEN_BEAM_FRAME_OK" to explicitly allow edits.
  const FRAME_DELETE_KEY = "RUIXEN_BEAM_FRAME_OK"
  const providedKey = process.env.NEXT_PUBLIC_FRAME_DELETE_KEY
  const canRemoveFrame = providedKey === FRAME_DELETE_KEY

  const handleSelecttab = (index: number) => {
    setSelectedTab(index)
  }

  useEffect(() => {
    const update = () => {
      if (typeof window !== 'undefined') {
        setIsDesktop(window.matchMedia('(min-width: 768px)').matches)
      }
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  // Dev-only assertion: ensure the frame elements are present when locked
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production' && !canRemoveFrame) {
      const frame = document.querySelector('[data-guard="ruixen-frame"]') as HTMLElement | null
      const inner = document.querySelector('[data-guard="ruixen-frame-inner"]') as HTMLElement | null
      if (!frame || !inner) {
        // eslint-disable-next-line no-console
        console.error(
          "Guardrail: The Ruixen double white frame + blue beam was removed or modified. To intentionally modify it, set NEXT_PUBLIC_FRAME_DELETE_KEY=RUIXEN_BEAM_FRAME_OK and get explicit approval."
        )
      }
    }
  }, [canRemoveFrame])

  // Dev-only guardrail: watch for structural mutations to the guarded frame
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production' && !canRemoveFrame) {
      const target = document.querySelector('[data-guard="ruixen-frame"]')
      if (!target) return
      const observer = new MutationObserver((mutations) => {
        for (const m of mutations) {
          if (m.type === 'childList' || m.type === 'attributes') {
            // eslint-disable-next-line no-console
            console.error(
              'Guardrail: Detected structural change to Ruixen frame. Only messaging may be edited. To intentionally modify the frame, set NEXT_PUBLIC_FRAME_DELETE_KEY=RUIXEN_BEAM_FRAME_OK and get explicit approval.'
            )
            break
          }
        }
      })
      observer.observe(target, { attributes: true, childList: true, subtree: false })
      return () => observer.disconnect()
    }
  }, [canRemoveFrame])

  return (
    <section className="py-20">
      <div className="mx-auto w-full max-w-[1200px] px-4 overflow-hidden">
        {/* Header Area */}
        <h2 className="text-center font-bold" style={{ fontSize: 48, lineHeight: 1.2 }}>
          <span className="gradient-headline">From One Webinar to 30+ Assets</span>
        </h2>
        <p className="mx-auto mt-4 max-w-3xl text-center" style={{ fontSize: 18, color: '#8B8D96' }}>
          See exactly what content we'll create from your recorded sessions
        </p>

        {/* Tab Navigation Bar */}
        <div className="relative mt-12 flex w-full justify-center overflow-x-auto px-1">
          <div className="inline-flex min-w-max items-center gap-2 rounded-xl bg-transparent p-1" style={{ padding: 4, height: 56 }} role="tablist" aria-label="Output tabs">
            {tabs.map((tab, tabIndex) => (
              <FeatureTab
                {...tab}
                selected={selectedTab === tabIndex}
                onClick={() => handleSelecttab(tabIndex)}
                key={tab.title}
              />
            ))}
          </div>
        </div>

        {/* Main Frame: thin blue border with blue beam around it */}
        <div className="mt-8 overflow-hidden">
          <div
            className="relative overflow-hidden rounded-2xl border border-blue-500/20 bg-black"
            data-guard="ruixen-frame"
            data-locked={(canRemoveFrame ? "false" : "true")}
          >
            {/* beam orbiting the frame */}
            {isDesktop && (
              <BorderBeam
                duration={8}
                size={360}
                colorFrom={slackTokens.colors.blue[600]}
                colorTo={slackTokens.colors.blue[500]}
                borderWidth={1}
              />
            )}
            <div className="relative p-2">
              <AnimatePresence mode="wait">
                {selectedTab === 0 && (
                  <motion.div key="written" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} transition={{ duration: 0.2, ease: "easeOut" }} role="tabpanel" id="panel-written" aria-labelledby="tab-written">
                    <WrittenAssets />
                  </motion.div>
                )}
                {selectedTab === 1 && (
                  <motion.div key="social" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} transition={{ duration: 0.2, ease: "easeOut" }} role="tabpanel" id="panel-social" aria-labelledby="tab-social">
                    <SocialPlatforms />
                  </motion.div>
                )}
                {selectedTab === 2 && (
                  <motion.div key="visual" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} transition={{ duration: 0.2, ease: "easeOut" }} role="tabpanel" id="panel-visual" aria-labelledby="tab-visual">
                    <VisualGallery />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Bottom info bar - rendered outside the frame */}
        <AnimatePresence mode="wait">
          {selectedTab === 0 && (
            <motion.div key="written-bar" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }} className="mt-6">
              <WrittenBottomBar />
            </motion.div>
          )}
          {selectedTab === 1 && (
            <motion.div key="social-bar" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }} className="mt-6">
              <SocialBottomBar />
            </motion.div>
          )}
          {selectedTab === 2 && (
            <motion.div key="visual-bar" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }} className="mt-6">
              <VisualBottomBar />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom Description removed — each frame handles its own per-tab bar */}
      </div>
    </section>
  )
}
