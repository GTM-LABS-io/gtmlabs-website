"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { BarChart3, Eye, Share2, MousePointerClick, Linkedin, Mail, FileText, TrendingUp, Users, Heart, MessageCircle, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { slackTokens } from "@/lib/design-tokens";

function hexToRgba(hex: string, alpha: number) {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!m) return hex;
  const r = parseInt(m[1], 16);
  const g = parseInt(m[2], 16);
  const b = parseInt(m[3], 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

// Platform logos
function FacebookLogo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  );
}

function InstagramLogo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4c0 3.2-2.6 5.8-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8C2 4.6 4.6 2 7.8 2m-.2 2A3.6 3.6 0 004 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8c1.99 0 3.6-1.61 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 011.25 1.25A1.25 1.25 0 0117.25 8 1.25 1.25 0 0116 6.75a1.25 1.25 0 011.25-1.25M12 7a5 5 0 015 5 5 5 0 01-5 5 5 5 0 01-5-5 5 5 0 015-5m0 2a3 3 0 00-3 3 3 3 0 003 3 3 3 0 003-3 3 3 0 00-3-3z"/>
    </svg>
  );
}

function TwitterLogo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  );
}

function TikTokLogo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
    </svg>
  );
}

function YouTubeLogo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M10 15l5.19-3L10 9v6m11.56-7.83c.13.47.22 1.1.28 1.9.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83-.25.9-.83 1.48-1.73 1.73-.47.13-1.33.22-2.65.28-1.3.07-2.49.1-3.59.1L12 19c-4.19 0-6.8-.16-7.83-.44-.9-.25-1.48-.83-1.73-1.73-.13-.47-.22-1.1-.28-1.9-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83.25-.9.83-1.48 1.73-1.73.47-.13 1.33-.22 2.65-.28 1.3-.07 2.49-.1 3.59-.1L12 5c4.19 0 6.8.16 7.83.44.9.25 1.48.83 1.73 1.73z"/>
    </svg>
  );
}

type ViewMode = 'page' | 'post';
type Platform = 'facebook' | 'instagram' | 'twitter' | 'tiktok' | 'youtube' | 'all';

/**
 * Analytics Dashboard - Shows real metrics we track across platforms
 * - Page-level metrics: aggregate platform performance  
 * - Post-level metrics: individual post performance
 * - Platform filtering: Facebook, Instagram, Twitter/X, TikTok, YouTube
 */
