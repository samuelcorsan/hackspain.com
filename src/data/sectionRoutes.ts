export const SECTION_SLUGS = [
  "mission",
  "unique",
  "tracks",
  "sponsors",
  "vision",
] as const;
export type SectionSlug = (typeof SECTION_SLUGS)[number];

export function pathRootFromSectionIndex(index: number): string {
  if (index <= 0) {
    return "/";
  }
  const slug = SECTION_SLUGS[index - 1];
  return slug ? `/${slug}` : "/";
}

export function parsePath(pathname: string): { sectionIndex: number } {
  const clean = (pathname.replace(/\/$/, "") || "/").slice(1);
  const parts = clean.split("/").filter(Boolean);
  if (parts.length === 0) {
    return { sectionIndex: 0 };
  }
  const i = SECTION_SLUGS.indexOf(parts[0] as SectionSlug);
  if (i >= 0 && parts.length === 1) {
    return { sectionIndex: i + 1 };
  }
  return { sectionIndex: 0 };
}
