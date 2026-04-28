'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

import {
  UniversityIcon,
  ProgramIcon,
  LocationIcon,
  StatusIcon,
  FocusIcon,
  LearnIcon,
  EnjoyIcon,
} from './icons';

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

const INFO_CARDS = [
  {
    icon: <UniversityIcon size={15} />,
    label: 'UNIVERSITY',
    value: 'University of Caloocan City',
    accent: false,
  },
  {
    icon: <ProgramIcon size={15} />,
    label: 'PROGRAM',
    value: 'BS Computer Science',
    accent: false,
  },
  {
    icon: <LocationIcon size={15} />,
    label: 'LOCATION',
    value: 'Bagumbong, Caloocan City',
    accent: false,
  },
  { icon: <StatusIcon size={15} />, label: 'STATUS', value: 'Open to opportunities', accent: true },
];

const INTERESTS = ['Coding', 'Music', 'Travelling', 'Gaming'];

const DETAIL_SECTIONS = [
  {
    icon: <FocusIcon size={13} />,
    title: 'FOCUS AREAS',
    items: [
      'Back-end architecture',
      'REST APIs & WebSockets',
      'Database design',
      'IoT & real-time systems',
    ],
  },
  {
    icon: <LearnIcon size={13} />,
    title: 'CURRENTLY LEARNING',
    items: [
      'Advanced React patterns',
      'Next.js & SSR/SSG',
      'UI/UX fundamentals',
      'TypeScript depth',
    ],
  },
  {
    icon: <EnjoyIcon size={13} />,
    title: 'WHAT I ENJOY',
    items: ['Volleyball & team sports', 'Music & listening', 'Travelling & exploring'],
  },
];

// ─── InfoCard — pseudo-3D ──────────────────────────────────────────────────

function InfoCard({
  icon,
  label,
  value,
  accent,
  delay,
  inView,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  accent: boolean;
  delay: number;
  inView: boolean;
}) {
  return (
    <div
      className={[
        'group flex select-none flex-col gap-2 rounded-xl p-4',
        'border border-border-subtle bg-bg-raised text-text-muted',
        'shadow-button-secondary',
        'transition-[box-shadow,transform,background-color,border-color] duration-120',
        'hover:border-border-default hover:bg-bg-elevated',
        'hover:translate-y-0.5 hover:shadow-[0_1px_0_0_#0d0d0d,0_2px_4px_rgba(0,0,0,0.3)]',
        'active:translate-y-1 active:shadow-none',
      ].join(' ')}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(16px)',
        transition: `opacity 0.55s ease ${delay}ms, transform 0.55s ease ${delay}ms`,
      }}
    >
      <div className="flex items-center gap-1.5">
        <span className={accent ? 'text-accent' : 'text-text-faint'}>{icon}</span>
        <span className="font-dm-mono text-[10px] tracking-[0.15em]">{label}</span>
      </div>
      <p className={`text-sm font-medium ${accent ? 'text-accent' : 'text-text-primary'}`}>
        {value}
      </p>
    </div>
  );
}

// ─── Merged detail panel ───────────────────────────────────────────────────
// Single flat rectangle, no border-radius, three columns divided by hairlines.

