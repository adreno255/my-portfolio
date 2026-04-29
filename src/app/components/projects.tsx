'use client';

import { useEffect, useRef, useState } from 'react';
import {
  type Project,
  type ProjectFilter,
  FeaturedHeroCard,
  FeaturedSecondaryCard,
  ArchivedRow,
} from './project-card';

// ─── useInView ─────────────────────────────────────────────────────────────

function useInView(threshold = 0.05) {
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

// ─── Project Data ──────────────────────────────────────────────────────────
// Set `image` to the path of your project screenshot once you have it.
// e.g. image: '/projects/nurtura.jpg'
// Leave it undefined to use the decorative dot-grid fallback banner.

const PROJECTS: Project[] = [
  {
    id: 'nurtura',
    name: 'Nurtura',
    displayName: 'NURTURA',
    displaySub: 'Indoor Urban Farming System',
    image: '/nurtura-logo-long.png',
    role: 'Lead Back-End Developer',
    year: '2025–26',
    teamSize: '8-person team',
    featured: true,
    archived: false,
    filters: ['website', 'mobile'],
    shortDesc:
      'IoT-driven Android app for automated indoor plant care. Built the entire back-end independently — REST API, WebSocket server, MQTT integration, push notifications, email, and Firebase auth.',
    fullDesc:
      'Nurtura API is a scalable backend platform powering an automated indoor urban farming system. Built with NestJS, TypeScript, and PostgreSQL, it enables real-time monitoring, intelligent automation, and seamless IoT device control. Connecting plants, sensors, and hardware into a unified system — users optimize plant care through data-driven insights and remote device management.',
    features: [
      'REST API & WebSocket server for real-time communication',
      'MQTT integration via HiveMQ for device automation',
      'FCM push notifications via Expo Server',
      'Transactional email system via SendGrid',
      'Firebase Authentication for secure user management',
      'Docker-ready development environment',
    ],
    tech: [
      'TypeScript',
      'NestJS',
      'Neon PostgreSQL',
      'Firebase',
      'HiveMQ',
      'Expo FCM',
      'SendGrid',
      'Docker',
      'Render',
    ],
    links: [
      { label: 'View website', href: 'https://www.nurturaloam.tech', variant: 'accent' },
      { label: 'View API server', href: 'https://api.nurturaloam.tech', variant: 'accent' },
      {
        label: 'GitHub',
        href: 'https://github.com/adreno255/nurtura-backend',
        variant: 'secondary',
      },
    ],
  },
  {
    id: 'eyesite',
    name: 'EyeSite',
    displayName: 'EYESITE',
    displaySub: 'Optical Clinic Management',
    image: '/eyesite-logo-long.png',
    role: 'Full-Stack Developer',
    year: '2025',
    teamSize: '2-person team',
    featured: true,
    archived: false,
    filters: ['website'],
    shortDesc:
      'Full-stack web application for an optical clinic — appointment booking, digital prescriptions, eyewear marketplace, and role-based access for patients and doctors.',
    fullDesc:
      'EyeSite is a full-stack optical clinic management system built with Laravel and React. It provides an integrated platform for managing patient care, appointments, prescriptions, and eyewear sales. Patients can book appointments and purchase eyewear online while clinic staff manage records, consultations, and inventory within a secure, role-based environment.',
    features: [
      'Dual user experience for patients and doctors',
      'Online appointment booking system',
      'Digital patient records & prescription management',
      'Integrated eyewear marketplace',
      'Doctor dashboard with reports',
      'Automated email notifications',
    ],
    tech: ['React', 'Laravel', 'MySQL'],
    links: [
      { label: 'GitHub', href: 'https://github.com/adreno255/EyeSite', variant: 'secondary' },
    ],
  },
  {
    id: 'attendease',
    name: 'AttendEase',
    displayName: 'ATTENDEASE',
    displaySub: 'Employee Management System',
    image: '/attendease-logo-long.png',
    role: 'DBMS Administrator',
    year: '2024–25',
    teamSize: '5-person team',
    featured: true,
    archived: false,
    filters: ['desktop'],
    shortDesc:
      'Windows Forms Employee Management System for a university campus — real-time class monitoring, dynamic payout calculations, and remote MySQL database on Railway.',
    fullDesc:
      'AttendEase is a specialized platform designed to improve attendance monitoring and payroll accuracy in a university setting. It introduces two-factor verification combining logbook entry with campus guard validation to ensure professors are present and accountable. Linking verified attendance with payroll computation promotes fairness, transparency, and efficiency.',
    features: [
      'Smart class session control & monitoring',
      'Teaching hours tracking & validation',
      'Payroll integration with accurate computation',
      'Role-based access control',
      'Centralized records management',
      'Remote MySQL deployment via Railway',
    ],
    tech: ['C#', '.NET Framework', 'MySQL', 'Railway'],
    links: [
      {
        label: 'GitHub',
        href: 'https://github.com/adreno255/AttendEaseProject',
        variant: 'secondary',
      },
    ],
  },
  {
    id: 'torchbound',
    name: 'Torchbound',
    displayName: 'TORCHBOUND',
    displaySub: 'Browser Maze Adventure',
    role: 'Full-Stack Developer',
    year: '2026',
    teamSize: 'Solo project',
    featured: false,
    archived: true,
    filters: ['website'],
    shortDesc:
      'A 2D pixel-style top-down maze game built for the browser. Fog-of-war visibility, dynamic traps, health and timer pressure, and a local leaderboard.',
    fullDesc:
      'Torchbound is a 2D pixel-style, top-down maze adventure game built for the browser using p5.js. Players navigate dark, trap-filled dungeons with visibility limited to the glow of a single torch. Navigate increasingly complex mazes, avoid dynamic traps, and manage limited time and health to reach the exit.',
    features: [
      'Dynamic fog-of-war system',
      'Grid-based movement with timing-based traps',
      'Progressive maze design with increasing complexity',
      'Health & countdown timer survival system',
      'Performance-based scoring & local leaderboard',
      'Browser-based — no install required',
    ],
    tech: ['JavaScript', 'p5.js', 'Supabase', 'Vercel'],
    links: [
      { label: 'View website', href: 'https://torchbound.vercel.app', variant: 'accent' },
      { label: 'GitHub', href: 'https://github.com/adreno255/torchbound', variant: 'secondary' },
    ],
  },
  {
    id: 'litwebsite',
    name: 'LitWebsite',
    displayName: 'LITWEBSITE',
    displaySub: 'Creative Media Platform',
    role: 'Full-Stack Developer',
    year: '2025',
    teamSize: '5-person team',
    featured: false,
    archived: true,
    filters: ['website'],
    shortDesc:
      'Centralized digital hub for managing and distributing creative media in educational institutions — document library, role-based access, and admin analytics.',
    fullDesc:
      'LIT Creative Media Platform is a full-stack web application built with Laravel and React, designed as a centralized digital hub for managing and distributing creative media within educational institutions. It enables seamless organization, discovery, and controlled access to documents, books, and multimedia content with tiered membership support and role-based access control.',
    features: [
      'Secure authentication & role management',
      'Centralized creative media library',
      'Smart media categorization & search',
      'Institution & membership management',
      'Integrated support ticket system',
      'Admin dashboard & analytics',
    ],
    tech: ['React', 'Laravel', 'MySQL'],
    links: [
      { label: 'GitHub', href: 'https://github.com/adreno255/LITWebsite', variant: 'secondary' },
    ],
  },
  {
    id: 'courseplorer',
    name: 'CoursePlorer',
    displayName: 'COURSEPLORER',
    displaySub: 'Student Guidance Platform',
    role: 'Full-Stack Developer',
    year: '2024–25',
    teamSize: '4-person team',
    featured: false,
    archived: true,
    filters: ['website'],
    shortDesc:
      'Student guidance platform helping incoming freshmen explore college degree programs — course expectations, career paths, and student experience insights.',
    fullDesc:
      'CoursePlorer is a student guidance platform designed to help incoming freshmen explore and understand different college degree programs. It serves as an informational tool for students who are undecided or unfamiliar with available courses, providing clear insights into academic paths and potential career outcomes.',
    features: [
      'Course exploration hub with degree details',
      'Course expectations & student experience insights',
      'Career path guidance for each program',
      'Beginner-friendly, decision-support interface',
    ],
    tech: ['HTML', 'CSS', 'JavaScript', 'GitHub Pages'],
    links: [
      {
        label: 'View website',
        href: 'https://adreno255.github.io/COURSEplorer/',
        variant: 'accent',
      },
      { label: 'GitHub', href: 'https://github.com/adreno255/COURSEplorer', variant: 'secondary' },
    ],
  },
  {
    id: 'foodtracker',
    name: 'UCC North Food Tracker',
    displayName: 'FOOD TRACKER',
    displaySub: 'UCC North Campus',
    role: 'Back-End Developer',
    year: '2023–24',
    teamSize: '5-person team',
    featured: false,
    archived: true,
    filters: ['desktop'],
    shortDesc:
      'Windows Forms app for browsing campus food stores, scheduling pick-ups, and generating receipts — backed by Microsoft Access.',
    fullDesc:
      'UCC North Food Tracker is a user-friendly platform designed to help students discover affordable and nearby food options around the University of Caloocan City North campus. It acts as a virtual food guide, providing a curated list of meals with prices, locations, and vendor details — simplifying budget-conscious meal decisions.',
    features: [
      'Comprehensive food listings with pricing',
      'Location-based vendor information',
      'Checkout & receipt generation system',
      'Easy navigation & search',
    ],
    tech: ['C#', '.NET Framework', 'MS Access'],
    links: [
      {
        label: 'GitHub',
        href: 'https://github.com/iamseaweedbrain/final-final-cartsystem',
        variant: 'secondary',
      },
    ],
  },
];

// ─── Filter Bar ────────────────────────────────────────────────────────────

const FILTERS: { key: ProjectFilter; label: string }[] = [
  { key: 'all', label: 'all' },
  { key: 'website', label: 'website' },
  { key: 'desktop', label: 'desktop' },
  { key: 'mobile', label: 'mobile' },
];

function FilterBar({
  active,
  onChange,
  counts,
}: {
  active: ProjectFilter;
  onChange: (f: ProjectFilter) => void;
  counts: Record<ProjectFilter, number>;
}) {
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {FILTERS.map(({ key, label }) => (
        <button
          key={key}
          onClick={() => onChange(key)}
          className={[
            'inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5',
            'font-dm-mono text-[11px] tracking-[0.08em]',
            'transition-all duration-150 cursor-pointer select-none',
            active === key
              ? 'border-accent/50 bg-accent/10 text-accent shadow-[0_0_12px_rgba(201,169,110,0.12)]'
              : 'border-border-subtle bg-bg-raised text-text-muted hover:border-border-default hover:text-text-secondary',
          ].join(' ')}
        >
          {label}
          <span
            className={[
              'rounded-full px-1.5 py-0.5 font-dm-mono text-[9px] tabular-nums',
              active === key ? 'bg-accent/20 text-accent' : 'bg-bg-overlay text-text-faint',
            ].join(' ')}
          >
            {counts[key]}
          </span>
        </button>
      ))}
    </div>
  );
}

