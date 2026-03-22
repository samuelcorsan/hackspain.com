type Props = { className?: string };

export function Sun({ className = "" }: Props) {
  return (
    <svg className={className} viewBox="0 0 140 140" aria-hidden>
      {Array.from({ length: 12 }).map((_, i) => (
        <polygon
          key={i}
          points="70,8 78,32 62,32"
          fill={i % 2 === 0 ? "var(--color-hs-gold)" : "var(--color-hs-red)"}
          stroke="var(--color-hs-ink)"
          strokeWidth="2"
          transform={`rotate(${i * 30} 70 70)`}
        />
      ))}
      <circle cx="70" cy="70" r="36" fill="var(--color-hs-gold)" stroke="var(--color-hs-ink)" strokeWidth="3" />
      <path d="M70 34 V106 M34 70 H106" stroke="var(--color-hs-ink)" strokeWidth="2.5" />
      <path
        d="M70 34 A36 36 0 0 1 106 70 L70 70 Z"
        fill="var(--color-hs-red)"
        stroke="var(--color-hs-ink)"
        strokeWidth="2"
      />
      <path
        d="M106 70 A36 36 0 0 1 70 106 L70 70 Z"
        fill="var(--color-hs-gold)"
        stroke="var(--color-hs-ink)"
        strokeWidth="2"
      />
    </svg>
  );
}
