'use client'

import React, { useRef, useEffect, useState, useCallback } from 'react'
import { BorderBeam } from '@/components/magicui/border-beam'

interface DemoState {
  channels: Array<{
    name: string
    active: boolean
    justCreated: boolean
  }>
  entries: Array<{
    id: string
    text: string
    file?: string
    likes: number
    replies: Array<{
      id: string
      text: string
    }>
  }>
  badges: {
    likes: number
    replies: number
  }
  currentScene: number
  sceneProgress: number
}

interface CursorState {
  x: number
  y: number
  trail: Array<{ x: number; y: number; opacity: number }>
}

interface CameraState {
  x: number
  y: number
  zoom: number
  targetX: number
  targetY: number
  targetZoom: number
  isStationary: boolean
  stationaryTimer: number
}

interface ClickEffect {
  x: number
  y: number
  progress: number
  id: string
}

interface HoverState {
  elementId: string
  isHovered: boolean
  hoverProgress: number
}

interface TypingState {
  text: string
  cursorVisible: boolean
  isTyping: boolean
  targetText: string
  context: 'none' | 'channel' | 'composer' | 'reply'
}

const DEMO_WIDTH = 1000
const DEMO_HEIGHT = 600
const LEFT_PANEL_WIDTH = 256
const HEADER_HEIGHT = 64

