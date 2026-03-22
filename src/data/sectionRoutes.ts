import type { Locale } from "../i18n/locales";

export const SECTION_SLUGS = ["mission", "unique", "tracks", "sponsors", "vision"] as const;
export type SectionSlug = (typeof SECTION_SLUGS)[number];

export function pathFromSectionIndex(locale: Locale, index: number): string {
  const base = `/${locale}`;
  if (index <= 0) return base;
  const slug = SECTION_SLUGS[index - 1];
  return slug ? `${base}/${slug}` : base;
}

export function parsePath(pathname: string): { locale: Locale; sectionIndex: number } {
  const clean = (pathname.replace(/\/$/, "") || "/").slice(1);
  const parts = clean.split("/").filter(Boolean);
  if (parts.length === 0) return { locale: "en", sectionIndex: 0 };
  const loc = parts[0];
  if (loc !== "en" && loc !== "es") return { locale: "en", sectionIndex: 0 };
  const locale = loc as Locale;
  if (parts.length === 1) return { locale, sectionIndex: 0 };
  const slug = parts[1];
  const i = SECTION_SLUGS.indexOf(slug as SectionSlug);
  return { locale, sectionIndex: i >= 0 ? i + 1 : 0 };
}
