"use client"
import { ComponentPropsWithoutRef, useEffect, useRef, useState } from "react"
import {
  animate,
  motion,
  useMotionTemplate,
  useMotionValue,
} from "framer-motion"
import { LayoutDashboard, Rocket, Lightbulb } from "lucide-react"
import { BorderBeam } from "@/components/magicui/border-beam"
import { uiBlueprint as ui } from "@/components/ui/ui-blueprint"

// Brand-consistent beam/shimmer colors (sky -> blue)
const brandBeam = {
  from: "#0ea5e9", // tailwind sky-500
  to: "#3b82f6",   // tailwind blue-500
  border: "#3b82f6",
}

const tabs = [
  {
    icon: LayoutDashboard,
    title: "Dashboard Overview",
    description:
      "A centralized space to monitor your site’s SEO health, traffic, and performance trends in real-time.",
    isNew: false,
    backgroundPositionX: 0,
    backgroundPositionY: 0,
    backgroundSizeX: 150,
    image:
      "https://images.unsplash.com/photo-1556157382-97eda2f9e2bf?auto=format&fit=crop&w=1600&q=80",
  },
  {
    icon: Rocket,
    title: "Boost with One Click",
    description:
      "Easily apply SEO best practices like lazy loading, alt-text fixes, and meta updates without writing code.",
    isNew: false,
    backgroundPositionX: 80,
    backgroundPositionY: 90,
    backgroundSizeX: 135,
    image:
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1600&q=80",
  },
  {
    icon: Lightbulb,
    title: "AI Keyword Suggestions",
    description:
      "Discover trending, high-intent keywords tailored to your content niche using Ruixen’s smart AI engine.",
    isNew: false,
    backgroundPositionX: 120,
    backgroundPositionY: 30,
    backgroundSizeX: 170,
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1600&q=80",
  },
]

const FeatureTab = (
  props: (typeof tabs)[number] &
    ComponentPropsWithoutRef<"div"> & { selected: boolean }
) => {
  const tabRef = useRef<HTMLDivElement>(null)

  // Motion values for shimmer border mask animation
  const xPercent = useMotionValue(100)
  const yPercent = useMotionValue(0)
  const maskImage = useMotionTemplate`radial-gradient(100px 50px at ${xPercent}% ${yPercent}%, black, transparent)`

  useEffect(() => {
    if (!tabRef.current || !props.selected) return

    xPercent.set(0)
    yPercent.set(0)
    const { height, width } = tabRef.current?.getBoundingClientRect()
    const circumference = height * 2 + width * 2
    const times = [
      0,
      width / circumference,
      (width + height) / circumference,
      (width * 2 + height) / circumference,
      1,
    ]

    animate(xPercent, [0, 100, 100, 0, 0], {
      duration: 4,
      times,
      ease: "linear",
      repeat: Infinity,
      repeatType: "loop",
    })
    animate(yPercent, [0, 0, 100, 100, 0], {
      times,
      duration: 4,
      ease: "linear",
      repeat: Infinity,
      repeatType: "loop",
    })
  }, [props.selected])

  return (
    <div
      ref={tabRef}
      onClick={props.onClick}
      className={[
        "relative cursor-pointer rounded-lg inline-flex items-center gap-2 py-1 pr-4",
        // Keep tab colors from existing FeatureTabs
        props.selected ? "bg-[#191A23]" : "hover:bg-[#191A23]/40",
        // Keep pill text color per brand memory
        "text-[color:var(--brand-pill-text,#BFDBFE)]",
      ].join(" ")}
    >
      {props.selected && (
        <motion.div
          style={{ maskImage, borderColor: brandBeam.border }}
          className="absolute inset-0 -m-px rounded-lg border"
        />
      )}

      <div className="ml-3 inline-flex h-8 w-8 items-center justify-center rounded-lg px-2 py-1">
        <props.icon className="h-4 w-4 text-blue-300" />
      </div>
      <div className="text-sm font-medium tracking-tight">{props.title}</div>
      {props.isNew && (
        <div className="rounded-lg bg-purple-400 p-2 text-xs font-semibold text-black">
          new
        </div>
      )}
    </div>
  )
}

export default function RuixenFeaturedImageSection() {
  // 0 is the index of the tab.
  const [selectedTab, setSelectedTab] = useState(0)

  // Background motion values driven by tabs
  const backgroundPositionX = useMotionValue(tabs[0].backgroundPositionX)
  const backgroundPositionY = useMotionValue(tabs[0].backgroundPositionY)
  const backgroundSizeX = useMotionValue(tabs[0].backgroundSizeX)

  const backgroundPosition = useMotionTemplate`${backgroundPositionX}% ${backgroundPositionY}%`
  const backgroundSize = useMotionTemplate`${backgroundSizeX}% auto`

  const handleSelecttab = (index: number) => {
    setSelectedTab(index)

    animate(backgroundSizeX, [backgroundSizeX.get(), 100, tabs[index].backgroundSizeX], {
      duration: 2,
      ease: "easeInOut",
    })
    animate(
      backgroundPositionX,
      [backgroundPositionX.get(), 100, tabs[index].backgroundPositionX],
      {
        duration: 2,
        ease: "easeInOut",
      }
    )
    animate(
      backgroundPositionY,
      [backgroundPositionY.get(), 100, tabs[index].backgroundPositionY],
      {
        duration: 2,
        ease: "easeInOut",
      }
    )
  }

  return (
    <section className="py-20 md:py-28">
      <div className="container">
        <h2 className="section-headline gradient-headline text-center">Supercharge your content with Ruixen UI.</h2>
        <p className="section-description mx-auto mt-5 max-w-3xl text-center">
          Ruixen UI helps you craft, plan, and publish content effortlessly—powered by AI and built for scale.
        </p>

        {/* Tabs */}
        <div className="relative mt-10 flex justify-center">
          <div className="inline-flex flex-col gap-1 rounded-xl bg-[#090C14] p-1 lg:flex-row">
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

        {/* Display panel with border + beam effect to match BrowserFrame usage */}
        <div className="mt-10 rounded-2xl border-2 border-gray-200 p-2.5 dark:border-gray-800">
          <div className="relative overflow-hidden">
            <motion.div
              className="aspect-video rounded-lg border bg-cover border-gray-200 dark:border-gray-800"
              style={{
                backgroundPosition,
                backgroundSize,
                // Per-tab image
                backgroundImage: `url(${tabs[selectedTab].image})`,
              }}
            />
            <BorderBeam
              duration={5}
              size={220}
              colorFrom={brandBeam.from}
              colorTo={brandBeam.to}
              borderWidth={2}
            />
          </div>
        </div>

        {/* Bottom Description - matches FeatureTabs description card */}
        <div
          className="mt-6 rounded-xl p-4 sm:p-6 border border-white/10 backdrop-blur-sm transition-all duration-[240ms] text-center sm:text-left bg-[#090C14]"
          style={{
            ...ui.fontStyle(),
          }}
        >
          {(() => {
            const ActiveIcon = tabs[selectedTab].icon
            return (
              <h3 className="card-title-sm mb-2 sm:mb-3 inline-flex items-center gap-2 bg-[#090C14]">
                <ActiveIcon className="w-4 h-4 text-blue-300" />
                <span className="gradient-headline">{tabs[selectedTab].title}</span>
              </h3>
            )
          })()}
          <p className="card-text">{tabs[selectedTab].description}</p>
        </div>
      </div>
    </section>
  )
}
