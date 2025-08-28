import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AI-IQ Test - How AI Native Are You? | Free 2-Minute Quiz',
  description: 'Take this brutally honest 2-minute quiz to discover your AI usage level. Are you an AI Overlord, AI Native, AI Tourist, or Digital Amish? Find your AI-IQ score now!',
  keywords: 'AI IQ test, ChatGPT quiz, AI native test, artificial intelligence quiz, AI usage level, GPT test, AI personality quiz, AI literacy test, Claude test, AI skills assessment',
  metadataBase: new URL('https://ai-iq.vercel.app'),
  openGraph: {
    title: 'AI-IQ Test - How AI Native Are You? 🤖',
    description: 'Take this brutally honest quiz to find out if you\'re an AI Overlord or Digital Amish! Test your AI usage level in just 2 minutes.',
    url: 'https://ai-iq.vercel.app',
    siteName: 'AI-IQ Test',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary',
    title: 'AI-IQ Test - How AI Native Are You? 🤖',
    description: 'Take this brutally honest quiz to discover your AI usage level!',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-1LCG9G1L7N"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-1LCG9G1L7N');
            `,
          }}
        />
        {/* 结构化数据 for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Quiz',
              name: 'AI-IQ Test',
              description: 'Test your AI usage level',
              url: 'https://ai-iq.vercel.app',
              timeRequired: 'PT2M',
            })
          }}
        />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}