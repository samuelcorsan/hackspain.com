const LOGO_VIEW = 'viewBox="4 86 242 72" preserveAspectRatio="xMidYMid meet"';

export function prepareLogoSvg(raw: string): string {
  let out = raw
    .replace(/<!--[\s\S]*?-->\s*/g, "")
    .replace(/\r\n/g, "\n")
    .replace(/width="250"\s*height="250"\s*viewBox="0 0 250 250"/, LOGO_VIEW);

  // Make the strokes thicker to match the poster style
  out = out.replace(/stroke-width="[^"]*"/g, 'stroke-width="2.5"');

  out = out.replace(
    /<svg\b/,
    '<svg role="img" aria-label="HACKSPAIN" focusable="false" width="100%" height="100%"',
  );

  return out;
}
