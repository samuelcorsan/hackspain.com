const HACKSPAIN_HOSTS = new Set(["hackspain.com", "www.hackspain.com"]);
const VERCEL_PREVIEW_SUFFIX = ".vercel.app";
const TRAILING_DOTS_RE = /\.+$/;

export function isSentryBrowserHostAllowed(
  hostname: string | null | undefined
): boolean {
  const normalizedHostname = hostname
    ?.trim()
    .toLowerCase()
    .replace(TRAILING_DOTS_RE, "");
  if (!normalizedHostname) {
    return false;
  }

  return (
    HACKSPAIN_HOSTS.has(normalizedHostname) ||
    normalizedHostname.endsWith(VERCEL_PREVIEW_SUFFIX)
  );
}
