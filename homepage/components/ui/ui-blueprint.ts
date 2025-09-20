// Central UI blueprint derived from InteractiveDemo canvas
// 1:1 replica of exact styling specifications from canvas rendering
// Contains precise measurements, colors, typography, and layout details

import { cn } from "@/lib/utils";

export const uiBlueprint = {
  // Exact canvas dimensions from InteractiveDemo
  canvas: {
    width: 1000,
    height: 600,
    leftPanelWidth: 256,
    headerHeight: 64,
    composerHeight: 80,
  },
  
  layout: {
    leftPanelWidth: 256,
    headerHeight: 64,
    composerHeight: 80,
    maxWidth: 1000,
    maxHeight: 600,
    radiusLg: "rounded-2xl",
    radiusMd: "rounded-xl",
    radiusSm: "rounded-md",
    padCard: "p-5",
    // Spacing extracted from canvas coordinates
    panelPadding: 16, // left panel internal padding
    channelSpacing: 32, // vertical spacing between channels
    entrySpacing: 100, // base spacing between entries
    replySpacing: 50, // vertical spacing for replies
    composerBottomOffset: 80, // composer distance from bottom
  },
  
  font: {
    // Exact font family from canvas: 'system-ui'
    family: "system-ui",
    // Exact pixel sizes from InteractiveDemo canvas rendering
    size: {
      xs10: "text-[10px]", // reply avatar text
      xs11: "text-[11px]", // channel titles, file attachments
      sm12: "text-[12px]", // subtitles, post button, chips
      sm13: "text-[13px]", // reply text
      base14: "text-[14px]", // channel names, entry text, input text
      lg18: "text-[18px]", // active channel header
    },
    weight: {
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold", // entry text
      bold: "font-bold", // header text, avatar text
    },
  },
  
  motion: {
    // Animation timing from InteractiveDemo
    durationFast: 200,
    durationMedium: 240,
    durationSlow: 280,
    easingStandard: "ease-out",
    // Canvas animation rates
    cursorTrailDecay: 0.9,
    cameraLerpFactor: 0.08,
    hoverLerpFactor: 0.18,
  },
  
  brand: {
    primary: "#611f69", // Slack purple for global CTAs
    primaryHover: "#7a2784",
    // Exact accent from InteractiveDemo canvas
    accent: "#8b5cf6",
    accentHover: "#7c3aed",
  },
  
  // Exact color specifications from canvas drawing functions
  colors: {
    // Background
    ink: "#0f0f23", // main background
    
    // Surfaces
    leftPanel: "rgba(30, 30, 50, 0.8)", // drawLeftPanel background
    mainHeader: "rgba(30, 30, 50, 0.9)", // main area header
    entryCard: "rgba(40, 40, 60, 0.9)", // entry background
    composerCard: "rgba(40, 40, 60, 0.9)", // composer background
    replyCard: "rgba(35, 35, 55, 0.8)", // reply background
    inputField: "rgba(20, 20, 35, 0.8)", // input background
    attachButton: "rgba(60, 60, 80, 0.8)", // attach button background
    channelInput: "rgba(30, 30, 45, 0.8)", // new channel input
    fileChip: "rgba(60, 60, 80, 0.9)", // file attachment chip
    
    // Borders
    borderSoft: "rgba(255, 255, 255, 0.08)", // reply input border
    border: "rgba(255, 255, 255, 0.1)", // standard borders
    borderStrong: "rgba(255, 255, 255, 0.15)", // strong borders
    
    // Text colors
    textPrimary: "rgba(255, 255, 255, 0.95)", // active channel text
    textDefault: "rgba(255, 255, 255, 0.9)", // entry text, input text
    textSecondary: "rgba(255, 255, 255, 0.85)", // reply text, chip text
    textMuted: "rgba(255, 255, 255, 0.8)", // file attachment text
    textInactive: "rgba(255, 255, 255, 0.7)", // inactive channel text
    textSubtle: "rgba(255, 255, 255, 0.6)", // channel title
    textDimmed: "rgba(255, 255, 255, 0.5)", // hash symbols
    textPlaceholder: "rgba(255, 255, 255, 0.35)", // reply placeholder
    textIcon: "rgba(255, 255, 255, 0.4)", // plus button stroke
    
    // Interactive states
    activeChannel: "rgba(139, 92, 246, 0.2)", // active channel background
    activeChannelBorder: "rgba(139, 92, 246, 0.4)", // active channel left border
    channelInputBorder: "rgba(139, 92, 246, 0.6)", // typing input border
    accentButton: "rgba(139, 92, 246, 0.8)", // post button, accent button
    likeActive: "rgba(59, 130, 246, 0.9)", // liked chip background
    likeInactive: "rgba(60, 60, 80, 0.8)", // default like chip
    cursor: "rgba(139, 92, 246, 0.8)", // typing cursor
    cursorText: "rgba(255, 255, 255, 0.8)", // cursor in input
    
    // Effects
    clickRipple: "rgba(139, 92, 246, 0.8)", // click effect stroke
    cursorTrail: "rgba(139, 92, 246, 0.3)", // cursor trail
    shadowEntry: "rgba(0, 0, 0, 0.3)", // entry card shadow
    shadowFile: "rgba(0, 0, 0, 0.2)", // file chip shadow
    successUnderline: "rgba(34, 197, 94, 0.8)", // channel creation success
    
    // Avatars
    avatarUser: "rgba(139, 92, 246, 0.8)", // user avatar background
    avatarReply: "rgba(34, 197, 94, 0.8)", // reply avatar background
    avatarText: "white", // avatar text color
    
    // Picker menu
    pickerPanel: "rgba(30, 30, 50, 0.98)", // attachment picker background
    pickerSelected: "rgba(139, 92, 246, 0.25)", // selected option
    pickerDefault: "rgba(50, 50, 70, 0.6)", // default option
  },
  
  // Exact dimensions and measurements from canvas
  dimensions: {
    // Avatar sizes
    avatarLarge: 20, // composer avatar radius
    avatarMedium: 18, // entry avatar radius  
    avatarSmall: 12, // reply avatar radius
    
    // Button sizes
    plusButton: 16, // plus button width/height
    attachButton: 32, // attach button width/height
    postButton: { width: 50, height: 32 }, // post button dimensions
    
    // Input fields
    composerInput: { height: 32, borderRadius: 6 },
    replyInput: { height: 28, borderRadius: 8 },
    channelInput: { height: 20, borderRadius: 3 },
    
    // Chips
    likeChip: { height: 20, borderRadius: 10 },
    threadChip: { height: 20, borderRadius: 10 },
    fileChip: { height: 24, borderRadius: 6 },
    
    // Cards
    entryCard: { borderRadius: 12 },
    composerCard: { borderRadius: 12 },
    replyCard: { borderRadius: 8 },
    
    // Spacing
    channelVerticalSpacing: 32,
    entryBaseHeight: 100,
    replyHeight: 50,
    textLineHeight: 18,
    maxVisibleLines: 9,
    textBlockTopPadding: 30,
    chipsRowHeight: 28,
  },
  
  // Legacy palette for backwards compatibility
  palette: {
    ink: "#0f0f23",
    panel: "rgba(30,30,50,0.8)",
    panelStrong: "rgba(30,30,50,0.9)",
    entry: "rgba(40,40,60,0.9)",
    reply: "rgba(35,35,55,0.8)",
    input: "rgba(20,20,35,0.8)",
    attachBtn: "rgba(60,60,80,0.8)",
    borderSoft: "rgba(255,255,255,0.08)",
    border: "rgba(255,255,255,0.10)",
    borderStrong: "rgba(255,255,255,0.15)",
    highlightIndigo: "rgba(139,92,246,0.8)",
  },
  // Exact CSS classes matching InteractiveDemo canvas styling
  classes: {
    // Surface cards with exact styling from canvas
    surfaceCard:
      "rounded-2xl p-5 border bg-white/5 border-white/10 backdrop-blur-md shadow-[0_20px_40px_-20px_rgba(0,0,0,0.6)]",
    surfacePanel:
      "rounded-md p-3 border bg-white/5 border-white/10 backdrop-blur-md",
    
    // Left Panel Components (exact from drawLeftPanel)
    leftPanel: "bg-[rgba(30,30,50,0.8)] border-r border-[rgba(255,255,255,0.1)]",
    channelTitle: "text-[11px] text-[rgba(255,255,255,0.6)] tracking-widest uppercase",
    channelActive: "bg-[rgba(139,92,246,0.2)] text-[rgba(255,255,255,0.95)] border-l-[3px] border-[rgba(139,92,246,0.4)]",
    channelInactive: "text-[rgba(255,255,255,0.7)] hover:bg-white/5",
    channelInput: "bg-[rgba(30,30,45,0.8)] border border-[rgba(139,92,246,0.6)] rounded-[3px] h-5",
    channelHash: "text-[rgba(255,255,255,0.5)] text-sm",
    plusButton: "w-4 h-4 border border-[rgba(255,255,255,0.4)] rounded-[3px] stroke-[1.5px]",
    
    // Header Components (exact from drawMainArea)
    mainHeader: "bg-[rgba(30,30,50,0.9)] border-b border-[rgba(255,255,255,0.1)] h-16",
    activeChannelTitle: "text-lg font-bold text-[rgba(255,255,255,0.9)]",
    headerSubtitle: "text-xs text-[rgba(255,255,255,0.6)]",
    
    // Entry Components (exact from drawEntry)
    entryCard: "bg-[rgba(40,40,60,0.9)] rounded-xl border border-[rgba(255,255,255,0.1)] shadow-[0_2px_8px_rgba(0,0,0,0.3)]",
    entryAvatar: "w-9 h-9 bg-[rgba(139,92,246,0.8)] rounded-full text-white font-bold text-xs",
    entryText: "text-sm font-semibold text-[rgba(255,255,255,0.9)] leading-[18px]",
    fileAttachment: "bg-[rgba(60,60,80,0.9)] border border-[rgba(255,255,255,0.1)] rounded-md h-6 shadow-[0_2px_4px_rgba(0,0,0,0.2)]",
    fileText: "text-[11px] text-[rgba(255,255,255,0.8)]",
    
    // Chip Components (exact from canvas)
    likeChip: "h-5 bg-[rgba(60,60,80,0.8)] rounded-[10px] text-xs text-white px-2",
    likeChipActive: "h-5 bg-[rgba(59,130,246,0.9)] rounded-[10px] text-xs text-white px-2 shadow-[0_0_6px_rgba(59,130,246,0.4)]",
    threadChip: "h-5 bg-[rgba(60,60,80,0.8)] rounded-[10px] text-xs text-[rgba(255,255,255,0.85)] px-2",
    
    // Composer Components (exact from drawComposer)
    composerCard: "bg-[rgba(40,40,60,0.9)] rounded-xl border border-[rgba(255,255,255,0.1)] h-20",
    composerAvatar: "w-10 h-10 bg-[rgba(139,92,246,0.8)] rounded-full text-white font-bold text-sm",
    composerInput: "bg-[rgba(20,20,35,0.8)] rounded-md h-8 text-sm text-[rgba(255,255,255,0.9)]",
    attachButton: "w-8 h-8 bg-[rgba(60,60,80,0.8)] rounded-md",
    postButton: "w-[50px] h-8 bg-[rgba(139,92,246,0.8)] hover:bg-[rgba(124,58,237,1)] rounded-md text-xs text-white font-medium",
    composerFileChip: "bg-[rgba(60,60,80,0.9)] border border-[rgba(255,255,255,0.1)] rounded-md h-5 text-[11px] text-[rgba(255,255,255,0.85)]",
    
    // Reply Components (exact from drawReply)
    replyCard: "bg-[rgba(35,35,55,0.8)] rounded-lg h-10",
    replyAvatar: "w-6 h-6 bg-purple-600 rounded-full text-white font-bold text-[10px]",
    replyText: "text-[13px] text-[rgba(255,255,255,0.85)]",
    replyInput: "bg-[rgba(28,28,44,0.85)] border border-[rgba(255,255,255,0.08)] rounded-lg h-7 text-xs",
    replyPlaceholder: "text-[rgba(255,255,255,0.35)]",
    
    // Interactive States
    cursorTyping: "bg-[rgba(139,92,246,0.8)] w-[1px] h-4",
    cursorInput: "bg-[rgba(255,255,255,0.8)] w-[1px] h-4",
    successUnderline: "border-b-2 border-[rgba(34,197,94,0.8)]",
    
    // Legacy classes for backwards compatibility
    chip:
      "px-1.5 py-0.5 rounded bg-white/10 border border-white/15 text-slate-200 text-xs",
    iconButton:
      "text-xs px-2 py-1.5 rounded-md bg-white/10 border border-white/15 text-slate-200 inline-flex items-center gap-1",
    primaryButton:
      "px-3 py-1.5 rounded-md bg-[#611f69] text-white text-sm font-medium",
    accentButton:
      "px-3 py-1.5 rounded-md bg-[#8b5cf6] hover:bg-[#7c3aed] text-white text-sm font-medium",
    activeChannel:
      "bg-indigo-500/15 text-indigo-200 border-indigo-400/30",
    subtle:
      "text-[11px] text-slate-400",
    headingSm: "text-slate-200 text-sm",
  },
  shadow: {
    card: "shadow-[0_20px_40px_-20px_rgba(0,0,0,0.6)]",
    soft: "shadow-[0_8px_24px_-12px_rgba(0,0,0,0.4)]",
    entry: "shadow-[0_2px_8px_rgba(0,0,0,0.3)]", // exact from drawEntry
    file: "shadow-[0_2px_4px_rgba(0,0,0,0.2)]", // exact from file attachment
  },
  
  size: {
    avatarSm: 12, // reply avatar (exact from canvas)
    avatarMd: 18, // entry avatar (exact from canvas)  
    avatarLg: 20, // composer avatar (exact from canvas)
    chipH: 20,
    inputH: 32,
  },
  
  // Convenience helpers (legacy)
  surfaceCard(className?: string) {
    return cn(this.classes.surfaceCard, className);
  },
  surfacePanel(className?: string) {
    return cn(this.classes.surfacePanel, className);
  },
  chip(className?: string) {
    return cn(this.classes.chip, className);
  },
  iconButton(className?: string) {
    return cn(this.classes.iconButton, className);
  },
  primaryButton(className?: string) {
    return cn(this.classes.primaryButton, className);
  },
  accentButton(className?: string) {
    return cn(this.classes.accentButton, className);
  },
  
  // New helpers for exact InteractiveDemo components
  leftPanel(className?: string) {
    return cn(this.classes.leftPanel, className);
  },
  channelActive(className?: string) {
    return cn(this.classes.channelActive, className);
  },
  channelInactive(className?: string) {
    return cn(this.classes.channelInactive, className);
  },
  entryCard(className?: string) {
    return cn(this.classes.entryCard, className);
  },
  composerCard(className?: string) {
    return cn(this.classes.composerCard, className);
  },
  replyCard(className?: string) {
    return cn(this.classes.replyCard, className);
  },
  likeChip(active: boolean = false, className?: string) {
    return cn(active ? this.classes.likeChipActive : this.classes.likeChip, className);
  },
  threadChip(className?: string) {
    return cn(this.classes.threadChip, className);
  },
  
  // Layout helpers for consistent structure
  channelLayout(className?: string) {
    return cn("flex h-96", className);
  },
  leftPanelSection(className?: string) {
    return cn("w-64 border-r border-white/10", className);
  },
  mainContentSection(className?: string) {
    return cn("flex-1 flex flex-col", className);
  },
  channelHeader(channelName: string, subtitle?: string, className?: string) {
    return {
      className: cn("h-16 px-5 pt-5 border-b border-white/10", className),
      style: { backgroundColor: this.colors.mainHeader },
      channelName,
      subtitle: subtitle || "Team updates and achievements"
    };
  },
  entriesArea(className?: string) {
    return cn("flex-1 p-5 space-y-4 overflow-y-auto", className);
  },
  composerArea(className?: string) {
    return cn("px-5 pb-5", className);
  },
  
  // Style getters for inline styles (exact canvas values)
  fontStyle(): React.CSSProperties {
    return { fontFamily: this.font.family } as React.CSSProperties;
  },
  
  avatarStyle(type: 'user' | 'reply' | 'large'): React.CSSProperties {
    const styles: Record<string, React.CSSProperties> = {
      user: {
        width: this.dimensions.avatarMedium * 2,
        height: this.dimensions.avatarMedium * 2,
        backgroundColor: this.colors.avatarUser,
        borderRadius: '50%',
        color: this.colors.avatarText,
        fontSize: '12px',
        fontWeight: 'bold',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      reply: {
        width: this.dimensions.avatarSmall * 2,
        height: this.dimensions.avatarSmall * 2,
        backgroundColor: this.colors.avatarReply,
        borderRadius: '50%',
        color: this.colors.avatarText,
        fontSize: '10px',
        fontWeight: 'bold',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      large: {
        width: this.dimensions.avatarLarge * 2,
        height: this.dimensions.avatarLarge * 2,
        backgroundColor: this.colors.avatarUser,
        borderRadius: '50%',
        color: this.colors.avatarText,
        fontSize: '14px',
        fontWeight: 'bold',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
    };
    return styles[type];
  },
  
  inputStyle(type: 'composer' | 'reply' | 'channel'): React.CSSProperties {
    const styles: Record<string, React.CSSProperties> = {
      composer: {
        backgroundColor: this.colors.inputField,
        borderRadius: this.dimensions.composerInput.borderRadius,
        height: this.dimensions.composerInput.height,
        color: this.colors.textDefault,
        fontSize: '14px',
        border: 'none',
        outline: 'none',
        padding: '0 12px',
      },
      reply: {
        backgroundColor: this.colors.replyCard,
        border: `1px solid ${this.colors.borderSoft}`,
        borderRadius: this.dimensions.replyInput.borderRadius,
        height: this.dimensions.replyInput.height,
        color: this.colors.textDefault,
        fontSize: '12px',
        outline: 'none',
        padding: '0 12px',
      },
      channel: {
        backgroundColor: this.colors.channelInput,
        border: `1px solid ${this.colors.channelInputBorder}`,
        borderRadius: this.dimensions.channelInput.borderRadius,
        height: this.dimensions.channelInput.height,
        color: this.colors.textDefault,
        fontSize: '14px',
        outline: 'none',
        padding: '0 8px',
      },
    };
    return styles[type];
  },
};

export type UIBlueprint = typeof uiBlueprint;
