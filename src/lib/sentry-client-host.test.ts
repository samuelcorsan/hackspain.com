import { describe, expect, it } from "bun:test";
import { shouldInitializeSentryClient } from "./sentry-client-host";

describe("shouldInitializeSentryClient", () => {
  it("allows HackSpain production hosts", () => {
    expect(shouldInitializeSentryClient("hackspain.com")).toBe(true);
    expect(shouldInitializeSentryClient("www.hackspain.com")).toBe(true);
    expect(shouldInitializeSentryClient(" HACKSPAIN.COM ")).toBe(true);
  });

  it("allows Vercel preview deployments", () => {
    expect(shouldInitializeSentryClient("hackspain-git-main.vercel.app")).toBe(
      true
    );
  });

  it("blocks local and unrelated hosts", () => {
    expect(shouldInitializeSentryClient("localhost")).toBe(false);
    expect(shouldInitializeSentryClient("127.0.0.1")).toBe(false);
    expect(shouldInitializeSentryClient("hackspain.com.example")).toBe(false);
    expect(shouldInitializeSentryClient("vercel.app")).toBe(false);
    expect(shouldInitializeSentryClient("")).toBe(false);
    expect(shouldInitializeSentryClient(null)).toBe(false);
    expect(shouldInitializeSentryClient(undefined)).toBe(false);
  });
});
