'use client';

import { useEffect, useRef, useState } from 'react';
import { GithubIcon, LinkedinIcon, MailIcon, PhoneIcon } from './icons';

// ─── useInView ─────────────────────────────────────────────────────────────

function useInView(threshold = 0.08) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, inView };
}

// ─── Data ──────────────────────────────────────────────────────────────────

const CONTACT_CHANNELS = [
  {
    id: 'email',
    label: 'EMAIL — PRIMARY CHANNEL',
    value: 'flores.angelomarkjrbscs2023@gmail.com',
    href: 'mailto:flores.angelomarkjrbscs2023@gmail.com',
    icon: <MailIcon size={16} strokeWidth={1.5} />,
  },
  {
    id: 'phone',
    label: 'PHONE',
    value: '(+63) 921 714 9312',
    href: 'tel:+639217149312',
    icon: <PhoneIcon size={16} strokeWidth={1.5} />,
  },
  {
    id: 'github',
    label: 'GITHUB — SEE MY WORK',
    value: 'github.com/adreno255',
    href: 'https://github.com/adreno255',
    icon: <GithubIcon size={16} strokeWidth={1.5} />,
  },
  {
    id: 'linkedin',
    label: 'LINKEDIN',
    value: 'linkedin.com/in/angelo-mark-flores-jr-85399a404',
    href: 'https://linkedin.com/in/angelo-mark-flores-jr-85399a404',
    icon: <LinkedinIcon size={16} strokeWidth={1.5} />,
  },
];

const FOOTER_NAV = ['home', 'about', 'projects', 'skills', 'contact'];

const META_ITEMS = [
  'Based in Bagumbong, Caloocan City, Metro Manila',
  'BS Computer Science · University of Caloocan City',
  'Available for OJT starting 2026',
];

// ─── Arrow icon for channel cards ─────────────────────────────────────────

function ArrowUpRight({ size = 12 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="7 7 17 7 17 17" />
    </svg>
  );
}

// ─── Contact Channel Card ──────────────────────────────────────────────────

function ChannelCard({
  channel,
  delay,
  inView,
}: {
  channel: (typeof CONTACT_CHANNELS)[0];
  delay: number;
  inView: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={channel.href}
      target={channel.id === 'email' || channel.id === 'phone' ? undefined : '_blank'}
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(16px)',
        transition: `opacity 0.55s ease ${delay}ms, transform 0.55s ease ${delay}ms`,
      }}
      className={[
        'group flex items-center gap-4 rounded-xl border p-4',
        'transition-[background-color,border-color,box-shadow,transform] duration-150',
        hovered
          ? 'border-border-default bg-bg-elevated shadow-[0_1px_0_0_#0d0d0d,0_2px_4px_rgba(0,0,0,0.3)] translate-y-px'
          : 'border-border-subtle bg-bg-raised shadow-button-secondary',
      ].join(' ')}
    >
      {/* Icon box */}
      <div
        className={[
          'flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border',
          'transition-[background-color,border-color,color] duration-150',
          hovered
            ? 'border-accent/40 bg-accent/10 text-accent'
            : 'border-border-subtle bg-bg-overlay text-text-muted',
        ].join(' ')}
      >
        {channel.icon}
      </div>

      {/* Text */}
      <div className="min-w-0 flex-1">
        <p className="mb-0.5 font-dm-mono text-[9px] tracking-[0.18em] text-text-faint">
          {channel.label}
        </p>
        <p
          className={[
            'truncate text-sm font-medium transition-colors duration-150',
            hovered ? 'text-accent' : 'text-text-primary',
          ].join(' ')}
        >
          {channel.value}
        </p>
      </div>

      {/* Arrow */}
      <span
        className={[
          'shrink-0 transition-[color,transform] duration-150',
          hovered ? 'translate-x-px -translate-y-px text-accent' : 'text-text-faint',
        ].join(' ')}
      >
        <ArrowUpRight size={13} />
      </span>
    </a>
  );
}

// ─── Availability Badge ────────────────────────────────────────────────────

function AvailabilityBadge({ delay, inView }: { delay: number; inView: boolean }) {
  return (
    <div
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(12px)',
        transition: `opacity 0.55s ease ${delay}ms, transform 0.55s ease ${delay}ms`,
      }}
      className="inline-flex items-start gap-3 rounded-xl border border-accent/25 bg-accent/6 px-4 py-3.5"
    >
      {/* Pulse dot */}
      <span className="relative mt-0.5 flex h-2 w-2 shrink-0">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
      </span>
      <div>
        <p className="text-sm font-medium text-accent">Currently Available</p>
        <p className="font-dm-mono text-[10px] tracking-wide text-accent/60">
          open to OJT placement · 2026
        </p>
      </div>
    </div>
  );
}

