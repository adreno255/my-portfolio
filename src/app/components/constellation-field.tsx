'use client';

import { useEffect, useRef } from 'react';

/**
 * ConstellationField
 *
 * A canvas-based particle constellation that renders behind and around
 * the profile picture in the hero section. Particles float, connect
 * with lines when close, and react subtly to mouse movement.
 *
 * Usage — wrap your existing avatar markup with the exported
 * <AvatarWithConstellation> component, OR drop <ConstellationField>
 * as a sibling absolute layer inside the avatar container div.
 *
 * ─── Integration in hero.tsx ───────────────────────────────────────
 *
 * 1. Import:
 *    import ConstellationField from './ConstellationField';
 *
 * 2. Find the desktop avatar wrapper div (the one that has the
 *    animate-avatar-glow, animate-ring-rotate, and animate-avatar-float
 *    children). Make its direct parent `relative` and add the canvas:
 *
 *    <div className="relative hidden shrink-0 md:block" {...reveal(200)}>
 *      <ConstellationField />          ← ADD THIS
 *      <div className="animate-avatar-glow absolute rounded-full" ... />
 *      <div className="animate-ring-rotate absolute rounded-full" ... />
 *      <div className="animate-avatar-float relative h-64 w-64 lg:h-80 lg:w-80">
 *        <Image ... />
 *      </div>
 *    </div>
 *
 * The canvas uses pointer-events-none and z-0, so nothing is blocked.
 * The avatar sits above via its own stacking context (relative + z-10
 * or just natural DOM order above the canvas).
 * ───────────────────────────────────────────────────────────────────
 */

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
  opacityDelta: number;
  // distance from canvas center — used to keep particles in the halo zone
  baseAngle: number;
  baseRadius: number;
  orbitSpeed: number;
}

export default function ConstellationField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // ── Sizing ─────────────────────────────────────────────────────
    let W = 0,
      H = 0,
      CX = 0,
      CY = 0;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const pr = window.devicePixelRatio || 1;
      // Canvas covers a generous area around the avatar — larger than
      // the avatar itself so particles spill outward naturally.
      // We size it relative to the parent container.
      const rect = parent.getBoundingClientRect();
      W = rect.width + 280; // overshoot left and right
      H = rect.height + 280; // overshoot top and bottom
      canvas.width = Math.round(W * pr);
      canvas.height = Math.round(H * pr);
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
      // Re-centre the canvas over the avatar
      canvas.style.left = `-140px`;
      canvas.style.top = `-140px`;
      CX = W / 2;
      CY = H / 2;
      ctx.scale(pr, pr);
    };

    // ── Particle creation ──────────────────────────────────────────
    const PARTICLE_COUNT = 72;
    // Inner exclusion radius — particles avoid the avatar circle itself
    const AVATAR_R = 148;
    // Halo band: particles live between AVATAR_R + 10 and MAX_ORBIT_R
    const MIN_ORBIT = AVATAR_R + 8;
    const MAX_ORBIT = AVATAR_R + 195;

    const particles: Particle[] = [];

    const makeParticle = (): Particle => {
      const angle = Math.random() * Math.PI * 2;
      const r = MIN_ORBIT + Math.random() * (MAX_ORBIT - MIN_ORBIT);
      return {
        x: CX + Math.cos(angle) * r,
        y: CY + Math.sin(angle) * r,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        radius: 1.2 + Math.random() * 1.8,
        opacity: 0.3 + Math.random() * 0.5,
        opacityDelta: (Math.random() < 0.5 ? 1 : -1) * (0.003 + Math.random() * 0.006),
        baseAngle: angle,
        baseRadius: r,
        orbitSpeed: (Math.random() - 0.5) * 0.0003,
      };
    };

    const initParticles = () => {
      particles.length = 0;
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push(makeParticle());
      }
    };

    // ── Mouse offset (gentle parallax pull) ───────────────────────
    let mouseX = 0,
      mouseY = 0;
    let canvasOffsetX = 0,
      canvasOffsetY = 0;

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      canvasOffsetX = rect.left;
      canvasOffsetY = rect.top;
      // Normalise to [-1, 1] relative to canvas centre
      mouseX = (e.clientX - canvasOffsetX - CX) / CX;
      mouseY = (e.clientY - canvasOffsetY - CY) / CY;
    };
    window.addEventListener('mousemove', onMouseMove, { passive: true });

    // ── Connection distance ────────────────────────────────────────
    const CONNECT_DIST = 88;

    // ── Draw ───────────────────────────────────────────────────────
    let raf: number;

    const draw = () => {
      raf = requestAnimationFrame(draw);
      ctx.clearRect(0, 0, W, H);

      // Subtle parallax influence — pull the whole field slightly
      const pullX = mouseX * 10;
      const pullY = mouseY * 10;

      // ── Update particles ────────────────────────────────────────
      for (const p of particles) {
        // Drift
        p.x += p.vx;
        p.y += p.vy;

        // Orbit the centre
        p.baseAngle += p.orbitSpeed;

        // Soft elastic pull back toward their orbit ring
        const dx = p.x - (CX + pullX);
        const dy = p.y - (CY + pullY);
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist > 0) {
          // Push away if too close to avatar centre
          if (dist < MIN_ORBIT) {
            const push = (MIN_ORBIT - dist) / MIN_ORBIT;
            p.vx += (dx / dist) * push * 0.4;
            p.vy += (dy / dist) * push * 0.4;
          }
          // Pull back if too far
          if (dist > MAX_ORBIT + 20) {
            const pull = (dist - MAX_ORBIT) / MAX_ORBIT;
            p.vx -= (dx / dist) * pull * 0.25;
            p.vy -= (dy / dist) * pull * 0.25;
          }
        }

        // Dampen velocity
        p.vx *= 0.985;
        p.vy *= 0.985;

        // Pulse opacity
        p.opacity += p.opacityDelta;
        if (p.opacity > 0.85 || p.opacity < 0.15) {
          p.opacityDelta *= -1;
        }
      }

      // ── Draw connections ────────────────────────────────────────
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < CONNECT_DIST) {
            const alpha = (1 - d / CONNECT_DIST) * 0.22;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(201, 169, 110, ${alpha})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
      }

      // ── Draw particles ──────────────────────────────────────────
      for (const p of particles) {
        // Outer glow ring
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 2.4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201, 169, 110, ${p.opacity * 0.08})`;
        ctx.fill();

        // Core dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(232, 230, 225, ${p.opacity})`;
        ctx.fill();
      }

      // ── A few brighter "star" nodes ─────────────────────────────
      for (let i = 0; i < particles.length; i += 9) {
        const p = particles[i];
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201, 169, 110, ${p.opacity * 0.9})`;
        ctx.fill();
      }
    };

    // ── Init ───────────────────────────────────────────────────────
    resize();
    initParticles();
    draw();

    const onResize = () => {
      ctx.resetTransform();
      resize();
    };
    window.addEventListener('resize', onResize, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      style={{
        position: 'absolute',
        pointerEvents: 'none',
        zIndex: 0,
        userSelect: 'none',
        WebkitUserSelect: 'none',
      }}
    />
  );
}
