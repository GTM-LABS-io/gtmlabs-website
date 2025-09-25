"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, useMotionValue, useScroll, useSpring, useTransform, animate } from "framer-motion";
import { slackTokens } from "@/lib/design-tokens";

// Utility: clamp
const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));

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
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });

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

  function hex(hex: string, a: number) {
    const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!m) return hex;
    const r = parseInt(m[1], 16);
    const g = parseInt(m[2], 16);
    const b = parseInt(m[3], 16);
    return `rgba(${r}, ${g}, ${b}, ${a})`;
  }

  // Cards data (content only; visuals use stage props)
  const cards = useMemo(() => ([
    {
      id: 1,
      title: "Your Webinars Die After 60 Minutes",
      dataLabel: "of content value wasted",
      color: hex(brandPink, 0.12),
      glow: `0 0 0 1px ${hex(brandPink, 0.25)}, 0 20px 60px ${hex(brandPink, 0.15)}`,
      variant: "countdown" as const,
    },
    {
      id: 2,
      title: "20 Hours to Repurpose Manually",
      dataLabel: "in labor costs",
      color: hex(brandPurple, 0.12),
      glow: `0 0 0 1px ${hex(brandPurple, 0.25)}, 0 18px 50px ${hex(brandPurple, 0.12)}`,
      variant: "clock" as const,
    },
    {
      id: 3,
      title: "Missing 10,000+ Impressions",
      dataLabel: "Per webinar, every month",
      color: hex(brandBlue, 0.10),
      glow: `0 0 0 1px ${hex(brandBlue, 0.25)}, 0 16px 40px ${hex(brandBlue, 0.10)}`,
      variant: "graph" as const,
    },
  ]), []);

  // Stage props (front, middle, back) controls stacking/offset/speeds
  const stages = [
    { baseX: 0, baseY: 0, z: 30, speed: 1.0, mag: 20 },
    { baseX: 40, baseY: 30, z: 20, speed: 0.7, mag: 10 },
    { baseX: 80, baseY: 60, z: 10, speed: 0.4, mag: 5 },
  ] as const;

  // order = indices into cards for [front, middle, back]
  const [order, setOrder] = useState<number[]>([0, 1, 2]);
  const cycleDeck = () => setOrder(([a, b, c]) => [b, c, a]);

  // Animated numbers
  const wasted = useCountUp(87, 1.2);
  const labor = useCountUp(3000, 1.2);
  const impressions = useCountUp(10000, 1.2);
  const timeLeft = useCountdown(60, 1.8);

  return (
    <section ref={sectionRef} className={"py-20"} style={{ background: "transparent" }}>
      <div className="mx-auto w-full max-w-[1200px] px-4">
        <h2 className="text-center font-bold" style={{ fontSize: 34, lineHeight: 1.2 }}>
          <span className="gradient-headline">67% of B2B Companies Run Webinars, But...</span>
        </h2>

        <div
          className="relative mx-auto mt-10"
          style={{ width: 620, height: 360, perspective: 1000 }}
          onMouseMove={onMove}
          onMouseLeave={onLeave}
        >
          {[0,1,2].map((stageIndex) => {
            const card = cards[order[stageIndex]];
            const stage = stages[stageIndex];
            const { x, y, mx, my, tiltX, tiltY } = useCardTransforms(stage.speed, stage.mag, stage.baseX, stage.baseY);
            const isHovered = hovered === stageIndex;
            const blurOther = hovered !== null && !isHovered ? 2 : 0;
            const extraGlow = isHovered ? 0.4 : 0;
            const opacity = stageIndex === 2 ? backOpacity : stageIndex === 1 ? midOpacity : 1;
            const xCombined = useTransform([x, mx], ([a, b]) => (a as number) + (b as number));
            const yCombined = useTransform([y, my], ([a, b]) => (a as number) + (b as number));

            return (
              <motion.div
                key={card.id}
                className="absolute rounded-2xl border p-5 select-none"
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
                <motion.div className="w-full h-full">
                  {/* card tint overlay */}
                  <div className="absolute inset-0 rounded-2xl" style={{ pointerEvents: 'none', boxShadow: `inset 0 0 0 1px rgba(255,255,255,0.04), 0 0 80px ${card.color}` }} />
                  <div className="relative z-10">
                    <div className="text-white text-sm font-semibold">{card.title}</div>
                    {/* Visual per variant */}
                    <div className="mt-3">
                      {card.variant === "countdown" && (
                        <div className="flex items-center gap-3">
                          <div className="font-mono text-2xl" style={{ letterSpacing: '0.08em' }}>{timeLeft}</div>
                          <div className="h-6 w-px bg-white/10" />
                          <div className="text-sm text-white/70">
                            <span className="font-semibold">{wasted}%</span> {card.dataLabel}
                          </div>
                        </div>
                      )}
                      {card.variant === "clock" && (
                        <div className="flex items-center gap-3">
                          {/* clock */}
                          <div className="relative w-10 h-10 rounded-full border" style={{ borderColor: '#2A2B35' }}>
                            <div className="absolute left-1/2 bottom-1/2 w-0.5 h-4 bg-white/80 origin-bottom animate-spin" style={{ animationDuration: '6s' }} />
                            <div className="absolute left-1/2 bottom-1/2 w-0.5 h-3 bg-white/60 origin-bottom animate-spin" style={{ animationDuration: '12s' }} />
                          </div>
                          <div className="text-sm text-white/70">
                            <span className="font-semibold">${labor.toLocaleString()}</span> {card.dataLabel}
                          </div>
                        </div>
                      )}
                      {card.variant === "graph" && (
                        <div className="grid grid-cols-8 gap-1 items-end h-16">
                          {/* flatline */}
                          {[2,2,2,2].map((h, i) => (
                            <motion.div key={i} className="col-span-1 bg-white/10 rounded" initial={{ height: 0 }} animate={{ height: h }} transition={{ delay: 0.05 + i * 0.05 }} />
                          ))}
                          {/* growth */}
                          {[4,8,12,16].map((h, i) => (
                            <motion.div key={i} className="col-span-1 bg-white/20 rounded" initial={{ height: 0 }} animate={{ height: h }} transition={{ delay: 0.15 + i * 0.05 }} />
                          ))}
                          <div className="col-span-8 mt-2 text-sm text-white/70">
                            <span className="font-semibold">{impressions.toLocaleString()}+</span> {card.dataLabel}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
