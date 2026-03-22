import type { Locale } from "../i18n/locales";

export const SECTION_SLUGS = ["mission", "unique", "tracks", "sponsors", "vision"] as const;
export type SectionSlug = (typeof SECTION_SLUGS)[number];

export type ParsedPath =
  | { mode: "prefixed"; locale: Locale; sectionIndex: number }
  | { mode: "root"; sectionIndex: number };

export function pathFromSectionIndex(locale: Locale, index: number): string {
  const base = `/${locale}`;
  if (index <= 0) return base;
  const slug = SECTION_SLUGS[index - 1];
  return slug ? `${base}/${slug}` : base;
}

export function pathRootFromSectionIndex(index: number): string {
  if (index <= 0) return "/";
  const slug = SECTION_SLUGS[index - 1];
  return slug ? `/${slug}` : "/";
}

export function parsePath(pathname: string): ParsedPath {
  const clean = (pathname.replace(/\/$/, "") || "/").slice(1);
  const parts = clean.split("/").filter(Boolean);
  if (parts.length === 0) return { mode: "root", sectionIndex: 0 };
  const first = parts[0]!;
  if (first === "en" || first === "es") {
    const loc = first as Locale;
    if (parts.length === 1) return { mode: "prefixed", locale: loc, sectionIndex: 0 };
    const slug = parts[1];
    const i = SECTION_SLUGS.indexOf(slug as SectionSlug);
    return { mode: "prefixed", locale: loc, sectionIndex: i >= 0 ? i + 1 : 0 };
  }
  const i = SECTION_SLUGS.indexOf(first as SectionSlug);
  if (i >= 0 && parts.length === 1) return { mode: "root", sectionIndex: i + 1 };
  return { mode: "root", sectionIndex: 0 };
}
