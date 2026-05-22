const PRODUCTION_HOSTS = new Set(["hackspain.com", "www.hackspain.com"]);
const VERCEL_PREVIEW_SUFFIX = ".vercel.app";
const TRAILING_DOT_RE = /\.$/;

export function isSentryClientHostAllowed(hostname: string): boolean {
  const normalizedHostname = hostname
    .trim()
    .toLowerCase()
    .replace(TRAILING_DOT_RE, "");

  return (
    PRODUCTION_HOSTS.has(normalizedHostname) ||
    normalizedHostname.endsWith(VERCEL_PREVIEW_SUFFIX)
  );
}
