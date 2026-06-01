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
  // Band 1 (top row) — y 0-180 : 7 cells, narrow centered main cell
  [0, 0, 200, 180, PAPER],
  [200, 0, 190, 180, PAPER], // r1b
  [390, 0, 190, 180, PAPER],
  [580, 0, 280, 180, PAPER], // r1c (narrow centered main)
  [860, 0, 190, 180, PAPER],
  [1050, 0, 190, 180, PAPER], // r1d
  [1240, 0, 200, 180, ORANGE],

  // Band 2 (hero) — y 180-400
  [0, 180, 200, 220, PAPER],
  [200, 180, 280, 220, PAPER], // r3a
  [480, 180, 480, 220, PAPER], // hero
  [960, 180, 260, 220, PAPER], // r3b
  [1220, 180, 220, 220, TEAL],

  // Band 3 (content row) — y 400-650 : symmetric, centered main cell
  [0, 400, 220, 250, PAPER],
  [220, 400, 220, 250, PAPER], // r4b
  [440, 400, 560, 250, PAPER], // r4c (centered main)
  [1000, 400, 220, 250, PAPER], // r4d
  [1220, 400, 220, 250, GOLD],

  // Band 4 (open row) — y 650-830 : 5 equal cells (288 wide)
  [0, 650, 288, 180, PAPER], // o1
  [288, 650, 288, 180, PAPER], // o2
  [576, 650, 288, 180, PAPER], // o3
  [864, 650, 288, 180, PAPER], // o4
  [1152, 650, 288, 180, PAPER], // o5

  // Band 5 (footer) — y 830-900
  [0, 830, 360, 70, PAPER], // r5a
  [360, 830, 360, 70, PAPER], // r5b
  [720, 830, 360, 70, TEAL], // r5c
  [1080, 830, 360, 70, PAPER], // r5d
];

// Decorative triangles layered over tiles for Mondrian asymmetry.
const DESKTOP_TRIS: readonly Tri[] = [
  // Top-left orange diagonal (corner-to-corner, like the other corners)
  ["0,0 200,0 0,180", ORANGE],
  // Top-right teal wedge in orange corner tile
  ["1240,0 1440,180 1240,180", TEAL],
  // Hero band right: orange wedge in teal corner
  ["1220,180 1440,400 1220,400", ORANGE],
  // Band 3 right: orange wedge in gold corner
  ["1220,400 1440,650 1220,650", ORANGE],
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

// Portrait layout (1440 x 2560): hero, two big content cards, footer.
// Boundaries mirror CELLS_COMPACT so the ink stroke grid frames each card.
// Tiles are paper so empty slots stay clean; content cards paint their own bg.
const COMPACT_TILES: readonly Rect[] = [
  [0, 0, 1440, 720, PAPER],
  [0, 720, 1440, 680, PAPER],
  [0, 1400, 1440, 680, PAPER],
  [0, 2080, 1440, 480, PAPER],
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
      viewBox="0 0 1440 2560"
    >
      <title>Mosaic background</title>
      {!strokeOnly && <rect fill={PAPER} height="2560" width="1440" />}
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
