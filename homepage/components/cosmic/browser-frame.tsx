'use client'

import { cn } from '@/lib/utils'

interface BrowserFrameProps {
  children: React.ReactNode
  className?: string
  title?: string
  url?: string
}

export function BrowserFrame({ children, className, title = "Product Demo", url = "https://yoursite.com" }: BrowserFrameProps) {
  return (
    <div className={cn("rounded-lg overflow-hidden bg-zinc-900 shadow-2xl border border-zinc-700", className)}>
      {/* Browser Header */}
      <div className="flex items-center gap-2 px-4 py-3 bg-zinc-800 border-b border-zinc-700">
        {/* Traffic lights */}
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        
        {/* URL bar */}
        <div className="flex-1 mx-4">
          <div className="bg-zinc-700 rounded-md px-3 py-1 text-sm text-zinc-300 font-mono">
            {url}
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="relative overflow-hidden">
        {children}
      </div>
    </div>
  )
}