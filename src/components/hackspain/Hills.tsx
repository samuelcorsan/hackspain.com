type Props = { className?: string };

export function Hills({ className = "" }: Props) {
  return (
    <svg
      className={className}
      viewBox="0 0 1440 360"
      preserveAspectRatio="none"
      aria-hidden
    >
      <path
        d="M0 180 Q 200 80 480 140 Q 720 200 960 120 Q 1200 50 1440 100 L 1440 360 L 0 360 Z"
        fill="var(--color-hs-navy)"
        stroke="var(--color-hs-ink)"
        strokeWidth="6"
      />
      <path
        d="M0 210 Q 240 130 520 180 Q 760 230 1000 160 Q 1240 100 1440 140 L 1440 360 L 0 360 Z"
        fill="var(--color-hs-slate)"
        stroke="var(--color-hs-ink)"
        strokeWidth="6"
      />
      <path
        d="M0 250 Q 280 180 560 230 Q 800 270 1040 210 Q 1280 160 1440 190 L 1440 360 L 0 360 Z"
        fill="var(--color-hs-red)"
        stroke="var(--color-hs-ink)"
        strokeWidth="6"
      />
      <path
        d="M0 290 Q 320 240 600 270 Q 840 300 1080 260 Q 1300 230 1440 250 L 1440 360 L 0 360 Z"
        fill="var(--color-hs-orange)"
        stroke="var(--color-hs-ink)"
        strokeWidth="6"
      />
      <path
        d="M0 325 Q 360 300 640 315 Q 880 330 1120 310 Q 1320 296 1440 305 L 1440 360 L 0 360 Z"
        fill="var(--color-hs-gold)"
        stroke="var(--color-hs-ink)"
        strokeWidth="6"
      />
    </svg>
  );
}
