type Props = { className?: string };

export function Horse({ className = "" }: Props) {
  return (
    <svg className={className} viewBox="0 0 220 160" aria-hidden>
      <polygon
        points="10,120 40,80 90,70 130,85 180,75 210,95 200,130 150,125 100,140 40,130"
        fill="var(--color-hs-cream)"
        stroke="var(--color-hs-ink)"
        strokeWidth="3"
      />
      <polygon points="40,80 55,35 85,50 90,70" fill="var(--color-hs-brown)" stroke="var(--color-hs-ink)" strokeWidth="2.5" />
      <polygon points="130,85 150,40 175,55 180,75" fill="var(--color-hs-orange)" stroke="var(--color-hs-ink)" strokeWidth="2.5" />
      <polygon points="10,120 25,145 40,130" fill="var(--color-hs-red)" stroke="var(--color-hs-ink)" strokeWidth="2" />
      <polygon points="100,140 115,155 130,145" fill="var(--color-hs-red)" stroke="var(--color-hs-ink)" strokeWidth="2" />
      <polygon points="200,130 215,145 205,125" fill="var(--color-hs-red)" stroke="var(--color-hs-ink)" strokeWidth="2" />
    </svg>
  );
}
