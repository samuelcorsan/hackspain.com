import { expect, test } from "bun:test";
import { canInitializeBrowserSentry } from "./sentry-client-host";

test("allows browser Sentry on production HackSpain hostnames", () => {
  expect(canInitializeBrowserSentry("hackspain.com")).toBe(true);
  expect(canInitializeBrowserSentry("www.hackspain.com")).toBe(true);
});

test("allows browser Sentry on Vercel preview hostnames", () => {
  expect(
    canInitializeBrowserSentry("hackspain-git-main-owner.vercel.app")
  ).toBe(true);
  expect(canInitializeBrowserSentry("HACKSPAIN.VERCEL.APP.")).toBe(true);
});

test("blocks browser Sentry on local and unrelated hostnames", () => {
  expect(canInitializeBrowserSentry("localhost")).toBe(false);
  expect(canInitializeBrowserSentry("127.0.0.1")).toBe(false);
  expect(canInitializeBrowserSentry("preview.hackspain.test")).toBe(false);
  expect(canInitializeBrowserSentry("evil-vercel.app.example.com")).toBe(false);
  expect(canInitializeBrowserSentry(undefined)).toBe(false);
});
