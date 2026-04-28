'use client';

// ─── 3D Raised Button ──────────────────────────────────────────────────────
interface RaisedButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  className?: string;
  download?: string;
}

export function RaisedButton({
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

  const variants = {
    primary: [
      'bg-neutral-200 text-bg-base',
      'shadow-button-primary',
      'hover:bg-neutral-100 hover:text-bg-raised',
      'hover:shadow-button-hover hover:translate-y-[2px]',
      'active:bg-neutral-shadow active:text-[#1A1200]',
      'active:shadow-none active:translate-y-[4px]',
    ].join(' '),
    secondary: [
      'bg-bg-raised text-text-secondary border border-border-subtle',
      'shadow-button-secondary',
      'hover:bg-bg-overlay hover:text-text-primary hover:border-border-strong',
      'hover:shadow-button-hover hover:translate-y-[2px]',
      'active:bg-accent-glow active:text-accent active:border-accent-dark',
      'active:shadow-none active:translate-y-[4px]',
    ].join(' '),
  };

  const cls = `${base} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <a href={href} download={download} className={cls}>
        {children}
      </a>
    );
  }
  return (
    <button onClick={onClick} className={cls}>
      {children}
    </button>
  );
}

// ─── Social Icon Button ────────────────────────────────────────────────────
export function SocialButton({
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
        'flex h-10 w-10 items-center justify-center rounded-xl',
        'border border-border-subtle bg-bg-raised] text-text-muted',
        'shadow-button-hover',
        'transition-[box-shadow,transform,background-color,color,border-color] duration-120',
        'hover:border-border-strong hover:bg-bg-elevated hover:text-text-primary',
        'hover:translate-y-0.5 hover:shadow-button-hover',
        'active:bg-[#2A2010] active:text-accent active:border-accent-dark',
        'active:translate-y-1 active:shadow-none',
      ].join(' ')}
    >
      {children}
    </a>
  );
}
