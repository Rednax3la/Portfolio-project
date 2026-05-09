import type { Metadata, Viewport } from 'next'
import { Space_Grotesk, DM_Sans, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  weight: ['400', '500', '600'],
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  weight: ['400', '500'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Alexander Wambugu — Builder. Data Scientist. African Innovator.',
  description:
    'Portfolio of Alexander Wambugu. Graduate data scientist and product builder from Nairobi, Kenya. Building Vernaculearn, Wrapsite, and more.',
  keywords: [
    'Alexander Wambugu',
    'data scientist',
    'Nairobi',
    'Kenya',
    'software developer',
    'AI',
    'Vernaculearn',
    'Wrapsite',
    'African tech',
    'portfolio',
  ],
  authors: [{ name: 'Alexander Wambugu', url: 'https://github.com/Rednax3la' }],
  openGraph: {
    type: 'website',
    title: 'Alexander Wambugu — Builder. Data Scientist. African Innovator.',
    description: 'Building real products for real people. From Nairobi, for the world.',
    siteName: 'Alexander Wambugu Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Alexander Wambugu — Portfolio',
    description: 'Building real products for real people.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  themeColor: '#050A14',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}
    >
      <body className="bg-space-void text-ink overflow-x-hidden">
        {/* Ambient scan line */}
        <div className="scan-line" aria-hidden="true" />
        {children}
      </body>
    </html>
  )
}
