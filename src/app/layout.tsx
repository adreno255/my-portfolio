import type { Metadata } from 'next';
import { Playfair_Display, DM_Sans, DM_Mono } from 'next/font/google';
import './globals.css';
import Navbar from './components/navbar';
import { TopoBackground, DotGrid } from './components/background';

const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
});

const dmSans = DM_Sans({
  variable: '--font-dm-sans',
  subsets: ['latin'],
  weight: ['400', '500', '700'],
});

const dmMono = DM_Mono({
  variable: '--font-dm-mono',
  subsets: ['latin'],
  weight: ['400', '500'],
});

export const metadata: Metadata = {
  title: 'Angelo Mark Flores Jr. | Full-Stack Developer & CS Student',
  description:
    'Portfolio of Angelo Mark Flores Jr. — CS undergraduate at University of Caloocan City specializing in NestJS, React, Next.js, and PostgreSQL backend systems.',
  keywords: [
    'full-stack developer',
    'NestJS',
    'React',
    'Next.js',
    'Philippines developer',
    'CS student',
  ],
  authors: [{ name: 'Angelo Mark Flores Jr.' }],
  creator: 'Angelo Mark Flores Jr.',

  // Open Graph — controls how your link looks on Facebook, LinkedIn, Discord, etc.
  openGraph: {
    type: 'website',
    url: 'https://www.angelomarkfloresjr.tech',
    title: 'Angelo Mark Flores Jr. | Full-Stack Developer',
    description: 'CS undergraduate building scalable backend systems and full-stack apps.',
    siteName: 'Angelo Flores Portfolio',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },

  // Twitter/X card
  twitter: {
    card: 'summary_large_image',
    title: 'Angelo Mark Flores Jr. | Full-Stack Developer',
    description: 'CS undergraduate building scalable backend systems.',
    images: ['/og-image.png'],
  },

  // Tells crawlers not to block this site
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },

  // Canonical URL — prevents duplicate content penalties
  alternates: {
    canonical: 'https://www.angelomarkfloresjr.tech',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${dmSans.variable} ${dmMono.variable} h-full antialiased`}
    >
      {/*
        body: relative so the absolute background layers are contained here.
        min-h-full so the backgrounds cover the entire scrollable page.
      */}
      <body className="relative min-h-full bg-bg-base text-text-primary">
        {/* Background layers — absolute, behind everything */}
        <TopoBackground />
        <DotGrid />

        {/* Foreground — navbar + pages */}
        <div className="relative z-10 flex min-h-full flex-col">
          <Navbar />
          <main className="flex-1">{children}</main>
        </div>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Angelo Mark Flores Jr.',
              url: 'https://www.angelomarkfloresjr.tech',
              jobTitle: 'Full-Stack Developer',
              studentOf: 'University of Caloocan City',
              sameAs: [
                'https://github.com/adreno255',
                'https://linkedin.com/in/angelo-mark-flores-jr-85399a404',
              ],
            }),
          }}
        />
      </body>
    </html>
  );
}
