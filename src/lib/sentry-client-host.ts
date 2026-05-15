const PRIMARY_HOSTNAMES = new Set(["hackspain.com", "www.hackspain.com"]);
const TRAILING_DOT_REGEX = /\.$/;

export function canInitializeBrowserSentry(
  hostname: string | undefined
): boolean {
  if (!hostname) {
    return false;
  }

  const normalizedHostname = hostname
    .trim()
    .toLowerCase()
    .replace(TRAILING_DOT_REGEX, "");

  return (
    PRIMARY_HOSTNAMES.has(normalizedHostname) ||
    normalizedHostname.endsWith(".vercel.app")
  );
}
