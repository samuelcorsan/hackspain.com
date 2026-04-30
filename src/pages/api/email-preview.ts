import type { APIRoute } from "astro";
import { renderSignupConfirmationHtml } from "../../lib/signupConfirmationEmail";

export const prerender = false;

export const GET: APIRoute = async ({ url }) => {
  const fullName = (url.searchParams.get("name") ?? "Leo Hackspain").slice(0, 64);
  const wantsAmbassador =
    url.searchParams.get("ambassador") === "1" ||
    url.searchParams.get("ambassador") === "true";

  const { html } = await renderSignupConfirmationHtml({
    fullName,
    wantsAmbassador,
  });

  return new Response(html, {
    status: 200,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Robots-Tag": "noindex, nofollow",
      "Content-Security-Policy": "frame-ancestors 'self'",
    },
  });
};
