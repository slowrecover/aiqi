// app/layout.tsx
import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import './globals.css';

const geist = Geist({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'AI-IQ Test - Are You an AI Genius or Digital Amish?',
  description: 'Find out if you are an AI Overlord or still using Internet Explorer. 90% of people fail this test. Takes 2 minutes.',
  
  metadataBase: new URL('https://ai-iq.vercel.app'),
  
  openGraph: {
    title: 'AI-IQ Test - Test Your AI Intelligence',
    description: 'Find out if you are an AI Overlord or Digital Amish. 90% score under 50%. Take the test now!',
    url: 'https://ai-iq.vercel.app',
    siteName: 'AI-IQ Test',
    images: [
      {
        url: '/api/og',
        width: 1200,
        height: 630,
        alt: 'AI-IQ Test',
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  
  twitter: {
    card: 'summary_large_image',
    title: 'AI-IQ Test - Are You an AI Genius?',
    description: 'Find out if you are an AI Overlord or Digital Amish. 90% of people fail this test.',
    images: ['/api/og'],
    creator: '@ai_iq_test',
  },
  
  keywords: ['AI', 'AI test', 'AI IQ', 'artificial intelligence', 'ChatGPT', 'AI quiz'],
  authors: [{ name: 'AI-IQ Test' }],
  creator: 'AI-IQ Test',
  publisher: 'AI-IQ Test',
  
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={geist.className}>{children}</body>
    </html>
  );
}