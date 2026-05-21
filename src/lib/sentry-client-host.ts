const HACKSPAIN_PRODUCTION_HOSTS = new Set(["hackspain.com", "www.hackspain.com"]);

function normalizeHostname(hostname: string): string {
  return hostname.trim().toLowerCase().replace(/\.$/, "");
}

export function isAllowedSentryBrowserHost(hostname: string): boolean {
  const normalizedHostname = normalizeHostname(hostname);

  return (
    HACKSPAIN_PRODUCTION_HOSTS.has(normalizedHostname) ||
    normalizedHostname.endsWith(".vercel.app")
  );
}

export function shouldInitializeSentryBrowser({
  dsn,
  hostname,
}: {
  dsn: string | undefined;
  hostname: string | undefined;
}): boolean {
  return Boolean(dsn && hostname && isAllowedSentryBrowserHost(hostname));
}
