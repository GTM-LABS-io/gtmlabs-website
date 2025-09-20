'use client'

import { InfiniteSlider } from '@/components/ui/infinite-slider'
import { ProgressiveBlur } from '@/components/ui/progressive-blur'

const brands = [
  {
    name: 'Vercel',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg'
  },
  {
    name: 'Next.js',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg'
  },
  {
    name: 'React',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg'
  },
  {
    name: 'TypeScript',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg'
  },
  {
    name: 'Tailwind CSS',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg'
  },
  {
    name: 'Supabase',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg'
  },
  {
    name: 'GitHub',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg'
  },
  {
    name: 'Figma',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg'
  }
]

export function CosmicMarquee() {
  return (
    <section className="py-16">
      <div className="group relative m-auto max-w-6xl px-6">
        <div className="flex flex-col items-center md:flex-row">
          <div className="inline md:max-w-44 md:border-r md:border-white/10 md:pr-6">
            <p className="text-end text-sm text-zinc-400">Powered by the best</p>
          </div>
          <div className="relative py-6 md:w-[calc(100%-11rem)]">
            <InfiniteSlider
              speedOnHover={20}
              speed={40}
              gap={112}
            >
              {brands.map((brand, index) => (
                <div key={index} className="flex">
                  <img
                    className="mx-auto h-6 w-fit opacity-60 hover:opacity-100 transition-opacity duration-200 filter invert"
                    src={brand.logo}
                    alt={`${brand.name} Logo`}
                    height="24"
                    width="auto"
                  />
                </div>
              ))}
            </InfiniteSlider>

            {/* Gradient overlays for smooth fade */}
            <div className="bg-gradient-to-r from-cosmic-obsidian-900 to-transparent absolute inset-y-0 left-0 w-20 pointer-events-none"></div>
            <div className="bg-gradient-to-l from-cosmic-obsidian-900 to-transparent absolute inset-y-0 right-0 w-20 pointer-events-none"></div>
            
            <ProgressiveBlur
              className="pointer-events-none absolute left-0 top-0 h-full w-20"
              direction="left"
              blurIntensity={1}
            />
            <ProgressiveBlur
              className="pointer-events-none absolute right-0 top-0 h-full w-20"
              direction="right"
              blurIntensity={1}
            />
          </div>
        </div>
      </div>
    </section>
  )
}