const HACKSPAIN_HOSTS = new Set(["hackspain.com", "www.hackspain.com"]);
const VERCEL_APP_SUFFIX = ".vercel.app";
const TRAILING_DOT_RE = /\.$/;

export function shouldInitializeSentryClient(
  hostname: string | null | undefined
): boolean {
  const normalizedHostname = hostname
    ?.trim()
    .toLowerCase()
    .replace(TRAILING_DOT_RE, "");
  if (!normalizedHostname) {
    return false;
  }

  return (
    HACKSPAIN_HOSTS.has(normalizedHostname) ||
    normalizedHostname.endsWith(VERCEL_APP_SUFFIX)
  );
}
