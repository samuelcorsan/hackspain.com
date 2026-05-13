import {
  browserTracingIntegration,
  init,
  replayIntegration,
} from "@sentry/astro";
import { isLocalhostSentryEvent } from "./src/lib/sentry-event-filters";

const dsn = import.meta.env.PUBLIC_SENTRY_DSN;
const isDev = import.meta.env.DEV;

if (dsn) {
  // Replay lazy-loads extra bundles; in Vite dev that often 404s (UUID chunks) and logs
  // "Error loading script", which is unrelated to app code. Keep replay for production only.
  const integrations = [
    browserTracingIntegration({
      tracePropagationTargets: [
        /^https?:\/\/localhost(:\d+)?/,
        /^https:\/\/(www\.)?hackspain\.com/,
        /^https:\/\/[^/]+\.vercel\.app$/,
      ],
    }),
  ];
  if (!isDev) {
    integrations.push(
      replayIntegration({
        // Default masking hides all text; disable so replays show full UI copy (PII risk — ok for internal debugging).
        maskAllText: false,
        maskAllInputs: false,
        blockAllMedia: false,
      })
    );
  }

  init({
    dsn,
    // Adds request headers and IP for users, for more info visit:
    // https://docs.sentry.io/platforms/javascript/guides/astro/configuration/options/#sendDefaultPii
    sendDefaultPii: true,
    integrations,
    // Drop DOM error/rejection events mistaken for exceptions (e.g. script load failures).
    beforeSend(event, hint) {
      if (isLocalhostSentryEvent(event)) {
        return null;
      }
      const ex = hint.originalException;
      if (ex instanceof Event) {
        return null;
      }
      return event;
    },
    // Enable logs to be sent to Sentry
    enableLogs: true,
    // Define how likely traces are sampled. Adjust this value in production,
    // or use tracesSampler for greater control.
    tracesSampleRate: 1.0,
    // 0 = no full-session replays; only when an error is reported (replaysOnErrorSampleRate).
    replaysSessionSampleRate: 0,
    replaysOnErrorSampleRate: isDev ? 0 : 1.0,
  });
}
