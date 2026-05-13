interface SentryEventUrlSource {
  request?: {
    url?: string;
  };
  tags?: Record<string, unknown>;
}

const LOOPBACK_HOSTS = new Set(["localhost", "127.0.0.1", "::1"]);

function isLocalhostUrl(value: string): boolean {
  try {
    const { hostname } = new URL(value);
    const normalizedHostname = hostname.toLowerCase();

    return (
      LOOPBACK_HOSTS.has(normalizedHostname) ||
      normalizedHostname.endsWith(".localhost")
    );
  } catch {
    return false;
  }
}

function eventUrlCandidates(event: SentryEventUrlSource): string[] {
  const candidates = [event.request?.url];
  const taggedUrl = event.tags?.url;

  if (typeof taggedUrl === "string") {
    candidates.push(taggedUrl);
  }

  return candidates.filter(
    (value): value is string => typeof value === "string"
  );
}

export function isLocalhostSentryEvent(event: SentryEventUrlSource): boolean {
  return eventUrlCandidates(event).some(isLocalhostUrl);
}
