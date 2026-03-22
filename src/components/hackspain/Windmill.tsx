type Props = { className?: string };

function CircuitBlade({ transform }: { transform: string }) {
  return (
    <g transform={transform}>
      <rect x="-8" y="-120" width="16" height="120" fill="var(--color-hs-cream)" stroke="var(--color-hs-ink)" strokeWidth="2.5" />
      <path
        d="M-6 -110 H6 M-6 -90 H6 M-6 -70 H6 M-6 -50 H6"
        stroke="var(--color-hs-ink)"
        strokeWidth="1.5"
      />
      <circle cx="-4" cy="-100" r="3" fill="var(--color-hs-gold)" stroke="var(--color-hs-ink)" strokeWidth="1" />
      <circle cx="4" cy="-80" r="3" fill="var(--color-hs-orange)" stroke="var(--color-hs-ink)" strokeWidth="1" />
      <circle cx="-4" cy="-60" r="3" fill="var(--color-hs-red)" stroke="var(--color-hs-ink)" strokeWidth="1" />
      <path d="M0 -120 L0 -140" stroke="var(--color-hs-ink)" strokeWidth="2" />
    </g>
  );
}

export function Windmill({ className = "" }: Props) {
  return (
    <svg className={className} viewBox="0 0 200 240" aria-hidden>
      <polygon
        points="70,230 100,80 130,230"
        fill="var(--color-hs-brown)"
        stroke="var(--color-hs-ink)"
        strokeWidth="3"
      />
      <polygon
        points="100,80 40,200 100,170 160,200"
        fill="var(--color-hs-cream)"
        stroke="var(--color-hs-ink)"
        strokeWidth="3"
      />
      <g transform="translate(100,88)">
        <CircuitBlade transform="rotate(0)" />
        <CircuitBlade transform="rotate(90)" />
        <CircuitBlade transform="rotate(180)" />
        <CircuitBlade transform="rotate(270)" />
        <circle r="14" fill="var(--color-hs-gold)" stroke="var(--color-hs-ink)" strokeWidth="3" />
      </g>
    </svg>
  );
}
