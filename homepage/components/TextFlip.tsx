"use client"

import { useEffect, useState } from 'react'

type Props = {
  words: string[]
  interval?: number
  className?: string
}

export default function TextFlip({ words, interval = 2300, className }: Props) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (!words?.length) return
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length)
    }, interval)
    return () => clearInterval(id)
  }, [words, interval])

  if (!words?.length) return null

  return (
    <div className={`inline-flex items-center justify-center ${className ?? ''}`}>
      <span key={index} className="textflip-animate">
        {words[index]}
      </span>
    </div>
  )
}
