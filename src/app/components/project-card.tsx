'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';

// ─── Types ─────────────────────────────────────────────────────────────────

export type ProjectFilter = 'all' | 'website' | 'desktop' | 'mobile';

export interface ProjectLink {
  label: string;
  href: string;
  variant?: 'primary' | 'secondary' | 'accent';
}

export interface Project {
  id: string;
  name: string;
  displayName: string;
  displaySub?: string;
  image?: string; // e.g. "/projects/nurtura.jpg" — add your image paths here
  role: string;
  year: string;
  teamSize: string;
  featured: boolean;
  archived: boolean;
  filters: ProjectFilter[];
  shortDesc: string;
  fullDesc: string;
  features: string[];
  tech: string[];
  links: ProjectLink[];
}

// ─── Icons ─────────────────────────────────────────────────────────────────

function CloseIcon({ size = 14 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function ExternalIcon({ size = 11 }: { size?: number }) {
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
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

function ChevronIcon({ size = 11 }: { size?: number }) {
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
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

// ─── Project Visual ────────────────────────────────────────────────────────
// Renders the project image if `project.image` is set, otherwise a decorative
// dot-grid fallback banner. Used in both cards and the modal.

function ProjectVisual({ project, compact = false }: { project: Project; compact?: boolean }) {
  const height = compact ? 120 : 180;

  if (project.image) {
    return (
      <div className="relative w-full overflow-hidden" style={{ height }}>
        <Image
          src={project.image}
          alt={project.name}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover object-center"
        />
        {/* Subtle gradient so the content below doesn't clash */}
        <div className="absolute inset-0 bg-linear-to-t from-bg-raised/50 to-transparent pointer-events-none" />
      </div>
    );
  }

  // Fallback: decorative dot-grid text banner
  return (
    <div
      className="relative flex flex-col items-center justify-center overflow-hidden select-none"
      style={{
        height,
        background:
          'radial-gradient(ellipse 80% 70% at 50% 120%, rgba(201,169,110,0.08) 0%, transparent 70%), #0a0a0a',
      }}
    >
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.07]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id={`dots-${project.id}`}
            x="0"
            y="0"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="1" cy="1" r="1" fill="#C9A96E" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#dots-${project.id})`} />
      </svg>
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-linear-to-t from-bg-base to-transparent pointer-events-none" />
      <p
        className="relative z-10 font-playfair text-center text-text-faint"
        style={{ fontSize: compact ? '18px' : '26px', letterSpacing: '0.3em' }}
      >
        {project.displayName}
      </p>
      {project.displaySub && (
        <p className="relative z-10 mt-1 font-dm-mono text-[10px] tracking-[0.2em] text-text-faint/60">
          {project.displaySub}
        </p>
      )}
    </div>
  );
}

// ─── Tech Tag ──────────────────────────────────────────────────────────────

export function TechTag({ name, accent = false }: { name: string; accent?: boolean }) {
  return (
    <span
      className={[
        'inline-flex items-center rounded-md border px-2.5 py-1 font-dm-mono text-[10px] tracking-wide',
        accent
          ? 'border-accent/40 bg-accent/10 text-accent'
          : 'border-border-subtle bg-bg-overlay text-text-secondary',
      ].join(' ')}
    >
      {name}
    </span>
  );
}

// ─── Link Button ───────────────────────────────────────────────────────────
// variant 'accent'    → gold button  (View website, View API server, etc.)
// variant 'secondary' → dark button  (GitHub)
// variant 'primary'   → white button (View details — used internally)

export function LinkButton({ href, label, variant = 'secondary' }: ProjectLink) {
  const base = [
    'inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-medium select-none cursor-pointer',
    'transition-[box-shadow,transform,background-color,color,border-color] duration-[120ms]',
  ].join(' ');

  const styles: Record<string, string> = {
    primary: [
      'bg-neutral-200 text-bg-base',
      'shadow-[0_3px_0_0_#8a8880,0_4px_10px_rgba(0,0,0,0.45)]',
      'hover:bg-neutral-100 hover:translate-y-[2px] hover:shadow-[0_1px_0_0_#8a8880,0_2px_4px_rgba(0,0,0,0.3)]',
      'active:shadow-none active:translate-y-[4px]',
    ].join(' '),
    accent: [
      'bg-accent text-bg-base border border-accent',
      'shadow-[0_3px_0_0_#7a5e2a,0_4px_10px_rgba(0,0,0,0.45)]',
      'hover:bg-accent-light hover:translate-y-[2px] hover:shadow-[0_1px_0_0_#7a5e2a,0_2px_4px_rgba(0,0,0,0.3)]',
      'active:shadow-none active:translate-y-[4px]',
    ].join(' '),
    secondary: [
      'bg-bg-raised text-text-secondary border border-border-subtle',
      'shadow-[0_3px_0_0_#0d0d0d,0_4px_10px_rgba(0,0,0,0.5)]',
      'hover:bg-bg-overlay hover:text-text-primary hover:border-border-strong hover:translate-y-[2px] hover:shadow-[0_1px_0_0_#0d0d0d,0_2px_4px_rgba(0,0,0,0.3)]',
      'active:shadow-none active:translate-y-[4px]',
    ].join(' '),
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${base} ${styles[variant] ?? styles.secondary}`}
    >
      {label}
      <ExternalIcon />
    </a>
  );
}

// ─── Modal ─────────────────────────────────────────────────────────────────
// Desktop/tablet: centered overlay  (items-center, md:p-6)
// Mobile:         bottom sheet      (items-end, rounded-t-2xl, drag handle)

function Modal({ project, onClose }: { project: Project; onClose: () => void }) {
  const overlayRef = useRef<HTMLDivElement>(null);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  // Escape key closes modal
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return createPortal(
    // Overlay — clicking the backdrop closes the modal
    <div
      ref={overlayRef}
      onClick={onClose}
      // mobile → bottom sheet (items-end); md+ → centered overlay (items-center)
      className="fixed inset-0 z-50 flex items-end justify-center md:items-center md:p-6"
      style={{ background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)' }}
    >
      {/* Panel — stopPropagation so clicks inside don't close the modal */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={[
          'relative w-full bg-bg-raised',
          // Mobile: flat bottom, rounded top. md+: fully rounded, max-width constrained.
          'rounded-t-2xl md:rounded-2xl md:max-w-2xl',
          'border border-border-default',
          'shadow-[0_-4px_40px_rgba(0,0,0,0.6)] md:shadow-[0_8px_60px_rgba(0,0,0,0.7)]',
          'max-h-[90vh] overflow-y-auto',
        ].join(' ')}
      >
        {/* Mobile drag handle */}
        <div className="flex justify-center pt-3 pb-1 md:hidden">
          <div className="h-1 w-10 rounded-full bg-border-strong" />
        </div>

        {/* Project image / banner (featured only) */}
        {project.featured && <ProjectVisual project={project} compact />}

        {/* Content */}
        <div className="p-6">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 z-10 flex h-7 w-7 items-center justify-center rounded-lg border border-border-subtle bg-bg-elevated text-text-muted hover:text-text-primary transition-colors"
          >
            <CloseIcon />
          </button>

          {/* Header */}
          <div className="mb-5 pr-8">
            {project.featured && (
              <div className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-2.5 py-1">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                <span className="font-dm-mono text-[10px] tracking-[0.15em] text-accent">
                  featured project
                </span>
              </div>
            )}
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-playfair text-2xl font-bold text-text-primary">
                  {project.name}
                </h3>
                <p className="mt-0.5 font-dm-sans text-sm text-text-secondary">
                  {project.role} · {project.teamSize}
                </p>
              </div>
              <span className="font-dm-mono text-xs text-text-faint shrink-0">{project.year}</span>
            </div>
          </div>

          {/* Description */}
          <div className="mb-5">
            <p className="mb-2 font-dm-mono text-[10px] tracking-[0.18em] text-text-muted">
              DESCRIPTION
            </p>
            <p className="text-sm leading-relaxed text-text-secondary">{project.fullDesc}</p>
          </div>

          {/* Key Features */}
          <div className="mb-5">
            <p className="mb-3 font-dm-mono text-[10px] tracking-[0.18em] text-text-muted">
              KEY FEATURES
            </p>
            <ul
              className={[
                'grid gap-x-6 gap-y-1.5',
                project.features.length > 4 ? 'md:grid-cols-2' : 'grid-cols-1',
              ].join(' ')}
            >
              {project.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-text-secondary">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent/60" />
                  {f}
                </li>
              ))}
            </ul>
          </div>

          {/* Tech Stack */}
          <div className="mb-6">
            <p className="mb-3 font-dm-mono text-[10px] tracking-[0.18em] text-text-muted">
              TECH STACK
            </p>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <TechTag key={t} name={t} accent={project.featured} />
              ))}
            </div>
          </div>

          {/* Links */}
          {project.links.length > 0 && (
            <div className="flex flex-wrap gap-2.5">
              {project.links.map((link) => (
                <LinkButton key={link.label} {...link} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
}

// ─── Featured Hero Card ────────────────────────────────────────────────────
// The entire card is clickable and opens the modal.

export function FeaturedHeroCard({
  project,
  inView,
  delay,
}: {
  project: Project;
  inView: boolean;
  delay: number;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        onClick={() => setOpen(true)}
        style={{
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(24px)',
          transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`,
        }}
        className="group relative cursor-pointer overflow-hidden rounded-xl border border-border-subtle bg-bg-raised shadow-button-secondary hover:border-border-default hover:-translate-y-px transition-[border-color,transform] duration-200"
      >
        <div className="grid grid-cols-1 md:grid-cols-[2fr_3fr]">
          {/* Left: project image / banner */}
          <div className="relative md:min-h-55">
            {/* Make the visual fill its grid cell on desktop */}
            <div className="md:absolute md:inset-0">
              <ProjectVisual project={project} />
            </div>
          </div>

          {/* Right: content */}
          <div className="flex flex-col gap-4 border-t border-border-subtle p-6 md:border-l md:border-t-0">
            {/* Badge + year */}
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-2.5 py-1">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                <span className="font-dm-mono text-[10px] tracking-[0.15em] text-accent">
                  featured
                </span>
              </div>
              <span className="font-dm-mono text-xs text-text-faint">{project.year}</span>
            </div>

            {/* Name + role */}
            <div>
              <h3 className="font-playfair text-2xl font-bold text-text-primary group-hover:text-accent transition-colors duration-200">
                {project.name}
              </h3>
              <p className="mt-0.5 font-dm-sans text-sm text-text-secondary">
                {project.role} · {project.teamSize}
              </p>
            </div>

            {/* Short desc */}
            <p className="text-sm leading-relaxed text-text-secondary line-clamp-3">
              {project.shortDesc}
            </p>

            {/* Tech */}
            <div className="flex flex-wrap gap-1.5">
              {project.tech.slice(0, 6).map((t) => (
                <TechTag key={t} name={t} accent />
              ))}
            </div>

            {/* Bottom row — stop link clicks from also triggering the card */}
            <div
              className="mt-auto flex flex-wrap items-center gap-2.5"
              onClick={(e) => e.stopPropagation()}
            >
              {project.links.slice(0, 1).map((link) => (
                <LinkButton key={link.label} {...link} />
              ))}
              <span className="font-dm-mono text-[10px] text-text-faint hidden lg:inline">
                click card to expand
              </span>
            </div>
          </div>
        </div>
      </div>

      {open && <Modal project={project} onClose={() => setOpen(false)} />}
    </>
  );
}

// ─── Featured Secondary Card ───────────────────────────────────────────────

export function FeaturedSecondaryCard({
  project,
  inView,
  delay,
}: {
  project: Project;
  inView: boolean;
  delay: number;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        onClick={() => setOpen(true)}
        style={{
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(24px)',
          transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`,
        }}
        className="group relative flex cursor-pointer flex-col overflow-hidden rounded-xl border border-border-subtle bg-bg-raised shadow-button-secondary hover:border-border-default hover:-translate-y-px transition-[border-color,transform] duration-200"
      >
        <ProjectVisual project={project} compact />

        <div className="flex flex-col gap-3 border-t border-border-subtle p-5">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-playfair text-lg font-bold text-text-primary group-hover:text-accent transition-colors duration-200">
                {project.name}
              </h3>
              <p className="font-dm-sans text-xs text-text-secondary">{project.role}</p>
            </div>
            <span className="font-dm-mono text-xs text-text-faint shrink-0">{project.year}</span>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {project.tech.slice(0, 4).map((t) => (
              <TechTag key={t} name={t} />
            ))}
          </div>

          <p className="font-dm-mono text-[10px] tracking-wide text-text-muted group-hover:text-accent transition-colors">
            Click to view details ↗
          </p>
        </div>
      </div>

      {open && <Modal project={project} onClose={() => setOpen(false)} />}
    </>
  );
}

// ─── Archived Row ──────────────────────────────────────────────────────────

export function ArchivedRow({
  project,
  inView,
  delay,
  index,
}: {
  project: Project;
  inView: boolean;
  delay: number;
  index: number;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        onClick={() => setOpen(true)}
        style={{
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateX(0)' : 'translateX(-12px)',
          transition: `opacity 0.5s ease ${delay}ms, transform 0.5s ease ${delay}ms`,
        }}
        className="group flex cursor-pointer items-center gap-4 border-b border-border-subtle px-4 py-3.5 hover:bg-bg-elevated transition-colors duration-150 last:border-b-0"
      >
        <span className="w-6 shrink-0 font-dm-mono text-[11px] text-text-faint tabular-nums">
          {String(index).padStart(2, '0')}
        </span>

        <div className="min-w-0 flex-1">
          <span className="font-playfair text-sm font-semibold text-text-primary group-hover:text-accent transition-colors">
            {project.name}
          </span>
          <span className="ml-2 font-dm-sans text-xs text-text-muted">{project.role}</span>
        </div>

        <div className="hidden items-center gap-1.5 sm:flex">
          {project.tech.slice(0, 3).map((t) => (
            <TechTag key={t} name={t} />
          ))}
        </div>

        <span className="shrink-0 font-dm-mono text-xs text-text-faint">{project.year}</span>

        <ChevronIcon size={12} />
      </div>

      {open && <Modal project={project} onClose={() => setOpen(false)} />}
    </>
  );
}
