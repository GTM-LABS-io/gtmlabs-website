"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, useMotionValue, useScroll, useSpring, useTransform, animate } from "framer-motion";
import { slackTokens } from "@/lib/design-tokens";
import { useDebugRect } from "@/lib/debug-layout";

// Utility: clamp
const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));

type CardConfig = {
  id: number;
  title: string;
  dataLabel: string;
  color: string;
  glow: string;
  variant: "fading-engagement" | "task-overflow" | "hourglass" | "blind-dashboard";
};

// Counter hook for animated numbers
function useCountUp(to: number, duration = 1.2) {
  const mv = useMotionValue(0);
  const [val, setVal] = useState(0);
  useEffect(() => {
    const controls = animate(mv, to, { duration, ease: "easeOut" });
    const unsub = mv.on("change", (v) => setVal(v));
    return () => {
      controls.stop();
      unsub();
    };
  }, [to, duration]);
  return Math.round(val);
}

// Timer hook animating down from seconds to zero
function useCountdown(fromSeconds = 60, duration = 1.8) {
  const mv = useMotionValue(fromSeconds);
  const [display, setDisplay] = useState("01:00");
  useEffect(() => {
    const controls = animate(mv, 0, { duration, ease: "linear" });
    const unsub = mv.on("change", (v) => {
      const total = Math.max(0, Math.round(v));
      const m = Math.floor(total / 60);
      const s = total % 60;
      setDisplay(`${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`);
    });
    return () => {
      controls.stop();
      unsub();
    };
  }, [fromSeconds, duration]);
  return display;
}

