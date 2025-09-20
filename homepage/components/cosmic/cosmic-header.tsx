'use client'

import React, { useState, useEffect } from 'react'
import { Menu, X, Sparkles } from 'lucide-react'
import { CosmicButton } from './cosmic-button'
import { cn } from '@/lib/utils'
import { APP_NAME } from '@/lib/brand'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

type MenuItem = { name: string; href: string; onClick?: (e: React.MouseEvent) => void }

const defaultMenuItems: MenuItem[] = [
  { name: 'Features', href: '#features' },
  { name: 'Components', href: '#components' },
  { name: 'Gallery', href: '#gallery' },
  { name: 'About', href: '#about' },
]

export function CosmicHeader({ menuItems, showScrolledCta = true }: { menuItems?: MenuItem[]; showScrolledCta?: boolean }) {
  const [menuState, setMenuState] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header>
      <nav
        data-state={menuState && 'active'}
        className="fixed group z-50 w-full px-2"
      >
        <div className={cn(
          // Keep rounded corners at all times to avoid corner flash during size transitions
          'mx-auto mt-2 max-w-6xl px-6 transition-all duration-300 lg:px-12 rounded-2xl overflow-hidden backdrop-blur-md border border-transparent',
          // When scrolled, tighten width and reveal subtle background + border
          isScrolled && 'bg-white/5 max-w-4xl border-white/10 lg:px-5'
        )}>
          <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
            <div className="flex w-full justify-between lg:w-auto">
              <Link
                href="/"
                aria-label="home"
                className="flex items-center space-x-2"
              >
                <CosmicLogo />
              </Link>

              <button
                onClick={() => setMenuState(!menuState)}
                aria-label={menuState ? 'Close Menu' : 'Open Menu'}
                className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden text-white"
              >
                <Menu className="group-data-[state=active]:rotate-180 group-data-[state=active]:scale-0 group-data-[state=active]:opacity-0 m-auto size-6 duration-200" />
                <X className="group-data-[state=active]:rotate-0 group-data-[state=active]:scale-100 group-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200" />
              </button>
            </div>

            <div className="absolute inset-0 m-auto hidden size-fit lg:block">
              <ul className="flex gap-8 text-sm">
                {(menuItems ?? defaultMenuItems).map((item, index) => (
                  <li key={index}>
                    <Link
                      href={item.href}
                      className="text-zinc-400 hover:text-white block duration-150 transition-colors"
                      onClick={item.onClick}
                    >
                      <span>{item.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white/5 backdrop-blur-md group-data-[state=active]:block lg:group-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border border-white/10 p-6 shadow-2xl md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none">
              <div className="lg:hidden">
                <ul className="space-y-6 text-base">
                  {(menuItems ?? defaultMenuItems).map((item, index) => (
                    <li key={index}>
                      <Link
                        href={item.href}
                        className="text-zinc-400 hover:text-white block duration-150"
                        onClick={item.onClick}
                      >
                        <span>{item.name}</span>
                      </Link>
                    </li>
                  ))}
                  <li>
                    <a
                      href="https://threadfolio.featurebase.app/changelog"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-400 hover:text-white flex items-center gap-2 duration-150 w-fit"
                    >
                      <span>What's New</span>
                    </a>
                  </li>
                </ul>
              </div>
              <div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit">
                <a
                  href="https://threadfolio.featurebase.app/changelog"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden md:flex items-center gap-2 px-3 py-2 text-sm text-zinc-400 hover:text-white border border-white/10 rounded-lg hover:border-white/20 transition-all duration-200 bg-white/5 backdrop-blur-sm"
                >
                  <span>What's New</span>
                </a>
                <CosmicButton
                  variant="ghost"
                  size="sm"
                  className={cn(isScrolled && showScrolledCta && 'lg:hidden')}
                  onClick={() => router.push('/login')}
                >
                  Sign In
                </CosmicButton>
                {/* Sign Up removed in one-button auth model */}
                {showScrolledCta && (
                  <CosmicButton
                    variant="brand"
                    size="sm"
                    glow
                    className={cn(isScrolled ? 'lg:inline-flex' : 'hidden')}
                    onClick={() => router.push('/login')}
                  >
                    Get Started
                  </CosmicButton>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}

const CosmicLogo = ({ className }: { className?: string }) => {
  return (
    <div className={cn('flex items-center space-x-2', className)}>
      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 via-sky-500 to-fuchsia-500 flex items-center justify-center">
        <Sparkles className="w-4 h-4 text-white" />
      </div>
      <span className="text-white font-bold text-lg">{APP_NAME}</span>
    </div>
  )
}

