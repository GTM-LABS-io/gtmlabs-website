"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { Video, FileText, Mail, Download, CheckCircle, DollarSign, TrendingUp, Users, BarChart3 } from "lucide-react";
import { useState, useEffect } from "react";

// Animated Number Component (inspired by Sliding Number)
function AnimatedNumber({ value, prefix = "", suffix = "" }: { value: number; prefix?: string; suffix?: string }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    const controls = animate(count, value, {
      duration: 1.5,
      ease: "easeOut",
    });
    return controls.stop;
  }, [value, count]);

  return (
    <span>
      {prefix}
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}

// ROW 1: The Multiplier Animation - Single Input to Multiple Outputs
export function MultiplierAnimation() {
  const [isHovered, setIsHovered] = useState(false);

  const outputIcons = [
    { icon: Video, label: "Clips" },
    { icon: FileText, label: "Posts" },
    { icon: Mail, label: "Emails" },
    { icon: Download, label: "Magnets" },
    { icon: FileText, label: "Blogs" },
    { icon: Video, label: "Shorts" },
  ];

  return (
    <div
      className="relative h-80 rounded-xl bg-gradient-to-b from-black to-black flex items-center justify-center overflow-hidden py-8"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div 
        className="flex items-center justify-center gap-12"
        animate={{
          x: isHovered ? -80 : 0,
        }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      >
        {/* Left Side - Single Input */}
        <motion.div
          className="flex flex-col items-center"
        >
          <motion.div 
            className="rounded-xl bg-blue-500/20 border border-white/10 flex items-center justify-center mb-3"
            animate={{
              width: isHovered ? 80 : 120,
              height: isHovered ? 80 : 120,
            }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          >
            <motion.div
              animate={{
                scale: isHovered ? 1 : 1.5,
              }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              <Video className="w-10 h-10 text-blue-300" />
            </motion.div>
          </motion.div>
          <div className="text-white text-sm font-medium">1 Webinar</div>
        </motion.div>

        {/* Arrow */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: isHovered ? 1 : 0,
            scale: isHovered ? 1 : 0,
          }}
          transition={{ delay: 0.1, duration: 0.5, ease: "easeInOut" }}
        >
          <div className="text-blue-300 text-3xl">→</div>
        </motion.div>

        {/* Right Side - Multiple Outputs Grid */}
        <motion.div
          className="grid grid-cols-3 gap-3"
          initial={{ opacity: 0, x: -20 }}
          animate={{
            opacity: isHovered ? 1 : 0,
            x: isHovered ? 0 : -20,
          }}
          transition={{ delay: 0.2, duration: 0.6, ease: "easeInOut" }}
        >
          {outputIcons.map((output, i) => {
            const Icon = output.icon;
            return (
              <motion.div
                key={i}
                className="flex flex-col items-center"
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: isHovered ? 1 : 0,
                  scale: isHovered ? 1 : 0,
                }}
                transition={{
                  delay: 0.3 + i * 0.05,
                  duration: 0.6,
                  ease: "easeInOut",
                }}
              >
                <div className="w-12 h-12 rounded-lg bg-blue-500/20 border border-white/10 flex items-center justify-center mb-1">
                  <Icon className="w-5 h-5 text-blue-300" />
                </div>
                <div className="text-white/60 text-[10px]">{output.label}</div>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>

      {/* Bottom Label */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ delay: 0.5, duration: 0.5, ease: "easeInOut" }}
      >
        <div className="text-blue-300 text-sm font-medium">30+ Assets</div>
      </motion.div>
    </div>
  );
}

// ROW 2: The Balance Scale Animation - Progress Bars with Load Distribution
export function BalanceScaleAnimation() {
  const [isHovered, setIsHovered] = useState(false);

  const workloadBars = [
    { label: "Content Creation", before: 40, after: 95 },
    { label: "Design Work", before: 35, after: 90 },
    { label: "Distribution", before: 30, after: 85 },
    { label: "Analytics", before: 25, after: 80 },
  ];

  return (
    <div
      className="relative h-80 rounded-xl bg-gradient-to-b from-black to-black flex items-center justify-center overflow-hidden px-8 py-8"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="w-full max-w-md space-y-5">
        {/* Header */}
        <div className="text-center mb-6">
          <motion.div
            className="text-white font-bold text-lg"
            animate={{ color: isHovered ? "#93c5fd" : "#ffffff" }}
          >
            Team Workload
          </motion.div>
          <motion.div
            className="text-white/60 text-sm mt-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
          >
            {isHovered ? "Balanced & Efficient" : "Overwhelmed"}
          </motion.div>
        </div>

        {/* Progress Bars */}
        {workloadBars.map((bar, i) => (
          <div key={i} className="space-y-1">
            <div className="flex justify-between text-xs text-white/60">
              <span>{bar.label}</span>
              <motion.span
                className="font-bold"
                animate={{
                  color: isHovered ? "#93c5fd" : "#ffffff",
                }}
              >
                {isHovered ? (
                  <AnimatedNumber value={bar.after} suffix="%" />
                ) : (
                  `${bar.before}%`
                )}
              </motion.span>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-blue-500/60 rounded-full relative"
                initial={{ width: `${bar.before}%` }}
                animate={{
                  width: isHovered ? `${bar.after}%` : `${bar.before}%`,
                }}
                transition={{
                  duration: 0.7,
                  ease: "easeInOut",
                  delay: i * 0.1,
                }}
              >
                {/* Glow effect */}
                <motion.div
                  className="absolute inset-0 blur-sm"
                  animate={{
                    opacity: isHovered ? 0.6 : 0,
                  }}
                  style={{ backgroundColor: "currentColor" }}
                />
              </motion.div>
            </div>
          </div>
        ))}

        {/* 10x Label */}
        <motion.div
          className="text-center pt-4"
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: isHovered ? 1 : 0,
            scale: isHovered ? 1 : 0,
          }}
          transition={{
            duration: 0.6,
            ease: "easeInOut",
            delay: 0.4,
          }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/20 border border-white/10">
            <TrendingUp className="w-4 h-4 text-blue-300" />
            <span className="text-blue-300 font-bold text-base">10x Output</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// ROW 3: The Fog Lift Animation - Funnel with Layered Data
export function FogLiftAnimation() {
  const [isHovered, setIsHovered] = useState(false);

  const funnelSteps = [
    { label: "Post", value: 1000, width: 100, color: "from-blue-500/40 to-blue-600/20" },
    { label: "Click", value: 750, width: 85, color: "from-blue-500/50 to-blue-600/30" },
    { label: "Landing", value: 500, width: 70, color: "from-blue-500/60 to-blue-600/40" },
    { label: "Download", value: 300, width: 55, color: "from-blue-500/70 to-blue-600/50" },
    { label: "Subscriber", value: 150, width: 40, color: "from-blue-500/80 to-blue-600/60" },
    { label: "Revenue", value: 75, width: 25, color: "from-blue-500/90 to-blue-600/70" },
  ];

  return (
    <div
      className="relative h-80 rounded-xl bg-black flex items-center justify-center overflow-hidden py-8"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >

      {/* Question Marks (Foggy State) - Floating Animation - Only show when NOT hovering */}
      {!isHovered && [...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-white text-3xl font-bold z-20 cursor-pointer"
          style={{
            left: `${15 + i * 11}%`,
            top: `${25 + (i % 3) * 15}%`,
          }}
          initial={{ opacity: 0.2, scale: 1, y: 0 }}
          animate={{
            opacity: [0.2, 0.4, 0.2],
            scale: [1, 1.1, 1],
            y: [0, -8, 0],
          }}
          transition={{
            opacity: { duration: 2, repeat: Infinity, delay: i * 0.2 },
            scale: { duration: 2, repeat: Infinity, delay: i * 0.2 },
            y: { duration: 2, repeat: Infinity, delay: i * 0.2, ease: "easeInOut" },
          }}
          whileHover={{
            scale: 1.3,
            opacity: 0.6,
            transition: { duration: 0.2 },
          }}
        >
          ?
        </motion.div>
      ))}

      {/* Funnel Visualization */}
      <div className="relative w-full max-w-md px-8 space-y-2">
        {funnelSteps.map((step, i) => {
          const conversionRate = i > 0 ? Math.round((step.value / funnelSteps[i - 1].value) * 100) : 100;
          
          return (
            <motion.div
              key={i}
              className="relative"
              initial={{ opacity: 0, x: -20 }}
              animate={{
                opacity: isHovered ? 1 : 0,
                x: isHovered ? 0 : -20,
              }}
              transition={{
                delay: i * 0.1,
                duration: 0.5,
                ease: "easeInOut",
              }}
            >
              <div className="flex items-center gap-3">
                {/* Funnel Bar */}
                <motion.div
                  className={`h-8 rounded-r-lg bg-gradient-to-r ${step.color} border border-white/20 relative overflow-hidden`}
                  style={{ width: `${step.width}%` }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: isHovered ? 1 : 0 }}
                  transition={{
                    delay: i * 0.1 + 0.2,
                    duration: 0.6,
                    ease: "easeInOut",
                  }}
                >
                  {/* Glow effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                    animate={{
                      x: isHovered ? ["0%", "100%"] : "0%",
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.2,
                      ease: "easeInOut",
                    }}
                  />
                  
                  {/* Label */}
                  <div className="absolute inset-0 flex items-center justify-between px-3">
                    <span className="text-white font-semibold text-sm">{step.label}</span>
                    <span className="text-white/80 text-xs font-mono">
                      <AnimatedNumber value={step.value} />
                    </span>
                  </div>
                </motion.div>

                {/* Conversion Rate */}
                <motion.div
                  className="text-blue-300 text-xs font-bold whitespace-nowrap"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isHovered ? 1 : 0 }}
                  transition={{ delay: i * 0.1 + 0.4, ease: "easeInOut" }}
                >
                  {conversionRate}%
                </motion.div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Clear Attribution Label */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{
          opacity: isHovered ? 1 : 0,
          y: isHovered ? 0 : 10,
        }}
        transition={{ delay: 0.8, duration: 0.5, ease: "easeInOut" }}
      >
        <div className="text-blue-300 font-bold text-sm">Full Funnel Visibility</div>
      </motion.div>
    </div>
  );
}

// ROW 4: The Flywheel Ignition Animation - Dashboard Metrics with Growth
export function FlywheelAnimation() {
  const [isHovered, setIsHovered] = useState(false);

  const metrics = [
    { label: "Leads Generated", before: 50, after: 500, icon: Users },
    { label: "Pipeline Value", before: 10000, after: 100000, icon: DollarSign },
    { label: "Revenue Impact", before: 5000, after: 50000, icon: TrendingUp },
  ];

  return (
    <div
      className="relative h-80 rounded-xl bg-gradient-to-b from-black to-black flex items-center justify-center overflow-hidden px-8 py-8"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="w-full max-w-md space-y-5">
        {/* Header */}
        <div className="text-center mb-4">
          <motion.div
            className="text-white font-bold text-xl mb-2"
            animate={{ color: isHovered ? "#93c5fd" : "#ffffff" }}
          >
            Marketing ROI
          </motion.div>
          <motion.div
            className="text-white/60 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
          >
            {isHovered ? "Revenue Engine Active" : "Cost Center"}
          </motion.div>
        </div>

        {/* Metrics Cards */}
        <div className="space-y-4">
          {metrics.map((metric, i) => (
            <motion.div
              key={i}
              className="relative rounded-xl border border-white/10 bg-blue-500/10 p-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: isHovered ? 1 : 0.7,
                y: isHovered ? 0 : 20,
                scale: isHovered ? 1 : 0.95,
              }}
              transition={{
                duration: 0.7,
                ease: "easeInOut",
                delay: i * 0.1,
              }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <motion.div
                    className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center"
                    animate={{
                      scale: isHovered ? [1, 1.1, 1] : 1,
                    }}
                    transition={{
                      duration: 0.6,
                      delay: i * 0.1 + 0.3,
                      ease: "easeInOut",
                    }}
                  >
                    <metric.icon className="w-4 h-4 text-blue-300" />
                  </motion.div>
                  <div>
                    <div className="text-white/60 text-xs">{metric.label}</div>
                    <motion.div
                      className="font-bold text-xl text-blue-300"
                      animate={{
                        scale: isHovered ? [1, 1.1, 1] : 1,
                      }}
                      transition={{
                        duration: 0.6,
                        delay: i * 0.1 + 0.4,
                        ease: "easeInOut",
                      }}
                    >
                      {isHovered ? (
                        metric.label.includes("Value") || metric.label.includes("Impact") ? (
                          <span>$<AnimatedNumber value={metric.after / 1000} />k</span>
                        ) : (
                          <AnimatedNumber value={metric.after} />
                        )
                      ) : (
                        metric.label.includes("Value") || metric.label.includes("Impact") ? (
                          `$${metric.before / 1000}k`
                        ) : (
                          metric.before
                        )
                      )}
                    </motion.div>
                  </div>
                </div>

                {/* Growth Indicator */}
                <motion.div
                  className="flex flex-col items-end"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{
                    opacity: isHovered ? 1 : 0,
                    x: isHovered ? 0 : -10,
                  }}
                  transition={{ delay: i * 0.1 + 0.5, duration: 0.5, ease: "easeInOut" }}
                >
                  <div className="text-blue-300 text-2xl">↑</div>
                  <div className="text-blue-300 text-xs font-bold">10x</div>
                </motion.div>
              </div>

              {/* Progress indicator */}
              <motion.div
                className="mt-3 h-1 bg-white/10 rounded-full overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovered ? 1 : 0 }}
              >
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-500/60 to-transparent"
                  initial={{ width: "10%" }}
                  animate={{ width: isHovered ? "100%" : "10%" }}
                  transition={{
                    duration: 1,
                    delay: i * 0.1 + 0.6,
                    ease: "easeInOut",
                  }}
                />
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Multiplier Badge */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: isHovered ? 1 : 0,
            scale: isHovered ? 1 : 0,
          }}
          transition={{
            duration: 0.6,
            ease: [0.4, 0, 0.2, 1],
            delay: 0.6,
          }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/20 border border-white/10">
            <span className="text-white font-bold">1x Input</span>
            <span className="text-white">→</span>
            <span className="text-blue-300 font-bold">10x Output</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
