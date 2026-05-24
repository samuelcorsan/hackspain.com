import type { LayoutProfile } from "./artboard";

interface Props {
  "aria-hidden"?: boolean;
  className?: string;
  strokeOnly?: boolean;
  variant?: LayoutProfile;
}

export function MosaicBackground({
  className = "",
  strokeOnly = false,
  "aria-hidden": ariaHidden = true,
  variant = "desktop",
}: Props) {
  if (variant === "compact") {
    return (
      <MosaicBackgroundCompact
        aria-hidden={ariaHidden}
        className={className}
        strokeOnly={strokeOnly}
      />
    );
  }
  return (
    <MosaicBackgroundDesktop
      aria-hidden={ariaHidden}
      className={className}
      strokeOnly={strokeOnly}
    />
  );
}

const PAPER = "var(--color-hs-paper)";
const INK = "var(--color-hs-ink)";
const ORANGE = "var(--color-hs-orange)";
const GOLD = "var(--color-hs-gold)";
const TEAL = "var(--color-hs-teal)";

// Desktop Mondrian — strict horizontal bands, clean tiling.
// Each rect aligns to a content cell slot (or is purely decorative).
type Rect = readonly [x: number, y: number, w: number, h: number, fill: string];
type Tri = readonly [points: string, fill: string];

const DESKTOP_RECTS: readonly Rect[] = [
  // Band 1 — y 0-180
  [0, 0, 200, 180, PAPER],
  [200, 0, 280, 180, PAPER],
  [480, 0, 240, 180, PAPER], // year slot (gold triangle overlay below)
  [720, 0, 200, 180, PAPER],
  [920, 0, 220, 180, PAPER],
  [1140, 0, 160, 180, TEAL],
  [1300, 0, 140, 180, PAPER],

  // Band 2 — y 180-340
  [0, 180, 160, 160, TEAL],
  [160, 180, 160, 160, ORANGE],
  [320, 180, 220, 160, PAPER], // r2c
  [540, 180, 160, 160, PAPER], // r2d
  [700, 180, 180, 160, PAPER],
  [880, 180, 160, 160, TEAL], // r2f
  [1040, 180, 200, 160, GOLD], // r2g
  [1240, 180, 200, 160, ORANGE],

  // Band 3 (hero) — y 340-560
  [0, 340, 200, 220, ORANGE],
  [200, 340, 280, 220, PAPER], // r3a
  [480, 340, 480, 220, PAPER], // hero
  [960, 340, 260, 220, PAPER], // r3b
  [1220, 340, 220, 220, TEAL],

  // Band 4 — y 560-740
  [0, 560, 220, 180, PAPER],
  [220, 560, 260, 180, PAPER], // r4b
  [480, 560, 480, 180, PAPER], // r4c
  [960, 560, 260, 180, PAPER], // r4d
  [1220, 560, 220, 180, GOLD],

  // Band 5 (footer) — y 740-900
  [0, 740, 360, 160, PAPER], // r5a
  [360, 740, 360, 160, PAPER], // r5b
  [720, 740, 360, 160, TEAL], // r5c
  [1080, 740, 360, 160, PAPER], // r5d
];

// Decorative triangles layered over tiles for Mondrian asymmetry.
const DESKTOP_TRIS: readonly Tri[] = [
  // Top-left orange wedge
  ["0,0 100,0 0,180", ORANGE],
  // Year split: gold triangle top-right of year tile (480-720, 0-180)
  ["480,0 720,0 720,180", GOLD],
  // Top-right orange corner
  ["1300,180 1440,180 1440,0", ORANGE],
  // Band 2 accent: gold wedge in orange tile (160-320, 180-340)
  ["160,180 320,340 160,340", GOLD],
  // Band 2 right accent: teal wedge in orange tile
  ["1240,180 1440,340 1240,340", TEAL],
  // Band 3 right: orange wedge in teal corner
  ["1220,340 1440,560 1220,560", ORANGE],
  // Band 4 right: orange wedge in gold corner
  ["1220,560 1440,740 1220,740", ORANGE],
];

function MosaicBackgroundDesktop({
  className,
  strokeOnly,
  "aria-hidden": ariaHidden,
}: Omit<Props, "variant">) {
  const f = (color: string) => (strokeOnly ? "none" : color);
  const sw = strokeOnly ? 6 : 5;
  return (
    <svg
      aria-hidden={ariaHidden}
      className={className}
      preserveAspectRatio="none"
      viewBox="0 0 1440 900"
    >
      <title>Mosaic background</title>
      {!strokeOnly && <rect fill={PAPER} height="900" width="1440" />}

      {DESKTOP_RECTS.map(([x, y, w, h, fill]) => (
        <rect
          fill={f(fill)}
          height={h}
          key={`r-${x}-${y}-${w}-${h}`}
          stroke={INK}
          strokeLinejoin="miter"
          strokeWidth={sw}
          width={w}
          x={x}
          y={y}
        />
      ))}

      {DESKTOP_TRIS.map(([points, fill]) => (
        <polygon
          fill={f(fill)}
          key={`t-${points}`}
          points={points}
          stroke={INK}
          strokeLinejoin="miter"
          strokeWidth={sw}
        />
      ))}
    </svg>
  );
}

const COMPACT_TILES: readonly Rect[] = [
  [0, 0, 1440, 280, PAPER],
  [0, 280, 480, 200, ORANGE],
  [480, 280, 480, 200, GOLD],
  [960, 280, 480, 200, PAPER],
  [0, 480, 480, 160, TEAL],
  [480, 480, 480, 160, PAPER],
  [960, 480, 480, 160, PAPER],
  [0, 640, 480, 100, PAPER],
  [480, 640, 480, 100, ORANGE],
  [960, 640, 480, 100, TEAL],
  [0, 740, 720, 160, PAPER],
  [720, 740, 720, 160, PAPER],
];

function MosaicBackgroundCompact({
  className,
  strokeOnly,
  "aria-hidden": ariaHidden,
}: Omit<Props, "variant">) {
  const f = (color: string) => (strokeOnly ? "none" : color);
  const sw = strokeOnly ? 5 : 4;
  return (
    <svg
      aria-hidden={ariaHidden}
      className={className}
      preserveAspectRatio="none"
      viewBox="0 0 1440 900"
    >
      <title>Mosaic background</title>
      {!strokeOnly && <rect fill={PAPER} height="900" width="1440" />}
      {COMPACT_TILES.map(([x, y, w, h, fill]) => (
        <rect
          fill={f(fill)}
          height={h}
          key={`${x}-${y}-${w}-${h}-${fill}`}
          stroke={INK}
          strokeWidth={sw}
          width={w}
          x={x}
          y={y}
        />
      ))}
    </svg>
  );
}
