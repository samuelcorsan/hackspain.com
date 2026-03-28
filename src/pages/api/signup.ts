import type { APIRoute } from "astro";
import { eq } from "drizzle-orm";
import { getDb } from "../../db";
import { hackathonSignups } from "../../db/schema";

export const prerender = false;

const MAX = {
  name: 200,
  email: 320,
  url: 2048,
  longText: 8000,
} as const;

function trim(s: unknown): string {
  return typeof s === "string" ? s.trim() : "";
}

function emptyToNull(s: string): string | null {
  return s.length === 0 ? null : s;
}

function normalizeLooseUrl(input: string): string {
  const t = input.trim();
  if (!t) return "";
  if (t.startsWith("//")) return `https:${t}`;
  if (/^[a-z][a-z0-9+.-]*:/i.test(t)) return t;
  return `https://${t.replace(/^\/+/, "")}`;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const POST: APIRoute = async ({ request }) => {
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

  const o = body as Record<string, unknown>;
  const fullName = trim(o.fullName).slice(0, MAX.name);
  const email = trim(o.email).slice(0, MAX.email).toLowerCase();
  const xUrl = normalizeLooseUrl(trim(o.xUrl)).slice(0, MAX.url);
  const linkedinUrl = normalizeLooseUrl(trim(o.linkedinUrl)).slice(0, MAX.url);
  const githubUrl = normalizeLooseUrl(trim(o.githubUrl)).slice(0, MAX.url);
  const webUrl = normalizeLooseUrl(trim(o.webUrl)).slice(0, MAX.url);
  const achievements = trim(o.achievements).slice(0, MAX.longText);
  const freeTime = trim(o.freeTime).slice(0, MAX.longText);

  if (!fullName) {
    return Response.json({ error: "fullName is required" }, { status: 400 });
  }
  if (!email || !EMAIL_RE.test(email)) {
    return Response.json({ error: "Valid email is required" }, { status: 400 });
  }

  const hasSocial =
    xUrl.length > 0 || linkedinUrl.length > 0 || githubUrl.length > 0 || webUrl.length > 0;
  if (!hasSocial) {
    return Response.json({ error: "social_required" }, { status: 400 });
  }

  try {
    const db = getDb();
    const [existing] = await db
      .select({ id: hackathonSignups.id })
      .from(hackathonSignups)
      .where(eq(hackathonSignups.email, email))
      .limit(1);
    if (existing) {
      return Response.json({ error: "This email is already registered" }, { status: 409 });
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
    });

    return Response.json({ ok: true });
  } catch (e) {
    console.error(e);
    return Response.json({ error: "Could not save signup" }, { status: 500 });
  }
};
