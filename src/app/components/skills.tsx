'use client';

import { useEffect, useRef, useState } from 'react';

// ─── useInView ─────────────────────────────────────────────────────────────
function useInView(threshold = 0.06) {
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
const PRIMARY_STACK = [
  'NestJS',
  'React',
  'Next.js',
  'Laravel',
  'PostgreSQL',
  'MySQL',
  'Firebase',
  'TypeScript',
  'Docker',
  'Git',
];

const SKILL_GROUPS = [
  {
    id: 'languages',
    label: 'Languages',
    glyph: '</>',
    skills: ['TypeScript', 'JavaScript', 'C#', 'Java', 'HTML', 'CSS'],
  },
  {
    id: 'frameworks',
    label: 'Frameworks',
    glyph: '[ ]',
    skills: ['NestJS', 'Express', 'React', 'React Native', 'Next.js', 'Laravel', '.NET'],
  },
  {
    id: 'databases',
    label: 'Databases',
    glyph: '{}',
    skills: ['PostgreSQL', 'MySQL', 'MSSQL', 'Firebase', 'MS Access'],
  },
  {
    id: 'tools',
    label: 'Tools & Platforms',
    glyph: '::',
    skills: ['Git', 'GitHub', 'Docker', 'Railway', 'Render', 'Vercel', 'HiveMQ', 'SendGrid'],
  },
];

const STRENGTHS = [
  { label: 'Back-End Architecture', desc: 'REST APIs, WebSockets, MQTT' },
  { label: 'Database Design', desc: 'Relational modeling & optimization' },
  { label: 'Real-Time Systems', desc: 'IoT pipelines & live data feeds' },
  { label: 'Full-Stack Integration', desc: 'End-to-end React ↔ API wiring' },
];

// ─── SkillTag ──────────────────────────────────────────────────────────────
function SkillTag({ name, delay, inView }: { name: string; delay: number; inView: boolean }) {
  const [hovered, setHovered] = useState(false);
  return (
    <span
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0) scale(1)' : 'translateY(8px) scale(0.96)',
        transition: `opacity 0.45s ease ${delay}ms, transform 0.45s ease ${delay}ms`,
      }}
      className={[
        'relative inline-flex cursor-default select-none items-center gap-1.5',
        'rounded-md border px-3 py-1.5',
        'font-dm-mono text-[11px] tracking-[0.06em]',
        'transition-all duration-150',
        hovered
          ? 'border-accent/50 bg-accent/10 text-accent shadow-[0_0_12px_rgba(201,169,110,0.15)]'
          : 'border-border-subtle bg-bg-raised text-text-secondary',
      ].join(' ')}
    >
      <span
        className={`h-1 w-1 rounded-full transition-colors duration-150 ${hovered ? 'bg-accent' : 'bg-text-faint'}`}
      />
      {name}
    </span>
  );
}

// ─── CategoryPanel ─────────────────────────────────────────────────────────
function CategoryPanel({
  group,
  baseDelay,
  inView,
}: {
  group: (typeof SKILL_GROUPS)[0];
  baseDelay: number;
  inView: boolean;
}) {
  return (
    <div
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(20px)',
        transition: `opacity 0.6s ease ${baseDelay}ms, transform 0.6s ease ${baseDelay}ms`,
      }}
      className="flex flex-col gap-4 rounded-xl border border-border-subtle bg-bg-raised p-5 shadow-button-secondary"
    >
      {/* Header */}
      <div className="flex items-center gap-3">
        <span className="font-dm-mono text-[13px] text-accent/60">{group.glyph}</span>
        <span className="font-dm-mono text-[10px] tracking-[0.2em] text-text-muted">
          {group.label.toUpperCase()}
        </span>
        <div className="ml-auto h-px flex-1 bg-linear-to-r from-border-default to-transparent" />
      </div>
      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {group.skills.map((skill, i) => (
          <SkillTag key={skill} name={skill} delay={baseDelay + 80 + i * 35} inView={inView} />
        ))}
      </div>
    </div>
  );
}

// ─── PrimaryStackPanel ─────────────────────────────────────────────────────
function PrimaryStackPanel({ inView }: { inView: boolean }) {
  return (
    <div
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(24px)',
        transition: 'opacity 0.65s ease 100ms, transform 0.65s ease 100ms',
      }}
      className="relative overflow-hidden rounded-xl border border-accent/25 bg-bg-raised shadow-[0_4px_0_0_rgba(201,169,110,0.08),0_6px_20px_rgba(0,0,0,0.5)]"
    >
      {/* Warm radial spotlight */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 50% 110%, rgba(201,169,110,0.09) 0%, transparent 70%)',
        }}
      />

      {/* Top accent bar */}
      <div
        aria-hidden
        className="absolute left-0 right-0 top-0 h-px"
        style={{
          background: 'linear-gradient(to right, transparent, rgba(201,169,110,0.5), transparent)',
        }}
      />

      <div className="relative p-6">
        {/* Label */}
        <div className="mb-5 flex items-center gap-3">
          <span className="font-dm-mono text-[10px] tracking-[0.22em] text-accent">
            ★ PRIMARY STACK
          </span>
          <div className="h-px flex-1 bg-linear-to-r from-accent/30 to-transparent" />
        </div>

        {/* Skills — larger, with accent ring on hover */}
        <div className="flex flex-wrap gap-2.5">
          {PRIMARY_STACK.map((skill, i) => (
            <PrimaryTag key={skill} name={skill} delay={180 + i * 45} inView={inView} />
          ))}
        </div>
      </div>
    </div>
  );
}

