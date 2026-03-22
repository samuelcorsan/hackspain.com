import type { LayoutProfile } from "./artboard";

type Props = {
  className?: string;
  strokeOnly?: boolean;
  "aria-hidden"?: boolean;
  variant?: LayoutProfile;
};

export function MosaicBackground({
  className = "",
  strokeOnly = false,
  "aria-hidden": ariaHidden = true,
  variant = "desktop",
}: Props) {
  if (variant === "compact") {
    return (
      <MosaicBackgroundCompact className={className} strokeOnly={strokeOnly} aria-hidden={ariaHidden} />
    );
  }
  return (
    <MosaicBackgroundDesktop className={className} strokeOnly={strokeOnly} aria-hidden={ariaHidden} />
  );
}

function MosaicBackgroundDesktop({
  className,
  strokeOnly,
  "aria-hidden": ariaHidden,
}: Omit<Props, "variant">) {
  const f = (color: string) => (strokeOnly ? "none" : color);
  const sw = strokeOnly ? 6 : 5;
  return (
    <svg
      className={className}
      viewBox="0 0 1440 900"
      preserveAspectRatio="none"
      aria-hidden={ariaHidden}
    >
      {!strokeOnly && <rect width="1440" height="900" fill="var(--color-hs-paper)" />}

      <polygon points="0,0 200,0 200,180 0,180" fill={f("var(--color-hs-paper)")} stroke="var(--color-hs-ink)" strokeWidth={sw} strokeLinejoin="miter" />
      <polygon points="0,0 100,180 0,180" fill={f("var(--color-hs-orange)")} stroke="var(--color-hs-ink)" strokeWidth={sw} strokeLinejoin="miter" />
      <polygon points="200,0 480,0 480,120 200,120" fill={f("var(--color-hs-paper)")} stroke="var(--color-hs-ink)" strokeWidth={sw} strokeLinejoin="miter" />
      <polygon points="200,0 340,120 200,120" fill={f("var(--color-hs-gold)")} stroke="var(--color-hs-ink)" strokeWidth={sw} strokeLinejoin="miter" />

      <polygon points="480,0 700,0 700,180 480,180" fill={f("var(--color-hs-paper)")} stroke="var(--color-hs-ink)" strokeWidth={sw} strokeLinejoin="miter" />
      <polygon points="480,0 700,0 700,180" fill={f("var(--color-hs-gold)")} stroke="var(--color-hs-ink)" strokeWidth={sw} strokeLinejoin="miter" />

      <polygon points="700,0 880,0 880,140 700,140" fill={f("var(--color-hs-paper)")} stroke="var(--color-hs-ink)" strokeWidth={sw} strokeLinejoin="miter" />
      <polygon points="880,0 1140,0 1140,180 880,180" fill={f("var(--color-hs-paper)")} stroke="var(--color-hs-ink)" strokeWidth={sw} strokeLinejoin="miter" />
      <polygon points="1140,0 1300,0 1300,120 1140,120" fill={f("var(--color-hs-teal)")} stroke="var(--color-hs-ink)" strokeWidth={sw} strokeLinejoin="miter" />
      <polygon points="1300,0 1440,0 1440,180 1300,180" fill={f("var(--color-hs-paper)")} stroke="var(--color-hs-ink)" strokeWidth={sw} strokeLinejoin="miter" />
      <polygon points="1300,0 1440,180 1300,180" fill={f("var(--color-hs-orange)")} stroke="var(--color-hs-ink)" strokeWidth={sw} strokeLinejoin="miter" />

      <polygon points="0,180 160,180 160,340 0,340" fill={f("var(--color-hs-teal)")} stroke="var(--color-hs-ink)" strokeWidth={sw} strokeLinejoin="miter" />
      <polygon points="160,120 300,120 300,340 160,340" fill={f("var(--color-hs-orange)")} stroke="var(--color-hs-ink)" strokeWidth={sw} strokeLinejoin="miter" />
      <polygon points="160,120 300,340 160,340" fill={f("var(--color-hs-gold)")} stroke="var(--color-hs-ink)" strokeWidth={sw} strokeLinejoin="miter" />
      <polygon points="300,120 480,120 480,180 300,180" fill={f("var(--color-hs-gold)")} stroke="var(--color-hs-ink)" strokeWidth={sw} strokeLinejoin="miter" />

      <polygon points="300,180 540,180 540,340 300,340" fill={f("var(--color-hs-paper)")} stroke="var(--color-hs-ink)" strokeWidth={sw} strokeLinejoin="miter" />
      <polygon points="540,180 700,180 700,340 540,340" fill={f("var(--color-hs-paper)")} stroke="var(--color-hs-ink)" strokeWidth={sw} strokeLinejoin="miter" />
      <polygon points="700,140 880,140 880,340 700,340" fill={f("var(--color-hs-paper)")} stroke="var(--color-hs-ink)" strokeWidth={sw} strokeLinejoin="miter" />
      <polygon points="700,140 880,340 700,340" fill={f("var(--color-hs-gold)")} stroke="var(--color-hs-ink)" strokeWidth={sw} strokeLinejoin="miter" />

      <polygon points="880,180 1040,180 1040,340 880,340" fill={f("var(--color-hs-teal)")} stroke="var(--color-hs-ink)" strokeWidth={sw} strokeLinejoin="miter" />
      <polygon points="1040,120 1220,120 1220,340 1040,340" fill={f("var(--color-hs-gold)")} stroke="var(--color-hs-ink)" strokeWidth={sw} strokeLinejoin="miter" />
      <polygon points="1220,180 1440,180 1440,340 1220,340" fill={f("var(--color-hs-orange)")} stroke="var(--color-hs-ink)" strokeWidth={sw} strokeLinejoin="miter" />
      <polygon points="1220,180 1440,340 1220,340" fill={f("var(--color-hs-teal)")} stroke="var(--color-hs-ink)" strokeWidth={sw} strokeLinejoin="miter" />

      <polygon points="0,340 200,340 200,560 0,560" fill={f("var(--color-hs-orange)")} stroke="var(--color-hs-ink)" strokeWidth={sw} strokeLinejoin="miter" />
      <polygon points="200,340 480,340 480,540 200,540" fill={f("var(--color-hs-paper)")} stroke="var(--color-hs-ink)" strokeWidth={sw} strokeLinejoin="miter" />
      <polygon points="480,340 960,340 960,560 480,560" fill={f("var(--color-hs-paper)")} stroke="var(--color-hs-ink)" strokeWidth={sw} strokeLinejoin="miter" />
      <polygon points="960,340 1220,340 1220,540 960,540" fill={f("var(--color-hs-paper)")} stroke="var(--color-hs-ink)" strokeWidth={sw} strokeLinejoin="miter" />
      <polygon points="1220,340 1440,340 1440,560 1220,560" fill={f("var(--color-hs-teal)")} stroke="var(--color-hs-ink)" strokeWidth={sw} strokeLinejoin="miter" />

      <polygon points="0,560 220,560 220,740 0,740" fill={f("var(--color-hs-paper)")} stroke="var(--color-hs-ink)" strokeWidth={sw} strokeLinejoin="miter" />
      <polygon points="220,540 480,540 480,740 220,740" fill={f("var(--color-hs-paper)")} stroke="var(--color-hs-ink)" strokeWidth={sw} strokeLinejoin="miter" />
      <polygon points="220,540 480,740 220,740" fill={f("var(--color-hs-orange)")} stroke="var(--color-hs-ink)" strokeWidth={sw} strokeLinejoin="miter" />
      <polygon points="480,560 960,560 960,740 480,740" fill={f("var(--color-hs-paper)")} stroke="var(--color-hs-ink)" strokeWidth={sw} strokeLinejoin="miter" />
      <polygon points="960,540 1200,540 1200,740 960,740" fill={f("var(--color-hs-paper)")} stroke="var(--color-hs-ink)" strokeWidth={sw} strokeLinejoin="miter" />
      <polygon points="1200,560 1440,560 1440,740 1200,740" fill={f("var(--color-hs-gold)")} stroke="var(--color-hs-ink)" strokeWidth={sw} strokeLinejoin="miter" />
      <polygon points="1200,560 1440,740 1200,740" fill={f("var(--color-hs-orange)")} stroke="var(--color-hs-ink)" strokeWidth={sw} strokeLinejoin="miter" />

      <polygon points="0,740 360,740 360,900 0,900" fill={f("var(--color-hs-paper)")} stroke="var(--color-hs-ink)" strokeWidth={sw} strokeLinejoin="miter" />
      <polygon points="360,740 720,740 720,900 360,900" fill={f("var(--color-hs-paper)")} stroke="var(--color-hs-ink)" strokeWidth={sw} strokeLinejoin="miter" />
      <polygon points="720,740 1080,740 1080,900 720,900" fill={f("var(--color-hs-teal)")} stroke="var(--color-hs-ink)" strokeWidth={sw} strokeLinejoin="miter" />
      <polygon points="1080,740 1440,740 1440,900 1080,900" fill={f("var(--color-hs-paper)")} stroke="var(--color-hs-ink)" strokeWidth={sw} strokeLinejoin="miter" />
    </svg>
  );
}

