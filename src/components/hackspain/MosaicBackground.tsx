type Props = { className?: string; strokeOnly?: boolean; "aria-hidden"?: boolean };

export function MosaicBackground({ className = "", strokeOnly = false, "aria-hidden": ariaHidden = true }: Props) {
  const f = (color: string) => strokeOnly ? "none" : color;
  const sw = strokeOnly ? 6 : 5;
  return (
    <svg
      className={className}
      viewBox="0 0 1440 900"
      preserveAspectRatio="none"
      aria-hidden={ariaHidden}
    >
      {!strokeOnly && <rect width="1440" height="900" fill="var(--color-hs-paper)" />}

      {/* Top left */}
      <polygon points="0,0 200,0 200,180 0,180"     fill={f("var(--color-hs-paper)")}  stroke="var(--color-hs-ink)" strokeWidth={sw} strokeLinejoin="miter" />
      <polygon points="0,0 100,180 0,180"            fill={f("var(--color-hs-orange)")} stroke="var(--color-hs-ink)" strokeWidth={sw} strokeLinejoin="miter" />
      <polygon points="200,0 480,0 480,120 200,120"  fill={f("var(--color-hs-paper)")}  stroke="var(--color-hs-ink)" strokeWidth={sw} strokeLinejoin="miter" />
      <polygon points="200,0 340,120 200,120"        fill={f("var(--color-hs-gold)")}   stroke="var(--color-hs-ink)" strokeWidth={sw} strokeLinejoin="miter" />

      {/* Top center */}
      <polygon points="480,0 700,0 700,180 480,180"  fill={f("var(--color-hs-paper)")}  stroke="var(--color-hs-ink)" strokeWidth={sw} strokeLinejoin="miter" />
      <polygon points="480,0 700,180 480,180"        fill={f("var(--color-hs-gold)")}   stroke="var(--color-hs-ink)" strokeWidth={sw} strokeLinejoin="miter" />

      {/* Top right */}
      <polygon points="700,0 880,0 880,140 700,140"    fill={f("var(--color-hs-paper)")}  stroke="var(--color-hs-ink)" strokeWidth={sw} strokeLinejoin="miter" />
      <polygon points="880,0 1140,0 1140,180 880,180"  fill={f("var(--color-hs-paper)")}  stroke="var(--color-hs-ink)" strokeWidth={sw} strokeLinejoin="miter" />
      <polygon points="1140,0 1300,0 1300,120 1140,120" fill={f("var(--color-hs-teal)")}  stroke="var(--color-hs-ink)" strokeWidth={sw} strokeLinejoin="miter" />
      <polygon points="1300,0 1440,0 1440,180 1300,180" fill={f("var(--color-hs-paper)")} stroke="var(--color-hs-ink)" strokeWidth={sw} strokeLinejoin="miter" />
      <polygon points="1300,0 1440,180 1300,180"        fill={f("var(--color-hs-orange)")} stroke="var(--color-hs-ink)" strokeWidth={sw} strokeLinejoin="miter" />

      {/* Row 2 left */}
      <polygon points="0,180 160,180 160,340 0,340"     fill={f("var(--color-hs-teal)")}   stroke="var(--color-hs-ink)" strokeWidth={sw} strokeLinejoin="miter" />
      <polygon points="160,120 300,120 300,340 160,340"  fill={f("var(--color-hs-orange)")} stroke="var(--color-hs-ink)" strokeWidth={sw} strokeLinejoin="miter" />
      <polygon points="160,120 300,340 160,340"          fill={f("var(--color-hs-gold)")}   stroke="var(--color-hs-ink)" strokeWidth={sw} strokeLinejoin="miter" />

      {/* Row 2 center */}
      <polygon points="300,180 540,180 540,340 300,340"  fill={f("var(--color-hs-paper)")}  stroke="var(--color-hs-ink)" strokeWidth={sw} strokeLinejoin="miter" />
      <polygon points="540,180 700,180 700,340 540,340"  fill={f("var(--color-hs-paper)")}  stroke="var(--color-hs-ink)" strokeWidth={sw} strokeLinejoin="miter" />
      <polygon points="700,140 880,140 880,340 700,340"  fill={f("var(--color-hs-paper)")}  stroke="var(--color-hs-ink)" strokeWidth={sw} strokeLinejoin="miter" />
      <polygon points="700,140 880,340 700,340"          fill={f("var(--color-hs-gold)")}   stroke="var(--color-hs-ink)" strokeWidth={sw} strokeLinejoin="miter" />

      {/* Row 2 right */}
      <polygon points="880,180 1040,180 1040,340 880,340"   fill={f("var(--color-hs-teal)")}   stroke="var(--color-hs-ink)" strokeWidth={sw} strokeLinejoin="miter" />
      <polygon points="1040,120 1220,120 1220,340 1040,340" fill={f("var(--color-hs-gold)")}   stroke="var(--color-hs-ink)" strokeWidth={sw} strokeLinejoin="miter" />
      <polygon points="1220,180 1440,180 1440,340 1220,340" fill={f("var(--color-hs-orange)")} stroke="var(--color-hs-ink)" strokeWidth={sw} strokeLinejoin="miter" />
      <polygon points="1220,180 1440,340 1220,340"          fill={f("var(--color-hs-teal)")}   stroke="var(--color-hs-ink)" strokeWidth={sw} strokeLinejoin="miter" />

      {/* Row 3 */}
      <polygon points="0,340 200,340 200,560 0,560"        fill={f("var(--color-hs-orange)")} stroke="var(--color-hs-ink)" strokeWidth={sw} strokeLinejoin="miter" />
      <polygon points="200,340 480,340 480,540 200,540"    fill={f("var(--color-hs-paper)")}  stroke="var(--color-hs-ink)" strokeWidth={sw} strokeLinejoin="miter" />
      <polygon points="480,340 960,340 960,560 480,560"    fill={f("var(--color-hs-paper)")}  stroke="var(--color-hs-ink)" strokeWidth={sw} strokeLinejoin="miter" />
      <polygon points="960,340 1220,340 1220,540 960,540"  fill={f("var(--color-hs-paper)")}  stroke="var(--color-hs-ink)" strokeWidth={sw} strokeLinejoin="miter" />
      <polygon points="1220,340 1440,340 1440,560 1220,560" fill={f("var(--color-hs-teal)")}  stroke="var(--color-hs-ink)" strokeWidth={sw} strokeLinejoin="miter" />

      {/* Row 4 */}
      <polygon points="0,560 220,560 220,740 0,740"        fill={f("var(--color-hs-paper)")}  stroke="var(--color-hs-ink)" strokeWidth={sw} strokeLinejoin="miter" />
      <polygon points="220,540 480,540 480,740 220,740"    fill={f("var(--color-hs-paper)")}  stroke="var(--color-hs-ink)" strokeWidth={sw} strokeLinejoin="miter" />
      <polygon points="220,540 480,740 220,740"            fill={f("var(--color-hs-orange)")} stroke="var(--color-hs-ink)" strokeWidth={sw} strokeLinejoin="miter" />
      <polygon points="480,560 960,560 960,740 480,740"    fill={f("var(--color-hs-paper)")}  stroke="var(--color-hs-ink)" strokeWidth={sw} strokeLinejoin="miter" />
      <polygon points="960,540 1200,540 1200,740 960,740"  fill={f("var(--color-hs-paper)")}  stroke="var(--color-hs-ink)" strokeWidth={sw} strokeLinejoin="miter" />
      <polygon points="1200,560 1440,560 1440,740 1200,740" fill={f("var(--color-hs-gold)")}  stroke="var(--color-hs-ink)" strokeWidth={sw} strokeLinejoin="miter" />
      <polygon points="1200,560 1440,740 1200,740"          fill={f("var(--color-hs-orange)")} stroke="var(--color-hs-ink)" strokeWidth={sw} strokeLinejoin="miter" />

      {/* Row 5 */}
      <polygon points="0,740 360,740 360,900 0,900"        fill={f("var(--color-hs-paper)")} stroke="var(--color-hs-ink)" strokeWidth={sw} strokeLinejoin="miter" />
      <polygon points="360,740 720,740 720,900 360,900"    fill={f("var(--color-hs-paper)")} stroke="var(--color-hs-ink)" strokeWidth={sw} strokeLinejoin="miter" />
      <polygon points="720,740 1080,740 1080,900 720,900"  fill={f("var(--color-hs-teal)")}  stroke="var(--color-hs-ink)" strokeWidth={sw} strokeLinejoin="miter" />
      <polygon points="1080,740 1440,740 1440,900 1080,900" fill={f("var(--color-hs-paper)")} stroke="var(--color-hs-ink)" strokeWidth={sw} strokeLinejoin="miter" />
    </svg>
  );
}
