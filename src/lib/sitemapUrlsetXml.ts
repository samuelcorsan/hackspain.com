type I18nOpts = {
  defaultLocale: string;
  locales: Record<string, string>;
};

function parseI18nUrl(
  url: string,
  defaultLocale: string,
  locales: Record<string, string>,
  base: string,
): { locale: string; path: string } | undefined {
  if (!url.startsWith(base)) return undefined;
  let s = url.slice(base.length);
  if (!s || s === "/") return { locale: defaultLocale, path: "/" };
  if (s[0] !== "/") s = `/${s}`;
  const locale = s.split("/")[1]!;
  if (locale in locales) {
    let path = s.slice(1 + locale.length);
    if (!path) path = "/";
    return { locale, path };
  }
  return { locale: defaultLocale, path: s };
}

function createGetI18nLinks(
  urls: string[],
  defaultLocale: string,
  locales: Record<string, string>,
  base: string,
): ((urlIndex: number) => { url: string; lang: string }[] | undefined) | undefined {
  const parsedI18nUrls = urls.map((u) => parseI18nUrl(u, defaultLocale, locales, base));
  const i18nPathToLinksCache = new Map<string, { url: string; lang: string }[]>();
  return (urlIndex: number) => {
    const i18nUrl = parsedI18nUrls[urlIndex];
    if (!i18nUrl) return undefined;
    const cached = i18nPathToLinksCache.get(i18nUrl.path);
    if (cached) return cached;
    const links: { url: string; lang: string }[] = [];
    for (let i = 0; i < parsedI18nUrls.length; i++) {
      const parsed = parsedI18nUrls[i];
      if (parsed?.path === i18nUrl.path) {
        links.push({ url: urls[i]!, lang: locales[parsed.locale]! });
      }
    }
    if (links.length <= 1) return undefined;
    i18nPathToLinksCache.set(i18nUrl.path, links);
    return links;
  };
}

function esc(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

export function buildSitemapUrlsetXml(pageUrls: string[], siteOrigin: string, i18n: I18nOpts): string {
  const urls = [...pageUrls].sort((a, b) => a.localeCompare(b, "en", { numeric: true }));
  const getI18nLinks = createGetI18nLinks(urls, i18n.defaultLocale, i18n.locales, siteOrigin);
  const lines: string[] = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
  ];
  for (let i = 0; i < urls.length; i++) {
    const url = urls[i]!;
    const links = getI18nLinks?.(i);
    lines.push("  <url>");
    lines.push(`    <loc>${esc(url)}</loc>`);
    if (links) {
      for (const { url: alt, lang } of links) {
        lines.push(
          `    <xhtml:link rel="alternate" hreflang="${esc(lang)}" href="${esc(alt)}"/>`,
        );
      }
    }
    lines.push("  </url>");
  }
  lines.push("</urlset>");
  return `${lines.join("\n")}\n`;
}
