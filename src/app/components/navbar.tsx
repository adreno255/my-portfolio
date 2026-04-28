'use client';

import { useEffect, useState } from 'react';
import { RaisedButton } from './buttons';
import { DownloadIcon } from './icons';

const NAV_LINKS = ['About', 'Skills', 'Projects', 'Contact'];

// Sections the navbar tracks (hero is the implicit "home" at top)
const ALL_SECTIONS = ['hero', 'about', 'skills', 'projects', 'contact'];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  // ── Scroll position → frosted bar ──────────────────────────────
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  // ── IntersectionObserver → active section ───────────────────────
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    ALL_SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        // trigger when section occupies >40 % of viewport
        { threshold: 0.4 },
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const linkCls = (id: string) => {
    const base =
      'font-dm-sans text-xs font-medium tracking-[0.12em] transition-colors duration-200';
    const isActive = activeSection === id;
    return isActive
      ? `${base} text-text-primary`
      : `${base} text-text-muted hover:text-text-secondary`;
  };

  return (
    <nav
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'border-b border-border-subtle bg-bg-base/90 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
        {/* Logo — scrolls to #hero */}
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="font-playfair text-2xl font-bold tracking-tight text-text-primary transition-opacity hover:opacity-70"
        >
          AF
        </a>

        {/* Desktop links */}
        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => {
            const id = link.toLowerCase();
            const isActive = activeSection === id;
            return (
              <a key={link} href={`#${id}`} className={linkCls(id)}>
                <span className="relative inline-block">
                  {link.toUpperCase()}
                  {/* active underline */}
                  <span
                    className="absolute -bottom-1 left-0 h-px w-full origin-left bg-accent transition-transform duration-200"
                    style={{ transform: isActive ? 'scaleX(1)' : 'scaleX(0)' }}
                  />
                </span>
              </a>
            );
          })}
        </div>

        {/* Desktop resume button */}
        <div className="hidden md:block">
          <RaisedButton href="/resume.pdf" download="Angelo-Flores-Resume.pdf" variant="primary">
            <DownloadIcon />
            Resume
          </RaisedButton>
        </div>

        {/* Mobile hamburger */}
        <button
          className="flex flex-col items-end gap-1.5 md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`block h-[1.5px] bg-text-primary transition-all duration-300 ${menuOpen ? 'w-5 translate-y-1.5 rotate-45' : 'w-5'}`}
          />
          <span
            className={`block h-[1.5px] bg-text-primary transition-all duration-300 ${menuOpen ? 'w-5 opacity-0' : 'w-3.5'}`}
          />
          <span
            className={`block h-[1.5px] bg-text-primary transition-all duration-300 ${menuOpen ? 'w-5 -translate-y-1.5 -rotate-45' : 'w-5'}`}
          />
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        className={`overflow-hidden border-b border-border-subtle bg-bg-base/95 backdrop-blur-md transition-all duration-300 md:hidden ${
          menuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="flex flex-col gap-1 px-6 pb-6 pt-2">
          {NAV_LINKS.map((link) => {
            const id = link.toLowerCase();
            const isActive = activeSection === id;
            return (
              <a
                key={link}
                href={`#${id}`}
                onClick={() => setMenuOpen(false)}
                className={`${linkCls(id)} py-2 ${isActive ? 'text-text-primary' : ''}`}
              >
                {link.toUpperCase()}
              </a>
            );
          })}
          <div className="mt-4">
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
