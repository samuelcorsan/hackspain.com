import { describe, expect, test } from "bun:test";
import {
  isAllowedSentryBrowserHost,
  shouldInitializeSentryBrowser,
} from "./sentry-client-host";

describe("isAllowedSentryBrowserHost", () => {
  test.each([
    "hackspain.com",
    "www.hackspain.com",
    "feature-preview.vercel.app",
    "HACKSPAIN.COM",
    "www.hackspain.com.",
  ])("allows production and Vercel preview host %s", (hostname) => {
    expect(isAllowedSentryBrowserHost(hostname)).toBe(true);
  });

  test.each([
    "localhost",
    "127.0.0.1",
    "hackspain.local",
    "evil-hackspain.com",
    "vercel.app.evil.com",
  ])("blocks non-production host %s", (hostname) => {
    expect(isAllowedSentryBrowserHost(hostname)).toBe(false);
  });
});

describe("shouldInitializeSentryBrowser", () => {
  test("requires both a DSN and an allowed host", () => {
    expect(
      shouldInitializeSentryBrowser({
        dsn: "https://example@sentry.io/1",
        hostname: "hackspain.com",
      })
    ).toBe(true);
    expect(
      shouldInitializeSentryBrowser({
        dsn: undefined,
        hostname: "hackspain.com",
      })
    ).toBe(false);
    expect(
      shouldInitializeSentryBrowser({
        dsn: "https://example@sentry.io/1",
        hostname: "localhost",
      })
    ).toBe(false);
  });
});
