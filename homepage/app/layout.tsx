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
    'Turn webinars into GTM engines. GTM LABS repurposes your long-form content into blogs, clips, newsletters, and lead magnets in 72 hours.',
  generator: 'Next.js',
  openGraph: {
    title: APP_NAME,
    description:
      'Repurpose every webinar into 30+ on-brand assets with GTM LABS. Launch-ready blogs, LinkedIn posts, newsletters, and lead magnets delivered fast.',
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
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
    shortcut: ['/favicon.svg'],
    apple: ['/favicon.svg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: APP_NAME,
    description: 'Transform webinars into full-funnel content with GTM LABS.',
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
