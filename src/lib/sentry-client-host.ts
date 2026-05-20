const PRODUCTION_HOSTS = new Set(["hackspain.com", "www.hackspain.com"]);
const VERCEL_PREVIEW_HOST_SUFFIX = ".vercel.app";
const TRAILING_DOT_RE = /\.$/;

export function isSentryClientAllowedHost(hostname: string): boolean {
  const normalizedHostname = hostname
    .trim()
    .toLowerCase()
    .replace(TRAILING_DOT_RE, "");

  if (PRODUCTION_HOSTS.has(normalizedHostname)) {
    return true;
  }

  return normalizedHostname.endsWith(VERCEL_PREVIEW_HOST_SUFFIX);
}
