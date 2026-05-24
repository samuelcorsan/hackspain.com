import { describe, expect, it } from "bun:test";
import { shouldInitializeBrowserSentry } from "./sentry-client-host";

describe("shouldInitializeBrowserSentry", () => {
  it("allows HackSpain production domains", () => {
    expect(shouldInitializeBrowserSentry("hackspain.com")).toBe(true);
    expect(shouldInitializeBrowserSentry("www.hackspain.com")).toBe(true);
    expect(shouldInitializeBrowserSentry("HACKSPAIN.COM")).toBe(true);
  });

  it("allows Vercel preview deployments", () => {
    expect(shouldInitializeBrowserSentry("hackspain-git-main.vercel.app")).toBe(
      true
    );
    expect(shouldInitializeBrowserSentry("preview-team.vercel.app")).toBe(true);
  });

  it("blocks localhost and unrelated hosts", () => {
    expect(shouldInitializeBrowserSentry("localhost")).toBe(false);
    expect(shouldInitializeBrowserSentry("127.0.0.1")).toBe(false);
    expect(shouldInitializeBrowserSentry("example.com")).toBe(false);
    expect(shouldInitializeBrowserSentry("vercel.app.example.com")).toBe(false);
    expect(shouldInitializeBrowserSentry("")).toBe(false);
    expect(shouldInitializeBrowserSentry(null)).toBe(false);
    expect(shouldInitializeBrowserSentry(undefined)).toBe(false);
  });
});
