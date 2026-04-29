import * as Sentry from "@sentry/astro";
import type { APIRoute } from "astro";
import { checkBotId } from "botid/server";
import { getDb } from "../../db";
import { hackathonSignups } from "../../db/schema";
import { notifyDiscordNewSignup, notifyDiscordSignupApiIssue } from "../../lib/discordSignupWebhook";
import { parseSignupBody } from "../../lib/signupValidation";

export const prerender = false;

function emptyToNull(s: string): string | null {
  return s.length === 0 ? null : s;
}

function emailHintFromBody(body: unknown): string | undefined {
  if (!body || typeof body !== "object") return undefined;
  const e = (body as { email?: unknown }).email;
  return typeof e === "string" ? e.trim().slice(0, 320) : undefined;
}

/** Walk `Error.cause` (Drizzle wraps Neon here) so ops sees the real failure, not only "Failed query". */
function errDetail(e: unknown): string {
  const parts: string[] = [];
  const seen = new Set<unknown>();
  let cur: unknown = e;
  for (let depth = 0; depth < 14 && cur != null; depth++) {
    if (seen.has(cur)) break;
    seen.add(cur);
    if (cur instanceof Error) {
      const line = `${cur.name}: ${cur.message}`.trim();
      if (line && parts[parts.length - 1] !== line) parts.push(line);
      cur = cur.cause;
      continue;
    }
    if (typeof cur === "object") {
      const o = cur as Record<string, unknown>;
      if (typeof o.message === "string" && o.message.trim()) {
        const line = o.message.trim();
        if (parts[parts.length - 1] !== line) parts.push(line);
      }
      if ("cause" in o && o.cause != null) {
        cur = o.cause;
        continue;
      }
      break;
    }
    parts.push(String(cur));
    break;
  }
  return parts.join("\n→\n").slice(0, 1024);
}

/** Drizzle wraps Postgres/Neon errors; `23505` unique violation lives on `cause`. */
function isPostgresUniqueViolation(e: unknown): boolean {
  const seen = new Set<unknown>();
  let cur: unknown = e;
  for (let depth = 0; depth < 14 && cur != null; depth++) {
    if (seen.has(cur)) break;
    seen.add(cur);
    if (typeof cur === "object" && cur !== null && "code" in cur) {
      if ((cur as { code: unknown }).code === "23505") return true;
    }
    if (cur instanceof Error && cur.cause != null) {
      cur = cur.cause;
      continue;
    }
    if (typeof cur === "object" && cur !== null && "cause" in cur) {
      const next = (cur as { cause: unknown }).cause;
      if (next == null) break;
      cur = next;
      continue;
    }
    break;
  }
  return false;
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const verification = await checkBotId();
    if (verification.isBot) {
      Sentry.withScope((scope) => {
        scope.setTag("api", "signup");
        scope.setTag("outcome", "access_denied");
        scope.setContext("signup", { reason: "botid" });
        Sentry.captureMessage("POST /api/signup blocked (BotID)", "warning");
      });
      return Response.json({ error: "access_denied" }, { status: 403 });
    }
  } catch (e) {
    Sentry.withScope((scope) => {
      scope.setTag("api", "signup");
      scope.setTag("outcome", "botid_check_failed");
      Sentry.captureException(e);
    });
    console.error("BotID check failed:", e);
  }

  if (request.headers.get("content-type")?.split(";")[0]?.trim() !== "application/json") {
    Sentry.withScope((scope) => {
      scope.setTag("api", "signup");
      scope.setTag("outcome", "expected_json");
      Sentry.captureMessage("POST /api/signup: wrong Content-Type", "warning");
    });
    return Response.json({ error: "expected_json" }, { status: 415 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    await notifyDiscordSignupApiIssue({
      status: 400,
      error: "Invalid JSON",
    });
    Sentry.withScope((scope) => {
      scope.setTag("api", "signup");
      scope.setTag("outcome", "invalid_json");
      Sentry.captureMessage("POST /api/signup: body is not valid JSON", "warning");
    });
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!body || typeof body !== "object") {
    await notifyDiscordSignupApiIssue({
      status: 400,
      error: "invalid_body",
    });
    Sentry.withScope((scope) => {
      scope.setTag("api", "signup");
      scope.setTag("outcome", "invalid_body");
      Sentry.captureMessage("POST /api/signup: body missing or not object", "warning");
    });
    return Response.json({ error: "invalid_body" }, { status: 400 });
  }

  const parsed = parseSignupBody(body);
  if (!parsed.ok) {
    await notifyDiscordSignupApiIssue({
      status: 400,
      error: parsed.error,
      emailHint: emailHintFromBody(body),
    });
    Sentry.withScope((scope) => {
      scope.setTag("api", "signup");
      scope.setTag("outcome", "validation");
      scope.setContext("details", { error: parsed.error, status: parsed.status });
      Sentry.captureMessage("POST /api/signup: validation failed", "warning");
    });
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

    try {
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
    } catch (e: unknown) {
      if (isPostgresUniqueViolation(e)) {
        return Response.json({ error: "duplicate_email" }, { status: 409 });
      }
      throw e;
    }

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
    Sentry.withScope((scope) => {
      scope.setTag("api", "signup");
      scope.setTag("outcome", "save_failed");
      scope.setContext("error", { detail: errDetail(e) });
      Sentry.captureException(e);
    });
    await notifyDiscordSignupApiIssue({
      status: 500,
      error: "save_failed",
      detail: errDetail(e),
      emailHint: email,
    });
    return Response.json({ error: "save_failed" }, { status: 500 });
  }
};
