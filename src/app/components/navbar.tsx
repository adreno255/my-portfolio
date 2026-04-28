'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { RaisedButton } from './buttons';
import { DownloadIcon } from './icons';

const NAV_LINKS = ['About', 'Skills', 'Projects', 'Certificates', 'Contact'];

export default function Navbar() {
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
        scrolled ? 'border-b border-border-subtle bg-bg-base/90 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
        {/* Logo - Uses font-playfair class */}
        <Link
          href="/"
          className="font-playfair text-2xl font-bold tracking-tight text-text-primary transition-opacity hover:opacity-70"
        >
          AF
        </Link>

        {/* Desktop links - Uses font-dm-sans class */}
        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="font-dm-sans text-xs font-medium tracking-[0.12em] text-text-muted transition-colors hover:text-text-secondary"
            >
              {link.toUpperCase()}
            </a>
          ))}
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
        className={`overflow-hidden border-b border-border-subtle bg-bg-base/95 backdrop-blur-md transition-all duration-300 md:hidden ${menuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <div className="flex flex-col gap-1 px-6 pb-6 pt-2">
          {NAV_LINKS.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              onClick={() => setMenuOpen(false)}
              className="font-dm-sans py-2 text-xs font-medium tracking-[0.12em] text-text-muted transition-colors hover:text-text-secondary"
            >
              {link.toUpperCase()}
            </a>
          ))}
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