function PrimaryTag({ name, delay, inView }: { name: string; delay: number; inView: boolean }) {
  const [hovered, setHovered] = useState(false);
  return (
    <span
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(10px)',
        transition: `opacity 0.5s ease ${delay}ms, transform 0.5s ease ${delay}ms`,
      }}
      className={[
        'relative inline-flex cursor-default select-none items-center gap-2',
        'rounded-full border px-4 py-2',
        'font-dm-mono text-[12px] font-medium tracking-wider',
        'transition-all duration-200',
        hovered
          ? 'border-accent text-accent shadow-[0_0_16px_rgba(201,169,110,0.2),0_2px_0_0_rgba(201,169,110,0.15)] -translate-y-px'
          : 'border-accent/30 text-accent/80 shadow-[0_2px_0_0_rgba(0,0,0,0.4)]',
      ].join(' ')}
    >
      {name}
    </span>
  );
}

// ─── StrengthsRow ──────────────────────────────────────────────────────────
function StrengthsRow({ inView }: { inView: boolean }) {
  return (
    <div
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(20px)',
        transition: 'opacity 0.65s ease 520ms, transform 0.65s ease 520ms',
      }}
      className="overflow-hidden rounded-xl border border-border-subtle bg-bg-raised shadow-button-secondary"
    >
      {/* Header */}
      <div className="border-b border-border-subtle px-5 py-3.5">
        <span className="font-dm-mono text-[10px] tracking-[0.22em] text-text-muted">
          ◈ CORE STRENGTHS
        </span>
      </div>

      {/* Grid of strengths */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-border-subtle">
        {STRENGTHS.map((s, i) => (
          <StrengthCell key={s.label} {...s} delay={580 + i * 60} inView={inView} />
        ))}
      </div>
    </div>
  );
}

function StrengthCell({
  label,
  desc,
  delay,
  inView,
}: {
  label: string;
  desc: string;
  delay: number;
  inView: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        opacity: inView ? 1 : 0,
        transition: `opacity 0.5s ease ${delay}ms, background-color 0.15s ease`,
        backgroundColor: hovered ? 'var(--color-bg-elevated)' : undefined,
      }}
      className="flex flex-col gap-1.5 px-5 py-4 cursor-default"
    >
      <div className="flex items-center gap-2">
        <span
          className={`h-1.5 w-1.5 rounded-full transition-colors duration-150 ${hovered ? 'bg-accent' : 'bg-accent/40'}`}
        />
        <span className="text-sm font-medium text-text-primary">{label}</span>
      </div>
      <p className="pl-3.5 font-dm-mono text-[10px] leading-relaxed tracking-wide text-text-muted">
        {desc}
      </p>
    </div>
  );
}

// ─── Skills Section ────────────────────────────────────────────────────────
export default function Skills() {
  const { ref: sectionRef, inView } = useInView();

  const reveal = (delay: number) => ({
    style: {
      opacity: inView ? 1 : 0,
      transform: inView ? 'translateY(0)' : 'translateY(20px)',
      transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`,
    },
  });

  return (
    <section id="skills" className="relative py-24 md:py-32" ref={sectionRef}>
      {/* Top hairline */}
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
            WHAT I WORK WITH
          </p>
          <h2
            className="mb-4 text-4xl font-bold tracking-tight text-text-primary sm:text-5xl lg:text-6xl"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Technical Skills
          </h2>
          <p className="max-w-md text-base text-text-secondary">
            Tools and technologies across all my academic projects.
          </p>
        </div>

        {/* ── Layout ── */}
        <div className="flex flex-col gap-4">
          {/* Primary stack — full width */}
          <PrimaryStackPanel inView={inView} />

          {/* 2×2 category grid */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {SKILL_GROUPS.map((group, i) => (
              <CategoryPanel
                key={group.id}
                group={group}
                baseDelay={200 + i * 80}
                inView={inView}
              />
            ))}
          </div>

          {/* Strengths row — full width */}
          <StrengthsRow inView={inView} />
        </div>
      </div>
    </section>
  );
}
