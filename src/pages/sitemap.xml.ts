import type { APIRoute } from "astro";

/** Avoid `[locale]/index` treating `sitemap.xml` as a locale and serving HTML; sitemap integration only writes `sitemap-index.xml`. */
export const prerender = false;

export const GET: APIRoute = ({ site }) => {
  const origin = site ?? new URL("https://hackspain.com");
  return Response.redirect(new URL("/sitemap-index.xml", origin), 301);
};
