/// <reference types="astro/client" />

interface Window {
  __hsAnalyticsConsent?: "granted" | "denied" | null;
}

interface ImportMetaEnv {
  readonly DATABASE_URL?: string;
  /** Discord channel webhook URL (server-only). New signups post here when set. */
  readonly DISCORD_WEBHOOK_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module "*.svg?raw" {
  const content: string;
  export default content;
}

declare module "*.txt?raw" {
  const content: string;
  export default content;
}
