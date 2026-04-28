'use client';

import { useEffect, useRef } from 'react';

/**
 * TopoBackground — animated topographic contour map.
 *
 * Uses a canvas-based Perlin-noise field to draw drifting contour lines,
 * mimicking the topographic map aesthetic in the reference image.
 * Colors are muted gray-green so it stays atmospheric and non-distracting.
 */
export function TopoBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // ── Resize handler ─────────────────────────────────────────────
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // ── Minimal Perlin-noise (2D, single octave + 2 extra for detail) ──
    const perm = new Uint8Array(512);
    const p = new Uint8Array(256);
    for (let i = 0; i < 256; i++) p[i] = i;
    for (let i = 255; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [p[i], p[j]] = [p[j], p[i]];
    }
    for (let i = 0; i < 512; i++) perm[i] = p[i & 255];

    const fade = (t: number) => t * t * t * (t * (t * 6 - 15) + 10);
    const lerp = (a: number, b: number, t: number) => a + t * (b - a);
    function grad(hash: number, x: number, y: number) {
      const h = hash & 3;
      const u = h < 2 ? x : y;
      const v = h < 2 ? y : x;
      return (h & 1 ? -u : u) + (h & 2 ? -v : v);
    }
    function noise2(x: number, y: number) {
      const xi = Math.floor(x) & 255,
        yi = Math.floor(y) & 255;
      const xf = x - Math.floor(x),
        yf = y - Math.floor(y);
      const u = fade(xf),
        v = fade(yf);
      const aa = perm[perm[xi] + yi],
        ab = perm[perm[xi] + yi + 1];
      const ba = perm[perm[xi + 1] + yi],
        bb = perm[perm[xi + 1] + yi + 1];
      return lerp(
        lerp(grad(aa, xf, yf), grad(ba, xf - 1, yf), u),
        lerp(grad(ab, xf, yf - 1), grad(bb, xf - 1, yf - 1), u),
        v,
      );
    }
    function fbm(x: number, y: number, octaves = 4) {
      let v = 0,
        amp = 0.5,
        freq = 1,
        max = 0;
      for (let o = 0; o < octaves; o++) {
        v += noise2(x * freq, y * freq) * amp;
        max += amp;
        amp *= 0.5;
        freq *= 2.1;
      }
      return v / max;
    }

    // ── Marching squares edge table ─────────────────────────────────
    // Simplified: for each cell we check if the corner values cross the
    // iso-threshold and draw a line segment through the crossing edges.
    function drawIsoLine(
      field: Float32Array,
      cols: number,
      rows: number,
      cellW: number,
      cellH: number,
      iso: number,
    ) {
      const edge = (a: number, b: number, t: number) => (t - a) / (b - a);

      for (let row = 0; row < rows - 1; row++) {
        for (let col = 0; col < cols - 1; col++) {
          const tl = field[row * cols + col];
          const tr = field[row * cols + col + 1];
          const bl = field[(row + 1) * cols + col];
          const br = field[(row + 1) * cols + col + 1];

          const x0 = col * cellW,
            x1 = (col + 1) * cellW;
          const y0 = row * cellH,
            y1 = (row + 1) * cellH;

          // encode which corners are above iso
          const idx =
            (tl > iso ? 8 : 0) | (tr > iso ? 4 : 0) | (br > iso ? 2 : 0) | (bl > iso ? 1 : 0);

          if (idx === 0 || idx === 15) continue;

          // interpolated crossing points on each edge
          const top = { x: x0 + edge(tl, tr, iso) * cellW, y: y0 };
          const right = { x: x1, y: y0 + edge(tr, br, iso) * cellH };
          const bottom = { x: x0 + edge(bl, br, iso) * cellW, y: y1 };
          const left = { x: x0, y: y0 + edge(tl, bl, iso) * cellH };

          const segments: [typeof top, typeof top][] = [];
          switch (idx) {
            case 1:
              segments.push([left, bottom]);
              break;
            case 2:
              segments.push([bottom, right]);
              break;
            case 3:
              segments.push([left, right]);
              break;
            case 4:
              segments.push([top, right]);
              break;
            case 5:
              segments.push([top, left]);
              segments.push([bottom, right]);
              break;
            case 6:
              segments.push([top, bottom]);
              break;
            case 7:
              segments.push([top, left]);
              break;
            case 8:
              segments.push([top, left]);
              break;
            case 9:
              segments.push([top, bottom]);
              break;
            case 10:
              segments.push([top, right]);
              segments.push([left, bottom]);
              break;
            case 11:
              segments.push([top, right]);
              break;
            case 12:
              segments.push([left, right]);
              break;
            case 13:
              segments.push([bottom, right]);
              break;
            case 14:
              segments.push([left, bottom]);
              break;
          }

          for (const [a, b] of segments) {
            ctx!.moveTo(a.x, a.y);
            ctx!.lineTo(b.x, b.y);
          }
        }
      }
    }

    // ── Animation loop ──────────────────────────────────────────────
    const CELL = 14; // marching-squares grid resolution
    const LEVELS = 18; // number of iso contours
    const SCALE = 0.0028; // noise spatial frequency
    const SPEED = 0.00012; // drift speed
    const GLOW_LEVELS = [0.0, 0.15, 0.82, 1.0]; // bright contours

    let t = 0;
    let raf: number;

    const tick = () => {
      t += SPEED;
      const W = canvas.width,
        H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      const cols = Math.ceil(W / CELL) + 2;
      const rows = Math.ceil(H / CELL) + 2;
      const field = new Float32Array(cols * rows);

      // Sample noise field
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const nx = c * SCALE;
          const ny = r * SCALE + t;
          // normalized 0→1
          field[r * cols + c] = fbm(nx, ny) * 0.5 + 0.5;
        }
      }

      // Draw each iso-contour level
      for (let lvl = 0; lvl < LEVELS; lvl++) {
        const iso = (lvl + 1) / (LEVELS + 1);
        const isGlow = GLOW_LEVELS.some((g) => Math.abs(iso - g) < 0.5 / LEVELS);
        const baseAlpha = 0.13 + (lvl % 3 === 0 ? 0.06 : 0);

        ctx.beginPath();
        drawIsoLine(field, cols, rows, CELL, CELL, iso);

        if (isGlow) {
          // Subtle glow pass
          ctx.save();
          ctx.strokeStyle = `rgba(190, 200, 185, ${baseAlpha + 0.12})`;
          ctx.lineWidth = 2.5;
          ctx.filter = 'blur(3px)';
          ctx.stroke();
          ctx.restore();

          // Crisp glow line on top
          ctx.beginPath();
          drawIsoLine(field, cols, rows, CELL, CELL, iso);
          ctx.strokeStyle = `rgba(210, 220, 205, ${baseAlpha + 0.18})`;
          ctx.lineWidth = 1.2;
          ctx.filter = 'none';
          ctx.stroke();
        } else {
          ctx.strokeStyle = `rgba(170, 178, 165, ${baseAlpha})`;
          ctx.lineWidth = 0.75;
          ctx.stroke();
        }
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 h-full w-full"
      style={{ opacity: 0.65 }}
    />
  );
}

export function DotGrid() {
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
          className="animate-dot-breathe"
        />
      </svg>
    </div>
  );
}
