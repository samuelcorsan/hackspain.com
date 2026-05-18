import { describe, expect, it } from "bun:test";
import { isSentryBrowserHostAllowed } from "./sentry-client-host";

describe("isSentryBrowserHostAllowed", () => {
  it("allows the canonical HackSpain hosts", () => {
    expect(isSentryBrowserHostAllowed("hackspain.com")).toBe(true);
    expect(isSentryBrowserHostAllowed("www.hackspain.com")).toBe(true);
  });

  it("allows Vercel preview deployments", () => {
    expect(isSentryBrowserHostAllowed("hackspain-git-main.vercel.app")).toBe(
      true
    );
    expect(isSentryBrowserHostAllowed("HACKSPAIN-GIT-MAIN.VERCEL.APP.")).toBe(
      true
    );
  });

  it("blocks local and unrelated hosts", () => {
    expect(isSentryBrowserHostAllowed("localhost")).toBe(false);
    expect(isSentryBrowserHostAllowed("127.0.0.1")).toBe(false);
    expect(isSentryBrowserHostAllowed("hackspain.local")).toBe(false);
    expect(isSentryBrowserHostAllowed("hackspain.com.evil.test")).toBe(false);
    expect(isSentryBrowserHostAllowed("preview.vercel.app.evil.test")).toBe(
      false
    );
    expect(isSentryBrowserHostAllowed("")).toBe(false);
    expect(isSentryBrowserHostAllowed(null)).toBe(false);
  });
});
