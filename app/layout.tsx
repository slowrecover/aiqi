import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AI-IQ Test - How AI Native Are You?',
  description: 'Discover your AI usage level with this brutally honest test',
  keywords: 'AI test, ChatGPT quiz, AI native, AI usage level',
  openGraph: {
    title: 'AI-IQ Test - How AI Native Are You?',
    description: 'Take this brutally honest quiz to find out your AI usage level',
    url: 'https://ai-iq.vercel.app',
    siteName: 'AI-IQ Test',
    type: 'website',
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
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}