/** Explicit URLs for @astrojs/sitemap — server builds can yield empty/incomplete `pages`, and section routes omit `/en/...` & `/es/...`. */
const SITE = "https://hackspain.com";
const SECTIONS = ["mission", "unique", "tracks", "sponsors", "vision"];

export function getSitemapCustomPages() {
  const urls = [
    SITE,
    `${SITE}/en`,
    `${SITE}/es`,
    ...SECTIONS.flatMap((s) => [`${SITE}/${s}`, `${SITE}/en/${s}`, `${SITE}/es/${s}`]),
    `${SITE}/signup`,
    `${SITE}/es/signup`,
    `${SITE}/ambassador`,
    `${SITE}/es/ambassador`,
    `${SITE}/privacy`,
    `${SITE}/es/privacy`,
  ];
  return urls;
}
