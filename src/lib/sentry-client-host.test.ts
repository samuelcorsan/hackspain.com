import { describe, expect, test } from "bun:test";
import { shouldInitializeBrowserSentry } from "./sentry-client-host";

describe("shouldInitializeBrowserSentry", () => {
  test("allows the public HackSpain hosts", () => {
    expect(shouldInitializeBrowserSentry("hackspain.com")).toBe(true);
    expect(shouldInitializeBrowserSentry("www.hackspain.com")).toBe(true);
  });

  test("allows Vercel preview deployments", () => {
    expect(shouldInitializeBrowserSentry("hackspain-git-main.vercel.app")).toBe(
      true
    );
  });

  test("rejects localhost and missing hosts", () => {
    expect(shouldInitializeBrowserSentry("localhost")).toBe(false);
    expect(shouldInitializeBrowserSentry("127.0.0.1")).toBe(false);
    expect(shouldInitializeBrowserSentry(undefined)).toBe(false);
  });
});
