'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Menu, X } from 'lucide-react'
import { CosmicButton } from './cosmic-button'
import { cn } from '@/lib/utils'
import { APP_NAME } from '@/lib/brand'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useDebugRect, logOverflowCandidates } from '@/lib/debug-layout'

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
  const navRef = useRef<HTMLElement | null>(null)
  const shellRef = useRef<HTMLDivElement | null>(null)
  const menuPanelRef = useRef<HTMLDivElement | null>(null)

  useDebugRect(navRef, 'CosmicHeader<nav>')
  useDebugRect(shellRef, 'CosmicHeader<shell>')
  useDebugRect(menuPanelRef, 'CosmicHeader<menu-panel>')

  const handlePricingClick = () => {
    setMenuState(false)
    if (typeof window === 'undefined') return
    if (window.location.pathname !== '/') {
      router.push('/#pricing')
      return
    }
    document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    console.log('[Layout][CosmicHeader] menu state change', {
      menuState,
      viewport: {
        innerWidth: window.innerWidth,
        scrollWidth: document.documentElement.scrollWidth,
      },
    })
    logOverflowCandidates()
  }, [menuState])

  useEffect(() => {
    console.log('[Layout][CosmicHeader] scroll state change', {
      isScrolled,
      scrollY: window.scrollY,
      viewport: {
        innerWidth: window.innerWidth,
        scrollWidth: document.documentElement.scrollWidth,
      },
    })
    logOverflowCandidates()
  }, [isScrolled])

  return (
    <header>
      <nav
        data-state={menuState && 'active'}
        className="fixed inset-x-0 top-0 z-50 w-full px-[env(safe-area-inset-left,0)] pr-[env(safe-area-inset-right,0)] group"
        ref={navRef}
      >
        <div
          ref={shellRef}
          className={cn(
          // Keep rounded corners at all times to avoid corner flash during size transitions
          'box-border mx-0 mt-0 w-full rounded-none border-b border-white/15 bg-black/70 px-3 py-2 transition-all duration-300 backdrop-blur-md sm:mx-auto sm:mt-2 sm:w-auto sm:max-w-6xl sm:rounded-2xl sm:border sm:border-transparent sm:bg-transparent sm:px-6 sm:py-0 lg:px-12',
          // When scrolled, tighten width and reveal subtle background + border
          isScrolled && 'bg-white/5 sm:max-w-4xl border-white/10 lg:px-5'
        )}
        >
          <div className="relative flex flex-wrap items-center justify-between gap-4 py-2 lg:gap-0 lg:py-4">
            <div className="flex w-full justify-between lg:w-auto">
              <Link
                href="/"
                aria-label="home"
                className="flex shrink-0 items-center space-x-1.5 sm:space-x-2"
              >
                <CosmicLogo />
              </Link>

              <button
                onClick={() => setMenuState(!menuState)}
                aria-label={menuState ? 'Close Menu' : 'Open Menu'}
                className="relative z-20 block h-10 w-10 shrink-0 cursor-pointer overflow-hidden rounded-full p-2.5 text-white lg:hidden"
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

            <div
              ref={menuPanelRef}
              className="bg-white/5 backdrop-blur-md group-data-[state=active]:block lg:group-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border border-white/10 p-6 shadow-2xl md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none"
            >
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
                    <button
                      type="button"
                      onClick={handlePricingClick}
                      className="text-zinc-400 hover:text-white flex items-center gap-2 duration-150 w-fit"
                    >
                      <span>Pricing</span>
                    </button>
                  </li>
                </ul>
              </div>
              <div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit">
                <button
                  type="button"
                  onClick={handlePricingClick}
                  className="hidden md:flex items-center gap-2 px-3 py-2 text-sm text-zinc-400 hover:text-white border border-white/10 rounded-lg hover:border-white/20 transition-all duration-200 bg-white/5 backdrop-blur-sm"
                >
                  <span>Pricing</span>
                </button>
                <CosmicButton
                  variant="ghost"
                  size="sm"
                  className={cn(isScrolled && showScrolledCta && 'lg:hidden')}
                  onClick={() => {
                    if (typeof window !== 'undefined') {
                      window.location.href = 'https://account.gtmlabs.io/';
                    }
                  }}
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
  const logoRef = useRef<HTMLDivElement | null>(null)
  useDebugRect(logoRef, 'CosmicLogo')
  return (
    <div ref={logoRef} className={cn('flex shrink-0 items-center space-x-2', className)}>
      <Image
        src="/gtm-labs-logo.png"
        alt={`${APP_NAME} logo`}
        width={32}
        height={32}
        className="h-8 w-8"
        priority
      />
      <span className="shrink-0 text-white text-base font-bold sm:text-lg">{APP_NAME}</span>
    </div>
  )
}