// ─── Projects Section ──────────────────────────────────────────────────────

export default function Projects() {
  const { ref: sectionRef, inView } = useInView();
  const [activeFilter, setActiveFilter] = useState<ProjectFilter>('all');

  const filtered = PROJECTS.filter(
    (p) => activeFilter === 'all' || p.filters.includes(activeFilter),
  );

  const featuredFiltered = filtered.filter((p) => p.featured);
  const archivedFiltered = filtered.filter((p) => p.archived);

  const heroProject = featuredFiltered[0];
  const secondaryFeatured = featuredFiltered.slice(1);

  const counts: Record<ProjectFilter, number> = {
    all: PROJECTS.length,
    website: PROJECTS.filter((p) => p.filters.includes('website')).length,
    desktop: PROJECTS.filter((p) => p.filters.includes('desktop')).length,
    mobile: PROJECTS.filter((p) => p.filters.includes('mobile')).length,
  };

  const reveal = (delay: number) => ({
    style: {
      opacity: inView ? 1 : 0,
      transform: inView ? 'translateY(0)' : 'translateY(20px)',
      transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`,
    },
  });

  return (
    <section id="projects" className="relative py-24 md:py-32" ref={sectionRef}>
      {/* Top hairline */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{ background: 'linear-gradient(to right, transparent, #2e2e2e, transparent)' }}
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        {/* ── Section header ── */}
        <div className="mb-10" {...reveal(0)}>
          <p className="mb-3 flex items-center gap-3 text-xs font-medium tracking-[0.2em] text-accent">
            <span className="h-px w-6 bg-accent/60" />
            WHAT I&apos;VE BUILT
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2
                className="text-4xl font-bold tracking-tight text-text-primary sm:text-5xl lg:text-6xl"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Projects
              </h2>
              <p className="mt-2 font-dm-sans text-sm text-text-muted">
                {PROJECTS.length} academic projects · {PROJECTS.filter((p) => p.featured).length}{' '}
                featured
              </p>
            </div>
            <div className="flex flex-col items-start gap-1 sm:items-end">
              <span className="font-dm-mono text-[9px] tracking-[0.2em] text-text-faint">
                filter by platform
              </span>
              <FilterBar active={activeFilter} onChange={setActiveFilter} counts={counts} />
            </div>
          </div>
        </div>

        {/* ── Featured Projects ── */}
        {featuredFiltered.length > 0 && (
          <div className="mb-4">
            <div className="mb-3 flex items-center gap-3" {...reveal(80)}>
              <span className="font-dm-mono text-[10px] tracking-[0.2em] text-text-faint">
                FEATURED PROJECTS
              </span>
              <div className="h-px flex-1 bg-linear-to-r from-border-subtle to-transparent" />
            </div>

            <div className="flex flex-col gap-4">
              {heroProject && (
                <FeaturedHeroCard project={heroProject} inView={inView} delay={120} />
              )}
              {secondaryFeatured.length > 0 && (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {secondaryFeatured.map((project, i) => (
                    <FeaturedSecondaryCard
                      key={project.id}
                      project={project}
                      inView={inView}
                      delay={200 + i * 80}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── Archived Projects ── */}
        {archivedFiltered.length > 0 && (
          <div
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.65s ease 380ms, transform 0.65s ease 380ms',
            }}
          >
            <div className="mb-3 flex items-center gap-3">
              <span className="font-dm-mono text-[10px] tracking-[0.2em] text-text-faint">
                OTHER PROJECTS · CLICK TO EXPAND
              </span>
              <div className="h-px flex-1 bg-linear-to-r from-border-subtle to-transparent" />
            </div>

            {/* Table column headers */}
            <div className="hidden items-center gap-4 border-b border-border-subtle px-4 pb-2 sm:flex">
              <span className="w-6 shrink-0 font-dm-mono text-[9px] tracking-[0.15em] text-text-faint">
                #
              </span>
              <span className="flex-1 font-dm-mono text-[9px] tracking-[0.15em] text-text-faint">
                PROJECT
              </span>
              <span className="hidden font-dm-mono text-[9px] tracking-[0.15em] text-text-faint sm:block">
                TECH
              </span>
              <span className="w-12 font-dm-mono text-[9px] tracking-[0.15em] text-text-faint">
                YEAR
              </span>
              <span className="w-4" />
            </div>

            <div className="overflow-hidden rounded-xl border border-border-subtle bg-bg-raised shadow-button-secondary">
              {archivedFiltered.map((project, i) => (
                <ArchivedRow
                  key={project.id}
                  project={project}
                  inView={inView}
                  delay={420 + i * 60}
                  index={i + 4}
                />
              ))}
            </div>
          </div>
        )}

        {/* Empty state */}
        {featuredFiltered.length === 0 && archivedFiltered.length === 0 && (
          <div className="flex flex-col items-center gap-3 py-20 text-center" {...reveal(100)}>
            <span className="font-dm-mono text-[10px] tracking-[0.2em] text-text-faint">
              NO PROJECTS
            </span>
            <p className="text-sm text-text-muted">No projects match the selected filter.</p>
          </div>
        )}
      </div>
    </section>
  );
}
