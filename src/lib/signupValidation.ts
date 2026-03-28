import { z } from "zod";

export const SIGNUP_MAX = {
  name: 200,
  email: 320,
  url: 2048,
  longText: 8000,
} as const;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type SocialKind = "x" | "linkedin" | "github" | "web";

function baseHostForProfileField(kind: Exclude<SocialKind, "web">): string {
  switch (kind) {
    case "x":
      return "x.com";
    case "linkedin":
      return "linkedin.com";
    case "github":
      return "github.com";
  }
}

export function expandProfileFieldInput(raw: string, baseHost: string): string {
  const v = raw.trim();
  if (!v) return "";
  if (/^[a-z][a-z0-9+.-]*:\/\//i.test(v) || v.startsWith("//")) return v;
  if (v.startsWith("@")) return v;

  const slash = v.indexOf("/");
  const firstSegment = slash === -1 ? v : v.slice(0, slash);
  const firstLower = firstSegment.toLowerCase();
  const looksLikeHostname =
    firstLower.includes(".") &&
    /^[a-z0-9.-]+$/i.test(firstLower) &&
    !firstLower.startsWith(".");

  if (looksLikeHostname) {
    return `https://${v.replace(/^\/+/, "")}`;
  }

  const host = baseHost.replace(/\/$/, "");
  const rest = v.replace(/^\/+/, "");
  const hl = host.toLowerCase();
  const rl = rest.toLowerCase();
  if (rl === hl || rl.startsWith(`${hl}/`)) {
    return `https://${rest}`;
  }
  return `https://${host}/${rest}`;
}

const TWITTER_HOSTS = new Set([
  "twitter.com",
  "www.twitter.com",
  "mobile.twitter.com",
  "m.twitter.com",
  "mobile.x.com",
]);

function stripWww(host: string): string {
  return host.startsWith("www.") ? host.slice(4) : host;
}

function isProfileHost(host: string): boolean {
  return (
    host === "x.com" ||
    host === "linkedin.com" ||
    host.endsWith(".linkedin.com") ||
    host === "github.com" ||
    host === "gist.github.com" ||
    host.endsWith(".github.io")
  );
}

function hostMatchesKind(host: string, kind: SocialKind): boolean {
  switch (kind) {
    case "x":
      return host === "x.com";
    case "linkedin":
      return host === "linkedin.com" || host.endsWith(".linkedin.com");
    case "github":
      return (
        host === "github.com" ||
        host === "gist.github.com" ||
        host.endsWith(".github.io")
      );
    case "web":
      return host.length > 0;
    default:
      return false;
  }
}

export function normalizeSocialUrl(input: string, kind: SocialKind): string {
  const trimmed = input.trim();
  if (!trimmed) return "";

  if (kind === "x") {
    if (trimmed.startsWith("@")) {
      const handle = trimmed.slice(1).split(/[/?#\s]/)[0]?.replace(/^\/+/, "") ?? "";
      if (!handle) return "";
      return `https://x.com/${handle}`;
    }
    if (!trimmed.includes("://") && !trimmed.includes("/") && !trimmed.includes(".")) {
      const h = trimmed.split(/\s/)[0] ?? "";
      if (h.length > 0) return `https://x.com/${h}`;
    }
  }

  let s = trimmed;
  if (!/^[a-z][a-z0-9+.-]*:/i.test(s)) {
    s = s.startsWith("//") ? `https:${s}` : `https://${s.replace(/^\/+/, "")}`;
  }

  let u: URL;
  try {
    u = new URL(s);
  } catch {
    return "";
  }

  if (u.protocol !== "http:" && u.protocol !== "https:") {
    return "";
  }

  let host = u.hostname.toLowerCase();
  host = stripWww(host);

  if (TWITTER_HOSTS.has(host)) {
    host = "x.com";
  }

  let path = u.pathname || "/";
  path = path.replace(/\/{2,}/g, "/");
  if (path.length > 1) {
    path = path.replace(/\/+$/, "");
  }

  const search =
    kind === "web" && !isProfileHost(host) ? u.search : "";

  if (!hostMatchesKind(host, kind)) {
    return "";
  }

  const out = `https://${host}${path}${search}`;
  return out.length > SIGNUP_MAX.url ? "" : out;
}

function socialField(kind: SocialKind) {
  return z.string().max(SIGNUP_MAX.url).transform((raw, ctx) => {
    const trimmed = raw.trim();
    const expanded =
      kind === "web"
        ? trimmed
        : expandProfileFieldInput(trimmed, baseHostForProfileField(kind));
    const norm = normalizeSocialUrl(expanded, kind);
    if (trimmed.length > 0 && norm.length === 0) {
      ctx.addIssue({
        code: "custom",
        message: "invalid_social_url",
        input: trimmed,
      });
    }
    return norm;
  });
}

export const signupBodySchema = z
  .object({
    fullName: z
      .string()
      .max(SIGNUP_MAX.name)
      .transform((s) => s.trim())
      .refine((s) => s.length > 0, { message: "fullName_required" }),
    email: z
      .string()
      .max(SIGNUP_MAX.email)
      .transform((s) => s.trim().toLowerCase())
      .refine((s) => EMAIL_RE.test(s), { message: "invalid_email" }),
    xUrl: socialField("x"),
    linkedinUrl: socialField("linkedin"),
    githubUrl: socialField("github"),
    webUrl: socialField("web"),
    achievements: z
      .string()
      .max(SIGNUP_MAX.longText)
      .transform((s) => s.trim()),
    freeTime: z
      .string()
      .max(SIGNUP_MAX.longText)
      .transform((s) => s.trim()),
  })
  .superRefine((data, ctx) => {
    const has =
      data.xUrl.length > 0 ||
      data.linkedinUrl.length > 0 ||
      data.githubUrl.length > 0 ||
      data.webUrl.length > 0;
    if (!has) {
      ctx.addIssue({
        code: "custom",
        message: "social_required",
        path: ["xUrl"],
      });
    }
  });

export type SignupBodyParsed = z.infer<typeof signupBodySchema>;

export function parseSignupBody(body: unknown):
  | { ok: true; data: SignupBodyParsed }
  | { ok: false; error: string; status: number } {
  const r = signupBodySchema.safeParse(body);
  if (r.success) {
    return { ok: true, data: r.data };
  }
  const issues = r.error.issues;
  const first = issues[0];
  const msg = first?.message ?? "validation_error";
  if (msg === "social_required") {
    return { ok: false, error: "social_required", status: 400 };
  }
  if (msg === "invalid_social_url") {
    return { ok: false, error: "invalid_social_url", status: 400 };
  }
  if (msg === "invalid_email") {
    return { ok: false, error: "Valid email is required", status: 400 };
  }
  if (msg === "fullName_required") {
    return { ok: false, error: "fullName is required", status: 400 };
  }
  return { ok: false, error: "Invalid request", status: 400 };
}

export function parseSignupBodyClient(body: unknown):
  | { ok: true; data: SignupBodyParsed }
  | { ok: false; code: "social_required" | "invalid_social_url" | "invalid_email" | "fullName" | "generic" } {
  const r = signupBodySchema.safeParse(body);
  if (r.success) {
    return { ok: true, data: r.data };
  }
  const msg = r.error.issues[0]?.message;
  if (msg === "social_required") return { ok: false, code: "social_required" };
  if (msg === "invalid_social_url") return { ok: false, code: "invalid_social_url" };
  if (msg === "invalid_email") return { ok: false, code: "invalid_email" };
  if (msg === "fullName_required") return { ok: false, code: "fullName" };
  return { ok: false, code: "generic" };
}
