const PRODUCTION_HOSTS = new Set(["hackspain.com", "www.hackspain.com"]);

export function shouldInitializeBrowserSentry(
  hostname: string | null | undefined
): boolean {
  if (!hostname) {
    return false;
  }

  const normalizedHostname = hostname.toLowerCase();

  return (
    PRODUCTION_HOSTS.has(normalizedHostname) ||
    normalizedHostname.endsWith(".vercel.app")
  );
}
