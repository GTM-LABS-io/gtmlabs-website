"use client"

import { useEffect } from "react"

type DebugTarget = HTMLElement | null

const supportsResizeObserver = typeof window !== "undefined" && "ResizeObserver" in window
const lastSnapshots = new WeakMap<HTMLElement, string>()

function buildDomPath(element: HTMLElement) {
  const stack: string[] = []
  let node: HTMLElement | null = element
  while (node && stack.length < 8) {
    const id = node.id ? `#${node.id}` : ''
    const classes = node.className && typeof node.className === 'string'
      ? node.className.split(/\s+/).filter(Boolean).map((c) => `.${c}`).join('')
      : ''
    stack.unshift(`${node.tagName.toLowerCase()}${id}${classes}`)
    node = node.parentElement
  }
  return stack.join(' > ')
}

export function debugElementMetrics(element: DebugTarget, label: string) {
  if (!element) return
  const rect = element.getBoundingClientRect()
  const computed = window.getComputedStyle(element)
  const summary = {
    width: Math.round(rect.width * 1000) / 1000,
    scrollWidth: Math.round(element.scrollWidth * 1000) / 1000,
    clientWidth: Math.round(element.clientWidth * 1000) / 1000,
    offsetWidth: element.offsetWidth,
    diffX: Math.round((element.scrollWidth - element.clientWidth) * 1000) / 1000,
    diffOffset: Math.round((element.scrollWidth - element.offsetWidth) * 1000) / 1000,
  }

  const snapshotKey = JSON.stringify(summary)
  const previous = lastSnapshots.get(element)
  if (previous === snapshotKey) {
    return
  }
  lastSnapshots.set(element, snapshotKey)

  const overflowSummary = {
    diffX: summary.diffX,
    marginLeft: computed.marginLeft,
    marginRight: computed.marginRight,
    paddingLeft: computed.paddingLeft,
    paddingRight: computed.paddingRight,
    position: computed.position,
    display: computed.display,
    overflowX: computed.overflowX,
  }

  const timestamp = new Date().toISOString()
  if (summary.diffX > 0.5) {
    console.warn(`[Layout][${label}] overflowX ${summary.diffX}px @ ${timestamp}`, {
      summary,
      overflow: overflowSummary,
    })
  } else {
    console.log(`[Layout][${label}] summary @ ${timestamp}`, summary)
  }
}

export function useDebugRect(ref: React.RefObject<DebugTarget>, label: string) {
  useEffect(() => {
    const target = ref.current
    if (!target) return

    const report = () => {
      if (!ref.current) return
      debugElementMetrics(ref.current, label)
    }

    report()

    const resizeObserver = supportsResizeObserver
      ? new ResizeObserver(() => {
          report()
        })
      : null

    if (resizeObserver) {
      resizeObserver.observe(target)
    }

    window.addEventListener("resize", report)

    return () => {
      resizeObserver?.disconnect()
      window.removeEventListener("resize", report)
    }
  }, [ref, label])
}

export function logOverflowCandidates(threshold = 0.5) {
  if (typeof document === 'undefined') return
  const timestamp = new Date().toISOString()
  const entries: Array<{
    element: HTMLElement
    diffX: number
    diffOffset: number
    scrollWidth: number
    clientWidth: number
    offsetWidth: number
    path: string
    styles: Partial<CSSStyleDeclaration>
  }> = []

  const allElements = Array.from(document.body.querySelectorAll<HTMLElement>('*'))

  for (const el of allElements) {
    const scrollWidth = el.scrollWidth
    const clientWidth = el.clientWidth
    const offsetWidth = el.offsetWidth
    const diffX = Math.round((scrollWidth - clientWidth) * 1000) / 1000
    const diffOffset = Math.round((scrollWidth - offsetWidth) * 1000) / 1000
    if (diffX > threshold || diffOffset > threshold) {
      const computed = window.getComputedStyle(el)
      entries.push({
        element: el,
        diffX,
        diffOffset,
        scrollWidth,
        clientWidth,
        offsetWidth,
        path: buildDomPath(el),
        styles: {
          position: computed.position,
          display: computed.display,
          overflowX: computed.overflowX,
          marginLeft: computed.marginLeft,
          marginRight: computed.marginRight,
          paddingLeft: computed.paddingLeft,
          paddingRight: computed.paddingRight,
        },
      })
    }
  }

  if (entries.length === 0) {
    console.log(`[Layout] No overflow candidates @ ${timestamp}`, {
      document: {
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
        bodyScrollWidth: document.body.scrollWidth,
      },
    })
    return
  }

  entries.sort((a, b) => b.diffX - a.diffX)
  console.groupCollapsed(`[Layout] Overflow candidates (${entries.length}) @ ${timestamp}`)
  console.log('document', {
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
    bodyScrollWidth: document.body.scrollWidth,
  })
  entries.slice(0, 20).forEach((entry, index) => {
    console.warn(`candidate[${index}] diff=${entry.diffX}px offsetDiff=${entry.diffOffset}px`, {
      path: entry.path,
      scrollWidth: entry.scrollWidth,
      clientWidth: entry.clientWidth,
      offsetWidth: entry.offsetWidth,
      styles: entry.styles,
    })
  })
  console.groupEnd()
}
