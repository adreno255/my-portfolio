'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// ─── Icon Components ────────────────────────────────────────────────
function GithubIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

// ─── Dot Grid Background ─────────────────────────────────────────────
function DotGrid() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="dots" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="#C9A96E" />
          </pattern>
          <radialGradient id="vignette" cx="50%" cy="42%" r="52%">
            <stop offset="0%" stopColor="white" stopOpacity="1" />
            <stop offset="55%" stopColor="white" stopOpacity="0.35" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
          <mask id="dot-mask">
            <rect width="100%" height="100%" fill="url(#vignette)" />
          </mask>
        </defs>
        {/* Static base layer */}
        <rect width="100%" height="100%" fill="url(#dots)" mask="url(#dot-mask)" opacity="0.14" />
        {/* Feedback #2: breathing overlay */}
        <rect
          width="100%"
          height="100%"
          fill="url(#dots)"
          mask="url(#dot-mask)"
          opacity="0"
          className="dot-breathe"
        />
      </svg>
    </div>
  );
}

// ─── Arc Glow — raised higher, with idle pulse + shimmer sweep ────────
function ArcGlow() {
  return (
    // Feedback #1: raised to cover bottom 55% of section
    <div
      className="pointer-events-none absolute left-0 right-0 overflow-hidden"
      style={{ bottom: 0, height: '55%' }}
      aria-hidden
    >
      {/* Pulsing ambient bloom */}
      <div
        className="arc-pulse absolute left-1/2 -translate-x-1/2"
        style={{
          bottom: '-40px',
          width: 'min(860px, 120vw)',
          height: '320px',
          background:
            'radial-gradient(ellipse 55% 45% at 50% 100%, rgba(201,169,110,0.18) 0%, rgba(201,169,110,0.07) 45%, transparent 70%)',
          filter: 'blur(28px)',
        }}
      />

      {/* SVG arc lines */}
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
          <linearGradient id="arc-shimmer" x1="0%" y1="0%" x2="100%" y2="0%">
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

        {/* Wide soft glow behind arc */}
        <path
          d="M 60,300 Q 480,-20 900,300"
          stroke="rgba(201,169,110,0.10)"
          strokeWidth="22"
          fill="none"
          className="arc-glow-pulse"
          style={{ filter: 'blur(12px)' }}
        />

        {/* Main crisp arc */}
        <path
          d="M 0,300 Q 480,-30 960,300"
          stroke="url(#arc-grad)"
          strokeWidth="1"
          fill="none"
          filter="url(#arc-glow)"
        />

        {/* Shimmer sweep — travels along the arc */}
        <path
          d="M 0,300 Q 480,-30 960,300"
          stroke="url(#arc-shimmer)"
          strokeWidth="2"
          fill="none"
          filter="url(#shimmer-blur)"
          strokeDasharray="200 2000"
          className="arc-shimmer"
        />
      </svg>
    </div>
  );
}

// ─── Stats Bar ─────────────────────────────────────────────────────────
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

// ─── 3D Raised Button ─────────────────────────────────────────────────
interface RaisedButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  className?: string;
  download?: string;
}

