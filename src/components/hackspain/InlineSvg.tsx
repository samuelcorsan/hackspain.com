type Props = {
  svg: string;
  className?: string;
  decorative?: boolean;
  label?: string;
};

export function InlineSvg({ svg, className = "", decorative = false, label }: Props) {
  const a11y =
    label != null
      ? { role: "img" as const, "aria-label": label }
      : decorative
        ? { "aria-hidden": true as const }
        : {};
  return (
    <span
      className={`inline-flex max-w-full [&>svg]:block [&>svg]:h-full [&>svg]:w-full [&>svg]:max-w-full ${className}`}
      dangerouslySetInnerHTML={{ __html: svg }}
      {...a11y}
    />
  );
}
