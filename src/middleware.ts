import { defineMiddleware } from "astro:middleware";
import { SECTION_SLUGS } from "./data/sectionRoutes";
import { preferredLocale } from "./i18n/locales";

const slugSet = new Set<string>(SECTION_SLUGS);

function normalizePath(pathname: string) {
  if (pathname.length > 1 && pathname.endsWith("/")) return pathname.slice(0, -1);
  return pathname || "/";
}

export const onRequest = defineMiddleware((context, next) => {
  const path = normalizePath(context.url.pathname);
  if (path === "/" || path === "") {
    const loc = preferredLocale(context.request.headers.get("accept-language"));
    return Response.redirect(new URL(`/${loc}`, context.url), 302);
  }
  const parts = path.slice(1).split("/").filter(Boolean);
  if (parts.length === 1 && slugSet.has(parts[0]!)) {
    const loc = preferredLocale(context.request.headers.get("accept-language"));
    return Response.redirect(new URL(`/${loc}/${parts[0]}`, context.url), 302);
  }
  return next();
});