// ─── Footer ────────────────────────────────────────────────────────────────

function Footer({ inView }: { inView: boolean }) {
  return (
    <footer
      style={{
        opacity: inView ? 1 : 0,
        transition: 'opacity 0.65s ease 700ms',
      }}
      className="mt-16 border-t border-border-subtle"
    >
      <div className="mx-auto max-w-6xl px-6 py-8">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-center sm:justify-between">
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="font-playfair text-xl font-bold text-text-primary transition-opacity hover:opacity-70"
          >
            Angelo Flores Jr.
          </a>

          {/* Nav */}
          <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1">
            {FOOTER_NAV.map((item) => (
              <a
                key={item}
                href={item === 'home' ? '#hero' : `#${item}`}
                className="font-dm-mono text-[10px] tracking-[0.15em] text-text-faint transition-colors hover:text-text-secondary"
              >
                {item}
              </a>
            ))}
          </nav>

          {/* Copyright */}
          <p className="font-dm-mono text-[10px] tracking-wide text-text-faint">
            © 2025 Angelo Mark Flores Jr. — Built with Next.js
          </p>
        </div>
      </div>
    </footer>
  );
}

// ─── Contact Section ───────────────────────────────────────────────────────

export default function Contact() {
  const { ref: sectionRef, inView } = useInView();

  const reveal = (delay: number) => ({
    style: {
      opacity: inView ? 1 : 0,
      transform: inView ? 'translateY(0)' : 'translateY(20px)',
      transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`,
    },
  });

  return (
    <>
      <section id="contact" className="relative py-24 md:py-32" ref={sectionRef}>
        {/* Top hairline separator */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px"
          style={{ background: 'linear-gradient(to right, transparent, #2e2e2e, transparent)' }}
          aria-hidden
        />

        <div className="relative z-10 mx-auto max-w-6xl px-6">
          {/* ── Main grid: left copy / right channels ── */}
          <div className="grid grid-cols-1 gap-12 md:grid-cols-[1fr_1.6fr] md:gap-16 lg:gap-24">
            {/* LEFT ── */}
            <div className="flex flex-col gap-6">
              {/* Section label */}
              <div {...reveal(0)}>
                <p className="mb-3 flex items-center gap-3 text-xs font-medium tracking-[0.2em] text-accent">
                  <span className="h-px w-6 bg-accent/60" />
                  GET IN TOUCH
                </p>
                {/* Desktop uses large display heading, tablet/mobile uses "Contact" */}
                <h2
                  className="tracking-tight text-text-primary"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {/* Mobile / tablet */}
                  <span className="block text-4xl font-bold sm:text-5xl md:hidden">Contact</span>
                  {/* Desktop */}
                  <span className="hidden text-5xl font-bold leading-[1.08] md:block lg:text-6xl">
                    Let&apos;s
                    <br />
                    connect
                  </span>
                </h2>
              </div>

              {/* Description */}
              <div {...reveal(100)}>
                <p className="max-w-sm text-base leading-relaxed text-text-secondary">
                  Open to OJT opportunities, collaborations, or just a conversation about tech.
                  Reach out through any of the channels on the right — I typically respond within a
                  day.
                </p>
              </div>

              {/* Availability badge */}
              <AvailabilityBadge delay={200} inView={inView} />

              {/* Meta list */}
              <ul
                className="flex flex-col gap-2"
                style={{
                  opacity: inView ? 1 : 0,
                  transform: inView ? 'translateY(0)' : 'translateY(12px)',
                  transition: 'opacity 0.55s ease 300ms, transform 0.55s ease 300ms',
                }}
              >
                {META_ITEMS.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent/40" />
                    <span className="font-dm-mono text-[11px] leading-relaxed tracking-wide text-text-muted">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* RIGHT — channel cards ── */}
            <div className="flex flex-col gap-3 md:pt-16">
              {CONTACT_CHANNELS.map((channel, i) => (
                <ChannelCard
                  key={channel.id}
                  channel={channel}
                  delay={120 + i * 80}
                  inView={inView}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer lives outside the section padding */}
      <Footer inView={inView} />
    </>
  );
}
