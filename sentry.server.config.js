import { init } from "@sentry/astro";

const dsn = import.meta.env.PUBLIC_SENTRY_DSN;
if (dsn) {
  init({
    dsn,
    // Adds request headers and IP for users, for more info visit:
    // https://docs.sentry.io/platforms/javascript/guides/astro/configuration/options/#sendDefaultPii
    sendDefaultPii: true,
    // Enable logs to be sent to Sentry
    enableLogs: true,
    // Define how likely traces are sampled. Adjust this value in production,
    // or use tracesSampler for greater control.
    tracesSampleRate: 1.0,
  });
}
