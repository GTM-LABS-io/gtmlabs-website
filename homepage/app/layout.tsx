import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'
import { SITE_URL, APP_NAME } from '@/lib/brand'
import { TwentyFirstToolbar } from '@21st-extension/toolbar-next'
import { ReactPlugin } from '@21st-extension/react'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: APP_NAME,
  description:
    'Share your work like you actually do it, in channels and threads. One link people get in 30 seconds.',
  generator: 'Next.js',
  openGraph: {
    title: APP_NAME,
    description:
      'Compose in channels, reply in threads, attach artifacts. Share a single link you control.',
    url: SITE_URL,
    siteName: APP_NAME,
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: APP_NAME,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
  twitter: {
    card: 'summary_large_image',
    title: APP_NAME,
    description: 'Share smart. Stay in control.',
    images: ['/og-image.png'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className={GeistSans.className}>
        {/* 21st.dev Toolbar (dev-only via package behavior) */}
        <TwentyFirstToolbar config={{ plugins: [ReactPlugin] }} />
        {children}
      </body>
    </html>
  )
}
