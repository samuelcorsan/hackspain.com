const VERCEL_PREVIEW_SUFFIX = ".vercel.app";

const PRODUCTION_HOSTS = new Set(["hackspain.com", "www.hackspain.com"]);

export function shouldInitializeBrowserSentry(
  hostname: string | undefined
): boolean {
  if (!hostname) {
    return false;
  }

  const normalizedHostname = hostname.toLowerCase();
  return (
    PRODUCTION_HOSTS.has(normalizedHostname) ||
    normalizedHostname.endsWith(VERCEL_PREVIEW_SUFFIX)
  );
}
