import { HEARD_FROM_SOURCE_IDS, type HeardFromSourceId } from "./signupValidation";

const STORAGE_KEY = "hs_traffic_v1";

type TrafficV1 = {
  v: 1;
  /** First mapped external source this session (kept when browsing internally). */
  fromExternal: HeardFromSourceId | null;
  lastInternalPath: string | null;
  /** Unmapped external ref (hostname/path) to prefill «Otro». */
  suggestedOther: string | null;
};

const empty = (): TrafficV1 => ({
  v: 1,
  fromExternal: null,
  lastInternalPath: null,
  suggestedOther: null,
});

function isHeardId(s: string): s is HeardFromSourceId {
  return (HEARD_FROM_SOURCE_IDS as readonly string[]).includes(s);
}

function readStore(): TrafficV1 {
  if (typeof sessionStorage === "undefined") return empty();
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return empty();
    const o = JSON.parse(raw) as Partial<TrafficV1>;
    if (o.v !== 1) return empty();
    return {
      v: 1,
      fromExternal: typeof o.fromExternal === "string" && isHeardId(o.fromExternal) ? o.fromExternal : null,
      lastInternalPath: typeof o.lastInternalPath === "string" ? o.lastInternalPath : null,
      suggestedOther: typeof o.suggestedOther === "string" ? o.suggestedOther : null,
    };
  } catch {
    return empty();
  }
}

function writeStore(t: TrafficV1) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(t));
  } catch {
    /* private mode / quota */
  }
}

function stripWww(h: string): string {
  return h.startsWith("www.") ? h.slice(4) : h;
}

/**
 * Map HTTP Referrer host to a «¿Cómo nos has conocido?» option.
 */
export function mapReferrerHostToHeardId(hostname: string): HeardFromSourceId | null {
  const h = stripWww(hostname.toLowerCase());
  if (
    h === "t.co" ||
    h === "x.com" ||
    h === "twitter.com" ||
    h === "m.twitter.com" ||
    h === "mobile.x.com" ||
    h === "mobile.twitter.com" ||
    h.endsWith(".t.co")
  ) {
    return "x";
  }
  if (h === "instagram.com" || h === "l.instagram.com" || h === "m.instagram.com" || h.endsWith(".cdninstagram.com")) {
    return "instagram";
  }
  if (h === "linkedin.com" || h === "www.linkedin.com" || h === "m.linkedin.com" || h === "lnkd.in") {
    return "linkedin";
  }
  if (
    h === "google.com" ||
    h.endsWith(".google.com") ||
    h === "g.co" ||
    h === "bing.com" ||
    h.endsWith(".bing.com") ||
    h === "duckduckgo.com" ||
    h === "search.yahoo.com" ||
    h === "yahoo.com" ||
    h === "yandex.com" ||
    h === "yandex.ru" ||
    h === "baidu.com" ||
    h === "ecosia.org" ||
    h === "kagi.com" ||
    h === "qwant.com" ||
    h === "brave.com"
  ) {
    return "search";
  }
  return null;
}

function pathToHeardId(pathname: string): HeardFromSourceId | null {
  if (pathname === "/ambassador" || pathname.startsWith("/ambassador/")) {
    return "event";
  }
  return null;
}

/**
 * Run on every full page load (in Layout). Captures external referrers and
 * same-site navigation so `/signup` can prefill the form from session.
 */
export function recordPageAttribution(): void {
  if (typeof window === "undefined" || typeof document === "undefined") return;
  const here = new URL(window.location.href);
  const t = readStore();
  const ref = document.referrer;
  if (ref) {
    try {
      const u = new URL(ref);
      if (u.origin === here.origin) {
        t.lastInternalPath = u.pathname || null;
      } else {
        const fromHost = mapReferrerHostToHeardId(u.hostname);
        if (fromHost) {
          t.fromExternal = t.fromExternal ?? fromHost;
        } else {
          const otherHint =
            u.host + (u.pathname && u.pathname !== "/" ? u.pathname : "");
          t.suggestedOther = t.suggestedOther ?? otherHint;
        }
      }
    } catch {
      /* invalid referrer */
    }
  }
  writeStore(t);
}

export type HeardFromSessionDefaults = { source: HeardFromSourceId; other?: string } | null;

/** Defaults from `sessionStorage` (referrer + navegación interna). */
export function getHeardFromSessionDefaults(): HeardFromSessionDefaults {
  if (typeof window === "undefined") return null;
  const t = readStore();
  if (t.fromExternal) return { source: t.fromExternal };
  if (t.suggestedOther) return { source: "other", other: t.suggestedOther };
  if (t.lastInternalPath) {
    const p = pathToHeardId(t.lastInternalPath);
    if (p) return { source: p };
  }
  return null;
}
