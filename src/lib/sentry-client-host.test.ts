import { describe, expect, it } from "bun:test";
import { isSentryClientAllowedHost } from "./sentry-client-host";

describe("isSentryClientAllowedHost", () => {
  it("allows HackSpain production hosts", () => {
    expect(isSentryClientAllowedHost("hackspain.com")).toBe(true);
    expect(isSentryClientAllowedHost("www.hackspain.com")).toBe(true);
  });

  it("allows Vercel preview deployments", () => {
    expect(isSentryClientAllowedHost("hackspain-git-main.vercel.app")).toBe(
      true
    );
    expect(isSentryClientAllowedHost("feature-branch-team.vercel.app.")).toBe(
      true
    );
  });

  it("normalizes case and whitespace", () => {
    expect(isSentryClientAllowedHost("  WWW.HACKSPAIN.COM  ")).toBe(true);
  });

  it("blocks localhost and unrelated hosts", () => {
    expect(isSentryClientAllowedHost("localhost")).toBe(false);
    expect(isSentryClientAllowedHost("127.0.0.1")).toBe(false);
    expect(isSentryClientAllowedHost("hackspain.local")).toBe(false);
    expect(isSentryClientAllowedHost("example.com")).toBe(false);
    expect(isSentryClientAllowedHost("evil-vercel.app.example.com")).toBe(
      false
    );
  });
});