function DetailPanel({ delay, inView }: { delay: number; inView: boolean }) {
  return (
    <div
      className={[
        // flat rectangle — no rounded corners
        'overflow-hidden border border-border-subtle bg-bg-raised',
        // pseudo-3D
        'shadow-button-secondary',
        'transition-[box-shadow,transform,background-color,border-color] duration-120',
        'hover:border-border-default hover:bg-bg-elevated',
        'hover:translate-y-0.5 hover:shadow-[0_1px_0_0_#0d0d0d,0_2px_4px_rgba(0,0,0,0.3)]',
        'active:translate-y-1 active:shadow-none',
      ].join(' ')}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(16px)',
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
      }}
    >
      {/* On mobile: stack rows; on md+: three equal columns */}
      <div className="flex flex-col md:flex-row">
        {DETAIL_SECTIONS.map((section, i) => (
          <div
            key={section.title}
            className={[
              'flex flex-1 flex-col gap-4 p-5',
              // vertical divider between columns (md+), horizontal divider between rows (mobile)
              i > 0 ? 'border-t border-border-subtle md:border-l md:border-t-0' : '',
            ].join(' ')}
          >
            <div className="flex items-center gap-2 text-accent">
              {section.icon}
              <span className="font-dm-mono text-[10px] tracking-[0.18em]">{section.title}</span>
            </div>
            <ul className="flex flex-col gap-2.5">
              {section.items.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-text-secondary">
                  <span className="mt-1.75 h-1 w-1 shrink-0 rounded-full bg-accent/50" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── About ─────────────────────────────────────────────────────────────────

export default function About() {
  const { ref: sectionRef, inView } = useInView();

  const reveal = (delay: number) => ({
    style: {
      opacity: inView ? 1 : 0,
      transform: inView ? 'translateY(0)' : 'translateY(20px)',
      transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`,
    },
  });

  return (
    <section id="about" className="relative py-24 md:py-32" ref={sectionRef}>
      {/* Top hairline separator */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{ background: 'linear-gradient(to right, transparent, #2e2e2e, transparent)' }}
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        {/* ── Section header ── */}
        <div className="mb-14" {...reveal(0)}>
          <p className="mb-3 flex items-center gap-3 text-xs font-medium tracking-[0.2em] text-accent">
            <span className="h-px w-6 bg-accent/60" />
            ABOUT ME
          </p>
          <h2
            className="text-4xl font-bold tracking-tight text-text-primary sm:text-5xl lg:text-6xl"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Who I Am
          </h2>
        </div>

        {/* ── Main 2-col grid ── */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16 lg:gap-24">
          {/* LEFT: text + pills + info cards */}
          <div className="flex flex-col gap-8">
            {/* Mobile photo */}
            <div className="block md:hidden" {...reveal(80)}>
              <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl border border-border-subtle">
                <Image
                  src="/about-pic.jpg"
                  alt="Angelo Mark Flores Jr."
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                  className="object-cover object-top"
                  priority
                />
                <div className="absolute inset-0 bg-linear-to-t from-black via-black/30 to-transparent" />
              </div>
            </div>

            {/* Bio */}
            <div className="flex flex-col gap-4" {...reveal(120)}>
              <p className="text-base leading-relaxed text-text-secondary">
                I&apos;m a Computer Science undergraduate student at University of Caloocan City
                with a passion for building robust, scalable back-end systems and full-stack web
                applications that solve real problems.
              </p>
              <p className="text-base leading-relaxed text-text-secondary">
                My goal is to grow into a well-rounded full-stack developer — I bring a strong
                foundation in back-end architecture and am eager to deepen my front-end proficiency
                through hands-on experience.
              </p>
            </div>

            {/* Interest pills — DM Mono */}
            <div className="flex flex-wrap gap-2" {...reveal(200)}>
              {INTERESTS.map((tag) => (
                <span
                  key={tag}
                  className={[
                    'rounded-full border border-border-subtle bg-bg-raised',
                    'px-3.5 py-1.5 font-dm-mono text-xs text-text-secondary',
                    'shadow-[0_2px_0_0_#0d0d0d,0_3px_6px_rgba(0,0,0,0.4)]',
                    'transition-[box-shadow,transform,background-color,color,border-color] duration-120',
                    'hover:border-border-default hover:bg-bg-elevated hover:text-text-primary',
                    'hover:translate-y-px hover:shadow-[0_1px_0_0_#0d0d0d,0_1px_3px_rgba(0,0,0,0.3)]',
                    'active:translate-y-0.5 active:shadow-none',
                  ].join(' ')}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Info cards 2×2 */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {INFO_CARDS.map((card, i) => (
                <InfoCard key={card.label} {...card} delay={280 + i * 60} inView={inView} />
              ))}
            </div>
          </div>

          {/* RIGHT: photo */}
          <div className="hidden md:flex md:flex-col md:gap-8">
            <div {...reveal(80)}>
              <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl border border-border-subtle">
                <Image
                  src="/about-pic.jpg"
                  alt="Angelo Mark Flores Jr."
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                  className="object-cover object-top"
                  priority
                />
                <div className="absolute inset-0 bg-linear-to-t from-black via-black/30 to-transparent" />
                <div className="absolute bottom-4 right-4 rounded-full border border-accent/30 bg-black/70 px-3 py-1.5 backdrop-blur-sm">
                  <span className="font-dm-mono text-[11px] tracking-wide text-accent">
                    Full-Stack Dev
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Merged detail panel ── */}
        <div className="mt-12">
          <DetailPanel delay={500} inView={inView} />
        </div>
      </div>
    </section>
  );
}
