const SECTIONS = ["mission", "unique", "tracks", "sponsors", "vision"] as const;

export const SITEMAP_SITE_ORIGIN = "https://hackspain.com";

export function normalizeSitemapPageUrl(href: string): string {
  const u = new URL(href);
  if (u.pathname === "/" || u.pathname === "") return u.origin;
  return `${u.origin}${u.pathname.replace(/\/+$/, "")}`;
}

/** Every indexable HTML URL (full origin URLs). */
export function getAllSitemapPageUrls(): string[] {
  const o = SITEMAP_SITE_ORIGIN;
  const raw = [
    o,
    `${o}/en`,
    `${o}/es`,
    ...SECTIONS.flatMap((s) => [`${o}/${s}`, `${o}/en/${s}`, `${o}/es/${s}`]),
    `${o}/signup`,
    `${o}/es/signup`,
    `${o}/ambassador`,
    `${o}/es/ambassador`,
    `${o}/privacy`,
    `${o}/es/privacy`,
  ];
  return [...new Set(raw.map(normalizeSitemapPageUrl))];
}
