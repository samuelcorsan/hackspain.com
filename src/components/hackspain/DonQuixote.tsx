type Props = { className?: string };

export function DonQuixote({ className = "" }: Props) {
  return (
    <svg className={className} viewBox="0 0 180 220" aria-hidden>
      <polygon
        points="20,200 60,40 100,30 140,50 160,200"
        fill="var(--color-hs-slate)"
        stroke="var(--color-hs-ink)"
        strokeWidth="3"
      />
      <polygon
        points="60,40 100,20 130,45 95,55"
        fill="var(--color-hs-cream)"
        stroke="var(--color-hs-ink)"
        strokeWidth="2.5"
      />
      <polygon points="95,55 130,45 125,75 88,70" fill="var(--color-hs-brown)" stroke="var(--color-hs-ink)" strokeWidth="2" />
      <path
        d="M88 70 Q70 95 55 120 Q48 150 40 200"
        fill="none"
        stroke="var(--color-hs-ink)"
        strokeWidth="3"
      />
      <line x1="125" y1="60" x2="175" y2="10" stroke="var(--color-hs-ink)" strokeWidth="4" strokeLinecap="square" />
      <polygon points="172,8 182,12 178,18" fill="var(--color-hs-gold)" stroke="var(--color-hs-ink)" strokeWidth="2" />
    </svg>
  );
}
