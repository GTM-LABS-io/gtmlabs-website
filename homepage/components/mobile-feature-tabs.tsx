'use client'

import { MessageCircle, FileText, Share2, Paperclip } from 'lucide-react'
import { BorderBeam } from '@/components/magicui/border-beam'
import { BrowserFrame } from '@/components/cosmic'
import { BlueprintLeftPanel } from '@/components/ui/blueprint-primitives'
import { uiBlueprint as ui } from '@/components/ui/ui-blueprint'

// Mobile-optimized feature tabs content
export const mobileFeatureTabs = [
  {
    id: 'compose',
    label: 'Organize',
    content: (
      <div className="relative">

        {/* Mobile-first simplified preview */}
        <div className="block sm:hidden relative overflow-hidden rounded-2xl">
          {/* Mobile: Simple card showing key benefit */}
          <div className="p-6 text-center space-y-4 relative z-10" style={{backgroundColor: ui.colors.ink}}>
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl mx-auto flex items-center justify-center mb-4">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-white">Channel-based Portfolio</h3>
            <p className="text-zinc-300 text-sm leading-relaxed">
              Organize your work into channels. Post entries like messages with files and links, then add depth in threads so everything stays organized and easy to find.
            </p>

            <div className="flex items-center justify-center gap-4 pt-4">
              <div className="bg-white/10 rounded-lg px-3 py-2 text-xs text-zinc-300">✓ Channels & threads</div>
              <div className="bg-white/10 rounded-lg px-3 py-2 text-xs text-zinc-300">✓ Files & links</div>

            </div>
          </div>
          <BorderBeam
            duration={6}
            size={200}
            colorFrom="#6366f1"
            colorTo="#8b5cf6"
            borderWidth={2}
          />
        </div>

        {/* Desktop: Full BrowserFrame (hidden on mobile) */}
        <div className="hidden sm:block">
          <BrowserFrame title="Organize" url="https://threadfolio.app/channels/announcements">

            <div className="p-0 h-96 flex flex-col" style={{...ui.fontStyle(), backgroundColor: ui.colors.ink}}>
              {/* Content area matching exact InteractiveDemo layout */}
              <div className="flex-1 flex">
                {/* Left panel with announcements active */}
                <div className="w-64 border-r border-white/10">
                  <BlueprintLeftPanel
                    channels={[
                      { name: 'announcements', active: true },
                      { name: 'launches' },
                      { name: 'design' },
                      { name: 'feedback' },
                    ]}
                  />
                </div>
                
                {/* Main area with exact structure from InteractiveDemo */}
                <div className="flex-1 flex flex-col">
                  {/* Header area */}
                  <div className="h-16 px-5 pt-5 border-b border-white/10" style={{backgroundColor: ui.colors.mainHeader}}>
                    <div className="text-lg font-bold text-white"># announcements</div>
                    <div className="text-xs text-slate-400">Team updates and achievements</div>
                  </div>
                  
                  {/* Entries area with proper background */}
                  <div className="flex-1 p-5 space-y-4 overflow-y-auto">
                    {/* Entry card with GTM certification - much shorter */}
                    <div className={ui.classes.entryCard + " p-4"}>
                      <div className="flex items-start gap-3">
                        <div className={`${ui.classes.entryAvatar} flex items-center justify-center`}>Y</div>
                        <div className="flex-1">
                          <div className="text-sm text-slate-300 mb-2">You • 3 hours ago</div>
                          <div className="text-sm text-white mb-3 leading-relaxed">
                            Just completed my GTM Strategy certification from Product Marketing Alliance! 🎯 
                            <br />
                            Excited to apply these frameworks to our upcoming launches.
                          </div>
                          
                          {/* File attachment */}
                          <div className={ui.classes.fileAttachment + " inline-flex items-center gap-2 px-3 py-1 mb-3"}>
                            <span className="text-xs">📎 PMA-GTM-Strategy-Certificate.pdf</span>
                          </div>
                          
                          {/* Reaction chips (number first, emoji second) */}
                          <div className="flex items-center gap-2">
                            <div className={ui.classes.likeChip + " inline-flex items-center"}>0 👍</div>
                            <div className={ui.classes.threadChip + " inline-flex items-center"}>0 🧵</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Composer at bottom - exact InteractiveDemo style */}
                  <div className="px-5 pb-5">
                    <div className={ui.classes.composerCard + " p-4"}>
                      <div className="flex items-center gap-3">
                        <div className={`${ui.classes.composerAvatar} flex items-center justify-center`}>Y</div>
                        <div className="flex-1">
                          <input 
                            className={ui.classes.composerInput + " w-full px-3 py-2 mb-2"}
                            placeholder="Message #announcements…"
                            defaultValue=""
                          />
                        </div>
                        <div className="flex gap-2">
                          <button className={ui.classes.iconButton}>
                            <Paperclip className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </BrowserFrame>
          <BorderBeam
            duration={6}
            size={200}
            colorFrom="#6366f1"
            colorTo="#8b5cf6"
            borderWidth={2}
          />
        </div>
      </div>
    )
  },
  {
    id: 'analyze',
    label: 'Summarize',
    content: (
      <div className="relative">

        {/* Mobile: Simple STAR preview */}
        <div className="block sm:hidden relative overflow-hidden rounded-2xl">
          <div className="p-6 space-y-4 relative z-10" style={{backgroundColor: ui.colors.ink}}>
            <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl mx-auto flex items-center justify-center mb-4">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-white text-center">Summaries at a Glance</h3>

            <div className="space-y-3">
              <div className="bg-white/10 rounded-lg p-3">
                <div className="text-xs text-cyan-300 font-mono mb-1">TL;DR Format</div>
                <div className="text-sm text-white">Self-serve activation trended down 9% in Q2...</div>
              </div>
              <div className="bg-white/10 rounded-lg p-3">
                <div className="text-xs text-purple-300 mb-1">Thread Details</div>
                <div className="text-sm text-white">7 🧵 Additional context & artifacts</div>
              </div>
            </div>
          </div>
          <BorderBeam
            duration={5}
            size={250}
            colorFrom="#0ea5e9"
            colorTo="#06b6d4"
            borderWidth={2}
          />
        </div>

        {/* Desktop: Full BrowserFrame with analyze content (kept from original) */}
        <div className="hidden sm:block">
          <BrowserFrame title="Summarize" url="https://threadfolio.app/channels/launches">

            <div className="p-0 h-96 flex flex-col" style={{...ui.fontStyle(), backgroundColor: ui.colors.ink}}>
              <div className="flex-1 flex">
                <div className="w-64 border-r border-white/10">
                  <BlueprintLeftPanel
                    channels={[
                      { name: 'general' },
                      { name: 'launches', active: true },
                      { name: 'design' },
                    ]}
                  />
                </div>
                
                <div className="flex-1 flex">
                  <div className="flex-1 p-4 overflow-y-auto">
                    <div className={ui.entryCard("p-4 space-y-3")}>
                      <div className="flex items-start gap-3">
                        <div className={`${ui.classes.entryAvatar} flex items-center justify-center`}>Y</div>
                        <div className="flex-1">
                          <div className="text-sm text-slate-300 mb-2">You • 2 weeks ago</div>
                          <div className="text-sm text-zinc-100 leading-relaxed">
                            TL;DR: Self-serve activation trended down 9% in Q2. Lift activation + shorten time-to-value for new users. Re-tiered onboarding; shipped checklist + guided tour. Activation up 18% in 60 days; CAC stable. More details in the 🧵 below
                          </div>
                          <div className="mt-3">
                            <span className="inline-flex items-center gap-1 bg-slate-700/50 px-2 py-1 rounded-full text-xs">
                              7 🧵
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="w-80 border-l border-white/10 p-4 overflow-y-auto bg-slate-900/50">
                    <div className="text-sm text-slate-300 mb-4 font-medium">Thread</div>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className={`${ui.classes.replyAvatar} bg-purple-600 flex items-center justify-center`}>Y</div>
                        <div className="flex-1">
                          <div className="text-sm text-slate-300 mb-1">You • Context</div>
                          <div className="text-sm text-slate-200">Timeline was tight with eng + design teams stretched thin...</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </BrowserFrame>
          <BorderBeam
            duration={5}
            size={250}
            colorFrom="#0ea5e9"
            colorTo="#06b6d4"
            borderWidth={2}
          />
        </div>
      </div>
    )
  },
  {
    id: 'share',
    label: 'Share',
    content: (
      <div className="relative">
        {/* Mobile: Simple sharing preview */}
        <div className="block sm:hidden relative overflow-hidden rounded-2xl">
          <div className="p-6 space-y-4 relative z-10" style={{backgroundColor: ui.colors.ink}}>
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl mx-auto flex items-center justify-center mb-4">
              <Share2 className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-white text-center">Selective Sharing</h3>
            <div className="space-y-3">
              <div className="bg-white/10 rounded-lg p-3">
                <div className="text-xs text-green-300 mb-1">Public Portfolio</div>
                <div className="text-sm text-white flex items-center gap-2">
                  threadfolio.com/yourname 
                  <button className="text-xs bg-white/20 px-2 py-1 rounded">Copy</button>
                </div>
              </div>
              <div className="bg-white/10 rounded-lg p-3">
                <div className="text-xs text-amber-300 mb-1">Private Entry Share</div>
                <div className="text-sm text-white">Share single thread, keep rest locked</div>
              </div>
            </div>
          </div>
          <BorderBeam
            duration={4}
            size={180}
            reverse
            colorFrom="#a855f7"
            colorTo="#d946ef"
            borderWidth={2}
          />
        </div>

        {/* Desktop: Full BrowserFrame with share content (kept from original) */}
        <div className="hidden sm:block">
          <BrowserFrame title="Share" url="https://threadfolio.app/share">
            <div className="p-0 h-96 flex flex-col relative" style={{...ui.fontStyle(), backgroundColor: ui.colors.ink}}>
              {/* Share drawer overlay with backdrop */}
              <div className="absolute inset-0 bg-black/40 backdrop-blur-sm z-10 flex items-center justify-center">
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 max-w-sm mx-4">
                  <h3 className="text-lg font-semibold text-white mb-4 text-center">Share Options</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm text-zinc-300 mb-2">Public portfolio link</div>
                      <div className="flex gap-2">
                        <input 
                          className="flex-1 bg-white/10 border border-white/20 rounded px-3 py-2 text-sm text-white"
                          value="threadfolio.com/yourname"
                          readOnly
                        />
                        <button className="bg-white/20 hover:bg-white/30 px-3 py-2 rounded text-sm text-white">
                          Copy
                        </button>
                      </div>
                    </div>
                    
                    <div className="border-t border-white/20 pt-4">
                      <div className="text-sm text-zinc-300 mb-2">Share single entry</div>
                      <div className="flex gap-2 mb-2">
                        <select className="flex-1 bg-white/10 border border-white/20 rounded px-3 py-2 text-sm text-white">
                          <option>Select entry...</option>
                        </select>
                      </div>
                      <div className="flex gap-2">
                        <button className="bg-blue-600/30 border border-blue-500/30 px-3 py-2 rounded text-sm text-white">
                          Generate Link
                        </button>
                        <button className="bg-white/10 border border-white/20 px-3 py-2 rounded text-sm text-white">
                          Rotate
                        </button>
                        <button className="bg-white/10 border border-white/20 px-3 py-2 rounded text-sm text-white">
                          Expire
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 text-center">
                    <div className="text-sm text-zinc-400">Send your public link</div>
                    <div className="text-xs text-zinc-500">Or share a single entry from a private channel</div>
                  </div>
                </div>
              </div>
            </div>
          </BrowserFrame>
          <BorderBeam
            duration={4}
            size={180}
            reverse
            colorFrom="#a855f7"
            colorTo="#d946ef"
            borderWidth={2}
          />
        </div>
      </div>
    )
  }
]