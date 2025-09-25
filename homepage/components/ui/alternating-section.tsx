"use client";

import React from "react";
import { motion, type Variants } from "framer-motion";
import { slackTokens } from "@/lib/design-tokens";
import { cn } from "@/lib/utils";
import { Cpu, Sparkles, Layers, ShieldCheck } from "lucide-react";

function hex(hex: string, a: number) {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!m) return hex;
  const r = parseInt(m[1], 16);
  const g = parseInt(m[2], 16);
  const b = parseInt(m[3], 16);
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}

const brandBlue = slackTokens.colors.blue[500];
const brandPurple = slackTokens.colors.primary[500];

const container: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -24, filter: "blur(8px)" },
  show: (i: number = 0) => ({
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { delay: i * 0.05, type: "spring" as const, stiffness: 120, damping: 16 }
  }),
};

const fadeRight: Variants = {
  hidden: { opacity: 0, x: 24, filter: "blur(8px)" },
  show: (i: number = 0) => ({
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { delay: i * 0.05, type: "spring" as const, stiffness: 120, damping: 16 }
  }),
};

function Floating({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 6, repeat: Infinity, repeatType: "mirror", ease: "easeInOut", delay }}>
      {children}
    </motion.div>
  );
}

function Block({ side, icon, title, bullets }: { side: "left" | "right"; icon: React.ReactNode; title: string; bullets: string[] }) {
  const variant = side === "left" ? fadeLeft : fadeRight;
  return (
    <motion.div
      className={cn("grid grid-cols-1 md:grid-cols-2 gap-8 items-center")}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }}
      variants={container}
    >
      {side === "left" && (
        <motion.div custom={0} variants={variant}>
          <Floating>
            <div className="rounded-2xl border p-6" style={{ background: "#0C0D12", borderColor: "#23242C", boxShadow: `0 20px 40px ${hex(brandPurple, 0.12)}` }}>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl flex items-center justify-center" style={{ background: hex(brandBlue, 0.12) }}>{icon}</div>
                <div className="text-white font-semibold text-lg">{title}</div>
              </div>
              <ul className="mt-4 space-y-2 text-sm" style={{ color: "#9aa0aa" }}>
                {bullets.map((b, i) => (
                  <motion.li key={i} custom={i + 1} variants={variant} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full" style={{ background: hex(brandBlue, 0.8) }} />
                    <span>{b}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </Floating>
        </motion.div>
      )}
      <motion.div custom={0} variants={variant}>
        <Floating delay={0.2}>
          <div className="rounded-2xl border p-6" style={{ background: "#0C0D12", borderColor: "#23242C" }}>
            <div className="h-40 rounded-xl border" style={{ borderColor: "#23242C", background: `linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))` }} />
            <div className="mt-3 space-y-2">
              <div className="h-2 w-2/3 rounded bg-white/10" />
              <div className="h-2 w-1/2 rounded bg-white/10" />
              <div className="h-2 w-4/5 rounded bg-white/10" />
            </div>
          </div>
        </Floating>
      </motion.div>
      {side === "right" && (
        <motion.div custom={0} variants={variant}>
          <Floating>
            <div className="rounded-2xl border p-6" style={{ background: "#0C0D12", borderColor: "#23242C", boxShadow: `0 20px 40px ${hex(brandPurple, 0.12)}` }}>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl flex items-center justify-center" style={{ background: hex(brandBlue, 0.12) }}>{icon}</div>
                <div className="text-white font-semibold text-lg">{title}</div>
              </div>
              <ul className="mt-4 space-y-2 text-sm" style={{ color: "#9aa0aa" }}>
                {bullets.map((b, i) => (
                  <motion.li key={i} custom={i + 1} variants={variant} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full" style={{ background: hex(brandBlue, 0.8) }} />
                    <span>{b}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </Floating>
        </motion.div>
      )}
    </motion.div>
  );
}

export default function AlternatingSection({ className }: { className?: string }) {
  return (
    <section className={cn("py-20", className)}>
      <div className="mx-auto w-full max-w-[1200px] px-4">
        <h2 className="text-center font-bold" style={{ fontSize: 36, lineHeight: 1.2 }}>
          <span className="gradient-headline">Powered by AI, Delivered with Precision</span>
        </h2>
        <div className="mt-12 space-y-16">
          <Block
            side="left"
            icon={<Cpu className="w-5 h-5" style={{ color: hex(brandBlue, 0.9) }} />}
            title="Ingest & Understand"
            bullets={["Transcripts, slides, and audio ingested", "Speaker/section detection", "Topic clustering & entity extraction"]}
          />
          <Block
            side="right"
            icon={<Sparkles className="w-5 h-5" style={{ color: hex(brandBlue, 0.9) }} />}
            title="AI Reconstruction"
            bullets={["Outline generation & content mapping", "Style/voice conditioning", "Asset plans auto-generated"]}
          />
          <Block
            side="left"
            icon={<Layers className="w-5 h-5" style={{ color: hex(brandBlue, 0.9) }} />}
            title="On-Brand Output"
            bullets={["SEO blog & newsletter drafts", "Platform-native social skeletons", "Design-ready visual templates"]}
          />
          <Block
            side="right"
            icon={<ShieldCheck className="w-5 h-5" style={{ color: hex(brandBlue, 0.9) }} />}
            title="QC & Delivery"
            bullets={["Human review pass", "Formatting & links verified", "Delivered in 48 hours"]}
          />
        </div>
      </div>
    </section>
  );
}
