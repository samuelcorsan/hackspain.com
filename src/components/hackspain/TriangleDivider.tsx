type Props = { className?: string };

const colors = [
  "var(--color-hs-red)",
  "var(--color-hs-orange)",
  "var(--color-hs-gold)",
  "var(--color-hs-teal)",
  "var(--color-hs-navy)",
  "var(--color-hs-paper)",
];

export function TriangleDivider({ className = "" }: Props) {
  return (
    <svg
      className={className}
      viewBox="0 0 360 24"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden
    >
      {colors.map((fill, i) => (
        <polygon
          key={i}
          points={`${i * 60 + 4},20 ${i * 60 + 30},4 ${i * 60 + 56},20`}
          fill={fill}
          stroke="var(--color-hs-ink)"
          strokeWidth="2"
          strokeLinejoin="miter"
        />
      ))}
    </svg>
  );
}