const COMPACT_TILES: readonly (readonly [number, number, number, number, string])[] = [
  // Row 0: hero (full width)
  [0, 0, 1440, 280, "var(--color-hs-paper)"],
  // Row 1: 3 content tiles
  [0, 280, 480, 200, "var(--color-hs-orange)"],
  [480, 280, 480, 200, "var(--color-hs-gold)"],
  [960, 280, 480, 200, "var(--color-hs-paper)"],
  // Row 2: 3 secondary tiles
  [0, 480, 480, 160, "var(--color-hs-teal)"],
  [480, 480, 480, 160, "var(--color-hs-paper)"],
  [960, 480, 480, 160, "var(--color-hs-paper)"],
  // Row 3: tertiary
  [0, 640, 480, 100, "var(--color-hs-paper)"],
  [480, 640, 480, 100, "var(--color-hs-orange)"],
  [960, 640, 480, 100, "var(--color-hs-teal)"],
  // Row 4: footer — 2 half-width cells
  [0, 740, 720, 160, "var(--color-hs-paper)"],
  [720, 740, 720, 160, "var(--color-hs-paper)"],
];

function MosaicBackgroundCompact({
  className,
  strokeOnly,
  "aria-hidden": ariaHidden,
}: Omit<Props, "variant">) {
  const f = (color: string) => (strokeOnly ? "none" : color);
  const sw = strokeOnly ? 5 : 4;
  const ink = "var(--color-hs-ink)";
  return (
    <svg
      className={className}
      viewBox="0 0 1440 900"
      preserveAspectRatio="none"
      aria-hidden={ariaHidden}
    >
      {!strokeOnly && (
        <rect width="1440" height="900" fill="var(--color-hs-paper)" />
      )}
      {COMPACT_TILES.map(([x, y, w, h, fill], i) => (
        <rect
          key={i}
          x={x}
          y={y}
          width={w}
          height={h}
          fill={f(fill)}
          stroke={ink}
          strokeWidth={sw}
        />
      ))}
    </svg>
  );
}