function RaisedButton({
  children,
  href,
  onClick,
  variant = 'primary',
  className = '',
  download,
}: RaisedButtonProps) {
  const base =
    'group relative inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium select-none cursor-pointer ' +
    'transition-[box-shadow,transform,background-color,color,border-color] duration-[120ms]';

  // Feedback #4: color shifts on hover (lighter) and active (warm gold accent)
  const variants = {
    primary: [
      'bg-[#E8E6E1] text-[#0A0A0A]',
      'shadow-[0_3px_0_0_#8A8880,0_4px_10px_rgba(0,0,0,0.45)]',
      'hover:bg-[#F2F0EB] hover:text-[#111111]',
      'hover:shadow-[0_1px_0_0_#8A8880,0_2px_4px_rgba(0,0,0,0.3)] hover:translate-y-[2px]',
      'active:bg-[#C9A96E] active:text-[#1A1200]',
      'active:shadow-none active:translate-y-[4px]',
    ].join(' '),
    secondary: [
      'bg-[#1A1A1A] text-[#AAAAAA] border border-[#2E2E2E]',
      'shadow-[0_3px_0_0_#0D0D0D,0_4px_10px_rgba(0,0,0,0.5)]',
      'hover:bg-[#222222] hover:text-[#E8E6E1] hover:border-[#3A3A3A]',
      'hover:shadow-[0_1px_0_0_#0D0D0D,0_2px_4px_rgba(0,0,0,0.4)] hover:translate-y-[2px]',
      'active:bg-[#2A2010] active:text-[#C9A96E] active:border-[#7A5E2A]',
      'active:shadow-none active:translate-y-[4px]',
    ].join(' '),
  };

  const cls = `${base} ${variants[variant]} ${className}`;
  if (href)
    return (
      <a href={href} download={download} className={cls}>
        {children}
      </a>
    );
  return (
    <button onClick={onClick} className={cls}>
      {children}
    </button>
  );
}

