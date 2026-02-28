import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-geist-sans' });

export const metadata: Metadata = {
  title: { default: 'IndustryVerse — Understand the Industry Before You Enter It', template: '%s | IndustryVerse' },
  description: 'A corporate simulation-based learning ecosystem. Explore industries, understand professional roles, and complete real-world corporate projects with AI guidance.',
  keywords: ['corporate learning', 'industry simulation', 'career development', 'professional training', 'AI learning platform'],
  authors: [{ name: 'IndustryVerse' }],
  creator: 'IndustryVerse',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://industryverse.io',
    title: 'IndustryVerse — Corporate Simulation Learning Platform',
    description: 'Understand the industry before you enter it. Explore roles, complete real projects, and learn with AI.',
    siteName: 'IndustryVerse',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IndustryVerse',
    description: 'Corporate simulation-based learning for future professionals.',
    creator: '@industryverse',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
