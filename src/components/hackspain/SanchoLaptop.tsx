type Props = { className?: string };

export function SanchoLaptop({ className = "" }: Props) {
  return (
    <svg className={className} viewBox="0 0 200 180" aria-hidden>
      <polygon
        points="22,58 118,52 108,28 32,34"
        fill="#2a6b52"
        stroke="var(--color-hs-ink)"
        strokeWidth="2.5"
      />
      <ellipse cx="70" cy="55" rx="48" ry="22" fill="var(--color-hs-cream)" stroke="var(--color-hs-ink)" strokeWidth="3" />
      <polygon points="40,60 55,95 95,100 110,65" fill="var(--color-hs-slate)" stroke="var(--color-hs-ink)" strokeWidth="2.5" />
      <rect x="95" y="70" width="95" height="62" rx="4" fill="#f4f1e6" stroke="var(--color-hs-ink)" strokeWidth="3" />
      <rect x="102" y="77" width="81" height="44" fill="#0a0a0a" stroke="var(--color-hs-ink)" strokeWidth="2" />
      <text x="108" y="104" fill="#f5f5f5" fontFamily="ui-monospace, monospace" fontSize="14" fontWeight="700">
        &gt; _
      </text>
      <polygon points="88,132 188,138 180,155 78,148" fill="var(--color-hs-gold)" stroke="var(--color-hs-ink)" strokeWidth="2.5" />
      <polygon points="78,148 180,155 175,168 72,160" fill="var(--color-hs-orange)" stroke="var(--color-hs-ink)" strokeWidth="2.5" />
    </svg>
  );
}