// ─── Social Icon Button ───────────────────────────────────────────────
function SocialButton({
  href,
  children,
  label,
}: {
  href: string;
  children: React.ReactNode;
  label: string;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noopener noreferrer"
      className={[
        'flex h-10 w-10 items-center justify-content rounded-xl',
        'border border-[#222222] bg-[#111111] text-[#666666]',
        'shadow-[0_3px_0_0_#0a0a0a,0_4px_8px_rgba(0,0,0,0.5)]',
        'transition-[box-shadow,transform,background-color,color,border-color] duration-120',
        'hover:border-[#3A3A3A] hover:bg-[#1A1A1A] hover:text-[#E8E6E1]',
        'hover:translate-y-0.5 hover:shadow-[0_1px_0_0_#0a0a0a,0_2px_4px_rgba(0,0,0,0.4)]',
        'active:bg-[#2A2010] active:text-[#C9A96E] active:border-[#7A5E2A]',
        'active:translate-y-1 active:shadow-none',
        'items-center justify-center',
      ].join(' ')}
    >
      {children}
    </a>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────
const NAV_LINKS = ['About', 'Projects', 'Skills', 'Contact'];

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <nav
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'border-b border-[#1A1A1A] bg-[#0A0A0A]/90 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
        <Link
          href="/"
          className="font-serif text-2xl font-bold tracking-tight text-[#E8E6E1] transition-opacity hover:opacity-70"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          AF
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-xs font-medium tracking-widest text-[#666666] transition-colors hover:text-[#AAAAAA]"
              style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: '0.12em' }}
            >
              {link.toUpperCase()}
            </a>
          ))}
        </div>

        {/* Feedback #3: nav resume button gets download icon */}
        <div className="hidden md:block">
          <RaisedButton href="/resume.pdf" download="Angelo-Flores-Resume.pdf" variant="primary">
            <DownloadIcon />
            Resume
          </RaisedButton>
        </div>

        <button
          className="flex flex-col items-end gap-1.5 md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`block h-[1.5px] bg-[#E8E6E1] transition-all duration-300 ${menuOpen ? 'w-5 translate-y-1.5 rotate-45' : 'w-5'}`}
          />
          <span
            className={`block h-[1.5px] bg-[#E8E6E1] transition-all duration-300 ${menuOpen ? 'w-5 opacity-0' : 'w-3.5'}`}
          />
          <span
            className={`block h-[1.5px] bg-[#E8E6E1] transition-all duration-300 ${menuOpen ? 'w-5 -translate-y-1.5 -rotate-45' : 'w-5'}`}
          />
        </button>
      </div>

      <div
        className={`overflow-hidden border-b border-[#1A1A1A] bg-[#0A0A0A]/95 backdrop-blur-md transition-all duration-300 md:hidden ${menuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <div className="flex flex-col gap-1 px-6 pb-4 pt-2">
          {NAV_LINKS.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              onClick={() => setMenuOpen(false)}
              className="py-2 text-xs font-medium tracking-widest text-[#666666] transition-colors hover:text-[#AAAAAA]"
              style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: '0.12em' }}
            >
              {link.toUpperCase()}
            </a>
          ))}
          <div className="mt-2">
            <RaisedButton href="/resume.pdf" download="Angelo-Flores-Resume.pdf" variant="primary">
              <DownloadIcon />
              Resume
            </RaisedButton>
          </div>
        </div>
      </div>
    </nav>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────
export default function Hero() {
  const [visible, setVisible] = useState(false);
  const containerRef = useRef<HTMLElement>(null);

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
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;1,400;1,600&family=DM+Sans:wght@300;400;500&family=DM+Mono:wght@400&display=swap');

        /* ── Feedback #1: arc idle animations ── */
        @keyframes arcPulse {
          0%, 100% { opacity: 0.75; }
          50%       { opacity: 1; }
        }
        @keyframes arcGlowPulse {
          0%, 100% { opacity: 0.55; }
          50%       { opacity: 1; }
        }
        /* Shimmer travels along the arc path via dashoffset */
        @keyframes arcShimmer {
          0%   { stroke-dashoffset: 1600; opacity: 0; }
          6%   { opacity: 1; }
          94%  { opacity: 1; }
          100% { stroke-dashoffset: -1600; opacity: 0; }
        }
        .arc-pulse      { animation: arcPulse 4.5s ease-in-out infinite; }
        .arc-glow-pulse { animation: arcGlowPulse 4.5s ease-in-out infinite; }
        .arc-shimmer    { animation: arcShimmer 4s ease-in-out infinite; }

        /* ── Feedback #2: dot grid breathing ── */
        @keyframes dotBreathe {
          0%, 100% { opacity: 0; }
          50%       { opacity: 0.08; }
        }
        .dot-breathe { animation: dotBreathe 7s ease-in-out infinite; }

        /* ── Feedback #2: avatar float + glow pulse ── */
        @keyframes avatarFloat {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-7px); }
        }
        @keyframes avatarGlow {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50%       { opacity: 0.38; transform: scale(1.07); }
        }
        @keyframes ringRotate {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes ringFade {
          0%, 100% { opacity: 0.45; }
          50%       { opacity: 0.9; }
        }
        .avatar-float { animation: avatarFloat 5s ease-in-out infinite; }
        .avatar-glow  { animation: avatarGlow 5s ease-in-out infinite; }
        .ring-rotate  { animation: ringRotate 14s linear infinite, ringFade 5s ease-in-out infinite; }
      `}</style>

      <Navbar />

      <section
        ref={containerRef}
        id="hero"
        className="relative flex min-h-screen flex-col overflow-hidden bg-[#0A0A0A]"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        <DotGrid />
        <ArcGlow />

        <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col px-6 pt-28 md:pt-32">
          <div className="flex flex-1 flex-col items-start justify-center md:flex-row md:items-center md:justify-between md:gap-12">
            {/* ── Left: text ── */}
            <div className="flex flex-col items-center text-center md:items-start md:text-left">
              {/* Mobile: avatar above text */}
              <div className="mb-8 block md:hidden" {...reveal(100)}>
                {/* Feedback #5: /profile-pic.JPG */}
                <div className="avatar-float relative mx-auto h-36 w-36 sm:h-44 sm:w-44">
                  <Image
                    src="/profile-pic.JPG"
                    alt="Angelo Mark Flores Jr."
                    fill
                    sizes="(max-width: 640px) 144px, 176px"
                    className="rounded-full border border-[#2E2E2E] object-cover object-top"
                    style={{
                      boxShadow: '0 0 0 4px rgba(201,169,110,0.08), 0 0 40px rgba(0,0,0,0.6)',
                    }}
                    loading="eager"
                  />
                </div>
              </div>

              <div {...reveal(150)}>
                <p className="mb-4 flex items-center gap-3 text-xs font-medium tracking-[0.2em] text-[#C9A96E]">
                  <span className="h-px w-6 bg-[#C9A96E]/60" />
                  HI, I&apos;M ANGELO MARK FLORES JR.
                </p>
              </div>

              <div {...reveal(250)}>
                <h1
                  className="mb-3 text-5xl font-bold leading-[1.05] tracking-tight text-[#E8E6E1] sm:text-6xl lg:text-7xl"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Full-Stack
                  <br />
                  Developer
                </h1>
              </div>

              <div {...reveal(340)}>
                <p
                  className="mb-7 text-2xl font-normal italic text-[#C9A96E] sm:text-3xl lg:text-4xl"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  &amp; backend specialist
                </p>
              </div>

              <div {...reveal(430)}>
                <p className="mb-9 max-w-md text-base leading-relaxed text-[#666666] md:max-w-sm lg:max-w-md">
                  CS undergraduate at University of Caloocan City. I build scalable back-end systems
                  and full-stack applications using NestJS, React, Laravel, Firebase, and
                  PostgreSQL.
                </p>
              </div>

              {/* CTA Buttons — Feedback #3: download icon on resume button */}
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

            {/* ── Right: desktop avatar — Feedback #2 & #5 ── */}
            <div className="relative hidden shrink-0 md:block" {...reveal(200)}>
              {/* Pulsing ambient glow */}
              <div
                className="avatar-glow absolute rounded-full"
                style={{
                  inset: '-32px',
                  background: 'radial-gradient(circle, rgba(201,169,110,0.2) 0%, transparent 68%)',
                  filter: 'blur(20px)',
                }}
              />
              {/* Rotating conic ring */}
              <div
                className="ring-rotate absolute rounded-full"
                style={{
                  inset: '-6px',
                  background:
                    'conic-gradient(from 90deg, transparent 55%, rgba(201,169,110,0.35) 72%, rgba(232,230,225,0.65) 78%, rgba(201,169,110,0.35) 84%, transparent 100%)',
                }}
              />
              {/* Floating image — Feedback #5: /profile-pic.JPG */}
              <div className="avatar-float relative h-64 w-64 lg:h-80 lg:w-80">
                <Image
                  src="/profile-pic.JPG"
                  alt="Angelo Mark Flores Jr."
                  fill
                  sizes="(max-width: 1024px) 256px, 320px"
                  className="rounded-full border border-[#2E2E2E] object-cover object-top"
                  style={{
                    boxShadow:
                      '0 0 0 1px rgba(201,169,110,0.18), 0 0 60px rgba(0,0,0,0.8), inset 0 0 30px rgba(0,0,0,0.3)',
                  }}
                  loading="eager"
                />
              </div>
            </div>
          </div>
        </div>

        {/* ── Stats Bar ── */}
        <div
          className="relative z-10 mt-auto border-t border-[#1A1A1A]"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(10px)',
            transition: 'opacity 0.7s ease 700ms, transform 0.7s ease 700ms',
          }}
        >
          <div className="mx-auto grid max-w-6xl grid-cols-3 divide-x divide-[#1A1A1A]">
            {STATS.map(({ value, label }) => (
              <div
                key={label}
                className="flex flex-col items-center gap-1 py-6 transition-colors hover:bg-[#111111]"
              >
                <span
                  className="text-2xl font-bold tabular-nums text-[#E8E6E1] sm:text-3xl"
                  style={{ fontFamily: "'DM Mono', monospace" }}
                >
                  <CountUp target={value} />
                </span>
                <span
                  className="text-xs tracking-widest text-[#444444]"
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
