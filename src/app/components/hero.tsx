'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

import { DotGrid, TopoBackground } from './background';
import { RaisedButton, SocialButton } from './buttons';
import { GithubIcon, LinkedinIcon, MailIcon, DownloadIcon, ArrowRightIcon } from './icons';

// ─── Stats Bar ─────────────────────────────────────────────────────────────
const STATS = [
  { value: '7', label: 'projects' },
  { value: '8+', label: 'technologies' },
  { value: '2+', label: 'years coding' },
];

function CountUp({ target }: { target: string }) {
  const [display, setDisplay] = useState('0');
  const hasPlus = target.endsWith('+');
  const num = parseInt(target);

  useEffect(() => {
    let frame = 0;
    const total = 40;
    const timer = setInterval(() => {
      frame++;
      const eased = 1 - Math.pow(1 - frame / total, 3);
      const current = Math.round(eased * num);
      setDisplay(String(current) + (hasPlus && frame >= total ? '+' : ''));
      if (frame >= total) clearInterval(timer);
    }, 30);
    return () => clearInterval(timer);
  }, [num, hasPlus]);

  return <>{display}</>;
}

// ─── Arc Glow — kept as a subtle directional vignette ──────────────────────
function ArcGlow() {
  return (
    <div
      className="pointer-events-none absolute left-0 right-0 overflow-hidden"
      style={{ bottom: 0, height: '55%' }}
      aria-hidden
    >
      <div
        className="animate-arc-pulse absolute left-1/2 -translate-x-1/2"
        style={{
          bottom: '-40px',
          width: 'min(860px, 120vw)',
          height: '320px',
          background:
            'radial-gradient(ellipse 55% 45% at 50% 100%, rgba(201,169,110,0.12) 0%, rgba(201,169,110,0.04) 45%, transparent 70%)',
          filter: 'blur(28px)',
        }}
      />

      <svg
        className="absolute left-1/2 -translate-x-1/2"
        style={{ bottom: '-12px', width: 'min(980px, 140vw)', overflow: 'visible' }}
        viewBox="0 0 960 300"
        fill="none"
        preserveAspectRatio="xMidYMax meet"
      >
        <defs>
          <linearGradient id="arc-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="28%" stopColor="rgba(201,169,110,0.0)" />
            <stop offset="43%" stopColor="rgba(232,230,225,0.7)" />
            <stop offset="50%" stopColor="rgba(232,230,225,1)" />
            <stop offset="57%" stopColor="rgba(232,230,225,0.7)" />
            <stop offset="72%" stopColor="rgba(201,169,110,0.0)" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
          <linearGradient id="animate-arc-shimmer" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="47%" stopColor="transparent" />
            <stop offset="50%" stopColor="rgba(255,255,255,0.6)" />
            <stop offset="53%" stopColor="transparent" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
          <filter id="arc-glow" x="-20%" y="-300%" width="140%" height="700%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="shimmer-blur" x="-30%" y="-300%" width="160%" height="700%">
            <feGaussianBlur stdDeviation="2" />
          </filter>
        </defs>

        <path
          d="M 60,300 Q 480,-20 900,300"
          stroke="rgba(201,169,110,0.08)"
          strokeWidth="22"
          fill="none"
          className="animate-arc-glow-pulse"
          style={{ filter: 'blur(12px)' }}
        />
        <path
          d="M 0,300 Q 480,-30 960,300"
          stroke="url(#arc-grad)"
          strokeWidth="1"
          fill="none"
          filter="url(#arc-glow)"
        />
        <path
          d="M 0,300 Q 480,-30 960,300"
          stroke="url(#animate-arc-shimmer)"
          strokeWidth="2"
          fill="none"
          filter="url(#shimmer-blur)"
          strokeDasharray="200 2000"
          className="animate-arc-shimmer"
        />
      </svg>
    </div>
  );
}

