import { z } from "zod";

export const SIGNUP_MAX = {
  name: 200,
  email: 320,
  url: 2048,
  longText: 8000,
  heardFrom: 500,
  heardFromOther: 494,
} as const;

export const HEARD_FROM_SOURCE_IDS = [
  "x",
  "instagram",
  "linkedin",
  "friend",
  "school",
  "event",
  "search",
  "other",
] as const;

export type HeardFromSourceId = (typeof HEARD_FROM_SOURCE_IDS)[number];

export const HEARD_FROM_OPTIONS: readonly {
  id: HeardFromSourceId;
  label: string;
}[] = [
  { id: "x", label: "X (Twitter)" },
  { id: "instagram", label: "Instagram" },
  { id: "linkedin", label: "LinkedIn" },
  { id: "friend", label: "Un amigo o compañero" },
  { id: "school", label: "Universidad, FP o bootcamp" },
  { id: "event", label: "Evento, charla o meetup" },
  { id: "search", label: "Google u otra búsqueda" },
  { id: "other", label: "Otro" },
] as const;

export function formatHeardFromStored(stored: string): string {
  if (!stored) {
    return "";
  }
  if (stored.startsWith("other:")) {
    const detail = stored.slice(6).trim();
    return detail.length > 0 ? `Otro: ${detail}` : "Otro";
  }
  const row = HEARD_FROM_OPTIONS.find((o) => o.id === stored);
  return row?.label ?? stored;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const PROTOCOL_FULL_URI_START_RE = /^[a-z][a-z0-9+.-]*:\/\//i;
const HOSTNAME_CHARS_ONLY_RE = /^[a-z0-9.-]+$/i;
const TRAILING_SLASH_RE = /\/$/;
const LEADING_SLASHES_RE = /^\/+/;
const HANDLE_TERM_BOUNDARY_RE = /[/?#\s]/;
const FIRST_WHITESPACE_CHUNK_RE = /\s/;
const URL_SCHEME_PREFIX_RE = /^[a-z][a-z0-9+.-]*:/i;
const DUPLICATE_SLASHES_RE = /\/{2,}/g;
const TRAILING_SLASHES_ON_PATH_RE = /\/+$/;
const WWW_HOSTNAME_PREFIX_RE = /^www\./;
const LINE_BREAK_SPLIT_RE = /\r?\n/;

export type SocialKind = "x" | "linkedin" | "github" | "web";

function baseHostForProfileField(kind: Exclude<SocialKind, "web">): string {
  switch (kind) {
    case "x":
      return "x.com";
    case "linkedin":
      return "linkedin.com";
    case "github":
      return "github.com";
    default:
      throw new Error(`unexpected profile host kind: ${String(kind)}`);
  }
}

export function expandProfileFieldInput(raw: string, baseHost: string): string {
  const v = raw.trim();
  if (!v) {
    return "";
  }
  if (PROTOCOL_FULL_URI_START_RE.test(v) || v.startsWith("//")) {
    return v;
  }
  if (v.startsWith("@")) {
    return v;
  }

  const slash = v.indexOf("/");
  const firstSegment = slash === -1 ? v : v.slice(0, slash);
  const firstLower = firstSegment.toLowerCase();
  const looksLikeHostname =
    firstLower.includes(".") &&
    HOSTNAME_CHARS_ONLY_RE.test(firstLower) &&
    !firstLower.startsWith(".");

  if (looksLikeHostname) {
    return `https://${v.replace(LEADING_SLASHES_RE, "")}`;
  }

  const host = baseHost.replace(TRAILING_SLASH_RE, "");
  const rest = v.replace(LEADING_SLASHES_RE, "");
  const hl = host.toLowerCase();
  const rl = rest.toLowerCase();
  if (rl === hl || rl.startsWith(`${hl}/`)) {
    return `https://${rest}`;
  }
  if (host === "linkedin.com" && rl.length > 0) {
    const linkedinPathPrefixes = [
      "in/",
      "company/",
      "school/",
      "showcase/",
      "pulse/",
    ];
    if (!linkedinPathPrefixes.some((p) => rl.startsWith(p))) {
      return `https://${host}/in/${rest}`;
    }
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
  if (!trimmed) {
    return "";
  }

  if (kind === "x") {
    if (trimmed.startsWith("@")) {
      const handle =
        trimmed
          .slice(1)
          .split(HANDLE_TERM_BOUNDARY_RE)[0]
          ?.replace(LEADING_SLASHES_RE, "") ?? "";
      if (!handle) {
        return "";
      }
      return `https://x.com/${handle}`;
    }
    if (
      !(
        trimmed.includes("://") ||
        trimmed.includes("/") ||
        trimmed.includes(".")
      )
    ) {
      const h = trimmed.split(FIRST_WHITESPACE_CHUNK_RE)[0] ?? "";
      if (h.length > 0) {
        return `https://x.com/${h}`;
      }
    }
  }

  let s = trimmed;
  if (!URL_SCHEME_PREFIX_RE.test(s)) {
    s = s.startsWith("//")
      ? `https:${s}`
      : `https://${s.replace(LEADING_SLASHES_RE, "")}`;
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
  path = path.replace(DUPLICATE_SLASHES_RE, "/");
  if (path.length > 1) {
    path = path.replace(TRAILING_SLASHES_ON_PATH_RE, "");
  }

  const search = kind === "web" && !isProfileHost(host) ? u.search : "";

  if (!hostMatchesKind(host, kind)) {
    return "";
  }

  const out = `https://${host}${path}${search}`;
  return out.length > SIGNUP_MAX.url ? "" : out;
}

export type ProfileFieldKind = Exclude<SocialKind, "web">;

export function profileNormalizedToInputSuffix(
  norm: string,
  kind: ProfileFieldKind
): string {
  if (!norm) {
    return "";
  }
  let u: URL;
  try {
    u = new URL(norm);
  } catch {
    return "";
  }
  let path = u.pathname || "/";
  path = path.replace(DUPLICATE_SLASHES_RE, "/");
  if (path.length > 1) {
    path = path.replace(TRAILING_SLASHES_ON_PATH_RE, "");
  }
  const tail = path.startsWith("/") ? path.slice(1) : path;
  const h = u.hostname.toLowerCase().replace(WWW_HOSTNAME_PREFIX_RE, "");

  if (kind === "github" && h.endsWith(".github.io")) {
    return tail ? `${h}/${tail}` : h;
  }
  if (kind === "linkedin") {
    const tl = tail.toLowerCase();
    if (tl.startsWith("in/")) {
      return tail.slice(3).replace(LEADING_SLASHES_RE, "");
    }
  }
  return tail;
}

export function cleanProfilePasteText(
  raw: string,
  kind: ProfileFieldKind
): string {
  const line =
    raw
      .split(LINE_BREAK_SPLIT_RE)
      .map((l) => l.trim())
      .find((l) => l.length > 0) ?? "";
  if (!line) {
    return "";
  }
  const expanded = expandProfileFieldInput(line, baseHostForProfileField(kind));
  const norm = normalizeSocialUrl(expanded, kind);
  if (!norm) {
    return line;
  }
  return profileNormalizedToInputSuffix(norm, kind);
}

export function socialField(kind: SocialKind) {
  return z
    .string()
    .max(SIGNUP_MAX.url)
    .transform((raw, ctx) => {
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
    wantsAmbassador: z.boolean().optional().default(false),
    ambassadorMotivation: z
      .string()
      .max(SIGNUP_MAX.longText)
      .transform((s) => s.trim()),
    ambassadorStudyWhere: z
      .string()
      .max(SIGNUP_MAX.longText)
      .transform((s) => s.trim()),
    heardFromSource: z.preprocess(
      (v) => (typeof v === "string" ? v.trim() : ""),
      z
        .string()
        .min(1, { message: "heard_from_required" })
        .refine(
          (s) => (HEARD_FROM_SOURCE_IDS as readonly string[]).includes(s),
          { message: "heard_from_invalid" }
        )
        .transform((s) => s as HeardFromSourceId)
    ),
    heardFromOther: z.preprocess(
      (v) => (typeof v === "string" ? v : ""),
      z
        .string()
        .max(SIGNUP_MAX.heardFromOther)
        .transform((s) => s.trim())
    ),
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
    if (data.wantsAmbassador) {
      if (data.ambassadorMotivation.length === 0) {
        ctx.addIssue({
          code: "custom",
          message: "ambassador_motivation_required",
          path: ["ambassadorMotivation"],
        });
      }
      if (data.ambassadorStudyWhere.length === 0) {
        ctx.addIssue({
          code: "custom",
          message: "ambassador_study_where_required",
          path: ["ambassadorStudyWhere"],
        });
      }
    }
    if (data.heardFromSource === "other" && data.heardFromOther.length === 0) {
      ctx.addIssue({
        code: "custom",
        message: "heard_from_other_required",
        path: ["heardFromOther"],
      });
    }
  })
  .transform(({ heardFromSource, heardFromOther, ...rest }) => {
    const heardFrom =
      heardFromSource === "other"
        ? `other:${heardFromOther.trim()}`
        : heardFromSource;
    return { ...rest, heardFrom };
  });

export type SignupBodyParsed = z.infer<typeof signupBodySchema>;

export function parseSignupBody(
  body: unknown
):
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
    return { ok: false, error: "invalid_email", status: 400 };
  }
  if (msg === "fullName_required") {
    return { ok: false, error: "fullName_required", status: 400 };
  }
  if (msg === "heard_from_required" || msg === "heard_from_invalid") {
    return { ok: false, error: "heard_from_required", status: 400 };
  }
  if (msg === "ambassador_motivation_required") {
    return { ok: false, error: "ambassador_motivation_required", status: 400 };
  }
  if (msg === "ambassador_study_where_required") {
    return { ok: false, error: "ambassador_study_where_required", status: 400 };
  }
  if (msg === "heard_from_other_required") {
    return { ok: false, error: "heard_from_other_required", status: 400 };
  }
  return { ok: false, error: "invalid_request", status: 400 };
}

export function parseSignupBodyClient(body: unknown):
  | { ok: true; data: SignupBodyParsed }
  | {
      ok: false;
      code:
        | "social_required"
        | "invalid_social_url"
        | "invalid_email"
        | "fullName"
        | "ambassador_motivation"
        | "ambassador_study_where"
        | "heard_from"
        | "heard_from_other"
        | "generic";
    } {
  const r = signupBodySchema.safeParse(body);
  if (r.success) {
    return { ok: true, data: r.data };
  }
  const msg = r.error.issues[0]?.message;
  if (msg === "social_required") {
    return { ok: false, code: "social_required" };
  }
  if (msg === "invalid_social_url") {
    return { ok: false, code: "invalid_social_url" };
  }
  if (msg === "invalid_email") {
    return { ok: false, code: "invalid_email" };
  }
  if (msg === "fullName_required") {
    return { ok: false, code: "fullName" };
  }
  if (msg === "heard_from_required" || msg === "heard_from_invalid") {
    return { ok: false, code: "heard_from" };
  }
  if (msg === "ambassador_motivation_required") {
    return { ok: false, code: "ambassador_motivation" };
  }
  if (msg === "ambassador_study_where_required") {
    return { ok: false, code: "ambassador_study_where" };
  }
  if (msg === "heard_from_other_required") {
    return { ok: false, code: "heard_from_other" };
  }
  return { ok: false, code: "generic" };
}
