import type { APIRoute } from "astro";
import { getAllSitemapPageUrls, SITEMAP_SITE_ORIGIN } from "../data/sitemapPages";
import { buildSitemapUrlsetXml } from "../lib/sitemapUrlsetXml";

export const prerender = true;

export const GET: APIRoute = ({ site }) => {
  const origin = site?.origin ?? SITEMAP_SITE_ORIGIN;
  const xml = buildSitemapUrlsetXml(getAllSitemapPageUrls(), origin, {
    defaultLocale: "en",
    locales: { en: "en", es: "es" },
  });
  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
};