// ─── Hero ──────────────────────────────────────────────────────────────────
export default function Hero() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  const reveal = (delay: number) => ({
    style: {
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(20px)',
      transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
    },
  });

  return (
    <>
      <section
        id="hero"
        className="relative flex min-h-screen flex-col overflow-hidden bg-bg-base"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        {/* Animated topographic background */}
        <TopoBackground />

        {/* Dot Grid background */}
        <DotGrid />

        {/* Subtle arc glow at bottom */}
        <ArcGlow />

        <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col px-6 pt-28 md:pt-32">
          <div className="flex flex-1 flex-col items-start justify-center md:flex-row md:items-center md:justify-between md:gap-12">
            {/* ── Left: text ── */}
            <div className="flex flex-col items-center text-center md:items-start md:text-left">
              {/* Mobile avatar */}
              <div className="mb-8 block md:hidden" {...reveal(100)}>
                <div className="animate-avatar-float relative mx-auto h-36 w-36 sm:h-44 sm:w-44">
                  <Image
                    src="/profile-pic.JPG"
                    alt="Angelo Mark Flores Jr."
                    fill
                    sizes="(max-width: 640px) 144px, 176px"
                    className="rounded-full border border-border-default object-cover object-top"
                    style={{
                      boxShadow: '0 0 0 4px accent-subtle, 0 0 40px rgba(0,0,0,0.6)',
                    }}
                    loading="eager"
                  />
                </div>
              </div>

              <div {...reveal(150)}>
                <p className="mb-4 flex items-center gap-3 text-xs font-medium tracking-[0.2em] text-accent">
                  <span className="h-px w-6 bg-accent/60" />
                  OPEN TO OPPORTUNITIES
                </p>
              </div>

              <div {...reveal(250)}>
                <h1
                  className="mb-3 text-5xl font-bold leading-[1.05] tracking-tight text-text-primary sm:text-6xl lg:text-7xl"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Angelo Mark
                  <br />
                  Flores Jr.
                </h1>
              </div>

              <div {...reveal(340)}>
                <p
                  className="mb-7 text-2xl font-normal italic text-accent sm:text-3xl lg:text-4xl"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Full-Stack Developer
                </p>
              </div>

              <div {...reveal(430)}>
                <p className="mb-9 max-w-md text-base leading-relaxed text-text-muted md:max-w-sm lg:max-w-md">
                  CS undergraduate at University of Caloocan City. I build scalable back-end systems
                  and full-stack applications using React, Next.js, NestJS, Firebase, and
                  PostgreSQL.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="mb-8 flex flex-wrap items-center gap-3" {...reveal(510)}>
                <RaisedButton href="#projects" variant="primary">
                  <span>View projects</span>
                  <ArrowRightIcon />
                </RaisedButton>
                <RaisedButton
                  href="/resume.pdf"
                  download="Angelo-Flores-Resume.pdf"
                  variant="secondary"
                >
                  <DownloadIcon />
                  <span>Download resume</span>
                </RaisedButton>
              </div>

              {/* Social icons */}
              <div className="flex items-center gap-2.5" {...reveal(580)}>
                <SocialButton href="https://github.com/adreno255" label="GitHub">
                  <GithubIcon />
                </SocialButton>
                <SocialButton
                  href="https://linkedin.com/in/angelo-mark-flores-jr-85399a404"
                  label="LinkedIn"
                >
                  <LinkedinIcon />
                </SocialButton>
                <SocialButton href="mailto:flores.angelomarkjrbscs2023@gmail.com" label="Email">
                  <MailIcon />
                </SocialButton>
              </div>
            </div>

            {/* ── Right: desktop avatar ── */}
            <div className="relative hidden shrink-0 md:block" {...reveal(200)}>
              <div
                className="animate-avatar-glow absolute rounded-full"
                style={{
                  inset: '-32px',
                  background: 'radial-gradient(circle, accent-glow) 0%, transparent 68%)',
                  filter: 'blur(20px)',
                }}
              />
              <div
                className="animate-ring-rotate absolute rounded-full"
                style={{
                  inset: '-6px',
                  background:
                    'conic-gradient(from 90deg, transparent 55%, rgba(201,169,110,0.35) 72%, rgba(232,230,225,0.65) 78%, rgba(201,169,110,0.35) 84%, transparent 100%)',
                }}
              />
              <div className="animate-avatar-float relative h-64 w-64 lg:h-80 lg:w-80">
                <Image
                  src="/profile-pic.JPG"
                  alt="Angelo Mark Flores Jr."
                  fill
                  sizes="(max-width: 1024px) 256px, 320px"
                  className="rounded-full border border-border-default object-cover object-top"
                  style={{
                    boxShadow:
                      '0 0 0 1px accent-glow, 0 0 60px rgba(0,0,0,0.8), inset 0 0 30px rgba(0,0,0,0.3)',
                  }}
                  loading="eager"
                />
              </div>
            </div>
          </div>
        </div>

        {/* ── Stats Bar ── */}
        <div
          className="relative z-10 mt-auto border-t border-border-subtle"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(10px)',
            transition: 'opacity 0.7s ease 700ms, transform 0.7s ease 700ms',
          }}
        >
          <div className="mx-auto grid max-w-6xl grid-cols-3 divide-x divide-border-subtle">
            {STATS.map(({ value, label }) => (
              <div
                key={label}
                className="flex flex-col items-center gap-1 py-6 transition-colors hover:bg-bg-raised"
              >
                <span
                  className="text-2xl font-bold tabular-nums text-text-primary sm:text-3xl"
                  style={{ fontFamily: "'DM Mono', monospace" }}
                >
                  <CountUp target={value} />
                </span>
                <span
                  className="text-xs tracking-widest text-text-faint"
                  style={{ letterSpacing: '0.15em' }}
                >
                  {label.toUpperCase()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
