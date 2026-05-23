const PRODUCTION_HOSTS = new Set(["hackspain.com", "www.hackspain.com"]);
const VERCEL_PREVIEW_HOST_SUFFIX = ".vercel.app";

export function shouldInitializeSentryClient(
  hostname: null | string | undefined
): boolean {
  const normalizedHostname = hostname?.trim().toLowerCase();

  if (!normalizedHostname) {
    return false;
  }

  return (
    PRODUCTION_HOSTS.has(normalizedHostname) ||
    normalizedHostname.endsWith(VERCEL_PREVIEW_HOST_SUFFIX)
  );
}
