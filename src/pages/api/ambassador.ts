import type { APIRoute } from "astro";
import { checkBotId } from "botid/server";
import { getDb } from "../../db";
import { ambassadorApplications } from "../../db/schema";
import { notifyDiscordAmbassadorApplication } from "../../lib/discordAmbassadorWebhook";
import { parseAmbassadorBody } from "../../lib/ambassadorValidation";

export const prerender = false;

function emptyToNull(s: string): string | null {
  return s.length === 0 ? null : s;
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const verification = await checkBotId();
    if (verification.isBot) {
      return Response.json({ error: "Access denied" }, { status: 403 });
    }
  } catch (e) {
    console.error("BotID check failed:", e);
  }

  if (request.headers.get("content-type")?.split(";")[0]?.trim() !== "application/json") {
    return Response.json({ error: "Expected application/json" }, { status: 415 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!body || typeof body !== "object") {
    return Response.json({ error: "Invalid body" }, { status: 400 });
  }

  const parsed = parseAmbassadorBody(body);
  if (!parsed.ok) {
    return Response.json({ error: parsed.error }, { status: parsed.status });
  }

  const {
    fullName,
    email,
    institution,
    cityRegion,
    xUrl,
    linkedinUrl,
    githubUrl,
    webUrl,
    motivation,
    outreachPlan,
  } = parsed.data;

  try {
    const db = getDb();

    try {
      await db.insert(ambassadorApplications).values({
        fullName,
        email,
        institution,
        cityRegion,
        xUrl: emptyToNull(xUrl),
        linkedinUrl: emptyToNull(linkedinUrl),
        githubUrl: emptyToNull(githubUrl),
        webUrl: emptyToNull(webUrl),
        motivation,
        outreachPlan,
      });
    } catch (e: unknown) {
      if (
        e != null &&
        typeof e === "object" &&
        "code" in e &&
        (e as { code: unknown }).code === "23505"
      ) {
        return Response.json({ error: "This email is already registered" }, { status: 409 });
      }
      throw e;
    }

    notifyDiscordAmbassadorApplication({
      fullName,
      email,
      institution,
      cityRegion,
      xUrl,
      linkedinUrl,
      githubUrl,
      webUrl,
      motivation,
      outreachPlan,
    }).catch((e) => console.error("Discord notify failed:", e));

    return Response.json({ ok: true });
  } catch (e) {
    console.error(e);
    return Response.json({ error: "Could not save application" }, { status: 500 });
  }
};
