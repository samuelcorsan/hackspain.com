import type { APIRoute } from "astro";
import { checkBotId } from "botid/server";
import { eq } from "drizzle-orm";
import { getDb } from "../../db";
import { hackathonSignups } from "../../db/schema";
import { notifyDiscordNewSignup } from "../../lib/discordSignupWebhook";
import { parseSignupBody } from "../../lib/signupValidation";

export const prerender = false;

function emptyToNull(s: string): string | null {
  return s.length === 0 ? null : s;
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const verification = await checkBotId();
    if (verification.isBot) {
      return Response.json({ error: "access_denied" }, { status: 403 });
    }
  } catch (e) {
    console.error("BotID check failed:", e);
  }

  if (request.headers.get("content-type")?.split(";")[0]?.trim() !== "application/json") {
    return Response.json({ error: "expected_json" }, { status: 415 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!body || typeof body !== "object") {
    return Response.json({ error: "invalid_body" }, { status: 400 });
  }

  const parsed = parseSignupBody(body);
  if (!parsed.ok) {
    return Response.json({ error: parsed.error }, { status: parsed.status });
  }

  const {
    fullName,
    email,
    xUrl,
    linkedinUrl,
    githubUrl,
    webUrl,
    achievements,
    freeTime,
    wantsAmbassador,
    ambassadorMotivation,
    ambassadorStudyWhere,
    heardFrom,
  } = parsed.data;

  const motivationDb = wantsAmbassador ? emptyToNull(ambassadorMotivation) : null;
  const studyDb = wantsAmbassador ? emptyToNull(ambassadorStudyWhere) : null;

  try {
    const db = getDb();
    const [existing] = await db
      .select({ id: hackathonSignups.id })
      .from(hackathonSignups)
      .where(eq(hackathonSignups.email, email))
      .limit(1);
    if (existing) {
      return Response.json({ error: "duplicate_email" }, { status: 409 });
    }

    await db.insert(hackathonSignups).values({
      fullName,
      email,
      xUrl: emptyToNull(xUrl),
      linkedinUrl: emptyToNull(linkedinUrl),
      githubUrl: emptyToNull(githubUrl),
      webUrl: emptyToNull(webUrl),
      achievements: emptyToNull(achievements),
      freeTime: emptyToNull(freeTime),
      wantsAmbassador,
      ambassadorMotivation: motivationDb,
      ambassadorStudyWhere: studyDb,
      heardFrom: emptyToNull(heardFrom),
    });

    await notifyDiscordNewSignup({
      fullName,
      email,
      xUrl,
      linkedinUrl,
      githubUrl,
      webUrl,
      achievements,
      freeTime,
      wantsAmbassador,
      ambassadorMotivation: wantsAmbassador ? ambassadorMotivation : "",
      ambassadorStudyWhere: wantsAmbassador ? ambassadorStudyWhere : "",
      heardFrom,
    });

    return Response.json({ ok: true });
  } catch (e) {
    console.error(e);
    return Response.json({ error: "save_failed" }, { status: 500 });
  }
};