export function InteractiveDemo() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number | null>(null)
  
  const [demoState, setDemoState] = useState<DemoState>({
    channels: [
      { name: 'announcements', active: true, justCreated: false },
      { name: 'product-launches', active: false, justCreated: false },
      { name: 'coding-projects', active: false, justCreated: false }
    ],
    entries: [],
    badges: { likes: 0, replies: 0 },
    currentScene: 0,
    sceneProgress: 0
  })

  const [cursor, setCursor] = useState<CursorState>({
    x: DEMO_WIDTH / 2,
    y: DEMO_HEIGHT / 2,
    trail: []
  })

  const [camera, setCamera] = useState<CameraState>({
    x: DEMO_WIDTH / 2,
    y: DEMO_HEIGHT / 2,
    zoom: 1.15,
    targetX: DEMO_WIDTH / 2,
    targetY: DEMO_HEIGHT / 2,
    targetZoom: 1.15,
    isStationary: false,
    stationaryTimer: 0
  })

  const [clickEffects, setClickEffects] = useState<ClickEffect[]>([])
  const [hoverStates, setHoverStates] = useState<HoverState[]>([])
  const [typingState, setTypingState] = useState<TypingState>({
    text: '',
    cursorVisible: true,
    isTyping: false,
    targetText: '',
    context: 'none'
  })

  // UI/animation state for scene-specific effects
  const [uiState, setUiState] = useState({
    newChannelSlide: 0, // 0..1 slide-down of inline input
    underlineProgress: 0, // 0..1 success underline wipe
    channelPulse: 0, // 0..1 pulse after activation
    preHover: 'none' as 'none' | 'attach' | 'post' | 'like' | 'reply',
    hoverProgress: 0, // 0..1 hover intensity
    composerAttachment: undefined as string | undefined,
    likeFlipProgress: 0, // 0..1 number flip anim
    likePopProgress: 0, // 0..1 like pop anim,
    showAttachmentPicker: false,
    pickerSelection: 0,
    attachLoading: false,
    attachSpinnerAngle: 0
  })

  // Refs mirroring state for stable animation reads
  const cursorRef = useRef<CursorState>(cursor)
  const cameraRef = useRef<CameraState>(camera)
  const clickEffectsRef = useRef<ClickEffect[]>(clickEffects)
  const typingStateRef = useRef<TypingState>(typingState)
  const demoStateRef = useRef<DemoState>(demoState)
  const uiStateRef = useRef<typeof uiState>(uiState)

  useEffect(() => { cursorRef.current = cursor }, [cursor])
  useEffect(() => { cameraRef.current = camera }, [camera])
  useEffect(() => { clickEffectsRef.current = clickEffects }, [clickEffects])
  useEffect(() => { typingStateRef.current = typingState }, [typingState])
  useEffect(() => { demoStateRef.current = demoState }, [demoState])
  useEffect(() => { uiStateRef.current = uiState }, [uiState])

  // Easing functions
  const easeOutQuad = (t: number) => t * (2 - t)
  const easeOutBack = (t: number) => {
    const c1 = 1.70158
    const c3 = c1 + 1
    return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2)
  }
  const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)

  // Animation helpers
  const lerp = (start: number, end: number, factor: number) => {
    return start + (end - start) * factor
  }

  // Text utilities
  const wrapText = (ctx: CanvasRenderingContext2D, text: string, maxWidth: number, lineHeight: number) => {
    const paragraphs = text.split(/\n/g)
    const lines: string[] = []
    paragraphs.forEach((para, pIdx) => {
      if (para.trim().length === 0) {
        lines.push('')
        return
      }
      const words = para.split(/\s+/g)
      let line = ''
      for (const w of words) {
        const test = line ? line + ' ' + w : w
        if (ctx.measureText(test).width <= maxWidth) {
          line = test
        } else {
          if (line) lines.push(line)
          line = w
        }
      }
      if (line) lines.push(line)
      if (pIdx < paragraphs.length - 1) lines.push('')
    })
    return lines
  }

  const WELCOME_TEXT = `Welcome to My Product Marketing Portfolio!

Hey there! 👋 I'm Jovanny Tovar, and this is my interactive portfolio. Think of it as a behind-the-scenes look at how I approach product marketing.

You'll find:
Real campaign results (the good, the bad, and the "let's never do that again")
Strategic frameworks that actually worked
The story behind the metrics

Poke around the channels, and feel free to ask me anything about the work. The door's always open!

Pro tip: Try typing /resume in below in the input field to download my resume, or just click around to see projects in action.

What would you like to explore first?`

  // Draw functions
  const drawBackground = (ctx: CanvasRenderingContext2D) => {
    // Ink background
    ctx.fillStyle = '#0f0f23'
    ctx.fillRect(0, 0, DEMO_WIDTH, DEMO_HEIGHT)
  }

  const drawLeftPanel = (ctx: CanvasRenderingContext2D) => {
    const ds = demoStateRef.current ?? demoState
    const ts = typingStateRef.current ?? typingState
    const ui = uiStateRef.current ?? uiState
    // Panel background with glass effect
    ctx.fillStyle = 'rgba(30, 30, 50, 0.8)'
    ctx.fillRect(0, 0, LEFT_PANEL_WIDTH, DEMO_HEIGHT)
    
    // Border
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)'
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(LEFT_PANEL_WIDTH, 0)
    ctx.lineTo(LEFT_PANEL_WIDTH, DEMO_HEIGHT)
    ctx.stroke()

    // "CHANNELS" title
    ctx.fillStyle = 'rgba(255, 255, 255, 0.6)'
    ctx.font = '11px system-ui'
    ctx.fillText('C H A N N E L S', 16, 32) // Manual letter spacing

    // Plus button
    const plusX = LEFT_PANEL_WIDTH - 32
    const plusY = 20
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)'
    ctx.lineWidth = 1.5
    ctx.beginPath()
    ctx.roundRect(plusX, plusY, 16, 16, 3)
    ctx.stroke()
    
    // Plus icon
    ctx.beginPath()
    ctx.moveTo(plusX + 4, plusY + 8)
    ctx.lineTo(plusX + 12, plusY + 8)
    ctx.moveTo(plusX + 8, plusY + 4)
    ctx.lineTo(plusX + 8, plusY + 12)
    ctx.stroke()

    // Channel list
    ds.channels.forEach((channel: DemoState['channels'][number], index: number) => {
      // Slide-down for a newly created empty channel
      const baseY = 60 + index * 32
      const slideOffset = channel.name === '' ? -10 * (1 - ui.newChannelSlide) : 0
      const y = baseY + slideOffset
      const isActive = channel.active
      const isEmpty = channel.name === ''
      
      // Background for active channel
      if (isActive) {
        // Base active background
        ctx.fillStyle = 'rgba(139, 92, 246, 0.2)'
        ctx.fillRect(8, y - 4, LEFT_PANEL_WIDTH - 16, 24)
        ctx.fillStyle = 'rgba(139, 92, 246, 0.4)'
        ctx.fillRect(0, y - 4, 3, 24)

        // Gentle pulse overlay after activation
        if (ui.channelPulse > 0) {
          const pulseAlpha = Math.max(0, 0.4 * (1 - ui.channelPulse))
          ctx.fillStyle = `rgba(139, 92, 246, ${pulseAlpha})`
          ctx.fillRect(8, y - 4, LEFT_PANEL_WIDTH - 16, 24)
        }
      }
      

      // Hash symbol
      ctx.fillStyle = isActive ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.5)'
      ctx.font = '14px system-ui'
      ctx.fillText('#', 16, y + 12)

      // Channel name or input field
      if (isEmpty) {
        // Show input background for new channel being created
        ctx.fillStyle = 'rgba(30, 30, 45, 0.8)'
        ctx.fillRect(30, y - 2, LEFT_PANEL_WIDTH - 45, 20)
        ctx.strokeStyle = 'rgba(139, 92, 246, 0.6)'
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.roundRect(30, y - 2, LEFT_PANEL_WIDTH - 45, 20, 3)
        ctx.stroke()
        
        // Show typing text if available
        if (ts.text && ts.context === 'channel') {
          ctx.fillStyle = 'rgba(255, 255, 255, 0.9)'
          ctx.font = '14px system-ui'
          ctx.fillText(ts.text, 35, y + 12)
        }
        
        // Show cursor if typing
        if (ts.cursorVisible && ts.isTyping && ts.context === 'channel') {
          const textWidth = ctx.measureText(ts.text).width
          ctx.fillStyle = 'rgba(139, 92, 246, 0.8)'
          ctx.fillRect(35 + textWidth, y + 4, 1, 12)
        }
      } else {
        // Normal channel name
        ctx.fillStyle = isActive ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.7)'
        ctx.font = '14px system-ui'
        ctx.fillText(channel.name, 32, y + 12)
      }

      // Success underline for just created
      if (channel.justCreated) {
        ctx.strokeStyle = 'rgba(34, 197, 94, 0.8)'
        ctx.lineWidth = 2
        ctx.beginPath()
        const maxLen = Math.max(channel.name.length * 8, 60)
        const wipeLen = maxLen * Math.min(1, ui.underlineProgress)
        ctx.moveTo(16, y + 18)
        ctx.lineTo(16 + wipeLen, y + 18)
        ctx.stroke()
      }
    })
  }

  const drawMainArea = (ctx: CanvasRenderingContext2D) => {
    const ds = demoStateRef.current ?? demoState
    const mainX = LEFT_PANEL_WIDTH
    const mainWidth = DEMO_WIDTH - LEFT_PANEL_WIDTH

    // Header
    ctx.fillStyle = 'rgba(30, 30, 50, 0.9)'
    ctx.fillRect(mainX, 0, mainWidth, HEADER_HEIGHT)
    
    // Header border
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)'
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(mainX, HEADER_HEIGHT)
    ctx.lineTo(DEMO_WIDTH, HEADER_HEIGHT)
    ctx.stroke()

    // Active channel name with # symbol
    const activeChannel = ds.channels.find(c => c.active)
    if (activeChannel) {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)'
      ctx.font = 'bold 18px system-ui'
      ctx.fillText(`# ${activeChannel.name}`, mainX + 20, 35)
    }

    // Career milestones subtitle
    ctx.fillStyle = 'rgba(255, 255, 255, 0.6)'
    ctx.font = '12px system-ui'
    ctx.fillText('Career milestones and major achievements', mainX + 20, 52)

    // Entries area (main content)
    const entryAreaY = HEADER_HEIGHT + 20
    const entryAreaHeight = DEMO_HEIGHT - HEADER_HEIGHT - 120 // Leave space for composer at bottom

    // Entries
    let entryY = entryAreaY + 20
    ds.entries.forEach((entry: DemoState['entries'][number], index: number) => {
      drawEntry(ctx, mainX + 20, entryY, entry)
      entryY += 100 + entry.replies.length * 60
    })

    // Composer at bottom (like Discord/Slack)
    const composerY = DEMO_HEIGHT - 80
    drawComposer(ctx, mainX + 20, composerY)
  }

  const drawAttachmentPicker = (ctx: CanvasRenderingContext2D) => {
    const ui = uiStateRef.current ?? uiState
    if (!ui.showAttachmentPicker) return
    ctx.save()
    // Compute composer geometry to anchor menu by the attach button
    const mainX = LEFT_PANEL_WIDTH
    const composerY = DEMO_HEIGHT - 80
    const x = mainX + 20
    const inputX = x + 60
    const inputY = composerY + 12
    const composerWidth = DEMO_WIDTH - LEFT_PANEL_WIDTH - 40
    const inputWidth = composerWidth - 180
    const attachX = inputX + inputWidth + 12
    // Menu size and position (to the upper-left of the attach button)
    const mw = 240, mh = 160
    let mx = attachX - mw - 8
    let my = inputY - mh - 8
    if (mx < 8) mx = 8
    if (my < 8) my = 8

    // Panel
    ctx.fillStyle = 'rgba(30, 30, 50, 0.98)'
    ctx.beginPath()
    ctx.roundRect(mx, my, mw, mh, 10)
    ctx.fill()
    ctx.strokeStyle = 'rgba(255,255,255,0.08)'
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.roundRect(mx, my, mw, mh, 10)
    ctx.stroke()

    // Options
    const options = ['launch_brief.pdf', 'sprint_plan.png', 'budget.xlsx']
    ctx.font = '13px system-ui'
    options.forEach((opt, i) => {
      const oy = my + 28 + i * 28
      const selected = i === ui.pickerSelection
      ctx.fillStyle = selected ? 'rgba(139, 92, 246, 0.25)' : 'rgba(50, 50, 70, 0.6)'
      ctx.beginPath()
      ctx.roundRect(mx + 12, oy - 16, mw - 24, 24, 8)
      ctx.fill()
      ctx.fillStyle = 'rgba(255,255,255,0.9)'
      ctx.fillText(opt, mx + 24, oy)
    })

    // Launch button
    const bx = mx + mw - 88
    const by = my + mh - 36
    ctx.fillStyle = 'rgba(139, 92, 246, 0.9)'
    ctx.beginPath()
    ctx.roundRect(bx, by, 76, 26, 8)
    ctx.fill()
    ctx.fillStyle = 'white'
    ctx.font = '12px system-ui'
    ctx.fillText('Launch', bx + 16, by + 18)
    ctx.restore()
  }

  const drawComposer = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
    const ts = typingStateRef.current ?? typingState
    const ui = uiStateRef.current ?? uiState
    const composerWidth = DEMO_WIDTH - LEFT_PANEL_WIDTH - 40
    const composerHeight = 80

    // Composer card background
    ctx.fillStyle = 'rgba(40, 40, 60, 0.9)'
    ctx.beginPath()
    ctx.roundRect(x, y, composerWidth, composerHeight, 12)
    ctx.fill()

    // Subtle border
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)'
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.roundRect(x, y, composerWidth, composerHeight, 12)
    ctx.stroke()

    // Avatar
    ctx.fillStyle = 'rgba(139, 92, 246, 0.8)'
    ctx.beginPath()
    ctx.arc(x + 25, y + 25, 20, 0, Math.PI * 2)
    ctx.fill()
    ctx.fillStyle = 'white'
    ctx.font = 'bold 14px system-ui'
    ctx.fillText('U', x + 21, y + 30)

    // Input area
    const inputX = x + 60
    const inputY = y + 12
    const inputWidth = composerWidth - 180
    const inputHeight = 32

    ctx.fillStyle = 'rgba(20, 20, 35, 0.8)'
    ctx.beginPath()
    ctx.roundRect(inputX, inputY, inputWidth, inputHeight, 6)
    ctx.fill()

    // Input text (clipped to field)
    if (ts.text && ts.context === 'composer') {
      ctx.save()
      ctx.beginPath()
      ctx.rect(inputX + 6, inputY + 4, inputWidth - 12, inputHeight - 8)
      ctx.clip()
      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)'
      ctx.font = '14px system-ui'
      ctx.fillText(ts.text, inputX + 12, inputY + 22)
      ctx.restore()
    }

    // Typing cursor
    if (ts.cursorVisible && ts.isTyping && ts.context === 'composer') {
      const textWidth = ctx.measureText(ts.text).width
      const maxTextW = inputWidth - 24
      const caretX = inputX + 12 + Math.min(textWidth, maxTextW)
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)'
      ctx.fillRect(caretX, inputY + 8, 1, 16)
    }

    // Attach button
    const attachX = inputX + inputWidth + 12
    // Attach button
    const isAttachHover = ui.preHover === 'attach'
    const attachGlow = ui.hoverProgress * (isAttachHover ? 1 : 0)
    ctx.save()
    if (attachGlow > 0) {
      ctx.shadowColor = 'rgba(139, 92, 246, 0.5)'
      ctx.shadowBlur = 10 * attachGlow
    }
    ctx.fillStyle = 'rgba(60, 60, 80, 0.8)'
    ctx.beginPath()
    ctx.roundRect(attachX, inputY, 32, 32, 6)
    ctx.fill()
    ctx.restore()
    
    // Attach icon: plus by default; spinner when loading
    if (ui.attachLoading) {
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.85)'
      ctx.lineWidth = 2
      ctx.beginPath()
      const a0 = ui.attachSpinnerAngle
      ctx.arc(attachX + 16, inputY + 16, 8, a0, a0 + Math.PI * 1.3)
      ctx.stroke()
    } else {
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)'
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.moveTo(attachX + 16, inputY + 10)
      ctx.lineTo(attachX + 16, inputY + 22)
      ctx.moveTo(attachX + 10, inputY + 16)
      ctx.lineTo(attachX + 22, inputY + 16)
      ctx.stroke()
    }

    // Post button
    const postX = attachX + 44
    const isPostHover = ui.preHover === 'post'
    const postGlow = ui.hoverProgress * (isPostHover ? 1 : 0)
    ctx.save()
    if (postGlow > 0) {
      ctx.shadowColor = 'rgba(139, 92, 246, 0.6)'
      ctx.shadowBlur = 12 * postGlow
    }
    ctx.fillStyle = 'rgba(139, 92, 246, 0.8)'
    ctx.beginPath()
    ctx.roundRect(postX, inputY, 50, 32, 6)
    ctx.fill()
    ctx.restore()
    ctx.fillStyle = 'white'
    ctx.font = '12px system-ui'
    ctx.fillText('Post', postX + 16, inputY + 21)

    // File attachment chip (if present)
    if (ui.composerAttachment) {
      ctx.save()
      ctx.fillStyle = 'rgba(60, 60, 80, 0.9)'
      ctx.beginPath()
      ctx.roundRect(inputX + 8, y + 50, 160, 20, 6)
      ctx.fill()
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)'
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.roundRect(inputX + 8, y + 50, 160, 20, 6)
      ctx.stroke()
      ctx.restore()
      ctx.fillStyle = 'rgba(255, 255, 255, 0.85)'
      ctx.font = '11px system-ui'
      ctx.fillText(`📎 ${ui.composerAttachment}`, inputX + 16, y + 64)
    }
  }

  const drawEntry = (ctx: CanvasRenderingContext2D, x: number, y: number, entry: any) => {
    const ui = uiStateRef.current ?? uiState
    const entryWidth = DEMO_WIDTH - LEFT_PANEL_WIDTH - 40
    // Compute wrapped lines for text block
    ctx.font = 'semibold 14px system-ui'
    const textX = x + 55
    const textMaxWidth = entryWidth - 70
    const lines = wrapText(ctx, entry.text, textMaxWidth, 18)
    const MAX_VISIBLE_LINES = 9
    const truncated = lines.length > MAX_VISIBLE_LINES
    const visibleLines = truncated ? lines.slice(0, MAX_VISIBLE_LINES) : lines
    const textBlockH = Math.max(18, visibleLines.length * 18)
    // Dynamic height: paddings + text + (optional file) + chips row space
    let entryHeight = 30 + textBlockH + 14 // top padding ~12 + baseline space
    if (truncated) entryHeight += 22 // space for 'See more'
    if (entry.file) entryHeight += 36
    entryHeight += 28 // chips row

    // Entry card background with subtle shadow
    ctx.save()
    ctx.shadowColor = 'rgba(0, 0, 0, 0.3)'
    ctx.shadowBlur = 8
    ctx.shadowOffsetY = 2
    ctx.fillStyle = 'rgba(40, 40, 60, 0.9)'
    ctx.beginPath()
    ctx.roundRect(x, y, entryWidth, entryHeight, 12)
    ctx.fill()
    ctx.restore()

    // Subtle border
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)'
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.roundRect(x, y, entryWidth, entryHeight, 12)
    ctx.stroke()

    // Avatar
    ctx.fillStyle = 'rgba(139, 92, 246, 0.8)'
    ctx.beginPath()
    ctx.arc(x + 25, y + 25, 18, 0, Math.PI * 2)
    ctx.fill()
    ctx.fillStyle = 'white'
    ctx.font = 'bold 12px system-ui'
    ctx.fillText('U', x + 22, y + 29)

    // Entry text (wrapped)
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)'
    ctx.font = 'semibold 14px system-ui'
    let ty = y + 22
    for (const ln of visibleLines) {
      ty += 18
      ctx.fillText(ln, textX, ty)
    }
    // If truncated, draw a subtle gradient + 'See more' link
    if (truncated) {
      const gradYTop = y + 30 + textBlockH - 18
      const grad = ctx.createLinearGradient(0, gradYTop, 0, gradYTop + 18)
      grad.addColorStop(0, 'rgba(15,15,35,0)')
      grad.addColorStop(1, 'rgba(15,15,35,0.75)')
      ctx.fillStyle = grad
      ctx.fillRect(textX, gradYTop, textMaxWidth, 18)
      ctx.fillStyle = 'rgba(139, 92, 246, 0.95)'
      ctx.font = '12px system-ui'
      ctx.fillText('See more', textX, y + 30 + textBlockH + 12)
    }

    // File attachment (if present)
    if (entry.file) {
      const fileY = y + 30 + textBlockH + (truncated ? 28 : 6)
      ctx.save()
      ctx.shadowColor = 'rgba(0, 0, 0, 0.2)'
      ctx.shadowBlur = 4
      ctx.fillStyle = 'rgba(60, 60, 80, 0.8)'
      ctx.beginPath()
      ctx.roundRect(x + 55, fileY, 160, 24, 6)
      ctx.fill()
      ctx.restore()
      
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)'
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.roundRect(x + 55, fileY, 160, 24, 6)
      ctx.stroke()
      
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)'
      ctx.font = '11px system-ui'
      ctx.fillText(`📎 ${entry.file}`, x + 62, fileY + 16)
    }

    // Slack-like reaction chips row (left-aligned under text)
    const isLikeHover = ui.preHover === 'like'
    const likeGlow = ui.hoverProgress * (isLikeHover ? 1 : 0)
    const pop = ui.likePopProgress
    const chipsY = y + entryHeight - 26
    let chipX = x + 55
    ctx.font = '12px system-ui'

    // Reaction chip: 👍 count (single text, no overlay)
    const likeText = `👍 ${entry.likes}`
    const likeTextWidth = ctx.measureText(likeText).width
    const likeChipW = Math.ceil(likeTextWidth) + 12 + 4 * pop
    const likeChipH = 20 + 2 * pop
    ctx.save()
    if (entry.likes > 0 || likeGlow > 0) {
      ctx.shadowColor = 'rgba(59, 130, 246, 0.4)'
      ctx.shadowBlur = 6 * Math.max(1, likeGlow)
    }
    ctx.fillStyle = entry.likes > 0 ? 'rgba(59, 130, 246, 0.9)' : 'rgba(60, 60, 80, 0.8)'
    ctx.beginPath()
    ctx.roundRect(chipX, chipsY, likeChipW, likeChipH, 10)
    ctx.fill()
    ctx.restore()
    ctx.fillStyle = 'white'
    ctx.fillText(likeText, chipX + 8, chipsY + 14)
    chipX += likeChipW + 8

    // Thread chip: 💬 count (no word)
    const threadText = `💬 ${entry.replies.length}`
    const threadTextWidth = ctx.measureText(threadText).width
    const threadChipW = Math.ceil(threadTextWidth) + 12
    const threadChipH = 20
    ctx.fillStyle = 'rgba(60, 60, 80, 0.8)'
    ctx.beginPath()
    ctx.roundRect(chipX, chipsY, threadChipW, threadChipH, 10)
    ctx.fill()
    ctx.fillStyle = 'rgba(255, 255, 255, 0.85)'
    ctx.fillText(threadText, chipX + 8, chipsY + 14)

    // Draw replies
    entry.replies.forEach((reply: any, index: number) => {
      drawReply(ctx, x + 40, y + entryHeight + 20 + index * 50, reply)
    })

    // Reply input under the entry
    const replyInputY = y + entryHeight + 28 + entry.replies.length * 50
    const replyInputX = x + 40
    const replyInputWidth = DEMO_WIDTH - LEFT_PANEL_WIDTH - 80 - 40
    const isReplyHover = ui.preHover === 'reply'
    const replyGlow = ui.hoverProgress * (isReplyHover ? 1 : 0)
    ctx.save()
    if (replyGlow > 0) {
      ctx.shadowColor = 'rgba(59, 130, 246, 0.4)'
      ctx.shadowBlur = 10 * replyGlow
    }
    ctx.fillStyle = 'rgba(28, 28, 44, 0.85)'
    ctx.beginPath()
    ctx.roundRect(replyInputX, replyInputY, replyInputWidth, 28, 8)
    ctx.fill()
    ctx.restore()
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)'
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.roundRect(replyInputX, replyInputY, replyInputWidth, 28, 8)
    ctx.stroke()
    // Placeholder or typing text
    ctx.font = '12px system-ui'
    const ts = typingStateRef.current ?? typingState
    if (ts.context === 'reply') {
      if (ts.text) {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)'
        ctx.fillText(ts.text, replyInputX + 12, replyInputY + 18)
      }
      if (ts.cursorVisible) {
        const w = ctx.measureText(ts.text).width
        ctx.fillStyle = 'rgba(255, 255, 255, 0.85)'
        ctx.fillRect(replyInputX + 12 + w, replyInputY + 6, 1, 16)
      }
    } else {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.35)'
      ctx.fillText('Reply…', replyInputX + 12, replyInputY + 18)
    }
  }

  const drawReply = (ctx: CanvasRenderingContext2D, x: number, y: number, reply: any) => {
    const replyWidth = DEMO_WIDTH - LEFT_PANEL_WIDTH - 80

    // Reply card background
    ctx.fillStyle = 'rgba(35, 35, 55, 0.8)'
    ctx.beginPath()
    ctx.roundRect(x, y, replyWidth, 40, 8)
    ctx.fill()

    // Small avatar
    ctx.fillStyle = 'rgba(34, 197, 94, 0.8)'
    ctx.beginPath()
    ctx.arc(x + 15, y + 15, 12, 0, Math.PI * 2)
    ctx.fill()
    ctx.fillStyle = 'white'
    ctx.font = 'bold 10px system-ui'
    ctx.fillText('R', x + 12, y + 19)

    // Reply text
    ctx.fillStyle = 'rgba(255, 255, 255, 0.85)'
    ctx.font = '13px system-ui'
    ctx.fillText(reply.text, x + 35, y + 20)
  }

  const drawCursor = (ctx: CanvasRenderingContext2D) => {
    const cur = cursorRef.current ?? cursor
    // Draw trail
    cur.trail.forEach((point: CursorState['trail'][number], index: number) => {
      const alpha = point.opacity * (index / Math.max(1, cur.trail.length))
      ctx.fillStyle = `rgba(139, 92, 246, ${alpha * 0.3})`
      ctx.beginPath()
      ctx.arc(point.x, point.y, 2, 0, Math.PI * 2)
      ctx.fill()
    })

    // Draw main cursor with glow
    ctx.save()
    ctx.shadowColor = 'rgba(139, 92, 246, 0.6)'
    ctx.shadowBlur = 8
    ctx.fillStyle = 'white'
    ctx.beginPath()
    ctx.moveTo(cur.x, cur.y)
    ctx.lineTo(cur.x + 12, cur.y + 4)
    ctx.lineTo(cur.x + 7, cur.y + 7)
    ctx.lineTo(cur.x + 4, cur.y + 12)
    ctx.closePath()
    ctx.fill()
    ctx.restore()
  }

  const drawClickEffects = (ctx: CanvasRenderingContext2D) => {
    const effects = clickEffectsRef.current ?? clickEffects
    effects.forEach((effect: ClickEffect) => {
      const radius = effect.progress * 24
      const alpha = 1 - effect.progress
      
      ctx.strokeStyle = `rgba(139, 92, 246, ${alpha * 0.8})`
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.arc(effect.x, effect.y, radius, 0, Math.PI * 2)
      ctx.stroke()
    })
  }

  // Animation loop
  const animate = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, DEMO_WIDTH, DEMO_HEIGHT)

    // Apply camera transform
    ctx.save()
    const cam = cameraRef.current ?? camera
    ctx.translate(canvas.width / 2, canvas.height / 2)
    ctx.scale(cam.zoom, cam.zoom)
    ctx.translate(-cam.x, -cam.y)

    // Draw UI (picker below cursor; cursor on top)
    drawBackground(ctx)
    drawLeftPanel(ctx)
    drawMainArea(ctx)
    drawAttachmentPicker(ctx)
    drawClickEffects(ctx)
    drawCursor(ctx)

    ctx.restore()

    // Update camera with clamping to prevent showing outside the workspace
    setCamera(prev => {
      const newX = lerp(prev.x, prev.targetX, 0.08)
      const newY = lerp(prev.y, prev.targetY, 0.08)
      
      // Check if cursor is moving (significant change in position)
      const isMoving = Math.abs(prev.targetX - prev.x) > 5 || Math.abs(prev.targetY - prev.y) > 5
      
      if (isMoving) {
        // Ease toward target zoom even during movement
        const nextZoom = lerp(prev.zoom, prev.targetZoom, 0.06)
        const halfW = (canvas.width / nextZoom) / 2
        const halfH = (canvas.height / nextZoom) / 2
        const clampedX = Math.max(halfW, Math.min(newX, DEMO_WIDTH - halfW))
        const clampedY = Math.max(halfH, Math.min(newY, DEMO_HEIGHT - halfH))
        return {
          ...prev,
          x: clampedX,
          y: clampedY,
          zoom: nextZoom,
          isStationary: false,
          stationaryTimer: 0
        }
      } else {
        // Increment stationary timer
        const newTimer = prev.stationaryTimer + 1
        const shouldZoom = newTimer > 30 && !prev.isStationary // Wait ~500ms at 60fps
        const nextZoom = lerp(prev.zoom, shouldZoom ? prev.targetZoom : prev.zoom, 0.05)
        const halfW = (canvas.width / nextZoom) / 2
        const halfH = (canvas.height / nextZoom) / 2
        const clampedX = Math.max(halfW, Math.min(newX, DEMO_WIDTH - halfW))
        const clampedY = Math.max(halfH, Math.min(newY, DEMO_HEIGHT - halfH))
        return {
          ...prev,
          x: clampedX,
          y: clampedY,
          zoom: nextZoom,
          isStationary: shouldZoom || prev.isStationary,
          stationaryTimer: newTimer
        }
      }
    })

    // Update cursor trail
    setCursor(prev => ({
      ...prev,
      trail: [
        { x: prev.x, y: prev.y, opacity: 1 },
        ...prev.trail.slice(0, 8).map(p => ({ ...p, opacity: p.opacity * 0.9 }))
      ].filter(p => p.opacity > 0.1)
    }))

    // Update click effects
    setClickEffects(prev => 
      prev.map(effect => ({
        ...effect,
        progress: Math.min(effect.progress + 0.05, 1)
      })).filter(effect => effect.progress < 1)
    )

    // Update typing cursor blink
    setTypingState(prev => ({
      ...prev,
      cursorVisible: Date.now() % 1400 < 700
    }))

    // Update UI animation progressions
    setUiState(prev => {
      let { newChannelSlide, underlineProgress, channelPulse, preHover, hoverProgress, composerAttachment, likeFlipProgress, likePopProgress, attachSpinnerAngle } = prev

      // Slide in if an empty channel exists
      const ds = demoStateRef.current ?? demoState
      const hasEmpty = ds.channels.some(c => c.name === '')
      if (hasEmpty && newChannelSlide < 1) newChannelSlide = Math.min(1, newChannelSlide + 0.08)

      // Underline wipe when any channel.justCreated is true
      const hasJustCreated = ds.channels.some(c => c.justCreated)
      if (hasJustCreated && underlineProgress < 1) underlineProgress = Math.min(1, underlineProgress + 0.12)

      // Channel activation pulse decay
      if (channelPulse < 1 && hasJustCreated) channelPulse = Math.min(1, channelPulse + 0.06)
      else if (!hasJustCreated && channelPulse > 0) channelPulse = Math.max(0, channelPulse - 0.04)

      // Hover progress ease
      const targetHover = preHover === 'none' ? 0 : 1
      hoverProgress = lerp(hoverProgress, targetHover, 0.18)

      // Like animations
      if (likeFlipProgress > 0 && likeFlipProgress < 1) likeFlipProgress = Math.min(1, likeFlipProgress + 0.1)
      if (likePopProgress > 0 && likePopProgress < 1) likePopProgress = Math.min(1, likePopProgress + 0.12)
      if (likePopProgress >= 1) likePopProgress = 0 // settle back

      // Attach spinner rotation when loading
      if (prev.attachLoading) {
        attachSpinnerAngle = (attachSpinnerAngle + 0.25) % (Math.PI * 2)
      }

      return { ...prev, newChannelSlide, underlineProgress, channelPulse, preHover, hoverProgress, composerAttachment, likeFlipProgress, likePopProgress, attachSpinnerAngle }
    })

    animationRef.current = requestAnimationFrame(animate)
  }, [])

  // Scene-based demo sequence (Scenes 1–8)
  const runDemoSequence = useCallback(async () => {
    // Wait for initial load
    await new Promise(resolve => setTimeout(resolve, 900))

    // Scene 1 — Approach plus to create channel
    await moveCursorTo(LEFT_PANEL_WIDTH - 24, 28, 800)
    await setZoomTarget(1.35)
    await new Promise(resolve => setTimeout(resolve, 300))

    // Scene 2 — Click plus (ripple + punch zoom), show inline input slide-down
    await clickAt(LEFT_PANEL_WIDTH - 24, 28)
    const newChannelIndex = (demoStateRef.current ?? demoState).channels.length
    setDemoState(prev => {
      // Guard: avoid creating two empty channels if sequence triggers twice
      if (prev.channels.some(ch => ch.name === '')) return prev
      return {
        ...prev,
        channels: [...prev.channels, { name: '', active: false, justCreated: false }]
      }
    })
    setUiState(prev => ({ ...prev, newChannelSlide: 0 }))
    // Show blinking caret in inline input before typing
    setTypingState(prev => ({ ...prev, context: 'channel', isTyping: true, text: '' }))
    await new Promise(resolve => setTimeout(resolve, 500))

    // Scene 3 — Type channel name with fast forward; press Enter; success underline; pulse active
    const channelInputY = 60 + newChannelIndex * 32
    await moveCursorTo(48, channelInputY, 500)
    await setZoomTarget(1.6)
    await new Promise(resolve => setTimeout(resolve, 250))
    await typeText('marketing-campaigns', 'channel', { normalDelayMs: 70, normalCharsCount: 10, fastForwardDelay: 220 })
    // Simulate Enter and activate
    setDemoState(prev => ({
      ...prev,
      channels: prev.channels.map((ch, i) => i === newChannelIndex
        ? { ...ch, name: 'marketing-campaigns', active: true, justCreated: true }
        : { ...ch, active: false })
    }))
    setUiState(prev => ({ ...prev, underlineProgress: 0, channelPulse: 0 }))
    await new Promise(resolve => setTimeout(resolve, 700))
    await setZoomTarget(1.0)

    // Scene 4 — Move to composer attach button, open picker, select file, then move to input
    const composerInputX = LEFT_PANEL_WIDTH + 80
    const composerInputY = DEMO_HEIGHT - 68
    // Precompute composer geometry for attach/post buttons
    const composerWidth = DEMO_WIDTH - LEFT_PANEL_WIDTH - 40
    const inputWidth = composerWidth - 180
    const attachXAbs = composerInputX + inputWidth + 12
    const postLeftXAbs = attachXAbs + 44
    // Hover attach then click to open picker
    await moveCursorTo(attachXAbs + 16, composerInputY + 28, 700)
    setUiState(prev => ({ ...prev, preHover: 'attach' }))
    await setZoomTarget(1.4)
    await new Promise(resolve => setTimeout(resolve, 250))
    await clickAt(attachXAbs + 16, composerInputY + 28)
    setUiState(prev => ({ ...prev, showAttachmentPicker: true, pickerSelection: 0 }))
    // Picker geometry (must mirror drawAttachmentPicker)
    const mw = 240, mh = 160
    let mx = attachXAbs - mw - 8
    let my = (composerInputY + 12) - mh - 8
    if (mx < 8) mx = 8
    if (my < 8) my = 8
    // First option center
    const optOY = my + 28 // baseline of first option text
    const optRectYTop = optOY - 16
    const optCenterY = optRectYTop + 12
    const optCenterX = mx + 12 + (mw - 24) / 2
    await moveCursorTo(optCenterX, optCenterY, 650, 'inOutCubic')
    await clickAt(optCenterX, optCenterY)
    // Launch button center
    const bx = mx + mw - 88
    const by = my + mh - 36
    const launchCX = bx + 38
    const launchCY = by + 13
    await moveCursorTo(launchCX, launchCY, 500, 'inOutCubic')
    await clickAt(launchCX, launchCY)
    // Simulate loading on the attach button
    setUiState(prev => ({ ...prev, attachLoading: true }))
    await new Promise(resolve => setTimeout(resolve, 700))
    setUiState(prev => ({ ...prev, showAttachmentPicker: false, composerAttachment: 'launch_brief.pdf', preHover: 'none', attachLoading: false }))
    // Move to input and zoom for typing
    await moveCursorTo(composerInputX + 12, composerInputY + 16, 500)
    await setZoomTarget(1.7)
    await new Promise(resolve => setTimeout(resolve, 200))

    // Scene 5 — Type text: slow first few letters then fast-forward full message
    await typeText(WELCOME_TEXT, 'composer', { normalDelayMs: 70, normalCharsCount: 7, fastForwardDelay: 220 })
    await new Promise(resolve => setTimeout(resolve, 400))

    // Scene 6 — Post the entry (click exact button center)
    const postCenterX = postLeftXAbs + 25
    const postCenterY = composerInputY + 16
    await moveCursorTo(postCenterX, postCenterY, 800, 'inOutCubic')
    await clickAt(postCenterX, postCenterY)
    await setZoomTarget(1.25)
    // Display as entry
    setDemoState(prev => ({
      ...prev,
      entries: [{ id: '1', text: WELCOME_TEXT, file: 'launch_brief.pdf', likes: 0, replies: [] }]
    }))

    await new Promise(resolve => setTimeout(resolve, 800))

    // Scene 7 — Like the entry (pre-hover, click, pop and flip) — Slack-like reaction chip center
    const firstEntryY = HEADER_HEIGHT + 40
    const entryX = LEFT_PANEL_WIDTH + 20
    const entryHeightForCalc = 100
    const chipW = 36, chipH = 20
    // chipsY for entries with file is y + 76, so center is +86
    const reactionY = firstEntryY + 86 - chipH / 2
    const likeCenterX = entryX + 55 + chipW / 2
    const likeCenterY = reactionY + chipH / 2
    await moveCursorTo(likeCenterX, likeCenterY, 600)
    setUiState(prev => ({ ...prev, preHover: 'like' }))
    await new Promise(resolve => setTimeout(resolve, 400))
    await clickAt(likeCenterX, likeCenterY)
    // Trigger like animations and increment
    setUiState(prev => ({ ...prev, likeFlipProgress: 0.01, likePopProgress: 0.01, preHover: 'none' }))
    setDemoState(prev => ({
      ...prev,
      entries: prev.entries.map(e => e.id === '1' ? { ...e, likes: 1 } : e)
    }))
    await new Promise(resolve => setTimeout(resolve, 900))

    // Scene 8 — First reply: move to Reply input under the entry
    const replyInputY = HEADER_HEIGHT + 100
    const replyInputX = LEFT_PANEL_WIDTH + 60
    await moveCursorTo(replyInputX, replyInputY, 700)
    setUiState(prev => ({ ...prev, preHover: 'reply' }))
    setTypingState(prev => ({ ...prev, context: 'reply', isTyping: true, text: '' }))
    await setZoomTarget(1.35)
    await new Promise(resolve => setTimeout(resolve, 1200))

    // Reset and restart
    await setZoomTarget(1.0)
    await new Promise(resolve => setTimeout(resolve, 800))

    setDemoState({
      channels: [
        { name: 'announcements', active: true, justCreated: false },
        { name: 'product-launches', active: false, justCreated: false },
        { name: 'coding-projects', active: false, justCreated: false }
      ],
      entries: [],
      badges: { likes: 0, replies: 0 },
      currentScene: 0,
      sceneProgress: 0
    })
    setTypingState({ text: '', cursorVisible: true, isTyping: false, targetText: '', context: 'none' })
    setUiState({ newChannelSlide: 0, underlineProgress: 0, channelPulse: 0, preHover: 'none', hoverProgress: 0, composerAttachment: undefined, likeFlipProgress: 0, likePopProgress: 0, showAttachmentPicker: false, pickerSelection: 0, attachLoading: false, attachSpinnerAngle: 0 })

    // Restart after delay
    setTimeout(() => runDemoSequence(), 2500)
  }, [])

  // Helper functions for demo sequence
  const moveCursorTo = (x: number, y: number, duration: number, easing: 'outQuad' | 'inOutCubic' = 'outQuad') => {
    return new Promise<void>(resolve => {
      const startTime = Date.now()
      const startX = (cursorRef.current ?? cursor).x
      const startY = (cursorRef.current ?? cursor).y
      const ease = easing === 'inOutCubic' ? easeInOutCubic : easeOutQuad
      
      const moveStep = () => {
        const elapsed = Date.now() - startTime
        const progress = Math.min(elapsed / duration, 1)
        const easedProgress = ease(progress)
        
        const newX = lerp(startX, x, easedProgress)
        const newY = lerp(startY, y, easedProgress)
        
        setCursor(prev => ({
          ...prev,
          x: newX,
          y: newY
        }))
        
        // Only follow cursor, no zoom during movement
        setCamera(prev => ({
          ...prev,
          targetX: newX,
          targetY: newY,
          stationaryTimer: 0, // Reset stationary timer
          isStationary: false
        }))
        
        if (progress < 1) {
          requestAnimationFrame(moveStep)
        } else {
          resolve()
        }
      }
      moveStep()
    })
  }

  const setZoomTarget = (zoom: number) => {
    setCamera(prev => ({
      ...prev,
      targetZoom: zoom,
      isStationary: true // Force zoom when manually set
    }))
    
    return new Promise<void>(resolve => {
      setTimeout(resolve, 800) // Wait for zoom to complete
    })
  }

  const clickAt = (x: number, y: number) => {
    // Add click effect
    setClickEffects(prev => [
      ...prev,
      { x, y, progress: 0, id: Date.now().toString() }
    ])
    
    // Punch zoom effect
    setCamera(prev => ({ ...prev, targetZoom: Math.min(prev.zoom * 1.12, 2.2), isStationary: true }))
    setTimeout(() => {
      setCamera(prev => ({ ...prev, targetZoom: Math.max(1.0, prev.targetZoom * 0.92), isStationary: true }))
    }, 180)
    return new Promise<void>(resolve => {
      setTimeout(resolve, 200)
    })
  }

  const typeText = async (
    text: string,
    context: 'channel' | 'composer' | 'reply',
    opts?: { normalDelayMs?: number; normalCharsCount?: number; fastForwardDelay?: number }
  ) => {
    const normalDelayMs = opts?.normalDelayMs ?? 38
    const normalCharsCount = opts?.normalCharsCount ?? 6
    const fastForwardDelay = opts?.fastForwardDelay ?? 100
    setTypingState(prev => ({
      ...prev,
      isTyping: true,
      targetText: text,
      text: '',
      context
    }))

    // Type first few characters normally (slower if requested)
    const normalChars = text.slice(0, Math.min(normalCharsCount, text.length))
    for (let i = 0; i < normalChars.length; i++) {
      await new Promise(resolve => setTimeout(resolve, normalDelayMs))
      setTypingState(prev => ({
        ...prev,
        text: normalChars.slice(0, i + 1)
      }))
    }

    // Fast forward jump with motion blur effect
    if (text.length > normalChars.length) {
      await new Promise(resolve => setTimeout(resolve, fastForwardDelay))
      setTypingState(prev => ({
        ...prev,
        text: text,
        isTyping: false
      }))
    }

    // Simulate Enter key press
    await new Promise(resolve => setTimeout(resolve, 200))
  }

  // Start animation and demo
  useEffect(() => {
    animate()
    
    // Auto-start demo after a short delay
    setTimeout(() => {
      runDemoSequence()
    }, 1000)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [animate, runDemoSequence])

  return (
    <div className="relative w-full max-w-full sm:max-w-4xl mx-auto bg-gray-900 rounded-2xl overflow-hidden shadow-2xl border border-transparent">
      {/* OS Chrome */}
      <div className="bg-gray-800 px-4 py-3 border-b border-gray-700 flex items-center gap-3">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <span className="text-sm font-medium text-gray-300">ThreadFolio Demo</span>
      </div>
      
      {/* Canvas */}
      <canvas
        ref={canvasRef}
        width={DEMO_WIDTH}
        height={DEMO_HEIGHT}
        className="w-full h-auto block"
        style={{ aspectRatio: `${DEMO_WIDTH}/${DEMO_HEIGHT}` }}
      />
      {/* Animated beam border overlay */}
      <BorderBeam
        duration={6}
        size={200}
        colorFrom="#6366f1"
        colorTo="#8b5cf6"
        borderWidth={2}
      />
    </div>
  )
}