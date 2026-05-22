import { describe, expect, test } from "bun:test";
import { isSentryClientHostAllowed } from "./sentry-client-host";

describe("isSentryClientHostAllowed", () => {
  test("allows HackSpain production hosts", () => {
    expect(isSentryClientHostAllowed("hackspain.com")).toBe(true);
    expect(isSentryClientHostAllowed("www.hackspain.com")).toBe(true);
  });

  test("allows Vercel preview hosts", () => {
    expect(isSentryClientHostAllowed("hackspain-git-main.vercel.app")).toBe(
      true
    );
  });

  test("normalizes case and trailing dot", () => {
    expect(isSentryClientHostAllowed("WWW.HACKSPAIN.COM.")).toBe(true);
  });

  test("rejects local and unrelated hosts", () => {
    expect(isSentryClientHostAllowed("localhost")).toBe(false);
    expect(isSentryClientHostAllowed("127.0.0.1")).toBe(false);
    expect(isSentryClientHostAllowed("hackspain.local")).toBe(false);
    expect(isSentryClientHostAllowed("hackspain.com.evil.test")).toBe(false);
    expect(isSentryClientHostAllowed("vercel.app.evil.test")).toBe(false);
  });
});
