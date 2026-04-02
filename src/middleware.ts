import { defineMiddleware } from "astro:middleware";
import { SECTION_SLUGS } from "./data/sectionRoutes";
import llmsBody from "./data/llms.txt?raw";

type SectionSlug = (typeof SECTION_SLUGS)[number];

function stripTrailingSlash(pathname: string): string {
  if (pathname.length <= 1) return pathname || "/";
  const s = pathname.replace(/\/$/, "");
  return s === "" ? "/" : s;
}

function redirectIfLegacyLocalePath(pathname: string, baseUrl: string): Response | null {
  const p = stripTrailingSlash(pathname);
  const parts = p === "/" ? [] : p.slice(1).split("/").filter(Boolean);
  if (parts.length === 0) return null;
  const first = parts[0];
  if (first !== "en" && first !== "es") return null;
  const rest = parts.slice(1);
  const targetPath = rest.length === 0 ? "/" : `/${rest.join("/")}`;
  return Response.redirect(new URL(targetPath, baseUrl), 301);
}

function isLandingDocumentPath(pathname: string): boolean {
  const p = stripTrailingSlash(pathname);
  if (p === "/") return true;
  const parts = p.slice(1).split("/").filter(Boolean);
  if (parts.length === 0) return true;
  const [a] = parts;
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
  const path = new URL(request.url).pathname;
  const redirect = redirectIfLegacyLocalePath(path, request.url);
  if (redirect) return redirect;

  if (method !== "GET" && method !== "HEAD") return next();

  if (!isLandingDocumentPath(path)) return next();
  if (clientAcceptsHtml(request.headers.get("accept"))) return next();

  if (method === "HEAD") {
    return new Response(null, { headers: LLMS_HEADERS });
  }
  return new Response(llmsBody, { headers: LLMS_HEADERS });
});
