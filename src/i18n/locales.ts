export const LOCALES = ["en", "es"] as const;
export type Locale = (typeof LOCALES)[number];

export function isLocale(s: string): s is Locale {
  return s === "en" || s === "es";
}

export function preferredLocale(acceptLanguage: string | null): Locale {
  if (!acceptLanguage || !acceptLanguage.trim()) return "en";
  const parts = acceptLanguage.split(",").map((p) => p.trim().split(";")[0]?.toLowerCase() ?? "");
  for (const p of parts) {
    if (p.startsWith("es")) return "es";
    if (p.startsWith("en")) return "en";
  }
  return "en";
}

export function localeFromNavigator(): Locale {
  if (typeof navigator === "undefined") return "en";
  const list = navigator.languages?.length ? navigator.languages : [navigator.language || "en"];
  for (const raw of list) {
    const tag = String(raw).toLowerCase();
    if (tag.startsWith("es")) return "es";
    if (tag.startsWith("en")) return "en";
  }
  return "en";
}
