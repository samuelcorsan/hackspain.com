import { defineMiddleware } from "astro:middleware";
import { SECTION_SLUGS } from "./data/sectionRoutes";
import llmsBody from "./data/llms.txt?raw";

type SectionSlug = (typeof SECTION_SLUGS)[number];

function stripTrailingSlash(pathname: string): string {
  if (pathname.length <= 1) return pathname || "/";
  const s = pathname.replace(/\/$/, "");
  return s === "" ? "/" : s;
}

function isLandingDocumentPath(pathname: string): boolean {
  const p = stripTrailingSlash(pathname);
  if (p === "/") return true;
  const parts = p.slice(1).split("/").filter(Boolean);
  if (parts.length === 0) return true;
  const [a, b] = parts;
  if (a === "en" || a === "es") {
    if (parts.length === 1) return true;
    if (parts.length === 2) return SECTION_SLUGS.includes(b as SectionSlug);
    return false;
  }
  if (parts.length === 1) return SECTION_SLUGS.includes(a as SectionSlug);
  return false;
}

function clientAcceptsHtml(accept: string | null): boolean {
  if (accept == null || accept === "") return true;
  const lower = accept.toLowerCase();
  return lower.includes("text/html") || lower.includes("application/xhtml+xml");
}

const LLMS_HEADERS = {
  "Content-Type": "text/markdown; charset=utf-8",
  "Cache-Control": "public, max-age=3600",
} as const;

export const onRequest = defineMiddleware((context, next) => {
  const { request } = context;
  const method = request.method;
  if (method !== "GET" && method !== "HEAD") return next();

  const path = new URL(request.url).pathname;
  if (!isLandingDocumentPath(path)) return next();
  if (clientAcceptsHtml(request.headers.get("accept"))) return next();

  // Same URL as the browser page: 200 + markdown body inline (no redirect to /llms.txt).
  if (method === "HEAD") {
    return new Response(null, { headers: LLMS_HEADERS });
  }
  return new Response(llmsBody, { headers: LLMS_HEADERS });
});
