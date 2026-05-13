import { describe, expect, it } from "bun:test";
import { isLocalhostSentryEvent } from "./sentry-event-filters";

describe("isLocalhostSentryEvent", () => {
  it("drops localhost request URLs", () => {
    expect(
      isLocalhostSentryEvent({
        request: { url: "http://localhost:4321/signup" },
      })
    ).toBe(true);
  });

  it("drops loopback and localhost subdomain tag URLs", () => {
    expect(
      isLocalhostSentryEvent({
        tags: { url: "http://127.0.0.1:4321/signup" },
      })
    ).toBe(true);
    expect(
      isLocalhostSentryEvent({
        tags: { url: "https://preview.localhost/signup" },
      })
    ).toBe(true);
  });

  it("keeps HackSpain production URLs", () => {
    expect(
      isLocalhostSentryEvent({
        request: { url: "https://hackspain.com/signup" },
      })
    ).toBe(false);
  });

  it("ignores missing or malformed URLs", () => {
    expect(isLocalhostSentryEvent({})).toBe(false);
    expect(
      isLocalhostSentryEvent({
        request: { url: "not a url" },
        tags: { url: 42 },
      })
    ).toBe(false);
  });
});
