type Props = { className?: string };

export function NetworkNodes({ className = "" }: Props) {
  return (
    <svg className={className} viewBox="0 0 200 120" aria-hidden>
      <path
        d="M10 90 L50 40 L100 70 L160 25"
        fill="none"
        stroke="var(--color-hs-ink)"
        strokeWidth="2.5"
      />
      <circle cx="10" cy="90" r="6" fill="var(--color-hs-gold)" stroke="var(--color-hs-ink)" strokeWidth="2" />
      <circle cx="50" cy="40" r="6" fill="var(--color-hs-orange)" stroke="var(--color-hs-ink)" strokeWidth="2" />
      <circle cx="100" cy="70" r="6" fill="var(--color-hs-red)" stroke="var(--color-hs-ink)" strokeWidth="2" />
      <circle cx="160" cy="25" r="6" fill="var(--color-hs-cream)" stroke="var(--color-hs-ink)" strokeWidth="2" />
      <path d="M40 100 L120 95" fill="none" stroke="var(--color-hs-ink)" strokeWidth="2" />
      <circle cx="40" cy="100" r="4" fill="var(--color-hs-slate)" stroke="var(--color-hs-ink)" strokeWidth="1.5" />
      <circle cx="120" cy="95" r="4" fill="var(--color-hs-gold)" stroke="var(--color-hs-ink)" strokeWidth="1.5" />
    </svg>
  );
}