export default function ProblemParallaxCards({ className }: { className?: string }) {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const mobileStackRef = useRef<HTMLDivElement | null>(null);
  const deckRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });

  useDebugRect(sectionRef, 'ProblemParallax<section>');
  useDebugRect(mobileStackRef, 'ProblemParallax<mobile-stack>');
  useDebugRect(deckRef, 'ProblemParallax<deck>');

  // Spread/rotation/opacities with scroll
  const spreadBase = 30; // base distance
  const rot = useTransform(scrollYProgress, [0, 1], [-2, 2]);
  const backOpacity = useTransform(scrollYProgress, [0, 1], [0.7, 1]);
  const midOpacity = useTransform(scrollYProgress, [0, 1], [0.85, 1]);

  // Magnetic pointer
  const [hovered, setHovered] = useState<number | null>(null);
  const px = useMotionValue(0);
  const py = useMotionValue(0);

  const onMove: React.MouseEventHandler<HTMLDivElement> = (e) => {
    const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    // normalize to [-1,1]
    const nx = clamp(dx / (rect.width / 2), -1, 1);
    const ny = clamp(dy / (rect.height / 2), -1, 1);
    px.set(nx);
    py.set(ny);
  };

  const onLeave = () => {
    animate(px, 0, { duration: 0.3 });
    animate(py, 0, { duration: 0.3 });
    setHovered(null);
  };

  // Helpers to compute transform per card
  function useCardTransforms(speed: number, mag: number, baseX: number, baseY: number) {
    const addX = useTransform(scrollYProgress, [0, 1], [0, spreadBase * speed]);
    const addY = useTransform(scrollYProgress, [0, 1], [0, spreadBase * speed]);
    const mx = useTransform(px, (v) => v * mag);
    const my = useTransform(py, (v) => v * mag);
    const tiltX = useTransform(py, (v) => v * -3); // tilt toward cursor
    const tiltY = useTransform(px, (v) => v * 3);
    return { x: useSpring(useTransform(addX, (v) => v + baseX), { stiffness: 200, damping: 25 }), y: useSpring(useTransform(addY, (v) => v + baseY), { stiffness: 200, damping: 25 }), mx, my, tiltX, tiltY };
  }

  // brand colors
  const brandPink = slackTokens.colors.danger[500];
  const brandPurple = slackTokens.colors.primary[500];
  const brandBlue = slackTokens.colors.blue[500];
  const brandGreen = slackTokens.colors.success[500];

  function hex(hex: string, a: number) {
    const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!m) return hex;
    const r = parseInt(m[1], 16);
    const g = parseInt(m[2], 16);
    const b = parseInt(m[3], 16);
    return `rgba(${r}, ${g}, ${b}, ${a})`;
  }

  // Cards data (content only; visuals use stage props)
  const cards = useMemo<CardConfig[]>(() => ([
    {
      id: 1,
      title: "We put everything into that webinar. And then... crickets.",
      dataLabel: "engagement drop after 48 hours",
      color: hex(brandPink, 0.12),
      glow: `0 0 0 1px ${hex(brandPink, 0.25)}, 0 20px 60px ${hex(brandPink, 0.15)}`,
      variant: "fading-engagement" as const,
    },
    {
      id: 2,
      title: "I can't keep feeding the content monster. My team is already working nights and weekends.",
      dataLabel: "Team burnout level",
      color: hex(brandPurple, 0.12),
      glow: `0 0 0 1px ${hex(brandPurple, 0.25)}, 0 18px 50px ${hex(brandPurple, 0.12)}`,
      variant: "task-overflow" as const,
    },
    {
      id: 3,
      title: "We know we should repurpose. But who has 20 hours to turn one webinar into clips and posts?",
      dataLabel: "hours manual work per webinar",
      color: hex(brandBlue, 0.10),
      glow: `0 0 0 1px ${hex(brandBlue, 0.25)}, 0 16px 40px ${hex(brandBlue, 0.10)}`,
      variant: "hourglass" as const,
    },
    {
      id: 4,
      title: "I can't prove which content actually drives pipeline. It all feels like a guessing game.",
      dataLabel: "attribution clarity",
      color: hex(brandGreen, 0.10),
      glow: `0 0 0 1px ${hex(brandGreen, 0.25)}, 0 16px 40px ${hex(brandGreen, 0.10)}`,
      variant: "blind-dashboard" as const,
    },
  ]), []);

  // Stage props (front, middle, back, far back) controls stacking/offset/speeds
  const stages = [
    { baseX: 0, baseY: 0, z: 40, speed: 1.0, mag: 20 },
    { baseX: 30, baseY: 20, z: 30, speed: 0.8, mag: 12 },
    { baseX: 60, baseY: 40, z: 20, speed: 0.5, mag: 8 },
    { baseX: 90, baseY: 60, z: 10, speed: 0.3, mag: 4 },
  ] as const;

  // order = indices into cards for [front, middle, back, far back]
  const [order, setOrder] = useState<number[]>([0, 1, 2, 3]);
  const cycleDeck = () => setOrder(([a, b, c, d]) => [b, c, d, a]);

  // Animated numbers
  const engagementDrop = useCountUp(87, 1.2);
  const burnoutLevel = useCountUp(85, 1.2);
  const hoursCount = useCountUp(20, 1.2);
  
  // Engagement icons animation state
  const [engagementIcons, setEngagementIcons] = useState([
    { id: 1, opacity: 1, icon: '👥' },
    { id: 2, opacity: 1, icon: '💬' },
    { id: 3, opacity: 1, icon: '👍' },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setEngagementIcons(prev => 
        prev.map(icon => ({
          ...icon,
          opacity: icon.opacity > 0.2 ? icon.opacity - 0.15 : 1
        }))
      );
    }, 300);
    return () => clearInterval(interval);
  }, []);

  // Progress bar animation for task overflow
  const progressValue = useMotionValue(0);
  const [progressPercent, setProgressPercent] = useState(0);
  
  useEffect(() => {
    const controls = animate(progressValue, 100, {
      duration: 3,
      repeat: Infinity,
      ease: "linear",
      onUpdate: (v) => setProgressPercent(Math.round(v))
    });
    return () => controls.stop();
  }, [progressValue]);

  const renderCardBody = (card: CardConfig) => (
    <div className="relative z-10 flex flex-col h-full">
      {/* Quote - Takes up most of the space */}
      <div className="flex-1 flex items-start mb-4">
        <span className="text-white/30 text-3xl leading-none mr-1 mt-1">"</span>
        <p className="text-white text-base font-medium leading-relaxed flex-1">
          {card.title}
        </p>
        <span className="text-white/30 text-3xl leading-none ml-1 mt-1">"</span>
      </div>

      {/* Animation - Compact, takes up ~1/3 or less */}
      <div className="mt-auto">
        {/* Card 1: Fading Engagement - Compact */}
        {card.variant === "fading-engagement" && (
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              {engagementIcons.map((item) => (
                <motion.div
                  key={item.id}
                  className="text-lg"
                  animate={{ opacity: item.opacity }}
                  transition={{ duration: 0.3 }}
                >
                  {item.icon}
                </motion.div>
              ))}
            </div>
            <div className="text-xs text-white/60">
              <span className="font-semibold">{engagementDrop}%</span> {card.dataLabel}
            </div>
          </div>
        )}

        {/* Card 2: Task Overflow - Compact single progress bar */}
        {card.variant === "task-overflow" && (
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-[10px] text-white/40">
              <span>Team Workload</span>
              <span className="text-white/30">{burnoutLevel}%</span>
            </div>
            <div className="relative h-2.5 bg-white/5 rounded-full overflow-hidden">
              <motion.div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-purple-500/70 to-purple-400/70 rounded-full"
                initial={{ width: '0%' }}
                animate={{ width: '85%' }}
                transition={{ duration: 8, ease: "easeOut" }}
              />
            </div>
            <div className="text-xs text-white/60">
              {card.dataLabel}
            </div>
          </div>
        )}

        {/* Card 3: Hourglass - Compact */}
        {card.variant === "hourglass" && (
          <div className="flex items-center gap-3">
            <div className="relative w-8 h-12">
              {/* Simplified hourglass */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                {/* Top bulb */}
                <div className="w-7 h-4 border border-white/30 rounded-t-full relative overflow-hidden">
                  <motion.div
                    className="absolute bottom-0 w-full bg-white/20"
                    animate={{ height: ['100%', '0%'] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  />
                </div>
                {/* Narrow middle */}
                <div className="w-1.5 h-1.5 bg-white/30" />
                {/* Bottom bulb */}
                <div className="w-7 h-4 border border-white/30 rounded-b-full relative overflow-hidden">
                  <motion.div
                    className="absolute bottom-0 w-full bg-white/20"
                    animate={{ height: ['0%', '100%'] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  />
                </div>
              </div>
            </div>
            <div className="text-xs text-white/60">
              <span className="font-semibold">{hoursCount}</span> {card.dataLabel}
            </div>
          </div>
        )}

        {/* Card 4: Blind Dashboard - Compact */}
        {card.variant === "blind-dashboard" && (
          <div className="space-y-1.5">
            <div className="grid grid-cols-5 gap-1.5 h-10 items-end">
              {[18, 28, 15, 24, 20].map((height, i) => (
                <motion.div
                  key={i}
                  className="bg-white/10 rounded relative"
                  initial={{ height: 0 }}
                  animate={{ height: `${height}px` }}
                  transition={{ 
                    duration: 1.2,
                    delay: i * 0.15,
                    ease: "easeOut"
                  }}
                >
                  <div className="absolute inset-0 flex items-center justify-center text-white/50 text-[10px] font-bold">
                    ?
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="text-xs text-white/60">
              <span className="font-semibold">0%</span> {card.dataLabel}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <section ref={sectionRef} className={"py-20"} style={{ background: "transparent" }}>
      <div className="mx-auto w-full max-w-[1200px] px-4">
        <h2 className="text-center font-bold" style={{ fontSize: 34, lineHeight: 1.2 }}>
          <span className="gradient-headline">What We Hear From Marketing Teams</span>
        </h2>

        <div className="mt-10 flex flex-col gap-4 md:hidden" ref={mobileStackRef}>
          {cards.map((card) => (
            <div
              key={card.id}
              className="relative rounded-2xl border border-[#2A2B35] bg-[#0F1014] p-5"
              style={{ boxShadow: `0 0 0 1px rgba(255,255,255,0.04), 0 0 40px ${card.color}` }}
            >
              {renderCardBody(card)}
            </div>
          ))}
        </div>

        <div
          ref={deckRef}
          className="relative mx-auto mt-10 hidden md:block"
          style={{ width: 'min(100%, 620px)', height: 360, perspective: 1000 }}
          onMouseMove={onMove}
          onMouseLeave={onLeave}
        >
          {[0,1,2,3].map((stageIndex) => {
            const card = cards[order[stageIndex]];
            const stage = stages[stageIndex];
            const { x, y, mx, my, tiltX, tiltY } = useCardTransforms(stage.speed, stage.mag, stage.baseX, stage.baseY);
            const isHovered = hovered === stageIndex;
            const blurOther = hovered !== null && !isHovered ? 2 : 0;
            const extraGlow = isHovered ? 0.4 : 0;
            const opacity = stageIndex === 3 ? backOpacity : stageIndex === 2 ? midOpacity : stageIndex === 1 ? 0.9 : 1;
            const xCombined = useTransform([x, mx], ([a, b]) => (a as number) + (b as number));
            const yCombined = useTransform([y, my], ([a, b]) => (a as number) + (b as number));

            return (
              <motion.div
                key={card.id}
                className="absolute select-none rounded-2xl border p-5"
                style={{
                  width: 380,
                  height: 220,
                  left: stage.baseX,
                  top: stage.baseY,
                  zIndex: stage.z,
                  background: "linear-gradient(180deg, #1A1B23 0%, #0F1014 100%)",
                  borderColor: "#2A2B35",
                  boxShadow: `${card.glow}${extraGlow ? ", 0 0 30px " + card.color : ""}`,
                  filter: `blur(${blurOther}px)`,
                  transformStyle: "preserve-3d",
                  x: xCombined,
                  y: yCombined,
                  rotateX: tiltX,
                  rotateY: tiltY,
                  opacity,
                  rotateZ: rot as any,
                }}
                whileHover={{ scale: 1.02 }}
                onMouseEnter={() => setHovered(stageIndex)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => cycleDeck()}
                transition={{ type: "spring", stiffness: 140, damping: 18 }}
              >
                <motion.div className="h-full w-full">
                  <div className="absolute inset-0 rounded-2xl" style={{ pointerEvents: 'none', boxShadow: `inset 0 0 0 1px rgba(255,255,255,0.04), 0 0 80px ${card.color}` }} />
                  {renderCardBody(card)}
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Bridge Statement - Transition from Problem to Solution */}
        <motion.div 
          className="mx-auto mt-16 max-w-[700px] text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p className="text-lg md:text-xl font-medium leading-relaxed text-slate-300">
            Your webinar shouldn't vanish after the live session ends.{' '}
            <span className="gradient-headline font-semibold">GTM LABS</span> transforms 
            every recording into a{' '}
            <span className="relative inline-block">
              <span className="gradient-headline font-semibold">content engine</span>
              <span className="absolute inset-0 blur-xl bg-blue-500/20 -z-10" />
            </span>
            {' '}that keeps working, growing your list, filling your next event and proving ROI{' '}
            <span className="relative inline-block">
              <span className="gradient-headline font-semibold">without burning out your team</span>
              <span className="absolute inset-0 blur-xl bg-purple-500/20 -z-10" />
            </span>.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