export default function AnalyticsCards({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const inView = useInView(containerRef, { margin: "-80px", once: false });
  
  const [viewMode, setViewMode] = useState<ViewMode>('page');
  const [selectedPlatform, setSelectedPlatform] = useState<Platform>('all');

  const platforms = useMemo(() => [
    { id: 'facebook' as Platform, name: 'Facebook', logo: FacebookLogo, color: 'text-blue-500', available: true },
    { id: 'instagram' as Platform, name: 'Instagram', logo: InstagramLogo, color: 'text-pink-500', available: true },
    { id: 'twitter' as Platform, name: 'Twitter/X', logo: TwitterLogo, color: 'text-slate-300', available: true },
    { id: 'tiktok' as Platform, name: 'TikTok', logo: TikTokLogo, color: 'text-cyan-400', available: false },
    { id: 'youtube' as Platform, name: 'YouTube', logo: YouTubeLogo, color: 'text-red-500', available: false },
  ], []);

  return (
    <div ref={containerRef} className={cn("w-full max-w-4xl mx-auto", className)}>
      {/* Control Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        {/* View Mode Toggle */}
        <div className="inline-flex items-center rounded-lg border border-white/10 bg-[#090C14] p-1">
          <button
            onClick={() => setViewMode('page')}
            className={cn(
              "px-4 py-2 rounded-md text-sm font-medium transition-all duration-200",
              viewMode === 'page'
                ? "bg-blue-600/20 text-blue-300 shadow-sm"
                : "text-slate-400 hover:text-slate-300"
            )}
          >
            <span className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Page Metrics
            </span>
          </button>
          <button
            onClick={() => setViewMode('post')}
            className={cn(
              "px-4 py-2 rounded-md text-sm font-medium transition-all duration-200",
              viewMode === 'post'
                ? "bg-blue-600/20 text-blue-300 shadow-sm"
                : "text-slate-400 hover:text-slate-300"
            )}
          >
            <span className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Post Performance
            </span>
          </button>
        </div>

        {/* Platform Selector */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSelectedPlatform('all')}
            className={cn(
              "px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200",
              selectedPlatform === 'all'
                ? "bg-blue-600/20 text-blue-300 border border-blue-500/30"
                : "text-slate-400 hover:text-slate-300 border border-white/5"
            )}
          >
            All Platforms
          </button>
          {platforms.map((platform) => {
            const Logo = platform.logo;
            return (
              <motion.button
                key={platform.id}
                onClick={() => platform.available && setSelectedPlatform(platform.id)}
                disabled={!platform.available}
                whileHover={platform.available ? { scale: 1.05 } : {}}
                whileTap={platform.available ? { scale: 0.95 } : {}}
                className={cn(
                  "w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200",
                  selectedPlatform === platform.id
                    ? "bg-blue-600/20 border border-blue-500/30"
                    : "border border-white/5 hover:border-white/10",
                  platform.available ? "cursor-pointer" : "opacity-30 cursor-not-allowed"
                )}
                title={platform.available ? platform.name : `${platform.name} (Coming Soon)`}
              >
                <Logo className={cn("w-4 h-4", selectedPlatform === platform.id ? platform.color : "text-slate-400")} />
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {viewMode === 'page' ? (
          <PageMetricsView key="page" inView={inView} platform={selectedPlatform} />
        ) : (
          <PostPerformanceView key="post" platform={selectedPlatform} />
        )}
      </AnimatePresence>
    </div>
  );
}

// Page Metrics View Component
function PageMetricsView({ inView, platform }: { inView: boolean; platform: Platform }) {
  const pageMetrics = useMemo(() => [
    { label: 'Page Impressions', value: 154, change: 218, from: 49, icon: <Eye className="w-4 h-4" />, sparkline: [49, 62, 85, 110, 135, 154] },
    { label: 'Page Reach', value: 126, change: 180, from: 45, icon: <Users className="w-4 h-4" />, sparkline: [45, 58, 78, 95, 115, 126] },
    { label: 'Post Engagements', value: 1, change: 100, from: 0, icon: <Heart className="w-4 h-4" />, sparkline: [0, 0, 0, 0, 0, 1] },
    { label: 'Post Impressions', value: 154, change: 221, from: 48, icon: <TrendingUp className="w-4 h-4" />, sparkline: [48, 63, 88, 112, 138, 154] },
    { label: 'Post Reach', value: 126, change: 180, from: 45, icon: <Share2 className="w-4 h-4" />, sparkline: [45, 58, 78, 95, 115, 126] },
    { label: 'Page Clicks', value: 0, change: 0, from: 0, icon: <MousePointerClick className="w-4 h-4" />, sparkline: [0, 0, 0, 0, 0, 0] },
  ], []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
    >
      {pageMetrics.map((metric, index) => (
        <motion.div
          key={metric.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 * index, duration: 0.3 }}
          whileHover={{ scale: 1.02, boxShadow: `0 0 0 1px ${slackTokens.colors.blue[500]}, 0 10px 28px ${hexToRgba(slackTokens.colors.blue[500], 0.25)}` }}
          className="rounded-xl border border-white/10 bg-[#090C14] p-4 cursor-pointer transition-all duration-200"
        >
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-blue-600/10 text-blue-400 border border-blue-500/20">
                {metric.icon}
              </span>
              <div>
                <div className="text-xs text-slate-400">{metric.label}</div>
                <div className="text-2xl font-bold text-white tabular-nums mt-0.5">
                  {inView ? metric.value : 0}
                </div>
              </div>
            </div>
          </div>
          
          {/* Sparkline */}
          <div className="h-12 mb-2">
            <Sparkline data={metric.sparkline} inView={inView} />
          </div>
          
          {/* Change indicator */}
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-500">from {metric.from}</span>
            <span className={cn(
              "inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-medium",
              metric.change > 0 ? "bg-emerald-500/10 text-emerald-400" : "bg-slate-500/10 text-slate-400"
            )}>
              {metric.change > 0 && <ArrowUpRight className="w-3 h-3" />}
              {metric.change > 0 ? '+' : ''}{metric.change}%
            </span>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}

// Post Performance View Component
function PostPerformanceView({ platform }: { platform: Platform }) {
  const posts = useMemo(() => [
    {
      title: "Communities. Networks. Connections.",
      excerpt: "The deeper I get into #vibecoding — building web apps and Chrome extensions...",
      date: "Apr 10, 2025",
      reach: 113,
      likes: 0,
      comments: 0,
      clicks: 0,
      platform: 'facebook' as Platform,
    },
    {
      title: "I built my first Chrome extension",
      excerpt: "...that saves your favorite CTAs and links as reusable snippets...",
      date: "Apr 9, 2025",
      reach: 28,
      likes: 0,
      comments: 0,
      clicks: 0,
      platform: 'facebook' as Platform,
    },
  ], []);

  const filteredPosts = platform === 'all' ? posts : posts.filter(p => p.platform === platform);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-3"
    >
      {filteredPosts.map((post, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 * index, duration: 0.3 }}
          whileHover={{ scale: 1.01, boxShadow: `0 0 0 1px ${slackTokens.colors.blue[500]}, 0 10px 28px ${hexToRgba(slackTokens.colors.blue[500], 0.15)}` }}
          className="rounded-xl border border-white/10 bg-[#090C14] p-4 cursor-pointer transition-all duration-200"
        >
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            {/* Post Content */}
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-semibold text-white mb-1 truncate">{post.title}</h3>
              <p className="text-xs text-slate-400 line-clamp-2 mb-2">{post.excerpt}</p>
              <div className="text-xs text-slate-500">{post.date}</div>
            </div>
            
            {/* Metrics */}
            <div className="grid grid-cols-4 gap-3 sm:gap-4">
              <div className="text-center">
                <div className="text-xs text-slate-400 mb-1">Reach</div>
                <div className="text-lg font-bold text-white tabular-nums">{post.reach}</div>
              </div>
              <div className="text-center">
                <div className="text-xs text-slate-400 mb-1">Likes</div>
                <div className="text-lg font-bold text-white tabular-nums">{post.likes}</div>
              </div>
              <div className="text-center">
                <div className="text-xs text-slate-400 mb-1">Comments</div>
                <div className="text-lg font-bold text-white tabular-nums">{post.comments}</div>
              </div>
              <div className="text-center">
                <div className="text-xs text-slate-400 mb-1">Clicks</div>
                <div className="text-lg font-bold text-white tabular-nums">{post.clicks}</div>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
      
      {filteredPosts.length === 0 && (
        <div className="text-center py-12 text-slate-400">
          <BarChart3 className="w-12 h-12 mx-auto mb-3 opacity-20" />
          <p>No posts available for this platform yet</p>
        </div>
      )}
    </motion.div>
  );
}

// Sparkline component for mini charts
function Sparkline({ data, inView }: { data: number[]; inView: boolean }) {
  const max = Math.max(...data);
  const width = 100;
  const height = 48;
  const padding = 2;
  
  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * (width - padding * 2) + padding;
    const y = height - (value / max) * (height - padding * 2) - padding;
    return `${x},${y}`;
  }).join(' ');
  
  return (
    <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`} className="overflow-visible">
      <motion.polyline
        points={points}
        fill="none"
        stroke={slackTokens.colors.blue[500]}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={inView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      />
      {/* Area under curve */}
      <motion.polygon
        points={`${padding},${height} ${points} ${width - padding},${height}`}
        fill={`url(#gradient-${data.join('-')})`}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 0.2 } : { opacity: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
      />
      <defs>
        <linearGradient id={`gradient-${data.join('-')}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={slackTokens.colors.blue[500]} stopOpacity="0.4" />
          <stop offset="100%" stopColor={slackTokens.colors.blue[500]} stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function MetricCard({
  icon,
  label,
  target,
  suffix,
  tooltip,
  inView,
}: {
  icon: React.ReactNode;
  label: string;
  target: number;
  suffix: string;
  tooltip: string;
  inView: boolean;
}) {
  const [flipped, setFlipped] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const count = useCountUp({ to: target, durationMs: 1300, loop: true, inView });
  const display = hovered ? count + 1 : count;

  const onMove: React.MouseEventHandler<HTMLDivElement> = (e) => {
    const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width; // 0..1
    const py = (e.clientY - rect.top) / rect.height; // 0..1
    const max = 10; // increased tilt intensity
    const ry = (px - 0.5) * max * 2; // left/right
    const rx = -(py - 0.5) * max * 2; // up/down
    setTilt({ rx, ry });
  };

  return (
    <motion.div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setTilt({ rx: 0, ry: 0 }); }}
      onMouseMove={onMove}
      onClick={() => setFlipped((f) => !f)}
      whileHover={{ scale: 1.05 }}
      className="relative w-full rounded-xl border bg-[#090C14] p-3 shadow-sm cursor-pointer select-none perspective-1000"
      style={{
        transformStyle: "preserve-3d",
        transform: `perspective(800px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
        borderColor: hovered ? slackTokens.colors.blue[500] : 'rgba(255,255,255,0.1)',
        boxShadow: hovered
          ? `0 0 0 1px ${slackTokens.colors.blue[500]}, 0 10px 28px ${hexToRgba(slackTokens.colors.blue[500], 0.25)}`
          : '0 12px 30px rgba(0,0,0,0.4)'
      }}
    >
      <motion.div
        className="flex items-center justify-between gap-3"
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ type: "spring", stiffness: 180, damping: 18 }}
        style={{ backfaceVisibility: "hidden" }}
      >
        <div className="inline-flex items-center gap-2 text-slate-200">
          <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-white/5 text-white border border-white/10">
            {icon}
          </span>
          <span className="text-xs text-slate-400">{label}</span>
        </div>
        <motion.div className="text-lg font-semibold text-white tabular-nums"
          animate={hovered ? { scale: [1, 1.25, 1] } : { scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          {display}
          {suffix}
        </motion.div>
      </motion.div>

      {/* back side */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{ rotateY: flipped ? 0 : -180 }}
        transition={{ type: "spring", stiffness: 180, damping: 18 }}
        style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
      >
        {/* Donut ring: views by channel */}
        <DonutViewsByChannel />
      </motion.div>

      {/* tooltip */}
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 6 }}
        className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-black/70 px-2 py-1 text-[10px] text-slate-200 border border-white/10"
      >
        {tooltip}
      </motion.div>
    </motion.div>
  );
}

function Bars({ inView }: { inView: boolean }) {
  const barWidths = [30, 55, 68, 82, 74, 88];
  const blueStart = slackTokens.colors.blue[400];
  const blueEnd = slackTokens.colors.blue[600];
  return (
    <div className="space-y-1.5">
      {barWidths.map((w, i) => (
        <div key={i} className="h-2 w-full rounded bg-white/5 overflow-hidden">
          <motion.div
            className="h-full"
            style={{ backgroundImage: `linear-gradient(to right, ${blueStart}, ${blueEnd})` }}
            initial={{ width: 0 }}
            animate={inView ? { width: `${w}%`, transition: { duration: 1.2 } } : { width: 0 }}
          />
        </div>
      ))}
    </div>
  );
}

function MiniChannels({ inView }: { inView: boolean }) {
  const items = useMemo(
    () => [
      { icon: <Linkedin className="w-3.5 h-3.5" />, label: "LinkedIn", value: 10 },
      { icon: <Mail className="w-3.5 h-3.5" />, label: "Email", value: 4 },
      { icon: <FileText className="w-3.5 h-3.5" />, label: "Blog", value: 3 },
    ],
    []
  );
  return (
    <div className="rounded-xl border border-white/10 bg-[#090C14] p-3">
      <div className="grid grid-cols-3 gap-2">
        {items.map((it, i) => (
          <motion.div
            key={i}
            className="rounded-lg bg-white/5 p-2 text-center"
            whileHover={{ scale: 1.06 }}
          >
            <div className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-white/10 text-white mb-1">
              {it.icon}
            </div>
            <div className="text-[10px] text-slate-300">{it.label}</div>
            <div className="text-sm font-semibold text-white tabular-nums">{inView ? it.value : 0}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function useCountUp({ to, durationMs, loop, inView }: { to: number; durationMs: number; loop?: boolean; inView: boolean }) {
  const [val, setVal] = useState(0);
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    let raf = 0;
    let resetTimer: ReturnType<typeof setTimeout> | null = null;

    const step = (t: number) => {
      if (startRef.current == null) startRef.current = t;
      const progress = Math.min(1, (t - startRef.current) / durationMs);
      const next = Math.floor(progress * to);
      setVal(next);
      if (progress < 1 && inView) {
        raf = requestAnimationFrame(step);
      } else if (loop && inView) {
        resetTimer = setTimeout(() => {
          startRef.current = null;
          raf = requestAnimationFrame(step);
        }, 1200);
      }
    };

    if (inView) raf = requestAnimationFrame(step);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      if (resetTimer) clearTimeout(resetTimer);
      startRef.current = null;
    };
  }, [to, durationMs, loop, inView]);

  return val;
}

function DonutViewsByChannel() {
  const size = 120;
  const stroke = 10;
  const r = (size - stroke) / 2;
  const cx = size / 2;
  const cy = size / 2;
  const C = 2 * Math.PI * r;

  // Example distribution and colors (brand blues)
  const segments = [
    { pct: 0.45, color: slackTokens.colors.blue[600] },
    { pct: 0.30, color: slackTokens.colors.blue[500] },
    { pct: 0.15, color: slackTokens.colors.blue[400] },
    { pct: 0.10, color: '#ffffff' },
  ];

  // Animate by revealing dashoffset from full circumference to remaining
  const [reveal, setReveal] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    let start: number | null = null;
    const duration = 900; // ms
    const step = (t: number) => {
      if (start == null) start = t;
      const p = Math.min(1, (t - start) / duration);
      setReveal(p);
      if (p < 1) rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  let acc = 0;

  return (
    <div className="flex flex-col items-center justify-center text-slate-200">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}
        className="drop-shadow-[0_8px_24px_rgba(0,0,0,0.35)]">
        {/* background track */}
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth={stroke} />
        {segments.map((seg, i) => {
          const length = C * seg.pct;
          const gap = C - length;
          const offset = (C * (1 - acc)) + gap; // start at end of arc
          acc += seg.pct;
          return (
            <circle
              key={i}
              cx={cx}
              cy={cy}
              r={r}
              fill="none"
              stroke={seg.color}
              strokeWidth={stroke}
              strokeDasharray={`${length} ${gap}`}
              strokeDashoffset={(1 - reveal) * (length + gap)}
              transform={`rotate(-90 ${cx} ${cy})`}
              style={{ transition: 'stroke-dashoffset 0.9s ease-out' }}
            />
          );
        })}
      </svg>
      <div className="mt-2 text-[11px] text-slate-300">Views by channel</div>
    </div>
  );
}
