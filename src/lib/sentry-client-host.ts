const PRODUCTION_HOSTS = new Set(["hackspain.com", "www.hackspain.com"]);
const VERCEL_PREVIEW_HOST_SUFFIX = ".vercel.app";

export function isSentryClientAllowedHost(hostname: string): boolean {
  const normalizedHostname = hostname.trim().toLowerCase().replace(/\.$/, "");

  if (PRODUCTION_HOSTS.has(normalizedHostname)) {
    return true;
  }

  return normalizedHostname.endsWith(VERCEL_PREVIEW_HOST_SUFFIX);
}
