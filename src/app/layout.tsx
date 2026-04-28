import type { Metadata } from 'next';
import { Playfair_Display, DM_Sans, DM_Mono } from 'next/font/google';
import './globals.css';
import Navbar from './components/navbar';

const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
});

const dmSans = DM_Sans({
  variable: '--font-dm-sans',
  subsets: ['latin'],
  weight: ['400', '500', '700'],
});

// [2] Configure DM Mono
const dmMono = DM_Mono({
  variable: '--font-dm-mono',
  subsets: ['latin'],
  weight: ['400', '500'],
});

export const metadata: Metadata = {
  title: 'Angelo Mark Flores Jr. | CS Student & Full-Stack Developer',
  description:
    'Personal Portfolio of Angelo Mark Flores Jr., a full-stack developer specializing in backend development.',
};

// app/layout.tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${dmSans.variable} ${dmMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-bg-base text-text-primary">
        <Navbar />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
