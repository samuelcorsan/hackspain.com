import { describe, expect, test } from "bun:test";
import { shouldInitializeSentryClient } from "./sentry-client-host";

describe("shouldInitializeSentryClient", () => {
  test("allows HackSpain production hosts", () => {
    expect(shouldInitializeSentryClient("hackspain.com")).toBe(true);
    expect(shouldInitializeSentryClient("www.hackspain.com")).toBe(true);
  });

  test("allows Vercel deployment hosts", () => {
    expect(shouldInitializeSentryClient("hackspain-git-main.vercel.app")).toBe(
      true
    );
    expect(shouldInitializeSentryClient("preview-team.vercel.app.")).toBe(true);
  });

  test("blocks local and unrelated hosts", () => {
    expect(shouldInitializeSentryClient("localhost")).toBe(false);
    expect(shouldInitializeSentryClient("127.0.0.1")).toBe(false);
    expect(shouldInitializeSentryClient("hackspain.com.localhost")).toBe(false);
    expect(shouldInitializeSentryClient("example.com")).toBe(false);
    expect(shouldInitializeSentryClient("")).toBe(false);
    expect(shouldInitializeSentryClient(undefined)).toBe(false);
  });

  test("normalizes hostname case and whitespace", () => {
    expect(shouldInitializeSentryClient(" WWW.HACKSPAIN.COM ")).toBe(true);
  });
});
