"use client";

import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Play, Linkedin, Mail, FileText, Clapperboard, Video, Twitter, Newspaper } from "lucide-react";
import { cn } from "@/lib/utils";
import { slackTokens } from "@/lib/design-tokens";

/**
 * Animated branching visual for the Customization section.
 * Central webinar node pulses and branches animate outward to channel/format icons.
 */
export default function CustomizationGraph({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { margin: "-80px", once: false });
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });

  const blue500 = slackTokens.colors.blue[500];
  const blue400 = slackTokens.colors.blue[400];
  const blue600 = slackTokens.colors.blue[600];

  const hexToRgba = (hex: string, alpha: number) => {
    const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!m) return hex;
    const r = parseInt(m[1], 16);
    const g = parseInt(m[2], 16);
    const b = parseInt(m[3], 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  // Inline transitions used instead of Variants to avoid typing friction

  const items = [
    { Icon: Linkedin, label: "LinkedIn" },
    { Icon: Twitter, label: "Twitter/X" },
    { Icon: Clapperboard, label: "TikTok" },
    { Icon: Video, label: "YouTube Shorts" },
    { Icon: FileText, label: "SEO Blog" },
    { Icon: FileText, label: "Lead Magnet" },
    { Icon: Newspaper, label: "Newsletter" },
    { Icon: Mail, label: "Email" },
  ];

  return (
    <div
      ref={ref}
      className={cn("relative mx-auto h-64 w-full max-w-xl", className)}
      onMouseMove={(e) => {
        const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width;
        const py = (e.clientY - rect.top) / rect.height;
        const max = 9;
        const ry = (px - 0.5) * max * 2;
        const rx = -(py - 0.5) * max * 2;
        setTilt({ rx, ry });
      }}
      onMouseLeave={() => setTilt({ rx: 0, ry: 0 })}
      style={{ transform: `perspective(900px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`, transformStyle: "preserve-3d" }}
    >
      {/* center node */}
      <motion.div
        className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: inView ? 1 : 0.8, scale: inView ? [1, 1.05, 1] : 0.98 }}
        transition={{ duration: 1.6, repeat: Infinity, repeatType: "loop" }}
      >
        <div className="relative">
          <div
            className="absolute -inset-3 rounded-full blur-xl"
            style={{ backgroundColor: hexToRgba(blue500, 0.15) }}
          />
          <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/15 bg-[#0B121E] text-white shadow-inner">
            <Play className="w-5 h-5" />
          </div>
          <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 text-[11px] text-slate-300">Webinar</div>
        </div>
      </motion.div>

      {/* branches */}
      {items.map((it, i) => {
        const angle = (i / items.length) * Math.PI * 2; // 0..2PI
        const radius = 100; // px from center
        const cx = 0.5;
        const cy = 0.5;
        const endX = cx + (Math.cos(angle) * radius) / 400; // 0..1 space
        const endY = cy + (Math.sin(angle) * radius) / 256; // 0..1 space

        return (
          <React.Fragment key={i}>
            {/* line */}
            <motion.div
              className="absolute origin-left rounded-full bg-gradient-to-r from-white/20 to-white/5"
              style={{
                left: `${cx * 100}%`,
                top: `${cy * 100}%`,
                width: `${Math.hypot(endX - cx, endY - cy) * 100}%`,
                height: 2,
                rotate: `${(angle * 180) / Math.PI}deg`,
                backgroundImage: `linear-gradient(to right, ${hexToRgba(blue600, 0.35)}, ${hexToRgba(blue600, 0.08)})`,
              }}
              initial={{ scaleX: 0, opacity: 0 }}
              animate={inView ? { scaleX: 1, opacity: 1, transition: { delay: 0.1 + i * 0.12, duration: 0.9 } } : { scaleX: 0, opacity: 0 }}
            />

            {/* icon target */}
            <motion.div
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${endX * 100}%`, top: `${endY * 100}%` }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1, transition: { delay: 0.25 + i * 0.12, duration: 0.35 } } : { opacity: 0, scale: 0.8 }}
              whileHover={{ y: -2 }}
            >
              <div className="relative">
                <div
                  className="absolute -inset-2 rounded-xl blur-lg"
                  style={{ backgroundColor: hexToRgba(blue400, 0.15) }}
                />
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-[#0B121E] text-white">
                  <it.Icon className="w-4 h-4" />
                </div>
                <div className="absolute top-11 left-1/2 -translate-x-1/2 text-[10px] text-slate-300 whitespace-nowrap">{it.label}</div>
              </div>
            </motion.div>
          </React.Fragment>
        );
      })}
    </div>
  );
}
