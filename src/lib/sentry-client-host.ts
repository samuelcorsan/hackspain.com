const HACKSPAIN_HOSTS = new Set(["hackspain.com", "www.hackspain.com"]);

/** Browser Sentry reports only from production domains and Vercel previews. */
export function shouldInitializeBrowserSentry(hostname: string): boolean {
  const normalizedHostname = hostname.trim().toLowerCase();

  return (
    HACKSPAIN_HOSTS.has(normalizedHostname) ||
    normalizedHostname.endsWith(".vercel.app")
  );
}
