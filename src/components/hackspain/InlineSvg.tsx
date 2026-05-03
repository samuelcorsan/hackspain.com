interface Props {
  className?: string;
  decorative?: boolean;
  /** Stretch SVG to fill the box edge-to-edge (distorts if aspect ratio differs). */
  fill?: "none";
  label?: string;
  svg: string;
}

function svgWithPreserveRatio(svg: string, ratio: string): string {
  if (/preserveAspectRatio="/.test(svg)) {
    return svg.replace(
      /preserveAspectRatio="[^"]*"/,
      `preserveAspectRatio="${ratio}"`
    );
  }
  return svg.replace(/<svg\b/, `<svg preserveAspectRatio="${ratio}"`);
}

export function InlineSvg({
  svg,
  className = "",
  decorative = false,
  label,
  fill,
}: Props) {
  const a11y =
    label == null
      ? decorative
        ? { "aria-hidden": true as const }
        : {}
      : { role: "img" as const, "aria-label": label };
  const html = fill === "none" ? svgWithPreserveRatio(svg, "none") : svg;
  const base =
    fill === "none"
      ? "flex min-h-0 min-w-0 flex-1 [&>svg]:block [&>svg]:h-full [&>svg]:w-full [&>svg]:min-h-0 [&>svg]:min-w-0"
      : "inline-flex max-w-full [&>svg]:block [&>svg]:h-full [&>svg]:w-full [&>svg]:max-w-full";
  return (
    <span
      className={`${base} ${className}`.trim()}
      dangerouslySetInnerHTML={{ __html: html }}
      {...a11y}
    />
  );
}
